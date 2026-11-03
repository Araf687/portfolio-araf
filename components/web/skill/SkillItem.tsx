"use client";

import { Skill } from "@/types/data";
import Image from "next/image";
import { useState } from "react";

const SkillItem = ({ skill, index }: { skill: Skill; index: number }) => {
  const [logoFailed, setLogoFailed] = useState(!skill.image_url);

  return (
    <div className="group relative flex items-center gap-4 overflow-hidden border-b border-border px-1 py-3 transition-colors duration-300 hover:text-on-accent sm:gap-8 lg:py-4">
      {/* Accent wipe on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      <span className="relative w-6 font-mono text-xs text-muted transition-colors group-hover:text-on-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      <p className="relative flex-1 font-display text-2xl uppercase transition-transform duration-300 ease-out group-hover:translate-x-3 lg:text-4xl">
        {skill.name}
      </p>

      <span className="relative hidden font-mono text-xs uppercase tracking-wider text-muted transition-colors group-hover:text-on-accent sm:block">
        {skill.category}
      </span>

      {/* Remote SVG logos can't go through the image optimizer */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
        {logoFailed ? (
          <span className="font-display text-xl text-black">{skill.name?.[0]}</span>
        ) : (
          <Image
            src={skill.image_url!}
            alt=""
            width={40}
            height={40}
            unoptimized
            onError={() => setLogoFailed(true)}
            className="h-full w-full object-contain"
          />
        )}
      </span>
    </div>
  );
};

export default SkillItem;
