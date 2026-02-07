---
title: "AIF-C01 - Cheatsheet"
description: "One-page exam day reference for AIF-C01 AWS Certified AI Practitioner"
head:
  - - meta
    - name: keywords
      content: aif-c01, aws, ai practitioner, cheatsheet, quick reference, exam
---

# AIF-C01: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

::: danger Exam Day Reference
Print this or review 5 minutes before the exam.
:::

---

## AWS AI Services Quick Lookup

| Need | Service |
|------|---------|
| Foundation models | **Amazon Bedrock** |
| Business assistant | Amazon Q |
| Code suggestions | Amazon CodeWhisperer |
| Full ML platform | Amazon SageMaker |
| Image/video analysis | Amazon Rekognition |
| Extract text | Amazon Textract |
| Sentiment analysis | Amazon Comprehend |
| Translation | Amazon Translate |
| Speech-to-text | Amazon Transcribe |
| Text-to-speech | Amazon Polly |
| Chatbot | Amazon Lex |
| Recommendations | Amazon Personalize |
| Fraud detection | Amazon Fraud Detector |
| Search | Amazon Kendra |
| Human review | Amazon A2I |

---

## Bedrock Models

| Model | Provider | Best For |
|-------|----------|----------|
| **Claude** | Anthropic | Long docs (200K), reasoning, code |
| **Titan Text** | Amazon | Cost-effective, simple tasks |
| **Titan Embeddings** | Amazon | RAG, semantic search |
| **Titan Image** | Amazon | Image generation |
| **Jurassic** | AI21 Labs | Multilingual text |
| **Command** | Cohere | Text generation |
| **Llama 2** | Meta | Open-source, customizable |
| **Stable Diffusion** | Stability AI | Image generation |

---

## ML Metrics (PARC)

- **P**recision = TP / (TP + FP)
  - Use when: False positives costly (spam filter)
  
- **A**ccuracy = (TP + TN) / Total
  - Use when: Balanced classes
  
- **R**ecall = TP / (TP + FN)
  - Use when: False negatives costly (medical diagnosis)
  
- **C**onfusion Matrix
  - TP, TN, FP, FN

---

## Model Fit Issues

| Issue | Performance | Solution |
|-------|-------------|----------|
| **Underfitting** | Poor on train AND test | More complex model |
| **Good Fit** | Good on both | ✅ Goal |
| **Overfitting** | Great on train, poor on test | More data, regularization |

---

## RAG Workflow (5 Steps)

1. User asks question
2. Convert question to **embedding** (vector)
3. **Search** vector database for similar content
4. **Retrieve** relevant documents
5. LLM **generates** answer with context

**AWS Vector DB**: Amazon OpenSearch Service

---

## Prompt Engineering Ladder

1. **Zero-Shot**: No examples
   - "Translate to French: Hello"

2. **Few-Shot**: 3-5 examples
   - Show input/output pairs

3. **Chain-of-Thought**: Show reasoning
   - "Show your work"

---

## Customization Approaches

| Approach | When | Cost | Effort |
|----------|------|------|--------|
| **Prompt Engineering** | First choice | Low | Low |
| **RAG** | Current/private data | Medium | Medium |
| **Fine-Tuning** | Domain-specific | High | High |

**Order**: Always try Prompt → RAG → Fine-Tuning

---

## Responsible AI (FEPST)

- **F**airness — Avoid bias, treat all equitably
- **E**xplainability — Understand decisions
- **P**rivacy — Protect data (encryption, IAM)
- **S**afety — Prevent harmful outputs
- **T**ransparency — Document capabilities/limits

---

## Responsible AI Tools

| Need | AWS Tool |
|------|----------|
| Detect bias | **SageMaker Clarify** |
| Monitor drift | **SageMaker Model Monitor** |
| Human review | **Amazon A2I** |

---

## Security Checklist

- ✅ Encrypt at rest (AWS KMS)
- ✅ Encrypt in transit (TLS/SSL)
- ✅ IAM policies for access
- ✅ Input validation
- ✅ Monitor for prompt injection
- ✅ Bedrock data stays private (not used for training)

---

## Compliance

| Regulation | What It Means |
|------------|---------------|
| **HIPAA** | Healthcare data (use HIPAA-eligible services) |
| **GDPR** | EU data privacy (right to explanation) |
| **SOC 2** | Security controls |
| **PCI DSS** | Payment card data |

---

## Learning Types

| Type | Data | Example |
|------|------|---------|
| **Supervised** | Labeled (X, y) | Spam detection |
| **Unsupervised** | Unlabeled | Customer segmentation |
| **Reinforcement** | Rewards | Game AI |

---

## The ML Pipeline

1. **Business Goal** ➡️ 2. **Data Prep** ➡️ 3. **Model Training** ➡️ 4. **Evaluation** ➡️ 5. **Deployment** (Inference) ➡️ 6. **Monitoring**

---

## Inference Types

- **Real-time**: Low latency, immediate (e.g., fraud check at checkout).
- **Batch**: High volume, delayed (e.g., monthly product recommendations).

---

## GenAI Limitations

- ❌ **Hallucinations** (generates false info)
- ❌ **Training cutoff** (no current events)
- ❌ **Context limits** (can't process very long docs)
- ❌ **Bias** (reflects training data)
- ❌ **No real-time data** (use RAG)

**Mitigation**: RAG, guardrails, human review

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

*Last Updated: 2026-02-05*
