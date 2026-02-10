"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FormInput = ({
  type,
  name,
  id,
  ...props
}: {
  type: "text" | "password" | "email";
  name: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="pb-1">
        {name}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          {...props}
          className={`w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900 duration-150 ${
            type === "password" ? "pr-10" : ""
          } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />

        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => {
              setInputType(inputType === "password" ? "text" : "password");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            {inputType === "password" ? (
              <Eye className="size-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <EyeOff className="size-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

type LoginFormData = {
  username: string;
  password: string;
};

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type CardFormAuthProps = {
  isLoading: boolean;
  error: string | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & (
  | {
      isLogin: true;
      formData: LoginFormData;
      setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
    }
  | {
      isLogin: false;
      formData: RegisterFormData;
      setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
    }
);

export default function CardFormAuth(props: CardFormAuthProps) {
  const { isLogin, onSubmit, isLoading, error, formData, setFormData } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 max-w-sm w-full px-5 py-4 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700"
    >
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-medium">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isLogin
            ? "Enter your username and password below to login to your account"
            : "Complete the form below to create a new account"}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <FormInput
          type="text"
          name="Username"
          id="username"
          disabled={isLoading}
          value={formData.username}
          onChange={(e) => {
            if (isLogin) {
              setFormData({ ...formData, username: e.target.value });
            } else {
              setFormData({ ...formData, username: e.target.value });
            }
          }}
        />
        {!isLogin && (
          <FormInput
            type="email"
            name="Email"
            id="email"
            disabled={isLoading}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        )}
        <FormInput
          type="password"
          name="Password"
          id="password"
          disabled={isLoading}
          value={formData.password}
          onChange={(e) => {
            if (isLogin) {
              setFormData({ ...formData, password: e.target.value });
            } else {
              setFormData({ ...formData, password: e.target.value });
            }
          }}
        />
        {!isLogin && (
          <FormInput
            type="password"
            name="Confirm Password"
            id="confirm-password"
            disabled={isLoading}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}
      </section>

      <footer className="flex flex-col gap-4 mt-3">
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 dark:disabled:hover:bg-white"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">Loading...</span>
              <Loader2 className="animate-spin" />
            </div>
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isLogin ? "/auth/signup" : "/auth"}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </p>
      </footer>
    </form>
  );
}
