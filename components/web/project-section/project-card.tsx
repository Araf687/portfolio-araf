// project-card.tsx
"use client"; //
import Image from "next/image"; //

import { motion } from "framer-motion"; //
import { MoveUpRight } from "lucide-react"; //
import { Project } from "./bentoui";

export function ProjectCard({
  //
  project, //
  className, //
  variants, //
  initial, //
  whileInView, //
  onClick, // Add onClick prop
}: {
  project: Project; //
  className?: string; //
  variants?: any; //
  initial?: string; //
  whileInView?: string; //
  onClick?: () => void; // Add onClick type definition
}) {
  //
  return (
    //
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={`relative z-20 h-full ${className} min-h-0 cursor-pointer`} // Add cursor-pointer
      onClick={onClick} // Apply onClick to motion.div
    >
      {/* Wrapper to allow cut circle outside */}
      <div className="relative h-full">
        {/* 🔵 CUT CIRCLE (above card) */}
        <div className="absolute -bottom-[1px] -right-[1px] z-50 pointer-events-none">
          <div className="relative w-20 h-20">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute bg-white rounded-full p-3.5 right-1 bottom-1 z-60 pointer-events-auto shadow-lg hover:shadow-xl"
            >
              <MoveUpRight />
            </motion.div>

            <Image
              src="/Subtract.svg"
              alt="Cut circle"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 🟦 CARD */}
        <div className="relative w-full h-full overflow-hidden rounded-2xl border border-gray-200 group bg-white z-10">
          {/* IMAGE with zoom on hover */}
          <motion.img
            src={project?.thumbnail || ""}
            alt={project?.title || "Project image"}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* HOVER OVERLAY (does not block hover) */}
          <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-3 transition">
            <span className="text-white text-sm font-medium">
              {project?.title}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  ); //
} //