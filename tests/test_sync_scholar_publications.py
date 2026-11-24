import importlib.util
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError, URLError


script = Path(__file__).resolve().parents[1] / "scripts" / "sync-scholar-publications.py"
spec = importlib.util.spec_from_file_location("publication_sync", script)
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


class PublicationSyncTests(unittest.TestCase):
    preprint = {
        "scholarId": "existing", "title": "A physics-aware workflow", "authors": "C Liu",
        "venue": "ChemRxiv", "year": "2025",
    }
    scholar_only = {**preprint, "scholarId": "older", "title": "An earlier work"}
    journal = {
        "openAlexId": "W123", "title": "A Physics–Aware Workflow", "authors": "Chuanyu Liu",
        "venue": "Example Journal 1 (2)", "year": "2026",
    }
    journal_only = {**journal, "openAlexId": "W124", "title": "A new work"}

    @patch.object(sync, "warn")
    @patch.object(sync, "fetch_openalex")
    @patch.object(sync, "fetch_scholar")
    def test_forbidden_scholar_falls_back_without_losing_its_entries(self, scholar, openalex, warn):
        scholar.side_effect = HTTPError(sync.PROFILE_URL, 403, "Forbidden", {}, None)
        openalex.return_value = [self.journal, self.journal_only]

        result = sync.refresh([self.preprint, self.scholar_only])

        self.assertEqual(result, [{**self.preprint, **self.journal}, self.scholar_only, self.journal_only])
        openalex.assert_called_once_with()
        warn.assert_called_once()

    @patch.object(sync, "warn")
    @patch.object(sync, "fetch_openalex")
    @patch.object(sync, "fetch_scholar")
    def test_provider_outages_leave_the_snapshot_untouched(self, scholar, openalex, warn):
        scholar.side_effect = HTTPError(sync.PROFILE_URL, 403, "Forbidden", {}, None)
        openalex.side_effect = URLError("connection timed out")

        self.assertIsNone(sync.refresh([self.preprint]))
        self.assertEqual(warn.call_count, 2)

    @patch.object(sync, "fetch_scholar")
    def test_scholar_recovery_keeps_published_versions_and_new_works(self, scholar):
        scholar.return_value = [self.preprint, self.scholar_only]

        result = sync.refresh([{**self.preprint, **self.journal}, self.journal_only])

        self.assertEqual(result, [{**self.preprint, **self.journal}, self.scholar_only, self.journal_only])
