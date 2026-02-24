---
title: "Domain 5: Implement NLP Solutions"
description: "Notes on Language Service, CLU, Custom Question Answering, Speech, and Translator for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, nlp, language service, clu, custom question answering, speech sdk, translator, intent recognition, named entity recognition
---

# Domain 5: Implement natural language processing solutions (15-20%)

[← Domain 4](./domain-4.md) · [Domain 6 →](./domain-6.md)

---

This domain covers analyzing text and speech using the **Azure AI Language** and **Azure AI Speech** services. At 15–20% of the exam, it ties with Domains 1 and 6 as the highest-weighted areas — prioritize it.

## 5.1 Language Service (Analyze Text)

### Pre-built Text Analytics Features

| Feature | What It Does | Exam Trigger Phrase |
|---------|-------------|---------------------|
| **Sentiment Analysis** | Returns positive/negative/neutral at document + sentence level | "customer feedback analysis", "sentiment per sentence" |
| **Key Phrase Extraction** | Identifies the main topics in a document | "summarize key topics" |
| **NER** | Extracts people, organizations, locations, dates | "extract entities from text" |
| **Entity Linking** | Disambiguates named entities using Wikipedia (e.g., "Mercury" → planet or element) | "resolve entity ambiguity" |
| **PII Detection** | Detects and can redact personal data (emails, SSN, phone numbers) | "remove sensitive data before storage" |
| **Language Detection** | Identifies the language of text | "detect language automatically" |

### Custom Language Models

| Model | Use Case | Training Data Needed |
|-------|---------|---------------------|
| **Custom NER** | Extract domain-specific entities (legal terms, medical codes) | Labeled examples with entity spans |
| **Custom Text Classification** | Categorize documents into your own labels | Labeled documents per category |

::: tip NER vs Entity Linking
**NER** → *identifies* entities and their type (Person, Location, etc.)
**Entity Linking** → *disambiguates* entities by connecting them to a known knowledge base entry. Both can be used together.
:::

---

## 5.2 Conversational Language Understanding (CLU)

CLU replaces the older LUIS service. It turns spoken or typed utterances into structured **intents + entities**.

### Core Concepts

| Concept | Definition | Example |
|---------|-----------|---------|
| **Utterance** | What the user says | "Set an alarm for 7am tomorrow" |
| **Intent** | The user's goal | `SetAlarm` |
| **Entity** | A parameter extracted from the utterance | `Time = 7am`, `Date = tomorrow` |
| **Confidence Score** | 0–1 probability that the model assigned the correct intent | Use threshold (e.g., > 0.7) to reject low-confidence calls |

### CLU Lifecycle

```
Design → Label utterances → Train → Test → Deploy → Consume via SDK/REST
```

- **Deployment slots**: Maintain separate `production` and `staging` deployments so you can test a new model version before promoting it.
- **Export/Import**: Model definition exported as JSON — useful for version control or migrating between projects.

::: warning CLU vs Custom QA
**CLU** → maps an utterance to an **intent + entities** (structured output). Use when your app needs to take action based on what the user wants.
**Custom QA** → matches a question to a **stored answer** (Q&A pair output). Use when your app needs to return information from a knowledge base.
:::

---

## 5.3 Custom Question Answering

Custom QA (formerly QnA Maker) builds a knowledge base of Q&A pairs and returns the best matching answer to a user question.

### Knowledge Base Sources

| Source Type | Example |
|-------------|---------|
| **URLs** | Public FAQ web pages, product documentation |
| **Files** | PDF manuals, Word documents, Excel/TSV Q&A spreadsheets |
| **Manual entry** | Directly authored Q&A pairs |

### Key Features

| Feature | What It Does |
|---------|-------------|
| **Multi-turn conversations** | Adds follow-up prompts to an answer (e.g., "Did that help?" → "Yes/No" branches) |
| **Alternate phrasing** | Add synonym questions to improve match rate |
| **Chit-chat** | Pre-built personality sets (Professional, Friendly, Witty) for small talk |
| **Active Learning** | Surfaces low-confidence questions for human review and improvement |
| **Confidence threshold** | Rejects answers below a set score — prevents wrong answers from being returned |

### Deployment

1. Create a project in **Language Studio** or **AI Foundry**
2. Add sources and label/edit Q&A pairs
3. Train and test
4. Deploy to a named endpoint
5. Consume via REST API (`POST /knowledgebases/{kbId}/generateAnswer`)

::: info Multi-turn Q&A
The exam phrase **"multi-turn Q&A from documents"** maps to **Custom Question Answering** — not CLU. CLU is for intent detection; Custom QA is for retrieving stored answers.
:::

---

## 5.4 Speech Services

### Core Capabilities

| Capability | Description | SDK Method |
|-----------|-------------|-----------|
| **Speech-to-Text (STT)** | Real-time or batch audio transcription | `SpeechRecognizer` |
| **Text-to-Speech (TTS)** | Synthesize neural voices with natural prosody | `SpeechSynthesizer` |
| **Speech Translation** | Real-time STT + translation in one pass | `TranslationRecognizer` |
| **Intent Recognition** | Detect CLU intents directly from spoken audio | `IntentRecognizer` with CLU model |
| **Keyword Recognition** | Local on-device detection of a wake word | `KeywordRecognizer` |

::: warning Intent Recognition vs Keyword Recognition
**Intent Recognition** → understands *what* the user wants (requires CLU model, cloud call).
**Keyword Recognition** → detects a specific *activation word* (e.g., "Hey Cortana") — runs locally on device, no cloud needed.

The exam uses "recognize spoken intent / commands" → **Intent Recognition + Speech SDK**.
The exam uses "wake word / offline activation" → **Keyword Recognition**.
:::

### Generative Speaking (GenAI Speaking)

Combines Azure OpenAI with Speech TTS to produce expressive, context-aware spoken responses — used in AI agents that speak to users in real-time.

### Batch Transcription

For large audio files that cannot be processed in real-time:
- Submit files stored in Azure Blob Storage
- Use an async pattern: submit → poll status → retrieve transcript
- Returns word-level timestamps and speaker diarization

---

## 5.5 Translator Service

| Feature | Description |
|---------|-------------|
| **Text Translation** | Translate text across 100+ languages in a single API call |
| **Transliterate** | Convert script without changing language (e.g., Japanese Kanji → Romaji) |
| **Detect** | Auto-detect the source language |
| **Dictionary Lookup** | Returns alternate translations and examples |
| **Document Translation** | Async translation of entire Word/PDF files, **preserving layout** |
| **Custom Translator** | Train a domain-specific translation model using parallel corpora (TMX/XLIFF files) |

::: tip Document Translation Pattern
Document Translation is async — submit → get `Operation-Location` header → poll until complete → download translated files. Same `202 → GET` pattern as the Read API and batch operations.
:::

---

<FlashcardDeck storage-key="ai-102-domain-5-cards" :cards="[
  { front: 'What is the difference between CLU and Custom Question Answering?', back: 'CLU maps utterances to intents + entities (structured action). Custom QA matches questions to stored answers (information retrieval). CLU = do something; Custom QA = know something.' },
  { front: 'What Language Service feature disambiguates \"Mercury\" as planet vs element?', back: 'Entity Linking — connects recognized entities to Wikipedia knowledge base entries to resolve ambiguity.' },
  { front: 'Name the CLU lifecycle stages in order.', back: 'Design → Label utterances → Train → Test → Deploy → Consume via SDK/REST.' },
  { front: 'What does a Custom QA confidence threshold do?', back: 'Rejects (or flags) answers whose match score falls below the threshold, preventing the service from returning wrong answers on poor matches.' },
  { front: 'What Speech SDK class detects a wake word locally on-device?', back: 'KeywordRecognizer — runs offline, no cloud needed. Different from IntentRecognizer which requires a CLU model and cloud call.' },
  { front: 'A question says \"translate entire Word file, preserve layout\". What service?', back: 'Document Translation (part of Translator Service) — async operation that preserves the original document layout.' },
  { front: 'What is Active Learning in Custom QA?', back: 'A feature that surfaces low-confidence questions for human review, allowing you to add alternate phrasings and improve accuracy over time.' },
  { front: 'How do you improve CLU accuracy for a new model version without disrupting production?', back: 'Deploy the new version to the staging slot, test it, then swap to the production slot when ready.' }
]" />

---

[← Domain 4](./domain-4.md) · [Domain 6 →](./domain-6.md)
