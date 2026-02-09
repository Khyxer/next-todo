import CardFormAuth from "@/app/auth/components/CardFormAuth";

export default function Auth() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CardFormAuth isLogin={true} />
    </div>
  );
}
