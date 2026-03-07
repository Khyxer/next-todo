import { getSession } from "@/lib/getSession";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { encrypt } from "@/lib/crypto";

const sql = neon(process.env.DATABASE_URL!);

// Actualizar tarea (estado rápido O edición completa)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id: taskId } = await params;

  // Verificar que la tarea pertenece al usuario
  const existing = await sql`
    SELECT id FROM tasks WHERE id = ${taskId} AND user_id = ${session.userId}
  `;
  if (existing.length === 0) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  try {
    // Caso 1: Solo actualizar status (dropdown rápido)
    if (body.status && Object.keys(body).length === 1) {
      const result = await sql`
        UPDATE tasks SET status = ${body.status}, updated_at = NOW()
        WHERE id = ${taskId}
        RETURNING *
      `;
      return NextResponse.json(result[0]);
    }

    // Caso 2: Edición completa
    const updated = {
      title: body.title ? encrypt(body.title) : undefined,
      description: body.description ? encrypt(body.description) : null,
      priority: body.priority,
      due_date: body.due_date,
    };

    const result = await sql`
      UPDATE tasks SET
        title       = COALESCE(${updated.title}, title),
        description = COALESCE(${updated.description}, description),
        priority    = COALESCE(${updated.priority}, priority),
        due_date    = COALESCE(${updated.due_date}, due_date),
        updated_at  = NOW()
      WHERE id = ${taskId}
      RETURNING *
    `;

    if (body.tags !== undefined) {
      await sql`DELETE FROM task_tags WHERE task_id = ${taskId}`;
      if (body.tags.length > 0) {
        await Promise.all(
          body.tags.map(
            (tagId: number) =>
              sql`INSERT INTO task_tags (task_id, tag_id) VALUES (${taskId}, ${tagId})`,
          ),
        );
      }
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Eliminar tarea
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await sql`
      UPDATE tasks 
      SET is_deleted = true, updated_at = NOW()
      WHERE id = ${id} AND user_id = ${session.userId} AND is_deleted = false
      RETURNING id
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
