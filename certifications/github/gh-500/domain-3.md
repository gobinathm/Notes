---
title: "GH-500 - Domain 3: Configure and Use Dependabot and Dependency Review"
description: "GH-500 Domain 3: Dependency graph, Dependabot alerts, security updates, version updates, and dependency review action"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 3, dependabot, dependency review, dependency graph, security updates, version updates, cve, cvss, ghas
---

# Domain 3: Configure and Use Dependabot and Dependency Review (35%)

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)

::: danger Exam Priority
This is the largest domain at 35% of the exam. Master every feature here — the difference between Dependabot alerts, security updates, version updates, and dependency review are all highly tested.
:::

---

## The Dependency Graph

The dependency graph is the foundation for all Dependabot features. It tracks:
- **Direct dependencies** (packages listed in your manifest files)
- **Transitive dependencies** (dependencies of your dependencies)
- **Supported ecosystems**: npm, pip, Maven, Gradle, Bundler, Cargo, NuGet, Go modules, Composer, and more

### Enabling the Dependency Graph

- **Public repos**: Always enabled by default
- **Private repos**: Settings → Security → Dependency graph → Enable
- Also enables at org level via: Org Settings → Code security → Dependency graph

### Supported Manifest Files

| Ecosystem | Manifest file |
|---|---|
| npm (Node.js) | `package.json`, `package-lock.json` |
| pip (Python) | `requirements.txt`, `Pipfile`, `pyproject.toml` |
| Maven (Java) | `pom.xml` |
| Gradle (Java) | `build.gradle`, `build.gradle.kts` |
| Bundler (Ruby) | `Gemfile`, `Gemfile.lock` |
| Cargo (Rust) | `Cargo.toml`, `Cargo.lock` |
| NuGet (.NET) | `.csproj`, `packages.config` |
| Go | `go.mod` |

---

## Dependabot Alerts

Dependabot alerts notify you when one of your dependencies has a known security vulnerability.

### How It Works

1. GitHub monitors the **GitHub Advisory Database** (and NVD — National Vulnerability Database)
2. When a new CVE/advisory is published that matches a dependency in your graph, a **Dependabot alert** is created
3. Alert includes: CVE ID, CVSS score, affected versions, patched version, description

### CVSS Severity Levels

| CVSS Score | Severity |
|---|---|
| 9.0–10.0 | **Critical** |
| 7.0–8.9 | **High** |
| 4.0–6.9 | **Medium** |
| 0.1–3.9 | **Low** |

### Enabling Dependabot Alerts

- **Repository**: Settings → Code security → Dependabot alerts → Enable
- **Organization**: Org Settings → Code security → Dependabot alerts
- **Enterprise**: Enterprise Settings → Code security → Dependabot alerts

::: tip
Dependabot alerts are available to all GitHub plans (not just GHAS) for public repositories and repositories where the dependency graph is enabled. For private repositories on GitHub Free/Pro/Team, Dependabot alerts are still available — GHAS is only required for code scanning and secret scanning.
:::

### Managing Dependabot Alerts

| Alert State | Meaning |
|---|---|
| **Open** | Vulnerability confirmed, needs action |
| **Dismissed — Tolerable risk** | Accepted as a known/low-priority issue |
| **Dismissed — False positive** | Dependency not actually vulnerable in this context |
| **Dismissed — No bandwidth to fix** | Acknowledged; deferred |
| **Fixed** | Alert resolved by updating the dependency |
| **Auto-dismissed** | Vulnerability is not reachable based on code analysis |

---

## Dependabot Security Updates

Dependabot security updates **automatically open pull requests** to update vulnerable dependencies to the minimum safe version.

### How Security Updates Work

1. A Dependabot alert is created for a vulnerable dependency
2. If security updates are enabled, Dependabot checks if a safe version exists
3. If a safe version exists: Dependabot opens a PR to update the dependency
4. The PR includes: vulnerability details, changelog diff, and compatibility score

### Enabling Security Updates

- **Repository**: Settings → Code security → Dependabot security updates → Enable
- **Organization**: Org Settings → Code security → Dependabot security updates

::: warning Exam Trap
Security updates ≠ version updates. Security updates are **vulnerability-driven** (triggered by a CVE). Version updates are **schedule-driven** (update to latest regardless of security). They are configured separately.
:::

---

## Dependabot Version Updates

Dependabot version updates keep all dependencies **up to date with their latest releases** on a schedule — regardless of whether there's a security issue.

### Configuring `dependabot.yml`

Version updates are configured via `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "gobinathm"
    labels:
      - "dependencies"
    ignore:
      - dependency-name: "lodash"
        versions: ["4.x"]
```

### Key `dependabot.yml` Fields

| Field | Description |
|---|---|
| `package-ecosystem` | The package manager: `npm`, `pip`, `maven`, `cargo`, `nuget`, `bundler`, `gomod`, etc. |
| `directory` | Where the manifest file is located (relative to repo root) |
| `schedule.interval` | `daily`, `weekly`, `monthly` |
| `open-pull-requests-limit` | Max number of open Dependabot PRs at once (default: 5) |
| `ignore` | Dependencies or version ranges to skip |
| `reviewers` | GitHub users to auto-assign as reviewers |
| `labels` | Labels to apply to Dependabot PRs |
| `target-branch` | Branch to target for version update PRs |

### Multiple Ecosystems

You can configure multiple `updates` blocks for different ecosystems in the same file:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "pip"
    directory: "/backend"
    schedule:
      interval: "monthly"
```

---

## Dependency Review

Dependency review prevents pull requests from merging if they introduce **new vulnerable dependencies**.

### How Dependency Review Works

1. A PR modifies a dependency manifest (e.g., `package.json`, `requirements.txt`)
2. The **Dependency Review Action** runs as a PR check
3. It diffs the dependency changes and checks the GitHub Advisory Database
4. If a newly added/updated dependency has a CVE: the check **fails**, blocking the merge

### Adding the Dependency Review Action

```yaml
# .github/workflows/dependency-review.yml
name: Dependency Review
on: [pull_request]

permissions:
  contents: read

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Dependency Review
        uses: actions/dependency-review-action@v4
```

### Configuring Dependency Review

```yaml
- name: Dependency Review
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: high           # Block PRs with high+ severity CVEs
    deny-licenses: GPL-3.0, LGPL-2.0 # Block PRs adding these licenses
    allow-licenses: MIT, Apache-2.0  # Allowlist licenses
    comment-summary-in-pr: always    # Post a summary comment on the PR
```

::: warning Exam Trap
Dependency review **only blocks new vulnerabilities introduced by a PR** — it doesn't scan the entire existing dependency tree. For that, you need Dependabot alerts on the repository.
:::

### Dependency Review vs Dependabot Alerts

| | Dependency Review | Dependabot Alerts |
|---|---|---|
| **When** | At PR time | Anytime (continuous monitoring) |
| **What it scans** | New dependencies in the PR diff | All current dependencies |
| **Action** | Blocks PR merge | Creates an alert |
| **Requires GHAS** | Yes (private repos) | No (all repos) |

---

## SBOM (Software Bill of Materials)

GitHub can export a **Software Bill of Materials** — a complete inventory of all dependencies in a repository.

### Exporting an SBOM

- **UI**: Insights → Dependency graph → Export SBOM
- **API**: `GET /repos/{owner}/{repo}/dependency-graph/sbom`
- **Format**: SPDX (Software Package Data Exchange) JSON

Use cases: Supply chain audits, compliance requirements (e.g., US Executive Order on cybersecurity), license inventory.

---

<FlashcardDeck
  title="Domain 3 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between Dependabot security updates and Dependabot version updates?',
      answer: '<strong>Security updates</strong> are triggered by a CVE — they automatically open a PR to fix a specific vulnerability. <strong>Version updates</strong> run on a schedule (configured in dependabot.yml) and update dependencies to their latest release, regardless of security.'
    },
    {
      question: 'A PR changes package.json and adds a library with a known CVE. What blocks the merge?',
      answer: 'The <strong>Dependency Review Action</strong> — it compares new dependencies in the PR diff against the GitHub Advisory Database and fails the check if a vulnerable dependency is introduced.'
    },
    {
      question: 'What file configures Dependabot version updates?',
      answer: '<code>.github/dependabot.yml</code> — it specifies the package ecosystem, directory, schedule interval, and other options like ignored dependencies and PR limits.'
    },
    {
      question: 'What CVSS score range corresponds to Critical severity?',
      answer: '<strong>9.0–10.0</strong> is Critical. High: 7.0–8.9. Medium: 4.0–6.9. Low: 0.1–3.9.'
    },
    {
      question: 'What is an SBOM and how do you export it from GitHub?',
      answer: 'SBOM (Software Bill of Materials) is a complete inventory of all dependencies. Export via: Insights → Dependency graph → Export SBOM (SPDX JSON format), or via the API: <code>GET /repos/{owner}/{repo}/dependency-graph/sbom</code>.'
    },
    {
      question: 'Does Dependabot version updates require a GHAS license?',
      answer: '<strong>No.</strong> Dependabot version updates and alerts are available on all GitHub plans. GHAS is required for code scanning and secret scanning on private repositories, but not for Dependabot features.'
    }
  ]"
/>

---

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)
