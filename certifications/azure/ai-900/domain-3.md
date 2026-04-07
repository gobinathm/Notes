---
title: "AI-900 - Domain 3: Computer Vision Workloads"
description: "Study notes for AI-900 Domain 3: Describe features of computer vision workloads on Azure"
---

# Domain 3: Computer Vision Workloads on Azure

[<- Previous Domain](./domain-2.md) | [Overview](./index.md) | [Next Domain ->](./domain-4.md)

**Weight:** 15-20%

This domain tests whether you can identify common computer vision scenarios and match them to Azure AI Vision and Azure AI Face capabilities.

---

## Common Computer Vision Solutions

| Scenario | What It Means | Example |
|---|---|---|
| **Image classification** | Assign one or more labels to an image | Identify product category |
| **Object detection** | Detect object instances and locations | Find damaged items on a conveyor belt |
| **OCR** | Extract text from images or documents | Read license plates, receipts, screenshots |
| **Face detection** | Detect face locations and visible attributes | Count faces in an image |
| **Face analysis** | Analyze face-related attributes where permitted | Estimate visible facial characteristics |

### Image Classification

Image classification answers "what is this image?" It can be:

- **Multiclass**: one label per image.
- **Multilabel**: multiple labels per image.

### Object Detection

Object detection answers "what objects are present and where are they?" It returns labels plus bounding boxes.

Choose object detection when the scenario mentions:

- Counting items in an image.
- Locating each item.
- Drawing boxes around detected items.

### Optical Character Recognition

OCR extracts printed or handwritten text from images and scanned files. Use OCR for screenshots, scanned documents, signs, labels, forms, and receipts when the task is to read text.

### Face Detection and Analysis

Face detection locates faces in an image. Face-related capabilities are sensitive and may require approval, responsible use, and compliance with Microsoft's policies and local law.

---

## Azure Tools and Services

### Azure AI Vision

Azure AI Vision provides image analysis capabilities such as:

- Image tagging and categorization.
- Caption and dense caption generation.
- Object detection.
- OCR/read text extraction.
- Smart cropping and visual feature extraction.

Use Azure AI Vision for general image analysis and OCR.

### Azure AI Face

Azure AI Face provides face detection and face-related capabilities. For exam purposes, distinguish it from general image analysis:

- **Azure AI Vision**: general image understanding and OCR.
- **Azure AI Face**: face-specific detection and analysis features.

---

## Decision Rules

```text
Label entire image                 -> Image classification
Find and locate multiple objects   -> Object detection
Extract text from image/document   -> OCR
Detect or analyze faces            -> Azure AI Face
General image analysis             -> Azure AI Vision
```

---

## Exam Traps

- **OCR vs document processing**: OCR reads text; document processing extracts structured fields from forms and documents.
- **Classification vs object detection**: Classification labels; object detection locates.
- **Vision vs Face**: General image features map to Azure AI Vision; face-specific scenarios map to Azure AI Face.
- **Responsible use matters**: Face capabilities are sensitive; do not ignore consent, policy, and compliance requirements.

### Flashcards

<FlashcardDeck
  storage-key="ai-900-domain-3-cards"
  :cards="[
    {
      question: 'Which vision workload returns bounding boxes?',
      answer: 'Object detection.'
    },
    {
      question: 'Which Azure service should you use for OCR and general image analysis?',
      answer: 'Azure AI Vision.'
    },
    {
      question: 'Which workload extracts printed text from a receipt image?',
      answer: 'Optical character recognition (OCR).'
    },
    {
      question: 'Which service is specialized for face-specific capabilities?',
      answer: 'Azure AI Face.'
    }
  ]"
/>

---

[<- Previous Domain](./domain-2.md) | [Overview](./index.md) | [Next Domain ->](./domain-4.md)
