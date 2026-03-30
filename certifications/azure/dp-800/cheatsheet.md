---
title: "DP-800 - Cheatsheet"
description: "One-page exam day reference for DP-800 Microsoft Certified: SQL AI Developer Associate (beta)"
head:
  - - meta
    - name: keywords
      content: dp-800, cheatsheet, sql ai developer, vectors, rag, security, query store, dab
---

# DP-800: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md) · [Visual Study Kit →](./visual-cheatsheet.md)

---

## Three-Domain Map

| Domain | Focus |
|---|---|
| **Domain 1** | SQL design, advanced T-SQL, AI-assisted development |
| **Domain 2** | Security, performance, CI/CD, DAB |
| **Domain 3** | Embeddings, vector search, hybrid search, RAG |

---

## Security Shortcuts

| Need | Use |
|---|---|
| Hide values from some users | **Dynamic Data Masking** |
| Restrict which rows users can see | **Row-Level Security** |
| Protect plaintext even from DB side | **Always Encrypted** |
| Capture compliance evidence | **Auditing** |
| Avoid secrets in code | **Managed Identity** / proper secrets management |

---

## SQL Object Memory Hooks

- **Temporal** = history
- **Ledger** = tamper evidence
- **Graph** = relationship traversal
- **Columnstore** = analytics/compression
- **Trigger** = automatic reaction to DML event
- **Stored procedure** = explicit controlled execution path

---

## Search Ladder

```text
Keyword match -> Full-text search
Meaning match -> Vector search
Keyword + meaning -> Hybrid search
Retrieved data + generated answer -> RAG
```

---

## AI Integration Quick Rules

| Question signal | Best answer direction |
|---|---|
| Data changes often | **RAG**, not fine-tuning |
| Need faster approximate vector lookup at scale | **ANN** |
| Need exact nearest-neighbor results | **ENN** |
| Need combined ranking from lexical + semantic search | **RRF** |
| Need SQL to call external model endpoint | **`sp_invoke_external_rest_endpoint`** |

---

## DevOps and API Shortcuts

| Need | Use |
|---|---|
| Source-controlled schema lifecycle | **SQL Database Projects** |
| Drift detection | **SQL Database Projects** |
| REST/GraphQL over SQL | **Data API builder** |
| Safer AI-assisted SQL work | **Copilot instruction files + review + least privilege** |
| Event-driven downstream refresh | **CDC / Change Tracking / CES / Functions / Logic Apps** |

---

## Beta Exam Reminders

- **100 minutes**
- **700 passing score**
- **No immediate beta scoring**
- **No practice assessment yet**

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md) · [Visual Study Kit →](./visual-cheatsheet.md)
