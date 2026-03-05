"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function InkBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 30 });

  const [isMobile, setIsMobile] = useState(false);

  // State to hold active ripples
  const [ripples, setRipples] = useState<Ripple[]>([]);
  let idCounter = 0;

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Mouse follow
  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // Left click ripple
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return; // left click only
      const newRipple: Ripple = { id: idCounter++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);

      // Remove after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Mouse-following ink blob */}
      <motion.div
        style={
          isMobile
            ? { left: -250, top: -300 } // left corner position for mobile
            : { x, y }
        }
        className="
    absolute
    h-[400px]
    w-[400px]
    rounded-full
    blur-[120px]
    opacity-60
    mix-blend-screen
    bg-gradient-to-tr
    from-cyan-400
    via-blue-500
    to-purple-600
  "
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Ripples on click */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute rounded-full border border-white/30 mix-blend-screen"
            style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
