import AsideMain from "@/components/app/AsideMain";
import HeaderMain from "@/components/app/HeaderMain";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto gap-12">
      <AsideMain />
      <HeaderMain />
    </div>
  );
}
