---
title: "Domain 1 - Fundamentals of AI and ML"
description: "AIF-C01 Domain 1: AI/ML hierarchy, learning types, metrics, and ML lifecycle (20%)"
head:
  - - meta
    - name: keywords
      content: aif-c01, domain 1, ai fundamentals, machine learning, supervised learning
---

# Domain 1: Fundamentals of AI and ML (20%)

[← Overview](./index.md) · [Next Domain →](./domain-2.md)

---

## 1.1: AI, ML, and DL Hierarchy

```
┌─────────────────────────────────────┐
│    Artificial Intelligence (AI)     │  Broadest: Machines that mimic human intelligence
│  ┌───────────────────────────────┐  │
│  │   Machine Learning (ML)       │  │  Subset: Learn from data without explicit programming
│  │  ┌─────────────────────────┐  │  │
│  │  │  Deep Learning (DL)     │  │  │  Subset: Neural networks with multiple layers
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

::: tip Why This Matters
Exam questions test whether you understand the hierarchy: **All DL is ML, all ML is AI, but not all AI is ML.**
:::

---

## Types of Machine Learning

<FlashcardDeck 
  title="ML Learning Types"
  :cards="[
    {
      question: 'What type of ML uses labeled data?',
      answer: '<strong>Supervised Learning</strong><br>Uses features (X) and labels (y) to learn a mapping. Examples: spam detection, house price prediction.'
    },
    {
      question: 'What type of ML finds patterns in unlabeled data?',
      answer: '<strong>Unsupervised Learning</strong><br>No labels. Used for clustering, dimensionality reduction, and anomaly detection. Example: customer segmentation.'
    },
    {
      question: 'What type of ML learns through trial and error with rewards?',
      answer: '<strong>Reinforcement Learning</strong><br>Agent learns by receiving rewards/penalties. Examples: game AI, robotics, autonomous vehicles.'
    }
  ]"
/>

### 1. Supervised Learning
**Definition**: Learn from labeled data

**Components**:
- **Features** (X): Input variables
- **Labels** (y): Known output/target
- **Model**: Learns mapping from X to y

**Types**:
- **Classification**: Predict categories (spam/not spam)
- **Regression**: Predict continuous values (house price)

**Examples**:
- Email spam detection
- Image classification (cat vs dog)
- House price prediction
- Customer churn prediction

### 2. Unsupervised Learning
**Definition**: Learn patterns from unlabeled data

**Types**:
- **Clustering**: Group similar items
- **Dimensionality Reduction**: Reduce features while preserving information
- **Anomaly Detection**: Find outliers

**Examples**:
- Customer segmentation
- Anomaly detection in network traffic
- Product recommendations

### 3. Reinforcement Learning
**Definition**: Learn through trial and error with rewards

**Components**:
- **Agent**: Learns and makes decisions
- **Environment**: What agent interacts with
- **Actions**: What agent can do
- **Rewards**: Feedback for actions

**Examples**:
- Game playing (AlphaGo)
- Robotics
- Autonomous vehicles
- Resource optimization

| Learning Type | Data | Goal | Example |
|---------------|------|------|---------| 
| **Supervised** | Labeled | Predict labels | Spam detection |
| **Unsupervised** | Unlabeled | Find patterns | Customer groups |
| **Reinforcement** | Rewards/penalties | Maximize rewards | Game AI |

---

## ML Model Performance Metrics

### Classification Metrics

**Confusion Matrix**:
```
                  Predicted
              Positive  Negative
Actual  Pos      TP        FN
        Neg      FP        TN
```

<FlashcardDeck 
  title="Classification Metrics"
  :cards="[
    {
      question: 'When should you prioritize Precision?',
      answer: '<strong>When false positives are costly</strong><br>Precision = TP / (TP + FP)<br>Example: Spam filter (do not mark important emails as spam)'
    },
    {
      question: 'When should you prioritize Recall?',
      answer: '<strong>When false negatives are costly</strong><br>Recall = TP / (TP + FN)<br>Example: Medical diagnosis (catch all diseases, even with false positives)'
    },
    {
      question: 'What is Accuracy?',
      answer: '<strong>Overall correctness</strong><br>Accuracy = (TP + TN) / Total<br>Good when classes are balanced, misleading with imbalanced data.'
    }
  ]"
/>

**Key Metrics**:
- **Accuracy** = (TP + TN) / Total
  - Good when classes are balanced

- **Precision** = TP / (TP + FP)
  - "Of all predicted positives, how many are actually positive?"
  - Use when **false positives are costly**

- **Recall** = TP / (TP + FN)
  - "Of all actual positives, how many did we catch?"
  - Use when **false negatives are costly**

::: danger Exam Scenario
**Medical diagnosis**: Prefer high recall (catch all diseases, even with false positives)
**Spam filter**: Prefer high precision (don't mark important emails as spam)
:::

### Regression Metrics
- **MAE (Mean Absolute Error)**: Average absolute difference
- **MSE (Mean Squared Error)**: Average squared difference
- **RMSE (Root Mean Squared Error)**: Square root of MSE

---

## Overfitting vs. Underfitting

<FlashcardDeck 
  title="Model Fit Issues"
  :cards="[
    {
      question: 'What is Underfitting?',
      answer: '<strong>Model too simple</strong><br>Poor on BOTH training and test data.<br>Solution: More complex model, more features.'
    },
    {
      question: 'What is Overfitting?',
      answer: '<strong>Memorized training data</strong><br>Great on training, poor on test.<br>Solution: More data, regularization, simpler model.'
    },
    {
      question: 'How do you detect overfitting?',
      answer: '<strong>Large gap between training and test performance</strong><br>Example: Training 99%, Test 72%<br>Model learned noise, not patterns.'
    }
  ]"
/>

| Issue | Description | Performance | Solution |
|-------|-------------|-------------|----------|
| **Underfitting** | Model too simple | Poor on training AND test | More complex model, more features |
| **Good Fit** | Just right | Good on both | ✅ This is the goal |
| **Overfitting** | Memorized training data | Great on training, poor on test | More data, regularization, simpler model |

**Visual**:
```
Underfitting:  🙁 Training: 70%  🙁 Test: 65%
Perfect Fit:   ✅ Training: 92%  ✅ Test: 90%
Overfitting:   ✅ Training: 99%  🙁 Test: 72%
```

---

## ML Development Lifecycle

1. **Business Problem Definition**
   - What are we trying to predict/optimize?
   - What's the success metric?

2. **Data Collection and Preparation**
   - Gather data
   - Clean data (handle missing values, outliers)
   - Split data (train/validation/test)

3. **Feature Engineering**
   - Create useful features
   - Transform variables
   - Encode categorical variables

4. **Model Training**
   - Choose algorithm
   - Train on training data
   - Tune hyperparameters

5. **Model Evaluation**
   - Test on validation data
   - Check metrics (accuracy, precision, recall)
   - Compare multiple models

6. **Model Deployment**
   - Deploy to production
   - Create API endpoint
   - Monitor performance

7. **Model Monitoring and Maintenance**
   - Track model drift
   - Retrain when needed
   - Update as data changes

::: tip Exam Focus
The exam tests whether you understand that ML is **iterative**, not one-and-done. Models need monitoring and retraining.
:::

---

[← Overview](./index.md) · [Next Domain →](./domain-2.md)
