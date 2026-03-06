---
title: "AIP-C01 - Domain 2: Implementation and Integration"
description: "AIP-C01 Domain 2 study notes: Bedrock Agents, RAG architecture, chunking strategies, and API integration patterns"
head:
  - - meta
    - name: keywords
      content: aip-c01, domain 2, bedrock agents, rag, chunking, invokemodel, knowledge base, action groups, lambda, agentic ai, implementation
---

# Domain 2: Implementation and Integration (26%)

[← Domain 1](./domain-1.md) · [Next: Domain 3 →](./domain-3.md)

::: tip Exam Tip
This domain tests your ability to implement GenAI applications end-to-end. Know when to use Bedrock Agents vs. a simple Knowledge Base call, understand the three Bedrock APIs, and be able to explain chunking strategy trade-offs. Agents + Domain 1 together = 57% of the exam.
:::

---

## 2.1 Agentic AI & Amazon Bedrock Agents

### What is an Agent?

Amazon Bedrock Agents enable **multi-step, autonomous reasoning** by orchestrating FM calls, tool invocations, and knowledge base retrievals to complete a user goal.

**Core Components:**

| Component | Role |
|---|---|
| **Agent** | The orchestrator — receives the user request and plans the steps |
| **Action Groups** | Lambda functions the Agent can invoke to interact with external systems |
| **Knowledge Bases** | RAG pipeline the Agent can query for document-based context |
| **Orchestration Trace** | Step-by-step log of the Agent's reasoning and tool calls |

### Action Groups

Action Groups define what external actions an Agent can take:

- Each action group is backed by a **Lambda function**
- The Agent decides whether and when to call an action based on the user's request
- Actions are described with an **OpenAPI schema** — the Agent uses this to understand what parameters to pass

**Examples:**
- Look up a customer's order status in a database
- Send a confirmation email via an external API
- Write a record to an S3 bucket

### Knowledge Base Integration

Agents can be connected to a Knowledge Base to retrieve document context:
- The Agent automatically decides when to query the Knowledge Base vs. call an Action Group
- Knowledge Bases use the RAG pipeline: S3 → chunking → embeddings → OpenSearch Serverless

### Orchestration Trace

Enable with `enableTrace: true` in the `InvokeAgent` API call:
- Shows the Agent's step-by-step reasoning chain (which step, which tool, which decision)
- Critical for debugging unexpected Agent behavior

::: warning Exam Trap
**Bedrock Agents vs. Knowledge Bases (RAG only):**
- Use a **Knowledge Base alone** when: the task is document Q&A with no external action needed
- Use **Bedrock Agents** when: the task requires multi-step reasoning, calling external APIs, or taking actions beyond retrieval

The exam will present scenarios — choose Agents when action or orchestration is involved.
:::

---

## 2.2 Knowledge Base Architecture

### End-to-End RAG Flow

```
1. Data Source: S3 bucket (PDFs, Word, HTML, Markdown, CSV)
2. Parser: Extract and clean text from documents
3. Chunker: Split text into smaller pieces (fixed, semantic, hierarchical)
4. Embedder: Titan Text Embeddings / Cohere Embed → convert text to vectors
5. Vector Store: Amazon OpenSearch Serverless (or Aurora pgvector)
6. At inference: embed query → vector search → top-K chunks → inject into FM prompt
```

### Supported Data Sources

- **Amazon S3** — primary ingestion source (most common exam scenario)
- **Web Crawler** — Bedrock Knowledge Bases can crawl websites
- **Salesforce, Confluence, SharePoint** — native connectors

### Chunking Strategies

| Strategy | How It Works | Best For | Trade-off |
|---|---|---|---|
| **Fixed-size** | Split by token count (e.g., 300 tokens) | Uniform documents | May break mid-sentence or mid-context |
| **Fixed-size + overlap** | Tokens overlap between adjacent chunks | Preserving cross-boundary context | Higher storage and retrieval cost |
| **Semantic** | Split by meaning/topic using NLP | Long-form, varied content | Higher processing complexity |
| **Hierarchical** | Parent chunk + child chunk structure | Complex docs needing broad + fine retrieval | More complex retrieval logic |

::: tip
**Hierarchical** chunking is best when you need both broad context and fine-grained retrieval.
**Fixed-size with overlap** is the simplest option for preserving context across chunk boundaries.
:::

### Sync and Ingestion

- After updating S3 content, you must **trigger a sync** to update the vector store
- The Knowledge Base does NOT auto-update when S3 changes
- Ingestion status is visible in the Bedrock console

---

## 2.3 API Integration Patterns

### The Three Core Bedrock Runtime APIs

| API | Use Case | Response Model |
|---|---|---|
| `InvokeModel` | Synchronous — get a complete response in one call | Blocking, full response at once |
| `InvokeModelWithResponseStream` | Streaming — receive response token by token | Non-blocking, chunk-by-chunk delivery |
| `InvokeAgent` | Multi-step agentic workflow | Streaming trace + final response |

### When to Use Each

```
User needs a complete answer in one shot?
└─ InvokeModel (synchronous, simple)

User interface needs a low-latency "typing" feel?
└─ InvokeModelWithResponseStream (streaming)

Task requires tool calls, external APIs, or multi-step planning?
└─ InvokeAgent
```

### InvokeModel Request Body (Simplified)

```json
{
  "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
  "body": {
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1024,
    "messages": [
      { "role": "user", "content": "Summarize this document..." }
    ]
  }
}
```

**Key parameters:**
- `modelId`: The specific FM to invoke
- `max_tokens`: Cap on output tokens — controls cost and response length
- `temperature`: Controls creativity vs. determinism (0.0–1.0)

---

## 2.4 Retrieval Configuration & Tuning

### Top-K Retrieval

- At query time, the embedding of the user's question is compared against all vectors in the store
- The top-K most similar chunks are retrieved and injected into the FM prompt
- **Higher K**: More context but longer prompts (higher cost, risk of irrelevant chunks)
- **Lower K**: Focused context but may miss relevant information

### Metadata Filtering

- Attach metadata to chunks during ingestion (e.g., `department: "legal"`, `year: 2024`)
- At query time, filter retrieval to only return chunks matching specific metadata
- Allows scoped retrieval without maintaining separate vector stores per category

---

<FlashcardDeck
  storage-key="aip-c01-d2-cards"
  :cards="[
    {
      question: 'What is the role of an Action Group in a Bedrock Agent?',
      answer: 'Action Groups are <strong>Lambda functions</strong> the Agent can invoke to interact with external systems (databases, APIs, storage). They are defined with an OpenAPI schema so the Agent understands what parameters to pass and when to call them.'
    },
    {
      question: 'When should you use Bedrock Agents instead of a Knowledge Base alone?',
      answer: 'Use <strong>Bedrock Agents</strong> when the task requires multi-step reasoning, calling external APIs, or taking real-world actions. Use a <strong>Knowledge Base alone</strong> for simple document Q&A where no external actions are needed.'
    },
    {
      question: 'What is the difference between InvokeModel and InvokeModelWithResponseStream?',
      answer: '<strong>InvokeModel</strong> is synchronous — it blocks until the full response is returned. <strong>InvokeModelWithResponseStream</strong> is streaming — it delivers the response token-by-token, improving perceived latency for chat interfaces. Both cost the same in tokens.'
    },
    {
      question: 'After updating documents in S3, what must you do to reflect changes in a Bedrock Knowledge Base?',
      answer: 'You must <strong>trigger a sync</strong> on the Knowledge Base. The vector store is NOT automatically updated when S3 content changes — a manual or scheduled sync is required to re-process, re-chunk, re-embed, and update the vector index.'
    },
    {
      question: 'What is metadata filtering in a Knowledge Base?',
      answer: 'Metadata filtering lets you attach attributes (e.g., department, year, category) to document chunks during ingestion, then filter retrieval at query time to only return chunks matching specific metadata values — useful for scoping queries without separate vector stores.'
    },
    {
      question: 'How do you debug unexpected reasoning in a Bedrock Agent?',
      answer: 'Enable <strong>enableTrace: true</strong> in the InvokeAgent API call. The Orchestration Trace shows the Agent\'s step-by-step reasoning chain, which Action Groups it called, what Knowledge Base query it ran, and why each decision was made.'
    }
  ]"
/>

---

[← Domain 1](./domain-1.md) · [Next: Domain 3 →](./domain-3.md)
