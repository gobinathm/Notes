---
title: "GH-500 - Domain 2: Configure and use secret scanning"
description: "GH-500 Domain 2: Enabling secret scanning, push protection, custom patterns, and managing alerts"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 2, secret scanning, push protection, custom patterns, ghas, github advanced security
---

# Domain 2: Configure and use secret scanning (10%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

::: tip Exam Tip
Know the difference between secret scanning (reactive — detects secrets already committed) and push protection (proactive — blocks secrets before commit). The exam loves asking which feature handles which scenario.
:::

---

## What Secret Scanning Does

Secret scanning automatically scans the **full repository history** (all branches, all commits) for patterns matching known secrets and credentials:

- AWS Access Keys
- GitHub Personal Access Tokens
- Stripe API Keys
- Azure Storage Account keys
- Private SSH keys
- And 200+ other partner patterns

When a match is found, GitHub creates a **secret scanning alert** and notifies repository administrators and security managers.

---

## Enabling Secret Scanning

### Repository Level
**Settings → Code security → Secret scanning → Enable**

### Organization Level
**Org Settings → Code security → GitHub Advanced Security → Secret scanning**
- Can enable for all current repositories, all future repositories, or both
- Requires GHAS license for private/internal repositories

### Enterprise Level
**Enterprise Settings → Code security → GitHub Advanced Security → Secret scanning**
- Applies a default policy across all organizations in the enterprise
- Org owners can still override at the org level (unless locked by enterprise policy)

---

## Push Protection

Push protection blocks a `git push` if the diff contains a recognized secret pattern.

### How Push Protection Works

1. Developer runs `git push`
2. GitHub scans the diff for secret patterns
3. If a secret is detected: the push **fails** with an error message naming the secret type
4. Developer must either:
   - **Remove the secret** and re-push
   - **Bypass** the block by providing a reason (if allowed by policy)

### Bypass Reasons (If Allowed)

| Reason | When to use |
|---|---|
| **Used in tests** | The secret is a fake/test credential |
| **False positive** | GitHub incorrectly identified this as a secret |
| **Fix later** | Acknowledged but not removing now (creates an alert) |

### Enabling Push Protection

- **Repository**: Settings → Code security → Push protection
- **Organization**: Org Settings → Code security → Push protection
- **Enterprise**: Enterprise policy level

::: warning Exam Trap
Push protection **does not** prevent all secret leaks. It blocks secrets at push time, but:
- It only applies to patterns GitHub recognizes
- Secrets in environment variables, CI logs, or manually pasted into chat are not caught
- Bypass is possible — the exam may ask about this as a limitation
:::

---

## Secret Scanning Patterns

### Partner Patterns
- GitHub maintains 200+ patterns in partnership with service providers (AWS, Azure, Stripe, GitHub, etc.)
- Partner patterns are automatically updated when providers submit new patterns
- When a partner pattern match is found, GitHub can **notify the service provider** (automatic revocation for some providers)

### Custom Patterns

Organizations and enterprises can define their own secret patterns using regular expressions.

**Repository-level**: Settings → Code security → Custom patterns
**Organization-level**: Org Settings → Code security → Custom patterns

Custom pattern syntax:
```
Name: Internal API Key
Pattern (regex): CORP-[A-Z0-9]{32}
Secret group: 1
Test string (optional): CORP-ABC123DEF456GHI789JKL012MNO345
```

::: tip
Custom patterns can also be configured at the enterprise level and applied across all organizations.
:::

### Validity Checking

For some partner patterns, GitHub can query the service provider's API to check if a detected token is still **active (valid)**:
- Shows alert status as: **Active**, **Inactive**, or **Unknown**
- Helps prioritize which alerts require immediate action
- Not available for all providers

---

## Managing Secret Scanning Alerts

### Alert States

| State | Meaning |
|---|---|
| **Open** | Secret is active; needs remediation |
| **Resolved — Revoked** | Secret has been revoked/deleted at the provider |
| **Resolved — False positive** | Not actually a secret |
| **Resolved — Used in tests** | Known test credential |
| **Resolved — Won't fix** | Acknowledged; accepted risk |

### Remediation Steps (Correct Order)

::: danger Always revoke first
1. **Revoke the secret** at the service provider (e.g., delete the GitHub PAT, rotate the AWS key)
2. **Remove the secret** from the codebase and commit history
3. **Audit access logs** at the provider to check for unauthorized use
4. **Resolve the alert** in GitHub with the appropriate reason
:::

### Removing Secrets from History

After revoking a secret, if it's in commit history, you must also clean it up:
- Use `git filter-repo` (recommended) or BFG Repo-Cleaner
- Force-push the cleaned history
- Contact GitHub Support to remove cached/cached views

---

## Notifications and Webhooks

- **Email notifications**: Sent to repository admins and security managers by default
- **GitHub Security tab**: Alerts visible under Security → Secret scanning
- **Webhooks**: Organizations can receive `secret_scanning_alert` webhook events for automation

---

<FlashcardDeck
  title="Domain 2 Quick Quiz"
  :cards="[
    {
      question: 'What is the key difference between secret scanning and push protection?',
      answer: '<strong>Secret scanning</strong> is reactive — it scans existing commits and alerts you when a secret is found. <strong>Push protection</strong> is proactive — it blocks the push before the secret reaches the remote repository.'
    },
    {
      question: 'A developer tries to push a commit with an AWS Access Key. Push protection is enabled. What happens?',
      answer: 'The push is <strong>rejected</strong>. GitHub shows an error identifying the secret type. The developer must remove the secret or provide a bypass reason (if permitted by policy) before the push can succeed.'
    },
    {
      question: 'What are custom patterns in secret scanning?',
      answer: 'Custom patterns let organizations define their own <strong>regex-based patterns</strong> to detect internal or proprietary secrets (like internal API keys with a custom format) that GitHub\'s default partner patterns don\'t cover.'
    },
    {
      question: 'What is the first step when a secret scanning alert is triggered?',
      answer: '<strong>Revoke the secret</strong> at the service provider first (e.g., delete the PAT, rotate the API key). Then remove it from the codebase. Revocation prevents unauthorized use even if the secret is already exposed.'
    },
    {
      question: 'What does validity checking do in secret scanning?',
      answer: 'For supported partner patterns, GitHub queries the service provider to determine if the detected secret is still <strong>active or inactive</strong>. This helps teams prioritize which alerts need immediate action.'
    }
  ]"
/>

---

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)
