// bento-grid.tsx
"use client"; //

import React, { useState } from "react"; //
import { motion, Variants, AnimatePresence } from "framer-motion"; //
import { ChevronsRight } from "lucide-react"; //
import { ProjectCard } from "./project-card"; //
import ProjectModal from "./project-modal"; //

export type Project = {
  //
  id: string; //
  title: string; //
  description: string; //
  category: "web" | "app"; //
  github_url: string; //
  live_url: string; //
  is_featured: boolean; //
  thumbnail: string; //
  skills: {
    //
    skill: {
      //
      id: string; //
      name: string; //
      image_url: string; //
    }; //
  }[]; //
  images: {
    //
    id: string; //
    url: string; //
  }[]; //
  created_at: string; //
  updated_at: string; //
}; //

interface BentoProjectsGridProps {
  //
  projects: Project[]; //
  onAllProjectsClick?: () => void; //
} //

export default function BentoProjectsGrid({
  //
  projects, //
  onAllProjectsClick, //
}: BentoProjectsGridProps) {
  //
  // Slice to 5 to match your rendering logic, though type says up to 7
  const items = projects.slice(0, 5); //

  // Add state to manage selected project
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); //

  const variants: Variants = {
    //
    fromLeft: { opacity: 0, x: -100 }, //
    fromRight: { opacity: 0, x: 100 }, //
    fromTop: { opacity: 0, y: -100 }, //
    fromBottom: { opacity: 0, y: 100 }, //
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } }, //
  }; //

  return (
    //
    <>
      //
      <div className="relative grid grid-cols-[30%_70%] mt-20 rounded-2xl w-full h-[800px] overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="grid grid-rows-[20%_50%_30%] pr-4 h-full min-h-0">
          <div className="min-h-0">
            {items[5] ? ( // Render the fifth project if it exists
              <ProjectCard
                project={items[5]}
                variants={variants}
                initial="fromRight"
                whileInView="visible"
                onClick={() => setSelectedProject(items[5])} // Set selected project
              />
            ) : (
              <Placeholder />
            )}
          </div>

          <div className="min-h-0">
            {items[3] ? ( // Render the third project if it exists
              <ProjectCard
                project={items[3]}
                className="py-4"
                variants={variants}
                initial="fromLeft"
                whileInView="visible"
                onClick={() => setSelectedProject(items[3])} // Set selected project
              />
            ) : (
              <Placeholder />
            )}
          </div>

          <div className="min-h-0">
            {items[1] ? ( // Render the first project if it exists
              <ProjectCard
                project={items[1]}
                variants={variants}
                initial="fromLeft"
                whileInView="visible"
                onClick={() => setSelectedProject(items[1])} // Set selected project
              />
            ) : (
              <Placeholder />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid grid-rows-[40%_60%] h-full min-h-0">
          <div className="min-h-0">
            {items[0] ? ( // Render the first project if it exists
              <ProjectCard
                project={items[0]}
                className="pb-4"
                variants={variants}
                initial="fromTop"
                whileInView="visible"
                onClick={() => setSelectedProject(items[0])} // Set selected project
              />
            ) : (
              <Placeholder />
            )}
          </div>

          <div className="grid grid-cols-[65%_35%] h-full min-h-0">
            <div className="grid grid-rows-[100%] pr-5 h-full min-h-0">
              <div className="min-h-0">
                {items[4] ? ( // Render the fourth project if it exists
                  <ProjectCard
                    project={items[4]}
                    className="pb-4"
                    variants={variants}
                    initial="fromBottom"
                    whileInView="visible"
                    onClick={() => setSelectedProject(items[4])} // Set selected project
                  />
                ) : (
                  <Placeholder />
                )}
              </div>
            </div>

            <div className="grid grid-rows-[70%_30%] h-full min-h-0 gap-4">
              <div className="min-h-0">
                {items[2] ? ( // Render the second project if it exists
                  <ProjectCard
                    project={items[2]}
                    className="pb-4"
                    variants={variants}
                    initial="fromRight"
                    whileInView="visible"
                    onClick={() => setSelectedProject(items[2])} // Set selected project
                  />
                ) : (
                  <Placeholder />
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-gradient-to-tr from-cyan-400 via-velvet-800 to-gray-700 gap-4 cursor-pointer flex items-center justify-center p-4 min-h-0 shadow-lg text-white"
                onClick={onAllProjectsClick}
              >
                <span className="font-semibold text-2xl">All Projects</span>
                <ChevronsRight className="w-14 h-14" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      {/* Include the ProjectModal component and handle its visibility */}
      <AnimatePresence>
        //
        {selectedProject && ( //
          <ProjectModal //
            project={selectedProject} //
            onClose={() => setSelectedProject(null)} // Clear selected project
          /> //
        )}
        //
      </AnimatePresence>
      //
    </>
    //
  ); //
} //

function Placeholder() {
  //
  return (
    //
    <div className="rounded-2xl border border-gray-700 bg-gray-900 flex items-center justify-center text-sm text-gray-500 min-h-0 h-full w-full italic">
      //
      Coming Soon //
    </div>
    //
  ); //
} //