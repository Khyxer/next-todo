"use client";

import { type Task } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import TaskCard from "./components/TaskCard";
import NoTasks from "./components/NoTasks";
import SkeletonTasks from "./components/SkeletonTasks";
import ViewTaskModal from "./components/ViewTaskModal";
import { useTasksContext } from "@/contexts/TasksContext";
import EditTask from "@/components/EditTask";
import ConfirmModal from "@/components/ConfirmModal";

export default function Tasks() {
  const { tasks, getTasks, loadingGetTasks, deleteTask, loadingDeleteTask } = useTasksContext();
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full h-screen flex flex-col mx-auto max-w-4xl">
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

      <div className="flex items-start justify-between gap-6 pt-8 shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <p className="text-sm text-neutral-400">
            Manage your work and keep track of what&apos;s next.
          </p>
        </div>
      </div>

      <div className="pt-6 flex flex-col min-h-0 flex-1">
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900 text-lg duration-150"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer group"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
              <div className="absolute inset-0 w-full h-full bg-gray-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
            </button>
          )}
        </div>

        <div className="pt-6 overflow-y-auto flex-1 min-h-0">
          {loadingGetTasks ? (
            <SkeletonTasks />
          ) : tasks.length === 0 ? (
            <NoTasks />
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
              <Search className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
              <p className="text-neutral-500 dark:text-neutral-400 font-medium">
                No tasks match &quot;{search}&quot;
              </p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTasks.map((task) => (
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
        </div>
      </div>
    </div>
  );
}
