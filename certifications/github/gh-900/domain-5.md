---
title: "GH-900 - Domain 5: Project Management"
description: "GH-900 Domain 5: GitHub Projects, board/table/roadmap views, classic vs new Projects, automation, and Insights."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 5, github projects, project management, kanban, roadmap, automation, insights, milestones
---

# Domain 5: Project Management (7%)

[← Domain 4](./domain-4.md) · [Domain 6 →](./domain-6.md)

---

## GitHub Projects

**GitHub Projects** is the built-in project management tool for planning, tracking, and prioritizing work across issues and pull requests.

### Classic Projects vs New Projects

| Feature | Classic Projects | New Projects (Projects v2) |
|---------|-----------------|--------------------------|
| Views | Kanban board only | Board, Table, Roadmap |
| Filtering | Basic | Advanced (grouping, sorting, filtering) |
| Custom fields | ❌ No | ✅ Yes (text, number, date, single select, iteration) |
| Linked items | Issues, PRs, notes | Issues, PRs from any repo |
| Automation | Basic | Advanced (built-in + Actions) |
| Status | Legacy (being deprecated) | Current / recommended |

::: warning Exam Trap
The exam may reference both. Key distinction: **New Projects (v2)** supports multiple views (Board, Table, Roadmap) and **custom fields**. Classic Projects only has a Kanban board.
:::

---

## Project Views

**New Projects** supports three views:

| View | Best for |
|------|----------|
| **Board** | Kanban-style columns (e.g., Todo / In Progress / Done) |
| **Table** | Spreadsheet-style with custom fields |
| **Roadmap** | Timeline view for dates and iterations |

Each view is independently configurable — different filtering, grouping, and sorting.

---

## Custom Fields

New Projects allows custom metadata on items:

| Field Type | Example use |
|------------|-------------|
| **Text** | Notes, owner name |
| **Number** | Story points, priority score |
| **Date** | Target date, deadline |
| **Single select** | Status, priority (High/Medium/Low) |
| **Iteration** | Sprint planning (Sprint 1, Sprint 2, etc.) |

---

## Automation

Projects support two types of automation:

### Built-in Automation

Available without any Actions setup:
- Auto-add issues/PRs when opened
- Auto-archive items when closed
- Auto-move items to "Done" column when PR merged

### GitHub Actions Automation

Use the `actions/github-script` or native Actions to:
- Set custom fields automatically
- Move items between views based on labels
- Trigger workflows when project items change

---

## Milestones

**Milestones** group issues and PRs toward a goal with a target due date. Key differences from Projects:

| Feature | Milestones | Projects |
|---------|-----------|---------|
| Scope | Single repo | Cross-repo |
| Due date | ✅ Yes | Per-item via date field |
| Completion % | Auto-calculated | Manual tracking |
| Views | List only | Board/Table/Roadmap |
| Custom fields | ❌ No | ✅ Yes |

::: tip Exam Tip
Milestones = simple, single-repo, deadline-based grouping. Projects = flexible, multi-repo, full project management.
:::

---

## Insights

**Project Insights** provides built-in charts and analytics for your project:

- **Current iteration** — throughput and velocity
- **Burn up / burn down** charts — progress over time
- Custom charts based on any field

::: info Who has access?
Insights are visible to anyone who can view the project. Org-level projects can track work across all repos in the organization.
:::

---

<FlashcardDeck
  title="Domain 5: Project Management"
  storage-key="gh-900-domain-5-cards"
  :cards="[
    {
      question: 'What are the three views available in GitHub Projects (v2)?',
      answer: '<strong>Board</strong> (Kanban), <strong>Table</strong> (spreadsheet), and <strong>Roadmap</strong> (timeline).'
    },
    {
      question: 'What is the key difference between Classic Projects and new Projects?',
      answer: 'New Projects (v2) supports multiple views, custom fields, and advanced automation. Classic Projects only has a Kanban board and is being deprecated.'
    },
    {
      question: 'What types of custom fields can be added to a GitHub Project?',
      answer: 'Text, Number, Date, Single Select, and Iteration.'
    },
    {
      question: 'What is an Iteration field used for in GitHub Projects?',
      answer: 'Sprint planning — define time-boxed iterations (e.g., Sprint 1, Sprint 2) and assign issues to them.'
    },
    {
      question: 'When should you use Milestones vs GitHub Projects?',
      answer: '<strong>Milestones</strong>: simple deadline-based grouping within a single repo. <strong>Projects</strong>: cross-repo, flexible tracking with multiple views and custom fields.'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [Domain 6 →](./domain-6.md)
