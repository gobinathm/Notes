---
title: "AI-102 Consolidated Study Notes"
description: "Code snippets, patterns, and condensed notes for the AI-102 Azure AI Engineer Associate exam"
head:
  - - meta
    - name: keywords
      content: ai-102, study notes, code snippets, sdk patterns, azure ai, consolidated notes
---

# AI-102 Consolidated Study Notes

## 🛠️ Microsoft AI Foundry Architecture
- **Foundry Hub**: Common resource for security, compute, and connections.
- **Foundry Project**: Collaborative workspace for building AI apps.
- **Model Catalog**: One-stop shop for Azure OpenAI, Meta, Mistral, and other models.

## 🤖 Generative AI Implementation
- **Chat Completions API**:
  ```python
  from azure.ai.inference import ChatCompletionsClient
  
  client = ChatCompletionsClient(endpoint, credential)
  response = client.complete(
      messages=[
          {"role": "system", "content": "You are a help assistant."},
          {"role": "user", "content": "How do I use Prompt Flow?"}
      ],
      temperature=0.7
  )
  ```
- **RAG Pattern**: Retrieve (Azure AI Search) -> Augment (Insert as context) -> Generate (LLM).
- **Prompt Flow**: Visual tool with LLM, Python, and Prompt nodes.

## 🕵️ Agentic Solutions
- **Agent Service**: Uses a reasoning loop (CoT) to decide which tools to call.
- **Tool Definition**: Describing functions in JSON schema so the model knows how to "invoke" them.
- **Sandboxed Execution**: Using **Code Interpreter** for safe Python execution.

## 👁️ Vision & NLP
- **OCR Pattern**: For Vision 4.0, `imageanalysis:analyze?features=read` returns `readResult` in the `200 OK` response body; older Read APIs used polling.
- **Face Identification**: 1:N search against a `PersonGroup`.
- **CLU**: Map user utterances to Intents. Use `prebuilt` entities for dates/numbers.
- **QA**: Import data sources (URLs, PDFs) to create a conversational KB.

## 🔍 Search & Mining
- **Skillsets**: Chain of AI skills (OCR, KeyPhrases, Custom Web API).
- **Hybrid Search**: Keyword + Vector (HNSW) + Semantic Re-ranker.
- **Document Intelligence**: Layout, Prebuilt, and Custom (Template vs Neural) models.
