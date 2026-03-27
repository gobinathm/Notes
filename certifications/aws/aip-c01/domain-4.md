---
title: "AIP-C01 - Domain 4: Operational Efficiency and Optimization"
description: "AIP-C01 Domain 4 study notes: Provisioned Throughput, token efficiency, cost optimization, and batch inference on Amazon Bedrock"
head:
  - - meta
    - name: keywords
      content: aip-c01, domain 4, provisioned throughput, token efficiency, cost optimization, batch inference, on-demand, model units, bedrock, operational efficiency
---

# Domain 4: Operational Efficiency and Optimization (12%)

[← Domain 3](./domain-3.md) · [Next: Domain 5 →](./domain-5.md)

::: tip Exam Tip
This is the smallest domain (12%) but the questions are direct. Know the Provisioned Throughput vs. On-Demand trade-off cold: PTU = predictable consistent traffic, On-Demand = sporadic. Don't choose PTU for development or unpredictable workloads. Know that streaming doesn't save money — it only improves perceived latency.
:::

---

## 4.1 Provisioned Throughput vs. On-Demand

### Comparison Table

| | Provisioned Throughput (PTU) | On-Demand |
|---|---|---|
| **Pricing model** | Fixed (per Model Unit per hour) | Pay per input/output token |
| **Commitment** | 1 month or 6 months | No commitment |
| **Traffic pattern** | Predictable, steady-state | Sporadic, variable |
| **Performance** | Guaranteed Model Units — no throttling | May throttle during peak demand |
| **Best for** | Production 24/7 applications | Development, testing, burst workloads |

### Model Units (MUs)

- Provisioned Throughput is measured in **Model Units (MUs)**
- Each MU provides a specific tokens-per-minute (TPM) capacity
- You purchase a fixed number of MUs for a 1-month or 6-month term
- Unused MUs are still billed — commitment cost applies regardless of usage

### When to Use Each

```text
Traffic is consistent and predictable (24/7)?
└─ Provisioned Throughput

Traffic is unpredictable, bursty, or for dev/test?
└─ On-Demand

High-volume, non-real-time batch jobs?
└─ Batch Inference
```

::: warning Exam Trap
**Do not choose PTU for sporadic or development workloads.** Even though PTU is cheaper per token at high volume, you pay for the full commitment period regardless of usage. On-Demand is correct for unpredictable or low-volume scenarios.

Also: PTU commits you for **1 month or 6 months** — the exam tests this commitment period detail.
:::

---

## 4.2 Token Efficiency & Cost Optimization

### Token Cost Drivers

1. **Input tokens**: The length of your prompt (system prompt + user message + retrieved context)
2. **Output tokens**: The length of the model's response
3. **Model choice**: Larger, more capable models cost more per token

### Optimization Techniques

| Technique | How It Helps |
|---|---|
| **Concise system prompts** | Shorter system prompts = fewer input tokens on every call |
| **Set `maxTokens` explicitly** | Caps output length — prevents runaway long responses |
| **Streaming** | Does NOT reduce cost — improves perceived latency only |
| **Smaller model for simple tasks** | Use Claude Haiku instead of Sonnet for tasks that don't need full reasoning |
| **Truncate conversation history** | Only include recent relevant turns, not the full history |
| **Reduce top-K in RAG** | Fewer retrieved chunks = shorter input context = lower cost |

::: tip
The exam distinguishes between techniques that reduce cost vs. improve latency. **Streaming improves perceived latency but does not reduce token count or cost.**
:::

### Inference Parameter Quality Controls

- **Low temperature** improves consistency for standardized outputs
- **Higher temperature** increases diversity for creative generation
- **Lower topP** keeps sampling tighter and more predictable
- **`maxTokens`** limits output size and cost
- **`stopSequences`** helps enforce cleaner output boundaries

**Best-fit examples:**
- Contracts, policy language, compliance wording → lower temperature
- Brainstorming, alternate copy, variant generation → higher temperature

### Semantic Caching

Semantic caching avoids FM invocations entirely for repeat questions by returning a cached response when a new question is semantically equivalent to one already answered.

**How it works:**

```text
Incoming question
    ↓ embed (Titan / Cohere)
Query vector cache (ElastiCache Redis)
    ↓ cosine similarity check
Similarity ≥ threshold?
    ├─ Yes → return cached response (no FM call, zero token cost)
    └─ No  → invoke FM → cache response + embedding → return
```

**Key characteristics:**
- Uses **embeddings + cosine similarity** (or other distance metrics) against a configurable threshold
- **ElastiCache (Redis)** is the AWS service for storing and querying the vector embeddings
- Handles paraphrased questions that are textually different but semantically identical — e.g., *"What is your return policy?"* vs *"How do returns work?"*

::: warning Semantic Caching vs. Prompt Caching
These are two different techniques — the exam may use them as distractors:

| | Semantic Caching | Prompt Caching |
|---|---|---|
| **What is cached** | Full FM response, keyed by embedding similarity | Static system prompt portion |
| **Where** | External — ElastiCache (Redis) + vector search | Bedrock native feature |
| **Bypasses FM?** | Yes — cache hit skips the FM entirely | No — FM still invoked, but reuses cached prompt context |
| **Best for** | Repeat or paraphrased user questions | Large, stable system prompts reused across many calls |
:::

---

## 4.3 Batch Inference

### What Is Batch Inference?

Batch inference allows you to submit a **large dataset of prompts** at once and receive all responses asynchronously — at a lower cost than on-demand inference.

**Key characteristics:**
- Jobs submitted to a queue and processed asynchronously
- Input: S3 object (JSONL file with prompts)
- Output: S3 object (JSONL file with responses)
- Not real-time — not suitable for interactive or latency-sensitive workloads

### When to Use Batch Inference

- Running nightly analysis on thousands of customer reviews
- Generating product descriptions in bulk
- Processing a large document corpus for classification or summarization
- Any high-volume, non-time-sensitive workload

### Cost Advantage

Batch inference is typically **~50% cheaper** per token compared to on-demand pricing (varies by model) — making it the most cost-effective option for non-urgent, high-volume jobs.

### Batch Inference Hard Constraints

- **Input/output format**: S3 JSONL only — no other formats accepted
- **Not real-time**: jobs are queued and processed asynchronously; never use for interactive workloads
- **Custom models require Provisioned Throughput**: you cannot run batch inference on a custom fine-tuned model without first purchasing PTU

---

## 4.4 Monitoring Operational Metrics

### CloudWatch Metrics for Bedrock

| Metric | What It Measures |
|---|---|
| **InvocationLatency** | End-to-end latency of model calls |
| **InputTokenCount** | Number of input tokens consumed |
| **OutputTokenCount** | Number of output tokens generated |
| **InvocationClientErrors** | 4xx errors |
| **InvocationServerErrors** | 5xx errors |
| **ThrottledRequests** | Requests throttled due to exceeding on-demand TPS limit |

**How to use these on the exam:**
- **CloudWatch dashboards** help visualize token consumption and latency trends over time
- **CloudWatch Alarms** are the right answer when you need notifications for high token usage, error spikes, or throttling
- Token metrics can be used for **usage analysis**, **cost forecasting**, and identifying unusually expensive prompt patterns
- Questions may describe this as monitoring usage "by model" or over time; think **CloudWatch metrics + dashboards**

### Responding to ThrottlingException

When you receive a `ThrottlingException`:
- **Short-term**: Implement exponential backoff and retry
- **Long-term**: Switch to **Provisioned Throughput**

---

[← Domain 3](./domain-3.md) · [Next: Domain 5 →](./domain-5.md)
