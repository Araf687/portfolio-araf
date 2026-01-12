"use client";

import { Briefcase, House, Mail, User } from "lucide-react";
import Link from "next/link";
import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅

const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // current route

  // hide TopNav on login page
  if (pathname === "/login"||pathname.startsWith("/admin")) return null; // ✅ hide

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navOptions = [
    { name: "Home", href: "/", icon: <House size={20} /> },
    { name: "Projects", href: "/projects", icon: <Briefcase size={20} /> },
    { name: "About", href: "/about", icon: <User size={20} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={20} /> },
    { name: "Blog", href: "/blog", icon: <Mail size={20} /> },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <div
        className={`
          flex items-center justify-center gap-6 px-4 rounded-full
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              : "bg-transparent border border-gray-800"
          }
        `}
      >
        {navOptions.map((option) => (
          <Tooltip content={option.name} key={option.name}>
            <Link
              href={option.href}
              className="flex items-center gap-2 p-3 text-gray-300 hover:text-white rounded"
            >
              {option.icon}
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
