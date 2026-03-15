---
title: "GH-500 - Domain 1: Describe the GHAS security features and functionality"
description: "GH-500 Domain 1: Overview of GitHub Advanced Security features, licensing, and availability"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 1, github advanced security, ghas, secret scanning, dependabot, code scanning, licensing, ghec, ghes
---

# Domain 1: Describe the GHAS security features and functionality (10%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

::: tip Exam Tip
This domain tests your conceptual understanding of what GHAS is, what it includes, and who can use it. Expect questions on feature definitions, licensing requirements, and plan availability — not deep configuration.
:::

---

## What is GitHub Advanced Security (GHAS)?

GitHub Advanced Security is a set of security features built into GitHub to help organizations find and fix vulnerabilities **earlier in the development lifecycle** (shift-left security).

::: tip Memory hook
If the question is asking why GHAS exists, the answer is usually **shift-left security**: detect and remediate secrets, vulnerable dependencies, and insecure code as early as possible instead of waiting for production or a later audit.
:::

GHAS includes three primary pillars:

| Pillar | Feature | What it does |
|---|---|---|
| **Secret Scanning** | Secret scanning | Detects exposed credentials, tokens, and API keys |
| **Secret Scanning** | Push protection | Blocks commits containing secrets before they're pushed |
| **Supply Chain Security** | Dependabot alerts | Notifies you of vulnerable dependencies |
| **Supply Chain Security** | Dependabot security updates | Auto-creates PRs to fix vulnerable dependencies |
| **Supply Chain Security** | Dependabot version updates | Auto-creates PRs to keep dependencies up to date |
| **Supply Chain Security** | Dependency review | Blocks PRs that introduce vulnerable dependencies |
| **Code Scanning** | CodeQL analysis | SAST — finds security vulnerabilities in your source code |
| **Code Scanning** | SARIF upload | Lets you import third-party SAST results into GitHub |

---

## GHAS Licensing and Availability

### Public Repositories
- GHAS features are **free** for all public repositories on GitHub.com
- No license purchase required — secret scanning, code scanning, and dependency review are enabled automatically

::: tip Exam shortcut
For public repositories on GitHub.com, the safe default answer is: **GHAS features are free**.
:::

### Private and Internal Repositories

| Plan | GHAS Available? | Notes |
|---|---|---|
| **GitHub Free / Pro** | ❌ | No GHAS on private repos |
| **GitHub Team** | ❌ | No GHAS on private repos |
| **GitHub Enterprise Cloud (GHEC)** | ✅ | Requires GHAS license add-on per active committer |
| **GitHub Enterprise Server (GHES)** | ✅ | Requires GHAS license; features available from GHES 3.0+ |

::: warning Exam Trap
GHAS is **not** included with GitHub Team. It requires GitHub Enterprise (GHEC or GHES) **plus** an additional Advanced Security license purchase. The exam often presents GitHub Team as an option — it's always wrong for private-repo GHAS.
:::

### GHAS License Seat Model

- GHAS is licensed per **active committer** — any user who commits to a private or internal repository with GHAS enabled in the last **90 days**
- Enabling GHAS on a repository doesn't require a seat for read-only contributors
- Org owners can view seat usage in: **Org Settings → Advanced Security → Active committers**

::: warning Exam Trap
Remember the **seat window**: GHAS licensing is based on active committers in the last **90 days**, not total organization members and not all repository collaborators.
:::

---

## Feature-by-Feature Overview

### Secret Scanning

- Scans the **full history** of a repository (including all branches and commits) for known secret formats
- Uses **partner patterns** (GitHub-verified patterns for AWS keys, Stripe API keys, etc.) and optionally **custom patterns**
- Sends alerts to repository admins and security managers when a secret is detected
- Optional: **validity checking** — GitHub queries the service provider to check if a detected secret is still active

### Push Protection

- Prevents a `git push` from succeeding if the pushed code contains a known secret
- Works at the **network level** — the push is rejected before the commit reaches the remote
- Developer sees an error explaining what was blocked and can bypass with a reason (if allowed by policy)
- Can be enforced at repo, org, or enterprise level

### Dependabot Alerts

- Triggered when a repository's dependency is found in the **GitHub Advisory Database** (or NVD) with a known CVE
- Severity levels: **Critical, High, Medium, Low** (based on CVSS score)
- Available for all repositories (even without GHAS) if the dependency graph is enabled

### Dependabot Security Updates

- Automatically opens a PR to update the vulnerable dependency to a safe version
- Requires: Dependabot alerts enabled + security updates feature enabled
- The PR includes the CVSS score, CVE details, and changelog notes

### Dependabot Version Updates

- Scheduled PRs to update dependencies to their latest version (not necessarily security-driven)
- Configured via `.github/dependabot.yml`

### Dependency Review

- A GitHub Action that blocks PR merges if the PR introduces a new vulnerable dependency
- Works as a pull request check — displays a diff of dependency changes including CVE details
- Requires GHAS license for private repositories

### Code Scanning (CodeQL)

- Static Application Security Testing (SAST) — analyzes source code for security vulnerabilities
- Uses **CodeQL**, a semantic code analysis engine originally developed by Semmle (acquired by GitHub)
- Supports: C, C++, C#, Go, Java, Kotlin, JavaScript/TypeScript, Python, Ruby, Swift
- Alerts include: CWE category, severity, location, and recommended fix

### SARIF (Static Analysis Results Interchange Format)

- Standard JSON-based format for exchanging static analysis results
- Allows third-party tools (Snyk, Checkmarx, SonarCloud, Semgrep) to upload results into GitHub's code scanning UI
- Uploaded via the `github/codeql-action/upload-sarif` action

---

## Access and Visibility

Different GHAS features expose alerts to different roles, which is a common exam topic.

| Feature | Typical viewers |
|---|---|
| **Secret scanning alerts** | Repository admins, organization owners, security managers, delegated users/teams |
| **Dependabot alerts** | Repository admins, maintainers, security managers |
| **Code scanning alerts** | Repository admins, maintainers, security managers |

The exact role mapping can vary by repository ownership and enterprise configuration, but the exam usually wants you to distinguish **who can triage alerts** from **who can only read code**.

::: tip
Security Overview itself is covered in more depth in [Domain 7](./domain-7.md), because it is primarily an organization and enterprise reporting capability.
:::

---

<FlashcardDeck
  title="Domain 1 Quick Quiz"
  :cards="[
    {
      question: 'Which GitHub plans support GHAS on private repositories?',
      answer: '<strong>GitHub Enterprise Cloud (GHEC)</strong> and <strong>GitHub Enterprise Server (GHES)</strong> with an Advanced Security license add-on. GitHub Free, Pro, and Team do NOT support GHAS on private repositories.'
    },
    {
      question: 'What is the GHAS licensing model for private repositories?',
      answer: 'GHAS is licensed per <strong>active committer</strong> — any user who commits to a GHAS-enabled private or internal repository within the last <strong>90 days</strong>.'
    },
    {
      question: 'What is the difference between secret scanning and push protection?',
      answer: '<strong>Secret scanning</strong> detects secrets already in the repo history and alerts you. <strong>Push protection</strong> blocks the push before the secret reaches the remote — it is proactive, while secret scanning is reactive.'
    },
    {
      question: 'What is SARIF and why is it used in code scanning?',
      answer: 'SARIF (Static Analysis Results Interchange Format) is a standard JSON format for security scan results. It allows third-party SAST tools (Snyk, Checkmarx, SonarCloud) to upload their results into GitHub\'s code scanning interface.'
    },
    {
      question: 'Are GHAS features free for public repositories?',
      answer: '<strong>Yes.</strong> Secret scanning, code scanning, dependency review, and Dependabot features are all free for public repositories on GitHub.com.'
    },
    {
      question: 'What security concept best describes the purpose of GHAS?',
      answer: '<strong>Shift-left security.</strong> GHAS is designed to find and fix vulnerabilities earlier in the development lifecycle, before they become larger production or compliance problems.'
    }
  ]"
/>

---

[← Overview](./index.md) · [Next Domain →](./domain-2.md)
