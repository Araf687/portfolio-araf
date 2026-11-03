"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navOptions = [
  { name: "Home", id: "hero" },
  { name: "Skills", id: "skills" },
  { name: "Work", id: "projects" },
  { name: "Contact", id: "contact" },
];

const TopNav = () => {
  const [active, setActive] = useState("hero");
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const hidden = pathname === "/login" || pathname.startsWith("/admin");

  // Highlight whichever section crosses the middle of the viewport
  useEffect(() => {
    if (hidden) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    navOptions.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hidden, pathname]);

  // hide TopNav on login page or admin routes
  if (hidden) return null;

  // Scroll function
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <nav
        aria-label="Primary"
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/75 p-1 shadow-lg shadow-black/10 backdrop-blur-md">
          {navOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleScroll(option.id)}
              aria-current={active === option.id ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors sm:px-4 ${
                active === option.id
                  ? "text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {active === option.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{option.name}</span>
            </button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
};

export default TopNav;
