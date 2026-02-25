---
title: "Domain 1: FM Integration & Data Management"
description: "Detailed notes on Foundation Model integration, data management, and compliance for AIP-C01"
---

# Domain 1: FM Integration, Data Management, and Compliance (31%)

[← Back to Index](./index.md)

This domain is the largest weighting of the exam (31%). It focuses on how to select, configure, and feed data into foundation models securely and efficiently.

## 1.1 Foundation Model Selection

### Understanding Model Families
- **Claude (Anthropic)**: Excellent for reasoning and large context windows (up to 200k tokens).
- **Llama (Meta)**: Popular open-source model, good for fine-tuning.
- **Mistral**: Efficient and high performance for its size.
- **Titan (AWS)**: Optimized for AWS infrastructure, good for summarization and embeddings.

### Selection Criteria
- **Latency**: Use smaller models (e.g., Haiku) for real-time chat.
- **Cost**: Balance token pricing vs. performance.
- **Context Window**: Necessary for long document RAG.

## 1.2 Data Management for RAG

### Ingestion Pipeline
1. **Source**: S3 buckets containing PDFs, TXT, or HTML files.
2. **Chunking**: Breaking documents into smaller pieces (Standard, Hierarchical, or Semantic chunking).
3. **Embeddings**: Converting text to vectors using `Titan Text Embeddings` or `Cohere Embed`.
4. **Vector Store**: Storing vectors in **Amazon OpenSearch Serverless (OSS)**.

### Chunking Strategies
- **Fixed Size**: Simple but can break context.
- **Overlapping Tokens**: Ensures context is preserved between chunks.
- **Hierarchical**: parent-child relationship for better retrieval.

## 1.3 Compliance and Security

- **Data Privacy**: Bedrock does **not** use your data to train base models by default.
- **Encryption**: Use **AWS KMS** keys for data at rest (S3 and Vector stores).
- **Network Isolation**: Use **Interface VPC Endpoints** to keep traffic within the AWS backbone.

---

<FlashcardDeck storage-key="aip-c01-d1-cards" :cards="[
  { front: 'Which AWS service is the primary choice for managed vector storage in GenAI apps?', back: 'Amazon OpenSearch Serverless (OSS) — specifically the vector engine collection type.' },
  { front: 'What is the purpose of the context window?', back: 'The maximum amount of tokens a model can process in a single request (input + output history).' },
  { front: 'True or False: Amazon Bedrock uses customer data to train foundation models.', back: 'False. Customer data is NOT used to train or improve the underlying base models.' }
]" />

---

[Next: Domain 2 (Coming Soon) →](./index.md)
