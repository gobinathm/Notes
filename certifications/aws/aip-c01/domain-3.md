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

```
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

### Configuring a Guardrail

1. Create a Guardrail in the Bedrock console or via API
2. Configure filter types and sensitivity levels for each category
3. Version the Guardrail (you can maintain multiple versions)
4. Apply in your API call: pass `guardrailIdentifier` + `guardrailVersion` to `InvokeModel`

::: warning Exam Trap
**Guardrails filter BOTH inputs AND outputs** — not just one direction. A common wrong answer claims Guardrails only filter the model's response. They evaluate the user's prompt AND the model's answer.

Also: Guardrails are **not applied automatically** to all Bedrock calls. You must explicitly include them in each API request.
:::

### PII Detection Modes

| Mode | Behavior |
|---|---|
| **Redact** | Replace PII with a placeholder (e.g., `[EMAIL]`) — request/response still proceeds |
| **Block** | Reject the entire request or response if PII is detected |

---

## 3.2 IAM & Access Control

### Least-Privilege IAM for Bedrock

**Service roles required:**
- Bedrock needs an IAM service role to access S3 during Knowledge Base ingestion
- Knowledge Bases use a service-linked role to access OpenSearch Serverless

**Key IAM actions for Bedrock:**

```
bedrock:InvokeModel
bedrock:InvokeModelWithResponseStream
bedrock:InvokeAgent
bedrock:Retrieve           (Knowledge Base queries)
bedrock:CreateKnowledgeBase
```

### Resource-Based Policies

- **Cross-account access**: Use resource-based policies on Bedrock resources to allow access from another AWS account
- **Condition keys**: Restrict access by `bedrock:ModelId` to enforce which models a principal can invoke

### Best Practices

- Grant `bedrock:InvokeModel` scoped to specific `modelId` values only
- Use IAM roles (not IAM users with long-lived access keys) for application access
- Apply `bedrock:ModelId` condition keys to limit which FMs can be invoked by a given role

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

<FlashcardDeck
  storage-key="aip-c01-d3-cards"
  :cards="[
    {
      question: 'Do Guardrails apply to both inputs and outputs?',
      answer: '<strong>Yes.</strong> Guardrails filter both the user\'s input prompt AND the FM\'s output response. Applied to InvokeModel, the Guardrail evaluates the prompt before sending it to the model, and evaluates the response before returning it to the caller.'
    },
    {
      question: 'What must you include in every Bedrock API call to activate a Guardrail?',
      answer: 'You must pass <strong>guardrailIdentifier</strong> and <strong>guardrailVersion</strong> in the API request. Guardrails are NOT automatically applied to all Bedrock calls — they must be explicitly included in each request where you want them active.'
    },
    {
      question: 'Which AWS service provides the audit trail for all Amazon Bedrock API calls?',
      answer: '<strong>AWS CloudTrail</strong> — it logs every Bedrock API call (who called it, when, from where, and with what parameters). CloudWatch is for operational metrics and alarms, not audit logs.'
    },
    {
      question: 'Which VPC endpoint type is needed to make InvokeModel calls privately?',
      answer: '<strong>bedrock-runtime</strong> — this is the endpoint for Bedrock runtime inference (InvokeModel, InvokeModelWithResponseStream). The control plane endpoint (bedrock) is for management operations like creating Knowledge Bases and Guardrails.'
    },
    {
      question: 'What is the difference between Redact and Block in PII Guardrails?',
      answer: '<strong>Redact</strong>: Replace the PII value with a placeholder like [EMAIL] — the request or response still proceeds with the masked value. <strong>Block</strong>: Reject the entire request or response if PII is detected.'
    },
    {
      question: 'What Bedrock feature logs all input prompts and output responses for AI governance?',
      answer: '<strong>Model Invocation Logging</strong> — enabled in Bedrock settings, it captures every prompt and completion and writes them to S3 or CloudWatch Logs for traceability and compliance review. This is different from CloudTrail, which only logs API call metadata.'
    }
  ]"
/>

---

[← Domain 2](./domain-2.md) · [Next: Domain 4 →](./domain-4.md)
