---
title: "GCP-GAIL - Quick Refresher"
description: "Last-minute cram session for Generative AI Leader exam"
---

# GCP-GAIL: Last-Minute Refresher

[← Back to Overview](./index.md)

::: danger Final Review
This page is for the 15-minute "cram" session. Focus on the distinction between **Grounding** (accuracy) and **Tuning** (behavior).
:::

---

## 🏗️ Domain 1: Vertex AI Foundation (~30%)

### The Gemini Family
- **Gemini Ultra**: Largest, most capable model for highly complex reasoning and coding.
- **Gemini Pro**: Best-of-breadth; optimized for scaling across a wide range of text and video tasks.
- **Gemini Flash**: Optimized for speed and efficiency; ideal for high-volume, low-latency tasks.
- **Gemini Nano**: Designed for on-device efficiency (Android/Pixel).

### Core Parameters
| Parameter | Effect | Use Case |
|-----------|--------|----------|
| **Temperature** | Controls randomness | High (0.8+) for creative writing; Low (0.1) for technical data. |
| **Top-K** | Limits vocabulary to K words | Prevents the model from picking highly unlikely "long tail" words. |
| **Top-P** | Dynamic vocabulary based on probability | Samples from the smallest set of words whose cumulative probability is P. |

---

## 🎯 Decision Trees

### When to use RAG vs. Fine-Tuning?

```
Does the model need access to real-time or private data?
├─ Yes, and data changes daily → Use RAG (Vector Search + Grounding)
├─ Yes, but data is static and specialized → Use Fine-Tuning
└─ No, I just need a specific output format → Use Few-shot Prompting
```

### Choosing a Model Customization Path

```
What is the goal?
├─ Optimize for cost/latency? → Model Distillation
├─ Adopt a specific "voice" or persona? → Supervised Fine-Tuning (SFT)
└─ Prevent specific types of hallucinations? → Grounding with Google Search
```

---

## 🛡️ Responsible AI & Safety

### Safety Filters
Vertex AI provides adjustable thresholds for:
- **Hate Speech**
- **Harassment**
- **Sexually Explicit**
- **Dangerous Content**

**Exam Tip:** If a model refuses to answer a valid query, check if the **Safety Filter** thresholds are set too "Strict."

---

## 🔑 Key Acronyms

| Acronym | Full Form | Quick Definition |
|---------|-----------|------------------|
| **RAG** | Retrieval-Augmented Generation | Attaching a "database" to the LLM to give it facts. |
| **CoT** | Chain of Thought | Telling the model to "Think step-by-step." |
| **SFT** | Supervised Fine-Tuning | Training a model on specific prompt-response pairs. |
| **RLHF** | Reinforcement Learning from Human Feedback | Training based on human "thumbs up/down" preferences. |

---

::: tip You've Got This!
Trust your knowledge of the Vertex AI workflow: **Discover** (Model Garden) → **Experiment** (Studio) → **Customize** (Tuning/RAG) → **Deploy** (Endpoints). Good luck! 🍀
:::

[← Back to Overview](./index.md) | [Study Notes](./notes.md) | [Exam Tips](./exam-tips.md)