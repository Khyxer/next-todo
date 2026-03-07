"use client";

import { Calendar, Tag, CheckCircle2, Eye, ZoomIn, Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/hooks/useTasks";
import { formatDate, formatPriority } from "@/utils/utilFormatters";
import { priorityConfig, statusConfig } from "@/constants/constViewTasks";
import DropdownButtonState from "./DropdownButtonState";
import ExpandableButton from "../../../../components/ExpandableButton";

export default function TaskCard({
  task,
  onView,
  onEdit,
  onDelete,
}: {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete?: (task: Task) => void;
}) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status] ?? statusConfig.pending;
  const dueDate = formatDate(task.due_date);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 px-4 py-3 flex items-center gap-4">
      {/* Priority indicator */}
      <span
        className={`w-1 self-stretch rounded-full shrink-0 ${priority.bg}`}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold truncate">{task.title}</h2>
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {task.tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    borderColor: tag.color,
                    color: tag.color,
                    backgroundColor: tag.color + "18",
                  }}
                  className="px-1.5 py-0 rounded-full text-xs border leading-5"
                >
                  {formatPriority(tag.name)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-0.5 text-sm text-neutral-400 dark:text-neutral-500">
          {task.description && <p className="truncate">{task.description}</p>}
          <div className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">{dueDate ?? "No due date"}</span>
          </div>
        </div>
      </div>

      {/* Status + actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${status.color} ${status.bg} ${status.border}`}
        >
          <status.icon className="w-3 h-3" />
          {status.label}
        </span>
        <button
          type="button"
          onClick={() => onView(task)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-sm flex items-center gap-1"
        >
          <ZoomIn className="w-4 h-4" />
          View
        </button> */}
        <ExpandableButton
          icon={ZoomIn}
          label="View"
          onClick={() => onView(task)}
        />
        <ExpandableButton
          icon={Pencil}
          label="Edit"
          onClick={() => onEdit(task)}
        />
        {onDelete && (
          <ExpandableButton
            icon={Trash2}
            label="Delete"
            onClick={() => onDelete(task)}
          />
        )}
        <DropdownButtonState />
      </div>
    </div>
  );
}
