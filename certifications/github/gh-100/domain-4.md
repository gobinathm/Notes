---
title: "GH-100 - Domain 4: Manage Access & Permissions"
description: "GH-100 Domain 4: Organization structure, roles, team permissions, and repository access control"
head:
  - - meta
    - name: keywords
      content: gh-100, domain 4, organization, permissions, roles, team, repository access, least privilege
---

# Domain 4: Manage Access and Permissions Based on Membership (18%)

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)

::: tip Exam Tip
This domain is about **who can do what, and at what level**. The hierarchy is: Enterprise → Organization → Team → Repository. Permissions flow down. Enterprise policies can override org settings. Teams can grant repo access. Individual roles always reflect the most permissive role that applies.
:::

---

## GitHub Organizations

A GitHub organization is the primary unit for managing teams, repositories, and policies within GitHub Enterprise.

### Single Org vs Multiple Orgs

| | Single Organization | Multiple Organizations |
|---|---|---|
| **Management** | Simpler — one place for all settings | Complex — policies must be applied to each org |
| **Billing** | Single billing view | Consolidated under enterprise account |
| **Access control** | Shared across all repos | Isolated — teams can't accidentally access other orgs |
| **Scripts/automation** | Easy — one API target | Harder — scripts must iterate across orgs |
| **Best for** | Smaller companies, unified teams | Large enterprises with distinct business units or compliance boundaries |

::: tip Exam Tip
The exam often asks about tradeoffs. **Single org**: simpler administration. **Multiple orgs**: stronger isolation and segregation of sensitive codebases. Choose multiple orgs when different teams require independent governance.
:::

### Default Repository Permissions

Org owners can set the **base permission** for all members across all repositories:

| Setting | What Members Can Do |
|---|---|
| **No permission** | Members have no access by default — must be added explicitly |
| **Read** | Members can view and clone all private repos |
| **Write** | Members can push to all private repos |
| **Admin** | Members have admin access to all repos |

::: danger Critical
Setting default permission to **Write** or **Admin** across an org is rarely appropriate — it violates the principle of least privilege. The exam will test your awareness of this risk.
:::

---

## Organization Roles

| Role | Capabilities |
|---|---|
| **Member** | Default role. Access based on team membership and default org permissions. |
| **Owner** | Full administrative control of the organization. Can change settings, manage billing, and remove members. |
| **Billing Manager** | Can view and manage billing info only. No access to repos or code. |
| **Outside Collaborator** | Not an org member. Has access to specific repositories only. Does not consume a seat license. |

### Member vs Outside Collaborator

| | Org Member | Outside Collaborator |
|---|---|---|
| **Org membership** | Yes | No |
| **Team access** | Can be added to teams | Cannot be on teams |
| **Seat license** | Consumes a seat | Does not consume a seat |
| **Default org permissions** | Yes (applies) | No (only explicit repo access) |
| **Best for** | Internal employees | Contractors, external partners |

---

## Enterprise Policies and Organization Permissions

Enterprise admins can enforce **enterprise policies** that apply to all organizations, overriding org-level settings.

### Common Enterprise Policies

- **Repository creation policy**: Restrict who can create repos (owners only, all members, disabled)
- **Forking policy**: Allow or prohibit forking of private/internal repos
- **Base permissions**: Set a minimum base permission floor across all orgs
- **GitHub Actions policy**: Allow or restrict which actions/workflows can run
- **Pages policy**: Allow or restrict GitHub Pages publishing

::: warning Trap
Enterprise policies **override** org policies. If you set a policy at the enterprise level, org owners cannot change it. When a question asks how to enforce a rule across all orgs, use an **enterprise policy** — not per-org configuration.
:::

---

## Teams

Teams are groups within an organization that grant access to repositories and maintain membership.

### Team Roles

| Role | Capabilities |
|---|---|
| **Member** | Access to repos the team is assigned to |
| **Maintainer** | Can manage team membership, settings, and repo access |

### Team Permissions (Repository Access)

When a team is added to a repository, it gets one of these roles:

| Permission | What Team Members Can Do |
|---|---|
| **Read** | Clone, view, open issues/PRs |
| **Triage** | Read + manage issues and PRs (no push) |
| **Write** | Read + push to the repo |
| **Maintain** | Write + manage settings (except sensitive admin settings) |
| **Admin** | Full control including destructive actions (delete repo, change branch protections) |

### Team Sync via Active Directory

- When AD/SAML team sync is enabled, IdP groups are linked to GitHub teams
- Membership changes in the IdP group automatically propagate to the GitHub team
- Reduces manual team management overhead

---

## Repository Permission Levels

A user's effective access to a repository comes from combining their highest-applicable permission source:

1. **Repository role** (directly added as collaborator)
2. **Team membership** (team is assigned to the repo)
3. **Organization membership** + default permissions

The **most permissive** permission that applies wins.

### How to Audit Repository Access

- Navigate to the repo → **Settings → Collaborators and teams**
- Enterprise audit log: `GET /orgs/{org}/audit-log?action=repo.access`
- GraphQL: query `collaborators` on a `Repository` object

::: tip Exam Tip
When a question asks how to give a user "the minimum required permissions," the answer involves checking their team memberships and only granting what's needed for the task — never defaulting to Admin or Write if Read or Triage suffices.
:::

### Custom Organization Roles and Custom Repository Roles

On **GitHub Enterprise Cloud**, admins can go beyond the built-in roles:

- **Custom organization roles** let you delegate selected administrative capabilities without making someone a full owner
- **Custom repository roles** let you create a more granular role by extending a base repository role with additional capabilities

This is useful when the built-in roles are either too weak or too broad.

::: tip Exam Tip
If the scenario is "delegate one narrow admin capability without full ownership," think **custom organization role**. If it is "grant repo access that sits between built-in repo roles," think **custom repository role**.
:::

---

## Least Privilege in Practice

The principle of **least privilege** means giving users only the permissions they need — no more.

**Common patterns the exam tests:**

| Scenario | Correct Permission |
|---|---|
| External reviewer who only reads and comments on PRs | **Triage** (or Read) |
| Developer who writes code but doesn't manage repo settings | **Write** |
| Tech lead who manages PR rules but not billing | **Maintain** |
| Security team that needs to audit all repos | **Read** (org-level) |
| Release manager who needs to push to protected branches | **Admin** (with branch protection bypass) |

---

## Benefits and Drawbacks of Creating a New Organization

| Benefits | Drawbacks |
|---|---|
| Isolates sensitive codebases | More orgs = more administration overhead |
| Separate billing visibility | Scripts and automation must target multiple orgs |
| Independent governance policies | Harder to share resources (runners, packages) |
| Clear boundary for external collaborators | Users can get confused about which org to work in |

<FlashcardDeck
  title="Domain 4 Quick Quiz"
  :cards="[
    {
      question: 'What is the difference between an org member and an outside collaborator?',
      answer: 'An <strong>org member</strong> belongs to the org, can be on teams, and consumes a seat license. An <strong>outside collaborator</strong> has only specific repo access, cannot join teams, and does not consume a seat.'
    },
    {
      question: 'Which org role has no access to code but can manage billing?',
      answer: '<strong>Billing Manager</strong>.'
    },
    {
      question: 'What is the most permissive repository permission level?',
      answer: '<strong>Admin</strong> — full control including destructive actions like deleting the repo and bypassing branch protections.'
    },
    {
      question: 'Can enterprise policies override org-level settings?',
      answer: '<strong>Yes.</strong> Enterprise policies take precedence over org settings. Org owners cannot override enterprise-enforced policies.'
    },
    {
      question: 'A contractor needs to review PRs but not push code. What permission do they need?',
      answer: '<strong>Triage</strong> — allows managing issues and PRs (labels, assignments, close/reopen) without push access.'
    },
    {
      question: 'Which permission level allows managing branch protection rules?',
      answer: '<strong>Admin</strong> — branch protection rules are a sensitive repository setting requiring the Admin role.'
    }
  ]"
/>

---

[← Domain 3](./domain-3.md) · [Next Domain →](./domain-5.md)
