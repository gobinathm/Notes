---
title: "AIP-C01 - Exam Objectives"
description: "Official exam objectives for AIP-C01 AWS Certified Generative AI Developer – Professional"
head:
  - - meta
    - name: keywords
      content: aip-c01, aws, exam objectives, generative ai, bedrock, domains, certification, foundation model, rag, guardrails, opensearch
---

# AIP-C01: Exam Objectives

[← Back to Overview](./index.md)

For the complete and official list of exam objectives, refer to the official study guide:

**[Study guide for AIP-C01: AWS Certified Generative AI Developer – Professional](https://d1.awsstatic.com/training-and-certification/docs-generative-ai-developer-professional/AWS-Certified-Generative-AI-Developer-Professional_Exam-Guide.pdf)**

---

## Exam Weighting

| Domain | Weight | Focus Areas |
|--------|--------|-------------|
| Domain 1: FM Integration, Data Management, and Compliance | 31% | FM selection, data pipelines, vector stores, prompt engineering, compliance |
| Domain 2: Implementation and Integration | 26% | Bedrock Agents, RAG architecture, chunking, API integration |
| Domain 3: AI Safety, Security, and Governance | 20% | Guardrails, IAM policies, VPC endpoints, traceability, auditability |
| Domain 4: Operational Efficiency and Optimization | 12% | Token efficiency, cost optimization, Provisioned Throughput (PTUs) |
| Domain 5: Testing, Validation, and Troubleshooting | 11% | Model evaluation, CloudWatch metrics, CloudTrail auditing, debugging |

---

## In-Scope AWS Services

### Core AI/ML Services
- **Amazon Bedrock**: Managed foundation model service — InvokeModel, Knowledge Bases, Agents, Guardrails
- **Amazon SageMaker**: Model training, fine-tuning, and custom model deployment
- **Amazon Comprehend**: NLP service for text analysis and entity recognition

### Storage & Vector Databases
- **Amazon OpenSearch Serverless**: Primary vector store for RAG knowledge bases
- **Amazon S3**: Data ingestion, storage, and staging for RAG pipelines
- **Aurora PostgreSQL (pgvector)**: Alternative vector store using pgvector extension

### Compute & Integration
- **AWS Lambda**: Orchestration and integration layer for Bedrock Agents
- **Amazon API Gateway**: Expose Bedrock-powered APIs to external consumers
- **Amazon ECS / EKS**: Container-based deployment for GenAI application backends

### Security & Governance
- **AWS IAM**: Least-privilege access control for Bedrock resources
- **AWS PrivateLink / VPC Endpoints**: Private connectivity to Bedrock without public internet
- **AWS CloudTrail**: Audit logging of all Bedrock API calls
- **Amazon CloudWatch**: Operational metrics, alarms, and dashboards for monitoring

### Search & Retrieval
- **Amazon Kendra**: Enterprise search for document retrieval (alternative RAG source)
- **Amazon Bedrock Knowledge Bases**: Managed RAG pipeline integrating S3 + OpenSearch

---

## Study Progress

<ProgressTracker
  title="AIP-C01 Objectives Progress"
  storage-key="aip-c01-objectives-progress"
  :items="[
    { id: 'objectives', label: 'Reviewed exam objectives' },
    { id: 'notes', label: 'Completed study notes' },
    { id: 'exam-tips', label: 'Reviewed exam tips' },
    { id: 'practice', label: 'Completed practice exercises' },
    { id: 'ready', label: 'Ready for certification' }
  ]"
/>

---

[← Back to Overview](./index.md) | [Study Notes →](./notes.md) | [Exam Tips →](./exam-tips.md)
