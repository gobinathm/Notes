# How to Add New Certifications

This guide explains how to add new certification study notes to this repository using the standardized **AB-731 pattern** (8-9 files per certification).

## Quick Start

1.  **Run the setup script**:
    ```bash
    ./scripts/new-cert.sh <provider> <exam-code> "Certification Name"
    ```
2.  **Add your content** to the generated files.
3.  **Update the VitePress configuration** (`.vitepress/config.mts`).
4.  **Update the certifications index page** (`certifications/index.md`).

---

## Standardized Folder Structure

A new certification should follow this structure:

```
certifications/
  └── [provider]/
      └── [exam-code]/
          ├── index.md           # Overview + Exam Info + Objectives
          ├── domain-1.md        # Study notes for Domain 1
          ├── domain-2.md        # Study notes for Domain 2 (etc.)
          ├── exam-guide.md      # Tactical traps & decision trees
          ├── cheatsheet.md      # One-page exam day reference
          └── exam-tips.md       # Strategic study advice
```

---

## File Details

### 1. `index.md` (Overview + Objectives)
Now consolidates exam information and official objectives.
- **Section 1**: Exam details (Duration, Cost, Passing Score).
- **Section 2**: Overview & Target Audience.
- **Section 3**: Exam Weighting & Objectives.
- **Section 4**: Study Materials & Progress Tracker.

### 2. `domain-X.md` (Study Notes)
Use the `FlashcardDeck` component for key concepts.
- Focus on clarity and technical accuracy.
- Use comparison tables for similar services.

### 3. `exam-guide.md` (Tactical Traps)
Focus on **how to pass** the exam.
- **Exam Traps**: Common misconceptions.
- **Decision Rules**: "If X, then Y" logic.
- **Decision Trees**: Mermaid diagrams or nested lists.

### 4. `cheatsheet.md` (The "Printable")
A one-page reference meant for last-minute review.
- High-density tables.
- Mnemonics for memorization.
- Workflow summaries.

### 5. `exam-tips.md` (Strategic Advice)
Strategic guidance on how to study and manage time during the test.

---

## Step-by-Step Instructions

### Step 1: Run the Script
The simplest way to start is using the provided script:
```bash
./scripts/new-cert.sh aws saa-c03 "AWS Solutions Architect Associate"
```
This will create the folder and populate it with templates from `.templates/`.

### Step 2: Update Sidebar
Edit `.vitepress/config.mts` to add the new certification to the sidebar.

```typescript
{
  text: '[EXAM-CODE]: [Short Name]',
  collapsed: false,
  items: [
    { text: 'Overview', link: '/certifications/[provider]/[exam-code]/' },
    { text: 'Domain 1: [Name]', link: '/certifications/[provider]/[exam-code]/domain-1' },
    // ... other domains ...
    { text: 'Exam Guide', link: '/certifications/[provider]/[exam-code]/exam-guide' },
    { text: 'Cheatsheet', link: '/certifications/[provider]/[exam-code]/cheatsheet' },
    { text: 'Exam Tips', link: '/certifications/[provider]/[exam-code]/exam-tips' }
  ]
}
```

### Step 3: Test Locally
Run the dev server:
```bash
npm run docs:dev
```
Verify that all links work and the build is successful.

---

## Writing Guidelines

- ✅ **Be Concise**: Use tables and bullet points instead of long paragraphs.
- ✅ **Use Callouts**: Use `::: tip`, `::: warning`, and `::: danger` effectively.
- ✅ **Focus on Tasks**: What does the person *do* in this role?
- ✅ **Decision Focused**: Help the reader choose the right service/option.
- ❌ **Avoid Passive Voice**: Use active, action-oriented language.

Good luck with your certification studies!
