import {
  HomeIcon,
  Info,
  ListTodoIcon,
  LogOut,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const MENU_NAV = [
  {
    icon: HomeIcon,
    label: "Home",
  },
  {
    icon: PlusIcon,
    label: "New Task",
  },
  {
    icon: ListTodoIcon,
    label: "Tasks",
  },
  {
    icon: UserIcon,
    label: "Profile",
  },
  {
    icon: SettingsIcon,
    label: "Settings",
  },
  {
    icon: Info,
    label: "About",
  },
  {
    icon: LogOut,
    label: "Logout",
  },
];

export default function AsideMain() {
  return (
    <aside className="max-w-40 w-full">
      <ul className="flex flex-col py-4 justify-center h-full">
        {MENU_NAV.map((item) => (
          <li key={item.label}>
            <button
              className={`px-4 py-2 flex items-center gap-2 w-full text-start text-xl font-semibold ${item.label === "Home" ? "dark:bg-white dark:text-black bg-black text-white" : "dark:hover:bg-black dark:hover:text-white hover:bg-neutral-200 hover:text-black"} rounded-full cursor-pointer  group duration-200`}
            >
              <item.icon />
              <span className="w-full group-hover:pl-2 duration-200">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
