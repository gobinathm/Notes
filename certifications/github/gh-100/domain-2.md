---
title: "GH-100 - Domain 2: Manage User Identities & Authentication"
description: "GH-100 Domain 2: SAML SSO, SCIM, 2FA, Team Sync, and identity providers"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 2, saml sso, scim, 2fa, team synchronization, identity provider, github authentication
---

# Domain 2: Manage User Identities and GitHub Authentication (11%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

::: tip Exam Tip
This domain is about **who gets in** and **how they're managed**. SAML handles authentication (the door). SCIM handles provisioning (managing the guest list). They are separate systems that work together.
:::

---

## SAML Single Sign-On (SSO)

SAML SSO lets your organization use an external Identity Provider (IdP) — like Azure AD or Okta — to authenticate GitHub users instead of relying on GitHub usernames and passwords.

### How It Works
1. User navigates to a GitHub resource (org, repo, etc.)
2. GitHub redirects to the IdP for authentication
3. IdP verifies credentials and returns a SAML assertion
4. GitHub grants access based on the assertion

### Enabling SAML SSO: Org vs Enterprise

| Scope | Where to Configure | Effect |
|---|---|---|
| **Single Organization** | Organization Settings → Authentication security | Applies to that org only |
| **Enterprise Account** | Enterprise Settings → Authentication security | Applies to all orgs in the enterprise |

::: warning Trap
Enabling SAML SSO at the enterprise level means **all organizations** in the enterprise are affected. Enabling it per-org means each org must be configured individually. The exam often asks which scope to use for consistent enforcement — the answer is **enterprise-level**.
:::

### Enforcing SAML SSO

- **Enabled (not enforced)**: Users can still access GitHub without SSO. SSO is optional but encouraged.
- **Enforced**: Users *must* authenticate via the IdP to access org resources. Non-compliant sessions are revoked.

When SAML SSO is enforced:
- Existing PATs and SSH keys must be authorized against the SSO session
- Users who haven't authenticated via SSO lose access to the org

---

## Two-Factor Authentication (2FA)

Admins can **require 2FA** for all members of an organization.

- Navigate to **Organization Settings → Authentication security → Require two-factor authentication**.
- When enabled, any member without 2FA configured is **removed from the org** immediately.
- Applies to all member roles (members, owners, billing managers) — outside collaborators are also affected.

::: danger Critical
Requiring 2FA is an immediate action — members without it are removed the moment the setting is applied. Always communicate to members in advance.
:::

---

## Choosing an Identity Provider

GitHub supports standard SAML 2.0 providers. Commonly tested providers:

| Provider | Notes |
|---|---|
| **Azure Active Directory (Azure AD)** | Most common in enterprise; supports SAML SSO and SCIM |
| **Okta** | Popular IdP; supported for both SAML and SCIM |
| **OneLogin** | Supported for SAML |
| **Custom / Self-created** | Supported if it implements the SAML 2.0 and SCIM 2.0 specs |

---

## Authentication and Authorization Model

Understanding **how** users get into GitHub and **what** they can access is a foundational concept.

- **Authentication** ("who are you?"): Handled by GitHub login, SAML SSO, or 2FA.
- **Authorization** ("what can you access?"): Controlled by org membership, team membership, and repository permissions.

Users in a GitHub enterprise context exist at multiple levels:
- **GitHub.com account**: The user's personal GitHub identity
- **Enterprise membership**: User is part of the enterprise
- **Organization membership**: User is a member of one or more orgs within the enterprise
- **Team membership**: User belongs to specific teams within an org

Access is cumulative — a user's effective permissions come from their role at each level.

---

## SCIM (System for Cross-domain Identity Management)

SCIM automates the **provisioning and deprovisioning** of GitHub accounts based on your IdP.

### How SCIM Works with GitHub

1. Admin configures SCIM in the IdP (e.g., Azure AD app provisioning)
2. IdP pushes user/group changes to GitHub via the SCIM API
3. GitHub creates, updates, or suspends accounts accordingly

### Supported SCIM Providers
- **Azure Active Directory**
- **Okta**
- **OneLogin**
- **Self-created** (any IdP that implements SCIM 2.0)

### Key SCIM Behaviors
- When a user is **deprovisioned** (removed from IdP), SCIM suspends their GitHub account automatically
- SCIM can sync attributes (name, email, username) between the IdP and GitHub
- SCIM is required for **Enterprise Managed Users (EMU)** — EMU can't work without it

---

## Team Synchronization

Team synchronization mirrors **IdP group membership** into GitHub teams automatically.

- When a user is added to or removed from an IdP group, the corresponding GitHub team membership updates automatically.
- Eliminates the need to manually manage team membership in GitHub.
- Supports **Azure AD** and **Okta** for group sync.

### Configuring Team Sync
1. Enable SAML SSO first (team sync requires SAML)
2. In the organization, connect to the IdP
3. Map IdP groups to GitHub teams

---

## Team Sync vs SCIM

This is a **critical exam distinction**:

| | Team Synchronization | SCIM |
|---|---|---|
| **Purpose** | Sync IdP group membership to GitHub teams | Automate full user lifecycle (create, update, suspend) |
| **Scope** | Team membership only | User accounts and attributes |
| **Trigger** | Group membership change in IdP | Any user change in IdP (add, modify, remove) |
| **Dependency** | Requires SAML SSO | Works with or without SAML SSO (but SAML is common) |
| **Who creates accounts** | Accounts must already exist on GitHub | SCIM creates accounts automatically |

::: warning Trap
Team sync does **not** create GitHub accounts — users must already exist. SCIM is what provisions (creates) new accounts. Use both together for full automation.
:::

<FlashcardDeck
  title="Domain 2 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between SAML SSO and SCIM?',
      answer: '<strong>SAML SSO</strong>: handles authentication (how users log in). <strong>SCIM</strong>: handles provisioning (automatically creating, updating, and removing accounts).'
    },
    {
      question: 'What happens when you enforce SAML SSO in an org?',
      answer: 'Members <strong>must</strong> authenticate via the IdP. Existing PATs and SSH keys must be authorized against the SSO session or they stop working.'
    },
    {
      question: 'What happens to org members who don\'t have 2FA when you require it?',
      answer: 'They are <strong>immediately removed</strong> from the organization.'
    },
    {
      question: 'What does team synchronization require as a prerequisite?',
      answer: '<strong>SAML SSO</strong> must be enabled first before team sync can be configured.'
    },
    {
      question: 'Does team sync create new GitHub accounts for users?',
      answer: '<strong>No.</strong> Team sync only mirrors group membership. Users must already have GitHub accounts. Use SCIM to provision accounts automatically.'
    },
    {
      question: 'Which SCIM providers does GitHub natively support?',
      answer: '<strong>Azure Active Directory</strong>, <strong>Okta</strong>, <strong>OneLogin</strong>, and any self-created IdP implementing the SCIM 2.0 spec.'
    }
  ]"
/>

---

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)
