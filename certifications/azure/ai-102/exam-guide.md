---
title: "AI-102 - Exam Guide"
description: "Keyword detection table, exam traps, and decision rules for the AI-102 Azure AI Engineer Associate exam"
head:
  - - meta
    - name: keywords
      content: ai-102, exam guide, exam traps, azure ai engineer, keyword detection, tips
---

# AI-102: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The AI-102 exam is for **Azure AI Engineers** — developers who build and deploy AI solutions using Microsoft's services and SDKs. It values **implementation knowledge**: which service to use, how to configure it, and how to integrate it into applications.

### Answer Philosophy

1. **Choose the managed service over DIY** — Microsoft wants you to use Azure AI services rather than build from scratch. RAG over custom training; prebuilt models over custom when possible.
2. **Foundry is the platform** — Everything lives in Microsoft AI Foundry. Hubs manage shared infrastructure; Projects are your workspace. When in doubt, the answer involves Foundry.
3. **SDK over REST** — The exam prefers `DefaultAzureCredential()` and the Foundry SDK over raw REST calls or hardcoded keys.
4. **Async patterns for heavy operations** — OCR Read API, Document Translation, and batch operations all follow the `202 → Operation-Location → GET` async pattern.

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---------------|--------------------------------|
| "avoid hardcoded keys" / "keyless auth" | **Managed Identity + DefaultAzureCredential()** |
| "predictable latency" / "high throughput" | **Provisioned Throughput (PTU)** |
| "data residency" / "offline" / "edge" | **Docker container deployment** |
| "build, test, deploy AI apps" | **Microsoft AI Foundry Project** |
| "shared compute, connections, security" | **Microsoft AI Foundry Hub** |
| "ground the model in your own data" | **RAG (On Your Data / AI Search)** |
| "specific tone, format, or rare domain" | **Fine-tuning** |
| "visual LLM workflow" / "evaluate prompts" | **Prompt Flow** |
| "block prompt injection attacks" | **Prompt Shields** |
| "autonomous multi-step task" | **AI Agent Service** |
| "agent uses Python to solve math" | **Code Interpreter tool** |
| "agent searches uploaded documents" | **File Search tool** |
| "multiple agents collaborating" | **Multi-agent orchestration** |
| "handwritten text extraction" | **Read API (OCR 4.0)** |
| "locate objects with bounding boxes" | **Custom Vision — Object Detection** |
| "1:1 face comparison" | **Face Verification** |
| "1:N face comparison against known people" | **Face Identification + PersonGroup** |
| "recognize spoken intent / wake word" | **Speech SDK — Intent Recognition / Keyword** |
| "translate entire Word/PDF, preserve layout" | **Document Translation (async)** |
| "utterance → intent + entities" | **CLU (Conversational Language Understanding)** |
| "multi-turn Q&A from documents" | **Custom Question Answering** |
| "text from images/tables in complex docs" | **Content Understanding / Document Intelligence** |
| "enrich documents with AI before indexing" | **Azure AI Search Skillset** |
| "Power BI analytics from enriched docs" | **Knowledge Store — Table Projections** |
| "custom extract logic in skillset" | **Custom Skill (Azure Function)** |
| "keyword + vector combined search" | **Hybrid Search** |
| "re-rank to surface single best answer" | **Semantic Ranking** |

---

## Exam Traps

::: warning Watch out for these common mistakes!

- **RAG vs Fine-tuning**: RAG = runtime context injection (fast, cheap, updatable). Fine-tuning = baked-in knowledge (expensive, slow, better for tone/format). The exam frequently asks "which approach?" — if the data changes often → RAG. If the style/format must be rigid → Fine-tuning.

- **Hub vs Project**: Hub = shared infrastructure (compute, connections, role assignments). Project = your workspace inside a hub. A question about "setting up shared compute for multiple teams" → Hub. "Building a specific chatbot" → Project.

- **PTU vs Standard**: Standard = pay-per-token, variable latency. PTU = reserved capacity, consistent latency, higher fixed cost. Exam uses "predictable latency" or "guaranteed throughput" as the signal for PTU.

- **Content Understanding vs Document Intelligence**: Content Understanding (new) handles multimodal pipelines (images, video, audio + docs) with AI summarization. Document Intelligence = forms and structured extraction with prebuilt/custom models. Both extract from documents but different use cases.

- **Custom Skill interface**: A Custom Skill must follow the exact input/output schema expected by Azure AI Search. The skill receives a `values` array and must return a `values` array with the same record keys. Forgetting this schema is a common mistake.

- **Async OCR pattern**: The Read API returns `202 Accepted` with an `Operation-Location` header. You must then `GET` that URL and poll until `status: succeeded`. Many candidates try to use the response from the initial POST.

- **PersonGroup vs FaceList**: PersonGroup (and LargePersonGroup) is for Identification (1:N — "who is this?"). FaceList (and LargeFaceList) is for Find-Similar (1:N — "find faces similar to this one"). The training step is required for PersonGroup, not FaceList.

- **Semantic Ranking vs Vector Search**: Vector search finds semantically similar documents using embeddings. Semantic ranking re-ranks already-retrieved results using an LLM to surface the single best answer. They are not the same — Semantic Ranking is a post-retrieval step.

- **Content filters scope**: Azure OpenAI content filters apply to the model's inputs AND outputs. Azure AI Content Safety is a separate standalone service for user-generated content moderation. Don't confuse the two.
:::

---

## Decision Quick Reference

### "Which generative AI approach?"

```
Data changes often, reduce hallucinations → RAG (On Your Data)
Specific tone, format, domain jargon    → Fine-tuning
Visual workflow, test prompt variants   → Prompt Flow
Autonomous multi-step reasoning         → AI Agent Service
```

### "Which vision service?"

```
General image analysis, OCR, tagging   → Image Analysis 4.0 (Azure Vision)
Custom categories / bounding boxes     → Custom Vision
Video insights (faces, brands, topics) → Video Indexer
Real-time movement in video feed       → Spatial Analysis
Face verification / identification     → Face API
```

### "Which NLP service?"

```
Analyze existing text (sentiment, NER) → Language Service
Understand spoken intent / commands    → CLU + Speech SDK
Q&A from documents                     → Custom Question Answering
Translate text or documents            → Translator Service
```

### "Which search / extraction approach?"

```
Search structured and unstructured data → Azure AI Search
Extract fields from forms and invoices  → Document Intelligence
AI-enriched extraction pipeline         → AI Search Skillset
New multimodal document pipeline        → Content Understanding
```

### "Which authentication?"

```
Production app, avoid key rotation   → Managed Identity (DefaultAzureCredential)
Simple testing / scripts             → Subscription key
Cross-service access, audit trail    → RBAC roles
```

---

## 2025 Exam Domain Weights

| Domain | Weight |
|--------|--------|
| 1: Plan and manage an Azure AI solution | 20-25% |
| 2: Implement generative AI solutions | 15-20% |
| 3: Implement an agentic solution | 5-10% |
| 4: Implement computer vision solutions | 10-15% |
| 5: Implement NLP solutions | 15-20% |
| 6: Implement knowledge mining and information extraction | 15-20% |

::: tip High-Value Focus
Domains 1, 5, and 6 each carry 15-20%+ weight and together represent over half the exam. Domain 3 (Agentic) is new and lightly weighted — know the concepts but do not over-invest.
:::

---

## Final Strategy

- **Know your async patterns cold** — Read API, Document Translation, and batch operations all follow `202 → Operation-Location → GET`. This pattern comes up repeatedly.
- **"Foundry" is the answer to "where"** — Hubs, projects, Prompt Flow, model catalog, deployments. When a question is about the platform or portal → AI Foundry.
- **Eliminate third-party answers** — If a choice involves building something from scratch when an Azure service exists, it is almost certainly wrong.
- **D1 + D5 + D6 = 50-65% of the exam** — Prioritise Plan & Manage, NLP, and Knowledge Mining for maximum return on study time.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
