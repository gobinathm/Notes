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

Amazon Bedrock Knowledge Bases is the **fully managed RAG capability** in Bedrock. It automates the core workflow of:
- ingesting data from a source such as S3
- chunking that data
- generating embeddings
- storing those embeddings in a vector database
- retrieving relevant context to augment the FM response

This reduces the amount of custom pipeline code you would otherwise need to build and maintain yourself.

### End-to-End RAG Flow

```text
1. Data Source: S3 bucket (PDFs, Word, HTML, Markdown, CSV)
2. Parser: Extract and clean text from documents
3. Chunker: Split text into smaller pieces (fixed, semantic, hierarchical)
4. Embedder: Titan Text Embeddings / Cohere Embed → convert text to vectors
5. Vector Store: Amazon OpenSearch Serverless (or Aurora pgvector)
6. At inference: embed query → vector search → top-K chunks → inject into FM prompt
```

### Why Use Knowledge Bases

- Best answer when the question asks for **managed RAG with minimal custom code**
- Strong fit for internal manuals, FAQs, policy documents, and document-grounded assistants
- Can be used directly in an application or attached to a Bedrock Agent

### Knowledge Base Backing Patterns

- **Vector store**: the standard Bedrock RAG pattern for chunked embeddings
- **Structured data store**: useful when data already lives in structured systems and semantic search is needed over that data
- **Kendra GenAI Index**: useful when the scenario emphasizes document understanding and Kendra-backed retrieval

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

`InvokeModel` uses a **model-specific request body**. The payload is JSON, but the expected JSON fields vary by model family. For example, Anthropic Claude models use fields such as `anthropic_version`, `messages`, and `max_tokens`.

**Key parameters:**
- `modelId`: The specific FM to invoke
- `max_tokens`: Cap on output tokens — controls cost and response length
- `temperature`: Controls creativity vs. determinism (0.0–1.0)
- `topP`: Narrows or widens the token probability pool used for sampling
- `stopSequences`: Explicitly tells the model where to stop generating

### InvokeModel vs. Converse

| Feature | `InvokeModel` | `Converse` |
|---|---|---|
| Request shape | Model-specific JSON payload | More consistent message-based structure |
| Best use | Direct invocation when you know the target model and its schema | Easier cross-model portability |
| Exam takeaway | You may need to match model-specific fields | Bedrock's unified API for chat-style interaction |

::: info Exam Framing
The exam is unlikely to ask you to memorize exact request bodies, byte encoding, or SDK syntax. What matters is knowing that **`InvokeModel` is more model-specific**, while **`Converse` exists to reduce that variation**.
:::

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

### Hybrid Search

- **Hybrid search** combines semantic vector retrieval with keyword matching
- Use it when exact terms, product codes, error messages, or legal phrases matter in addition to overall semantic meaning
- This is often better than pure vector search for enterprise documents and mixed-structure datasets

### Reranking

- Retrieval is often a **two-stage process**
- Stage 1: fetch a broader candidate set quickly
- Stage 2: **rerank** those candidates with a stronger scoring model or rule set
- Reranking helps improve precision when the initial top-K results include loosely related chunks

### Precision vs. Recall in RAG

| Problem | Likely Issue | Common Fix |
|---|---|---|
| Relevant chunks are missing | Low recall | Increase candidate set, improve chunking, use hybrid search |
| Too many irrelevant chunks are returned | Low precision | Add metadata filters, rerank results, reduce top-K |
| Good chunks exist but answer still drifts | Prompt/context issue | Tighten prompt instructions, reduce noise, improve citations |

### Distance and Similarity Intuition

- Embedding search relies on a **distance or similarity metric**
- In practice, you may see references to **cosine similarity** or other vector-distance approaches
- You do not need to memorize math formulas for the exam, but you should understand that retrieval is driven by **vector closeness**

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

::: warning Hard Limits — Lambda & API Gateway
| Service | Limit | Impact |
|---|---|---|
| **Lambda** | 15 min (900s) max execution | FM inference or document processing exceeding this → use ECS or Bedrock Batch |
| **Lambda** | 6 MB synchronous response payload | Large FM responses → use streaming (`InvokeModelWithResponseStream`) |
| **API Gateway** | **29 seconds** integration timeout — **cannot be increased** | Cannot proxy long synchronous FM calls; requires async submit-and-poll pattern |

**Async pattern for long FM calls behind API Gateway:**
```text
POST /invoke   → Lambda submits job → returns job ID (fast)
               → SQS / Step Functions processes async
GET  /result/{id} → Lambda checks status → returns result when ready
```
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

## 2.9 Human-in-the-Loop with AWS Step Functions Task Token

### The Problem

Some GenAI workflows require a **human decision** before proceeding — content approval, sensitive action confirmation, compliance review. The challenge: how do you pause a workflow for hours or days without polling or consuming resources?

### Step Functions Task Token Pattern

AWS Step Functions solves this with the **task token callback pattern**:

```text
1. Step Functions starts a workflow task → generates a unique task token
2. Token is sent to an external system (email, dashboard, Slack, SQS)
3. Workflow PAUSES — no polling, no resource consumption
4. Human reviews and approves/rejects
5. External system calls SendTaskSuccess (or SendTaskFailure) with the token
6. Workflow resumes from where it paused
```

**Key API calls:**
- `SendTaskSuccess(taskToken, output)` — human approved, workflow continues
- `SendTaskFailure(taskToken, error, cause)` — human rejected, workflow handles failure

### When to Use This Pattern

| Scenario | Pattern |
|---|---|
| Content generated by FM needs editor approval before publishing | Task Token — wait can be hours/days |
| Agent needs one-step human confirmation within a session | Bedrock Agents Return of Control (RoC) |
| Compliance review of AI-generated legal/medical text | Task Token — external reviewer, long wait |
| Real-time interactive confirmation in a chatbot | Bedrock Agents RoC |

### Bedrock Agents RoC vs. Step Functions Task Token

| | Bedrock Agents Return of Control | Step Functions Task Token |
|---|---|---|
| **Where** | Inside Bedrock Agent orchestration | External Step Functions workflow wrapping Bedrock |
| **Pause mechanism** | Agent returns control to the caller | Workflow suspends, waits for callback |
| **Wait duration** | Short — within the same session | Any duration — minutes, hours, or days |
| **Resource use while waiting** | Session remains active | Zero — workflow is fully suspended |
| **Best for** | Single-step confirmation during an agent loop | Long-running approval workflows with external systems |

::: tip Exam Scenario
*"A GenAI application generates content that requires human editorial review before publishing. The review may take up to 48 hours. How should the workflow be designed?"* → **Step Functions task token pattern** — the workflow pauses without consuming resources until the reviewer sends the callback.

If the wait is short and within a single agent session → **Bedrock Agents Return of Control**.
:::

::: info Standard vs. Express Workflow Limits
| | Standard Workflow | Express Workflow |
|---|---|---|
| **Max duration** | 1 year | 5 minutes |
| **Execution model** | At-least-once | At-most-once / at-least-once |
| **Audit history** | Full auditable history | CloudWatch Logs only |
| **Best for** | Human-in-the-loop, long approvals | High-throughput event pipelines |

Always use **Standard** for human review workflows — Express's 5-minute cap rules it out for any human wait.
:::

---

[← Domain 1](./domain-1.md) · [Next: Domain 3 →](./domain-3.md)
