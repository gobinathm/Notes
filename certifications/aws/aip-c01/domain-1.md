---
title: "AIP-C01 - Domain 1: FM Integration, Data Management, and Compliance"
description: "AIP-C01 Domain 1 study notes: Foundation Model selection, prompt engineering, RAG pipelines, vector stores, and compliance on Amazon Bedrock"
head:
  - - meta
    - name: keywords
      content: aip-c01, domain 1, foundation model, bedrock, claude, llama, titan, mistral, prompt engineering, rag, vector store, opensearch, pgvector, data residency, compliance, chunking
---

# Domain 1: FM Integration, Data Management, and Compliance (31%)

[← Back to Overview](./index.md) · [Next: Domain 2 →](./domain-2.md)

::: tip Exam Tip
This is the highest-weighted domain at 31%. Focus on FM selection trade-offs, chunking strategies for RAG, and compliance/data residency controls. The exam tests *why* you choose a specific FM or architecture, not just what they are. Know the RAG vs. fine-tuning decision cold.
:::

---

## 1.1 Foundation Model Selection

### Model Families on Amazon Bedrock

| Model Family | Vendor | Strengths | Best For |
|---|---|---|---|
| **Claude** | Anthropic | Reasoning, safety, large context (up to 200k tokens) | Long-document analysis, complex reasoning, summarization |
| **Llama** | Meta | Open-source, fine-tunable | Custom fine-tuning, cost-efficient inference |
| **Mistral** | Mistral AI | Efficient, high performance relative to size | Fast inference, resource-constrained scenarios |
| **Titan** | AWS | AWS-native, embeddings, summarization | Generating embeddings for RAG, AWS-optimized applications |
| **Cohere** | Cohere | Multilingual embeddings, retrieval | Multilingual RAG, semantic search |

### Selection Criteria

**Context Window:**
- Needed for long-document RAG, multi-turn conversations, and large prompt contexts
- Claude: up to 200k tokens | Llama 3: 128k tokens | Titan: shorter context windows
- Choose Claude when the scenario requires processing very long documents

**Latency:**
- Use smaller/faster models (Claude Haiku, Mistral) for real-time chat interfaces
- Use larger models (Claude Sonnet/Opus) for reasoning-heavy tasks where latency is acceptable

**Cost:**
- On-demand: pay per input/output token
- Provisioned Throughput: fixed cost for guaranteed Model Units (suitable for predictable high-volume)

::: warning Exam Trap
The exam frequently offers fine-tuning as a tempting option. Default to **RAG** when:
- The knowledge base changes frequently
- You need source attribution / traceability
- You want to avoid the cost and complexity of model training

Prefer **fine-tuning** when:
- You need the model to adopt a new tone, writing style, or domain-specific format
- The underlying data is stable and unlikely to change often
:::

---

## 1.2 Prompt Engineering Strategies

### Core Techniques

| Technique | Description | When to Use |
|---|---|---|
| **Zero-shot** | Provide task instructions without examples | Simple, well-defined tasks |
| **Few-shot** | Include 2–5 examples in the prompt | Tasks where examples clarify expected output format |
| **Chain-of-Thought (CoT)** | Ask the model to "think step by step" | Multi-step reasoning, math, logical deduction |
| **System Prompt** | Persistent instructions that frame the model's persona and rules | All production applications |

### Prompt Optimization Best Practices

- **Be specific**: Vague prompts produce vague outputs — always define the output format
- **Separate instructions from data**: Use XML tags or delimiters to clearly separate task instructions from user-provided content
- **Control output length**: Set `maxTokens` explicitly to cap responses and control cost
- **Temperature control**:
  - Low temperature (0.0–0.3): Deterministic, factual outputs — use for Q&A and summarization
  - High temperature (0.7–1.0): Creative, diverse outputs — use for brainstorming and creative writing

---

## 1.3 Data Management & RAG Pipelines

### RAG Pipeline Architecture

```text
S3 (raw documents: PDFs, TXT, HTML, Markdown)
    ↓ ingestion / pre-processing
Chunking (split into smaller text pieces)
    ↓
Embedding Model (Titan Text Embeddings / Cohere Embed)
    ↓ convert text to vectors
Vector Store (OpenSearch Serverless or Aurora pgvector)  ← Indexing step
    ↓ at inference time
Query → Embed Query → Vector Search → Retrieve Top-K Chunks → FM Prompt
```

### Key Pipeline Concepts

**Chunking** — splitting a large document into smaller, semantically meaningful segments before embedding and storage. Required because:
- Foundation models have limited context windows and cannot process entire documents at once
- Smaller chunks produce more precise retrieval — returning only the relevant section, not an entire 100-page document
- Each chunk is embedded and searched independently

**Embedding** — converting a text chunk into a numerical vector (array of numbers) that captures its semantic meaning. Embedding happens *after* chunking. Embeddings enable semantic similarity search in the vector store.

**Indexing** — organizing and storing chunks and their embeddings in a searchable structure (the vector database index). Indexing happens *after* embedding. It makes chunks retrievable but is not the same as splitting them.

**Sequential order: Chunking → Embedding → Indexing**

::: warning Exam Trap — Chunking vs. Tokenization
**Tokenization** is a different process: it breaks text into tokens (words or subwords) and converts them into numerical IDs for the model's neural network. Tokenization happens *internally* when the model processes text — it is not the same as chunking documents for retrieval.

- **Chunking** = splitting at the paragraph/section level, *before* the model, for retrieval
- **Tokenization** = splitting at the word/subword level, *inside* the model, for inference

If an exam question asks "what is the process of dividing documents into smaller segments for RAG?" — the answer is **chunking**, not tokenization, embedding, or indexing.
:::

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

### Embedding Models

Embeddings are numerical vector representations of text. Semantically similar text produces vectors that are close together in vector space — this is what enables semantic search ("find chunks *meaning* the same thing as the query", not just keyword matches).

| Model | Vendor | Best For |
|---|---|---|
| **Titan Text Embeddings v2** | AWS | General purpose, AWS-native RAG (configurable dimensions) |
| **Cohere Embed** | Cohere | Multilingual retrieval, semantic search |

---

## 1.4 Vector Stores

### Primary Options

| Vector Store | Type | Best For | Key Characteristic |
|---|---|---|---|
| **Amazon OpenSearch Serverless** | Managed, serverless | Bedrock Knowledge Bases (default) | Scales to zero, no cluster management |
| **Aurora PostgreSQL + pgvector** | RDS extension | Existing PostgreSQL infrastructure | SQL + vector search in one database |
| **Amazon Kendra** | Managed enterprise search | Enterprise document retrieval | NLP-powered, not pure vector similarity |

::: warning Exam Trap
**OpenSearch Serverless** is the default for Bedrock Knowledge Bases — not standard OpenSearch managed clusters. The exam distinguishes between these. Choose OpenSearch Serverless when the question mentions "Knowledge Bases," "fully managed vector store," or "RAG with Amazon Bedrock."
:::

### OpenSearch Serverless — Key Facts

- Collection type must be set to **Vector search** at creation
- Supports up to **16,000 dimensions** per vector
- Integrated with Bedrock Knowledge Bases via IAM service-linked role
- Does NOT support standard OpenSearch full-text features (custom analyzers, etc.)

---

## 1.5 Compliance, Data Residency & Security

### Key Controls

| Requirement | AWS Control | How |
|---|---|---|
| **Data not used to train models** | Amazon Bedrock default | Customer data is isolated — Bedrock never uses it to train base models |
| **Data residency** | AWS Region + VPC Endpoints | Choose the AWS region; use PrivateLink to keep traffic off public internet |
| **Encryption at rest** | AWS KMS | Enable KMS keys on S3 buckets and OpenSearch Serverless collections |
| **Encryption in transit** | TLS | All Bedrock API calls are TLS-encrypted by default |
| **Network isolation** | VPC Endpoints (PrivateLink) | Routes Bedrock traffic through the AWS backbone, bypassing the public internet |
| **Access control** | AWS IAM | Least-privilege resource policies scoped to specific model IDs |

::: info Key Fact
Amazon Bedrock does **not** use customer prompts, completions, or training data to train the underlying foundation models. This is a built-in data privacy guarantee — any answer suggesting otherwise is wrong.
:::

---

## 1.6 Model Customization: Bedrock Fine-Tuning vs. SageMaker vs. RAG

### Three Customization Approaches

| Approach | Where | When to Use |
|---|---|---|
| **RAG** | Bedrock Knowledge Bases | Knowledge changes frequently; need source attribution; fastest to deploy |
| **Bedrock Fine-Tuning** | Amazon Bedrock | Stable data; model needs a specific tone, format, or domain vocabulary; no custom infrastructure |
| **Continued Pre-Training** | Amazon Bedrock | Model needs to internalize new domain knowledge (e.g., proprietary terminology, niche corpus) |
| **SageMaker Fine-Tuning** | Amazon SageMaker | Need full control over training: custom framework, hyperparameters, or training pipeline |

### Bedrock Fine-Tuning

- Supported for select models (check the Bedrock console for current support — not all FMs support fine-tuning)
- Training data uploaded to **Amazon S3** as JSONL prompt-completion pairs
- No infrastructure to manage — Bedrock handles the compute
- Result: a **fine-tuned model variant** deployed within Bedrock, invoked like any other FM
- Best for: adapting writing style, enforcing output format, domain-specific jargon

### Continued Pre-Training

- Also runs within Amazon Bedrock — no infrastructure required
- Training data is raw, unlabeled domain text (not prompt-completion pairs)
- Use when the model needs to **learn new vocabulary or a proprietary knowledge corpus** — not just follow a style
- More expensive and slower than fine-tuning; use only when RAG can't meet the need

### Amazon SageMaker for Custom Models

- Full-control managed ML training service
- Use when you need:
  - A custom training framework (PyTorch, TensorFlow, JAX)
  - Fine-grained hyperparameter control
  - Training on a proprietary model architecture not available in Bedrock
- SageMaker **JumpStart** provides pre-trained foundation models (including open-source LLMs like Llama) that you can fine-tune and deploy on SageMaker endpoints
- Deploy via **SageMaker Endpoints** — invoked through the SageMaker Runtime API (different from `bedrock:InvokeModel`)

::: warning Exam Trap
**Bedrock fine-tuning vs. SageMaker fine-tuning:**
- Choose **Bedrock** when the question emphasizes "managed," "no infrastructure," or "within Bedrock"
- Choose **SageMaker** when the question mentions "custom training pipeline," "bring your own framework," or "full control"
- Choose **RAG** when the knowledge changes frequently or source attribution is required — fine-tuning bakes knowledge into the model weights and cannot be updated without retraining
:::

---

[← Back to Overview](./index.md) · [Next: Domain 2 →](./domain-2.md)
