---
title: "GH-200 - Exam Tips & Strategy"
description: "Exam preparation strategies, tips, and gotchas for GH-200 GitHub Actions"
---

# GH-200: Exam Tips & Strategy

Strategic guidance for exam preparation and taking the GH-200 GitHub Actions exam.

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [← Study Notes](./notes.md)

---

## ⚠️ Exam Traps & Gotchas

Common mistakes and tricky areas that often appear on the exam.

### Trap 1: Confusing Workflow Events

**What it looks like:**
Questions about when workflows trigger, especially with `pull_request` vs `pull_request_target`.

**Why it's wrong:**
- `pull_request` runs in context of the PR branch (safer, but can't access secrets if from fork)
- `pull_request_target` runs in context of base branch (can access secrets, but dangerous with untrusted code)

**Remember:**
- Use `pull_request` for most PR workflows
- Only use `pull_request_target` when you need secrets AND have proper input validation

**Example:**
```yaml
❌ Wrong: Using pull_request_target without validation
on: pull_request_target
steps:
  - run: ${{ github.event.pull_request.title }}  # Dangerous!

✅ Correct: Using pull_request for PR checks
on: pull_request
steps:
  - uses: actions/checkout@v4
  - run: npm test
```

---

### Trap 2: Matrix Strategy Assumptions

**What it looks like:**
Assuming matrix jobs run sequentially or thinking `fail-fast: false` means "don't fail at all"

**Why people get confused:**
- Matrix jobs run in **parallel** by default
- `fail-fast: true` (default) cancels remaining jobs if one fails
- `fail-fast: false` lets all jobs complete even if some fail

**Remember:**
- Matrix = parallel execution
- Use `max-parallel` to limit concurrency
- `fail-fast` controls cancellation, not failure behavior

---

### Trap 3: Action Version Pinning

**What it looks like:**
Questions about the "most secure" way to reference actions.

**Why it's tricky:**
- `@v4` - convenient but can break
- `@main` - always latest, least stable
- `@<sha>` - most secure, immutable

**Remember:**
- **Production**: Use full commit SHA
- **Development**: Major version (`@v4`) is acceptable
- **Never**: Use branch names in production

```yaml
❌ Risky: actions/checkout@main
⚠️  Acceptable: actions/checkout@v4
✅ Most Secure: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab
```

---

### Trap 4: GITHUB_TOKEN Permissions

**What it looks like:**
Not understanding default permissions or when to use PAT vs GITHUB_TOKEN.

**Why people get confused:**
- GITHUB_TOKEN is auto-generated per workflow
- Permissions can be set at workflow or job level
- Some actions need specific permissions

**Remember:**
- Default permissions vary by repository settings
- Always use least privilege
- GITHUB_TOKEN expires after workflow completes

```yaml
# ✅ Explicit permissions (best practice)
permissions:
  contents: read
  pull-requests: write

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

---

### Trap 5: Script Injection Vulnerabilities

**What it looks like:**
Using untrusted input directly in bash commands.

**Why it's dangerous:**
User-controlled input (issue titles, PR descriptions, etc.) can contain malicious commands.

**Remember:**
- **Always** use intermediate environment variables
- **Never** directly interpolate user input into run commands

```yaml
❌ VULNERABLE:
- run: echo "Title: ${{ github.event.issue.title }}"

✅ SAFE:
- name: Print title
  env:
    TITLE: ${{ github.event.issue.title }}
  run: echo "Title: $TITLE"
```

---

## 📌 Things NOT to Overstudy

Focus your time wisely - these topics are less likely to appear or appear in less detail.

### Low Priority Topics

**Specific Action Implementation Details**
- Why: Exam tests concepts, not memorizing every action's parameters
- What to know: Understand what actions do, not every input/output
- Time to spend: Minimal - focus on patterns

**Advanced Docker Container Actions**
- Why: Less common than JavaScript and Composite actions
- What to know: Know they exist, basic differences from other types
- Time to spend: Brief overview

**GitHub CLI in Workflows**
- Why: Less commonly tested than direct API usage
- What to know: Know it's available, basic use cases
- Time to spend: Quick review

**Workflow Visualization Features**
- Why: UI features, not core functionality
- What to know: They exist
- Time to spend: Skip

### High Priority Topics (Study These More!)

- **Workflow syntax and structure** - Core foundation
- **Event triggers and filters** - Frequently tested
- **Secrets management** - Security focus
- **Reusable workflows** - Modern best practice
- **Permissions and security** - Critical for exam
- **Matrix strategies** - Common in scenarios
- **Composite actions** - Creating reusable components
- **Contexts and expressions** - Used everywhere

---

## 🧠 Decision Matrix (How to Choose)

When exam questions ask "Which option is BEST?" - use these decision trees.

### When to use JavaScript vs Docker vs Composite Actions

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| Cross-platform (Windows/Linux/macOS) | JavaScript | Runs on all runners |
| Need specific system dependencies | Docker | Full environment control |
| Combine existing actions | Composite | No code, just YAML |
| Custom Node.js logic | JavaScript | Native execution |
| Linux-only with system packages | Docker | Full container |

### Workflow Reusability: Reusable Workflow vs Composite Action

| Scenario | Use Reusable Workflow | Use Composite Action |
|----------|----------------------|---------------------|
| Share entire job/multiple jobs | ✅ | ❌ |
| Use within a single step | ❌ | ✅ |
| Need different runners per call | ✅ | ❌ |
| Combine multiple actions | Both work | ✅ (simpler) |
| Cross-repo sharing | Both work | ✅ (easier to version) |

### Event Triggers Decision Tree

```
Need: Trigger workflow on code changes
    │
    ├─ Code in PR from fork?
    │   ├─ Yes, need secrets → Use pull_request_target (with validation!)
    │   └─ Yes, no secrets → Use pull_request
    │
    ├─ Code pushed to branch?
    │   └─→ Use push with branch filter
    │
    └─ Manual trigger needed?
        └─→ Use workflow_dispatch
```

### Secret Access Decision

```
Need: Access sensitive data
    │
    ├─ Repository secret → Use secrets.SECRET_NAME
    │
    ├─ Environment-specific → Use environment: name + environment secrets
    │
    ├─ Organization-wide → Use organization secrets
    │
    └─ Third-party service → Use OIDC (if supported) or PAT
```

---

## 📋 Cheat Sheet (Last-Day Review)

Quick reference for the day before the exam.

### Must-Know Workflow Syntax

```yaml
# Basic structure
name: Workflow Name
on: [push, pull_request]
env:
  GLOBAL_VAR: value

jobs:
  job-id:
    runs-on: ubuntu-latest
    env:
      JOB_VAR: value
    steps:
      - name: Step name
        run: echo "command"
        env:
          STEP_VAR: value

# Matrix
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [16, 18, 20]
  fail-fast: false
  max-parallel: 2

# Conditionals
if: github.ref == 'refs/heads/main'
if: success()
if: failure()
if: always()

# Dependencies
needs: [build, test]

# Concurrency
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Key Contexts

| Context | Common Uses |
|---------|-------------|
| `github.event_name` | Check which event triggered |
| `github.ref` | Branch or tag reference |
| `github.sha` | Commit SHA |
| `github.actor` | User who triggered |
| `github.repository` | owner/repo name |
| `runner.os` | Linux, Windows, macOS |
| `secrets.GITHUB_TOKEN` | Auto-generated token |
| `steps.<id>.outputs.<name>` | Step outputs |

### Workflow Commands

```bash
# Set output
echo "result=value" >> $GITHUB_OUTPUT

# Set env var (available in later steps)
echo "VAR_NAME=value" >> $GITHUB_ENV

# Add to PATH
echo "/path/to/bin" >> $GITHUB_PATH

# Group logs
echo "::group::Group Title"
echo "Content"
echo "::endgroup::"

# Mask sensitive value
echo "::add-mask::$SECRET_VALUE"

# Set error
echo "::error::Error message"

# Set warning
echo "::warning::Warning message"
```

### Action Metadata (action.yml)

```yaml
name: 'Action Name'
description: 'Description'
inputs:
  input-name:
    description: 'Input description'
    required: true
    default: 'value'
outputs:
  output-name:
    description: 'Output description'
runs:
  using: 'composite'  # or 'node20' or 'docker'
  steps:              # for composite
    - run: command
```

### Common Permissions

```yaml
permissions:
  contents: read      # Clone repo
  contents: write     # Push changes
  pull-requests: write # Comment on PRs
  issues: write       # Create/edit issues
  packages: write     # Publish packages
  id-token: write     # OIDC token
```

### Keywords That Signal Answers

| Keyword in Question | Usually Points To |
|---------------------|-------------------|
| "Most secure" | Commit SHA pinning, least privilege, OIDC |
| "Cross-platform" | JavaScript actions, not Docker |
| "Reusable" | Reusable workflows or composite actions |
| "Least privilege" | Minimal permissions, scoped secrets |
| "Cost-effective" | Caching, matrix optimization, concurrency |
| "Fastest" | Caching, artifacts, parallel jobs |

---

## 🔐 Security & Best Practices

Security considerations that commonly appear on the exam.

### Security Checklist

- [ ] Pin actions to commit SHA in production
- [ ] Use least privilege permissions (explicit)
- [ ] Never use untrusted input in run commands directly
- [ ] Use environment secrets for sensitive deployments
- [ ] Audit third-party actions before using
- [ ] Use OIDC instead of long-lived credentials when possible
- [ ] Enable branch protection for important branches
- [ ] Review workflow logs for exposed secrets (auto-masked but check)

### Common Security Anti-Patterns

**❌ DON'T:**
- Use `pull_request_target` without input validation
- Give `permissions: write-all`
- Store secrets in code or commit history
- Use `@main` or `@master` for action versions
- Print secrets (even masked, avoid in logs)
- Trust all marketplace actions blindly

**✅ DO:**
- Use intermediate environment variables for user input
- Set explicit, minimal permissions
- Rotate secrets regularly
- Pin actions to SHA
- Use branch protection rules
- Review action source code before using
- Use environments for deployments

### Script Injection Prevention

```yaml
# ❌ VULNERABLE
- run: |
    echo "PR title: ${{ github.event.pull_request.title }}"
    echo "Comment: ${{ github.event.comment.body }}"

# ✅ SECURE
- name: Handle user input
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
    COMMENT: ${{ github.event.comment.body }}
  run: |
    echo "PR title: $PR_TITLE"
    echo "Comment: $COMMENT"
```

---

## 🚀 Performance & Optimization

Performance best practices that frequently appear in exam scenarios.

### Optimization Strategies

**Strategy 1: Dependency Caching**
- What: Cache `node_modules`, `pip`, `maven` dependencies
- When: Every workflow that installs dependencies
- Impact: 2-10x faster install times

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # Automatic caching
```

**Strategy 2: Parallel Jobs**
- What: Run independent jobs simultaneously
- When: Tests can run independently
- Impact: Total time = longest job (not sum)

**Strategy 3: Matrix Optimization**
- What: Use `max-parallel` to control concurrency
- When: Rate limits or resource constraints
- Impact: Prevents overwhelming external services

**Strategy 4: Artifacts for Inter-Job Data**
- What: Pass build outputs between jobs
- When: Deploy job needs build artifacts
- Impact: No need to rebuild

```yaml
# Upload
- uses: actions/upload-artifact@v4
  with:
    name: build
    path: dist/

# Download in another job
- uses: actions/download-artifact@v4
  with:
    name: build
```

### Performance Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Rebuilding dependencies | Wastes time | Use caching |
| Sequential independent jobs | Slower total time | Remove unnecessary `needs` |
| No concurrency control | Multiple runs waste resources | Use concurrency groups |
| Large artifacts | Slow upload/download | Only upload what's needed |

---

## 🧩 Troubleshooting & Debugging

Common problems and how to diagnose them.

### Debugging Checklist

When a workflow isn't working:

1. [ ] Check workflow syntax (YAML valid?)
2. [ ] Verify event trigger conditions
3. [ ] Check job/step conditionals (`if:`)
4. [ ] Review permissions (GITHUB_TOKEN has access?)
5. [ ] Check secrets are set correctly
6. [ ] Verify runner labels for self-hosted
7. [ ] Look for script injection issues
8. [ ] Check action versions (deprecated?)

### Common Error Messages

**Error: "Resource not accessible by integration"**
- **Cause**: GITHUB_TOKEN lacks required permissions
- **Solution**: Add explicit permissions to workflow
- **Prevention**: Always set minimal required permissions

```yaml
permissions:
  contents: write  # Add the needed permission
```

**Error: "Unable to resolve action"**
- **Cause**: Action doesn't exist or version is wrong
- **Solution**: Check action name, repo, and version tag
- **Prevention**: Use actions from trusted sources

**Error: "No runner available"**
- **Cause**: Self-hosted runner offline or wrong labels
- **Solution**: Check runner status, verify labels match
- **Prevention**: Monitor runner health, use fallback runners

**Error: "Workflow file is invalid"**
- **Cause**: YAML syntax error
- **Solution**: Use YAML validator, check indentation
- **Prevention**: Use IDE with YAML linting

### Enable Debug Logging

Set repository secrets:
- `ACTIONS_STEP_DEBUG`: `true` - Detailed step logs
- `ACTIONS_RUNNER_DEBUG`: `true` - Runner diagnostic logs

---

## 📊 Exam Preparation Timeline

### 2 Weeks Before
- [ ] Complete all domain notes
- [ ] Review all exam traps & gotchas
- [ ] Practice writing workflows from scratch
- [ ] Focus on security and permissions topics

### 1 Week Before
- [ ] Review decision matrices
- [ ] Memorize key syntax and contexts
- [ ] Practice troubleshooting scenarios
- [ ] Review reusable workflows and actions

### 2 Days Before
- [ ] Review cheat sheet
- [ ] Quick pass through exam traps
- [ ] Light review of high-priority topics
- [ ] Get good rest

### Day Before
- [ ] Final cheat sheet review (30 minutes max)
- [ ] Skim decision matrices
- [ ] Get 8 hours of sleep
- [ ] No new material!

---

## Final Tips

::: tip Remember
- **Read carefully**: "MOST secure" vs "fastest" have different answers
- **Eliminate**: Cross out obviously wrong answers first
- **Keywords**: "Cross-platform" = JavaScript, "Linux-only" might be Docker
- **Security**: When in doubt, choose the more secure option
- **Permissions**: Less is more - choose least privilege
:::

::: warning Don't
- Don't overthink simple questions
- Don't assume all actions need Docker
- Don't forget about composite actions (they're popular now)
- Don't panic if you see new actions - focus on concepts
:::

::: danger Exam Gotchas
- `pull_request` vs `pull_request_target` - know the difference!
- Matrix jobs run in **parallel**, not sequentially
- `fail-fast: false` means "don't cancel" not "don't fail"
- Commit SHA is most secure, not version tags
:::

---

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [← Study Notes](./notes.md)

*Last Updated: 2026-01-09*
