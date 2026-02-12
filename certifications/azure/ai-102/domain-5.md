---
title: "Domain 5: Generative AI Solutions"
description: "Notes on Azure OpenAI Service, Chat Completions, and RAG"
---

# Domain 5: Implement Generative AI Solutions (15-20%)

## 5.1 Azure OpenAI Service

### Provisioning
- Requires approval (access form) for subscription.
- **Deployments**: You must deploy a model (e.g., `gpt-35-turbo`) to use it.
- **Quotas**: Tokens Per Minute (TPM) or Request Per Minute (RPM) limits.

### Chat Completions API
- **Roles**:
  - `system`: Sets behavior and context ("You are a helpful assistant").
  - `user`: The person chatting.
  - `assistant`: The AI's responses.
- **Parameters**:
  - `temperature`: Creativity (0.0 - 1.0). Lower is more deterministic.
  - `top_p`: Nucleus sampling. Use either this OR temperature, not both.
  - `max_tokens`: Limit output length.

### Function Calling
- Describe functions/tools to the model in the API call.
- Model intelligently chooses to output a JSON object calling that function.
- Your code executes the function and sends the result back to the model.

## 5.2 Retrieval Augmented Generation (RAG)

### Concept
- Combining LLMs with your own data without fine-tuning.
- **Grounding**: Providing retrieved data as context to reduce hallucinations.

### "On Your Data" Feature
- Connects Azure OpenAI directly to:
  - **Azure AI Search** (Recommended for scale/semantic search).
  - **Blob Storage** (Basic keyword search).
- Automatically retrieves chunks and injects them into the system prompt.
