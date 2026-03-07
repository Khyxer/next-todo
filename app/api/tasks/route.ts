import { getSession } from "@/lib/getSession";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { encrypt, decrypt } from "@/lib/crypto";

const sql = neon(process.env.DATABASE_URL!);

// Get all tasks by user
export async function GET(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sql`
  SELECT 
    t.*,
    COALESCE(
      JSON_AGG(
        JSON_BUILD_OBJECT('id', tg.id, 'name', tg.name, 'color', tg.color)
      ) FILTER (WHERE tg.id IS NOT NULL),
      '[]'
    ) AS tags
  FROM tasks t
  LEFT JOIN task_tags tt ON tt.task_id = t.id
  LEFT JOIN tags tg ON tg.id = tt.tag_id
  WHERE t.user_id = ${session.userId} AND t.is_deleted = false
  GROUP BY t.id
`;

    const decryptedTasks = result.map((task) => ({
      ...task,
      title: decrypt(task.title),
      description: task.description ? decrypt(task.description) : null,
      tags: task.tags.map(
        (tag: { id: number; name: string; color: string }) => ({
          ...tag,
          name: decrypt(tag.name),
          color: decrypt(tag.color),
        }),
      ),
    }));

    return NextResponse.json(decryptedTasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Create a new task
export async function POST(request: NextRequest) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newTask = {
    title: encrypt(body.title),
    description: body.description ? encrypt(body.description) : null,
    priority: body.priority || "low",
    due_date: body.due_date || null,
    tags: body.tags || [],
  };

  try {
    const result = await sql`
      INSERT INTO tasks (user_id, title, description, priority, due_date)
      VALUES (${session.userId}, ${newTask.title}, ${newTask.description}, ${newTask.priority}, ${newTask.due_date})
      RETURNING *
    `;

    const taskId = result[0].id;

    if (newTask.tags.length > 0) {
      await Promise.all(
        newTask.tags.map(
          (tagId: number) =>
            sql`INSERT INTO task_tags (task_id, tag_id) VALUES (${taskId}, ${tagId})`,
        ),
      );
    }

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
