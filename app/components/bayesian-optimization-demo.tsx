"use client";

import { useEffect, useRef, useState } from "react";

const grid = Array.from({ length: 151 }, (_, index) => index / 150);
const priorMean = 0.55;
const evaluationCount = 7;

function syntheticResponse(x: number) {
  return (
    0.42 +
    0.91 * Math.exp(-(((x - 0.24) / 0.13) ** 2)) +
    1.62 * Math.exp(-(((x - 0.76) / 0.16) ** 2)) -
    0.23 * Math.exp(-(((x - 0.49) / 0.13) ** 2))
  );
}

function covariance(x: number, y: number) {
  return Math.exp(-0.5 * ((x - y) / 0.15) ** 2);
}

function expectedImprovement(mean: number, deviation: number, best: number) {
  const improvement = mean - best;
  const z = improvement / deviation;
  const density = Math.exp(-0.5 * z ** 2) / Math.sqrt(2 * Math.PI);
  // Approximation of the standard normal CDF (Abramowitz and Stegun, 26.2.17).
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const tail = density * t * (
    0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))
  );
  const cdf = z < 0 ? tail : 1 - tail;
  return Math.max(0, improvement * cdf + deviation * density);
}

function forwardSolve(lower: number[][], values: number[]) {
  const solution: number[] = [];
  for (const [i, row] of lower.entries()) {
    const previous = solution.reduce((sum, value, j) => sum + row[j] * value, 0);
    solution.push((values[i] - previous) / row[i]);
  }
  return solution;
}

function createFrames() {
  const observations = [18, 60].map((index) => ({ index, value: syntheticResponse(grid[index]) }));
  return Array.from({ length: evaluationCount + 1 }, (_, step) => {
    const lower = observations.map(() => observations.map(() => 0));
    for (const [i, point] of observations.entries()) {
      for (let j = 0; j <= i; j += 1) {
        let residual = covariance(grid[point.index], grid[observations[j].index]);
        for (let k = 0; k < j; k += 1) residual -= lower[i][k] * lower[j][k];
        lower[i][j] = i === j ? Math.sqrt(residual + 1e-6) : residual / lower[j][j];
      }
    }

    const centered = forwardSolve(lower, observations.map(({ value }) => value - priorMean));
    const best = Math.max(...observations.map(({ value }) => value));
    const posterior = grid.map((x) => {
      const weights = forwardSolve(lower, observations.map(({ index }) => covariance(x, grid[index])));
      const mean = weights.reduce((sum, weight, i) => sum + weight * centered[i], priorMean);
      const variance = weights.reduce((remaining, weight) => remaining - weight ** 2, 1);
      const deviation = Math.sqrt(Math.max(1e-10, variance));
      return {
        mean,
        lower: mean - 1.96 * deviation,
        upper: mean + 1.96 * deviation,
        acquisition: expectedImprovement(mean, deviation, best),
      };
    });

    let next = null;
    if (step < evaluationCount) {
      let bestAcquisition = -Infinity;
      // Evaluate a finite library of 51 compositions. The denser grid draws the curves.
      for (let index = 0; index < grid.length; index += 3) {
        if (
          posterior[index].acquisition > bestAcquisition &&
          observations.every((point) => point.index !== index)
        ) {
          next = index;
          bestAcquisition = posterior[index].acquisition;
        }
      }
    }

    const frame = { posterior, observations: observations.slice(), next, best };
    if (next !== null) observations.push({ index: next, value: syntheticResponse(grid[next]) });
    return frame;
  });
}

const frames = createFrames();
const acquisitionMax = Math.max(...frames.flatMap(({ posterior }) => posterior.map((p) => p.acquisition)));
function readPlotColors(canvas: HTMLCanvasElement) {
  const styles = window.getComputedStyle(canvas);
  const color = (name: string) => styles.getPropertyValue(name).trim();
  return {
    grid: color("--line"),
    text: color("--muted"),
    mean: color("--green"),
    band: color("--bo-band"),
    observation: color("--foreground"),
    surface: color("--feature-surface"),
    next: color("--amber"),
    acquisition: color("--bo-acquisition-fill"),
  };
}

function drawPlot(
  canvas: HTMLCanvasElement,
  colors: ReturnType<typeof readPlotColors>,
  step: number,
  previousStep: number,
  progress: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { clientWidth: width, clientHeight: height } = canvas;
  if (width === 0 || height === 0) return;
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  ctx.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const frame = frames[step];
  const previous = frames[previousStep];
  const mix = (from: number, to: number) => from + (to - from) * progress;
  const left = width < 420 ? 28 : 39;
  const right = width - 15;
  const top = 24;
  const bottom = height - 101;
  const acquisitionTop = bottom + 25;
  const acquisitionBottom = height - 33;
  const plotX = (x: number) => left + (right - left) * x;
  const plotY = (y: number) => bottom - ((y + 1.6) / 4.8) * (bottom - top);
  const acquisitionY = (y: number) => acquisitionBottom - (y / acquisitionMax) * (acquisitionBottom - acquisitionTop);

  ctx.font = "12px system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = colors.text;
  ctx.fillText("Response (a.u.)", left, 9);
  ctx.fillText("Expected improvement", left, bottom + 13);

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (const value of [-1, 0, 1, 2, 3]) {
    const y = plotY(value);
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.textAlign = "right";
    ctx.fillText(String(value), left - 7, y);
  }
  for (const value of [0, 0.25, 0.5, 0.75, 1]) {
    const x = plotX(value);
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.moveTo(x, acquisitionTop);
    ctx.lineTo(x, acquisitionBottom);
    ctx.textAlign = "center";
    ctx.fillText(String(value), x, acquisitionBottom + 13);
  }
  ctx.moveTo(left, acquisitionBottom);
  ctx.lineTo(right, acquisitionBottom);
  ctx.stroke();
  ctx.fillText("Composition fraction", (left + right) / 2, height - 5);

  const traceCurve = (ordinate: (index: number) => number, reverse = false) => {
    for (let i = 0; i < grid.length; i += 1) {
      const index = reverse ? grid.length - 1 - i : i;
      const x = plotX(grid[index]);
      const y = ordinate(index);
      if (i === 0 && !reverse) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  };

  const valueAt = (index: number, key: keyof (typeof frame.posterior)[number]) =>
    mix(previous.posterior[index][key], frame.posterior[index][key]);

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, right - left, bottom - top);
  ctx.clip();

  ctx.beginPath();
  traceCurve((index) => plotY(valueAt(index, "upper")));
  traceCurve((index) => plotY(valueAt(index, "lower")), true);
  ctx.closePath();
  ctx.fillStyle = colors.band;
  ctx.fill();

  ctx.beginPath();
  traceCurve((index) => plotY(valueAt(index, "mean")));
  ctx.strokeStyle = colors.mean;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();

  const scoreY = (index: number) => acquisitionY(valueAt(index, "acquisition"));
  ctx.beginPath();
  traceCurve(scoreY);
  ctx.lineTo(right, acquisitionBottom);
  ctx.lineTo(left, acquisitionBottom);
  ctx.closePath();
  ctx.fillStyle = colors.acquisition;
  ctx.fill();
  ctx.beginPath();
  traceCurve(scoreY);
  ctx.strokeStyle = colors.next;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (frame.next !== null) {
    const x = plotX(grid[frame.next]);
    ctx.globalAlpha = previousStep === step ? 1 : progress;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.moveTo(x, acquisitionTop);
    ctx.lineTo(x, acquisitionBottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(x, scoreY(frame.next), 4, 0, 2 * Math.PI);
    ctx.fillStyle = colors.next;
    ctx.fill();
  }

  for (const [i, observation] of frame.observations.entries()) {
    const x = plotX(grid[observation.index]);
    const y = plotY(observation.value);
    const isNew = i >= previous.observations.length;
    if (isNew && progress < 1) {
      ctx.beginPath();
      ctx.arc(x, y, 5 + 9 * progress, 0, 2 * Math.PI);
      ctx.globalAlpha = 1 - progress;
      ctx.strokeStyle = colors.mean;
      ctx.stroke();
    }
    ctx.globalAlpha = isNew ? progress : 1;
    ctx.beginPath();
    ctx.arc(x, y, 4.4, 0, 2 * Math.PI);
    ctx.fillStyle = colors.observation;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = colors.surface;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function BayesianOptimizationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousStep = useRef(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);
    setPlaying(!motion.matches);
    function updateMotion() {
      setReducedMotion(motion.matches);
      if (motion.matches) setPlaying(false);
    }
    motion.addEventListener("change", updateMotion);

    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    visibility.observe(canvas);
    return () => {
      motion.removeEventListener("change", updateMotion);
      visibility.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible || step === evaluationCount) return;
    const timer = window.setTimeout(() => {
      setStep(step + 1);
      if (step + 1 === evaluationCount) setPlaying(false);
    }, 1850);
    return () => window.clearTimeout(timer);
  }, [step, playing, visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const from = previousStep.current;
    previousStep.current = step;
    let progress = reducedMotion || from >= step ? 1 : 0;
    let animation = 0;
    const started = performance.now();
    let colors = readPlotColors(canvas);
    const paint = () => drawPlot(canvas, colors, step, from, 1 - (1 - progress) ** 3);
    const resize = new ResizeObserver(paint);
    resize.observe(canvas);
    const theme = new MutationObserver(() => {
      colors = readPlotColors(canvas);
      paint();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function animate(now: number) {
      progress = Math.min(1, (now - started) / 850);
      paint();
      if (progress < 1) animation = requestAnimationFrame(animate);
    }

    paint();
    if (progress < 1) animation = requestAnimationFrame(animate);
    return () => {
      resize.disconnect();
      theme.disconnect();
      cancelAnimationFrame(animation);
    };
  }, [step, reducedMotion]);

  const frame = frames[step];
  const finished = step === evaluationCount;
  const status = frame.next === null
    ? "Evaluation budget reached."
    : `Next composition fraction ${grid[frame.next].toFixed(2)}.`;
  return (
    <figure className="research-schematic bo-demo" aria-label="Bayesian optimization demo">
      <ul className="bo-demo-legend" aria-label="Plot legend">
        <li><span className="bo-key-mean" />GP mean</li>
        <li><span className="bo-key-band" />95% credible interval</li>
        <li><span className="bo-key-observation" />Observation</li>
        <li><span className="bo-key-next" />Next candidate</li>
      </ul>
      <canvas
        ref={canvasRef}
        className="bo-demo-canvas"
        role="img"
        aria-label={`Gaussian process fitted to ${frame.observations.length} observations. Best observed response ${frame.best.toFixed(2)}. ${status}`}
        aria-describedby="bo-demo-caption"
      >
        The Gaussian process prediction and uncertainty update after each new observation.
      </canvas>
      <div className="bo-demo-controls">
        <button
          className="bo-demo-play"
          type="button"
          onClick={() => {
            if (finished) setStep(0);
            setPlaying(!playing);
          }}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : finished ? "↻" : "▶"}</span>
          {playing ? "Pause" : finished ? "Replay" : "Play"}
        </button>
        <button
          type="button"
          disabled={finished}
          onClick={() => {
            setPlaying(false);
            setStep((current) => Math.min(evaluationCount, current + 1));
          }}
        >
          Step <span aria-hidden="true">→</span>
        </button>
        <span className="bo-demo-count">{frame.observations.length} observations</span>
        <span className="sr-only" aria-live={playing ? "off" : "polite"}>
          {frame.observations.length} observations. {status}
        </span>
      </div>
      <figcaption id="bo-demo-caption">Synthetic example</figcaption>
    </figure>
  );
}
