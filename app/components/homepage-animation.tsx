"use client";

import { useEffect, useRef } from "react";

export function HomepageAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motion.matches) {
        video.pause();
      } else {
        // Browsers that block autoplay still display the sunset poster.
        void video.play().catch(() => {});
      }
    };
    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    return () => motion.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <figure
      className="homepage-animation"
      aria-label="Pixel art of two dinosaurs watching a meteor over a canyon at sunset"
    >
      <video
        ref={videoRef}
        src="/dinosaur-canyon-sunset.mp4"
        poster="/dinosaur-canyon-sunset.webp"
        width={1040}
        height={384}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    </figure>
  );
}
