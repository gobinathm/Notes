---
title: "GCP-GAIL - Study Notes"
description: "Comprehensive study notes for Generative AI Leader on Google Cloud"
---

# GCP-GAIL: Study Notes

[← Back to Overview](./index.md)

---

## Domain 1: Vertex AI Architecture

### Model Garden
The "App Store" for AI models. It includes:
- **First-party models**: Gemini, Imagen, Codey, Chirp.
- **Open-source models**: Llama, Mistral, Gemma (Google's open-weight model).
- **Third-party models**: Anthropic (Claude).

### Vertex AI Studio
A low-code environment for rapid prototyping.
- **Language**: Test prompts, adjust temperature, and export code to Python.
- **Vision**: Generate images (Imagen 2) or perform visual Q&A.
- **Speech**: Convert text to life-like speech or transcribe audio with Chirp.

---

## Domain 2: Data Implementation & RAG

### Embeddings
To perform RAG, you must convert text into numerical vectors. 
- **Service**: Vertex AI Embeddings API.
- **Analogy**: A library where books with similar themes are placed on the same shelf.

### Vertex AI Vector Search
Formerly known as Matching Engine.
- **Function**: A high-scale, low-latency database for searching through millions of embeddings.
- **Integration**: Essential for grounding LLMs in your own corporate data (PDFs, Databases).

---

## Domain 3: Model Customization Techniques

### 1. Prompt Design (Zero/Few-Shot)
- **Zero-shot**: "Summarize this." (No examples).
- **Few-shot**: Giving 3-5 examples of input/output to "show" the model what you want.

### 2. Supervised Fine-Tuning (SFT)
- **When to use**: When you have 100+ high-quality examples of how the model *should* behave.
- **Requirement**: A dataset stored in Cloud Storage in JSONL format.

### 3. Grounding
- **Definition**: Connecting the model to a verifiable source of truth.
- **Sources**: Google Search, BigQuery, or your own Document AI index.

---

## Domain 4: Operations (GenAIOps)

### Evaluation (AutoSxS)
- **Problem**: How do you know if Model A is better than Model B?
- **Solution**: **Vertex AI AutoSxS** (Automatic Side-by-Side). An objective "judge" model compares the outputs of two models based on your criteria.

### Deployment & Monitoring
- **Endpoints**: Models must be deployed to an Endpoint to be accessible via API.
- **Safety**: Monitoring for "Model Drift" or "Hallucination rates" over time.

---

## Quick Reference: Limits & Quotas

| Resource | Default Logic |
|----------|---------------|
| **Max Output Tokens** | Varies by model (e.g., 2048 or 8192). |
| **Context Window** | Gemini 1.5 Pro supports up to 1M+ tokens. |
| **Data Privacy** | **Google does not train foundation models on customer data.** |

---

[← Back to Overview](./index.md) | [Quick Refresher →](./quick-refresher.md)