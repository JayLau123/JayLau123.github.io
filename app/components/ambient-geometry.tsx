"use client";

import { useEffect } from "react";

const geometryProperties = [
  "--ring-left-x",
  "--ring-left-y",
  "--ring-right-x",
  "--ring-right-y",
  "--ring-scale",
  "--axis-left-rotation",
  "--axis-right-rotation",
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

      root.style.setProperty("--ring-left-x", `${30 * progress}px`);
      root.style.setProperty("--ring-left-y", `${24 * progress}px`);
      root.style.setProperty("--ring-right-x", `${-52 * progress}px`);
      root.style.setProperty("--ring-right-y", `${-92 * progress}px`);
      root.style.setProperty("--ring-scale", `${1.02 + 0.3 * progress}`);
      root.style.setProperty(
        "--axis-left-rotation",
        `${-2 + 9 * progress}deg`,
      );
      root.style.setProperty(
        "--axis-right-rotation",
        `${1 + 8 * progress}deg`,
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
      <span className="geometry-ring geometry-ring-left" />
      <span className="geometry-ring geometry-ring-right" />
      <span className="geometry-coordinate geometry-coordinate-left" />
      <span className="geometry-coordinate geometry-coordinate-right" />
    </div>
  );
}
