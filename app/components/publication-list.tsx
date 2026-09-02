"use client";

import { useEffect, useId, useRef, useState } from "react";

export type Publication = {
  date: string;
  dateTime: string;
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  href: string;
};

export function PublicationList({
  publications,
}: {
  publications: readonly Publication[];
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const panelIdPrefix = useId();

  useEffect(() => {
    if (expandedIndex === null) {
      return;
    }

    const closeFromOutside = (event: PointerEvent) => {
      const expandedCard = listRef.current?.querySelector(
        `[data-publication-index="${expandedIndex}"]`,
      );

      if (expandedCard && !expandedCard.contains(event.target as Node)) {
        setExpandedIndex(null);
      }
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [expandedIndex]);

  return (
    <ol className="publication-list" ref={listRef}>
      {publications.map((paper, index) => {
        const isExpanded = expandedIndex === index;
        const panelId = `${panelIdPrefix}-publication-${index}`;

        return (
          <li
            className={`publication-item${isExpanded ? " is-expanded" : ""}`}
            data-publication-index={index}
            key={paper.title}
          >
            <button
              className="publication-summary"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <time className="publication-date" dateTime={paper.dateTime}>
                {paper.date}
              </time>
              <span className="publication-main">
                <span className="publication-title">{paper.title}</span>
                <span className="authors">{paper.authors}</span>
                <span className="venue">{paper.venue}</span>
              </span>
              <span className="publication-expand-icon" aria-hidden="true" />
            </button>

            <div
              className="publication-details"
              id={panelId}
              aria-hidden={!isExpanded}
            >
              <div className="publication-details-inner">
                <div className="publication-details-content">
                  <h3>Abstract</h3>
                  <p className="publication-abstract">{paper.abstract}</p>
                  <a
                    className="publication-read-more"
                    href={paper.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isExpanded ? 0 : -1}
                  >
                    Read more <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
