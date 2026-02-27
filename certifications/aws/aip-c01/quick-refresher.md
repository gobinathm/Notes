---
title: "AIP-C01 - Quick Refresher"
description: "Last-minute cram session for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, quick refresher, last minute, bedrock, generative ai, rag, guardrails, provisioned throughput, opensearch
---

# AIP-C01: AWS Generative AI Developer Last-Minute Refresher

[← Back to Overview](./index.md)

::: danger Final Review
This page is designed for the final "cram" session before stepping into the **AIP-C01** exam.
:::

---

## Domain 1: FM Integration, Data Management, and Compliance (~31%)

### FM Selection Quick Guide

| FM | Vendor | Best For |
|----|--------|----------|
| **Claude** | Anthropic | Reasoning, large context (up to 200k tokens) |
| **Llama** | Meta | Open-source, fine-tuning |
| **Mistral** | Mistral AI | Efficient, high performance for size |
| **Titan** | AWS | Embeddings, summarization, AWS-native |

### RAG Pipeline

**Important Points:**
- S3 → chunking → embedding → OpenSearch Serverless (vector store)
- Knowledge Bases manage this pipeline fully managed
- pgvector on Aurora PostgreSQL = alternative vector store
- Chunking options: fixed-size, semantic, hierarchical

---

## Domain 2: Implementation and Integration (~26%)

### API Quick Reference

```
Which API?
├─ Full synchronous response → InvokeModel
├─ Streaming / low latency → InvokeModelWithResponseStream
└─ Multi-step agentic workflow → InvokeAgent
```

### Comparison Table

| Feature | Knowledge Base (RAG) | Bedrock Agents |
|---------|---------------------|----------------|
| **Use Case** | Document Q&A, retrieval | Multi-step workflows, tool use |
| **FM + Retrieval** | Yes (automatic) | Yes (optional) |
| **External API calls** | No | Yes (via Action Groups + Lambda) |
| **Best For** | Static knowledge lookup | Dynamic reasoning + actions |

---

## Domain 3: AI Safety, Security, and Governance (~20%)

### Guardrails Quick Facts

- Applies to **both inputs and outputs**
- Features: content filters, PII redaction, denied topics, word filters
- Must be explicitly applied via `guardrailIdentifier` in API calls
- Does NOT automatically apply to all Bedrock calls

### Security Decision Tree

```
Data must stay private / no public internet?
└─ Yes → VPC Endpoint (PrivateLink) for Bedrock

Need to restrict access to Bedrock models?
└─ Yes → IAM resource-based policies

Need to audit all FM API calls?
└─ Yes → AWS CloudTrail (not CloudWatch)

Need operational metrics (latency, errors)?
└─ Yes → Amazon CloudWatch
```

---

## Domain 4: Operational Efficiency and Optimization (~12%)

### Provisioned Throughput vs On-Demand

| | Provisioned Throughput | On-Demand |
|-|------------------------|-----------|
| **Traffic** | Predictable, consistent | Sporadic, unpredictable |
| **Pricing** | Fixed (per MU/hour) | Pay per token |
| **Commitment** | 1 or 6 months | None |
| **Best For** | Production 24/7 | Dev/test, bursts |

---

## Domain 5: Testing, Validation, and Troubleshooting (~11%)

### Model Evaluation Metrics

| Metric | What It Measures |
|--------|-----------------|
| **Groundedness** | Is the response grounded in the retrieved context? |
| **Relevance** | Is the response relevant to the user's question? |
| **Accuracy** | Is the response factually correct? |
| **Fluency** | Is the response well-written and natural? |

---

## Key Service Decision Rules

**Question asks about...**
- "Predictable throughput" → Provisioned Throughput
- "Content moderation / filter" → Guardrails for Amazon Bedrock
- "PII detection/redaction" → Guardrails (PII filter)
- "Vector storage for RAG" → OpenSearch Serverless (or Aurora pgvector)
- "Multi-step reasoning / tool use" → Bedrock Agents
- "Audit logging / compliance trail" → AWS CloudTrail
- "Operational monitoring / dashboards" → Amazon CloudWatch
- "Private FM access, no internet" → VPC Endpoint (PrivateLink)
- "Low latency / streaming response" → InvokeModelWithResponseStream

---

## Key Acronyms

| Acronym | Full Form | Quick Definition |
|---------|-----------|-----------------|
| **FM** | Foundation Model | Pre-trained large AI model (Claude, Llama, etc.) |
| **RAG** | Retrieval-Augmented Generation | FM + vector store retrieval |
| **PTU** | Provisioned Throughput Unit | Reserved Bedrock model capacity |
| **PII** | Personally Identifiable Information | Data that identifies an individual |
| **MU** | Model Unit | Unit of Bedrock Provisioned Throughput |

---

## Common Exam Traps

::: warning Watch Out!
- **InvokeModel vs Streaming**: InvokeModel = full synchronous; `InvokeModelWithResponseStream` = chunk-by-chunk
- **Guardrails scope**: Guardrails filter BOTH inputs AND outputs — not just one
- **CloudTrail vs CloudWatch**: CloudTrail = audit/compliance; CloudWatch = operational metrics
- **OpenSearch Serverless**: The go-to for Knowledge Bases — not standard OpenSearch managed cluster
- **PTU timing**: On-demand is better for sporadic traffic — don't default to PTU
:::

---

## Last 5 Minutes Before Exam

### Must Remember

1. **Guardrails** — apply to both inputs AND outputs; must be explicitly applied per call
2. **PTU** — predictable traffic only; 1- or 6-month commitment
3. **RAG vector store** — OpenSearch Serverless (primary), pgvector on Aurora (alternative)
4. **InvokeModelWithResponseStream** — for low-latency streaming UX
5. **CloudTrail** — required for compliance/audit; CloudWatch for ops monitoring

### Quick Mental Check

- Can you explain the difference between RAG and fine-tuning? ✓
- Do you know when to use InvokeModel vs InvokeModelWithResponseStream? ✓
- Can you describe what Guardrails filters cover? ✓
- Do you understand when PTU is preferred over on-demand? ✓
- Can you pick the right vector store for a Knowledge Base? ✓

---

::: tip You've Got This!
Take a deep breath. Review the decision trees. Trust your preparation. **Good luck!**
:::

[← Back to Overview](./index.md) | [Study Notes](./notes.md) | [Exam Tips](./exam-tips.md)
