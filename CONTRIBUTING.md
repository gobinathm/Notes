# Contributing to Study Notes

First off, thanks for taking the time to contribute! 🎉

These study notes are community-driven, and we love seeing corrections, new certifications, and better explanations.

## How Can I Contribute?

### 1. Fix Typos or Errors
Found a mistake? The easiest way is to edit the page directly on GitHub:
1. Click the "Edit this page on GitHub" link at the bottom of any page.
2. Make your changes in the GitHub web editor.
3. Submit a Pull Request (PR) with a brief description of the fix.

### 2. Add New Certifications
If you passed a certification and want to share your notes:
1. Create a new folder under `certifications/<provider>/<exam-code>`.
2. Add an `index.md` for the overview.
3. Add your content (notes, cheatsheets).
4. Update `.vitepress/config.mts` to include your new section in the sidebar.

### 3. Improve Content
- **Add Flashcards**: Use the `<Flashcard>` component to make notes interactive.
  ```html
  <Flashcard question="What is the answer?">
    <strong>The Answer</strong>: Explanation here.
  </Flashcard>
  ```
- **Add Images**: Place images in `public/images/` and reference them.

## Pull Request Process

1. Fork the repo and create your branch from `main`.
2. If you've added code/components, ensure the site builds locally (`npm run docs:build`).
3. Ensure your markdown follows the existing style (headers, tables, warnings).
4. Issue that PR!

## Style Guide

- **Tone**: Professional but accessible. Use "we" or "you".
- **Formatting**: Use **bold** for key terms. Use tables for comparisons.
- **Components**: Use `::: tip`, `::: warning`, etc., for callouts.

Thanks for learning with us! 🚀
