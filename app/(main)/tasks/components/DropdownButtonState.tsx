"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Clock,
  Loader2,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-400/10",
    border: "border-yellow-200 dark:border-yellow-400/20",
    dot: "bg-yellow-400",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: Loader2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-400/10",
    border: "border-blue-200 dark:border-blue-400/20",
    dot: "bg-blue-400",
  },
  {
    value: "dropped",
    label: "Dropped",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-400/10",
    border: "border-red-200 dark:border-red-400/20",
    dot: "bg-red-400",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-400/10",
    border: "border-green-200 dark:border-green-400/20",
    dot: "bg-green-400",
  },
];

export default function DropdownButtonState({
  value = "pending",
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    statusOptions.find((s) => s.value === value) ?? statusOptions[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer
          ${current.color} ${current.bg} ${current.border}
          hover:brightness-95 dark:hover:brightness-110`}
      >
        <current.icon className="w-3.5 h-3.5" />
        {current.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-40 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 shadow-lg z-50 py-1 overflow-hidden">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                hover:bg-gray-50 dark:hover:bg-zinc-800
                ${option.value === value ? "font-medium" : "text-gray-600 dark:text-gray-400"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${option.dot}`}
              />
              <option.icon className={`w-3.5 h-3.5 ${option.color}`} />
              <span className={option.value === value ? option.color : ""}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
