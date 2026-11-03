"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { Project } from "@/app/hooks/useProjects";

export function ProjectCard({
  project,
  index,
  total,
  progress,
  onClick,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  // Cards underneath shrink slightly as later ones stack over them
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.03],
  );

  return (
    <div
      className="sticky mb-[6svh] last:mb-0"
      style={{ top: `calc(4.75rem + ${index * 0.75}rem)` }}
    >
      <motion.article
        style={{ scale }}
        className="group relative grid h-[76svh] origin-top grid-rows-[1fr_auto] overflow-hidden rounded-2xl border border-border bg-surface lg:grid-cols-[2fr_3fr] lg:grid-rows-1 lg:rounded-3xl"
      >
        {/* Full-card trigger; the links below sit above it */}
        <button
          type="button"
          onClick={onClick}
          data-cursor="Open"
          aria-label={`Open project details: ${project.title}`}
          className="absolute inset-0 z-10"
        />

        <div className="relative order-2 flex flex-col justify-between gap-4 p-5 lg:order-1 lg:p-9">
          <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-muted">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{project.category === "app" ? "Mobile app" : "Web"}</span>
          </div>

          <div>
            <h3 className="font-display text-4xl font-normal uppercase leading-[1.05] transition-colors group-hover:text-accent lg:text-6xl">
              {project.title}
            </h3>
            <p className="mt-4 hidden max-w-md leading-snug text-muted sm:line-clamp-3">
              {project.description?.replace(/\*+/g, "")}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <ul className="flex flex-wrap gap-1.5">
              {project.skills?.map(({ skill }) => (
                <li
                  key={skill.id}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45">
              <MoveUpRight size={18} />
            </span>
          </div>
        </div>

        <div className="relative order-1 min-h-0 overflow-hidden bg-background lg:order-2">
          <Image
            src={project.thumbnail || "/window.svg"}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </motion.article>
    </div>
  );
}
