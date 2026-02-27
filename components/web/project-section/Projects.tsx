"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone, Loader2 } from "lucide-react"; // Import Loader icon
import TitleText from "../../Title";
import { useFetchProjects } from "@/app/hooks/useProjects";
import { ProjectItem } from "../../ProjectItem";
import { WaterDrop } from "../../WaterDrop";
import { motion, useInView } from "framer-motion";
import { Project } from "@/types/data";
// REMOVE: import { dummyProjects } from "@/app/page"; 
import BentoProjectsGrid from "./bentoui";

const ProjectSection = () => {
  const [activeTab, setActiveTab] = useState<"web" | "mobile">("web");
  const [iconSize, setIconSize] = useState(22);
  const [isLg, setIsLg] = useState(false);

  // Fetch real project data using your hook
  const { data: projects, isLoading, error } = useFetchProjects();
  console.log(projects)

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

  // Filter projects based on active tab
  // const filteredProjects = projects?.filter((p: Project) =>
  //   activeTab === "web" ? p.category === "web" : p.category === "app"
  // );
// const filteredProjects = projects
  // Ref & InView for scroll trigger (if needed for Title)
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-20 lg:mt-60 px-4 sm:px-6 lg:px-0" ref={containerRef}>
      {/* Title */}
      <div className="flex justify-center lg:justify-end ">
        <TitleText direction="column">FEATURED _PROJECTS_</TitleText>
      </div>

      {/* Tabs - Uncommented to allow filtering */}
      <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12 relative flex-wrap">
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
      </div>

      {/* Projects Display Logic */}
      {isLoading ? (
        // Loading State
        <div className="flex flex-col items-center justify-center pt-20 text-gray-500 gap-4">
          <Loader2 className="animate-spin" size={40} />
          <p>Fetching amazing projects...</p>
        </div>
      ) : error ? (
        // Error State
        <div className="text-center pt-20 text-red-500">
          <p>Error loading projects. Please try again later.</p>
        </div>
      ) : projects && projects.length > 0 ? (
        // Success State with Projects
        <BentoProjectsGrid projects={projects as any} />
      ) : (
        // Empty State (No Projects Found)
        <div className="text-center pt-20 text-gray-500">
          <p>No {activeTab === "web" ? "Web" : "Mobile"} projects found.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;