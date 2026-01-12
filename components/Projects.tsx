"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone } from "lucide-react";
import TitleText from "./Title";
import { useFetchProjects } from "@/app/hooks/useProjects";
import { ProjectItem } from "./ProjectItem";
import { WaterDrop } from "./WaterDrop";
import { motion, useInView } from "framer-motion";
import { Project } from "@/types/data";
import { dummyProjects } from "@/app/page";
import BentoProjectsGrid from "./bentoui";

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState<"web" | "mobile">("web");
  const [iconSize, setIconSize] = useState(22);
  const [isLg, setIsLg] = useState(false);

  const { data: projects, isLoading } = useFetchProjects();

  const tabs = [
    { key: "web", icon: <Monitor size={iconSize} /> },
    { key: "mobile", icon: <Smartphone size={iconSize} /> },
  ];

  // Responsive icon size & screen detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setIconSize(18);
      else if (window.innerWidth < 1024) setIconSize(20);
      else setIconSize(22);

      setIsLg(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter projects
  const filteredProjects = projects?.filter((p: Project) =>
    activeTab === "web" ? p.category === "web" : p.category === "app"
  );

  // Ref & InView for scroll trigger
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div className="mt-20 lg:mt-32 px-4 sm:px-6 lg:px-0" ref={containerRef}>
      {/* Title */}
      <div className="flex justify-center lg:justify-end ">
        <TitleText direction="column">FEATURED _PROJECTS_</TitleText>
      </div>

      {/* Tabs */}
      {/* <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12 relative flex-wrap">
        {tabs.map(({ key, icon }) => {
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as "web" | "mobile")}
              className="relative w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center"
            >
              {isActive && (
                <WaterDrop layoutId="water-drop" isActive={isActive}>
                  {icon}
                </WaterDrop>
              )}

              {!isActive && (
                <span className="relative z-10 text-gray-400 hover:text-white transition-colors">
                  {icon}
                </span>
              )}
            </button>
          );
        })}
      </div> */}

      {/* Projects Grid
      {isInView && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {isLoading && <p className="text-gray-400">Loading projects...</p>}
          {!isLoading && filteredProjects?.length === 0 && (
            <p className="text-gray-400">No projects found.</p>
          )}
          {!isLoading &&
            filteredProjects?.map((project: Project, index: number) => {
              // Animation based on screen size
              const animationProps = isLg
                ? index % 2 === 0
                  ? { x: [-50, 0], opacity: [0, 1] } // left → right
                  : { x: [50, 0], opacity: [0, 1] } // right → left
                : { y: [50, 0], opacity: [0, 1] }; // bottom → top for mobile

              return (
                <motion.div
                  key={project.id}
                  whileInView={animationProps}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                >
                  <ProjectItem
                    title={project.title||""}
                    description={project.description||""}
                    thumbnail={project.thumbnail||""}
                    live_url={project.live_url||""}
                    github_url={project.github_url||""}
                  />
                </motion.div>
              );
            })}
        </div>
      )} */}

      <BentoProjectsGrid projects={dummyProjects} />
    </div>
  );
};

export default ProjectSection;
