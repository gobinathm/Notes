---
title: "GH-900 - Domain 3: Collaboration Features"
description: "GH-900 Domain 3: Issues, pull requests, code review, labels, milestones, discussions, wikis, notifications, and gists."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 3, issues, pull requests, code review, labels, milestones, discussions, wikis, notifications, gists, collaboration
---

# Domain 3: Collaboration Features (30%)

[← Domain 2](./domain-2.md) · [Domain 4 →](./domain-4.md)

---

## Issues

**Issues** are the primary way to track work, bugs, and feature requests in a GitHub repository.

### Anatomy of an Issue

- **Title** — short summary
- **Description** — Markdown body; supports task lists, @mentions, #references
- **Labels** — categorize the issue (bug, enhancement, help wanted, etc.)
- **Assignees** — who's responsible for it
- **Milestone** — groups issues toward a goal/release
- **Projects** — links to a GitHub Project board

### Issue Templates

Stored in `.github/ISSUE_TEMPLATE/`. Templates guide contributors to provide the right information:

```
.github/
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
    config.yml           ← controls template chooser
```

::: tip Exam Tip
Issue templates are YAML/Markdown files in `.github/ISSUE_TEMPLATE/`. `config.yml` can disable blank issues and add external links to the template chooser.
:::

### Labels

Labels help filter and categorize issues and PRs. Default labels include:
`bug` · `documentation` · `duplicate` · `enhancement` · `good first issue` · `help wanted` · `invalid` · `question` · `wontfix`

Custom labels can be created at the repo or organization level.

### Milestones

A **milestone** groups issues and PRs with a target due date and shows completion progress (%).

- Issues and PRs can belong to one milestone at a time
- Closing all linked issues auto-completes the milestone
- Used to track sprints, versions, or project phases

---

## Pull Requests

**Pull Requests (PRs)** are how changes are proposed, reviewed, and merged into a branch.

### PR Lifecycle

```
Feature branch → open PR → review → resolve feedback → merge → delete branch
```

### PR Types

| Type | Description |
|------|-------------|
| **Draft PR** | Work in progress — not ready for review. Cannot be merged until marked ready. |
| **Ready for review** | Standard PR, reviewers are notified |
| **Auto-merge** | Merges automatically when all required checks pass |

### Merge Strategies

| Strategy | What it does | Use when |
|----------|--------------|----------|
| **Merge commit** | Keeps all commits + adds a merge commit | Full history preservation |
| **Squash and merge** | Combines all commits into one | Clean, atomic history |
| **Rebase and merge** | Replays commits on top of base branch | Linear history, no merge commit |

::: warning Common Trap
**Squash and merge** loses individual commit history from the feature branch — all changes appear as one commit. Ideal for feature branches but destructive to detailed history.
:::

### PR Reviews

Reviewers can:
- **Comment** — general feedback, no blocking
- **Approve** — signals the PR is ready to merge
- **Request changes** — blocks merge until addressed

Branch protection rules can require a minimum number of approvals before merging.

### Linking Issues to PRs

Use keywords in PR descriptions to auto-close issues on merge:

| Keyword | Effect |
|---------|--------|
| `Fixes #42` | Closes Issue #42 when PR merges to default branch |
| `Closes #42` | Same as Fixes |
| `Resolves #42` | Same as Fixes |

::: tip Exam Tip
The auto-close only happens when the PR merges into the **default branch**. Merging to a feature branch will NOT close the issue.
:::

### PR Templates

Stored in `.github/PULL_REQUEST_TEMPLATE.md` (or in `.github/PULL_REQUEST_TEMPLATE/` for multiple). Automatically populates the PR description field.

---

## Code Review

### CODEOWNERS as Reviewers

When a PR modifies files owned by users in `CODEOWNERS`, those users are **automatically requested as reviewers**.

### Review Assignments

Organization admins can configure **auto-assignment** of reviewers:
- Round robin — distribute evenly
- Load balance — assign to least-busy reviewer

### Suggested Changes

During review, reviewers can suggest specific code changes inline — authors can accept with one click, which commits the suggestion directly.

---

## Discussions

**Discussions** are a forum-style communication channel within a repository — separate from Issues.

| Feature | Issues | Discussions |
|---------|--------|-------------|
| Best for | Trackable bugs and tasks | Open-ended Q&A, ideas, announcements |
| Can be closed | ✅ Yes | ✅ Yes (marked answered) |
| Can be converted | → Discussion | → Issue |
| Linked to PRs | ✅ Yes | ❌ No |
| Categories | ❌ No | ✅ Yes (Q&A, Announcements, etc.) |

::: info Key Point
A **Q&A** category in Discussions lets a maintainer mark an answer as "accepted." Announcements category is write-restricted to maintainers.
:::

---

## Wikis

**Wikis** provide a space for long-form documentation within a repository:
- Enabled per-repo in settings
- Has its own Git repository (cloneable)
- Supports Markdown
- Can be made public or restricted to collaborators

::: tip Exam Tip
Wikis have their own URL (`/wiki`) and their own Git repo — you can clone them separately: `git clone https://github.com/org/repo.wiki.git`
:::

---

## Notifications and Subscriptions

### Notification Triggers

You receive notifications when:
- You are **@mentioned**
- You are assigned to an Issue or PR
- You **watch** a repository
- You **subscribe** to an individual thread
- Activity on Issues/PRs you created or commented on

### Notification Routing

Notifications can go to:
- GitHub inbox (web)
- Email
- Both, or filtered by type

### Watching Options

| Watch Level | Notifications for |
|-------------|-------------------|
| **Participating and @mentions** | Only direct involvement |
| **All Activity** | Every issue, PR, release, discussion |
| **Ignore** | Nothing |
| **Custom** | Specific event types (releases, issues, PRs, etc.) |

---

## Gists

**Gists** are lightweight repositories for sharing single files or code snippets:
- Public or secret (not truly private — anyone with URL can view)
- Full Git repo underneath — can be cloned, forked, and commented on
- Supports Markdown, syntax highlighting, embedding
- Found at `gist.github.com`

| Feature | Gist | Repo |
|---------|------|------|
| Multiple files | Limited | Unlimited |
| Issues/PRs | ❌ | ✅ |
| Actions | ❌ | ✅ |
| Good for | Snippets, one-off sharing | Full projects |

---

<FlashcardDeck
  title="Domain 3: Collaboration Features"
  storage-key="gh-900-domain-3-cards"
  :cards="[
    {
      question: 'What is the difference between a Draft PR and a regular PR?',
      answer: 'A <strong>Draft PR</strong> signals work in progress — it cannot be merged until marked ready for review. Reviewers are not automatically notified.'
    },
    {
      question: 'What are the three merge strategies in GitHub?',
      answer: '<strong>Merge commit</strong> (full history + merge commit), <strong>Squash and merge</strong> (all commits → one), <strong>Rebase and merge</strong> (replays commits, linear history).'
    },
    {
      question: 'What keyword in a PR description closes an issue when the PR is merged?',
      answer: 'Fixes, Closes, or Resolves followed by the issue number (e.g., <strong>Fixes #42</strong>). Only closes when merging to the default branch.'
    },
    {
      question: 'What is the difference between Issues and Discussions?',
      answer: '<strong>Issues</strong>: trackable tasks, bugs, features — can be linked to PRs. <strong>Discussions</strong>: forum-style Q&A and announcements — cannot be linked to PRs directly.'
    },
    {
      question: 'What happens when CODEOWNERS is configured and a PR touches an owned file?',
      answer: 'The code owners are <strong>automatically added as reviewers</strong> on the pull request.'
    },
    {
      question: 'What is a Gist?',
      answer: 'A lightweight GitHub repo for sharing single files or snippets. Supports public or secret visibility. Found at gist.github.com.'
    },
    {
      question: 'Where are PR templates stored?',
      answer: 'In <strong>.github/PULL_REQUEST_TEMPLATE.md</strong> (single template) or <strong>.github/PULL_REQUEST_TEMPLATE/</strong> folder (multiple templates).'
    }
  ]"
/>

---

[← Domain 2](./domain-2.md) · [Domain 4 →](./domain-4.md)
