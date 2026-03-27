---
title: "AIP-C01 - Exam Tips"
description: "Exam strategies and tips for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, exam tips, strategy, bedrock, professional exam, rag, guardrails, provisioned throughput
---

# AIP-C01: Exam Tips & Strategy

[← Back to Overview](./index.md)

::: danger Final Preparation
This page contains strategies, tips, and common traps to help you succeed on exam day.
:::

## Exam Format Overview

**Exam Details:**
- Duration: 170 minutes
- Questions: ~85 questions
- Format: Multiple choice, multiple select
- Passing Score: 750/1000
- Languages: English

**Question Types:**
1. **Single Answer** - Choose the ONE best answer
2. **Multiple Answer** - Choose ALL that apply
3. **Scenario-Based** - Read a scenario, then answer questions

## Time Management Strategy

- **Total Time:** 170 minutes
- **Questions:** ~85
- **Time per Question:** ~2 minutes
- **Review Time:** keep ~20 minutes at the end

### Tips

1. Read questions carefully
2. Flag difficult questions and move on
3. Answer easy ones first
4. Reserve review time
5. Do not get stuck on one question

## Common Exam Traps

### Trap 1: `InvokeModel` vs `InvokeModelWithResponseStream`

```text
Need full response? → InvokeModel
Need streaming UX?  → InvokeModelWithResponseStream
```

### Trap 2: OpenSearch Serverless vs Standard OpenSearch

- Knowledge Bases / RAG → **OpenSearch Serverless**
- Full-text search with custom config → managed OpenSearch cluster

### Trap 3: Missing Keywords

Watch for:
- "MOST cost-effective"
- "LEAST effort"
- "immediate"
- "minimum changes"

### Trap 4: Assumption-Based Answers

Do not add unstated requirements. Answer only what the scenario establishes.

## Domain-Specific Tips

### Domain 1
- Highest-frequency topics: FM selection, Knowledge Bases, chunking, private endpoints
- Common trap: choosing fine-tuning when RAG is more appropriate

### Domain 2
- Highest-frequency topics: Bedrock Agents, RAG architecture, API integration
- Common trap: not knowing when to use Agents vs a simple Knowledge Base query

### Domain 3
- Highest-frequency topics: Guardrails, IAM least-privilege, VPC endpoints
- Common trap: confusing CloudTrail with CloudWatch

### Domain 4
- Highest-frequency topics: PTU vs on-demand, token efficiency, batch inference
- Common trap: choosing PTU for sporadic workloads

### Domain 5
- Highest-frequency topics: groundedness, human vs automated evaluation, CloudWatch metrics
- Common trap: forgetting that Groundedness is the most RAG-specific metric

---

[← Back to Overview](./index.md)
