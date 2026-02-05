---
title: "Domain 1 - Vertex AI Architecture"
description: "GCP Gen AI Leader Domain 1: Model Garden, Vertex AI Studio, and platform overview"
head:
  - - meta
    - name: keywords
      content: gcp, gen ai leader, vertex ai, model garden
---

# Domain 1: Vertex AI Architecture

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

---

## Model Garden

The "App Store" for AI models. It includes:
- **First-party models**: Gemini, Imagen, Codey, Chirp
- **Open-source models**: Llama, Mistral, Gemma (Google's open-weight model)
- **Third-party models**: Anthropic (Claude)

<FlashcardDeck 
  title="Vertex AI Models"
  :cards="[
    {
      question: 'What is Model Garden?',
      answer: '<strong>The &quot;App Store&quot; for AI models</strong><br>Includes first-party (Gemini), open-source (Llama), and third-party (Claude) models<br>One-click deployment.'
    },
    {
      question: 'What is Gemini?',
      answer: '<strong>Google multimodal foundation model</strong><br>Processes text, images, video, audio<br>Available in different sizes (Ultra, Pro, Flash).'
    },
    {
      question: 'What is Gemma?',
      answer: '<strong>Google open-weight model</strong><br>Can be downloaded and run anywhere<br>Smaller, efficient alternative to Gemini.'
    }
  ]"
/>

---

## Vertex AI Studio

A low-code environment for rapid prototyping.

**Language**: Test prompts, adjust temperature, and export code to Python
**Vision**: Generate images (Imagen 2) or perform visual Q&A
**Speech**: Convert text to life-like speech or transcribe audio with Chirp

<FlashcardDeck 
  title="Vertex AI Studio"
  :cards="[
    {
      question: 'What is Vertex AI Studio?',
      answer: '<strong>Low-code environment for rapid prototyping</strong><br>Test prompts, adjust parameters, export code<br>Supports Language, Vision, and Speech.'
    },
    {
      question: 'What is Imagen 2?',
      answer: '<strong>Google image generation model</strong><br>Generate images from text descriptions<br>Available in Vertex AI Studio Vision tab.'
    },
    {
      question: 'What is Chirp?',
      answer: '<strong>Google speech model</strong><br>Text-to-speech and speech-to-text<br>Supports 100+ languages.'
    }
  ]"
/>

---

[← Overview](./index.md) · [Next Domain →](./domain-2.md)
