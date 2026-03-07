"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_NAV } from "@/constants/mainMenuNav";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import NewTask from "../NewTask";
import { useState } from "react";

export default function AsideMain() {
  const pathname = usePathname();
  const { logoutHandle } = useAuthForm();

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <aside className="max-w-40 w-full sticky hidden xl:block top-0 h-screen z-20">
      {isNewTaskModalOpen && (
        <NewTask onClose={() => setIsNewTaskModalOpen(false)} />
      )}

      <ul className="flex flex-col py-4 justify-center h-full select-none">
        {MENU_NAV.map((item) => (
          <li key={item.label}>
            {item.label === "Logout" ? (
              <button
                onClick={logoutHandle}
                className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.href === pathname ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-red-950 dark:hover:text-white hover:bg-red-300 hover:text-black"} rounded-full cursor-pointer group duration-200`}
              >
                <item.icon />
                <span className="w-full group-hover:pl-2 duration-200">
                  {item.label}
                </span>
              </button>
            ) : item.label === "New Task" ? (
              <button
                onClick={() => setIsNewTaskModalOpen(true)}
                className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.href === pathname ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-black dark:hover:text-white hover:bg-neutral-200 hover:text-black"} rounded-full cursor-pointer group duration-200`}
              >
                <item.icon />
                <span className="w-full group-hover:pl-2 duration-200">
                  {item.label}
                </span>
              </button>
            ) : (
              <Link
                href={item.href}
                className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.href === pathname ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-black dark:hover:text-white hover:bg-neutral-200 hover:text-black"} rounded-full cursor-pointer group duration-200`}
              >
                <item.icon />
                <span className="w-full group-hover:pl-2 duration-200">
                  {item.label}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
