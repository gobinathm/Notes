---
title: "Domain 1: Plan and Manage an Azure AI Solution"
description: "Notes on deploying, securing, and monitoring Azure AI resources"
---

# Domain 1: Plan and Manage an Azure AI Solution (15-20%)

## 1.1 Select and Deploy Resources

### Resource Types
- **Single-Service Resource**: Creating a specific resource (e.g., Computer Vision, Language) gives you granular cost tracking and specific keys. Use this when you need to chargeback costs to specific departments for specific capabilities.
- **Multi-Service Resource** (*Azure AI Services*): A single endpoint and key for Vision, Language, Content Safety, etc. Simplifies management for apps using multiple AI features.
  - *Limitation*: Some services (like Custom Vision training) might still need specific resources.

### Deployment Options
- **Azure Portal**: GUI-based, good for exploration.
- **Azure CLI / PowerShell**: Scriptable.
- **ARM Templates / Bicep**: Infrastructure as Code (IaC) for repeatable deployments.
- **Docker Containers**: Many AI services (Language, Vision) can run as containers on-prem or in Kubernetes. Use cases:
  - **Data Residency**: Process data locally without sending it to the cloud.
  - **Latency**: Faster response times for edge devices.
  - *Note*: Billing still requires a connection to Azure (metering endpoint).

## 1.2 Manage Security and Authentication

### Authentication Methods
1.  **Subscription Keys**: Easiest but least secure. If leaked, anyone can use your quota.
2.  **Managed Identities** (Recommended): System-assigned or User-assigned identities.
    - Eliminates need to manage credentials in code.
    - Assign RBAC roles like **Cognitive Services User** to the identity.
    - Code uses `DefaultAzureCredential()` from Azure Identity SDK.

### Network Security
- **Virtual Networks (VNETs)**: Restrict access to specific subnets.
- **Private Endpoints**: Access the service over a private IP in your VNET (disables public internet access).
- **Firewall Rules**: Allow specific public IP addresses.

## 1.3 Monitor and Troubleshoot

### Diagnostic Settings
- Enable **Diagnostic Settings** to send logs to:
  - **Log Analytics Workspace**: Query logs with KQL.
  - **Storage Account**: Archive logs for compliance.
  - **Event Hubs**: Stream logs to 3rd party SIEMs.

### Alerts
- Set up alerts for:
  - **429 Errors (Rate Limit Exceeded)**: Scale up tier or optimize code (backoff/retry).
  - **5xx Errors (Server side)**: Azure platform issues.
  - **Quota Usage**: Monitor spend.
