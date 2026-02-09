"use client";

import Image from "next/image";

export default function HeaderMain() {
  return (
    <header className="w-full max-h-[250px] relative">
      <div className="absolute w-28 aspect-square bg-black rounded-full bottom-0 left-14 transform translate-y-1/2 z-10 ring-6 ring-white dark:ring-neutral-950">
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          width={128}
          height={128}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="relative w-full h-full overflow-hidden  flex items-center justify-center rounded-b-4xl">
        <Image
          src="/images/banner2.jpg"
          alt="Banner principal"
          width={851}
          height={315}
          className="w-full h-auto object-cover"
          priority // Carga la imagen inmediatamente (bueno para banners)
        />
      </div>
    </header>
  );
}
