"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const FormInput = ({
  type,
  name,
  id,
}: {
  type: "text" | "password" | "email";
  name: string;
  id: string;
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{name}</label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          className={`w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-neutral-900 duration-150 ${
            type === "password" ? "pr-10" : ""
          }`}
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

export default function CardFormAuth({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="flex flex-col gap-4 max-w-sm w-full px-5 py-4 rounded-xl bg-white border border-gray-300 dark:bg-neutral-900 dark:border-zinc-700">
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
        <FormInput type="text" name="Username" id="username" />
        {!isLogin && <FormInput type="email" name="Email" id="email" />}
        <FormInput type="password" name="Password" id="password" />
        {!isLogin && (
          <FormInput
            type="password"
            name="Confirm Password"
            id="confirm-password"
          />
        )}
      </section>

      <footer className="flex flex-col gap-4 mt-3">
        <button
          type="submit"
          className="w-full px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400 dark:focus:ring-offset-black"
        >
          {isLogin ? "Login" : "Sign Up"}
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
    </div>
  );
}
