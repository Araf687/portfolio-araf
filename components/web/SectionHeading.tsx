"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  children,
  aside,
}: {
  index: string;
  children: string;
  aside?: string;
}) {
  return (
    <header className="mb-12 lg:mb-20">
      <p className="mb-3 flex justify-between font-mono text-xs uppercase tracking-wider text-muted">
        <span>({index})</span>
        {aside && <span>{aside}</span>}
      </p>
      {/* Observe the h2: the span starts clipped, so it would never count as in view */}
      <motion.h2
        className="overflow-hidden font-display text-6xl font-normal uppercase leading-[1.05] lg:text-8xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: "105%" }, visible: { y: 0 } }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.span>
      </motion.h2>
    </header>
  );
}
