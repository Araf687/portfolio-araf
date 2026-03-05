"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import ProjectModal from "./project-modal";
import { useTheme } from "@/components/ThemeProvider";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: "web" | "app";
  github_url: string;
  live_url: string;
  is_featured: boolean;
  thumbnail: string;
  skills: {
    skill: {
      id: string;
      name: string;
      image_url: string;
    };
  }[];
  images: {
    id: string;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
};

interface BentoProjectsGridProps {
  projects: Project[];
  onAllProjectsClick?: () => void;
}

export default function BentoProjectsGrid({
  projects,
  onAllProjectsClick,
}: BentoProjectsGridProps) {
  const items = projects.slice(0, 6);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const variants: Variants = {
    fromLeft: { opacity: 0, x: -60 },
    fromRight: { opacity: 0, x: 60 },
    fromTop: { opacity: 0, y: -60 },
    fromBottom: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* ================= MOBILE VIEW (UNCHANGED) ================= */}
      <div className="lg:hidden lg:mt-16 mt-10 lg:p-0 p-2 space-y-6">

        {/* Row 1 — 1 Item */}
        {items[0] && (
          <ProjectCard
            project={items[0]}
            variants={variants}
            initial="fromTop"
            whileInView="visible"
            onClick={() => setSelectedProject(items[0])}
          />
        )}

        {/* Row 2 — 2 Items */}
        <div className="grid grid-cols-2 gap-4">
          {items[1] && (
            <ProjectCard
              project={items[1]}
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
              onClick={() => setSelectedProject(items[1])}
            />
          )}
          {items[2] && (
            <ProjectCard
              project={items[2]}
              variants={variants}
              initial="fromRight"
              whileInView="visible"
              onClick={() => setSelectedProject(items[2])}
            />
          )}
        </div>

        {/* Row 3 — 2 Items */}
        <div className="grid grid-cols-2 gap-4">
          {items[3] && (
            <ProjectCard
              project={items[3]}
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
              onClick={() => setSelectedProject(items[3])}
            />
          )}
          {items[4] && (
            <ProjectCard
              project={items[4]}
              variants={variants}
              initial="fromRight"
              whileInView="visible"
              onClick={() => setSelectedProject(items[4])}
            />
          )}
        </div>

        {/* Row 4 — 1 Item */}
        {items[5] && (
          <ProjectCard
            project={items[5]}
            variants={variants}
            initial="fromBottom"
            whileInView="visible"
            onClick={() => setSelectedProject(items[5])}
          />
        )}

        {/* Explore Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`group relative rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center p-8 backdrop-blur-md ${
            isDark
              ? "border border-border/60 bg-surface/70"
              : "border-2 border-gray-400 bg-surface/80"
          }`}
          onClick={onAllProjectsClick}
        >
          <span className="font-bold text-lg tracking-widest text-foreground">
            EXPLORE ALL
          </span>
        </motion.div>
      </div>

      {/* ================= DESKTOP BENTO (REDUCED HEIGHT) ================= */}
      <div
        className="
          hidden lg:grid
          relative
          mt-20
          rounded-2xl
          w-full
          h-[650px]          /* Height reduced from 800px */
          grid-cols-[30%_65%]
          gap-6             /* Using gap for spacing between cards */
          p-1               /* Slight padding so borders aren't clipped */
        "
      >
        {/* LEFT COLUMN */}
        <div className="grid grid-rows-[18%_50%_26%] h-full gap-6">
          {items[5] ? (
            <ProjectCard
              project={items[5]}
              variants={variants}
              initial="fromRight"
              whileInView="visible"
              onClick={() => setSelectedProject(items[5])}
            />
          ) : (
            <Placeholder />
          )}

          {items[3] ? (
            <ProjectCard
              project={items[3]}
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
              onClick={() => setSelectedProject(items[3])}
            />
          ) : (
            <Placeholder />
          )}

          {items[1] ? (
            <ProjectCard
              project={items[1]}
              variants={variants}
              initial="fromLeft"
              whileInView="visible"
              onClick={() => setSelectedProject(items[1])}
            />
          ) : (
            <Placeholder />
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid grid-rows-[38%_58%] h-full gap-6">
          {items[0] ? (
            <ProjectCard
              project={items[0]}
              variants={variants}
              initial="fromTop"
              whileInView="visible"
              onClick={() => setSelectedProject(items[0])}
            />
          ) : (
            <Placeholder />
          )}

          <div className="grid grid-cols-[65%_35%] h-full gap-6">
            <div className="h-full">
              {items[4] ? (
                <ProjectCard
                  project={items[4]}
                  variants={variants}
                  initial="fromBottom"
                  whileInView="visible"
                  onClick={() => setSelectedProject(items[4])}
                />
              ) : (
                <Placeholder />
              )}
            </div>

            <div className="grid grid-rows-[65%_30%] h-full gap-6">
              {items[2] ? (
                <ProjectCard
                  project={items[2]}
                  variants={variants}
                  initial="fromRight"
                  whileInView="visible"
                  onClick={() => setSelectedProject(items[2])}
                />
              ) : (
                <Placeholder />
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center p-4 backdrop-blur-md ${
                  isDark
                    ? "border border-border/60 bg-surface/70"
                    : "border-2 border-gray-400 bg-surface/80"
                }`}
                onClick={onAllProjectsClick}
              >
                <span className="font-bold text-xl tracking-widest text-foreground uppercase">
                  EXPLORE
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Placeholder() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl flex items-center justify-center text-sm text-muted h-full w-full italic ${
        isDark
          ? "border border-white/10 bg-white/5"
          : "border-2 border-gray-400 bg-surface/70 backdrop-blur-md"
      }`}
    >
      Projects
    </div>
  );
}
