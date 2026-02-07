---
title: "AIF-C01 - AWS Certified AI Practitioner"
description: "Study notes for AIF-C01 AWS Certified AI Practitioner certification exam"
head:
  - - meta
    - name: keywords
      content: aif-c01, aws, ai practitioner, artificial intelligence, machine learning, certification, exam, study notes
---

# AIF-C01: AWS Certified AI Practitioner

## Exam Information

- **Provider**: AWS (Amazon Web Services)
- **Exam Code**: AIF-C01
- **Official Exam Page**: [AWS AI Practitioner Certification](https://aws.amazon.com/certification/certified-ai-practitioner/)
- **Exam Duration**: 120 minutes
- **Number of Questions**: 85 questions
- **Passing Score**: 700/1000
- **Exam Format**: Multiple choice, multiple response
- **Exam Cost**: $75 USD
- **Validity**: 3 years

::: tip Certification Achieved ✅
**Earned**: January 2, 2026
**Credential**: [Verify Certificate](https://www.credly.com/badges/4f172763-a79b-44af-9439-e30871aacbb5/public_url)

**Notes Prepared**: January 2026 · **Last Updated**: 2026-02-05
:::

## Overview

The AWS Certified AI Practitioner validates your understanding of AI/ML concepts, AWS AI/ML services, and responsible AI practices. This certification is designed for individuals who want to demonstrate foundational AI knowledge.

**Target Audience:**
- Business analysts and data analysts
- Product managers working with AI
- Non-technical professionals who need to understand AI
- Developers new to AI/ML
- Anyone seeking foundational AI/ML knowledge on AWS

**Prerequisites:**
- 6 months of exposure to AWS AI/ML services (recommended)
- Basic understanding of cloud computing concepts
- Familiarity with data analytics concepts
- No programming experience required

---

## Exam Objectives

For the complete and official list of exam objectives, refer to the **[AWS Certified AI Practitioner (AIF-C01) Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf)**.

### Exam Weighting

| Domain | Weight | Focus Areas |
|--------|--------|-------------|
| Domain 1: Fundamentals of AI and ML | ~20% | AI concepts, ML types, lifecycle |
| Domain 2: Fundamentals of Generative AI | ~24% | GenAI concepts, capabilities, AWS services |
| Domain 3: Applications of Foundation Models | ~28% | Model selection, RAG, prompt engineering |
| Domain 4: Guidelines for Responsible AI | ~14% | Fairness, explainability, best practices |
| Domain 5: Security, Compliance, and Governance | ~14% | Security, compliance, governance |

### In-Scope AWS AI/ML Services

**Generative AI Services:**
- **Amazon Bedrock**: Foundation models as a service
- **Amazon Q**: AI-powered business assistant
- **Amazon CodeWhisperer**: AI code suggestions
- **PartyRock**: AI app builder

**ML Services:**
- **Amazon SageMaker**: End-to-end ML platform (Studio, JumpStart, Clarify, Model Monitor, Autopilot)
- **Amazon Augmented AI (A2I)**: Human review workflows

**AI Services:**
- **Amazon Rekognition**: Image and video analysis
- **Amazon Textract**: Document text extraction
- **Amazon Comprehend**: NLP and sentiment analysis
- **Amazon Translate**: Language translation
- **Amazon Transcribe**: Speech-to-text
- **Amazon Polly**: Text-to-speech
- **Amazon Lex**: Conversational interfaces
- **Amazon Personalize**: Recommendation systems
- **Amazon Kendra**: Intelligent search

**Supporting Services:**
- **Amazon OpenSearch Service**: Vector database for RAG
- **AWS Lambda**, **Amazon S3**, **AWS IAM**, **AWS CloudTrail**

---

## Study Materials

### 📚 [Study Notes](./domain-1.md)
Comprehensive study notes covering all exam topics across 5 domains

### 🎯 [Exam Guide](./exam-guide.md)
Exam traps, common pitfalls, and quick decision rules

### 📄 [Cheatsheet](./cheatsheet.md)
One-page exam day reference - print and review 5 minutes before the exam

### 💡 [Exam Tips](./exam-tips.md)
Exam strategies and study advice

---

## 📖 Official Resources

- [AWS AI & ML Learning Plan](https://aws.amazon.com/training/learn-about/machine-learning/)
- [Official Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-ai-practitioner/AWS-Certified-AI-Practitioner_Exam-Guide.pdf)
- [AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/)
- [Amazon SageMaker Documentation](https://docs.aws.amazon.com/sagemaker/)
- [Responsible AI Resources](https://aws.amazon.com/machine-learning/responsible-ai/)

---

## Study Progress

<ProgressTracker
  title="AIF-C01 Study Progress"
  storage-key="aif-c01-progress"
  :items="[
    {
      id: 'domain-1',
      label: 'Domain 1: Fundamentals of AI and ML (20%)',
      children: [
        { id: 'domain-1-1', label: '1.1: AI concepts and terminology' },
        { id: 'domain-1-2', label: '1.2: Practical AI use cases' },
        { id: 'domain-1-3', label: '1.3: ML development lifecycle' }
      ]
    },
    {
      id: 'domain-2',
      label: 'Domain 2: Fundamentals of Generative AI (24%)',
      children: [
        { id: 'domain-2-1', label: '2.1: Generative AI concepts' },
        { id: 'domain-2-2', label: '2.2: Capabilities and limitations' },
        { id: 'domain-2-3', label: '2.3: AWS generative AI services' }
      ]
    },
    {
      id: 'domain-3',
      label: 'Domain 3: Applications of Foundation Models (28%)',
      children: [
        { id: 'domain-3-1', label: '3.1: Design considerations' },
        { id: 'domain-3-2', label: '3.2: Model selection' },
        { id: 'domain-3-3', label: '3.3: Prompt engineering and fine-tuning' },
        { id: 'domain-3-4', label: '3.4: RAG (Retrieval Augmented Generation)' }
      ]
    },
    {
      id: 'domain-4',
      label: 'Domain 4: Guidelines for Responsible AI (14%)',
      children: [
        { id: 'domain-4-1', label: '4.1: Responsible AI practices' },
        { id: 'domain-4-2', label: '4.2: Model explainability' }
      ]
    },
    {
      id: 'domain-5',
      label: 'Domain 5: Security, Compliance, Governance (14%)',
      children: [
        { id: 'domain-5-1', label: '5.1: Securing AI systems' },
        { id: 'domain-5-2', label: '5.2: Governance and compliance' }
      ]
    },
    { id: 'bedrock', label: 'Explore Amazon Bedrock hands-on' },
    { id: 'practice', label: 'Practice with AWS AI/ML services' },
    { id: 'ready', label: 'Ready for certification' }
  ]"
/>

---

[Start Study Notes →](./domain-1.md) · [Exam Guide →](./exam-guide.md) · [Cheatsheet →](./cheatsheet.md)
