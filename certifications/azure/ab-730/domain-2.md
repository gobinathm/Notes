---
title: "Domain 2 - Manage Prompts & Conversations"
description: "AB-730 Domain 2: Prompt engineering and conversation management"
head:
  - - meta
    - name: keywords
      content: ab-730, domain 2, prompt engineering, copilot chat, context
---

# Domain 2: Manage Prompts & Conversations (35-40%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

---

## ✍️ Prompt Engineering Fundamentals

Mastering the **Goal, Context, Source, and Expectation** framework is essentially the "API" for talking to Copilot.

- **Goal**: What exactly do you want the AI to do? (e.g., "Summarize this transcript")
- **Context**: Why are you doing this? (e.g., "for a stakeholder report")
- **Source**: Which data should be used? (e.g., "referencing /MeetingNotes.docx")
- **Expectation**: What should the output look like? (e.g., "use professional bullet points")

::: tip Exam Tip
Vague prompts lead to vague results. Always specify a **Persona** (e.g., "as a Data Analyst") to improve the weighting of the AI response.
:::

---

## 🚀 Advanced Prompt Management

Managing prompts is about building a library of high-quality AI directives using **Copilot Lab**.

- **Saving & Favoriting**: Use the "Star" icon in the UI to save effective prompts to your personal library.
- **Sharing**: You can share prompts via a unique link or by publishing them to your **Organization's Prompt Gallery**.
- **Scheduling**: For recurring tasks (like weekly status reports), you can **Schedule** prompts to run automatically on a set cadence.

---

## 🔍 Context and Grounding

Copilot is most powerful when it uses your specific data as the "Truth" for its answers.

| Type | How to use | Example |
|------|------------|---------|
| **Files** | Use the `/` symbol or paperclip | `/Product_Specs.pdf` |
| **Web Search** | Toggle the "Web" search switch | "Latest news on AI regs..." |
| **App Context** | Automatic based on current view | Draft a reply to *this* email. |

---

## 💬 Conversation Management

Don't treat your chats as disposable; manage them like a persistent knowledge base.

- **History Management**: Use the sidebar to search for past interactions. You can **Rename** chats for better organization or **Delete** them for privacy hygiene.
- **New Topic**: Always use the "New Topic" button to reset the **Short-term Memory** and prevent old context from "polluting" new questions.
- **Notebooks**: Add AI interactions to your **Copilot Notebook** for long-form refinement. Notebooks support larger context windows and persistent collaborative editing.

---

## 🛠️ The Agent Ecosystem

Agents are specialized, task-specific versions of Copilot. Knowing how to select and configure them is a core exam objective.

### Finding and Creating Agents
- **Agent Store**: Enable verified third-party agents (e.g., Adobe, ServiceNow) from the store.
- **Templates**: Start building agents using **Templates** designed for specific roles (HR, IT, Project Management).
- **Sharing**: Once built, custom agents can be shared with individual team members or the whole organization.

### Configuring Agents (Copilot Studio)
1.  **Knowledge Sources**: Ground the agent in specific **SharePoint Sites**, **OneDrive Folders**, or manual file uploads.
2.  **Capabilities**: Toggle features like **Web Search** (real-time info) or **Image Generation**.
3.  **Instruction & Tone**: Define a specific persona and behavior for the agent to follow.
4.  **Suggested Prompts**: Pre-fill "Starter prompts" to help users know what to ask.

---

<FlashcardDeck 
  title="Domain 2: Quick Recap"
  :cards="[
    {
      question: 'Where do you go to save and share high-quality prompts?',
      answer: '<strong>Copilot Lab</strong>.'
    },
    {
      question: 'How do you prevent a new chat from being influenced by old context?',
      answer: 'Use the <strong>New Topic</strong> button to clear the short-term memory.'
    },
    {
      question: 'What is the primary way to ground a custom agent in your data?',
      answer: 'By adding <strong>Knowledge Sources</strong> like SharePoint or specific files.'
    }
  ]"
/>
