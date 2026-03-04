"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "./bentoui";
import Image from "next/image";
import type { Variants } from "framer-motion";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 20 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-5 md:p-8 shadow-2xl backdrop-blur-xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* ===== TITLE + SKILLS ===== */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">{project.title}</h2>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.skills.map((skillItem) => (
              <span
                key={skillItem.skill.id}
                className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/90"
              >
                <Image
                  src={skillItem.skill.image_url}
                  alt={skillItem.skill.name}
                  width={16}
                  height={16}
                />
                {skillItem.skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* ===== DESCRIPTION + IMAGES ===== */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          
          {/* Image */}
          <div className="order-1 md:order-2 w-full md:w-[48%]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={800}
              height={500}
              className="rounded-2xl border border-white/10 mb-4 w-full object-cover"
            />

            {project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt="Project screenshot"
                    width={400}
                    height={300}
                    className="rounded-xl border border-white/10 w-full object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description + Links */}
          <div className="order-2 md:order-1 w-full md:w-[48%] flex flex-col justify-between">
            <p className="text-base md:text-lg text-white/90 leading-relaxed text-justify mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 mt-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline text-white font-semibold transition"
                >
                  <Github size={18} /> GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline text-white font-semibold transition"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}