import AsideMain from "@/components/app/AsideMain";
import HeaderMain from "@/components/app/HeaderMain";
import ToggleTheme from "@/components/ToggleTheme";
import { TasksProvider } from "@/contexts/TasksContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <TasksProvider>
        <ToggleTheme />
        <div className="flex min-h-screen max-w-7xl mx-auto gap-12">
          <AsideMain />
          {/* <HeaderMain /> */}
          {children}
        </div>
      </TasksProvider>
    </main>
  );
}
