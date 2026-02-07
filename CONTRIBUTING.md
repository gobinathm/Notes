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
│           ├── ProgressTracker.vue  # Study progress tracker
│           └── FlashcardDeck.vue   # Interactive flashcards
├── .templates/                     # Templates for new certifications
├── certifications/
│   ├── index.md                    # Certifications overview
│   ├── github/gh-actions/          # GitHub Actions cert
│   ├── aws/clf-c02/                # AWS Cloud Practitioner
│   ├── aws/aif-c01/                # AWS AI Practitioner
│   ├── aws/mla-c01/                # AWS ML Engineer
│   ├── azure/ab-731/               # Microsoft AI Transformation Leader
│   └── google-cloud/gen-ai-leader/ # GCP Generative AI Leader
├── resources/                      # General study resources
├── public/                         # Static assets (images, logo, robots.txt)
├── index.md                        # Home page
├── privacy.md                      # Privacy policy
└── README.md
```

---

## Adding a New Certification

### Step 1: Create the directory

```bash
mkdir -p certifications/[provider]/[exam-code]
```

### Step 2: Copy templates

```bash
cp .templates/index-template.md certifications/[provider]/[exam-code]/index.md
cp .templates/domain-template.md certifications/[provider]/[exam-code]/domain-1.md
cp .templates/cheatsheet-template.md certifications/[provider]/[exam-code]/cheatsheet.md
cp .templates/exam-guide-template.md certifications/[provider]/[exam-code]/exam-guide.md
cp .templates/exam-tips-template.md certifications/[provider]/[exam-code]/exam-tips.md
```

### Step 3: Fill in the content

Each certification should include:

| File | Purpose |
|---|---|
| `index.md` | Overview — exam info, official links, study progress tracker |
| `domain-*.md` | Study notes per exam domain |
| `cheatsheet.md` | One-page printable reference |
| `exam-guide.md` | Exam traps, decision rules, common pitfalls |
| `exam-tips.md` | Strategy, time management, mental prep |

### Step 4: Update VitePress config

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

### Step 5: Update certifications index

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

Use flashcards for key terms and quick-fire revision:

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
