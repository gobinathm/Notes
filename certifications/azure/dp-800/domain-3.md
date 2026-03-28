---
title: "DP-800 - Domain 3: Implement AI capabilities in database solutions"
description: "DP-800 notes on external models, embeddings, vector search, hybrid retrieval, and RAG in SQL solutions"
head:
  - - meta
    - name: keywords
      content: dp-800, domain 3, embeddings, vectors, vector search, hybrid search, ann, enn, rrf, rag, sp_invoke_external_rest_endpoint
---

# Domain 3: Implement AI capabilities in database solutions (25-30%)

[← Domain 2](./domain-2.md) · [Back to Overview](./index.md)

This is the DP-800 domain that makes the cert unique. It connects SQL development with **modern AI retrieval patterns**.

---

## 3.1 Design and implement models and embeddings

### External model thinking

The study guide expects you to evaluate models by:

- modality
- language support
- model size
- structured output support

### Embedding pipeline

```text
Relational or semi-structured source data
  -> select columns to represent meaning
  -> split content into chunks
  -> generate embeddings
  -> store vectors
  -> refresh embeddings when source data changes
```

### Key design decisions

| Decision | Why it matters |
|---|---|
| **Which columns to embed** | Bad input columns produce bad semantic retrieval |
| **Chunk size** | Too large hurts precision; too small loses context |
| **Refresh method** | Must match data volatility and operational complexity |
| **Model choice** | Affects multilingual support, cost, latency, and output quality |

### Embedding maintenance methods called out in the guide

- table triggers
- Change Tracking
- CDC
- CES
- Azure Functions with SQL trigger binding
- Azure Logic Apps
- Microsoft Foundry

::: tip
If the source data changes frequently, the correct answer usually includes a **repeatable embedding refresh path**, not one-time manual generation.
:::

---

## 3.2 Design and implement intelligent search

### Search modes

| Mode | Best for |
|---|---|
| **Full-text search** | Keyword/token matching |
| **Semantic vector search** | Meaning-based similarity |
| **Hybrid search** | Blend keywords with semantic similarity |

### SQL/vector concepts to know

- vector data type
- vector indexes
- vector size and dimensionality
- vector distance and normalization functions
- ANN vs ENN search behavior
- reciprocal rank fusion (RRF)

### ANN vs ENN

| Option | Trade-off |
|---|---|
| **ANN** | Faster, approximate nearest neighbors, better for scale |
| **ENN** | Exact nearest neighbors, higher precision, usually slower |

### Hybrid search

Hybrid search matters because enterprise SQL use cases often need both:

- exact domain terms, codes, and identifiers
- semantic similarity over meaning

### Reciprocal Rank Fusion

RRF combines ranked results from multiple retrieval methods, typically full-text and vector search, into one final ranked list. If the exam mentions combining multiple ranked result sets into a better blended answer, think **RRF**.

---

## 3.3 Design and implement retrieval-augmented generation (RAG)

### RAG flow in a SQL-centered app

1. Retrieve relevant rows or chunks.
2. Convert the context into JSON or structured prompt text.
3. Send it to the model.
4. Capture and parse the response.

### SQL-specific clue

The official guide explicitly mentions using **`sp_invoke_external_rest_endpoint`** to create prompts and send results to a language model.

That means you should be ready to think in this pattern:

- SQL retrieves data
- SQL shapes data into JSON
- SQL calls external AI endpoint
- app or SQL layer parses the response

### When RAG is the right answer

- Facts change often
- Grounding must come from current enterprise data
- You need retrieval traceability
- Fine-tuning would be too slow, costly, or stale

::: warning RAG Trap
If the requirement is "use the latest database content" or "include current enterprise records", do not jump to fine-tuning. The exam will usually want **retrieval + prompt grounding** instead.
:::

---

## Quick Decision Rules

**Need keyword-only precision?**  
Use **full-text search**.

**Need meaning-based similarity?**  
Use **vector search**.

**Need both business keywords and semantic relevance?**  
Use **hybrid search**, often with **RRF**.

**Need generative answers grounded in current SQL data?**  
Use **RAG**.

**Need high recall at scale with faster search?**  
Lean toward **ANN**.

**Need exact nearest-neighbor correctness and can afford cost?**  
Lean toward **ENN**.

---

## Fast Recall

- **Embeddings** turn content into vectors
- **Chunking** controls retrieval quality
- **ANN** is approximate and fast
- **ENN** is exact and slower
- **Hybrid search** = keyword + semantic
- **RRF** blends ranked results
- **`sp_invoke_external_rest_endpoint`** is the SQL-native exam clue for external model invocation

---

[← Domain 2](./domain-2.md) · [Back to Overview](./index.md)
