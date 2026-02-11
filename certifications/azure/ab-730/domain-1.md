---
title: "Domain 1 - GenAI Fundamentals"
description: "AB-730 Domain 1: How LLMs work, Responsible AI, and Risks"
head:
  - - meta
    - name: keywords
      content: ab-730, domain 1, llm, generative ai, risks, responsible ai
---

# Domain 1: GenAI Fundamentals (25-30%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

---

## How LLMs Work in Microsoft 365

Microsoft 365 Copilot uses Large Language Models (LLMs) combined with your organization's data in the **Microsoft Graph**.

- **Pre-training**: Models are trained on massive datasets to understand language patterns.
- **The Copilot System**: When you send a prompt, Copilot "grounds" it by retrieving context from your emails, files, and calendar via the **Microsoft Graph**.
- **Semantic Index**: A map of your data that allows Copilot to find *meaning* in your files, not just keywords. (e.g., finding "budget" documents when you ask about "costs").
- **Tokens**: AI processes text in chunks called tokens. More tokens = higher cost/processing.

## Contextual Influence

The "Grounding" process is influenced by different layers of data:

1.  **Work Context**: Data from your M365 tenant (emails, chats, files).
2.  **Web Context**: Real-time information (if "Web" toggle is on).
3.  **App Context**: The specific application you are using (e.g., Copilot in Word knows you are writing a document).

::: tip Exam Tip
Copilot prioritizes **Work Context** (your data) to ensure answers are relevant to your specific business role.
:::

## Custom Copilot Agents

In addition to standard Copilot, you can build **Custom Agents** for specific business needs. 

### When to build a custom agent?
1.  **Specialized Knowledge**: When you need the AI to focus on a specific, narrow dataset (e.g., a "Policy Guru" that only looks at HR manuals).
2.  **Unique Workflows**: When you need to automate multi-step business processes that standard Copilot doesn't handle natively.
3.  **Third-Party Data**: When you need the AI to access information stored outside the Microsoft 365 ecosystem (e.g., CRM or ERP systems).
4.  **Defined Persona**: When you want the AI to always act with a specific tone or role (e.g., a "Legal Compliance Reviewer").

::: info Purpose
Custom agents are built using **Copilot Studio** to extend the reach of AI into your unique organizational logic and data.
:::

## Chat vs. Agent Experience

| Feature | Copilot Chat | Copilot Agent |
|---------|--------------|---------------|
| **Scope** | Broad, conversational | Specific, task-oriented |
| **Context** | Uses entire M365 Graph | Uses specific, narrow data/folders |
| **Workflow** | Dynamic follow-ups | Structured, multi-step |
| **Creation** | Out-of-the-box | Built in Copilot Studio |

## Copilot Across M365 Apps

| App | Key Capability | Requirement | Use Case |
|-----|----------------|-------------|----------|
| **Excel** | Data analysis & formulas | **Excel Table** format | Trend analysis |
| **Word** | Drafting & **Rewrite** | Text selection | Transforming notes |
| **PPT** | **Create from File** | Word/PDF source | Presentation design |
| **Outlook** | **Summary by Copilot** | Email thread | Catching up |
| **Teams** | **Meeting Recap** | Transcription/Record | Action items |

## Data Protection & Privacy

Using AI doesn't mean bypassing security. Copilot respects organizational boundaries and individual permissions.

- **Tenant Isolation**: Your data stays within your organization's Microsoft 365 boundary and is never leaked between tenants.
- **No Training**: Microsoft does **not** use your business data to train the foundational public LLMs.
- **Permissions**: Copilot acts as a "user" with your exact permissions. If you don't have access to a folder, Copilot can't find it.
- **Sensitivity Labels**: Copilot respects labels (e.g., "Confidential") and honors the protection they provide.
- **DLP (Data Loss Prevention)**: Files blocked by DLP policies are excluded from grounding results.

> [!IMPORTANT]
> **Grounding Filter**: Permissions and labels act as a "mandatory filter." Copilot will never return information you aren't authorized to see.

## Responsible AI & Risks

Using AI safely is a core part of the AB-730 exam.

### Key Risks
- **Hallucinations (Fabrications)**: The AI generates confident but false information.
- **Bias**: The AI may mirror prejudices found in its training data.
- **Over-reliance**: Trusting AI output without human verification.
- **Prompt Injection**: Maliciously trying to bypass AI safety guards with clever wording.

::: danger Critical
**Human-in-the-Loop**: AI output must always be reviewed by a human for accuracy and tone before being used in a final business context.
:::

<FlashcardDeck 
  title="Fundamentals Quiz"
  :cards="[
    {
      question: 'Does Microsoft train public models on your business data?',
      answer: '<strong>NO</strong>. Your organization\'s data stays private and secure.'
    },
    {
      question: 'What is a fabrication in AI?',
      answer: 'When the AI generates realistic-sounding but incorrect information (hallucination).'
    },
    {
      question: 'What is the human-in-the-loop principle?',
      answer: 'The requirement that a human must review and verify AI-generated content.'
    }
  ]"
/>
