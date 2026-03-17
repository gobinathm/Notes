---
title: "GH-100 - Admin Playbook"
description: "Real-world GitHub administration scenarios, troubleshooting steps, and decision frameworks for enterprise admins"
head:
  - - meta
    - name: keywords
      content: gh-100, admin playbook, scenarios, troubleshooting, decision framework, github administration, enterprise
---

# GH-100: Admin Playbook

[← Overview](./index.md) · [Concept Map →](./concept-map.md) · [Tools Reference →](./tools-reference.md) · [Exam Guide →](./exam-guide.md)

::: info Real-World Scenarios for Enterprise Admins
These scenarios test your ability to **synthesize knowledge across domains** and make decisions under pressure. Each walkthrough shows the decision tree, troubleshooting steps, and links to relevant study material.
:::

---

## Scenario 1: SAML SSO Enforcement Breaks Team Access

**Situation**: You enforce SAML SSO on your enterprise account. The next morning, 15% of your workforce cannot log in. You have 30 minutes to restore access before the daily standupd.

### Symptom
- Users see: "SAML authentication failed" or "Your identity provider rejected the authentication request"
- Some users can log in; others cannot
- Team sync shows green, but users claim they can't access repos

### Diagnosis Checklist
- [ ] **Step 1: Check IdP health** — Is your SAML provider (Okta, Azure AD, etc.) online? Check status page.
- [ ] **Step 2: Verify SAML assertion format** — Does your IdP send the `NameID` field? GitHub requires it.
- [ ] **Step 3: Check GitHub's SAML log** — Go to Enterprise Settings → Authentication & Authorization → View SAML log. Look for assertion errors.
- [ ] **Step 4: Confirm ACS URL** — Is the Assertion Consumer Service (ACS) URL correct? Typo = silent rejection.
- [ ] **Step 5: Review user attributes** — Are users linked to existing GitHub accounts? New SAML users need pre-existing GitHub accounts (unless EMU).

### Quick Fixes (in order of likelihood)
1. **Wrong ACS URL**: Regenerate SAML certificate, copy the correct ACS URL from GitHub, update IdP
2. **Missing NameID**: Configure IdP to send NameID in SAML assertion (not just email)
3. **Certificate expired**: Regenerate SAML certificate in GitHub (Enterprise Settings → SAML)
4. **IdP assertion size too large**: Some IdP attribute mappings bloat the assertion → remove unused attributes

### Decision Tree
```
All users failing? → Check IdP status + ACS URL
Only new/recent hires failing? → Check user account linking
Some users specific to a team failing? → Check team sync + IdP group membership
```

### Mitigation
- **Disable SAML enforcement temporarily** (uncheck "Require SAML authentication") to unblock users while you investigate
- **Use a test user account** to replicate the error and debug
- **Escalate to GitHub Support** if SAML log shows "Assertion invalid" with no clear reason

### Related Study Material
- [Domain 2: User Identities & Authentication](./domain-2.md) — SAML SSO configuration
- [Exam Guide: Identity Decision Trees](./exam-guide.md#which-identity--authentication-approach)

---

## Scenario 2: Secrets Leaked in a Public Repository (Brand Damage Control)

**Situation**: A developer accidentally commits a GitHub Personal Access Token (PAT) to a public repo. The commit is already on main for 2 hours. You need to minimize exposure.

### Immediate Actions (First 5 Minutes)
1. **Revoke the token immediately** — GitHub Personal Settings → Tokens → delete the exposed token
2. **Alert the organization** — Notify security team, don't announce publicly yet
3. **Check if GitHub detected it** — Go to repo → Security → Secret scanning alerts. If GitHub's partner network detected it, GitHub may have already notified the token issuer to revoke it

### Remediation Steps

#### Step 1: Scrub History (Choose One Approach)
```bash
# Option A: BFG Repo Cleaner (RECOMMENDED - faster)
bfg --replace-text passwords.txt my-public-repo.git
# OR
# Option B: git filter-branch (legacy but works)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch ghp_xxxxx' \
  --prune-empty --tag-name-filter cat -- --all
```

**Why BFG over filter-branch?**
- BFG is 10-100x faster on large repos
- Simpler syntax, lower risk of mistakes
- GitHub Support recommends it

#### Step 2: Force-Push Cleaned History
```bash
git push origin --force-with-lease
git push origin --force-with-lease --tags
```

::: warning Coordination Required
Everyone who cloned the repo must re-clone after the force-push. Notify your team in advance.
:::

#### Step 3: Verify the Secret Is Gone
```bash
# Search repo history for any remaining trace
git log -p --all -S "ghp_" | head -20
# Result should be empty
```

#### Step 4: Audit & Recover
- **Check audit logs**: Enterprise Settings → Audit log. Search for token creation/deletion. Who had access?
- **Review recent deployments**: Did this token deploy anything? Audit those environments.
- **Rotate related secrets**: If the PAT accessed AWS keys or databases, rotate those too.

### Decision Tree
```
Secret is < 1 hour old?
  → Revoke + BFG + force-push (likely minimal exposure)
Secret is > 24 hours old?
  → Revoke + BFG + assume compromise (audit all systems the token touched)
Secret is in a private repo (not public)?
  → Revoke + BFG (lower urgency, check audit logs for who accessed it)
```

### Prevention for Future
- Enable **push protection** to block commits with secrets *before* they enter the repo (enabled at org level)
- Enable **secret scanning** to alert on detected secrets
- Use **environment secrets** for production deployments (scoped, require approvals)
- Prefer **GitHub Apps** over PATs for machine accounts (Apps have short-lived tokens, no expiry gotchas)

### Related Study Material
- [Domain 5: Secret Scanning & History Scrubbing](./domain-5.md#scrubbing-sensitive-data-from-git-history)
- [Domain 5: Push Protection vs Secret Scanning](./domain-5.md#push-protection)
- [Cheatsheet: Token Types](./cheatsheet.md#token-types)

---

## Scenario 3: Migrating from GitHub Enterprise Server (GHES) to GitHub Enterprise Cloud (GHEC)

**Situation**: Your organization is sunsetting on-premises GHES and migrating to GHEC. You have 100 repos, 500 users, and 3 months to complete the migration without downtime.

### Pre-Migration Assessment (Week 1)

#### Inventory & Dependencies
- [ ] List all repos, their size, and recent commit activity
- [ ] Document all self-hosted runners — will these migrate to GitHub-hosted or new self-hosted?
- [ ] Audit all GitHub Apps and OAuth apps — check if they're GHES-compatible on GHEC
- [ ] Identify any GHES-only configuration (e.g., custom authentication, appliance-specific features)

#### Identity Strategy Decision
```
Question: How should users authenticate on GHEC?

If current GHES uses LDAP:
  → GHEC doesn't support LDAP directly
  → Options:
     (A) Migrate to SAML SSO + SCIM + Team Sync
     (B) Enable EMU (Enterprise Managed Users) for full company-control
     (C) Switch to OAuth with existing IdP

Recommendation: SAML + SCIM (most common, most control)
```

#### Capacity Planning
- **License seats**: GHEC is metered by user. Audit inactive users and remove them before migration.
- **Data volume**: GHEC has limits on repo size and API rate limits. Test with largest repos first.
- **Network egress**: Moving large repos off-premises = data transfer costs. Plan for this.

### Migration Plan (Phased Approach)

#### Phase 1: Pilot (Week 2-3)
- Migrate 3 small repos and 50 volunteers to GHEC
- Test SAML SSO with a subset of users
- Verify CI/CD workflows run on GitHub-hosted runners
- Validate team structure and permissions mapping

#### Phase 2: Parallel Run (Week 4-8)
- Migrate 40% of repos to GHEC
- Mirror activity between GHES and GHEC (optional: use GitHub Sync tool or custom scripts)
- Monitor performance, API usage, rate limits
- Collect user feedback on workflows

#### Phase 3: Cutover (Week 9-12)
- Final sync of remaining repos
- Turn off GHES (or put in read-only mode)
- Celebrate! 🎉

### Key Decisions During Migration

| Decision Point | GHES Approach | GHEC Approach | Recommendation |
|---|---|---|---|
| **User accounts** | LDAP + local users | SAML + SCIM (or EMU) | SAML + SCIM for smooth transition |
| **CI/CD runners** | Self-hosted (on-prem) | GitHub-hosted or new self-hosted | Evaluate: GitHub-hosted faster? Or keep self-hosted for security? |
| **Webhooks/Integrations** | Update each app's endpoint | Re-register webhooks on GHEC | Plan webhook re-registration |
| **Data storage** | On-premises (AWS/Azure for large) | GitHub-hosted (no alternative) | Accept GitHub hosting; audit compliance needs |

### Troubleshooting Common Issues

**Issue**: "Users can't log in after SAML setup"
- **Cause**: ACS URL misconfiguration, missing NameID in assertion, or users don't exist on GHEC yet
- **Fix**: See [Scenario 1](#scenario-1-saml-sso-enforcement-breaks-team-access)

**Issue**: "Repo history is incomplete after migration"
- **Cause**: Shallow clone during migration, or large file filtering
- **Fix**: Re-push with full history: `git push --mirror` instead of selective push

**Issue**: "CI/CD pipeline slower on GitHub-hosted runners"
- **Cause**: GitHub-hosted runners are shared; on-prem runners had dedicated hardware
- **Fix**: Test runner class (macOS, Windows, Linux with different specs) or use self-hosted runners

### Related Study Material
- [Domain 3: Deployment & Licensing (GHEC vs GHES)](./domain-3.md)
- [Domain 2: Identity Management (SAML + SCIM)](./domain-2.md)
- [Domain 6: Runners (GitHub-hosted vs self-hosted)](./domain-6.md)

---

## Scenario 4: Enforcing a Least-Privilege Permission Model Across 50 Teams

**Situation**: Your enterprise has grown to 8 organizations, 50 teams, and 200 repositories. Permission creep is real — many people have `admin` access who only need `write`. You need to audit and enforce least privilege without disrupting teams.

### Step 1: Audit Current State

#### Repository Permissions Audit
```bash
# Using GitHub CLI (gh)
for org in org1 org2 org3; do
  gh repo list $org --limit 1000 --json name,repositoryTopics --template '{{range .}}{{.name}}{{"\t"}}{{end}}{{"\n"}}'
done
# Then manually inspect each repo's Manage Access tab
# OR use GitHub API to export via Python/Script
```

#### Find Over-Privileged Users
1. Go to Organization Settings → Members
2. Sort by role (Owner, Member)
3. Identify **Owners who should be Members** (only product leads and principal engineers should be Owners)
4. Document which users have admin access on repos (check each repo's Manage Access tab)

#### Check Outside Collaborators
- Outside Collaborators should have **repo-level access only**, not org-level access
- Verify they're linked to specific repos, not blanket org membership

### Step 2: Define Permission Levels

Create a policy document:

| Team | Repo Access | Permission | Rationale |
|---|---|---|---|
| Developers (IC) | Feature repo | `write` | Can merge own PRs, cannot delete repo |
| Developers (Senior/Lead) | Feature repo | `maintain` | Can manage branch protection, deploy, but cannot delete repo |
| DevOps / Release | Deployment repo | `admin` | Can configure CI/CD, manage deployments, rotate secrets |
| Security | All repos | `maintain` (audit-only) | Can view, comment, audit; cannot merge/push |
| Product | Feature repo | `triage` | Can label, assign, close issues; cannot push |

::: tip Principle
**Read** < **Triage** < **Write** < **Maintain** < **Admin**

Default to Read; elevate only when necessary.
:::

### Step 3: Implement the Model

#### Option A: Team-Based Access (Recommended for Scaling)
1. Create teams aligned to **function**, not project:
   - `@backend-core` (write to backend repo)
   - `@devops-core` (admin on deployment repos)
   - `@security-audit` (maintain on all repos)

2. Grant teams permissions at repo level (not per-user)

3. Use **branch protection rules** to enforce code review even if user has write access

#### Option B: Role-Based Access Control (RBAC) Using Custom Roles (Enterprise Only)
Enterprise accounts can define custom repository roles:
1. Go to Enterprise Settings → Roles
2. Create roles: `Backend Engineer`, `Release Manager`, `Security Reviewer`
3. Assign users to roles; roles grant specific permissions

#### Automate Role Assignment
Use **GitHub API** to:
```bash
# Add user to team
gh api -X POST /orgs/$ORG/teams/$TEAM/memberships/$USERNAME --input -

# Assign team to repo with permission level
gh api -X PUT /repos/$ORG/$REPO/teams/$TEAM --input '{"permission":"write"}'
```

### Step 4: Audit & Enforce

#### Monthly Permission Review
```bash
# Export org members and permissions
gh org-permissions export --org $ORG --output members.csv

# Identify outliers: users with admin who shouldn't
```

#### Implement Governance
- **Branch protection rules**: Require PR review even for repo maintainers (prevents accidental force-push)
- **Enterprise policy**: Set org-level policies (e.g., "only owners can create new teams")
- **Audit logging**: Monitor `Repository role changed` events in org audit log

### Decision Tree
```
User asks for repo admin access?
  → Verify: Is this a deployment automation? (Yes → maintainer OK)
  → Verify: Is this a one-time need? (Yes → provide temporary access)
  → Default: Offer write or maintain instead

Team consistently needs admin on multiple repos?
  → Create a dedicated DevOps/Platform team
  → Grant that team admin on shared repos
```

### Related Study Material
- [Domain 4: Access & Permissions](./domain-4.md)
- [Domain 4: Repository Permission Levels](./domain-4.md#repository-permission-levels)
- [Cheatsheet: Least Privilege](./cheatsheet.md#admin-core-principles-slg)
- [Exam Guide: Enterprise vs Org Policies](./exam-guide.md#what-should-be-done-first)

---

## Scenario 5: GitHub Actions Security Lockdown (Secrets, Runners, and Deployment Gates)

**Situation**: Your CI/CD pipeline runs 500+ workflows daily. You've had two incidents:
1. A script accidentally logged a database password to build logs (caught by secret scanning, but scary)
2. A self-hosted runner was used by a malicious PR, exposing AWS credentials to an external contributor

You need to enforce guardrails without breaking the development experience.

### Step 1: Secrets Security

#### Audit Current Secrets
```bash
# List all secrets in an org (requires REST API call)
curl -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/orgs/$ORG/actions/secrets" | jq '.secrets[].name'
```

#### Implement Secret Rotation Policy
- **Database passwords**: Rotate every 90 days
- **API keys**: Rotate every 30 days
- **Cloud credentials (AWS, GCP, Azure)**: Rotate every 15 days
- **GitHub PATs**: Rotate every 90 days

#### Use OIDC Federation (Preferred for Cloud Credentials)
Instead of storing AWS_ACCESS_KEY_ID as a GitHub secret:
```yaml
# Workflow with OIDC (no stored credentials)
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::$ACCOUNT:role/GitHubActionsRole
    aws-region: us-east-1
```

**Benefit**: GitHub generates short-lived (1 hour) STS tokens. No long-lived secrets to rotate.

#### Restrict Secret Access
1. Go to Organization Settings → Secrets
2. For sensitive secrets (database passwords), restrict to **specific repos only** or **specific environments only**
3. Do NOT use organization-level secrets for prod credentials (too broad)

### Step 2: Self-Hosted Runner Security

#### Risk Assessment
- **Public repos**: NEVER use self-hosted runners (external PRs can access secrets + runner hardware)
- **Private repos**: OK to use self-hosted runners, but isolate them

#### Implementation
1. **Create runner groups** (Organization Settings → Actions → Runners):
   - `prod-runners` (restricted to deployment repos only)
   - `internal-runners` (available to all internal repos)
   - Do NOT allow public repos to use any self-hosted runner

2. **Use machine-type filtering**:
   ```yaml
   # Workflow file
   runs-on: [self-hosted, prod, linux]  # Only runs on labeled self-hosted runners
   ```

3. **Keep runners updated**:
   ```bash
   # Self-hosted runner machines
   sudo apt update && sudo apt upgrade -y  # Weekly
   ```

4. **Monitor runner usage**:
   - Go to Organization Settings → Actions → Runners
   - Check "Recent workflow runs" — identify unusual activity
   - Alert on: unexpected external PR using self-hosted runner

### Step 3: Deployment Gates

#### Use GitHub Environments
```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    steps:
      - run: echo "Deploying to production"
```

#### Configure Environment Protection Rules
1. Go to Repository Settings → Environments → Add "production"
2. Set **Required Reviewers**: 2 senior engineers (deploys require approval)
3. Set **Deployment Branches**: Only main can deploy to production
4. Set **Deployment Protection Rules**: "Previous deployment must succeed before deploying"

#### Use Deployment Keys (Not PATs)
For automated deployments, create a **Deploy Key** (repository-scoped SSH key):
```bash
# Generate deploy key
ssh-keygen -t ed25519 -f deploy_key -C "deployment"

# Add to repo (Settings → Deploy keys)
# Use in workflow:
- name: Deploy
  env:
    DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
  run: |
    mkdir -p ~/.ssh
    echo "$DEPLOY_KEY" > ~/.ssh/id_ed25519
    chmod 600 ~/.ssh/id_ed25519
    git clone git@github.com:org/repo.git
```

**Why Deploy Keys?**
- Scoped to one repo only (not org-wide like PAT)
- Cannot access organization resources
- Easier to audit (search repo → Deploy keys)

### Step 4: Audit Logging

#### Monitor Actions Activity
```bash
# Check if OIDC was used vs secrets
# Audit log entry: "Workflow run deployed" with "token_type": "oidc" vs "secret"
```

#### Red Flags to Monitor
- [ ] Self-hosted runner executing pull request from external user
- [ ] Deployment to production without required approvals (check audit log)
- [ ] Secret creation/rotation by non-admin user
- [ ] Runner group permissions expanded to public repos

### Decision Tree
```
Cloud authentication in Actions?
  → Use OIDC (no stored secrets)

Deployment to production?
  → Use GitHub Environment + Required Reviewers

Need runner for heavy compute?
  → Self-hosted runner + runner groups + restrict to private repos only

Secret needed in public repo workflow?
  → STOP. Restructure: use OIDC or separate private deployment repo
```

### Related Study Material
- [Domain 5: Access Tokens & GitHub Apps](./domain-5.md#access-token-types-and-github-apps)
- [Domain 5: Enterprise Managed Users (EMU)](./domain-5.md#enterprise-managed-users)
- [Domain 6: Self-Hosted Runners](./domain-6.md#self-hosted-runners)
- [Domain 6: Encrypted Secrets Scope](./domain-6.md#encrypted-secrets-and-scope)
- [Cheatsheet: OIDC Federation](./cheatsheet.md#terminology-check)

---

## Key Takeaways for Exam Day

When faced with a scenario question on the exam:

1. **Identify the domain** — Is this about identity (2), access (4), security (5), or actions (6)?
2. **Ask "what's the risk?"** — What's the security/compliance/operational impact?
3. **Choose least privilege** — The exam rewards answers that minimize access, exposure, or complexity
4. **Think governance first** — Before implementing anything technical, define the *policy*
5. **Know the tradeoffs** — Every choice (GitHub-hosted vs self-hosted, SAML vs SCIM, PAT vs GitHub App) has pros/cons; know them both

---

[← Overview](./index.md) · [Concept Map →](./concept-map.md) · [Tools Reference →](./tools-reference.md) · [Exam Guide →](./exam-guide.md)
