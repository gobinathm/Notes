---
title: "GH-900 - Domain 1: Introduction to Git and GitHub"
description: "GH-900 Domain 1: Git fundamentals, GitHub platform, repository types, CLI vs UI, and GitHub Flavored Markdown."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 1, git, github, version control, repository, commit, branch, merge, github cli, markdown
---

# Domain 1: Introduction to Git and GitHub (22%)

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)

---

## Git vs GitHub

Git and GitHub are often confused — understanding the distinction is foundational to this exam.

**Git** is a free, open-source **distributed version control system** that runs locally on your machine. It tracks changes to files, enables branching, and supports collaboration through merging.

**GitHub** is a **cloud-based hosting platform** built on top of Git. It adds collaboration features: pull requests, Issues, Actions, Codespaces, and more.

| Aspect | Git | GitHub |
|--------|-----|--------|
| Type | CLI tool / version control | Cloud platform |
| Runs | Locally on your machine | Web + cloud |
| Created by | Linus Torvalds (2005) | GitHub, Inc. (2008) |
| Core function | Track file changes | Host repos + collaborate |
| Can work without the other? | Yes (local only) | No (needs Git underneath) |

::: tip Exam Tip
Questions about "where does this happen" — if it's tracking changes, commits, or branching, answer **Git**. If it involves pull requests, Issues, or web interface, answer **GitHub**.
:::

---

## Core Git Concepts

### Commits

A **commit** is a snapshot of your files at a point in time. Each commit has:
- A unique SHA hash (e.g., `a3f5b2c`)
- An author and timestamp
- A commit message describing the change
- A pointer to the parent commit(s)

```bash
git commit -m "Add user authentication module"
```

### Branches

A **branch** is a lightweight, movable pointer to a commit. The default branch is typically named `main` (formerly `master`).

- **Create a branch**: `git branch feature/login`
- **Switch to it**: `git checkout feature/login` or `git switch feature/login`
- **Create + switch**: `git checkout -b feature/login`

### Merging

**Merging** integrates changes from one branch into another. Types:
- **Fast-forward merge** — linear history, no merge commit needed
- **Three-way merge** — creates a merge commit when histories have diverged

### The Three States of Git

| State | Location | Description |
|-------|----------|-------------|
| **Working directory** | Local files | Where you edit files |
| **Staging area (index)** | `.git/index` | Files marked for the next commit |
| **Repository** | `.git/` | Committed history |

```
Working Dir → git add → Staging → git commit → Repository
```

::: info Key Workflow
`git add` moves changes to staging. `git commit` moves staged changes to the repository. `git push` sends commits to GitHub.
:::

### Essential Git Commands

| Command | What it does |
|---------|--------------|
| `git init` | Initialize a new local repo |
| `git clone <url>` | Copy a remote repo locally |
| `git status` | Show working tree status |
| `git add <file>` | Stage changes |
| `git commit -m "msg"` | Commit staged changes |
| `git push` | Upload commits to remote |
| `git pull` | Fetch + merge remote changes |
| `git log` | View commit history |
| `git diff` | Show unstaged changes |

---

## GitHub Interface Options

GitHub can be accessed through multiple interfaces — the exam tests which to use when.

| Interface | Best for | Key features |
|-----------|----------|--------------|
| **Web UI** (github.com) | Browsing, reviewing PRs, Issues | Fully featured, no install |
| **GitHub CLI** (`gh`) | Scripting, terminal workflows | Create PRs, Issues from terminal |
| **GitHub Desktop** | Visual beginners | GUI drag-and-drop |
| **github.dev** (press `.` in any repo) | Quick edits in browser | VS Code in browser, no compute |
| **Codespaces** | Full dev environment | Cloud VM with VS Code |

::: warning Common Trap
`github.dev` and **Codespaces** look similar but differ fundamentally. `github.dev` is a **browser editor** with no terminal/compute. Codespaces is a **full cloud VM** you can run code in.
:::

---

## Repository Visibility Types

| Visibility | Who can see it | Use case |
|------------|----------------|----------|
| **Public** | Everyone (internet) | Open source projects |
| **Private** | Only invited collaborators | Personal or commercial work |
| **Internal** | All members of the organization | InnerSource (enterprise only) |

::: info Internal Repos
Internal visibility is only available on **GitHub Enterprise Cloud** organizations. It enables InnerSource — sharing code across teams within a company without making it fully public.
:::

---

## GitHub Flavored Markdown (GFM)

GitHub renders Markdown across READMEs, Issues, PRs, Discussions, and Wikis. Key GFM extensions:

| Syntax | Renders as |
|--------|-----------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `# Heading` | H1 heading |
| `` `code` `` | inline code |
| `- [ ]` / `- [x]` | task list (unchecked/checked) |
| `@username` | user mention (notifies them) |
| `#123` | links to Issue/PR #123 |
| `> text` | blockquote |

::: tip Exam Tip
Task lists (`- [ ]`) in Issues and PRs are tracked as completion progress. `@mentions` trigger notifications. `#` references auto-link Issues and PRs.
:::

---

<FlashcardDeck
  title="Domain 1: Git & GitHub Fundamentals"
  storage-key="gh-900-domain-1-cards"
  :cards="[
    {
      question: 'What is the difference between Git and GitHub?',
      answer: '<strong>Git</strong> is a local version control tool. <strong>GitHub</strong> is a cloud platform built on Git that adds collaboration features like pull requests, Issues, and Actions.'
    },
    {
      question: 'What are the three states of a file in Git?',
      answer: '<strong>Working directory</strong> (edited), <strong>Staging area</strong> (git add), <strong>Repository</strong> (git commit).'
    },
    {
      question: 'What does git pull do?',
      answer: 'Fetches changes from the remote repository AND merges them into the current branch. Equivalent to git fetch + git merge.'
    },
    {
      question: 'What is the difference between github.dev and Codespaces?',
      answer: '<strong>github.dev</strong> is a browser-based editor (no terminal, no compute). <strong>Codespaces</strong> is a full cloud VM where you can run code and use a terminal.'
    },
    {
      question: 'Which repository visibility type is only available on GitHub Enterprise Cloud?',
      answer: '<strong>Internal</strong> — visible to all org members, used for InnerSource workflows.'
    },
    {
      question: 'What does the # symbol do in a GitHub comment?',
      answer: 'Creates a reference link to an Issue or Pull Request by number (e.g., #42 auto-links to Issue 42).'
    },
    {
      question: 'What does a fast-forward merge do?',
      answer: 'Moves the target branch pointer forward to the source branch tip — only possible when there are no diverging commits. No merge commit is created.'
    }
  ]"
/>

---

[← Overview](./index.md) · [Domain 2 →](./domain-2.md)
