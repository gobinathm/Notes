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

- **Primary (Domain 3 — 35%)**: Dependabot and dependency review is the largest single domain. Know every option in `dependabot.yml`, the difference between security updates and version updates, and exactly what the dependency review action blocks.
- **Primary (Domain 4 — 25%)**: Code scanning and CodeQL — know default vs advanced setup, SARIF, and branch protection integration.
- **Secondary (Domain 2 — 15%)**: Secret scanning and push protection. Know the reactive vs proactive distinction cold.
- **Secondary (Domain 1 — 15%)**: GHAS feature overview and licensing. Know which plans require GHAS and the seat model.
- **Tertiary (Domain 5 — 10%)**: Best practices and Security Overview. Skim but don't skip — rollout strategy and CVSS remediation priority may appear.

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
- [ ] Flashcards: Domain 3 (Dependabot), Domain 4 (CodeQL/SARIF), Domain 2 (secret scanning/push protection).
- [ ] Remind yourself: **Domain 3 + Domain 4 = 60% of the exam.** Master those two domains first.
- [ ] Verify Pearson VUE requirements: government ID, clean desk, no second monitors, camera enabled.

---

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)
