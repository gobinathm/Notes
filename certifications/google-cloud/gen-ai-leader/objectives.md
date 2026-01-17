---
title: "GCP-GAIL - Exam Objectives"
description: "Official exam objectives for Google Cloud Generative AI Leader certification"
---

# GCP-GAIL: Exam Objectives

## Key Resource Links

| Resource | Description |
|----------|-------------|
| **[Official Exam Guide](https://cloud.google.com/learn/certification/generative-ai-leader)** | Lists the four domains: Fundamentals, Offerings, Techniques, and Business Strategy |
| **[Official Learning Path](https://www.cloudskillsboost.google/paths/118)** | Free Skills Boost course series (~8 hours) specifically for the Leader exam |
| **[Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)** | Product details - difference between Vertex AI Studio and Google AI Studio |

---

## Exam Weighting

| Domain | Weight | Focus Areas |
|--------|--------|-------------|
| Domain 1: Vertex AI Foundation | ~30% | Model Garden, Studio, API integration, model selection |
| Domain 2: Prompt Engineering | ~25% | Few-shot, CoT, parameters (Temperature, Top-K, Top-P) |
| Domain 3: Data & Customization | ~25% | RAG, Vector Search, Fine-tuning, Grounding |
| Domain 4: Responsible AI & Ops | ~20% | Safety filters, evaluation, monitoring, bias mitigation |

---

## In-Scope Services & Technologies

### Gemini Model Family
- **Gemini Ultra**: Most capable, complex reasoning and coding
- **Gemini Pro**: General purpose, balanced performance
- **Gemini Flash**: Speed optimized, high-throughput
- **Gemini Nano**: On-device, mobile/edge deployment

### Generative AI Studio
- **Language**: Text generation, chat, code (Codey)
- **Vision**: Image generation (Imagen), visual Q&A
- **Speech**: Speech-to-Text (Chirp), Text-to-Speech

### Model Garden
- **First-party**: Gemini, Imagen, Codey, Chirp
- **Open-source**: Llama, Mistral, Gemma
- **Third-party**: Claude (Anthropic)

### Model Customization
- **Prompt Design**: Zero-shot, few-shot, chain of thought
- **Fine-tuning (SFT)**: Supervised fine-tuning with JSONL datasets
- **Distillation**: Creating smaller models from larger ones
- **Grounding**: Google Search, custom data sources

### RAG & Data Infrastructure
- **Vertex AI Vector Search**: High-scale embedding search (formerly Matching Engine)
- **Embeddings API**: Text/image to vector conversion
- **Document AI**: Document parsing and extraction
- **BigQuery ML**: In-warehouse inference

### Operations & Evaluation
- **AutoSxS**: Side-by-side model comparison
- **Model Monitoring**: Drift detection, performance tracking
- **Safety Filters**: Configurable content filtering thresholds
- **Endpoints**: Model deployment and serving

---

## Study Progress

<ProgressTracker
  title="GCP-GAIL Study Progress"
  storage-key="gcp-gail-objectives-progress"
  :items="[
    { id: 'objectives', label: 'Reviewed exam objectives' },
    { id: 'notes', label: 'Completed study notes' },
    { id: 'exam-tips', label: 'Reviewed exam tips' },
    { id: 'vertex-ai', label: 'Hands-on with Vertex AI Studio' },
    { id: 'ready', label: 'Ready for certification' }
  ]"
/>

---

[← Back to Overview](./index.md) | [Study Notes →](./notes.md) | [Exam Tips →](./exam-tips.md)
