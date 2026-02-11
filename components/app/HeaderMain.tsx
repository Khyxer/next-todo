"use client";
import Image from "next/image";
import { useState } from "react";
import { User, Image as ImageIcon } from "lucide-react";
import { useUserInfo } from "@/contexts/UserInfoContext";

export default function HeaderMain() {
  const { userInfo, isLoading } = useUserInfo();

  const [profileError, setProfileError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);
  const [bannerImageLoaded, setBannerImageLoaded] = useState(false);

  return (
    <header className="w-full max-h-[250px] relative select-none">
      {/* Profile Picture */}
      <div className="absolute w-28 aspect-square rounded-full bottom-0 left-14 transform translate-y-1/2 z-10 ring-6 ring-white dark:ring-neutral-950 overflow-hidden">
        <div className="relative w-full h-full">
          {(isLoading || !profileImageLoaded) && !profileError && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
              <User className="w-16 h-16 text-neutral-300 dark:text-neutral-700" />
            </div>
          )}

          {!isLoading && !profileError && (
            <Image
              src={userInfo?.profilePicture}
              alt="Profile"
              width={128}
              height={128}
              priority
              className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${
                profileImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setProfileImageLoaded(true)}
              onError={() => setProfileError(true)}
            />
          )}

          {profileError && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <User className="w-16 h-16 text-neutral-400 dark:text-neutral-600" />
            </div>
          )}
        </div>
      </div>

      {/* Banner */}
      <div className="relative w-full h-[250px] overflow-hidden rounded-b-4xl">
        {(isLoading || !bannerImageLoaded) && !bannerError && (
          <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
            <ImageIcon className="w-20 h-20 text-neutral-400 dark:text-neutral-700" />
          </div>
        )}

        {!isLoading && !bannerError && (
          <Image
            src={userInfo?.bannerPicture}
            alt="Banner principal"
            width={851}
            height={315}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              bannerImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoad={() => setBannerImageLoaded(true)}
            onError={() => setBannerError(true)}
          />
        )}

        {bannerError && (
          <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center">
            <ImageIcon className="w-20 h-20 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}
      </div>
    </header>
  );
}
