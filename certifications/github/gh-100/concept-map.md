---
title: "GH-100 - Cross-Domain Concept Map"
description: "Visual guide showing how GitHub administration concepts interweave across domains"
head:
  - - meta
    - name: keywords
      content: gh-100, concept map, cross-domain, architecture, github administration
---

# GH-100: Cross-Domain Concept Map

[← Overview](./index.md) · [Admin Playbook →](./admin-playbook.md) · [Tools Reference →](./tools-reference.md) · [Exam Guide →](./exam-guide.md)

::: info Understanding Domain Relationships
The GH-100 exam tests **individual domains**, but **real-world scenarios** require understanding how domains interact. This map shows the critical connections.
:::

---

## The Big Picture: How Domains Connect

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTERPRISE FOUNDATION                     │
│  Domain 3: Products (GHEC/GHES), Licensing, Deployment      │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   ┌─────────┐  ┌────────────┐  ┌──────────┐
   │Domain 2 │  │ Domain 4   │  │ Domain 5 │
   │Identity │→ │Access &    │→ │Security &│→ Domain 6
   │& Auth   │  │Permissions │  │Compliance│  (Actions)
   └────┬────┘  └────┬───────┘  └────┬─────┘
        │            │              │
        └────────────┼──────────────┘
                     ↓
        ┌─────────────────────────┐
        │  Domain 1: Support &    │
        │  Governance (Cross-all) │
        └─────────────────────────┘
```

---

## Domain-by-Domain Relationships

### Domain 2 (Identity) → The Gatekeeper

**What it controls**: Who can log in and which GitHub account they use.

**Flows to Domain 4 (Access)**:
- SAML SSO authenticates users
- Team Sync mirrors IdP groups into GitHub teams
- Teams grant repository permissions (Domain 4)

```
IdP (Okta, Azure AD)
    ↓
SAML SSO (Domain 2: Authentication)
    ↓
User is now logged in as @alice
    ↓
Team Sync (Domain 2) mirrors IdP group "Backend-Team"
    ↓
@alice is added to "Backend-Team" GitHub team
    ↓
"Backend-Team" has "write" access to backend-repo
    ↓
@alice can now push to backend-repo (Domain 4)
```

**Flows to Domain 5 (Security)**:
- SAML enforcement (Domain 2) ensures only IdP users can access
- EMU (Enterprise Managed Users) locks accounts to company-managed only
- These restrictions prevent unauthorized access to sensitive resources

---

### Domain 4 (Access) → The Gatekeeper of Permissions

**What it controls**: Who can do what to repos, teams, and organizations.

**Connects to Domain 2**:
- Permission structure depends on user identity (SAML, EMU, etc.)
- Outside collaborators (Domain 4) bypass org membership but still need identity

**Flows to Domain 5 (Security)**:
- Repository permission levels determine secret access scope
- Org owners (Domain 4: highest permission) can configure security features (Domain 5)
- Branch protection rules (Domain 4) enforce code review before secrets/sensitive code lands

```
Domain 4: Repository Roles
├─ Admin role     → Can manage branch protection & enable secret scanning
├─ Maintain role  → Can enable CodeQL, configure environments
├─ Write role     → Can create/commit but not change permissions
└─ Read role      → View-only (lower security risk)
                      ↓
                   Domain 5: Security Features
                   These features are only as good as the
                   permissions you grant to who can access them.
```

**Flows to Domain 6 (Actions)**:
- Environment protection rules (Domain 4 + Domain 6) require approvals before deployment
- Runner groups (Domain 6) restrict which repos/orgs can use self-hosted runners
- Permission levels determine who can manage GitHub Actions secrets (Domain 6)

---

### Domain 5 (Security) → The Locksmith

**What it controls**: Detection and prevention of vulnerabilities and secrets.

**Depends on Domain 4**:
- Secret scanning alerts are viewable only by users with appropriate repo permissions (Domain 4)
- CodeQL results visibility tied to repo access level
- Audit logs (Domain 5) show **who changed permissions** (Domain 4)

**Flows to Domain 6 (Actions)**:
- GitHub Actions workflows **run** code (Domain 6)
- Secret scanning (Domain 5) detects secrets in commits *before* they reach Actions
- OIDC federation (Domain 5 + Domain 6) eliminates long-lived secrets in workflows
- Push protection (Domain 5) blocks secrets before CI/CD even starts (Domain 6)

```
Development Flow:
Developer writes code
    ↓
Push to GitHub
    ↓
Push Protection (Domain 5) blocks if secret detected
    ↓
Workflow triggers (Domain 6) only if push succeeds
    ↓
Workflow needs cloud credentials for deployment
    ↓
OIDC (Domain 5 + Domain 6) provides short-lived token
    ↓
Deployment succeeds without storing long-lived secrets
```

**Flows to Domain 2 (via Audit)**:
- Audit logs (Domain 5) record identity changes (SAML updates, user provisioning via SCIM — Domain 2)
- Audit logs show who enabled/disabled security features
- EMU (Domain 2) + Audit logs (Domain 5) = complete identity + action trail

---

### Domain 6 (Actions) → The Executor

**What it controls**: Automation, CI/CD pipelines, and deployment.

**Depends on Domain 4**:
- Only users with repo `write` or higher can write workflows
- Runner groups (Domain 6) restricted by org/repo access (Domain 4)

**Depends on Domain 5**:
- Secrets scope (Domain 5 + Domain 6) controls which workflows can access sensitive data
- Push protection (Domain 5) prevents malicious workflows from committing secrets
- Dependabot security updates (Domain 5) trigger PRs with automated fixes

**Depends on Domain 2**:
- GitHub App tokens (Domain 6 workflows) use GitHub identity (Domain 2)
- SCIM-provisioned users (Domain 2) can trigger workflows

```
Workflow Execution Chain:
User pushes code
    ↓
SAML validates identity (Domain 2)
    ↓
Push protection scans for secrets (Domain 5)
    ↓
Workflow is triggered (Domain 6)
    ↓
Workflow runs on GitHub-hosted or self-hosted runner
    ↓
Workflow accesses org secret (Domain 6) with permission level (Domain 4)
    ↓
Secret scope (Domain 6) determines which repos can use this secret
    ↓
Audit log records "Workflow deployed to production" (Domain 5)
```

---

## Critical Intersection Points (High Exam Probability)

These are scenarios where **multiple domains interact**:

### 1. **Identity + Security + Audit (Domains 2 + 5 + Admin)**
**Scenario**: "A contractor's SAML account was deprovisioned via SCIM (Domain 2). How do you audit what they accessed?"

**Answer Flow**:
- Check audit log (Domain 5) with filter: `user:contractor-name action:repo.access`
- Verify SCIM deprovisioning (Domain 2) happened correctly
- Review secret access logs (Domain 5) to see if contractor accessed any org secrets
- Related: Domain 1 (governance) — define contractor access review process

### 2. **Permissions + Secrets + Workflows (Domains 4 + 5 + 6)**
**Scenario**: "A junior dev accidentally has `admin` on the production repo. They can see the database password stored there. What's wrong?"

**Answer Flow**:
- **Domain 4 issue**: Junior dev should have `write` not `admin`
- **Domain 5 issue**: Database password shouldn't be stored in repo secret; use OIDC + cloud vault (Domain 6)
- **Domain 6 issue**: Production workflows should not run on commits from junior devs
- **Fix**: Reduce permission (Domain 4) + migrate to OIDC (Domain 5/6) + environment protection rules (Domain 4/6)

### 3. **Authentication Enforcement + Access Control (Domains 2 + 4)**
**Scenario**: "We enforced SAML SSO last night. 30% of teams can't access their repos today."

**Answer Flow**:
- **Domain 2 diagnosis**: SAML enforcement blocks non-SAML users
- **Domain 4 impact**: Outside collaborators (who bypass org SAML) are now blocked from non-member repos
- **Domain 2 fix**: Review which accounts are SAML-linked; outside collaborators need special handling
- **Domain 4 mitigation**: Temporarily remove outside collaborators from SAML enforcement or migrate them

### 4. **Deployments + Identity + Secrets (Domains 6 + 2 + 5)**
**Scenario**: "We want production deployments to only work for core team members, with no stored secrets."

**Answer Flow**:
- **Domain 2**: EMU or SCIM ensures only company-managed accounts exist
- **Domain 6**: GitHub Environment with required reviewers (must be core team)
- **Domain 5**: OIDC federation to get temporary cloud credentials (no secrets stored)
- **Domain 6**: Self-hosted runner in VPC (isolate from internet)
- **Result**: Deployment is identity-verified (Domain 2), gated (Domain 6), and credential-safe (Domain 5)

---

## The "Dependency Chain" — Questions You'll See

**Question Type**: "To accomplish X, which must come first?"

### Example 1: Secret Scanning → Audit Logging
```
Goal: "We need to prove to auditors that secrets are scanned"
Step 1 (Domain 5): Enable secret scanning (repo-level)
Step 2 (Domain 5): Push a test credential, verify alert fires
Step 3 (Domain 5): Enable audit logging (org-level)
Step 4 (Domain 5): Query audit log for "secret.push_protection_bypass"
Exam question: "To audit secret scanning enforcement, which comes first?"
Answer: Audit logging is useless without secret scanning enabled first.
```

### Example 2: SAML + Team Sync
```
Goal: "Sync Azure AD groups to GitHub teams"
Step 1 (Domain 2): Enable SAML SSO
Step 2 (Domain 2): Enable Team Sync
Step 3 (Domain 2): Ensure IdP sends group claims in SAML assertion
Exam question: "Team Sync isn't mirroring groups. You've checked IdP. What's next?"
Answer: Verify SAML is working first; team sync depends on successful SAML authentication.
```

### Example 3: Runners + Security + Permissions
```
Goal: "Use self-hosted runners for production, safely"
Step 1 (Domain 4): Create runner group, restrict to production repo only
Step 2 (Domain 6): Deploy self-hosted runner in private VPC (not internet-accessible)
Step 3 (Domain 5): Disable public workflows from using this runner
Step 4 (Domain 6): Use OIDC to avoid storing cloud credentials in GitHub Secrets
Exam question: "Self-hosted runner was compromised. Which protection failed first?"
Answer: If it was exposed to the internet, Step 2 failed. If public PR used it, Step 3 failed.
```

---

## Study Strategy: Using the Concept Map

### By Domain Weight

| Domain | Weight | Key Connections | Study Priority |
|--------|--------|---|---|
| **5** | 36% | Hub connecting to 2, 4, 6 | Master thoroughly; see how it touches other domains |
| **4** | 18% | Gateway between 2, 5, 6 | Understand permission scope deeply |
| **6** | 16% | Executor; depends on 2, 4, 5 | Know security requirements *before* deploying |
| **2** | 11% | Gatekeeper; upstream of 4 | Understand identity flow impact on access |
| **1, 3** | 9% | Support + governance (cross-domain) | Use these to frame other domains |

### By Study Method

**If you're a visual learner**:
- Trace the flow: Identity → Access → Security → Actions
- For each scenario, follow the chain of command/dependencies

**If you're a logical learner**:
- Learn Domain 2 first (who can log in?)
- Then Domain 4 (what can they do?)
- Then Domain 5 (how do we protect it?)
- Then Domain 6 (how do we automate it?)

**If you're a practical learner**:
- Work through [Admin Playbook scenarios](./admin-playbook.md)
- Pause at each step and ask: "Which domain handles this?"

---

## Key Takeaway: Domains Don't Exist in Isolation

- **Domain 2 without Domain 4** = Identity but no access control (useless)
- **Domain 4 without Domain 5** = Permissions but no security (vulnerable)
- **Domain 5 without Domain 6** = Security but no automation (manual and error-prone)
- **Domain 6 without Domains 2+4+5** = Automation but no governance (dangerous)

**Exam tip**: If an answer isolates a single domain and ignores dependencies, it's likely wrong. Real admin decisions require thinking across domains.

---

[← Overview](./index.md) · [Admin Playbook →](./admin-playbook.md) · [Tools Reference →](./tools-reference.md) · [Exam Guide →](./exam-guide.md)
