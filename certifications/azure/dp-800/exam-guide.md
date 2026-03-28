---
title: "DP-800 - Exam Guide"
description: "Exam strategy, traps, and decision rules for DP-800 Microsoft Certified: SQL AI Developer Associate (beta)"
head:
  - - meta
    - name: keywords
      content: dp-800, exam guide, beta exam, sql ai developer, exam tips, vectors, rag, security, performance
---

# DP-800: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

DP-800 is not a pure AI exam and not a pure DBA exam. It expects a **developer mindset** that balances:

1. **Correct schema and query design**
2. **Production security and deployment discipline**
3. **Practical AI integration using vectors, search, and RAG**

If an answer is clever but unsafe, or modern but operationally weak, it is probably wrong.

---

## Beta-Specific Facts

- As of **March 28, 2026**, Microsoft lists DP-800 as a **beta** certification exam.
- Beta exams are **not scored immediately**.
- Microsoft says the **Practice Assessment is not currently available** while the exam remains in beta.
- The certification page states **100 minutes** and a **passing score of 700**.

---

## Keyword Detection Table

| If you see... | Lean toward... |
|---|---|
| "history of changes" | **Temporal tables** |
| "tamper-evident" or "prove integrity" | **Ledger tables** |
| "some users should see masked values" | **Dynamic Data Masking** |
| "DBA must not see plaintext" | **Always Encrypted** |
| "each user sees only their own rows" | **Row-Level Security** |
| "historical regressions or plan changes" | **Query Store** |
| "reviewable schema deployments" | **SQL Database Projects** |
| "REST and GraphQL over SQL" | **Data API builder** |
| "meaning-based retrieval" | **Vector search** |
| "combine keyword and semantic relevance" | **Hybrid search + RRF** |
| "current enterprise data in LLM answer" | **RAG** |
| "AI tool with live schema/tool context" | **MCP-enabled workflow** |

---

## Common Traps

::: warning Watch these closely
- **Masking is not encryption**. If the scenario is about true protection, DDM is not enough.
- **Fine-tuning is not the default**. When data changes often, the stronger answer is usually retrieval plus grounding.
- **Copilot is not a control plane**. AI-assisted tools still require instruction files, permissions, review, and safe pipelines.
- **Vector search is not full-text search**. If the scenario is about semantic similarity, keyword indexing alone is incomplete.
- **Manual deployment scripts are not the best DevOps answer** when SQL Database Projects and CI/CD are available.
:::

---

## Quick Decision Rules

### "Which protection should I use?"

```text
Need to hide values from some users -> Dynamic Data Masking
Need row-by-row visibility control -> Row-Level Security
Need strong encryption with client-side protection -> Always Encrypted
Need audit evidence -> Auditing
```

### "Which search pattern fits?"

```text
Exact words and operators matter most -> Full-text
Meaning and similarity matter most -> Vector
Need both business terms and semantic relevance -> Hybrid
Need generated answer grounded in retrieved data -> RAG
```

### "Which delivery pattern fits?"

```text
Need governed schema delivery -> SQL Database Projects + CI/CD
Need quick REST/GraphQL over SQL -> Data API builder
Need AI help writing SQL safely -> Copilot + instruction files + review
```

---

## Final Strategy

- Treat Domains 1 and 2 as the scoring backbone. Domain 3 is differentiating, but only after the SQL fundamentals are solid.
- Memorize the security distinctions: **Always Encrypted vs DDM vs RLS**.
- Be fluent in the search ladder: **full-text -> vector -> hybrid -> RAG**.
- Expect Microsoft-preferred implementation paths: **SQL Database Projects**, **DAB**, **Managed Identity**, **GitHub workflows**, and **MCP-aware tooling**.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
