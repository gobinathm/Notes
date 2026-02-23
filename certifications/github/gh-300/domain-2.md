---
title: "GH-300 - Domain 2: Use GitHub Copilot Features"
description: "GH-300 Domain 2: IDE features, CLI, Agent Mode, Edit Mode, MCP, and org-wide policy management"
head:
  - - meta
    - name: keywords
      content: gh-300, domain 2, github copilot ide, agent mode, edit mode, copilot cli, mcp, copilot chat
---

# Domain 2: Use GitHub Copilot Features (25–30%)

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)

::: tip Exam Tip
Domain 2 is the largest domain. Know every interaction mode (inline, chat, CLI, Agent Mode, Edit Mode), what each is used for, and the difference between Copilot Individual, Business, and Enterprise plans.
:::

---

## Copilot in the IDE

### Inline Suggestions

- **Trigger**: Automatically as you type code, comments, or function signatures
- **Accept**: `Tab` key (full suggestion) or `→` (word-by-word)
- **Dismiss**: `Esc`
- **Cycle alternatives**: `Alt+]` / `Alt+[`
- Context comes from: open files in the editor, file type, cursor position, comments

### Copilot Chat (IDE)

- Conversational AI in the IDE sidebar or inline
- Ask questions about code, request refactors, generate tests, explain errors
- **`@workspace`**: Searches across your entire project
- **`@file`**: References a specific file
- **`/explain`**: Explains selected code
- **`/fix`**: Suggests a fix for a problem
- **`/tests`**: Generates unit tests for selected code
- **`/doc`**: Generates documentation

### Plan Mode

- Shows Copilot's intended approach **before** making changes
- Lets you review and approve the plan before execution
- Useful for complex refactors or multi-step operations

### File Exclusions in IDE

- Admins (Copilot Business/Enterprise) configure content exclusions
- When a file is excluded: Copilot won't suggest from it or use it as context
- Can be set at the org level or per-repo via settings

---

## GitHub Copilot CLI

GitHub Copilot CLI brings AI assistance to the terminal.

### Installation
```bash
gh extension install github/gh-copilot
gh copilot --help
```

### Key Commands

| Command | What it does |
|---|---|
| `gh copilot suggest "how to list files modified in last week"` | Generates a shell command suggestion |
| `gh copilot explain "find . -name '*.log' -mtime +7 -delete"` | Explains what a shell command does |

### Interactive vs Session Mode
- **Interactive**: Single-turn questions and suggestions
- **Session mode**: Multi-turn conversation to refine commands

### Generating Scripts
- Use `gh copilot suggest` to draft shell scripts from natural language descriptions
- Always review before running — same validation rules as IDE suggestions apply

---

## GitHub Copilot Features and Capabilities

### Agent Mode

- Copilot acts **autonomously** to complete multi-step tasks
- Can read/write files, run terminal commands, and iterate on its own output
- **Sub-Agents**: Delegate sub-tasks (e.g., running tests, fixing lint errors) to specialized agents
- Best for: complex refactors, scaffolding new features, automating repetitive workflows
- **Agent Sessions**: Persistent context across an autonomous working session

::: warning Trap
Agent Mode can run terminal commands autonomously. Always review what it plans to do in Plan Mode before allowing execution.
:::

### Edit Mode

- Copilot proposes cross-file edits based on your request
- You **review each change** and selectively accept or reject
- Unlike Agent Mode, Edit Mode doesn't run commands — it's edit-only
- Best for: targeted refactors, renaming, updating an interface across files

### MCP (Model Context Protocol)

- Connects Copilot to **external services and data sources** at runtime
- Examples: connect to a database schema, an API specification, a project management tool
- Provides grounding without requiring you to copy-paste context manually

### Copilot Spaces

- Persistent shared workspaces for collaborative AI interactions
- Team members can share context, prompts, and Copilot conversations

### Copilot Spark

- AI-powered feature for **non-developer users** to build simple apps and scripts
- Natural language to working app, with no code required

### Pull Request Summaries

- Copilot automatically generates a PR description based on the diff
- Configurable with custom instructions via review standards files

### Code Review with Copilot

- Copilot can act as a code reviewer, flagging issues in PRs
- Can suggest specific line-level improvements
- Enable via: Org Settings → Copilot → Code Review

---

## Copilot Plans Comparison

| Feature | Individual | Business | Enterprise |
|---|---|---|---|
| IDE suggestions & chat | ✅ | ✅ | ✅ |
| CLI | ✅ | ✅ | ✅ |
| Org-wide policy management | ❌ | ✅ | ✅ |
| Content exclusions | ❌ | ✅ | ✅ |
| Audit log events | ❌ | ✅ | ✅ |
| Knowledge Bases | ❌ | ❌ | ✅ |
| Copilot Chat on GitHub.com | ❌ | ❌ | ✅ |
| Custom fine-tuned models | ❌ | ❌ | ✅ |
| PR summaries | ❌ | ✅ | ✅ |

---

## Managing Organization-Wide Settings

Available in **Copilot Business and Enterprise** plans only.

### Policy Management

- Configure which Copilot features are available (suggestions, chat, CLI, PR summaries, code review)
- Restrict which IDEs can use Copilot
- Enable or disable features per org or per repo

### Audit Log Events

- Track who used Copilot, what features they accessed, and when
- Available via: Org Settings → Audit log → filter by `copilot`
- Streamable to a SIEM for compliance reporting
- Common audit events: `copilot.suggestion_accepted`, `copilot.chat_message_sent`

### Managing Subscriptions via REST API

```
GET /orgs/{org}/copilot/billing
GET /orgs/{org}/copilot/billing/seats
POST /orgs/{org}/copilot/billing/selected_users
DELETE /orgs/{org}/copilot/billing/selected_users
```

<FlashcardDeck
  title="Domain 2 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between Agent Mode and Edit Mode?',
      answer: '<strong>Agent Mode</strong>: autonomous, can run terminal commands, multi-step tasks. <strong>Edit Mode</strong>: proposes cross-file edits only, you review and accept each change individually.'
    },
    {
      question: 'What does MCP do for GitHub Copilot?',
      answer: 'Model Context Protocol connects Copilot to external services (databases, APIs, tools) so it can use real-time external data as context without manual copy-paste.'
    },
    {
      question: 'What Copilot plan is required for Knowledge Bases?',
      answer: '<strong>Copilot Enterprise</strong> — Knowledge Bases are not available on Individual or Business plans.'
    },
    {
      question: 'What CLI command explains what a shell command does?',
      answer: '<code>gh copilot explain &quot;command&quot;</code>'
    },
    {
      question: 'What is the purpose of Plan Mode?',
      answer: 'Copilot shows its intended approach and changes <strong>before</strong> executing them — allowing you to review and approve before any modifications are made.'
    }
  ]"
/>

---

[← Domain 1](./domain-1.md) · [Next Domain →](./domain-3.md)
