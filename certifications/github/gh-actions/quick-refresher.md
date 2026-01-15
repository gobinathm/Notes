---
title: "GH-200 - Quick Refresher"
description: "Last-minute cram session for GH-200 GitHub Actions exam"
---

# GH-200: GitHub Actions Last-Minute Refresher

[← Back to Overview](./index.md)

::: danger Final Review
This page is designed for the final "cram" session before stepping into the **GH-200** exam.
:::

---

## 1. Workflow Architecture & Hierarchy

**Hierarchy:** Workflow → Jobs → Steps → Actions.

**Execution Models:**
- **Jobs:** Parallel by default. Use `needs: [job_id]` for sequential execution.
- **Steps:** Always Sequential on the same runner.

**Workflow Files:**
- Location: `.github/workflows/`
- Format: Must be `.yml` or `.yaml`

---

## 2. Runner Types & Selection

### GitHub-hosted Runners

- Managed by GitHub
- Clean VM for every job
- Specific OS labels: `ubuntu-latest`, `windows-2022`, `macos-latest`

### Self-hosted Runners

- Managed by you
- You handle OS updates, security, and scaling
- Use: `runs-on: self-hosted`
- Can add custom labels: `runs-on: [self-hosted, linux, x64]`

### Default Shells

| OS | Default Shell |
|---|---|
| **Linux/macOS** | `bash` |
| **Windows** | `pwsh` (PowerShell Core) |

---

## 3. Triggering Workflows (`on:`)

### Common Events

```yaml
on:
  push:                          # Code pushed
  pull_request:                  # PR events
  schedule:                      # Cron-based
    - cron: '0 0 * * *'         # Daily at midnight
  workflow_dispatch:             # Manual trigger
  repository_dispatch:           # External API trigger
```

### Activity Types

```yaml
on:
  pull_request:
    types: [opened, synchronized, reopened]
```

### Filters

```yaml
on:
  push:
    branches: [main, 'release/**']    # Branch filter
    tags: ['v*']                      # Tag filter
    paths:
      - '**.js'                       # Path filter (glob)
      - '!docs/**'                    # Ignore docs
```

### Webhook Events

Can trigger on: `star`, `issues`, `release`, `deployment`, etc.

---

## 4. Custom Actions (The Three Types)

| Feature | JavaScript | Docker Container | Composite |
|---------|-----------|------------------|-----------|
| **Runtime** | Node.js | Any (packaged in image) | Existing Runner Shell |
| **Metadata** | `using: 'node20'` | `using: 'docker'` | `using: 'composite'` |
| **Speed** | ⚡ Fastest (no build) | 🐌 Slower (image pull/build) | ⚡ Variable |
| **OS Support** | ✅ All (Linux, Win, Mac) | ❌ Linux Only | ✅ All |
| **Best For** | Quick operations | Heavy dependencies | Bundle steps |

---

## 5. Metadata & Workflow Commands

### action.yml Structure

**Mandatory keys:** `name`, `description`, `runs`

```yaml
name: 'My Action'
description: 'Does something'
inputs:
  my-input:
    description: 'Input description'
    required: true
runs:
  using: 'node20'
  main: 'index.js'
```

### Workflow Commands

| Command | Purpose | Scope |
|---------|---------|-------|
| `$GITHUB_ENV` | Set environment variables | All subsequent steps in same job |
| `$GITHUB_OUTPUT` | Set step outputs | Accessible via `${{ steps.id.outputs.key }}` |
| `$GITHUB_STEP_SUMMARY` | Job summary markdown | Visible in workflow run UI |
| `$GITHUB_PATH` | Add to PATH | Subsequent steps |

### Annotations

```bash
echo "::notice::Information message"
echo "::warning::Warning message"
echo "::error::Error message"
echo "::add-mask::$SECRET_VALUE"    # Masks with ***
```

---

## 6. Variables, Secrets & Contexts

### Secrets vs Variables

| Feature | Secrets | Variables |
|---------|---------|-----------|
| **Encryption** | ✅ Encrypted | ❌ Plain text |
| **Logging** | ❌ Never logged | ✅ Visible in logs |
| **Use Case** | API keys, tokens | Non-sensitive config |
| **Access** | `${{ secrets.NAME }}` | `${{ vars.NAME }}` |

### GITHUB_TOKEN

**Automatically generated** for every run:
- Permissions can be scoped: `permissions: { contents: read, pull-requests: write }`
- Expires when the job finishes
- Access: `${{ secrets.GITHUB_TOKEN }}`

### Context Variables

```yaml
${{ github.repository }}      # owner/repo
${{ github.ref }}             # refs/heads/main
${{ github.sha }}             # commit SHA
${{ github.actor }}           # username who triggered
${{ github.event_name }}      # push, pull_request, etc.

${{ runner.os }}              # Linux, Windows, macOS
${{ runner.temp }}            # temp directory path
${{ runner.workspace }}       # workspace directory

${{ job.status }}             # Job status
${{ steps.step-id.outputs.key }}  # Step output
```

---

## 7. Optimization & Persistence

### Artifacts

**Use:** Save files (binaries/logs) for manual download after a run.

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-files
    path: dist/

- uses: actions/download-artifact@v4
  with:
    name: build-files
```

**Retention:** 90 days (default)

### Caching

**Use:** Speed up builds (e.g., `node_modules`, dependencies)

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**Key Concepts:**
- **key:** Exact match required
- **restore-keys:** Fallback matches (prefix-based)

### Matrix Strategy

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [18, 20]
  fail-fast: false    # Don't cancel other jobs on failure
```

**fail-fast: false** prevents one failing version from killing all other matrix jobs.

### Concurrency

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

**Use:** Ensure only one run of a specific group is active (prevents double-deployments).

---

## 8. Environments & Deployment

### Environments

Used for: **Staging**, **Production**, etc.

```yaml
jobs:
  deploy:
    environment: production
    steps:
      - run: ./deploy.sh
```

### Protection Rules

- **Required reviewers:** Wait for approval from specific users/teams
- **Wait timer:** Delay before deployment (e.g., 5 minutes)
- **Deployment branches:** Restrict to specific branches

### Environment Secrets

Secrets only accessible when a job targets a specific environment.

**Scope:** More secure than repository-level secrets for production.

---

## 9. GitHub Advanced Security (GHAS)

| Tool | Purpose | How It Works |
|------|---------|--------------|
| **CodeQL** | Semantic code analysis | Treats code as a database; deep scanning |
| **Dependabot** | Dependency vulnerabilities | Scans manifests; automates PR updates |
| **Secret Scanning** | Find hardcoded secrets | Scans entire git history |

### Security Best Practices

✅ **DO:**
- Pin actions to full commit SHA: `actions/checkout@abc123...`
- Use `GITHUB_TOKEN` with minimal permissions
- Store sensitive data in secrets
- Enable required status checks

❌ **DON'T:**
- Expose secrets in logs
- Use `pull_request_target` without review
- Trust unchecked user input: `${{ github.event.issue.title }}`

---

## 10. Reusable Workflows vs. Composite Actions

| Feature | Reusable Workflows | Composite Actions |
|---------|-------------------|-------------------|
| **Trigger** | `on: workflow_call` | Not applicable |
| **Contains** | Multiple jobs | Multiple steps only |
| **Called with** | `uses: owner/repo/.github/workflows/file.yml@v1` | `uses: owner/repo@v1` |
| **Secrets** | Pass via `secrets:` | Inherit from caller |
| **Outputs** | Job-level | Step-level |
| **Best For** | Complete workflows | Reusable step bundles |

### Reusable Workflow Example

```yaml
# .github/workflows/reusable.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to ${{ inputs.environment }}"
```

### Composite Action Example

```yaml
# action.yml
name: 'Setup and Test'
runs:
  using: 'composite'
  steps:
    - run: npm install
      shell: bash
    - run: npm test
      shell: bash
```

---

## 🎯 Decision Trees

### When to Use Actions vs Reusable Workflows?

```
Need to share logic?
├─ Multiple steps only? → Composite Action
├─ Full job/workflow? → Reusable Workflow
└─ Complex logic with dependencies? → JavaScript/Docker Action
```

### Secret Scope Selection

```
Where should the secret be stored?
├─ Single repo? → Repository Secret
├─ Multiple repos in org? → Organization Secret
├─ Deployment-specific? → Environment Secret
└─ Temporary/generated? → GITHUB_TOKEN
```

---

## 💡 Final Minute Tips

### High-Frequency Topics

1. ⭐⭐⭐ **Workflow syntax and triggers** (40% of exam)
2. ⭐⭐⭐ **Secrets and environment variables** (30%)
3. ⭐⭐ **Reusable workflows vs actions** (20%)
4. ⭐⭐ **Concurrency and caching** (15%)
5. ⭐ **Self-hosted runners** (10%)

### Common Exam Traps

::: warning Watch Out!
- **Context vs Env vars:** `${{ env.VAR }}` vs `$VAR` in run commands
- **Expression syntax:** Use `${{ }}` in workflow keys, `$` in shell
- **needs vs if:** `needs` is for job dependencies, `if` is for conditions
- **Action pinning:** Always use commit SHA in production, not `@main`
- **pull_request_target:** Runs in base branch context (security risk!)
:::

### Quick Service Selection

**Question asks about...**
- "Easy/No-Code/Quick" → Use Marketplace Actions
- "Custom logic" → Write your own action
- "Share across repos" → Reusable workflow
- "Bundle steps" → Composite action
- "Heavy dependencies" → Docker action
- "Cross-platform" → JavaScript action

---

## 🔑 Key Limits to Remember

| Resource | Limit |
|----------|-------|
| Workflow run time | 35 days max |
| Job run time | 6 hours max |
| API requests | 1,000/hour |
| Artifact storage | 90 days retention |
| Log size | 64 KB per step |
| Workflow file size | 1 MB max |

---

## ⚡ Last 5 Minutes Before Exam

### Must Remember

1. **Hierarchy:** Workflow → Jobs (parallel) → Steps (sequential) → Actions
2. **GITHUB_TOKEN** auto-generated, expires after job
3. **Artifacts** = downloads, **Cache** = speed
4. **Reusable workflow** = jobs, **Composite** = steps
5. **fail-fast: false** in matrix = keep running on failure

### Quick Mental Check

- Can you explain the difference between artifacts and cache? ✓
- Do you know when to use composite vs reusable workflows? ✓
- Can you name 3 GitHub contexts? ✓
- Do you understand environment protection rules? ✓
- Can you write a basic matrix strategy? ✓

---

::: tip You've Got This!
Review the decision trees. Trust your preparation. Read questions carefully. Good luck! 🍀
:::

[← Back to Overview](./index.md) | [Study Notes](./notes.md) | [Exam Tips](./exam-tips.md)

*Last Updated: 2026-01-14*
