---
title: "DP-800 - Exam Objectives"
description: "Official exam objectives for DP-800 Microsoft Certified: SQL AI Developer Associate (beta)"
head:
  - - meta
    - name: keywords
      content: dp-800, exam objectives, microsoft, sql ai developer associate, study guide, azure sql, sql server, fabric sql database, vectors, embeddings, rag
---

# DP-800: Exam Objectives

[← Back to Overview](./index.md)

For the complete and official list of exam objectives, refer to the Microsoft study guide:

**[Study guide for Exam DP-800: Developing AI-Enabled Database Solutions](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-800)**

::: info Source Scope
This page mirrors the official Microsoft Learn study guide wording and weighting published for DP-800, including the **Skills measured as of March 12, 2026**.
:::

## Audience Profile

According to Microsoft, candidates for DP-800 should have subject matter expertise in designing and developing **AI-enabled database solutions** across:

- **Microsoft SQL Server**
- **Azure SQL**
- **SQL databases in Microsoft Fabric**

You are also expected to be comfortable with:

- **T-SQL development**
- **database development on Microsoft SQL platforms**
- **CI/CD practices in GitHub**
- **AI-assisted development tools**
- **AI concepts such as embeddings, vectors, and models**

## Exam Weighting

| Domain | Weight | Focus |
|---|---:|---|
| Design and develop database solutions | 35-40% | Database objects, advanced T-SQL, programmability, AI-assisted SQL development |
| Secure, optimize, and deploy database solutions | 35-40% | Security, compliance, performance, SQL projects, testing, DAB, Azure integration |
| Implement AI capabilities in database solutions | 25-30% | External models, embeddings, intelligent search, vector functions, RAG |

## Skills Measured

### Design and develop database solutions (35-40%)

- Design and implement database objects
  Create and manage tables, indexes, constraints, specialized table types, **JSON columns and indexes**, and **SEQUENCES**
- Implement programmability objects
  Create and manage views, functions, stored procedures, and triggers
- Write advanced T-SQL code
  Use CTEs, correlated subqueries, window functions, JSON functions, regular expressions, graph queries, fuzzy functions, and robust error handling
- Design and implement SQL solutions by using AI-assisted tools
  Use GitHub Copilot and Fabric Copilot, instruction files, model options, MCP servers and tools, and secure AI-assisted workflows

### Secure, optimize, and deploy database solutions (35-40%)

- Implement data security and compliance
  Use column-level encryption, Always Encrypted, Dynamic Data Masking, Row-Level Security, auditing, object-level permissions, and passwordless access patterns
- Optimize database performance
  Analyze execution plans, use DMVs and Query Store, troubleshoot blocking and deadlocks, and **recommend database configurations**
- Implement CI/CD by using SQL Database Projects
  Work with SDK-style projects, testing strategy, **unit and integration tests**, reference data, schema drift, conflict resolution, branching, and secure secret handling
- Integrate SQL solutions with Azure services
  Configure Data API builder, **REST and GraphQL endpoints**, **data caching**, Azure Functions, Azure Logic Apps, CES, CDC, Change Tracking, and **Azure Monitor configurations including Application Insights and Log Analytics**

### Implement AI capabilities in database solutions (25-30%)

- Design and implement models and embeddings
  Evaluate model options, **create and manage external models**, design embedding pipelines, choose chunking strategy, and manage embedding refresh
- Design and implement intelligent search
  Implement full-text, vector, and hybrid search; use **VECTOR_SEARCH**, **VECTOR_DISTANCE**, **VECTOR_NORMALIZE**, and **VECTORPROPERTY**; understand vector indexes, metrics, ANN, ENN, and RRF; evaluate retrieval performance
- Design and implement retrieval-augmented generation (RAG)
  Retrieve context, shape prompts, invoke external model endpoints with SQL, parse responses, and keep answers grounded in current enterprise data

## Study Use

Use this page as the coverage checklist. Use the domain notes for explanations and examples:

- [Domain 1](./domain-1.md)
- [Domain 2](./domain-2.md)
- [Domain 3](./domain-3.md)
- [Exam Guide](./exam-guide.md)
- [Cheatsheet](./cheatsheet.md)
- [Visual Study Kit](./visual-cheatsheet.md)

---

[← Back to Overview](./index.md) · [Study Notes →](./domain-1.md) · [Exam Guide →](./exam-guide.md)
