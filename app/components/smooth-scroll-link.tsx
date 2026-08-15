"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

let stopActiveScroll: (() => void) | null = null;

function scrollToHash(href: string) {
  const target = document.getElementById(href.slice(1));

  if (!target) {
    return;
  }

  stopActiveScroll?.();

  const start = window.scrollY;
  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY - 28;
  const distance = targetPosition - start;
  const duration = Math.min(620, Math.max(280, Math.abs(distance) * 0.12));
  const startedAt = performance.now();
  let frame = 0;

  const cleanup = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel, true);
    window.removeEventListener("touchstart", cancel, true);
    window.removeEventListener("keydown", cancel, true);

    if (stopActiveScroll === cleanup) {
      stopActiveScroll = null;
    }
  };

  const cancel = () => {
    cleanup();
  };

  const animate = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      frame = requestAnimationFrame(animate);
      return;
    }

    cleanup();
    window.history.replaceState(null, "", href);
  };

  window.addEventListener("wheel", cancel, true);
  window.addEventListener("touchstart", cancel, true);
  window.addEventListener("keydown", cancel, true);
  stopActiveScroll = cleanup;
  frame = requestAnimationFrame(animate);
}

type SmoothScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function SmoothScrollLink({
  href = "",
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      !href.startsWith("#") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    event.preventDefault();
    scrollToHash(href);
  }

  return <a href={href} onClick={handleClick} {...props} />;
}
