---
title: "GH-300 - Cheatsheet"
description: "One-page exam day reference for GH-300 GitHub Copilot"
head:
  - - meta
    - name: keywords
      content: gh-300, github copilot, cheatsheet, quick reference, exam
---

# GH-300: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

::: danger Exam Day Reference
Review this page 5 minutes before the exam.
:::

---

## Responsible AI Core (HVA)

- **H**uman-in-the-loop — Always validate AI output before using it
- **V**alidate — Test, read, and review every suggestion
- **A**ccountable — The developer is responsible, not the AI

---

## Copilot Plans at a Glance

| Feature | Individual | Business | Enterprise |
|---|---|---|---|
| IDE suggestions & chat | ✅ | ✅ | ✅ |
| Org policy management | ❌ | ✅ | ✅ |
| Content exclusions | ❌ | ✅ | ✅ |
| Audit logs | ❌ | ✅ | ✅ |
| Knowledge Bases | ❌ | ❌ | ✅ |
| Copilot on GitHub.com | ❌ | ❌ | ✅ |

---

## Mode Quick Reference

| Mode / Interface | Best For |
|---|---|
| **Inline suggestions** | Code as you type in IDE |
| **Copilot Chat (IDE)** | Questions, refactors, explanations |
| **Agent Mode** | Autonomous multi-step tasks |
| **Edit Mode** | Cross-file edits, review each change |
| **Plan Mode** | Preview Copilot's plan before execution |
| **Copilot CLI** | Terminal command help |
| **Copilot on GitHub.com** | PR summaries, code review (Enterprise) |

---

## Chat Commands

- `/explain` — Explain selected code
- `/fix` — Suggest a fix for selected code
- `/tests` — Generate unit tests for selected code
- `/doc` — Generate documentation for selected code
- `@workspace` — Search across the entire project

---

## Prompt Engineering (GCSF)

- **G**oal — What to do
- **C**ontext — Why/where
- **S**ource — What data/files to reference
- **F**ormat — Output style, types, error handling

**Few-shot**: Provide 1-3 examples before asking
**Zero-shot**: Just describe the task
**Prompt file**: `.github/copilot-instructions.md` for workspace-wide conventions

---

## Safeguards Quick Reference

| Safeguard | What it does |
|---|---|
| **Content exclusions** | Prevents Copilot using specific files as context |
| **Duplication detection** | Filters suggestions matching public GitHub code |
| **Security warnings** | Flags suggestions with vulnerability patterns |

---

## Quick Decision Rules

**Autonomous multi-step task?**
→ Agent Mode

**Cross-file refactor, want to review each change?**
→ Edit Mode

**Need Copilot to use external service data?**
→ MCP (Model Context Protocol)

**Need persistent org-wide Copilot instructions?**
→ `.github/copilot-instructions.md`

**Org wants to block a sensitive directory from Copilot?**
→ Content exclusions (requires Business/Enterprise)

**Suggestion matches public open source code?**
→ Duplication detection enabled — suggestion filtered

**AI output seems wrong / hallucination?**
→ Validate output independently; refine prompt with more context

---

## Terminology Check

- **Hallucination**: Confident but incorrect AI output (wrong API names, invented functions)
- **Zero-shot prompting**: Task request with no examples — model uses training knowledge alone
- **Few-shot prompting**: Providing examples to guide the model's pattern
- **Duplication detection**: Filter for suggestions matching public GitHub repos verbatim
- **Content exclusions**: Admin config preventing specific files from being used as Copilot context
- **MCP**: Model Context Protocol — connects Copilot to external data sources at runtime
- **Agent Mode**: Copilot autonomously runs multi-step tasks including terminal commands
- **Edit Mode**: Copilot proposes cross-file edits; user reviews each change individually
- **Prompt file**: `.github/copilot-instructions.md` — persistent workspace instructions for Copilot

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)
