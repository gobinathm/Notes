---
title: "Domain 1 - Business Value of AI"
description: "AB-731 Domain 1: Generative AI concepts, business value, AND ROI thinking"
head:
  - - meta
    - name: keywords
      content: ab-731, domain 1, business value, roi, genai concepts
---

# Domain 1: Business Value of AI (35-40%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

---

## GenAI vs Traditional AI

| Traditional AI | Generative AI |
|----------------|---------------|
| Analyzes, classifies, predicts | Creates new content |
| Spam filter, fraud detection | Write emails, generate images |

## Key Terms

<FlashcardDeck 
  title="Key AI Terms"
  :cards="[
    {
      question: 'What affects output quality?',
      answer: '<strong>Prompt</strong>: The input you provide to the model directly affects the quality of the output.'
    },
    {
      question: 'What is a Token?',
      answer: '<strong>Text unit</strong>: The basic unit of text for an LLM (roughly 0.75 words). It affects cost and processing time.'
    },
    {
      question: 'What is Temperature?',
      answer: '<strong>Creativity control</strong>: Value between 0 and 1.<br>0 = Deterministic, predictable<br>1 = Creative, random'
    },
    {
      question: 'What is a Context Window?',
      answer: '<strong>Input + Output limit</strong>: The maximum amount of text (in tokens) that can be processed in a single request.'
    }
  ]"
/>

| Term | Remember |
|------|----------|
| Prompt | Input → affects output quality |
| Token | Text unit → affects cost |
| Context window | Input + output limit |
| Temperature | 0 = predictable, 1 = creative |

## Business Value Areas

- **Productivity**: Draft emails, summarize meetings, analyze data
- **Decision-making**: Faster insights from more data
- **Automation**: Handle routine tasks (FAQs, document processing)
- **Customer experience**: Personalized, faster responses

## ROI Thinking

**Costs**: Licensing, implementation, training, change management

**Value**: Time saved, costs reduced, revenue gained, risks avoided

::: warning Trap
Questions often ask about ROI. Include *all* value types, not just cost savings.
:::

---

## Model Customization Strategies

When the base model isn't enough, leaders must choose how to customize it.

| Strategy | Effort | Cost | Data Needs | Best Use Case |
|----------|---------|------|------------|---------------|
| **Prompt Engineering** | Low | Low | None | Controlling style, formatting, and simple tasks using instructions. |
| **RAG** (Retrieval-Augmented Generation) | Medium | Medium | Knowledge Base | **Grounding** the model in your latest business data/documents. |
| **Fine-tuning** | High | High | Labeled Dataset | Achieving a very specific style or deep domain expertise (rarely needed). |

**Strategic Rule of Thumb:** 
- Always start with **Prompt Engineering**.
- Move to **RAG** if the model needs to "know" specific business data.
- Only consider **Fine-tuning** if RAG and Prompts can't achieve the required tone or specialized format.
