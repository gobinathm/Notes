---
title: "GH-900 - Domain 6: Privacy, Security, and Administration"
description: "GH-900 Domain 6: Authentication, branch protection, secret scanning, Dependabot, organizations, teams, and permissions."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 6, security, authentication, 2fa, sso, branch protection, secret scanning, dependabot, codeowners, organizations, teams, permissions
---

# Domain 6: Privacy, Security, and Administration (10%)

[← Domain 5](./domain-5.md) · [Domain 7 →](./domain-7.md)

---

## Authentication

### Two-Factor Authentication (2FA)

2FA adds a second layer of security beyond a password. GitHub supports:
- **TOTP apps** (Authenticator apps like Google Authenticator, Authy)
- **SMS** (less secure, not recommended)
- **Security keys** (hardware keys, WebAuthn — most secure)
- **GitHub Mobile** (push notification approval)

::: warning Important
Organization admins can **require 2FA** for all members. Members who don't enable it are removed from the org.
:::

### Personal Access Tokens (PATs)

PATs replace passwords for API and Git authentication:

| Token Type | Scope |
|-----------|-------|
| **Classic PAT** | Broad permissions, single token |
| **Fine-grained PAT** | Per-repo, per-permission control |

::: tip Best Practice
Use fine-grained PATs — they follow the principle of least privilege. Classic PATs are being deprecated for org use.
:::

### SSH Keys

SSH keys allow passwordless Git authentication:
```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Add public key to GitHub Settings → SSH and GPG keys
```

### SAML SSO

Organizations on GitHub Enterprise Cloud can require **SAML Single Sign-On** — members authenticate through an identity provider (Okta, Azure AD, etc.) before accessing org resources.

---

## Branch Protection Rules

**Branch protection rules** enforce code quality gates on specific branches (typically `main`).

### Available Protections

| Rule | Effect |
|------|--------|
| **Require pull request reviews** | PR must be approved before merge |
| **Required approvals** | Minimum number of approvals (e.g., 2) |
| **Dismiss stale reviews** | New commits re-require approval |
| **Require status checks** | CI must pass before merge |
| **Require signed commits** | All commits must be GPG/SSH signed |
| **Require linear history** | No merge commits — squash or rebase only |
| **Include administrators** | Rules apply to repo admins too |
| **Restrict who can push** | Limit direct pushes to specific users/teams |
| **Require conversation resolution** | All review comments must be resolved |

::: tip Exam Tip
Branch protection rules are set per branch (or branch pattern with wildcards like `release/*`). They're configured under **Settings → Branches**.
:::

### Rulesets (newer approach)

**Rulesets** are a more flexible alternative to branch protection rules:
- Can apply to **multiple branches** at once with patterns
- Can be enforced at **organization level** across all repos
- Support "Evaluate" mode for testing before enforcing

---

## Security Features

### Secret Scanning

**Secret scanning** automatically detects accidentally committed secrets (API keys, tokens, passwords):

| Tier | Behavior |
|------|----------|
| **Default (public repos)** | Scans pushed commits, alerts the token provider |
| **Secret scanning alerts (private)** | Org/repo admins see alerts in the Security tab |
| **Push protection** | Blocks the push if a secret is detected (before it lands in history) |

::: warning Push Protection
With push protection enabled, GitHub blocks the `git push` if it detects a secret — preventing it from ever entering the commit history.
:::

### Dependabot

**Dependabot** automates dependency security:

| Feature | What it does |
|---------|-------------|
| **Dependabot alerts** | Notifies you when a dependency has a known vulnerability (CVE) |
| **Dependabot security updates** | Automatically opens PRs to update vulnerable dependencies |
| **Dependabot version updates** | Automatically opens PRs to keep dependencies up-to-date |

Configured via `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Code Scanning (GHAS)

**Code scanning** uses CodeQL or third-party tools to find security vulnerabilities in code. Available on:
- Public repos (free)
- Private repos with GitHub Advanced Security (GHAS)

---

## Organizations, Teams, and Permissions

### Organization Structure

```
Organization
├── Teams
│   ├── Team A (members + repos)
│   └── Team B (members + repos)
├── Repositories
└── Members (roles)
```

### Organization Roles

| Role | Capabilities |
|------|-------------|
| **Owner** | Full admin access to org and all repos |
| **Member** | Access to repos based on team membership |
| **Outside Collaborator** | Access to specific repos only, not org member |
| **Billing Manager** | Manage billing only |

### Repository Permission Levels

| Level | Can do |
|-------|--------|
| **Read** | View and clone repo |
| **Triage** | Manage issues and PRs (no code push) |
| **Write** | Push to branches, manage issues/PRs |
| **Maintain** | Manage repo settings (no destructive actions) |
| **Admin** | Full control, including destructive actions |

::: tip Exam Tip
Teams grant repository access at a permission level. Org members inherit the **base permission** level set by the org admin. Individual permissions can override team permissions (highest wins).
:::

### Teams

Teams group org members and can be:
- **Visible** — all org members can see the team and @mention it
- **Secret** — only team members and org owners can see it

Teams can be **nested** (parent/child hierarchy) and support `@org/team-name` mentions.

---

<FlashcardDeck
  title="Domain 6: Security and Administration"
  storage-key="gh-900-domain-6-cards"
  :cards="[
    {
      question: 'What does branch protection rule \"Require status checks\" do?',
      answer: 'Prevents merging a PR until specified CI checks (e.g., GitHub Actions workflows) have passed.'
    },
    {
      question: 'What is the difference between Dependabot alerts and Dependabot security updates?',
      answer: '<strong>Alerts</strong>: notifies you of a vulnerable dependency. <strong>Security updates</strong>: automatically opens a PR to fix it.'
    },
    {
      question: 'What does secret scanning push protection do?',
      answer: 'Blocks a git push before it reaches GitHub if a secret (API key, token) is detected — preventing it from entering the commit history.'
    },
    {
      question: 'What is the difference between a fine-grained PAT and a classic PAT?',
      answer: '<strong>Fine-grained PAT</strong>: scoped to specific repos and permissions. <strong>Classic PAT</strong>: broad permissions across all repos. Fine-grained is recommended.'
    },
    {
      question: 'What are the 5 repository permission levels?',
      answer: '<strong>Read</strong>, <strong>Triage</strong>, <strong>Write</strong>, <strong>Maintain</strong>, <strong>Admin</strong> — in increasing order of access.'
    },
    {
      question: 'What is an Outside Collaborator in a GitHub organization?',
      answer: 'A person with access to specific repos but who is NOT an org member. They do not inherit org-wide permissions or base permissions.'
    },
    {
      question: 'What is SAML SSO used for in GitHub?',
      answer: 'Allows GitHub Enterprise Cloud orgs to require members to authenticate via an identity provider (like Okta or Azure AD) before accessing org resources.'
    }
  ]"
/>

---

[← Domain 5](./domain-5.md) · [Domain 7 →](./domain-7.md)
