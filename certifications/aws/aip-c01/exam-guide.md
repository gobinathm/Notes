---
title: "AIP-C01: Exam Guide"
description: "Traps, keyword detection, and decision rules for the AWS Certified Generative AI Developer – Professional exam"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, exam guide, exam traps, bedrock, rag, guardrails, provisioned throughput, invokemodel, decision rules
---

# AIP-C01: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

## How the Exam Wants You to Think

The AIP-C01 is a **Professional-level** exam for developers building GenAI applications on AWS. It values **architectural reasoning**, **cost-aware design**, and **responsible AI governance**.

### Answer Philosophy

1. **Architecture first**: Prefer the AWS-managed, purpose-built service over a custom-built solution.
2. **Cost-aware**: On-demand for sporadic traffic, PTU for steady 24/7 workloads, and batch inference for non-urgent bulk jobs.
3. **Security by default**: Prefer private connectivity, least-privilege IAM, and Guardrails.
4. **RAG over fine-tuning**: When knowledge is dynamic or traceability matters, RAG is almost always the right answer.

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---|---|
| "Large context window needed" | **Claude (Anthropic)** |
| "Open-source / custom fine-tuning needed" | **Llama (Meta)** |
| "Efficient inference at lower cost" | **Mistral** |
| "AWS-native embeddings for RAG" | **Titan Text Embeddings** |
| "Document Q&A / knowledge retrieval" | **Knowledge Bases (RAG)** |
| "Multi-step reasoning / tool use / external API calls" | **Bedrock Agents + Action Groups** |
| "Unified message-based API across models" | **Converse API** |
| "Full synchronous response" | **InvokeModel** |
| "Streaming / low-latency UX / chat interface" | **InvokeModelWithResponseStream** |
| "Vector store for RAG" | **Amazon OpenSearch Serverless** |
| "Content moderation / block harmful content" | **Guardrails for Amazon Bedrock** |
| "Predictable throughput / guaranteed no throttling" | **Provisioned Throughput (PTU)** |
| "Bulk, non-real-time inference jobs" | **Batch inference** |
| "Audit trail / compliance logging" | **AWS CloudTrail** |
| "Operational metrics / alarms / dashboards" | **Amazon CloudWatch** |
| "Private connectivity to Bedrock" | **VPC Endpoint (PrivateLink) — bedrock-runtime** |
| "Knowledge changes frequently / need source citations" | **RAG** |
| "Detect hallucinations in RAG output" | **Groundedness metric** |
| "Log all prompts and responses for AI governance" | **Model Invocation Logging** |

## Exam Traps

::: warning Look out for these!
- **RAG vs. Fine-tuning**: RAG is right when knowledge changes frequently or you need source attribution.
- **Guardrails scope**: Guardrails filter BOTH inputs AND outputs.
- **Guardrails must be explicitly applied**: They do NOT apply automatically to all Bedrock calls.
- **OpenSearch Serverless vs. managed OpenSearch**: Knowledge Bases use **OpenSearch Serverless**.
- **Converse vs. InvokeAgent**: Converse is a unified model interaction API, not full agent orchestration.
- **InvokeModel vs. InvokeModelWithResponseStream**: Streaming does NOT save money.
- **CloudTrail vs. CloudWatch**: CloudTrail = audit; CloudWatch = operations.
- **PTU for sporadic traffic**: PTU is NOT appropriate for development or unpredictable workloads.
- **Bedrock does not train on customer data**: mark any answer claiming otherwise as incorrect.
- **Knowledge Base sync**: After updating S3 content, you must manually trigger a sync.
:::

## Decision Quick Reference

### "Which FM?"

```text
Large context window?    → Claude
Open-source fine-tune?   → Llama
Efficient inference?     → Mistral
Embeddings?              → Titan
```

### "RAG or fine-tuning?"

```text
Knowledge changes often? → RAG
Need source traceability? → RAG
Need new style/format?   → Fine-tuning
```

### "Knowledge Base or Bedrock Agents?"

```text
Simple document Q&A?     → Knowledge Base
Multi-step + tool use?   → Bedrock Agents
```

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
