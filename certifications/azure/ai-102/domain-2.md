---
title: "Domain 2: Implement Generative AI Solutions"
description: "Notes on Azure OpenAI, RAG, Prompt Flow, fine-tuning, and model evaluation for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, azure openai, generative ai, rag, prompt flow, fine-tuning, prompt engineering, model evaluation, grounding
---

# Domain 2: Implement generative AI solutions (15-20%)

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)

---

This domain covers building and deploying generative AI solutions using **Azure OpenAI Service** and **Microsoft AI Foundry**. It tests your ability to choose the right approach (RAG vs fine-tuning), design prompts, and evaluate model outputs.

## 2.1 Azure OpenAI Service and AI Foundry

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Model Catalog** | Browse and deploy models: GPT-4o, GPT-3.5 Turbo, Embeddings (text-embedding-ada-002), DALL-E 3 |
| **Deployment** | A model instance with a name, capacity type (Standard/PTU), and version |
| **AI Foundry Project** | Where you build, test, and deploy generative AI apps |
| **Foundry SDK** | `azure-ai-projects` + `azure-ai-inference` packages for app integration |

### Chat Completion API Structure

| Role | Purpose | Example |
|------|---------|---------|
| `system` | Instructions and persona for the model | "You are a helpful assistant that only answers in English." |
| `user` | The human's message | "What is the capital of France?" |
| `assistant` | Prior model responses (conversation history) | "The capital of France is Paris." |

### Sampling Parameters

| Parameter | Effect | Typical Use |
|-----------|--------|------------|
| `temperature` | Higher = more creative/random; 0 = deterministic | Creative tasks: 0.7–1.0; factual: 0.0–0.2 |
| `top_p` | Controls vocabulary diversity via nucleus sampling | Alternative to temperature (use one, not both) |
| `max_tokens` | Hard limit on response length | Prevent runaway output |
| `stop` | Sequence(s) that terminate the response | Structured output, templates |
| `frequency_penalty` | Reduces repetition of tokens already used | Long-form generation |

---

## 2.2 Prompt Engineering

### Core Techniques

| Technique | What It Does | When to Use |
|-----------|-------------|-------------|
| **Zero-shot** | Ask the model with no examples | Simple, well-understood tasks |
| **Few-shot** | Provide 2–5 input/output examples in the prompt | Tasks needing specific format or tone |
| **Chain-of-Thought (CoT)** | Ask model to "think step by step" | Math, multi-step reasoning |
| **Grounding** | Include source data in the prompt (RAG context) | Factual accuracy, hallucination reduction |
| **Prompt Templates** | Parameterized prompts with `{{variable}}` placeholders | Consistent formatting across inputs |

::: tip Grounding vs Fine-tuning
**Grounding (RAG)**: Inject relevant documents into the prompt at runtime → model answers from provided context. Fast, updatable, no retraining.
**Fine-tuning**: Bake knowledge/style into model weights → training required. Use when tone, format, or rare domain expertise matters AND data doesn't change often.

The exam almost always prefers RAG when data changes frequently.
:::

### Multimodal Inputs

- **GPT-4o**: Accepts images + text in a single message. Can describe, analyze, or reason about images.
- **DALL-E 3**: Generates images from text prompts. Key parameters: `size` (1024×1024 etc.), `quality` (standard/hd), `style` (vivid/natural).

---

## 2.3 Retrieval Augmented Generation (RAG)

RAG grounds the model in your own data without retraining.

### Architecture

```
User Query
  → Embed query (text-embedding-ada-002)
  → Search AI Search index (vector/hybrid search)
  → Retrieve top-K document chunks
  → Inject chunks into prompt as context
  → Model generates grounded response
```

### On Your Data (Azure OpenAI)

A built-in integration that connects Azure OpenAI directly to an **Azure AI Search** index:
- No custom code needed for the retrieval step
- Supports hybrid search (keyword + vector)
- Returns citations in the response

::: info RAG vs Fine-tuning Decision
| Factor | RAG | Fine-tuning |
|--------|-----|------------|
| Data changes frequently | ✅ | ❌ |
| Need specific response tone/format | ❌ | ✅ |
| Reduce hallucinations with factual data | ✅ | Partial |
| Expensive, requires retraining | ❌ | ✅ |
:::

---

## 2.4 Prompt Flow

A visual orchestration tool in **AI Foundry** for designing, testing, and deploying LLM workflows.

### Flow Types

| Type | Purpose |
|------|---------|
| **Standard Flow** | General LLM pipeline (input → processing → output) |
| **Chat Flow** | Multi-turn conversational app with session memory |
| **Evaluation Flow** | Measures performance of another flow against a dataset |

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Nodes** | Steps in the flow: LLM node (model call), Python node (custom code), Prompt node (template) |
| **Variants** | Multiple versions of a node's prompt — run A/B comparisons in one flow |
| **Inputs/Outputs** | Define the schema for what the flow accepts and returns |
| **Connections** | References to Azure OpenAI or other service credentials |

::: tip Prompt Flow Exam Signals
"Visual workflow for LLM apps" → Prompt Flow
"Evaluate prompt variants against a dataset" → Prompt Flow (Evaluation Flow)
"A/B test two system prompts" → Prompt Flow Variants
:::

---

## 2.5 Model Fine-tuning

### When to Fine-tune

| Situation | Recommended Approach |
|-----------|---------------------|
| Data changes frequently, reduce hallucinations | **RAG** |
| Specific tone, format, or domain jargon | **Fine-tuning** |
| Teach the model a new task structure | **Fine-tuning** |
| Need citations from source documents | **RAG** |

### Fine-tuning Workflow

1. **Prepare data**: Format as JSONL with `system`, `user`, `assistant` message objects (min 100–500 examples)
2. **Upload**: Push training file to Azure OpenAI
3. **Create job**: Start fine-tuning job — specify base model and hyperparameters
4. **Monitor**: Track loss metrics; job can take hours
5. **Deploy**: Deploy the fine-tuned model as a new endpoint
6. **Evaluate**: Test with held-out examples before promoting to production

```json
// JSONL training example format:
{"messages": [
  {"role": "system", "content": "You are a legal document assistant."},
  {"role": "user", "content": "Summarize this contract clause."},
  {"role": "assistant", "content": "This clause limits liability to..."}
]}
```

---

## 2.6 Model Evaluation

### Built-in Evaluation Metrics

| Metric | What It Measures |
|--------|----------------|
| **Groundedness** | Does the response stay within the provided source context? (RAG quality) |
| **Relevance** | Does the answer address the user's question? |
| **Coherence** | Is the response logically structured? |
| **Fluency** | Is the language grammatically correct and natural? |
| **Similarity** | How close is the output to a golden reference answer? |

### Evaluation Flows

- Create an **Evaluation Flow** in Prompt Flow to run a dataset of questions through your flow and score outputs automatically.
- Reference answers (ground truth) are compared against model outputs using the metrics above.

---

## 2.7 Monitoring and Safety

| Control | Purpose |
|---------|---------|
| **Content Filters** | Applied to inputs AND outputs of Azure OpenAI models (Hate, Violence, Self-Harm, Sexual) |
| **Blocklists** | Custom term lists — model will never output blocked terms |
| **Prompt Flow Tracing** | See latency, token counts, and node execution for each run |
| **Model Reflection** | Pattern where model critiques its own draft before returning a final response |

---

<FlashcardDeck storage-key="ai-102-domain-2-cards" :cards="[
  { front: 'When should you choose RAG over fine-tuning?', back: 'When data changes frequently, you need citations, or you want to reduce hallucinations without retraining. RAG injects context at runtime — fast and updatable.' },
  { front: 'When should you choose fine-tuning over RAG?', back: 'When you need a specific tone, response format, or domain jargon baked in — and the required knowledge is stable and does not change often.' },
  { front: 'What are the three Prompt Flow flow types?', back: 'Standard Flow (general LLM pipeline), Chat Flow (multi-turn conversation), Evaluation Flow (measures performance against a dataset).' },
  { front: 'What is Groundedness as an evaluation metric?', back: 'Measures whether the model response stays within the provided source context — key metric for RAG quality. High groundedness = fewer hallucinations.' },
  { front: 'What is the minimum training data size for fine-tuning?', back: '100–500 JSONL examples (system/user/assistant message format). More examples generally improve quality.' },
  { front: 'What does the temperature parameter control?', back: 'Randomness/creativity of the model output. 0 = deterministic (same output every time). Higher values = more varied, creative responses.' },
  { front: 'What is a Prompt Flow Variant?', back: 'Multiple versions of a node (e.g., different system prompts) that can be compared in a single evaluation run — used for A/B testing prompt designs.' },
  { front: 'Content Filters in Azure OpenAI apply to what?', back: 'Both model inputs (user prompts) AND model outputs (generated responses). They are not input-only.' }
]" />

---

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)
