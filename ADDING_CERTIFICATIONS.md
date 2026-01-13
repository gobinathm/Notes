# How to Add New Certifications

This guide explains how to add new certification study notes to this repository.

## Quick Start

1. Create the folder structure
2. Add your content files
3. Update the VitePress configuration
4. Update the certifications index page

---

## Step 1: Create Folder Structure

Create a new folder following this pattern:

```
certifications/
  └── [provider]/
      └── [exam-code]/
          ├── index.md          # Overview page
          ├── objectives.md     # Exam objectives
          ├── notes.md          # Study notes
          └── exam-tips.md      # Exam tips & strategies
```

**Example**: For AWS Solutions Architect Associate (SAA-C03):

```
certifications/
  └── aws/
      └── saa-c03/
          ├── index.md
          ├── objectives.md
          ├── notes.md
          └── exam-tips.md
```

---

## Step 2: Create Content Files

### 2.1 Create `index.md` (Overview Page)

```markdown
---
title: "[EXAM-CODE] - [Certification Name]"
description: "Study notes for [EXAM-CODE] [Certification Name]"
head:
  - - meta
    - name: keywords
      content: [exam-code], [keywords], certification, exam, study notes
---

# [EXAM-CODE]: [Certification Name]

## Exam Information

- **Provider**: [Provider Name]
- **Exam Code**: [EXAM-CODE]
- **Official Exam Page**: [URL]
- **Exam Duration**: [Duration] minutes
- **Number of Questions**: ~[Number] questions
- **Passing Score**: [Score]/1000
- **Exam Format**: Multiple choice, multiple select

::: tip Note Freshness
**Prepared**: [Month Year]
**Last Updated**: [YYYY-MM-DD]
Exam content may change. Always verify with official documentation.
:::

## Overview

Brief description of what the certification validates.

**Target Audience:**
- Role 1
- Role 2
- Role 3

**Prerequisites:**
- Prerequisite 1
- Prerequisite 2

---

## Study Materials

### 📋 [Exam Objectives](./objectives.md)
Official exam domains and objectives outline

### 📚 [Study Notes](./notes.md)
Comprehensive study notes covering all exam topics

### 💡 [Exam Tips](./exam-tips.md)
Exam strategies, common traps, and study advice

---

## 📖 Official Resources

- [Official Documentation](URL)
- [Practice Exams](URL)
- [Official Study Guide](URL)

---

## Study Progress Tracker

Track your progress through the study materials.

### Domain 1: [Domain Name]
- [ ] Topic 1.1
- [ ] Topic 1.2
- [ ] Topic 1.3

### Domain 2: [Domain Name]
- [ ] Topic 2.1
- [ ] Topic 2.2

[... Continue for all domains ...]

---

[Exam Objectives →](./objectives.md)
```

### 2.2 Create `objectives.md`

```markdown
---
title: "[EXAM-CODE] - Exam Objectives"
description: "Official exam objectives for [EXAM-CODE] [Certification Name]"
---

# [EXAM-CODE]: Exam Objectives

Official exam domains and objectives for the [EXAM-CODE] [Certification Name].

[← Back to Overview](./index.md) | [Study Notes →](./notes.md) | [Exam Tips →](./exam-tips.md)

---

## Domain 1: [Domain Name] (~XX%)

### 1.1: [Topic Name]
- Objective 1
- Objective 2
- Objective 3

### 1.2: [Topic Name]
- Objective 1
- Objective 2

---

## Domain 2: [Domain Name] (~XX%)

[... Continue for all domains ...]

---

## Exam Weighting

| Domain | Weight | Focus Areas |
|--------|--------|-------------|
| Domain 1: [Name] | ~XX% | [Focus] |
| Domain 2: [Name] | ~XX% | [Focus] |
| Domain 3: [Name] | ~XX% | [Focus] |

---

[← Back to Overview](./index.md) | [Study Notes →](./notes.md) | [Exam Tips →](./exam-tips.md)

*Source: Official [Provider] Documentation*
```

### 2.3 Create `notes.md`

```markdown
---
title: "[EXAM-CODE] - Study Notes"
description: "Comprehensive study notes for [EXAM-CODE] [Certification Name]"
---

# [EXAM-CODE]: Study Notes

Comprehensive study notes for the [EXAM-CODE] [Certification Name].

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)

---

## Domain 1: [Domain Name]

### Topic 1.1: [Topic Name]

[Study content here...]

#### Key Concepts

- Concept 1
- Concept 2

#### Code Examples

\`\`\`yaml
# Example code
\`\`\`

::: tip Why This Matters
Explain why this is important for the exam and real-world usage.
:::

::: warning Common Mistake
Highlight common mistakes or exam traps.
:::

---

[Continue with all topics...]

---

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [Exam Tips →](./exam-tips.md)
```

### 2.4 Create `exam-tips.md`

```markdown
---
title: "[EXAM-CODE] - Exam Tips & Strategy"
description: "Exam preparation strategies and tips for [EXAM-CODE]"
---

# [EXAM-CODE]: Exam Tips & Strategy

Strategic guidance for exam preparation and taking the [EXAM-CODE] exam.

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [← Study Notes](./notes.md)

---

## ⚠️ Exam Traps & Gotchas

Common mistakes and tricky areas that often appear on the exam.

### Trap 1: [Trap Name]

**What it looks like:**
Description of the scenario

**Why it's wrong:**
Explanation

**Remember:**
Key takeaway

---

## 📚 Study Strategy

### What to Focus On
- Important topic 1
- Important topic 2

### What NOT to Over-Study
- Less important topic 1
- Topic that appears rarely

---

## ⏱️ Time Management

Tips for managing time during the exam.

---

## 🎯 Decision Tables

Quick reference tables for "which option" questions.

| Scenario | Use This | Not This | Why |
|----------|----------|----------|-----|
| Scenario 1 | Solution A | Solution B | Reason |

---

[← Back to Overview](./index.md) | [← Objectives](./objectives.md) | [← Study Notes](./notes.md)
```

---

## Step 3: Update VitePress Configuration

Edit `.vitepress/config.mts` to add your certification to the navigation and sidebar.

### 3.1 Add to Navigation Dropdown

```typescript
nav: [
  {
    text: 'Certifications',
    items: [
      { text: 'All Certifications', link: '/certifications/' },
      // ... existing certifications ...
      { text: '[EXAM-CODE]: [Short Name]', link: '/certifications/[provider]/[exam-code]/' }
    ]
  }
]
```

### 3.2 Add to Sidebar

```typescript
sidebar: {
  '/certifications/': [
    {
      text: '[Provider] Certifications',
      collapsed: false,
      items: [
        {
          text: '[EXAM-CODE]: [Certification Name]',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/certifications/[provider]/[exam-code]/' },
            { text: 'Exam Objectives', link: '/certifications/[provider]/[exam-code]/objectives' },
            { text: 'Study Notes', link: '/certifications/[provider]/[exam-code]/notes' },
            { text: 'Exam Tips', link: '/certifications/[provider]/[exam-code]/exam-tips' }
          ]
        }
      ]
    }
  ]
}
```

**Example for AWS SAA-C03**:

```typescript
{
  text: 'AWS Certifications',
  collapsed: false,
  items: [
    {
      text: 'SAA-C03: Solutions Architect',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/certifications/aws/saa-c03/' },
        { text: 'Exam Objectives', link: '/certifications/aws/saa-c03/objectives' },
        { text: 'Study Notes', link: '/certifications/aws/saa-c03/notes' },
        { text: 'Exam Tips', link: '/certifications/aws/saa-c03/exam-tips' }
      ]
    }
  ]
}
```

---

## Step 4: Update Certifications Index Page

Edit `certifications/index.md` to add your certification to the overview page.

```markdown
## [Provider] Certifications

### [[EXAM-CODE]: [Certification Name]](./[provider]/[exam-code]/)
Brief description of what the certification covers.

**Status**: In Progress / Planning / Completed
**Difficulty**: Beginner / Intermediate / Advanced
**Prerequisites**: List prerequisites
```

**Example**:

```markdown
## AWS Certifications

### [SAA-C03: AWS Solutions Architect Associate](./aws/saa-c03/)
Design and deploy scalable, highly available, and fault-tolerant systems on AWS.

**Status**: In Progress
**Difficulty**: Intermediate
**Prerequisites**: AWS fundamentals, cloud computing basics
```

---

## Step 5: Test Locally

1. Start the development server:
   ```bash
   npm run docs:dev
   ```

2. Navigate to `http://localhost:5173` and verify:
   - ✅ Certification appears in navigation dropdown
   - ✅ Sidebar shows all 4 pages (Overview, Objectives, Notes, Tips)
   - ✅ All internal links work
   - ✅ Progress tracker works (if included)
   - ✅ Search finds your content

---

## Tips for Writing Study Notes

### Use Consistent Formatting

- **Headings**: Use H2 (`##`) for domains, H3 (`###`) for topics
- **Code Blocks**: Always specify the language (```yaml, ```bash, etc.)
- **Callouts**: Use VitePress custom containers:
  - `::: tip` - Important exam tips
  - `::: warning` - Common mistakes
  - `::: danger` - Critical exam facts

### Make Notes Exam-Focused

- Add "Why This Matters" callouts
- Include decision tables for "which option" questions
- Highlight exam traps and gotchas
- Use real-world examples
- Keep tone conversational, not documentation-style

### Include Practical Examples

```yaml
# ✅ CORRECT - Show what works
example: code

# ❌ WRONG - Show what doesn't
bad: example
```

### Add Exam-Specific Details

- Specific timeouts, limits, quotas
- Syntax patterns tested on exam
- CLI commands and flags
- Configuration options
- API differences

---

## Checklist

Before submitting or publishing:

- [ ] Created all 4 required files (index, objectives, notes, exam-tips)
- [ ] Added certification to navigation dropdown in config.mts
- [ ] Added certification to sidebar in config.mts
- [ ] Updated certifications/index.md with new certification
- [ ] Verified all internal links work
- [ ] Tested locally with `npm run docs:dev`
- [ ] Spell-checked content
- [ ] Verified code examples are correct
- [ ] Added proper frontmatter to all .md files

---

## Need Help?

- Check existing certifications (GH-200) for formatting examples
- Review VitePress documentation: https://vitepress.dev
- Ensure all links use relative paths
- Use clean URLs (no `.html` extensions)

---

## Example: Complete Structure

```
certifications/
├── index.md
├── github/
│   └── gh-actions/
│       ├── index.md
│       ├── objectives.md
│       ├── notes.md
│       └── exam-tips.md
├── azure/
│   └── ai-102/
│       └── index.md
└── aws/
    ├── aip-c01/
    │   └── index.md
    └── saa-c03/           # NEW
        ├── index.md       # NEW
        ├── objectives.md  # NEW
        ├── notes.md       # NEW
        └── exam-tips.md   # NEW
```

Good luck with your certification studies!
