# Contributing to Study Notes

Thanks for taking the time to contribute! These study notes are community-driven — corrections, new certifications, and better explanations are always welcome.

## How Can I Contribute?

### Fix Typos or Errors
The easiest way is to edit the page directly on GitHub:
1. Click the "Edit this page on GitHub" link at the bottom of any page on [notes.gobinath.com](https://notes.gobinath.com).
2. Make your changes in the GitHub web editor.
3. Submit a Pull Request (PR) with a brief description of the fix.

### Improve Existing Content
- Add better explanations or real-world examples
- Add comparison tables or decision trees
- Fix outdated information
- Add flashcards using the `<FlashcardDeck>` component

### Add a New Certification
If you passed a certification and want to share your notes, follow the steps below.

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- Git

### Setup

```bash
git clone https://github.com/gobinathm/Notes.git
cd Notes
npm install
npm run docs:dev
```

Visit `http://localhost:5173` to see the site locally.

### Build for Production

```bash
npm run docs:build    # Build static files to .vitepress/dist
npm run docs:preview  # Preview the production build
```

---

## Project Structure

```
Notes/
├── .github/workflows/deploy.yml    # GitHub Actions deployment
├── .vitepress/
│   ├── config.mts                  # VitePress configuration (nav, sidebar)
│   └── theme/
│       ├── index.ts                # Theme entry
│       ├── custom.css              # Custom styles
│       └── components/
│           ├── ProgressTracker.vue  # Study progress tracker (localStorage)
│           ├── FlashcardDeck.vue   # Interactive flip cards
│           ├── AIAudioPlayer.vue   # Audio player with download link
│           ├── ImageModal.vue      # Lightbox for infographics
│           ├── ExportPDF.vue       # PDF export
│           └── ShareButtons.vue    # Social sharing
├── .templates/                     # Templates for new certifications
├── certifications/
│   ├── index.md                    # Certifications overview
│   ├── aws/clf-c02/                # AWS Cloud Practitioner
│   ├── aws/aif-c01/                # AWS AI Practitioner
│   ├── aws/mla-c01/                # AWS ML Engineer
│   ├── azure/ab-730/               # Microsoft AI Business Professional
│   ├── azure/ab-731/               # Microsoft AI Transformation Leader
│   ├── github/gh-actions/          # GitHub Actions cert
│   └── google-cloud/gen-ai-leader/ # GCP Generative AI Leader
├── resources/                      # General study resources
├── public/
│   ├── audio/certifications/       # Audio refreshers (M4A per cert)
│   ├── images/certifications/      # Infographics (PNG per cert)
│   └── ...                         # Favicon, logo, robots.txt
├── scripts/new-cert.sh             # Scaffold a new certification
├── index.md                        # Home page
├── privacy.md                      # Privacy policy
└── README.md
```

---

## Adding a New Certification

### Step 1: Scaffold using the script (recommended)

```bash
./scripts/new-cert.sh <provider> <exam-code> "Certification Name"
# Example:
./scripts/new-cert.sh aws saa-c03 "AWS Solutions Architect Associate"
```

Or manually:

```bash
mkdir -p certifications/[provider]/[exam-code]
cp .templates/index-template.md certifications/[provider]/[exam-code]/index.md
cp .templates/domain-template.md certifications/[provider]/[exam-code]/domain-1.md
cp .templates/exam-guide-template.md certifications/[provider]/[exam-code]/exam-guide.md
cp .templates/cheatsheet-template.md certifications/[provider]/[exam-code]/cheatsheet.md
```

Copy `domain-template.md` once per exam domain.

### Step 2: Add static assets

```bash
mkdir -p public/audio/certifications/[exam-code]
mkdir -p public/images/certifications/[exam-code]
# Place: exam-tactics.m4a (audio) and infographic.png (image)
```

### Step 3: Fill in the content

Each certification should include:

| File | Purpose |
|---|---|
| `index.md` | Overview, exam info, `<ImageModal>`, `<AIAudioPlayer>`, `<ProgressTracker>`, resources |
| `domain-*.md` | Study notes per domain with `<FlashcardDeck>` |
| `exam-guide.md` | Keyword detection table, exam traps, decision rules |
| `cheatsheet.md` | One-page reference: mnemonics, lookup table, terminology |

**ProgressTracker children** should be granular — one child per section heading in the domain notes, not just one per domain.

### Step 4: Cross-check against the vendor's official study guide

Verify that domain notes, exam-guide keyword table, and cheatsheet terminology cover all skills listed in the vendor's published exam objectives.

### Step 5: Update VitePress config

Edit `.vitepress/config.mts`:

**Add to nav dropdown:**
```typescript
{ text: 'EXAM-CODE: Cert Name', link: '/certifications/provider/exam-code/' }
```

**Add to sidebar:**
```typescript
{
  text: 'EXAM-CODE: Cert Name',
  collapsed: true,
  items: [
    { text: 'Overview', link: '/certifications/provider/exam-code/' },
    { text: 'Domain 1: Topic', link: '/certifications/provider/exam-code/domain-1' },
    { text: 'Exam Guide', link: '/certifications/provider/exam-code/exam-guide' },
    { text: 'Cheatsheet', link: '/certifications/provider/exam-code/cheatsheet' }
  ]
}
```

### Step 6: Update certifications index

Add your certification to `/certifications/index.md` with status, difficulty, and prerequisites.

---

## Special Considerations

### GitHub Actions Syntax in Markdown

If your notes include `${{ }}` syntax, wrap those sections in `<div v-pre>` to prevent Vue template compilation errors:

```markdown
<div v-pre>

```yaml
steps:
  - name: Example
    run: echo "${{ github.repository }}"
```

</div>
```

### VitePress Container Types

Use these for callouts — `::: important` is NOT valid:

```markdown
::: tip Exam Tip
Frequently tested concept.
:::

::: warning Common Pitfall
Many candidates get this wrong.
:::

::: danger Critical
Must-know for the exam.
:::

::: info Note
Additional context.
:::
```

### Progress Tracker Component

Each cert index page should include a `<ProgressTracker>` with a unique `storage-key`:

```vue
<ProgressTracker
  title="EXAM Study Progress"
  storage-key="exam-code-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Topic (XX%)',
      children: [
        { id: 'd1-sub1', label: 'Subtopic 1' },
        { id: 'd1-sub2', label: 'Subtopic 2' }
      ]
    },
    { id: 'ready', label: 'Ready for exam' }
  ]"
/>
```

### FlashcardDeck Component

Use flashcards in domain pages for key terms and quick-fire revision:

```vue
<FlashcardDeck
  title="Key Terms"
  :cards="[
    {
      question: 'What is X?',
      answer: '<strong>X</strong>: Definition here.'
    }
  ]"
/>
```

### AIAudioPlayer Component

Add to `index.md` for NotebookLM audio refreshers:

```vue
<AIAudioPlayer ai-label="AI Audio Synthesis • NotebookLM" download-url="/audio/certifications/[cert-code]/exam-tactics.m4a">
  <source src="/audio/certifications/[cert-code]/exam-tactics.m4a" type="audio/mp4">
</AIAudioPlayer>
```

### ImageModal Component

Add to `index.md` for exam infographics:

```vue
<ImageModal
  src="/images/certifications/[cert-code]/infographic.png"
  alt="[CERT-CODE] Exam Overview Infographic"
  ai-label="Generated by NotebookLM"
/>
```

---

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Ensure the site builds locally (`npm run docs:build`)
3. Follow the existing style (headers, tables, callouts)
4. Submit the PR with a brief description

## Style Guide

- **Tone**: Professional but accessible. Use "you" over "we".
- **Key terms**: Use **bold** on first mention.
- **Comparisons**: Use tables, not paragraphs.
- **Callouts**: Use `::: tip`, `::: warning`, `::: danger`, `::: info` for exam-relevant notes.
- **No emojis** in study content (keep it clean and scannable).

---

## Privacy & Analytics

The site uses [Umami](https://umami.is/) for privacy-first analytics:

- No cookies, no personal data, no IP tracking
- GDPR compliant — no consent banner needed
- Tracks: page views, referrer, country, device type
- Does NOT track: personal info, cross-site activity

See [Privacy Policy](https://notes.gobinath.com/privacy) for details.

---

## Deployment

Every push to `main` triggers automatic deployment to GitHub Pages via GitHub Actions. The site is available at [notes.gobinath.com](https://notes.gobinath.com).

---

## Built With

- [VitePress](https://vitepress.dev/) — Static site generator
- [Vue.js](https://vuejs.org/) — Component framework
- [Umami](https://umami.is/) — Privacy-first analytics
- [GitHub Pages](https://pages.github.com/) — Hosting
