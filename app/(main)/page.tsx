"use client";
import HeaderMain from "@/components/app/HeaderMain";
import { Calendar } from "lucide-react";
import { useUserInfo } from "@/contexts/UserInfoContext";

export default function Home() {
  const { userInfo, isLoading } = useUserInfo();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="h-[400vh] w-full">
      <HeaderMain />

      {/* Información del usuario */}
      <div className="flex items-center justify-between gap-2 h-15 pl-46 ">
        {/** Información general */}
        <div>
          {isLoading ? (
            <div className="w-46 h-8 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
          ) : (
            <h2 className="text-3xl font-semibold">{userInfo?.username}</h2>
          )}
        </div>
        {isLoading ? (
          <div className="w-60 h-7 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-neutral-400">
            <Calendar className="w-4 h-4" />
            <p>Account created on {formatDate(userInfo?.created_at)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
