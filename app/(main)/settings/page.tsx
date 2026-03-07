import { MonitorDot, Moon, Plus, Settings, Sun } from "lucide-react";
import TagsSettings from "./TagsSettings";
import AppearanceSelector from "./AppearanceSelector";

export default function SettingsPage() {
  const appearanceOptions = [
    {
      label: "System",
      value: "system",
      icon: MonitorDot,
    },
    {
      label: "Light",
      value: "light",
      icon: Sun,
    },
    {
      label: "Dark",
      value: "dark",
      icon: Moon,
    },
  ];

  return (
    <main className=" w-full">
      <header className="flex items-center pt-7 justify-between px-4 pb-5 border-b border-gray-200 dark:border-zinc-700 w-full sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800">
            <Settings className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <button className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 opacity-70 rounded-lg">
          Apply changes
        </button>
      </header>

      <div className="max-w-4xl mx-auto w-full p-4 pt-8 space-y-16">
        <TagsSettings />

        {/* <div className="space-y-5">
          <h2 className="text-2xl font-bold">Appearance</h2>
          <div className="flex gap-4">
            {appearanceOptions.map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center justify-center gap-2 border rounded-lg w-24 h-20 select-none cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <option.icon />
                {option.label}
              </div>
            ))}
          </div>
        </div> */}
        <AppearanceSelector />
      </div>
    </main>
  );
}
