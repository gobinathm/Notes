---
title: "GH-500 - Domain 4: Configure and Use Code Scanning with CodeQL"
description: "GH-500 Domain 4: CodeQL default vs advanced setup, queries, alerts, SARIF, and branch protection integration"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 4, code scanning, codeql, sarif, sast, branch protection, ghas, github advanced security
---

# Domain 4: Configure and Use Code Scanning with CodeQL (25%)

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)

::: tip Exam Tip
Know the difference between default setup and advanced setup, when to use each, and how code scanning integrates with branch protection to block PRs. Also understand SARIF — it's frequently tested as the way to bring third-party SAST results into GitHub.
:::

---

## What is Code Scanning?

Code scanning is a **Static Application Security Testing (SAST)** feature that analyzes source code to find security vulnerabilities and coding errors.

GitHub's code scanning is powered by **CodeQL** — a semantic code analysis engine that treats code as data, allowing you to query it for vulnerability patterns.

### Supported Languages

- C / C++
- C# / .NET
- Go
- Java / Kotlin
- JavaScript / TypeScript
- Python
- Ruby
- Swift (for iOS/macOS apps)

---

## CodeQL Setup Options

### Default Setup

The fastest way to enable CodeQL — GitHub automatically:
- Detects the languages in your repository
- Selects the appropriate query suite
- Configures scan triggers (push to default branch, PRs to default branch)
- No workflow YAML file needed

**Enable via**: Settings → Code security → Code scanning → Set up → Default

::: tip Best for
Repositories where you want immediate, zero-configuration scanning. Ideal for most projects.
:::

### Advanced Setup

A GitHub Actions workflow file (`.github/workflows/codeql.yml`) gives you full control over:
- Which query suites to run (default, extended, custom)
- Which branches to scan
- Scan schedule (cron)
- Build commands for compiled languages
- Custom CodeQL packs

**Enable via**: Settings → Code security → Code scanning → Set up → Advanced

#### Example Advanced CodeQL Workflow

```yaml
name: CodeQL Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1'   # Every Monday at 2am UTC

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read

    strategy:
      matrix:
        language: [javascript, python]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          queries: security-extended   # or: security-and-quality

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

---

## CodeQL Query Suites

| Suite | Description | When to use |
|---|---|---|
| **`security-extended`** (default) | Security queries + additional CWE coverage | Most repositories |
| **`security-and-quality`** | Security + code quality queries (can be noisy) | When you want code quality coverage too |
| **Custom packs** | Your own or third-party CodeQL queries | Specialized security requirements |

::: warning Exam Trap
Default setup uses the **security-extended** query suite by default — not `security-and-quality`. The quality suite generates more alerts and is not enabled by default because it may produce more noise.
:::

---

## Code Scanning Alerts

### Alert Properties

Each code scanning alert includes:
- **Rule ID** (e.g., `js/sql-injection`)
- **Severity**: Critical, High, Medium, Low, Note, Warning
- **CWE category** (e.g., CWE-89 for SQL Injection)
- **Location**: File, line number, and code snippet
- **Description** and recommended remediation
- **Path**: The data flow from source to sink (for dataflow vulnerabilities)

### Alert States

| State | Meaning |
|---|---|
| **Open** | Active vulnerability, needs fix |
| **Fixed** | Code was changed and re-scan shows no violation |
| **Dismissed — Won't fix** | Accepted risk; not going to fix |
| **Dismissed — False positive** | Not actually a vulnerability |
| **Dismissed — Used in tests** | Only in test code, not production |

### Alert Severity and CVSS

Code scanning alerts use two severity scales:
- **Security Severity** (CVSS-based): Critical, High, Medium, Low — for security vulnerabilities
- **Alert Severity**: Error, Warning, Note — for code quality issues

---

## SARIF (Static Analysis Results Interchange Format)

SARIF is an **open standard** (JSON-based) format for representing static analysis results. It allows you to bring results from **any SAST tool** into GitHub's code scanning interface.

### Why SARIF Matters

- You can use CodeQL AND third-party tools (Snyk, Checkmarx, SonarCloud, Semgrep, Veracode)
- All results appear in the unified **Security → Code scanning alerts** view
- Enables comparison and deduplication across tools

### Uploading SARIF Results

```yaml
- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: results.sarif
    category: my-tool-name   # Distinguishes this tool's results
```

### SARIF File Requirements

- Must be valid JSON conforming to the SARIF 2.1.0 schema
- Maximum file size: 64MB (uncompressed)
- Results are retained for 90 days

---

## Code Scanning in Pull Requests

### How PR Integration Works

1. When a PR is opened targeting a protected branch, the code scanning workflow runs
2. New alerts introduced by the PR appear as **checks** on the PR
3. If the check fails: the PR is **blocked from merging** (when branch protection requires it)
4. Alerts are displayed inline at the affected line in the PR diff

### Configuring Branch Protection for Code Scanning

In branch protection rules for `main`:
- **Require status checks to pass before merging**
- Add the CodeQL check: `CodeQL` (or your tool's check name)
- With this in place, PRs that introduce new code scanning alerts **cannot merge**

::: warning Exam Trap
Code scanning only blocks merges when you configure the check in **branch protection rules**. Enabling code scanning alone does not block PRs — you must also configure the branch protection rule to require the check.
:::

---

## Comparing Default vs Advanced Setup

| | Default Setup | Advanced Setup |
|---|---|---|
| **Configuration** | Zero YAML — GitHub auto-configures | `.github/workflows/codeql.yml` required |
| **Language detection** | Automatic | Manual (matrix configuration) |
| **Query suite** | security-extended (auto) | Configurable (any suite or custom queries) |
| **Schedule** | On push and PR to default branch | Fully configurable (cron, any branch) |
| **Build step** | Automatic (autobuild) | Manual (specify build commands) |
| **Best for** | Quick start, standard projects | Monorepos, compiled languages needing custom build, custom queries |

---

## Troubleshooting Code Scanning

| Problem | Likely Cause | Fix |
|---|---|---|
| No alerts generated | Language not supported or wrong language config | Verify language matrix in workflow |
| Autobuild fails | Compiled language requires specific build steps | Use advanced setup with manual build commands |
| Too many alerts (noise) | `security-and-quality` suite enabled | Switch to `security-extended` |
| PR check not blocking merge | Branch protection not requiring the check | Add CodeQL to required status checks in branch protection |
| SARIF upload fails | File too large or invalid format | Validate SARIF schema, check 64MB limit |

---

<FlashcardDeck
  title="Domain 4 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between CodeQL default setup and advanced setup?',
      answer: '<strong>Default setup</strong>: Zero YAML, GitHub auto-detects languages and configures scanning — fastest to enable. <strong>Advanced setup</strong>: You write a <code>codeql.yml</code> workflow for custom query suites, build steps, and schedules — maximum control.'
    },
    {
      question: 'What is SARIF and when is it used with code scanning?',
      answer: 'SARIF (Static Analysis Results Interchange Format) is a standard JSON format for SAST results. It is used to upload results from <strong>third-party tools</strong> (Snyk, Checkmarx, SonarCloud) into GitHub\'s code scanning interface.'
    },
    {
      question: 'How do you make code scanning block a PR from merging?',
      answer: 'Two steps: (1) Enable code scanning with a workflow. (2) Add the code scanning check to <strong>branch protection rules</strong> as a required status check. Code scanning alone does not block merges — branch protection enforcement is required.'
    },
    {
      question: 'Which CodeQL query suite is used by default setup?',
      answer: '<strong>security-extended</strong> — provides security coverage with CWE categories. The security-and-quality suite adds code quality queries but is not the default due to higher alert volume.'
    },
    {
      question: 'What languages does CodeQL support?',
      answer: 'C, C++, C#, Go, Java, Kotlin, JavaScript, TypeScript, Python, Ruby, and Swift.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)
