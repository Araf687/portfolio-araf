"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function InkWaterInteractive() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Mouse move
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Right-click ripple
  useEffect(() => {
    let idCounter = 0;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault(); // prevent context menu
      const newRipple: Ripple = { id: idCounter++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("contextmenu", handleClick);
    return () => window.removeEventListener("contextmenu", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Mouse-following blobs */}
      <motion.div
        style={{ x, y }}
        className="absolute h-[400px] w-[400px] rounded-full blur-[140px] opacity-60 mix-blend-screen bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        style={{ x, y }}
        className="absolute h-[360px] w-[360px] rounded-full blur-[140px] opacity-50 mix-blend-screen bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-indigo-600"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Ripples on right click */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 3, y: -100 }} // moves upward like a wave
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute h-[50px] w-[50px] rounded-full bg-white/40 mix-blend-screen"
            style={{ left: r.x - 25, top: r.y - 25 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
