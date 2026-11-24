"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  fetchPublicationSnapshot,
  mergePublicationSnapshot,
  publicationCitationUrl,
  publicationId,
  type Publication,
} from "../scholar-publications";

export function PublicationList({
  publications: curated,
}: {
  publications: readonly Publication[];
}) {
  const [publications, setPublications] = useState(() =>
    mergePublicationSnapshot(curated),
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const panelIdPrefix = useId();

  useEffect(() => {
    const controller = new AbortController();
    fetchPublicationSnapshot(controller.signal)
      .then((records) => {
        if (records && !controller.signal.aborted) {
          setPublications(mergePublicationSnapshot(curated, records));
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
        const id = publicationId(paper);
        const isExpanded = expandedId === id;
        const panelId = `${panelIdPrefix}-publication-${id}`;

        return (
          <li
            className={`publication-item${isExpanded ? " is-expanded" : ""}`}
            data-publication-index={index}
            key={id}
          >
            <button
              className="publication-summary"
              type="button"
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => setExpandedId(isExpanded ? null : id)}
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
                  <a
                    className="publication-read-more"
                    href={paper.articleUrl ?? publicationCitationUrl(paper)}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isExpanded ? 0 : -1}
                  >
                    {paper.articleUrl ? "View article" : "Read more"}
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
