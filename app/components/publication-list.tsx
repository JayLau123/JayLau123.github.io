"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  fetchScholarPublications,
  mergeScholarPublications,
  scholarCitationUrl,
  type Publication,
} from "../scholar-publications";

export function PublicationList({
  publications: curated,
}: {
  publications: readonly Publication[];
}) {
  const [publications, setPublications] = useState(() =>
    mergeScholarPublications(curated),
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const panelIdPrefix = useId();

  useEffect(() => {
    const controller = new AbortController();
    fetchScholarPublications(controller.signal)
      .then((records) => {
        if (records && !controller.signal.aborted) {
          setPublications(mergeScholarPublications(curated, records));
        }
      })
      .catch(() => {
        // The rendered snapshot stays visible if the refresh is unavailable.
      });

    return () => controller.abort();
  }, [curated]);

  useEffect(() => {
    if (expandedId === null) {
      return;
    }

    const closeFromOutside = (event: PointerEvent) => {
      const expandedCard = listRef.current?.querySelector(
        ".publication-item.is-expanded",
      );

      if (expandedCard && !expandedCard.contains(event.target as Node)) {
        setExpandedId(null);
      }
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedId(null);
      }
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [expandedId]);

  return (
    <ol className="publication-list" ref={listRef}>
      {publications.map((paper, index) => {
        const isExpanded = expandedId === paper.scholarId;
        const panelId = `${panelIdPrefix}-publication-${paper.scholarId}`;
        const citationUrl = scholarCitationUrl(paper.scholarId);

        return (
          <li
            className={`publication-item${isExpanded ? " is-expanded" : ""}`}
            data-publication-index={index}
            key={paper.scholarId}
          >
            <button
              className="publication-summary"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => setExpandedId(isExpanded ? null : paper.scholarId)}
            >
              {paper.date ? (
                <time className="publication-date" dateTime={paper.dateTime}>
                  {paper.date}
                </time>
              ) : (
                <span className="publication-date" aria-hidden="true" />
              )}
              <span className="publication-main">
                <span className="publication-title">{paper.title}</span>
                {paper.authors && <span className="authors">{paper.authors}</span>}
                {paper.venue && <span className="venue">{paper.venue}</span>}
                {paper.coverUrl && <span className="publication-cover">Cover Picture</span>}
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
                  {paper.abstract && (
                    <>
                      <h3>Abstract</h3>
                      <p className="publication-abstract">{paper.abstract}</p>
                    </>
                  )}
                  <div className="publication-actions">
                    {paper.articleUrl && (
                      <a
                        className="publication-source"
                        href={citationUrl}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isExpanded ? 0 : -1}
                      >
                        Google Scholar
                      </a>
                    )}
                    {paper.coverUrl && (
                      <a
                        className="publication-source"
                        href={paper.coverUrl}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isExpanded ? 0 : -1}
                      >
                        View Cover Picture
                      </a>
                    )}
                    <a
                      className="publication-read-more"
                      href={paper.articleUrl ?? citationUrl}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isExpanded ? 0 : -1}
                    >
                      {paper.articleUrl ? "View article" : "Read more"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
