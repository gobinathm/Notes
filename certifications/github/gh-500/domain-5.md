---
title: "GH-500 - Domain 5: GHAS Best Practices and Corrective Measures"
description: "GH-500 Domain 5: GHAS rollout strategies, security overview, metrics, SBOM, and organizational adoption"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 5, ghas best practices, security overview, rollout, sbom, metrics, corrective measures
---

# Domain 5: Describe GHAS Best Practices, Results, and Corrective Measures (10%)

[← Domain 4](./domain-4.md) · [Cheatsheet →](./cheatsheet.md)

::: tip Exam Tip
This is the smallest domain (10%) and focuses on organizational strategy, metrics, and big-picture GHAS adoption. Expect questions on how to roll out GHAS at scale, how to measure its effectiveness, and how Security Overview works.
:::

---

## GHAS Rollout Strategy

Enabling GHAS across an organization should be done incrementally to avoid overwhelming teams with alerts and disruption.

### Recommended Phased Approach

| Phase | Action | Goal |
|---|---|---|
| **1. Pilot** | Enable GHAS on 2–5 critical repositories | Learn the alert volume and team response |
| **2. Baseline** | Document current vulnerability count | Establish metrics before organization-wide rollout |
| **3. Expand** | Enable GHAS on all new repositories first | Prevent new debt from accumulating |
| **4. Remediate** | Address existing alerts by severity (Critical → High → Medium → Low) | Reduce existing vulnerability debt |
| **5. Enforce** | Enable branch protection + required code scanning checks | Make GHAS part of the development workflow |
| **6. Monitor** | Use Security Overview for ongoing tracking | Maintain visibility and accountability |

::: tip
Start with **secret scanning** first — it produces the most immediately actionable alerts (exposed credentials) and has the clearest remediation path (revoke and rotate). Then layer in Dependabot and code scanning.
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

**Navigate to**: Organization → Security tab → Overview

### Using Security Overview for Prioritization

1. **Filter by severity**: Focus on Critical and High alerts first
2. **Filter by feature**: Identify repositories with code scanning disabled
3. **Sort by alert count**: Find the repositories with the highest vulnerability debt
4. **Track trends**: Confirm that alert counts are decreasing over time (remediation is working)

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

---

## Corrective Measures

### For Secret Scanning Alerts

1. **Revoke the secret** at the service provider immediately
2. **Audit the provider's access logs** for unauthorized use
3. **Remove the secret from history** using `git filter-repo`
4. **Resolve the alert** with the appropriate reason
5. **Introduce a process change**: push protection, pre-commit hooks, or secrets manager (e.g., HashiCorp Vault, GitHub Actions encrypted secrets)

### For Dependabot Alerts

1. **Assess CVSS severity** — prioritize Critical and High
2. **Check reachability** — is the vulnerable function actually called in your code?
3. **Apply the fix**: Update the dependency (accept the Dependabot PR or update manually)
4. **Dismiss as tolerable** if the vulnerable code path is unreachable in your context
5. **Long-term**: Enable Dependabot security updates (auto-PR) to prevent accumulation

### For Code Scanning Alerts

1. **Read the full alert**: Understand the data flow from source to sink
2. **Verify it's a true positive** — not all alerts are exploitable in context
3. **Fix the code**: Apply the recommended remediation (parameterized query, input sanitization, etc.)
4. **Dismiss false positives** with a note explaining why it's not an issue
5. **Re-scan** to confirm the alert is resolved

---

## GHAS Best Practices Summary

### Enable Features in the Right Order

```
1. Secret scanning + push protection     (highest ROI, fastest results)
2. Dependabot alerts + security updates  (continuous dependency protection)
3. Dependency review action              (block new vulnerable deps in PRs)
4. Code scanning (default setup)         (SAST for code vulnerabilities)
5. Code scanning (advanced setup)        (customize when needed)
```

### Reduce Alert Fatigue

- **Use push protection** to prevent secrets from being committed in the first place (fewer alerts to manage)
- **Enable Dependabot security updates** to auto-fix before alerts accumulate
- **Tune CodeQL to security-extended** (not security-and-quality) to reduce noise
- **Triage and dismiss** false positives promptly to keep alert queues clean

### Enforce Standards

- Require code scanning checks in **branch protection rules**
- Use the **dependency review action** in CI for all PRs
- Set an org-wide **GHAS enablement policy** so new repositories automatically get GHAS

---

<FlashcardDeck
  title="Domain 5 Quick Quiz"
  :cards="[
    {
      question: 'What is the recommended first GHAS feature to enable when rolling out to an organization?',
      answer: '<strong>Secret scanning with push protection</strong> — it delivers the highest immediate ROI (prevents credential exposure), has the clearest remediation path (revoke and rotate), and produces actionable alerts fastest.'
    },
    {
      question: 'Who can access Security Overview at the organization level?',
      answer: '<strong>Organization owners</strong> and <strong>Security managers</strong>. Enterprise owners can access enterprise-wide Security Overview across all organizations.'
    },
    {
      question: 'What is MTTR in the context of GHAS metrics?',
      answer: 'Mean Time to Remediate — the average time from when a security alert is created to when it is resolved (fixed or dismissed). A lower MTTR indicates a faster security response.'
    },
    {
      question: 'A developer receives a Dependabot alert for a vulnerability in a dependency they cannot update immediately. What should they do?',
      answer: 'Assess whether the vulnerable code path is <strong>reachable</strong> in their application. If not reachable, dismiss the alert as tolerable risk with a note. If reachable, prioritize the fix. Dependabot auto-dismiss may also apply for unreachable paths.'
    },
    {
      question: 'What is the phased approach for enabling GHAS across an organization?',
      answer: 'Start with a <strong>pilot</strong> (2–5 critical repos) → establish a <strong>baseline</strong> → expand to all new repos → <strong>remediate</strong> existing alerts (Critical first) → <strong>enforce</strong> via branch protection → <strong>monitor</strong> via Security Overview.'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [Cheatsheet →](./cheatsheet.md)
