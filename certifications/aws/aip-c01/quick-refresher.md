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

## Domain 1: FM Integration, Data Management, and Compliance (~31%)

### FM Selection Quick Guide

| FM | Vendor | Best For |
|----|--------|----------|
| **Claude** | Anthropic | Reasoning, large context (up to 200k tokens) |
| **Llama** | Meta | Open-source, fine-tuning |
| **Mistral** | Mistral AI | Efficient, high performance for size |
| **Titan** | AWS | Embeddings, summarization, AWS-native |

### RAG Pipeline

- S3 → chunking → embedding → OpenSearch Serverless
- Knowledge Bases manage this pipeline fully managed
- pgvector on Aurora PostgreSQL = alternative vector store
- Chunking options: fixed-size, semantic, hierarchical

## Domain 2: Implementation and Integration (~26%)

### API Quick Reference

```text
Which API?
├─ Full synchronous response → InvokeModel
├─ Streaming / low latency → InvokeModelWithResponseStream
└─ Multi-step agentic workflow → InvokeAgent
```

### Comparison Table

| Feature | Knowledge Base (RAG) | Bedrock Agents |
|---------|---------------------|----------------|
| **Use Case** | Document Q&A, retrieval | Multi-step workflows, tool use |
| **FM + Retrieval** | Yes | Yes (optional) |
| **External API calls** | No | Yes |
| **Best For** | Static knowledge lookup | Dynamic reasoning + actions |

## Domain 3: AI Safety, Security, and Governance (~20%)

### Guardrails Quick Facts

- Applies to **both inputs and outputs**
- Features: content filters, PII redaction, denied topics, word filters
- Must be explicitly applied via `guardrailIdentifier` in API calls
- Does NOT automatically apply to all Bedrock calls

## Domain 4: Operational Efficiency and Optimization (~12%)

### Provisioned Throughput vs On-Demand

| | Provisioned Throughput | On-Demand |
|-|------------------------|-----------|
| **Traffic** | Predictable, consistent | Sporadic, unpredictable |
| **Pricing** | Fixed (per MU/hour) | Pay per token |
| **Commitment** | 1 or 6 months | None |
| **Best For** | Production 24/7 | Dev/test, bursts |

## Domain 5: Testing, Validation, and Troubleshooting (~11%)

### Model Evaluation Metrics

| Metric | What It Measures |
|--------|-----------------|
| **Groundedness** | Is the response grounded in the retrieved context? |
| **Relevance** | Is the response relevant to the user's question? |
| **Accuracy** | Is the response factually correct? |
| **Fluency** | Is the response well-written and natural? |

## Key Service Decision Rules

- "Predictable throughput" → Provisioned Throughput
- "Content moderation / filter" → Guardrails for Amazon Bedrock
- "PII detection/redaction" → Guardrails
- "Vector storage for RAG" → OpenSearch Serverless (or Aurora pgvector)
- "Multi-step reasoning / tool use" → Bedrock Agents
- "Audit logging / compliance trail" → AWS CloudTrail
- "Operational monitoring / dashboards" → Amazon CloudWatch
- "Private FM access, no internet" → VPC Endpoint (PrivateLink)
- "Low latency / streaming response" → InvokeModelWithResponseStream

## Common Exam Traps

::: warning Watch Out!
- `InvokeModel` = full synchronous; `InvokeModelWithResponseStream` = chunk-by-chunk
- Guardrails filter BOTH inputs AND outputs
- CloudTrail = audit/compliance; CloudWatch = operational metrics
- OpenSearch Serverless is the go-to for Knowledge Bases
- On-demand is better for sporadic traffic — don't default to PTU
:::

---

[← Back to Overview](./index.md) | [Exam Tips](./exam-tips.md)
