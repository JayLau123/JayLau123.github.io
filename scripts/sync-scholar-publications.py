import argparse
import json
import re
import sys
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urlsplit
from urllib.request import Request, urlopen


SCHOLAR_USER = "f2qAmGIAAAAJ"
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER}&pagesize=100"
OPENALEX_AUTHOR = "A5122074882"
OPENALEX_URL = "https://api.openalex.org/works?" + urlencode({
    "filter": f"author.id:{OPENALEX_AUTHOR}",
    "sort": "publication_date:desc",
    "per_page": 100,
    "select": "id,doi,title,publication_year,type,primary_location,biblio,authorships",
})
SNAPSHOT = Path(__file__).resolve().parents[1] / "app" / "scholar-publications.json"


class PublicationParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.publications = []
        self.row = None
        self.field = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        classes = attrs.get("class", "").split()
        if tag == "tr" and "gsc_a_tr" in classes:
            self.row = {"scholarId": "", "title": "", "authors": "", "venue": "", "year": ""}
            self.detail_count = 0
        if self.row is None:
            return

        if tag == "a" and "gsc_a_at" in classes:
            query = parse_qs(urlsplit(attrs["href"]).query)
            owner, _, scholar_id = query["citation_for_view"][0].partition(":")
            if owner != SCHOLAR_USER or not re.fullmatch(r"[A-Za-z0-9_-]+", scholar_id):
                raise ValueError("Unexpected Google Scholar citation ID")
            self.row["scholarId"] = scholar_id
            self.field = (tag, "title")
        elif tag == "div" and "gs_gray" in classes and self.detail_count < 2:
            self.field = (tag, ("authors", "venue")[self.detail_count])
            self.detail_count += 1
        elif tag == "span" and "gsc_a_h" in classes:
            self.field = (tag, "year")

    def handle_data(self, text):
        if self.field is not None:
            self.row[self.field[1]] += text

    def handle_endtag(self, tag):
        if self.field is not None and self.field[0] == tag:
            self.field = None
        if tag != "tr" or self.row is None:
            return

        paper = {field: " ".join(value.split()) for field, value in self.row.items()}
        self.row = None
        if not paper["scholarId"] or not paper["title"] or self.detail_count != 2:
            raise ValueError("Incomplete Google Scholar publication row")
        year = paper["year"]
        if year:
            if not re.fullmatch(r"\d{4}", year):
                raise ValueError("Unexpected Google Scholar publication year")
            paper["venue"] = re.sub(rf",\s*{year}$", "", paper["venue"]).strip()
        self.publications.append(paper)


def parse_scholar_publications(html):
    profile = PublicationParser()
    profile.feed(html)
    profile.close()
    publications = profile.publications
    ids = {paper["scholarId"] for paper in publications}
    if profile.row is not None or not publications or len(ids) != len(publications):
        raise ValueError("Google Scholar returned an empty, partial, or duplicate publication list")
    return publications


def fetch_scholar():
    request = Request(PROFILE_URL, headers={"Accept-Language": "en"})
    with urlopen(request, timeout=20) as response:
        return parse_scholar_publications(response.read().decode("utf-8"))


def fetch_openalex():
    with urlopen(OPENALEX_URL, timeout=20) as response:
        works = json.load(response)["results"]

    publications = []
    for work in works:
        location = work["primary_location"] or {}
        source = location.get("source") or {}
        if (work["type"] not in {"article", "review"} or source.get("type") != "journal"
                or location.get("version") != "publishedVersion" or not work["doi"]):
            continue
        byline = work["authorships"]
        if not any(author["author"]["id"] == f"https://openalex.org/{OPENALEX_AUTHOR}" for author in byline):
            continue
        work_id = work["id"].removeprefix("https://openalex.org/")
        if not re.fullmatch(r"W[0-9]+", work_id) or not work["title"] or not work["publication_year"]:
            raise ValueError("Incomplete OpenAlex publication record")

        citation = work["biblio"]
        venue = source["display_name"]
        if citation["volume"]:
            venue += f" {citation['volume']}"
        if citation["issue"]:
            venue += f" ({citation['issue']})"
        if citation["first_page"]:
            venue += f", {citation['first_page']}"
            if citation["last_page"] and citation["last_page"] != citation["first_page"]:
                venue += f"–{citation['last_page']}"

        names = [author["author"]["display_name"] for author in byline if author["author"]["display_name"]]
        if len(names) > 8:
            names = names[:7] + ["…"]
        publications.append({
            "openAlexId": work_id,
            "title": work["title"],
            "authors": ", ".join(names),
            "venue": venue,
            "year": str(work["publication_year"]),
        })
    if not publications:
        raise ValueError("OpenAlex returned no verified journal articles")
    return publications


def title_key(title):
    return "".join(character for character in unicodedata.normalize("NFKC", title).casefold()
                   if character.isalnum())


def add_published_versions(records, published):
    by_title = {title_key(paper["title"]): paper for paper in records}
    for paper in published:
        key = title_key(paper["title"])
        current = by_title.get(key)
        if current is None:
            by_title[key] = paper
        elif (current.get("openAlexId") == paper["openAlexId"] or not current["venue"]
              or re.search(r"arxiv|chemrxiv|preprint", current["venue"], re.IGNORECASE)):
            by_title[key] = {**current, **paper}
    return list(by_title.values())


def is_provider_unavailable(error):
    if isinstance(error, HTTPError):
        return error.code in {403, 408, 429} or 500 <= error.code < 600
    return True


def warn(message):
    print(f"::warning::{message}", file=sys.stderr)


def refresh(previous):
    try:
        scholar = fetch_scholar()
    except (URLError, TimeoutError) as error:
        if not is_provider_unavailable(error):
            raise
        warn(f"Google Scholar is unavailable ({error}). Trying OpenAlex.")
        try:
            published = fetch_openalex()
        except (URLError, TimeoutError) as fallback_error:
            if not previous or not is_provider_unavailable(fallback_error):
                raise
            warn(f"OpenAlex is unavailable ({fallback_error}). Keeping the last successful snapshot.")
            return None
        print(f"Fetched {len(published)} verified journal records from OpenAlex.")
        return add_published_versions(previous, published)

    print(f"Fetched {len(scholar)} publications from Google Scholar.")
    return add_published_versions(scholar, [paper for paper in previous if "openAlexId" in paper])


def main():
    cli = argparse.ArgumentParser(description="Refresh the publication snapshot from Google Scholar or OpenAlex.")
    cli.add_argument("--html", type=Path, help="Parse a saved public Scholar profile page.")
    args = cli.parse_args()

    if args.html:
        publications = parse_scholar_publications(args.html.read_text(encoding="utf-8"))
    else:
        previous = json.loads(SNAPSHOT.read_text(encoding="utf-8")) if SNAPSHOT.exists() else []
        publications = refresh(previous)
    if publications is None:
        return

    # A stable order keeps citation-count changes from rewriting the snapshot.
    publications.sort(key=lambda paper: paper.get("scholarId") or paper["openAlexId"])
    SNAPSHOT.write_text(json.dumps(publications, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Snapshot contains {len(publications)} publications.")


if __name__ == "__main__":
    main()
