---
title: "Domain 2 - Data Implementation & RAG"
description: "GCP Gen AI Leader Domain 2: Embeddings, Vector Search, and RAG implementation"
head:
  - - meta
    - name: keywords
      content: gcp, gen ai leader, rag, embeddings, vector search
---

# Domain 2: Data Implementation & RAG

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

---

## Embeddings

To perform RAG, you must convert text into numerical vectors.

<FlashcardDeck 
  title="Embeddings & RAG"
  :cards="[
    {
      question: 'What are Embeddings?',
      answer: '<strong>Numerical representations of text</strong><br>Similar meanings = similar vectors<br>Service: Vertex AI Embeddings API.'
    },
    {
      question: 'What is Vertex AI Vector Search?',
      answer: '<strong>High-scale, low-latency vector database</strong><br>Formerly: Matching Engine<br>Search through millions of embeddings for RAG.'
    },
    {
      question: 'Why use RAG?',
      answer: '<strong>Ground LLMs in your own data</strong><br>Reduces hallucinations<br>Enables access to corporate PDFs, databases, documents.'
    }
  ]"
/>

- **Service**: Vertex AI Embeddings API
- **Analogy**: A library where books with similar themes are placed on the same shelf

---

## Vertex AI Vector Search

Formerly known as Matching Engine.

- **Function**: A high-scale, low-latency database for searching through millions of embeddings
- **Integration**: Essential for grounding LLMs in your own corporate data (PDFs, Databases)

---

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)
