---
title: "DP-800 - Domain 1: Design and develop database solutions"
description: "DP-800 notes on schema design, advanced T-SQL, JSON, graph, regex, and AI-assisted SQL workflows"
head:
  - - meta
    - name: keywords
      content: dp-800, domain 1, sql design, t-sql, json, graph, regex, github copilot, mcp, sql server
---

# Domain 1: Design and develop database solutions (35-40%)

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)

::: tip Why This Domain Matters
This is one of the two highest-weighted sections. The exam expects you to be strong at **traditional SQL engineering first**, then layer in **AI-assisted development** without compromising security or maintainability.
:::

---

## 1.1 Design and implement database objects

### Table design signals

| Topic | What to know for the exam |
|---|---|
| **Data types and sizing** | Pick the smallest correct type, especially for keys, money, and text-heavy columns. |
| **Indexes** | Understand clustered vs nonclustered, filtered indexes, included columns, and when columnstore fits analytics workloads. |
| **Specialized tables** | Know when to use in-memory, temporal, external, ledger, and graph tables. |
| **Constraints** | Expect PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, and DEFAULT questions tied to integrity. |
| **Partitioning** | Use for large tables with predictable access patterns and maintenance needs. |

### Specialized table quick map

| Feature | Best for | Common exam signal |
|---|---|---|
| **Temporal tables** | Row history and point-in-time queries | "Need audit history of changes" |
| **Ledger tables** | Tamper-evident records | "Need cryptographic proof of integrity" |
| **Graph tables** | Relationship-heavy patterns | "Many-to-many traversal" or "social/network traversal" |
| **External tables** | Querying outside core storage | "Data lives in external source or lakehouse" |
| **In-memory OLTP** | Extreme low-latency transactional workloads | "Hot path writes" or "reduce latch contention" |

::: warning Exam Trap
If the requirement is simply "keep historical versions", think **temporal** first.  
If the requirement is "prove nobody tampered with records", think **ledger**.
:::

---

## 1.2 Implement programmability objects

- **Views** are for abstraction, reuse, and controlled data exposure.
- **Scalar functions** are simple but can hurt performance if overused row-by-row.
- **Table-valued functions** are often better for composability inside queries.
- **Stored procedures** are still the default for operational logic, parameterization, and controlled execution.
- **Triggers** are powerful but easy to abuse. Prefer them for precise event-driven database behavior, not broad business workflows.

### Stored procedure vs trigger

| Need | Prefer |
|---|---|
| Explicitly called data operation | **Stored procedure** |
| Automatically react to insert/update/delete | **Trigger** |
| Expose consistent app-facing write API | **Stored procedure** |
| Capture every row change event at source | **Trigger** |

---

## 1.3 Write advanced T-SQL code

### Core patterns to know

- **CTEs** for readable staged logic, recursive queries, and query decomposition.
- **Window functions** such as `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, and running aggregates.
- **JSON functions** for shaping and parsing semi-structured data.
- **Regular expressions** and **fuzzy matching** for text cleanup, search, and approximate matching.
- **Graph queries with `MATCH`** for node-edge traversal scenarios.
- **Correlated queries** when outer-row context changes inner evaluation.
- **Error handling** with `TRY...CATCH`, transaction boundaries, and defensive logic.

### JSON mental model

| Task | Typical SQL feature |
|---|---|
| Extract one value from JSON | `JSON_VALUE` |
| Extract object/array fragments | `JSON_QUERY` |
| Turn JSON into rows | `OPENJSON` |
| Build JSON output | `JSON_OBJECT`, `JSON_ARRAY`, aggregates |

::: tip
DP-800 repeatedly blends **structured** and **semi-structured** data. If a scenario mentions application payloads, model prompts, or API responses, expect JSON shaping to matter.
:::

---

## 1.4 Design and implement SQL solutions by using AI-assisted tools

This is one of the most distinctive parts of DP-800.

### What Microsoft expects here

- Enable and use **GitHub Copilot** or **Copilot in Fabric**
- Understand the **security implications** of AI-assisted tooling
- Configure **model options** and **MCP tools**
- Create **instruction files** to shape Copilot behavior
- Connect to **MCP endpoints** such as SQL Server or Fabric lakehouse

### Practical interpretation

| Capability | Why it matters |
|---|---|
| **Instruction files** | Keep generated SQL aligned with naming, migration, testing, and safety rules. |
| **MCP connectivity** | Lets the assistant use live schema/tool context instead of guessing. |
| **Model/tool options** | Affect latency, capability, and risk surface. |
| **Security review** | AI-generated SQL can still leak data, over-permission access, or suggest unsafe changes. |

::: warning AI-Assisted Tooling Trap
The correct answer is rarely "let Copilot decide and run unrestricted changes."  
Microsoft explicitly expects you to reason about **security impact**, **guardrails**, and **reviewability**.
:::

### Good operating model

1. Use Copilot for acceleration, not blind execution.
2. Keep schema definitions and reference data in source control.
3. Use instruction files to constrain code generation.
4. Prefer least-privilege access for tools and MCP endpoints.
5. Review generated SQL for correctness, locking behavior, and security.

---

## Fast Recall

- **Temporal** = history
- **Ledger** = tamper evidence
- **Columnstore** = analytics/compression
- **Window functions** = ranking, offsets, running totals
- **JSON** = bridge between app payloads and SQL
- **Instruction files + MCP** = safer, context-aware AI-assisted SQL work

---

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)
