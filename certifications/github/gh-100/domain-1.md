---
title: "GH-100 - Domain 1: Support GitHub Enterprise"
description: "GH-100 Domain 1: Supporting GitHub Enterprise for users and key stakeholders"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 1, github enterprise, support, marketplace, github apps, github actions, ci/cd
---

# Domain 1: Support GitHub Enterprise for Users and Key Stakeholders (9%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

::: tip Exam Tip
Domain 1 tests your ability to **advise** on workflows, tools, and best practices — not just configure them. Think like a GitHub platform owner recommending the right approach for development teams within an enterprise.
:::

---

## Admin vs GitHub Support Boundaries

As a GitHub administrator, you handle configuration, access, and day-to-day management. But some issues require escalation to GitHub Support.

| Admin Handles | GitHub Support Handles |
|---|---|
| User access, org permissions | Billing disputes |
| Repository configuration | Platform outages |
| Branch protection rules | Data recovery (deleted repos) |
| Actions runner setup | License and seat management |
| SAML/SCIM configuration | Security incidents (account compromise) |

**Support Bundles & Diagnostics** (GHES-specific):
- A **support bundle** packages logs, configuration, and diagnostics from your GHES instance into a single archive to send to GitHub Support.
- Generated via the **Management Console** or the `ghe-support-bundle` CLI command.
- Helps GitHub Support diagnose performance, authentication, and integration issues.

---

## Developer Workflow Standards

A key admin responsibility is recommending and standardizing how development teams collaborate on GitHub.

### Fork-and-Pull vs Branching

| Model | Best For | How It Works |
|-------|----------|--------------|
| **Branching** | Internal teams, private repos | Developers create branches directly in the repo |
| **Fork-and-Pull** | Open source, external contributors | Contributors fork the repo, make changes, then open a PR |

::: tip Exam Tip
For enterprise internal teams, **branching** is the standard. Fork-and-pull is preferred for open source or when you want to keep contributor access minimal.
:::

### Branch Protection Rules

Admins can enforce guardrails on important branches (e.g., `main`, `release`):

- **Require pull request reviews** — at least N approvals before merging
- **Require status checks** — CI must pass before merge
- **Require signed commits** — enforce GPG/SSH commit signing
- **Restrict who can push** — limit force-pushes and branch deletion
- **Require linear history** — prevent merge commits, enforce rebase/squash

### Code Owners

- A `CODEOWNERS` file in the repo defines which teams or users own specific paths.
- Code owners are **automatically requested for review** when a PR touches their files.
- Helps enforce domain expertise review at scale in large monorepos.

### Release Strategy

Typical enterprise release strategies supported by GitHub:
- **Tags & Releases**: Semantic versioning (`v1.2.3`) via GitHub Releases
- **GitHub Environments**: Deployment environments with protection rules (required reviewers, wait timers)
- **Protected branches**: Prevent direct commits to release branches

---

## GitHub APIs for Admin Tasks

GitHub exposes powerful APIs for extending admin capabilities beyond the UI.

### Audit Log API
- Available via **REST** (`GET /orgs/{org}/audit-log`) and **GraphQL** (`auditLog` field on `Organization`).
- Query who performed what action, when, and from what IP.
- Stream audit events to a SIEM (Splunk, Datadog) for continuous monitoring.
- Useful for compliance reporting: who deleted a repo, who changed a branch protection rule, etc.

### Common Admin Use Cases for APIs
- Export audit logs to external storage
- Query repository activity and usage statistics
- Automate team and membership management
- List installed GitHub Apps and OAuth Apps across orgs

---

## GitHub Marketplace: Apps and Actions

The GitHub Marketplace lets teams discover and install integrations without building them from scratch.

### GitHub App vs GitHub Action

| | GitHub App | GitHub Action |
|---|---|---|
| **What it is** | An installed integration that runs externally | A workflow step that runs inside GitHub Actions |
| **Trigger** | Responds to webhooks/events (persistent) | Triggered by workflow events (on demand) |
| **Permissions** | Repository, organization, account permissions | Defined in the workflow YAML |
| **Distribution** | Installed per org or repo | Referenced in `uses:` in a workflow |
| **Best for** | Bots, code review automation, CI orchestrators | Build steps, test runners, deployment scripts |

::: warning Trap
A GitHub App and a GitHub Action are fundamentally different. A CI/CD tool like Azure Pipelines is a **GitHub App** installed from the Marketplace. A deployment step like `actions/checkout` is a **GitHub Action** referenced in a workflow.
:::

### Benefits and Risks of Marketplace Apps and Actions

**Benefits:**
- Accelerates adoption of best practices (code scanning, notifications, deployment)
- Reduces build-from-scratch effort for common integrations

**Risks:**
- Third-party apps may request excessive permissions — always review scope before installing
- Actions from unverified publishers can introduce supply chain risks
- Pinning actions to a specific commit SHA (`@abc1234`) mitigates version tampering

---

## CI/CD Strategy at the Enterprise

Admins help define how the enterprise approaches CI/CD, balancing standardization with team autonomy.

- **Standardize on GitHub Actions**: Leverage reusable workflows to enforce shared pipelines across teams (testing, security scanning, deployment).
- **Self-hosted runners**: Required when workloads need on-premises infrastructure, private network access, or custom hardware.
- **GitHub Environments**: Use deployment environments to enforce approval gates before production releases.
- **Tooling ecosystem**: GitHub can coexist with external CI tools (Jenkins, Azure Pipelines, CircleCI) via the GitHub App model.

<FlashcardDeck
  title="Domain 1 Quick Quiz"
  :cards="[
    {
      question: 'What is a GitHub support bundle?',
      answer: 'A packaged archive of logs, diagnostics, and configuration from a GHES instance — sent to GitHub Support for troubleshooting.'
    },
    {
      question: 'When should you use fork-and-pull vs branching?',
      answer: '<strong>Branching</strong>: internal teams with direct repo access. <strong>Fork-and-pull</strong>: open source or external contributors with minimal access.'
    },
    {
      question: 'What is the difference between a GitHub App and a GitHub Action?',
      answer: 'A <strong>GitHub App</strong> is a persistent, installed integration that responds to webhooks. A <strong>GitHub Action</strong> is a workflow step referenced inside a CI/CD pipeline YAML.'
    },
    {
      question: 'What API endpoint streams audit events for compliance?',
      answer: 'The <strong>Audit Log API</strong> — available via REST (<code>GET /orgs/{org}/audit-log</code>) and GraphQL (<code>auditLog</code> on the Organization object).'
    },
    {
      question: 'What is a CODEOWNERS file used for?',
      answer: 'Defines which teams or individuals own specific paths in a repo, automatically requesting their review when a PR touches those files.'
    }
  ]"
/>

---

[← Overview](./index.md) · [Next Domain →](./domain-2.md)
