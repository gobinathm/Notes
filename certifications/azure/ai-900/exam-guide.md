---
title: "AI-900 - Exam Guide"
description: "Keyword detection table, exam traps, and decision rules for the AI-900 Azure AI Fundamentals exam"
head:
  - - meta
    - name: keywords
      content: ai-900, exam guide, exam traps, azure ai fundamentals, microsoft ai foundry, azure openai, tips
---

# AI-900: Exam Guide

[<- Overview](./index.md) | [Cheatsheet ->](./cheatsheet.md)

---

## How the Exam Wants You to Think

AI-900 is a **fundamentals** exam. It checks whether you can recognize AI workloads, basic ML techniques, responsible AI principles, and Azure service fit.

### Answer Philosophy

1. **Identify the workload first**: vision, language, speech, document processing, ML, or generative AI.
2. **Pick the managed Azure service**: Azure AI Vision, Azure AI Language, Azure AI Speech, Azure Machine Learning, Azure AI Foundry, or Azure OpenAI.
3. **Apply responsible AI by default**: fairness, reliability, privacy, inclusiveness, transparency, and accountability are design requirements, not optional add-ons.

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---|---|
| "predict a number" / "forecast amount" | **Regression** |
| "predict a category" / "fraud or not fraud" | **Classification** |
| "group similar customers" / "no labels" | **Clustering** |
| "features and labels" | **Supervised learning dataset terms** |
| "train and deploy custom ML models" | **Azure Machine Learning** |
| "try many algorithms automatically" | **Automated ML** |
| "extract text from image" | **OCR / Azure AI Vision** |
| "draw boxes around objects" | **Object detection** |
| "find faces" | **Azure AI Face** |
| "important terms from text" | **Key phrase extraction** |
| "people, places, dates, organizations" | **Entity recognition** |
| "positive or negative feedback" | **Sentiment analysis** |
| "audio to text" | **Speech recognition / Azure AI Speech** |
| "text to audio" | **Speech synthesis / Azure AI Speech** |
| "translate between languages" | **Translation** |
| "generate answers, summaries, images, or code" | **Generative AI** |
| "ground answers in company documents" | **RAG with retrieval context** |
| "OpenAI models on Azure" | **Azure OpenAI Service** |
| "build AI apps and select models" | **Azure AI Foundry / model catalog** |

---

## Exam Traps

::: warning Watch out for these common mistakes!

- **Classification vs regression**: Classification predicts labels. Regression predicts numbers.
- **Classification vs object detection**: Image classification labels the image. Object detection locates objects with bounding boxes.
- **OCR vs document processing**: OCR reads text. Document processing extracts structured data like fields and tables.
- **Language vs Speech**: Azure AI Language handles text analytics. Azure AI Speech handles audio input/output.
- **RAG vs fine-tuning**: RAG retrieves fresh context at runtime. Fine-tuning changes model behavior through additional training examples.
- **Foundry vs Azure OpenAI**: Azure AI Foundry is the broader AI app platform. Azure OpenAI Service provides OpenAI model access in Azure.
- **Responsible AI keywords are literal**: Fairness, reliability, privacy, inclusiveness, transparency, and accountability are frequently tested by definition.
:::

---

## Decision Quick Reference

### Which ML technique?

```text
Numeric prediction              -> Regression
Category prediction             -> Classification
Discover natural groups         -> Clustering
Images, speech, text at scale   -> Deep learning
Language and generative AI      -> Transformer-based models
```

### Which Azure AI service?

```text
General image analysis or OCR   -> Azure AI Vision
Face-specific detection         -> Azure AI Face
Text analytics                  -> Azure AI Language
Speech to text / text to speech -> Azure AI Speech
Custom ML lifecycle             -> Azure Machine Learning
OpenAI models through Azure     -> Azure OpenAI Service
AI app/model platform           -> Azure AI Foundry
```

### Which responsible AI principle?

```text
Avoid bias across groups              -> Fairness
Perform consistently and safely       -> Reliability and safety
Protect data and access               -> Privacy and security
Serve diverse users and abilities     -> Inclusiveness
Explain use, limits, and behavior     -> Transparency
Define ownership and human oversight  -> Accountability
```

---

## Study Priority

| Priority | Why |
|---|---|
| **Generative AI workloads** | Highest domain weight at 20-25% |
| **Responsible AI principles** | Easy points if definitions are memorized |
| **ML technique matching** | Common fundamentals trap area |
| **Vision/NLP service matching** | Many scenario questions are service selection |

---

## Final Strategy

- Memorize the service mapping table before practice tests.
- Treat every scenario as "input -> desired output -> workload -> Azure service".
- Spend extra time on Domain 5 because generative AI carries the highest weight.
- Book before the June 30, 2026 retirement date only if Microsoft still offers AI-900 in your region and language.

---

[<- Overview](./index.md) | [Cheatsheet ->](./cheatsheet.md)
