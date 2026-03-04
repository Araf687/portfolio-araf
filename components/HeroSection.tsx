// "use client";

// import Image from "next/image";
// import AnimatedColorText from "./AnimatedColorText";
// import TitleText from "./Title";
// import { Github, Linkedin, Mail, Download } from "lucide-react";
// import Tooltip from "./Tooltip";
// import AnimatedCounter from "./AnimatedCounter";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const HeroSection = () => {
//   const spectrumColors = [
//     "#2563eb",
//     "#6366f1",
//     "#8b5cf6",
//     "#ec4899",
//     "#f97316",
//   ];

//   const contactIcons = [
//     { name: "Email", href: "mailto:arafyeasin@gmail.com", icon: <Mail size={20} /> },
//     {
//       name: "LinkedIn",
//       href: "https://www.linkedin.com/in/araf-yeasin/",
//       icon: <Linkedin size={20} />,
//     },
//     { name: "GitHub", href: "https://github.com/arafyeasin", icon: <Github size={20} /> },
//   ];

//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size for responsive animations
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div
//       className="
//         min-h-screen
//         flex
//         flex-col
//         lg:flex-row
//         items-center
//         gap-10
//         lg:-mt-18
//         mt-12
//       "
//     >
//       {/* LEFT SECTION */}
//       <div className="flex flex-col gap-8 items-center lg:items-start lg:w-2/5">
//         {/* Profile Image */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           className="relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full border border-gray-800 shadow-2xl shadow-indigo-500/10"
//         >
//           <Image
//             src="/profile-photo.png"
//             alt="Mohammad Yeasin"
//             fill
//             priority
//             className="object-cover"
//           />
//         </motion.div>

//         {/* Name and Tagline */}
//         <div className="text-center lg:text-left">
//           <h2 className="text-sm sm:text-base lg:text-2xl tracking-[0.2em] text-gray-500 mb-2 font-medium">
//             HI, I'M
//           </h2>

//           <AnimatedColorText
//             className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight"
//             colors={spectrumColors}
//             duration={10}
//           >
//             MOHAMMAD YEASIN
//           </AnimatedColorText>

//           <motion.p
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
//             className="mt-4 text-xs sm:text-base lg:text-lg tracking-wide text-justify text-gray-400 hidden sm:block leading-relaxed"
//           >
//             FRONTEND DEVELOPER FOCUSED ON SCALABLE ARCHITECTURE, CLEAN
//             STRUCTURE, CLEAR UX AND PERFORMANCE.
//           </motion.p>

//           {/* Social Links */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
//             className="flex justify-center lg:justify-start gap-8 sm:gap-10 mt-8 flex-wrap"
//           >
//             {contactIcons.map((contact) => (
//               <Tooltip key={contact.name} content={contact.name}>
//                 <a
//                   href={contact.href}
//                   className="flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   {contact.icon}
//                   <span className="font-medium">{contact.name}</span>
//                 </a>
//               </Tooltip>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="lg:w-3/5 min-h-[515px] border-l border-gray-800/50 pl-0 lg:pl-10 pt-10 lg:pt-0">
//         {/* Animated Title */}
//         <motion.div
//           initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <TitleText direction="column">SOFTWARE ENGINEER</TitleText>
//         </motion.div>

//         {/* Sub-paragraph */}
//         <motion.p
//           initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
//           className="
//             mt-5
//             px-4 sm:px-0
//             text-sm sm:text-base lg:text-xl
//             text-gray-400
//             max-w-[450px]
//             sm:text-justify text-center
//             leading-relaxed
//           "
//         >
//           Passionate about creating intuitive and engaging user experiences.
//           Specialize in transforming complex ideas into beautifully crafted digital products.
//         </motion.p>

//         {/* Stats Section */}
//         <div className="flex flex-nowrap sm:flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 lg:gap-12 mt-10">
//           {[
//             { end: 3, suffix: "+", resttxt: "years of experience" },
//             { end: 50, suffix: "+", resttxt: "completed projects" },
//             { end: 20, suffix: "+", resttxt: "happy clients worldwide" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center sm:items-start w-auto"
//             >
//               <p className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold leading-none">
//                 <AnimatedCounter end={item.end} suffix={item.suffix} />
//               </p>
//               <p className="text-gray-500 text-[9px] sm:text-xs lg:text-sm tracking-[0.15em] mt-2 font-medium">
//                 {item.resttxt.toUpperCase()}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* DOWNLOAD CV BUTTON */}
//         <motion.div 
//           initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
//           className="pt-14 flex justify-center lg:justify-start"
//         >
//           <a
//             href="/api/cv/download"
//             className="
//               group 
//               relative 
//               inline-flex 
//               items-center 
//               gap-3 
//               rounded-full 
//               px-8 
//               py-3.5 
//               font-bold 
//               bg-white 
//               text-black 
//               hover:bg-gray-200 
//               transition-all 
//               duration-300 
//               active:scale-95 
//               shadow-lg 
//               shadow-white/5
//             "
//           >
//             <Download size={20} className="group-hover:animate-bounce" />
//             <span className="tracking-wide">Download My CV</span>
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

"use client";

import Image from "next/image";
import AnimatedColorText from "./AnimatedColorText";
import TitleText from "./Title";
import { Github, Linkedin, Mail, Download } from "lucide-react";
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
    <div
      className="
    min-h-auto
    lg:min-h-screen
    flex
    flex-col
    lg:flex-row
    items-center
    gap-10
    lg:-mt-18
   mt-12
  "

    >
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-8 items-center lg:items-start lg:w-2/5 ">
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
      <div className="lg:w-3/5 border-t  lg:border-l border-gray-800 pl-0 lg:pl-6 pt-10 lg:pt-0">
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
            { end: 25, suffix: "+", resttxt: "completed projects" },
            { end: 15, suffix: "+", resttxt: "happy clients worldwide" },
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
        {/* Download CV Button */}

        <motion.div
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="pt-14 flex justify-center lg:justify-start"
        >
          <a
            href="/api/cv/download"
            className="
              group 
              relative 
              inline-flex 
              items-center 
              gap-3 
              rounded-full 
              px-8 
              py-3.5 
              font-bold 
              bg-white 
              text-black 
              hover:bg-gray-200 
              transition-all 
              duration-300 
              active:scale-95 
              shadow-lg 
              shadow-white/5
            "
          >
            <Download size={20} className="group-hover:animate-bounce" />
            <span className="tracking-wide">Download My CV</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;


