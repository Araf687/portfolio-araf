"use client";

import { useEffect, useRef } from "react";

const SPACING = 26;
const RADIUS = 170;

// Dot grid visible only around the pointer; dots swell, drift and take the accent color
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let dotColor = "";
    let accent = "";
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      dotColor = styles.getPropertyValue("--border").trim();
      accent = styles.getPropertyValue("--accent").trim();
    };

    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = true;
    const pointer = { x: -9999, y: -9999, currentX: -9999, currentY: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      pointer.currentX += (pointer.x - pointer.currentX) * 0.12;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.12;

      for (let gx = SPACING / 2; gx < width; gx += SPACING) {
        for (let gy = SPACING / 2; gy < height; gy += SPACING) {
          const dx = gx - pointer.currentX;
          const dy = gy - pointer.currentY;
          const distance = Math.hypot(dx, dy);
          const force = Math.max(0, 1 - distance / RADIUS);
          if (force === 0) continue;
          const wave = reduceMotion
            ? 0
            : Math.sin(gx * 0.012 + gy * 0.018 + time * 0.0009);
          const push = distance ? (force * force * 22) / distance : 0;

          ctx.beginPath();
          ctx.fillStyle = force > 0.04 ? accent : dotColor;
          ctx.arc(
            gx + dx * push,
            gy + dy * push,
            1.1 + wave * 0.35 + force * 2.6,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
    };

    const loop = (time: number) => {
      if (onScreen) draw(time);
      frame = requestAnimationFrame(loop);
    };

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (pointer.currentX < -999) {
        pointer.currentX = pointer.x;
        pointer.currentY = pointer.y;
      }
    };

    const handleResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    readColors();
    resize();
    window.addEventListener("resize", handleResize);
    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", handleMove);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
