"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function ScrollAnimatedSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 }); // trigger when 20% visible

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ margin: "230vh 0", padding: "20px", background: "#f0f0f0" }}
    >
      <h2>Smooth Scroll Animation Section</h2>
      <p>This section fades in and slides up when you scroll to it.</p>
    </motion.div>
  );
}
