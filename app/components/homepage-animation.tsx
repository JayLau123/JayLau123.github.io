"use client";

import { useEffect, useRef } from "react";

const scenes = {
  sunset: "/dinosaur-canyon-meteor-loop.mp4",
  night: "/dinosaur-canyon-meteor-loop-night.mp4",
} as const;

export function HomepageAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentScene: keyof typeof scenes | undefined;
    let position = 0;
    let awaitingMetadata = false;

    const restorePosition = () => {
      if (video.currentSrc !== video.src) return;
      if (position > 0 && Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = position % video.duration;
      }
      awaitingMetadata = false;
    };

    const reveal = () => {
      if (
        !motion.matches && !awaitingMetadata && !video.seeking && !video.paused &&
        video.currentSrc === video.src && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        video.dataset.ready = "";
      }
    };

    const syncScene = () => {
      if (motion.matches) {
        video.pause();
        delete video.dataset.ready;
        return;
      }

      const nextScene = root.dataset.theme === "dark" ? "night" : "sunset";
      if (nextScene !== currentScene) {
        if (!awaitingMetadata && !video.seeking && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          position = video.currentTime;
        }
        delete video.dataset.ready;
        currentScene = nextScene;
        awaitingMetadata = true;
        video.dataset.scene = nextScene;
        video.src = scenes[nextScene];
        video.load();
      }

      // Browsers that block autoplay still display the poster for the active theme.
      void video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", restorePosition);
    video.addEventListener("playing", reveal);
    video.addEventListener("seeked", reveal);
    const theme = new MutationObserver(syncScene);
    theme.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    motion.addEventListener("change", syncScene);
    syncScene();

    return () => {
      theme.disconnect();
      motion.removeEventListener("change", syncScene);
      video.removeEventListener("loadedmetadata", restorePosition);
      video.removeEventListener("playing", reveal);
      video.removeEventListener("seeked", reveal);
      video.pause();
    };
  }, []);

  return (
    <figure
      className="homepage-animation"
      aria-label="Pixel art of a green T. rex watching a meteor over a canyon"
    >
      <video
        ref={videoRef}
        width={1560}
        height={576}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    </figure>
  );
}
