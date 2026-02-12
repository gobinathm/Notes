---
title: "Domain 6: Document Intelligence & Mining"
description: "Notes on Document Intelligence and Knowledge Mining"
---

# Domain 6: Document Intelligence & Mining (10-15%)

## 6.1 Document Intelligence (formerly Form Recognizer)

### Analysis Models
- **Read**: Extract text, layout, tables, checkboxes.
- **Prebuilt**: Ready-to-use models for specific docs:
  - **Invoice**: Extracts Vendor, Date, Total, Tax.
  - **Receipt**: Retail receipts.
  - **ID Document**: Driver's licenses, Passports.
  - **W-2 / Tax**: Tax forms.

### Custom Models
- **Custom Template**: Train on 5+ examples of a fixed layout form. Fast training.
- **Custom Neural**: Deep learning model for unstructured documents (contracts, letters). Slower training, higher accuracy.
- **Composed Model**: Group up to 100/200 custom models behind a single ID. The service automatically routes to the best matching model.

## 6.2 Knowledge Mining (Azure AI Search)

### Architecture
1.  **Data Source**: Where data lives (SQL, Blob, Cosmos DB).
2.  **Indexer**: Crawler that reads data from source.
3.  **Skillset**: AI enrichment steps (OCR, Translate, Entity Extraction) applied to content.
4.  **Index**: The searchable result (JSON documents).

### Semantic Search
- Uses deep learning models to understand user intent.
- **Semantic Ranking**: Re-ranks the top results (L2) from the keyword search (L1) to surface the most relevant answer.
- **Vector Search**: Embed text into vectors and search by similarity (Nearest Neighbor).
