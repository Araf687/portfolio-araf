import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export type Project = {
  id: string | number;
  title: string;
  thumbnail: string;
};

interface BentoProjectsGridProps {
  projects: Project[]; // up to 7 projects
  onAllProjectsClick?: () => void;
}

export default function BentoProjectsGrid({
  projects,
  onAllProjectsClick,
}: BentoProjectsGridProps) {
  const items = projects.slice(0, 7);

  // Variants for different directions
  const variants = {
    fromLeft: { opacity: 0, x: -100 },
    fromRight: { opacity: 0, x: 100 },
    fromTop: { opacity: 0, y: -100 },
    fromBottom: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid grid-cols-[30%_70%] mt-20 rounded-2xl w-full h-[800px]">
      {/* LEFT COLUMN */}
      <div className="grid grid-rows-[18%_52%_30%] pr-4 h-full min-h-0">
        {/* Top card - All Projects */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-gray-800 text-white flex flex-col items-center justify-center min-h-0"
          onClick={onAllProjectsClick}
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-semibold text-sm">All Projects</span>
        </motion.button>

        {/* Middle card - from left */}
        <div className="min-h-0">
          {items[0] ? (
            <ProjectCard
              project={items[0]}
              className="py-4"
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
            />
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Bottom card - from left */}
        <div className="min-h-0">
          {items[1] ? (
            <ProjectCard
              project={items[1]}
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
            />
          ) : (
            <Placeholder />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="grid grid-rows-[40%_60%] h-full min-h-0">
        {/* Top card - from top */}
        <div className="min-h-0">
          {items[2] ? (
            <ProjectCard
              project={items[2]}
              className="pb-4"
              variants={variants}
              initial="fromTop"
              whileInView="visible"
            />
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Bottom area – 4 cards in 2 columns */}
        <div className="grid grid-cols-[65%_35%] h-full min-h-0">
          {/* Column 1 – two cards */}
          <div className="grid grid-rows-[60%_40%] pr-5 h-full min-h-0">
            {/* Row 1 – from bottom */}
            <div className="min-h-0">
              {items[3] ? (
                <ProjectCard
                  project={items[3]}
                  className="pb-4"
                  variants={variants}
                  initial="fromBottom"
                  whileInView="visible"
                />
              ) : (
                <Placeholder />
              )}
            </div>
            {/* Row 2 – from bottom */}
            <div className="min-h-0">
              {items[4] ? (
                <ProjectCard
                  project={items[4]}
                  variants={variants}
                  initial="fromBottom"
                  whileInView="visible"
                />
              ) : (
                <Placeholder />
              )}
            </div>
          </div>

          {/* Column 2 – two cards */}
          <div className="grid grid-rows-[35%_65%] h-full min-h-0">
            {/* Row 1 – from right */}
            <div className="min-h-0">
              {items[5] ? (
                <ProjectCard
                  project={items[5]}
                  variants={variants}
                  initial="fromRight"
                  whileInView="visible"
                />
              ) : (
                <Placeholder />
              )}
            </div>
            {/* Row 2 – from right */}
            <div className="min-h-0">
              {items[6] ? (
                <ProjectCard
                  project={items[6]}
                  className="pt-4"
                  variants={variants}
                  initial="fromRight"
                  whileInView="visible"
                />
              ) : (
                <Placeholder />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cards ---------- */

function ProjectCard({
  project,
  className,
  variants,
  initial,
  whileInView,
}: {
  project: Project;
  className?: string;
  variants?: any;
  initial?: string;
  whileInView?: string;
}) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={`h-full ${className} min-h-0`}
    >
      <div className="relative w-full border border-gray-200 border-2 h-full overflow-hidden rounded-2xl group">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-3 transition">
          <span className="text-white text-sm font-medium">{project.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Placeholder() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-xs text-muted-foreground min-h-0">
      Coming Soon
    </div>
  );
}
