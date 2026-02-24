---
title: "AI-102 Cheatsheet"
description: "Quick-reference tables and decision rules for the AI-102 Azure AI Engineer Associate exam"
head:
  - - meta
    - name: keywords
      content: ai-102, cheatsheet, quick reference, azure ai, exam prep, study guide
---

# AI-102 Cheatsheet (2025)

[← Overview](./index.md) · [Exam Guide →](./exam-guide.md)

---

## Core Infrastructure (Domain 1)

| Concept | Key Detail |
|---------|-----------|
| **AI Foundry Hub** | Shared compute, connections, security — for multiple teams |
| **AI Foundry Project** | Your workspace inside a Hub — build, test, deploy |
| **Managed Identity** | `DefaultAzureCredential()` — keyless auth for production |
| **PTU (Provisioned)** | Reserved capacity, predictable latency, fixed cost |
| **Standard** | Pay-per-token, variable latency, shared infrastructure |
| **Docker Container** | Edge/offline/data residency deployments |
| **Content Safety** | Standalone service: Hate / Self-Harm / Violence / Sexual, 4 severity levels |
| **Prompt Shields** | Blocks prompt injection attacks |
| **Content Filters** | Applied to Azure OpenAI model inputs AND outputs |

---

## Generative AI (Domain 2)

| Concept | Key Detail |
|---------|-----------|
| **Chat roles** | `system` (instructions) → `user` (prompt) → `assistant` (history) |
| **temperature** | 0 = deterministic; higher = more creative/random |
| **RAG** | Inject source docs at runtime; fast, updatable, no retraining |
| **Fine-tuning** | Bake tone/format into weights; requires JSONL training data (100–500+ examples) |
| **Prompt Flow** | Visual LLM workflow builder — Standard / Chat / Evaluation flow types |
| **Variants** | A/B test different prompt versions within one Prompt Flow |
| **Groundedness** | RAG quality metric — does the response stay in the source context? |

### RAG vs Fine-tuning

| Factor | RAG | Fine-tuning |
|--------|-----|------------|
| Data changes often | Use | Avoid |
| Need specific tone/format | Partial | Use |
| Reduce hallucinations | Use | Partial |
| Requires retraining | No | Yes |

---

## Agentic Solutions (Domain 3)

| Concept | Key Detail |
|---------|-----------|
| **AI Agent Service** | Managed service for autonomous multi-step reasoning |
| **Thread** | Conversation session — stores message history |
| **Run** | One execution of the reasoning loop on a Thread |
| **Code Interpreter** | Agent writes + executes Python in a secure sandbox |
| **File Search** | Agent retrieves from uploaded documents (built-in vector search) |
| **Multi-agent: Hierarchical** | Manager delegates to Worker agents |
| **Multi-agent: Sequential** | Pipeline — each agent passes output to the next |
| **Multi-agent: Group Chat** | Agents discuss and critique together |

---

## Computer Vision (Domain 4)

| Concept | Key Detail |
|---------|-----------|
| **Image Analysis 4.0** | Captioning, Dense Captioning, Tagging, Smart Crop, People Detection |
| **Read API (OCR)** | Async: POST → 202 + Operation-Location → GET until succeeded |
| **Custom Vision — Classification** | Multiclass (1 tag) or Multilabel (multiple tags) per image |
| **Custom Vision — Object Detection** | Returns tag + bounding box coordinates |
| **Video Indexer** | Semantic insights from video: faces, topics, brands, transcript, sentiment |
| **Spatial Analysis** | Real-time movement in live feed — runs on edge Docker container |
| **Face Verification** | 1:1 — are these two faces the same person? |
| **Face Identification** | 1:N — who is this from a PersonGroup? (requires training) |
| **FaceList** | 1:N Find Similar — no person concept, no training needed |

---

## NLP and Speech (Domain 5)

| Concept | Key Detail |
|---------|-----------|
| **Sentiment Analysis** | Document + sentence level: positive/negative/neutral |
| **NER** | Extracts entity types (Person, Location, Date, etc.) |
| **Entity Linking** | Disambiguates entities via Wikipedia |
| **PII Detection** | Detects and can redact personal data |
| **CLU** | Utterance → Intent + Entities; replaces LUIS |
| **Custom QA** | Matches questions to stored Q&A pairs; supports multi-turn, chit-chat |
| **Speech STT** | Real-time and batch transcription |
| **Intent Recognition** | CLU intent detection from spoken audio via Speech SDK |
| **Keyword Recognition** | Local on-device wake word detection — no cloud needed |
| **Document Translation** | Async — translates Word/PDF preserving layout |
| **Custom Translator** | Domain-specific translation using TMX/XLIFF parallel corpora |

### CLU vs Custom QA

| | CLU | Custom QA |
|--|-----|-----------|
| Input | Utterance | Question |
| Output | Intent + Entities | Answer text |
| Use case | Take an action | Return information |
| Training | Label utterances | Import Q&A sources |

---

## Knowledge Mining (Domain 6)

| Concept | Key Detail |
|---------|-----------|
| **AI Search Pipeline** | Data Source → Indexer → Skillset → Index |
| **Custom Skill** | External Azure Function — must follow `values[]` input/output schema |
| **Knowledge Store** | Table (Power BI) / Object (blob JSON) / File projections |
| **Shaper Skill** | Reshapes enriched data for Knowledge Store projections |
| **Hybrid Search** | Keyword (BM25) + Vector (embeddings) + RRF score fusion |
| **Semantic Ranking** | LLM re-ranker applied after retrieval — surfaces best answer |
| **HNSW** | Algorithm used for vector similarity search |
| **Content Understanding** | New multimodal pipeline (docs + images + video + audio) |
| **Doc Intelligence: Template** | Fixed-layout forms — 5+ training docs |
| **Doc Intelligence: Neural** | Variable-layout docs (contracts) — 100+ training docs |
| **Doc Intelligence: Composed** | Routes to the best matching custom model |

### AI Search Query Parameters

| Parameter | Purpose |
|-----------|---------|
| `$filter` | Boolean OData filter (e.g., `Category eq 'Finance'`) |
| `$select` | Return specific fields only |
| `$top` / `$skip` | Pagination |
| `$orderby` | Sort results |

---

## Async Patterns (High Frequency Exam Topic)

All three follow the same `202 → Operation-Location → GET` pattern:

| Operation | Service |
|-----------|---------|
| OCR / Read API | Azure AI Vision |
| Document Translation | Azure AI Translator |
| Batch operations | Azure OpenAI, Document Intelligence |

---

[← Overview](./index.md) · [Exam Guide →](./exam-guide.md)
