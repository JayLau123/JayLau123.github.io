"use client";

import { useEffect } from "react";

const geometryProperties = [
  "--ring-x",
  "--ring-y",
  "--ring-rotation",
  "--ring-scale",
  "--dots-x",
  "--dots-y",
  "--dots-rotation",
  "--triangle-one-y",
  "--triangle-one-rotation",
  "--triangle-two-x",
  "--triangle-two-y",
  "--triangle-two-rotation",
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

      root.style.setProperty("--ring-x", `${-18 * progress}px`);
      root.style.setProperty("--ring-y", `${-72 * progress}px`);
      root.style.setProperty("--ring-rotation", `${14 * progress}deg`);
      root.style.setProperty("--ring-scale", `${1 + 0.07 * progress}`);
      root.style.setProperty("--dots-x", `${24 * progress}px`);
      root.style.setProperty("--dots-y", `${-28 * progress}px`);
      root.style.setProperty("--dots-rotation", `${-6 * progress}deg`);
      root.style.setProperty("--triangle-one-y", `${42 * progress}px`);
      root.style.setProperty("--triangle-one-rotation", `${18 * progress}deg`);
      root.style.setProperty("--triangle-two-x", `${-20 * progress}px`);
      root.style.setProperty("--triangle-two-y", `${-34 * progress}px`);
      root.style.setProperty("--triangle-two-rotation", `${-16 * progress}deg`);
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
      <svg
        className="geometry-triangle geometry-triangle-one"
        viewBox="0 0 120 104"
      >
        <path d="M60 3 117 101H3L60 3Z" />
      </svg>
      <svg
        className="geometry-triangle geometry-triangle-two"
        viewBox="0 0 120 104"
      >
        <path d="M60 3 117 101H3L60 3Z" />
      </svg>
    </div>
  );
}
