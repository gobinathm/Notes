---
title: "DP-800 - Domain 2: Secure, optimize, and deploy database solutions"
description: "DP-800 notes on SQL security, performance tuning, SQL Database Projects, Data API builder, and deployment controls"
head:
  - - meta
    - name: keywords
      content: dp-800, domain 2, always encrypted, dynamic data masking, row-level security, query store, data api builder, sql database projects, ci cd
---

# Domain 2: Secure, optimize, and deploy database solutions (35-40%)

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)

This domain is about building SQL systems that are not just functional, but **safe**, **observable**, and **deployable at scale**.

---

## 2.1 Implement data security and compliance

### Core controls

| Control | Use it when | Key point |
|---|---|---|
| **Always Encrypted** | Sensitive data must remain protected even from DB admins | Encryption/decryption happens client-side |
| **Column-level encryption** | Specific columns need encryption but not full Always Encrypted semantics | Simpler, but different trust boundary |
| **Dynamic Data Masking** | Hide sensitive values from some users without changing stored data | Masking is obfuscation, not encryption |
| **Row-Level Security (RLS)** | Different users should only see their own rows | Filter data visibility by predicate |
| **Object-level permissions** | Restrict who can query tables, views, or procs | Standard least-privilege control |
| **Auditing** | Need traceability and compliance evidence | Capture access and changes |

::: warning Masking vs Encryption
**Dynamic Data Masking** changes what some users see.  
**Encryption** changes how data is protected at rest or in use.

If the requirement is "DBA must not see plaintext", think **Always Encrypted**, not masking.
:::

### Modern access posture

- Prefer **passwordless** approaches where supported.
- Use **Managed Identity** to secure model endpoints and service-to-service access.
- Secure **REST**, **GraphQL**, and **MCP** endpoints the same way you would secure the database itself: authentication, authorization, auditability, and least privilege.

### Security implementation clues Microsoft is signaling

- **Object-level permissions** for least-privilege access
- **Passwordless authentication** where supported
- correct distinction between **obfuscation**, **server-side encryption**, and **client-side protection**
- compliance evidence through **auditing**

---

## 2.2 Optimize database performance

### Performance toolkit

| Tool | What it helps with |
|---|---|
| **Execution plans** | See join strategy, scans, seeks, and operator costs |
| **DMVs** | Surface live operational metadata and workload behavior |
| **Query Store** | Historical query performance, regressions, and plan comparison |
| **Query Performance Insight** | Azure-centric performance visibility |

### Common exam themes

- Blocking and deadlocks
- Bad indexing strategy
- Parameter sensitivity / unstable plans
- Wrong isolation level for workload behavior
- Transaction scope too broad
- Poorly chosen database configuration defaults

### Recommend database configurations

The official study guide explicitly includes **recommending database configurations**, so do not treat this domain as query tuning only.

| If the scenario emphasizes... | Review |
|---|---|
| Workload concurrency and contention | isolation level, row versioning, transaction scope |
| Plan instability or regressions | Query Store configuration and plan forcing options |
| Monitoring gaps | baseline, telemetry, and diagnostic configuration |
| Scaling behavior | indexing, storage layout, and service/database settings together |

### Isolation level mental shortcut

| Need | Direction |
|---|---|
| Highest correctness, more locking | Stronger isolation |
| Better concurrency, tolerate more anomalies | Lighter isolation |
| Preserve integrity under contention | Review transaction design first |

::: tip
DP-800 is practical here: the best answer is usually the one that improves performance **without sacrificing correctness** or weakening security.
:::

---

## 2.3 Implement CI/CD by using SQL Database Projects

This section is very Microsoft-specific and likely exam-relevant.

### What to know

- Create and validate database models with **SQL Database Projects**
- Use **SDK-style models**
- Design a **testing strategy**
- Run **unit tests** and **integration tests**
- Store **reference/static data** in source control where appropriate
- Configure branching, PRs, and conflict resolution
- Detect **schema drift**
- Deploy changes safely and repeatedly
- Manage **secrets** outside source control

### Healthy database DevOps flow

1. Model schema in a SQL Database Project.
2. Keep changes versioned in Git.
3. Validate builds in CI.
4. Run unit/integration tests.
5. Review drift between desired and target state.
6. Deploy with approvals and branch policies.

### Deployment governance signals

If the question mentions any of these, expect stronger pipeline controls:

- **branch policies**
- **approvals**
- **code owners**
- **authentication tables**
- **schema drift**
- **secret rotation**

### Testing strategy matters here

Microsoft explicitly calls out **unit tests** and **integration tests** in this objective.

| Test type | What it protects |
|---|---|
| **Unit tests** | Stored procedure, function, and schema behavior in controlled conditions |
| **Integration tests** | Application-to-database behavior, deployment safety, and environment correctness |

::: warning Common Trap
If a scenario needs repeatable deployments and reviewable schema history, do **not** rely on ad hoc manual SQL scripts as the primary answer. Prefer a **SQL Database Project + CI/CD pipeline** approach.
:::

---

## 2.4 Integrate SQL solutions with Azure services

### Data API builder (DAB)

DAB exposes database entities through **REST** and **GraphQL** using configuration-first patterns.

| Capability | Why it matters |
|---|---|
| **Entity configuration** | Controls what gets exposed and how |
| **Pagination/search/filtering** | Shapes endpoint usability and cost |
| **GraphQL relationships** | Makes relational models easier to consume |
| **REST or GraphQL endpoint config** | Determines how the SQL surface is exposed to clients |
| **Data caching** | Helps reduce repeated reads and improves API responsiveness in the right scenarios |
| **Deployment config** | Needed for predictable API rollout |

### When DAB is the right answer

- You need quick API exposure over existing SQL objects
- You want REST and GraphQL without building a custom app layer from scratch
- You need to expose stored procedures, views, and relationships

### Azure Monitor configurations

The official study guide also includes **Azure Monitor configurations**, especially:

- **Application Insights**
- **Log Analytics**

Use these when the scenario is about:

- API or app telemetry tied to SQL-backed services
- operational diagnostics and troubleshooting
- centralized queryable logs and monitoring signals
- observing integration paths, not just the database engine

### Change propagation options

The study guide explicitly calls out:

- **Change event streaming (CES)**
- **Change Data Capture (CDC)**
- **Change Tracking**
- **Azure Functions with SQL trigger binding**
- **Azure Logic Apps**

Use these when embeddings, caches, downstream apps, or search indexes must stay in sync with database changes.

---

## Fast Recall

- **Always Encrypted** protects plaintext from the database side.
- **DDM** hides values from some users but is not encryption.
- **RLS** controls who sees which rows.
- **Query Store** is the default answer for plan regressions/history.
- **SQL Database Projects** are central to CI/CD and drift detection.
- **DAB** is the Microsoft answer for configuration-driven REST/GraphQL over SQL.

---

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)
