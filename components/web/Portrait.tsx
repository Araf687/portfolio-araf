"use client";

import Image from "next/image";

// Portrait inside a thin ring
export default function Portrait() {
  return (
    <div className="relative aspect-square h-[min(36svh,72vw)] min-h-52 rounded-full border border-border p-2">
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          src="/profile-cutout.png"
          alt="Portrait of Mohammad Yeasin"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 72vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
