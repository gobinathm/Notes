---
title: "Domain 3: Computer Vision Solutions"
description: "Notes on Image Analysis, Custom Vision, and Face API"
---

# Domain 3: Computer Vision Solutions (15-20%)

## 3.1 Analyze Images (Image Analysis 4.0)

### Features
- **Captioning**: Generates a human-readable sentence description.
- **Dense Captioning**: Generates captions for specific regions (bounding boxes) in the image.
- **Tagging**: Metadata keywords (e.g., "outdoor", "sky", "grass").
- **Smart Cropping**: Identifying the region of interest for thumbnails.
- **People Detection**: Bounding boxes for people (generic, not identity).

### Code Snippet (Python SDK)
```python
# Analyze image
result = client.analyze(
    image_url=url,
    visual_features=[VisualFeatures.CAPTION, VisualFeatures.TAGS]
)
print(result.caption.text)
```

## 3.2 Custom Vision

### Classification vs. Detection
- **Classification**: "What is in this image?" (Whole image label).
  - *Multiclass*: Single tag per image (e.g., Cat OR Dog).
  - *Multilabel*: Multiple tags per image (e.g., Cat AND Outdoor).
- **Object Detection**: "Where is it?" (Bounding box + Label). Used for counting or locating items.

### Training Loop
1.  **Upload Images**: Minimum 15-50 per tag recommended.
2.  **Tag/Label**: Draw boxes.
3.  **Train**: Quick Training vs Advanced Training (longer, more accurate).
4.  **Evaluate**: Review Precision/Recall.
5.  **Publish**: Get a prediction URL.
6.  **Test**: Send new images.

## 3.3 Face API

### Capabilities
- **Detection**: Locate faces, landmarks (eyes, nose), attributes (glasses, head pose).
- **Verification (1:1)**: "Is this person who they claim to be?" (e.g., Auth). compares FaceId1 to FaceId2.
- **Identification (1:N)**: "Who is this person?" Scans a **PersonGroup** database.

### Privacy & Ethics
- **Limited Access**: Features like Facial Recognition require passing a specialized application review by Microsoft due to ethical risks.
- **Retired Features**: Emotion detection (happy, sad) and gender/age prediction were retired in 2022 to prevent misuse.
