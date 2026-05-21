---
title: "AIP-C01 - Domain 3: AI Safety, Security, and Governance"
description: "AIP-C01 Domain 3 study notes: Guardrails, IAM, VPC endpoints, CloudTrail, and responsible AI governance on Amazon Bedrock"
head:
  - - meta
    - name: keywords
      content: aip-c01, domain 3, guardrails, iam, vpc endpoints, cloudtrail, responsible ai, pii, content filters, governance, security, bedrock
---

# Domain 3: AI Safety, Security, and Governance (20%)

[← Domain 2](./domain-2.md) · [Next: Domain 4 →](./domain-4.md)

::: tip Exam Tip
This domain is 20% of the exam. The key topics are Guardrails (know all four filter types and that they apply to BOTH inputs and outputs), IAM least-privilege, and distinguishing CloudTrail (audit/compliance) from CloudWatch (operational monitoring). These distinctions appear in nearly every governance question.
:::

---

## 3.1 Guardrails for Amazon Bedrock

### What Guardrails Do

Guardrails apply safety controls to **both the input prompt and the output response** of a foundation model. They act as a filter layer around the FM.

```text
User Input → [Guardrail Input Filter] → FM → [Guardrail Output Filter] → Response
```

**Guardrails do NOT automatically apply** — you must pass `guardrailIdentifier` and `guardrailVersion` in every API call where you want them active.

### Guardrail Filter Types

| Filter Type | What It Controls | Example |
|---|---|---|
| **Content Filters** | Block/allow harmful categories at configurable severity thresholds | Hate speech, violence, sexual content, insults |
| **Denied Topics** | Define topics the FM must refuse to discuss | Competitor products, political opinions, legal advice |
| **Word Filters** | Block specific words or phrases (exact match) | Profanity lists, brand-specific blocked terms |
| **PII Redaction** | Detect and mask/block personally identifiable information | Names, emails, SSNs, credit cards, phone numbers |
| **Contextual Grounding Check** | Verify the response is grounded in the retrieved source context — blocks hallucinated answers | RAG applications where factual accuracy is required |

### Configuring a Guardrail

1. Create a Guardrail in the Bedrock console or via API
2. Configure filter types and sensitivity levels for each category
3. Version the Guardrail (you can maintain multiple versions)
4. Apply in your API call: pass `guardrailIdentifier` + `guardrailVersion` to `InvokeModel`

::: warning Exam Trap
**Guardrails filter BOTH inputs AND outputs** — not just one direction. A common wrong answer claims Guardrails only filter the model's response. They evaluate the user's prompt AND the model's answer.

Also: Guardrails are **not applied automatically** to all Bedrock calls. You must explicitly include them in each API request.

There are **five** filter types — Content Filters, Denied Topics, Word Filters, PII Redaction, and Contextual Grounding Check. The exam may list only four as distractors.
:::

### PII Detection Modes

| Mode | Behavior |
|---|---|
| **Redact** | Replace PII with a placeholder (e.g., `[EMAIL]`) — request/response still proceeds |
| **Block** | Reject the entire request or response if PII is detected |

### Denied Topics vs. Other Filters

**Denied topics** are the right choice when the organization wants to block a **specific subject area** based on business policy, not just harmful language.

**Examples:**
- investment advice
- stock recommendations
- cryptocurrency trading
- competitor strategy discussion

**Why denied topics matter:**
- They let you define prohibited subjects in natural language
- They work at the **topic / intent level**, not just exact keyword matching
- They can return a controlled fallback such as: *"I cannot provide investment advice."*
- They apply consistently across supported Bedrock model interactions

**Use denied topics when:**
- The business wants to prohibit domain-specific conversations
- The prohibited content is not inherently hateful, violent, or unsafe, but still off-limits by policy

**Do not confuse these with other filters:**
- **Content filters** = harmful categories like hate, violence, sexual content, insults, profanity
- **PII filters** = privacy protection for sensitive personal data
- **Word filters** = exact word/phrase blocking, which can be too blunt and cause false positives

::: tip
If the scenario says **"block investment advice but still allow normal finance-related conversation when appropriate"**, the best answer is usually **Denied Topics**, not word filters.
:::

### Guardrails vs. Other Bedrock Features

| Feature | Primary Purpose | Not the Right Answer When... |
|---|---|---|
| **Guardrails for Amazon Bedrock** | Apply safety policies such as denied topics, content filters, PII redaction, and grounding checks across model inputs/outputs | The requirement is primarily retrieval, prompt storage, or workflow orchestration |
| **Knowledge Bases** | Implement RAG by connecting FMs to internal data sources | The requirement is to block unsafe topics or enforce content policy |
| **Prompt Management** | Create, store, version, and reuse prompts | The requirement is independent safety filtering or PII redaction |
| **Bedrock Agents** | Execute multi-step workflows with tools and company systems | The requirement is granular safety policy enforcement |

::: tip
If the question is asking **"which Bedrock feature enforces safety policies consistently across models?"** the answer is **Guardrails**, not Knowledge Bases, Prompt Management, or Agents.
:::

---

## 3.2 IAM & Access Control

### Least-Privilege IAM for Bedrock

**Service roles required:**
- Bedrock needs an IAM service role to access S3 during Knowledge Base ingestion
- Knowledge Bases use a service-linked role to access OpenSearch Serverless

**Key IAM actions for Bedrock:**

```text
bedrock:InvokeModel
bedrock:InvokeModelWithResponseStream
bedrock:InvokeAgent
bedrock:Retrieve
bedrock:CreateKnowledgeBase
```

### Resource-Based Policies

- **Cross-account access**: Use resource-based policies on Bedrock resources to allow access from another AWS account
- **Condition keys**: Restrict access by `bedrock:ModelId` to enforce which models a principal can invoke

### Lambda Execution Roles for Bedrock

When a Lambda function calls Bedrock, the correct pattern is to attach an **IAM execution role** to the function — not hardcode credentials.

**How it works:**
- Lambda automatically provides the execution role's **temporary credentials** to the function at runtime via the instance metadata service
- No credentials to manage, rotate, or accidentally expose
- Credentials are short-lived and scoped to the role's permissions

**Minimum required policy for a Lambda that calls Bedrock:**

```json
{
  "Effect": "Allow",
  "Action": "bedrock:InvokeModel",
  "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-*"
}
```

Scoping `Resource` to a specific model ARN enforces least-privilege — the function can only invoke that model, nothing else.

### Best Practices

- Grant `bedrock:InvokeModel` scoped to specific model ARNs — not `Resource: "*"`
- Use IAM execution roles for Lambda (not IAM users with long-lived access keys) — temporary credentials are provided automatically
- Apply `bedrock:ModelId` condition keys as an additional constraint when resource-level scoping is not sufficient
- Never hardcode AWS credentials inside Lambda function code or environment variables

---

## 3.3 VPC Endpoints & Private Connectivity

### Why Use VPC Endpoints?

Without a VPC endpoint, Bedrock API calls route over the public internet. VPC Endpoints (AWS PrivateLink) keep traffic within the AWS network backbone — no public internet routing.

**Use VPC Endpoints when:**
- Data residency or compliance requirements prohibit public internet routing
- Compute (Lambda, EC2, ECS) is inside a VPC
- You need to ensure FM traffic never leaves the AWS network

### Bedrock VPC Endpoint Types

| Endpoint | Service | Used For |
|---|---|---|
| `bedrock` | Amazon Bedrock control plane | Creating Knowledge Bases, Agents, Guardrails |
| `bedrock-runtime` | Amazon Bedrock runtime | `InvokeModel`, `InvokeModelWithResponseStream` |
| `bedrock-agent-runtime` | Amazon Bedrock Agent runtime | `InvokeAgent` calls |

::: tip
The exam may ask which endpoint is needed for inference calls. That's **`bedrock-runtime`** — not the control plane endpoint.
:::

---

## 3.4 Traceability & Auditability

### CloudTrail vs. CloudWatch

| Service | Purpose | What It Records |
|---|---|---|
| **AWS CloudTrail** | Audit / compliance logging | Every Bedrock API call (who called what, when, from where) |
| **Amazon CloudWatch** | Operational monitoring | Metrics (latency, token counts, errors), alarms, dashboards |

**CloudTrail** is the right answer when the question involves:
- "Audit trail for regulatory compliance"
- "Who made this API call and when?"
- "Log all Bedrock API activity for security review"

**CloudWatch** is the right answer when the question involves:
- "Monitor latency and throttling errors"
- "Set an alarm if token usage exceeds a threshold"
- "Operational dashboards for the GenAI application"

### Model Invocation Logging

- Bedrock can log all model invocations (input prompts + output completions) to **S3 or CloudWatch Logs**
- Enable via: Bedrock console → Settings → Model invocation logging
- Use case: Traceability of what was sent to the FM and what it returned — required for AI governance and compliance

::: warning Exam Trap
**CloudTrail vs CloudWatch** — the exam frequently swaps these as distractors. CloudTrail = who called Bedrock (audit). CloudWatch = how Bedrock is performing (operations). Model Invocation Logging captures the actual content of prompts and responses — different from both.
:::

---

## 3.5 Responsible AI

### AWS Responsible AI Principles

AWS grounds its AI services in these principles — know them for governance questions:

| Principle | What It Means |
|---|---|
| **Fairness** | AI systems should not produce discriminatory outputs or amplify biases |
| **Explainability** | Stakeholders should be able to understand why a model produced a given output |
| **Privacy & Security** | Customer data must be protected; models should not leak sensitive information |
| **Safety** | Models should not produce harmful content or take harmful actions |
| **Controllability** | Humans must be able to intervene, override, or shut down AI systems |
| **Veracity & Robustness** | Models should produce accurate, consistent outputs across varied inputs |
| **Governance** | Organizations need policies, processes, and accountability structures for AI use |

### AWS AI Service Cards

AWS publishes **AI Service Cards** for its managed AI services (including Rekognition, Textract, Comprehend, etc.). Each card documents:

- **Intended use cases** and **out-of-scope uses**
- **Known limitations and biases** identified during testing
- **Performance across different demographic groups**
- **Recommended safeguards** for responsible deployment

::: tip Exam Relevance
If a question asks *"how do you understand the limitations and intended use cases of an AWS AI service,"* the answer is the **AI Service Card** for that service — not the API documentation.
:::

### Bias & Fairness

**Bias sources in GenAI systems:**
- **Training data bias**: if training data over-represents certain groups or perspectives, the model reflects that
- **Prompt bias**: poorly designed prompts can elicit biased outputs
- **Feedback loop bias**: RLHF-trained models may amplify rater preferences

**Mitigation approaches:**
- Evaluate model outputs across different demographic inputs before production deployment
- Use Bedrock **Guardrails** to block harmful or discriminatory content categories
- Use **Model Evaluation** to run diverse prompt sets and measure output consistency
- Apply human review for high-stakes decisions (hiring, lending, healthcare)

### Human Oversight

- **High-stakes decisions** (legal, medical, financial) must include a human review step — do not fully automate
- **Bedrock Agents** can be configured with a **human-in-the-loop** confirmation step before executing irreversible actions
- Model Invocation Logging enables post-hoc review of all FM inputs and outputs for accountability

::: warning Exam Trap
Guardrails and safety filters are **not a substitute for human oversight** in high-stakes scenarios. The exam may present Guardrails as sufficient — they are a necessary layer but not the complete answer when human judgment is required.
:::

---

## 3.6 Data Classification & Pre-Ingestion Security

### Amazon Macie

Amazon Macie is a managed data security service that uses machine learning to **automatically discover, classify, and protect sensitive data stored in Amazon S3**.

**What Macie does:**
- Scans S3 buckets at scale and identifies files containing PII (SSNs, names, addresses, medical record numbers, credit cards)
- Generates **inventory reports** showing which buckets and objects contain sensitive data
- Provides **risk scores** and findings surfaced in a Security Hub-integrated dashboard
- Sends findings to EventBridge for automated remediation workflows

**GenAI relevance — pre-ingestion audit:**

Before connecting an S3 bucket as a Bedrock Knowledge Base data source, you should verify it does not contain unintended sensitive data. Macie is the right tool for this:

```text
S3 Buckets (raw documents)
    ↓ Macie scans at scale
Findings Report (which buckets/files contain PII, risk scores)
    ↓ Security team reviews
Safe buckets approved → Bedrock Knowledge Base ingestion
```

### Macie vs. Comprehend vs. Bedrock Guardrails PII

| | Amazon Macie | Amazon Comprehend | Bedrock Guardrails PII |
|---|---|---|---|
| **When** | Before ingestion — audit S3 inventory | At processing time — analyze text | At inference time — inside Bedrock call |
| **What** | Discovers which S3 objects contain PII | Detects and extracts PII entities from text | Redacts or blocks PII in prompts/responses |
| **Output** | Findings report, risk scores, inventory | Structured entity annotations | Masked/blocked content in API response |
| **Best for** | "Audit which S3 buckets are safe to use as RAG sources" | Pre/post-processing text in a pipeline | Real-time PII control within Bedrock |

::: tip Exam Scenario
*"Before building a RAG knowledge base from company S3 buckets, how do you identify which buckets contain sensitive PII?"* → **Amazon Macie**

Macie operates at the S3 bucket/object level before data ever reaches Bedrock. Comprehend and Guardrails operate on text content during or after ingestion.
:::

---

## 3.7 Enterprise Identity, Governance, and Compliance Controls

Production GenAI systems often sit behind enterprise identity, organization policies, data-governance controls, and audit requirements.

### Authentication and Federation

| Requirement | AWS Service / Pattern |
|---|---|
| Customer-facing app sign-in | Amazon Cognito |
| Workforce access to AWS apps/accounts | IAM Identity Center |
| Existing enterprise IdP | SAML or OIDC federation |
| Temporary access instead of long-lived keys | IAM roles and STS credentials |
| API-level access control | IAM authorization, Lambda authorizers, or Cognito authorizers |

**How to choose:**
- **Cognito**: app users, user pools, social/OIDC sign-in, token-based app auth
- **IAM Identity Center**: workforce identities and AWS account/application access
- **SAML/OIDC federation**: integrate with an existing IdP so users do not receive long-lived AWS credentials

::: tip Exam Scenario
If the scenario says **existing IdP**, **temporary credentials**, or **central workforce access**, think federation with IAM roles, IAM Identity Center, SAML, or OIDC rather than static IAM users.
:::

### Lake Formation and Governed Data Access

Use **AWS Lake Formation** when the GenAI pipeline reads governed data from a data lake and access must be controlled at a fine-grained level.

| Need | Best Fit |
|---|---|
| Govern table/column/row access in a data lake | Lake Formation |
| Discover sensitive data in S3 before ingestion | Macie |
| Redact text PII during processing | Comprehend or Guardrails |
| Encrypt storage with customer-managed keys | AWS KMS |

**GenAI relevance:** if RAG or model evaluation datasets are built from governed data lake assets, Lake Formation controls who and what can read the source data before it becomes model context.

### Service Control Policies and Organization Guardrails

**SCPs** enforce organization-level permission boundaries across AWS accounts.

**Use SCPs to:**
- Restrict approved AWS regions for GenAI workloads
- Deny access to unapproved Bedrock model IDs
- Require use of approved accounts or VPC endpoint patterns
- Prevent teams from disabling required logging or encryption controls

::: warning Exam Trap
IAM policies grant permissions within an account. **SCPs set the maximum permissions an account can use**. If the requirement is organization-wide restriction, SCPs are the stronger governance control.
:::

### Model Cards, Data Lineage, and Decision Logging

Governance questions may ask how to document, explain, and audit GenAI systems.

| Governance Need | Pattern |
|---|---|
| Document intended use and limitations | Model cards / AI Service Cards |
| Track source data used for retrieval or evaluation | Data lineage metadata |
| Audit who called which model | CloudTrail |
| Capture prompts and responses for investigation | Model Invocation Logging |
| Explain RAG responses to users | Citations and source attribution |
| Support deletion/retention requirements | Data lifecycle policies and index rebuild/update workflows |

**Right to be forgotten pattern:**

```text
Delete source record/document
    ↓
Remove or expire derived chunks
    ↓
Rebuild or update vector index
    ↓
Verify retrieval no longer returns deleted content
```

### Continuous Monitoring and Remediation

Use monitoring when model behavior or data quality can drift after deployment.

| Signal | Tool / Pattern |
|---|---|
| Endpoint performance drift | SageMaker Model Monitor |
| Bedrock latency, token usage, throttling | CloudWatch metrics and alarms |
| Suspicious API activity | CloudTrail and Security Hub |
| Unsafe prompts or outputs | Guardrails metrics/log review |
| Failed ingestion or stale vector data | Pipeline metrics and EventBridge remediation |

::: tip
If the scenario describes **automated remediation**, pair detection with EventBridge, Lambda, or Step Functions so the system can quarantine data, roll back config, or trigger a review workflow.
:::

---

[← Domain 2](./domain-2.md) · [Next: Domain 4 →](./domain-4.md)
