"use client";

import { Briefcase, House, Mail, Server } from "lucide-react"; // Server = Technical Skills icon
import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // hide TopNav on login page or admin routes
  if (pathname === "/login" || pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll function
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navOptions = [
    { name: "Home", id: "hero", icon: <House size={20} /> },
    { name: "Technical Skills", id: "skills", icon: <Server size={20} /> },
    { name: "Projects", id: "projects", icon: <Briefcase size={20} /> },
    { name: "Contact", id: "contact", icon: <Mail size={20} /> },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <div
        className={`
          flex items-center justify-center gap-6 px-4 rounded-full
          transition-all duration-300
          ${
            scrolled
              ? "bg-surface/80 backdrop-blur-md border border-border/60 shadow-lg"
              : "bg-transparent border border-border/60"
          }
        `}
      >
        {navOptions.map((option) => (
          <Tooltip content={option.name} key={option.name}>
            <button
              onClick={() => handleScroll(option.id)}
              className="flex items-center gap-2 p-3 text-muted hover:text-foreground rounded"
            >
              {option.icon}
            </button>
          </Tooltip>
        ))}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopNav;
