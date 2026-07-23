"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryYear = {
  year: string;
  photos: readonly GalleryPhoto[];
};

type PhotoSize = {
  width: number;
  height: number;
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
  return (
    <div className="gallery-year-list">
      {years.map((group) => (
        <GalleryYearPanel group={group} key={group.year} />
      ))}
    </div>
  );
}

function GalleryYearPanel({ group }: { group: GalleryYear }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [photoSizes, setPhotoSizes] = useState<Record<string, PhotoSize>>({});

  const activePhoto = group.photos[activeIndex];
  const hasMultiplePhotos = group.photos.length > 1;
  const activeSize = activePhoto ? photoSizes[activePhoto.src] : undefined;
  const maxFrameHeight = windowWidth ? Math.min(720, windowWidth * 1.25) : 0;
  const frameHeight =
    activeSize && windowWidth
      ? Math.round(
          Math.min(
            (windowWidth * activeSize.height) / activeSize.width,
            maxFrameHeight,
          ),
        )
      : undefined;
  const frameStyle = frameHeight
    ? ({ "--gallery-frame-height": `${frameHeight}px` } as CSSProperties)
    : undefined;

  useEffect(() => {
    const node = windowRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWindowWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    group.photos.forEach((photo) => {
      const image = new Image();

      image.onload = () => {
        setPhotoSizes((current) => {
          if (current[photo.src]) {
            return current;
          }

          return {
            ...current,
            [photo.src]: {
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
          };
        });
      };

      image.src = photo.src;
    });
  }, [group.photos]);

  function move(direction: -1 | 1) {
    setActiveIndex((current) => {
      return (current + direction + group.photos.length) % group.photos.length;
    });
  }

  if (!activePhoto) {
    return null;
  }

  return (
    <section className="gallery-year-panel">
      <p className="gallery-year-label">{group.year}</p>
      <figure className="gallery-slide">
        <div className="gallery-image-window" ref={windowRef} style={frameStyle}>
          <img
            src={activePhoto.src}
            alt={activePhoto.alt}
            decoding="async"
            key={activePhoto.src}
          />
          {hasMultiplePhotos ? (
            <>
              <button
                className="gallery-arrow gallery-arrow-left"
                type="button"
                aria-label={`Previous ${group.year} photo`}
                onClick={() => move(-1)}
              >
                <ArrowIcon direction="previous" />
              </button>
              <button
                className="gallery-arrow gallery-arrow-right"
                type="button"
                aria-label={`Next ${group.year} photo`}
                onClick={() => move(1)}
              >
                <ArrowIcon direction="next" />
              </button>
            </>
          ) : null}
        </div>
        <figcaption key={`caption-${activePhoto.src}`}>
          {activePhoto.caption}
        </figcaption>
      </figure>
    </section>
  );
}
