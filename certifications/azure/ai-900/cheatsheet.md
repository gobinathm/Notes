---
title: "AI-900 - Cheatsheet"
description: "One-page exam day reference for AI-900 Azure AI Fundamentals"
head:
  - - meta
    - name: keywords
      content: ai-900, cheatsheet, azure ai fundamentals, microsoft ai foundry, azure openai, quick reference, exam
---

# AI-900: Cheatsheet

[<- Overview](./index.md) | [Exam Guide ->](./exam-guide.md)

---

## Domain Weights

| Domain | Weight |
|---|---:|
| AI workloads and considerations | 15-20% |
| Machine learning on Azure | 15-20% |
| Computer vision workloads | 15-20% |
| NLP workloads | 15-20% |
| Generative AI workloads | 20-25% |

---

## Responsible AI

| Principle | Remember |
|---|---|
| **Fairness** | Avoid bias; evaluate across groups |
| **Reliability and safety** | Consistent, safe behavior under expected conditions |
| **Privacy and security** | Protect data, access, prompts, and outputs |
| **Inclusiveness** | Design for diverse users and accessibility needs |
| **Transparency** | Explain AI use, limits, and behavior |
| **Accountability** | Human ownership, review, audit, and escalation |

---

## ML Technique Lookup

| Scenario | Answer |
|---|---|
| Predict a numeric value | Regression |
| Predict a category or class | Classification |
| Find natural groupings without labels | Clustering |
| Learn complex image/audio/text patterns | Deep learning |
| Language models and attention | Transformer architecture |
| Input column used for prediction | Feature |
| Target value to predict | Label |
| Try multiple ML algorithms automatically | Automated ML |

---

## Vision Lookup

| Scenario | Answer |
|---|---|
| Assign label to entire image | Image classification |
| Locate objects in image | Object detection |
| Extract text from image | OCR |
| General image analysis/OCR | Azure AI Vision |
| Face-specific detection/analysis | Azure AI Face |

---

## NLP and Speech Lookup

| Scenario | Answer |
|---|---|
| Extract important terms | Key phrase extraction |
| Extract people, places, dates, quantities | Entity recognition |
| Determine positive/negative/neutral opinion | Sentiment analysis |
| Convert speech to text | Speech recognition |
| Convert text to speech | Speech synthesis |
| Convert between languages | Translation |
| Text analytics service | Azure AI Language |
| Speech input/output service | Azure AI Speech |

---

## Generative AI Lookup

| Scenario | Answer |
|---|---|
| Generate text, summaries, code, images | Generative AI |
| Ground answers in private/fresh data | RAG |
| Numeric representation for similarity | Embedding |
| Model can process multiple input types | Multimodal model |
| OpenAI models through Azure | Azure OpenAI Service |
| Build AI apps and manage model workflows | Azure AI Foundry |
| Discover and deploy models | Azure AI Foundry model catalog |

---

## Quick Decision Rules

**Input is image/video?**
-> Azure AI Vision, object detection, classification, OCR, or Face depending on output.

**Input is text?**
-> Azure AI Language for analytics, Azure OpenAI for generation, Translator for language conversion.

**Input/output is audio?**
-> Azure AI Speech.

**Need custom ML lifecycle?**
-> Azure Machine Learning.

**Need generative AI app platform?**
-> Azure AI Foundry.

**Need OpenAI models with Azure controls?**
-> Azure OpenAI Service.

---

## Retirement Reminder

AI-900 is retiring on **June 30, 2026**. If studying after that date, check AI-901: Azure AI Fundamentals instead.

---

[<- Overview](./index.md) | [Exam Guide ->](./exam-guide.md)
