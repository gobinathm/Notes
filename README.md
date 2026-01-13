# Tech Certification Study Notes

Comprehensive study notes for various technology certifications, built with VitePress and hosted on GitHub Pages.

## Features

- **Clean, Professional Design** - Optimized for readability and study
- **Progress Tracking** - Track your study progress with browser localStorage (private to you)
- **Fully Searchable** - Built-in search to quickly find topics
- **Mobile Responsive** - Study on any device
- **SEO Optimized** - Better visibility in search engines
- **Easy to Update** - Simple markdown files
- **Fast & Modern** - Powered by VitePress
- **Dark Mode** - Easy on the eyes during late-night study sessions

## Currently Available Certifications

- **GitHub Certifications**
  - GH-200: GitHub Actions - CI/CD workflows, automation, and best practices

*More certifications coming soon!*

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Basic knowledge of markdown

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Notes.git
cd Notes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run docs:dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run docs:build
```

This will generate static files in `.vitepress/dist` directory.

### Preview Production Build

```bash
npm run docs:preview
```

## Adding New Certification Notes

### Step 1: Create Directory Structure

```bash
mkdir -p certifications/[provider]/[exam-code]
```

Example:
```bash
mkdir -p certifications/google/pca
```

### Step 2: Copy Templates

```bash
# Copy all three template files
cp TEMPLATE-index.md certifications/[provider]/[exam-code]/index.md
cp TEMPLATE-objectives.md certifications/[provider]/[exam-code]/objectives.md
cp TEMPLATE-notes.md certifications/[provider]/[exam-code]/notes.md
```

### Step 3: Fill in Your Content

**index.md** - Main page with:
- Exam information and official link
- Overview and prerequisites
- Links to objectives and notes pages
- Progress tracker
- Additional resources

**objectives.md** - Exam objectives:
- Official exam domains
- Specific objectives under each domain
- Exam weighting breakdown

**notes.md** - Detailed study notes:
- Detailed explanations
- Code examples
- Best practices
- Tips and warnings
- Quick reference

### Step 4: Update Navigation

Edit `.vitepress/config.mts` and add your certification to:
1. Navigation bar (if needed)
2. Sidebar configuration

Example:
```typescript
sidebar: {
  '/certifications/': [
    {
      text: 'Google Cloud',
      collapsed: false,
      items: [
        { text: 'Professional Cloud Architect', link: '/certifications/google/pca/' }
      ]
    },
    // ... other providers
  ]
}
```

### Step 5: Update Index Pages

Add your certification to:
- `/certifications/index.md`
- `/index.md` (home page)

## Project Structure

```
Notes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── .vitepress/
│   ├── config.mts              # VitePress configuration
│   └── theme/
│       ├── index.ts            # Theme entry
│       └── custom.css          # Custom styles
├── certifications/
│   ├── index.md                # Certifications overview
│   └── github/
│       └── gh-actions/
│           ├── index.md        # Exam info + progress
│           ├── objectives.md   # Exam objectives
│           ├── notes.md        # Study notes
│           └── exam-tips.md    # Exam tips & strategies
├── resources/
│   ├── study-tips.md
│   └── exam-strategies.md
├── public/
│   └── robots.txt              # SEO - Search engine directives
├── ADDING_CERTIFICATIONS.md    # Guide for adding new certifications
├── LICENSE                     # MIT License
├── index.md                    # Home page
├── package.json
└── README.md
```

## Progress Tracking

Each certification page includes a visual progress tracker that saves your progress locally in your browser using localStorage. This means:

- ✅ Your progress is **private** - it never leaves your browser
- ✅ Each certification tracks progress independently
- ✅ Progress persists across browser sessions
- ⚠️ Clearing browser data will reset your progress
- ⚠️ Progress is not synced across devices

### Using the Progress Tracker

The progress tracker appears at the bottom of each certification page and shows:
- Visual progress bar with percentage
- Completed vs total items count
- Expandable domains with sub-topics
- Reset button to clear all progress

### Adding Progress Tracker to Your Notes

Use the `ProgressTracker` component in your markdown files:

```vue
<ProgressTracker
  title="Your Exam Study Progress"
  storage-key="your-exam-code-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Topic Name',
      children: [
        { id: 'domain-1-1', label: 'Subtopic 1' },
        { id: 'domain-1-2', label: 'Subtopic 2' }
      ]
    },
    { id: 'practice', label: 'Practice exam completed' }
  ]"
/>
```

**Important:** Use a unique `storage-key` for each certification to keep progress separate.

## Markdown Features

VitePress supports extended markdown features:

### Custom Containers

```markdown
::: tip Exam Tip
Important information for the exam
:::

::: warning Common Pitfall
Watch out for this mistake
:::

::: danger Critical
This is critical information
:::
```

### Code Blocks with Syntax Highlighting

```markdown
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`
```

### Tables

```markdown
| Feature | Description |
|---------|-------------|
| Search | Built-in search |
| Dark Mode | Automatic theme switching |
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
```

### Collapsible Sections

```markdown
<details>
<summary>Click to expand</summary>

Hidden content here

</details>
```

## Deployment to GitHub Pages

### Initial Setup

1. **Create GitHub Repository**
   - Go to GitHub and create a new repository named "Notes"
   - Make it public

2. **Update Configuration**

   Edit `.vitepress/config.mts`:
   ```typescript
   export default defineConfig({
     base: '/Notes/', // Your repo name
     // ... other config
   })
   ```

   Update `robots.txt`:
   ```
   Sitemap: https://[yourusername].github.io/Notes/sitemap.xml
   ```

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/Notes.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The site will automatically deploy when you push to main

5. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/Notes/`

### Updating Content

Simply push changes to the main branch:

```bash
git add .
git commit -m "Update certification notes"
git push
```

GitHub Actions will automatically rebuild and deploy your site.

## Customization

### Changing Colors

Edit `.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand-1: #your-color;
  --vp-c-brand-2: #your-color;
  --vp-c-brand-3: #your-color;
}
```

### Adding Custom Components

1. Create component in `.vitepress/theme/components/`
2. Register in `.vitepress/theme/index.ts`

### Modifying Navigation

Edit `.vitepress/config.mts`:
- `nav` - Top navigation bar
- `sidebar` - Side navigation
- `socialLinks` - Social media links

## SEO Optimization

The site includes:
- Automatic sitemap generation
- Meta tags for each page
- Semantic HTML structure
- robots.txt file
- Open Graph tags
- Clean URLs

To improve SEO:
1. Add descriptive titles and descriptions to each page
2. Use proper heading hierarchy (H1 > H2 > H3)
3. Include keywords naturally
4. Add alt text to images
5. Internal linking between related topics

## Tips for Great Study Notes

1. **Be Consistent** - Use the template for uniformity
2. **Include Examples** - Code examples help understanding
3. **Add Practice Questions** - Test your knowledge
4. **Use Visual Aids** - Diagrams, tables, and charts
5. **Link Resources** - Official docs and additional materials
6. **Track Progress** - Use checkboxes for each topic
7. **Update Regularly** - Keep notes current with exam changes

## Contributing

These are personal study notes, but feel free to:
- Report issues or typos
- Suggest improvements
- Share your own study tips

## Resources

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

## License

These study notes are for personal educational use.

---

Happy studying! Good luck with your certifications! 🎓
