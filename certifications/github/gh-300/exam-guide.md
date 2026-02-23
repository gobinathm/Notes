---
title: "GH-300 - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the GH-300 GitHub Copilot exam"
head:
  - - meta
    - name: keywords
      content: gh-300, exam guide, exam traps, tips, github copilot
---

# GH-300: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The GH-300 exam is for **Developers, DevOps Engineers, and Tech Managers** using GitHub Copilot. It values **Responsible Use, Effective Prompting, and Human Oversight**.

### Answer Philosophy
1. **Human-in-the-Loop Always**: If an answer suggests skipping human review of AI output, it's wrong. Always validate.
2. **Context is King**: When two prompt answers are similar, pick the one with more specific context — file reference, persona, or example.
3. **Privacy by Design**: When data privacy is in question, favor the more restrictive, privacy-safe option.

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---------------|--------------------------------|
| "AI produces wrong information" | **Hallucination / validate output** |
| "Copilot uses my project's code" | **Context / grounding via open files** |
| "Automate a multi-step task" | **Agent Mode** |
| "Edit across multiple files" | **Edit Mode** |
| "Run a CLI command with AI help" | **GitHub Copilot CLI** |
| "Reuse prompt across chats" | **Prompt files** (`.github/copilot-instructions.md`) |
| "Suggest code from my own docs" | **Knowledge Base (Copilot Enterprise)** |
| "What did users do with Copilot" | **Audit log events** |
| "Block specific files from AI" | **Content exclusions** |
| "Code that looks like training data" | **Duplication detection** |
| "Vulnerable code suggestion" | **Security warnings (filters)** |
| "Context from connected services" | **MCP (Model Context Protocol)** |
| "Public vs business vs enterprise" | **Copilot plans comparison** |
| "Behavior changes per model" | **Temperature / model selection** |

---

## Exam Traps

::: warning Look out for these!
- **Copilot Individual vs Business vs Enterprise**: Individual has no org management. Business adds org-wide policy, audit logs, and content exclusions. Enterprise adds Knowledge Bases, Copilot Chat in GitHub.com, and custom models. Don't confuse what's available per plan.
- **Inline suggestions vs Chat vs CLI**: Inline = triggered by typing in IDE. Chat = conversational interface. CLI = `gh copilot explain` / `gh copilot suggest` in terminal. Each has a distinct interaction model.
- **Agent Mode vs Edit Mode**: Agent Mode autonomously runs multi-step tasks (including terminal commands). Edit Mode lets you review and selectively accept cross-file changes. They are not interchangeable.
- **Content exclusions ≠ privacy guarantees**: Content exclusions prevent Copilot from using specific files as context. They don't prevent users from pasting that content into chat manually.
- **Duplication detection**: When enabled, Copilot filters out suggestions that match code in public GitHub repositories — it does NOT prevent all code reuse, only public-repo matches.
- **Copilot doesn't train on your code**: Microsoft does not use your organization's code to train the foundation Copilot models. A common exam distractor claims it does.
:::

---

## Decision Quick Reference

### "Which Copilot plan?"
```
Personal use, no org policies needed → Copilot Individual
Org-wide policies, audit logs, content exclusions → Copilot Business
Knowledge Bases, GitHub.com chat, custom models → Copilot Enterprise
```

### "Which Copilot mode/interface?"
```
Write code inline as you type → Inline suggestions (IDE)
Ask questions, iterate on code → Copilot Chat (IDE or GitHub.com)
Multi-step autonomous task → Agent Mode
Refactor across multiple files → Edit Mode
Terminal/CLI help → GitHub Copilot CLI
```

### "How to improve the suggestion quality?"
```
Bad output → Add more context (open files, persona, examples)
Hallucination → Validate output; add references/docs as context
Irrelevant suggestion → Use few-shot prompting (provide examples)
Context from external service → Use MCP connector
```

### "What should be done first?"
```
Always: Validate AI output before using in production
Never: Blindly ship Copilot-generated code without review
```

---

## Final Strategy

- **Domains 1 and 2 together are 40–50% of the exam** — master responsible use and all Copilot features/modes.
- **Know the plan differences cold**: Individual vs Business vs Enterprise is a frequently tested decision matrix.
- **Think like a developer, not a manager**: This exam puts you in the seat of a practitioner actively using Copilot — not a policy decision-maker.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
