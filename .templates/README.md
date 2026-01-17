# Certification Templates

This directory contains reusable templates for adding new certifications to the study notes site.

## Available Templates

### 1. `index-template.md` - Overview Page
**Purpose:** Main landing page for each certification

**Contains:**
- Exam information (duration, questions, passing score)
- Note freshness section
- Overview and target audience
- Prerequisites
- Links to all study materials
- Study progress tracker
- Additional resources

**Placeholders to Replace:**
- `[CERT-CODE]` - Exam code (e.g., GH-200, CLF-C02)
- `[Certification Name]` - Full certification name
- `[Provider Name]` - Certification provider (GitHub, AWS, etc.)
- `[keywords]` - SEO keywords
- `[XX]` - Numeric values (duration, questions, etc.)
- `[YYYY-MM-DD]` - Dates
- Domain and topic placeholders

---

### 2. `objectives-template.md` - Exam Objectives
**Purpose:** Links to official study guides and exam domain breakdown

**Contains:**
- Link to official study guide
- Exam domain weighting table
- In-scope services/technologies (for applicable exams)
- Simple study progress tracker

**Placeholders to Replace:**
- `[CERT-CODE]` - Exam code
- `[Certification Name]` - Full name
- `[Link to official study guide]` - URL to official guide
- `~XX%` - Domain weights
- Service/technology listings

---

### 3. `notes-template.md` - Detailed Study Notes
**Purpose:** Comprehensive study material for all exam domains

**Contains:**
- Detailed explanations by domain
- Code examples and syntax
- Comparison tables
- Decision trees
- Best practices and anti-patterns
- Tips, warnings, and critical concepts
- Quick reference section
- Practice questions
- Acronyms and limits

**Placeholders to Replace:**
- `[CERT-CODE]` - Exam code
- `[Domain Name]` - Names of exam domains
- `[Topic X.X]` - Individual topics
- `[language]` - Code language for syntax highlighting
- All content sections with actual study material

---

### 4. `quick-refresher-template.md` - Last-Minute Review
**Purpose:** Condensed 15-20 minute cram session before exam

**Contains:**
- Key concepts by domain
- Decision trees
- Comparison tables
- High-frequency topics
- Common exam traps
- "Last 5 minutes" checklist
- Must-remember facts

**Placeholders to Replace:**
- `[CERT-CODE]` - Exam code
- `[Certification Name]` - Full name
- `[Domain Name]` - Exam domains
- All quick-reference content

**Special Note:** If your content includes syntax with `${{ }}` (like GitHub Actions), wrap those sections in `<div v-pre>` tags to prevent Vue template compilation errors.

---

### 5. `exam-tips-template.md` - Exam Strategy & Tips
**Purpose:** Strategies, time management, and common traps

**Contains:**
- Exam format overview
- Time management strategy
- Question-answering techniques
- Common exam traps
- Domain-specific tips
- High-frequency concepts
- Last-minute checklist
- Mental preparation tips

**Placeholders to Replace:**
- `[CERT-CODE]` - Exam code
- `[Certification Name]` - Full name
- Time allocations
- Domain-specific content
- High-frequency topics

---

## Quick Start Guide

### Step 1: Create Directory Structure

```bash
mkdir -p certifications/[provider]/[exam-code]
```

Example:
```bash
mkdir -p certifications/microsoft/az-900
```

### Step 2: Copy Templates

```bash
# Copy all templates at once
cp .templates/index-template.md certifications/[provider]/[exam-code]/index.md
cp .templates/objectives-template.md certifications/[provider]/[exam-code]/objectives.md
cp .templates/notes-template.md certifications/[provider]/[exam-code]/notes.md
cp .templates/quick-refresher-template.md certifications/[provider]/[exam-code]/quick-refresher.md
cp .templates/exam-tips-template.md certifications/[provider]/[exam-code]/exam-tips.md
```

Example:
```bash
cp .templates/index-template.md certifications/microsoft/az-900/index.md
cp .templates/objectives-template.md certifications/microsoft/az-900/objectives.md
cp .templates/notes-template.md certifications/microsoft/az-900/notes.md
cp .templates/quick-refresher-template.md certifications/microsoft/az-900/quick-refresher.md
cp .templates/exam-tips-template.md certifications/microsoft/az-900/exam-tips.md
```

### Step 3: Find and Replace

Use your text editor's find-and-replace feature:

1. **[CERT-CODE]** → Your exam code (e.g., `AZ-900`)
2. **[cert-code]** → Lowercase exam code (e.g., `az-900`) for storage keys
3. **[Certification Name]** → Full name (e.g., `Azure Fundamentals`)
4. **[Provider Name]** → Provider (e.g., `Microsoft`)
5. **[YYYY-MM-DD]** → Current date (e.g., `2026-01-15`)
6. **~XX%** → Actual domain weights
7. **[XX]** → Numeric values

### Step 4: Fill in Content

Go through each file and replace placeholder content:

- **index.md**: Update exam details, target audience, resources
- **objectives.md**: Add domain breakdown, in-scope services
- **notes.md**: Write detailed study notes for each domain
- **quick-refresher.md**: Condense key concepts for rapid review
- **exam-tips.md**: Add exam-specific strategies and traps

### Step 5: Update Navigation

Edit `.vitepress/config.mts`:

```typescript
// Add to nav bar items (if new provider)
{
  text: 'Certifications',
  items: [
    { text: 'All Certifications', link: '/certifications/' },
    { text: 'YOUR-CERT: Name', link: '/certifications/provider/code/' }
  ]
}

// Add to sidebar
sidebar: {
  '/certifications/': [
    {
      text: 'Provider Name',
      collapsed: false,
      items: [
        {
          text: 'EXAM-CODE: Cert Name',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/certifications/provider/code/' },
            { text: 'Exam Objectives', link: '/certifications/provider/code/objectives' },
            { text: 'Study Notes', link: '/certifications/provider/code/notes' },
            { text: 'Quick Refresher', link: '/certifications/provider/code/quick-refresher' },
            { text: 'Exam Tips', link: '/certifications/provider/code/exam-tips' }
          ]
        }
      ]
    }
  ]
}
```

### Step 6: Update Index Pages

Add your certification to:
- `/certifications/index.md` - List all certifications
- `/index.md` - Home page (optional, if featured)

---

## Tips for Great Notes

### Content Writing
- ✅ **Be clear and concise** - Easy to scan and understand
- ✅ **Use examples** - Code snippets and scenarios
- ✅ **Add visual aids** - Tables, decision trees, diagrams
- ✅ **Highlight exam traps** - What candidates often get wrong
- ✅ **Include practice questions** - Test understanding

### Formatting
- ✅ **Use consistent headings** - H2 for domains, H3 for topics
- ✅ **Add tip/warning boxes** - For important concepts
- ✅ **Code blocks with language** - Enable syntax highlighting
- ✅ **Tables for comparisons** - Easy to scan differences
- ✅ **Decision trees** - Visual problem-solving guides

### SEO & Metadata
- ✅ **Update frontmatter** - Title, description, keywords
- ✅ **Descriptive titles** - Help with search ranking
- ✅ **Internal linking** - Link between related topics
- ✅ **Last updated dates** - Keep content fresh

---

## Special Considerations

### Vue Template Syntax Conflicts

VitePress uses Vue.js for rendering, which means certain syntax patterns can cause compilation errors during build.

**Common Issue:** If your notes include double curly braces like `${{ }}`, `{{ }}`, or similar template-like syntax, Vue may try to parse them as template expressions.

**Solution:** Wrap those sections in `<div v-pre>` tags to tell Vue "don't process this content":

```markdown
<div v-pre>

```yaml
# Your code with template-like syntax
steps:
  - run: echo "${{ github.repository }}"
```

</div>
```

**When to Use:**
- **GitHub Actions** workflows with `${{ }}` syntax
- **Jinja2/Ansible** templates with `{{ }}` syntax
- **Helm charts** with `{{ .Values.something }}`
- **Terraform** with `${}` interpolation in heredocs
- Any other syntax that uses curly braces in documentation

**Symptoms of the issue:**
- Build fails with "Cannot read properties of undefined (reading 'id')"
- Error during SSR rendering phase
- Works in `docs:dev` but fails in `docs:build`

### Progress Tracker

The progress tracker appears at the bottom of each certification page and provides:

- **Visual progress bar** with percentage completion
- **Completed vs total items count** (e.g., "3 of 10 completed")
- **Expandable domains** with sub-topics for detailed tracking
- **Reset button** to clear all progress for that certification

**Using the Progress Tracker:**

Each page should use a **unique** `storage-key` to prevent conflicts:

```vue
<ProgressTracker
  title="Your Certification Name"
  storage-key="unique-cert-code-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Topic Name',
      children: [
        { id: 'domain-1-1', label: 'Subtopic 1' },
        { id: 'domain-1-2', label: 'Subtopic 2' }
      ]
    },
    { id: 'practice', label: 'Practice completed' }
  ]"
/>
```

**Important:** The `storage-key` must be unique for each certification to prevent progress tracking conflicts.

### Code Language Highlighting

Specify language for proper syntax highlighting:

- `yaml` - YAML configuration files
- `bash` - Shell commands
- `javascript` - JavaScript code
- `typescript` - TypeScript code
- `python` - Python code
- `json` - JSON data
- `xml` - XML data
- `sql` - SQL queries

---

## Validation Checklist

Before publishing new certification notes:

- [ ] All placeholders replaced
- [ ] Frontmatter updated (title, description, keywords)
- [ ] Navigation added to config.mts
- [ ] Links between pages work
- [ ] Progress tracker has unique storage-key
- [ ] Code blocks have language specified
- [ ] Build succeeds (`npm run docs:build`)
- [ ] All sections have content (no empty placeholders)
- [ ] Last updated date is current
- [ ] Added to certifications/index.md

---

## Questions?

See the main [README.md](../README.md) for more details on:
- Project structure
- Development workflow
- Deployment process
- Contributing guidelines
