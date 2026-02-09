import CardFormAuth from "@/app/auth/components/CardFormAuth";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CardFormAuth isLogin={false} />
    </div>
  );
}
