---
title: "AI-900 - Domain 1: AI Workloads and Considerations"
description: "Study notes for AI-900 Domain 1: Describe Artificial Intelligence workloads and considerations"
---

# Domain 1: AI Workloads and Considerations

[<- Overview](./index.md) | [Next Domain ->](./domain-2.md)

**Weight:** 15-20%

This domain tests whether you can identify common AI workloads and apply Microsoft's responsible AI principles to solution design.

---

## Common AI Workloads

| Workload | What It Does | Example |
|---|---|---|
| **Computer vision** | Interprets images and video | Detect defects in product photos, read text from images |
| **Natural language processing** | Understands or generates language | Analyze sentiment, extract entities, translate text |
| **Document processing** | Extracts data from documents | Pull invoice number, vendor, and totals from PDFs |
| **Generative AI** | Creates new content from prompts | Draft text, summarize documents, generate images, create code |

### Computer Vision

Use computer vision when the input is an **image or video** and the output is classification, detection, extracted text, or visual insight.

- **Image classification**: Assign a label to an image, such as "cat" or "damaged package".
- **Object detection**: Locate one or more objects with bounding boxes.
- **OCR**: Extract printed or handwritten text from images and scanned documents.
- **Face detection and analysis**: Detect faces and optionally analyze visible attributes where allowed by policy and regulation.

### Natural Language Processing

Use NLP when the input is **text or speech** and the goal is to understand, transform, classify, or generate language.

- **Key phrase extraction** identifies important phrases.
- **Entity recognition** identifies people, places, organizations, dates, quantities, and similar entities.
- **Sentiment analysis** determines whether text is positive, negative, neutral, or mixed.
- **Translation** converts text or speech between languages.
- **Speech recognition and synthesis** converts speech to text or text to speech.

### Document Processing

Document processing combines OCR with structured extraction. It is best for invoices, receipts, forms, IDs, contracts, and other documents where the goal is to extract fields, tables, or key-value pairs.

### Generative AI

Generative AI uses models that can create new content. Common outputs include text, images, summaries, answers, code, or structured data.

Generative AI is not the same as classic predictive ML. A classification model predicts a class; a generative model creates or transforms content.

---

## Responsible AI Principles

| Principle | Exam Meaning | Design Signal |
|---|---|---|
| **Fairness** | AI systems should treat people equitably | Test for bias across groups and data slices |
| **Reliability and safety** | AI systems should perform consistently and safely | Validate outputs, monitor failures, use human review for high-risk decisions |
| **Privacy and security** | AI systems should protect data and resist misuse | Minimize data collection, secure access, protect prompts and outputs |
| **Inclusiveness** | AI should work for people with different abilities and needs | Design for accessibility and diverse user populations |
| **Transparency** | Users should understand what the system can and cannot do | Disclose AI use, explain limitations, cite sources where possible |
| **Accountability** | People remain responsible for AI systems | Define ownership, audit results, support escalation and override |

### Fairness

Fairness questions often involve biased training data, uneven accuracy across demographic groups, or systems that disadvantage a group of users. The safest answer usually involves measuring outcomes across groups and improving data or evaluation before deployment.

### Reliability and Safety

Reliability is about consistent behavior. Safety is about preventing harm. For high-impact use cases, use testing, monitoring, fallback paths, and human oversight.

### Privacy and Security

Privacy and security cover data protection, access control, encryption, consent, retention, and preventing sensitive information from leaking through model prompts or outputs.

### Inclusiveness

Inclusive systems work across different languages, abilities, devices, and contexts. Accessibility and diverse user testing are common signals.

### Transparency

Transparency means users know when AI is being used and understand limitations. In generative AI scenarios, transparency can also include source grounding and confidence communication.

### Accountability

AI systems do not remove human responsibility. An accountable design has owners, review processes, monitoring, documentation, and a path to correct bad outcomes.

---

## Exam Traps

- **Object detection vs classification**: Classification labels the whole image; object detection finds instances and returns locations.
- **Document processing vs OCR**: OCR extracts text; document processing extracts structured fields and tables from documents.
- **Responsible AI is not one control**: Bias, privacy, and safety require process, data, testing, and governance.
- **Generative AI can hallucinate**: Grounding, evaluation, content filters, and human review reduce risk but do not guarantee correctness.

### Flashcards

<FlashcardDeck
  storage-key="ai-900-domain-1-cards"
  :cards="[
    {
      question: 'Which AI workload extracts text from scanned images?',
      answer: 'Optical character recognition (OCR), a computer vision capability.'
    },
    {
      question: 'Which responsible AI principle focuses on equitable treatment across user groups?',
      answer: 'Fairness.'
    },
    {
      question: 'What is the difference between image classification and object detection?',
      answer: 'Image classification labels the whole image; object detection identifies object instances and their locations.'
    },
    {
      question: 'Which principle keeps humans responsible for AI system outcomes?',
      answer: 'Accountability.'
    }
  ]"
/>

---

[<- Overview](./index.md) | [Next Domain ->](./domain-2.md)
