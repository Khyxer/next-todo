import {
  HomeIcon,
  Info,
  ListTodoIcon,
  LogOut,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

export const MENU_NAV = [
  {
    icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    icon: PlusIcon,
    label: "New Task",
    href: "/task",
  },
  {
    icon: ListTodoIcon,
    label: "Tasks",
    href: "/tasks",
  },
  {
    icon: UserIcon,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: Info,
    label: "About",
    href: "/about",
  },
  {
    icon: LogOut,
    label: "Logout",
    href: "/logout",
  },
];
