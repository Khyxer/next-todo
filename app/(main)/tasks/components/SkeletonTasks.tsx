export default function SkeletonTasks() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 px-4 py-3.5 flex items-center gap-4 animate-pulse"
        >
          {/* Priority indicator */}
          <div className="w-1 self-stretch rounded-full shrink-0 bg-gray-200 dark:bg-zinc-700" />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-700 rounded-md" />
              <div className="h-5 w-14 bg-gray-200 dark:bg-zinc-700 rounded-full shrink-0" />
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <div className="h-3.5 w-40 bg-gray-200 dark:bg-zinc-700 rounded" />
              <div className="flex items-center gap-1 shrink-0">
                <div className="h-3.5 w-3.5 bg-gray-200 dark:bg-zinc-700 rounded" />
                <div className="h-3.5 w-20 bg-gray-200 dark:bg-zinc-700 rounded" />
              </div>
            </div>
          </div>

          {/* Actions — 3 icon buttons + 1 dropdown to match TaskCard */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-zinc-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
