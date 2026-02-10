"use client";

import CardFormAuth from "@/app/auth/components/CardFormAuth";
import { useAuthForm } from "@/hooks/auth/useAuthForm";

export default function Register() {
  const {
    registerHandleSubmit,
    isLoading,
    registerFormData,
    setRegisterFormData,
    error,
  } = useAuthForm();
  return (
    <div className="flex items-center justify-center h-screen">
      <CardFormAuth
        isLogin={false}
        onSubmit={registerHandleSubmit}
        isLoading={isLoading}
        formData={registerFormData}
        setFormData={setRegisterFormData}
        error={error}
      />
    </div>
  );
}
