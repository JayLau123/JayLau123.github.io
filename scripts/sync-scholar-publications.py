import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from urllib.request import Request, urlopen


SCHOLAR_USER = "f2qAmGIAAAAJ"
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER}&pagesize=100"
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


def main():
    cli = argparse.ArgumentParser(description="Refresh the public Google Scholar publication snapshot.")
    cli.add_argument("--html", type=Path, help="Parse a saved public profile page.")
    args = cli.parse_args()

    if args.html:
        html = args.html.read_text(encoding="utf-8")
    else:
        request = Request(PROFILE_URL, headers={"Accept-Language": "en"})
        with urlopen(request, timeout=20) as response:
            html = response.read().decode("utf-8")

    profile = PublicationParser()
    profile.feed(html)
    profile.close()
    publications = profile.publications
    ids = {paper["scholarId"] for paper in publications}
    if profile.row is not None or not publications or len(ids) != len(publications):
        raise ValueError("Google Scholar returned an empty, partial, or duplicate publication list")

    # A stable order keeps citation-count changes from rewriting the snapshot.
    publications.sort(key=lambda paper: paper["scholarId"])
    SNAPSHOT.write_text(json.dumps(publications, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {len(publications)} Google Scholar publications.")


if __name__ == "__main__":
    main()
