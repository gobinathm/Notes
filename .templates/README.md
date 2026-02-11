# Certification Templates

This directory contains reusable templates for adding new certifications. The structure follows the **AB-730 / AB-731 pattern**.

## Available Templates

| Template | Output File | Purpose |
|----------|-------------|---------|
| `index-template.md` | `index.md` | Overview, exam info, ImageModal, AIAudioPlayer, ProgressTracker, resources |
| `domain-template.md` | `domain-1.md`, `domain-2.md`, ... | Study notes per exam domain with FlashcardDeck |
| `exam-guide-template.md` | `exam-guide.md` | Keyword detection table, exam traps, decision rules |
| `cheatsheet-template.md` | `cheatsheet.md` | One-page reference: mnemonics, lookup table, decision rules, terminology |
| `exam-tips-template.md` | `exam-tips.md` | (Optional) Study strategy and test-taking advice |

## Quick Start

### Option A: Use the script (recommended)

```bash
./scripts/new-cert.sh <provider> <exam-code> "Certification Name"
# Example:
./scripts/new-cert.sh aws saa-c03 "AWS Solutions Architect Associate"
```

### Option B: Manual setup

```bash
mkdir -p certifications/[provider]/[exam-code]
cp .templates/index-template.md certifications/[provider]/[exam-code]/index.md
cp .templates/domain-template.md certifications/[provider]/[exam-code]/domain-1.md
cp .templates/exam-guide-template.md certifications/[provider]/[exam-code]/exam-guide.md
cp .templates/cheatsheet-template.md certifications/[provider]/[exam-code]/cheatsheet.md
```

Copy `domain-template.md` once per domain (e.g., `domain-1.md`, `domain-2.md`, `domain-3.md`).

## Placeholders to Replace

| Placeholder | Replace with | Example |
|-------------|-------------|---------|
| `[CERT-CODE]` | Exam code (uppercase) | `AB-730` |
| `[cert-code]` | Exam code (lowercase, for paths/keys) | `ab-730` |
| `[Certification Name]` | Full certification name | `Microsoft AI Business Professional` |
| `[keywords]` | SEO keywords | `microsoft, ai, copilot` |
| `[XX]` | Numeric values | `45` (minutes), `50` (questions) |
| `URL` | Actual URLs | Official exam page link |

## Required Assets

Each certification needs these static assets in `public/`:

```
public/
├── audio/certifications/[cert-code]/
│   └── exam-tactics.m4a          # NotebookLM audio refresher
└── images/certifications/[cert-code]/
    └── infographic.png           # Exam overview infographic
```

These are referenced by the `<AIAudioPlayer>` and `<ImageModal>` components in `index.md`.

## After Creating Files

1. **Fill in content** — Replace all placeholders with actual exam material
2. **ProgressTracker children** — Make children granular (one per section heading in your domain notes, not just one per domain)
3. **Update sidebar/nav** — Edit `.vitepress/config.mts`
4. **Update certifications index** — Add to `certifications/index.md` and optionally `index.md`
5. **Cross-check** — Verify domain notes, exam-guide keyword table, and cheatsheet terminology against the vendor's official study guide
6. **Build test** — Run `npm run docs:build` to verify

## Vue Components Reference

| Component | Used in | Purpose |
|-----------|---------|---------|
| `<ImageModal>` | `index.md` | Lightbox for exam infographic |
| `<AIAudioPlayer>` | `index.md` | Audio player with download link |
| `<ProgressTracker>` | `index.md` | localStorage-based study checklist |
| `<FlashcardDeck>` | `domain-*.md` | Interactive flip cards for review |

## Special Considerations

### Vue Template Syntax Conflicts

If notes include `${{ }}` syntax (GitHub Actions, Jinja2, Helm), wrap in `<div v-pre>`:

```markdown
<div v-pre>

```yaml
steps:
  - run: echo "${{ github.repository }}"
```

</div>
```

**Symptoms:** Build fails with "Cannot read properties of undefined" — works in `docs:dev` but fails in `docs:build`.
