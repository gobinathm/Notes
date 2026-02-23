---
title: "GH-300 - Domain 3: GitHub Copilot Data & Architecture"
description: "GH-300 Domain 3: How Copilot handles data, builds prompts, proxy filtering, and LLM limitations"
head:
  - - meta
    - name: keywords
      content: gh-300, domain 3, copilot data, prompt building, proxy filtering, llm limitations, data flow
---

# Domain 3: Understand GitHub Copilot Data and Architecture (10–15%)

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)

::: tip Exam Tip
This domain tests your understanding of **what happens behind the scenes** when you type code and Copilot responds. Focus on the data flow, where filtering happens, and the key limitations of LLMs.
:::

---

## Data Usage, Flow, and Sharing

### What Data Copilot Uses

When you trigger a suggestion, Copilot sends a **prompt** to the model. The prompt includes:

1. **Your current file content** — surrounding code, imports, comments
2. **Open file tabs** — files currently open in the IDE contribute context
3. **Cursor position** — Copilot sees what's before and after the cursor (prefix + suffix)
4. **File type** — determines which language model and behavior to apply
5. **Recent edits** — recently changed code has higher weight in context

### What Microsoft Does (and Doesn't) Do With Your Data

| Claim | Reality |
|---|---|
| Microsoft trains public models on your code | ❌ **False** — Copilot Business/Enterprise: your code is NOT used for training |
| Copilot Individual may use prompts for product improvement | ✅ Depends on user settings — can opt out |
| Data is transmitted to GitHub/Azure servers | ✅ Prompts are sent to Copilot proxy for inference |
| Suggestions are logged | ✅ Accepted suggestions may be stored temporarily for filtering/safety |

::: danger Critical
**For Business and Enterprise plans**: Microsoft does NOT use your organization's code to train the foundational Copilot model. This is a common exam distractor.
:::

---

## Input Processing and Prompt Building

### Prompt Construction

When you trigger Copilot, the system builds a prompt automatically:

1. **Gather context**: Scans open files, cursor position, and recent edits
2. **Truncate**: LLMs have context window limits — context is truncated to fit
3. **Assemble**: The prompt is assembled as `[context before cursor] + [cursor marker] + [context after cursor]`
4. **Send**: The assembled prompt is sent to the Copilot proxy

### Context Window Limits

- Every LLM has a maximum token capacity (input + output)
- When your codebase is large, Copilot prioritizes the **most relevant** context (current file, recently opened files)
- Code far from the cursor or in closed tabs may not be included

---

## Proxy Filtering and Post-Processing

Copilot doesn't send your code directly to the LLM — it goes through a **Copilot proxy** managed by GitHub.

### What the Proxy Does

1. **Pre-filtering**: Strips sensitive information if content exclusions are configured
2. **Routes the request**: Sends the sanitized prompt to the appropriate model
3. **Post-filtering**: Receives the model's response and applies:
   - **Duplication detection**: Filters suggestions that match public repos
   - **Security warnings**: Flags patterns matching known vulnerabilities
   - **Content safety**: Filters harmful or inappropriate output
4. **Returns the suggestion** to your IDE

---

## Code Suggestion Lifecycle

```
User types code in IDE
        ↓
IDE extension captures context (prefix, suffix, open files)
        ↓
Context is assembled into a prompt
        ↓
Prompt sent to Copilot proxy (HTTPS)
        ↓
Proxy pre-filters (content exclusions applied)
        ↓
Prompt sent to LLM (GPT-4 / Copilot model)
        ↓
LLM returns completion
        ↓
Proxy post-filters (duplication detection, security warnings)
        ↓
Suggestion displayed in IDE (ghost text)
        ↓
User accepts or dismisses
```

---

## LLM Limitations (What Copilot Can't Do)

| Limitation | Implication |
|---|---|
| **No real-time knowledge** | Copilot doesn't know about APIs released after its training cutoff |
| **Probabilistic, not deterministic** | Same prompt can produce different suggestions — output is never guaranteed |
| **No execution environment** | Copilot doesn't run or test the code it generates (unless in Agent Mode with terminal access) |
| **Context window cap** | Very large files or projects may exceed context limits, reducing quality |
| **Language support varies** | Best performance in popular languages (Python, JS, TypeScript, Java, C#); weaker in niche languages |
| **Hallucination risk** | Especially for obscure APIs, uncommon libraries, or complex logic |

<FlashcardDeck
  title="Domain 3 Quick Quiz"
  :cards="[
    {
      question: `Does Microsoft train Copilot models on Copilot Business customers' code?`,
      answer: '<strong>No.</strong> For Business and Enterprise plans, your code is not used to train the foundational model. Only Individual users may have their data used for improvement (opt-out available).'
    },
    {
      question: 'What is the Copilot proxy responsible for?',
      answer: 'Pre-filtering prompts (content exclusions), routing to the LLM, and post-filtering responses (duplication detection, security warnings, content safety).'
    },
    {
      question: 'Why might Copilot ignore some of your open files?',
      answer: `Context window limits — when the total context exceeds the LLM's token limit, Copilot prioritizes the most relevant content and truncates the rest.`
    },
    {
      question: 'What does the suffix in a prompt refer to?',
      answer: 'The code <strong>after</strong> the cursor. Copilot uses both the prefix (code before) and suffix (code after) to generate a fill-in-the-middle suggestion.'
    }
  ]"
/>

---

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)
