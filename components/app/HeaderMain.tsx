"use client";
import Image from "next/image";
import { useState } from "react";
import { User, Image as ImageIcon } from "lucide-react";

export default function HeaderMain() {
  const [profileError, setProfileError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  return (
    <header className="w-full max-h-[250px] relative select-none">
      <div className="absolute w-28 aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-full bottom-0 left-14 transform translate-y-1/2 z-10 ring-6 ring-white dark:ring-neutral-950 overflow-hidden">
        {!profileError ? (
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={128}
            height={128}
            priority
            className="w-full h-full object-cover rounded-full"
            onError={() => setProfileError(true)}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <User className="w-16 h-16 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}
      </div>
      <div className="relative w-full h-full overflow-hidden max-h-[250px] rounded-b-4xl flex items-center justify-center">
        {!bannerError ? (
          <Image
            src="/images/banner2.jpg"
            alt="Banner principal"
            width={851}
            height={315}
            className="w-full h-auto object-cover"
            priority
            onError={() => setBannerError(true)}
          />
        ) : (
          <div className="w-full h-[250px] bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center">
            <ImageIcon className="w-20 h-20 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}
      </div>
    </header>
  );
}
