---
title: "GCP-GAIL - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the GCP Generative AI Leader exam"
head:
  - - meta
    - name: keywords
      content: gcp-gail, exam guide, exam traps, tips, vertex ai, gemini
---

# Exam Guide & Traps

[← Domain 4](./domain-4.md) · [Cheatsheet →](./cheatsheet.md)

---

## Exam Traps

### Trap 1: Model Selection

Know which model for which scenario:

| If question mentions... | Think... |
|------------------------|----------|
| Multimodal (text + images + video) | **Gemini** |
| Longest context (1M+ tokens) | **Gemini 1.5 Pro** |
| Fast, low latency | **Gemini Flash** |
| Open-source | **Llama, Mistral** |
| Google's open-weight | **Gemma** |
| Third-party (Anthropic) | **Claude** |

### Trap 2: Customization Order

**Common mistake**: Jumping to fine-tuning when simpler methods work.

**Correct order:**
1. **Prompt Design** (zero-shot/few-shot) — try first
2. **Grounding/RAG** — need current data
3. **Fine-Tuning** — only if 100+ examples and above methods fail

Examples:
- ❌ "Fine-tune Gemini for current news"
- ✅ "Use grounding with Google Search"

- ❌ "Fine-tune for better formatting"
- ✅ "Use few-shot prompting with examples"

### Trap 3: Vertex AI Component Confusion

| Component | Purpose | When to Use |
|-----------|---------|-------------|
| **Model Garden** | Browse/select models | Exploring available models |
| **Vertex AI Studio** | Test prompts, adjust parameters | Rapid prototyping |
| **Vector Search** | High-scale embeddings search | RAG implementation |
| **AutoSxS** | Compare model outputs | Evaluating which model is better |

### Trap 4: Grounding vs Fine-Tuning

| Need | Solution |
|------|----------|
| Current events | **Grounding** (Google Search) |
| Company data | **Grounding** (BigQuery, Document AI) |
| Domain-specific behavior | **Fine-Tuning** (100+ examples) |
| Custom format | **Few-shot prompting** |

### Trap 5: Data Privacy

**Key facts** (exam favorites):
- ✅ Google **does not** train foundation models on customer data
- ✅ Data stays in **your GCP project**
- ✅ Respects **IAM permissions**
- ✅ Enterprise compliance (SOC 2, ISO 27001)

---

## Gen AI Leader Decision Matrix

Use this logic for scenario-based questions:

| Business Need | Recommended Solution |
| --- | --- |
| **"We need a prototype by tomorrow morning"** | **Google AI Studio** |
| **"We need to summarize private company PDFs"** | **RAG / Vertex AI Search** |
| **"We want to lower latency for a mobile app"** | **Gemini Nano / Model Distillation** |
| **"The model keeps making up facts"** | **Grounding with Google Search** |
| **"We need full MLOps and versioning"** | **Vertex AI Studio** |

## Decision Quick Reference

### "Which Vertex AI component?"

```
Explore models → Model Garden
Test prompts → Vertex AI Studio
Build RAG → Vector Search (Matching Engine)
Compare models → AutoSxS
Generate images → Imagen 2 (in Studio)
Speech tasks → Chirp
```

### "Which customization method?"

```
Simple task, no examples → Zero-shot prompting
Custom format, 3-5 examples → Few-shot prompting
Need current data → Grounding (Google Search)
Need company data → Grounding (BigQuery/Document AI)
Have 100+ examples → Supervised Fine-Tuning (SFT)
```

### "Which Gemini model?"

```
Complex reasoning, long docs → Gemini 1.5 Pro (1M+ context)
General tasks → Gemini Pro
Fast responses, low latency → Gemini Flash
Maximum capability → Gemini Ultra
```

### "How to implement RAG?"

```
1. Generate embeddings (Vertex AI Embeddings API)
2. Store in Vector Search (Matching Engine)
3. Retrieve similar documents
4. Ground LLM with retrieved context
```

---

## Exam Day Reminders

### Think Like This

**For Model Selection:**
- Multimodal? → Gemini
- Longest context? → Gemini 1.5 Pro (1M+)
- Open-source? → Llama, Mistral
- Google's open? → Gemma

**For Customization:**
- Always try: Prompt → Grounding → Fine-Tuning
- Current data? → Grounding
- 100+ examples? → Fine-Tuning

**For Vertex AI:**
- Browse models? → Model Garden
- Test prompts? → Vertex AI Studio
- RAG? → Vector Search
- Compare? → AutoSxS

**For Data Privacy:**
- Google does NOT train on your data
- Data stays in your project
- Respects IAM

---

## Common Question Patterns

### "What should you do first?"

**Always**: Start with simplest approach
1. Try zero-shot prompting
2. Try few-shot prompting
3. Try grounding/RAG
4. Only then fine-tune

### "How to reduce hallucinations?"

- ✅ Use grounding (Google Search, BigQuery)
- ✅ Implement safety filters
- ✅ Human review for critical tasks
- ✅ Provide factual context

### "How to evaluate models?"

- ✅ Use AutoSxS (Automatic Side-by-Side)
- ✅ Define evaluation criteria
- ✅ Let judge model compare outputs
- ✅ Measure against business metrics

---

[← Domain 4](./domain-4.md) · [Cheatsheet →](./cheatsheet.md)
