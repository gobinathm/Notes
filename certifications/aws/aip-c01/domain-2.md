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

```text
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

```text
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

### Converse API

The **Converse API** is the general-purpose, message-based Bedrock API for foundation model interactions. Think of it as the Bedrock **Swiss army knife** for chat-style requests: it gives you a more consistent request shape across models, which makes it easier to swap models in your application without rewriting as much integration code.

**At a minimum, Converse needs:**
- A `modelId`
- A prompt expressed through `messages`

**It can also include:**
- `inferenceConfig` for `maxTokens`, `temperature`, `topP`, and stop sequences
- `guardrailConfig` to apply Guardrails within the same request
- `toolConfig` for tool definitions and tool choice in tool-calling / agentic patterns
- `system` instructions for top-level model behavior
- `promptVariables` when using a stored prompt from Bedrock Prompt Management
- `additionalModelRequestFields` for model-specific pass-through settings

::: info How to Think About Converse on the Exam
The exam will not ask you to write Converse request bodies from memory. What matters is understanding **why** Converse exists:
- a unified message-based API surface
- easier model portability across Bedrock-supported models
- one place to pass inference settings, tools, and guardrail configuration
:::

::: warning Common Confusion
Do not confuse **Converse** with **InvokeAgent**:
- **Converse** = unified model interaction API
- **InvokeAgent** = managed Bedrock Agent orchestration with multi-step reasoning and trace support
:::

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

## 2.5 Amazon SageMaker for GenAI Applications

### What SageMaker Provides

Amazon SageMaker is the managed ML platform for **training, fine-tuning, and deploying** custom models. For the AIP-C01 exam, know when SageMaker is the right choice over Bedrock.

### Key SageMaker Concepts

| Concept | Description |
|---|---|
| **Training Jobs** | Managed compute for training ML models — bring your own script and framework |
| **SageMaker JumpStart** | Pre-trained foundation models (Llama, Falcon, etc.) that can be fine-tuned and deployed from the SageMaker console |
| **SageMaker Endpoints** | Real-time inference endpoints for deployed models |
| **Batch Transform** | Asynchronous batch inference on large datasets (analogous to Bedrock Batch Inference) |

### Bedrock vs. SageMaker Decision

```text
Need a managed FM from a major provider (Claude, Titan, Cohere)?
└─ Amazon Bedrock (InvokeModel)

Need full training control, custom framework, or open-source LLM?
└─ Amazon SageMaker (Training Job + Endpoint)

Need a pre-trained open-source LLM deployed on your own infra?
└─ SageMaker JumpStart
```

::: tip
The exam will not ask you to configure SageMaker training pipelines in detail. Know **when to choose SageMaker vs. Bedrock** and what SageMaker JumpStart provides.
:::

---

## 2.6 Amazon Comprehend

### What Comprehend Does

Amazon Comprehend is a **managed NLP service** — it analyzes text without requiring a foundation model invocation.

### Key Capabilities

| Capability | Description | Exam Use Case |
|---|---|---|
| **Entity Recognition** | Detect people, places, organizations, dates in text | Pre-process documents before RAG ingestion |
| **Sentiment Analysis** | Positive / negative / neutral / mixed classification | Post-process FM output or classify user input |
| **Key Phrase Extraction** | Identify the most important phrases in a document | Summarization metadata, tagging |
| **Language Detection** | Identify the language of a text input | Route to the correct multilingual model |
| **PII Detection** | Find and optionally redact PII entities | Compliance pre-processing before sending to an FM |

### Comprehend in a GenAI Pipeline

```text
User Input → Comprehend (PII check / sentiment / language)
    ↓ only if safe/appropriate
Amazon Bedrock FM (InvokeModel)
    ↓
FM Output → Comprehend (sentiment / entity tagging)
    ↓
Application Response
```

::: tip Comprehend vs. Bedrock Guardrails PII Redaction
Both can detect PII. Choose:
- **Comprehend** when PII detection/redaction happens *before* reaching Bedrock, or as a standalone NLP step
- **Bedrock Guardrails PII Redaction** when you want PII handled *within* the Bedrock request/response cycle
:::

---

## 2.7 Exposing Bedrock APIs: API Gateway & Container Deployments

### Amazon API Gateway + Lambda + Bedrock

The standard pattern to expose a Bedrock-powered feature as an HTTP API:

```text
External Client
    ↓ HTTPS
Amazon API Gateway  (authentication, rate limiting, routing)
    ↓
AWS Lambda  (business logic, prompt construction, Bedrock call)
    ↓
Amazon Bedrock (InvokeModel / InvokeAgent)
```

**Why each layer:**
- **API Gateway**: Handles auth (IAM, Cognito, API Keys), throttling, CORS, and request/response transformation
- **Lambda**: Stateless compute to build the prompt, call Bedrock, and format the response
- **Bedrock**: Foundation model inference

### ECS / EKS for GenAI Application Backends

For applications that need **persistent processes, long-running containers, or complex orchestration**:

| Service | Use Case |
|---|---|
| **Amazon ECS** | Managed container orchestration — simpler than Kubernetes, suitable for most GenAI web backends |
| **Amazon EKS** | Kubernetes-based — use when team already runs k8s or needs advanced scheduling |

**Typical architecture:**
```text
Load Balancer → ECS/EKS (GenAI app container) → Bedrock API
```

::: tip Lambda vs. ECS/EKS
- **Lambda**: Stateless, event-driven, <15 min execution — best for per-request Bedrock calls
- **ECS/EKS**: Long-running services, streaming WebSocket connections, or containers with heavy dependencies
:::

---

## 2.8 Cross-Region Inference & Bedrock Flows

### Cross-Region Inference Profiles

Cross-region inference routes model invocations **across multiple AWS regions** to improve availability and throughput.

- Bedrock creates a **cross-region inference profile** that you invoke like a regular model
- Bedrock automatically routes requests to the region with available capacity
- Use when: on-demand throughput in a single region is insufficient, or you need higher availability
- The calling region still applies for billing and data residency awareness — verify compliance requirements

**How to invoke:**

```text
Instead of: modelId = "anthropic.claude-3-sonnet-..."
Use:        modelId = "us.anthropic.claude-3-sonnet-..."  (cross-region profile ID)
```

### Amazon Bedrock Flows

Bedrock Flows is a **visual, low-code workflow orchestration** tool for chaining FM calls, knowledge base retrievals, and prompt logic.

| Feature | Description |
|---|---|
| **Node types** | FM prompt, Knowledge Base retrieval, Lambda function, Condition, Input/Output |
| **Use case** | Multi-step GenAI pipelines without writing orchestration code |
| **vs. Bedrock Agents** | Flows are deterministic, explicitly defined workflows; Agents reason autonomously |

::: tip Flows vs. Agents on the Exam
- **Bedrock Agents**: autonomous reasoning, decides at runtime which tools to call
- **Bedrock Flows**: predefined workflow graph, each step is explicit — no autonomous decision-making
Choose Flows when the workflow is known upfront and deterministic; choose Agents when the task requires dynamic planning.
:::

---

[← Domain 1](./domain-1.md) · [Next: Domain 3 →](./domain-3.md)
