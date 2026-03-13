---
title: "GH-500 - Domain 6: Describe GitHub Advanced Security best practices"
description: "GH-500 Domain 6: GHAS rollout strategies, SBOM, and corrective measures"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 6, ghas best practices, rollout, sbom, corrective measures
---

# Domain 6: Describe GitHub Advanced Security best practices (20%)

[← Domain 5](./domain-5.md) · [Next Domain →](./domain-7.md)

::: tip Exam Tip
This domain tests your knowledge on how to deploy GHAS effectively in an organization without overwhelming developers. Expect questions on phased rollouts and what to do when alerts trigger (corrective measures).
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

## Governance and Ownership

GHAS works best when ownership is explicit.

| Responsibility | Typical owner |
|---|---|
| Enablement, policy, reporting | Security team, platform team, enterprise admins |
| Daily alert triage and fixes | Repository maintainers and developers |
| Exception approval and dismissal standards | Security leads or designated approvers |
| SLA tracking and remediation backlog | Engineering managers and security program owners |

### Practical Ownership Model

- Security teams define guardrails, severity thresholds, and rollout policy
- Developers fix issues in the normal pull request workflow
- Repository rulesets and branch protection enforce the minimum bar consistently

---

## SBOM (Software Bill of Materials)

GitHub can export a **Software Bill of Materials** — a complete inventory of all dependencies in a repository. This is critical for software supply chain best practices.

### Exporting an SBOM

- **UI**: Insights → Dependency graph → Export SBOM
- **API**: `GET /repos/{owner}/{repo}/dependency-graph/sbom`
- **Format**: SPDX (Software Package Data Exchange) JSON

Use cases: Supply chain audits, compliance requirements (e.g., US Executive Order on cybersecurity), license inventory.

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

### Corrective Measure Principles

- **Revoke or contain first**, then clean up history or code
- **Fix the root cause**, not only the individual alert
- **Document dismissals** so future reviewers understand the decision
- **Prefer earlier controls** such as push protection, dependency review, and PR-time code scanning to reduce recurring issues

---

## GHAS Best Practices Summary

### Enable Features in the Right Order

```text
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

### Study Heuristics for the Exam

- If the scenario is about **preventing** a bad change in a pull request, think **dependency review**, **code scanning on PR**, or **required checks**
- If the scenario is about **reducing blast radius** for leaked credentials, think **revoke, rotate, push protection**
- If the scenario is about **organization-wide adoption**, think **pilot first, baseline, expand, enforce, monitor**

---

<FlashcardDeck
  title="Domain 6 Quick Quiz"
  :cards="[
    {
      question: 'What is the recommended first GHAS feature to enable when rolling out to an organization?',
      answer: '<strong>Secret scanning with push protection</strong> — it delivers the highest immediate ROI (prevents credential exposure), has the clearest remediation path (revoke and rotate), and produces actionable alerts fastest.'
    },
    {
      question: 'A developer receives a Dependabot alert for a vulnerability in a dependency they cannot update immediately. What should they do?',
      answer: 'Assess whether the vulnerable code path is <strong>reachable</strong> in their application. If not reachable, dismiss the alert as tolerable risk with a note. If reachable, prioritize the fix. Dependabot auto-dismiss may also apply for unreachable paths.'
    },
    {
      question: 'What is the phased approach for enabling GHAS across an organization?',
      answer: 'Start with a <strong>pilot</strong> (2–5 critical repos) → establish a <strong>baseline</strong> → expand to all new repos → <strong>remediate</strong> existing alerts (Critical first) → <strong>enforce</strong> via branch protection → <strong>monitor</strong> via Security Overview.'
    },
    {
      question: 'Who should own GHAS alert remediation day to day?',
      answer: 'In a healthy rollout, <strong>developers and repository maintainers</strong> handle day-to-day remediation in their workflow, while the security or platform team sets policy, reporting, and governance.'
    }
  ]"
/>

---

[← Domain 5](./domain-5.md) · [Next Domain →](./domain-7.md)
