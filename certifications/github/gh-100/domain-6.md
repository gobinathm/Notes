---
title: "GH-100 - Domain 6: Manage GitHub Actions"
description: "GH-100 Domain 6: Runners, reusable workflows, encrypted secrets, and GitHub Actions administration"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 6, github actions, self-hosted runners, runner groups, encrypted secrets, reusable workflows
---

# Domain 6: Manage GitHub Actions (16%)

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)

::: tip Exam Tip
Domain 6 focuses on **administration** of GitHub Actions — not writing workflows. Know how to distribute and control actions, manage runners at the enterprise level, and secure secrets. The "how to run a CI pipeline" is developer knowledge; the "how to govern it" is admin knowledge.
:::

---

## Distributing Actions and Workflows in the Enterprise

Admins control which actions can run and how reusable CI/CD logic is shared across the organization.

### Controlling Access to Actions

Enterprise and org admins can configure which actions are **allowed** to run:

| Policy | What it allows |
|---|---|
| **All actions** | Any action from any source (marketplace, third-party, internal) |
| **Local actions only** | Only actions defined in the same org's repositories |
| **Allowed list** | Specific actions and/or verified creators (e.g., `actions/*`, `github/*`) |
| **Disabled** | No workflows can run |

Configure at: **Enterprise Settings → Policies → Actions** (applies to all orgs) or **Org Settings → Actions → General**.

::: warning Trap
Enterprise-level action policies override org-level settings. If you need to restrict actions uniformly across all orgs, configure at the enterprise level.
:::

### Reusable Workflows

Reusable workflows let teams define a workflow **once** and call it from other workflows — reducing duplication and enforcing standards.

```yaml
# Calling a reusable workflow
jobs:
  call-security-scan:
    uses: my-org/shared-workflows/.github/workflows/security-scan.yml@main
    with:
      environment: production
    secrets: inherit
```

**Key concepts:**
- The called workflow must be in a repo accessible to the caller
- `secrets: inherit` passes the caller's secrets to the reusable workflow
- Reusable workflows must define `workflow_call` as a trigger
- Enterprise: store shared workflows in a dedicated internal repo (e.g., `org/shared-workflows`)

### Naming and Managing Reusable Components

Best practices for enterprise reusable workflow management:
- **Dedicated repo**: `{org}/shared-workflows` — single source of truth
- **Naming conventions**: `{domain}-{action}.yml` (e.g., `security-scan.yml`, `deploy-staging.yml`)
- **Versioning**: Reference workflows by tag or commit SHA, not `@main`, for stability
- **Maintenance**: Assign team ownership to the shared-workflows repo with branch protection on `main`

---

## Managing Runners

Runners are the compute environments where GitHub Actions workflows execute.

### GitHub-Hosted vs Self-Hosted Runners

| | GitHub-Hosted | Self-Hosted |
|---|---|---|
| **Managed by** | GitHub | You |
| **Cost** | Per-minute (included quota + overage) | Your infrastructure costs |
| **Setup** | None | Configure and register the runner |
| **OS options** | Ubuntu, Windows, macOS | Any OS (Linux, Windows, macOS, ARM) |
| **Network access** | Public internet only | Can reach private networks / on-prem resources |
| **Isolation** | Fresh VM per job | Persistent (unless configured for ephemeral) |
| **IP predictability** | Dynamic IPs | Static / known IPs |
| **Best for** | Standard workloads | Custom hardware, private network, on-prem |

::: tip Exam Tip
Use **self-hosted runners** when workflows need to access on-premises resources (databases, artifact servers, private APIs) or when IP allow-listing is required. GitHub-hosted runner IPs are dynamic and cannot be allow-listed reliably.
:::

### Self-Hosted Runner Security Risks on Public Repos

::: danger Critical
**Never use self-hosted runners on public repositories.** Any GitHub user can fork a public repo and open a PR, triggering a workflow that runs on your self-hosted runner. This could allow arbitrary code execution on your infrastructure.
:::

Mitigation for public repos:
- Use GitHub-hosted runners only
- Or: restrict which workflows trigger on PRs from forks (`pull_request_target` with care)

### Configuring Self-Hosted Runners

Steps to register a self-hosted runner:
1. Navigate to: **Repo/Org/Enterprise Settings → Actions → Runners → New runner**
2. Download the runner application on the target machine
3. Run the configuration script with the provided registration token
4. Start the runner service (`./run.sh` or as a system service)

**Configuration options:**
- **Labels**: Assign custom labels (`gpu`, `large`, `windows-arm`) to target specific runners in workflows (`runs-on: [self-hosted, gpu]`)
- **Proxies**: Configure `https_proxy` and `no_proxy` environment variables for runners behind a corporate proxy
- **Networking**: Ensure the runner can reach `github.com` (port 443) and optionally your artifact servers

### IP Allow Lists and Self-Hosted Runners

- GitHub-hosted runner IPs change dynamically — internal systems must allow GitHub's IP ranges (published via `api.github.com/meta`)
- Self-hosted runners use **your infrastructure's IPs** — allow-list those specific IPs on internal systems instead
- Enabling **IP allow lists** on an org restricts which IPs can access the org's APIs — ensure runner IPs are included

---

## Runner Groups

Runner groups let admins **organize and control access** to self-hosted runners.

### What Runner Groups Do

- Define which **organizations** and **repositories** can use a set of runners
- Restrict enterprise runners to specific orgs (e.g., only the `production` org can use GPU runners)
- Restrict org runners to specific repos (e.g., only the `api` repo can use the high-memory runner)

### Managing Runner Groups

- **Create**: Enterprise/Org Settings → Actions → Runner groups → New group
- **Move runners**: Runners can be moved between groups without re-registering
- **Access policy**: Set which orgs/repos can use the group

### Monitoring and Troubleshooting Self-Hosted Runners

| Task | Where / How |
|---|---|
| View runner status | Settings → Actions → Runners (Active / Offline / Idle) |
| View runner logs | On the runner machine — `_diag/` folder contains log files |
| Check workflow logs | GitHub Actions tab → specific run → job log |
| Update runner | Runner checks for updates automatically; or run `./run.sh` with `--update` |
| Troubleshoot connectivity | Check `github.com` port 443, proxy config, registration token validity |

---

## Encrypted Secrets

Secrets are encrypted variables stored in GitHub and injected into workflow environments at runtime.

### Secret Scope Levels

| Level | Where stored | Who can access |
|---|---|---|
| **Repository** | Individual repo settings | Workflows in that repo only |
| **Environment** | Repo environment (e.g., `production`) | Workflows using that specific environment |
| **Organization** | Org settings | Workflows in repos the org allows |
| **Enterprise** | Enterprise settings | Workflows in all orgs in the enterprise |

### Creating and Accessing Secrets

**Creating (UI):** Settings → Secrets and variables → Actions → New repository/org/enterprise secret

**Accessing in a workflow:**
```yaml
steps:
  - name: Use a secret
    run: echo "Connecting to DB..."
    env:
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
```

::: warning Trap
Secrets are **never printed** in logs — GitHub automatically masks values that match a known secret. However, base64-encoding a secret and printing it will bypass masking. Educate developers not to decode secrets in workflow logs.
:::

### Organization-Level Secrets

- Set in **Org Settings → Secrets and variables → Actions**
- Access policy options: **All repositories**, **Private repositories only**, or **Selected repositories**
- Useful for: shared API keys, deployment credentials used across multiple repos

### Repository-Level Secrets

- Set in **Repo Settings → Secrets and variables → Actions**
- Available only to workflows in that specific repo
- Take precedence over org-level secrets with the same name

### Third-Party Vaults

For high-security environments, secrets can be stored externally and retrieved at runtime:

- **HashiCorp Vault**: Use the `hashicorp/vault-action` to fetch secrets at workflow start
- **AWS Secrets Manager / Azure Key Vault**: Similar pattern using cloud provider actions
- **Benefits**: Centralized rotation, fine-grained access policies, audit trail outside GitHub
- **Pattern**: Workflow authenticates to the vault (via OIDC or a stored token), retrieves the secret, uses it in subsequent steps

```yaml
- name: Import secrets from Vault
  uses: hashicorp/vault-action@v3
  with:
    url: https://vault.example.com
    method: jwt
    role: github-actions
    secrets: |
      secret/data/prod db_password | DB_PASSWORD
```

<FlashcardDeck
  title="Domain 6 Quick Quiz"
  :cards="[
    {
      question: 'Why should self-hosted runners never be used on public repositories?',
      answer: 'Any GitHub user can open a PR from a fork, triggering a workflow that runs arbitrary code on your self-hosted runner — compromising your infrastructure.'
    },
    {
      question: 'What is a runner group used for?',
      answer: 'Controlling which organizations and repositories have access to specific self-hosted runners. Enables fine-grained runner access control.'
    },
    {
      question: 'What is a reusable workflow?',
      answer: 'A workflow file that can be called by other workflows using <code>workflow_call</code> — allows sharing common CI/CD logic across repos without duplication.'
    },
    {
      question: 'What are the four secret scope levels in GitHub Actions?',
      answer: '<strong>Repository</strong>, <strong>Environment</strong>, <strong>Organization</strong>, and <strong>Enterprise</strong>. Narrower scopes take precedence over broader ones.'
    },
    {
      question: 'When should you use a self-hosted runner instead of GitHub-hosted?',
      answer: 'When workflows need to access private/on-premises resources, require specific hardware (GPU, ARM), or need predictable IP addresses for allow-listing.'
    },
    {
      question: 'How do you pass secrets from a calling workflow to a reusable workflow?',
      answer: 'Use <code>secrets: inherit</code> in the calling workflow\'s <code>uses</code> block, or explicitly pass each secret using the <code>secrets</code> key.'
    }
  ]"
/>

---

[← Domain 5](./domain-5.md) · [Cheatsheet →](./cheatsheet.md)
