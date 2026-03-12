---
title: "GH-500 - Cheatsheet"
description: "One-page exam day reference for GH-500 GitHub Advanced Security"
head:
  - - meta
    - name: keywords
      content: gh-500, github advanced security, ghas, cheatsheet, quick reference, exam
---

# GH-500: Cheatsheet

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)

::: danger Exam Day Reference
Review this page 5 minutes before the exam.
:::

---

## GHAS Feature Lookup

| Feature                         | What it does                                | Reactive or Proactive?           |
|---------------------------------|---------------------------------------------|----------------------------------|
| **Secret scanning**             | Detects secrets already in repo history     | Reactive (alerts after commit)   |
| **Push protection**             | Blocks commits containing secrets           | Proactive (blocks before push)   |
| **Dependabot alerts**           | Notifies of vulnerable dependencies         | Reactive (alerts on CVE match)   |
| **Dependabot security updates** | Auto-opens PR to fix vulnerable dep         | Automated remediation            |
| **Dependabot version updates**  | Scheduled PRs to keep deps current          | Scheduled (not CVE-driven)       |
| **Dependency review**           | Blocks PRs introducing vulnerable deps      | Proactive (blocks at PR merge)   |
| **Code scanning (CodeQL)**      | SAST — finds vulnerabilities in code        | Reactive (alerts on push/PR)     |
| **SARIF upload**                | Import third-party SAST results             | Integration                      |

---

## GHAS Plan Requirements

| Feature                             | Free/Pro/Team  | GHEC/GHES (no GHAS)  | GHEC/GHES + GHAS |
|-------------------------------------|----------------|----------------------|------------------|
| **Secret scanning** (public repo)   | ✅             | ✅                   | ✅               |
| **Secret scanning** (private repo)  | ❌             | ❌                   | ✅               |
| **Push protection** (private repo)  | ❌             | ❌                   | ✅               |
| **Dependabot alerts**               | ✅             | ✅                   | ✅               |
| **Code scanning** (public repo)     | ✅             | ✅                   | ✅               |
| **Code scanning** (private repo)    | ❌             | ❌                   | ✅               |
| **Dependency review** (private repo)| ❌             | ❌                   | ✅               |

---

## CVSS Severity Levels

| CVSS Score | Severity     |
|------------|--------------|
| 9.0–10.0   | **Critical** |
| 7.0–8.9    | **High**     |
| 4.0–6.9    | **Medium**   |
| 0.1–3.9    | **Low**      |

---

## CodeQL Setup Comparison

| | Default Setup | Advanced Setup |
|---|---|---|
| **YAML needed** | No | Yes (`.github/workflows/codeql.yml`) |
| **Language detection** | Automatic | Manual |
| **Query suite** | security-extended | Configurable |
| **Best for** | Quick start | Custom queries, monorepos |

---

## Dependabot Version Update Key Fields (`dependabot.yml`)

```yaml
version: 2
updates:
  - package-ecosystem: "npm"    # npm, pip, maven, cargo, nuget, bundler, gomod
    directory: "/"
    schedule:
      interval: "weekly"        # daily, weekly, monthly
    open-pull-requests-limit: 5 # default: 5
    ignore:
      - dependency-name: "lodash"
```

---

## Quick Decision Rules

**Secret already committed to main?**
→ Secret scanning alert → revoke at provider first, then remove from history

**Block a secret before commit?**
→ Push protection (most proactive option)

**Vulnerable npm dependency in production?**
→ Dependabot alert → enable security updates for auto-PR fix

**Schedule weekly dep updates across all ecosystems?**
→ Dependabot version updates via `.github/dependabot.yml`

**PR adds a library with CVE-2024-XXXX?**
→ Dependency review action (blocks merge automatically)

**SQL injection in application code?**
→ Code scanning (CodeQL) alert

**Third-party SAST tool results in GitHub?**
→ Upload SARIF file via `github/codeql-action/upload-sarif`

**Block PR merge if code has vulnerability?**
→ Code scanning + branch protection (require CodeQL check)

**Full dep inventory for compliance?**
→ Dependency graph → Export SBOM (SPDX format)

**Org-wide security posture view?**
→ Security Overview (org or enterprise level)

---

## Terminology Check

- **SAST**: Static Application Security Testing — analyze source code without executing it
- **DAST**: Dynamic Application Security Testing — test a running application (not covered by GHAS)
- **CVE**: Common Vulnerabilities and Exposures — standard vulnerability identifier (CVE-YYYY-NNNNN)
- **CVSS**: Common Vulnerability Scoring System — standardized severity score (0–10)
- **CWE**: Common Weakness Enumeration — categories of code weaknesses (e.g., CWE-89 SQL Injection)
- **SARIF**: Static Analysis Results Interchange Format — JSON standard for SAST results exchange
- **SBOM**: Software Bill of Materials — complete inventory of a project's dependencies
- **SPDX**: Software Package Data Exchange — open standard format for SBOMs (used by GitHub's export)
- **Advisory Database**: GitHub's database of known vulnerabilities (CVEs + GitHub-curated)
- **Push protection**: Blocks secrets from being committed by rejecting the `git push`
- **CodeQL**: GitHub's semantic code analysis engine for finding security vulnerabilities
- **Dependency graph**: GitHub's map of all direct and transitive dependencies in a repository
- **Security overview**: Org/enterprise dashboard showing GHAS alert status across all repositories

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)
