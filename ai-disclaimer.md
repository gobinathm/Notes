---
title: "AI Disclaimer - Study Assistant"
description: "How the AI Study Assistant works on notes.gobinath.com — data practices, usage limits, accuracy disclaimer, and privacy. Powered by Google Gemini."
head:
  - - meta
    - name: keywords
      content: ai disclaimer, ai study assistant, google gemini, certification study bot, ai chatbot, privacy, data practices, usage limits
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:title
      content: AI Disclaimer - Study Assistant
  - - meta
    - property: og:description
      content: How the AI Study Assistant works — data practices, usage limits, accuracy disclaimer, and privacy. Powered by Google Gemini.
  - - meta
    - property: og:type
      content: website
---

# AI Disclaimer

*Last Updated: February 11, 2026*

## What the AI Study Assistant Does

This site includes an AI-powered study assistant available on certification study pages. It offers two features:

- **Q&A Mode** — Ask questions about the content on the current page and receive contextual answers
- **Flashcard Mode** — Generate interactive flashcards from the current page's study material

## How It Works

When you use the assistant:

1. The **text content** of the current page is extracted from your browser
2. Your question (or a flashcard generation request) is sent along with the page content to a proxy server
3. The proxy forwards the request to **Google Gemini** (an AI language model) for processing
4. The response is returned to your browser and displayed

The proxy server is a **Cloudflare Worker** that validates requests and enforces rate limits. It does not store any data.

## What We DON'T Store

- ❌ **No conversation history** — Each page visit starts fresh; nothing is saved between sessions
- ❌ **No personal data** — No login, no accounts, no identifying information
- ❌ **No cookies** — The assistant does not set any cookies
- ❌ **No page content stored** — Content is sent per-request and discarded immediately
- ❌ **No training on your data** — Your queries are not used to train AI models

## Usage Limits

To ensure fair usage and manage costs, the assistant has rate limits:

- **10 requests per minute** per user
- **100 requests per day** per user

If you exceed these limits, you will receive an error message. Limits reset automatically.

## Accuracy Disclaimer

::: warning Important
AI responses **may be inaccurate, incomplete, or outdated**. The assistant generates answers based on the page content and an AI model — it is not a certified instructor or an official exam resource.
:::

**Always verify answers** with official vendor study materials:

- [Microsoft Learn — Certifications](https://learn.microsoft.com/certifications/)
- [AWS Certification — Exam Guides](https://aws.amazon.com/certification/)
- [Google Cloud — Certification](https://cloud.google.com/learn/certification)
- [GitHub Certifications](https://resources.github.com/learn/certifications/)

The AI assistant is a **supplementary study tool**, not a replacement for official exam preparation materials.

## Limitations

- Answers are scoped to the **current page only** — the assistant cannot search across the entire site
- The AI may **hallucinate** facts, especially for nuanced or edge-case topics
- Generated flashcards may not perfectly match exam objectives
- The assistant does not have access to the latest exam updates unless the page content has been updated

## Built With

- **[Google Gemini](https://ai.google.dev/)** (Flash-Lite) — AI language model powering the assistant
- **[Cloudflare Workers](https://workers.cloudflare.com/)** — Serverless API proxy
- **[Claude Code](https://claude.ai/claude-code)** — The entire AI assistant feature (component, worker, integration, and this page) was built with Claude Code by Anthropic

## Questions?

If you have concerns about the AI assistant, open an issue on [GitHub](https://github.com/gobinathm/Notes/issues).

---

**Summary:** The AI assistant answers questions and generates flashcards from page content using Google Gemini. No personal data is collected or stored. Always verify AI responses with official exam guides.
