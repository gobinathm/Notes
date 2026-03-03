---
title: "GH-500 - Exam Tips"
description: "Exam strategies and study advice for GH-500 GitHub Advanced Security"
---

# GH-500: Exam Tips & Strategy

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)

::: tip Note
This page focuses on the **study strategy** and **test-taking approach**. For tactical traps and decision rules, see the [Exam Guide](./exam-guide.md).
:::

---

## Study Strategy

### 1. Focus Areas by Domain Weight

- **Primary (Domains 5 & 6 — 20% each)**: CodeQL details and GHAS best practices make up 40% of the exam. Master CodeQL query suites and the phased GHAS rollout strategy.
- **Secondary (Domains 3 & 4 — 15% each)**: Dependency management and code scanning setup. Know `dependabot.yml`, dependency review, and SARIF integration.
- **Tertiary (Domains 1, 2 & 7 — 10% each)**: GHAS features, secret scanning, and enterprise configurations. Know push protection bypasses and Security Overview metrics well.

### 2. Hands-on Practice

- **Enable GHAS on a test repo**: Create a repo, enable secret scanning, push a fake API key pattern, and observe the alert flow
- **Configure dependabot.yml**: Write a version updates config for npm and pip with weekly schedule and verify the Dependabot PRs are created
- **Enable code scanning (default setup)**: Use the default setup on a JavaScript or Python repo and review the alerts generated
- **Try the dependency review action**: Set up the action workflow and open a PR that changes `package.json` — observe the check output
- **Upload a SARIF file**: Use a third-party tool (Semgrep, Trivy) to generate a SARIF file and upload it to code scanning

---

## Test-Taking Strategy

### Time Management

- **Total Time**: 100 minutes
- **Expected Questions**: ~65 questions
- **Pacing**: Aim for ~90 seconds per question to leave 10 minutes for review

### Question Handling

- ✅ **First Pass**: Answer confident questions first, flag scenario-based ones for review.
- ✅ **Elimination**: Eliminate answers that are monitoring-only when a blocking/prevention option exists.
- ✅ **Keywords**: Watch for "MOST secure", "BEST approach", "FIRST step" — these narrow the answer significantly.
- ✅ **Proactive > Reactive**: When two features both address the same threat, prefer the one that prevents (push protection, dependency review) over the one that detects (secret scanning, Dependabot alerts).
- ✅ **Plan awareness**: If the question mentions private repos and GHAS features → the answer requires GHEC or GHES + GHAS license.
- ✅ **Alert type matters**: Distinguish "which feature generates this alert type?" — secret scanning alert, Dependabot alert, and code scanning alert are separate objects in GitHub.

---

## Last-Minute Review Checklist

- [ ] Review [Cheatsheet](./cheatsheet.md) — especially the GHAS feature table, CVSS severity levels, and quick decision rules.
- [ ] Revisit [Exam Guide](./exam-guide.md) traps — especially secret scanning vs push protection, security updates vs version updates, and default vs advanced CodeQL setup.
- [ ] Flashcards: Domain 3 (Dependabot), Domain 5 (CodeQL), Domain 2 (secret scanning/push protection).
- [ ] Remind yourself: **Domains 4, 5, and 6 = 55% of the exam.** Master Code scanning, CodeQL, and Best Practices.
- [ ] Verify Pearson VUE requirements: government ID, clean desk, no second monitors, camera enabled.

---

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)
