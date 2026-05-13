---
title: "Domain 1 - Plan AI-powered Business Solutions"
description: "AB-100 Domain 1: Plan AI-powered business solutions, analyze requirements, design AI strategy, and evaluate ROI"
date: 2026-05-13
tags: [microsoft, azure, ab-100, agentic-ai, planning, ai-strategy]
head:
  - - meta
    - name: keywords
      content: ab-100, domain 1, plan ai business solutions, agentic ai, ai strategy, roi, grounding data
---

# Domain 1: Plan AI-powered Business Solutions (25-30%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

::: tip Exam Lens
Planning questions are usually about sequence and fit: business outcome first, data readiness second, platform and agent design third, then governance, ROI, and operating model.
:::

---

## Skills Measured

| Skill area | What to know |
|------------|--------------|
| Analyze requirements | Agents for automation, analytics, and decision-making; grounding data quality; data organization for AI consumption |
| Design overall AI strategy | Cloud Adoption Framework, agent strategy, multi-agent architecture, Copilot extension vs custom agent, prompt libraries, small language models, AI Center of Excellence |
| Evaluate costs and benefits | ROI criteria, total cost of ownership, build/buy/extend decisions, model routing |

---

## Module: Introduction to Agentic AI Business Solutions

Source: [Microsoft Learn module](https://learn.microsoft.com/en-us/training/modules/introduction-agentic-ai-business-solution-architecture/)

### Architect Role

The AI architect connects business strategy to technical implementation.

| Responsibility | Exam meaning |
|----------------|--------------|
| Vision and roadmap | Define an AI adoption strategy aligned with business priorities |
| Data architecture | Ensure grounding data is ready, governed, and accessible |
| Integration | Connect Microsoft AI services into enterprise workflows |
| Security and ethics | Apply responsible AI, access control, and compliance patterns |
| Performance monitoring | Define KPIs, telemetry, and optimization loops |

### Transformation Flow

Use this sequence for planning scenarios:

1. Business goals
2. AI strategy
3. Architecture design
4. Implementation
5. Monitoring and optimization

### Microsoft AI Technology Map

| Technology | Best fit |
|------------|----------|
| Microsoft 365 Copilot | Productivity inside Microsoft 365 apps, Teams, SharePoint, and work graph experiences |
| Copilot Studio | Build and extend agents, topics, actions, connectors, orchestration, and grounded experiences |
| Microsoft Foundry | Build, evaluate, deploy, and manage custom AI apps, models, tools, and agents |
| Dynamics 365 Copilot | Business process AI in sales, service, finance, supply chain, and customer experiences |
| Power Platform | Low-code app, workflow, connector, and agent integration patterns |
| Azure AI services | Prebuilt vision, speech, language, decision, and generative AI capabilities |

### Out-of-Box Agent Resources

- Start with prebuilt Microsoft agents when the scenario maps to a common productivity or business-process pattern.
- Extend Microsoft 365 Copilot when the requirement stays inside Microsoft 365 workflows but needs organization-specific knowledge or actions.
- Build custom agents when the workflow needs specialized behavior, nonstandard systems, custom orchestration, or a bounded business process.

::: warning Trap
Do not jump to custom models or custom agents just because the prompt says "AI." Prefer prebuilt Copilot and extension paths when they satisfy the scenario with lower operational burden.
:::

---

## Module: Analyze Requirements for AI-powered Business Solutions

Source: [Microsoft Learn module](https://learn.microsoft.com/en-us/training/modules/analyze-requirements-ai-powered-business-solutions/)

### Agent Value Areas

| Use case | Agent contribution | Microsoft fit |
|----------|--------------------|---------------|
| Task automation | Draft, summarize, trigger workflows, perform multi-step processes | Microsoft 365 Copilot, Copilot Studio, Power Automate |
| Data analytics | Convert natural language questions into summaries, trends, outliers, visualizations, and next actions | Copilot experiences, Fabric, Power BI, Azure AI |
| Decision support | Surface context, scenarios, risks, and recommendations from enterprise data | Copilot, Graph grounding, Retrieval API, RAG |

### Grounding Data Quality

| Dimension | Meaning | Why it matters |
|-----------|---------|----------------|
| Accuracy | Correct and verified by authoritative sources or SMEs | Reduces incorrect or misleading responses |
| Relevance | Aligned to the user's task, business domain, and workflow | Prevents semantically similar but contextually wrong retrieval |
| Timeliness | Current enough for the business decision | Avoids stale policies, prices, compliance rules, and operational facts |
| Cleanliness | Structured, deduplicated, consistently formatted, low-noise | Improves embeddings, indexing, and retrieval precision |
| Availability | Accessible, indexed, and permissioned for the user and agent | Lets the agent ground responses while respecting access boundaries |

::: danger Critical
Grounding does not bypass permissions. Copilot and retrieval services must honor access controls, sensitivity, and user scope.
:::

### Organizing Data for AI Systems

AI-ready data should be usable by Microsoft 365 Copilot, Copilot Studio agents, custom Azure AI apps, RAG pipelines, analytics, and automation.

| Layer | Examples | Purpose |
|-------|----------|---------|
| Knowledge sources | SharePoint, OneDrive, Dataverse, Azure Storage | Authoritative documents and business data |
| Operational databases | Azure SQL, Cosmos DB, PostgreSQL | Structured business and app data |
| Analytical stores | Fabric Lakehouse, warehouse patterns | Curated data for analytics and AI/ML workloads |
| Intelligence layer | Azure AI Search, semantic ranking, embeddings, vector search | Retrieval, grounding, semantic search, and RAG |
| Governance layer | Microsoft Purview, sensitivity labels, RBAC | Access control, lineage, quality, compliance |
| Access paths | APIs, Graph connectors, search indexes, SQL endpoints | Enables multiple agents and AI systems to consume data reliably |

### Completed Knowledge Check

- [Analyze requirements knowledge check](https://learn.microsoft.com/en-us/training/modules/analyze-requirements-ai-powered-business-solutions/5-knowledge-check/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.wwl.architect-agentic-ai-business-solutions)

---

## Module: Design Overall AI Strategy for Business Solutions

Source: [Microsoft Learn module](https://learn.microsoft.com/en-us/training/modules/design-overall-ai-strategy-business-solutions/)

### Strategy Topics to Expand

This module maps directly to the planning domain and should become the main strategy note set.

| Topic | Notes starter |
|-------|---------------|
| CAF AI adoption phases | Map Cloud Adoption Framework phases to the AI agent lifecycle |
| Operating model | Define ownership, governance, lifecycle management, and platform responsibilities for agents |
| Microsoft platform selection | Choose between Microsoft 365 Copilot, Copilot Studio, Microsoft Foundry, Power Platform, Dynamics 365, and Azure AI |
| POC to production | Use checklists for governance, security, data readiness, testing, telemetry, and supportability |
| Multi-agent design | Define orchestration, agent boundaries, handoffs, data access, and accountability |
| Prompt library | Standardize reusable prompts, metadata, review process, versioning, and ownership |
| Custom AI models | Use only when existing models, grounding, prompts, or extensions do not meet the requirement |
| AI Center of Excellence | Include governance, standards, reusable patterns, enablement, metrics, and responsible AI oversight |

### Design Decision Rules

| Requirement signal | Prefer |
|--------------------|--------|
| Standard productivity scenario in Microsoft 365 | Microsoft 365 Copilot or prebuilt agent |
| Business process automation with low-code workflows | Copilot Studio and Power Platform |
| Custom app, custom model, model evaluation, or advanced orchestration | Microsoft Foundry |
| Dynamics 365 process optimization | Dynamics 365 Copilot and app-specific configuration |
| Current enterprise knowledge required | Grounding/RAG over fine-tuning |
| Specialized behavior with stable examples and clear evaluation criteria | Consider custom model or small language model |

---

## ROI and Build/Buy/Extend Notes

| Question | Include in answer |
|----------|-------------------|
| ROI criteria | Time saved, quality improvement, revenue lift, risk reduction, adoption, support effort |
| TCO | Licensing, implementation, data preparation, integrations, security, governance, testing, monitoring, training |
| Build | Use when requirements are unique, high-value, and cannot be satisfied by existing products or extensions |
| Buy | Use when a prebuilt Microsoft or ISV solution meets the business process with lower risk |
| Extend | Use when the base product fits but needs organization-specific knowledge, actions, or workflow integration |
| Model router | Route requests by cost, latency, capability, data sensitivity, and task complexity |

<FlashcardDeck
  title="Domain 1 Planning Quiz"
  :cards="[
    {
      question: 'What should come before agent design?',
      answer: '<strong>Business outcome and requirements analysis</strong>. Then validate data readiness, governance, and platform fit.'
    },
    {
      question: 'What are the five grounding data quality dimensions?',
      answer: '<strong>Accuracy, relevance, timeliness, cleanliness, and availability</strong>.'
    },
    {
      question: 'When should you prefer grounding/RAG over model customization?',
      answer: 'When the agent needs current, authoritative, permission-controlled enterprise knowledge.'
    },
    {
      question: 'What does a model router optimize?',
      answer: 'Routing by task complexity, capability, cost, latency, data sensitivity, and reliability requirements.'
    }
  ]"
/>
