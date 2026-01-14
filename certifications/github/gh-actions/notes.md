---
title: "GH-200 - Study Notes"
description: "Detailed study notes for GH-200 GitHub Actions certification"
---

# GH-200: Study Notes

Detailed notes, examples, and key concepts for GH-200 GitHub Actions certification.

[← Back to Overview](./index.md) | [← Exam Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)

---

## Domain 1: Author and Maintain Workflows

### Event Triggers

**Key Concepts:**
- Events trigger workflow runs
- Multiple events can trigger the same workflow
- Events can be filtered by branches, paths, and other criteria

**Common Event Types:**

```yaml
# Push events
on:
  push:
    branches:
      - main
      - 'releases/**'
    paths:
      - '**.js'
      - '!docs/**'

# Pull request events
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches:
      - main

# Scheduled events (cron)
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

# Manual trigger
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        type: choice
        options:
          - dev
          - staging
          - production

# Multiple events
on: [push, pull_request, workflow_dispatch]
```

::: tip Exam Tip
Know the difference between `push` and `pull_request` triggers and when each is appropriate.
:::

**Key Event Keywords:**

| Keyword | Purpose | When to Use |
|---------|---------|-------------|
| `push` | Trigger on code push to repository | CI/CD builds, automated testing |
| `pull_request` | Trigger on PR activity | PR validation, code review automation |
| `pull_request_target` | Trigger on PR in base repo context | When forks need secrets (use carefully!) |
| `workflow_dispatch` | Manual trigger | On-demand deployments, manual testing |
| `schedule` | Time-based trigger (cron) | Nightly builds, scheduled maintenance |
| `workflow_call` | Called by other workflows | Reusable workflows |
| `repository_dispatch` | External API trigger | Integration with external systems |
| `release` | Trigger on release creation | Auto-publish packages |
| `issue_comment` | Trigger on issue/PR comments | ChatOps, automated responses |
| `branches` | Filter by branch names | Limit workflows to specific branches |
| `paths` | Filter by file paths | Run only when specific files change |
| `types` | Filter by event types | Specific PR/issue actions |

---

### Workflow Syntax

**Basic Workflow Structure:**

```yaml
name: CI Pipeline

on: [push, pull_request]

env:
  NODE_VERSION: '18'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: $&#123;&#123; env.NODE_VERSION }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

**Environment Variables:**

```yaml
# Workflow-level (available to all jobs)
env:
  WORKFLOW_VAR: 'workflow-value'

jobs:
  build:
    runs-on: ubuntu-latest
    # Job-level (available to all steps in this job)
    env:
      JOB_VAR: 'job-value'

    steps:
      # Step-level (only this step)
      - name: Use variables
        env:
          STEP_VAR: 'step-value'
        run: |
          echo "Workflow: $WORKFLOW_VAR"
          echo "Job: $JOB_VAR"
          echo "Step: $STEP_VAR"
          echo "Default: $GITHUB_WORKSPACE"
```

**Job Dependencies:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."

  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."
```

**Matrix Builds:**

```yaml
jobs:
  test:
    runs-on: $&#123;&#123; matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [16, 18, 20]
      fail-fast: false

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: $&#123;&#123; matrix.node }}
      - run: npm test
```

::: warning Common Pitfall
Remember that matrix jobs run in parallel by default. Use `max-parallel` to limit concurrency.
:::

**Key Workflow Syntax Keywords:**

| Keyword | Purpose | Example Use |
|---------|---------|-------------|
| `name` | Workflow display name | `name: CI Pipeline` |
| `on` | Event trigger configuration | `on: [push, pull_request]` |
| `env` | Environment variables | Set global/job/step variables |
| `jobs` | Define workflow jobs | Container for job definitions |
| `runs-on` | Specify runner type | `runs-on: ubuntu-latest` |
| `steps` | Ordered list of tasks | Sequential commands/actions |
| `uses` | Use a predefined action | `uses: actions/checkout@v4` |
| `run` | Execute shell command | `run: npm test` |
| `with` | Pass inputs to action | Configure action parameters |
| `needs` | Job dependencies | Control job execution order |
| `strategy` | Matrix/parallel configuration | Test multiple versions |
| `matrix` | Define matrix variables | Cross-platform testing |
| `fail-fast` | Stop on first failure | `fail-fast: true` (default) |
| `max-parallel` | Limit concurrent jobs | Control resource usage |
| `if` | Conditional execution | `if: github.ref == 'refs/heads/main'` |
| `timeout-minutes` | Job timeout limit | Prevent hanging jobs |

---

### Default Environment Variables

GitHub Actions automatically provides default environment variables in every workflow run. These are available to all steps without explicit declaration.

#### Core Default Variables

**Repository & Workflow Information:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `CI` | Always set to `true` | `true` |
| `GITHUB_ACTION` | Name of the action currently running | `run1` or action name |
| `GITHUB_ACTIONS` | Always `true` when running in Actions | `true` |
| `GITHUB_ACTOR` | Username of person/app that triggered | `octocat` |
| `GITHUB_ACTOR_ID` | ID of person/app that triggered | `1234567` |
| `GITHUB_API_URL` | GitHub API URL | `https://api.github.com` |
| `GITHUB_BASE_REF` | Base branch for PR | `main` |
| `GITHUB_ENV` | Path to set env variables | `/home/runner/work/_temp/_runner_file_commands/set_env_xxx` |
| `GITHUB_EVENT_NAME` | Event that triggered workflow | `push`, `pull_request` |
| `GITHUB_EVENT_PATH` | Path to full webhook event | `/home/runner/work/_temp/_github_workflow/event.json` |
| `GITHUB_GRAPHQL_URL` | GitHub GraphQL API URL | `https://api.github.com/graphql` |
| `GITHUB_HEAD_REF` | Head branch for PR | `feature-branch` |
| `GITHUB_JOB` | Job ID | `build` |
| `GITHUB_OUTPUT` | Path to set outputs | `/home/runner/work/_temp/_runner_file_commands/set_output_xxx` |
| `GITHUB_PATH` | Path to append to PATH | `/home/runner/work/_temp/_runner_file_commands/add_path_xxx` |
| `GITHUB_REF` | Fully-formed ref | `refs/heads/main` |
| `GITHUB_REF_NAME` | Short ref name | `main` |
| `GITHUB_REF_PROTECTED` | Is ref protected | `true` or `false` |
| `GITHUB_REF_TYPE` | Type of ref | `branch` or `tag` |
| `GITHUB_REPOSITORY` | Owner and repo name | `octocat/Hello-World` |
| `GITHUB_REPOSITORY_ID` | Repository ID | `123456789` |
| `GITHUB_REPOSITORY_OWNER` | Repository owner | `octocat` |
| `GITHUB_REPOSITORY_OWNER_ID` | Owner ID | `1234567` |
| `GITHUB_RETENTION_DAYS` | Artifact retention days | `90` |
| `GITHUB_RUN_ATTEMPT` | Run attempt number | `1`, `2`, etc. |
| `GITHUB_RUN_ID` | Unique run ID | `987654321` |
| `GITHUB_RUN_NUMBER` | Unique workflow run number | `42` |
| `GITHUB_SERVER_URL` | GitHub server URL | `https://github.com` |
| `GITHUB_SHA` | Commit SHA that triggered | `ffac537e6cbbf934b08745a378932722df287a53` |
| `GITHUB_STEP_SUMMARY` | Path for job summary | `/home/runner/work/_temp/_runner_file_commands/step_summary_xxx` |
| `GITHUB_WORKFLOW` | Workflow name | `CI` |
| `GITHUB_WORKFLOW_REF` | Workflow ref path | `octocat/hello-world/.github/workflows/ci.yml@refs/heads/main` |
| `GITHUB_WORKFLOW_SHA` | Workflow file commit SHA | `ffac537e...` |
| `GITHUB_WORKSPACE` | Default working directory | `/home/runner/work/repo-name/repo-name` |

**Runner Information:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `RUNNER_ARCH` | Architecture of runner | `X64`, `ARM`, `ARM64` |
| `RUNNER_NAME` | Name of the runner | `GitHub Actions 2` |
| `RUNNER_OS` | Operating system | `Linux`, `Windows`, `macOS` |
| `RUNNER_TEMP` | Temp directory path | `/home/runner/work/_temp` |
| `RUNNER_TOOL_CACHE` | Tool cache directory | `/opt/hostedtoolcache` |

**Examples Using Default Variables:**

```yaml
jobs:
  info:
    runs-on: ubuntu-latest
    steps:
      - name: Display workflow info
        run: |
          echo "Workflow: $GITHUB_WORKFLOW"
          echo "Repository: $GITHUB_REPOSITORY"
          echo "Branch: $GITHUB_REF_NAME"
          echo "Commit: $GITHUB_SHA"
          echo "Actor: $GITHUB_ACTOR"
          echo "Event: $GITHUB_EVENT_NAME"
          echo "Runner OS: $RUNNER_OS"
          echo "Workspace: $GITHUB_WORKSPACE"

      - name: Conditional based on branch
        if: env.GITHUB_REF_NAME == 'main'
        run: echo "Running on main branch"

      - name: Use in file paths
        run: |
          cd $GITHUB_WORKSPACE
          ls -la
```

#### PR-Specific Variables

Only available when triggered by pull request events:

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_BASE_REF` | Target branch | `main` |
| `GITHUB_HEAD_REF` | Source branch | `feature-branch` |

```yaml
on: pull_request

jobs:
  pr-info:
    runs-on: ubuntu-latest
    steps:
      - name: Show PR info
        run: |
          echo "PR from: $GITHUB_HEAD_REF"
          echo "PR to: $GITHUB_BASE_REF"
```

#### Environment Variable Precedence

When the same variable is defined at multiple levels:

```
Step-level env (highest priority)
    ↓
Job-level env
    ↓
Workflow-level env
    ↓
Default environment variables (lowest priority)
```

**Example:**

```yaml
env:
  MY_VAR: 'workflow-level'

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      MY_VAR: 'job-level'
    steps:
      - name: Step with override
        env:
          MY_VAR: 'step-level'
        run: echo $MY_VAR  # Outputs: step-level

      - name: Step without override
        run: echo $MY_VAR  # Outputs: job-level
```

#### Setting Dynamic Environment Variables

**Using GITHUB_ENV:**

```yaml
steps:
  - name: Set environment variable
    run: |
      echo "BUILD_DATE=$(date +'%Y-%m-%d')" >> $GITHUB_ENV
      echo "COMMIT_SHORT=${GITHUB_SHA:0:7}" >> $GITHUB_ENV

  - name: Use environment variables
    run: |
      echo "Build date: $BUILD_DATE"
      echo "Short commit: $COMMIT_SHORT"
```

**Multi-line Values:**

```yaml
steps:
  - name: Set multi-line variable
    run: |
      {
        echo "JSON_DATA<<EOF"
        cat << 'INNER_EOF'
      {
        "name": "test",
        "value": "data"
      }
      INNER_EOF
        echo "EOF"
      } >> $GITHUB_ENV

  - name: Use multi-line variable
    run: echo "$JSON_DATA"
```

#### Common Use Cases

**1. Build Tagging:**

```yaml
steps:
  - name: Create build tag
    run: |
      TAG="${GITHUB_REF_NAME}-${GITHUB_RUN_NUMBER}"
      echo "BUILD_TAG=$TAG" >> $GITHUB_ENV

  - name: Tag Docker image
    run: docker tag myapp:latest myapp:$BUILD_TAG
```

**2. Conditional Deployment:**

```yaml
steps:
  - name: Deploy to environment
    if: github.ref == 'refs/heads/main'
    run: |
      if [ "$RUNNER_OS" == "Linux" ]; then
        ./deploy-linux.sh
      elif [ "$RUNNER_OS" == "Windows" ]; then
        ./deploy-windows.sh
      fi
```

**3. Event-Based Logic:**

```yaml
steps:
  - name: Handle different events
    run: |
      case $GITHUB_EVENT_NAME in
        push)
          echo "Handling push event"
          ;;
        pull_request)
          echo "Handling PR from $GITHUB_HEAD_REF"
          ;;
        release)
          echo "Handling release"
          ;;
      esac
```

**4. Working Directory Setup:**

```yaml
steps:
  - uses: actions/checkout@v4

  - name: Create build directory
    run: |
      BUILD_DIR="$GITHUB_WORKSPACE/build"
      mkdir -p $BUILD_DIR
      echo "BUILD_DIR=$BUILD_DIR" >> $GITHUB_ENV

  - name: Run build
    run: |
      cd $BUILD_DIR
      cmake ..
      make
```

#### Environment Variables vs Contexts

**Use Environment Variables When:**
- Running shell commands
- Need variables across multiple steps
- Working with external tools/scripts

**Use Contexts (e.g., `$&#123;&#123; github.sha }}`) When:**
- In YAML keys/values (not `run:` blocks)
- In `if:` conditions
- Passing to actions via `with:`

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    # ✅ Context in YAML
    if: github.ref == 'refs/heads/main'

    steps:
      # ✅ Context in action input
      - uses: actions/checkout@v4
        with:
          ref: $&#123;&#123; github.sha }}

      # ✅ Environment variable in shell
      - run: echo "SHA: $GITHUB_SHA"

      # ✅ Context in env value
      - name: Use context
        env:
          COMMIT: $&#123;&#123; github.sha }}
        run: echo "Commit: $COMMIT"
```

#### Variable Scope and Availability

**Scope Levels:**

| Scope | Available In | Lifespan | Example |
|-------|-------------|----------|---------|
| **Workflow Run** | All jobs and steps | Entire workflow execution | `GITHUB_RUN_ID`, `GITHUB_SHA` |
| **Job** | All steps in the job | Single job execution | `GITHUB_JOB` |
| **Step** | Only within that step | Single step execution | `GITHUB_ACTION` |
| **Runner** | All workflows on runner | While runner is active | `RUNNER_OS`, `RUNNER_TEMP` |

**Availability by Context:**

```yaml
# Variables available in different contexts
jobs:
  build:
    runs-on: ubuntu-latest
    # Job-level: All workflow/run variables available

    steps:
      - name: Check scope
        # Step-level: All variables available
        run: |
          # Workflow scope
          echo "Run ID: $GITHUB_RUN_ID"  # ✅ Available
          echo "Job: $GITHUB_JOB"         # ✅ Available
          echo "Action: $GITHUB_ACTION"   # ✅ Available (this step)
```

---

#### Variable Availability by Event Type

Different variables are populated based on the triggering event:

| Variable | push | pull_request | release | schedule | workflow_dispatch |
|----------|------|--------------|---------|----------|-------------------|
| `GITHUB_REF` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `GITHUB_SHA` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `GITHUB_BASE_REF` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `GITHUB_HEAD_REF` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `GITHUB_EVENT_PATH` | ✅ | ✅ | ✅ | ✅ | ✅ |

**Example: Event-Specific Logic**

```yaml
steps:
  - name: Handle event-specific variables
    run: |
      if [ "$GITHUB_EVENT_NAME" = "pull_request" ]; then
        echo "PR from: $GITHUB_HEAD_REF to $GITHUB_BASE_REF"
      elif [ "$GITHUB_EVENT_NAME" = "push" ]; then
        echo "Pushed to: $GITHUB_REF_NAME"
      fi
```

---

#### Variable Timing and Population

**When Variables are Set:**

1. **Before workflow starts:**
   - `GITHUB_REPOSITORY`, `GITHUB_ACTOR`, `GITHUB_EVENT_NAME`
   - Available immediately when workflow is queued

2. **At job start:**
   - `GITHUB_JOB`, `RUNNER_OS`, `GITHUB_WORKSPACE`
   - Set when runner picks up the job

3. **During step execution:**
   - `GITHUB_ACTION` changes per step
   - Updated for each action/step

**Example: Timing Demonstration**

```yaml
jobs:
  timing:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Action: $GITHUB_ACTION"  # Outputs: Step 1

      - name: Step 2
        run: echo "Action: $GITHUB_ACTION"  # Outputs: Step 2

      - uses: actions/checkout@v4  # GITHUB_ACTION becomes 'checkout'
```

---

#### Variables in Different Runner Types

**GitHub-Hosted Runners:**

All default variables available with standard paths:
```bash
GITHUB_WORKSPACE=/home/runner/work/repo/repo
RUNNER_TEMP=/home/runner/work/_temp
RUNNER_TOOL_CACHE=/opt/hostedtoolcache
```

**Self-Hosted Runners:**

Most variables available, but paths may differ:
```bash
GITHUB_WORKSPACE=/path/to/your/runner/_work/repo/repo
RUNNER_TEMP=/path/to/your/runner/_work/_temp
RUNNER_TOOL_CACHE=/path/to/your/runner/tool_cache
```

**Container Jobs:**

Variables available inside containers:
```yaml
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:18
    steps:
      - name: Check variables in container
        run: |
          echo "Workspace: $GITHUB_WORKSPACE"  # ✅ Available
          echo "Runner OS: $RUNNER_OS"         # ✅ Available
          # Paths are mounted into container
```

---

#### Variables in Matrix Builds

Matrix values are NOT default variables but are accessible:

```yaml
jobs:
  test:
    runs-on: $&#123;&#123; matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [16, 18, 20]
    steps:
      - name: Show matrix info
        run: |
          # ✅ Default variables
          echo "Runner OS: $RUNNER_OS"
          echo "Job ID: $GITHUB_JOB"

          # ❌ Matrix values not in default env
          # Use context instead: $&#123;&#123; matrix.os }}
```

**Access Matrix in Shell:**

```yaml
steps:
  - name: Use matrix values
    env:
      MATRIX_OS: $&#123;&#123; matrix.os }}
      MATRIX_NODE: $&#123;&#123; matrix.node }}
    run: |
      echo "Testing on $MATRIX_OS with Node $MATRIX_NODE"
```

---

#### Variables in Reusable Workflows

**Caller Workflow:**
```yaml
jobs:
  call-reusable:
    uses: org/repo/.github/workflows/reusable.yml@main
```

**Reusable Workflow:**
```yaml
# In reusable workflow, most variables reflect the CALLER
jobs:
  reusable-job:
    runs-on: ubuntu-latest
    steps:
      - name: Check variables
        run: |
          # ✅ Caller's repository
          echo "Repo: $GITHUB_REPOSITORY"

          # ✅ Caller's ref
          echo "Ref: $GITHUB_REF"

          # ✅ Reusable workflow's job name
          echo "Job: $GITHUB_JOB"
```

---

#### Debugging Default Variables

**List All Environment Variables:**

```yaml
steps:
  - name: Show all variables
    run: env | grep GITHUB_ | sort

  - name: Show runner variables
    run: env | grep RUNNER_ | sort

  - name: Pretty print specific vars
    run: |
      cat << EOF
      ===== Workflow Info =====
      Workflow:    $GITHUB_WORKFLOW
      Repository:  $GITHUB_REPOSITORY
      Ref:         $GITHUB_REF
      Ref Name:    $GITHUB_REF_NAME
      SHA:         $GITHUB_SHA
      Actor:       $GITHUB_ACTOR
      Event:       $GITHUB_EVENT_NAME

      ===== Run Info =====
      Run ID:      $GITHUB_RUN_ID
      Run Number:  $GITHUB_RUN_NUMBER
      Job:         $GITHUB_JOB

      ===== Runner Info =====
      OS:          $RUNNER_OS
      Arch:        $RUNNER_ARCH
      Temp:        $RUNNER_TEMP
      Workspace:   $GITHUB_WORKSPACE
      EOF
```

**Debug with Event Payload:**

```yaml
steps:
  - name: Show full event
    run: cat $GITHUB_EVENT_PATH | jq .

  - name: Extract specific event data
    run: |
      EVENT_DATA=$(cat $GITHUB_EVENT_PATH)
      echo "Event type: $(echo $EVENT_DATA | jq -r '.action')"
```

---

#### Variable Naming Conventions

**Official Naming Rules:**

1. **All uppercase:** `GITHUB_SHA` not `github_sha`
2. **Underscores:** `GITHUB_RUN_ID` not `GITHUB-RUN-ID`
3. **Prefixed:**
   - `GITHUB_*` for GitHub-specific
   - `RUNNER_*` for runner-specific
   - `INPUT_*` for action inputs (automatic)

**Custom Variable Best Practices:**

```yaml
env:
  # ✅ GOOD - Clear, uppercase, underscores
  BUILD_VERSION: '1.0.0'
  DEPLOY_TARGET: 'production'

  # ❌ BAD - Lowercase, hyphens, unclear
  buildversion: '1.0.0'
  deploy-target: 'production'
```

---

#### Variable Restrictions and Limitations

**Reserved Prefixes:**

Cannot override these in custom env:
- `GITHUB_*` - Reserved for GitHub
- `RUNNER_*` - Reserved for runner
- `INPUT_*` - Reserved for action inputs

```yaml
env:
  # ❌ Will NOT override the default
  GITHUB_SHA: 'my-custom-sha'

  # ✅ Use your own prefix
  MY_CUSTOM_SHA: $&#123;&#123; github.sha }}
```

**Variable Value Size Limits:**

| Type | Limit |
|------|-------|
| Single env variable | 48 KB |
| Total env size | 256 KB |
| Number of variables | ~100 recommended |

**Special Characters:**

```yaml
steps:
  - name: Handle special characters
    env:
      # ✅ Works
      MESSAGE: "Hello World"

      # ⚠️ Be careful with quotes in values
      JSON: '{"key": "value"}'

      # ✅ Multi-line using literal block
      SCRIPT: |
        echo "Line 1"
        echo "Line 2"
```

---

#### Variables Across Different Shells

**Bash/Sh (Linux/macOS):**
```yaml
- run: echo "Repo: $GITHUB_REPOSITORY"
  shell: bash
```

**PowerShell (Windows):**
```yaml
- run: Write-Output "Repo: $env:GITHUB_REPOSITORY"
  shell: pwsh
```

**CMD (Windows):**
```yaml
- run: echo Repo: %GITHUB_REPOSITORY%
  shell: cmd
```

**Python:**
```yaml
- run: |
    import os
    print(f"Repo: {os.environ['GITHUB_REPOSITORY']}")
  shell: python
```

---

#### Common Pitfalls and Solutions

**Pitfall 1: Using Context in Shell**

```yaml
# ❌ WRONG - Context doesn't work in shell
- run: echo $&#123;&#123; github.repository }}

# ✅ CORRECT - Use environment variable
- run: echo $GITHUB_REPOSITORY

# ✅ OR - Pass via env
- env:
    REPO: $&#123;&#123; github.repository }}
  run: echo $REPO
```

**Pitfall 2: Variable Not Available**

```yaml
# ❌ WRONG - GITHUB_HEAD_REF not available on push
on: push
jobs:
  build:
    steps:
      - run: echo $GITHUB_HEAD_REF  # Empty on push!

# ✅ CORRECT - Check event type first
- run: |
    if [ "$GITHUB_EVENT_NAME" = "pull_request" ]; then
      echo "Head ref: $GITHUB_HEAD_REF"
    fi
```

**Pitfall 3: Overwriting in Same Step**

```yaml
# ❌ WRONG - Won't work in same step
- run: |
    echo "MY_VAR=value" >> $GITHUB_ENV
    echo $MY_VAR  # Empty! Not set yet

# ✅ CORRECT - Use in next step
- run: echo "MY_VAR=value" >> $GITHUB_ENV
- run: echo $MY_VAR  # Now it works!
```

**Pitfall 4: Assuming Variables Persist**

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - run: echo "VAR=value" >> $GITHUB_ENV

  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
      # ❌ VAR not available - different job!
      - run: echo $VAR

      # ✅ Use job outputs instead
```

---

#### Default Variables Reference Table

**Quick Reference by Category:**

| Category | Key Variables |
|----------|---------------|
| **Repository** | `GITHUB_REPOSITORY`, `GITHUB_REPOSITORY_OWNER`, `GITHUB_WORKSPACE` |
| **Git Ref** | `GITHUB_REF`, `GITHUB_REF_NAME`, `GITHUB_SHA` |
| **Workflow** | `GITHUB_WORKFLOW`, `GITHUB_RUN_ID`, `GITHUB_RUN_NUMBER` |
| **Event** | `GITHUB_EVENT_NAME`, `GITHUB_ACTOR`, `GITHUB_EVENT_PATH` |
| **PR Only** | `GITHUB_BASE_REF`, `GITHUB_HEAD_REF` |
| **Runner** | `RUNNER_OS`, `RUNNER_ARCH`, `RUNNER_TEMP` |
| **Special Files** | `GITHUB_ENV`, `GITHUB_OUTPUT`, `GITHUB_PATH`, `GITHUB_STEP_SUMMARY` |

**Variable Lifecycle Summary:**

```
Workflow Queued → Pre-execution variables set (GITHUB_REPOSITORY, etc.)
    ↓
Job Starts → Runner variables set (RUNNER_OS, GITHUB_WORKSPACE)
    ↓
Step Executes → Step variables set (GITHUB_ACTION)
    ↓
Step Completes → GITHUB_ENV changes available in next step
    ↓
Job Completes → All job-scoped variables cleared
    ↓
Workflow Completes → All variables cleared
```

---

### Workflow Execution Control

This section covers how to control when and how workflows execute, prevent conflicts, pass data between jobs, and handle conditional logic.

#### Concurrency Controls

Concurrency controls prevent multiple workflow runs from stepping on each other. Think of it like a traffic light for your workflows—ensuring only one runs at a time in a given context.

**Why Use Concurrency Controls?**
- Prevent deployment conflicts (two deploys to the same environment)
- Avoid race conditions (multiple builds modifying the same resource)
- Save runner minutes (cancel outdated runs)

**Basic Concurrency:**

```yaml
name: Deploy
on: push

# Only one deployment per branch at a time
concurrency:
  group: deploy-$&#123;&#123; github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
```

**What Happens:**
1. Push to `main` triggers workflow run #1
2. Before #1 finishes, another push to `main` triggers #2
3. Because `cancel-in-progress: true`, run #1 is cancelled
4. Only run #2 completes

::: warning Common Mistake
This looks like it prevents overlapping deploys, but it doesn't:

```yaml
# ❌ WRONG - Each branch gets its own group
concurrency:
  group: deploy
```

All branches share the same group, so a push to `feature-A` would cancel a deployment on `main`!

```yaml
# ✅ CORRECT - Include branch in group
concurrency:
  group: deploy-$&#123;&#123; github.ref }}
```

Now `feature-A` and `main` have separate groups.
:::

**Concurrency Strategies:**

| Strategy | Group | cancel-in-progress | Use Case |
|----------|-------|-------------------|----------|
| **Per branch** | `$&#123;&#123; github.workflow }}-$&#123;&#123; github.ref }}` | `true` | Keep only latest run per branch |
| **Per PR** | `$&#123;&#123; github.workflow }}-pr-$&#123;&#123; github.event.pull_request.number }}` | `true` | One CI run per PR |
| **Queue all** | `deploy-production` | `false` | Run all deploys in order |
| **Single global** | `$&#123;&#123; github.workflow }}` | `false` | Only one workflow run at a time (any branch) |

**Queue vs Cancel:**

```yaml
# Cancel in progress (saves time, use for CI)
concurrency:
  group: ci-$&#123;&#123; github.ref }}
  cancel-in-progress: true  # Cancel old runs

# Queue (ensures all run, use for deployments)
concurrency:
  group: deploy-production
  cancel-in-progress: false  # Wait for previous to finish
```

**Job-Level Concurrency:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    # No concurrency limit on builds
    steps:
      - run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    # Only one deploy at a time
    concurrency:
      group: deploy-$&#123;&#123; github.ref }}
      cancel-in-progress: false
    steps:
      - run: ./deploy.sh
```

**Real-World Example:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

# Ensure production deploys happen one at a time, in order
concurrency:
  group: production-deploy
  cancel-in-progress: false

jobs:
  deploy:
    environment: production
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./deploy.sh production
```

::: tip Why This Matters in the Exam
Exam questions often ask: "How do you prevent two deployments from running simultaneously?"
Answer: Use `concurrency` with a shared group name and `cancel-in-progress: false` to queue them.
:::

---

#### Job Outputs

Jobs can pass data to downstream jobs using outputs. Think of it like passing a return value from one function to another.

**How Job Outputs Work:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      # Define outputs at job level
      version: $&#123;&#123; steps.get-version.outputs.version }}
      artifact-url: $&#123;&#123; steps.upload.outputs.artifact-url }}
    steps:
      - uses: actions/checkout@v4

      - name: Get version
        id: get-version
        run: |
          VERSION=$(node -p "require('./package.json').version")
          echo "version=$VERSION" >> $GITHUB_OUTPUT

      - name: Build
        run: npm run build

      - name: Upload artifact
        id: upload
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
        # This action automatically sets outputs.artifact-url

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy version $&#123;&#123; needs.build.outputs.version }}
        run: |
          echo "Deploying version: $&#123;&#123; needs.build.outputs.version }}"
          echo "Artifact URL: $&#123;&#123; needs.build.outputs.artifact-url }}"
```

**Step-by-Step:**
1. `build` job runs
2. `get-version` step writes to `$GITHUB_OUTPUT`
3. Job defines `outputs:` mapping step outputs to job outputs
4. `deploy` job reads outputs via `needs.build.outputs.version`

**Setting Step Outputs:**

```yaml
steps:
  - name: Calculate values
    id: calc
    run: |
      # Write multiple outputs
      echo "result=42" >> $GITHUB_OUTPUT
      echo "status=success" >> $GITHUB_OUTPUT
      echo "timestamp=$(date +%s)" >> $GITHUB_OUTPUT

  - name: Use outputs
    run: |
      echo "Result: $&#123;&#123; steps.calc.outputs.result }}"
      echo "Status: $&#123;&#123; steps.calc.outputs.status }}"
      echo "Time: $&#123;&#123; steps.calc.outputs.timestamp }}"
```

**Passing Outputs Through Multiple Jobs:**

```yaml
jobs:
  build:
    outputs:
      version: $&#123;&#123; steps.version.outputs.value }}
    steps:
      - id: version
        run: echo "value=1.2.3" >> $GITHUB_OUTPUT

  test:
    needs: build
    outputs:
      # Pass through from previous job
      version: $&#123;&#123; needs.build.outputs.version }}
      test-result: $&#123;&#123; steps.test.outputs.result }}
    steps:
      - id: test
        run: echo "result=passed" >> $GITHUB_OUTPUT

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: |
          echo "Version: $&#123;&#123; needs.test.outputs.version }}"
          echo "Tests: $&#123;&#123; needs.test.outputs.test-result }}"
```

**Matrix Outputs:**

```yaml
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
    outputs:
      # ⚠️ Matrix jobs can't reliably pass outputs
      # Only the last matrix job's output is available
      version: $&#123;&#123; steps.version.outputs.value }}
    steps:
      - id: version
        run: echo "value=1.0.0" >> $GITHUB_OUTPUT

  # Instead, use artifacts or a single aggregator job
```

::: warning Common Pitfall
Outputs are strings, not JSON:

```yaml
# ❌ WRONG - Won't parse as JSON
- id: set
  run: echo "data={\"key\":\"value\"}" >> $GITHUB_OUTPUT

# ✅ CORRECT - Escape properly or use toJSON
- id: set
  run: |
    DATA='{"key":"value"}'
    echo "data=$DATA" >> $GITHUB_OUTPUT

- name: Use it
  run: echo '$&#123;&#123; steps.set.outputs.data }}' | jq '.key'
```
:::

---

#### Conditional Execution (if:)

Control when jobs and steps run using `if:` conditions. You can apply conditionals at both job and step level.

**Job-Level Conditions:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  deploy-staging:
    needs: build
    # Only run on feature branches
    if: startsWith(github.ref, 'refs/heads/feature/')
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh staging

  deploy-production:
    needs: build
    # Only run on main branch
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh production
```

**Step-Level Conditions:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        id: test
        run: npm test
        continue-on-error: true

      - name: Report success
        if: steps.test.outcome == 'success'
        run: echo "Tests passed!"

      - name: Report failure
        if: steps.test.outcome == 'failure'
        run: echo "Tests failed!"

      - name: Always cleanup
        if: always()
        run: ./cleanup.sh
```

**Status Check Functions:**

| Function | When It Returns True | Common Use |
|----------|---------------------|------------|
| `success()` | All previous steps succeeded (default) | Proceed only if everything passed |
| `failure()` | Any previous step failed | Error handling, notifications |
| `always()` | Runs regardless of success/failure | Cleanup, reporting |
| `cancelled()` | Workflow was cancelled | Cleanup cancelled runs |

**Combining Conditions:**

```yaml
steps:
  - name: Deploy to production
    # Multiple conditions with AND
    if: github.ref == 'refs/heads/main' && success()
    run: ./deploy.sh

  - name: Deploy to staging
    # Multiple conditions with OR
    if: startsWith(github.ref, 'refs/heads/feature/') || github.ref == 'refs/heads/develop'
    run: ./deploy.sh staging

  - name: Notify on failure
    # Complex condition
    if: failure() && github.event_name == 'push' && github.ref == 'refs/heads/main'
    run: ./notify-slack.sh "Main branch build failed!"
```

**Common Expression Functions:**

| Function | Purpose | Example |
|----------|---------|---------|
| `contains(search, item)` | Check if string contains substring | `contains(github.ref, 'feature/')` |
| `startsWith(search, prefix)` | Check if starts with | `startsWith(github.ref, 'refs/heads/release/')` |
| `endsWith(search, suffix)` | Check if ends with | `endsWith(github.ref, '/main')` |
| `format(string, args...)` | Format string | `format('Hello {0}', github.actor)` |
| `join(array, separator)` | Join array elements | `join(github.event.pull_request.labels.*.name, ', ')` |
| `toJSON(value)` | Convert to JSON | `toJSON(github.event)` |
| `fromJSON(value)` | Parse JSON | `fromJSON('{"key":"value"}')` |

**Real-World Conditional Examples:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    # Only deploy on push to main, not on PRs
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - run: ./deploy.sh

  notify-on-failure:
    needs: [test, deploy]
    runs-on: ubuntu-latest
    # Run only if test OR deploy failed, and only on main
    if: |
      failure() &&
      github.ref == 'refs/heads/main' &&
      (needs.test.result == 'failure' || needs.deploy.result == 'failure')
    steps:
      - name: Send notification
        run: |
          if [ "$&#123;&#123; needs.test.result }}" == "failure" ]; then
            echo "Tests failed"
          elif [ "$&#123;&#123; needs.deploy.result }}" == "failure" ]; then
            echo "Deployment failed"
          fi
```

**Checking Previous Job Results:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    # Check specific job results
    if: |
      needs.build.result == 'success' &&
      needs.test.result == 'success'
    steps:
      - run: ./deploy.sh
```

::: tip Why This Matters in the Exam
Exam questions often present scenarios like: "Run cleanup even if tests fail."
Answer: Use `if: always()` on the cleanup step.
:::

---

#### Timeouts

Prevent runaway jobs from consuming runner minutes:

**Workflow-Level Timeout:**

```yaml
name: CI
on: push

# Default timeout for all jobs
timeout-minutes: 60

jobs:
  test:
    runs-on: ubuntu-latest
    # Uses workflow-level timeout (60 min)
    steps:
      - run: npm test
```

**Job-Level Timeout:**

```yaml
jobs:
  quick-test:
    runs-on: ubuntu-latest
    timeout-minutes: 10  # Override: max 10 minutes
    steps:
      - run: npm test

  long-build:
    runs-on: ubuntu-latest
    timeout-minutes: 120  # Override: max 2 hours
    steps:
      - run: npm run build-production
```

**Default Timeouts:**
- Default job timeout: **360 minutes** (6 hours)
- Maximum job timeout: **360 minutes** (GitHub-hosted)
- Self-hosted runners: No maximum limit

::: warning Common Issue
If a workflow times out frequently:
1. Check if it's actually stuck or just slow
2. Consider splitting into multiple jobs
3. Use caching to speed up dependencies
4. Increase timeout only if legitimately needed
:::

---

**Quick Summary: Workflow Execution Control**

- **Concurrency**: Use `concurrency:` with `group` and `cancel-in-progress` to prevent overlapping runs
- **Job Outputs**: Pass data between jobs using `outputs:` and `$GITHUB_OUTPUT`
- **Conditionals**: Use `if:` at job/step level with functions like `success()`, `failure()`, `always()`
- **Timeouts**: Set `timeout-minutes:` to prevent runaway jobs
- **Status Functions**: `success()`, `failure()`, `always()`, `cancelled()` control when steps run

---

### Containers and Services

Workflows can run jobs inside Docker containers and use service containers for databases, caches, and other dependencies. Think of containers as pre-configured environments that ensure your code runs the same way everywhere.

#### Running Jobs in Containers

Instead of running directly on the runner, you can run a job inside a Docker container:

**Basic Container Job:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: node:18
    steps:
      - uses: actions/checkout@v4
      - run: node --version  # Runs inside node:18 container
      - run: npm test
```

**Why Use Container Jobs?**
- Consistent environment (same Node version everywhere)
- Pre-installed dependencies (container has everything)
- Isolation from runner environment
- Test against specific OS/tool versions

**Container with Options:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: node:18-alpine
      env:
        NODE_ENV: test
      ports:
        - 3000:3000
      volumes:
        - my-volume:/data
      options: --cpus 2 --memory 4g
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**Container Configuration Options:**

| Option | Purpose | Example |
|--------|---------|---------|
| `image` | Docker image to use | `node:18`, `python:3.11`, `mcr.microsoft.com/dotnet/sdk:7.0` |
| `credentials` | Private registry auth | `username: $&#123;&#123; secrets.DOCKER_USER }}` |
| `env` | Environment variables | `NODE_ENV: production` |
| `ports` | Expose container ports | `- 8080:8080` |
| `volumes` | Mount volumes | `- /path/on/host:/path/in/container` |
| `options` | Additional docker run flags | `--cpus 2 --memory 4g --network host` |

**Private Registry Authentication:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: myregistry.azurecr.io/myapp:latest
      credentials:
        username: $&#123;&#123; secrets.REGISTRY_USERNAME }}
        password: $&#123;&#123; secrets.REGISTRY_PASSWORD }}
    steps:
      - run: ./test.sh
```

::: tip Why This Matters in the Exam
Exam might ask: "How do you run a job in a specific Node.js version without installing it?"
Answer: Use `container: { image: 'node:18' }` at the job level.
:::

---

#### Service Containers

Service containers run alongside your job, providing databases, caches, or other services your tests need. They're like having a local database that spins up for your tests and disappears when done.

**Basic Service Container:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
        run: npm test
```

**How Service Containers Work:**
1. Service container starts before job steps
2. GitHub waits for health checks to pass
3. Your steps can connect to the service (localhost:5432)
4. Service stops when job completes

**Common Service Container Examples:**

**PostgreSQL Database:**

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: testdb
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
    ports:
      - 5432:5432
```

**Redis Cache:**

```yaml
services:
  redis:
    image: redis:7-alpine
    options: >-
      --health-cmd "redis-cli ping"
      --health-interval 10s
    ports:
      - 6379:6379
```

**MongoDB:**

```yaml
services:
  mongo:
    image: mongo:6
    env:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    options: >-
      --health-cmd "mongosh --eval 'db.runCommand({ping: 1})'"
      --health-interval 10s
    ports:
      - 27017:27017
```

**Elasticsearch:**

```yaml
services:
  elasticsearch:
    image: elasticsearch:8.8.0
    env:
      discovery.type: single-node
      xpack.security.enabled: false
    options: >-
      --health-cmd "curl -f http://localhost:9200/_cluster/health"
      --health-interval 10s
    ports:
      - 9200:9200
```

**Multiple Services:**

```yaml
jobs:
  integration-test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: --health-cmd pg_isready --health-interval 10s
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: --health-cmd "redis-cli ping" --health-interval 10s
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Integration tests
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379
        run: npm run test:integration
```

---

#### Container Jobs with Service Containers

When a job runs inside a container, service connections work differently:

**Without Container Job (runs on runner VM):**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        ports:
          - 5432:5432
    steps:
      # Connect via localhost
      - env:
          DB_HOST: localhost
        run: npm test
```

**With Container Job (runs inside container):**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container: node:18

    services:
      postgres:
        image: postgres:15
        # No port mapping needed!

    steps:
      # Connect via service name (Docker network)
      - env:
          DB_HOST: postgres  # Use service name, not localhost!
        run: npm test
```

::: warning Common Mistake
When using both container jobs and services:

```yaml
# ❌ WRONG - Tries to connect to localhost
jobs:
  test:
    container: node:18
    services:
      postgres:
        image: postgres:15
    steps:
      - env:
          DB_HOST: localhost  # Won't work!
        run: npm test

# ✅ CORRECT - Uses service name
jobs:
  test:
    container: node:18
    services:
      postgres:
        image: postgres:15
    steps:
      - env:
          DB_HOST: postgres  # Service name works!
        run: npm test
```
:::

---

#### Health Checks

Always use health checks to ensure services are ready before tests run:

**Health Check Options:**

```yaml
services:
  postgres:
    image: postgres:15
    options: >-
      --health-cmd "pg_isready -U postgres"
      --health-interval 10s      # Check every 10 seconds
      --health-timeout 5s        # Command must complete in 5s
      --health-retries 5         # Try 5 times before failing
      --health-start-period 30s  # Grace period before checking
```

**Common Health Check Commands:**

| Service | Health Check Command |
|---------|---------------------|
| PostgreSQL | `pg_isready -U postgres` |
| MySQL | `mysqladmin ping` |
| Redis | `redis-cli ping` |
| MongoDB | `mongosh --eval 'db.runCommand({ping: 1})'` |
| Elasticsearch | `curl -f http://localhost:9200/_cluster/health` |
| Custom HTTP | `curl -f http://localhost:8080/health` |

---

#### Real-World Example: Full Integration Test

```yaml
name: Integration Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb
        run: npm run migrate

      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test
        run: npm run test:integration

      - name: Teardown
        if: always()
        run: npm run db:reset
```

::: tip Why This Matters in Real Projects
Service containers eliminate the "works on my machine" problem. Every test run gets a fresh database in a known state, making tests reliable and repeatable.
:::

---

#### Container Best Practices

**DO:**
- ✅ Use specific image tags (`node:18.16.0`, not `node:latest`)
- ✅ Use health checks for service containers
- ✅ Use Alpine images for faster startup (`node:18-alpine`)
- ✅ Clean up test data in teardown steps
- ✅ Use environment variables for configuration

**DON'T:**
- ❌ Use `latest` tag (can break workflows when updated)
- ❌ Skip health checks (tests might run before service is ready)
- ❌ Hardcode credentials (use secrets)
- ❌ Run services you don't need (wastes time)
- ❌ Forget to expose ports when needed

---

**Quick Summary: Containers and Services**

- **Container Jobs**: Run jobs inside Docker containers for consistent environments (`container: { image: 'node:18' }`)
- **Service Containers**: Spin up databases, caches, etc. for tests (`services:`)
- **Networking**: Use `localhost` from runner VM, use service name from container jobs
- **Health Checks**: Always use `--health-cmd` to ensure services are ready
- **Private Registries**: Authenticate with `credentials:` using secrets
- **Common Services**: PostgreSQL, Redis, MongoDB, MySQL, Elasticsearch

---

## Domain 2: Consume Workflows

This domain is all about using existing actions and workflows effectively. Instead of building everything from scratch, you'll learn to leverage the GitHub Actions ecosystem—marketplace actions, reusable workflows, and shared code patterns. Think of this as learning to be a smart consumer rather than reinventing the wheel.

### Using Actions from Marketplace

The GitHub Marketplace has thousands of pre-built actions. Learning to use them safely and effectively is a core GH-200 skill. The exam loves to test version pinning strategies and when to use different types of actions.

**Action Version Pinning:**

Exams love to test this: which pinning method is most secure?

```yaml
steps:
  # Specific version (recommended for most cases)
  - uses: actions/checkout@v4

  # Specific commit SHA (most secure, but harder to update)
  - uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab

  # Branch (never use in production - can break without warning!)
  - uses: actions/checkout@main
```

**Action Inputs and Outputs:**

```yaml
steps:
  - name: Setup Node
    uses: actions/setup-node@v4
    with:
      node-version: '18'
      cache: 'npm'

  - name: Create Release
    id: create_release
    uses: actions/create-release@v1
    with:
      tag_name: v1.0.0
      release_name: Release v1.0.0

  - name: Use output
    run: echo "Release URL: $&#123;&#123; steps.create_release.outputs.upload_url }}"
```

---

### Reusable Workflows

**Calling a Reusable Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  workflow_dispatch:

jobs:
  call-workflow:
    uses: org/repo/.github/workflows/reusable-deploy.yml@main
    with:
      environment: production
    secrets:
      deploy-token: $&#123;&#123; secrets.DEPLOY_TOKEN }}
```

**Creating a Reusable Workflow:**

```yaml
# .github/workflows/reusable-deploy.yml
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: $&#123;&#123; inputs.environment }}
    steps:
      - run: echo "Deploying to $&#123;&#123; inputs.environment }}"
```

**Key Domain 2 Keywords:**

| Keyword | Purpose | When to Use |
|---------|---------|-------------|
| `uses` | Reference an action | Use marketplace or custom actions |
| `@v4` | Version tag pinning | Pin to major version (recommended) |
| `@sha` | Commit SHA pinning | Most secure pinning method |
| `with` | Pass inputs to action | Configure action behavior |
| `id` | Assign step identifier | Reference step outputs |
| `outputs` | Step/job outputs | Pass data between steps/jobs |
| `workflow_call` | Make workflow reusable | Called by other workflows |
| `inputs` | Reusable workflow inputs | Parameterize workflows |
| `secrets` | Pass secrets to workflows | Secure credential passing |
| `inherit` | Inherit all secrets | Pass all secrets automatically |
| `artifact` | Upload/download files | Share data between jobs |
| `cache` | Cache dependencies | Speed up builds |
| `path` | File paths for artifacts/cache | Specify what to save |
| `key` | Cache key identifier | Unique cache identifier |
| `restore-keys` | Fallback cache keys | Partial cache matches |

::: tip Why This Matters in the Exam
Exams frequently present scenarios asking: "You need to share build artifacts between jobs. What do you use?"
Understanding the difference between cache and artifacts is critical.
:::

---

#### Decision Table: Cache vs Artifacts

One of the most common exam questions: when to use cache vs artifacts. Here's how to decide:

| Aspect | Cache | Artifacts |
|--------|-------|-----------|
| **Purpose** | Speed up repeated builds | Share files between jobs |
| **Use Case** | Dependencies (node_modules, pip cache) | Build outputs (dist/, binaries, test results) |
| **Lifespan** | 7 days (or until evicted) | 90 days default (configurable) |
| **Scope** | Across workflows and branches | Same workflow run only |
| **When to Restore** | Before install/build | At start of dependent job |
| **Size Limit** | 10 GB per repository | 2 GB per artifact (50 GB per workflow) |
| **Example** | `actions/cache@v3` | `actions/upload-artifact@v4` / `actions/download-artifact@v4` |

**Decision Logic:**

```
Need to share files between jobs in same workflow?
  → Use Artifacts

Need to speed up repeated builds across workflows?
  → Use Cache

Both?
  → Use both! Cache dependencies, upload artifacts.
```

**Real-World Example:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Cache dependencies
      - uses: actions/cache@v3
        with:
          path: ~/.npm
          key: $&#123;&#123; runner.os }}-node-$&#123;&#123; hashFiles('package-lock.json') }}

      - run: npm ci  # Fast if cache hit!
      - run: npm run build

      # Upload build output as artifact
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      # Download artifact from build job
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - run: ./test.sh
```

**Customizing Artifact Retention:**

Artifacts have a default 90-day retention, but you can customize this with `retention-days`:

```yaml
steps:
  # Short retention for temporary builds
  - uses: actions/upload-artifact@v4
    with:
      name: test-results
      path: test-reports/
      retention-days: 7  # Keep only 1 week

  # Longer retention for release artifacts
  - uses: actions/upload-artifact@v4
    with:
      name: production-build
      path: dist/
      retention-days: 90  # Keep 90 days (default)

  # Minimum retention
  - uses: actions/upload-artifact@v4
    with:
      name: debug-logs
      path: logs/
      retention-days: 1  # Keep only 1 day
```

**Retention Limits:**
- **Minimum**: 1 day
- **Maximum**: 90 days (for public repos with free plans)
- **Maximum**: 400 days (for enterprise plans)
- **Default**: 90 days (if not specified)

::: tip Exam Note
Questions often ask: "How do you keep artifacts for only 5 days?"
Answer: Use `retention-days: 5` in `actions/upload-artifact`.
:::

**Where to Find Artifacts:**

After a workflow runs, artifacts are available in:
1. Go to **Actions** tab in your repository
2. Click on the specific **workflow run**
3. Scroll to **Artifacts** section at the bottom
4. Click artifact name to download

::: tip Why This Matters in Real Projects
Getting this right saves time and money:
- **Bad**: Re-downloading dependencies every run (slow, expensive)
- **Good**: Cache dependencies, pass builds via artifacts (fast, cheap)
:::

---

#### Decision Table: Reusable Workflows vs Composite Actions

Another favorite exam topic: when to use reusable workflows vs composite actions.

| Aspect | Reusable Workflow | Composite Action |
|--------|-------------------|------------------|
| **Level** | Job-level | Step-level |
| **Contains** | Complete jobs with runners | Multiple steps (no runner) |
| **Use Case** | Standard deployment pipeline | Common setup tasks |
| **Can Have** | Multiple jobs, services, matrices | Only steps |
| **Runner** | Specifies its own `runs-on:` | Uses caller's runner |
| **Secrets** | Explicitly passed or inherited | Inherit from job |
| **Permissions** | Defines its own | Inherits from job |
| **Location** | `.github/workflows/` | `.github/actions/` or marketplace |
| **Called With** | `uses: ./.github/workflows/file.yml` | `uses: ./.github/actions/name` |
| **Best For** | Complete workflows (test, build, deploy) | Reusable setup steps |

**Decision Logic:**

```
Need to reuse an entire job with specific runner?
  → Reusable Workflow

Need to reuse a sequence of steps within a job?
  → Composite Action

Need multiple jobs with service containers?
  → Reusable Workflow

Need to combine 3-5 steps that always go together?
  → Composite Action
```

**When to Use Each:**

**Use Reusable Workflow:**
- Complete test suite that needs specific runner/services
- Deployment pipeline used across multiple repos
- Multi-job workflow (build → test → deploy)

**Use Composite Action:**
- Setup steps (install tools, configure environment)
- Code checkout + dependency installation
- Publishing/notification steps

**Example Comparison:**

```yaml
# Composite Action - Setup steps
# .github/actions/setup-node/action.yml
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
    - uses: actions/cache@v3
    - run: npm ci

# Reusable Workflow - Complete pipeline
# .github/workflows/test-suite.yml
on:
  workflow_call:
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres: {...}
    steps:
      - uses: ./.github/actions/setup-node
      - run: npm test
```

::: tip Why This Matters in the Exam
Exam scenarios often ask: "You want to reuse deployment logic across 5 repos. What do you use?"
Answer: Reusable workflow (can't use composite action for complete jobs).
:::

---

**Quick Recap: Domain 2**

- **Marketplace Actions**: Always pin to specific versions (never branches)
- **Cache**: Speed up builds by caching dependencies (7-day lifespan)
- **Artifacts**: Share files between jobs in same workflow (90-day lifespan)
- **Reusable Workflows**: Share complete jobs/workflows across repos
- **Composite Actions**: Share common steps within jobs
- **Decision Key**: Job-level reuse → reusable workflow; Step-level reuse → composite action

---

## Domain 3: Author and Maintain Actions

This domain covers creating your own custom actions—when off-the-shelf marketplace actions don't meet your needs. You'll learn the three action types, how to publish them, and best practices for maintenance. The exam tests your ability to choose the right action type for different scenarios.

### Action Types

Understanding which action type to use is critical for the exam. Each has different trade-offs in speed, flexibility, and platform support.

**1. JavaScript Actions** (fastest, cross-platform)
**2. Docker Actions** (more flexible, Linux only)
**3. Composite Actions** (combine multiple steps)

---

#### Decision Table: JavaScript vs Docker vs Composite Actions

This is a common exam question: which action type should you use?

| Aspect | JavaScript Action | Docker Action | Composite Action |
|--------|-------------------|---------------|------------------|
| **Runs On** | All platforms (Linux, Windows, macOS) | Linux only | All platforms |
| **Speed** | Fastest (no container overhead) | Slower (container startup) | Fast |
| **Dependencies** | Must bundle Node.js dependencies | Can install any dependencies | Uses existing actions |
| **Complexity** | Moderate (write JS code) | High (write Dockerfile + code) | Low (YAML only) |
| **Flexibility** | High (full Node.js ecosystem) | Highest (any language/tool) | Limited (existing actions only) |
| **Best For** | API calls, file manipulation, logic | Complex environments, non-JS languages | Combining existing actions |
| **Example Use** | GitHub API operations | Building with specific toolchain | Setup + install + cache pattern |
| **File Structure** | `action.yml` + `index.js` | `action.yml` + `Dockerfile` | `action.yml` only |
| **Runtime** | `using: 'node20'` | `using: 'docker'` | `using: 'composite'` |

**Decision Logic:**

```
Need to run on Windows/macOS?
  → JavaScript OR Composite
  → NOT Docker (Linux only)

Need a specific language/environment (Python, Go, etc.)?
  → Docker Action

Just combining existing actions?
  → Composite Action (simplest!)

Need speed and cross-platform?
  → JavaScript Action

Need maximum flexibility and control?
  → Docker Action
```

**When to Use Each:**

**Use JavaScript Action:**
- Making GitHub API calls (octokit/rest)
- File manipulation (reading, writing, parsing)
- Cross-platform logic (must work on Windows/macOS/Linux)
- Fast execution required (no container overhead)

**Use Docker Action:**
- Need specific language runtime (Python, Go, Ruby, etc.)
- Complex system dependencies (apt packages, build tools)
- Existing CLI tool you want to wrap
- Don't need Windows/macOS support

**Use Composite Action:**
- Combining 3-5 existing actions into one
- Standard setup pattern (checkout + cache + install)
- No custom code needed
- Maximum simplicity

::: tip Why This Matters in the Exam
Exam questions often present scenarios like: "You need to run a Python script as an action on Windows. What type should you use?"
Answer: JavaScript action calling Python via child_process (Docker won't work on Windows!)
:::

---

### Composite Action Example

```yaml
# action.yml
name: 'Setup Node and Install'
description: 'Setup Node.js and install dependencies'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '18'

outputs:
  cache-hit:
    description: 'Whether cache was hit'
    value: $&#123;&#123; steps.cache.outputs.cache-hit }}

runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: $&#123;&#123; inputs.node-version }}

    - name: Cache dependencies
      id: cache
      uses: actions/cache@v3
      with:
        path: node_modules
        key: $&#123;&#123; runner.os }}-node-$&#123;&#123; hashFiles('package-lock.json') }}

    - name: Install dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      shell: bash
      run: npm ci
```

**Key Domain 3 Keywords (Action Metadata):**

| Keyword | Purpose | Required |
|---------|---------|----------|
| `name` | Action display name | Yes |
| `description` | Action description | Yes |
| `author` | Action author | No |
| `inputs` | Define action inputs | No |
| `outputs` | Define action outputs | No |
| `runs` | Execution configuration | Yes |
| `using` | Runtime environment | Yes |
| `main` | Entry point for JavaScript | For JS actions |
| `pre` | Run before main | No |
| `post` | Run after main | No |
| `image` | Docker image | For Docker actions |
| `args` | Docker arguments | For Docker actions |
| `entrypoint` | Docker entrypoint | For Docker actions |
| `steps` | Composite action steps | For composite |
| `shell` | Shell for composite steps | For composite |
| `branding` | Marketplace icon/color | No |
| `icon` | Action icon | No |
| `color` | Action color | No |
| `required` | Is input required | Input property |
| `default` | Input default value | Input property |
| `deprecationMessage` | Deprecation notice | Input property |

---

## Domain 4: Manage GitHub Actions

### Secrets Management

Secrets are encrypted environment variables used to store sensitive information like API keys, tokens, passwords, and certificates.

#### Types of Secrets

**1. Repository Secrets**
- Scope: Single repository
- Access: All workflows in the repository
- Location: Settings → Secrets and variables → Actions
- Use case: Repository-specific credentials

**2. Organization Secrets**
- Scope: Multiple repositories in an organization
- Access: Selected repositories or all repositories
- Visibility: Can be restricted by repository visibility (public/private)
- Use case: Shared credentials across projects

**3. Environment Secrets**
- Scope: Specific deployment environment
- Access: Only when job uses that environment
- Protection: Can require reviewers, wait timers
- Use case: Production/staging credentials

**4. GITHUB_TOKEN (Auto-generated)**
- Scope: Per workflow run
- Access: Automatically available
- Expires: After workflow completes
- Use case: GitHub API operations

---

#### Secret Hierarchy and Precedence

When a secret exists at multiple levels, the most specific one is used:

```
Environment Secret (highest priority)
    ↓
Repository Secret
    ↓
Organization Secret (lowest priority)
```

**Example:**
```yaml
# If API_KEY exists in all three:
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo $&#123;&#123; secrets.API_KEY }}
      # Uses: Environment secret (production)

  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo $&#123;&#123; secrets.API_KEY }}
      # Uses: Repository secret (no environment)
```

---

#### Creating and Using Secrets

**Repository Secret Creation:**
1. Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `API_TOKEN` (uppercase, underscores only)
4. Value: Your secret value
5. Click "Add secret"

**Using Secrets in Workflows:**

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Access via secrets context
      - name: Deploy to API
        env:
          API_TOKEN: $&#123;&#123; secrets.API_TOKEN }}
          DB_PASSWORD: $&#123;&#123; secrets.DB_PASSWORD }}
        run: |
          curl -H "Authorization: Bearer $API_TOKEN" \
            https://api.example.com/deploy

      # Use with actions
      - name: Deploy with action
        uses: some/deploy-action@v1
        with:
          api-key: $&#123;&#123; secrets.API_TOKEN }}
```

::: warning Secret Masking
Secrets are automatically masked in logs. If a secret value appears in output, it's replaced with `***`.
However, avoid intentionally printing secrets.
:::

---

#### Environment Secrets

Environments provide deployment protection and secret isolation.

**Setting up Environment:**
1. Repository → Settings → Environments
2. Create environment (e.g., "production")
3. Configure protection rules (optional):
   - Required reviewers
   - Wait timer
   - Deployment branches
4. Add environment secrets

**Using Environment Secrets:**

```yaml
jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy
        env:
          DEPLOY_TOKEN: $&#123;&#123; secrets.DEPLOY_TOKEN }}
          API_URL: $&#123;&#123; secrets.API_URL }}
        run: ./deploy.sh

  deploy-production:
    runs-on: ubuntu-latest
    environment: production  # Different secrets!
    needs: deploy-staging
    steps:
      - name: Deploy
        env:
          DEPLOY_TOKEN: $&#123;&#123; secrets.DEPLOY_TOKEN }}  # Production token
          API_URL: $&#123;&#123; secrets.API_URL }}              # Production URL
        run: ./deploy.sh
```

**Protection Rules:**

```yaml
# With required reviewers configured
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    # Workflow pauses here for manual approval
    steps:
      - name: Deploy
        run: ./deploy.sh
```

---

#### GITHUB_TOKEN

An automatically generated secret available in every workflow run.

**Characteristics:**
- Created automatically for each workflow run
- Expires when the workflow completes
- Has permissions based on repository settings and workflow configuration
- Free to use (no rate limiting like PATs)
- Cannot be used to trigger other workflows (prevents recursive triggers)

**Default Permissions:**

Varies by repository settings (Settings → Actions → General → Workflow permissions):
- **Permissive** (legacy): Read and write permissions
- **Restricted** (recommended): Read repository contents and packages only

**Explicit Permissions (Recommended):**

```yaml
# Workflow-level permissions
permissions:
  contents: read      # Clone repository
  pull-requests: write # Comment on PRs
  issues: write       # Create/edit issues

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

  comment:
    runs-on: ubuntu-latest
    # Job-level permissions (override workflow level)
    permissions:
      pull-requests: write
    steps:
      - uses: actions/github-script@v7
        with:
          github-token: $&#123;&#123; secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Build completed!'
            })
```

**Available Permission Scopes:**

| Permission | Read | Write | Use Case |
|------------|------|-------|----------|
| `actions` | ✓ | ✓ | Manage Actions artifacts, cache |
| `checks` | ✓ | ✓ | Create check runs |
| `contents` | ✓ | ✓ | Clone, push to repository |
| `deployments` | ✓ | ✓ | Create deployments |
| `discussions` | ✓ | ✓ | Manage discussions |
| `issues` | ✓ | ✓ | Create, edit issues |
| `packages` | ✓ | ✓ | Publish packages |
| `pages` | ✓ | ✓ | Deploy GitHub Pages |
| `pull-requests` | ✓ | ✓ | Comment on, merge PRs |
| `security-events` | ✓ | ✓ | View, upload security events |
| `statuses` | ✓ | ✓ | Create commit statuses |

**Using GITHUB_TOKEN:**

```yaml
steps:
  # Implicit use (checkout action)
  - uses: actions/checkout@v4
    # Automatically uses GITHUB_TOKEN

  # Explicit use
  - name: Create issue
    run: |
      curl -X POST \
        -H "Authorization: token $&#123;&#123; secrets.GITHUB_TOKEN }}" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/repos/$&#123;&#123; github.repository }}/issues \
        -d '{"title":"Automated issue","body":"Created by workflow"}'
```

---

#### Personal Access Tokens (PAT)

Use when GITHUB_TOKEN is insufficient.

**When to use PAT:**
- Trigger other workflows
- Access resources in other repositories
- Perform operations requiring higher permissions
- Long-lived automation

**PAT Types:**

| Type | Scope | Max Expiration | Use Case |
|------|-------|----------------|----------|
| Fine-grained PAT | Specific repos/permissions | 1 year | Recommended, least privilege |
| Classic PAT | Broad access | No expiration | Legacy, avoid if possible |

**Creating a PAT:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (fine-grained recommended)
3. Select repositories
4. Select permissions (minimal required)
5. Set expiration (maximum allowed)
6. Generate and copy token

**Using PAT in Workflows:**

```yaml
jobs:
  trigger-workflow:
    runs-on: ubuntu-latest
    steps:
      # GITHUB_TOKEN can't trigger workflows, use PAT
      - name: Trigger another workflow
        run: |
          curl -X POST \
            -H "Authorization: token $&#123;&#123; secrets.PAT_TOKEN }}" \
            -H "Accept: application/vnd.github.v3+json" \
            https://api.github.com/repos/owner/repo/actions/workflows/deploy.yml/dispatches \
            -d '{"ref":"main"}'

      # Access another repository
      - name: Checkout private repo
        uses: actions/checkout@v4
        with:
          repository: owner/private-repo
          token: $&#123;&#123; secrets.PAT_TOKEN }}
          path: private-repo
```

::: danger PAT Security
- Store PATs as secrets, never in code
- Use fine-grained PATs with minimal permissions
- Set expiration dates
- Rotate regularly
- Revoke unused tokens
:::

---

#### OpenID Connect (OIDC)

Eliminate long-lived credentials by using short-lived tokens.

**Benefits:**
- No stored cloud credentials
- Automatic credential rotation
- Cloud provider validates token
- Better security posture

**Supported Cloud Providers:**
- AWS
- Azure
- Google Cloud
- HashiCorp Vault

**AWS OIDC Example:**

```yaml
# Setup: Configure OIDC provider in AWS IAM
# Create IAM role that trusts GitHub's OIDC provider

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write  # Required for OIDC
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: us-east-1

      # Now authenticated without storing AWS credentials!
      - name: Deploy to S3
        run: aws s3 sync ./dist s3://my-bucket
```

**Azure OIDC Example:**

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v1
        with:
          client-id: $&#123;&#123; secrets.AZURE_CLIENT_ID }}
          tenant-id: $&#123;&#123; secrets.AZURE_TENANT_ID }}
          subscription-id: $&#123;&#123; secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Deploy
        run: az webapp deploy --name myapp --resource-group mygroup
```

---

#### Secret Inheritance in Reusable Workflows

**Passing Secrets Explicitly:**

```yaml
# Calling workflow
jobs:
  call-deploy:
    uses: org/repo/.github/workflows/deploy.yml@main
    secrets:
      api-key: $&#123;&#123; secrets.API_KEY }}
      db-password: $&#123;&#123; secrets.DB_PASSWORD }}

# Reusable workflow (deploy.yml)
on:
  workflow_call:
    secrets:
      api-key:
        required: true
      db-password:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
        env:
          API_KEY: $&#123;&#123; secrets.api-key }}
          DB_PASS: $&#123;&#123; secrets.db-password }}
```

**Inherit All Secrets:**

```yaml
# Calling workflow
jobs:
  call-deploy:
    uses: org/repo/.github/workflows/deploy.yml@main
    secrets: inherit  # Pass all secrets

# Reusable workflow can access all caller's secrets
on:
  workflow_call:
    secrets:
      api-key:
        required: false  # Optional, might be inherited

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
        env:
          API_KEY: $&#123;&#123; secrets.api-key }}
```

---

#### Secret Best Practices

**DO:**
- ✅ Use descriptive, uppercase names with underscores
- ✅ Rotate secrets regularly
- ✅ Use environment secrets for different deployment stages
- ✅ Set explicit permissions for GITHUB_TOKEN
- ✅ Prefer OIDC over long-lived credentials
- ✅ Use organization secrets for shared credentials
- ✅ Document which secrets are required for workflows
- ✅ Use least privilege principle
- ✅ Set PAT expiration dates

**DON'T:**
- ❌ Commit secrets to code or logs
- ❌ Print secrets (even if masked)
- ❌ Use secrets in PR builds from forks
- ❌ Share secrets across multiple purposes
- ❌ Use permissive GITHUB_TOKEN permissions
- ❌ Store non-sensitive data as secrets
- ❌ Use classic PATs (use fine-grained)
- ❌ Set PATs to never expire

**Secret Rotation Example:**

```yaml
# Workflow to remind about secret rotation
name: Secret Rotation Reminder

on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly

jobs:
  remind:
    runs-on: ubuntu-latest
    steps:
      - name: Create rotation issue
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Monthly Secret Rotation Reminder',
              body: 'Please review and rotate the following secrets:\n- API_TOKEN\n- DEPLOY_KEY\n- DB_PASSWORD',
              labels: ['security', 'maintenance']
            })
```

---

#### Secrets Security Considerations

**Fork PR Security:**

```yaml
# ⚠️ Secrets NOT available in PRs from forks
on:
  pull_request:
    # Secrets available only from same repo

# ❌ DANGEROUS - Secrets available to fork PRs
on:
  pull_request_target:
    # Fork can access secrets - validate input!
```

**Preventing Secret Exposure:**

```yaml
# ❌ BAD - Might leak in logs
- run: echo "Token: $&#123;&#123; secrets.API_TOKEN }}"

# ✅ GOOD - Use intermediate variable
- name: Use token
  env:
    API_TOKEN: $&#123;&#123; secrets.API_TOKEN }}
  run: |
    # Token is masked if accidentally printed
    ./deploy.sh

# ✅ BEST - Don't print at all
- name: Deploy
  env:
    API_TOKEN: $&#123;&#123; secrets.API_TOKEN }}
  run: ./deploy.sh > /dev/null 2>&1
```

::: danger Critical Exam Trap: Never Pass Secrets via Command Line

This is a classic exam question. **NEVER** pass secrets as command-line arguments:

```yaml
# ❌ EXTREMELY DANGEROUS - DO NOT DO THIS
- run: ./deploy.sh $&#123;&#123; secrets.API_TOKEN }}
- run: curl -H "Authorization: $&#123;&#123; secrets.API_TOKEN }}" https://api.example.com

Why this is dangerous:
1. **Visible in process list** - Anyone on the system can see it (ps aux)
2. **Logged in audit trails** - Process monitors capture it
3. **Shell history** - Stored in .bash_history
4. **Not masked** - GitHub can't mask command arguments
```

**✅ CORRECT: Always use environment variables:**

```yaml
# ✅ CORRECT - Pass via env
- name: Deploy
  env:
    API_TOKEN: $&#123;&#123; secrets.API_TOKEN }}
  run: ./deploy.sh  # Script reads from $API_TOKEN

# ✅ CORRECT - For curl
- name: API call
  env:
    TOKEN: $&#123;&#123; secrets.API_TOKEN }}
  run: curl -H "Authorization: $TOKEN" https://api.example.com
```

Exam question format:
> "A developer passes a secret to a script as: `./deploy.sh $&#123;&#123; secrets.TOKEN }}`. What are the risks?"

Answer: Visible in process list, shell history, and audit logs. Should use env variables instead.
:::

---

#### Secret Syntax Patterns

Know the correct syntax - this shows up in exam questions:

**✅ CORRECT Syntax:**

```yaml
steps:
  # ✅ CORRECT - Access secrets directly
  - env:
      API_KEY: $&#123;&#123; secrets.API_KEY }}
      DB_PASSWORD: $&#123;&#123; secrets.DB_PASSWORD }}

  # ✅ CORRECT - In with: parameters
  - uses: some-action@v1
    with:
      token: $&#123;&#123; secrets.GITHUB_TOKEN }}
      api-key: $&#123;&#123; secrets.API_KEY }}

  # ✅ CORRECT - Checking if secret exists
  - if: $&#123;&#123; secrets.API_KEY != '' }}
    run: echo "API key is set"
```

**❌ INCORRECT Syntax:**

```yaml
steps:
  # ❌ WRONG - No .environment namespace
  - env:
      API_KEY: $&#123;&#123; secrets.environment.API_KEY }}  # Does not work!

  # ❌ WRONG - Can't nest secrets
  - env:
      TOKEN: $&#123;&#123; secrets.prod.token }}  # Invalid syntax

  # ❌ WRONG - Not how environment secrets work
  - env:
      KEY: $&#123;&#123; environment.secrets.API_KEY }}  # Wrong!
```

**How Environment Secrets Actually Work:**

```yaml
jobs:
  deploy:
    environment: production  # Sets the environment
    steps:
      # Access secrets normally - GitHub resolves from environment context
      - env:
          API_KEY: $&#123;&#123; secrets.API_KEY }}  # Gets production's API_KEY
        run: ./deploy.sh
```

::: tip Exam Question Pattern
"Which syntax correctly accesses a secret named `api_key`?"

- ❌ `$&#123;&#123; secrets.environment.api_key }}`
- ❌ `$&#123;&#123; environment.secrets.api_key }}`
- ❌ `$&#123;&#123; secrets.prod.api_key }}`
- ✅ `$&#123;&#123; secrets.api_key }}`

Answer: The last one. Secrets use flat namespace, no nesting.
:::

**Audit Secret Usage:**

```yaml
# Check which workflows use specific secrets
# Settings → Secrets → Click on secret name
# Shows: "Used in X workflows"
```

---

### Self-Hosted Runners

Self-hosted runners give you full control over the environment, but require management. Understanding when to use GitHub-hosted vs self-hosted is a common exam topic.

#### Decision Table: GitHub-Hosted vs Self-Hosted Runners

| Aspect | GitHub-Hosted | Self-Hosted |
|--------|---------------|-------------|
| **Setup** | Zero setup, ready to use | Must install and configure |
| **Maintenance** | Fully managed by GitHub | You manage updates, security |
| **Cost** | Per-minute billing | Your infrastructure cost |
| **Performance** | Standard specs | Custom specs (CPU, RAM, GPU) |
| **Software** | Pre-installed tools | Full control over tools |
| **Network Access** | Public internet only | Can access private networks |
| **Security** | Isolated, ephemeral | Your responsibility |
| **Scaling** | Automatic | Manual configuration |
| **Customization** | Limited | Full control |
| **Best For** | Open source, standard builds | Enterprise, special requirements |

**Decision Logic:**

```
Need access to private network/databases?
  → Self-hosted (GitHub-hosted can't reach private networks)

Need special hardware (GPU, specific CPU)?
  → Self-hosted (custom specs)

Working on public open-source project?
  → GitHub-hosted (free for public repos)

Need specific software/tools not in GitHub images?
  → Self-hosted (install whatever you need)

Want zero maintenance?
  → GitHub-hosted (fully managed)

High security requirements (air-gapped)?
  → Self-hosted (full control)
```

**When to Use GitHub-Hosted:**
- ✅ Public open-source projects (free minutes!)
- ✅ Standard build environments (Node, Python, Go, etc.)
- ✅ Don't want to manage infrastructure
- ✅ Need automatic scaling
- ✅ Security through isolation is sufficient

**When to Use Self-Hosted:**
- ✅ Need to access private networks/databases
- ✅ Require special hardware (GPUs, high RAM, etc.)
- ✅ Need pre-loaded cache/dependencies
- ✅ Compliance requirements (data must stay in-house)
- ✅ Very high build volumes (cost savings)
- ✅ Specific OS/tools not available in GitHub images

**Cost Comparison Example:**

```
Public Repository:
  GitHub-hosted: FREE (2,000-3,000 free minutes/month)
  Self-hosted: Server costs only

Private Repository (Pro plan):
  GitHub-hosted: $0.008/minute (Linux)
  Self-hosted: Server costs only

  Example: 1000 minutes/month
    → GitHub-hosted: $8/month
    → Self-hosted: $20-50/month (small VM)
    → Breakeven: ~2500-6000 minutes/month
```

::: tip Why This Matters in the Exam
Exam scenarios often ask: "A company needs to build against a private database. What runner type?"
Answer: Self-hosted (GitHub-hosted runners can't access private networks).
:::

---

#### Runner Auto-Update Behavior

Self-hosted runners auto-update by default, but this can cause disruptions in certain scenarios:

**Default Behavior:**
- Self-hosted runners automatically download and install updates
- Updates happen when the runner is idle
- Ensures runners stay current with GitHub Actions features

**When to Disable Auto-Update:**

::: warning Critical for Containerized/Ephemeral Runners
For **containerized** or **ephemeral** runners, you should **disable auto-update**:

```bash
# Disable auto-update when starting runner
./config.sh --url https://github.com/org/repo --token TOKEN --disableupdate
```

**Why disable for containers?**
1. Container images should be immutable
2. Updates inside containers are temporary (lost on restart)
3. Better to update the container image itself
4. Avoids mid-job disruptions
5. Ensures consistent runner versions across pods/containers

:::

**Configuration Options:**

```bash
# Regular self-hosted runner (auto-update enabled - default)
./config.sh --url https://github.com/org/repo --token TOKEN

# Ephemeral/container runner (disable auto-update)
./config.sh --url https://github.com/org/repo --token TOKEN --disableupdate

# Ephemeral runner (one-time use)
./config.sh --url https://github.com/org/repo --token TOKEN --ephemeral
```

::: tip Exam Question Pattern
"You're running self-hosted runners as Kubernetes pods. Should you enable auto-update?"

Answer: **NO** - Disable auto-update (`--disableupdate`) for containerized runners. Update the container image instead.
:::

**Runner Update Strategy:**

| Runner Type | Auto-Update | Why |
|-------------|-------------|-----|
| **Long-lived VM** | ✅ Enable (default) | Runner stays current automatically |
| **Container/Pod** | ❌ Disable | Update container image instead |
| **Ephemeral** | ❌ Disable | Runner is destroyed after each job |
| **Development** | ✅ Enable | Stay current with latest features |
| **Production** | ❓ Consider disabling | Control update timing |

---

#### Proxy Configuration

Self-hosted runners behind corporate firewalls need proxy configuration:

**Environment Variable:**

```bash
# Set proxy for runner
export https_proxy=http://proxy.company.com:8080
export http_proxy=http://proxy.company.com:8080
export no_proxy=localhost,127.0.0.1,.company.com

# Start runner
./run.sh
```

::: danger Exam Trap
Question: "Which environment variable configures proxy for self-hosted runners?"

- ❌ `proxy_server`
- ❌ `network_proxy`
- ❌ `PROXY_URL`
- ✅ `https_proxy`

Answer: Use standard `https_proxy` and `http_proxy` environment variables.
:::

**Proxy with Authentication:**

```bash
# With credentials
export https_proxy=http://username:password@proxy.company.com:8080

# Or use .proxyrc file
echo "http://username:password@proxy.company.com:8080" > ~/.proxyrc
```

---

**Runner Labels:**

```yaml
jobs:
  build:
    # Use multiple labels to select specific runner
    runs-on: [self-hosted, linux, x64, gpu]
    steps:
      - run: nvidia-smi  # Use GPU
```

**Common Label Patterns:**

| Label Pattern | Purpose |
|---------------|---------|
| `[self-hosted, linux]` | Any Linux self-hosted runner |
| `[self-hosted, macos]` | Any macOS self-hosted runner |
| `[self-hosted, windows]` | Any Windows self-hosted runner |
| `[self-hosted, gpu]` | Runners with GPU |
| `[self-hosted, prod]` | Production deployment runners |
| `[self-hosted, team-a]` | Team A's dedicated runners |

**Runner Groups:**

Runner groups let you organize and control runner access:

- **Organization-level**: Share runners across multiple repos
- **Enterprise-level**: Share runners across multiple organizations
- **Access Control**: Restrict which repos can use which runners
- **Policies**: Apply organization policies to runner groups

**Setup:**
Settings → Actions → Runner groups → New runner group

---

#### Decision Table: Authentication Methods

For cloud deployments and cross-repo operations, choosing the right authentication method matters:

| Aspect | GITHUB_TOKEN | Personal Access Token (PAT) | OIDC |
|--------|--------------|------------------------------|------|
| **Lifespan** | Single workflow run (~1 hour) | Days to months (user-defined) | Minutes (short-lived) |
| **Scope** | Current repository only | Multiple repos, organizations | Cloud provider auth only |
| **Setup** | Automatic, zero config | Manual creation in GitHub | Initial cloud provider setup |
| **Security** | Most secure for GitHub ops | Moderate (long-lived credential) | Most secure for cloud ops |
| **Rotation** | Automatic (per run) | Manual (or automated rotation) | Automatic (per request) |
| **Can Trigger Workflows** | No | Yes | N/A (not for GitHub API) |
| **Cross-Repo Access** | No | Yes | N/A |
| **Cloud Deployment** | No | Yes (store cloud keys as secrets) | Yes (no long-lived credentials!) |
| **Audit Trail** | Per workflow run | Tied to user account | Cloud provider logs |
| **Best For** | Same-repo operations | Cross-repo, triggering workflows | AWS/Azure/GCP deployments |

**Decision Logic:**

```
Deploying to AWS/Azure/GCP?
  → OIDC (most secure, no stored credentials)
  → NOT PAT with stored cloud keys

Need to trigger workflows in other repos?
  → PAT (GITHUB_TOKEN can't trigger workflows)

Standard same-repo operations (checkout, comment, etc.)?
  → GITHUB_TOKEN (automatic, secure)

Need access to multiple repos in same workflow?
  → PAT with repo scope

Building public open-source project?
  → GITHUB_TOKEN (sufficient for most cases)
```

::: tip Why This Matters in the Exam
Exam loves this question: "What's the most secure way to deploy to AWS?"
- ❌ Store AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as secrets → Works but less secure
- ✅ Use OIDC with IAM role → Most secure, no long-lived credentials

The exam will present both options and ask which is better. Always choose OIDC for cloud deployments.
:::

**Example Scenarios:**

**Scenario 1: Deploy to AWS**
```yaml
# ✅ BEST: OIDC (no stored credentials)
permissions:
  id-token: write
  contents: read
steps:
  - uses: aws-actions/configure-aws-credentials@v4
    with:
      role-to-assume: arn:aws:iam::123456789:role/MyRole
      aws-region: us-east-1
```

**Scenario 2: Trigger workflow in another repo**
```yaml
# ✅ CORRECT: Need PAT (GITHUB_TOKEN can't do this)
steps:
  - env:
      GH_TOKEN: $&#123;&#123; secrets.PAT_TOKEN }}
    run: gh workflow run deploy.yml --repo other-org/other-repo
```

**Scenario 3: Standard repository operations**
```yaml
# ✅ CORRECT: GITHUB_TOKEN is sufficient
permissions:
  contents: write
  pull-requests: write
steps:
  - uses: actions/checkout@v4
  - uses: actions/github-script@v7
    with:
      github-token: $&#123;&#123; secrets.GITHUB_TOKEN }}
```

---

### Workflow Permissions

Understanding and properly configuring workflow permissions is crucial for security and functionality. GitHub Actions uses a permissions model to control what your workflows can access and modify.

#### Permission Levels

**Default Permissions:**

GitHub provides two default permission models:

| Model | Description | Use Case |
|-------|-------------|----------|
| **Permissive** (legacy) | Read and write to most resources | Older repos, less secure |
| **Restricted** (recommended) | Read-only by default | New repos, security-first approach |

**Setting Default Permissions:**
Repository Settings → Actions → General → Workflow permissions

::: tip Exam Tip
Know the difference between permissive (read/write default) and restricted (read-only default) modes. The exam may test which is more secure.
:::

#### The permissions: Block

Control what GITHUB_TOKEN can do at workflow or job level:

**Workflow-Level Permissions:**

```yaml
name: Deploy
on: push

# Apply to ALL jobs
permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          github-token: $&#123;&#123; secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({...})
```

**Job-Level Permissions Override:**

```yaml
name: Multi-Job Workflow

# Workflow level - restrictive default
permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    # Inherits workflow permissions (contents: read)
    steps:
      - uses: actions/checkout@v4
      - run: npm build

  deploy:
    runs-on: ubuntu-latest
    needs: build
    # Override with broader permissions for this job only
    permissions:
      contents: write
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./deploy.sh
```

::: warning Common Mistake
This looks like it should work, but job-level permissions don't inherit workflow-level permissions:

```yaml
permissions:
  contents: read

jobs:
  deploy:
    permissions:
      deployments: write
    # ❌ Only has deployments:write, NOT contents:read!
```

To keep both permissions, explicitly set both:
```yaml
jobs:
  deploy:
    permissions:
      contents: read      # ✅ Explicitly include
      deployments: write
```
:::

#### Available Permission Scopes

**Complete Permission Reference:**

| Scope | Read | Write | Description |
|-------|------|-------|-------------|
| `actions` | List workflow runs | Cancel, rerun workflows | Workflow management |
| `checks` | View check runs | Create/update checks | Status checks |
| `contents` | Read repository files | Push commits, create releases | Repository content |
| `deployments` | View deployments | Create deployments | Deployment tracking |
| `id-token` | N/A | Request OIDC token | Cloud authentication |
| `issues` | Read issues | Create/edit/close issues | Issue management |
| `packages` | Download packages | Publish/delete packages | GitHub Packages |
| `pages` | N/A | Deploy to GitHub Pages | Pages deployment |
| `pull-requests` | Read PRs | Create/update PRs, reviews | PR management |
| `repository-projects` | Read projects | Manage project cards | Projects (classic) |
| `security-events` | View security alerts | Upload SARIF, dismiss alerts | Code scanning |
| `statuses` | View commit statuses | Create statuses | Commit status API |

**Most Common Combinations:**

```yaml
# Read-only (safest)
permissions:
  contents: read

# CI/Build (read code, write checks)
permissions:
  contents: read
  checks: write

# PR automation (comment, label)
permissions:
  contents: read
  pull-requests: write
  issues: write

# Release automation
permissions:
  contents: write
  packages: write

# OIDC for cloud deployment
permissions:
  contents: read
  id-token: write

# Full deployment
permissions:
  contents: write
  deployments: write
  packages: write
```

#### Least Privilege Principle

Always grant the minimum permissions needed:

**❌ TOO PERMISSIVE:**

```yaml
# BAD - Grants write access to everything
permissions: write-all

# BAD - More than needed
permissions:
  contents: write
  pull-requests: write
  issues: write
  packages: write
  # Only needed contents: read!
```

**✅ LEAST PRIVILEGE:**

```yaml
# GOOD - Only what's needed
permissions:
  contents: read
  checks: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
      - uses: actions/upload-artifact@v4
```

::: tip Why This Matters in Real Projects
If a workflow is compromised (e.g., through a vulnerable action), limiting permissions restricts what damage an attacker can do. Read-only permissions mean they can't modify code, even if they hijack your workflow.
:::

#### GITHUB_TOKEN vs PAT vs OIDC

Three authentication methods with different use cases:

| Type | Lifespan | Scope | Use Case |
|------|----------|-------|----------|
| **GITHUB_TOKEN** | Single workflow run (~1 hour) | Current repository only | Most workflows, CI/CD |
| **PAT (Personal Access Token)** | User-defined (30-90 days) | Multiple repos, user's access | Cross-repo, API calls |
| **OIDC Token** | Minutes | Cloud provider authentication | AWS, Azure, GCP deployments |

**When to Use Each:**

**1. GITHUB_TOKEN (Default Choice):**

```yaml
# ✅ Use for most operations
jobs:
  build:
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/github-script@v7
        with:
          github-token: $&#123;&#123; secrets.GITHUB_TOKEN }}
```

**Pros:**
- Automatic, no setup needed
- Scoped to single repository
- Expires after workflow run
- No credential management

**Cons:**
- Can't trigger other workflows
- Can't access other repositories
- Limited to GitHub API

**2. PAT (Personal Access Token):**

```yaml
# Use when GITHUB_TOKEN isn't enough
jobs:
  trigger-other-repo:
    steps:
      - uses: actions/checkout@v4
        with:
          repository: orgname/other-repo
          token: $&#123;&#123; secrets.PAT_TOKEN }}

      - name: Trigger workflow in another repo
        env:
          GH_TOKEN: $&#123;&#123; secrets.PAT_TOKEN }}
        run: gh workflow run deploy.yml --repo orgname/other-repo
```

**Pros:**
- Access multiple repositories
- Can trigger other workflows
- Fine-grained control (with fine-grained PATs)

**Cons:**
- Requires manual creation and rotation
- Security risk if leaked
- Tied to user account (audit trail)

**3. OIDC Token (Cloud Authentication):**

```yaml
# Use for cloud provider authentication
jobs:
  deploy-to-aws:
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1

      - name: Deploy to S3
        run: aws s3 sync ./dist s3://my-bucket
```

**Pros:**
- No long-lived credentials
- More secure than storing AWS keys
- Short-lived tokens (minutes)
- Auditable in cloud provider

**Cons:**
- Requires initial setup in cloud provider
- More complex configuration
- Only for cloud authentication

::: tip Why This Matters in the Exam
Scenario questions often ask: "You need to deploy to AWS. What's the most secure way?"
- ❌ Storing AWS_ACCESS_KEY as secret → Works but less secure
- ✅ Using OIDC → Most secure, no long-lived credentials
:::

#### Permission Inheritance in Reusable Workflows

Permissions don't automatically pass to reusable workflows:

**Caller Workflow:**

```yaml
# .github/workflows/caller.yml
name: Caller
on: push

permissions:
  contents: read
  issues: write

jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
    # ⚠️ Reusable workflow DOES NOT inherit these permissions!
```

**Reusable Workflow:**

```yaml
# .github/workflows/reusable.yml
name: Reusable
on:
  workflow_call:

# ✅ MUST explicitly set permissions
permissions:
  contents: read
  issues: write

jobs:
  reusable-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

**Key Rule:** Each reusable workflow must declare its own permissions. They don't inherit from the caller.

---

### Environments and Deployment Protection

Environments provide deployment protection rules, environment-specific secrets, and approval gates.

#### What Are Environments?

Think of environments as deployment targets with built-in safety controls. Instead of deploying directly to production, you set up rules that ensure deployments are safe.

**Creating Environments:**
Repository → Settings → Environments → New environment

#### Environment Protection Rules

**Required Reviewers:**

```yaml
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./deploy.sh
```

When this job runs:
1. Workflow pauses before executing
2. Notifies required reviewers
3. Waits for approval
4. Only then runs the deployment

::: danger Critical Exam Fact: 30-Day Timeout
If a job requires approval but is not approved within **30 days**, it automatically **fails**.

The job status will show:
- First: "Waiting" (waiting for approval)
- After 30 days: "Failed" (timeout expired)

This is a classic exam question. Remember: **30 days = automatic failure**
:::

**Protection Rule Types:**

| Rule | Purpose | Example |
|------|---------|---------|
| **Required reviewers** | Human approval before deployment | 1-6 reviewers must approve |
| **Wait timer** | Delay before deployment | Wait 5 minutes before deploying |
| **Branch restrictions** | Only allow specific branches | Only `main` can deploy to prod |

**Configuration Example:**

```yaml
jobs:
  deploy-staging:
    environment: staging  # No approval needed
    steps:
      - run: ./deploy.sh staging

  deploy-production:
    needs: deploy-staging
    environment:
      name: production
      url: https://myapp.com
    # Requires approval from designated reviewers
    steps:
      - run: ./deploy.sh production
```

::: tip Why This Matters in Real Projects
Prevents accidental production deployments. Even if someone accidentally triggers the workflow, production deployments require explicit human approval.
:::

#### Environment-Specific Secrets

Secrets can be scoped to environments:

**Secret Hierarchy:**

```
Repository Secrets (least specific)
    ↓
Organization Secrets
    ↓
Environment Secrets (most specific, highest precedence)
```

**Example:**

```yaml
# Different API keys for different environments
jobs:
  deploy-staging:
    environment: staging
    steps:
      - name: Deploy
        env:
          API_KEY: $&#123;&#123; secrets.API_KEY }}  # Uses staging's API_KEY
        run: ./deploy.sh

  deploy-production:
    environment: production
    steps:
      - name: Deploy
        env:
          API_KEY: $&#123;&#123; secrets.API_KEY }}  # Uses production's API_KEY
        run: ./deploy.sh
```

**Setup:**
1. Settings → Environments → Select environment
2. Environment secrets → Add secret
3. Same name (`API_KEY`) but different values per environment

#### Environment Variables vs Environment Secrets

Don't confuse these two:

| Feature | Purpose | Visibility |
|---------|---------|------------|
| **Environment** (deployment target) | Protection rules, approvals | Public (visible in logs) |
| **Environment secrets** | Sensitive values scoped to environment | Masked in logs |
| **Environment variables** (`env:`) | Non-sensitive config values | Public (visible in logs) |

```yaml
jobs:
  deploy:
    environment: production
    env:
      DEPLOY_REGION: us-east-1  # Environment variable (public)
    steps:
      - name: Deploy
        env:
          API_KEY: $&#123;&#123; secrets.API_KEY }}  # Environment secret (masked)
        run: ./deploy.sh
```

#### Complete Deployment Flow Example

```yaml
name: Deploy Application

on:
  push:
    branches: [main]

permissions:
  contents: read
  deployments: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - name: Deploy to staging
        env:
          DEPLOY_KEY: $&#123;&#123; secrets.DEPLOY_KEY }}
        run: ./deploy.sh staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com
    # ⏸️ Pauses here for approval
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - name: Deploy to production
        env:
          DEPLOY_KEY: $&#123;&#123; secrets.DEPLOY_KEY }}
        run: ./deploy.sh production
```

**Flow:**
1. ✅ Build succeeds → artifact created
2. ✅ Deploy to staging (automatic)
3. ⏸️ Wait for production approval
4. 👤 Reviewer approves
5. ✅ Deploy to production

::: tip Why This Matters in the Exam
Exam scenarios often ask: "How do you require approval before production deployment?"
Answer: Use `environment: production` with required reviewers configured in environment settings.
:::

---

### Security Best Practices

**GITHUB_TOKEN Permissions:**

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          github-token: $&#123;&#123; secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Thanks for the contribution!'
            })
```

**Prevent Script Injection:**

```yaml
# ❌ BAD - Vulnerable to script injection
- run: echo "Hello $&#123;&#123; github.event.issue.title }}"

# ✅ GOOD - Use intermediate environment variable
- name: Print title
  env:
    TITLE: $&#123;&#123; github.event.issue.title }}
  run: echo "Hello $TITLE"
```

::: danger Security Risk
Never use untrusted input (issue titles, PR descriptions, etc.) directly in run commands. Always use environment variables.
:::

**Key Domain 4 Keywords (Security & Management):**

| Keyword | Purpose | Scope |
|---------|---------|-------|
| `secrets` | Access encrypted secrets | Workflow/job/step |
| `GITHUB_TOKEN` | Auto-generated auth token | Per workflow run |
| `permissions` | Define token permissions | Workflow/job level |
| `contents` | Repository contents access | Permission scope |
| `pull-requests` | PR read/write access | Permission scope |
| `issues` | Issue read/write access | Permission scope |
| `packages` | Package registry access | Permission scope |
| `id-token` | OIDC token access | Permission scope |
| `actions` | Actions read/write | Permission scope |
| `runs-on` | Specify runner | Job level |
| `self-hosted` | Use self-hosted runner | Runner label |
| `labels` | Runner selection labels | Runner configuration |
| `environment` | Deployment environment | Job level |
| `required_reviewers` | Manual approval | Environment protection |
| `wait-timer` | Deployment delay | Environment protection |
| `deployment_branch_policy` | Branch restrictions | Environment protection |
| `ACTIONS_RUNNER_DEBUG` | Enable debug logging | Repository secret |
| `ACTIONS_STEP_DEBUG` | Enable step logging | Repository secret |

---

## Debugging GitHub Actions Workflows

Effective debugging is crucial for troubleshooting failed workflows, understanding execution behavior, and optimizing performance.

### Enable Debug Logging

**Debug Logging Secrets:**

Set these as repository secrets to enable detailed debug output:

```yaml
# Repository Secrets:
# ACTIONS_RUNNER_DEBUG = true
# ACTIONS_STEP_DEBUG = true
```

**Effect of Debug Secrets:**

| Secret | What It Enables | Output Level |
|--------|----------------|--------------|
| `ACTIONS_RUNNER_DEBUG` | Runner diagnostic logs | Runner internal operations, job setup, cleanup |
| `ACTIONS_STEP_DEBUG` | Step-level debug messages | Individual step execution, variable expansion |

**Example Debug Output:**

```yaml
name: Debug Example
on: push

jobs:
  debug-test:
    runs-on: ubuntu-latest
    steps:
      - name: Debug info
        run: |
          echo "::debug::This is a debug message"
          echo "Repository: $&#123;&#123; github.repository }}"
          echo "Event: $&#123;&#123; github.event_name }}"
```

::: tip Exam Tip
Remember that debug logging is enabled via **repository secrets**, not workflow configuration. This allows debugging without modifying workflow files.
:::

---

### Workflow Commands for Debugging

**Logging Commands:**

| Command | Purpose | Example |
|---------|---------|---------|
| `::debug::` | Debug message (requires ACTIONS_STEP_DEBUG) | `echo "::debug::Variable value: $VAR"` |
| `::notice::` | Notice message (visible in UI) | `echo "::notice::Build completed"` |
| `::warning::` | Warning message | `echo "::warning::Deprecated feature used"` |
| `::error::` | Error message | `echo "::error::Test failed"` |
| `::group::` / `::endgroup::` | Collapsible log group | `echo "::group::Dependencies"` |

**Example Usage:**

```yaml
steps:
  - name: Debugging with commands
    run: |
      echo "::debug::Starting debug section"
      echo "::group::Environment Check"
      printenv | sort
      echo "::endgroup::"

      if [ -z "$API_KEY" ]; then
        echo "::error::API_KEY is not set"
        exit 1
      fi

      echo "::notice::All checks passed"
```

**Annotating Files with Errors:**

```yaml
# Add file annotation with line number
echo "::error file=app.js,line=10,col=5::Syntax error detected"

# Add warning to specific file
echo "::warning file=package.json,line=23::Outdated dependency"
```

::: warning Common Pitfall
`::debug::` messages only appear when `ACTIONS_STEP_DEBUG=true`. For always-visible messages, use `::notice::` instead.
:::

---

### Inspecting Workflow Execution

**View All Environment Variables:**

```yaml
steps:
  - name: Dump all environment variables
    run: printenv | sort

  - name: Dump all environment variables (Windows)
    run: Get-ChildItem Env: | Sort-Object Name
    shell: pwsh
```

**View GitHub Event Payload:**

```yaml
steps:
  - name: Dump GitHub event
    run: cat $GITHUB_EVENT_PATH

  - name: Pretty print event
    run: jq '.' $GITHUB_EVENT_PATH
```

**Inspect Context Variables:**

```yaml
steps:
  - name: Dump GitHub context
    run: echo '$&#123;&#123; toJSON(github) }}'

  - name: Dump runner context
    run: echo '$&#123;&#123; toJSON(runner) }}'

  - name: Dump job context
    run: echo '$&#123;&#123; toJSON(job) }}'

  - name: Dump steps context
    run: echo '$&#123;&#123; toJSON(steps) }}'
```

**Check Specific Variables:**

```yaml
steps:
  - name: Debug specific values
    run: |
      echo "Event name: $&#123;&#123; github.event_name }}"
      echo "Ref: $&#123;&#123; github.ref }}"
      echo "Ref name: $&#123;&#123; github.ref_name }}"
      echo "SHA: $&#123;&#123; github.sha }}"
      echo "Actor: $&#123;&#123; github.actor }}"
      echo "Triggered by: $&#123;&#123; github.triggering_actor }}"
```

---

### Debugging Failed Workflows

**Common Failure Scenarios:**

| Failure Type | Symptoms | Debug Approach |
|--------------|----------|----------------|
| **Syntax Error** | Workflow doesn't trigger | Check YAML syntax, use YAML validator |
| **Step Failure** | Step exits with non-zero code | Check step logs, add debug output before failure |
| **Permission Denied** | 403/permission errors | Check `permissions:`, GITHUB_TOKEN scopes |
| **Timeout** | Workflow cancelled after timeout | Check `timeout-minutes:`, optimize long steps |
| **Environment Issue** | Missing dependencies/files | Verify runner OS, check file paths, list directory |
| **Secret Not Found** | Empty variable, auth failure | Verify secret name, check secret scope (repo/org/env) |

**Debugging Strategy:**

```yaml
steps:
  # 1. Verify environment
  - name: Check environment
    run: |
      echo "OS: $RUNNER_OS"
      echo "Architecture: $RUNNER_ARCH"
      echo "Current directory: $(pwd)"
      ls -la

  # 2. Check dependencies
  - name: Verify dependencies
    run: |
      node --version
      npm --version
      git --version

  # 3. Add debug output before failing step
  - name: Debug before failing step
    run: |
      echo "About to run failing command"
      echo "Variable value: $MY_VAR"
      echo "File exists: $(test -f myfile && echo yes || echo no)"

  # 4. Use conditional execution to isolate failure
  - name: Step that might fail
    id: might-fail
    continue-on-error: true
    run: ./potentially-failing-script.sh

  - name: Check failure status
    if: steps.might-fail.outcome == 'failure'
    run: |
      echo "Step failed, debugging..."
      echo "Outcome: $&#123;&#123; steps.might-fail.outcome }}"
      echo "Conclusion: $&#123;&#123; steps.might-fail.conclusion }}"
```

---

### Debugging Matrix Builds

**Identify Which Matrix Combination Failed:**

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [16, 18, 20]
    runs-on: $&#123;&#123; matrix.os }}
    steps:
      - name: Debug matrix
        run: |
          echo "::notice::Testing on $&#123;&#123; matrix.os }} with Node $&#123;&#123; matrix.node }}"
          echo "Matrix context: $&#123;&#123; toJSON(matrix) }}"

      - name: Run tests
        run: npm test
        continue-on-error: true
        id: test

      - name: Report failure
        if: steps.test.outcome == 'failure'
        run: |
          echo "::error::Tests failed on $&#123;&#123; matrix.os }} with Node $&#123;&#123; matrix.node }}"
```

**Matrix Debugging Tips:**

- Use `continue-on-error: true` to let all matrix combinations complete
- Use `fail-fast: false` in strategy to prevent early cancellation
- Add matrix values to job names: `name: Test ($&#123;&#123; matrix.os }}, Node $&#123;&#123; matrix.node }})`

---

### Debugging Reusable Workflows

**Caller Workflow Debug:**

```yaml
# .github/workflows/caller.yml
jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
    with:
      debug: true
      environment: staging
    secrets:
      token: $&#123;&#123; secrets.MY_TOKEN }}
```

**Reusable Workflow Debug Inputs:**

```yaml
# .github/workflows/reusable.yml
on:
  workflow_call:
    inputs:
      debug:
        description: 'Enable debug output'
        type: boolean
        default: false

jobs:
  reusable-job:
    runs-on: ubuntu-latest
    steps:
      - name: Debug info
        if: inputs.debug
        run: |
          echo "::group::Reusable Workflow Debug"
          echo "Called from: $&#123;&#123; github.workflow }}"
          echo "Caller repo: $&#123;&#123; github.repository }}"
          echo "Inputs: $&#123;&#123; toJSON(inputs) }}"
          echo "::endgroup::"
```

---

### Using Job Summaries for Debugging

**Create Rich Debug Output:**

```yaml
steps:
  - name: Create debug summary
    run: |
      echo "## Debug Summary" >> $GITHUB_STEP_SUMMARY
      echo "" >> $GITHUB_STEP_SUMMARY
      echo "### Environment" >> $GITHUB_STEP_SUMMARY
      echo "- OS: $RUNNER_OS" >> $GITHUB_STEP_SUMMARY
      echo "- Event: $&#123;&#123; github.event_name }}" >> $GITHUB_STEP_SUMMARY
      echo "- Branch: $&#123;&#123; github.ref_name }}" >> $GITHUB_STEP_SUMMARY
      echo "" >> $GITHUB_STEP_SUMMARY
      echo "### Variables" >> $GITHUB_STEP_SUMMARY
      echo "\`\`\`json" >> $GITHUB_STEP_SUMMARY
      echo '$&#123;&#123; toJSON(github) }}' >> $GITHUB_STEP_SUMMARY
      echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
```

**Debug Table in Summary:**

```yaml
steps:
  - name: Test results summary
    run: |
      echo "## Test Results" >> $GITHUB_STEP_SUMMARY
      echo "| Test | Status | Duration |" >> $GITHUB_STEP_SUMMARY
      echo "|------|--------|----------|" >> $GITHUB_STEP_SUMMARY
      echo "| Unit Tests | ✅ Pass | 2.3s |" >> $GITHUB_STEP_SUMMARY
      echo "| Integration | ❌ Fail | 5.1s |" >> $GITHUB_STEP_SUMMARY
```

---

### Debugging with Artifacts

**Save Debug Information:**

```yaml
steps:
  - name: Run tests
    run: npm test
    continue-on-error: true

  - name: Save debug artifacts
    if: failure()
    uses: actions/upload-artifact@v4
    with:
      name: debug-logs
      path: |
        logs/*.log
        test-results/
        screenshots/
        $GITHUB_EVENT_PATH
      retention-days: 7
```

**Debug Current Working Directory:**

```yaml
steps:
  - name: Debug workspace
    if: failure()
    uses: actions/upload-artifact@v4
    with:
      name: workspace-dump
      path: |
        $&#123;&#123; github.workspace }}
        !node_modules/
        !.git/
```

---

### Debugging Action Inputs/Outputs

**Debug Action Inputs:**

```yaml
# In composite action or JavaScript action
runs:
  using: composite
  steps:
    - name: Debug inputs
      shell: bash
      run: |
        echo "::group::Action Inputs"
        echo "input1: $&#123;&#123; inputs.input1 }}"
        echo "input2: $&#123;&#123; inputs.input2 }}"
        echo "All inputs: $&#123;&#123; toJSON(inputs) }}"
        echo "::endgroup::"
```

**Capture and Verify Outputs:**

```yaml
steps:
  - name: Action with outputs
    id: my-action
    uses: ./my-action
    with:
      input: value

  - name: Debug outputs
    run: |
      echo "Output1: $&#123;&#123; steps.my-action.outputs.output1 }}"
      echo "Output2: $&#123;&#123; steps.my-action.outputs.output2 }}"
      echo "All outputs: $&#123;&#123; toJSON(steps.my-action.outputs) }}"
```

---

### Debugging Conditional Execution

**Understand Status Check Functions:**

```yaml
steps:
  - name: Step that might fail
    id: test-step
    run: exit 1
    continue-on-error: true

  - name: Always runs
    if: always()
    run: echo "Runs regardless of previous step status"

  - name: Only on success
    if: success()
    run: echo "Only runs if all previous steps succeeded"

  - name: Only on failure
    if: failure()
    run: echo "Only runs if any previous step failed"

  - name: Check specific step
    if: steps.test-step.outcome == 'failure'
    run: echo "test-step failed"

  - name: Debug step status
    if: always()
    run: |
      echo "Outcome: $&#123;&#123; steps.test-step.outcome }}"
      echo "Conclusion: $&#123;&#123; steps.test-step.conclusion }}"
```

**Debug Complex Conditions:**

```yaml
steps:
  - name: Debug condition evaluation
    run: |
      echo "Event: $&#123;&#123; github.event_name }}"
      echo "Branch: $&#123;&#123; github.ref_name }}"
      echo "Is main?: $&#123;&#123; github.ref == 'refs/heads/main' }}"
      echo "Is push?: $&#123;&#123; github.event_name == 'push' }}"
      echo "Combined: $&#123;&#123; github.event_name == 'push' && github.ref == 'refs/heads/main' }}"

  - name: Conditional step
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    run: echo "This is a push to main"
```

---

### Performance Debugging

**Measure Step Duration:**

```yaml
steps:
  - name: Record start time
    id: start
    run: echo "start_time=$(date +%s)" >> $GITHUB_OUTPUT

  - name: Long running step
    run: npm run build

  - name: Calculate duration
    run: |
      END_TIME=$(date +%s)
      DURATION=$((END_TIME - $&#123;&#123; steps.start.outputs.start_time }}))
      echo "::notice::Build took ${DURATION} seconds"
```

**Identify Slow Steps:**

```yaml
steps:
  - name: Step 1
    run: |
      echo "::group::Step 1"
      time npm install
      echo "::endgroup::"

  - name: Step 2
    run: |
      echo "::group::Step 2"
      time npm run build
      echo "::endgroup::"
```

---

### Debugging Secrets and Permissions

**Verify Secret Availability (Without Exposing Values):**

```yaml
steps:
  - name: Check secret availability
    run: |
      echo "MY_SECRET exists: $&#123;&#123; secrets.MY_SECRET != '' }}"
      echo "MY_SECRET length: ${#MY_SECRET}"
      echo "MY_SECRET first char: ${MY_SECRET:0:1}"
    env:
      MY_SECRET: $&#123;&#123; secrets.MY_SECRET }}
```

**Debug GITHUB_TOKEN Permissions:**

```yaml
permissions:
  contents: read
  pull-requests: write

steps:
  - name: Check token permissions
    env:
      GH_TOKEN: $&#123;&#123; secrets.GITHUB_TOKEN }}
    run: |
      echo "::group::Token Info"
      gh api /rate_limit
      echo "::endgroup::"

      echo "::group::Test PR Write"
      gh pr list --repo $&#123;&#123; github.repository }} || echo "Cannot list PRs"
      echo "::endgroup::"
```

::: danger Security Warning
**NEVER** echo secret values directly:
```yaml
# ❌ NEVER DO THIS
run: echo "Secret: $&#123;&#123; secrets.MY_SECRET }}"

# ✅ DO THIS instead
run: echo "Secret exists: $&#123;&#123; secrets.MY_SECRET != '' }}"
```
GitHub automatically masks registered secrets, but avoid echoing them as best practice.
:::

---

### Debugging Self-Hosted Runners

**Runner Diagnostics:**

```yaml
steps:
  - name: Runner diagnostics
    run: |
      echo "::group::Runner Information"
      echo "Runner name: $RUNNER_NAME"
      echo "Runner OS: $RUNNER_OS"
      echo "Runner arch: $RUNNER_ARCH"
      echo "Runner temp: $RUNNER_TEMP"
      echo "Runner tool cache: $RUNNER_TOOL_CACHE"
      echo "::endgroup::"

      echo "::group::System Resources"
      df -h
      free -h
      uptime
      echo "::endgroup::"

      echo "::group::Installed Tools"
      which node && node --version || echo "Node not found"
      which npm && npm --version || echo "npm not found"
      which docker && docker --version || echo "Docker not found"
      echo "::endgroup::"
```

---

### Common Debugging Patterns

**Pattern 1: Checkpoint Debugging**

```yaml
steps:
  - name: Checkpoint 1
    run: echo "::notice::Reached checkpoint 1"

  - name: Potentially failing step
    run: ./script.sh

  - name: Checkpoint 2
    run: echo "::notice::Reached checkpoint 2"
```

**Pattern 2: Defensive Debugging**

```yaml
steps:
  - name: Defensive step
    run: |
      set -x  # Enable debug output
      set -e  # Exit on error

      # Verify prerequisites
      test -f package.json || { echo "::error::package.json not found"; exit 1; }
      test -d node_modules || { echo "::warning::node_modules not found, installing..."; npm install; }

      # Run with error handling
      npm test || { echo "::error::Tests failed"; exit 1; }

      set +x  # Disable debug output
```

**Pattern 3: Isolation Testing**

```yaml
steps:
  - name: Isolate and test
    run: |
      # Test in clean environment
      docker run --rm -v $(pwd):/workspace -w /workspace node:18 bash -c "
        npm install
        npm test
      "
```

---

### Troubleshooting Checklist

**Workflow Not Triggering:**
- [ ] Check event trigger configuration (on:)
- [ ] Verify branch/path filters
- [ ] Check if workflow file is in `.github/workflows/`
- [ ] Validate YAML syntax
- [ ] Check repository settings → Actions → General → Allow actions

**Step Failing:**
- [ ] Check exit code and error message
- [ ] Enable debug logging (ACTIONS_STEP_DEBUG)
- [ ] Add debug output before failing command
- [ ] Verify environment variables and secrets
- [ ] Check file paths and working directory
- [ ] Verify dependencies are installed

**Permission Errors:**
- [ ] Check `permissions:` block
- [ ] Verify GITHUB_TOKEN scopes needed
- [ ] Check repository settings → Actions → General → Workflow permissions
- [ ] For enterprise: check organization/enterprise policies

**Timeout Issues:**
- [ ] Check `timeout-minutes:` setting (default: 360)
- [ ] Identify slow steps with `time` command
- [ ] Consider splitting into multiple jobs
- [ ] Use caching to speed up dependencies

**Secret Not Working:**
- [ ] Verify secret name matches exactly (case-sensitive)
- [ ] Check secret scope (repository, organization, environment)
- [ ] Verify environment protection rules
- [ ] For reusable workflows: ensure secrets are passed explicitly

---

## Exam Essentials: Quick Facts

These are high-frequency exam topics that appear in multiple questions. Know these cold!

### Workflow File Location

::: danger Critical Exam Fact
Workflows MUST be in: `.github/workflows/`

```
✅ CORRECT:
.github/workflows/ci.yml
.github/workflows/deploy.yaml

❌ WRONG:
.github/workflow/ci.yml   (missing 's')
github/workflows/ci.yml    (missing '.')
workflows/ci.yml           (wrong location)
```

Exam often asks: "Where must workflow files be located?"
Answer: `.github/workflows/` directory
:::

---

### Action Versioning Best Practice

**Use Semantic Versioning (SemVer):**

```yaml
# ✅ RECOMMENDED - Semantic Versioning
uses: actions/checkout@v4
uses: actions/setup-node@v3.8.1

# Why SemVer?
- Clear version progression (v1 → v2 → v3)
- Breaking changes bump major version
- Users can pin to major (v4) or exact (v4.1.2)
- Industry standard, universally understood
```

**❌ Don't Use:**

```yaml
# ❌ Date-based versioning
uses: actions/checkout@2024-01-15

# ❌ Random numbers
uses: actions/checkout@123

# ❌ Descriptive names
uses: actions/checkout@latest-stable

# ❌ Commit hashes alone (hard to track)
uses: actions/checkout@a1b2c3d
```

::: tip Exam Question
"What's the recommended versioning strategy for publishing actions?"

Answer: **Semantic Versioning** (v1.2.3) - allows users to pin to major versions while getting patches automatically.
:::

---

### GitHub APIs

Know the difference - this appears in exam questions:

| API | Purpose | Used By | Example |
|-----|---------|---------|---------|
| **Checks API** | Report workflow status, results, annotations | GitHub Actions (automatic) | Status checks, annotations, logs |
| **Actions API** | Manage workflows, artifacts, runners | Workflow management tools | List workflows, get artifacts, manage runners |
| **REST API** | General GitHub operations | Apps, integrations | Create issues, PRs, repos |

**Checks API:**
- Automatically used by GitHub Actions
- Creates check runs for each workflow
- Displays status badges
- Shows annotations in PR diffs
- **Exam key point**: This is what makes workflow results visible in PRs

**Actions API:**
- Manage workflows programmatically
- Download artifacts
- Register/manage self-hosted runners
- Query workflow runs

::: tip Exam Note
"How does GitHub Actions report workflow results to PRs?"

Answer: Uses the **Checks API** to create check runs and annotations.
:::

---

### GitHub Packages Compatibility

Know which package types are supported:

| Package Type | Supported | Notes |
|--------------|-----------|-------|
| **npm** | ✅ Yes | JavaScript/Node.js packages |
| **NuGet** | ✅ Yes | .NET packages |
| **Maven** | ✅ Yes | Java packages (Maven) |
| **Gradle** | ✅ Yes | Java packages (Gradle) |
| **Docker** | ✅ Yes | Container images (ghcr.io) |
| **RubyGems** | ✅ Yes | Ruby packages |
| **Containers** | ✅ Yes | OCI containers |
| **RPM** | ❌ No | Not supported |
| **DEB** | ❌ No | Not supported |

::: danger Exam Trap
Question: "Can you publish RPM packages to GitHub Packages?"

Answer: **NO** - GitHub Packages does not support RPM packages. Supports npm, NuGet, Maven/Gradle, Docker, RubyGems, but NOT RPM or DEB.
:::

**Publishing to GitHub Packages:**

```yaml
- name: Publish to GitHub Packages
  run: npm publish
  env:
    NODE_AUTH_TOKEN: $&#123;&#123; secrets.GITHUB_TOKEN }}
```

---

### Org-Wide Naming Conventions

Best practices for organizational consistency:

**Workflow Naming:**
```yaml
# ✅ GOOD - Descriptive, consistent
name: CI - Build and Test
name: Deploy - Production
name: Security - CodeQL Analysis

# ❌ BAD - Inconsistent, unclear
name: stuff
name: my workflow
name: test123
```

**Reusable Workflow Naming:**
```
✅ GOOD:
.github/workflows/reusable-deploy.yml
.github/workflows/shared-test-suite.yml

Prefix Pattern:
- reusable-* for reusable workflows
- shared-* for shared templates
```

**Action Naming:**
```
✅ GOOD:
.github/actions/setup-environment/
.github/actions/deploy-to-k8s/

Pattern: verb-noun format
- setup-*
- deploy-*
- validate-*
```

**Convention Benefits:**
- Easy to find reusable components
- Clear purpose from name
- Consistent across organization
- Reduces duplication

::: tip Exam Scenario
"An organization wants all teams to use consistent reusable workflows. What's the best practice?"

Answer: Establish org-wide naming conventions (e.g., `reusable-*` prefix) and document in central location.
:::

---

## Key Terms & Definitions

| Term | Definition |
|------|------------|
| Workflow | Automated process defined in YAML |
| Job | Set of steps that execute on the same runner |
| Step | Individual task within a job |
| Action | Reusable unit of code for a step |
| Runner | Server that runs workflows |
| Event | Specific activity that triggers a workflow |
| Artifact | Files produced and saved from workflow |
| Cache | Stored dependencies to speed up workflows |

---

## Quick Reference

### Context Variables & Expressions

**GitHub Context:**

| Expression | Purpose | Example Value |
|------------|---------|---------------|
| `github.event_name` | Event that triggered | `push`, `pull_request` |
| `github.ref` | Git ref | `refs/heads/main` |
| `github.ref_name` | Short ref name | `main` |
| `github.sha` | Commit SHA | `ffac537e6cbbf9` |
| `github.actor` | User who triggered | `username` |
| `github.repository` | Repository name | `owner/repo` |
| `github.repository_owner` | Repository owner | `owner` |
| `github.workflow` | Workflow name | `CI` |
| `github.run_id` | Unique run ID | `123456789` |
| `github.run_number` | Run number | `42` |
| `github.job` | Current job ID | `build` |
| `github.action` | Current action name | `checkout` |
| `github.event` | Full event payload | Object |
| `github.workspace` | Workspace directory | `/home/runner/work/repo` |

**Runner Context:**

| Expression | Purpose | Values |
|------------|---------|--------|
| `runner.os` | Operating system | `Linux`, `Windows`, `macOS` |
| `runner.arch` | Architecture | `X64`, `ARM64` |
| `runner.name` | Runner name | `Hosted Agent` |
| `runner.temp` | Temp directory | `/tmp` |
| `runner.tool_cache` | Tool cache dir | `/opt/hostedtoolcache` |

**Secrets Context:**

| Expression | Purpose |
|------------|---------|
| `secrets.GITHUB_TOKEN` | Auto-generated token |
| `secrets.SECRET_NAME` | Repository/org/environment secret |

**Steps Context:**

| Expression | Purpose |
|------------|---------|
| `steps.<id>.outputs.<name>` | Access step output |
| `steps.<id>.outcome` | Step outcome (success/failure) |
| `steps.<id>.conclusion` | Step conclusion |

**Job Context:**

| Expression | Purpose |
|------------|---------|
| `job.status` | Current job status |
| `job.container.id` | Container ID |
| `job.services` | Service containers |

**Matrix Context:**

| Expression | Purpose |
|------------|---------|
| `matrix.<property>` | Access matrix value |
| `matrix.os` | Current OS in matrix |
| `matrix.node` | Current Node version |

**Inputs Context:**

| Expression | Purpose |
|------------|---------|
| `inputs.<name>` | workflow_dispatch input |
| `inputs.<name>` | workflow_call input |

### Workflow Commands & Special Files

Workflow commands let you communicate with the GitHub Actions runner to set outputs, create annotations, mask secrets, and more. Think of them as instructions you send to GitHub Actions while your workflow runs.

#### Special Environment Files

GitHub Actions provides special files that persist data between steps or modify the workflow environment:

**$GITHUB_OUTPUT - Setting Step Outputs:**

```yaml
steps:
  - name: Calculate version
    id: version
    run: |
      VERSION="1.2.3"
      echo "tag=v$VERSION" >> $GITHUB_OUTPUT
      echo "number=$VERSION" >> $GITHUB_OUTPUT

  - name: Use outputs
    run: |
      echo "Tag: $&#123;&#123; steps.version.outputs.tag }}"
      echo "Number: $&#123;&#123; steps.version.outputs.number }}"
```

**Why It's Important:** Outputs let you pass data from one step to another, or from a job to downstream jobs.

**$GITHUB_ENV - Setting Environment Variables:**

```yaml
steps:
  - name: Set environment variable
    run: |
      echo "DEPLOY_ENV=production" >> $GITHUB_ENV
      echo "BUILD_ID=$(date +%s)" >> $GITHUB_ENV

  - name: Use environment variables
    run: |
      echo "Environment: $DEPLOY_ENV"
      echo "Build ID: $BUILD_ID"
      # Available in all subsequent steps
```

**Key Difference from `env:`**
- `env:` sets variables for the current step only
- `$GITHUB_ENV` sets variables for all subsequent steps

**GITHUB_ENV Restrictions:**

This is a common exam trap! You cannot override certain protected environment variables:

```yaml
steps:
  - name: Try to override (will fail silently)
    run: |
      # ❌ CANNOT override - GitHub protects these
      echo "GITHUB_WORKSPACE=/custom/path" >> $GITHUB_ENV
      echo "RUNNER_OS=CustomOS" >> $GITHUB_ENV

      # ✅ CAN override - not protected
      echo "CI=false" >> $GITHUB_ENV
      echo "NODE_OPTIONS=--max-old-space-size=4096" >> $GITHUB_ENV
```

**Protected Variables (Cannot Override):**
- Any variable starting with `GITHUB_*`
- Any variable starting with `RUNNER_*`
- Examples: `GITHUB_WORKSPACE`, `GITHUB_SHA`, `RUNNER_OS`, `RUNNER_TEMP`

**Variables You CAN Override:**
- `CI` (set by GitHub but can be overridden)
- `NODE_OPTIONS`, `JAVA_HOME`, etc. (tool-specific vars)
- Any custom variable names

::: danger Exam Trap
Question might ask: "Can you set GITHUB_REPOSITORY via $GITHUB_ENV?"
Answer: **NO** - all GITHUB_* variables are protected and cannot be overridden.
:::

**$GITHUB_PATH - Adding to PATH:**

```yaml
steps:
  - name: Add custom binary to PATH
    run: |
      mkdir -p $HOME/bin
      echo "/custom/bin" >> $GITHUB_PATH
      echo "$HOME/bin" >> $GITHUB_PATH

  - name: Use binary from PATH
    run: my-custom-command  # Now in PATH!
```

**$GITHUB_STEP_SUMMARY - Job Summaries:**

```yaml
steps:
  - name: Create job summary
    run: |
      echo "## Build Results" >> $GITHUB_STEP_SUMMARY
      echo "" >> $GITHUB_STEP_SUMMARY
      echo "✅ Tests passed: 245" >> $GITHUB_STEP_SUMMARY
      echo "❌ Tests failed: 3" >> $GITHUB_STEP_SUMMARY
      echo "" >> $GITHUB_STEP_SUMMARY
      echo "### Failed Tests" >> $GITHUB_STEP_SUMMARY
      echo "- test_authentication" >> $GITHUB_STEP_SUMMARY
      echo "- test_database_connection" >> $GITHUB_STEP_SUMMARY
```

**Advanced Summary with Tables:**

```yaml
steps:
  - name: Test summary
    run: |
      cat >> $GITHUB_STEP_SUMMARY << 'EOF'
      ## Test Results

      | Category | Passed | Failed | Skipped |
      |----------|--------|--------|---------|
      | Unit | 150 | 2 | 0 |
      | Integration | 45 | 1 | 3 |
      | E2E | 50 | 0 | 5 |

      **Total**: 245 passed, 3 failed, 8 skipped
      EOF
```

::: tip Why This Matters in the Exam
Exam questions often ask: "How do you pass a value calculated in one step to another step?"
Answer: Write to `$GITHUB_OUTPUT` in the first step, read via `$&#123;&#123; steps.step-id.outputs.output-name }}` in subsequent steps.
:::

---

#### Workflow Commands (:: syntax)

Workflow commands use the `::` syntax to communicate with the runner:

**Grouping Logs (::group:: / ::endgroup::):**

Makes logs collapsible and organized:

```yaml
steps:
  - name: Build with grouped output
    run: |
      echo "::group::Installing Dependencies"
      npm install
      echo "::endgroup::"

      echo "::group::Running Build"
      npm run build
      echo "::endgroup::"

      echo "::group::Build Artifacts"
      ls -lh dist/
      echo "::endgroup::"
```

**Why Use Groups?**
- Makes logs easier to navigate
- Hides verbose output by default
- Highlights important sections

**Masking Values (::add-mask::):**

Prevents sensitive values from appearing in logs:

```yaml
steps:
  - name: Generate token
    run: |
      TOKEN=$(generate-api-token)
      echo "::add-mask::$TOKEN"
      # Now TOKEN is masked in all subsequent logs
      echo "Token: $TOKEN"  # Logs as: Token: ***
```

::: danger Critical Security Practice
Always mask dynamically generated secrets:
```yaml
# ✅ CORRECT - Mask before any output
steps:
  - name: Safe secret handling
    run: |
      SECRET=$(aws secretsmanager get-secret-value --secret-id my-secret --query SecretString --output text)
      echo "::add-mask::$SECRET"
      # Now safe to use in commands
      curl -H "Authorization: Bearer $SECRET" https://api.example.com
```
:::

**Log Annotations (::error::, ::warning::, ::notice::, ::debug::):**

```yaml
steps:
  - name: Validation with annotations
    run: |
      if [ ! -f "config.yml" ]; then
        echo "::error file=config.yml,line=1::Configuration file not found"
        exit 1
      fi

      if [ -f ".env" ]; then
        echo "::warning file=.env::Environment file should not be committed"
      fi

      echo "::notice::All validation checks passed"
```

**File Annotations with Line Numbers:**

```yaml
steps:
  - name: Lint check
    run: |
      # Annotate specific file and line
      echo "::error file=src/index.js,line=42,col=5::Unexpected token"
      echo "::warning file=src/utils.js,line=15::Deprecated function usage"
```

**Annotation Levels:**

| Command | Visibility | Use Case |
|---------|------------|----------|
| `::error::` | Always visible, fails check | Critical errors that should fail the workflow |
| `::warning::` | Visible in annotations tab | Non-critical issues, deprecation warnings |
| `::notice::` | Visible in logs and annotations | Important information |
| `::debug::` | Only with debug logging enabled | Detailed debugging information |

---

#### Stop Commands (Security)

Prevent workflow command injection:

```yaml
steps:
  - name: Safely handle untrusted input
    env:
      USER_INPUT: $&#123;&#123; github.event.comment.body }}
    run: |
      # Stop processing workflow commands
      STOP_TOKEN=$(uuidgen)
      echo "::stop-commands::$STOP_TOKEN"

      # Now safe to echo untrusted input
      echo "User said: $USER_INPUT"
      # Even if USER_INPUT contains "::error::", it won't be processed

      # Resume command processing
      echo "::$STOP_TOKEN::"
```

::: warning Security Issue
Without `::stop-commands::`, malicious input could execute workflow commands:
```yaml
# ❌ VULNERABLE
- run: echo "Comment: $&#123;&#123; github.event.comment.body }}"
# If comment contains "::add-mask::MY_SECRET", it would execute!

# ✅ SAFE
- env:
    COMMENT: $&#123;&#123; github.event.comment.body }}
  run: echo "Comment: $COMMENT"
# Environment variables don't process workflow commands
:::

---

#### Deprecated Commands (Don't Use)

These commands still work but are deprecated:

| Deprecated | Use Instead | Why |
|------------|-------------|-----|
| `::set-output::` | `$GITHUB_OUTPUT` | More secure, prevents command injection |
| `::save-state::` | `$GITHUB_STATE` | Consistency with other files |
| `::set-env::` | `$GITHUB_ENV` | Prevents environment variable injection |
| `::add-path::` | `$GITHUB_PATH` | More secure |

**Migration Example:**

```yaml
# ❌ OLD (deprecated)
steps:
  - id: old
    run: echo "::set-output name=version::1.2.3"
  - run: echo "::set-env name=MY_VAR::value"

# ✅ NEW (current)
steps:
  - id: new
    run: |
      echo "version=1.2.3" >> $GITHUB_OUTPUT
  - run: |
      echo "MY_VAR=value" >> $GITHUB_ENV
```

---

#### Real-World Examples

**Complete Build Summary:**

```yaml
steps:
  - name: Run tests
    id: test
    continue-on-error: true
    run: npm test

  - name: Create test summary
    if: always()
    run: |
      cat >> $GITHUB_STEP_SUMMARY << 'EOF'
      ## Test Results

      EOF

      if [ "$&#123;&#123; steps.test.outcome }}" == "success" ]; then
        echo "✅ **All tests passed**" >> $GITHUB_STEP_SUMMARY
      else
        echo "❌ **Some tests failed**" >> $GITHUB_STEP_SUMMARY
      fi

      echo "" >> $GITHUB_STEP_SUMMARY
      echo "### Details" >> $GITHUB_STEP_SUMMARY
      echo "- Build: #$&#123;&#123; github.run_number }}" >> $GITHUB_STEP_SUMMARY
      echo "- Commit: \`$&#123;&#123; github.sha }}\`" >> $GITHUB_STEP_SUMMARY
      echo "- Author: @$&#123;&#123; github.actor }}" >> $GITHUB_STEP_SUMMARY
```

**Dynamic Environment Setup:**

```yaml
steps:
  - name: Setup environment
    run: |
      # Set environment based on branch
      if [ "$&#123;&#123; github.ref }}" == "refs/heads/main" ]; then
        echo "ENVIRONMENT=production" >> $GITHUB_ENV
        echo "API_URL=https://api.example.com" >> $GITHUB_ENV
      else
        echo "ENVIRONMENT=staging" >> $GITHUB_ENV
        echo "API_URL=https://staging-api.example.com" >> $GITHUB_ENV
      fi

      # Add version
      VERSION=$(node -p "require('./package.json').version")
      echo "APP_VERSION=$VERSION" >> $GITHUB_ENV

  - name: Deploy
    run: |
      echo "Deploying to: $ENVIRONMENT"
      echo "API: $API_URL"
      echo "Version: $APP_VERSION"
      ./deploy.sh
```

**Safe Secret Handling:**

```yaml
steps:
  - name: Fetch and use secret from vault
    run: |
      # Fetch secret
      SECRET=$(vault kv get -field=token secret/api)

      # IMMEDIATELY mask it
      echo "::add-mask::$SECRET"

      # Group the API call logs
      echo "::group::API Call"
      curl -H "Authorization: Bearer $SECRET" https://api.example.com/data
      echo "::endgroup::"
```

---

**Quick Summary: Workflow Commands**

- **$GITHUB_OUTPUT**: Pass data between steps (`echo "key=value" >> $GITHUB_OUTPUT`)
- **$GITHUB_ENV**: Set environment variables for future steps
- **$GITHUB_PATH**: Add directories to PATH
- **$GITHUB_STEP_SUMMARY**: Create rich job summaries with Markdown
- **::group:: / ::endgroup::**: Organize logs into collapsible sections
- **::add-mask::**: Hide sensitive values in logs
- **::error::, ::warning::, ::notice::**: Create annotations
- **::stop-commands::**: Prevent command injection from untrusted input

---

## Notes & Reminders

- Always pin actions to specific versions for security
- Use caching to speed up workflows
- Keep workflows modular with reusable workflows and actions
- Test workflows in a separate branch before merging to main
- Monitor workflow usage and costs for self-hosted runners
- Review security alerts for actions dependencies

---

[← Back to Overview](./index.md) | [← Exam Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)

*Last Updated: 2026-01-09*
