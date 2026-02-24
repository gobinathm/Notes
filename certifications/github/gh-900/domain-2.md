---
title: "GH-900 - Domain 2: Working with GitHub Repositories"
description: "GH-900 Domain 2: Creating and managing repositories, README, licenses, .gitignore, releases, tags, and template repos."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 2, repository, readme, license, gitignore, releases, tags, template repository, github pages, codeowners
---

# Domain 2: Working with GitHub Repositories (8%)

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)

---

## Creating and Managing Repositories

### Creating a Repository

A repository can be created from:
- **GitHub.com** — New repository button, with options for visibility, README, .gitignore, and license
- **GitHub CLI** — `gh repo create`
- **GitHub Desktop** — GUI wizard
- **Template repository** — instantiate from an existing template

Key options when creating a repo:

| Option | What it does |
|--------|--------------|
| **Initialize with README** | Creates a README.md on the default branch automatically |
| **Add .gitignore** | Pre-fills a .gitignore template for your language/framework |
| **Choose a license** | Adds a LICENSE file to define usage rights |
| **Visibility** | Public / Private / Internal |

### Cloning vs Forking

| Action | What it does | When to use |
|--------|--------------|-------------|
| **Clone** | Downloads the repo to your machine; you push to the same origin | You have write access |
| **Fork** | Creates your own copy of someone else's repo on GitHub | Contributing to repos you don't own |

::: tip Exam Tip
**Fork → clone → PR** is the standard open source contribution flow. Fork creates a copy on GitHub; clone downloads it locally; you submit changes via pull request back to the original.
:::

---

## Essential Repository Files

### README.md

The README is the front page of your repository. GitHub renders it automatically on the repo homepage. Best practices:
- Project description and purpose
- Installation instructions
- Usage examples
- Contributing guidelines
- License information

### LICENSE

Without a license, code is **"All Rights Reserved"** by default — others legally cannot use, copy, or distribute it. Common licenses:

| License | Permissions | Requirements |
|---------|-------------|--------------|
| **MIT** | Use, copy, modify, distribute | Keep copyright notice |
| **Apache 2.0** | Use, copy, modify, distribute | Keep copyright + patent notice |
| **GPL v3** | Use, copy, modify, distribute | Derivative works must also be GPL |
| **Creative Commons** | Varies | For creative work, not code |

::: info GitHub Tip
GitHub's license picker is available when creating a repo. You can also add a LICENSE file at any time and GitHub will recognize and display it.
:::

### .gitignore

Tells Git which files and directories to ignore (not track). Common patterns:

```gitignore
# Dependencies
node_modules/
vendor/

# Build output
dist/
*.class

# Environment files
.env
.env.local

# OS files
.DS_Store
Thumbs.db
```

GitHub provides `.gitignore` templates for popular languages and frameworks when creating a repo.

### CODEOWNERS

The `CODEOWNERS` file (in root, `docs/`, or `.github/`) automatically assigns reviewers to pull requests based on file patterns:

```
# Global owner
* @org/team-leads

# Frontend files
*.js @org/frontend-team

# Docs
docs/ @org/technical-writers
```

::: warning Exam Note
CODEOWNERS can be placed in three locations: **repo root**, **`docs/`**, or **`.github/`**. Only the first matching CODEOWNERS file is used. Code owners are automatically requested for review when files they own are changed in a PR.
:::

---

## Releases and Tags

### Tags

A **tag** marks a specific commit in history — typically used to mark release versions. Two types:

| Type | Description |
|------|-------------|
| **Lightweight tag** | A pointer to a commit (like a branch, but doesn't move) |
| **Annotated tag** | Stores metadata: tagger, date, message. Recommended for releases. |

```bash
git tag v1.0.0                        # lightweight
git tag -a v1.0.0 -m "First release"  # annotated
git push origin v1.0.0                # push specific tag
git push origin --tags                # push all tags
```

### Releases

A **GitHub Release** is built on top of a tag and adds:
- Release title and description (supports Markdown)
- Attached binary assets (downloads)
- "Latest release" badge
- Auto-generated release notes from merged PRs

::: tip Exam Tip
Tags exist in Git. Releases exist in GitHub. You can create a Release from an existing tag, or GitHub creates the tag when you publish a Release.
:::

---

## Template Repositories

A **template repository** lets teams create new repos pre-populated with a standard structure (files, folders, workflows, etc.) — without inheriting the full commit history.

- Enable via: Repository Settings → check "Template repository"
- Users click **"Use this template"** instead of forking or cloning
- Common uses: project boilerplates, org standards, documentation sites

| Feature | Template | Fork |
|---------|----------|------|
| Gets commit history | ❌ No | ✅ Yes |
| Linked to original | ❌ No | ✅ Yes (can PR back) |
| Purpose | Fresh start with structure | Contribute or customize |

---

## GitHub Pages

**GitHub Pages** hosts static websites directly from a repository (free for public repos):

- Source can be: `main` branch root, `main/docs/`, or a dedicated `gh-pages` branch
- URL format: `https://username.github.io/repo-name/`
- Supports Jekyll for static site generation
- Custom domains supported

---

<FlashcardDeck
  title="Domain 2: Repository Management"
  storage-key="gh-900-domain-2-cards"
  :cards="[
    {
      question: 'What is the difference between cloning and forking a repository?',
      answer: '<strong>Clone</strong> downloads a repo locally; you push back to the same remote. <strong>Fork</strong> creates your own copy on GitHub, used for contributing to repos you do not own.'
    },
    {
      question: 'What happens if you publish code on GitHub without a license?',
      answer: 'It is All Rights Reserved by default — others legally cannot use, copy, modify, or distribute it without permission.'
    },
    {
      question: 'Where can a CODEOWNERS file be placed?',
      answer: 'In the <strong>repo root</strong>, the <strong>docs/</strong> folder, or the <strong>.github/</strong> folder. Only the first matching file is used.'
    },
    {
      question: 'What is the difference between a lightweight and annotated git tag?',
      answer: '<strong>Lightweight</strong>: just a pointer to a commit. <strong>Annotated</strong>: stores tagger info, date, and message. Annotated tags are recommended for releases.'
    },
    {
      question: 'What is a GitHub Release?',
      answer: 'A GitHub Release is built on a tag and adds a title, description, downloadable assets, and auto-generated release notes. Tags are Git objects; Releases are GitHub objects.'
    },
    {
      question: 'What is a template repository and how does it differ from a fork?',
      answer: 'A template creates a new repo with the same file structure but <strong>no commit history</strong> and <strong>no link</strong> to the original. A fork copies the full history and stays linked for PRs.'
    }
  ]"
/>

---

[← Domain 1](./domain-1.md) · [Domain 3 →](./domain-3.md)
