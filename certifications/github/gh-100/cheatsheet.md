---
title: "GH-100 - Cheatsheet"
description: "One-page exam day reference for GH-100 GitHub Administration"
head:
  - - meta
    - name: keywords
      content: gh-100, github administration, cheatsheet, quick reference, exam
---

# GH-100: Cheatsheet

[← Overview](./index.md) · [← Admin Playbook](./admin-playbook.md) · [← Concept Map](./concept-map.md) · [← Tools Reference](./tools-reference.md) · [← Exam Guide](./exam-guide.md)

::: danger Exam Day Reference
Review this page 5 minutes before the exam.
:::

---

## Admin Core Principles (SLG)

- **S**ecurity — Default to the more secure option
- **L**east Privilege — Grant minimum permissions needed
- **G**overnance — Define policies before deploying

---

## GitHub Products at a Glance

| Need | Product |
|---|---|
| Cloud-hosted enterprise | **GitHub Enterprise Cloud (GHEC)** |
| On-premises / self-hosted | **GitHub Enterprise Server (GHES)** |
| Isolated managed instance | **GitHub AE (GHAE)** |
| Company-controlled identities | **Enterprise Managed Users (EMU)** |

---

## Identity & Authentication (SAML vs SCIM vs Team Sync)

| Tool | Purpose |
|---|---|
| **SAML SSO** | Authentication — how users log in via IdP |
| **SCIM** | Provisioning — create/update/remove accounts automatically |
| **Team Sync** | Mirror IdP group membership into GitHub teams |
| **2FA** | Require 2-factor for all org members |
| **EMU** | Lock all identities to company-managed accounts |

**Rule:** SAML = door. SCIM = guest list. Team Sync = seating chart.

---

## Permission Levels (Least → Most)

**Repository roles**: Read → Triage → Write → Maintain → Admin

**Org roles**: Member → Owner (Billing Manager = billing-only, no code)

**Outside Collaborator**: Repo-specific only, no seat license consumed.

---

## Security Feature Lookup

| Feature | What it does |
|---|---|
| **Secret scanning** | Detects leaked credentials *after* commit |
| **Push protection** | Blocks secrets *before* they enter the repo |
| **CodeQL** | Scans source code for vulnerability patterns |
| **Dependabot Alerts** | Notifies on vulnerable dependencies |
| **Dependabot Security Updates** | Opens a fix PR automatically |
| **Audit Log API** | Records all actions (REST + GraphQL) |
| **BFG Repo Cleaner** | Removes secrets from Git history (recommended) |
| **filter-branch** | Git-native history rewrite (slower, legacy) |
| **Deploy Key** | Repo-scoped SSH key for server/CI access |
| **Environment** | Deployment-scoped approvals, secrets, and branch controls |
| **OIDC** | Short-lived cloud auth without storing long-lived cloud secrets |

---

## Token Types

| Token | Tied to | Expiry | Best for |
|---|---|---|---|
| **PAT (classic)** | User | Never (optional) | Personal CLI/scripts |
| **Fine-grained PAT** | User | Required (≤1 yr) | Scoped personal access |
| **GitHub App token** | App installation | 1 hour | Machine accounts, bots |
| **OAuth Token** | User (delegated) | Until revoked | User-facing apps |
| **Deploy Key** | Repo | Never | Single-repo server access |

**Prefer GitHub Apps over PATs for machine/bot accounts.**

---

## Runners Quick Reference

| | GitHub-Hosted | Self-Hosted |
|---|---|---|
| **Managed by** | GitHub | You |
| **Private network access** | No | Yes |
| **IP allow-listing** | Not reliable (dynamic IPs) | Yes (static IPs) |
| **Cost** | Per-minute | Infrastructure only |
| **Public repo risk** | Safe | **Never use** on public repos |

**Runner groups** = control which orgs/repos can use specific runners.

---

## Quick Decision Rules

**Need to enforce a rule across ALL orgs?**
→ Enterprise policy (overrides org settings)

**Bot/machine account authenticating to GitHub?**
→ GitHub App (preferred) over PAT

**Need to access on-prem resources in CI?**
→ Self-hosted runner

**Need approval gates or protected production secrets?**
→ GitHub Environment

**Need cloud authentication without storing long-lived credentials?**
→ OIDC federation

**Secret committed to history?**
→ Revoke first → BFG to purge → GitHub Support if public

**User should only access one specific repo?**
→ Outside collaborator (not org member)

**Need to block a secret before it's pushed?**
→ Push protection (not just secret scanning)

**Enterprise needs all user accounts company-managed?**
→ Enterprise Managed Users (EMU)

**Reuse CI logic across repos?**
→ Reusable workflows (stored in shared-workflows repo)

---

## Terminology Check

- **SAML SSO**: Federates login to an external IdP. Does not provision accounts.
- **SCIM**: Automates user provisioning/deprovisioning. Works alongside SAML.
- **EMU**: GitHub users that are fully owned/managed by the enterprise. No personal GitHub accounts.
- **GHES**: Self-hosted GitHub — you manage the server, upgrades, and backups.
- **GHEC**: GitHub-hosted enterprise — managed by GitHub, SAML/SCIM supported.
- **CodeQL**: GitHub's static analysis engine. Treats code as a database of queryable facts.
- **BFG**: BFG Repo Cleaner — the recommended tool for purging sensitive data from Git history.
- **Runner group**: Access control layer for self-hosted runners — restricts which orgs/repos can use them.
- **Reusable workflow**: A `workflow_call`-triggered workflow callable from other workflows to share CI logic.
- **Deploy Key**: An SSH key scoped to a single repository. Preferred for read-only server access.
- **Environment**: A deployment target with its own protection rules, secrets, and branch restrictions.
- **OIDC**: OpenID Connect federation for getting short-lived cloud credentials in Actions without storing static secrets.

---

[← Overview](./index.md) · [← Exam Guide](./exam-guide.md)
