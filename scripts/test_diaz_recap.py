"""Offline regression checks: no API calls or paid PACER requests."""
import hashlib
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch
import download_diaz_recap as diaz


class OneCaseTests(unittest.TestCase):
    def test_documented_public_path_only(self):
        self.assertEqual(diaz.pdf_source({"filepath_local": "recap/a.pdf"}),
                         "https://storage.courtlistener.com/recap/a.pdf")
        self.assertIsNone(diaz.pdf_source({"filepath_local": "../secret.pdf"}))
        self.assertIsNone(diaz.pdf_source({"filepath_local": "https://nottrusted.example/p.pdf"}))
        self.assertIsNone(diaz.pdf_source({"filepath_local": "recap/a.pdf", "is_sealed": True}))

    def test_manifest_and_target_priorities(self):
        entries = [
            {"entry_number": 5, "description": "Opposition", "recap_documents": [
                {"id": 501, "attachment_number": 11, "description": "Tacuri certification",
                 "filepath_local": "recap/tacuri.pdf", "sha1": hashlib.sha1(b"%PDF-1.4\nfixture").hexdigest()},
                {"id": 502, "attachment_number": 4, "description": "Diaz certification",
                 "filepath_local": "recap/diaz.pdf"}]},
            {"entry_number": 4, "description": "Motion", "recap_documents": []}
        ]

        def api(url):
            if "/dockets/69498648/" in url:
                return {"case_name": "Diaz v. Sunrun", "docket_number": "1:24-cv-11462"}
            if "/docket-entries/" in url:
                return {"results": entries, "next": None}
            raise AssertionError(url)

        with TemporaryDirectory() as folder:
            with (patch.object(diaz, "token", "TEST_TOKEN"),
                  patch.object(diaz, "OUT", Path(folder)),
                  patch.object(diaz, "api_json", side_effect=api),
                  patch.object(diaz, "fetch_pdf", return_value=b"%PDF-1.4\nfixture")):
                result = diaz.main()
            self.assertEqual(result, 1)  # Fixture omits ECF 1 and 6: partial archive, even with two PDFs
            self.assertTrue((Path(folder) / "filing_index.csv").exists())
            saved = list((Path(folder) / "pdfs").glob("*.pdf"))
            self.assertEqual(len(saved), 2)
            manifest = (Path(folder) / "manifest.json").read_text()
            self.assertIn("Tacuri certification", manifest)
            self.assertIn("not_listed_in_recap_response", manifest)

    def test_no_secret_produces_manifest(self):
        with TemporaryDirectory() as folder:
            with patch.object(diaz, "token", ""), patch.object(diaz, "OUT", Path(folder)):
                self.assertEqual(diaz.main(), 1)
            self.assertIn("failed", (Path(folder) / "manifest.json").read_text())


if __name__ == "__main__":
    unittest.main()
