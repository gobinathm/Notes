---
title: "AI-102 Cheatsheet"
description: "Quick reference for AI-102 Azure AI Engineer Associate exam"
---

# AI-102 Cheatsheet

## Azure AI Services Resources

| Resource Type | Scope | Use Case |
| :--- | :--- | :--- |
| **Multi-Service** | Multiple services (Vision, Language, Content Safety) | Simplifies management, single key/endpoint. Good for dev/test. |
| **Single-Service** | Specific service (e.g., Face, Speech) | Granular access control, detailed cost tracking, specific features (e.g., free tier availability). |

## Security & Privacy

- **Managed Identity**: Preferred over keys. Use RBAC roles (e.g., *Cognitive Services User*).
- **VNETs & Private Endpoints**: Restrict network access.
  - **Service Tags**: `CognitiveServicesManagement` for management traffic.
- **Customer Managed Keys (CMK)**: Store in **Key Vault**.
- **Data Privacy**: Azure AI generally *does not* store customer data for training (except for specific opt-in scenarios or custom models requiring storage).

## Computer Vision

- **Image Analysis 4.0**: One API for tagging, OCR (Read), captioning, dense captions, objects.
- **OCR (Read API)**:
  - **Read**: Optimized for text-heavy documents, PDF, TIFF. Async operation (202 Accepted -> `operation-location` header -> GET results).
- **Custom Vision**:
  - **Classification**: "Is this a dog?" (Single or Multi-label).
  - **Detection**: "Where is the dog?" (Bounding box).
  - **IoT Edge**: Export models to Docker/Edge devices.

## Natural Language Processing (Language Service)

- **CLU (Conversational Language Understanding)**: Replacement for LUIS.
  - **Utterance**: What user says.
  - **Intent**: What user wants.
  - **Entity**: Specific data in utterance.
- **KPIs**:
  - **Precision**: % of predicted positives that were correct.
  - **Recall**: % of actual positives that were identified.
  - **F1 Score**: Harmonic mean of Precision and Recall.
- **Translator**:
  - **Translate**: Text-to-text.
  - **Transliterate**: Script-to-script (e.g., Japanese Kana to Romaji).
  - **Manage Dictionary**: Custom translations.

## Azure OpenAI Service

- **Models**:
  - **GPT-4o/GPT-4**: Complex reasoning, chat.
  - **GPT-3.5 Turbo**: Fast, cost-effective chat.
  - **Embeddings**: Search, clustering, semantic similarity.
  - **DALL-E**: Image generation.
- **Parameters**:
  - **Temperature**: Randomness (0 = deterministic, 1 = creative).
  - **Top P**: Nucleus sampling (consider top P% mass).
  - **Frequency Penalty**: Penalize existing tokens (reduce repetition).
  - **Presence Penalty**: Penalize if token appeared at all (encourage new topics).

## Document Intelligence (formerly Form Recognizer)

- **Prebuilt Models**: ID, Invoice, Receipt, W-2, Business Card.
- **Custom Models**:
  - **Template (Fixed)**: Structured forms.
  - **Neural**: Unstructured documents.
- **Composed Model**: Combine multiple custom models into one ID (up to 100/200).

## Knowledge Mining (Azure AI Search)

- **Enrichment Pipeline**: Data Source -> Indexer -> Skillset -> Index.
- **Skillset**: Collection of AI skills (OCR, Entity Extraction, Translation).
- **Knowledge Store**: Project enrichment results to Storage (Table/Blob) for analytics (Power BI).
- **Semantic Search**: Re-ranks results based on user intent, not just keywords.
