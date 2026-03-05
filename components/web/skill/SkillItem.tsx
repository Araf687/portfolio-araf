import { Skill } from "@/app/hooks/useSkills";
import Image from "next/image";

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-white rounded-lg shadow-sm">
      <Image
        src={skill.image_url || "/placeholder.png"}
        alt="logo"
        width={40}
        height={40}
        className="rounded-lg border object-contain w-9 h-9 sm:w-[50px] sm:h-[50px]"
      />

      <div>
        <p className="font-semibold text-xs sm:text-base lg:text-xl tracking-wide">
          {skill.name}
        </p>
        <p className="text-gray-400 text-[10px] sm:text-sm">{skill.category}</p>
      </div>
    </div>
  );
};

export default SkillItem;
