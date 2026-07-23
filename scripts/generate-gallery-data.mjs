import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outputPath = path.join(root, "app", "gallery-data.ts");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

async function readCaptionMap(yearDir, year, imageFiles) {
  const files = await readdir(yearDir);
  const captionFile = files.find((file) => file.toLowerCase().includes("caption"));
  const imageBases = imageFiles.map((file) => path.parse(file).name);
  const captions = new Map();

  if (!captionFile) {
    return captions;
  }

  const text = await readFile(path.join(yearDir, captionFile), "utf8");
  const entries = text
    .split(/\r?\n/)
    .map((line) => line.match(/^([^:]+):\s*(.+)$/))
    .filter(Boolean)
    .map((match) => [match[1].trim(), match[2].trim()]);

  for (const [key, caption] of entries) {
    if (!captions.has(key)) {
      captions.set(key, caption);
      continue;
    }

    const fallbackBase = imageBases.find(
      (base) =>
        !captions.has(base) &&
        base.startsWith(`${year}_`) &&
        naturalCompare(base, key) > 0,
    );

    if (fallbackBase) {
      captions.set(fallbackBase, caption);
    }
  }

  return captions;
}

function toAltText(caption) {
  return caption.replace(/^\w+\s+\d{4}\.\s*/, "").replace(/[()]/g, "").trim();
}

const yearDirs = (await readdir(publicDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => Number(b) - Number(a));

const galleryYears = [];

for (const year of yearDirs) {
  const yearDir = path.join(publicDir, year);
  const imageFiles = (await readdir(yearDir))
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort(naturalCompare);
  const captions = await readCaptionMap(yearDir, year, imageFiles);

  galleryYears.push({
    year,
    photos: imageFiles.map((file) => {
      const base = path.parse(file).name;
      const caption = captions.get(base) ?? base;

      return {
        src: `/${year}/${file}`,
        alt: toAltText(caption),
        caption,
      };
    }),
  });
}

await writeFile(
  outputPath,
  [
    "export const galleryYears = ",
    JSON.stringify(galleryYears, null, 2),
    " as const;\n",
  ].join(""),
);

console.log(`Generated ${outputPath}`);
