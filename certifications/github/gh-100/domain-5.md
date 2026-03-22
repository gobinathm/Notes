---
title: "GH-100 - Domain 5: Secure Software Development & Compliance"
description: "GH-100 Domain 5: Secret scanning, CodeQL, Dependabot, audit logs, access tokens, EMU, and security policies"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 5, secret scanning, code scanning, codeql, dependabot, audit log, emu, enterprise managed users, github apps, access tokens
---

# Domain 5: Enable Secure Software Development and Ensure Compliance (36%)

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)

::: danger Domain 5 = 36% of the Exam
This is the highest-weighted domain. Master every section here before moving to others. Expect questions covering secret scanning, CodeQL, Dependabot, audit logs, token types, GitHub Apps, OAuth Apps, and Enterprise Managed Users.
:::

---

## GitHub's Security Posture for the Enterprise

GitHub provides a layered security model. Admins are responsible for enabling, configuring, and enforcing these layers.

### Security Policy in a Repository

- A **security policy** (`SECURITY.md`) tells users how to **responsibly disclose** vulnerabilities in a project.
- Located in the repo root, `.github/`, or the org's default community health files.
- GitHub surfaces the security policy on the repo's **Security** tab.

---

## Dependency Security

### The Dependency Graph

- GitHub automatically parses package manifests (e.g., `package.json`, `Gemfile`, `pom.xml`) to build a **dependency graph**.
- Shows all direct and transitive dependencies for a repository.
- Powers Dependabot alerts — must be enabled for Dependabot to function.

### Dependabot

Dependabot monitors your dependency graph for known vulnerabilities and helps you fix them.

| Feature | What it does |
|---|---|
| **Dependabot Alerts** | Notifies you when a dependency has a known CVE (via the GitHub Advisory Database) |
| **Dependabot Security Updates** | Automatically opens a PR to update the vulnerable dependency to a safe version |
| **Dependabot Version Updates** | Keeps dependencies up to date regardless of CVEs (optional, scheduled) |

### Enabling Dependabot

1. Enable the **Dependency graph** (org or repo level)
2. Enable **Dependabot alerts** (org settings or repo security settings)
3. Optionally enable **Dependabot security updates** (auto-PRs)

::: tip Exam Tip
Dependabot **alerts** notify you. Dependabot **security updates** actually open a fix PR. Know the difference — many questions ask about which one to enable for a specific outcome.
:::

### Vulnerable Dependency Response Plan

1. **Detect**: Dependabot alert fires for a CVE in a dependency
2. **Assess**: Review the alert — is the vulnerable code path actually used?
3. **Remediate**: Merge the Dependabot security update PR or pin to a safe version
4. **Verify**: CI passes, no regressions
5. **Monitor**: Keep Dependabot enabled for future alerts

---

## Code Scanning and CodeQL

### Code Scanning

Code scanning analyzes source code for vulnerabilities and coding errors **before** they reach production.

- Implemented via GitHub Actions (or third-party SARIF tools)
- Results appear in the **Security** tab → **Code scanning alerts**
- Alerts include the vulnerable line, severity, and remediation guidance

### CodeQL

**CodeQL** is GitHub's static analysis engine for code scanning.

- Treats code as data — writes queries to find patterns that represent vulnerabilities (e.g., SQL injection, XSS, path traversal)
- Maintained by GitHub; updated regularly with new vulnerability patterns
- Supports: C, C++, C#, Go, Java, JavaScript, Python, Ruby, Swift

### Setting Up CodeQL

```yaml
# .github/workflows/codeql.yml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript, python

- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v3
```

- Run on `push`, `pull_request`, and/or a scheduled `cron`
- Results are uploaded to the **Security** tab automatically

::: warning Trap
Code scanning (CodeQL) analyzes **source code**. Secret scanning scans for **credentials and tokens**. They are different tools solving different problems.
:::

---

## Secret Scanning

Secret scanning detects **credentials, API keys, and tokens** that have been committed to a repository.

### How It Works

- GitHub maintains a database of known secret patterns (AWS keys, GitHub tokens, Stripe keys, etc.)
- Scans all commits pushed to the repo
- Alerts are shown in the **Security** tab → **Secret scanning alerts**
- For **partner patterns** (e.g., AWS, Stripe): GitHub automatically notifies the secret issuer, who can revoke the token

### Push Protection

- **Push protection** blocks a push if it contains a detected secret, *before* it lands in the repo
- Users can bypass push protection with a justification, which is logged
- Enabled in: Organization Settings → Code security and analysis → Push protection

::: danger Critical
Push protection prevents secrets from ever entering the repo. Secret scanning alerts notify you *after* a secret is already committed. Enable **both** for maximum protection.
:::

---

## Scrubbing Sensitive Data from Git History

If a secret is already in the repo's commit history, it must be removed:

### BFG Repo Cleaner (Recommended)

- Fast, purpose-built tool for removing large files or sensitive strings from Git history
- Simpler syntax than `filter-branch`
- Command: `bfg --replace-text passwords.txt my-repo.git`
- After BFG: force-push cleaned history, all collaborators must re-clone

### `git filter-branch` (Legacy)

- Built into Git — no additional tool needed
- Slower on large repos; complex syntax
- Still valid and accepted by GitHub Support, but BFG is preferred

### Scrubbing via GitHub Support

If a secret was pushed to a **public** repo and indexed by search engines or cached, removing it from history is not enough. Steps:
1. Revoke/rotate the secret immediately
2. Remove it from history (BFG)
3. Contact **GitHub Support** to purge cached views and force-crawlers to update

::: warning Trap
Removing a secret from Git history does **not** mean it's safe — it may have been cached, logged, or used. Always **revoke the credential first**, then clean the history.
:::

---

## Audit Log APIs

The audit log records all significant actions taken within an org or enterprise — who did what, when, and from where.

### Use Cases
- Compliance reporting (SOC 2, ISO 27001)
- Forensic investigation (who deleted a repo, who changed branch protections)
- Streaming events to a SIEM (Splunk, Datadog, Elastic)

### REST API

```
GET /orgs/{org}/audit-log
GET /enterprises/{enterprise}/audit-log
```

- Filter by action type: `?phrase=action:repo.delete`
- Filter by user: `?phrase=actor:username`
- Paginated results, supports streaming

### GraphQL API

```graphql
{
  organization(login: "my-org") {
    auditLog(first: 100) {
      edges {
        node {
          ... on RepoDeleteAuditEntry {
            action
            actor { login }
            createdAt
            repositoryName
          }
        }
      }
    }
  }
}
```

::: tip Exam Tip
Use **REST** for simple filtered queries and streaming. Use **GraphQL** when you need to shape the response or join multiple entity types in one request.
:::

### Audit Log Retention & Streaming

| Parameter | Value | Notes |
|---|---|---|
| **Org audit log retention** | **180 days** | Default on GitHub.com (GHEC). After 180 days, events are purged |
| **Stream pause buffer** | **7 days** | If a stream is paused for ≤ 7 days, it resumes from where it left off |
| **Stream data loss threshold** | **3+ weeks** | If paused for 3+ weeks, the stream restarts fresh — older events are lost |
| **Stream health check** | **Every 24 hours** | GitHub runs an automated health check on your audit log stream daily |

::: warning Trap
If an audit log stream goes offline for more than **7 days**, you lose events from the gap. If it's offline for **3+ weeks**, the stream restarts entirely. Always monitor stream health and set up alerts for stream failures.
:::

### Actions Artifact & Log Retention

| Parameter | Default | Maximum |
|---|---|---|
| **Artifact retention** | **90 days** | 400 days (private repos only) |
| **Workflow run logs** | **90 days** | 400 days (private repos only) |

::: tip Exam Tip
Retention can be adjusted at repo or org level via Settings → Actions → General. The 400-day maximum only applies to **private** repos — public repos are fixed at 90 days.
:::

---

## Access Tokens

GitHub supports multiple token types. The exam tests your knowledge of when and why to use each.

### Token Types

| Token | Scope | Expiration | Best For |
|---|---|---|---|
| **Personal Access Token (PAT)** | User-scoped | Optional (classic PATs don't expire; fine-grained PATs do) | Personal automation, CLI access |
| **Fine-grained PAT** | Specific repo and permission scope | Required (max 1 year) | Scoped personal access with expiry |
| **GitHub App Installation Token** | App-scoped permissions | 1 hour | Machine accounts, CI/CD integrations |
| **OAuth Token** | User-delegated (OAuth flow) | Until revoked | Apps acting on behalf of users |
| **Device Token** | OAuth device flow | Until revoked | CLI/headless OAuth |
| **Refresh Token** | Renews OAuth tokens | Longer-lived | Maintaining OAuth sessions |

### Rate Limits by Token Type

- **PAT / OAuth Token**: 5,000 requests/hour per user
- **GitHub App Installation Token**: 5,000 requests/hour per installation + 15,000 requests/hour at enterprise level
- **Unauthenticated**: 60 requests/hour

### PAT Policies and Approval Controls

Organizations can place guardrails around PAT usage:

- Require approval for **fine-grained PATs** before they can access organization resources
- Restrict or block **classic PAT** access to org-owned resources
- Use shorter lifetimes for user-scoped credentials where policy allows

::: warning Trap
Fine-grained PATs are safer than classic PATs, but for machine identity the exam still prefers **GitHub Apps** over either PAT model.
:::

---

## GitHub Apps vs OAuth Apps

### GitHub Apps (Preferred)

- Installed on an org or repo (not tied to a specific user)
- Uses **installation tokens** — short-lived (1 hour), scoped to specific permissions
- Can subscribe to webhooks and respond to events
- Granular permissions: repository permissions, org permissions, account permissions
- If the installing user leaves, the app keeps working

### OAuth Apps

- Acts **on behalf of a user** (uses the user's identity)
- Broader permission scopes (less granular)
- If the user's account is suspended or deleted, the app loses access
- Better for user-facing integrations (social login, user dashboards)

### GitHub App vs OAuth App Comparison

| | GitHub App | OAuth App |
|---|---|---|
| **Identity** | App identity (installation) | User identity |
| **Token** | Installation token (1 hr) | OAuth token (longer-lived) |
| **Permission scope** | Fine-grained (repo, org, account) | Broader (read/write on user resources) |
| **Webhook support** | Built-in | No |
| **Best for** | CI/CD bots, integrations, automation | User-facing apps, social login |
| **Resilience** | Survives user leaving | Breaks if user is removed |

::: warning Trap
For machine accounts and bots, always recommend **GitHub Apps** over OAuth Apps or PATs. GitHub Apps are more secure, more auditable, and don't break when a specific user's account is modified.
:::

### Approving and Denying Apps

Enterprise admins can control which GitHub Apps and OAuth Apps are allowed in the org:
- **Organization Settings → GitHub Apps → Allowed apps**
- **Organization Settings → OAuth app access policy**
- Can restrict to: admin-approved apps only, or allow all

---

## Machine Accounts vs GitHub Apps

| | Machine Account (Bot User) | GitHub App |
|---|---|---|
| **What it is** | A real GitHub user account used for automation | A proper API integration (not a user) |
| **License seat** | Consumes a seat | Does not consume a seat |
| **Token type** | PAT | Installation token |
| **Auditability** | Appears as user in audit logs | Appears as app in audit logs |
| **Preference** | Legacy approach | **Preferred** by GitHub |

---

## Enterprise Managed Users (EMU)

EMU is a GitHub Enterprise feature where **user accounts are fully managed by the enterprise**.

### Key Characteristics
- Users cannot create or use personal GitHub.com accounts — all identities are provisioned by the enterprise via SCIM
- EMU accounts can **only access** resources within the enterprise (no public repos, no external forks)
- Usernames are controlled by the enterprise IdP
- Requires GHEC or GHAE (not supported on GHES)

### When to Use EMU
- Organization requires full control over user identities
- Users must not have any access to public GitHub repos
- Compliance requires all access to be company-managed

::: tip Exam Tip
EMU is the most restrictive identity model. If a question mentions "users should not have personal GitHub accounts" or "all access must be company-managed," the answer is **Enterprise Managed Users**.
:::

---

## SSH Keys and Deploy Keys

### SSH Keys
- Users add SSH keys to their GitHub account for Git authentication (`git clone git@github.com:...`)
- Scoped to the user's account — gives the same access the user has

### Deploy Keys

- SSH keys added directly to a **specific repository** (not a user account)
- Used by CI/CD systems, servers, or scripts that need access to one repo
- Can be **read-only** or **read-write**
- More secure than a PAT or user SSH key because they're repo-scoped

::: tip Exam Tip
Use a **Deploy Key** (read-only) when a server or script needs to clone a single private repo. Use a **GitHub App** when the automation needs to interact with multiple repos or APIs.
:::

<FlashcardDeck
  title="Domain 5 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between secret scanning and push protection?',
      answer: '<strong>Secret scanning</strong> detects secrets <em>after</em> they are committed. <strong>Push protection</strong> blocks the push <em>before</em> the secret lands in the repo.'
    },
    {
      question: 'What tool is recommended for removing sensitive data from Git history?',
      answer: '<strong>BFG Repo Cleaner</strong> — faster and simpler than git filter-branch, recommended for large repos.'
    },
    {
      question: 'Should you revoke the credential before or after cleaning Git history?',
      answer: '<strong>Revoke first.</strong> Always revoke/rotate the credential immediately — cleaning history does not make the credential safe.'
    },
    {
      question: 'What is an Enterprise Managed User (EMU)?',
      answer: 'A GitHub user account fully provisioned and controlled by the enterprise via SCIM. EMU users cannot access public repos or use personal GitHub accounts.'
    },
    {
      question: 'Why are GitHub Apps preferred over OAuth Apps for machine accounts?',
      answer: 'GitHub Apps use scoped installation tokens, are not tied to a user\'s account lifecycle, and provide more granular, auditable permissions than OAuth Apps.'
    },
    {
      question: 'What is a Deploy Key?',
      answer: 'An SSH key added directly to a single repository (not a user account). Can be read-only or read-write. Used when a service needs access to one specific repo.'
    },
    {
      question: 'Which Dependabot feature automatically opens a PR to fix a vulnerability?',
      answer: '<strong>Dependabot security updates</strong> — Dependabot alerts only notify; security updates actually create the fix PR.'
    },
    {
      question: 'What does CodeQL analyze?',
      answer: 'Source code — treating it as a database and querying for patterns that represent security vulnerabilities (SQL injection, XSS, path traversal, etc.).'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)
