---
title: "Domain 1: Plan and Manage an Azure AI Solution"
description: "Notes on Microsoft AI Foundry, resource management, security, responsible AI, and monitoring for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, azure ai foundry, managed identity, defaultazurecredential, provisioned throughput, ptu, responsible ai, content safety, prompt shields
---

# Domain 1: Plan and manage an Azure AI solution (20-25%)

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)

---

This domain covers the foundational infrastructure of Azure AI — resource selection, deployment strategy, security, responsible AI, and monitoring. At 20–25%, it is the highest-weighted domain on the exam.

## 1.1 Select and Deploy Resources

### Microsoft AI Foundry Architecture

| Resource | Role | Exam Signal |
|---------|------|-------------|
| **Azure AI Services** | The underlying platform APIs (Vision, Language, Speech, etc.) | Any time you provision an API endpoint |
| **AI Foundry Hub** | Shared infrastructure: compute, connections, role assignments, security for multiple teams/projects | "shared compute", "manage multiple teams" |
| **AI Foundry Project** | Your workspace inside a Hub — build, test, deploy models and agents | "build a chatbot", "deploy a model" |

::: info Hub vs Project (Exam Trap)
**Hub** = shared infrastructure for multiple teams (compute, keys, network policy).
**Project** = your individual workspace inside a Hub (models, datasets, prompt flows).

The exam uses "set up shared compute for multiple teams" → Hub. "Build a specific solution" → Project.
:::

### Service Selection

| Capability | Service to Use |
|-----------|---------------|
| Generative AI (LLMs) | Azure OpenAI / Model Catalog in AI Foundry |
| Vision (images, video) | Azure AI Vision / Video Indexer |
| NLP (sentiment, NER, Q&A) | Azure AI Language |
| Speech (STT, TTS, translation) | Azure AI Speech |
| Knowledge Mining | Azure AI Search |
| Form / Document extraction | Document Intelligence |
| Multimodal pipelines | Content Understanding |

### Deployment Options

| Option | Characteristics | Exam Signal |
|--------|----------------|-------------|
| **Standard (Pay-as-you-go)** | Shared infrastructure, variable latency, billed per token/call | Default choice |
| **Provisioned (PTU)** | Reserved capacity, consistent latency, higher fixed cost | "predictable latency", "guaranteed throughput" |
| **Docker Container** | Runs on-premises or at edge, requires Azure for billing metering | "data residency", "offline", "edge deployment" |
| **Global deployment** | Routes to nearest Azure region, higher rate limits | "scale globally" |

::: warning PTU vs Standard
**Standard** = pay-per-token, latency varies with load.
**PTU (Provisioned Throughput)** = reserved capacity, fixed cost, consistent sub-second latency.

The exam signals PTU with phrases like "predictable latency", "guaranteed throughput", or "high-volume production workload".
:::

---

## 1.2 Manage Costs

- **Billing models**: AI services charge per transaction (API call), per page (Document Intelligence), or per token (OpenAI models).
- **Azure Cost Management**: Set budgets and configure alerts when spending approaches thresholds.
- **Single-service resources vs multi-service**: Use single-service resources when you need department-level chargebacks.
- **Token monitoring**: Track input/output token counts in generative apps to prevent runaway costs — use AI Foundry metrics dashboards.

---

## 1.3 Manage Security and Authentication

### Authentication Methods

| Method | When to Use | Exam Signal |
|--------|------------|-------------|
| **Managed Identity + DefaultAzureCredential()** | Production apps, CI/CD, key rotation avoidance | "avoid hardcoded keys", "keyless auth" |
| **Subscription Key** | Quick testing, scripts, development | "simple testing" |
| **RBAC Roles** | Granular access control, audit trail | "least privilege", "cross-service access" |

::: tip DefaultAzureCredential
`DefaultAzureCredential()` from the Azure Identity SDK tries authentication sources in order: environment variables → managed identity → Visual Studio → CLI → browser. In production, use **Managed Identity** so no credentials are stored in code.
:::

### Key Storage

- Store subscription keys in **Azure Key Vault** — never hardcode in source code or config files.
- Use the Key Vault SDK to retrieve keys at runtime.

### Network Security

| Control | Purpose |
|---------|---------|
| **Private Endpoints** | Access services over private IP (no public internet) |
| **Firewall / IP Rules** | Restrict to specific IP ranges or VNETs |
| **VNet Integration** | Services communicate over private network |

### RBAC Roles (Common Exam Roles)

| Role | Permissions |
|------|------------|
| Cognitive Services Contributor | Create and manage resources |
| Cognitive Services User | Call APIs, read keys |
| Cognitive Services OpenAI Contributor | Deploy and manage OpenAI models |
| AI Foundry Developer | Access Foundry projects, deploy models |

---

## 1.4 Implement Responsible AI and Content Safety

### Microsoft's 6 Responsible AI Principles

1. **Fairness** — mitigate bias in model outputs
2. **Reliability & Safety** — consistent performance, error handling
3. **Privacy & Security** — protect data throughout the AI lifecycle
4. **Inclusiveness** — accessible to all users
5. **Transparency** — explainable AI decisions
6. **Accountability** — human oversight of AI systems

### Azure AI Content Safety

A standalone service for moderating user-generated content:

| Category | Severity Levels |
|---------|----------------|
| Hate | Safe / Low / Medium / High |
| Self-Harm | Safe / Low / Medium / High |
| Violence | Safe / Low / Medium / High |
| Sexual | Safe / Low / Medium / High |

- **Blocklists**: Custom lists of terms to always reject regardless of category severity.

::: warning Content Safety vs Content Filters
**Azure AI Content Safety** = standalone service, used for moderating *user-generated content* in any application.
**Azure OpenAI Content Filters** = built into the OpenAI model deployment, applied to model *inputs and outputs*.

They are separate. The exam tests this — "user content moderation" → Content Safety. "Model output filtering" → OpenAI Content Filters.
:::

### Generative AI Safeguards

| Safeguard | Purpose |
|-----------|---------|
| **Prompt Shields** | Detects and blocks prompt injection attacks (users trying to override system instructions) |
| **Grounded responses** | RAG pattern ensures model answers from provided context, reducing hallucination |
| **Content Filters** | Applied to Azure OpenAI model inputs AND outputs |

---

## 1.5 Monitor and Troubleshoot

| Tool | Use Case |
|------|---------|
| **Azure Monitor / Diagnostic Settings** | Route logs to Log Analytics, Storage, or Event Hubs |
| **Alerts** | Fire on 429 (rate limit exceeded) or 5xx (server errors) |
| **Foundry Tracing** | Debug LLM call chains — see every step, tool call, and latency |
| **AI Foundry Metrics** | Track token usage, request counts, error rates |

---

<FlashcardDeck storage-key="ai-102-domain-1-cards" :cards="[
  { front: 'What is the difference between an AI Foundry Hub and a Project?', back: 'Hub = shared infrastructure (compute, connections, security) for multiple teams. Project = your workspace inside a Hub where you build and deploy AI solutions.' },
  { front: 'What authentication method should you use in production to avoid hardcoded keys?', back: 'Managed Identity with DefaultAzureCredential() — no credentials stored in code; identity is managed by Azure.' },
  { front: 'When does the exam want you to choose PTU over Standard deployment?', back: 'When the question mentions predictable latency, guaranteed throughput, or consistent performance under high volume. Standard has variable latency; PTU has reserved capacity.' },
  { front: 'What deployment option is correct for edge/offline/data residency scenarios?', back: 'Docker container deployment — runs AI services on-premises or at the edge. Requires connection to Azure only for billing metering.' },
  { front: 'Name Microsoft\'s 6 Responsible AI principles.', back: 'Fairness, Reliability & Safety, Privacy & Security, Inclusiveness, Transparency, Accountability.' },
  { front: 'What is the difference between Azure AI Content Safety and Azure OpenAI Content Filters?', back: 'Content Safety = standalone service for user-generated content moderation. OpenAI Content Filters = built into model deployments, applied to model inputs and outputs. They are separate services.' },
  { front: 'What does Prompt Shields protect against?', back: 'Prompt injection attacks — where users attempt to override system instructions or exfiltrate data through crafted prompts.' },
  { front: 'Where should subscription keys be stored in a production application?', back: 'Azure Key Vault — retrieved at runtime via the Key Vault SDK. Never hardcode keys in source code or configuration files.' }
]" />

---

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)
