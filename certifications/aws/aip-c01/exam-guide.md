---
title: "AIP-C01: Exam Guide"
description: "Traps, keyword detection, and decision rules for the AWS Certified Generative AI Developer – Professional exam"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, exam guide, exam traps, bedrock, generative ai, rag, guardrails, provisioned throughput, invokemodel, decision rules, keyword detection
---

# AIP-C01: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The AIP-C01 is a **Professional-level** exam for developers building GenAI applications on AWS. It values **architectural reasoning**, **cost-aware design**, and **responsible AI governance**.

### Answer Philosophy

1. **Architecture first**: Always prefer the AWS-managed, purpose-built service over a custom-built solution (Bedrock Knowledge Bases > custom vector store scripts).
2. **Cost-aware**: Questions asking for "most cost-effective" favor on-demand for sporadic traffic, PTU for steady 24/7 workloads, and batch inference for non-urgent bulk jobs.
3. **Security by default**: Prefer private connectivity (VPC Endpoints), least-privilege IAM, and Guardrails over post-hoc security additions.
4. **RAG over fine-tuning**: When knowledge is dynamic or traceability matters, RAG is almost always the right answer over fine-tuning.

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---|---|
| "Large context window needed" | **Claude (Anthropic)** — up to 200k tokens |
| "Open-source / custom fine-tuning needed" | **Llama (Meta)** |
| "Efficient inference at lower cost" | **Mistral** |
| "AWS-native embeddings for RAG" | **Titan Text Embeddings** |
| "Multilingual embeddings" | **Cohere Embed** |
| "Document Q&A / knowledge retrieval" | **Knowledge Bases (RAG)** |
| "Multi-step reasoning / tool use / external API calls" | **Bedrock Agents + Action Groups** |
| "Full synchronous response" | **InvokeModel** |
| "Streaming / low-latency UX / chat interface" | **InvokeModelWithResponseStream** |
| "Vector store for RAG" | **Amazon OpenSearch Serverless** (or Aurora pgvector) |
| "Content moderation / block harmful content" | **Guardrails for Amazon Bedrock** |
| "PII detection and redaction" | **Guardrails — PII filter** |
| "Predictable throughput / guaranteed no throttling" | **Provisioned Throughput (PTU)** |
| "Sporadic traffic / dev/test environment" | **On-demand pricing** |
| "Bulk, non-real-time inference jobs" | **Batch inference** |
| "Audit trail / compliance logging" | **AWS CloudTrail** |
| "Operational metrics / alarms / dashboards" | **Amazon CloudWatch** |
| "Private connectivity to Bedrock" | **VPC Endpoint (PrivateLink) — bedrock-runtime** |
| "Knowledge changes frequently / need source citations" | **RAG** (not fine-tuning) |
| "Detect hallucinations in RAG output" | **Groundedness metric** (Model Evaluation) |
| "Log all prompts and responses for AI governance" | **Model Invocation Logging** (to S3/CloudWatch Logs) |

---

## Exam Traps

::: warning Look out for these!
- **RAG vs. Fine-tuning**: RAG is the right answer when knowledge changes frequently or you need source attribution. Fine-tuning is for style and format adaptation on stable data. The exam frequently presents fine-tuning as a tempting distractor — default to RAG unless the scenario explicitly requires style or format changes.

- **Guardrails scope**: Guardrails filter BOTH inputs AND outputs. A common wrong answer claims "Guardrails only filter model responses." They evaluate the prompt AND the response.

- **Guardrails must be explicitly applied**: Guardrails do NOT automatically apply to all Bedrock calls. You must pass `guardrailIdentifier` + `guardrailVersion` in each API request where you want them active.

- **OpenSearch Serverless vs. managed OpenSearch**: Bedrock Knowledge Bases use **OpenSearch Serverless** — not a standard managed OpenSearch cluster. The exam presents both options. Choose Serverless for Knowledge Bases.

- **InvokeModel vs. InvokeModelWithResponseStream**: Both call the FM and cost the same in tokens. The difference is delivery: synchronous (full response at once) vs. streaming (token by token). Streaming does NOT save money — it improves perceived latency.

- **CloudTrail vs. CloudWatch**: CloudTrail = audit log of API calls (who called what and when). CloudWatch = operational metrics (latency, errors, token counts). The exam swaps these frequently.

- **PTU for sporadic traffic**: Provisioned Throughput requires a 1- or 6-month commitment. It is NOT appropriate for development, testing, or unpredictable workloads. On-Demand is correct for variable traffic.

- **Bedrock does not train on customer data**: Amazon Bedrock never uses customer prompts or data to train foundation models. This is a hard guarantee — mark any answer claiming otherwise as incorrect.

- **Knowledge Base sync**: After updating S3 content, you must manually trigger a sync on the Knowledge Base. The vector store does NOT auto-update when S3 changes.
:::

---

## Decision Quick Reference

### "Which FM?"
```
Large context window (long docs, multi-turn)?  → Claude (Anthropic)
Open-source, need to fine-tune?               → Llama (Meta)
Efficient, lower-cost inference?              → Mistral
AWS-native, embeddings, summarization?        → Titan (AWS)
Multilingual embeddings?                      → Cohere Embed
```

### "RAG or fine-tuning?"
```
Knowledge changes frequently?                 → RAG
Need source traceability / citations?         → RAG
Need to change model style or format?         → Fine-tuning
Data is stable, model adapts its behavior?    → Fine-tuning
```

### "Knowledge Base or Bedrock Agents?"
```
Simple document Q&A?                          → Knowledge Base (RAG)
Multi-step reasoning + tool use + APIs?       → Bedrock Agents
Both retrieval + actions in one workflow?     → Bedrock Agents with attached Knowledge Base
```

### "Which API?"
```
Synchronous full response?                    → InvokeModel
Streaming / low-latency chat UX?             → InvokeModelWithResponseStream
Multi-step agentic workflow?                  → InvokeAgent
```

### "Which vector store?"
```
Bedrock Knowledge Base, fully managed?        → Amazon OpenSearch Serverless
Existing PostgreSQL infrastructure?           → Aurora PostgreSQL with pgvector
Enterprise doc retrieval with NLP ranking?    → Amazon Kendra
```

### "PTU or On-Demand?"
```
Predictable, 24/7 consistent traffic?         → Provisioned Throughput (PTU)
Sporadic, unpredictable, or dev/test?         → On-Demand
Non-real-time bulk processing?                → Batch Inference
```

### "Monitoring or Compliance?"
```
Audit trail for who called Bedrock and when?  → CloudTrail
Operational metrics (latency, errors)?        → CloudWatch
Log prompt + response content?                → Model Invocation Logging (S3 or CloudWatch Logs)
```

---

## Final Strategy

- **Domain 1 is 31% of the exam** — FM selection, RAG architecture, and compliance are the biggest investment. Know chunking strategies, vector store options, and the FM comparison table cold.
- **Domain 2 is 26%** — Know the three Bedrock APIs and the distinction between Agents and Knowledge Bases. Be able to pick the right architecture for any scenario.
- **Domains 1 and 2 together are 57%** — Mastering these two domains alone gets you most of the way there.
- **For every scenario, ask**: Is this about retrieval (RAG/Knowledge Base), reasoning + action (Agents), cost (PTU/on-demand), safety (Guardrails), or compliance (CloudTrail/IAM)?
- **Eliminate answers that**: use the wrong service for the scenario, suggest fine-tuning when RAG fits better, propose PTU for sporadic workloads, or confuse CloudTrail with CloudWatch.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
