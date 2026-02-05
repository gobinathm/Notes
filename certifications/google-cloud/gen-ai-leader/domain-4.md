---
title: "Domain 4 - Operations (GenAIOps)"
description: "GCP Gen AI Leader Domain 4: Evaluation, deployment, and monitoring"
head:
  - - meta
    - name: keywords
      content: gcp, gen ai leader, genaiops, autosxs, deployment
---

# Domain 4: Operations (GenAIOps)

[← Domain 3](./domain-3.md) · [Exam Tips →](./exam-tips.md)

---

## Evaluation (AutoSxS)

<FlashcardDeck 
  title="GenAIOps"
  :cards="[
    {
      question: 'What is AutoSxS?',
      answer: '<strong>Automatic Side-by-Side evaluation</strong><br>Objective &quot;judge&quot; model compares outputs of two models<br>Helps determine if Model A is better than Model B.'
    },
    {
      question: 'What are Endpoints in Vertex AI?',
      answer: '<strong>Deployed models accessible via API</strong><br>Models must be deployed to an Endpoint<br>Enables production access and scaling.'
    },
    {
      question: 'What is Model Drift?',
      answer: '<strong>Model performance degrading over time</strong><br>Caused by: Data distribution changes<br>Solution: Monitor and retrain regularly.'
    }
  ]"
/>

- **Problem**: How do you know if Model A is better than Model B?
- **Solution**: **Vertex AI AutoSxS** (Automatic Side-by-Side). An objective "judge" model compares the outputs of two models based on your criteria.

---

## Deployment & Monitoring

- **Endpoints**: Models must be deployed to an Endpoint to be accessible via API
- **Safety**: Monitoring for "Model Drift" or "Hallucination rates" over time

---

## Quick Reference: Limits & Quotas

| Resource | Default Logic |
|----------|---------------|
| **Max Output Tokens** | Varies by model (e.g., 2048 or 8192) |
| **Context Window** | Gemini 1.5 Pro supports up to 1M+ tokens |
| **Data Privacy** | **Google does not train foundation models on customer data** |

---

[← Domain 3](./domain-3.md) · [Exam Tips →](./exam-tips.md)
