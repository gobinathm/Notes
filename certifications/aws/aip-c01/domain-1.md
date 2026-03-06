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

```
S3 (raw documents: PDFs, TXT, HTML, Markdown)
    ↓ ingestion / pre-processing
Chunking (split into smaller text pieces)
    ↓
Embedding Model (Titan Text Embeddings / Cohere Embed)
    ↓ convert text to vectors
Vector Store (OpenSearch Serverless or Aurora pgvector)
    ↓ at inference time
Query → Embed Query → Vector Search → Retrieve Top-K Chunks → FM Prompt
```

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

<FlashcardDeck
  storage-key="aip-c01-d1-cards"
  :cards="[
    {
      question: 'Which FM on Bedrock has the largest context window?',
      answer: '<strong>Claude (Anthropic)</strong> — up to 200,000 tokens. Use Claude when the task requires processing long documents or maintaining extended conversation history.'
    },
    {
      question: 'When should you choose RAG over fine-tuning?',
      answer: 'Choose <strong>RAG</strong> when the knowledge base changes frequently, you need source attribution, or you want to avoid training costs. Choose <strong>fine-tuning</strong> when you need the model to adopt a new style, format, or specialized tone on stable data.'
    },
    {
      question: 'Which vector store is the default for Amazon Bedrock Knowledge Bases?',
      answer: '<strong>Amazon OpenSearch Serverless</strong> (vector search collection type) — managed, serverless, scales to zero. Aurora PostgreSQL with pgvector is the alternative for teams with existing PostgreSQL infrastructure.'
    },
    {
      question: 'What chunking strategy is best when you need both broad context and fine-grained retrieval?',
      answer: '<strong>Hierarchical chunking</strong> — creates parent chunks (broad context) and child chunks (fine detail), allowing the retriever to fetch the right granularity for each query.'
    },
    {
      question: 'Does Amazon Bedrock use your prompt data to train foundation models?',
      answer: '<strong>No.</strong> Amazon Bedrock does not use customer data (prompts, completions, or custom training data) to train or improve the underlying foundation models. This is a built-in privacy and compliance guarantee.'
    },
    {
      question: 'Which temperature setting produces more deterministic outputs?',
      answer: 'Lower temperature (0.0–0.3) produces more deterministic, focused outputs. Higher temperature (0.7–1.0) increases creativity and variability. Use low temperature for factual Q&A and high temperature for creative or diverse generation.'
    },
    {
      question: 'What is the primary AWS service for vector storage in Bedrock Knowledge Bases?',
      answer: '<strong>Amazon OpenSearch Serverless</strong> — specifically the vector search collection type. It is the default managed vector store for Bedrock Knowledge Bases. NOT the standard OpenSearch managed cluster.'
    }
  ]"
/>

---

[← Back to Overview](./index.md) · [Next: Domain 2 →](./domain-2.md)
