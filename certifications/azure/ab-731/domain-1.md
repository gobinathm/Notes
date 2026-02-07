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

::: tip Exam Tip
The AB-731 exam is for **Business Leaders**, not developers. When in doubt, choose the answer that focuses on **Strategy, ROI, and Governance** over technical implementation or coding.
:::

---

## GenAI vs Traditional AI

| Traditional AI | Generative AI |
|----------------|---------------|
| Analyzes, classifies, predicts | Creates new content |
| Spam filter, fraud detection | Write emails, generate images |

## Foundation vs Specialized Models

- **Foundation Models**: Large, generic models (like GPT-4o) pre-trained on massive data. They "know everything" generally.
- **Specialized Models**: Models fine-tuned for a specific task (e.g., medical diagnosis, legal coding). They are more efficient for niche tasks.

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

::: danger Critical
**Tokens** are the primary cost driver. Understand that context window limits (Input + Output) directly impact both the cost and the richness of the AI's response.
:::

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

---

## Model Weight Updates & Terminology

A common exam trap is confusing which customization method actually changes the model itself.

| Term | Are Weights Updated? | Core Concept |
|------|----------------------|--------------|
| **Pre-training** | **YES** (Extensive) | Creating the model from scratch on massive datasets. This is where the model "learns" language. |
| **Fine-tuning** | **YES** (Targeted) | Taking a pre-trained model and continuing training on a small, specific dataset to adapt its behavior/style. |
| **RAG** | **NO** | The model remains frozen. It uses external data as "context" in the prompt to ground its answers. |
| **Prompt Engineering** | **NO** | Providing instructions and examples to guide the model's existing knowledge. |

::: important Terminology Tip
- **Grounding**: Providing context via RAG so the model doesn't hallucinate. (No weight change)
- **Transfer Learning**: The underlying principle of Fine-tuning—building on top of a pre-trained model. (Weight change)
:::

---

## Adaptation vs Retrieval (Fine-tuning vs RAG)

This comparison focuses on **where the knowledge comes from**.

| Concept | Term | Analogy | Best for... |
|---------|------|---------|-------------|
| **Adaptation** | **Fine-tuning** | Learning a new skill or language style from a textbook. | Nuanced behavior, specialized industry jargon. |
| **Retrieval** | **RAG** | Taking an "open-book" exam with access to a library. | Facts, real-time data, and proprietary internal docs. |

::: warning Common Pitfall
**Fine-tuning is NOT for real-time data.** A common exam trap is asking how to provide an AI with today's stock prices. The answer is **RAG/Grounding**, not Fine-tuning.
:::

<FlashcardDeck 
  title="Model Customization Quiz"
  :cards="[
    {
      question: 'Which method uses a Knowledge Base to ground answers without updating weights?',
      answer: '<strong>RAG</strong> (Retrieval-Augmented Generation).'
    },
    {
      question: 'Which method updates weights to learn a specific style or jargon permanently?',
      answer: '<strong>Fine-tuning</strong>.'
    },
    {
      question: 'What is the underlying principle of Fine-tuning?',
      answer: '<strong>Transfer Learning</strong> (building on a pre-trained model).'
    },
    {
      question: 'Which customization method is the most expensive and complex?',
      answer: '<strong>Fine-tuning</strong>.'
    }
  ]"
/>
