import { Flag } from "lucide-react";

export default function NoTasks() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 p-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
          <Flag className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-medium">No tasks yet</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Create your first task to start organizing your day.
          </p>
        </div>
      </div>
    </div>
  );
}
