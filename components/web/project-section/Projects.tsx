"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, useScroll } from "framer-motion";
import { useFetchProjects, Project } from "@/app/hooks/useProjects";
import SectionHeading from "../SectionHeading";
import { ProjectCard } from "./project-card";
import ProjectModal from "./project-modal";

// Featured first (by featured_number when set), then the rest in API order
const byFeatured = (a: Project, b: Project) =>
  Number(!!b.is_featured) - Number(!!a.is_featured) ||
  (a.featured_number ?? Infinity) - (b.featured_number ?? Infinity);

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data, isLoading, error } = useFetchProjects();
  const projects = useMemo(() => [...(data ?? [])].sort(byFeatured), [data]);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="px-6 pb-28 lg:px-12 xl:px-20 lg:pb-48">
      <SectionHeading index="03" aside="Selected projects">
        Work
      </SectionHeading>

      {/* Always mounted: useScroll needs this ref on first render */}
      <div ref={stackRef}>
        {isLoading ? (
          <div className="h-[76svh] animate-pulse rounded-3xl bg-surface" aria-label="Loading projects" />
        ) : error ? (
          <p className="py-20 text-center text-accent">
            Error loading projects. Please try again later.
          </p>
        ) : projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              onClick={() => setSelectedProject(project)}
            />
          ))
        ) : (
          <p className="py-20 text-center text-muted">No projects found.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
