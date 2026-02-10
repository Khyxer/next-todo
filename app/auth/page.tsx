"use client";

import CardFormAuth from "@/app/auth/components/CardFormAuth";
import { useAuthForm } from "@/hooks/auth/useAuthForm";

// Auth es el login
export default function Auth() {
  const {
    loginHandleSubmit,
    isLoading,
    loginFormData,
    setLoginFormData,
    error,
  } = useAuthForm();
  return (
    <div className="flex items-center justify-center h-screen">
      <CardFormAuth
        isLogin={true}
        onSubmit={loginHandleSubmit}
        isLoading={isLoading}
        formData={loginFormData}
        setFormData={setLoginFormData}
        error={error}
      />
    </div>
  );
}
