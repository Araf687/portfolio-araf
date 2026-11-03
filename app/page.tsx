"use client";

import { MotionConfig } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Skills from "@/components/web/skill/Skills";
import ProjectSection from "@/components/web/project-section/Projects";
import ContactSection from "@/components/web/contact/ContactSection";
import Statement from "@/components/web/Statement";
import CursorFollower from "@/components/web/CursorFollower";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <CursorFollower />

      <main>
        <div id="hero">
          <HeroSection />
        </div>

        <Statement />

        <div id="skills">
          <Skills />
        </div>

        <div id="projects">
          <ProjectSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </MotionConfig>
  );
}
