---
title: "Domain 2: Implement Content Moderation"
description: "Notes on using Azure AI Content Safety for text and images"
---

# Domain 2: Implement Content Moderation (10-15%)

## 2.1 Azure AI Content Safety

### Overview
A service designed to detect harmful content in user-generated text and images. Essential for generous AI applications (chatbots) and community platforms.

### Categories of Harm
1.  **Hate**: Discrimination based on race, religion, gender, etc.
2.  **Self-Harm**: Content encouraging self-injury or suicide.
3.  **Violence**: Physical harm, weapons.
4.  **Sexual**: Explicit content.

### Severity Levels
- **Safe**, **Low**, **Medium**, **High**.
- You configure thresholds. E.g., Block "Medium" and "High" violence, but allow "Low".

## 2.2 Text Moderation

### Capabilities
- **Analyze Text API**: Returns severity scores for the 4 categories.
- **Blocklists**: Add specific terms (profanity, competitors) to block.
- **PII Detection**: Identify emails, phone numbers, addresses (often handled by Language Service, but Content Safety has overlap).

## 2.3 Image Moderation

### Capabilities
- **Analyze Image API**: Detects visual content in the 4 categories.
- **OCR (Optical Character Recognition)**: Checks text *inside* images for harmful content.

## 2.4 Responsible AI Principles

Microsoft adheres to 6 core AI principles:
1.  **Fairness**: AI should treat all people fairly (mitigate bias).
2.  **Reliability & Safety**: AI should perform reliably and safely (error handling, rigor).
3.  **Privacy & Security**: Secure data and respect privacy.
4.  **Inclusiveness**: Empower everyone (accessibility).
5.  **Transparency**: Understand how AI works (explainability).
6.  **Accountability**: People are accountable for AI systems.
