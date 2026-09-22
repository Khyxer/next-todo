"use client";

import { useState } from "react";
import NavMenu from "./NavMenu";
import NewTask from "../NewTask";

export default function AsideMain() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <aside className="max-w-40 w-full hidden xl:block sticky top-0 h-screen z-20">
      {isNewTaskModalOpen && (
        <NewTask onClose={() => setIsNewTaskModalOpen(false)} />
      )}

      <NavMenu
        className="py-4 justify-center h-full"
        onNewTask={() => setIsNewTaskModalOpen(true)}
      />
    </aside>
  );
}