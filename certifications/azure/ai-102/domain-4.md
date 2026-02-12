---
title: "Domain 4: NLP Solutions"
description: "Notes on Language Service, Speech, and Translation"
---

# Domain 4: Implement Natural Language Processing (NLP) Solutions (30-35%)

## 4.1 Analyze Text (Language Service)

### Key Features
- **Sentiment Analysis**: Positive, Negative, Neutral scores (0-1).
- **Key Phrase Extraction**: Identify main points.
- **Entity Linking**: Link entities to Wikipedia (e.g., "Mars" -> Planet vs God).
- **PII Detection**: Redact emails, phone numbers, SSN.
- **Detect Language**: Identify the language code (e.g., `en`, `es`).

### Custom Text Analytics
- **Custom NER (Named Entity Recognition)**: Train on domain-specific entities (e.g., medical drugs, auto parts).
- **Custom Text Classification**: Classify documents into custom categories (e.g., "Legal", "Finance").

## 4.2 Conversational Language Understanding (CLU)

### Core Concepts
- **Utterance**: What the user says ("Book a flight to London").
- **Intent**: What they want to do (`BookFlight`).
- **Entity**: Parameters (`Destination=London`).

### Workflow
1.  **Define Schema**: Create intents and entities.
2.  **Label Utterances**: Provide examples.
3.  **Train**: Build model.
4.  **Test**: Evaluate with test set.
5.  **Publish**: Deploy to an endpoint for prediction.

## 4.3 Speech Services

### Speech-to-Text (STT)
- **Real-time**: Streaming audio transcription.
- **Batch**: Transcribe large audio files (async).
- **Custom Speech**: Train on specific vocabularies (e.g., medical terms, accents).

### Text-to-Speech (TTS)
- **Neural Voices**: Human-like prosody and intonation.
- **SSML (Speech Synthesis Markup Language)**: Control pitch, rate, pauses, pronunciation.
- **Custom Neural Voice**: Create a brand voice (requires strict approval).

## 4.4 Translation

### Translator Service
- **Text Translation**: Translate strings, HTML, documents.
- **Document Translation**: Preserves formatting (Word, PDF, Excel).
- **Custom Translator**: Train on parallel documents (TMX) to learn industry jargon.
