"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  Email: <Mail size={26} />,
  LinkedIn: <Linkedin size={26} />,
  GitHub: <Github size={26} />,
};

const ICON_SIZE = 44;
const TOP_CLEARANCE = 72; // keeps icons from sliding under the nav
const EDGE = 12;

// Unrelated x/y speeds so each icon traces a long, non-repeating looking path
const PATHS = [
  { speedX: 0.00017, speedY: 0.00029, phaseX: 0.4, phaseY: 2.1 },
  { speedX: 0.00023, speedY: 0.00013, phaseX: 3.6, phaseY: 0.7 },
  { speedX: 0.00011, speedY: 0.00021, phaseX: 5.1, phaseY: 4.3 },
];

// Blend of two sines stays within -1..1 but never settles into a plain ellipse
const wander = (time: number, speed: number, phase: number) =>
  0.75 * Math.sin(time * speed + phase) +
  0.25 * Math.sin(time * speed * 2.3 + phase * 1.7);

// Social links roaming across the whole hero; all of them hold still while one is hovered or focused
export default function FloatingSocials() {
  const containerRef = useRef<HTMLUListElement>(null);
  const iconRefs = useRef<(HTMLLIElement | null)[]>([]);
  const heldRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let time = 0;
    let last = 0;
    let frame = 0;
    let onScreen = true;

    const place = () => {
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;
        const path = PATHS[index % PATHS.length];
        const rangeX = (width - ICON_SIZE - 2 * EDGE) / 2;
        const rangeY = (height - ICON_SIZE - TOP_CLEARANCE - EDGE) / 2;
        const x = EDGE + rangeX * (1 + wander(time, path.speedX, path.phaseX));
        const y =
          TOP_CLEARANCE + rangeY * (1 + wander(time, path.speedY, path.phaseY));
        icon.style.transform = `translate(${x}px, ${y}px)`;
        icon.style.opacity = "1";
      });
    };

    const measure = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      place();
    };

    const loop = (now: number) => {
      // Capped so returning to the tab does not make icons jump
      const delta = Math.min(now - last, 100);
      last = now;
      if (onScreen && !heldRef.current) {
        time += delta;
        place();
      }
      frame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    viewObserver.observe(container);

    measure();
    if (!reduceMotion) {
      frame = requestAnimationFrame((now) => {
        last = now;
        loop(now);
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const hold = (held: boolean) => () => {
    heldRef.current = held;
  };

  return (
    <ul
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20"
    >
      {SOCIALS.map((social, index) => (
        <li
          key={social.name}
          ref={(el) => {
            iconRefs.current[index] = el;
          }}
          className="absolute top-0 left-0 opacity-0 will-change-transform"
        >
          <a
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            onPointerEnter={hold(true)}
            onPointerLeave={hold(false)}
            onFocus={hold(true)}
            onBlur={hold(false)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-accent transition-transform hover:scale-125"
          >
            {ICONS[social.name]}
          </a>
        </li>
      ))}
    </ul>
  );
}
