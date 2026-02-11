import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const users = await sql`
      SELECT id, username, email, profile_picture, banner_picture, preferred_theme, is_active, is_banned, is_admin, created_at, updated_at 
      FROM users 
      WHERE id = ${decoded.userId}
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(users[0], { status: 200 });
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
