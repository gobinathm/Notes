---
title: "Domain 4: Implement Computer Vision Solutions"
description: "Notes on Azure AI Vision, Custom Vision, Video Indexer, Spatial Analysis, and Face API for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, computer vision, image analysis, custom vision, video indexer, spatial analysis, face api, ocr, read api, object detection
---

# Domain 4: Implement computer vision solutions (10-15%)

[← Domain 3](./domain-3.md) · [Domain 5 →](./domain-5.md)

---

This domain covers analyzing images and videos using **Azure AI Vision**, **Custom Vision**, **Video Indexer**, **Spatial Analysis**, and the **Face API**.

## 4.1 Image Analysis 4.0

### Core Features

| Feature | What It Returns | Exam Signal |
|---------|----------------|-------------|
| **Captioning** | One sentence describing the whole image | "describe the image" |
| **Dense Captioning** | Captions for multiple regions/objects in the image | "describe each object in the image" |
| **Tagging** | List of objects, scenes, and actions detected | "identify what is in the image" |
| **Smart Cropping** | Thumbnail coordinates that preserve the important region | "generate thumbnail keeping subject in frame" |
| **People Detection** | Bounding boxes around people (no identification) | "count people in the image" |
| **Background Removal** | Separates foreground subject from background | "remove background from product photo" |

### OCR — Read API (async)

The Read API is the primary OCR tool for dense text, handwriting, and multi-page documents.

**Async pattern (same as Document Translation and batch operations):**

```
POST /imageanalysis:analyze?features=read
  → 202 Accepted + Operation-Location header

GET <Operation-Location URL>
  → poll until { "status": "succeeded" }
  → read "readResult" in response body
```

::: warning Async OCR Pattern
The initial `POST` returns `202 Accepted` — it does **not** contain the extracted text. You must `GET` the `Operation-Location` URL and poll until `status: succeeded`. Many candidates try to parse the initial POST response.
:::

---

## 4.2 Custom Vision

Use Custom Vision when the pre-built Image Analysis features are not specific enough for your domain.

### Model Types

| Type | Output | Use Case |
|------|--------|---------|
| **Classification — Multiclass** | One tag per image | "Is this a cat, dog, or bird?" |
| **Classification — Multilabel** | Multiple tags per image | "What objects are in this image?" |
| **Object Detection** | Tag + bounding box coordinates | "Where is the defect on the product?" |

::: info Exam Signal
"Locate objects with bounding boxes" → **Custom Vision — Object Detection** (not Image Analysis tagging, which doesn't return coordinates).
:::

### Training Workflow

```
Create project → Upload images → Tag images → Train → Evaluate → Publish → Test endpoint
```

### Evaluation Metrics

| Metric | Definition | For |
|--------|-----------|-----|
| **Precision** | Of all predicted tags, how many were correct? | Classification |
| **Recall** | Of all actual tags, how many did the model find? | Classification |
| **mAP (mean Average Precision)** | Overall detection accuracy across all classes | Object Detection |

---

## 4.3 Video Indexer

Extracts deep insights from video files or live streams without writing model training code.

### Key Capabilities

| Insight Type | Description |
|-------------|-------------|
| **Facial Recognition** | Identifies and groups people across the video timeline |
| **Topic Inference** | High-level themes extracted from transcript + visuals |
| **Brand Detection** | Recognizes company logos and brand names in frames |
| **OCR in Video** | Extracts text from on-screen displays and captions |
| **Sentiment Analysis** | Sentiment shifts across video segments |
| **Scene Segmentation** | Splits video into scenes based on content changes |
| **Audio Transcription** | Full transcript with speaker diarization |

::: tip Video Indexer vs Spatial Analysis
**Video Indexer** = deep semantic insights from pre-recorded video (topics, faces, brands, transcripts) — cloud-based, no real-time requirement.
**Spatial Analysis** = real-time movement and presence detection in a live video feed — edge container, measures people count, distance, dwell time.
:::

---

## 4.4 Spatial Analysis

Runs on edge devices via Docker containers, analyzing a live camera feed without sending raw video to the cloud.

### Key Measurements

| Metric | Description |
|--------|-------------|
| **People Counting** | Count of people present in a defined zone at any moment |
| **Zone Entry/Exit** | Detect when a person enters or leaves a zone |
| **Distance Monitoring** | Measure proximity between people (e.g., social distancing) |
| **Dwell Time** | How long a person stays within a zone |

::: info Spatial Analysis Container
Spatial Analysis runs as an IoT Edge module or Docker container on an NVIDIA GPU-enabled device. It reports events to Azure IoT Hub or Event Hubs, not as direct HTTP responses.
:::

---

## 4.5 Face API

### Core Capabilities

| Capability | Operation | Exam Trigger |
|-----------|-----------|-------------|
| **Detection** | Locate faces + return attributes (blur, exposure, age estimate, occlusion) | "detect faces in an image" |
| **Verification** | 1:1 — are these two face images the same person? | "compare two faces", "1:1 match" |
| **Identification** | 1:N — who is this person from a known group? | "identify from employee database", "1:N match" |
| **Find Similar** | 1:N — find faces that look similar (no identity required) | "find similar faces" |

### PersonGroup vs FaceList

| Structure | Used For | Training Required? |
|-----------|---------|-------------------|
| **PersonGroup / LargePersonGroup** | Identification (1:N — "who is this?") | Yes — must call Train after adding faces |
| **FaceList / LargeFaceList** | Find Similar (1:N — "what faces look like this?") | No — add faces and query directly |

::: warning PersonGroup vs FaceList
**PersonGroup** = structured by *people* — each person has an ID and multiple face images. Used for **Identification**. **Must be trained** after adding faces.
**FaceList** = unstructured list of face images — no person concept. Used for **Find Similar**. No training step.

The exam tests this: "identify from known employees" → PersonGroup + Identify. "find faces that look like this image" → FaceList + FindSimilar.
:::

### PersonGroup Workflow

```
Create PersonGroup → Add Person objects → Add face images to each Person
  → Train PersonGroup → Identify a new face against the group
```

::: info Limited Access
Many Face API capabilities (identification, verification, emotion detection) require **Limited Access approval** from Microsoft due to privacy and responsible AI policies. The exam may mention this constraint.
:::

---

<FlashcardDeck storage-key="ai-102-domain-4-cards" :cards="[
  { front: 'What is the async OCR pattern for the Read API?', back: 'POST image → 202 Accepted + Operation-Location header → GET that URL → poll until status: succeeded → read results. Never parse the initial POST response body.' },
  { front: 'What is the difference between Custom Vision Classification and Object Detection?', back: 'Classification assigns tags to the whole image. Object Detection assigns tags AND returns bounding box coordinates for each detected object.' },
  { front: 'What does Video Indexer analyze that Spatial Analysis does not?', back: 'Video Indexer provides semantic insights: topics, brands, faces, transcripts, sentiment. Spatial Analysis measures real-time movement (count, dwell time, distance) in live feeds.' },
  { front: 'What is the difference between Face Verification and Face Identification?', back: 'Verification = 1:1 (are these two faces the same person?). Identification = 1:N (who is this person from a known PersonGroup?).' },
  { front: 'What is the difference between PersonGroup and FaceList?', back: 'PersonGroup = structured by people, used for Identification, requires training. FaceList = unstructured list of face images, used for FindSimilar, no training needed.' },
  { front: 'Which Custom Vision model type returns bounding box coordinates?', back: 'Object Detection — returns a tag name plus the bounding box (left, top, width, height) for each detected object.' },
  { front: 'Where does Spatial Analysis run and how does it report events?', back: 'Runs as a Docker container on a GPU-enabled edge device. Reports events to Azure IoT Hub or Event Hubs — not as direct HTTP responses.' },
  { front: 'What does mAP measure in Custom Vision?', back: 'Mean Average Precision — overall object detection accuracy across all trained classes. It summarizes both precision and recall for the detection model.' }
]" />

---

[← Domain 3](./domain-3.md) · [Domain 5 →](./domain-5.md)
