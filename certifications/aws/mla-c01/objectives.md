---
title: "MLA-C01 - Exam Objectives"
description: "Official exam objectives for AWS Certified Machine Learning Engineer - Associate"
---

# MLA-C01: Exam Objectives

For the complete and official list of exam objectives, refer to the official exam guide:

**[AWS Certified Machine Learning Engineer - Associate Exam Guide (PDF)](https://d1.awsstatic.com/training-and-certification/docs-machine-learning-engineer-associate/AWS-Certified-Machine-Learning-Engineer-Associate_Exam-Guide.pdf)**

---

## Exam Weighting

| Domain | Weight | Focus Areas |
|--------|--------|-------------|
| Domain 1: Data Preparation for ML | ~28% | Ingest, store, transform, feature engineering, data integrity |
| Domain 2: ML Model Development | ~26% | Model selection, training, tuning, performance analysis |
| Domain 3: Deployment and Orchestration | ~22% | Infrastructure, containers, CI/CD pipelines |
| Domain 4: Monitoring, Maintenance, Security | ~24% | Model monitoring, cost optimization, security |

---

## In-Scope AWS Services

### Machine Learning
- **Amazon SageMaker**: End-to-end ML platform (primary focus)
  - SageMaker Studio, Data Wrangler, Feature Store
  - SageMaker Pipelines, Model Registry
  - SageMaker Clarify, Model Monitor, Debugger
  - SageMaker JumpStart, Autopilot, Neo
  - SageMaker Inference Recommender
- **Amazon Bedrock**: Foundation models and fine-tuning
- **Amazon A2I**: Human review workflows
- **Amazon Comprehend**: NLP and text analysis
- **Amazon Rekognition**: Image and video analysis
- **Amazon Textract**: Document extraction
- **Amazon Transcribe**: Speech-to-text
- **Amazon Translate**: Language translation
- **Amazon Personalize**: Recommendations
- **Amazon Forecast**: Time-series forecasting
- **Amazon Q**: AI-powered assistant

### Analytics & Data
- **AWS Glue**: ETL and data catalog
- **AWS Glue DataBrew**: Visual data preparation
- **Amazon EMR**: Big data processing (Spark)
- **Amazon Athena**: Serverless SQL queries
- **Amazon Kinesis**: Real-time streaming
- **AWS Lake Formation**: Data lake management
- **Amazon Redshift**: Data warehouse

### Compute & Containers
- **Amazon EC2**: Compute instances (GPU/CPU)
- **AWS Lambda**: Serverless functions
- **AWS Batch**: Batch processing
- **Amazon ECR**: Container registry
- **Amazon ECS/EKS**: Container orchestration

### Developer Tools & CI/CD
- **AWS CodePipeline**: CI/CD pipelines
- **AWS CodeBuild**: Build service
- **AWS CodeDeploy**: Deployment automation
- **AWS CloudFormation**: Infrastructure as code
- **AWS CDK**: Cloud Development Kit

### Monitoring & Management
- **Amazon CloudWatch**: Monitoring and logging
- **AWS CloudTrail**: API audit logging
- **AWS X-Ray**: Distributed tracing
- **AWS Cost Explorer**: Cost analysis
- **AWS Compute Optimizer**: Resource rightsizing

### Storage
- **Amazon S3**: Object storage (primary data lake)
- **Amazon EFS**: Shared file storage
- **Amazon FSx**: High-performance file systems
- **Amazon EBS**: Block storage

### Security
- **AWS IAM**: Identity and access management
- **AWS KMS**: Key management
- **Amazon Macie**: Data security
- **AWS Secrets Manager**: Secrets management

---

## Study Progress

<ProgressTracker
  title="MLA-C01 Study Progress"
  storage-key="mla-c01-progress"
  :items="[
    { id: 'objectives', label: 'Reviewed exam objectives' },
    { id: 'notes', label: 'Completed study notes' },
    { id: 'exam-tips', label: 'Reviewed exam tips' },
    { id: 'sagemaker', label: 'Hands-on with SageMaker' },
    { id: 'ready', label: 'Ready for certification' }
  ]"
/>

---

[← Back to Overview](./index.md) | [Resources →](./resources.md)
