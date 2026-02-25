---
title: "AIP-C01: Exam Guide"
description: "Domain breakdown and key topics for the AWS Certified Generative AI Developer – Professional exam"
---

# AIP-C01: Exam Guide

The **AWS Certified Generative AI Developer – Professional** (AIP-C01) exam measures your ability to build, deploy, and monitor generative AI applications on AWS.

## Exam Domains

| Domain | Weighting |
|--------|-----------|
| **Domain 1: Foundation Model Integration, Data Management, and Compliance** | 31% |
| **Domain 2: Implementation and Integration** | 26% |
| **Domain 3: AI Safety, Security, and Governance** | 20% |
| **Domain 4: Operational Efficiency and Optimization for GenAI Applications** | 12% |
| **Domain 5: Testing, Validation, and Troubleshooting** | 11% |

---

## Domain 1: FM Integration, Data Management, and Compliance (31%)
- **FM Selection**: Choosing the right model (e.g., Claude, Llama, Mistral) based on latency, cost, and context window requirements.
- **Data Pipelines**: Implementing S3 ingestion workflows, data validation, and pre-processing for RAG.
- **Vector Stores**: Designing vector solutions using **Amazon OpenSearch Serverless** or Aurora PostgreSQL with pgvector.
- **Compliance**: Ensuring data residency and adherence to organizational policies.

## Domain 2: Implementation and Integration (26%)
- **Agentic AI**: Implementing multi-step reasoning using **Amazon Bedrock Agents**.
- **RAG Architecture**: Creating knowledge bases, implementing chunking strategies, and tuning retrieval performance.
- **API Integration**: Using `InvokeModel` and `InvokeModelWithResponseStream` APIs.

## Domain 3: AI Safety, Security, and Governance (20%)
- **Guardrails for Amazon Bedrock**: Configuring content filters, PII detection, and denied topics.
- **Identity & Access**: IAM policies for Bedrock and VPC endpoints for private connectivity.
- **Governance**: Implementing traceable and auditable AI systems.

## Domain 4: Operational Efficiency and Optimization (12%)
- **Cost Optimization**: Implementing token efficiency systems and choosing cost-effective model deployment strategies.
- **Provisioned Throughput**: When to use PTUs for predictable performance.

## Domain 5: Testing, Validation, and Troubleshooting (11%)
- **Model Evaluation**: Using automated and human-based evaluation metrics (Groundness, Accuracy).
- **Monitoring**: AWS CloudWatch metrics and CloudTrail logs for auditing.
