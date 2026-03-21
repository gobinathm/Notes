---
title: "GH-100 - Tools & CLI Reference"
description: "Command-line tools, APIs, and scripts for GitHub administration tasks"
head:
  - - meta
    - name: keywords
      content: gh-100, tools, cli, rest api, graphql, github enterprise, administration, commands
---

# GH-100: Tools & CLI Reference

[← Overview](./index.md) · [Admin Playbook →](./admin-playbook.md) · [Concept Map →](./concept-map.md) · [Exam Guide →](./exam-guide.md)

::: info Hands-On Reference for Exam Prep
This page documents real commands and APIs you'll use as a GitHub administrator. Familiarity with these tools strengthens exam confidence.
:::

---

## GitHub CLI (gh) — The Modern Admin Tool

The **GitHub CLI** is the recommended way to manage GitHub from the command line.

### Installation
```bash
# macOS (Homebrew)
brew install gh

# Linux (Debian/Ubuntu)
sudo apt-get install gh

# Verify installation
gh --version
```

### Authentication
```bash
# Authenticate with GitHub
gh auth login

# Select: GitHub.com
# Select: HTTPS or SSH (HTTPS recommended)
# Paste your Personal Access Token (PAT) when prompted
# Select: GitHub CLI

# Verify authentication
gh auth status
```

---

## Essential gh Commands for Admins

### Organization Management

```bash
# List all org members
gh org-members list --org $ORG

# Export org members to CSV
gh api -X GET /orgs/$ORG/members --paginate --jq '.[] | [.login, .id, .type]' > members.csv

# Promote user to org owner
gh api -X PUT /orgs/$ORG/members/$USERNAME/role -f role=admin

# Demote owner to member
gh api -X PUT /orgs/$ORG/members/$USERNAME/role -f role=member

# Remove user from org
gh api -X DELETE /orgs/$ORG/members/$USERNAME
```

### Repository Management

```bash
# List all repos in an org
gh repo list $ORG --limit 1000 --json name,url,isPrivate

# Export repos with permission info
gh repo list $ORG --limit 1000 --json name,visibility,pushedAt

# Enable secret scanning on a repo
gh api -X PATCH /repos/$ORG/$REPO -f security_and_analysis='{"secret_scanning":{"status":"enabled"}}'

# Enable push protection
gh api -X PATCH /repos/$ORG/$REPO -f security_and_analysis='{"secret_scanning_push_protection":{"status":"enabled"}}'

# Require pull request reviews on main branch
gh api -X PUT /repos/$ORG/$REPO/branches/main/protection \
  -f required_pull_request_reviews='{"required_approving_review_count":2}'

# Add team to repo with permission level
gh api -X PUT /repos/$ORG/$REPO/teams/$TEAM_SLUG -f permission=write
```

### Team Management

```bash
# List all teams in an org
gh api -X GET /orgs/$ORG/teams --paginate

# Add user to team
gh api -X PUT /orgs/$ORG/teams/$TEAM_SLUG/memberships/$USERNAME -f role=member

# List team members
gh api -X GET /orgs/$ORG/teams/$TEAM_SLUG/members

# Grant team repo access
gh api -X PUT /repos/$ORG/$REPO/teams/$TEAM_SLUG -f permission=write

# Remove team from repo
gh api -X DELETE /repos/$ORG/$REPO/teams/$TEAM_SLUG
```

### Audit Log Queries

```bash
# Export org audit log (last 90 days)
gh api -X GET /orgs/$ORG/audit-log --paginate -f include=all > audit-log.json

# Filter audit log with jq (see below)
gh api -X GET /orgs/$ORG/audit-log --paginate -f include=all | \
  jq '.[] | select(.action=="repo.destroy") | {actor: .actor.login, timestamp: .created_at, repo: .data.repository}'

# Search for secret scanning bypasses
gh api -X GET /orgs/$ORG/audit-log --paginate | \
  jq '.[] | select(.action | contains("secret"))'

# Identify users who changed permissions
gh api -X GET /orgs/$ORG/audit-log --paginate | \
  jq '.[] | select(.action | contains("member")) | {user: .actor.login, action: .action, target: .user.login}'
```

---

## REST API — Core Admin Operations

### Base URL
```
https://api.github.com
```

### Authentication
```bash
# Using curl with PAT
curl -H "Authorization: token $GH_TOKEN" https://api.github.com/user

# Using gh CLI (handles auth automatically)
gh api <endpoint>
```

### Organization & Members

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs/{org}/members` | GET | List all org members |
| `/orgs/{org}/members/{username}` | GET | Check membership status |
| `/orgs/{org}/memberships/{username}` | PUT | Invite or change member role |
| `/orgs/{org}/members/{username}` | DELETE | Remove member from org |
| `/orgs/{org}/outside_collaborators` | GET | List all outside collaborators |
| `/orgs/{org}/outside_collaborators/{username}` | PUT | Convert member to outside collaborator |
| `/orgs/{org}/outside_collaborators/{username}` | DELETE | Remove outside collaborator |
| `/orgs/{org}/invitations` | GET | List pending org invitations |
| `/orgs/{org}/invitations` | POST | Create org invitation |

### Teams & Team Membership

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs/{org}/teams` | GET | List all teams |
| `/orgs/{org}/teams` | POST | Create a team |
| `/orgs/{org}/teams/{team_slug}` | PATCH | Update team name/description/privacy |
| `/orgs/{org}/teams/{team_slug}` | DELETE | Delete a team |
| `/orgs/{org}/teams/{team_slug}/members` | GET | List team members |
| `/orgs/{org}/teams/{team_slug}/memberships/{username}` | PUT | Add user to team (member or maintainer) |
| `/orgs/{org}/teams/{team_slug}/memberships/{username}` | DELETE | Remove user from team |
| `/orgs/{org}/teams/{team_slug}/repos` | GET | List repos the team has access to |
| `/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | PUT | Grant team access to repo with permission |
| `/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` | DELETE | Remove team access from repo |
| `/orgs/{org}/teams/{team_slug}/teams` | GET | List child teams (nested teams) |

### Repository Access & Collaborators

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/repos/{owner}/{repo}/collaborators` | GET | List all collaborators with permissions |
| `/repos/{owner}/{repo}/collaborators/{username}` | PUT | Add collaborator with permission level |
| `/repos/{owner}/{repo}/collaborators/{username}` | DELETE | Remove collaborator |
| `/repos/{owner}/{repo}/collaborators/{username}/permission` | GET | Check user's permission level |
| `/repos/{owner}/{repo}/teams` | GET | List teams with access to repo |
| `/repos/{owner}/{repo}` | PATCH | Update repo settings (visibility, features) |
| `/repos/{owner}/{repo}/transfer` | POST | Transfer repo to another org/user |

### Branch Protection & Rulesets

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/repos/{owner}/{repo}/branches/{branch}/protection` | GET | Get branch protection rules |
| `/repos/{owner}/{repo}/branches/{branch}/protection` | PUT | Set branch protection rules |
| `/repos/{owner}/{repo}/branches/{branch}/protection` | DELETE | Remove branch protection |
| `/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks` | GET/PATCH | Manage required status checks |
| `/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews` | GET/PATCH | Manage required reviews |
| `/repos/{owner}/{repo}/branches/{branch}/protection/restrictions` | GET | Who can push to branch |
| `/repos/{owner}/{repo}/rulesets` | GET | List repository rulesets |
| `/repos/{owner}/{repo}/rulesets` | POST | Create a ruleset |
| `/repos/{owner}/{repo}/rulesets/{ruleset_id}` | GET/PUT/DELETE | Get, update, or delete a ruleset |
| `/orgs/{org}/rulesets` | GET/POST | Org-level rulesets |

### Security Alerts & Scanning

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/repos/{owner}/{repo}/dependabot/alerts` | GET | List Dependabot alerts |
| `/repos/{owner}/{repo}/dependabot/alerts/{alert_number}` | PATCH | Dismiss or reopen Dependabot alert |
| `/repos/{owner}/{repo}/secret-scanning/alerts` | GET | List secret scanning alerts |
| `/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` | PATCH | Resolve/reopen secret scanning alert |
| `/repos/{owner}/{repo}/code-scanning/alerts` | GET | List code scanning (CodeQL) alerts |
| `/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}` | PATCH | Dismiss code scanning alert |
| `/repos/{owner}/{repo}/code-scanning/analyses` | GET | List code scanning analyses |
| `/repos/{owner}/{repo}/vulnerability-alerts` | PUT | Enable Dependabot alerts |
| `/repos/{owner}/{repo}/vulnerability-alerts` | DELETE | Disable Dependabot alerts |
| `/orgs/{org}/security-managers` | GET | List security manager teams |
| `/orgs/{org}/security-managers/teams/{team_slug}` | PUT/DELETE | Add/remove security manager team |

### Secrets & Variables (Actions)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/repos/{owner}/{repo}/actions/secrets` | GET | List repo-level secrets |
| `/repos/{owner}/{repo}/actions/secrets/{secret_name}` | PUT/DELETE | Create/update or delete repo secret |
| `/orgs/{org}/actions/secrets` | GET | List org-level secrets |
| `/orgs/{org}/actions/secrets/{secret_name}` | PUT/DELETE | Create/update or delete org secret |
| `/repos/{owner}/{repo}/actions/variables` | GET | List repo-level variables |
| `/repos/{owner}/{repo}/environments/{env_name}/secrets` | GET | List environment-level secrets |
| `/repos/{owner}/{repo}/environments` | GET | List deployment environments |
| `/repos/{owner}/{repo}/environments/{env_name}` | PUT | Create or update environment with protection rules |

### Audit Log & Enterprise

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs/{org}/audit-log` | GET | Query org audit log (GHEC) |
| `/enterprises/{enterprise}/audit-log` | GET | Query enterprise audit log |
| `/orgs/{org}/settings/billing/actions` | GET | Actions billing usage |
| `/orgs/{org}/settings/billing/packages` | GET | Packages billing usage |
| `/enterprises/{enterprise}/settings/billing/actions` | GET | Enterprise Actions billing |

### GitHub Apps & Installations

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs/{org}/installations` | GET | List GitHub App installations in org |
| `/app/installations/{installation_id}/access_tokens` | POST | Generate installation access token |
| `/orgs/{org}/installation` | GET | Get org installation for authenticated app |
| `/installation/repositories` | GET | List repos accessible to the app installation |

### Example: Exporting All Repos with Their Security Status

```bash
gh api -X GET /orgs/$ORG/repos --paginate \
  --jq '.[] | {name: .name, secret_scanning: .security_and_analysis.secret_scanning.status, push_protection: .security_and_analysis.secret_scanning_push_protection.status}' \
  | jq -s 'sort_by(.name)' > security-status.json
```

---

## GraphQL — Advanced Queries

GitHub's **GraphQL API** allows complex, nested queries in a single request.

### Basic Query Structure
```graphql
query {
  organization(login: "your-org") {
    name
    members(first: 100) {
      edges {
        node {
          login
          name
        }
      }
    }
  }
}
```

### Running GraphQL Queries

```bash
# Using gh CLI
gh api graphql -f query='
  query {
    organization(login: "'$ORG'") {
      name
      members(first: 10) {
        edges {
          node {
            login
          }
        }
      }
    }
  }
'

# Save to file for reuse
cat > query.graphql << 'EOF'
query {
  organization(login: "your-org") {
    teams(first: 100) {
      edges {
        node {
          name
          members(first: 100) {
            totalCount
          }
        }
      }
    }
  }
}
EOF

gh api graphql --input query.graphql
```

### Example: Query SAML Identity for a User

```graphql
query {
  organization(login: "your-org") {
    samlIdentityProvider {
      externalIdentities(first: 10, userName: "octocat") {
        edges {
          node {
            samlIdentity {
              nameId
            }
            scimIdentity {
              username
            }
            user {
              login
            }
          }
        }
      }
    }
  }
}
```

### Example: List Branch Protection Rules

```graphql
query {
  repository(owner: "your-org", name: "your-repo") {
    branchProtectionRules(first: 10) {
      nodes {
        pattern
        requiresApprovingReviews
        requiredApprovingReviewCount
        requiresStatusChecks
        requiresCodeOwnerReviews
        dismissesStaleReviews
        isAdminEnforced
        restrictsPushes
      }
    }
  }
}
```

### Example: Org Members with Roles

```graphql
query {
  organization(login: "your-org") {
    membersWithRole(first: 100) {
      edges {
        role
        node {
          login
          name
          email
        }
      }
    }
  }
}
```

### Example: Repository Collaborators and Permissions

```graphql
query {
  repository(owner: "your-org", name: "your-repo") {
    collaborators(first: 100) {
      edges {
        permission
        node {
          login
        }
      }
    }
  }
}
```

### Example: Enterprise SSO Configuration

```graphql
query {
  enterprise(slug: "your-enterprise") {
    ownerInfo {
      samlIdentityProvider {
        ssoUrl
        issuer
        digestMethod
        signatureMethod
      }
    }
  }
}
```

### Example: Audit Log via GraphQL

```graphql
query {
  organization(login: "your-org") {
    auditLog(first: 100, query: "action:repo.destroy") {
      edges {
        node {
          action
          actor {
            login
          }
          createdAt
          ... on AuditLogEvent {
            resourcePath
          }
        }
      }
    }
  }
}
```

---

## jq — JSON Processing for Audit Logs & API Responses

**jq** is a powerful JSON query tool. Essential for parsing audit logs and API responses.

### Installation
```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

### Common Patterns for Admin Tasks

#### Filter audit log for specific action
```bash
# Find all "repo.destroy" events
gh api /orgs/$ORG/audit-log --paginate | jq '.[] | select(.action=="repo.destroy")'

# Find secret scanning bypasses
gh api /orgs/$ORG/audit-log --paginate | jq '.[] | select(.action | contains("secret_scanning"))'
```

#### Extract specific fields
```bash
# Get login, action, and timestamp
gh api /orgs/$ORG/audit-log --paginate | jq '.[] | {user: .actor.login, action, created_at}'
```

#### Count events by action
```bash
gh api /orgs/$ORG/audit-log --paginate | jq 'group_by(.action) | map({action: .[0].action, count: length}) | sort_by(.count) | reverse'
```

#### Filter by date
```bash
# Events from the last 7 days
gh api /orgs/$ORG/audit-log --paginate | jq "
  now as \$now |
  .[] |
  select((.created_at | fromdateiso8601) > (\$now - 604800))
"
```

#### Identify over-privileged users
```bash
# Find users with "owner" role
gh api /orgs/$ORG/members --paginate | jq '.[] | select(.role=="admin") | .login'
```

---

## GitHub Enterprise Server (GHES) — Admin Tools

### Support Bundle (Diagnostics)

```bash
# SSH into GHES appliance
ssh admin@github.example.com

# Generate support bundle
ghe-support-bundle -o /tmp/support-bundle.tar.gz

# The bundle includes:
# - System logs
# - Configuration files (sanitized)
# - Diagnostics (disk space, memory, processes)
# - Database stats
# - Git operations stats

# SCP bundle to local machine for analysis
scp admin@github.example.com:/tmp/support-bundle.tar.gz .

# Extract and review
tar -xzf support-bundle.tar.gz
ls -la support-bundle/
cat support-bundle/diagnostics.json
```

### Common GHES Admin Commands

```bash
# Check GHES version
ssh admin@github.example.com ghe-version

# Check system health
ssh admin@github.example.com ghe-health-check

# Manage services
ssh admin@github.example.com ghe-service-status
ssh admin@github.example.com ghe-service-stop  <service>
ssh admin@github.example.com ghe-service-start <service>

# Reindex search
ssh admin@github.example.com ghe-es-index-rebuild

# Backup GHES
ssh admin@github.example.com ghe-backup

# Restore from backup
ssh admin@github.example.com ghe-restore 192.168.1.100 BACKUP_SNAPSHOT
```

---

## Secret Management & History Scrubbing

### BFG Repo Cleaner (Recommended for Removing Secrets)

```bash
# Install BFG
brew install bfg  # macOS
sudo apt-get install bfg  # Linux

# Create a list of secrets to remove
cat > secrets.txt << 'EOF'
ghp_xxxxxxxxxxxxxxxxxxx
sk_live_xxxxxxxxxxxxx
dB_PASSWORD=
EOF

# Mirror the repo (no working directory, just objects)
git clone --mirror https://github.com/$ORG/$REPO.git $REPO.git

# Use BFG to remove secrets
bfg --replace-text secrets.txt $REPO.git

# Remove BFG's reflog to finalize
cd $REPO.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force-push cleaned history
git push --force-with-lease

# Everyone must re-clone
```

### Git Filter-Branch (Legacy but Valid)

```bash
# Remove a file from all commits
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch config/secrets.yml' \
  --prune-empty --tag-name-filter cat -- --all

# Remove lines matching a pattern
git filter-branch --force -f \
  --tree-filter 'sed -i "/password=/d" config.env' \
  --prune-empty -- --all

# After filtering, force-push
git push origin --force-with-lease --all
```

---

## Audit Log Streaming (Advanced)

### Export Audit Log to SIEM (Splunk, Datadog, etc.)

```bash
# Fetch and stream audit log to Splunk HTTP Event Collector
curl -H "Authorization: Splunk $SPLUNK_HEC_TOKEN" \
  -X POST https://splunk.example.com:8088/services/collector \
  -d @audit-log.json
```

### Webhook-Based Audit Log Ingestion

```bash
# GitHub can send audit log events to a webhook
# Configure in Enterprise Settings → Audit Log → Webhook configuration

# Example webhook receiver (Node.js)
const express = require('express');
const crypto = require('crypto');

app.post('/webhook', (req, res) => {
  // Verify GitHub signature
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const hash = 'sha256=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== hash) return res.status(401).send('Unauthorized');

  // Process audit log event
  const auditLog = req.body.audit_log;
  console.log(`Action: ${auditLog.action}, User: ${auditLog.actor.login}`);

  res.status(200).send('OK');
});
```

---

## Useful Admin Scripts

### Bulk Enable Secret Scanning Across Organization

```bash
#!/bin/bash
ORG=$1

# Get all repos
REPOS=$(gh repo list $ORG --limit 1000 -q '.[] | .name')

for REPO in $REPOS; do
  echo "Enabling secret scanning on $REPO..."
  gh api -X PATCH /repos/$ORG/$REPO \
    -f security_and_analysis='{"secret_scanning":{"status":"enabled"}}' 2>/dev/null && \
    echo "✓ $REPO" || echo "✗ $REPO (might be archived or private)"
done
```

### Identify Users with Admin Access on Multiple Repos

```bash
#!/bin/bash
ORG=$1

# Get all repos
REPOS=$(gh repo list $ORG --limit 1000 -q '.[] | .name')

# Store results
declare -A ADMIN_USERS

for REPO in $REPOS; do
  # Get collaborators with admin access
  ADMINS=$(gh api /repos/$ORG/$REPO/collaborators --paginate | \
    jq -r '.[] | select(.permissions.admin==true) | .login')

  for ADMIN in $ADMINS; do
    ADMIN_USERS[$ADMIN]=$((${ADMIN_USERS[$ADMIN]:-0} + 1))
  fi
done

# Print users with admin on multiple repos
for USER in "${!ADMIN_USERS[@]}"; do
  if [ ${ADMIN_USERS[$USER]} -gt 1 ]; then
    echo "$USER: ${ADMIN_USERS[$USER]} repos"
  fi
done | sort -t: -k2 -rn
```

### Audit Team Permissions Matrix

```bash
#!/bin/bash
ORG=$1

echo "Team,Repository,Permission" > permissions.csv

TEAMS=$(gh api /orgs/$ORG/teams --paginate -q '.[] | .slug')

for TEAM in $TEAMS; do
  REPOS=$(gh api /orgs/$ORG/teams/$TEAM/repos --paginate -q '.[] | .name')

  for REPO in $REPOS; do
    PERMS=$(gh api /repos/$ORG/$REPO/teams/$TEAM -q '.permission')
    echo "$TEAM,$REPO,$PERMS" >> permissions.csv
  fi
done

echo "Saved to permissions.csv"
```

---

## Troubleshooting: Common Command Patterns

### Check Authentication
```bash
# Verify gh auth
gh auth status

# Test API access
gh api /user
```

### Debug API Calls
```bash
# Add verbose flag to see request/response
gh api --input /repos/$ORG/$REPO -v

# Format JSON output
gh api /repos/$ORG/$REPO -q '.name, .visibility'
```

### Handle Rate Limiting
```bash
# Check rate limit status
gh api /rate_limit

# GraphQL queries have separate rate limits
gh api graphql -f query='{ viewer { login } }' # Shows rate limit in response headers

# Wait before retrying
sleep 60
```

---

## Admin-Focused gh CLI Quick Reference

### Access & Permissions (Domain 4)

```bash
# Check a user's permission on a repo
gh api /repos/$ORG/$REPO/collaborators/$USERNAME/permission -q '.permission'

# List outside collaborators across the org
gh api /orgs/$ORG/outside_collaborators --paginate -q '.[] | .login'

# Add security manager team
gh api -X PUT /orgs/$ORG/security-managers/teams/$TEAM_SLUG

# List org invitations (pending)
gh api /orgs/$ORG/invitations --paginate -q '.[] | {login: .login, role: .role, inviter: .inviter.login}'

# List rulesets on a repo
gh ruleset list --repo $ORG/$REPO

# View a specific ruleset
gh ruleset view --repo $ORG/$REPO $RULESET_ID
```

### Security & Compliance (Domain 5)

```bash
# List Dependabot alerts
gh api /repos/$ORG/$REPO/dependabot/alerts -q '.[] | {package: .dependency.package.name, severity: .security_advisory.severity, state: .state}'

# List secret scanning alerts
gh api /repos/$ORG/$REPO/secret-scanning/alerts -q '.[] | {type: .secret_type_display_name, state: .state, created: .created_at}'

# List code scanning alerts
gh api /repos/$ORG/$REPO/code-scanning/alerts -q '.[] | {rule: .rule.id, severity: .rule.severity, state: .state}'

# Enable Dependabot alerts on a repo
gh api -X PUT /repos/$ORG/$REPO/vulnerability-alerts

# Create or update a deployment environment with reviewers
gh api -X PUT /repos/$ORG/$REPO/environments/production \
  -f 'reviewers=[{"type":"User","id":12345}]' \
  -f 'deployment_branch_policy={"protected_branches":true,"custom_branch_policies":false}'
```

### GitHub Actions (Domain 6)

```bash
# List org-level secrets (names only — values are never exposed)
gh api /orgs/$ORG/actions/secrets -q '.secrets[] | .name'

# Set a repo-level secret
gh secret set MY_SECRET --repo $ORG/$REPO --body "secret-value"

# Set an org-level secret with repo visibility
gh secret set MY_SECRET --org $ORG --visibility selected --repos "$REPO1,$REPO2"

# List self-hosted runners for an org
gh api /orgs/$ORG/actions/runners -q '.runners[] | {name: .name, os: .os, status: .status, labels: [.labels[].name]}'

# List runner groups
gh api /orgs/$ORG/actions/runner-groups -q '.runner_groups[] | {name: .name, default: .default, visibility: .visibility}'
```

---

## Study Tip: Tool-Domain Mapping

| Tool | Relevant Domain | Use Case |
|------|---|---|
| `gh repo list` | Domain 4 | Audit repository inventory |
| `gh api /audit-log` | Domain 5 | Track security and access changes |
| `ghe-support-bundle` | Domain 1 | Troubleshoot GHES issues |
| BFG / `git filter-branch` | Domain 5 | Remove secrets from history |
| `jq` | Domain 5 | Parse audit log for compliance reports |
| GraphQL audit log | Domain 5 | Complex queries (e.g., "who accessed production secrets?") |

---

[← Overview](./index.md) · [Admin Playbook →](./admin-playbook.md) · [Concept Map →](./concept-map.md) · [Exam Guide →](./exam-guide.md)
