import AsideMain from "@/components/app/AsideMain";
import MobileNav from "@/components/app/MobileNav";
import { TasksProvider } from "@/contexts/TasksContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <TasksProvider>
        <MobileNav />
        <div className="flex min-h-screen max-w-7xl mx-auto gap-12 px-4 sm:px-6 xl:px-0">
          <AsideMain />
          {children}
        </div>
      </TasksProvider>
    </main>
  );
}
