import snapshot from "./scholar-publications.json";

const scholarUser = "f2qAmGIAAAAJ";
export const scholarUrl = `https://scholar.google.com/citations?user=${scholarUser}&hl=en`;
const snapshotUrl =
  "https://raw.githubusercontent.com/JayLau123/JayLau123.github.io/main/app/scholar-publications.json";

type ScholarRecord = {
  scholarId: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
};

export type Publication = Omit<ScholarRecord, "year"> & {
  date: string;
  dateTime: string;
  abstract?: string;
  articleUrl?: string;
  coverUrl?: string;
};

export function scholarCitationUrl(scholarId: string) {
  return `${scholarUrl}&view_op=view_citation&citation_for_view=${scholarUser}:${scholarId}`;
}

function isScholarRecord(paper: unknown): paper is ScholarRecord {
  if (!paper || typeof paper !== "object") {
    return false;
  }

  return (
    "scholarId" in paper && typeof paper.scholarId === "string" &&
    /^[\w-]+$/.test(paper.scholarId) &&
    "title" in paper && typeof paper.title === "string" && !!paper.title.trim() &&
    "authors" in paper && typeof paper.authors === "string" &&
    "venue" in paper && typeof paper.venue === "string" &&
    "year" in paper && typeof paper.year === "string" && /^(?:\d{4})?$/.test(paper.year)
  );
}

export async function fetchScholarPublications(signal: AbortSignal) {
  const response = await fetch(snapshotUrl, { signal, credentials: "omit" });
  if (!response.ok) {
    return undefined;
  }

  const papers: unknown = await response.json();
  if (Array.isArray(papers) && papers.length && papers.every(isScholarRecord)) {
    return papers;
  }
}

function titleKey(title: string) {
  return title.toLowerCase().normalize("NFKC")
    .replace(/\s*\([^)]+\s+\d+\/\d{4}\)\s*$/, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

export function mergeScholarPublications(
  curated: readonly Publication[],
  records: readonly ScholarRecord[] = snapshot,
): Publication[] {
  const byId = new Map(records.map((paper) => [paper.scholarId, paper]));
  const synced = curated.map((paper) => {
    const record = byId.get(paper.scholarId) ??
      records.find((entry) => entry.title.toLowerCase() === paper.title.toLowerCase());

    if (!record) {
      return paper;
    }
    if (paper.articleUrl) {
      return { ...paper, scholarId: record.scholarId };
    }

    const yearChanged = record.year && !paper.dateTime.startsWith(record.year);
    return {
      ...paper,
      scholarId: record.scholarId,
      title: record.title,
      authors: record.authors || paper.authors,
      venue: record.venue || paper.venue,
      date: yearChanged ? record.year : paper.date,
      dateTime: yearChanged ? record.year : paper.dateTime,
    };
  });

  const coveredTitles = new Set(synced.map((paper) => titleKey(paper.title)));
  const coveredIds = new Set(synced.map((paper) => paper.scholarId));
  for (const record of records) {
    const key = titleKey(record.title);
    if (!coveredIds.has(record.scholarId) && !coveredTitles.has(key)) {
      synced.push({ ...record, date: record.year, dateTime: record.year });
      coveredIds.add(record.scholarId);
      coveredTitles.add(key);
    }
  }

  return synced.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
}
