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
**Groundedness** is the most RAG-specific metric — it checks whether the model's answer is supported by the retrieved documents, not invented.
:::

### Hallucination Detection Techniques

Hallucination detection compares generated content against retrieved source documents to verify claims are grounded in source material:

| Technique | How It Works |
|---|---|
| **Semantic similarity scoring** | Embed both the generated claim and the source chunks — high cosine similarity = grounded |
| **Fact verification** | Use the FM itself to check: "Does this source document support this specific statement?" |
| **Confidence scoring** | Score the model's certainty for each generated statement; flag low-confidence claims for review |
| **Guardrails Contextual Grounding Check** | Bedrock-native — automatically blocks responses that are not supported by retrieved context |

### Knowledge Base Citations

When using **Amazon Bedrock Knowledge Bases**, the retrieve-and-generate response includes **citation metadata** — references to the specific source documents and chunks that supported each part of the answer.

- Citations show *which S3 object* and *which chunk* backed each claim
- Enables downstream validation: compare the response against cited sources to verify grounding
- If a statement has no citation, it may be hallucinated

::: tip
Knowledge Base citations are the native Bedrock mechanism for source attribution. Surfacing citations to end users also builds trust — they can click through to the original document.
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

### LLM-as-a-Judge

An **LLM-as-a-Judge** pattern uses one model to evaluate the quality of another model's response against a rubric.

**Typical use:**
- Score answers for relevance, helpfulness, or rubric compliance
- Compare multiple candidate responses at scale
- Support regression testing when manual review is too slow

::: warning
LLM-as-a-Judge is useful for scalable evaluation, but it is still an **automated evaluation technique**, not a substitute for human review in subjective or high-stakes cases.
:::

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

### Evaluation Workflow Patterns

When a company wants to replace a production model with a new one, the evaluation process should be treated as a **gated workflow**, not an ad hoc test run.

**Typical sequence:**
1. **Define evaluation metrics** such as relevance, accuracy, fluency, and groundedness
2. **Create a test dataset** with realistic scenarios, difficult prompts, and edge cases
3. **Run controlled comparisons** between candidate models using the same dataset
4. **Apply quality gates** so weak results do not progress to the next stage
5. **Analyze results and produce a decision report** before promotion to production

**Important exam ideas:**
- Do not compare models before defining the metrics and dataset
- A high-quality evaluation dataset should include **diverse scenarios and edge cases**
- **A/B testing** is a valid comparison pattern when you need to compare a new model against an existing production model
- **AWS Step Functions** is a strong answer when the workflow requires sequential stages, approvals, branching, retries, and state tracking between evaluation steps

::: tip
If the question emphasizes **sequential validation**, **approval gates**, or **promotion only after passing review**, think in terms of a **workflow orchestration pattern** rather than a single evaluation job.
:::

---

## 5.3 CloudWatch Monitoring

### Key Bedrock CloudWatch Metrics

| Metric | Description |
|---|---|
| `InvocationLatency` | P50/P90/P99 latency for model calls (end-to-end) |
| `InputTokenCount` | Total input tokens consumed in the period |
| `OutputTokenCount` | Total output tokens generated in the period |
| `ThrottledRequests` | Count of requests throttled |
| `InvocationClientErrors` | 4xx errors |
| `InvocationServerErrors` | 5xx errors |

### Setting Up CloudWatch Alarms

Use CloudWatch Alarms to proactively catch issues:
- `ThrottledRequests > 0` → Consider switching to Provisioned Throughput
- `InvocationLatency > [threshold]` → Investigate prompt length or model choice
- `InvocationServerErrors > 0` → Investigate Bedrock service health or retry configuration

---

## 5.4 Troubleshooting Common Issues

| Problem | Likely Cause | Solution |
|---|---|---|
| `ThrottlingException` | Exceeded on-demand TPS limit | Implement exponential backoff; use Provisioned Throughput |
| High latency | Long prompts or large retrieved context | Reduce input tokens; use streaming for UX improvement |
| Poor RAG answer quality | Wrong chunks returned | Tune chunking strategy, adjust top-K, improve embedding model |
| Guardrail blocking valid content | Filter sensitivity too high | Lower filter strength; review denied topics configuration |
| Hallucinated response | FM ignoring retrieved context | Strengthen system prompt; reduce temperature; check Groundedness |
| Agent not calling the right action | Schema unclear | Improve OpenAPI descriptions |
| High cost | Verbose prompts or large top-K retrieval | Shorten prompt; reduce top-K; set `maxTokens`; use a smaller model |

---

## 5.5 Debugging Bedrock Agents

### Using the Orchestration Trace

Enable `enableTrace: true` in `InvokeAgent` to inspect:
- The Agent's step-by-step reasoning
- Which Action Group it decided to call and why
- What Knowledge Base query it ran
- The final synthesis of results

### AWS X-Ray for Distributed Tracing

Use **AWS X-Ray** when the problem is tracing a request across multiple services in a GenAI application stack.

**Good fit:**
- API Gateway → Lambda → Bedrock
- Lambda → external APIs → Bedrock
- Multi-service workflows where latency attribution matters

**How to think about it:**
- **CloudWatch** = metrics, logs, alarms
- **X-Ray** = end-to-end request tracing across services

### Common Agent Issues

- **Agent loops**: improve action descriptions and stopping conditions
- **Wrong action called**: improve Action Group names and descriptions
- **Knowledge Base returns irrelevant chunks**: re-index with better chunking or embeddings

---

## 5.6 Deployment Validation and Quality Gates

Testing GenAI applications means validating model quality, prompt behavior, retrieval, safety, latency, and rollout risk before production traffic shifts.

### LLM Unit Tests

LLM unit tests check whether a prompt or workflow still satisfies expected behavior.

| Test Type | Example |
|---|---|
| Format test | Response must be valid JSON with required fields |
| Refusal test | Model must refuse disallowed advice |
| Grounding test | Answer must cite retrieved source chunks |
| Regression test | Known prompts should not degrade after prompt/model update |
| Safety test | Prompt injection should not override system instructions |

::: tip
LLM tests are usually probabilistic. Use rubrics, thresholds, deterministic settings where possible, and human review for high-risk failures.
:::

### Canary and Shadow Deployment

| Rollout Pattern | How It Works | Best For |
|---|---|---|
| Canary deployment | Send a small percentage of real traffic to the new version | Controlled production rollout |
| Shadow mode | Send copied traffic to new model without returning its answer to users | Risk-free comparison |
| Blue/green | Switch between full old and new environments | Fast rollback |
| A/B test | Split users between variants and compare metrics | Product or quality comparison |

**Evaluation gate pattern:**

```text
Deploy candidate version
    ↓
Run synthetic tests and offline evaluation
    ↓
Shift small canary traffic
    ↓
Monitor quality, safety, latency, and cost
    ↓
Promote, pause, or roll back
```

::: tip Exam Scenario
If the scenario asks to validate a model with production-like inputs **without affecting users**, choose **shadow mode**. If it asks for gradual real-user rollout, choose **canary**.
:::

### Comprehensive Reporting

Evaluation reports should include:
- Dataset version and prompt/model version
- Relevance, accuracy, groundedness, fluency, and safety scores
- Latency and token-cost metrics
- Failure examples and root-cause categories
- Promotion recommendation and rollback criteria

---

## 5.7 Retrieval and Prompt Troubleshooting

When a RAG answer is bad, first isolate whether the failure is retrieval, prompt construction, or model generation.

### Retrieval Quality Testing

| Symptom | Likely Cause | Diagnostic |
|---|---|---|
| Relevant source is not retrieved | Low recall | Increase candidate set, inspect chunking, verify embeddings |
| Irrelevant chunks dominate | Low precision | Add metadata filters, rerank, reduce top-K |
| Good chunks retrieved but answer is wrong | Prompt/model issue | Inspect final prompt and grounding instructions |
| Citations point to weak sources | Retrieval ranking issue | Evaluate reranker and source scoring |
| New documents do not appear | Stale index | Check ingestion jobs and sync status |

**Retrieval test set:** maintain known question-to-source mappings so changes to chunking, embeddings, filters, or rerankers can be measured.

### Embedding Drift and Vectorization Issues

| Issue | What To Check |
|---|---|
| Embedding model changed | Re-embed old content or version the index |
| Chunking strategy changed | Rebuild affected chunks and compare retrieval quality |
| Source parser changed | Inspect extracted text before embedding |
| Vector dimensions mismatch | Confirm index schema matches embedding model output |
| Tenant/domain leakage | Verify metadata filters and ACL enforcement |

::: warning Exam Trap
If retrieval quality drops after changing the embedding model, do not just tune the prompt. Rebuild or version the vector index so stored document vectors and query vectors use compatible embeddings.
:::

### Prompt Drift and Maintenance

Prompt drift happens when prompt edits, context changes, or model changes alter behavior over time.

**Controls:**
- Store prompts in version control or Bedrock Prompt Management
- Run regression prompts before promotion
- Log prompt versions with each invocation
- Track format failures, refusal failures, and safety failures separately
- Roll back to a previous approved prompt version when quality drops

### CloudWatch Logs and X-Ray for Prompt Observability

Use logs and traces to understand where prompt or workflow behavior changed.

| Tool | Use |
|---|---|
| CloudWatch Logs | Inspect application prompt assembly, errors, and model responses if logging is enabled |
| Model Invocation Logging | Capture Bedrock prompt/response payloads for audit and debugging |
| X-Ray | Trace latency across API Gateway, Lambda/ECS, retrieval, tools, and Bedrock |
| CloudWatch Metrics | Monitor latency, token count, throttling, and error trends |

### Schema Validation

For structured outputs, validate the response before downstream systems consume it.

```text
FM response
    ↓
JSON parse / schema validation
    ↓ valid
Application consumes output
    ↓ invalid
Retry, repair, or route to human review
```

::: tip
If the application fails because model output is malformed, the best answer is usually schema enforcement, validation, and retry/repair logic, not changing IAM or adding more capacity.
:::

---

## 5.8 Agent Performance Frameworks

Agent evaluation should measure task success, tool use, retrieval quality, and trace behavior.

| Metric | What It Measures |
|---|---|
| Task success rate | Did the agent complete the user's goal? |
| Tool selection accuracy | Did it choose the right action group or API? |
| Tool argument accuracy | Were parameters valid and complete? |
| Retrieval usefulness | Did knowledge base context help the final answer? |
| Loop/error rate | Did the agent repeat steps or get stuck? |
| Human escalation rate | How often human review was required |

**Trace analysis checklist:**
- Was the user intent interpreted correctly?
- Did the agent call a tool when retrieval alone was enough?
- Did it query the Knowledge Base with useful search terms?
- Did it recover from tool errors?
- Did it stop after completing the task?

---

[← Domain 4](./domain-4.md) · [← Back to Overview](./index.md)
