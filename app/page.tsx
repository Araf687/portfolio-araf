"use client";

import HeroSection from "@/components/HeroSection";
import Skills from "@/components/web/skill/Skills";
import ProjectSection from "@/components/web/project-section/Projects";
import InkBackground from "@/components/InkBackground";
import ContactSection from "@/components/web/contact/ContactSection";
import ScrollAnimatedSection from "@/components/ScrollFadeIn";
import TopNav from "@/components/TopNav";

// ✅ Dummy project data
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
    <div className="mx-auto max-w-7xl pt-24 p-2 lg:p-10 relative">
      {/* TopNav */}
      <TopNav />

      <ScrollAnimatedSection>
        <InkBackground />

        {/* Hero Section */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Skills Section */}
        <div id="skills">
          <Skills />
        </div>

        {/* Projects Section */}
        <div id="projects">
          <ProjectSection />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>
      </ScrollAnimatedSection>
    </div>
  );
}
