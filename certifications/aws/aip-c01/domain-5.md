---
title: "AIP-C01 - Domain 5: Testing, Validation, and Troubleshooting"
description: "AIP-C01 Domain 5 study notes: Model evaluation metrics, human evaluation, CloudWatch monitoring, and troubleshooting GenAI applications on Amazon Bedrock"
head:
  - - meta
    - name: keywords
      content: aip-c01, domain 5, model evaluation, groundedness, accuracy, relevance, fluency, cloudwatch, cloudtrail, troubleshooting, hallucination, bedrock
---

# Domain 5: Testing, Validation, and Troubleshooting (11%)

[← Domain 4](./domain-4.md) · [← Back to Overview](./index.md)

::: tip Exam Tip
This domain is 11% of the exam. Know the four automated evaluation metrics cold — especially **Groundedness** (detects hallucinations in RAG). Know when human evaluation is required vs. automated, and always remember: CloudWatch = operational metrics, CloudTrail = audit trail.
:::

---

## 5.1 Model Evaluation

### What Is Model Evaluation in Bedrock?

Amazon Bedrock includes a built-in **Model Evaluation** feature that lets you evaluate and compare FM performance using standardized metrics — both automated and human-based.

### Automated Evaluation Metrics

| Metric | What It Measures | RAG-Specific? |
|---|---|---|
| **Groundedness** | Is the response factually supported by the retrieved context? | Yes — detects hallucinations |
| **Relevance** | Does the response actually answer the user's question? | No |
| **Accuracy** | Is the factual content of the response correct? | No |
| **Fluency** | Is the response natural, readable, and well-written? | No |
| **Robustness** | Does the model perform consistently across varied prompt phrasings? | No |

::: tip Key Distinction
**Groundedness** is the most RAG-specific metric — it checks whether the model's answer is supported by the retrieved documents, not invented. A low Groundedness score = the model is hallucinating (generating information not in the retrieved context).
:::

### Automated vs. Human Evaluation

| | Automated Evaluation | Human Evaluation |
|---|---|---|
| **How** | Algorithm-scored using metrics or automated judges | Real humans rate responses |
| **Speed** | Fast, scalable | Slow, expensive |
| **Best for** | Regression testing, large dataset comparisons | Subjective quality, tone, nuance |

**Use human evaluation when:**
- Evaluating subjective qualities (tone, brand voice, empathy)
- Validating safety content decisions that require human judgment
- Ground truth labels are unavailable or difficult to define algorithmically

---

## 5.2 Setting Up a Model Evaluation Job

### Steps

1. **Select models**: Choose one or more FM models or fine-tuned variants to compare
2. **Provide a dataset**: Upload a prompt dataset to S3 (JSONL format)
3. **Select metrics**: Choose which automated metrics to compute
4. **Run the job**: Bedrock runs each prompt against the selected models and scores each response
5. **Review results**: Compare metric scores across models in the Bedrock console

### Prompt Dataset Format

- Stored in **Amazon S3** as a JSONL file
- Each line contains a prompt (and optionally a reference/expected answer for accuracy scoring)
- Example line: `{"prompt": "What is the capital of France?", "referenceResponse": "Paris"}`

---

## 5.3 CloudWatch Monitoring

### Key Bedrock CloudWatch Metrics

| Metric | Description |
|---|---|
| `InvocationLatency` | P50/P90/P99 latency for model calls (end-to-end) |
| `InputTokenCount` | Total input tokens consumed in the period |
| `OutputTokenCount` | Total output tokens generated in the period |
| `ThrottledRequests` | Count of requests throttled (on-demand TPS exceeded) |
| `InvocationClientErrors` | 4xx errors (bad request format, invalid model ID) |
| `InvocationServerErrors` | 5xx errors (Bedrock service-side failures) |

### Setting Up CloudWatch Alarms

Use CloudWatch Alarms to proactively catch issues:
- `ThrottledRequests > 0` → Consider switching to Provisioned Throughput
- `InvocationLatency > [threshold]` → Investigate prompt length or model choice
- `InvocationServerErrors > 0` → Investigate Bedrock service health or retry configuration

---

## 5.4 Troubleshooting Common Issues

### Problem → Cause → Solution

| Problem | Likely Cause | Solution |
|---|---|---|
| `ThrottlingException` | Exceeded on-demand TPS limit | Implement exponential backoff; use Provisioned Throughput |
| High latency | Long prompts or large retrieved context | Reduce input tokens; use streaming for UX improvement |
| Poor RAG answer quality | Wrong chunks returned (low retrieval relevance) | Tune chunking strategy, adjust top-K, improve embedding model |
| Guardrail blocking valid content | Content filter sensitivity too high | Lower filter strength; review denied topics configuration |
| Hallucinated response | FM ignoring retrieved context | Strengthen system prompt to emphasize context use; reduce temperature; check Groundedness metric |
| Agent not calling the right action | Action Group schema unclear or description imprecise | Improve OpenAPI schema descriptions; ensure action names are unambiguous |
| High cost | Verbose system prompts or large top-K retrieval | Shorten system prompt; reduce top-K; set `maxTokens`; use a smaller model |

---

## 5.5 Debugging Bedrock Agents

### Using the Orchestration Trace

Enable `enableTrace: true` in `InvokeAgent` to inspect:
- The Agent's step-by-step reasoning
- Which Action Group it decided to call and why
- What Knowledge Base query it ran
- The final synthesis of results

### Common Agent Issues

- **Agent loops**: Agent calls tools repeatedly without progressing → improve action descriptions and add clearer stopping conditions
- **Wrong action called**: Agent misidentifies the right tool → improve the Action Group's name and description in the OpenAPI schema
- **Knowledge Base returns irrelevant chunks**: Poor chunking or embedding quality → re-index with a better chunking strategy or embedding model

---

<FlashcardDeck
  storage-key="aip-c01-d5-cards"
  :cards="[
    {
      question: 'Which model evaluation metric detects hallucinations in a RAG application?',
      answer: '<strong>Groundedness</strong> — it measures whether the model\'s response is supported by the retrieved context. A low Groundedness score means the model is generating information not found in the knowledge base (hallucinating).'
    },
    {
      question: 'When should you use human evaluation instead of automated evaluation?',
      answer: 'Use <strong>human evaluation</strong> when evaluating subjective qualities (tone, empathy, brand voice) or when algorithmic metrics cannot capture the required nuance. Use automated evaluation for large-scale regression testing and objective metric-based comparisons.'
    },
    {
      question: 'What CloudWatch metric tells you that Bedrock is throttling your requests?',
      answer: '<strong>ThrottledRequests</strong> — a non-zero count indicates your on-demand request rate is exceeding the TPS limit. Short-term: implement exponential backoff. Long-term: switch to Provisioned Throughput.'
    },
    {
      question: 'How do you debug unexpected behavior in a Bedrock Agent?',
      answer: 'Enable <strong>enableTrace: true</strong> in the InvokeAgent API call. The Orchestration Trace shows the Agent\'s step-by-step reasoning, which tools it called, what Knowledge Base queries it ran, and why each decision was made.'
    },
    {
      question: 'A RAG application returns hallucinated answers despite having a Knowledge Base. What is the most likely cause and fix?',
      answer: 'The FM is ignoring the retrieved context and generating its own answer. Fix by: (1) strengthening the system prompt to explicitly instruct the model to use only the provided context, (2) reducing temperature for more deterministic responses, and (3) reviewing the <strong>Groundedness</strong> metric in Model Evaluation to quantify the problem.'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [← Back to Overview](./index.md)
