---
title: "GH-900 - Exam Guide"
description: "Keyword detection table, exam traps, and decision rules for the GH-900 GitHub Foundations exam"
head:
  - - meta
    - name: keywords
      content: gh-900, exam guide, exam traps, tips, github foundations, keyword detection
---

# GH-900: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The GH-900 exam is for **GitHub users of all backgrounds** — developers, students, project managers, and anyone working with code. It values **practical, platform-level knowledge** over deep technical implementation.

### Answer Philosophy

1. **Think "GitHub feature," not "git command"** — When asked how to accomplish something collaboratively, the answer is almost always a GitHub feature (PR, Issue, branch protection), not a raw git command.
2. **Prefer the built-in GitHub way** — GitHub has built-in tools for almost everything. The exam prefers using those (Actions, Projects, Dependabot) over external alternatives.
3. **Collaboration over solo work** — When in doubt, the "right" answer involves a pull request, code review, or team-based workflow.
4. **Visibility matters** — Internal repos, org permissions, and team access settings are frequently tested. Always consider "who can see this and why."

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---------------|--------------------------------|
| "automate" / "on every push" | **GitHub Actions** |
| "cloud dev environment" / "run code in browser" | **Codespaces** |
| "quick edit in browser" / "no terminal" | **github.dev** |
| "propose changes to a repo you don't own" | **Fork → PR** |
| "protect the main branch" | **Branch protection rules** |
| "require approval before merge" | **Required reviewers / branch protection** |
| "automatically assign reviewers" | **CODEOWNERS** |
| "track a vulnerability in a dependency" | **Dependabot alerts** |
| "prevent secret from being committed" | **Secret scanning push protection** |
| "group issues toward a deadline" | **Milestones** |
| "track work across repos" | **GitHub Projects** |
| "share code within the company only" | **Internal repo / InnerSource** |
| "open Q&A with the community" | **Discussions** |
| "trackable bug or task" | **Issues** |
| "sprint planning / iterations" | **GitHub Projects (iteration field)** |
| "AI code suggestions in IDE" | **GitHub Copilot** |
| "financial support for open source devs" | **GitHub Sponsors** |
| "all org members can see but not public" | **Internal repository** |
| "no license on the repo" | **All rights reserved** (cannot use/copy) |
| "copy of repo without commit history" | **Template repository** |

---

## Exam Traps

::: warning Watch out for these common mistakes!

- **github.dev vs Codespaces**: Both open in a VS Code-like interface. The trap: `github.dev` has NO terminal and cannot run code. If the question involves running tests or a server → **Codespaces**.

- **Fork vs Clone**: Forking is for repos you don't own (creates a copy on GitHub). Cloning is for repos you have write access to (downloads locally). Confusing them loses points on contribution workflow questions.

- **Issues vs Discussions**: Issues are for trackable work (bugs, tasks) that can be linked to PRs and closed. Discussions are for open-ended Q&A, announcements, and ideas. A question asking about "community conversation" → Discussions. "Bug to fix" → Issues.

- **Classic Projects vs New Projects**: Classic Projects = Kanban only. New Projects = Board + Table + Roadmap + custom fields. If the answer involves a Roadmap or custom field → New Projects.

- **Merging to non-default branch won't close issues**: `Fixes #42` only auto-closes Issue 42 when merged into the **default branch** (e.g., `main`). Merging a feature branch into another feature branch → issue stays open.

- **No license ≠ open source**: A repo without a license is NOT free to use. All rights are reserved. The exam may try to trick you with "the code is public on GitHub so it's open source." Wrong.

- **Template repo vs Fork**: Template creates a new repo with no commit history and no link to original. Fork preserves history and stays linked. If question says "fresh start" → template.

- **Dependabot alerts vs security updates**: Alerts = notifications. Security updates = auto-PR to fix. Both require enabling in Settings → Security.
:::

---

## Decision Quick Reference

### "Editor or Environment?"

```
Quick file edit in browser, no compute needed  → github.dev (press ".")
Full dev environment, run code, terminal       → Codespaces
Local machine development                      → Clone + local IDE
```

### "Issues or Discussions?"

```
Bug report / feature request / trackable task  → Issue
Open question, idea, community announcement    → Discussion
Want to link to a PR                           → Issue (Discussions cannot link)
```

### "Fork or Clone?"

```
Contributing to a repo you don't own          → Fork → clone fork → PR
Working on a repo you have write access to    → Clone directly
Fresh start from an existing structure        → Template repository
```

### "Milestone or Project?"

```
Simple deadline-based grouping in one repo    → Milestone
Multi-repo, multi-view tracking               → GitHub Project
Need custom fields or roadmap view            → GitHub Project (v2)
```

### "Branch protection rule type?"

```
Must pass CI before merge                     → Require status checks
Minimum number of PR approvals                → Require N approving reviews
New commits reset approval                    → Dismiss stale reviews
All comments must be addressed                → Require conversation resolution
Prevent force pushing                         → Restrict force pushes
```

---

## Final Strategy

- **Domain 3 is 30% — own it**: Issues, PRs, code review, merge strategies, CODEOWNERS, labels, milestones. This alone is almost a third of the exam.
- **Domain 1 is 22% — master Git basics**: The three states, commit/branch/merge, git commands, GitHub vs Git distinction.
- **D1 + D3 = 52%** — two domains cover more than half the exam. Prioritize ruthlessly.
- **For unclear questions, ask**: "What is the most GitHub-native, collaborative answer?" That's almost always right.
- **Eliminate the non-GitHub answers first**: If a choice involves a third-party tool when a native GitHub tool exists, it's probably wrong.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
