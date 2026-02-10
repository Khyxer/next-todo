"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_NAV } from "@/constants/mainMenuNav";
import { useAuthForm } from "@/hooks/auth/useAuthForm";

export default function AsideMain() {
  const pathname = usePathname();
  const { logoutHandle } = useAuthForm();

  return (
    <aside className="max-w-40 w-full select-none sticky hidden xl:block top-0 h-screen ">
      <ul className="flex flex-col py-4 justify-center h-full">
        {MENU_NAV.map((item) => (
          <li key={item.label}>
            {item.label === "Logout" ? (
              <button
                onClick={logoutHandle}
                className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.href === pathname ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-red-950 dark:hover:text-white hover:bg-red-300 hover:text-black"} rounded-full cursor-pointer  group duration-200`}
              >
                <item.icon />
                <span className="w-full group-hover:pl-2 duration-200">
                  {item.label}
                </span>
              </button>
            ) : (
              <Link
                href={item.href}
                className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.href === pathname ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-black dark:hover:text-white hover:bg-neutral-200 hover:text-black"} rounded-full cursor-pointer  group duration-200`}
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
