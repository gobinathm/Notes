---
title: "AI-102 - Designing and Implementing a Microsoft Azure AI Solution"
description: "Study notes for AI-102 Azure AI Engineer Associate certification exam"
head:
  - - meta
    - name: keywords
      content: ai-102, microsoft, azure ai engineer, computer vision, nlp, generative ai, certification, study notes
---

# AI-102: Azure AI Engineer Associate

This certification validates your expertise in **building, managing, and deploying AI solutions** that leverage Azure AI Services. It covers the full spectrum of AI engineering, from traditional computer vision and NLP to cutting-edge Generative AI solutions.

**Exam**: 100-120 min · ~40-60 questions · 700/1000 to pass · $165

::: info Role-Based Certification
This exam is for **Software Developers** and **AI Engineers** who need to assemble AI capabilities into their applications. It focuses on using APIs and SDKs (Python/C#), not just theoretical concepts.
:::

## Study Progress

<ProgressTracker
  title="AI-102 Study Progress"
  storage-key="ai-102-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Plan & Manage AI Solutions (15-20%)',
      children: [
        { id: 'd1-deploy', label: 'Deploy Azure AI Services resources' },
        { id: 'd1-security', label: 'Manage security & authentication' },
        { id: 'd1-monitor', label: 'Monitor & troubleshoot (Log Analytics)' },
        { id: 'd1-content-safety', label: 'Implement Content Safety' }
      ]
    },
    {
      id: 'domain-2',
      label: 'Domain 2: Implement Content Moderation (10-15%)',
      children: [
        { id: 'd2-text-mod', label: 'Analyze text for sensitivity' },
        { id: 'd2-image-mod', label: 'Detect objects & faces in images' },
        { id: 'd2-video', label: 'Video indexing & retrieval' }
      ]
    },
    {
      id: 'domain-3',
      label: 'Domain 3: Computer Vision Solutions (15-20%)',
      children: [
        { id: 'd3-analysis', label: 'Image analysis (tags, captions, OCR)' },
        { id: 'd3-custom-vision', label: 'Custom image classification & detection' },
        { id: 'd3-face', label: 'Face detection & recognition' }
      ]
    },
    {
      id: 'domain-4',
      label: 'Domain 4: Natural Language Processing (30-35%)',
      children: [
        { id: 'd4-language', label: 'Language service (NER, PII, Sentiment)' },
        { id: 'd4-clu', label: 'Conversational Language Understanding (CLU)' },
        { id: 'd4-translator', label: 'Speech & Text Translation' },
        { id: 'd4-speech', label: 'Speech-to-Text & Text-to-Speech' }
      ]
    },
    {
      id: 'domain-5',
      label: 'Domain 5: Generative AI Solutions (15-20%)',
      children: [
        { id: 'd5-oai-provision', label: 'Provision Azure OpenAI Service' },
        { id: 'd5-chat-completions', label: 'Implement Chat Completions' },
        { id: 'd5-data', label: 'Add your own data (RAG)' }
      ]
    },
    {
      id: 'domain-6',
      label: 'Domain 6: Document Intelligence & Mining (10-15%)',
      children: [
        { id: 'd6-di', label: 'Document Intelligence models (Receipts, Layout)' },
        { id: 'd6-km', label: 'Knowledge Mining (Azure AI Search)' }
      ]
    },
    { id: 'exam-guide', label: 'Reviewed exam guide' },
    { id: 'cheatsheet', label: 'Reviewed cheatsheet' },
    { id: 'ready', label: 'Ready for exam' }
  ]"
/>

---

## Official Resources

- [AI-102 Exam Detail Page](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-102/)
- [Microsoft Learn: AI Engineer Path](https://learn.microsoft.com/en-us/training/paths/build-ai-solutions-with-azure-ai-services/)
- [Azure AI Services Documentation](https://learn.microsoft.com/en-us/azure/ai-services/)

## External Resources

- [GitHub: MicrosoftLearning/AI-102-AIEngineer](https://github.com/MicrosoftLearning/AI-102-AIEngineer)

---

[Start Study Notes →](./domain-1.md) · [Cheatsheet →](./cheatsheet.md)
