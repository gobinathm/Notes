---
title: "AIP-C01 - Exam Tips"
description: "Exam strategies and tips for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, exam tips, strategy, bedrock, generative ai, professional exam, rag, guardrails, provisioned throughput
---

# AIP-C01: Exam Tips & Strategy

[← Back to Overview](./index.md)

::: danger Final Preparation
This page contains strategies, tips, and common traps to help you succeed on exam day.
:::

---

## Exam Format Overview

**Exam Details:**
- Duration: 170 minutes
- Questions: ~85 questions
- Format: Multiple choice, multiple select
- Passing Score: 750/1000
- Languages: English

**Question Types:**
1. **Single Answer** - Choose the ONE best answer
2. **Multiple Answer** - Choose ALL that apply (usually 2-3 correct)
3. **Scenario-Based** - Read a scenario, then answer questions

---

## Time Management Strategy

### Recommended Pacing

- **Total Time:** 170 minutes
- **Questions:** ~85
- **Time per Question:** ~2.0 minutes
- **Review Time:** 20 minutes at the end

### Time Allocation

```
First Pass (130 min):
├─ Answer all easy questions immediately
├─ Mark difficult questions for review
└─ Don't spend more than 3 minutes on any question

Review Pass (20 min):
├─ Review marked questions
├─ Check flagged answers
└─ Final verification of all answers
```

### Tips for Time Management

1. ✅ **Read questions carefully** - Don't rush, but don't overthink
2. ✅ **Flag and move on** - If unsure, mark for review and continue
3. ✅ **Answer easy ones first** - Build confidence and save time
4. ✅ **Leave buffer time** - Reserve 20 minutes for final review
5. ❌ **Don't get stuck** - No single question is worth failing

---

## Question-Answering Strategies

### Single-Answer Questions

**Strategy:**
1. Read the question carefully - look for keywords
2. Eliminate obviously wrong answers first
3. Compare remaining options
4. Choose the BEST answer (not just "correct")

**Common Keywords:**
- **"MOST"** - Compare all options, choose the best
- **"LEAST"** - Look for the exception or worst option
- **"First step"** - Focus on initial action, not the whole process
- **"Cost-effective"** - Usually means cheapest option
- **"Highly available"** - Focus on redundancy and failover
- **"Secure"** - Prioritize security features

### Multiple-Answer Questions

**Strategy:**
1. Question usually states "Select X answers" - must choose exactly X
2. Treat each option as true/false
3. Eliminate definite wrongs first
4. Select exactly the number requested

::: warning Common Trap
Multiple-answer questions may have 4-5 correct answers but only ask for 2-3. Choose the BEST ones.
:::

### Scenario-Based Questions

**Strategy:**
1. Read the scenario carefully - note requirements
2. Identify key constraints (budget, time, compliance, latency, etc.)
3. Eliminate options that don't meet requirements
4. Choose solution that best fits all criteria

**Requirements Keywords:**
- "minimum cost" → Choose on-demand or token-efficient option
- "predictable throughput" → Provisioned Throughput
- "low latency" → Streaming (`InvokeModelWithResponseStream`)
- "compliant" / "data residency" → Private endpoints + region selection
- "existing infrastructure" → Don't introduce new unrelated services

---

## Common Exam Traps

### Trap 1: Confusing InvokeModel vs InvokeModelWithResponseStream

**Problem:** Both call a foundation model, but for different use cases.

**How to Choose:**
```
Need full response? → InvokeModel (synchronous)
Need streaming / low-latency feel? → InvokeModelWithResponseStream
```

---

### Trap 2: OpenSearch Serverless vs Standard OpenSearch

**Problem:** Questions may describe a scenario where either could work.

**How to Choose:**
- Knowledge Bases / RAG → **OpenSearch Serverless** (managed, scales to zero)
- Full-text search with custom config → OpenSearch managed cluster

---

### Trap 3: Missing Keywords

**Problem:** Ignoring important qualifiers in questions.

**Common Missed Keywords:**
- "MOST cost-effective" (not just "works")
- "LEAST effort" (not most feature-rich)
- "immediate" (no time for planning)
- "minimum changes" (use existing setup)

**How to Avoid:**
- Underline/highlight keywords mentally
- Reread question if answer seems too easy
- Check that answer matches ALL requirements

---

### Trap 4: Assumption-Based Answers

**Problem:** Adding context not in the question.

**Example:**
- ❌ "They probably need high availability" (not stated)
- ✅ Only answer what's explicitly asked or required

---

### Trap 5: Similar-Looking Options

**Problem:** Two answers that seem almost identical.

**Strategy:**
1. Read both options word-by-word
2. Find the ONE difference
3. That difference is the key to the question

---

## Domain-Specific Tips

### Domain 1: FM Integration, Data Management, and Compliance (31%)

**High-Frequency Topics:**
- ⭐⭐⭐ FM selection criteria (latency, context window, cost)
- ⭐⭐⭐ Knowledge Bases + OpenSearch Serverless vector store setup
- ⭐⭐ Chunking strategies for RAG pipelines
- ⭐⭐ Data residency and private endpoint configuration

**Common Traps:**
- Choosing fine-tuning when RAG is more appropriate (or vice versa)
- Forgetting that pgvector on Aurora is a valid alternative to OpenSearch Serverless

**Decision Matrix:**

```
Which FM to choose?
├─ Large context window needed? → Claude (up to 200k tokens)
├─ Open-source / fine-tuning? → Llama (Meta)
├─ Efficient / high performance? → Mistral
└─ AWS-native / embeddings? → Titan
```

---

### Domain 2: Implementation and Integration (26%)

**High-Frequency Topics:**
- ⭐⭐⭐ Bedrock Agents for multi-step agentic workflows
- ⭐⭐⭐ RAG architecture and retrieval optimization
- ⭐⭐ API integration patterns (InvokeModel, streaming)

**Common Traps:**
- Not knowing when to use Bedrock Agents vs a simple Knowledge Base query
- Confusing chunking strategies — fixed-size vs semantic chunking trade-offs

**Quick Reference:**

| Scenario | Best Solution | Why |
|----------|---------------|-----|
| Multi-step reasoning, tool use | Bedrock Agents | Orchestrates actions + API calls |
| Document Q&A, retrieval | Knowledge Bases (RAG) | Retrieves relevant chunks |
| Direct FM call, no retrieval | InvokeModel | Simple synchronous call |
| Real-time streaming response | InvokeModelWithResponseStream | Low-latency UX |

---

### Domain 3: AI Safety, Security, and Governance (20%)

**High-Frequency Topics:**
- ⭐⭐⭐ Guardrails: content filters, PII detection, denied topics
- ⭐⭐⭐ IAM least-privilege for Bedrock access
- ⭐⭐ VPC endpoints / PrivateLink for private connectivity

**Common Traps:**
- Thinking Guardrails block prompts — they filter both inputs and outputs
- Confusing CloudTrail (audit logging) with CloudWatch (operational monitoring)

---

### Domain 4: Operational Efficiency and Optimization (12%)

**High-Frequency Topics:**
- ⭐⭐⭐ Provisioned Throughput vs on-demand pricing
- ⭐⭐ Token efficiency and prompt optimization
- ⭐ Batch inference for high-volume, non-real-time workloads

**Common Traps:**
- Choosing PTUs when on-demand is more cost-effective for sporadic usage
- Not knowing the PTU commitment period (1 month or 6 months)

**Decision Matrix:**

```
Which throughput model?
├─ Predictable, consistent traffic? → Provisioned Throughput (PTU)
├─ Sporadic / unpredictable traffic? → On-demand (token-based)
└─ Batch, non-time-sensitive? → Batch inference
```

---

### Domain 5: Testing, Validation, and Troubleshooting (11%)

**High-Frequency Topics:**
- ⭐⭐⭐ Model evaluation: automated metrics (Groundedness, Accuracy, Relevance)
- ⭐⭐ Human-based evaluation workflows
- ⭐⭐ CloudWatch dashboards and alarms for Bedrock

**Common Traps:**
- Not knowing the built-in evaluation metrics in Bedrock's model evaluation feature
- Forgetting that CloudTrail is required for compliance audit trails (not just CloudWatch)

---

## Last-Minute Review Checklist

### 24 Hours Before Exam

- [ ] Review [Quick Refresher](./quick-refresher.md) page
- [ ] Skim through decision trees above
- [ ] Review high-frequency topics (marked ⭐⭐⭐)
- [ ] Check common exam traps one more time
- [ ] Get good sleep (seriously!)

### 1 Hour Before Exam

- [ ] Review key service comparisons (InvokeModel vs Streaming, PTU vs on-demand)
- [ ] Skim comparison tables
- [ ] Read through "Common Traps" section
- [ ] Take 5 deep breaths and relax

### During Exam

- [ ] Read each question twice
- [ ] Underline keywords mentally
- [ ] Eliminate wrong answers first
- [ ] Flag difficult questions for review
- [ ] Use all available time
- [ ] Review flagged questions before submitting

---

## Mental Preparation

### The Night Before

✅ **DO:**
- Light review of notes (no cramming)
- Prepare exam materials (ID, confirmation)
- Get 7-8 hours sleep
- Set multiple alarms

❌ **DON'T:**
- Stay up late studying
- Try to memorize everything
- Stress about unknowns
- Drink excessive caffeine

### Exam Day Morning

✅ **DO:**
- Eat a good breakfast
- Arrive early (15-30 minutes)
- Bring required documents
- Stay hydrated

❌ **DON'T:**
- Skip breakfast
- Rush to exam center
- Forget ID or confirmation
- Drink too much coffee (bathroom breaks!)

---

## Key Facts to Remember

### Important Numbers

- **AIP-C01 Duration**: 170 minutes
- **Questions**: ~85
- **Passing Score**: 750/1000
- **Price**: $300
- **Domain 1 weight**: 31% (highest — focus here)
- **Bedrock context window (Claude)**: up to 200k tokens

### Critical Service Decision Rules

- **PII in prompts/responses** → Guardrails (PII detection filter)
- **Content moderation** → Guardrails for Amazon Bedrock
- **Vector storage for RAG** → OpenSearch Serverless (default) or Aurora pgvector
- **Predictable throughput** → Provisioned Throughput
- **Audit trail** → AWS CloudTrail
- **Operational monitoring** → Amazon CloudWatch
- **Multi-step agentic workflow** → Amazon Bedrock Agents

---

## Final Tips

1. **Read Carefully** - Most mistakes come from misreading questions
2. **Eliminate First** - Remove obviously wrong answers before choosing
3. **Keywords Matter** - "MOST", "LEAST", "FIRST" change everything
4. **Trust Your Gut** - First instinct is usually correct
5. **Use All Time** - Don't submit early, review everything
6. **Flag Liberally** - Mark anything you're unsure about
7. **No Penalties** - Guessing is better than leaving blank
8. **Stay Calm** - One hard question doesn't mean failure

---

::: tip You've Got This!
You've studied hard. Trust your preparation. Read carefully. Think critically. **Good luck!**
:::

---

[← Back to Overview](./index.md) | [Study Notes](./notes.md) | [Quick Refresher](./quick-refresher.md)
