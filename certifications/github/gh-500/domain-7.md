---
title: "GH-500 - Domain 7: Configure GitHub Advanced Security tools in GitHub Enterprise"
description: "GH-500 Domain 7: Enterprise policies, Security Overview, and metrics"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 7, ghas enterprise, security overview, metrics, policies
---

# Domain 7: Configure GitHub Advanced Security tools in GitHub Enterprise (10%)

[← Domain 6](./domain-6.md) · [Cheatsheet →](./cheatsheet.md)

::: tip Exam Tip
This domain covers enterprise-level features. You need to know how Security Overview tracks metrics natively, and what enterprise policies can be applied across organizations.
:::

---

## Security Overview

The **Security Overview** dashboard provides a consolidated view of all GHAS feature status and alerts across an organization or enterprise.

### What Security Overview Shows

- Which repositories have each GHAS feature enabled (secret scanning, code scanning, Dependabot)
- Alert counts by severity across all repositories
- Open vs. closed/fixed alert trends over time
- Repositories with the most open critical alerts (risk exposure ranking)

### Who Can Access Security Overview

| Role | Level |
|---|---|
| **Security managers** | Organization-level overview |
| **Organization owners** | Organization-level overview |
| **Enterprise owners** | Enterprise-wide overview across all organizations |

**Navigate to**: Organization or Enterprise → Security tab → Overview

### Using Security Overview for Prioritization

1. **Filter by severity**: Focus on Critical and High alerts first
2. **Filter by feature**: Identify repositories with code scanning disabled
3. **Sort by alert count**: Find the repositories with the highest vulnerability debt
4. **Track trends**: Confirm that alert counts are decreasing over time (remediation is working)

::: tip Golden metric
If the exam asks which metric best indicates the efficiency of the security program, the strongest answer is usually **MTTR (Mean Time to Remediate)**.
:::

---

## Metrics and Reporting

### Key GHAS Metrics to Track

| Metric | What it measures |
|---|---|
| **Mean Time to Remediate (MTTR)** | Average time from alert creation to resolution |
| **Alert volume by severity** | Total open alerts per severity level |
| **Fix rate** | % of alerts resolved vs. dismissed vs. open |
| **Feature coverage** | % of repositories with each GHAS feature enabled |
| **New alerts per week** | Rate of new vulnerabilities being introduced |

### GitHub Advisory Database

- GitHub's vulnerability database powers Dependabot alerts
- Contains: CVEs from NVD + GitHub-curated advisories (GitHub Security Advisories)
- Organization security teams can also submit **private security advisories** for their own repositories

### Private Security Advisories

Private Security Advisories let maintainers and security teams:

- Discuss a vulnerability privately before public disclosure
- Collaborate on the fix, affected versions, and release plan
- Coordinate responsible disclosure and eventual publication as a security advisory

This is a favorite exam topic because it tests **private collaborative triage**, not just alert viewing.

---

## Enterprise Policies

Enterprise owners can enforce GHAS policies across all organizations within the enterprise.

### Enforcing Features

- Enable **Secret Scanning** for all new organizations
- Enable **Push Protection** by default across all organizations
- Set **Custom Patterns** at the enterprise level, making them available to all orgs and repos automatically
- Standardize **security manager** access so the right teams can view and triage alerts centrally
- Decide whether **secret scanning validity checks** should be enabled so GitHub can verify supported tokens with providers

### Enterprise-Level Validity Checking

- Validity checking for supported secret types can be managed as an enterprise-level policy decision
- This determines whether GitHub should contact the relevant partner provider to verify whether a token is still active
- It improves prioritization because teams can focus first on secrets that are still valid

### Partner Patterns and Provider Notification

- For some partner patterns in **public repositories**, GitHub can automatically notify the relevant provider when a matching secret is exposed
- Common examples include providers such as **AWS**, **Microsoft**, and **Slack**
- For **private repositories**, validity checking or provider verification behavior depends on administrative configuration and supported integrations

Enforcing these at the enterprise level disables the ability for organization owners to turn them off, ensuring compliance.

### Enterprise Configuration Model

| Scope | Typical use |
|---|---|
| **Enterprise** | Set default policy, reporting visibility, and shared patterns across organizations |
| **Organization** | Roll out features to selected repositories and delegate security managers |
| **Repository** | Fine-tune workflows, required checks, and remediation operations |

::: tip
For exam scenarios, choose the **highest scope that matches the requirement**. If the requirement says "across all organizations" or "enterprise-wide visibility," the answer is usually an enterprise-level control.
:::

---

## Security Managers and Delegated Access

Enterprise and organization admins do not need to do all alert triage themselves.

- **Security managers** can review and manage security findings without needing broad admin rights everywhere
- This is useful when central AppSec teams need access to alerts across many repositories
- It supports separation of duties: platform admins configure GHAS, security managers triage, developers remediate
- Security managers are **not** a substitute for owners/admins when the task is enabling GHAS or changing organization and enterprise policy
- Security managers also cannot manage organization-wide enforcement controls such as **required workflows**

### IP Allow Lists and External Integrations

If the enterprise uses an **IP allow list**, GitHub-integrated automation must still be able to reach GitHub from approved addresses.

- Self-hosted runners may need to be added to the allow list
- External SAST tooling that uploads SARIF may also need its egress IPs allowed
- If not, SARIF uploads or workflow steps can fail with **403** errors

::: warning Exam Trap
If a GitHub Enterprise scenario mentions IP allow lists and a SARIF upload failing with `403`, the likely fix is to allow the runner or external tool's IP.
:::

---

## Enterprise Exam Scenarios

| Scenario | Best answer direction |
|---|---|
| Need one dashboard across many orgs | **Enterprise Security Overview** |
| Need a secret pattern reused everywhere | **Enterprise-level custom pattern** |
| Need repo maintainers to keep local workflow flexibility | Set policy at org/enterprise, keep remediation in the repo |
| Need consistent enforcement for PR checks | Use **rulesets** or required checks centrally where possible |
| Need a mandatory scan workflow everywhere | Use enterprise rulesets / required workflows where supported |

### Numbers and Limits to Remember

| Topic | Value |
|---|---|
| Pilot rollout size | **2-5 repositories** |
| Best operational metric | **MTTR** |
| Enterprise rulesets limit previously noted in these notes | **75 rulesets** |

---

<FlashcardDeck
  title="Domain 7 Quick Quiz"
  :cards="[
    {
      question: 'Who can access Security Overview at the organization level?',
      answer: '<strong>Organization owners</strong> and <strong>Security managers</strong>. Enterprise owners can access enterprise-wide Security Overview across all organizations.'
    },
    {
      question: 'What is MTTR in the context of GHAS metrics?',
      answer: 'Mean Time to Remediate — the average time from when a security alert is created to when it is resolved (fixed or dismissed). A lower MTTR indicates a faster security response.'
    },
    {
      question: 'Can custom secret scanning patterns be configured at the enterprise level?',
      answer: '<strong>Yes.</strong> Enterprise administrators can define custom patterns that apply to all repositories across all organizations within the enterprise.'
    },
    {
      question: 'When should you choose an enterprise-level GHAS setting over an organization-level setting?',
      answer: 'Choose the <strong>enterprise level</strong> when the requirement spans multiple organizations, needs centralized visibility, or requires a consistent default policy across the whole enterprise.'
    },
    {
      question: 'What is a Private Security Advisory used for?',
      answer: 'A <strong>Private Security Advisory</strong> is used to discuss, triage, and fix a vulnerability privately before public disclosure, allowing maintainers and security teams to coordinate responsible release and remediation.'
    },
    {
      question: 'Can a Security Manager enable GHAS for repositories across the organization?',
      answer: '<strong>No.</strong> Security Managers can view and triage alerts, but enabling GHAS or changing organization and enterprise settings requires broader administrative authority.'
    },
    {
      question: 'What should you check if SARIF uploads fail with 403 errors in an enterprise using IP allow lists?',
      answer: 'Check whether the <strong>self-hosted runner</strong> or the external SAST system uploading SARIF is included in the enterprise IP allow list.'
    }
  ]"
/>

---

[← Domain 6](./domain-6.md) · [Cheatsheet →](./cheatsheet.md)
