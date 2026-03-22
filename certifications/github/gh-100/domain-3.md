---
title: "GH-100 - Domain 3: Deployment, Distribution & Licensing"
description: "GH-100 Domain 3: GHEC vs GHES vs GHAE, pricing, license management, and GitHub Packages"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 3, github enterprise cloud, github enterprise server, ghec, ghes, github ae, licensing, github packages
---

# Domain 3: Describe How GitHub is Deployed, Distributed, and Licensed (9%)

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)

::: tip Exam Tip
This domain tests your ability to select the right GitHub product for a given business requirement and explain pricing. Know the **key differentiators** between GHEC, GHES, and GHAE — especially around data residency, control, and management overhead.
:::

---

## GitHub Enterprise Products: GHEC vs GHES vs GHAE

### GitHub Enterprise Cloud (GHEC)

- **Hosted by**: GitHub (Microsoft) — SaaS
- **Where data lives**: GitHub's cloud infrastructure
- **Best for**: Organizations that want enterprise features without managing infrastructure
- **Key features**: SAML SSO, SCIM, audit log streaming, GitHub Actions (with hosted runners), GitHub Advanced Security, enterprise policies
- **Compliance**: SOC 2 Type 2, ISO 27001, GDPR-ready

### GitHub Enterprise Server (GHES)

- **Hosted by**: You (self-managed) — on-premises or private cloud (AWS, Azure, GCP)
- **Where data lives**: Your own infrastructure
- **Best for**: Organizations with strict data residency, air-gap, or compliance requirements
- **Key features**: Same core GitHub features, but you manage upgrades, backups, and high availability
- **Management**: Requires internal infrastructure team. Managed via the **Management Console** and CLI tools (e.g., `ghe-support-bundle`, `ghe-backup-utils`).

#### GHES Key Ports & Backup Numbers

| Parameter | Value | Purpose |
|---|---|---|
| **Port 122** | Administrative SSH | SSH port for the admin shell (`ghe-` commands) — not the standard port 22 |
| **Port 8443** | Management Console | Web-based admin UI for GHES configuration and monitoring |
| **Default backup snapshots** | **10** | `GHE_NUM_SNAPSHOTS` in `backup.config` — number of snapshots retained by GitHub Backup Utilities |
| **Recommended backup frequency** | **Every hour** | Maintains a healthy Recovery Point Objective (RPO) — at most 1 hour of data loss |

::: tip Exam Tip
GHES uses **port 122** for admin SSH (not 22) and **port 8443** for the Management Console (not 443). These non-standard ports are a common exam question.
:::

### GitHub AE (GitHub Aerospace Edition / GitHub.com Hosted)

- **Hosted by**: GitHub — fully managed, dedicated instance
- **Where data lives**: A dedicated, isolated environment managed by GitHub
- **Best for**: Organizations that need isolation without managing their own infrastructure
- **Key features**: Fully managed like GHEC but isolated like GHES. Includes Enterprise Managed Users (EMU) by default.
- **Access**: Not self-service — requires a direct contract with GitHub

### Product Comparison

| | GHEC | GHES | GHAE |
|---|---|---|---|
| **Hosted by** | GitHub (shared cloud) | You (on-prem or private cloud) | GitHub (dedicated instance) |
| **Infrastructure management** | None | Full | None |
| **Data residency control** | Limited (US/EU) | Full | High |
| **EMU support** | Optional | No | Built-in |
| **Upgrades** | Automatic | Manual | Managed by GitHub |
| **Best for** | Cloud-first enterprises | Strict compliance / air-gap | Isolation without self-hosting |

::: warning Trap
GHES requires **you** to manage the infrastructure — patches, upgrades, backups, and HA. GHEC and GHAE are managed by GitHub. If a question mentions an organization that "can't manage their own infrastructure" but needs isolation, the answer is **GHAE**, not GHES.
:::

---

## Pricing and Billing

### GitHub Actions Pricing

GitHub Actions usage is metered based on **compute minutes** consumed by workflow runs.

| Runner Type | Cost |
|---|---|
| **GitHub-hosted (Linux)** | 1x multiplier (base rate) |
| **GitHub-hosted (Windows)** | 2x multiplier |
| **GitHub-hosted (macOS)** | 10x multiplier |
| **Self-hosted runners** | Free (you pay for your own infrastructure) |

- **Free minutes**: Included monthly based on plan (e.g., public repos get unlimited; private repos get a quota)
- **Overages**: Charged per minute above the included quota at the plan's per-minute rate

### GitHub Packages Pricing

- **Storage**: Charged per GB per month
- **Data transfer**: Charged per GB transferred out (downloads)
- **Free quota**: Included in some plans (e.g., public packages are free)
- Self-hosted GHES: GitHub Packages storage costs depend on your own infrastructure

### Organization and Enterprise Pricing

| Plan | Key Notes |
|---|---|
| **GitHub Free** | Public repos, limited private repo features |
| **GitHub Team** | Advanced collaboration, protected branches, code owners |
| **GitHub Enterprise** | GHEC or GHES, SSO, SCIM, audit log, advanced security |

Licenses are **per seat** — each user consuming a seat counts toward the license total.

---

## License Usage Statistics

As an admin, you need to monitor and report on license consumption.

### Finding License Usage

- **GHEC**: Enterprise Settings → License → view seat usage per org, filter by license type
- **GHES**: Management Console or API (`GET /enterprise/stats/users`)

### What Counts as a Seat
- Any user who is a **member** of an org in the enterprise
- **Machine accounts** (bots, service accounts) also consume seats
- **Outside collaborators** — do NOT consume a license seat by default (they have repo-specific access)

### Metered Product Consumption

Admins can generate usage reports to understand consumption of metered services:

- **GitHub Actions minutes**: Enterprise Settings → Billing → Actions usage report — broken down by org and repo
- **GitHub Packages storage**: Enterprise Settings → Billing → Packages usage report
- **GitHub Advanced Security**: Number of unique committers consuming GHAS seats

::: tip Exam Tip
The exam may give you a usage report table and ask you to interpret it. Know the difference between seat licenses (flat per-user) and metered resources (Actions minutes, Packages storage) that scale with usage.
:::

---

## GitHub Packages

GitHub Packages is a package registry integrated directly with GitHub repos and GitHub Actions workflows.

### Supported Package Types

| Registry | What it hosts |
|---|---|
| **npm** | JavaScript / Node.js packages |
| **Maven / Gradle** | Java packages |
| **NuGet** | .NET packages |
| **Docker / OCI** | Container images |
| **RubyGems** | Ruby packages |

### Accessing, Writing, and Sharing Packages

- **Authentication**: Use a PAT with `read:packages` (or `write:packages`) scope, or a GITHUB_TOKEN in Actions workflows
- **Publishing**: Push packages to `ghcr.io` (for containers) or the package-specific registry URL
- **Visibility**: Package visibility inherits from the repo by default. Public packages are freely downloadable; private packages require authentication.
- **Sharing**: Packages can be scoped to a user, organization, or repository

### Using GitHub Packages in Workflows

```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}

- name: Push Docker image
  run: docker push ghcr.io/${{ github.repository }}/my-image:latest
```

- The `GITHUB_TOKEN` automatically has permission to push packages to the repo's registry
- No need to store a separate PAT for same-repo package operations

### GitHub Packages vs Releases

| | GitHub Packages | GitHub Releases |
|---|---|---|
| **What it stores** | Versioned installable artifacts (npm, Docker, NuGet, etc.) | Tagged binary files and changelogs |
| **How consumed** | `npm install`, `docker pull`, package manager | Direct download, `gh release download` |
| **Best for** | Libraries and images consumed by other software | End-user binaries, compiled executables |
| **Versioning** | Package registry versioning (semver) | Git tag-based versioning |

::: tip Exam Tip
Use **GitHub Packages** when the artifact will be **consumed programmatically** (installed via a package manager or pulled as a Docker image). Use **GitHub Releases** when distributing **downloadable binaries** to end users or for archival purposes.
:::

<FlashcardDeck
  title="Domain 3 Quick Quiz"
  :cards="[
    {
      question: 'What is the key difference between GHEC and GHES?',
      answer: '<strong>GHEC</strong> is hosted by GitHub (cloud). <strong>GHES</strong> is self-hosted — you manage the infrastructure, upgrades, and backups.'
    },
    {
      question: 'Which GitHub product is best for an organization that needs isolation but cannot manage its own infrastructure?',
      answer: '<strong>GitHub AE (GHAE)</strong> — a dedicated, managed instance hosted by GitHub.'
    },
    {
      question: 'Do outside collaborators consume a GitHub Enterprise license seat?',
      answer: '<strong>No.</strong> Outside collaborators are not org members and do not consume a seat license by default.'
    },
    {
      question: 'What multiplier does macOS GitHub-hosted runner usage apply?',
      answer: '<strong>10x</strong> the base Linux rate.'
    },
    {
      question: 'What is the difference between GitHub Packages and GitHub Releases?',
      answer: '<strong>Packages</strong>: installable artifacts consumed via package managers (npm, Docker). <strong>Releases</strong>: downloadable binary files tied to a Git tag, consumed directly by users.'
    }
  ]"
/>

---

[← Domain 2](./domain-2.md) · [Next Domain →](./domain-4.md)
