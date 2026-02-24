---
title: "GH-900 - Domain 7: Benefits of the GitHub Community"
description: "GH-900 Domain 7: Open source, licensing, InnerSource, GitHub profile, Marketplace, GitHub Education, and Stars."
head:
  - - meta
    - name: keywords
      content: gh-900, domain 7, open source, innersource, github community, github stars, github education, marketplace, profile, contributing
---

# Domain 7: Benefits of the GitHub Community (10%)

[← Domain 6](./domain-6.md) · [Overview →](./index.md)

---

## Open Source on GitHub

**Open source** software has publicly available source code that anyone can view, modify, and distribute — subject to the license terms.

### Open Source Benefits

- **Transparency** — code is visible to everyone
- **Community contributions** — anyone can suggest fixes or improvements
- **Rapid iteration** — more eyes find bugs faster
- **Ecosystem** — builds libraries, tools, and integrations

### How to Contribute to Open Source

The standard workflow:

```
Fork repo → clone locally → create branch → make changes
→ push to fork → open PR → maintainer reviews → merged
```

::: tip Exam Tip
You **fork** a public repo you don't own because you can't push directly. Your fork is your own copy. PRs go from your fork back to the upstream original.
:::

### CONTRIBUTING.md

Repositories often include a `CONTRIBUTING.md` file that explains:
- How to report bugs
- How to submit PRs
- Code style standards
- Development setup

GitHub surfaces this file when users open Issues or PRs, guiding contributors.

### CODE_OF_CONDUCT.md

Sets community behavior expectations. GitHub provides the Contributor Covenant template. Violations can result in removal from the project or organization.

---

## Licensing

Choosing the right license is critical for open source projects.

| License | Type | Key rule |
|---------|------|----------|
| **MIT** | Permissive | Keep copyright notice only |
| **Apache 2.0** | Permissive | Keep copyright + patent clause |
| **GPL v3** | Copyleft | Derivatives must also be GPL |
| **AGPL v3** | Strong copyleft | Even network use triggers copyleft |
| **BSD 2/3-clause** | Permissive | Similar to MIT |
| **Creative Commons** | For content | Not intended for software |
| **Unlicense** | Public domain | No restrictions at all |

::: warning No License = No Permission
A repository with **no license** is NOT open source. All rights are reserved by the author by default — others cannot legally use, copy, or modify the code without explicit permission.
:::

---

## InnerSource

**InnerSource** applies open source development practices **inside an organization** — sharing code and collaboration patterns across teams without making code public.

| Aspect | Open Source | InnerSource |
|--------|-------------|-------------|
| Visibility | Public (internet) | Internal (organization) |
| Contributors | Anyone worldwide | Org members only |
| Repo visibility | Public | Internal (GitHub Enterprise) |
| Benefits | Same patterns and tooling | Cross-team collaboration within company |

::: info GitHub Feature
Internal repositories on **GitHub Enterprise Cloud** are the foundation for InnerSource — visible to all org members but not the public.
:::

---

## GitHub Profile

Your GitHub profile is your developer identity on the platform.

### Profile README

Create a **special repository** named exactly the same as your username (e.g., `gobinathm/gobinathm`) with a `README.md` — GitHub displays it on your profile page.

### Contribution Graph

The green squares activity graph shows daily commit activity. Contributions count when:
- Commits are made to the default branch
- Issues and PRs are opened
- PR reviews are submitted
- The repo is not a fork (by default)

::: tip Exam Tip
Contributions to **private repositories** also count on the graph if "Private contributions" is enabled in profile settings.
:::

### Pinned Repositories

Up to 6 repositories (including gists) can be pinned to your profile for visibility.

---

## GitHub Marketplace

**GitHub Marketplace** is where developers and organizations find apps and Actions to extend GitHub workflows.

| Category | Examples |
|----------|---------|
| **GitHub Apps** | CI/CD tools, code review bots, project management integrations |
| **GitHub Actions** | Reusable workflow steps and full workflow templates |
| **OAuth Apps** | Third-party apps that authenticate via GitHub |

Apps can be:
- **Free** or **paid** (billed through GitHub)
- Installed at the **organization** or **user** level
- Granted specific repository permissions

---

## GitHub Education

**GitHub Education** provides free access to GitHub tools and learning resources for students and educators.

| Program | Who it's for | What they get |
|---------|-------------|---------------|
| **GitHub Student Developer Pack** | Verified students | Free tools: Copilot, cloud credits, domains, courses |
| **GitHub Campus Expert** | Student community leaders | Training, speaking opportunities, GitHub swag |
| **GitHub Classroom** | Educators | Assignment distribution, automated grading |

---

## GitHub Stars Program

**GitHub Stars** is a recognition program for outstanding community members — developers who educate, inspire, and grow the GitHub community.

- Selected by GitHub (application + nomination)
- Recognized on GitHub's Stars page
- Get early access to features and GitHub events

---

## GitHub Sponsors

**GitHub Sponsors** lets users and companies financially support open source developers directly through GitHub:

- Individual or organization sponsors
- Monthly recurring or one-time payments
- GitHub waives transaction fees (GitHub does not take a cut)
- Sponsors get recognition on the developer's profile

---

<FlashcardDeck
  title="Domain 7: GitHub Community"
  storage-key="gh-900-domain-7-cards"
  :cards="[
    {
      question: 'What is InnerSource?',
      answer: 'Applying open source development practices (PRs, Issues, code review) <strong>inside an organization</strong> using internal repositories — without making code public.'
    },
    {
      question: 'What happens if a GitHub repository has no license?',
      answer: 'All rights are reserved by the author. Others legally <strong>cannot</strong> use, copy, modify, or distribute the code without explicit permission. No license ≠ open source.'
    },
    {
      question: 'What is a Profile README on GitHub?',
      answer: 'Create a repository named exactly the same as your username with a README.md — GitHub displays it as a special section on your profile page.'
    },
    {
      question: 'What is the GitHub Student Developer Pack?',
      answer: 'A program providing verified students with free access to developer tools: GitHub Copilot, cloud credits, domains, online courses, and more.'
    },
    {
      question: 'What is GitHub Sponsors?',
      answer: 'A way to financially support open source developers through GitHub — monthly or one-time payments. GitHub waives all transaction fees.'
    },
    {
      question: 'What is the purpose of CONTRIBUTING.md?',
      answer: 'Explains how to contribute to the project: bug reporting process, PR guidelines, code style, and development setup. GitHub surfaces it when users open Issues or PRs.'
    },
    {
      question: 'What type of license must derivatives use under GPL v3?',
      answer: 'Derivatives must also be licensed under <strong>GPL v3</strong> (copyleft). This is the key difference from permissive licenses like MIT or Apache 2.0.'
    }
  ]"
/>

---

[← Domain 6](./domain-6.md) · [Overview →](./index.md) · [Exam Guide →](./exam-guide.md)
