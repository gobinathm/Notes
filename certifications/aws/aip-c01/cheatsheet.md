---
title: "AIP-C01: Cheatsheet"
description: "Quick reference and decision rules for the AWS Certified Generative AI Developer – Professional exam"
---

# AIP-C01 Cheatsheet

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
