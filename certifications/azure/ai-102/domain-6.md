---
title: "Domain 6: Knowledge Mining and Information Extraction"
description: "Notes on Azure AI Search, Document Intelligence, and Content Understanding for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, azure ai search, document intelligence, knowledge mining, skillset, knowledge store, vector search, semantic ranking, content understanding
---

# Domain 6: Implement knowledge mining and information extraction (15-20%)

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)

---

This domain covers extracting insights from large volumes of unstructured data using **Azure AI Search**, **Document Intelligence**, and the newer **Content Understanding** service. At 15–20% weight, it is one of the highest-value domains on the exam.

## 6.1 Azure Content Understanding

A newer service in AI Foundry for building automated, multimodal extraction pipelines. It goes beyond Document Intelligence by handling images, video, and audio alongside text documents.

### Key Capabilities

| Capability | Description |
|-----------|-------------|
| **OCR Pipeline** | Extracts text and layout from complex multi-page documents and images |
| **Summarization & Classification** | Uses generative AI to categorize and summarize content during ingestion |
| **Entity & Table Extraction** | Identifies structured data (tables, key-value pairs) within unstructured documents |
| **Multimodal Processing** | Ingests and analyzes video and audio alongside traditional documents |

::: warning Content Understanding vs Document Intelligence
**Content Understanding** → multimodal pipeline (docs + images + video + audio) with generative AI summarization. It's the newer, broader service.
**Document Intelligence** → focused on forms and structured document extraction (invoices, receipts, ID documents) using prebuilt or custom models.

The exam phrase **"new multimodal document pipeline"** → Content Understanding. **"Extract fields from invoices/receipts"** → Document Intelligence.
:::

---

## 6.2 Document Intelligence

Extracts structured data from forms, invoices, receipts, and other documents.

### Model Types

| Model Type | Use Case | Training Requirement |
|-----------|---------|---------------------|
| **Prebuilt** | Invoice, Receipt, ID, W-2, Business Card | None — use as-is |
| **Custom Template** | Documents with *fixed* layout (forms, tables in same position) | Minimum 5 labeled documents |
| **Custom Neural** | Unstructured documents (contracts, letters — layout varies) | 100+ labeled documents; higher accuracy |
| **Composed** | Routes a document to the best matching model from a collection | Multiple custom models trained separately |

::: tip Custom Template vs Custom Neural
**Template model** = fixed layout (form fields always in the same place). Train with 5+ docs.
**Neural model** = variable layout (contracts, unstructured text). Needs 100+ docs. Better accuracy for complex docs.
:::

### Training & Evaluation

- **Document Intelligence Studio**: Visual labeling and training tool — drag to label fields.
- **Accuracy metric**: Percentage of correctly identified fields in test documents.
- **Confidence scores**: Each extracted value returns a 0–1 confidence score. Filter low-confidence extractions downstream.

---

## 6.3 Azure AI Search

The core platform for building full-text and vector search solutions over large document corpora.

### Enrichment Pipeline (Indexing)

```
Data Source → Indexer → Skillset → Index
```

| Stage | Description |
|-------|-------------|
| **Data Source** | Where documents live: Azure Blob Storage, Azure SQL, Cosmos DB |
| **Indexer** | Schedules and runs the crawl — processes new and changed documents |
| **Skillset** | Chain of AI skills applied to each document during indexing |
| **Index** | The final searchable JSON structure queried at runtime |

### Built-in Skills vs Custom Skills

| Skill Type | Examples | Key Detail |
|-----------|---------|-----------|
| **Built-in Cognitive Skills** | OCR, Sentiment, Entity Recognition, Key Phrase, Image Analysis | Powered by Azure AI services — just reference in skillset JSON |
| **Custom Skill** | Your own logic in an Azure Function or web API | Must follow exact `values[]` input/output schema |

::: warning Custom Skill Schema
A Custom Skill receives a `values` array and **must** return a `values` array with the **same record keys**. Forgetting this contract is the most common Custom Skill mistake on the exam.

```json
// Input to your function:
{ "values": [{ "recordId": "1", "data": { "text": "..." } }] }

// Your function must return:
{ "values": [{ "recordId": "1", "data": { "myOutput": "..." } }] }
```
:::

### Knowledge Store

Persists enriched data as **projections** outside the search index for non-search use cases:

| Projection Type | Use Case |
|----------------|---------|
| **Table Projections** | Power BI analytics, SQL queries |
| **Object Projections** | Secondary AI processing (JSON blobs in Blob Storage) |
| **File Projections** | Save extracted images or normalized document files |

::: tip Shaper Skill
Before projecting complex nested data, use the **Shaper Skill** in your skillset to reshape and flatten the enriched document into the schema required by your projection. The exam often asks which skill structures data for the Knowledge Store.
:::

### Query Syntax & Parameters

| Syntax / Parameter | Purpose | Example |
|-------------------|---------|---------|
| **Simple** | Basic keyword search | `azure search` |
| **Lucene (Full)** | Wildcards, regex, fuzzy, proximity | `azur~`, `"azure search"~3` |
| `$filter` | Boolean OData filter | `Category eq 'Finance' and Year gt 2020` |
| `$select` | Return specific fields only | `$select=title,summary` |
| `$top` / `$skip` | Pagination | `$top=10&$skip=20` |
| `$orderby` | Sort results | `$orderby=score desc` |

---

## 6.4 Vector and Semantic Search

### Search Techniques Compared

| Technique | How It Works | Best For |
|-----------|-------------|---------|
| **Keyword Search** | BM25 exact/fuzzy text matching | Precise term lookups |
| **Vector Search** | Embeddings + HNSW algorithm — finds semantically similar docs | Conceptual similarity, paraphrases |
| **Hybrid Search** | Combines keyword + vector scores using RRF (Reciprocal Rank Fusion) | Best overall recall |
| **Semantic Ranking** | Language-understanding L2 re-ranker applied *after* retrieval | Surfacing the single best answer |

::: warning Semantic Ranking vs Vector Search
**Vector search** finds semantically *similar* documents using embeddings — it is a *retrieval* technique.
**Semantic ranking** *re-ranks already retrieved results* using Microsoft language understanding / machine reading comprehension models — it is a *post-retrieval* step.

They are not the same. The exam tests this distinction directly.
:::

### Integrated Vectorization

AI Search can generate embeddings during indexing automatically using a built-in skillset — no separate embedding step in your pipeline code.

### HNSW Algorithm

Hierarchical Navigable Small World — the approximate nearest-neighbor algorithm used internally by AI Search for vector similarity. Exam may reference it as the algorithm behind vector search.

---

<FlashcardDeck storage-key="ai-102-domain-6-cards" :cards="[
  { front: 'What are the four stages of the Azure AI Search enrichment pipeline?', back: 'Data Source → Indexer → Skillset → Index. The Indexer crawls the data source, applies the Skillset, and writes to the Index.' },
  { front: 'What is the difference between Content Understanding and Document Intelligence?', back: 'Content Understanding = multimodal pipeline (docs, images, video, audio) with generative AI. Document Intelligence = structured extraction from forms/invoices using prebuilt or custom models.' },
  { front: 'A Custom Skill must follow what contract?', back: 'Receives a values[] array and must return a values[] array with the same recordId keys. Deviating from this schema breaks the skillset.' },
  { front: 'Which Knowledge Store projection type is used for Power BI analytics?', back: 'Table Projections — store enriched data in Azure Table Storage, queryable by Power BI or SQL tools.' },
  { front: 'What skill reshapes nested enriched data before projecting to the Knowledge Store?', back: 'Shaper Skill — flattens and restructures the enriched document output into the schema required by the projection.' },
  { front: 'What is Hybrid Search?', back: 'Combining keyword search (BM25) with vector search (embeddings) using RRF score fusion for better recall than either alone.' },
  { front: 'What is Semantic Ranking and when is it applied?', back: 'A language-understanding L2 re-ranker applied after retrieval to surface the single best answer. It is a post-retrieval step, not a retrieval method.' },
  { front: 'Which Document Intelligence model type requires only 5 training documents?', back: 'Custom Template model — for fixed-layout documents where fields appear in the same position. Neural models require 100+ documents.' }
]" />

---

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)
