---
title: "AI-900 - Domain 5: Generative AI Workloads"
description: "Study notes for AI-900 Domain 5: Describe features of generative AI workloads on Azure"
---

# Domain 5: Generative AI Workloads on Azure

[<- Previous Domain](./domain-4.md) | [Overview](./index.md) | [Exam Guide ->](./exam-guide.md)

**Weight:** 20-25%

This is the highest-weight AI-900 domain. Focus on generative AI concepts, responsible AI risks, and Azure services such as Azure AI Foundry and Azure OpenAI.

---

## Generative AI Solutions

Generative AI creates new content from prompts and context. Common output types include:

- Text and summaries.
- Images and multimodal content.
- Code.
- Answers grounded in retrieved documents.
- Structured content such as JSON, tables, and plans.

### Generative AI Models

Generative AI models learn patterns from large datasets and generate likely outputs. For exam purposes, know these ideas:

- **Prompt**: The user or system instruction sent to the model.
- **Completion/response**: The generated output.
- **Token**: A unit of text processed by the model.
- **Context window**: The amount of input and output the model can consider in one interaction.
- **Embedding**: Numeric representation of text or other content used for similarity search and retrieval.
- **Multimodal model**: A model that can work with more than one type of input or output, such as text and images.

### Common Scenarios

| Scenario | Typical Pattern |
|---|---|
| Summarize documents | Provide text or retrieved passages and ask for a concise summary |
| Generate marketing copy | Prompt with tone, audience, and constraints |
| Build a chatbot | Use chat completion with system instructions and conversation history |
| Answer questions over private data | Use retrieval augmented generation (RAG) |
| Generate code | Use model coding capabilities with review and testing |
| Extract structured output | Ask the model to return a schema-constrained response |

---

## Responsible AI for Generative AI

Generative AI introduces risks such as hallucination, unsafe content, bias, privacy leakage, and overreliance. Responsible designs include:

- Grounding answers in trusted sources.
- Evaluating quality, safety, and groundedness.
- Using content filters and safety controls.
- Keeping humans in the loop for high-impact use cases.
- Disclosing AI-generated content where appropriate.
- Protecting prompts, files, conversation history, and generated outputs.

### RAG vs Fine-Tuning

| Need | Prefer |
|---|---|
| Use private or frequently changing knowledge | RAG |
| Cite or ground answers in source documents | RAG |
| Teach a model a consistent response style or format | Fine-tuning |
| Reduce hallucination by supplying source context | RAG |

AI-900 generally tests conceptual recognition, not implementation details.

---

## Azure Generative AI Services

### Azure AI Foundry

Azure AI Foundry is the Microsoft platform for building, evaluating, and deploying AI applications. For AI-900, know that Foundry is where you work with models, projects, tools, and generative AI app development workflows.

### Azure OpenAI Service

Azure OpenAI Service provides access to OpenAI models through Azure, including enterprise controls such as Azure identity, networking, monitoring, and content filtering.

Use Azure OpenAI when the scenario asks for:

- Chat completions and text generation.
- Summarization and rewriting.
- Code generation.
- Embeddings for semantic search.
- Generative AI integration in Azure apps.

### Azure AI Foundry Model Catalog

The model catalog helps you discover, compare, and deploy models. It includes models from Microsoft, OpenAI, and other providers depending on availability and region.

Use the model catalog when the scenario asks to select or deploy a model for a workload.

---

## Exam Traps

- **Generative AI is not always deterministic**: Temperature and prompt wording can affect output.
- **RAG is not model training**: RAG injects retrieved context at runtime; it does not retrain the model.
- **Foundry vs Azure OpenAI**: Foundry is the broader platform; Azure OpenAI is a service for OpenAI model access in Azure.
- **Embeddings do not generate text**: Embeddings support similarity search and retrieval.
- **Content filters do not guarantee correctness**: They reduce unsafe content risk, but factual accuracy still requires grounding and evaluation.

### Flashcards

<FlashcardDeck
  storage-key="ai-900-domain-5-cards"
  :cards="[
    {
      question: 'Which pattern grounds a generative AI answer in private documents without retraining the model?',
      answer: 'Retrieval augmented generation (RAG).'
    },
    {
      question: 'Which Azure platform is used to build and manage AI apps and model workflows?',
      answer: 'Azure AI Foundry.'
    },
    {
      question: 'What are embeddings used for?',
      answer: 'Representing content numerically for similarity search and retrieval.'
    },
    {
      question: 'Which service provides OpenAI models through Azure?',
      answer: 'Azure OpenAI Service.'
    }
  ]"
/>

---

[<- Previous Domain](./domain-4.md) | [Overview](./index.md) | [Exam Guide ->](./exam-guide.md)
