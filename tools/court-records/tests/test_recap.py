"""Offline regression tests for federal RECAP discovery and retrieval.

No network calls, no privileged documents, no fabricated success.
"""
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import discover_recap as discovery
import recap_retrieve as collector


class DiscoveryTests(unittest.TestCase):
    def test_exact_company_filing_window_and_no_unrelated_cases(self):
        def response(_):
            return {"results": [
                {"caseName": "Giga Property Solutions Inc. v. Contractor",
                 "docketNumber": "1:25-cv-01234", "dateFiled": "2025-03-01",
                 "court": "mad", "absolute_url": "/docket/9900/"},
                {"caseName": "Giga Aerospace v. Contractor",
                 "docketNumber": "1:25-cv-01235", "dateFiled": "2025-03-01",
                 "court": "mad", "absolute_url": "/docket/9901/"},
                {"caseName": "Giga Property Solutions v. Former Partner",
                 "docketNumber": "1:20-cv-01234", "dateFiled": "2020-03-01",
                 "court": "mad", "absolute_url": "/docket/9902/"}],
                "next": None}
        result = discovery.search(fetch=response)
        self.assertEqual(result["status"], "found_candidates")
        self.assertEqual(result["count"], 1)
        self.assertTrue(result["search_complete"])
        self.assertEqual(result["matches"][0]["docket_id"], 9900)

    def test_no_results_is_not_error_or_proof_no_state_cases(self):
        result = discovery.search(fetch=lambda _: {"results": [], "next": None})
        self.assertEqual(result["status"], "no_candidates_indexed")
        self.assertIn("Massachusetts state cases NOT indexed", result["scope"])

    def test_reject_cross_origin_pagination(self):
        with self.assertRaises(ValueError):
            discovery.search(fetch=lambda _: {"results": [], "next": "https://other.example/private"})

    def test_company_target_is_fixed(self):
        with self.assertRaises(ValueError):
            discovery.search(company="Sunrun", fetch=lambda _: {})


class CollectorTests(unittest.TestCase):
    def test_case_number_normalization(self):
        self.assertTrue(collector.similar_case("4:26-cv-014283", "4:2026cv14283"))
        self.assertFalse(collector.similar_case("4:26-cv-014283", "4:2026cv14284"))

    def test_unavailable_document_does_not_guess_url(self):
        self.assertEqual(collector.pdf_sources({"is_available": False}), [])
        self.assertEqual(
            collector.pdf_sources({"filepath_local": "recap/a.pdf", "is_available": False}),
            ["https://storage.courtlistener.com/recap/a.pdf"],
        )
        self.assertEqual(collector.pdf_sources({"filepath_local": "https://untrusted.test/secret.pdf"}), [])

    def test_ma_only_docket_collection(self):
        args = SimpleNamespace(out=None, company="giga", case_number="1:25-cv-00099",
                               court="cacd", address="", roof_permit_url="",
                               roof_permit_number="", download=True)
        with tempfile.TemporaryDirectory() as temp:
            args.out = temp
            with patch.object(collector, "find_docket", side_effect=AssertionError("should not search out of state")):
                result = collector.collect(args)
            self.assertEqual(result["status"], "outside_massachusetts_court_scope")

    def test_sunrun_requires_existing_roof_permit_reference(self):
        args = SimpleNamespace(out=None, company="sunrun", case_number="1:25-cv-10",
                               court="mad", address="Some Property",
                               roof_permit_url="", roof_permit_number="", download=True)
        with tempfile.TemporaryDirectory() as temp:
            args.out = temp
            with patch.object(collector, "find_docket", side_effect=AssertionError("should not search")):
                m = collector.collect(args)
            self.assertEqual(m["status"], "sunrun_roof_permit_evidence_required")
            self.assertFalse(m["qualifies_for_sunrun_roof_permit_study"])
            self.assertTrue((Path(temp) / "MANIFEST.json").exists())

    def test_original_pdf_bytes_preserved_without_reconstruction(self):
        raw = b"%PDF-1.7\n" + b"evidence" * 10 + b"\n%%EOF"
        args = SimpleNamespace(out=None, company="giga", case_number="1:25-cv-00099",
                               court="mad", address="", roof_permit_url="",
                               roof_permit_number="", download=True)
        entries = [{"entry_number": 1, "date_filed": "2025-05-01",
                    "description": "Complaint",
                    "recap_documents": [{
                        "id": 98, "document_number": "1", "attachment_number": None,
                        "description": "Complaint", "filepath_local": "recap/known.pdf",
                        "sha1": hashlib.sha1(raw).hexdigest(), "is_sealed": False}]}]
        metadata = {"court_id": "mad", "docket_number": "1:25-cv-99",
                    "case_name": "Giga Property Solutions Inc. v. X", "date_filed": "2025-05-01"}
        with tempfile.TemporaryDirectory() as temp:
            args.out = temp
            with patch.object(collector, "find_docket", return_value=[{"id": 77}]), \
                 patch.object(collector, "api_get", return_value=metadata), \
                 patch.object(collector, "each_entry", return_value=iter(entries)), \
                 patch.object(collector, "get_pdf", return_value=raw):
                result = collector.collect(args)
            self.assertEqual(result["status"], "completed_with_pdfs")
            doc = result["documents"][0]
            self.assertEqual(doc["status"], "verified_pdf")
            self.assertEqual((Path(temp) / doc["filename"]).read_bytes(), raw)
            self.assertEqual(doc["sha256"], hashlib.sha256(raw).hexdigest())

    def test_zero_pdfs_not_success(self):
        args = SimpleNamespace(out=None, company="giga", case_number="1:25-cv-99",
                               court="mad", address="", roof_permit_url="",
                               roof_permit_number="", download=True)
        metadata = {"court_id": "mad", "docket_number": "1:25-cv-99", "date_filed": "2025-05-01"}
        with tempfile.TemporaryDirectory() as temp:
            args.out = temp
            with patch.object(collector, "find_docket", return_value=[{"id": 77}]), \
                 patch.object(collector, "api_get", return_value=metadata), \
                 patch.object(collector, "each_entry", return_value=iter([{
                     "entry_number": 1, "recap_documents": [{
                         "id": 1, "description": "Complaint", "is_available": False}]}])):
                result = collector.collect(args)
            self.assertEqual(result["status"], "no_public_pdfs_found")
            self.assertEqual(result["documents"][0]["status"], "unavailable_no_documented_url")


if __name__ == "__main__":
    unittest.main()
