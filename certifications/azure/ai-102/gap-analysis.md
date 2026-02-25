# AI-102 Gap Analysis

> Compared against the [official AI-102 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102) (updated Dec 23, 2025).

---

## Exam Structure Mismatch

The current notes are based on an **older version** of the AI-102 exam objectives. The exam was significantly restructured in 2025.

| Official Domain (Current) | Weight | Current Notes |
|---|---|---|
| Plan and manage an Azure AI solution | **20-25%** | Domain 1 (listed as 15-20%) |
| Implement generative AI solutions | **15-20%** | Domain 5 (listed as 15-20%) |
| **Implement an agentic solution** | **5-10%** | **COMPLETELY MISSING** |
| Implement computer vision solutions | **10-15%** | Domain 3 (listed as 15-20%) |
| Implement natural language processing solutions | **15-20%** | Domain 4 (listed as 30-35%) |
| Implement knowledge mining and information extraction solutions | **15-20%** | Domain 6 (listed as 10-15%) |

**Domain 2: Content Moderation** no longer exists as a separate domain. It has been folded into Domain 1 under "Implement AI solutions responsibly."

**Template-only files** with no actual AI-102 content: `notes.md`, `objectives.md`, `quick-refresher.md`, `exam-tips.md`.

---

## Domain 1: Plan and Manage an Azure AI Solution (20-25%)

### Covered Well

- Resource types (single-service vs. multi-service)
- Container deployment use cases (data residency, latency, billing metering)
- Authentication methods (subscription keys vs. managed identities) with `DefaultAzureCredential()`
- Network security (VNETs, Private Endpoints, Firewall Rules)
- Diagnostic settings (Log Analytics, Storage, Event Hubs)
- Alerts for common HTTP error codes (429, 5xx)

### Missing or Too Shallow

- [ ] **Microsoft Foundry branding** — Notes still use "Azure AI Services." Exam now uses "Microsoft Foundry Services," "Microsoft Foundry," "Azure AI Foundry." This affects how questions are worded.
- [ ] **Service selection guidance** — Official objectives have an entire sub-section on "Select the appropriate Microsoft Foundry Services" for generative AI, vision, NLP, speech, information extraction, and knowledge mining. Need a decision tree or comparison table.
- [ ] **AI model selection and deployment options** — Choosing the right AI models, standard vs. provisioned throughput, global vs. regional deployments.
- [ ] **CI/CD pipeline integration** — "Integrate Microsoft Foundry Services into a CI/CD pipeline" is explicitly listed. Completely absent.
- [ ] **Cost management** — "Manage costs for Microsoft Foundry Services" is tested. Only a brief mention in exam-guide, no detail.
- [ ] **Responsible AI governance framework** — Exam expects "Design a responsible AI governance framework." Current notes only cover the 6 principles at surface level.
- [ ] **Prompt shields** — Defending against prompt injection attacks. Not mentioned.
- [ ] **Content filters and blocklists for generative AI** — Content filters applied to Azure OpenAI model outputs (input/output filters, configuring filter severity). Current Domain 2 covers Content Safety for user-generated content only.
- [ ] **Key Vault for key rotation** — Mentioned as a one-liner in exam-guide but not explained.

---

## Domain 2: Implement Generative AI Solutions (15-20%)

### Covered Well

- Chat Completions API roles (system, user, assistant)
- Parameters (temperature, top_p, max_tokens, frequency/presence penalty)
- Function calling concept
- RAG concept and "On Your Data" feature with Azure AI Search and Blob Storage
- Model list (GPT-4o, GPT-3.5 Turbo, Embeddings, DALL-E)

### Missing or Too Shallow

- [ ] **Azure AI Foundry (hubs, projects)** — The entire Foundry portal concept is absent. Need to cover:
  - What a Foundry hub is (shared infrastructure)
  - What a Foundry project is (workspace within a hub)
  - How to create and manage these resources
- [ ] **Prompt Flow** — Visual tool in Azure AI Foundry for building LLM workflows. Need to cover:
  - Flow types (standard, chat, evaluation)
  - Nodes, connections, variants
  - Deploying flows as endpoints
- [ ] **Model evaluation** — Not covered. Need:
  - Built-in evaluation metrics (groundedness, relevance, coherence, fluency)
  - Custom evaluation flows
  - Batch evaluation runs
- [ ] **Microsoft Foundry SDK** — "Integrate your project into an application with Microsoft Foundry SDK." Not mentioned.
- [ ] **Prompt templates** — Parameterized prompts for reuse. Not covered.
- [ ] **DALL-E image generation** — Listed in cheatsheet but no implementation details (API call structure, image sizes, quality parameters).
- [ ] **Large multimodal models (LMMs)** — GPT-4o/GPT-4 Vision processing images alongside text. Not covered.
- [ ] **Prompt engineering techniques** — Need:
  - Few-shot prompting
  - Chain-of-thought
  - System message design patterns
  - Grounding techniques
- [ ] **Fine-tuning** — Completely absent. Need:
  - When to fine-tune vs. use RAG
  - Training data preparation (JSONL format)
  - Fine-tuning workflow in Azure OpenAI
- [ ] **Model reflection** — Technique where the model reviews and improves its own outputs.
- [ ] **Tracing and feedback collection** — Azure AI Foundry tracing for debugging LLM calls and user feedback mechanisms.
- [ ] **Orchestration of multiple generative AI models** — Chaining or routing between different models.
- [ ] **Content filters for Azure OpenAI** — Default filters, custom filter configurations, annotation responses. Only a one-liner in exam-guide.
- [ ] **Container deployment for generative models on edge** — Listed in objectives, not in notes.
- [ ] **Scalability and model updates** — "Optimize and manage resources for deployment, including scalability and foundational model updates."

---

## Domain 3: Implement an Agentic Solution (5-10%) — ENTIRELY MISSING

This is a completely new domain. Nothing exists in the current notes. Topics to cover:

- [ ] **Foundry Agent Service** — What it is, how it orchestrates tool calls, manages conversations, enforces content safety.
- [ ] **Microsoft Agent Framework** — Open-source framework for building agentic applications.
- [ ] **Agent concepts** — Tools/functions, code interpreter, file search, Azure AI Search integration.
- [ ] **Multi-agent orchestration** — Patterns for multiple specialized agents collaborating.
- [ ] **Agent testing and deployment** — How to test, optimize, and deploy agents.
- [ ] **Autonomous capabilities** — How agents can execute multi-step tasks independently.

### References

- [Foundry Agent Service overview](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview)
- [Microsoft Agent Framework announcement](https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps/)

---

## Domain 4: Implement Computer Vision Solutions (10-15%)

### Covered Well

- Image Analysis 4.0 features (captioning, dense captioning, tagging, smart cropping, people detection)
- Custom Vision classification types (multiclass vs. multilabel) and object detection
- Training loop (upload, tag, train, evaluate, publish, test)
- Face API capabilities (detection, verification 1:1, identification 1:N)
- Limited Access policy and retired features (emotion, gender/age)
- OCR Read API async pattern (202 -> operation-location -> GET)

### Missing or Too Shallow

- [ ] **Azure Vision in Foundry Tools** — Branding change. "Azure Vision in Foundry Tools" replaces "Azure AI Vision."
- [ ] **Video Indexer** — Extracting insights from video/live streams:
  - Faces, topics, sentiments, brands, scenes, keyframes
  - OCR in video
- [ ] **Spatial Analysis** — Detecting presence and movement of people in video feeds:
  - People counting
  - Distance monitoring
  - Zone dwell time
- [ ] **Handwritten text extraction** — Exam distinguishes "Convert handwritten text using Azure Vision in Foundry Tools." Notes mention OCR/Read but not handwriting specifically.
- [ ] **Code-first custom vision** — "Build a custom vision model code first" is a new objective. Notes focus on portal-based workflow only.
- [ ] **Custom vision model metrics** — mAP (mean Average Precision) for object detection, evaluation dashboard interpretation.
- [ ] **Face API depth** — Missing:
  - PersonGroup / LargePersonGroup management workflow (create group -> add persons -> add faces -> train -> identify)
  - FaceList / LargeFaceList for find-similar operations
  - Face detection attributes still available (blur, exposure, noise, accessories, head pose, occlusion)

---

## Domain 5: Implement Natural Language Processing Solutions (15-20%)

### Covered Well

- Language Service features (sentiment, key phrases, entity linking, PII, language detection)
- Custom NER and Custom Text Classification mentioned
- CLU workflow (schema, label, train, test, publish)
- Speech-to-Text (real-time, batch, custom speech)
- Text-to-Speech (neural voices, SSML, custom neural voice)
- Translator service (text, document, custom translator with TMX)
- Transliterate mentioned in cheatsheet
- Precision/Recall/F1 metrics in cheatsheet

### Missing or Too Shallow

- [ ] **Custom Question Answering (formerly QnA Maker)** — Major gap. Exam has 7 sub-objectives:
  - Create a custom question answering project
  - Add question-and-answer pairs and import sources
  - Train, test, and publish a knowledge base
  - Create multi-turn conversations
  - Add alternate phrasing and chit-chat
  - Export a knowledge base
  - Create a multi-language question answering solution
- [ ] **Intent and keyword recognition with Speech** — Using Speech SDK to recognize specific keywords as wake words and detect user intent from spoken input.
- [ ] **Speech translation** — Speech Translation API (real-time speech-to-text translation, speech-to-speech translation). Notes cover text translation only.
- [ ] **Generative AI speaking capabilities** — "Integrate generative AI speaking capabilities in an application." Combining Azure OpenAI with Speech services.
- [ ] **CLU model management** — "Optimize, backup, and recover language understanding model." Exporting/importing CLU models, versioning, deployment slots.
- [ ] **Custom translation depth** — Training, improving, and publishing a custom translation model in detail.
- [ ] **Entity linking vs. NER** — Need clearer distinction between Entity Linking (Wikipedia disambiguation) and standard Named Entity Recognition.

---

## Domain 6: Implement Knowledge Mining and Information Extraction (15-20%)

### Covered Well

- AI Search architecture (data source, indexer, skillset, index)
- Semantic Search and Vector Search concepts
- Document Intelligence models (Read, Invoice, Receipt, ID, W-2)
- Custom models (Template vs. Neural) and Composed Models
- Knowledge Store mentioned in cheatsheet
- Enrichment pipeline diagram

### Missing or Too Shallow

- [ ] **Azure Content Understanding in Foundry Tools** — Completely new service. Need:
  - Create an OCR pipeline to extract text from images and documents
  - Summarize, classify, and detect attributes of documents
  - Extract entities, tables, and images from documents
  - Process and ingest documents, images, videos, and audio
- [ ] **Custom skills in Azure AI Search** — Need:
  - Custom Web API skills (calling Azure Functions)
  - Custom skill interface (input/output schema)
  - Built-in vs. custom skills distinction
- [ ] **Query syntax depth** — Need:
  - Lucene query syntax (simple vs. full)
  - `$filter`, `$orderby`, `$select`, `$top`, `$skip` OData parameters
  - Wildcard and regex queries
  - Faceted navigation
- [ ] **Knowledge Store projections detail** — Need:
  - Table projections, object projections, file projections
  - Shaper skill for structuring data before projection
  - Use cases (analytics in Power BI, secondary processing)
- [ ] **Document Intelligence training workflow** — Need:
  - Labeling tool (Document Intelligence Studio)
  - Minimum training document requirements
  - Model evaluation metrics (accuracy, confidence scores)
- [ ] **Semantic and vector search depth** — Need:
  - Vector index configuration (HNSW algorithm, dimensions, metric)
  - Hybrid search (combining keyword + vector)
  - Integrated vectorization (built-in embedding skill)

---

## Priority Summary

### P0 — Must Add (Completely Missing, High Exam Impact)

| Gap | Exam Weight |
|---|---|
| Agentic Solutions domain | 5-10% |
| Custom Question Answering | Part of NLP (15-20%) |
| Azure AI Foundry (hubs, projects, Prompt Flow) | Part of GenAI (15-20%) |
| Azure Content Understanding | Part of Knowledge Mining (15-20%) |
| Video Analysis (Video Indexer + Spatial Analysis) | Part of Vision (10-15%) |

### P1 — Must Deepen (Covered but Insufficient)

| Gap | Domain |
|---|---|
| Prompt engineering techniques | GenAI |
| Fine-tuning generative models | GenAI |
| AI Search query syntax | Knowledge Mining |
| Custom skills in AI Search | Knowledge Mining |
| Content filters for Azure OpenAI | GenAI |
| Knowledge Store projections | Knowledge Mining |
| Speech translation | NLP |
| CI/CD for AI services | Plan & Manage |
| Responsible AI governance framework | Plan & Manage |
| Face API (PersonGroup workflow) | Vision |
| Document Intelligence training | Knowledge Mining |

### P2 — Must Update (Branding/Structure)

| Item | Change Needed |
|---|---|
| Domain numbering and weights | Restructure to match 6 official domains |
| Service names | "Azure AI Services" -> "Microsoft Foundry Services" |
| Remove standalone Domain 2 | Merge Content Moderation into Domain 1 |
| Template files | Fill `notes.md`, `objectives.md`, `quick-refresher.md`, `exam-tips.md` |
