"use client";

import HeroSection from "@/components/HeroSection";
import Skills from "@/components/Skills";

import ProjectSection from "@/components/Projects";
import InkBackground from "@/components/InkBackground";
import ContactSection from "@/components/contact/ContactSection";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import BentoProjectsGrid from "@/components/bentoui";

export const dummyProjects = [
  {
    id: 1,
    title: "E‑commerce Interface",
    thumbnail:
      "https://cdn.dribbble.com/userupload/17432015/file/original-37454186bb358b3966b86efabaf344e5.png?resize=1024x768&vertical=center",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    thumbnail:
      "https://cdn.dribbble.com/userupload/31062873/file/original-25b57c637b04d72c9bc6e5db90e16a58.png?resize=1024x768&vertical=center",
  },
  {
    id: 3,
    title: "Mobile App Prototype",
    thumbnail:
      "https://cdn.dribbble.com/userupload/4118306/file/original-1d73ef613cbbf0b562bc06f42fc56cd2.png?resize=1024x768&vertical=center",
  },
  {
    id: 4,
    title: "Team Collaboration UI",
    thumbnail:
      "https://cdn.dribbble.com/userupload/14689341/file/original-f300179722b19bb9eef4d05abb3414af.png?resize=1024x768&vertical=center",
  },
  {
    id: 5,
    title: "UX Research Board",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Product Landing Concept",
    thumbnail:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Marketing Dashboard",
    thumbnail:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
  },
];


export default function Home() {
  return (
    
    <div className="mx-auto max-w-7xl pt-24 pb-10">
      <InkBackground />
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
      <Skills />
      <ProjectSection />
      


      <ContactSection/>
    </div>
  );
}
