# How to Add New Certifications

This guide explains how to add new certification study notes following the **AB-730 / AB-731 pattern**.

## Quick Start

1.  **Run the setup script**:
    ```bash
    ./scripts/new-cert.sh <provider> <exam-code> "Certification Name"
    ```
2.  **Add static assets** (audio + infographic) to `public/`.
3.  **Add your content** to the generated files.
4.  **Cross-check** against the vendor's official study guide.
5.  **Update the VitePress configuration** (`.vitepress/config.mts`).
6.  **Update the certifications index page** (`certifications/index.md`).

---

## Standardized Folder Structure

```
certifications/
  └── [provider]/
      └── [exam-code]/
          ├── index.md           # Overview + ImageModal + AIAudioPlayer + ProgressTracker
          ├── domain-1.md        # Study notes for Domain 1 (with FlashcardDeck)
          ├── domain-2.md        # Study notes for Domain 2 (etc.)
          ├── exam-guide.md      # Keyword detection table, traps, decision rules
          └── cheatsheet.md      # One-page reference: mnemonics, lookup, terminology

public/
  ├── audio/certifications/[exam-code]/
  │   └── exam-tactics.m4a       # NotebookLM audio refresher
  └── images/certifications/[exam-code]/
      └── infographic.png        # Exam overview infographic
```

---

## File Details

### 1. `index.md` (Overview)

The landing page for each certification. Sections in order:

1. **Exam header** — One-line description + exam stats (duration, questions, passing score, cost)
2. **Info callout** — What kind of exam this is
3. **ImageModal** — Exam overview infographic
4. **Audio Refresher** — `<AIAudioPlayer>` for NotebookLM podcast
5. **Study Progress** — `<ProgressTracker>` with granular children per domain
6. **Resources** — Official and external links
7. **Navigation** — Links to domain-1 and cheatsheet

### 2. `domain-X.md` (Study Notes)

One file per exam domain. Each should include:
- Clear section headings matching the vendor's study guide objectives
- Comparison tables for similar concepts
- `<FlashcardDeck>` at the end for key term review
- Navigation links to previous/next domain

### 3. `exam-guide.md` (Exam Tactics)

Focus on **how to pass** the exam:
- **Answer philosophy** — How the exam wants you to think
- **Keyword detection table** — "If you see X, look for Y in the answer"
- **Exam traps** — Common misconceptions in a warning callout
- **Decision quick reference** — "Which service?" and "What comes first?" rules
- **Final strategy** — Last tips

### 4. `cheatsheet.md` (One-Page Reference)

Meant for last-minute review:
- **Core framework/mnemonic** — The key mental model
- **Feature lookup table** — Quick "what does each thing do" reference
- **Quick decision rules** — Scenario → answer pairs
- **Terminology check** — Glossary of every key term

---

## Step-by-Step Instructions

### Step 1: Scaffold

```bash
./scripts/new-cert.sh aws saa-c03 "AWS Solutions Architect Associate"
```

This creates the folder and populates it with templates from `.templates/`.

### Step 2: Add static assets

```bash
mkdir -p public/audio/certifications/[exam-code]
mkdir -p public/images/certifications/[exam-code]
```

- Generate an audio refresher using [NotebookLM](https://notebooklm.google.com/) and save as `exam-tactics.m4a`
- Create an exam overview infographic and save as `infographic.png`

### Step 3: Fill in content

- Replace all `[PLACEHOLDER]` values in the generated files
- Write domain notes with one section per study guide objective
- Build the keyword detection table in `exam-guide.md`
- Build the terminology glossary in `cheatsheet.md`

### Step 4: Make ProgressTracker granular

Children should mirror actual section headings in domain notes — not just one item per domain. Example from AB-730:

```
Domain 2 children:
  - Prompt engineering (GCSE framework)
  - Save, share & schedule prompts
  - Context & grounding (files, web)
  - Conversation management & notebooks
  - Agent Store, templates & configuration
```

### Step 5: Cross-check against vendor study guide

Pull the official skill objectives from the vendor's exam page and verify:
- Every listed skill has corresponding content in domain notes
- Keyword detection table in `exam-guide.md` covers key concepts
- Terminology in `cheatsheet.md` includes all testable terms

### Step 6: Update sidebar

Edit `.vitepress/config.mts`:

```typescript
{
  text: '[EXAM-CODE]: [Short Name]',
  collapsed: false,
  items: [
    { text: 'Overview', link: '/certifications/[provider]/[exam-code]/' },
    { text: 'Domain 1: [Name]', link: '/certifications/[provider]/[exam-code]/domain-1' },
    // ... other domains ...
    { text: 'Exam Guide', link: '/certifications/[provider]/[exam-code]/exam-guide' },
    { text: 'Cheatsheet', link: '/certifications/[provider]/[exam-code]/cheatsheet' }
  ]
}
```

### Step 7: Update certifications index

Add your certification to `/certifications/index.md` and optionally to the homepage `index.md`.

### Step 8: Test locally

```bash
npm run docs:build
```

Verify that all links work and the build succeeds.

---

## Writing Guidelines

- **Be Concise**: Use tables and bullet points instead of long paragraphs.
- **Use Callouts**: `::: tip`, `::: warning`, `::: danger`, `::: info` for exam-relevant notes.
- **Focus on Tasks**: What does the person *do* in this role?
- **Decision Focused**: Help the reader choose the right service/option.
- **No emojis** in study content body (headings may use them sparingly for visual scanning).
