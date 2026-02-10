import AsideMain from "@/components/app/AsideMain";
import HeaderMain from "@/components/app/HeaderMain";
import ToggleTheme from "@/components/ToggleTheme";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToggleTheme />
      <div className="flex min-h-screen max-w-7xl mx-auto gap-12">
        <AsideMain />
        {/* <HeaderMain /> */}
        {children}
      </div>
    </>
  );
}
