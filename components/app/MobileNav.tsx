"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import NavMenu from "./NavMenu";
import NewTask from "../NewTask";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <header className="xl:hidden sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-white/85 dark:bg-neutral-950/85 backdrop-blur border-b border-gray-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold">Next Todo</span>
      </header>

      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-neutral-950/50"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`xl:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-zinc-800 shadow-xl transition-transform duration-200 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-4 h-14 border-b border-gray-200 dark:border-zinc-800 shrink-0">
          <span className="font-semibold">Next Todo</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto py-2">
          <NavMenu
            onNavigate={() => setIsOpen(false)}
            onNewTask={() => {
              setIsOpen(false);
              setIsNewTaskModalOpen(true);
            }}
          />
        </nav>
      </aside>

      {isNewTaskModalOpen && (
        <NewTask onClose={() => setIsNewTaskModalOpen(false)} />
      )}
    </>
  );
}