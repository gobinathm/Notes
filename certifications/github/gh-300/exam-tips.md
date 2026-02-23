---
title: "GH-300 - Exam Tips"
description: "Exam strategies and study advice for GH-300 GitHub Copilot"
---

# GH-300: Exam Tips & Strategy

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)

::: tip Note
This page focuses on the **study strategy** and **test-taking approach**. For tactical traps and decision rules, see the [Exam Guide](./exam-guide.md).
:::

---

## Study Strategy

### 1. Focus Areas by Domain Weight

- **Primary (Domain 2 — 25–30%)**: Know every Copilot feature and mode cold — inline, chat, CLI, Agent Mode, Edit Mode, MCP, plan differences.
- **Primary (Domain 1 — 15–20%)**: Responsible AI is high-weight and heavily tested with scenario questions.
- **Secondary (Domains 3–6 — 10–15% each)**: Data flow, prompt engineering, productivity use cases, and privacy/safeguards.

### 2. Hands-on Practice

- **Use Copilot daily**: The exam rewards real-world usage intuition — use Agent Mode, Edit Mode, and CLI actively
- **Try all chat commands**: `/explain`, `/fix`, `/tests`, `/doc` — know what each does and when to use it
- **Write prompt files**: Create a `.github/copilot-instructions.md` in a test repo to understand how workspace instructions work
- **Configure content exclusions**: Set up a content exclusion in a Copilot Business trial to understand the admin flow
- **Test with few-shot examples**: Practice writing 2-3-example prompts and observe how output quality changes

---

## Test-Taking Strategy

### Time Management

- **Total Time**: 100 minutes
- **Expected Questions**: ~65 questions
- **Pacing**: Aim for ~90 seconds per question to leave 10 minutes for review

### Question Handling

- ✅ **First Pass**: Answer confident questions first, flag scenario-based ones for review.
- ✅ **Elimination**: Eliminate answers that skip human review, suggest coding without validation, or confuse Agent Mode with Edit Mode.
- ✅ **Keywords**: Watch for "MOST responsible", "BEST approach", "FIRST step" — these narrow the answer significantly.
- ✅ **Plan awareness**: If the question involves a multi-step autonomous task → Agent Mode. Cross-file edits with review → Edit Mode.
- ✅ **Plan differences**: If the question mentions org-wide policy, audit logs, or content exclusions → the answer is Business or Enterprise plan.

---

## Last-Minute Review Checklist

- [ ] Review [Cheatsheet](./cheatsheet.md) — especially HVA principles, mode quick reference, and plan comparison.
- [ ] Revisit [Exam Guide](./exam-guide.md) traps — especially Individual vs Business vs Enterprise, Agent Mode vs Edit Mode.
- [ ] Flashcards: Domain 1 (responsible AI), Domain 2 (features/modes), Domain 6 (privacy/safeguards).
- [ ] Remind yourself: **You always own the output. AI doesn't remove responsibility.**
- [ ] Verify Pearson VUE requirements: government ID, clean desk, no second monitors, camera enabled.

---

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)
