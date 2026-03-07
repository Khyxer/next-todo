"use client";

import { MonitorDot, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function AppearanceSelector() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      label: "Light",
      value: "light",
      icon: Sun,
      preview: (
        <div className="w-full h-full rounded-md bg-white border border-gray-200 p-1.5 flex flex-col gap-1">
          <div className="w-full h-2 rounded bg-gray-100 flex gap-1 items-center px-1">
            <div className="w-1.5 h-1 rounded-full bg-gray-300" />
            <div className="w-3 h-1 rounded bg-gray-300" />
          </div>
          <div className="flex gap-1 flex-1">
            <div className="w-5 h-full rounded bg-gray-100" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1.5 rounded bg-gray-200" />
              <div className="w-3/4 h-1.5 rounded bg-gray-200" />
              <div className="w-1/2 h-1.5 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Dark",
      value: "dark",
      icon: Moon,
      preview: (
        <div className="w-full h-full rounded-md bg-zinc-900 border border-zinc-700 p-1.5 flex flex-col gap-1">
          <div className="w-full h-2 rounded bg-zinc-800 flex gap-1 items-center px-1">
            <div className="w-1.5 h-1 rounded-full bg-zinc-600" />
            <div className="w-3 h-1 rounded bg-zinc-600" />
          </div>
          <div className="flex gap-1 flex-1">
            <div className="w-5 h-full rounded bg-zinc-800" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1.5 rounded bg-zinc-700" />
              <div className="w-3/4 h-1.5 rounded bg-zinc-700" />
              <div className="w-1/2 h-1.5 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "System",
      value: "system",
      icon: MonitorDot,
      preview: (
        <div className="w-full h-full rounded-md overflow-hidden flex">
          {/* Mitad clara */}
          <div className="w-1/2 h-full bg-white border-r border-gray-200 p-1.5 flex flex-col gap-1">
            <div className="w-full h-2 rounded bg-gray-100" />
            <div className="flex gap-1 flex-1">
              <div className="w-4 h-full rounded bg-gray-100" />
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-1.5 rounded bg-gray-200" />
                <div className="w-3/4 h-1.5 rounded bg-gray-200" />
                <div className="w-1/2 h-1.5 rounded bg-gray-100" />
              </div>
            </div>
          </div>
          {/* Mitad oscura */}
          <div className="w-1/2 h-full bg-zinc-900 p-1.5 flex flex-col gap-1">
            <div className="w-full h-2 rounded bg-zinc-800" />
            <div className="flex gap-1 flex-1">
              <div className="w-4 h-full rounded bg-zinc-800" />
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-1.5 rounded bg-zinc-700" />
                <div className="w-3/4 h-1.5 rounded bg-zinc-700" />
                <div className="w-1/2 h-1.5 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Appearance</h2>
      <div className="flex gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.value;
          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`
                relative flex flex-col gap-2 p-1 rounded-xl border-2 w-40 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-blue-500 dark:border-blue-400"
                    : "border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600"
                }
              `}
            >
              {/* Preview */}
              <div className="w-full h-24 rounded-lg overflow-hidden">
                {option.preview}
              </div>

              {/* Label */}
              <div className="flex items-center gap-1.5 px-1 pb-1">
                <Icon
                  className={`w-3.5 h-3.5 ${isSelected ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-zinc-500"}`}
                />
                <span
                  className={`text-xs font-medium ${isSelected ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-zinc-400"}`}
                >
                  {option.label}
                </span>
              </div>

              {/* Selected dot */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
