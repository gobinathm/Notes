---
title: "Domain 3 - Model Customization"
description: "GCP Gen AI Leader Domain 3: Prompt design, fine-tuning, and grounding techniques"
head:
  - - meta
    - name: keywords
      content: gcp, gen ai leader, prompt engineering, fine-tuning, grounding
---

# Domain 3: Model Customization Techniques

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)

---

<FlashcardDeck 
  title="Customization Techniques"
  :cards="[
    {
      question: 'What is Zero-Shot prompting?',
      answer: '<strong>No examples provided</strong><br>Example: &quot;Summarize this.&quot;<br>Works for common tasks.'
    },
    {
      question: 'What is Few-Shot prompting?',
      answer: '<strong>Give 3-5 examples of input/output</strong><br>Shows the model what you want<br>Best for custom formats or specific styles.'
    },
    {
      question: 'When to use Supervised Fine-Tuning?',
      answer: '<strong>When you have 100+ high-quality examples</strong><br>Requirement: Dataset in Cloud Storage (JSONL format)<br>Model learns specific behavior patterns.'
    },
    {
      question: 'What is Grounding in Vertex AI?',
      answer: '<strong>Connecting model to verifiable source of truth</strong><br>Sources: Google Search, BigQuery, Document AI<br>Reduces hallucinations with factual data.'
    }
  ]"
/>

## 1. Prompt Design (Zero/Few-Shot)

- **Zero-shot**: "Summarize this." (No examples)
- **Few-shot**: Giving 3-5 examples of input/output to "show" the model what you want

---

## 2. Supervised Fine-Tuning (SFT)

- **When to use**: When you have 100+ high-quality examples of how the model *should* behave
- **Requirement**: A dataset stored in Cloud Storage in JSONL format

---

## 3. Grounding

- **Definition**: Connecting the model to a verifiable source of truth
- **Sources**: Google Search, BigQuery, or your own Document AI index

---

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)
