---
title: "GH-300 - Domain 4: Prompt Engineering & Context Crafting"
description: "GH-300 Domain 4: Prompt structure, zero-shot, few-shot prompting, and context optimization"
head:
  - - meta
    - name: keywords
      content: gh-300, domain 4, prompt engineering, zero-shot, few-shot, context crafting, copilot prompts
---

# Domain 4: Apply Prompt Engineering and Context Crafting (10–15%)

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)

::: tip Exam Tip
Prompt engineering is about giving Copilot the right information to generate the right output. The exam tests your ability to recognize a well-structured prompt and know when to apply zero-shot vs. few-shot techniques.
:::

---

## Prompt Structure and Context

A high-quality Copilot prompt has four elements:

| Element | Purpose | Example |
|---|---|---|
| **Goal** | What you want Copilot to do | "Write a function that..." |
| **Context** | Why or in what situation | "...for a REST API that handles user auth" |
| **Source** | What data/files to reference | "...using the `User` class defined in models.py" |
| **Format/Expectation** | What the output should look like | "...return a typed dict, include error handling" |

::: tip Exam Tip
A comment above a function is one of the most powerful prompts in Copilot. Clear, descriptive comments produce better inline suggestions than vague ones.
:::

---

## How Context is Determined

Copilot automatically uses:
- **Current file**: Highest priority — the code around the cursor
- **Open tabs**: Other files currently open in the editor contribute context
- **Language/framework**: Copilot adjusts suggestions based on detected language and imports
- **Comments**: Inline and block comments are interpreted as instructions

To improve context:
- Keep relevant files open in editor tabs
- Write descriptive function/variable names
- Add comments describing intent, not just what the code does

---

## Zero-Shot Prompting

Zero-shot prompting: asking the model to perform a task **without any examples**.

```python
# Zero-shot: just describe what you want
# Parse a JSON string and return the 'email' field, or None if missing
def get_email(json_str: str) -> str | None:
    # Copilot completes here
```

**When to use**: Simple, well-defined tasks where the intent is clear from context alone.

---

## Few-Shot Prompting

Few-shot prompting: providing **examples** before the task to guide the model.

```python
# Few-shot: show the pattern, then ask for more
# Input: "hello world" → Output: "Hello World"
def title_case(s: str) -> str:
    return s.title()

# Input: "remove spaces" → Output: "removespaces"
def remove_spaces(s: str) -> str:
    return s.replace(" ", "")

# Now generate: Input: "reverse me" → Output: "em esrever"
def reverse_string(s: str) -> str:
    # Copilot completes here, following the established pattern
```

**When to use**: When the pattern or style is non-obvious or when you want Copilot to follow a specific convention.

---

## Best Practices for Prompt Crafting

- **Be specific**: "Write a function that validates an email address using regex" > "Write email validation"
- **Specify the output**: Include expected return types, error handling style, and format
- **Use personas**: Start with "As a senior Python developer..." to influence code quality and style
- **Reference files**: Mention specific files or classes when relevant (`see the models.py User class`)
- **Iterate**: If the first suggestion is wrong, refine your prompt and try again
- **Prompt files**: Store reusable instructions in `.github/copilot-instructions.md` to establish workspace-wide conventions

---

## Prompt Engineering Principles

| Principle | Meaning |
|---|---|
| **Clarity** | Unambiguous language produces better suggestions |
| **Specificity** | Detailed prompts outperform vague ones |
| **Examples** | Showing the pattern (few-shot) reduces ambiguity |
| **Iteration** | Treat Copilot as a conversation — refine based on output |
| **Context management** | Keep relevant files open; close irrelevant ones to reduce noise |

---

## Chat History Usage

In Copilot Chat, previous messages in the session are included in the context window:

- Copilot uses chat history to maintain conversational continuity
- If you change topics, consider starting a **new chat** to avoid old context contaminating new suggestions
- Long conversations may hit context limits — earlier messages may get truncated

<FlashcardDeck
  title="Domain 4 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between zero-shot and few-shot prompting?',
      answer: '<strong>Zero-shot</strong>: describe the task without examples. <strong>Few-shot</strong>: provide 1-3 examples of the pattern before asking Copilot to continue it.'
    },
    {
      question: 'What file stores reusable workspace-wide Copilot instructions?',
      answer: '<code>.github/copilot-instructions.md</code> — Copilot automatically uses this file as persistent context for all chats in the workspace.'
    },
    {
      question: 'How does adding a persona to a prompt improve output?',
      answer: `It shifts Copilot's style toward that persona's conventions. E.g., &quot;As a senior Go developer&quot; produces more idiomatic, production-quality Go code.`
    },
    {
      question: 'Why should you start a new Copilot Chat when switching topics?',
      answer: 'Old chat history remains in the context window. If you switch topics, previous context can bias new suggestions — a fresh chat resets the context.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)
