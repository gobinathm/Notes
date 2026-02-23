---
title: "GH-100 - Exam Tips"
description: "Exam strategies and study advice for GH-100 GitHub Administration"
---

# GH-100: Exam Tips & Strategy

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)

::: tip Note
This page focuses on the **study strategy** and **test-taking approach**. For tactical traps and decision rules, see the [Exam Guide](./exam-guide.md).
:::

---

## Study Strategy

### 1. Focus Areas by Domain Weight

- **Primary (Domain 5 — 36%)**: Spend the majority of your prep here. Secret scanning, push protection, CodeQL, Dependabot, audit log APIs, access tokens, GitHub Apps vs OAuth Apps, and Enterprise Managed Users.
- **Secondary (Domain 4 — 18%)**: Org structure, permission levels, team sync via AD, enterprise vs org policies, least-privilege principles.
- **Secondary (Domain 6 — 16%)**: Self-hosted runner configuration and risks, runner groups, encrypted secrets scope, reusable workflows.
- **Supporting (Domain 2 — 11%)**: SAML SSO vs SCIM vs Team Sync — understand the distinctions cold.
- **Awareness (Domains 1 & 3 — 9% each)**: Know the product differences (GHEC/GHES/GHAE), licensing basics, and how the admin role differs from GitHub Support.

### 2. Hands-on Practice

- **Configure SAML SSO** on a free GitHub org using a free Okta developer account — step through the enable → enforce flow
- **Enable Dependabot alerts** and secret scanning on a test repo with a dummy secret committed
- **Set up a self-hosted runner** locally and register it to a test org or repo
- **Write a reusable workflow** and call it from another repo's workflow
- **Query the audit log** via REST API using `curl` or Postman to practice filtering by action type
- **Try CodeQL** on a public repo via the Security tab → Code scanning → Set up code scanning

---

## Test-Taking Strategy

### Time Management

- **Total Time**: 100 minutes
- **Expected Questions**: ~50-60 questions (not officially published)
- **Pacing**: Aim for ~90 seconds per question to leave 10-15 minutes for review

### Question Handling

- ✅ **First Pass**: Answer all questions you're confident about, flag uncertain ones for review.
- ✅ **Elimination**: Eliminate answers that violate least-privilege or jump to technical implementation before governance.
- ✅ **Keywords**: Watch for "MOST secure", "LEAST privilege", "FIRST step" — these narrow the correct answer.
- ✅ **Enterprise vs Org**: If a question asks how to enforce something *across all organizations*, the answer involves an **enterprise policy**, not per-org settings.
- ✅ **Interactive components**: The exam may include lab-style questions (clicking through a simulated UI). Read the scenario fully before clicking.

---

## Last-Minute Review Checklist

- [ ] Review the [Cheatsheet](./cheatsheet.md) — especially SLG principles, token types, and quick decision rules.
- [ ] Revisit the [Exam Guide](./exam-guide.md) traps — especially SAML vs SCIM, GitHub App vs OAuth App, filter-branch vs BFG.
- [ ] Flashcards: Domain 2 (identity), Domain 4 (permissions), Domain 5 (security) — the three most concept-dense domains.
- [ ] Confirm the distinction between **push protection** (blocks before commit) vs **secret scanning** (detects after commit).
- [ ] Remind yourself: **EMU** = company-managed accounts, no personal GitHub, requires SCIM.
- [ ] Verify Pearson VUE requirements: government-issued ID, clean desk, no second monitors, camera enabled.

---

[← Back to Overview](./index.md) | [← Cheatsheet](./cheatsheet.md)
