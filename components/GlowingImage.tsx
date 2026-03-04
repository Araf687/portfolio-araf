"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GlowingImage() {
  return (
    <div className="relative w-full lg:block hidden max-w-xl mx-auto">
      {/* 🔵 CONTINUOUS GLOW */}
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/3
          w-[55%]
          h-[50%]
          rounded-full
          blur-[70px]
          opacity-50
          bg-gradient-to-tr
          from-cyan-400
          via-blue-500
          to-purple-600
        "
        animate={{
          scale: [1, 1.08, 1],  // subtle breathing
          opacity: [0.4, 0.6, 0.4], // soft pulse
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🖼 IMAGE (SLIDE FROM RIGHT) */}
      <motion.div
        className="relative z-10 h-[750px] overflow-hidden rounded-2xl"
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Image
          src="/contact2.png"
          alt="Contact"
          fill
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );
}
