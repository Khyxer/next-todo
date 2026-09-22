"use client";
import HeaderMain from "@/components/app/HeaderMain";
import { Calendar, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useTasksContext } from "@/contexts/TasksContext";
import type { Task } from "@/hooks/useTasks";
import TaskCard from "./tasks/components/TaskCard";
import SkeletonTasks from "./tasks/components/SkeletonTasks";
import ViewTaskModal from "./tasks/components/ViewTaskModal";
import EditTask from "@/components/EditTask";
import ConfirmModal from "@/components/ConfirmModal";

const FIXED_TAG = "fixed";

export default function Home() {
  const { userInfo, isLoading } = useUserInfo();
  const { tasks, getTasks, loadingGetTasks, deleteTask, loadingDeleteTask } =
    useTasksContext();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const fixedTasks = tasks.filter((task) =>
    task.tags?.some((tag) => tag.name.toLowerCase() === FIXED_TAG),
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="w-full">
      <HeaderMain />

      {/* Información del usuario */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 min-h-15 pt-2 sm:pt-0 pl-24 sm:pl-46">
        {/** Información general */}
        <div>
          {isLoading ? (
            <div className="w-46 h-8 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
          ) : (
            <h2 className="text-3xl font-semibold">@{userInfo?.username}</h2>
          )}
        </div>
        {isLoading ? (
          <div className="w-60 h-7 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-neutral-400">
            <Calendar className="w-4 h-4" />
            <p>Account created on {formatDate(userInfo?.created_at)}</p>
          </div>
        )}
      </div>

      {/* Tareas con el tag "fixed" */}
      <section className="pt-10 max-w-4xl">
        <div className="flex items-center gap-2 pb-6">
          <Pin className="w-5 h-5" />
          <h3 className="text-2xl font-semibold">Fixed tasks</h3>
        </div>

        {isViewTaskOpen && selectedTask && (
          <ViewTaskModal
            task={selectedTask}
            onClose={() => {
              setIsViewTaskOpen(false);
              setSelectedTask(null);
            }}
          />
        )}

        {isEditTaskOpen && editTask && (
          <EditTask
            task={editTask}
            onClose={() => {
              setIsEditTaskOpen(false);
              setEditTask(null);
            }}
          />
        )}

        {isDeleteModalOpen && taskToDelete && (
          <ConfirmModal
            isOpen={true}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setTaskToDelete(null);
            }}
            onConfirm={async () => {
              const success = await deleteTask(taskToDelete.id);
              if (success) {
                setIsDeleteModalOpen(false);
                setTaskToDelete(null);
              }
            }}
            title="Delete task"
            description={`Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`}
            confirmText="Delete"
            cancelText="Cancel"
            isLoading={loadingDeleteTask}
          />
        )}

        {loadingGetTasks ? (
          <SkeletonTasks />
        ) : fixedTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 px-6 py-10 flex flex-col items-center gap-2 text-center">
            <Pin className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">
              No fixed tasks yet
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-500">
              Tasks with the &quot;fixed&quot; tag will show up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {fixedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onView={(t) => {
                  setSelectedTask(t);
                  setIsViewTaskOpen(true);
                }}
                onEdit={(t) => {
                  setEditTask(t);
                  setIsEditTaskOpen(true);
                }}
                onDelete={(t) => {
                  setTaskToDelete(t);
                  setIsDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}