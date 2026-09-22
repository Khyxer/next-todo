"use client";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50">
      <button onClick={() => setTheme("light")}>
        <span>☀️</span>
      </button>
      <button onClick={() => setTheme("dark")}>
        <span>🌙</span>
      </button>
    </div>
  );
}
