## What does this PR do?

<!-- A clear one-line summary. -->

## Type of change

- [ ] Typo or content error fix
- [ ] Content improvement (better explanation, new table, new flashcards)
- [ ] New certification notes
- [ ] Site/theme/component change
- [ ] Worker / API change
- [ ] Other:

## Certification(s) affected

<!-- List the cert code(s) and page(s) changed, or "N/A" for site-wide changes. -->
- Cert:
- Pages:

## Checklist

- [ ] The site builds locally without errors (`npm run docs:build`)
- [ ] New content follows the [style guide](../CONTRIBUTING.md#style-guide) — tables over paragraphs, callouts for exam tips, no emojis in study content
- [ ] Flashcard `storage-key` values are unique (format: `<exam-code>-domain-<n>-cards`)
- [ ] ProgressTracker `storage-key` is unique (format: `<exam-code>-progress`)
- [ ] Any `${{ }}` syntax is wrapped in `<div v-pre>` to prevent Vue compilation errors
- [ ] New certification is added to both the **nav** and **sidebar** in `.vitepress/config.mts`
- [ ] `WORKER_URL` in `AIChatBot.vue` is set to the production URL (not localhost)

## Related issue

<!-- Link with "Closes #<number>" to auto-close on merge, or "Related to #<number>". -->
Closes #
