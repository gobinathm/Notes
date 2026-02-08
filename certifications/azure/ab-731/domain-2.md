---
title: "Domain 2 - Microsoft AI Solutions"
description: "AB-731 Domain 2: Microsoft 365 Copilot, Azure AI Foundry, and other AI solutions"
head:
  - - meta
    - name: keywords
      content: ab-731, domain 2, m365 copilot, azure ai foundry, copilot studio
---

# Domain 2: Microsoft AI Solutions (35-40%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

---

## Which Solution for What?

| Need | Solution |
|------|----------|
| Everyday productivity | **Microsoft 365 Copilot** |
| Custom AI apps | **Azure AI Foundry** |
| Sales workflows | Copilot for Sales |
| Customer service | Copilot for Service |
| CRM/ERP workflows | Dynamics 365 Copilot |
| Low-code automation | Power Platform AI |

::: warning Trap
Know the difference: M365 Copilot = productivity tool for users. Azure AI Foundry = platform for building custom AI.
:::

## Microsoft 365 Copilot by App

| App | What it does |
|-----|--------------|
| Word | Draft, summarize, rewrite |
| Excel | Analyze, formulas, charts |
| PowerPoint | Create from docs, design |
| Outlook | Draft, summarize threads, prioritize |
| Teams | Meeting summaries, action items |

**Business Chat / M365 Chat**: Cross-app assistant. Queries emails, docs, meetings together.

::: tip Exam Tip
**Copilot Studio** is for **extending** Copilot. If a question asks how to give Copilot access to a non-Microsoft database (like Salesforce), the answer is usually **Copilot Studio (Connectors)**.
:::

## Build vs Buy vs Extend (Strategic Selection)

Microsoft recommends this sequence to minimize cost and time-to-value.

| Approach | Tool | Best For... | Investment |
|----------|------|-------------|------------|
| **Buy** | M365 Copilot | Standard productivity, off-the-shelf value. | Low (Licensing) |
| **Extend** | Copilot Studio | Connecting Copilot to custom data/APIs. | Medium (Low-code) |
| **Build** | Azure AI Foundry | High-customization, unique business logic. | High (Pro-code) |

---

## Copilot Security & Compliance

Three things to remember:

1. **Tenant isolation** — Your data stays in your tenant.
2. **Respects permissions** — Users only see what they already have access to.
3. **Not used for training** — Microsoft doesn't train public models on your data.

::: danger Critical
**Tenant Isolation**: Your data is **NOT** used to train foundation models (like GPT-4). This is a foundational Microsoft promise you must know for the exam.
:::

### Advanced Security
- **Data Residence**: You can control where your data is stored (e.g., EU-only for GDPR).
- **Sovereign Clouds**: Specialized environments for high-security governments (e.g., Azure Government).
- **Content Security**: Built-in filters to block harmful content (hate, violence, self-harm) at the gateway.

<FlashcardDeck 
  title="Copilot Security"
  :cards="[
    {
      question: 'Does Copilot use my data to train public models?',
      answer: '<strong>NO</strong>. Enterprise data stays private within your tenant and is not used to train the base models.'
    },
    {
      question: 'Can users see data they don\'t have permission to access?',
      answer: '<strong>NO</strong>. Copilot respects existing permissions. Users only see what they already have access to.'
    },
    {
      question: 'Where does my organization\'s data stay?',
      answer: '<strong>In your tenant</strong>. Tenant isolation ensures your data never leaves your Microsoft 365 environment.'
    },
    {
      question: 'What is a Sovereign Cloud?',
      answer: 'A separate, air-gapped or specialized cloud environment for high-security or government data requirements.'
    }
  ]"
/>

## Azure AI Foundry

- Build custom AI applications
- Access multiple models (OpenAI, Meta, Mistral)
- Fine-tuning, RAG, prompt engineering tools
- Enterprise security and compliance

## Licensing & Pricing (Cost Models)

Understanding costs is critical for a transformation leader.

### Microsoft 365 Copilot
| Tier | Cost (Approx.) | Target |
|------|----------------|--------|
| **Copilot Chat** | Included | Standard business/enterprise licenses. |
| **Copilot Pro** | $20/user/mo | Individuals, Family, and Personal plans. |
| **M365 Copilot** | $30/user/mo | Business & Enterprise. (No min. seat requirement). |
| **Copilot Studio** | $200/mo | For building and publishing custom agents. |

::: tip Exam Tip
**Role-based Copilots** (Sales, Service, Finance) are now generally **included** in the $30/mo M365 Copilot license. You don't need a separate add-on anymore.
:::

### Azure AI Services
- **Pay-As-You-Go**: Charged per 1,000 tokens (Input vs. Output). Flexible but variable.
- **PTU (Provisioned Throughput)**: Reserved capacity for high-volume, predictable workloads. Costs are more predictable but require a commitment.
- **Storage & Search**: Additional costs for Azure AI Search (indexing) and Data Storage.

## Azure AI Services Deep Dive

| Service | What it is | Where it is used (Use Case) |
|---------|------------|----------------------------|
| **Microsoft 365 Copilot** | AI assistant integrated into M365 apps (Word, Excel, Teams, etc.). | Everyday productivity, summarizing meetings, drafting emails, and document creation. |
| **Azure AI Foundry (Studio)** | A unified platform for building, testing, and deploying custom AI solutions. | For developers/leaders to build custom AI apps using multiple models (OpenAI, Meta, etc.). |
| **Azure OpenAI Service** | Cloud-based access to OpenAI's powerful models (GPT-4o, DALL-E) with enterprise security. | Generating text, code, and images; building advanced chatbots and RAG systems. |
| **Azure AI Search** | A high-performance retrieval service for indexing and searching data. | **RAG (Retrieval-Augmented Generation)**—connecting AI models to your specific business data. |
| **Azure AI Language** | Natural Language Processing (NLP) service for text analysis. | Sentiment analysis, key phrase extraction, summarization, and entity recognition. |
| **Azure AI Vision** | Computer vision service for analyzing images and videos. | Object detection, OCR (extracting text from images), and content moderation. |
| **Azure AI Speech** | Voice services for conversion between speech and text. | Transcription (Talk-to-Text), Speech Synthesis (Text-to-Talk), and real-time translation. |
| **Azure AI Document Intelligence** | Intelligent document processing using AI. | Extracting **key-value pairs**, tables, and text from PDFs, invoices, and forms automatically. |
| **Copilot Studio** | A low-code tool to create and customize Copilots. | Extending M365 Copilot or building custom standalone agents for specific business workflows. |
| **Power Platform AI Builder** | Low-code AI capabilities for Power Apps and Power Automate. | Automating business processes with AI without deep coding knowledge. |
