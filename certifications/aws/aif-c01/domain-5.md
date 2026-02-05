---
title: "Domain 5 - Security, Compliance, and Governance"
description: "AIF-C01 Domain 5: Securing AI systems, compliance, and governance best practices (14%)"
head:
  - - meta
    - name: keywords
      content: aif-c01, domain 5, security, compliance, governance, aws ai security
---

# Domain 5: Security, Compliance, and Governance (14%)

[← Domain 4](./domain-4.md) · [Exam Tips →](./exam-tips.md)

---

## 5.1: Securing AI Systems

### Data Security

<FlashcardDeck 
  title="AI Security"
  :cards="[
    {
      question: 'What is Prompt Injection?',
      answer: '<strong>Malicious prompts to bypass safety controls</strong><br>Example: &quot;Ignore previous instructions and...&quot;<br>Protection: Input sanitization, rate limiting, monitoring.'
    },
    {
      question: 'How to encrypt AI data in AWS?',
      answer: '<strong>At Rest: AWS KMS, S3 encryption</strong><br><strong>In Transit: TLS/SSL, HTTPS</strong><br>Always encrypt sensitive data and model artifacts.'
    },
    {
      question: 'What is Model Inversion attack?',
      answer: '<strong>Attempt to extract training data from model</strong><br>Risk: Exposing sensitive training data<br>Protection: Differential privacy, access controls, monitoring.'
    }
  ]"
/>

**Encryption**:
- ✅ **At Rest**: AWS KMS, S3 encryption
- ✅ **In Transit**: TLS/SSL, HTTPS

**Access Control**:
- IAM policies for fine-grained permissions
- VPC for network isolation
- Security groups and NACLs

**Input Validation**:
- Sanitize user inputs
- Limit input size
- Check for injection attacks

**Output Filtering**:
- Content moderation
- PII detection and redaction
- Toxicity filtering

---

### Model Security

**Adversarial Attacks**:
- **Prompt Injection**: Malicious prompts to bypass safety
- **Data Poisoning**: Corrupt training data
- **Model Inversion**: Extract training data

**Protection**:
- Input sanitization
- Rate limiting
- Monitoring for unusual patterns
- Regular security audits

---

## 5.2: Governance and Compliance

### Model Governance

**Version Control**:
- SageMaker Model Registry
- Track model lineage
- Associate models with data/code

**Approval Workflows**:
- Manual approval before production
- Automated testing gates
- Change management

**Audit Trails**:
- CloudTrail logs all API calls
- SageMaker logs training jobs
- Model deployment history

---

### Compliance

<FlashcardDeck 
  title="Compliance Requirements"
  :cards="[
    {
      question: 'What is HIPAA compliance for AI?',
      answer: '<strong>Healthcare data protection</strong><br>Use HIPAA-eligible AWS services<br>Encrypt PHI, access controls, audit logs.'
    },
    {
      question: 'What is GDPR right to explanation?',
      answer: '<strong>EU regulation requiring explainable AI decisions</strong><br>Users can request explanation of automated decisions<br>Use explainability tools like SageMaker Clarify.'
    },
    {
      question: 'What is Data Residency?',
      answer: '<strong>Keeping data in specific geographic location</strong><br>Choose appropriate AWS Region<br>Important for: GDPR, local regulations.'
    }
  ]"
/>

**Data Residency**:
- Choose appropriate AWS Region
- Keep data in specific geographic location

**Industry Regulations**:
- **HIPAA**: Healthcare data (use HIPAA-eligible services)
- **GDPR**: EU data privacy (right to explanation)
- **SOC 2**: Security controls
- **PCI DSS**: Payment card data

**Documentation Requirements**:
- Model cards
- Training data sources
- Performance metrics
- Bias testing results

---

## Quick Reference: AWS AI/ML Services

### When to Use Which Service?

| Need | Service |
|------|---------|
| Access foundation models | Amazon Bedrock |
| Business assistant | Amazon Q |
| Code suggestions | Amazon CodeWhisperer |
| End-to-end ML platform | Amazon SageMaker |
| Image/video analysis | Amazon Rekognition |
| Extract text from documents | Amazon Textract |
| Sentiment analysis | Amazon Comprehend |
| Translation | Amazon Translate |
| Speech-to-text | Amazon Transcribe |
| Text-to-speech | Amazon Polly |
| Chatbot | Amazon Lex |
| Recommendations | Amazon Personalize |
| Fraud detection | Amazon Fraud Detector |
| Intelligent search | Amazon Kendra |
| Human review | Amazon Augmented AI (A2I) |
| Vector database for RAG | Amazon OpenSearch Service |
| Detect bias | SageMaker Clarify |
| Monitor models | SageMaker Model Monitor |

---

[← Domain 4](./domain-4.md) · [Exam Tips →](./exam-tips.md)
