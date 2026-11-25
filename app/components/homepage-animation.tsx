"use client";

import { useEffect, useRef, useState } from "react";

function setPlayback(video: HTMLVideoElement, play: boolean) {
  if (play) {
    // The play button remains available when the browser blocks autoplay.
    void video.play().catch(() => {});
  } else {
    video.pause();
  }
}

export function HomepageAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => setPlayback(video, !motion.matches);
    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    return () => motion.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <figure
      className="homepage-animation"
      aria-label="Pixel art of two dinosaurs watching a meteor as a canyon turns from sunset to night"
    >
      <video
        ref={videoRef}
        id="homepage-animation-video"
        src="/dinosaur-canyon.mp4"
        poster="/dinosaur-canyon.webp"
        width={1040}
        height={384}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="homepage-animation-control"
        aria-controls="homepage-animation-video"
        aria-label={playing ? "Pause animation" : "Play animation"}
        onClick={() => {
          const video = videoRef.current;
          if (video) setPlayback(video, video.paused);
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </figure>
  );
}
