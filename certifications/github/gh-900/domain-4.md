---
title: "GH-900 - Domain 4: Modern Development"
description: "GH-900 Domain 4: GitHub Actions workflows, Codespaces, github.dev, GitHub Copilot, CI/CD, and Packages."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 4, github actions, codespaces, github.dev, copilot, ci/cd, packages, modern development
---

# Domain 4: Modern Development (13%)

[← Domain 3](./domain-3.md) · [Domain 5 →](./domain-5.md)

---

## GitHub Actions

**GitHub Actions** is GitHub's built-in CI/CD and automation platform. It runs **workflows** in response to **events**.

### Core Concepts

| Term | Definition |
|------|-----------|
| **Workflow** | A YAML file in `.github/workflows/` that defines automation |
| **Event** | A trigger (push, pull_request, schedule, etc.) |
| **Job** | A set of steps that run on a runner |
| **Step** | An individual command or action within a job |
| **Action** | A reusable unit of automation (from Marketplace or custom) |
| **Runner** | The server that executes jobs (GitHub-hosted or self-hosted) |

### Workflow Structure

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
```

### Common Triggers (Events)

| Event | Fires when |
|-------|-----------|
| `push` | Code is pushed to a branch |
| `pull_request` | PR is opened, updated, or merged |
| `schedule` | Cron-based scheduled time |
| `workflow_dispatch` | Manually triggered via UI or API |
| `release` | A release is published |
| `issues` | An issue is opened, edited, closed |

### GitHub-Hosted vs Self-Hosted Runners

| Type | Description | Use case |
|------|-------------|----------|
| **GitHub-hosted** | Ubuntu, Windows, macOS VMs managed by GitHub | General purpose, free tier available |
| **Self-hosted** | Your own machine/server registers as a runner | Custom hardware, private networks, compliance |

::: tip Exam Tip
For GH-900, focus on what Actions IS and what it can DO — not deep workflow YAML syntax. Key points: it's event-driven, YAML-based, lives in `.github/workflows/`, and uses the Actions Marketplace.
:::

---

## GitHub Codespaces

**Codespaces** is a cloud-hosted development environment — a full VM with VS Code running in the browser or connected to your local VS Code.

### Key Features

- Pre-configured via **devcontainer.json** (in `.devcontainer/` folder)
- Runs on GitHub-managed cloud VMs
- Has a full terminal, file system, and can run servers
- Billed per compute-hour (free tier for personal accounts)
- Codespace state persists between sessions (up to 30 days inactive)

### devcontainer.json

Defines the Codespace environment:
```json
{
  "name": "Node.js Dev",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "postCreateCommand": "npm install",
  "extensions": ["dbaeumer.vscode-eslint"]
}
```

### Codespace Lifecycle

```
Create → Running → Stopped (idle) → Deleted
```

- Idle timeout: default 30 minutes (configurable)
- Max retention: 30 days after last use

---

## github.dev Editor

**github.dev** is a lightweight, browser-based code editor — essentially VS Code in the browser, but with **no compute**.

### How to open
- Press `.` (period) on any GitHub repo page
- Change `.com` to `.dev` in the URL

### Limitations vs Codespaces

| Feature | github.dev | Codespaces |
|---------|-----------|------------|
| Terminal | ❌ No | ✅ Yes |
| Run code | ❌ No | ✅ Yes |
| Extensions | Limited | Full VS Code |
| Cost | Free | Compute-based billing |
| Speed to open | Instant | ~30-60 seconds |
| Use case | Quick edits, file browsing | Full development |

::: warning Exam Trap
This is the most tested comparison in Domain 4. Remember: **github.dev = editor only, no terminal.** If a question mentions running tests, starting a server, or using a terminal → the answer is **Codespaces**.
:::

---

## GitHub Copilot

**GitHub Copilot** is an AI pair programmer that provides code suggestions inline in your editor.

### What Copilot Does

- Autocompletes code as you type
- Suggests entire functions based on comments or context
- Supports multiple languages (Python, JavaScript, TypeScript, Go, Ruby, etc.)
- Available in VS Code, JetBrains IDEs, Neovim, and github.dev

### Copilot Tiers (GH-900 level awareness)

| Tier | For |
|------|-----|
| **Copilot Individual** | Personal accounts |
| **Copilot Business** | Organizations with policy controls |
| **Copilot Enterprise** | Org-wide with custom org knowledge |

::: tip Exam Tip
GH-900 tests basic awareness: Copilot is AI-powered, subscription-based, and works in the IDE as a code suggestion tool. Deep Copilot architecture questions are for GH-300.
:::

---

## GitHub Packages

**GitHub Packages** is a package registry integrated with GitHub — store and share packages alongside your code.

Supported package types:
- npm (JavaScript)
- Maven / Gradle (Java)
- NuGet (.NET)
- RubyGems (Ruby)
- Docker / OCI container images

Packages are scoped to a user or organization and can be public or private. GitHub Actions can publish and consume packages automatically.

---

## CI/CD Concepts

| Term | Meaning |
|------|---------|
| **CI (Continuous Integration)** | Automatically build and test code on every push |
| **CD (Continuous Delivery)** | Automatically prepare code for release after CI passes |
| **CD (Continuous Deployment)** | Automatically deploy to production after CI passes |

GitHub Actions is GitHub's native CI/CD solution. Key benefits:
- No external CI server needed
- Runs on every push/PR by default
- Status checks can block PR merges until they pass

::: info Status Checks
A **required status check** in branch protection rules means a PR cannot be merged until the check (e.g., a CI workflow) passes. This is how Actions integrates with code review workflows.
:::

---

<FlashcardDeck
  title="Domain 4: Modern Development"
  storage-key="gh-900-domain-4-cards"
  :cards="[
    {
      question: 'What is the difference between github.dev and Codespaces?',
      answer: '<strong>github.dev</strong>: browser editor, no terminal, no compute, free. <strong>Codespaces</strong>: full cloud VM, has terminal, can run code, compute-billed.'
    },
    {
      question: 'Where are GitHub Actions workflow files stored?',
      answer: 'In the <strong>.github/workflows/</strong> directory, as YAML files.'
    },
    {
      question: 'What is a GitHub Actions runner?',
      answer: 'The server that executes workflow jobs. Can be <strong>GitHub-hosted</strong> (managed VMs) or <strong>self-hosted</strong> (your own infrastructure).'
    },
    {
      question: 'What file configures a Codespace environment?',
      answer: '<strong>devcontainer.json</strong> in the <strong>.devcontainer/</strong> folder — defines the container image, extensions, and post-create commands.'
    },
    {
      question: 'How do you open the github.dev editor without changing the URL?',
      answer: 'Press the <strong>period key (.)</strong> while viewing any GitHub repository.'
    },
    {
      question: 'What is a required status check in branch protection?',
      answer: 'A GitHub Actions workflow (or external check) that must <strong>pass</strong> before a PR can be merged into the protected branch.'
    },
    {
      question: 'What does GitHub Copilot do?',
      answer: 'AI-powered code completion tool that suggests code inline in your editor based on comments, context, and patterns. Works in VS Code, JetBrains, Neovim, and github.dev.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Domain 5 →](./domain-5.md)
