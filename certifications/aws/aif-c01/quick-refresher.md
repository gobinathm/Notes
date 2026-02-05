---
title: "AIF-C01 - Quick Refresher"
description: "Last-minute cram session for AIF-C01 AWS AI Practitioner exam"
---

# AIF-C01: Quick Refresher

[← Back to Overview](./index.md)

::: danger Final Review
This page is designed for the final "cram" session before stepping into the **AIF-C01** exam.
:::

---

## 🏗️ Domain 1: AI/ML Fundamentals (20%)

### AI vs. ML vs. DL

* **AI:** Broadest category (mimicking human intelligence).
* **ML:** Learning from data without explicit rules.
* **Deep Learning (DL):** Multi-layered neural networks (mimics brain).

### Learning Types

* **Supervised:** Uses **labeled** data (e.g., house price prediction).
* **Unsupervised:** Uses **unlabeled** data (e.g., customer clustering).
* **Reinforcement:** Learns via **rewards/penalties** (e.g., AWS DeepRacer).

### The ML Pipeline

1. Business Goal ➡️ 2. Data Prep ➡️ 3. Model Training ➡️ 4. Evaluation ➡️ 5. Deployment (Inference) ➡️ 6. Monitoring.

### Inference Types

* **Real-time:** Low latency, immediate (e.g., fraud check at checkout).
* **Batch:** High volume, delayed (e.g., generating monthly recommendations).

---

## ✨ Domain 2 & 3: Generative AI & Foundation Models (52%)

### Foundation Models (FMs)

Huge models pre-trained on massive data; multi-purpose.

### Key GenAI Concepts

* **Tokens:** Units of text (not always full words).
* **Hallucination:** Confidently wrong output.
* **Temperature:** Creativity setting (0 = predictable, 1 = creative).

### Model Customization

* **Prompt Engineering:** Designing better inputs (Zero-shot, Few-shot).
* **RAG (Retrieval-Augmented Generation):** Connecting the model to **external data** (Vector DB) for up-to-date, private info.
* **Fine-tuning:** Re-training the model on specific data to change its weight/behavior.

### Evaluation Metrics

* **ROUGE/BLEU:** Measures text similarity (mostly for summarization/translation).

---

## 🛠️ AWS Services Comparison (The "Which Tool" Section)

| Service | Primary Use Case |
|---------|------------------|
| **Amazon Bedrock** | **API-based** access to Foundation Models (Claude, Llama, Titan). Fastest for GenAI. |
| **Amazon SageMaker** | The "Kitchen Sink." Full control over building, training, and deploying **custom** models. |
| **Amazon Q** | AI-powered assistant for businesses (Q Business) or developers (Q Developer). |
| **Rekognition** | Computer Vision (image/video analysis). |
| **Polly / Transcribe** | Text-to-Speech (Polly) / Speech-to-Text (Transcribe). |
| **Comprehend** | Natural Language Processing (sentiment analysis, entity extraction). |
| **Lex** | Building conversational bots (chatbots). |

---

## 🛡️ Domain 4 & 5: Security & Responsible AI (28%)

### Responsible AI Pillars

Fairness, Explainability, Privacy, Robustness, Governance.

### AWS Tools for Responsibility

* **SageMaker Clarify:** Detects **bias** and provides model **explainability**.
* **Bedrock Guardrails:** Filters out harmful content or PII from LLM responses.
* **Amazon A2I:** Adds a "Human-in-the-loop" for reviewing low-confidence predictions.

### Security & Compliance

* **Shared Responsibility:** AWS secures the "of" (hardware), You secure the "in" (data/settings).
* **Data Privacy:** Bedrock does **not** use customer data to train its base models.
* **Governance:** **Model Cards** (documentation) and **AI Service Cards** provide transparency.

---

## 🎯 Bedrock vs SageMaker Quick Decision Tree

```
Need to use AI/ML?
├─ Want pre-built models via API?
│  ├─ GenAI/LLMs? → Amazon Bedrock ⭐
│  └─ Specific tasks? → AI Services (Rekognition, Comprehend, etc.)
│
└─ Want to build/train custom models?
   └─ Full ML lifecycle control? → SageMaker ⭐
```

### When to Choose Bedrock

- ✅ Need LLMs quickly (no training)
- ✅ Text/Chat generation
- ✅ API-first approach
- ✅ Multi-model access (Claude, Llama, Titan)
- ✅ RAG implementation
- ✅ Quick prototyping

### When to Choose SageMaker

- ✅ Custom model training
- ✅ Full control over ML pipeline
- ✅ Data science workflows
- ✅ Model monitoring & drift detection
- ✅ Specialized use cases
- ✅ MLOps requirements

---

## 🔑 Key Acronyms to Know

| Acronym | Full Form | Quick Definition |
|---------|-----------|------------------|
| **FM** | Foundation Model | Large pre-trained model |
| **LLM** | Large Language Model | Text-focused foundation model |
| **RAG** | Retrieval-Augmented Generation | Connect LLM to external data |
| **A2I** | Amazon Augmented AI | Human review workflows |
| **MLOps** | ML Operations | DevOps for ML models |
| **PII** | Personally Identifiable Information | Sensitive personal data |
| **ROUGE** | Recall-Oriented Understudy for Gisting Evaluation | Text similarity metric |

---

## 💡 Final Minute Tips

### Service Selection Rules

1. **If the question asks for "Easy/No-Code/API":** Think **Bedrock** or High-level AI services (Rekognition, Polly).
2. **If the question asks for "Full Control/Data Scientist":** Think **SageMaker**.
3. **If the question asks about "Bias":** Think **SageMaker Clarify**.
4. **If the question asks about "External Knowledge/Real-time data":** Think **RAG** or **Knowledge Bases for Bedrock**.

### Common Exam Traps

::: warning Watch Out!
- **Bedrock ≠ Training:** Bedrock uses pre-trained models only
- **Hallucinations:** LLMs can be confidently wrong - use RAG or guardrails
- **Temperature:** Higher = creative but less accurate
- **Fine-tuning ≠ Prompt Engineering:** Fine-tuning changes the model; prompting doesn't
- **Shared Responsibility:** You're responsible for data, AWS handles infrastructure
:::

---

## 📊 Model Selection Quick Guide

### For Text Tasks

| Task | Best Service | Why |
|------|--------------|-----|
| Chat/Conversation | Bedrock (Claude) | Natural dialogue |
| Code Generation | Bedrock (Claude/CodeWhisperer) | Optimized for code |
| Summarization | Bedrock (Titan/Claude) | Fast, accurate |
| Translation | Translate (simple) / Bedrock (complex) | Cost vs capability |
| Sentiment | Comprehend | Purpose-built |

### For Vision Tasks

| Task | Best Service | Why |
|------|--------------|-----|
| Object Detection | Rekognition | Pre-built, easy |
| Face Analysis | Rekognition | Specialized |
| Custom Vision | SageMaker | Full control |
| Medical Imaging | SageMaker | Compliance needs |

---

## 🎓 Responsible AI Quick Checks

### Before Deployment Checklist

- [ ] **Fairness:** Does model work equally for all groups?
- [ ] **Explainability:** Can you explain decisions?
- [ ] **Privacy:** Is sensitive data protected?
- [ ] **Safety:** Are guardrails in place?
- [ ] **Transparency:** Is model documented?
- [ ] **Monitoring:** Is drift detection enabled?

### Key Questions to Answer

**Is there bias?** → Use **SageMaker Clarify**
**Need human review?** → Use **Amazon A2I**
**Filter harmful output?** → Use **Bedrock Guardrails**
**Track model performance?** → Use **SageMaker Model Monitor**

---

## 🚀 RAG Implementation Quick Reference

### Components

```
User Query
    ↓
1. Embedding Model (convert query to vector)
    ↓
2. Vector Database (find similar documents)
    ↓
3. Retrieved Context + Query
    ↓
4. LLM (generate answer with context)
    ↓
Answer with Sources
```

### AWS RAG Stack

- **Vector DB:** OpenSearch, Bedrock Knowledge Bases
- **Embeddings:** Bedrock Titan Embeddings
- **LLM:** Bedrock (Claude, Llama)
- **Storage:** S3 (documents)

---

## 🎬 Additional Resources

### Essential Video

[Watch this AWS Certified AI Practitioner Exam Guide](https://www.youtube.com/watch?v=XR_nwf3Ez_w)

This video provides a direct comparison between the two heavy-hitters of the exam—Bedrock and SageMaker—helping you decide which service fits specific exam scenarios.

---

## ⚡ Last 5 Minutes Before Exam

### Must Remember

1. **Bedrock = API access to FMs** (no training)
2. **SageMaker = Full ML lifecycle** (build/train/deploy)
3. **RAG = External knowledge** for LLMs
4. **Clarify = Bias detection** and explainability
5. **Shared Responsibility = AWS hardware, You data**

### Quick Mental Check

- Can you explain AI vs ML vs DL? ✓
- Do you know when to use Bedrock vs SageMaker? ✓
- Can you describe RAG in one sentence? ✓
- Do you know the 6 Responsible AI principles? ✓
- Can you name 3 AI services besides Bedrock/SageMaker? ✓

---

::: tip You've Got This!
Take a deep breath. You've studied. Trust your preparation. Good luck! 🍀
:::

[← Back to Overview](./index.md) | [Study Notes](./domain-1.md) | [Exam Tips](./exam-tips.md)

*Last Updated: 2026-01-14*
