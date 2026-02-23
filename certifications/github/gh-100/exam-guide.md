---
title: "GH-100 - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the GH-100 GitHub Administration exam"
head:
  - - meta
    - name: keywords
      content: gh-100, exam guide, exam traps, tips, github administration
---

# GH-100: Exam Guide

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## How the Exam Wants You to Think

The GH-100 exam is for **GitHub Administrators** (system administrators, IT professionals, software developers managing GitHub Enterprise). It values **Security, Least Privilege, and Governance**.

### Answer Philosophy
1. **Least Privilege First**: If an answer grants more access than the task requires, it's likely wrong. Always prefer the minimum permission that achieves the goal.
2. **Governance Before Action**: If a question asks what to do first, choose policy/governance/assessment over technical implementation.
3. **Security is the Default**: When in doubt, choose the more secure, auditable, and compliance-friendly option — especially in Domain 5 (36% of the exam).

---

## Keyword Detection Table

| If you see... | Look for this in the answer... |
|---------------|--------------------------------|
| "Identity federation" | **SAML SSO** |
| "Automate user provisioning / deprovisioning" | **SCIM** |
| "Sync AD groups to GitHub teams" | **Team synchronization** |
| "Company-managed identities, no personal accounts" | **Enterprise Managed Users (EMU)** |
| "On-premises / air-gapped / self-hosted" | **GitHub Enterprise Server (GHES)** |
| "Cloud-hosted enterprise" | **GitHub Enterprise Cloud (GHEC)** |
| "Detect secrets leaked in commits" | **Secret scanning** |
| "Find vulnerabilities in source code" | **CodeQL / Code scanning** |
| "Outdated or vulnerable dependency" | **Dependabot** |
| "Compliance report / who deleted what" | **Audit log API (REST or GraphQL)** |
| "Remove sensitive data from Git history" | **BFG Repo Cleaner** or **filter-branch** |
| "Machine account / bot authenticating" | **GitHub App** (preferred over PAT) |
| "Custom hardware / on-prem CI runners" | **Self-hosted runner** |
| "Reuse CI logic across repos" | **Reusable workflows** |
| "Isolate runner access by team or org" | **Runner groups** |
| "Store secrets outside GitHub" | **Third-party vault** (HashiCorp Vault, etc.) |
| "Enforce policy across all organizations" | **Enterprise policy** (not org policy) |

---

## Exam Traps

::: warning Look out for these!
- **SAML SSO vs SCIM**: SAML SSO handles **authentication** (proving who you are). SCIM handles **provisioning** (automatically creating/updating/removing accounts). They complement each other but serve completely different purposes — don't conflate them.
- **GitHub App vs OAuth App**: GitHub Apps are **preferred**. They use scoped installation tokens (not user tokens), have more granular permissions, and are not tied to a single user account. OAuth Apps act on behalf of a user and are harder to audit.
- **GitHub App vs GitHub Action**: A GitHub App is a persistent, **installed integration** that responds to events. A GitHub Action is a **workflow step** that runs in CI/CD pipelines. They are fundamentally different constructs.
- **Team Sync vs SCIM**: Team sync mirrors **group memberships** from your IdP into GitHub teams. SCIM handles the full **user lifecycle** (provision, deprovision, attribute sync). SCIM is broader; team sync is a subset concern.
- **filter-branch vs BFG**: Both remove sensitive data from Git history. **BFG Repo Cleaner** is faster, simpler, and recommended for large repositories. `git filter-branch` is the older built-in Git approach — correct but slow.
- **Org-level vs Enterprise-level policies**: Enterprise policies **override** org-level settings. If the question asks how to enforce a rule across all organizations in an enterprise, the answer is an enterprise policy — not configuring each org individually.
- **PAT vs GitHub App for machine accounts**: The exam prefers **GitHub Apps** for machine/bot accounts — they have installable, scoped permissions, don't expire by default, and aren't tied to a specific user's account lifecycle.
:::

---

## Decision Quick Reference

### "Which GitHub product?"
```
Need cloud-hosted enterprise features → GitHub Enterprise Cloud (GHEC)
Need on-premises / self-hosted deployment → GitHub Enterprise Server (GHES)
Need full isolation with company-managed identities → GitHub AE (GHAE)
```

### "Which identity / authentication approach?"
```
Federate identity from IdP (Azure AD, Okta) → SAML SSO
Automate user creation / removal → SCIM
Sync IdP group membership to teams → Team synchronization
Lock down to company-managed accounts only → Enterprise Managed Users (EMU)
```

### "How to authenticate a machine or bot?"
```
Preferred → GitHub App (installation token, scoped, not user-tied)
Acceptable → Personal Access Token (PAT, simpler, user-tied)
Avoid → Password authentication (not supported for Git operations)
```

### "What runner should I use?"
```
Standard workloads, public internet access → GitHub-hosted runner
Custom hardware, on-prem resources, IP restrictions → Self-hosted runner
Restrict runner access by team or org → Runner groups
```

### "What should be done first?"
```
Always: Define enterprise policy, assess org structure, establish governance
Never first: Broad deployment, per-org configuration without enterprise alignment
```

### "How to address a security concern..."
```
Leaked secret in commit → Secret scanning alert + BFG to purge history
Vulnerable dependency → Dependabot alert → security update PR
Audit trail for compliance → Audit log (REST or GraphQL API)
Unauthorized app access → OAuth/GitHub App approval policy
```

---

## Final Strategy

- **Domain 5 is 36% of the exam** — invest the most prep time here: secret scanning, CodeQL, Dependabot, audit logs, token types (PAT vs GitHub App vs OAuth App), and EMU.
- **Read the permission scope carefully**: Exam questions often hinge on whether a permission is org-level vs enterprise-level, or applies to a user, team, or repository.
- **Know the "why", not just the "what"**: Understanding *why* SCIM differs from Team Sync, or *why* a GitHub App is preferred over a PAT, is more valuable than memorizing definitions alone.

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
