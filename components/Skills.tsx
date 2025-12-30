import { prisma } from "@/lib/db";
import TitleText from "./Title";
import { useFetchSkills } from "@/app/hooks/useSkills";

const Skills = () => {
    const { data: skills, isLoading } = useFetchSkills();
      console.log({ skills, isLoading });

    return ( <div className="mt-20 lg:mt-30">
        <TitleText direction="row">CORE SKILLS</TitleText>
    </div> );
}
 
export default Skills;