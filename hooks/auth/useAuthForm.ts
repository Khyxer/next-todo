"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useRouter } from "next/navigation";

export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo, refreshUserData } = useUserInfo();
  const router = useRouter();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Login
  const loginHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        toast.error(data.message);
        throw new Error(data.message);
      }

      setUserInfo(data.user);

      setError(null);
      toast.success("Login successful");

      setLoginFormData({
        username: "",
        password: "",
      });

      router.push("/");
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Registro
  const registerHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (registerFormData.password !== registerFormData.confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        toast.error(data.message);
        throw new Error(data.message);
      }

      if (data.user) {
        setUserInfo(data.user);
      } else {
        await refreshUserData();
      }

      setError(null);
      toast.success("Registration successful");

      setRegisterFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/");
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logoutHandle = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserInfo(null);

      toast.success("Logout successful");
      router.push("/auth");
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error during logout");
    }
  };

  return {
    isLoading,
    setIsLoading,
    loginFormData,
    setLoginFormData,
    registerFormData,
    setRegisterFormData,
    loginHandleSubmit,
    registerHandleSubmit,
    error,
    setError,
    logoutHandle,
  };
};
