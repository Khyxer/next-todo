import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface Session {
  userId: number;
  username: string;
  email: string;
}

export function getSession(request: NextRequest): Session | null {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Session;
    return decoded;
  } catch {
    return null;
  }
}
