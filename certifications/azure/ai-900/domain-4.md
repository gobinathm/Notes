---
title: "AI-900 - Domain 4: NLP Workloads"
description: "Study notes for AI-900 Domain 4: Describe features of Natural Language Processing workloads on Azure"
---

# Domain 4: Natural Language Processing Workloads on Azure

[<- Previous Domain](./domain-3.md) | [Overview](./index.md) | [Next Domain ->](./domain-5.md)

**Weight:** 15-20%

This domain tests whether you can identify common NLP scenarios and match them to Azure AI Language and Azure AI Speech capabilities.

---

## Common NLP Workload Scenarios

| Scenario | What It Does | Example |
|---|---|---|
| **Key phrase extraction** | Finds main concepts in text | Extract "delivery delay" from support feedback |
| **Entity recognition** | Finds named entities | Person, organization, location, date, quantity |
| **Sentiment analysis** | Detects sentiment in text | Positive, negative, neutral, or mixed feedback |
| **Language modeling** | Understands or generates language patterns | Summarization, completion, classification, Q&A |
| **Speech recognition** | Converts speech to text | Transcribe a call recording |
| **Speech synthesis** | Converts text to speech | Read an answer aloud |
| **Translation** | Converts text or speech between languages | Translate English to French |

### Key Phrase Extraction

Key phrase extraction identifies important terms and phrases from text. Use it to summarize themes from reviews, tickets, survey responses, or documents.

### Entity Recognition

Entity recognition extracts structured items from text. Named entity recognition can identify entities such as people, organizations, locations, dates, and quantities.

### Sentiment Analysis

Sentiment analysis classifies opinion in text. Use it when the scenario asks whether customer feedback is positive, negative, neutral, or mixed.

### Language Modeling

Language modeling is broader than a single NLP feature. It supports language understanding and generation tasks such as summarization, question answering, classification, and content generation.

### Speech Recognition and Synthesis

- **Speech recognition**: speech to text.
- **Speech synthesis**: text to speech.

If a scenario starts with audio and needs text, choose speech recognition. If it starts with text and needs audio, choose speech synthesis.

### Translation

Translation converts content between languages. Some scenarios involve text translation; others involve speech translation.

---

## Azure Tools and Services

### Azure AI Language

Azure AI Language supports text analytics and language understanding features such as:

- Key phrase extraction.
- Entity recognition.
- Sentiment analysis.
- Language detection.
- Question answering and conversation-oriented language understanding scenarios.

### Azure AI Speech

Azure AI Speech supports speech workloads such as:

- Speech to text.
- Text to speech.
- Speech translation.
- Custom speech scenarios.

---

## Decision Rules

```text
Find important phrases in feedback       -> Key phrase extraction
Find people, places, dates, quantities   -> Entity recognition
Detect positive/negative/neutral tone    -> Sentiment analysis
Audio to written text                    -> Speech recognition
Written text to audio                    -> Speech synthesis
Convert language A to language B         -> Translation
Text analytics and language features     -> Azure AI Language
Speech input/output                      -> Azure AI Speech
```

---

## Exam Traps

- **Speech is not the same as Language**: Audio input/output maps to Azure AI Speech; text analytics maps to Azure AI Language.
- **Entity recognition vs key phrases**: Entities are typed items; key phrases are important concepts.
- **Sentiment is opinion**: Sentiment analysis is not entity extraction or summarization.
- **Translation can be text or speech**: Read the input and output format before choosing a service.

### Flashcards

<FlashcardDeck
  storage-key="ai-900-domain-4-cards"
  :cards="[
    {
      question: 'Which NLP feature identifies people, locations, and dates in text?',
      answer: 'Entity recognition.'
    },
    {
      question: 'Which Azure service converts speech to text?',
      answer: 'Azure AI Speech.'
    },
    {
      question: 'Which feature detects whether feedback is positive or negative?',
      answer: 'Sentiment analysis.'
    },
    {
      question: 'Which Azure service provides key phrase extraction and sentiment analysis?',
      answer: 'Azure AI Language.'
    }
  ]"
/>

---

[<- Previous Domain](./domain-3.md) | [Overview](./index.md) | [Next Domain ->](./domain-5.md)
