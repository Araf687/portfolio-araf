"use client";

import SkillItem from "./SkillItem";
import SectionHeading from "../SectionHeading";
import { useFetchSkills } from "@/app/hooks/useSkills";
import { motion } from "framer-motion";
import { Skill } from "@/types/data";

const Skills = () => {
  const { data: skills, isLoading } = useFetchSkills();

  return (
    <section className="px-6 pb-28 lg:px-12 xl:px-20 lg:pb-48">
      <SectionHeading index="02" aside="Toolkit">
        Skills
      </SectionHeading>

      {isLoading ? (
        <div className="space-y-px" aria-label="Loading skills">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="h-20 animate-pulse bg-surface" />
          ))}
        </div>
      ) : skills && skills.length > 0 ? (
        <motion.ul
          className="border-t border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
        >
          {skills.map((skill: Skill, index: number) => (
            <motion.li
              key={skill.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SkillItem skill={skill} index={index} />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-muted">No skills found.</p>
      )}
    </section>
  );
};

export default Skills;
