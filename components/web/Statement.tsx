"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "../AnimatedCounter";

const STATEMENT =
  "Passionate about creating intuitive and engaging user experiences. I specialize in transforming ideas into beautifully crafted products.";
const ACCENT_WORDS = ["crafted"];

const STATS = [
  { end: 3, suffix: "+", label: "Years of experience" },
  { end: 25, suffix: "+", label: "Completed projects" },
  { end: 15, suffix: "+", label: "Happy clients worldwide" },
];

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const isAccent = ACCENT_WORDS.includes(word);

  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${isAccent ? "font-serif text-accent" : ""}`}
    >
      {word}
    </motion.span>
  );
};

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = STATEMENT.split(" ");

  return (
    <section className="px-6 py-28 lg:px-12 xl:px-20 lg:py-48">
      <div className="grid gap-6 lg:grid-cols-[12rem_1fr]">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          (01) About
        </span>
        <p
          ref={ref}
          aria-label={STATEMENT}
          className="text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
        >
          {words.map((word, index) => (
            <Word
              key={index}
              word={word}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
            />
          ))}
        </p>
      </div>

      <dl className="mt-20 grid border-t border-border sm:grid-cols-3 lg:mt-28">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-baseline justify-between gap-4 border-b border-border py-5 sm:block sm:border-b-0 sm:py-6"
          >
            <dd className="font-display text-5xl lg:text-6xl">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
            </dd>
            <dt className="text-right font-mono text-xs uppercase tracking-wider text-muted sm:mt-3 sm:text-left">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
