import { Skill } from "@/app/hooks/useSkills";
import Image from "next/image";

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-white rounded-lg shadow-sm">
      
      <Image
        src={
          skill.image_url ||
          "https://avatars.githubusercontent.com/u/6412038?s=200&v=4"
        }
        alt={"logo"}
        width={48}
        height={48}
        className="rounded-lg border sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]"
      />

      <div>
        <p className="font-semibold text-sm sm:text-base lg:text-xl tracking-wide">
          {skill.name}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          {skill.category}
        </p>
      </div>
    </div>
  );
};

export default SkillItem;
