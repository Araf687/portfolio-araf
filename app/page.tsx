"use client";

import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";

import ProjectSection from "@/components/Projects";


export default function Home() {


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
      <ProjectSection/>
    </div>
  );
}
