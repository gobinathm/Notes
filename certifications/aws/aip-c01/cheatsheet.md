---
title: "AIP-C01: Cheatsheet"
description: "One-page exam day reference for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, bedrock, cheatsheet, quick reference, invokemodel, guardrails, rag, provisioned throughput, opensearch, vector store, exam day
---

# AIP-C01: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md) · [Visual Study Kit →](./visual-cheatsheet.md)

::: danger Exam Day Reference
Review this page 5 minutes before the exam.
:::

---

## Foundation Model Quick Reference

| FM | Vendor | Key Strength | Best For |
|---|---|---|---|
| **Claude** | Anthropic | 200k token context, reasoning | Long docs, complex reasoning |
| **Llama** | Meta | Open-source, fine-tunable | Custom fine-tuning |
| **Mistral** | Mistral AI | Efficient, fast | Cost-efficient inference |
| **Titan** | AWS | AWS-native, embeddings | RAG embeddings, summarization |
| **Cohere Embed** | Cohere | Multilingual embeddings | Multilingual RAG |

---

## Bedrock API Comparison

| API | Delivery | Use Case |
|---|---|---|
| `InvokeModel` | Synchronous (full response) | Simple query-response |
| `InvokeModelWithResponseStream` | Streaming (token by token) | Low-latency UX / chat |
| `InvokeAgent` | Streaming + trace | Multi-step agentic workflows |

**InvokeModel:** Uses **model-specific JSON** in the request body. The expected schema varies by model family.

**Converse API:** Use when you want a **consistent message-based interface across Bedrock models** with optional inference settings, tool config, guardrails, and prompt variables.

**Inference settings:**  
Low **temperature** = more deterministic and consistent  
Higher **temperature** = more creative and variable  
Lower **topP** = tighter token selection

---

## Agents vs. Knowledge Bases

| | Knowledge Base (RAG only) | Bedrock Agents |
|---|---|---|
| **External API calls** | No | Yes (via Action Groups + Lambda) |
| **Multi-step reasoning** | No | Yes |
| **Document retrieval** | Yes | Yes (optional) |
| **Best for** | Static knowledge Q&A | Dynamic workflows, tool use |

---

## High-Value Service Map

| Service / Feature | Purpose | Quick Refresher |
|---|---|---|
| **Amazon Bedrock** | Serverless FM access | The central managed entry point for Claude, Titan, Llama, and other supported models |
| **Knowledge Bases** | Automated RAG | Handles ingestion, chunking, embedding, storage, and retrieval for private data |
| **Bedrock Agents** | Multi-step reasoning | Best when the workflow must use tools or take actions through Action Groups |
| **Bedrock Flows** | Orchestrated workflows | Better than Agents when the path is deterministic and explicitly defined |
| **Prompt Caching** | Cost + latency optimization | Reuses a repeated static prompt prefix such as a long system prompt |
| **Amazon OpenSearch Serverless / Vector Engine** | Semantic search | Stores embeddings and supports low-latency similarity search for RAG |

---

## Guardrails — Four Filter Types

| Filter Type | What It Controls |
|---|---|
| **Content Filters** | Harmful categories: hate, violence, sexual content, insults |
| **Denied Topics** | Topics the model must refuse to discuss |
| **Word Filters** | Exact word/phrase blocklists |
| **PII Redaction** | Names, emails, SSNs, credit cards — Redact or Block |

**Key rules:**
- Guardrails apply to **both inputs AND outputs**
- Must be explicitly applied per API call via `guardrailIdentifier` + `guardrailVersion`
- PII modes: **Redact** (mask with placeholder) vs. **Block** (reject request/response)
- **Denied Topics** = business-policy blocking at the topic level, not just exact keyword blocking

---

## Safety, Governance, and Ops

| Service / Feature | Purpose | Quick Refresher |
|---|---|---|
| **Bedrock Guardrails** | Content filtering | Filters PII, harmful content, and denied topics across model inputs and outputs |
| **Model Evaluation** | Quality control | Uses human or automated metrics such as Groundedness, Relevance, Accuracy, and Fluency |
| **IAM Policies** | Access control | Scope `bedrock:InvokeModel` permissions tightly; Bedrock does not train on your data by default |
| **AWS PrivateLink** | Data privacy | Keeps Bedrock traffic between your VPC and AWS backbone instead of the public internet |
| **CloudWatch** | Monitoring | Token counts, latency, alarms, dashboards |
| **AWS X-Ray** | Tracing | End-to-end tracing across multi-service GenAI request paths |

---

## Vector Store Options

| Store | Type | Use When |
|---|---|---|
| **Amazon OpenSearch Serverless** | Managed, serverless | Bedrock Knowledge Bases (default) |
| **Aurora PostgreSQL (pgvector)** | RDS extension | Existing PostgreSQL infrastructure |
| **Amazon Kendra** | Enterprise search | NLP-powered enterprise retrieval |

**Retrieval concepts to remember:**
- **k-NN** = nearest vectors
- **Hybrid search** = semantic + keyword
- **BM25** = keyword ranking
- **Reranking** = re-score first-pass results
- **Recall** = find more relevant chunks
- **Precision** = reduce irrelevant chunks

---

## Chunking Strategies

| Strategy | Best For | Trade-off |
|---|---|---|
| **Fixed-size** | Uniform documents | May break context at boundaries |
| **Fixed-size + overlap** | Preserving cross-boundary context | Higher storage cost |
| **Semantic** | Varied, long-form content | Higher processing complexity |
| **Hierarchical** | Complex docs: broad + fine retrieval | More complex retrieval logic |

---

## Provisioned Throughput vs. On-Demand

| | Provisioned Throughput (PTU) | On-Demand |
|---|---|---|
| **Traffic** | Predictable, 24/7 | Sporadic, variable |
| **Pricing** | Fixed (per MU/hour) | Per token |
| **Commitment** | 1 month or 6 months | None |
| **Best for** | Production steady-state | Dev/test, bursts |

Batch Inference = ~50% cheaper than on-demand for non-real-time high-volume jobs.

---

## Optimization Concepts

| Concept | Purpose | Quick Refresher |
|---|---|---|
| **Provisioned Throughput** | Guaranteed capacity | Use for steady production workloads to avoid throttling |
| **Model Distillation** | Cost optimization | Train a smaller student model to mimic a larger teacher model |
| **Temperature** | Randomness control | `0.0` = deterministic; higher values = more creative |
| **Prompt Caching** | Repeated-prefix reuse | Saves cost and latency when large static prompt prefixes repeat across requests |

---

## Model Evaluation Metrics

| Metric | What It Measures |
|---|---|
| **Groundedness** | Response supported by retrieved context? (detects hallucinations) |
| **Relevance** | Response answers the user's question? |
| **Accuracy** | Factually correct? |
| **Fluency** | Well-written and natural? |

---

## Quick Decision Rules

**Vector store for Knowledge Base?**  
→ Amazon OpenSearch Serverless (default) · pgvector on Aurora (alternative)

**Multi-step reasoning + tool use?**  
→ Bedrock Agents + Action Groups (Lambda)

**Need a unified message-based API across models?**  
→ Converse API

**Content moderation / PII?**  
→ Guardrails for Amazon Bedrock

**Lowest cost for repeated large prompt prefixes?**  
→ Prompt Caching

**Highest grounding / accuracy for enterprise knowledge questions?**  
→ RAG with Knowledge Bases + strong retrieval

**Audit trail for compliance?**  
→ AWS CloudTrail (not CloudWatch)

**Operational monitoring (latency, errors, token counts)?**  
→ Amazon CloudWatch

**Predictable 24/7 throughput?**  
→ Provisioned Throughput (PTU) — 1 or 6 month commitment

**Bulk, non-real-time inference?**  
→ Batch Inference

**Private connectivity to Bedrock API?**  
→ VPC Endpoint — `bedrock-runtime` for inference calls

**Knowledge changes frequently / need traceability?**  
→ RAG (Knowledge Bases), not fine-tuning

**Detect hallucinations in RAG?**  
→ Groundedness metric in Model Evaluation

**Log all prompts and responses for AI governance?**  
→ Model Invocation Logging (to S3 or CloudWatch Logs)

**Need a fixed multi-step workflow with retry/error handling?**  
→ Step Functions or Bedrock Flows, not Agents

---

## Key Terminology

- **FM**: Foundation Model — pre-trained large AI model (Claude, Llama, Titan, etc.)
- **RAG**: Retrieval-Augmented Generation — FM inference + vector store retrieval
- **PTU**: Provisioned Throughput Unit — reserved Bedrock model capacity
- **MU**: Model Unit — unit of PTU capacity purchased
- **PII**: Personally Identifiable Information — data that identifies an individual
- **Groundedness**: Metric measuring how well a response is grounded in retrieved context
- **Hallucination**: FM generating information not present in the provided context
- **Action Group**: Lambda function exposed to a Bedrock Agent for tool use
- **OpenSearch Serverless**: Managed, serverless vector store used by Bedrock Knowledge Bases
- **Batch Inference**: Asynchronous bulk FM inference via S3 JSONL input/output
- **Model Invocation Logging**: Bedrock feature that logs all prompts + responses to S3/CloudWatch Logs
- **Prompt Caching**: Reuse of a static prompt prefix to reduce repeated compute and cost
- **LLM-as-a-Judge**: Using one model to evaluate the quality of another model's output

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md) · [Visual Study Kit →](./visual-cheatsheet.md)
