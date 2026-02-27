---
title: "AIP-C01: Cheatsheet"
description: "Quick reference and decision rules for the AWS Certified Generative AI Developer – Professional exam"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, bedrock, cheatsheet, quick reference, invokemodel, guardrails, rag, provisioned throughput, opensearch, vector store
---

# AIP-C01 Cheatsheet

[← Back to Overview](./index.md)

::: tip Quick Reference
Decision rules and service comparisons for last-minute review before the AIP-C01 exam.
:::

*Content coming soon as I progress through my studies.*

---

## Amazon Bedrock APIs
- `InvokeModel`: Synchronous call to get a complete response.
- `InvokeModelWithResponseStream`: Asynchronous/streaming response for low-latency feel.

## Decision Rules
| Requirement | Service/Feature |
|-------------|-----------------|
| Predictable Throughput | Provisioned Throughput |
| Data Residency | Private Endpoints + Region Selection |
| Content Moderation | Guardrails for Amazon Bedrock |
| Knowledge Base | Amazon OpenSearch Serverless |
