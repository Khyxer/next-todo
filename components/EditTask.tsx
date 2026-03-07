"use client";

import ModalLayout from "./ModalLayout";
import { InputLabel, InputSelect } from "./InputLabel";
import { useEffect, useState } from "react";
import { useTasksContext } from "@/contexts/TasksContext";
import { Check, ChevronDown } from "lucide-react";
import type { Task } from "@/hooks/useTasks";

export default function EditTask({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  const { tags, getTags, updateTask, loadingUpdateTask } = useTasksContext();
  const [openTags, setOpenTags] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.due_date ?? "");
  const [selectedTags, setSelectedTags] = useState<number[]>(
    task.tags?.map((t) => t.id) ?? [],
  );

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <ModalLayout
      onClose={onClose}
      titleModal="Edit task"
      className="max-w-xl! w-full!"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const fullTags = tags.filter((t) => selectedTags.includes(t.id));
          const updated = await updateTask(task.id, {
            title,
            description,
            priority,
            due_date: dueDate,
            tags: selectedTags,
            fullTags,
          });
          if (updated) {
            onClose();
          }
        }}
        className="flex flex-col gap-4"
      >
        <InputLabel
          name="Title"
          placeholder="Buy milk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700 dark:text-gray-300 pb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Go to the store and buy milk"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900 text-lg duration-150"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InputSelect
            name="Priority"
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            value={priority}
            onChange={(value) =>
              setPriority(value as "low" | "medium" | "high")
            }
          />
          <InputLabel
            name="Due date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/** Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Tags
          </label>

          {tags.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-zinc-500">
              No tags available. Create some in Settings.
            </p>
          ) : (
            <div className="relative">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpenTags(!openTags)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none text-left flex items-center justify-between gap-2 text-lg duration-150"
              >
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {tags
                      .filter((t) => selectedTags.includes(t.id))
                      .map((tag) => (
                        <span
                          key={tag.id}
                          className="text-sm px-2 py-0.5 rounded-full"
                          style={{
                            color: tag.color,
                            backgroundColor: tag.color + "20",
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                  </div>
                ) : (
                  <span className="text-gray-400 dark:text-zinc-500">
                    Select tags
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openTags ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {openTags && (
                <div className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-neutral-900 shadow-lg z-50 p-2 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className="flex items-center gap-1.5 px-3 py-0.5 rounded-full border transition-all duration-150 cursor-pointer"
                        style={{
                          color: tag.color,
                          backgroundColor: isSelected
                            ? tag.color + "30"
                            : tag.color + "10",
                          borderColor: isSelected
                            ? tag.color
                            : tag.color + "50",
                          borderStyle: isSelected ? "solid" : "dashed",
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span className="text-sm">{tag.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loadingUpdateTask}
            className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
