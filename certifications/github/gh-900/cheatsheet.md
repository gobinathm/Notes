---
title: "GH-900 - Cheatsheet"
description: "One-page exam day reference for GH-900 GitHub Foundations — mnemonics, quick lookup tables, and decision rules."
head:
  - - meta
    - name: keywords
      content: gh-900, cheatsheet, quick reference, exam, github foundations, mnemonics
---

# GH-900: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

---

## Git Workflow Mnemonic: **C-B-C-P**

> **C**lone → **B**ranch → **C**ommit → **P**ull Request

| Step | Command / Action |
|------|-----------------|
| **C**lone | `git clone <url>` — get the repo locally |
| **B**ranch | `git checkout -b feature/my-work` — isolate changes |
| **C**ommit | `git add . && git commit -m "message"` — save snapshots |
| **P**ull Request | Push branch → open PR on GitHub → review → merge |

For **open source** add a **Fork** at the start: **F-C-B-C-P**

---

## GitHub vs Git: Quick Split

| Git | GitHub |
|-----|--------|
| Commits, branches, merges | Pull Requests, Issues, Discussions |
| Working dir, staging, repo | Actions, Codespaces, Projects |
| `git push/pull/clone` | Marketplace, Stars, Sponsors |
| Runs locally | Runs in the cloud |

---

## Editor Quick Reference

| Tool | Terminal? | Run code? | Cost | Open how |
|------|-----------|-----------|------|----------|
| **github.dev** | ❌ | ❌ | Free | Press `.` |
| **Codespaces** | ✅ | ✅ | Compute billing | New Codespace button |
| **GitHub Desktop** | ❌ | ❌ | Free | App download |

---

## Merge Strategies

| Strategy | Creates merge commit? | History |
|----------|-----------------------|---------|
| **Merge commit** | ✅ Yes | Full history preserved |
| **Squash and merge** | ❌ No | All commits → 1 commit |
| **Rebase and merge** | ❌ No | Linear, replayed commits |

---

## PR Auto-Close Keywords

`Fixes` · `Closes` · `Resolves` + `#issue-number`

Only closes when merged to the **default branch**.

---

## Repo Visibility

| Visibility | Who sees it | When to use |
|-----------|------------|-------------|
| **Public** | Everyone | Open source |
| **Private** | Invited collaborators | Personal/commercial |
| **Internal** | All org members | InnerSource (GHEC only) |

---

## Permission Levels (Low → High)

**Read** → **Triage** → **Write** → **Maintain** → **Admin**

- Outside Collaborators: specific repo access, not org members
- Teams grant permissions across repos at one level
- Highest permission wins when multiple apply

---

## Security Feature Cheatsheet

| Feature | What it does |
|---------|-------------|
| **Secret scanning** | Detects secrets in committed code |
| **Push protection** | Blocks push if secret detected (before commit) |
| **Dependabot alerts** | Notifies of vulnerable dependencies |
| **Dependabot security updates** | Auto-PR to fix vulnerabilities |
| **Dependabot version updates** | Auto-PR to keep deps current |
| **Code scanning** | Finds security bugs in code (CodeQL) |
| **Branch protection** | Enforces review, status checks on branches |

---

## Branch Protection Quick Rules

**Need CI to pass?** → Require status checks
**Need 2 approvals?** → Require N approving reviews
**New commit resets approval?** → Dismiss stale reviews
**Apply to admins too?** → Include administrators
**Prevent direct push?** → Restrict who can push

---

## Issues vs Discussions vs Projects vs Milestones

| Tool | Best for | Cross-repo? | Links to PR? |
|------|----------|-------------|-------------|
| **Issues** | Bugs, tasks | ❌ Single repo | ✅ Yes |
| **Discussions** | Q&A, ideas, announcements | ❌ Single repo | ❌ No |
| **Projects** | Tracking and planning | ✅ Yes | ✅ Yes |
| **Milestones** | Deadline-based grouping | ❌ Single repo | ✅ Yes |

---

## Open Source Licenses (Permissive vs Copyleft)

| Type | Licenses | Key rule |
|------|---------|----------|
| **Permissive** | MIT, Apache 2.0, BSD | Keep copyright notice |
| **Copyleft** | GPL v3, AGPL | Derivatives must use same license |
| **No license** | — | All rights reserved |

---

## GitHub Community Programs

- **GitHub Stars** — recognition for community educators/influencers
- **GitHub Sponsors** — financial support for OSS devs (GitHub takes 0%)
- **GitHub Education** — Student Pack (free tools), Classroom (for educators)
- **Campus Expert** — student community leaders program
- **InnerSource** — open source practices inside an org (internal repos)

---

## Key File Locations

| File | Location | Purpose |
|------|----------|---------|
| `CODEOWNERS` | Root / `docs/` / `.github/` | Auto-assign PR reviewers |
| `CONTRIBUTING.md` | Root | How to contribute |
| `CODE_OF_CONDUCT.md` | Root | Community behavior rules |
| `PULL_REQUEST_TEMPLATE.md` | `.github/` | Default PR description |
| `ISSUE_TEMPLATE/` | `.github/` | Issue submission forms |
| `dependabot.yml` | `.github/` | Dependabot configuration |
| Workflow files | `.github/workflows/` | GitHub Actions YAML |
| `devcontainer.json` | `.devcontainer/` | Codespace configuration |

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)
