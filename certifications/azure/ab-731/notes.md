---
title: "AB-731 - Study Notes"
description: "Concise study notes for AB-731 Microsoft AI Transformation Leader exam"
head:
  - - meta
    - name: keywords
      content: ab-731, microsoft, ai transformation, study notes, copilot, azure ai
---

# AB-731: Study Notes

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)

---

## Domain 1: Business Value of AI (35-40%)

### GenAI vs Traditional AI

| Traditional AI | Generative AI |
|----------------|---------------|
| Analyzes, classifies, predicts | Creates new content |
| Spam filter, fraud detection | Write emails, generate images |

### Key Terms

| Term | Remember |
|------|----------|
| Prompt | Input → affects output quality |
| Token | Text unit → affects cost |
| Context window | Input + output limit |
| Temperature | 0 = predictable, 1 = creative |

### Business Value Areas

- **Productivity**: Draft emails, summarize meetings, analyze data
- **Decision-making**: Faster insights from more data
- **Automation**: Handle routine tasks (FAQs, document processing)
- **Customer experience**: Personalized, faster responses

### ROI Thinking

**Costs**: Licensing, implementation, training, change management

**Value**: Time saved, costs reduced, revenue gained, risks avoided

::: warning Trap
Questions often ask about ROI. Include *all* value types, not just cost savings.
:::

---

## Domain 2: Microsoft AI Solutions (35-40%)

### Which Solution for What?

| Need | Solution |
|------|----------|
| Everyday productivity | **Microsoft 365 Copilot** |
| Custom AI apps | **Azure AI Foundry** |
| Sales workflows | Copilot for Sales |
| Customer service | Copilot for Service |
| CRM/ERP workflows | Dynamics 365 Copilot |
| Low-code automation | Power Platform AI |

::: warning Trap
Know the difference: M365 Copilot = productivity tool for users. Azure AI Foundry = platform for building custom AI.
:::

### Microsoft 365 Copilot by App

| App | What it does |
|-----|--------------|
| Word | Draft, summarize, rewrite |
| Excel | Analyze, formulas, charts |
| PowerPoint | Create from docs, design |
| Outlook | Draft, summarize threads, prioritize |
| Teams | Meeting summaries, action items |

**Business Chat / M365 Chat**: Cross-app assistant. Queries emails, docs, meetings together.

### Copilot Security Model

Three things to remember:

1. **Tenant isolation** — Your data stays in your tenant
2. **Respects permissions** — Users only see what they already have access to
3. **Not used for training** — Microsoft doesn't train public models on your data

::: warning Trap
"Will Copilot use my data to train models?" → No. Enterprise data stays private.
:::

### Azure AI Foundry

- Build custom AI applications
- Access multiple models (OpenAI, Meta, Mistral)
- Fine-tuning, RAG, prompt engineering tools
- Enterprise security and compliance

---

## Domain 3: Implementation & Adoption (20-25%)

### Microsoft's 6 Responsible AI Principles

| Principle | Meaning |
|-----------|---------|
| **Fairness** | Treat all people equitably |
| **Reliability** | Perform consistently |
| **Privacy** | Protect user data |
| **Inclusiveness** | Work for everyone |
| **Transparency** | Be understandable |
| **Accountability** | People own AI decisions |

Memory: **FRPITA** — Fair, Reliable, Private, Inclusive, Transparent, Accountable

### AI Council

**Who's on it**: Executive sponsor, Legal, Business units, IT, HR/Training

**What it does**: Sets strategy, approves projects, establishes policies, monitors risks

::: warning Trap
Questions about "first steps" → Usually governance/council before technical implementation.
:::

### Adoption Phases

| Phase | Duration | Focus |
|-------|----------|-------|
| Pilot | 4-8 weeks | 50-100 champions, gather feedback |
| Expand | 8-12 weeks | More departments, refine |
| Deploy | Ongoing | Organization-wide |

### Change Management Essentials

- **Communication**: Clear vision, regular updates, success stories
- **Training**: Role-specific, hands-on
- **Support**: Help desk, champions, documentation
- **Metrics**: Track adoption, productivity, satisfaction

### Success Metrics

| Category | Example |
|----------|---------|
| Adoption | % active users |
| Productivity | Time saved per task |
| Quality | Error reduction |
| Satisfaction | User feedback score |
| Business | ROI achieved |

---

## Exam Traps

### Trap 1: Technical vs Business Focus

This exam asks what a **business leader** should do, not an engineer.

- ❌ "Configure Azure settings..."
- ✅ "Establish governance policies..."

### Trap 2: What Comes First?

**Correct order:**
1. Executive sponsorship
2. Governance & policies
3. Organizational readiness
4. Pilot
5. Expand
6. Deploy

- ❌ "Deploy Copilot to all users"
- ✅ "Assess organizational readiness"

### Trap 3: Product Confusion

| If question mentions... | Think... |
|------------------------|----------|
| Knowledge workers, productivity | M365 Copilot |
| Custom AI, developers | Azure AI Foundry |
| CRM, sales, service | Dynamics 365 Copilot |

### Trap 4: Security Concerns

When users worry about data privacy:

- ✅ Data stays in tenant
- ✅ Respects existing permissions
- ✅ Not used to train public models
- ✅ Enterprise compliance (SOC 2, ISO 27001)

### Trap 5: Measuring Success

Don't just mention adoption numbers. Include:
- Productivity gains
- Quality improvements
- User satisfaction
- Business outcomes

---

## Decision Quick Reference

### "Which Microsoft AI solution?"

```
User is a knowledge worker → M365 Copilot
Need to build custom AI → Azure AI Foundry
Need AI in CRM/ERP → Dynamics 365 Copilot
Need low-code AI → Power Platform
```

### "What should be done first?"

```
Always: Governance, executive buy-in, readiness assessment
Never first: Technical deployment, broad rollout
```

### "How to address concerns about..."

```
Data privacy → Tenant isolation, permissions respected
Bias → Responsible AI principles, governance
Adoption → Change management, training, champions
ROI → Multiple value categories, phased approach
```

---

[← Overview](./index.md) · [Cheatsheet →](./cheatsheet.md)
