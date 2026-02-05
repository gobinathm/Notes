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

## Copilot Security Model

Three things to remember:

1. **Tenant isolation** — Your data stays in your tenant
2. **Respects permissions** — Users only see what they already have access to
3. **Not used for training** — Microsoft doesn't train public models on your data

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
    }
  ]"
/>

## Azure AI Foundry

- Build custom AI applications
- Access multiple models (OpenAI, Meta, Mistral)
- Fine-tuning, RAG, prompt engineering tools
- Enterprise security and compliance
