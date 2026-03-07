import { getSession } from "@/lib/getSession";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { encrypt, decrypt } from "@/lib/crypto";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const color = body.color || "#9CA3AF";

  try {
    const result = await sql`
  INSERT INTO tags (user_id, name, color)
  SELECT ${session.userId}, ${encrypt(body.name)}, ${encrypt(color)}
  WHERE NOT EXISTS (
    SELECT 1 FROM tags 
    WHERE user_id = ${session.userId} AND name = ${encrypt(body.name)}
  )
  RETURNING *
`;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Tag already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        id: result[0].id,
        name: decrypt(result[0].name),
        color: decrypt(result[0].color),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error al crear tag:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET tags
export async function GET(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sql`
      SELECT * FROM tags WHERE user_id = ${session.userId}
    `;

    if (!result) {
      return NextResponse.json({ error: "Tags not found" }, { status: 404 });
    }

    const tags = result.map((tag) => ({
      id: tag.id,
      name: decrypt(tag.name),
      color: decrypt(tag.color),
    }));

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error al obtener tags:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
