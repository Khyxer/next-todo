import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, confirmPassword } = body;

    // validaciones inputs
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json(
        { message: "Username must be at least 3 characters" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 },
      );
    }

    // verificar que el usuario y correo no estén en uso
    const existingUser = await sql`
      SELECT * FROM users 
      WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "The user or email address is already registered" },
        { status: 409 },
      );
    }

    // hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await sql`
      INSERT INTO users (username, email, password) 
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email
    `;

    const user = newUser[0];

    // token pa autologin
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      {
        message: "User created successfully and logged in",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
