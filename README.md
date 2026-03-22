# Tech Certification Study Notes

Study notes I prepared while clearing technology certifications.

**Read online:** [notes.gobinath.com](https://notes.gobinath.com)

---

## Available Notes

| Certification | Provider | Status |
|---|---|---|
| [MLA-C01: AWS ML Engineer Associate](https://notes.gobinath.com/certifications/aws/mla-c01/) | AWS | In Progress |
| [GCP-GAIL: Generative AI Leader](https://notes.gobinath.com/certifications/google-cloud/gen-ai-leader/) | Google Cloud | In Progress |
| [AI-102: Azure AI Engineer Associate](https://notes.gobinath.com/certifications/azure/ai-102/) | Microsoft | In Progress |
| [GH-100: GitHub Administration](https://notes.gobinath.com/certifications/github/gh-100/) | GitHub | Passed Mar 2026 |
| [GH-500: GitHub Advanced Security](https://notes.gobinath.com/certifications/github/gh-500/) | GitHub | Passed Mar 2026 |
| [GH-300: GitHub Copilot](https://notes.gobinath.com/certifications/github/gh-300/) | GitHub | Passed Feb 2026 |
| [AB-730: AI Business Professional](https://notes.gobinath.com/certifications/azure/ab-730/) | Microsoft | Passed Feb 2026 |
| [AB-731: AI Transformation Leader](https://notes.gobinath.com/certifications/azure/ab-731/) | Microsoft | Passed Feb 2026 |
| [GH-200: GitHub Actions](https://notes.gobinath.com/certifications/github/gh-actions/) | GitHub | Passed Jan 2026 |
| [AIF-C01: AWS AI Practitioner](https://notes.gobinath.com/certifications/aws/aif-c01/) | AWS | Passed Jan 2026 |
| [CLF-C02: AWS Cloud Practitioner](https://notes.gobinath.com/certifications/aws/clf-c02/) | AWS | Passed Oct 2024 |

## What's in Each Set of Notes

- **Study notes** covering all exam domains
- **Cheatsheet** — one-page reference for exam day
- **Exam guide** — traps, decision rules, common pitfalls
- **Exam tips** — strategy and time management
- **Progress tracker** — track what you've covered (stored in your browser, nothing leaves your device)

## GitHub Actions Workflows

This repo uses GitHub Actions for site deployment, worker deployment, code scanning, and contributor onboarding.

| Workflow | File | When it runs | How to use it |
|---|---|---|---|
| **Deploy VitePress site** | `.github/workflows/deploy.yml` | Pushes to `main` except `worker/**`, or manual dispatch | Push site/content changes to `main` to deploy automatically. You can also run it manually from the **Actions** tab. |
| **Deploy Cloudflare Worker** | `.github/workflows/deploy-worker.yml` | Pushes that touch `worker/**`, or manual dispatch | Make worker-only changes under `worker/` and push to `main`, or run it manually from the **Actions** tab. Requires Cloudflare secrets to be configured. |
| **CodeQL Analysis** | `.github/workflows/codeql.yml` | Pushes to `main`, pull requests to `main`, and weekly schedule | Open a PR or push to `main` to trigger scanning automatically. Use it to catch JavaScript security and quality issues. |
| **Welcome First Timers** | `.github/workflows/first-interaction.yml` | First issue opened or first pull request opened | No manual action needed. It automatically posts a welcome comment for first-time contributors. |

### Maintainer Notes

- Run `npm run docs:build` locally before pushing site/content changes.
- The worker workflow requires:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`
- The site deploy workflow publishes the built VitePress output to GitHub Pages.
- The worker deploy workflow is isolated from normal site deploys because `deploy.yml` ignores `worker/**` changes.

### Typical Usage

1. **Updating notes or docs pages**
   Push your changes to `main`.
   The site deploy workflow runs automatically.

2. **Updating only the Cloudflare Worker**
   Change files under `worker/` and push to `main`.
   The worker deploy workflow runs automatically.

3. **Re-running a workflow without a new commit**
   Open the repository’s **Actions** tab in GitHub and use **Run workflow** for any workflow that supports `workflow_dispatch`.

## Contributing

Found a mistake? Want to add notes for a certification you passed? See [CONTRIBUTING.md](./CONTRIBUTING.md).

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Privacy

No cookies, no tracking, no personal data. Uses [Umami](https://umami.is/) for anonymous page view counts only. See [Privacy Policy](https://notes.gobinath.com/privacy).

---

Notes by [Gobinath Mallaiyan](https://gobinath.com) | [LinkedIn](https://www.linkedin.com/in/gobinathm/)
