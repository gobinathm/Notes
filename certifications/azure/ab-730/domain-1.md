---
title: "Domain 1 - GenAI Fundamentals"
description: "AB-730 Domain 1: How LLMs work, Responsible AI, and Risks"
head:
  - - meta
    - name: keywords
      content: ab-730, domain 1, llm, generative ai, risks, responsible ai
---

# Domain 1: GenAI Fundamentals (25-30%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

---

## How LLMs Work in Microsoft 365

Microsoft 365 Copilot uses Large Language Models (LLMs) combined with your organization's data in the **Microsoft Graph**.

- **Pre-training**: Models are trained on massive datasets to understand language patterns.
- **The Copilot System**: When you send a prompt, Copilot "grounds" it by retrieving context from your emails, files, and calendar (Graph) before sending it to the LLM.
- **Tokens**: AI processes text in chunks called tokens. More tokens = higher cost/processing.

## Responsible AI & Risks

Using AI safely is a core part of the AB-730 exam.

### Key Risks
- **Hallucinations (Fabrications)**: The AI generates confident but false information.
- **Bias**: The AI may mirror prejudices found in its training data.
- **Over-reliance**: Trusting AI output without human verification.
- **Prompt Injection**: Maliciously trying to bypass AI safety guards with clever wording.

::: danger Critical
**Human-in-the-Loop**: AI output must always be reviewed by a human for accuracy and tone before being used in a final business context.
:::

## Data Protection

- **Tenant Isolation**: Your data stays within your organization's Microsoft 365 boundary.
- **No Training**: Microsoft does **not** use your business data to train public models.
- **Permissions**: Copilot can only see data you already have permission to access.

<FlashcardDeck 
  title="Fundamentals Quiz"
  :cards="[
    {
      question: 'Does Microsoft train public models on your business data?',
      answer: '<strong>NO</strong>. Your organization\'s data stays private and secure.'
    },
    {
      question: 'What is a fabrication in AI?',
      answer: 'When the AI generates realistic-sounding but incorrect information (hallucination).'
    },
    {
      question: 'What is the human-in-the-loop principle?',
      answer: 'The requirement that a human must review and verify AI-generated content.'
    }
  ]"
/>
