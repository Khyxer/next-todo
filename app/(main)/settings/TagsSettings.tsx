"use client";

import {
  Check,
  Plus,
  Pencil,
  Trash,
  PaintbrushVertical,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTasksContext } from "@/contexts/TasksContext";

export default function TagsSettings() {
  const {
    newTagForm,
    setNewTagForm,
    createTag,
    loadingCreateTag,
    tags,
    getTags,
    loadingGetTags,
  } = useTasksContext();

  const [creatingTag, setCreatingTag] = useState(false);

  const [onColorSelected, setOnColorSelected] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const colors = [
    "#9CA3AF",
    "#E53E3E",
    "#FC8181",
    "#ED8936",
    "#ECC94B",
    "#38A169",
    "#68D391",
    "#319795",
    "#00B5D8",
    "#3182CE",
    "#63B3ED",
    "#5A67D8",
    "#805AD5",
    "#9F7AEA",
    "#D53F8C",
    "#F687B3",
    "#718096",
    "#84CC16",
    "#10B981",
    "#F6AD55",
    "#FEB2B2",
  ];

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between relative">
        <h2 className="text-2xl font-bold">Tags management</h2>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setCreatingTag(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="flex items-center gap-1 px-3 py-0.5 rounded-full border border-dashed border-gray-300 dark:border-zinc-600 bg-gray-100/20 dark:bg-zinc-800/20 cursor-pointer hover:bg-gray-200/40 dark:hover:bg-zinc-700/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create new tag
        </button>

        {creatingTag && !loadingGetTags && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTag();
            }}
            className="flex items-center gap-1 py-0.5 rounded-full border border-dashed border-gray-300 dark:border-zinc-600 bg-gray-100/20 dark:bg-zinc-800/20 transition-colors"
            style={{ borderColor: newTagForm.color }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Tag name"
              className="outline-none px-3"
              value={newTagForm.name}
              onChange={(e) =>
                setNewTagForm({ ...newTagForm, name: e.target.value })
              }
            />

            <ul className="flex items-center pr-1">
              {/** Color */}
              <li className="flex items-center gap-1 relative">
                {/** Color selected arriba del input */}
                {onColorSelected && creatingTag && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg z-50 grid grid-cols-10 gap-1.5 w-max">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className="w-5 h-5 rounded-full border-2 border-transparent hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setNewTagForm({ ...newTagForm, color: color });
                          setOnColorSelected(false);
                        }}
                      />
                    ))}
                  </div>
                )}
                <button
                  className="relative p-1 cursor-pointer group"
                  aria-label="Seleccionar color"
                  type="button"
                  onClick={() => setOnColorSelected(!onColorSelected)}
                >
                  <PaintbrushVertical className="w-4 h-4" />
                  <div className="absolute inset-0 w-full h-full bg-gray-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                </button>
              </li>

              {/** Save */}
              <li className="flex items-center gap-1">
                <button
                  className="relative p-1 cursor-pointer group disabled:cursor-not-allowed"
                  aria-label="Guardar tag"
                  type="submit"
                  disabled={loadingCreateTag}
                >
                  {loadingCreateTag ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <div className="absolute inset-0 w-full h-full bg-gray-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                </button>
              </li>

              {/** Cancel */}
              <li className="flex items-center gap-1">
                <button
                  className="relative p-1 cursor-pointer group"
                  aria-label="Cancelar"
                  type="button"
                  onClick={() => {
                    setCreatingTag(false);
                    setNewTagForm({ name: "", color: "" });
                  }}
                >
                  <Plus className="w-4 h-4 rotate-45" />
                  <div className="absolute inset-0 w-full h-full bg-gray-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                </button>
              </li>
            </ul>
          </form>
        )}

        {tags.map((tag) => (
          <div
            key={tag.id}
            className="group flex items-center py-0.5 rounded-full border border-dashed transition-transform gap-1"
            style={{
              color: tag.color,
              backgroundColor: tag.color + "20",
              borderColor: tag.color + "50",
            }}
          >
            <span className="pl-3 pr-1">{tag.name}</span>

            <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-300">
              <div className="overflow-hidden flex items-center pr-1">
                <button
                  className="relative p-1 cursor-pointer group/btn"
                  aria-label="Editar tag"
                >
                  <Pencil className="w-4 h-4" />
                  <div
                    className="absolute inset-0 rounded-full scale-0 group-hover/btn:scale-100 transition-transform"
                    style={{ backgroundColor: tag.color + "30" }}
                  />
                </button>

                <button
                  className="relative p-1 cursor-pointer group/btn"
                  aria-label="Eliminar tag"
                >
                  <Trash className="w-4 h-4" />
                  <div
                    className="absolute inset-0 rounded-full scale-0 group-hover/btn:scale-100 transition-transform"
                    style={{ backgroundColor: tag.color + "30" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loadingGetTags ? (
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-500 dark:text-gray-400" />
      ) : (
        tags.length < 1 && (
          <div className="flex flex-col w-full items-center text-gray-500 dark:text-gray-400">
            <FolderOpen />
            <p>No tags</p>
          </div>
        )
      )}
    </div>
  );
}
