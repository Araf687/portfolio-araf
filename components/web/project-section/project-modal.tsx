// project-modal.tsx
"use client"; //

import React from "react"; //
import { motion } from "framer-motion"; //
import { X, Github, ExternalLink } from "lucide-react"; //
import { Project } from "./bentoui";
import Image from "next/image";
import type { Variants } from "framer-motion";


interface ProjectModalProps {
  //
  project: Project; //
  onClose: () => void; //
} //

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  //
  const backdropVariants: Variants = {
    //
    hidden: { opacity: 0 }, //
    visible: { opacity: 1 }, //
  }; //

  const modalVariants: Variants = {
    //
    hidden: { opacity: 0, scale: 0.8, y: -50 }, //
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 20 } }, //
  }; //

  return (
    //
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" // Semi-transparent backdrop with blur
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Close modal on backdrop click
    >
      <motion.div
        className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl" // Glassmorphism style
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on modal content click
      >
        <button
          className="absolute top-4 right-5 p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
            {/* <p className="text-sm text-white/70 uppercase tracking-widest mb-6">{project.category}</p> */}
                <div>
              {/* <h3 className="text-xl font-semibold text-white mb-4">Skills</h3> */}
              <div className="flex flex-wrap gap-3 mt-1">
                {project.skills.map((skillItem) => (
                  <span
                    key={skillItem.skill.id}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/90"
                  >
                    <Image src={skillItem.skill.image_url} alt={skillItem.skill.name} width={16} height={16} />
                    {skillItem.skill.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg text-white/90 leading-relaxed text-justify my-8">{project.description}</p>

            <div className="flex gap-4 mb-8">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 underline text-white font-semibold hover:bg-white/10 transition"
                >
                  <Github size={18} /> GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>

        
          </div>

          <div >
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-2xl border border-white/10 my-4"
            />
            {project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt={`Project screenshot`}
                    width={400}
                    height={300}
                    className="rounded-xl border border-white/10"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  ); //
} //