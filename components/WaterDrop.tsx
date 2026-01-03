"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface WaterDropProps {
  children: React.ReactNode;
  isActive: boolean;
  layoutId: string; // unique layoutId for Framer Motion
}

export const WaterDrop = ({ children, isActive, layoutId }: WaterDropProps) => {
  const controls = useAnimation();
  const [scaleFactor, setScaleFactor] = useState(1.3);

  // Vibrate animation when active
  const vibrateSequence = {
    x: [0, -3, 3, -2, 2, 0],
    y: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.88 },
  };

  useEffect(() => {
    if (isActive) controls.start(vibrateSequence);
  }, [isActive, controls]);

  // Responsive scale factor
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScaleFactor(1.1); // mobile
      else if (window.innerWidth < 1024) setScaleFactor(1.2); // tablet
      else setScaleFactor(1.3); // desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      layoutId={layoutId} // <-- this enables smooth transition between tabs
      animate={controls}
      className="absolute inset-0 flex items-center justify-center"
      transition={{ type: "spring", stiffness: 500, damping: 38 }}
    >
      <div
        className="w-full h-full rounded-full bg-white/10 backdrop-blur-md"
        style={{
          boxShadow:
            "inset 0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.15)",
        }}
      >
        <motion.div
          className="flex items-center justify-center w-full h-full text-white"
          animate={{ scale: isActive ? scaleFactor : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};
