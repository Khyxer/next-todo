
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTagsTask } from "@/hooks/useTagsTask";
import { useTasks } from "@/hooks/useTasks";

interface TasksContextType
  extends ReturnType<typeof useTagsTask>, ReturnType<typeof useTasks> {}

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const tagsTask = useTagsTask();
  const tasksTask = useTasks();

  return (
    <TasksContext.Provider value={{ ...tagsTask, ...tasksTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasksContext must be used within TasksProvider");
  return context;
}
