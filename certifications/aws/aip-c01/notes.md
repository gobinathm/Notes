---
title: "AIP-C01 - Study Notes"
description: "Comprehensive study notes for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, study notes, bedrock, generative ai, rag, agentic ai, guardrails, opensearch, foundation model
---

# AIP-C01: Study Notes

[← Back to Overview](./index.md)

::: tip Study Strategy
These notes cover all exam domains comprehensively. Use the [Quick Refresher](./quick-refresher.md) for last-minute review. Domain 1 has dedicated notes at [Domain 1 →](./domain-1.md).
:::

---

## Domain 1: FM Integration, Data Management, and Compliance (~31%)

See dedicated notes: **[Domain 1: FM Integration & Data Management →](./domain-1.md)**

---

## Domain 2: Implementation and Integration (~26%)

### 2.1 Agentic AI & Bedrock Agents

**Overview:**
Amazon Bedrock Agents enable multi-step reasoning workflows by orchestrating FM calls, API actions, and knowledge base retrievals.

**Key Concepts:**

1. **Action Groups**
   - Definition: Lambda functions that Agents can invoke to interact with external systems
   - Use case: Querying a database, calling a REST API, writing to S3
   - Example: An HR Agent calls a Lambda to fetch employee leave balance

2. **Knowledge Base Integration**
   - Definition: RAG pipeline attached to an Agent to retrieve relevant context
   - Use case: Document Q&A, policy lookup, customer support
   - Example: Agent retrieves relevant docs from OpenSearch before answering

3. **Orchestration Trace**
   - Definition: Step-by-step trace of Agent reasoning and tool calls
   - Use case: Debugging agentic behavior
   - Example: `enableTrace: true` in InvokeAgent API call

---

### 2.2 RAG Architecture & Chunking Strategies

**Overview:**
Retrieval-Augmented Generation combines FM inference with context retrieval from a vector store to ground responses in real data.

**Chunking Strategies:**

| Strategy | Description | Best For |
|----------|-------------|----------|
| **Fixed-size** | Split by token count (e.g., 300 tokens) | Simple docs, consistent structure |
| **Semantic** | Split by topic/meaning | Long-form content, varied structure |
| **Hierarchical** | Parent + child chunk structure | Complex docs with sections |

**When to Use:**
- Use **Fixed-size** when: documents have uniform structure
- Use **Semantic** when: documents vary widely in structure
- Use **Hierarchical** when: you need both broad context and fine-grained retrieval

---

### 2.3 API Integration Patterns

**Decision Tree:**

```
Which Bedrock API to call?
├─ Need a complete, synchronous response? → InvokeModel
├─ Need streaming / low-latency UX? → InvokeModelWithResponseStream
└─ Multi-step agentic workflow? → InvokeAgent
```

---

## Domain 3: AI Safety, Security, and Governance (~20%)

### 3.1 Guardrails for Amazon Bedrock

**Overview:**
Guardrails apply content filters and safety controls to both inputs (prompts) and outputs (responses) from foundation models.

**Step-by-Step: Creating a Guardrail**

1. **Define Content Filters**
   - What: Configure sensitivity levels for harmful categories (hate, violence, sexual, insults)
   - Why: Prevent inappropriate content from being generated or passed through

2. **Configure PII Redaction**
   - What: Detect and mask/block PII (names, emails, SSNs, credit cards)
   - Why: Compliance with data privacy regulations

3. **Set Denied Topics**
   - What: Specify topics the FM should refuse to discuss (e.g., competitor products)
   - Why: Business policy enforcement

4. **Apply to Inference**
   - What: Pass `guardrailIdentifier` and `guardrailVersion` in API calls
   - Why: Guardrails are only active when explicitly applied

---

### 3.2 IAM & VPC Security

**Service/Tool Comparison:**

| Method | Primary Use | Key Feature | When to Use |
|--------|-------------|-------------|-------------|
| **IAM Policies** | Access control | Least-privilege resource access | Always — required baseline |
| **VPC Endpoints (PrivateLink)** | Private connectivity | No public internet routing | Compliance, data residency |
| **Resource Policies** | Cross-account access | Bedrock model access from other accounts | Multi-account architectures |

---

## Domain 4: Operational Efficiency and Optimization (~12%)

### 4.1 Cost Optimization Strategies

**Provisioned Throughput vs On-Demand:**

✅ **Use Provisioned Throughput when:**
- Traffic is predictable and consistent
- You need guaranteed model units (MUs) available
- Running 24/7 workloads where PTU commitment is cheaper than on-demand

❌ **Avoid Provisioned Throughput when:**
- Traffic is sporadic or unpredictable
- Testing or development workloads
- Short-lived experiments

**Token Efficiency Best Practices:**
- ✅ DO: Keep system prompts concise — every token costs money
- ✅ DO: Use streaming to improve perceived latency without changing cost
- ✅ DO: Set `maxTokens` explicitly to prevent runaway responses
- ❌ DON'T: Repeat the full conversation history when only recent context is needed

---

### 4.2 Monitoring & Troubleshooting

**Common Issues:**

| Issue | Cause | Solution |
|-------|-------|----------|
| ThrottlingException | Exceeded on-demand TPS | Switch to Provisioned Throughput or reduce request rate |
| High latency | Synchronous InvokeModel | Switch to InvokeModelWithResponseStream |
| Poor RAG retrieval | Low relevance scores | Tune chunking strategy or embedding model |
| Guardrail blocking valid content | Filter sensitivity too high | Reduce filter strength or update denied topics |

---

## Quick Reference

### Key Acronyms

| Acronym | Full Form | Meaning |
|---------|-----------|---------|
| **FM** | Foundation Model | Large pre-trained AI model (Claude, Llama, Titan, etc.) |
| **RAG** | Retrieval-Augmented Generation | FM + context retrieval from a vector store |
| **PTU** | Provisioned Throughput Unit | Reserved model capacity for predictable performance |
| **PII** | Personally Identifiable Information | Data that can identify an individual |
| **MU** | Model Unit | Unit of Bedrock Provisioned Throughput |

### Important Bedrock Limits & Notes

| Resource | Key Detail |
|----------|------------|
| Claude context window | Up to 200k tokens |
| PTU commitment period | 1 month or 6 months |
| OpenSearch Serverless vector dimensions | Up to 16,000 dimensions |
| Bedrock Knowledge Base chunk size | Configurable (default ~300 tokens) |

---

[← Back to Overview](./index.md) | [Quick Refresher →](./quick-refresher.md) | [Exam Tips →](./exam-tips.md)
