import snapshot from "./scholar-publications.json";

const scholarUser = "f2qAmGIAAAAJ";
export const scholarUrl = `https://scholar.google.com/citations?user=${scholarUser}&hl=en`;
const snapshotUrl =
  "https://raw.githubusercontent.com/JayLau123/JayLau123.github.io/main/app/scholar-publications.json";

type PublicationSource =
  | { scholarId: string; openAlexId?: string }
  | { scholarId?: undefined; openAlexId: string };

type PublicationMetadata = {
  title: string;
  authors: string;
  venue: string;
};

type PublicationRecord = PublicationSource & PublicationMetadata & {
  year: string;
};

export type Publication = PublicationSource & PublicationMetadata & {
  date: string;
  dateTime: string;
  abstract?: string;
  articleUrl?: string;
  coverUrl?: string;
};

export function publicationId(paper: PublicationSource) {
  return paper.scholarId ?? paper.openAlexId;
}

export function publicationCitationUrl(paper: PublicationSource) {
  if (paper.openAlexId) {
    return `https://openalex.org/works/${paper.openAlexId}`;
  }
  return `${scholarUrl}&view_op=view_citation&citation_for_view=${scholarUser}:${paper.scholarId}`;
}

function isPublicationRecord(paper: unknown): paper is PublicationRecord {
  if (!paper || typeof paper !== "object") {
    return false;
  }

  const scholarId = "scholarId" in paper ? paper.scholarId : undefined;
  const openAlexId = "openAlexId" in paper ? paper.openAlexId : undefined;
  return (
    (scholarId !== undefined || openAlexId !== undefined) &&
    (scholarId === undefined || typeof scholarId === "string" && /^[\w-]+$/.test(scholarId)) &&
    (openAlexId === undefined || typeof openAlexId === "string" && /^W\d+$/.test(openAlexId)) &&
    "title" in paper && typeof paper.title === "string" && !!paper.title.trim() &&
    "authors" in paper && typeof paper.authors === "string" &&
    "venue" in paper && typeof paper.venue === "string" &&
    "year" in paper && typeof paper.year === "string" && /^(?:\d{4})?$/.test(paper.year)
  );
}

export async function fetchPublicationSnapshot(signal: AbortSignal) {
  const response = await fetch(snapshotUrl, { signal, credentials: "omit" });
  if (!response.ok) {
    return undefined;
  }

  const papers: unknown = await response.json();
  if (Array.isArray(papers) && papers.length && papers.every(isPublicationRecord)) {
    return papers;
  }
}

function titleKey(title: string) {
  return title.toLowerCase().normalize("NFKC")
    .replace(/\s*\([^)]+\s+\d+\/\d{4}\)\s*$/, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

export function mergePublicationSnapshot(
  curated: readonly Publication[],
  records: readonly PublicationRecord[] = snapshot,
): Publication[] {
  const byId = new Map(records.map((paper) => [publicationId(paper), paper]));
  const synced = curated.map((paper) => {
    const record = byId.get(publicationId(paper)) ??
      records.find((entry) => entry.title.toLowerCase() === paper.title.toLowerCase());

    if (!record || paper.articleUrl) {
      return paper;
    }

    const yearChanged = record.year && !paper.dateTime.startsWith(record.year);
    return {
      ...paper,
      ...record,
      authors: record.authors || paper.authors,
      venue: record.venue || paper.venue,
      date: yearChanged ? record.year : paper.date,
      dateTime: yearChanged ? record.year : paper.dateTime,
    };
  });

  const coveredTitles = new Set(synced.map((paper) => titleKey(paper.title)));
  const coveredIds = new Set(synced.map(publicationId));
  for (const record of records) {
    const id = publicationId(record);
    const key = titleKey(record.title);
    if (!coveredIds.has(id) && !coveredTitles.has(key)) {
      synced.push({ ...record, date: record.year, dateTime: record.year });
      coveredIds.add(id);
      coveredTitles.add(key);
    }
  }

  return synced.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
}
