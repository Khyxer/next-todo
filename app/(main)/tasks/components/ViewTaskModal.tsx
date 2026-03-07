"use client";

import ModalLayout from "@/components/ModalLayout";
import type { Task } from "@/hooks/useTasks";
import { Calendar, Clock, Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  formatDate,
  formatDateTime,
  formatPriority,
} from "@/utils/utilFormatters";
import { priorityConfig, statusConfig } from "@/constants/constViewTasks";

export default function ViewTaskModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  const t = task;
  const priority = priorityConfig[t.priority];
  const status = statusConfig[t.status] ?? statusConfig.pending;
  const dueDate = formatDate(t.due_date);

  const [isCopying, setIsCopying] = useState(false);
  const handleCopyDescription = async () => {
    try {
      setIsCopying(true);

      await navigator.clipboard.writeText(t.description || "");

      toast.success("Description copied to clipboard");

      setTimeout(() => setIsCopying(false), 1500);
    } catch (error) {
      console.error("Error copying text: ", error);
    }
  };
  return (
    <ModalLayout
      onClose={onClose}
      titleModal="Task details"
      className="max-w-2xl! w-full!"
    >
      <div className="flex flex-col gap-5 pb-1 w-full">
        {/* Title + ID */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight">{t.title}</h2>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${priority.color} ${priority.bg} ${priority.border}`}
            >
              <priority.icon className="w-3.5 h-3.5" />
              {priority.label} priority
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color} ${status.bg} ${status.border}`}
            >
              <status.icon className="w-3.5 h-3.5" />
              {status.label}
            </span>
          </div>
        </div>

        {/* <div className="border-t border-border" /> */}

        {/* Description */}

        <div className="px-2.5 py-1 w-full rounded border border-dashed bg-gray-100 border-gray-500 dark:bg-neutral-800 dark:border-neutral-600 relative">
          {t.description ? (
            <p className="leading-relaxed">{t.description}</p>
          ) : (
            <p className="text-muted-foreground italic">
              No description provided.
            </p>
          )}
          <button
            onClick={handleCopyDescription}
            className="absolute top-1 right-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-neutral-700 p-1 rounded"
          >
            {isCopying ? (
              <ClipboardCheck className="w-4 h-4 text-green-500" />
            ) : (
              <Clipboard className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Tags */}
        {t.tags && t.tags.length > 0 && (
          <div className="flex gap-3 w-full">
            <div className="flex flex-wrap gap-1.5">
              {t.tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    borderColor: tag.color,
                    color: tag.color,
                    backgroundColor: tag.color + "20",
                  }}
                  className="px-2 py-0.5 rounded-full text-xs border bg-muted"
                >
                  {formatPriority(tag.name)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border border-dashed border-gray-200 dark:border-gray-500" />

        {/* Timestamps */}
        <div className="flex gap-6">
          {/* Due date */}
          <div className="flex gap-2 items-center flex-1">
            <Calendar className="w-4 h-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Due date
              </p>
              {dueDate ? (
                <p className="text-sm">{dueDate}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No due date set
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-xs">{formatDateTime(t.created_at)}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Updated</p>
              <p className="text-xs">{formatDateTime(t.updated_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
