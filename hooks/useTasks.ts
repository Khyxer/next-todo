import { useState } from "react";
import { toast } from "react-hot-toast";
import { Tag } from "./useTagsTask";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: "pending" | "in-progress" | "completed";
  due_date: string | null;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  due_date?: string;
  tags?: number[];
  fullTags?: Tag[];
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  due_date?: string;
  tags?: number[];
  // Full tag objects for local state update (avoids re-fetch)
  fullTags?: Tag[];
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingCreateTask, setLoadingCreateTask] = useState(false);
  const [loadingUpdateTask, setLoadingUpdateTask] = useState(false);
  const [loadingDeleteTask, setLoadingDeleteTask] = useState(false);
  const [loadingGetTasks, setLoadingGetTasks] = useState(true);

  const createTask = async (payload: CreateTaskPayload) => {
    if (!payload.title || payload.title.trim() === "") {
      toast.error("Title is required");
      return null;
    }

    try {
      setLoadingCreateTask(true);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: payload.title.trim(),
          description: payload.description?.trim() || undefined,
          priority: payload.priority ?? "low",
          due_date: payload.due_date || null,
          tags: payload.tags ?? [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Failed to create task");
        return null;
      }

      toast.success("Task created");

      // Use payload values for local state — server response has encrypted title/description.
      // Only take server-generated fields (id, status, timestamps) from `data`.
      const localTask: Task = {
        ...data,
        title: payload.title.trim(),
        description: payload.description?.trim() || null,
        priority: payload.priority ?? "low",
        due_date: payload.due_date || null,
        tags: payload.fullTags ?? [], // use full tag objects if provided
      };
      setTasks((prev) => [...prev, localTask]);
      return localTask;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoadingCreateTask(false);
    }
  };

  // ------ Get all tasks

  const getTasks = async () => {
    try {
      setLoadingGetTasks(true);
      const response = await fetch("/api/tasks", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Failed to get tasks");
        return null;
      }

      setTasks(data);
      return data as Task[];
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoadingGetTasks(false);
    }
  };

  // ------ Update task

  const updateTask = async (id: number, payload: UpdateTaskPayload) => {
    if (payload.title !== undefined && payload.title.trim() === "") {
      toast.error("Title is required");
      return null;
    }

    try {
      setLoadingUpdateTask(true);

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: payload.title?.trim(),
          description: payload.description?.trim() || null,
          priority: payload.priority,
          due_date: payload.due_date || null,
          tags: payload.tags ?? [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Failed to update task");
        return null;
      }

      toast.success("Task updated");

      // Update local state directly using the payload values.
      // We use payload data (not server response) because:
      // - title/description come back encrypted from the server
      // - tags response doesn't include populated tag objects
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                title: payload.title?.trim() ?? t.title,
                description:
                  payload.description !== undefined
                    ? payload.description.trim() || null
                    : t.description,
                priority: payload.priority ?? t.priority,
                due_date:
                  payload.due_date !== undefined
                    ? payload.due_date || null
                    : t.due_date,
                tags: payload.fullTags ?? t.tags,
                updated_at: data.updated_at ?? t.updated_at,
              }
            : t,
        ),
      );

      return data as Task;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoadingUpdateTask(false);
    }
  };

  // ------ Delete task

  const deleteTask = async (id: number) => {
    try {
      setLoadingDeleteTask(true);

      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Failed to delete task");
        return false;
      }

      toast.success("Task deleted");

      // Update local state directly by filtering out the soft-deleted task
      setTasks((prev) => prev.filter((t) => t.id !== id));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoadingDeleteTask(false);
    }
  };

  // ------

  return {
    tasks,
    setTasks,
    createTask,
    loadingCreateTask,
    updateTask,
    loadingUpdateTask,
    deleteTask,
    loadingDeleteTask,
    getTasks,
    loadingGetTasks,
  };
};
