"use client";

import { useEffect, useRef } from "react";
import { animateCanyon, canyonHeight, canyonWidth, loadCanyonArt } from "./dinosaur-canyon-scene";

export function HomepageAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: ReturnType<typeof animateCanyon>;
    let art: Awaited<ReturnType<typeof loadCanyonArt>> | undefined;
    let loading = false;
    let disposed = false;

    const syncScene = () => {
      if (motion.matches) {
        animation?.stop();
        animation = undefined;
        return;
      }

      const night = root.dataset.theme === "dark";
      if (animation) {
        animation.setNight(night);
      } else if (art) {
        animation = animateCanyon(canvas, art, night);
      } else if (!loading) {
        loading = true;
        void loadCanyonArt().then((loaded) => {
          if (disposed) return;
          art = loaded;
          syncScene();
        }).catch(() => {
          // The theme's still image remains available if the artwork cannot load.
        });
      }
    };

    const theme = new MutationObserver(syncScene);
    theme.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    motion.addEventListener("change", syncScene);
    syncScene();

    return () => {
      disposed = true;
      theme.disconnect();
      motion.removeEventListener("change", syncScene);
      animation?.stop();
    };
  }, []);

  return (
    <figure
      className="homepage-animation"
      aria-label="Pixel art of a green T. rex in a canyon that changes from sunset to a starry night"
    >
      <canvas ref={canvasRef} width={canyonWidth} height={canyonHeight} aria-hidden="true" />
    </figure>
  );
}
