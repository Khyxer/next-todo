"use client";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

export default function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Toaster
      toastOptions={{
        style: {
          background: isDark ? "#171717" : "#fafafa",
          color: isDark ? "#e5e5e5" : "#171717",
          border: `1px solid ${isDark ? "#262626" : "#e5e5e5"}`,
          boxShadow: isDark
            ? "0 4px 6px -1px rgb(0 0 0 / 0.4)"
            : "0 4px 6px -1px rgb(0 0 0 / 0.07)",
        },
        success: {
          iconTheme: {
            primary: "#10b981", // emerald-500
            secondary: isDark ? "#171717" : "#fafafa",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: isDark ? "#171717" : "#fafafa",
          },
        },
      }}
    />
  );
}
