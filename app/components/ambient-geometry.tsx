"use client";

import { useEffect } from "react";

const geometryProperties = [
  "--ring-x",
  "--ring-y",
  "--ring-scale",
  "--dots-x",
  "--dots-y",
  "--dots-scale",
  "--axis-x",
  "--axis-y",
  "--axis-rotation",
  "--parabola-x",
  "--parabola-y",
  "--parabola-rotation",
  "--parabola-scale",
] as const;

export function AmbientGeometry() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function updateGeometry() {
      frame = 0;

      if (reducedMotion.matches) {
        geometryProperties.forEach((property) => root.style.removeProperty(property));
        return;
      }

      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
      const phase = progress * Math.PI * 2;
      const breathing = Math.sin(phase);

      root.style.setProperty("--ring-x", `${-52 * progress}px`);
      root.style.setProperty("--ring-y", `${-92 * progress}px`);
      root.style.setProperty("--ring-scale", `${1 + 0.16 * breathing}`);
      root.style.setProperty("--dots-x", `${32 * progress}px`);
      root.style.setProperty("--dots-y", `${-44 * progress}px`);
      root.style.setProperty("--dots-scale", `${1 - 0.2 * breathing}`);
      root.style.setProperty("--axis-x", `${-20 * progress}px`);
      root.style.setProperty("--axis-y", `${34 * progress}px`);
      root.style.setProperty("--axis-rotation", `${5 * breathing}deg`);
      root.style.setProperty("--parabola-x", `${28 * progress}px`);
      root.style.setProperty("--parabola-y", `${-58 * progress}px`);
      root.style.setProperty(
        "--parabola-rotation",
        `${-18 + 82 * progress}deg`,
      );
      root.style.setProperty(
        "--parabola-scale",
        `${1 + 0.07 * Math.cos(phase)}`,
      );
    }

    function handleScroll() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateGeometry);
      }
    }

    updateGeometry();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    reducedMotion.addEventListener("change", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      reducedMotion.removeEventListener("change", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient-geometry" aria-hidden="true">
      <span className="geometry-ring" />
      <span className="geometry-dot-grid" />
      <span className="geometry-coordinate">
        <span className="geometry-origin" />
      </span>
      <svg className="geometry-parabola" viewBox="0 0 200 150">
        <path d="M10 18Q100 208 190 18" />
      </svg>
    </div>
  );
}
