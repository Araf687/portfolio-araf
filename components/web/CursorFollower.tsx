"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Soft ring behind the native cursor; grows into a label over [data-cursor] elements
export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] flex items-center justify-center rounded-full"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? 88 : 0,
        height: label ? 88 : 0,
        opacity: visible ? 1 : 0,
        backgroundColor: label ? "var(--accent)" : "rgba(0,0,0,0)",
        borderWidth: label ? 0 : 1.5,
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <div className="absolute inset-0 rounded-full border-[1.5px] border-accent" />
      {label && (
        <span className="relative font-mono text-[11px] uppercase tracking-wider text-on-accent">
          {label}
        </span>
      )}
    </motion.div>
  );
}
