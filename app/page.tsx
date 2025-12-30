"use client";

import AnimatedColorText from "@/components/AnimatedColorText";
import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";
import TopNav from "@/components/TopNav";
import { useFetchProjects } from "./hooks/useProjects";


export default function Home() {
  const { data: projects, isLoading } = useFetchProjects();
  console.log({ projects, isLoading });
  //  const projects = await prisma.project.findMany();

  return (
    <div>
      <HeroSection />
      {/* Download CV Button */}
      <div className="mt-20 sm:mt-[80px] text-center">
        <a
          href="/my-cv.pdf"
          download
          className=" rounded-lg px-6 py-2 font-semibold bg-white text-black transition-colors duration-300"
        >
          <span>Download My CV</span>
        </a>
      </div>
      <Skills/>
    </div>
  );
}
