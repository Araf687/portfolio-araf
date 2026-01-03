"use client";

import Image from "next/image";
import AnimatedColorText from "./AnimatedColorText";
import TitleText from "./Title";
import { Github, Linkedin, Mail } from "lucide-react";
import Tooltip from "./Tooltip";
import AnimatedCounter from "./AnimatedCounter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const spectrumColors = [
    "#2563eb",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f97316",
  ];

  const contactIcons = [
    { name: "Email", href: "mailto:arafyeasin@gmail.com", icon: <Mail /> },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/araf-yeasin/",
      icon: <Linkedin />,
    },
    { name: "GitHub", href: "https://github.com/arafyeasin", icon: <Github /> },
  ];

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-12 lg:pt-16 flex flex-col lg:flex-row gap-10">
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-8 items-center lg:items-start lg:w-2/5">
        {/* Image */}
        <div className="relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full border border-gray-200 shadow-md">
          <Image
            src="/profile-photo.png"
            alt="Profile Picture"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <h2 className="text-sm sm:text-base lg:text-2xl tracking-wider text-gray-400 mb-2">
            HI, I'M
          </h2>

          <AnimatedColorText
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide"
            colors={spectrumColors}
            duration={10}
          >
            MOHAMMAD YEASIN
          </AnimatedColorText>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="mt-4 text-xs sm:text-base lg:text-lg tracking-wide text-justify text-gray-400 hidden sm:block"
          >
            FRONTEND DEVELOPER FOCUSED ON SCALABLE ARCHITECTURE, CLEAN
            STRUCTURE, CLEAR UX AND PERFORMANCE.
          </motion.p>

          {/* Social Links slide-in from left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="flex justify-center lg:justify-start gap-8 sm:gap-12 mt-6 flex-wrap"
          >
            {contactIcons.map((contact) => (
              <Tooltip key={contact.name} content={contact.name}>
                <a
                  href={contact.href}
                  className="flex items-center gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                >
                  {contact.icon}
                  <span>{contact.name}</span>
                </a>
              </Tooltip>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-3/5 border-l border-gray-800 pl-0 lg:pl-6 pt-10 lg:pt-0">
        {/* Animated Title */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TitleText direction="column">SOFTWARE ENGINEER</TitleText>
        </motion.div>

        {/* Animated Paragraph */}
        <motion.p
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="
            mt-3
            px-4 sm:px-0
            text-sm sm:text-base lg:text-lg
            text-gray-400
            max-w-[410px]
            sm:text-justify text-center
          "
        >
          Passionate about creating intuitive and engaging user experiences.
          Specialize in transforming ideas into beautifully crafted products.
        </motion.p>

        {/* STATS */}
        <div className=" flex flex-nowrap sm:flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          {[
            { end: 3, suffix: "+", resttxt: "years of experience" },
            { end: 50, suffix: "+", resttxt: "completed projects" },
            { end: 20, suffix: "+", resttxt: "happy clients worldwide" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[90px] sm:w-[110px] lg:w-[120px]"
            >
              <p className="text-white text-3xl sm:text-4xl lg:text-6xl font-semibold leading-none">
                <AnimatedCounter end={item.end} suffix={item.suffix} />
              </p>
              <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm tracking-wide text-center mt-1">
                {item.resttxt.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
