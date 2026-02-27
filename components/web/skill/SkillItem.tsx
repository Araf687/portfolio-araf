import { Skill } from "@/app/hooks/useSkills";
import Image from "next/image";

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-white rounded-lg shadow-sm">
      
      <Image
  src={skill.image_url || "/placeholder.png"}
  alt="logo"
  width={60}
  height={60}
  className="rounded-lg border object-contain sm:w-[50px] sm:h-[50px]"
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
