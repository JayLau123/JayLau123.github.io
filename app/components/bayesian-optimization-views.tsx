"use client";

import { useEffect, useRef, useState } from "react";
import { BayesianOptimizationDemo } from "./bayesian-optimization-demo";

const explorerUrl = "/research/bayesian-optimization-3d/";

export function BayesianOptimizationViews() {
  const [show3D, setShow3D] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  function openExplorer() {
    moveFocus.current = true;
    setShow3D(true);
  }

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      if (moveFocus.current) {
        moveFocus.current = false;
        exploreButtonRef.current?.focus();
      }
      return;
    }

    const siteRoot = document.documentElement;
    let sizeObserver: ResizeObserver | undefined;
    let backButton: HTMLButtonElement | null = null;

    const returnTo2D = () => {
      moveFocus.current = true;
      setShow3D(false);
    };

    const syncTheme = () => {
      const explorerRoot = frame.contentDocument?.documentElement;
      if (explorerRoot) {
        explorerRoot.dataset.theme = siteRoot.dataset.theme === "dark" ? "dark" : "light";
      }
    };

    const connect = () => {
      sizeObserver?.disconnect();
      backButton?.removeEventListener("click", returnTo2D);
      const explorer = frame.contentDocument;
      if (!explorer?.getElementById("ternary-bayesian-optimization")) return;

      syncTheme();
      backButton = explorer.querySelector<HTMLButtonElement>("[data-back-to-2d]");
      if (backButton) {
        backButton.hidden = false;
        backButton.addEventListener("click", returnTo2D);
      }
      const body = explorer.body;
      const fitContent = () => {
        frame.style.height = `${Math.ceil(body.getBoundingClientRect().height)}px`;
      };
      fitContent();
      sizeObserver = new ResizeObserver(fitContent);
      sizeObserver.observe(body);
      if (moveFocus.current && backButton) {
        moveFocus.current = false;
        frame.scrollIntoView({ block: "start" });
        backButton.focus({ preventScroll: true });
      }
    };

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(siteRoot, { attributes: true, attributeFilter: ["data-theme"] });
    frame.addEventListener("load", connect);
    connect();

    return () => {
      sizeObserver?.disconnect();
      backButton?.removeEventListener("click", returnTo2D);
      themeObserver.disconnect();
      frame.removeEventListener("load", connect);
    };
  }, [show3D]);

  return (
    <div className="bo-views">
      <div id="bo-visualization">
        <div hidden={show3D}>
          <BayesianOptimizationDemo
            onExplore3D={openExplorer}
            exploreButtonRef={exploreButtonRef}
          />
        </div>
        {show3D && (
          <div className="research-schematic bo-3d-panel">
            <iframe
              ref={frameRef}
              className="bo-3d-frame"
              src={explorerUrl}
              title="3D Bayesian optimization explorer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
