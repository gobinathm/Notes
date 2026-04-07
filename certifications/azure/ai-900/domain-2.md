---
title: "AI-900 - Domain 2: Machine Learning on Azure"
description: "Study notes for AI-900 Domain 2: Describe fundamental principles of machine learning on Azure"
---

# Domain 2: Machine Learning on Azure

[<- Previous Domain](./domain-1.md) | [Overview](./index.md) | [Next Domain ->](./domain-3.md)

**Weight:** 15-20%

This domain tests basic ML terminology, common ML techniques, and what Azure Machine Learning provides.

---

## Common Machine Learning Techniques

| Technique | Use When | Output |
|---|---|---|
| **Regression** | Predict a numeric value | Price, temperature, sales amount |
| **Classification** | Predict a category | Approved/denied, fraud/not fraud, churn/no churn |
| **Clustering** | Group similar items without predefined labels | Customer segments, document groups |
| **Deep learning** | Learn complex patterns from large data | Images, speech, text, recommendations |
| **Transformer architecture** | Process sequences and context at scale | Language models, translation, summarization, code generation |

### Regression

Regression predicts a continuous numeric value. Look for keywords like **forecast**, **estimate**, **amount**, **price**, **quantity**, or **duration**.

### Classification

Classification predicts a discrete label. Binary classification has two classes; multiclass classification has more than two.

Examples:

- Fraud or not fraud
- Low, medium, or high risk
- Customer will churn or will not churn

### Clustering

Clustering is unsupervised learning. Use it when there are no labels and the goal is to discover natural groupings.

### Deep Learning

Deep learning uses neural networks with multiple layers. It is useful for complex, high-dimensional data such as images, audio, and natural language.

### Transformer Architecture

Transformers use attention mechanisms to understand relationships between tokens in a sequence. They are the foundation for many modern language and generative AI models.

---

## Core ML Concepts

| Concept | Meaning |
|---|---|
| **Feature** | Input variable used to train or make a prediction |
| **Label** | Target value the model learns to predict |
| **Training dataset** | Data used to fit the model |
| **Validation dataset** | Data used to evaluate and tune the model during development |
| **Test dataset** | Held-out data used for final evaluation |

### Features and Labels

If a dataset predicts house price, features might include square footage, bedrooms, location, and age. The label is the price.

### Training and Validation

Training data teaches the model. Validation data checks whether the model generalizes to data it has not directly learned from. If a model performs well on training data but poorly on validation data, it may be overfitting.

---

## Azure Machine Learning Capabilities

Azure Machine Learning is a cloud platform for building, training, evaluating, managing, and deploying ML models.

### Automated Machine Learning

Automated ML can try different algorithms and preprocessing options to find a strong model for a selected task. It is useful when you need a baseline model or do not want to manually test many algorithms.

### Data and Compute Services

Azure Machine Learning supports:

- **Datastores** to connect to storage.
- **Datasets/data assets** to version and reuse data.
- **Compute instances** for development.
- **Compute clusters** for scalable training jobs.
- **Pipelines/jobs** to orchestrate repeatable ML workflows.

### Model Management and Deployment

Azure Machine Learning supports model registration, versioning, endpoints, deployments, monitoring, and lifecycle management. For AI-900, focus on recognizing that Azure ML manages the ML lifecycle rather than memorizing SDK syntax.

---

## Exam Traps

- **Regression is numeric**: If the answer is a number, regression is usually the technique.
- **Classification is categorical**: If the answer is a label or class, choose classification.
- **Clustering has no labels**: If the goal is discovering groups, choose clustering.
- **Validation is not training**: Validation checks performance during development; it does not teach the model directly.
- **Automated ML is not generative AI**: It automates model selection and training for ML tasks.

### Flashcards

<FlashcardDeck
  storage-key="ai-900-domain-2-cards"
  :cards="[
    {
      question: 'Which ML technique predicts a numeric sales amount?',
      answer: 'Regression.'
    },
    {
      question: 'Which ML technique groups customers without predefined labels?',
      answer: 'Clustering.'
    },
    {
      question: 'What is a label in supervised learning?',
      answer: 'The target value the model learns to predict.'
    },
    {
      question: 'What is Azure Machine Learning used for?',
      answer: 'Building, training, evaluating, managing, and deploying machine learning models.'
    }
  ]"
/>

---

[<- Previous Domain](./domain-1.md) | [Overview](./index.md) | [Next Domain ->](./domain-3.md)
