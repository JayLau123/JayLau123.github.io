"use client";

import { useEffect, useRef, useState } from "react";
import { BayesianOptimizationDemo } from "./bayesian-optimization-demo";

const explorerUrl = "/research/bayesian-optimization-3d/";

export function BayesianOptimizationViews() {
  const [show3D, setShow3D] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  function changeView(nextShow3D: boolean) {
    moveFocus.current = true;
    setShow3D(nextShow3D);
  }

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (show3D ? backButtonRef : exploreButtonRef).current?.focus();
  }, [show3D]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const siteRoot = document.documentElement;
    let sizeObserver: ResizeObserver | undefined;

    const syncTheme = () => {
      const explorerRoot = frame.contentDocument?.documentElement;
      if (explorerRoot) {
        explorerRoot.dataset.theme = siteRoot.dataset.theme === "dark" ? "dark" : "light";
      }
    };

    const connect = () => {
      sizeObserver?.disconnect();
      const explorer = frame.contentDocument;
      if (!explorer?.getElementById("ternary-bayesian-optimization")) return;

      syncTheme();
      const body = explorer.body;
      const fitContent = () => {
        frame.style.height = `${Math.ceil(body.getBoundingClientRect().height)}px`;
      };
      fitContent();
      sizeObserver = new ResizeObserver(fitContent);
      sizeObserver.observe(body);
    };

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(siteRoot, { attributes: true, attributeFilter: ["data-theme"] });
    frame.addEventListener("load", connect);
    connect();

    return () => {
      sizeObserver?.disconnect();
      themeObserver.disconnect();
      frame.removeEventListener("load", connect);
    };
  }, [show3D]);

  return (
    <div className="bo-views">
      {show3D && (
        <div className="bo-demo-controls bo-view-controls">
          <button
            ref={backButtonRef}
            type="button"
            aria-controls="bo-visualization"
            onClick={() => changeView(false)}
          >
            Back to 2D
          </button>
        </div>
      )}
      <div id="bo-visualization">
        <div hidden={show3D}>
          <BayesianOptimizationDemo
            onExplore3D={() => changeView(true)}
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
