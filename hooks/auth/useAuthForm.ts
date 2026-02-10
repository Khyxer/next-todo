"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Test
  const testData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginFormData, "loginFormData");
    console.log(registerFormData, "registerFormData");
  };

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
      // console.log(data);

      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message);
      }

      setError(null);

      toast.success("Login successful, redirecting...");

      window.location.href = "/";
      // limpiar el formulario
      setLoginFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }

    // console.log("loginHandleSubmit");
    // console.log(loginFormData);
  };

  // Registro
  const registerHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message);
      }

      setError(null);

      toast.success("Registration successful, redirecting...");

      window.location.href = "/";

      // limpiar el formulario
      setRegisterFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }

    // console.log("registerHandleSubmit");
    // console.log(registerFormData);
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
      // console.log(data);

      if (!response.ok) {
        // setError(data.message);
        throw new Error(data.message);
      }

      // setError(null);

      // toast.success("Logout successful, redirecting...");
      window.location.href = "/auth";
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return {
    isLoading,
    setIsLoading,
    loginFormData,
    setLoginFormData,
    registerFormData,
    setRegisterFormData,
    testData,
    loginHandleSubmit,
    registerHandleSubmit,
    error,
    setError,
    logoutHandle,
  };
};
