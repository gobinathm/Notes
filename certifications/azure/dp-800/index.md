---
title: "DP-800 - Developing AI-Enabled Database Solutions"
description: "Study notes for DP-800 Microsoft Certified: SQL AI Developer Associate (beta)"
head:
  - - meta
    - name: keywords
      content: dp-800, microsoft, sql ai developer associate, azure sql, sql server, fabric sql database, vectors, embeddings, rag, github copilot, certification, study notes
---

# DP-800: Microsoft Certified SQL AI Developer Associate (beta)

Validates the ability to **design, secure, optimize, and extend SQL solutions with AI capabilities** across Microsoft SQL Server, Azure SQL, and SQL databases in Microsoft Fabric.

<ExamMeta duration="100 min" questions="Not stated (beta)" passing="700/1000" cost="Varies by region" level="Associate (beta)" provider="Pearson VUE" />

::: info Beta Exam Notes
Microsoft currently lists DP-800 as a **beta** exam. Beta exams are **not scored immediately**, and the **Practice Assessment is not currently available**.

**Notes Prepared**: March 2026 · **Last Updated**: 2026-03-28
:::

::: info Currently Studying ⏳
**Study by**: December 2026

**Exam**: TBD

**Notes Prepared**: March 2026 · **Last Updated**: 2026-03-28
:::

## Audio Refresher

A podcast-style walkthrough of key exam tactics. Useful as a final pass before practice questions or exam-day review.

<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://creators.spotify.com/pod/profile/gobinathm/embed/episodes/Exam-Refreshers-DP-800-Last-Minute-Guide-Microsoft-Certified-SQL-AI-Developer-Associate-e3hbvc9/a-acint5v" width="100%" height="152" frameBorder="0" scrolling="no" loading="lazy"></iframe>

::: tip Target Candidate
This exam is for developers who already work comfortably with **T-SQL**, **database design**, and **deployment workflows**, and now need to add **AI-assisted development**, **embeddings/vector search**, and **RAG patterns** into SQL-backed applications.
:::

::: info Official Scope Note
Microsoft has not released a large official learning path for this exam yet, but the official **study guide** clearly defines what is assessed. These notes follow that study guide and fill coverage around the three published skill areas.
:::

---

## What the Exam Covers

According to the official study guide, DP-800 currently measures three skill areas:

| Skill Area | Weight | Focus |
|---|---:|---|
| [Domain 1: Design and develop database solutions](./domain-1.md) | 35-40% | Database objects, advanced T-SQL, JSON/regex/graph queries, AI-assisted tooling |
| [Domain 2: Secure, optimize, and deploy database solutions](./domain-2.md) | 35-40% | Encryption, RLS, DDM, performance tuning, SQL projects, DAB, CI/CD |
| [Domain 3: Implement AI capabilities in database solutions](./domain-3.md) | 25-30% | External models, embeddings, vector search, hybrid search, RAG |

---

## Study Progress

<ProgressTracker
  title="DP-800 Study Progress"
  storage-key="dp-800-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Design and develop database solutions (35-40%)',
      link: './domain-1',
      children: [
        { id: 'd1-objects', label: 'Tables, indexes, JSON columns/indexes, temporal, ledger, graph, sequences', link: 'https://learn.microsoft.com/en-us/sql/relational-databases/tables/tables' },
        { id: 'd1-tsql', label: 'Advanced T-SQL, JSON, regex, window functions', link: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql' },
        { id: 'd1-copilot', label: 'GitHub Copilot, MCP, AI-assisted SQL workflows', link: 'https://learn.microsoft.com/en-us/sql/tools/sql-database-projects/sql-projects' }
      ]
    },
    {
      id: 'domain-2',
      label: 'Domain 2: Secure, optimize, and deploy database solutions (35-40%)',
      link: './domain-2',
      children: [
        { id: 'd2-security', label: 'Encryption, masking, RLS, auditing, passwordless auth', link: 'https://learn.microsoft.com/en-us/azure/azure-sql/database/security-overview' },
        { id: 'd2-performance', label: 'Query Store, plans, DMVs, blocking, deadlocks, database configuration', link: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/monitoring-performance-by-using-the-query-store' },
        { id: 'd2-devops', label: 'SQL Database Projects, tests, schema drift, deployments', link: 'https://learn.microsoft.com/en-us/sql/tools/sql-database-projects/sql-database-projects' },
        { id: 'd2-dab', label: 'Data API builder, REST/GraphQL, caching, Azure Monitor', link: 'https://learn.microsoft.com/en-us/azure/data-api-builder/' }
      ]
    },
    {
      id: 'domain-3',
      label: 'Domain 3: Implement AI capabilities in database solutions (25-30%)',
      link: './domain-3',
      children: [
        { id: 'd3-models', label: 'External models, embeddings, chunking, embedding refresh', link: 'https://learn.microsoft.com/en-us/sql/sql-server/ai/vectors' },
        { id: 'd3-search', label: 'Vector search, VECTOR_* functions, hybrid search, ANN vs ENN, RRF', link: 'https://learn.microsoft.com/en-us/sql/sql-server/ai/vector-search' },
        { id: 'd3-rag', label: 'RAG with sp_invoke_external_rest_endpoint and JSON shaping', link: 'https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-invoke-external-rest-endpoint-transact-sql' }
      ]
    },
    { id: 'objectives', label: 'Reviewed official exam objectives', link: './objectives' },
    { id: 'exam-guide', label: 'Reviewed beta exam guide', link: './exam-guide' },
    { id: 'cheatsheet', label: 'Reviewed quick reference', link: './cheatsheet' },
    { id: 'visual-cheatsheet', label: 'Reviewed visual study kit', link: './visual-cheatsheet' },
    { id: 'ready', label: 'Ready for exam' }
  ]"
/>

---

## Official Resources

- [DP-800 Certification Page](https://learn.microsoft.com/en-us/credentials/certifications/developing-ai-enabled-database-solutions/?practice-assessment-type=certification)
- [DP-800 Study Guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-800)
- [DP-800T00-A Course: Develop AI-enabled database solutions](https://learn.microsoft.com/en-us/training/courses/dp-800t00)
- [Exam Sandbox](https://aka.ms/examdemo)
- [Exam Objectives Crosswalk](./objectives.md)

## Core Documentation

- [Microsoft SQL documentation](https://learn.microsoft.com/en-us/sql/)
- [SQL Database Projects](https://learn.microsoft.com/en-us/sql/tools/sql-database-projects/sql-database-projects)
- [Data API builder](https://learn.microsoft.com/en-us/azure/data-api-builder/)
- [Azure SQL security overview](https://learn.microsoft.com/en-us/azure/azure-sql/database/security-overview)

## Study Notes for This Cert

- Domain 1 emphasizes **database craftsmanship**: schema design, advanced T-SQL, and AI-assisted SQL workflows.
- Domain 2 is heavy on **real production concerns**: security, query tuning, CI/CD, and safe deployments.
- Domain 3 is where the **AI-specific differentiators** show up: embeddings, vectors, hybrid retrieval, and SQL-native RAG orchestration.

::: warning Resource Caveat
As of **March 28, 2026**, Microsoft states that the **Practice Assessment is not currently available** for DP-800 because the exam is still in beta.
:::

---

[Start Study Notes →](./domain-1.md) · [Objectives →](./objectives.md) · [Cheatsheet →](./cheatsheet.md) · [Visual Study Kit →](./visual-cheatsheet.md) · [Exam Guide →](./exam-guide.md)
