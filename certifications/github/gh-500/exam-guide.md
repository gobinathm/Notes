---
title: "GH-500 - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the GH-500 GitHub Advanced Security exam"
head:
  - - meta
    - name: keywords
      content: gh-500, exam guide, exam traps, tips, github advanced security, ghas, secret scanning, dependabot, codeql
---

# GH-500: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The GH-500 exam is for **Developers, DevOps Engineers, and Security Engineers** working with GHAS. It values **Shift-Left Security, Proactive Detection, and Least-Exposure Remediation**.

### Answer Philosophy
1. **Shift left**: The correct answer always prevents a problem earlier in the pipeline rather than catching it later.
2. **Automation first**: The exam prefers automated remediation (Dependabot security updates, push protection) over manual processes.
3. **Blocking is better than alerting**: When asked about the most secure approach, prefer a feature that blocks the action over one that merely notifies.

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---|---|
| "Exposed API key / token in a commit" | **Secret scanning + push protection** |
| "Block a secret before it's committed" | **Push protection** |
| "Custom secret format (e.g., internal token)" | **Custom patterns in secret scanning** |
| "Outdated library with a CVE" | **Dependabot alert** |
| "Auto-fix a vulnerable dependency" | **Dependabot security update (auto PR)** |
| "Prevent merging a PR that adds a vulnerable dep" | **Dependency review action** |
| "Schedule weekly dependency updates" | **Dependabot version updates (dependabot.yml)** |
| "Static analysis / SAST" | **Code scanning with CodeQL** |
| "SQL injection / XSS / path traversal in code" | **Code scanning alert** |
| "Third-party SAST tool results in GitHub" | **SARIF upload to code scanning** |
| "Block PR merge if code has security issues" | **Code scanning + branch protection** |
| "Inventory all dependencies / software bill of materials" | **Dependency graph + SBOM export** |
| "Track security posture across the org" | **Security overview / organization security view** |
| "GHAS license requirement" | **GitHub Advanced Security seat = GHEC or GHES** |

---

## Exam Traps

::: warning Look out for these!
- **Secret scanning vs push protection**: Secret scanning **detects** secrets already in the repo (alerts after the fact). Push protection **blocks** secrets from being committed in the first place. Push protection is the more proactive, secure option.
- **Dependabot alerts vs Dependabot security updates**: Alerts **notify** you of a vulnerability. Security updates **automatically open a PR** to fix it. These are two separate features — both can be enabled independently.
- **Dependabot security updates vs version updates**: Security updates fix **vulnerabilities** (triggered by a new CVE/advisory). Version updates keep dependencies **up to date with latest releases** (scheduled via `dependabot.yml`) — they don't require a CVE.
- **Code scanning default setup vs advanced setup**: Default setup = GitHub auto-configures CodeQL with no YAML needed (quickest). Advanced setup = you write a `.github/workflows/codeql.yml` for custom query suites, language configuration, and scheduled scans.
- **SARIF**: SARIF (Static Analysis Results Interchange Format) is the standard format for code scanning results. Used to upload results from third-party tools (Checkmarx, Snyk, SonarCloud) into GitHub's code scanning interface.
- **GHAS licensing**: GHAS features (secret scanning, code scanning, dependency review) require a **GitHub Advanced Security license** — available with GHEC or GHES. Public repositories on GitHub.com get them free.
- **Content exclusions in secret scanning**: You can configure custom patterns and also exclude paths. Be careful: excluding a path means Copilot and secret scanning won't scan those files — the exam may present this as a misconfiguration risk.
:::

---

## Decision Quick Reference

### "Which GHAS feature?"
```
Secret already committed to a branch → Secret scanning alert
Block a secret before commit → Push protection
Vulnerable npm/pip/maven dependency → Dependabot alert
Auto-PR to fix vulnerable dependency → Dependabot security update
Keep all deps on latest versions → Dependabot version updates
SQL injection in application code → Code scanning (CodeQL)
Third-party SAST results in GitHub → SARIF upload
Full inventory of all dependencies → Dependency graph / SBOM
```

### "What is the most secure approach?"
```
Secret in code → Push protection (blocks at commit) > Secret scanning (detects after push)
Vulnerable dependency → Security update (auto-PR) > Alert only
Code vulnerability in PR → Block merge via branch protection + code scanning
```

### "Which setup for code scanning?"
```
Quick start, no YAML → Default setup (CodeQL auto-configured)
Custom queries, specific languages, scheduled scan → Advanced setup (codeql.yml workflow)
Third-party tool → Upload SARIF file
```

### "What plan is needed?"
```
Public repo → GHAS features free
Private repo → GitHub Advanced Security license required (GHEC or GHES)
```

---

## Final Strategy

- **Domain 3 is 35% of the exam** — Dependabot and dependency review is the single largest topic. Know every configuration option in `dependabot.yml`, the difference between security updates and version updates, and how dependency review blocks PRs.
- **Domain 4 is 25%** — Know default vs advanced CodeQL setup, what SARIF is, and how code scanning integrates with branch protection rules.
- **Together, Domains 3 and 4 are 60% of the exam** — master these two before anything else.
- **For every feature, know**: how to enable it, where to configure it, what it produces (alert, PR, block), and how to remediate.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
