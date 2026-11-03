"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import DotField from "./web/DotField";
import Magnetic from "./web/Magnetic";
import Portrait from "./web/Portrait";
import FloatingSocials from "./web/FloatingSocials";

const EASE = [0.76, 0, 0.24, 1] as const;

// Each letter rises out of a clipped line
const RevealLine = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span aria-hidden className="block overflow-hidden">
    <span className="flex justify-center">
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          className="block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: delay + index * 0.04 }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  </span>
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

const HeroSection = () => {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-20 text-center lg:px-12 xl:px-20">
      <DotField />
      <FloatingSocials />

      <motion.div
        className="relative mb-4"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      >
        <Portrait />
      </motion.div>

      <motion.p
        {...fadeUp(0.2)}
        className="relative mb-4 font-mono text-xs uppercase tracking-wider text-muted"
      >
        Software Engineer
      </motion.p>

      <h1
        aria-label="Mohammad Yeasin"
        className="hero-name relative font-display font-normal uppercase lg:flex lg:gap-[0.25em]"
      >
        <RevealLine text="Mohammad" delay={0.15} />
        <RevealLine text="Yeasin" delay={0.35} />
      </h1>

      <motion.p
        {...fadeUp(0.9)}
        className="relative mt-5 max-w-md text-lg leading-snug text-muted lg:max-w-none"
      >
        Frontend developer focused on scalable architecture, clean structure,
        clear UX and performance.
      </motion.p>

      <motion.div {...fadeUp(1.1)} className="relative z-30 mt-6">
        <Magnetic className="inline-block">
          <a
            href="/api/cv/download"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-transform active:scale-95"
          >
            <Download size={16} /> Download CV
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
};

export default HeroSection;
