"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/app/hooks/useProjects";
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
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 26, stiffness: 220 } },
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-3xl border border-border bg-background p-5 shadow-2xl sm:rounded-3xl md:p-10"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          autoFocus
          aria-label="Close"
          className="sticky top-0 z-10 float-right rounded-full border border-border bg-background p-2 text-muted transition hover:text-foreground"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* ===== TITLE + SKILLS ===== */}
        <div className="mb-8">
          <h2 className="mb-4 font-display text-5xl font-normal uppercase leading-[1.05] md:text-7xl">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.skills?.map((skillItem) => (
              <span
                key={skillItem.skill.id}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
              >
                {skillItem.skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* ===== DESCRIPTION + IMAGES ===== */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">

          {/* Image */}
          <div className="order-1 w-full md:order-2 md:w-[56%]">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={800}
                height={500}
                className="mb-4 w-full rounded-2xl border border-border object-cover"
              />
            )}

            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt={`${project.title} screenshot`}
                    width={400}
                    height={300}
                    className="w-full rounded-xl border border-border object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description + Links */}
          <div className="order-2 w-full md:order-1 md:w-[40%]">
            <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
              {project.description?.replace(/\*\*/g, "")}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition active:scale-95"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-surface active:scale-95"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
