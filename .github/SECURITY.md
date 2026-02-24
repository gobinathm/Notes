# Security Policy

## Supported Versions

This is a static documentation site. There is no versioned software to patch, but the Cloudflare Worker API and site dependencies are kept current.

| Component | Status |
|-----------|--------|
| VitePress site | ✅ Maintained |
| Cloudflare Worker (`worker/`) | ✅ Maintained |
| npm dependencies | ✅ Kept up to date via Dependabot |

## Reporting a Vulnerability

If you discover a security vulnerability in this repository — including the Cloudflare Worker API, dependency issues, or exposed secrets — please **do not open a public GitHub Issue**.

Instead, report it privately via one of these channels:

- **GitHub Security Advisories** (preferred): [Report a vulnerability](../../security/advisories/new)
- **Email**: Use the contact form at [gobinath.com](https://gobinath.com)

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

## Response Timeline

| Stage | Target time |
|-------|-------------|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 7 days |
| Fix or workaround | Within 30 days (critical issues prioritised) |

## Scope

| In scope | Out of scope |
|----------|-------------|
| Cloudflare Worker API (`/api/*`) | Study note content accuracy |
| Exposed API keys or secrets in commits | Third-party links or resources |
| Dependency vulnerabilities (CVEs) | GitHub Actions runner environment |
| CORS misconfigurations | Cosmetic/UI issues |

## Security Features in Use

- **Secret scanning** — enabled on this repository
- **Dependabot alerts** — enabled for dependency vulnerabilities
- **Dependabot security updates** — automatic PRs for vulnerable dependencies
- **Branch protection** — `main` branch requires PR review before merging
