---
title: "Domain 3 - Draft & Analyze Content"
description: "AB-730 Domain 3: Copilot usage in Word, Excel, PowerPoint, Outlook, and Teams"
head:
  - - meta
    - name: keywords
      content: ab-730, domain 3, m365 copilot, excel, word, powerpoint, teams, outlook
---

# Domain 3: Draft & Analyze Content (25-30%)

[← Domain 2](./domain-2.md) · [Cheatsheet →](./cheatsheet.md)

---

## Copilot in Microsoft 365 Apps

The exam tests your knowledge of **which** Copilot feature to use for specific business tasks.

### 📝 Microsoft Word
- **Drafting**: Create a first draft based on a prompt or an existing doc.
- **Rewriting**: Rephrase paragraphs to change the tone (Professional, Casual, Concise).
- **Summarizing**: Create a summary of a long document.
- **Visualize as Table**: Transform raw text into a clean table structure.

### 📊 Microsoft Excel
- **Analysis**: "What are the top 3 trends in this data?"
- **Formulas**: Generate complex formulas based on a natural language request.
- **Formatting**: Highlight cells or add conditional formatting via chat.
- **Charts**: Create a quick chart based on a data selection.
- *Note: Data must be in an **Excel Table** format for Copilot to work.*

### 🎨 Microsoft PowerPoint
- **Create from File**: Generate a full presentation based on a Word document.
- **Design**: Add an image or reorganize a slide's layout.
- **Speaker Notes**: Draft notes based on the content of the slides.

### ✉️ Microsoft Outlook
- **Drafting**: Write an email reply or an invitation.
- **Coaching**: AI reviews your draft for tone and clarity.
- **Summary by Copilot**: Summarize long email threads to find the latest action items.

### 👥 Microsoft Teams
- **Meeting Recap**: Summarize key points and action items during or after a meeting.
- **During the Meeting**: Ask "Am I being mentioned?" or "What's the sentiment of the discussion?" to stay informed in real-time.
- **Catch Up**: Ask "What happened before I joined?"
- **Search**: Find information across your chats and channels.

---

## Copilot Pages & Data Movement

### 📄 Copilot Pages
**Copilot Pages** is a dynamic, persistent canvas for AI-powered collaboration.

- **From Chat to Page**: You can take content from a Copilot chat and "pin" it to a Page.
- **Collaborative Editing**: Multiple users can work on a Page simultaneously, refining the AI-generated content together.
- **Persistent Knowledge**: Unlike a chat, a Page is designed to be shared and edited over time.

### 🔄 Data Movement Between Apps
The exam tests how you leverage AI across the ecosystem.

- **Excel to PPT**: Use Copilot to analyze data in Excel, then "Copy/Paste" the insights into a PowerPoint prompt to generate visual slides.
- **Word to PPT**: Directly use the "Create from file" feature in PowerPoint to transform a Word report into a presentation.
- **Consistency**: AI helps maintain the same tone and data accuracy when moving content from a summary (Outlook) to a proposal (Word).

---

## Copilot Agents

**Agents** are specialized versions of Copilot designed for specific apps or workflows.

- **Role-based Agents**: Sales, Service, and Finance agents provide deeper integration with CRM/ERP data.
- **Custom Agents**: Built in **Copilot Studio** to handle unique business processes.

::: tip Exam Tip
If a question asks how to automate a specific multi-step workflow involving a non-Microsoft app, look for **Copilot Agents** or **Copilot Studio** in the answers.
:::

## Memory & Instructions

Copilot's ability to "remember" and follow specific directives is key for collaborative drafting and long-term analysis.

- **Conversation Memory**: Within a single session, Copilot retains context. You can reference previous answers without repeating your constraints (e.g., "Now take the summary provided above and turn it into 5 bullet points").
- **Custom Instructions**: You can set persistent preferences for how Copilot should behave across all chats (e.g., "Always keep responses professional and under 150 words" or "Always prefer data from the Finance folder").

## Explicit Data Movement Workflows

The exam frequently tests these specific "bridge" workflows between M365 apps:

| From App | To App | Workflow / Feature | Exam Catch |
|----------|--------|---------------------|------------|
| **Excel** | **Word** | Analyze trends in Excel → Prompt Word to "Draft a report based on these Excel insights." | Must manually provide the insights/summary from Excel to Word. |
| **Word** | **PowerPoint**| **Create from File** | Use the Word file's URL or name directly in the PPT prompt. |
| **Teams** | **Outlook** | Meeting Recap → **Share to Outlook** | One-click transition for sending action items to stakeholders. |
| **Outlook** | **OneNote** | Email Summary → Save to OneNote | Capture decision threads into a persistent project notebook. |

## Exam-Tested Tips (Domain 3)

| Scenario | Correct Action | Why? |
|----------|----------------|------|
| Need content from a PDF for a PPT | Use **Create from File** in PPT | PPT can ingest Word/PDF files to build slides. |
| Data is in a spreadsheet but Copilot won't analyze | Convert to **Excel Table** | Copilot *requires* the Table object to perform analysis. |
| Mixed sentiment in a long Teams chat | Ask Copilot for a **Sentiment Summary** | Teams Copilot is unique in its ability to detect "mood" and "unresolved questions." |
| Need a shared space for AI brainstorming | Use **Copilot Pages** | Pages are built for team-based, persistent AI collaboration. |

<FlashcardDeck 
  title="App Usage Quiz"
  :cards="[
    {
      question: 'What is required for Copilot to analyze data in Excel?',
      answer: 'The data must be formatted as an <strong>Excel Table</strong>.'
    },
    {
      question: 'Which tool creates a PPT from a Word doc?',
      answer: '<strong>PowerPoint Copilot</strong> (using the \'Create from file\' feature).'
    },
    {
      question: 'How do you find out what you missed in a meeting?',
      answer: 'Use <strong>Teams Meeting Recap</strong> or ask Copilot \'What happened before I joined?\'.'
    }
  ]"
/>
