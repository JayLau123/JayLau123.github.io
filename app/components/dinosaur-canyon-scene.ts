export const canyonWidth = 780;
export const canyonHeight = 288;

const tileWidth = 146;
const tileHeight = 112;
const tilesPerRow = 16;
const posesPerSecond = 60;
const lastPose = 155;
const sleepingAt = lastPose / posesPerSecond;
const settleDuration = 3.93;
const meteorPeriod = 7.4;
const tau = 2 * Math.PI;

const picturePaths = {
  sunset: "/dinosaur-canyon-sunset-scene.webp",
  night: "/dinosaur-canyon-night-scene.webp",
  poses: "/dinosaur-canyon-rex-sleeping-left.webp",
} as const;

type CanyonArt = { [key in keyof typeof picturePaths]: HTMLImageElement };

type Context = CanvasRenderingContext2D;

async function loadImage(src: string) {
  const image = new Image();
  image.src = src;
  await image.decode();
  return image;
}

export async function loadCanyonArt(): Promise<CanyonArt> {
  const [sunset, night, poses] = await Promise.all([
    loadImage(picturePaths.sunset), loadImage(picturePaths.night), loadImage(picturePaths.poses),
  ]);
  return { sunset, night, poses };
}

function smooth(start: number, end: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

const riverLights = [
  [46, 251, 13], [89, 241, 8], [100, 263, 17], [130, 238, 7], [154, 227, 8],
  [163, 254, 8], [181, 278, 12], [195, 219, 8], [225, 218, 6], [251, 202, 6],
  [268, 197, 5], [276, 191, 4], [284, 191, 3],
];
const stars = [[53, 57], [81, 82], [153, 47], [194, 28], [258, 84], [337, 43],
  [408, 71], [504, 32], [566, 72], [648, 53], [707, 50], [749, 76]];

function drawWaterAndStars(ctx: Context, seconds: number, darkness: number) {
  ctx.save();
  const waterRed = Math.round(236 - 66 * darkness);
  const waterGreen = Math.round(245 - 26 * darkness);
  const waterBlue = Math.round(229 + 8 * darkness);
  ctx.fillStyle = `rgb(${waterRed}, ${waterGreen}, ${waterBlue})`;
  riverLights.forEach(([x, y, length], index) => {
    const wave = Math.max(0, Math.sin(seconds * (1.1 + (index % 3) * 0.4) + index * 2.1));
    ctx.globalAlpha = wave * 0.19;
    ctx.fillRect(Math.round(x + 2 * wave), y, Math.round(length * wave), 1);
  });
  const starlight = smooth(0.32, 0.9, darkness);
  ctx.fillStyle = "#d9effa";
  stars.forEach(([x, y], index) => {
    const twinkle = 0.5 + 0.5 * Math.sin(seconds * (1.4 + (index % 4) * 0.36) + index * 2.3);
    ctx.globalAlpha = (0.16 + 0.55 * twinkle ** 2) * starlight;
    ctx.fillRect(x, y, 1, 1);
    if (index % 3 === 2 && twinkle > 0.78) {
      ctx.globalAlpha *= 0.35 * smooth(0.78, 0.94, twinkle);
      ctx.fillRect(x - 1, y, 3, 1);
      ctx.fillRect(x, y - 1, 1, 3);
    }
  });
  ctx.restore();
}

const lettering = ["010111", "101010", "111010", "101010", "101111"];

function drawMeteorPass(ctx: Context, seconds: number, visibility: number) {
  const afterRidge = seconds - meteorPeriod;
  if (afterRidge >= 0.78) return;

  const phase = Math.min(1, seconds / meteorPeriod);
  const distance = 0.7 * phase + 0.3 * smooth(0, 1, phase);
  const x = Math.round(786 - 660 * distance);
  const y = Math.round(63 + 78 * distance);
  const entering = smooth(0, 0.075, distance) * visibility;
  const fading = smooth(0.83, 1, distance);
  const head = entering * (1 - smooth(0.92, 1, distance));
  const trail = entering * (1 - 0.58 * fading) * (1 - smooth(0, 0.78, afterRidge));
  const gap = Math.round(8 * fading + 106 * smooth(0, 0.78, afterRidge));
  const length = Math.round(204 + 34 * Math.sin(Math.PI * distance));
  const slope = 78 / 660;

  ctx.save();
  if (head > 0) {
    const glow = ctx.createRadialGradient(x, y, 1, x, y, 15);
    glow.addColorStop(0, "rgba(254, 164, 78, .36)");
    glow.addColorStop(1, "rgba(254, 164, 78, 0)");
    ctx.globalAlpha = head;
    ctx.fillStyle = glow;
    ctx.fillRect(x - 15, y - 15, 30, 30);
  }
  ctx.fillStyle = "#f2ab69";
  for (let i = gap; i < length; i++) {
    const localFade = smooth(gap, gap + 2 + 15 * fading, i);
    const strength = 1 - i / length;
    ctx.globalAlpha = trail * localFade * strength ** 0.62;
    const row = y - Math.round(i * slope);
    ctx.fillRect(x + i, row, 1, 1);
    if (strength > 0.56) ctx.fillRect(x + i, row - 1, 1, 1);
    if (strength > 0.45 && (i + Math.round(seconds * 15)) % 13 < 6) {
      ctx.globalAlpha *= 0.53;
      ctx.fillRect(x + i, row + 2, 1, 1);
    }
  }
  if (head > 0) {
    ctx.globalAlpha = head;
    ctx.fillStyle = "#ed863c";
    ctx.fillRect(x - 5, y - 1, 15, 5);
    ctx.fillRect(x - 2, y - 3, 15, 5);
    ctx.fillStyle = "#ffdf90";
    ctx.fillRect(x - 3, y, 11, 2);
    ctx.fillStyle = "#fff7db";
    ctx.fillRect(x - 2, y - 1, 5, 2);
    ctx.globalAlpha *= smooth(.17, .36, distance) * (1 - smooth(.88, .95, distance));
    ctx.fillStyle = "#fbeace";
    lettering.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        if (line[col] === "1") ctx.fillRect(x + 12 + (col >= 3 ? 2 : 0) + col, y - 16 + row, 1, 1);
      }
    });
  }
  ctx.restore();
}

function drawRex(ctx: Context, atlas: HTMLImageElement, seconds: number, settleTime: number, darkness: number) {
  const frame = Math.min(lastPose, Math.round(settleTime * posesPerSecond));
  const breathing = (0.58 * (1 - smooth(0, 0.24, settleTime)) +
    0.64 * smooth(sleepingAt, sleepingAt + 0.27, settleTime)) * Math.sin(seconds * 1.5);
  const stretch = smooth(0.1, 2.8, settleTime);
  ctx.save();
  ctx.fillStyle = "#1f213259";
  ctx.beginPath();
  ctx.ellipse(559 + 1.8 * stretch, 231, 30 + 17 * stretch, 3, 0, 0, tau);
  ctx.fill();
  ctx.filter = `brightness(${1 - 0.14 * darkness}) saturate(${1 - 0.09 * darkness})`;
  ctx.drawImage(atlas, (frame % tilesPerRow) * tileWidth, Math.floor(frame / tilesPerRow) * tileHeight,
    tileWidth, tileHeight, 490, 126 - breathing, tileWidth, tileHeight + breathing);
  ctx.restore();
}

export function animateCanyon(canvas: HTMLCanvasElement, art: CanyonArt, startAtNight: boolean) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;
  const ctx = context;
  ctx.imageSmoothingEnabled = false;

  const started = performance.now();
  let previousFrame = started;
  let from = startAtNight ? settleDuration : 0;
  let target = from;
  let transitionStart = started;
  let frameHandle = 0;

  function settleTimeAt(now: number) {
    const elapsed = (now - transitionStart) / 1000;
    return elapsed >= Math.abs(target - from) ? target : from + Math.sign(target - from) * elapsed;
  }

  function paint(now: number) {
    const settleTime = settleTimeAt(now);
    const darkness = smooth(0, settleDuration, settleTime);
    const seconds = (now - started) / 1000;
    ctx.drawImage(darkness === 1 ? art.night : art.sunset, 0, 0);
    if (darkness > 0 && darkness < 1) {
      ctx.globalAlpha = darkness;
      ctx.drawImage(art.night, 0, 0);
      ctx.globalAlpha = 1;
    }
    drawWaterAndStars(ctx, seconds, darkness);
    const meteorLight = 1 - smooth(0.02, 0.67, darkness);
    if (meteorLight > 0) {
      const phase = (seconds + 1.1) % meteorPeriod;
      drawMeteorPass(ctx, phase + meteorPeriod, meteorLight);
      drawMeteorPass(ctx, phase, meteorLight);
    }
    drawRex(ctx, art.poses, seconds, settleTime, darkness);
  }

  function tick(now: number) {
    const transitioning = now - transitionStart < 1000 * Math.abs(target - from);
    if (transitioning || now - previousFrame >= 31) {
      paint(now);
      previousFrame = now;
    }
    frameHandle = requestAnimationFrame(tick);
  }

  paint(started);
  canvas.dataset.ready = "";
  frameHandle = requestAnimationFrame(tick);

  return {
    setNight(night: boolean) {
      const next = night ? settleDuration : 0;
      if (next === target) return;
      const now = performance.now();
      from = settleTimeAt(now);
      target = next;
      transitionStart = now;
    },
    stop() {
      cancelAnimationFrame(frameHandle);
      delete canvas.dataset.ready;
    },
  };
}
