---
title: "GH-500 - Domain 5: Use code scanning with CodeQL"
description: "GH-500 Domain 5: CodeQL Default vs Advanced setup, queries, suites, packs"
head:
  - - meta
    - name: keywords
      content: gh-500, domain 5, codeql, queries, custom queries, advanced setup
---

# Domain 5: Use code scanning with CodeQL (20%)

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)

::: tip Exam Tip
Know the difference between default setup and advanced setup, and when to use each. Understand the different CodeQL query suites and what CodeQL packs are used for.
:::

---

## What is CodeQL?

CodeQL is a **semantic code analysis engine** that treats code as data, allowing you to query it for vulnerability patterns. It powers GitHub's native code scanning feature.

### Supported Languages

- C / C++
- C# / .NET
- Go
- Java / Kotlin
- JavaScript / TypeScript
- Python
- Ruby
- Swift (for iOS/macOS apps)

That is commonly tested as **10 primary language ecosystems**: C/C++, C#, Go, Java/Kotlin, JavaScript/TypeScript, Python, Ruby, and Swift.

### What CodeQL Sees and What It Does Not

- CodeQL primarily analyzes your **source code** and the code model it can build during the workflow
- It does **not** scan third-party dependencies the same way it scans your application source
- In practice, CodeQL analyzes what it can **see during checkout and build**, which is why compiled-language setup matters so much
- For compiled languages, CodeQL only analyzes code that is actually included in the build; code excluded by build flags or omitted from the build target will not be analyzed

::: warning Exam Trap
If the question is really about vulnerable libraries or package versions, the better answer is usually **Dependabot** or the **dependency graph**, not CodeQL alone.
:::

---

## CodeQL Setup Options

### Default Setup

The fastest way to enable CodeQL — GitHub automatically:
- Detects the languages in your repository
- Selects the appropriate query suite (security-extended)
- Configures scan triggers (push to default branch, PRs to default branch)
- No workflow YAML file needed

**Enable via**: Settings → Code security → Code scanning → Set up → Default

::: tip Best for
Repositories where you want immediate, zero-configuration scanning. Ideal for most projects.
:::

::: warning Exam Trap
Default setup is not completely "unconfigurable." You can still change standard options in the UI, including switching between the built-in query suite choices, without writing workflow YAML.
:::

### Advanced Setup

A GitHub Actions workflow file (`.github/workflows/codeql.yml`) gives you full control over:
- Which query suites to run (default, extended, custom)
- Which branches to scan
- Scan schedule (cron)
- Build commands for compiled languages
- Custom CodeQL packs

**Enable via**: Settings → Code security → Code scanning → Set up → Advanced

#### Example Advanced CodeQL Workflow

```yaml
name: CodeQL Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1'   # Every Monday at 2am UTC

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read

    strategy:
      matrix:
        language: [javascript, python]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          queries: security-extended   # or: security-and-quality

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

---

## How a CodeQL Analysis Run Works

In GitHub Actions, a standard CodeQL workflow follows this sequence:

1. `github/codeql-action/init` selects languages and query packs
2. `autobuild` or a manual build step prepares compiled projects
3. `github/codeql-action/analyze` evaluates the CodeQL database and publishes alerts

For interpreted languages, the build phase is often minimal. For compiled languages, the build phase is more important because CodeQL needs a successful build to understand the code accurately.

::: warning Exam Trap
If a compiled language project needs custom build flags or a multi-step build, default setup may not be sufficient. That is a strong signal to switch to **advanced setup**.
:::

### CodeQL Databases and Retention

- During a workflow run, CodeQL creates a **temporary database** for analysis
- After the run completes, GitHub keeps the **analysis results and alerts**, not the full database as the primary artifact for normal use
- If you download a database for local investigation in VS Code or the CLI, it can be quite large

For the exam, remember the distinction: GitHub retains the **results**, while the workflow database itself is an implementation detail of the analysis run.

---

## Comparing Default vs Advanced Setup

| | Default Setup | Advanced Setup |
|---|---|---|
| **Configuration** | Zero YAML — GitHub auto-configures | `.github/workflows/codeql.yml` required |
| **Language detection** | Automatic | Manual (matrix configuration) |
| **Query suite** | security-extended (auto) | Configurable (any suite or custom queries) |
| **Schedule** | On push and PR to default branch | Fully configurable (cron, any branch) |
| **Build step** | Automatic (autobuild) | Manual (specify build commands) |
| **Best for** | Quick start, standard projects | Monorepos, compiled languages needing custom build, custom queries |

---

## CodeQL Query Suites

CodeQL includes predefined query suites to group vulnerabilities and checks together:

| Suite | Description | When to use |
|---|---|---|
| **`security-extended`** (default) | Security queries + additional CWE coverage | Most repositories |
| **`security-and-quality`** | Security + code quality queries (can be noisy) | When you want code quality coverage too |
| **Custom packs** | Your own or third-party CodeQL queries | Specialized security requirements |

::: warning Exam Trap
Default setup uses the **security-extended** query suite by default — not `security-and-quality`. The quality suite generates more alerts and is not enabled by default because it may produce more noise.
:::

---

## Custom Queries, Packs, and Suites

CodeQL can be extended beyond the built-in query suites.

### Custom Queries

- Write or import queries when your organization needs checks for a specific framework or coding pattern
- Best used in **advanced setup**, where you control the workflow YAML

### CodeQL Packs

- Packs bundle related CodeQL queries and metadata
- Packs can be referenced from workflow configuration so teams can reuse the same rules across repositories
- Use packs when you want a portable, versioned way to share custom logic

### When to Use Which

| Need | Best fit |
|---|---|
| Standard security scanning | `security-extended` |
| Add code quality findings | `security-and-quality` |
| Reuse organization-specific rules | Custom pack |
| Test one-off specialized detection | Custom query |

---

## Working with CodeQL Alerts

CodeQL alerts are more useful when you know how to interpret the result, not just where to click.

### Query Help in the UI

Every CodeQL alert in the GitHub UI includes a **Show more** section with query help. This typically includes:

- A description of the vulnerability pattern
- A **Recommendation** section explaining the safer fix
- Often **Compliant** versus **Non-compliant** code examples

This is useful both for remediation and for distinguishing true positives from findings that need more context.

### Read the Alert in This Order

1. **Rule ID and title**: what class of bug was found
2. **Security severity / precision**: how risky and how trustworthy the finding is
3. **Path or flow**: how untrusted data reaches the sink
4. **CWE mapping**: the weakness category for triage and reporting
5. **Suggested remediation**: safer coding pattern to apply

### Typical Triage Outcomes

- **Fix** when the path is reachable and exploitable
- **Dismiss as false positive** when the analysis does not reflect runtime reality
- **Dismiss as used in tests / won't fix** when the context justifies it and the decision is documented

---

## Troubleshooting CodeQL Scanning

| Problem | Likely Cause | Fix |
|---|---|---|
| No alerts generated | Language not supported or wrong language config | Verify language matrix in workflow |
| Autobuild fails | Compiled language requires specific build steps | Use advanced setup with manual build commands |
| Too many alerts (noise) | `security-and-quality` suite enabled | Switch to `security-extended` |
| Alerts not appearing in PRs | Workflow not triggered on `pull_request` or ruleset/branch protection not enforcing checks | Add PR trigger and enforce the required check |
| Code unexpectedly missing from analysis | File/module not included in actual build target | Adjust the build so CodeQL can see it |
| Autobuild job fails after silence | Build emitted no output for too long | Ensure the build produces output or use explicit manual build steps |

### Autobuild Silence Limit

- A CodeQL autobuild step that produces roughly **2 minutes of no output** can fail
- This usually points to a build process that needs manual commands instead of relying on autobuild

### Strong Exam Heuristics

- If **C++**, **Java**, or another compiled project fails under default setup, the answer is often: **switch to advanced setup and provide manual build commands**
- If the problem mentions vulnerable packages rather than application code, think **Dependabot** before CodeQL

---

<FlashcardDeck
  title="Domain 5 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between CodeQL default setup and advanced setup?',
      answer: '<strong>Default setup</strong>: Zero YAML, GitHub auto-detects languages and configures scanning — fastest to enable. <strong>Advanced setup</strong>: You write a <code>codeql.yml</code> workflow for custom query suites, build steps, and schedules — maximum control.'
    },
    {
      question: 'Which CodeQL query suite is used by default setup?',
      answer: '<strong>security-extended</strong> — provides security coverage with CWE categories. The security-and-quality suite adds code quality queries but is not the default due to higher alert volume.'
    },
    {
      question: 'What languages does CodeQL natively support?',
      answer: 'CodeQL supports <strong>10 primary language ecosystems</strong>: C/C++, C#, Go, Java/Kotlin, JavaScript/TypeScript, Python, Ruby, and Swift.'
    },
    {
      question: 'When should you move from CodeQL default setup to advanced setup?',
      answer: 'Move to <strong>advanced setup</strong> when you need custom build steps, custom schedules, non-default branches, custom queries, or CodeQL packs. Compiled projects that fail autobuild are a common reason.'
    },
    {
      question: 'What is a CodeQL pack?',
      answer: 'A <strong>CodeQL pack</strong> is a reusable bundle of CodeQL queries and metadata that can be referenced from a workflow so multiple repositories can share the same custom analysis logic.'
    },
    {
      question: 'Does CodeQL scan dependencies the same way it scans your source code?',
      answer: '<strong>No.</strong> CodeQL primarily analyzes the source code and build artifacts it can see during the workflow. Dependency vulnerability management is mainly handled by the dependency graph and Dependabot.'
    },
    {
      question: 'What does GitHub retain after a CodeQL run completes?',
      answer: 'GitHub primarily retains the <strong>analysis results and alerts</strong>. The CodeQL database created during the run is temporary unless you explicitly download it for local analysis.'
    },
    {
      question: 'For compiled languages, what code does CodeQL actually analyze?',
      answer: 'CodeQL analyzes the code that is actually included in the build it can observe. If code is excluded by compiler flags or not part of the build target, CodeQL will not analyze it.'
    },
    {
      question: 'Where do you find the remediation guidance for a CodeQL alert in the GitHub UI?',
      answer: 'In the alert\'s <strong>Show more</strong> / query help section, which includes the vulnerability description, recommendations, and often compliant versus non-compliant code examples.'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)
