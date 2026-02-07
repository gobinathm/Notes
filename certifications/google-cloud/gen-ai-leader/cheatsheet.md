---
title: "GCP-GAIL - Cheatsheet"
description: "One-page exam day reference for GCP Generative AI Leader certification"
head:
  - - meta
    - name: keywords
      content: gcp-gail, gcp, vertex ai, gemini, cheatsheet, quick reference, exam
---

# GCP-GAIL: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

::: danger Exam Day Reference
Print this or review 5 minutes before the exam.
:::

---

## Vertex AI Components

| Component | Purpose |
|-----------|---------|
| **Model Garden** | Browse and select AI models |
| **Vertex AI Studio** | Test prompts, adjust parameters |
| **Vector Search** | High-scale embeddings search (RAG) |
| **AutoSxS** | Compare model outputs side-by-side |
| **Embeddings API** | Generate text embeddings |

---

## Gemini Models

| Model | Context Window | Best For |
|-------|----------------|----------|
| **Gemini 1.5 Pro** | 1M+ tokens | Long documents, complex reasoning |
| **Gemini Pro** | 32K tokens | General tasks |
| **Gemini Flash** | Fast | Low latency, simple tasks |
| **Gemini Ultra** | Varies | Maximum capability |

**Key**: Gemini is **multimodal** (text, images, video, audio)

---

## Core Parameters

| Parameter | Effect | Use Case |
|-----------|--------|----------|
| **Temperature** | Controls randomness | High (0.8+) for creative writing; Low (0.1) for technical data. |
| **Top-K** | Limits vocabulary to K words | Prevents the model from picking highly unlikely "long tail" words. |
| **Top-P** | Dynamic vocabulary based on probability | Samples from smallest set of words whose cumulative probability is P. |

## Model Garden Providers

| Provider | Models | Type |
|----------|--------|------|
| **Google** | Gemini, Imagen, Codey, Chirp | First-party |
| **Open-source** | Llama, Mistral, **Gemma** | Open models |
| **Third-party** | Claude (Anthropic) | Partner models |

**Gemma** = Google's open-weight model (can download and run anywhere)

---

## Customization Ladder (3 Steps)

1. **Prompt Design** (cheapest, fastest)
   - Zero-shot: No examples
   - Few-shot: 3-5 examples

2. **Grounding/RAG** (current data)
   - Google Search
   - BigQuery
   - Document AI

3. **Fine-Tuning** (100+ examples)
   - Supervised Fine-Tuning (SFT)
   - Dataset in Cloud Storage (JSONL)

**Always try in this order!**

---

## RAG Workflow (4 Steps)

1. **Generate embeddings** (Vertex AI Embeddings API)
2. **Store** in Vector Search (Matching Engine)
3. **Retrieve** similar documents
4. **Ground** LLM with context

**Analogy**: Library where similar books are on same shelf

---

## Grounding Sources (3)

- **Google Search** — current events, web data
- **BigQuery** — structured data, analytics
- **Document AI** — your own documents/PDFs

**Purpose**: Connect model to verifiable source of truth

---

## Vertex AI Studio Tabs

| Tab | Purpose |
|-----|---------|
| **Language** | Test prompts, adjust temperature, export code |
| **Vision** | Generate images (Imagen 2), visual Q&A |
| **Speech** | Text-to-speech, speech-to-text (Chirp) |

---

## AutoSxS (Evaluation)

**Problem**: How to know if Model A > Model B?

**Solution**: Objective "judge" model compares outputs

**Use for**: Model selection, prompt comparison

---

## Deployment & Monitoring

| Concept | Meaning |
|---------|---------|
| **Endpoint** | Deployed model accessible via API |
| **Model Drift** | Performance degrading over time |
| **Monitoring** | Track drift, hallucination rates |

**Key**: Models must be deployed to Endpoint for production use

---

## Data Privacy (3 Rules)

1. Google **does NOT** train foundation models on customer data
2. Data stays in **your GCP project**
3. Respects **IAM permissions**

**Compliance**: SOC 2, ISO 27001, GDPR

---

## Limits & Quotas

| Resource | Default |
|----------|---------|
| **Max Output Tokens** | Varies by model (2048-8192) |
| **Context Window** | Gemini 1.5 Pro: 1M+ tokens |
| **Gemini Capabilities** | Text, images, video, audio |

---

## Prompt Engineering Tips

**Zero-shot**: "Summarize this."

**Few-shot**: Give 3-5 input/output examples

**Chain-of-Thought**: "Think step by step"

**Best Practices**:
- Be specific
- Provide context
- Specify output format
- Add constraints

---

## Common Mistakes to Avoid

- ❌ Fine-tuning for current data (use grounding)
- ❌ Fine-tuning for simple tasks (use prompting)
- ❌ Ignoring context window limits
- ❌ Not using grounding for factual accuracy
- ❌ Forgetting data privacy guarantees

---

## Decision Trees

### "Which customization?"
```
Simple task → Zero-shot
Custom format → Few-shot
Current data → Grounding
100+ examples → Fine-Tuning
```

### "Which component?"
```
Explore → Model Garden
Test → Vertex AI Studio
RAG → Vector Search
Compare → AutoSxS
```

### "Which model?"
```
Multimodal → Gemini
Long context → Gemini 1.5 Pro
Fast → Gemini Flash
Open-source → Llama/Mistral
Google open → Gemma
```

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

*Last Updated: 2026-02-05*
