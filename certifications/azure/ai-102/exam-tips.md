---
title: "AI-102 Exam Tips and Traps"
description: "Domain-specific tips, common traps, and general strategy for passing the AI-102 Azure AI Engineer Associate exam"
head:
  - - meta
    - name: keywords
      content: ai-102, exam tips, exam traps, study strategy, azure ai engineer, passing tips
---

# AI-102 Exam Tips & Traps

## 💎 General Tips
- **Branding Matters**: The exam heavily uses **Microsoft AI Foundry** (or just "Foundry tools"). If you see "Azure AI Studio," that's the older name—Foundry is the new standard.
- **Python/C# Focus**: You don't need to be a pro coder, but know the common SDK patterns (e.g., `DefaultAzureCredential`, `ProjectClient`, `ChatCompletionsOptions`).
- **REST vs SDK**: Most questions favor the SDK. Know the difference between a 202 async pattern (OCR) and a synchronous call.

## 🧊 Domain Specific Tips

### Domain 1: Plan & Manage
- **Hub vs Project**: Hub is for infrastructure/shared settings; Project is for your specific app/model testing.
- **PTU vs Standard**: Choose **Provisioned Throughput (PTU)** for predictable latency and enterprise scale. Choose **Standard** (PAYG) for development and variable traffic.

### Domain 2: Generative AI
- **RAG vs Fine-tuning**: 
  - Choose **RAG** for factual grounding on dynamic data.
  - Choose **Fine-tuning** for specific tone, complex output formats, or deep domain specialized knowledge (where RAG recall is poor).
- **Prompt Flow**: Know the node types (LLM, Python, Prompt). Evaluation flows are for measuring Groundedness and Relevance.

### Domain 3: Agentic Solutions
- **Tool Calling**: The model doesn't "run" the function; it *outputs* a JSON call that *your* application code runs.
- **Code Interpreter**: Use for math, sorting, or data analysis tasks that LLMs often hallucinate on.

### Domain 4: Vision
- **OCR READ API**: Always use the async pattern (Submit -> Check Status -> Get Results).
- **Video Indexer**: Remember it extracts *insights* (faces, topics, sentiment), not just OCR.

### Domain 5: NLP
- **Custom QA**: Replaces QnA Maker. Learn the current Language service question answering flow, not the retired `/knowledgebases/{kbId}/generateAnswer` endpoint.
- **Spoken Intent**: Since Azure AI Speech intent recognition was retired on September 30, 2025, map spoken intent questions to **Speech-to-Text + CLU**.
- **CLU Entities**: Use **Prebuilt entities** (Email, Number) whenever possible instead of manual ones.

### Domain 6: Knowledge Mining
- **Skillset Errors**: If an enrichment fails, check the **Indexer Execution History**.
- **Vector Search**: Requires **Embeddings** (e.g., `text-embedding-3-small`). Vectorization can be "integrated" (built-in) or manual.
- **Hybrid Search**: Always the "best" answer for complex retrieval (Keyword + Vector + Semantic Ranking).

## ⚠️ Common Traps
- **Rate Limits**: If you get 429 errors, the answer is usually "Implement exponential backoff" or "Increase TPM quota," not "Switch to a different model."
- **Content Safety**: Content filtering happens *at the resource level* in Azure OpenAI. If the model ignores bad words, check your Content Safety filter severity.
- **Search Latency**: If search is too slow, use **HNSW** (Hierarchical Navigable Small World) algorithm for vector indexing.
