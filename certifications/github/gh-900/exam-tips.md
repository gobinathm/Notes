---
title: "GH-900 - Exam Tips"
description: "Study strategy, timing guide, and last-minute prep for the GH-900 GitHub Foundations exam"
head:
  - - meta
    - name: keywords
      content: gh-900, exam tips, study strategy, github foundations, test taking
---

# GH-900: Exam Tips & Strategy

[← Overview](./index.md) · [← Cheatsheet](./cheatsheet.md)

::: tip Note
This page focuses on **study strategy** and **test-taking approach**. For tactical traps and decision rules, see the [Exam Guide](./exam-guide.md).
:::

---

## Study Strategy

### Domain Priority (Effort → Reward)

| Priority | Domain | Weight | Strategy |
|----------|--------|--------|----------|
| 🔴 **Must master** | D3: Collaboration Features | 30% | PRs, Issues, Discussions, merge strategies, CODEOWNERS |
| 🔴 **Must master** | D1: Introduction to Git & GitHub | 22% | Git states, commands, GitHub vs Git, repo visibility |
| 🟡 **Know well** | D4: Modern Development | 13% | github.dev vs Codespaces, Actions overview, Copilot basics |
| 🟡 **Know well** | D6: Security & Admin | 10% | Branch protection, 2FA, Dependabot, org permissions |
| 🟡 **Know well** | D7: GitHub Community | 10% | Licensing, open source, InnerSource, Sponsors, Education |
| 🟢 **Review** | D2: Repositories | 8% | README, CODEOWNERS, releases, template repos |
| 🟢 **Review** | D5: Project Management | 7% | Projects v2 views, classic vs new, milestones |

**D1 + D3 = 52%** — mastering just two domains passes more than half the exam.

### Hands-on Practice

The best way to retain this material is to USE GitHub:

1. **[GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github)** — PR workflow hands-on
2. **[GitHub Skills: Review Pull Requests](https://github.com/skills/review-pull-requests)** — code review practice
3. **[GitHub Skills: Hello GitHub Actions](https://github.com/skills/hello-github-actions)** — Actions basics
4. **Create your own repo** with a CODEOWNERS file, branch protection rules, and a sample Actions workflow
5. **Open a PR, create an Issue, link them, close with `Fixes #`** — do the full workflow

### Timeline Recommendation

| Time before exam | Focus |
|-----------------|-------|
| 2 weeks out | Work through all 7 domains; do GitHub Skills labs |
| 1 week out | Review exam guide + cheatsheet; do flashcards daily |
| Night before | Read cheatsheet once; listen to audio refresher |
| Day of | Skim keyword detection table; no cramming |

---

## Time Management

**120 minutes · ~75 questions = 1.6 min/question**

| Phase | Time budget |
|-------|------------|
| First pass (all questions) | ~75 min |
| Review flagged questions | ~30 min |
| Final check | ~15 min |

### Pacing Tips
- If you're spending more than **2 minutes** on a question, flag it and move on
- Questions you're unsure about often become clearer after reading later questions
- Never leave a question blank — there is no penalty for guessing

---

## Question-Handling Techniques

### First Pass
- Answer every question you're confident in
- **Flag** questions where you're uncertain — don't spend more than 90 seconds
- Note questions that seem to contradict each other (they may hint at answers)

### Elimination Strategy
Eliminate clearly wrong answers first:
- If a choice mentions a third-party tool when GitHub has a native equivalent → likely wrong
- If a choice says "use git command X" for a GitHub feature question → likely wrong
- If a choice mixes up two similar features (github.dev vs Codespaces) → identify the trap

### Keyword Alerts
Watch for these qualifier words — they change the answer:
- **"MOST appropriate"** — look for the best fit, not just a correct one
- **"FIRST step"** — order matters; don't pick the right action at the wrong time
- **"WITHOUT requiring"** — find the least invasive solution
- **"only org members"** — Internal visibility / InnerSource

---

## Last-Minute Review Checklist

- [ ] Review the [Cheatsheet](./cheatsheet.md) — especially the key file locations table
- [ ] Read through the [Exam Guide](./exam-guide.md) traps section
- [ ] Run through flashcards in D1 and D3 (52% of exam)
- [ ] Confirm: github.dev (no terminal) vs Codespaces (full VM)
- [ ] Confirm: Issues (trackable) vs Discussions (open conversation)
- [ ] Confirm: Template repo (no history) vs Fork (full history)
- [ ] Confirm: No license = All rights reserved (not open source)
- [ ] Listen to the [Audio Refresher](./index.md#audio-refresher) on the way in
- [ ] Check exam center or online proctor technical requirements

---

[← Overview](./index.md) · [← Cheatsheet](./cheatsheet.md)
