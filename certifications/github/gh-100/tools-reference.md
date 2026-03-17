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

### Organization Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/orgs/$ORG/members` | GET | List org members |
| `/orgs/$ORG/members/$USERNAME` | PUT/DELETE | Add/remove member |
| `/orgs/$ORG/audit-log` | GET | Query audit log |
| `/orgs/$ORG/teams` | GET/POST | List/create teams |
| `/orgs/$ORG/teams/$TEAM_SLUG/members` | GET/PUT/DELETE | Manage team membership |
| `/orgs/$ORG/secrets` | GET | List org secrets |

### Repository Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/repos/$ORG/$REPO/vulnerability-alerts` | GET | List Dependabot alerts |
| `/repos/$ORG/$REPO/secret-scanning/alerts` | GET | List secret scanning alerts |
| `/repos/$ORG/$REPO/code-scanning/alerts` | GET | List CodeQL alerts |
| `/repos/$ORG/$REPO/branches/BRANCH/protection` | GET/PUT | Manage branch protection |
| `/repos/$ORG/$REPO/teams` | GET | List teams with repo access |

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
