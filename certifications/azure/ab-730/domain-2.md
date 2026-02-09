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

## Effective Prompt Engineering

A good prompt gives the AI clear guardrails. Microsoft recommends the **Goal, Context, Source, and Expectation** framework.

| Element | Purpose | Example |
|---------|---------|---------|
| **Goal** | What do you want? | "Write a summary..." |
| **Context** | Why do you need it? | "...for our project kickoff meeting." |
| **Source** | What data to use? | "...based on the attached agenda." |
| **Expectation** | Style, tone, or length? | "Keep it under 200 words and use bullet points." |

::: tip Exam Tip
Be **Specific**. Vague prompts like "Write an email" give poor results. Prompts that include a specific audience (e.g., "for a senior executive") are much more effective.
:::

## Prompt Management & Copilot Lab

Effective prompt engineering isn't just about writing; it's about reuse and refinement.

- **Copilot Lab**: A prompt gallery where you can find, save, and share effective prompts within your organization. 
- **Saving Prompts**: You can "favorite" prompts in the Lab to quickly reuse them across different Microsoft 365 apps.
- **Sharing**: You can share prompts with colleagues to help standardized on high-quality outputs for common tasks.

## Memory & Instructions

Copilot maintains context within a single conversation session.

- **Memory**: Copilot remembers the previous parts of the chat, allowing for follow-up questions (e.g., "Now make that shorter").
- **Custom Instructions**: (In some versions/agents) You can provide overarching instructions that Copilot should always follow (e.g., "Always use a friendly tone").

## Using Context & Files

Copilot is most powerful when it uses your existing data.

- **Referencing Files**: You can type `/` or use the paperclip icon in Copilot Chat to point to specific Word docs, PDFs, or PPTs.
- **Web Context**: You can toggle "Web" mode to allow Copilot to pull real-time information from the internet.
- **App Context**: Copilot knows which app you are in (e.g., drafting a reply to the *current* email in Outlook).

## Managing Conversations

- **Saving Chats**: Most Copilot chats are saved in a sidebar so you can return to them.
- **Sharing**: You can copy or share Copilot responses directly to email or Teams.
- **Verifying**: Always use the **Cite** links (citations) to verify where the AI got its information.

::: danger Critical
**Citations**: If Copilot generalizes a fact, look for the small number icons. These link directly to the source document or email. Always click them if the fact is critical!
:::

<FlashcardDeck 
  title="Prompting Quiz"
  :cards="[
    {
      question: 'What are the 4 elements of a perfect prompt?',
      answer: '<strong>Goal, Context, Source, and Expectation.</strong>'
    },
    {
      question: 'How do you reference a file in Copilot Chat?',
      answer: 'Type <strong>/</strong> followed by the file name or use the attachment icon.'
    },
    {
      question: 'What should you check to verify the source of AI information?',
      answer: 'Check the <strong>Citations</strong> (links to source files/emails).'
    }
  ]"
/>
