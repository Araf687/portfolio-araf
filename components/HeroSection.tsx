import Image from "next/image";
import AnimatedColorText from "./AnimatedColorText";
import TitleText from "./Title";
import { Github, Linkedin, Mail } from "lucide-react";
import Tooltip from "./Tooltip";

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

          <p className="mt-4 text-xs sm:text-base lg:text-lg tracking-wide text-justify text-gray-400 hidden sm:block">
            FRONTEND DEVELOPER FOCUSED ON SCALABLE ARCHITECTURE, CLEAN
            STRUCTURE, CLEAR UX AND PERFORMANCE.
          </p>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-8 sm:gap-12 mt-6 flex-wrap">
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
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-3/5 border-l border-gray-800 pl-0 lg:pl-6 pt-10 lg:pt-0">
        <TitleText direction="column">SOFTWARE ENGINEER</TitleText>

        <p
          className="mt-3
             px-4 sm:px-0
             text-sm sm:text-base lg:text-lg
             text-gray-400
             max-w-[410px]
             sm:text-justify text-center"
        >
          Passionate about creating intuitive and engaging user experiences.
          Specialize in transforming ideas into beautifully crafted products.
        </p>

        {/* STATS */}
        <div
          className="
  flex flex-nowrap sm:flex-wrap
  justify-center sm:justify-start
  gap-3 sm:gap-6 lg:gap-8
  mt-6 sm:mt-8
"
        >
          {[
            { boldtxt: "+3", resttxt: "years of experience" },
            { boldtxt: "50+", resttxt: "completed projects" },
            { boldtxt: "20+", resttxt: "happy clients worldwide" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[90px] sm:w-[110px] lg:w-[120px]"
            >
              <p className="text-white text-3xl sm:text-4xl lg:text-6xl font-semibold leading-none">
                {item.boldtxt}
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
