"use client";

import { useState } from "react";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryYear = {
  year: string;
  photos: readonly GalleryPhoto[];
};

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  const path =
    direction === "previous" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7";

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
}

export function GalleryYearCarousel({ years }: { years: readonly GalleryYear[] }) {
  const [activeByYear, setActiveByYear] = useState<Record<string, number>>({});

  function move(year: string, total: number, direction: -1 | 1) {
    setActiveByYear((current) => {
      const active = current[year] ?? 0;
      return {
        ...current,
        [year]: (active + direction + total) % total,
      };
    });
  }

  return (
    <div className="gallery-year-list">
      {years.map((group) => {
        const activeIndex = activeByYear[group.year] ?? 0;
        const activePhoto = group.photos[activeIndex];
        const hasMultiplePhotos = group.photos.length > 1;

        return (
          <section className="gallery-year-panel" key={group.year}>
            <p className="gallery-year-label">{group.year}</p>
            <figure className="gallery-slide" key={activePhoto.src}>
              <div className="gallery-image-window">
                <img src={activePhoto.src} alt={activePhoto.alt} />
                {hasMultiplePhotos ? (
                  <>
                    <button
                      className="gallery-arrow gallery-arrow-left"
                      type="button"
                      aria-label={`Previous ${group.year} photo`}
                      onClick={() => move(group.year, group.photos.length, -1)}
                    >
                      <ArrowIcon direction="previous" />
                    </button>
                    <button
                      className="gallery-arrow gallery-arrow-right"
                      type="button"
                      aria-label={`Next ${group.year} photo`}
                      onClick={() => move(group.year, group.photos.length, 1)}
                    >
                      <ArrowIcon direction="next" />
                    </button>
                  </>
                ) : null}
              </div>
              <figcaption>{activePhoto.caption}</figcaption>
            </figure>
          </section>
        );
      })}
    </div>
  );
}
