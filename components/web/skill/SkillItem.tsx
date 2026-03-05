"use client";

import { Skill } from "@/app/hooks/useSkills";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

const SkillItem = ({ skill }: { skill: Skill }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-foreground rounded-lg">
      <Image
        src={skill.image_url || "/placeholder.png"}
        alt="logo"
        width={40}
        height={40}
        className={`rounded-lg object-contain w-9 h-9 sm:w-[50px] sm:h-[50px] ${
          isDark ? "border border-border/60" : "border-0"
        }`}
      />

      <div>
        <p className="font-semibold text-xs sm:text-base lg:text-xl tracking-wide">
          {skill.name}
        </p>
        <p className="text-muted text-[10px] sm:text-sm">{skill.category}</p>
      </div>
    </div>
  );
};

export default SkillItem;
