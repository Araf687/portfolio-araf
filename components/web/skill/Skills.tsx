"use client";

import SkillItem from "./SkillItem";
import TitleText from "../../Title";
import { useFetchSkills } from "@/app/hooks/useSkills";
import { motion } from "framer-motion";

const Skills = () => {
  const { data: skills, isLoading } = useFetchSkills();

  if (isLoading)
    return <p className="mt-10 text-center text-gray-400">Loading skills...</p>;

  return (
    <div className="mt-24 lg:mt-0 lg:mt-32 px-4 sm:px-6 lg:px-0">
      <TitleText direction="column">TECHNICAL SKILLS</TitleText>

      <motion.div
        className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {skills && skills.length > 0 ? (
          skills.map((skill: any) => (
            <motion.div
              key={skill.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SkillItem skill={skill} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No skills found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Skills;
