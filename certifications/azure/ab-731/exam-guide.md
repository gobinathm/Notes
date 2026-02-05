---
title: "AB-731 - Exam Guide"
description: "Traps, common pitfalls, and quick decision rules for the AB-731 exam"
head:
  - - meta
    - name: keywords
      content: ab-731, exam guide, exam traps, tips
---

# Exam Guide & Traps

[← Domain 3](./domain-3.md) · [Cheatsheet →](./cheatsheet.md)

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
