---
title: "AI-102 Exam Guide"
description: "Detailed breakdown of the AI-102 exam domains"
---

# AI-102 Exam Skills Outline

## Domain 1: Plan and Manage an Azure AI Solution (15-20%)

### Select and Deploy Resources
- Choose between **Multi-Service** resources and **Single-Service** resources.
- Create resources using Azure Portal, CLI, or ARM/Bicep.
- Manage costs and billing (Free tier vs Standard).

### Manage Security and Monitoring
- Implement **Managed Identities** to avoid key management.
- Configure **Virtual Networks (VNETs)** and **Private Endpoints**.
- Rotate keys using **Key Vault**.
- Configure **Diagnostic Settings** to send logs to **Log Analytics**.
- Define RBAC roles describing least privilege access.

---

## Domain 2: Implement Content Moderation (10-15%)

### Text and Image Moderation
- Use **Azure AI Content Safety**.
- Detect hate, violence, self-harm, and sexual content.
- Implement **Blocklists** for specific terms.
- Manage severity thresholds (Low, Medium, High).

---

## Domain 3: Computer Vision Solutions (15-20%)

### Image Analysis
- Use the **Image Analysis 4.0 API**.
- Extract tags, captions, and objects.
- Perform **OCR (Optical Character Recognition)** on images and PDFs.

### Custom Vision
- Provision Custom Vision training and prediction resources.
- Label data and train models (Classification and Object Detection).
- Evaluate model performance (Precision, Recall, mAP).
- Publish and export models (e.g., to Docker/IoT Edge).

### Face Analysis
- Detect faces and attributes (blur, exposure, accessories).
- Implement Face Verification (1:1) and Identification (1:N).
- *Note: Emotion detection and other sensitive attributes are retired.*

---

## Domain 4: Natural Language Processing (30-35%)

### Language Service
- Extract **Key Phrases** and **Named Entities (NER)**.
- Analyze **Sentiment** and **PII (Personally Identifiable Information)**.
- Build **Custom NER** projects.

### Conversational Language Understanding (CLU)
- Design schema: Utterances, Entities, Intents.
- Train, test, and publish CLU applications.
- Version management and deployment slots.

### Speech Services
- Implement **Speech-to-Text** (Real-time and Batch).
- Implement **Text-to-Speech** (Neural voices, SSML).
- Identify speakers (Speaker Recognition).

---

## Domain 5: Generative AI Solutions (15-20%)

### Azure OpenAI Service
- Provision and deploy models.
- Use **Chat Completions API**.
- Configure parameters (`temperature`, `top_p`, `max_tokens`).
- Implement **Function Calling**.
- Apply **Content Filters** for safety.

### RAG (Retrieval Augmented Generation)
- Connect Azure OpenAI to data sources (Azure AI Search, Blob Storage).
- Index data for retrieval.

---

## Domain 6: Document Intelligence & Mining (10-15%)

### Document Intelligence
- Use **Prebuilt Models** (Invoice, Receipt, ID Card).
- Train **Custom Models** (template-based vs neural).
- Compose models for complex scenarios.

### Knowledge Mining (AI Search)
- Configure **Indexers** to pull data.
- Define **Skillsets** to enrich data (OCR, Entity Extraction).
- Query using **Vector Search** and **Semantic Ranking**.
