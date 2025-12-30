"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedColorTextProps {
  colors: string[];
  duration?: number;
  children: ReactNode;
  className?: string;
}

export default function AnimatedColorText({
  colors,
  duration = 25, // slow by default
  children,
  className,
}: AnimatedColorTextProps) {
  const smoothColors = [...colors, colors[0]]; // prevent color jump

  return (
    <motion.span
      animate={{
        color: smoothColors,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
