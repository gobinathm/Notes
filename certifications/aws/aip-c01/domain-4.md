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

```
Traffic is consistent and predictable (24/7)?
└─ Provisioned Throughput (guaranteed throughput, lower per-token cost at scale)

Traffic is unpredictable, bursty, or for dev/test?
└─ On-Demand (no commitment risk, pay only for what you use)

High-volume, non-real-time batch jobs?
└─ Batch Inference (see 4.3)
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
The exam distinguishes between techniques that reduce cost vs. improve latency. **Streaming improves perceived latency but does not reduce token count or cost.** Cost optimization is exclusively about reducing input and output tokens.
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

---

## 4.4 Monitoring Operational Metrics

### CloudWatch Metrics for Bedrock

| Metric | What It Measures |
|---|---|
| **InvocationLatency** | End-to-end latency of model calls |
| **InputTokenCount** | Number of input tokens consumed |
| **OutputTokenCount** | Number of output tokens generated |
| **InvocationClientErrors** | 4xx errors (bad requests — client-side issues) |
| **InvocationServerErrors** | 5xx errors (Bedrock service errors) |
| **ThrottledRequests** | Requests throttled due to exceeding on-demand TPS limit |

### Responding to ThrottlingException

When you receive a `ThrottlingException`:
- **Short-term**: Implement exponential backoff and retry
- **Long-term**: Switch to **Provisioned Throughput** for guaranteed Model Units and no throttling

---

<FlashcardDeck
  storage-key="aip-c01-d4-cards"
  :cards="[
    {
      question: 'When should you use Provisioned Throughput instead of On-Demand?',
      answer: 'Use <strong>Provisioned Throughput</strong> when your application has predictable, consistent, high-volume traffic running 24/7. Avoid it for development, testing, or unpredictable workloads — you pay the full commitment cost regardless of actual usage.'
    },
    {
      question: 'What are the two PTU commitment period options?',
      answer: '<strong>1 month or 6 months.</strong> Both require upfront commitment to a fixed number of Model Units (MUs). Unused capacity is still billed.'
    },
    {
      question: 'Does streaming (InvokeModelWithResponseStream) reduce the cost of a Bedrock call?',
      answer: '<strong>No.</strong> Streaming does not reduce the number of tokens processed — cost is identical to InvokeModel. Streaming improves perceived latency by delivering the response progressively, not by reducing token usage.'
    },
    {
      question: 'What is the most cost-effective option for processing 10,000 non-urgent prompts?',
      answer: '<strong>Batch Inference</strong> — submit all prompts as a JSONL file to S3, process asynchronously, and receive results in S3. Batch inference is approximately 50% cheaper per token than on-demand for high-volume, non-real-time jobs.'
    },
    {
      question: 'How do you prevent runaway expensive responses in Bedrock?',
      answer: 'Set <strong>maxTokens</strong> explicitly in every API call. This caps the maximum number of output tokens the model will generate, controlling both response length and cost.'
    },
    {
      question: 'You receive ThrottlingExceptions on Bedrock. What is the long-term solution?',
      answer: 'Switch to <strong>Provisioned Throughput (PTU)</strong> — it provides guaranteed Model Units with no throttling. Short-term: implement exponential backoff and retry. PTU is appropriate only if traffic is predictable and consistent enough to justify the commitment.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Next: Domain 5 →](./domain-5.md)
