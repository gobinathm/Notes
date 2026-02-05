---
title: "Domain 2 - Fundamentals of Generative AI"
description: "AIF-C01 Domain 2: GenAI concepts, capabilities, limitations, and AWS services (24%)"
head:
  - - meta
    - name: keywords
      content: aif-c01, domain 2, generative ai, llm, bedrock, foundation models
---

# Domain 2: Fundamentals of Generative AI (24%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

---

## 2.1: What is Generative AI?

**Traditional ML**: Analyzes and classifies (discriminative)
- Input: Email → Output: Spam/Not Spam

**Generative AI**: Creates new content (generative)
- Input: "Write a poem about clouds" → Output: Original poem

---

## Key Concepts

<FlashcardDeck 
  title="GenAI Core Concepts"
  :cards="[
    {
      question: 'What is a Token?',
      answer: '<strong>Basic unit of text for LLMs</strong><br>Roughly 1 token ≈ 0.75 words<br>Example: &quot;Hello world&quot; = 2 tokens<br>Affects cost and processing.'
    },
    {
      question: 'What is a Context Window?',
      answer: '<strong>Maximum tokens a model can process at once</strong><br>Includes both input (prompt) and output<br>Example: Claude 2 has 100K token context window.'
    },
    {
      question: 'What are Embeddings?',
      answer: '<strong>Numerical representations of text</strong><br>Similar meanings = similar embeddings<br>Used for semantic search, RAG, clustering.'
    },
    {
      question: 'What is a Foundation Model?',
      answer: '<strong>Large model trained on vast amounts of data</strong><br>Can perform multiple tasks without task-specific training<br>Examples: GPT-4, Claude, Llama, Stable Diffusion.'
    }
  ]"
/>

### Foundation Models (FMs)
- **Large models** trained on vast amounts of data
- Can perform **multiple tasks** without task-specific training
- Examples: GPT-4, Claude, Llama, Stable Diffusion

### Large Language Models (LLMs)
- Foundation models specifically for text
- Trained on text from books, websites, articles
- Understand and generate human-like text

### Transformers
- **Architecture** behind modern LLMs
- Key innovation: **Attention mechanism**
  - Allows model to focus on relevant parts of input
  - Enables understanding of context

---

## 2.2: Capabilities and Limitations

### Capabilities of Generative AI

**Text Generation**:
- ✅ Write articles, stories, emails
- ✅ Summarize documents
- ✅ Translate languages
- ✅ Answer questions

**Code Generation**:
- ✅ Write code from descriptions
- ✅ Debug and explain code
- ✅ Generate unit tests

**Reasoning**:
- ✅ Multi-step problem solving
- ✅ Chain-of-thought reasoning
- ✅ Mathematical calculations (with limitations)

**Few-Shot Learning**:
- ✅ Learn from just a few examples in prompt
- ✅ Adapt to new tasks without retraining

**Multimodal**:
- ✅ Process text + images
- ✅ Generate images from text
- ✅ Understand and describe images

---

### Limitations of Generative AI

<FlashcardDeck 
  title="GenAI Limitations"
  :cards="[
    {
      question: 'What is Hallucination in GenAI?',
      answer: '<strong>Generating false or nonsensical information presented as fact</strong><br>Why: Model predicts next token, not accessing knowledge database<br>Mitigation: Use RAG, implement guardrails, human review.'
    },
    {
      question: 'Why cannot LLMs access current events?',
      answer: '<strong>Training data cutoff</strong><br>Models do not know events after training<br>Solution: Use RAG to provide current data.'
    },
    {
      question: 'What causes bias in GenAI models?',
      answer: '<strong>Bias in training data</strong><br>Models reflect biases in training data<br>Solution: Careful data curation, testing, use SageMaker Clarify.'
    }
  ]"
/>

::: danger Critical Exam Concept: Hallucinations
**Hallucination**: When model generates **false or nonsensical information** presented as fact.

**Why it happens**:
- Model is predicting next token, not accessing knowledge database
- Trained to be helpful and complete responses
- No built-in fact-checking

**Mitigation**:
- Use RAG to provide factual context
- Implement guardrails
- Human review for critical applications
:::

**Other Limitations**:

1. **Training Data Cutoff**
   - Models don't know events after training
   - Solution: Use RAG for current data

2. **Context Window Limits**
   - Can't process extremely long documents
   - Solution: Chunking, summarization

3. **Computational Cost**
   - Expensive to train and run
   - Larger models = higher cost

4. **Bias in Training Data**
   - Reflects biases in training data
   - Solution: Careful data curation, testing

5. **No Real-Time Data**
   - Can't access internet or databases
   - Solution: RAG, function calling

6. **Lack of True Understanding**
   - Pattern matching, not reasoning
   - Can make logical errors

---

## 2.3: AWS Generative AI Services

### Amazon Bedrock

**Fully managed service** to access foundation models via API

**Key Features**:
- Multiple model providers (Anthropic, AI21, Cohere, Meta, Stability AI, Amazon)
- Pay-per-use pricing
- No infrastructure management
- Data privacy (your data doesn't train models)

<FlashcardDeck 
  title="Bedrock Models"
  :cards="[
    {
      question: 'Which Bedrock model has the longest context window?',
      answer: '<strong>Anthropic Claude</strong><br>200K token context window<br>Best for: Long document analysis, reasoning, code generation.'
    },
    {
      question: 'Which Bedrock model is most cost-effective?',
      answer: '<strong>Amazon Titan Text</strong><br>AWS-optimized, lower cost<br>Best for: Simple text generation tasks.'
    },
    {
      question: 'Which Bedrock model is used for embeddings?',
      answer: '<strong>Amazon Titan Embeddings</strong><br>Optimized for text embeddings<br>Best for: RAG, semantic search, clustering.'
    }
  ]"
/>

**Models Available**:

| Provider | Model | Strengths |
|----------|-------|-----------|
| **Anthropic** | Claude | Long context (200K), reasoning, code |
| **Amazon** | Titan Text | Cost-effective, AWS-optimized |
| **Amazon** | Titan Embeddings | Text embeddings for search |
| **Amazon** | Titan Image Generator | Image generation |
| **AI21 Labs** | Jurassic | Multilingual text |
| **Cohere** | Command | Text generation, summarization |
| **Meta** | Llama 2 | Open-source, customizable |
| **Stability AI** | Stable Diffusion | Image generation |

**Use Cases**:
- Chatbots and virtual assistants
- Content generation
- Document summarization
- Code generation
- Image generation

---

### Amazon Q

**AI-powered assistant for business**

**Capabilities**:
- Answer questions about your business data
- Generate content
- Summarize documents
- Connect to enterprise data sources

**Use Cases**:
- Internal knowledge base queries
- Customer support
- Employee assistance
- Business intelligence

---

### Amazon CodeWhisperer

**AI coding companion**

**Features**:
- Real-time code suggestions
- Supports multiple languages (Python, Java, JavaScript, etc.)
- Security scanning
- Reference tracking (avoids IP issues)

**Use Cases**:
- Accelerate development
- Learn new APIs
- Generate boilerplate code
- Unit test generation

---

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)
