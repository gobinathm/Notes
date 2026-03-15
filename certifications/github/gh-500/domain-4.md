---
title: "GH-500 - Domain 4: Configure and use code scanning"
description: "GH-500 Domain 4: Code scanning, SARIF, and branch protection integration"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 4, code scanning, sarif, sast, branch protection, ghas, github advanced security
---

# Domain 4: Configure and use code scanning (15%)

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)

::: tip Exam Tip
Know how code scanning integrates with branch protection to block PRs. Also understand SARIF — it's frequently tested as the way to bring third-party SAST results into GitHub.
:::

---

## What is Code Scanning?

Code scanning is a **Static Application Security Testing (SAST)** feature that analyzes source code to find security vulnerabilities and coding errors.

It integrates natively with GitHub to show vulnerabilities as alerts in the repository and directly in pull requests. Code scanning can be powered by GitHub's CodeQL (covered in Domain 5) or by third-party tools via SARIF.

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

### Why the `category` Field Matters

- The `category` field identifies a distinct analysis source within code scanning
- If you upload results from multiple tools, such as **CodeQL** and **Snyk**, they must use **different category values**
- If two uploads reuse the same category for the same commit/ref, the later upload can overwrite the earlier results

::: warning Exam Trap
On multi-tool scanning questions, the correct answer is usually: use a **different SARIF category** for each tool or analysis variant.
:::

### SARIF File Requirements

- Must be valid JSON conforming to the SARIF 2.1.0 schema
- Maximum file size: 64MB (uncompressed)
- Results are retained for 90 days

### Partial SARIF Success

- A SARIF upload can be **accepted with warnings** if only part of the file is malformed
- In that case, GitHub may still ingest the valid portion but drop some results
- The UI typically surfaces this as a **warning** rather than a total failure

::: warning Exam Trap
If the question describes a SARIF upload that "worked but some findings are missing," think **partial parsing success** or malformed SARIF sections causing dropped results.
:::

### Key Numbers to Remember

| Detail | Value |
|---|---|
| Maximum uncompressed SARIF upload size | **64 MB** |
| Default retention of code scanning analysis results | **90 days** |

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
- Add the scanning check: `CodeQL` (or your third-party tool's check name)
- With this in place, PRs that introduce new code scanning alerts **cannot merge**

::: warning Exam Trap
Code scanning only blocks merges when you configure the check in **branch protection rules**. Enabling code scanning alone does not block PRs — you must also configure the branch protection rule to require the check.
:::

---

<FlashcardDeck
  title="Domain 4 Quick Quiz"
  :cards="[
    {
      question: 'What is SARIF and when is it used with code scanning?',
      answer: 'SARIF (Static Analysis Results Interchange Format) is a standard JSON format for SAST results. It is used to upload results from <strong>third-party tools</strong> (Snyk, Checkmarx, SonarCloud) into GitHub\'s code scanning interface.'
    },
    {
      question: 'How do you make code scanning block a PR from merging?',
      answer: 'Two steps: (1) Enable code scanning with a workflow. (2) Add the code scanning check to <strong>branch protection rules</strong> as a required status check. Code scanning alone does not block merges — branch protection enforcement is required.'
    },
    {
      question: 'What are the two severity scales used by code scanning alerts?',
      answer: '<strong>Security Severity</strong> (Critical, High, Medium, Low) for security vulnerabilities, and <strong>Alert Severity</strong> (Error, Warning, Note) for code quality issues.'
    },
    {
      question: 'Why is the SARIF category field important when uploading results from multiple tools?',
      answer: 'Each tool or analysis variant should use a <strong>different category</strong>. If two SARIF uploads use the same category for the same ref, the later upload can overwrite the earlier one.'
    },
    {
      question: 'What is the maximum size for a single uncompressed SARIF upload, and how long are code scanning results retained by default?',
      answer: '<strong>64 MB</strong> per uncompressed SARIF file, and analysis results are retained for <strong>90 days</strong> by default.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)
