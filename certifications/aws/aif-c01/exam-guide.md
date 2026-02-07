---
title: "AIF-C01 - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the AIF-C01 exam"
head:
  - - meta
    - name: keywords
      content: aif-c01, exam guide, exam traps, tips, aws ai practitioner
---

# Exam Guide & Traps

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)

---

## Exam Traps

### Trap 1: Bedrock Model Confusion

Know which model for which scenario:

| If question mentions... | Think... |
|------------------------|----------|
| Long documents (200K tokens) | **Anthropic Claude** |
| Cost-effective text generation | **Amazon Titan Text** |
| Embeddings for RAG | **Amazon Titan Embeddings** |
| Image generation | **Stable Diffusion XL** |
| Multilingual content | **Cohere or AI21 Jurassic** |

### Trap 2: RAG vs Fine-Tuning vs Prompt Engineering

**Common mistake**: Choosing fine-tuning when RAG or prompting would work.

**Correct order:**
1. **Prompt Engineering** (try first - cheapest, fastest)
2. **RAG** (need current/private data)
3. **Fine-Tuning** (only if above methods insufficient)

Examples:
- ❌ "Fine-tune the model to access current news"
- ✅ "Use RAG to provide current news as context"

- ❌ "Fine-tune for better output format"
- ✅ "Use few-shot prompting with examples"

### Trap 3: ML Metrics Selection

| Scenario | Metric | Why |
|----------|--------|-----|
| Spam filter | **Precision** | False positives costly (important emails marked spam) |
| Medical diagnosis | **Recall** | False negatives costly (miss diseases) |
| Balanced dataset | **Accuracy** | Classes are equal |
| Imbalanced data | **Precision/Recall** | Accuracy misleading |

### Trap 4: Responsible AI Tools

| Need | AWS Service |
|------|-------------|
| Detect bias in data/models | **SageMaker Clarify** |
| Monitor model drift | **SageMaker Model Monitor** |
| Human review workflows | **Amazon A2I** |
| Explain predictions | **SageMaker Clarify** |

### Trap 5: Security Best Practices

When asked about securing AI systems:

- ✅ Encrypt at rest (AWS KMS, S3 encryption)
- ✅ Encrypt in transit (TLS/SSL)
- ✅ IAM policies for access control
- ✅ Input validation and sanitization
- ✅ Monitor for prompt injection attacks

**Common trap**: Forgetting that Bedrock data **does not** train public models.

---

## Decision Quick Reference

### Bedrock vs SageMaker Quick Decision Tree

```
Need to use AI/ML?
├─ Want pre-built models via API?
│  ├─ GenAI/LLMs? → Amazon Bedrock ⭐
│  └─ Specific tasks? → AI Services (Rekognition, Comprehend, etc.)
│
└─ Want to build/train custom models?
   └─ Full ML lifecycle control? → SageMaker ⭐
```


## Decision Quick Reference

### "Which AWS AI service?"

```
Extract text from documents → Amazon Textract
Analyze sentiment → Amazon Comprehend
Translate languages → Amazon Translate
Speech-to-text → Amazon Transcribe
Text-to-speech → Amazon Polly
Build chatbot → Amazon Lex
Recommendations → Amazon Personalize
Fraud detection → Amazon Fraud Detector
Search documents → Amazon Kendra
Access foundation models → Amazon Bedrock
Full ML platform → Amazon SageMaker
```

### "RAG, Fine-Tuning, or Prompt Engineering?"

```
Simple task, common format → Prompt Engineering (zero-shot)
Custom format, few examples → Prompt Engineering (few-shot)
Need current data → RAG
Need private/proprietary data → RAG
Have 100+ training examples → Fine-Tuning
Domain-specific terminology → Fine-Tuning
Budget constrained → Prompt Engineering
```

### "Which type of learning?"

```
Have labeled data (X and y) → Supervised Learning
No labels, find patterns → Unsupervised Learning
Learn through rewards → Reinforcement Learning
```

### "How to address concerns about..."

```
Hallucinations → Use RAG, implement guardrails, human review
Data privacy → Bedrock doesn't train on your data, encryption
Bias → Use SageMaker Clarify, diverse training data
Cost → Choose appropriate model size, optimize prompts, cache
Model drift → SageMaker Model Monitor, regular retraining
```

---

## Exam Day Reminders

### Think Like This

**For Bedrock questions:**
- Longest context? → Claude (200K)
- Cheapest? → Titan
- Embeddings? → Titan Embeddings
- Images? → Stable Diffusion

**For ML questions:**
- False positives bad? → Precision
- False negatives bad? → Recall
- Model too simple? → Underfitting
- Memorized training data? → Overfitting

**For Responsible AI:**
- Detect bias? → SageMaker Clarify
- Monitor drift? → SageMaker Model Monitor
- Human review? → Amazon A2I

**For RAG:**
- Always: Embeddings → Vector DB → Retrieve → Generate
- AWS vector DB: Amazon OpenSearch Service

---

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)
