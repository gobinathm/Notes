<template>
  <section class="aip-sheet">
    <header class="sheet-header">
      <div class="sheet-eyebrow">
        <span>AWS Certification</span>
        <span>Generative AI Developer - Professional</span>
      </div>
      <div class="sheet-headline">
        <h2>AIP-C01 Cheat Sheet</h2>
        <p>5-minute master reference for Bedrock, RAG, agents, guardrails, optimization, and exam-day decisions.</p>
      </div>
      <div class="sheet-meta">
        <span class="score-pill">Pass: 750 / 1000</span>
        <span>170 min</span>
        <span>75 questions</span>
      </div>
    </header>

    <section class="domain-ribbon" aria-label="Exam domain weights">
      <article class="domain-card domain-d1">
        <span class="domain-code">D1</span>
        <strong>31%</strong>
        <p>FM Integration, Data, and Compliance</p>
      </article>
      <article class="domain-card domain-d2">
        <span class="domain-code">D2</span>
        <strong>26%</strong>
        <p>Implementation and Integration</p>
      </article>
      <article class="domain-card domain-d3">
        <span class="domain-code">D3</span>
        <strong>20%</strong>
        <p>AI Safety, Security, and Governance</p>
      </article>
      <article class="domain-card domain-d4">
        <span class="domain-code">D4</span>
        <strong>12%</strong>
        <p>Operational Efficiency and Optimization</p>
      </article>
      <article class="domain-card domain-d5">
        <span class="domain-code">D5</span>
        <strong>11%</strong>
        <p>Testing, Validation, and Troubleshooting</p>
      </article>
    </section>

    <div class="sheet-grid">
      <article class="sheet-card">
        <div class="card-title card-d1">D1 · Amazon Bedrock Essentials</div>
        <ul class="bullet-list">
          <li><strong>Bedrock</strong> is the managed foundation-model API layer. You invoke models without managing servers.</li>
          <li><strong>Model families:</strong> Claude, Llama, Cohere, Titan, Stability AI, and Mistral.</li>
          <li><strong>Inference parameters:</strong> <code>temperature</code>, <code>topP</code>, <code>topK</code>, <code>max_tokens</code>, and <code>stop_sequences</code>.</li>
          <li><strong>Runtime APIs:</strong> <code>InvokeModel</code> for synchronous calls and <code>InvokeModelWithResponseStream</code> for streaming.</li>
          <li><strong>Pricing modes:</strong> On-demand for bursty traffic, provisioned throughput for reserved capacity, and batch inference for async high-volume work.</li>
          <li><strong>Embeddings:</strong> Titan and Cohere embed models turn text into vectors for retrieval.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d2">D2 · Prompt Engineering Patterns</div>
        <ul class="bullet-list">
          <li><strong>Zero-shot:</strong> best when the task is simple and the model already knows the domain.</li>
          <li><strong>Few-shot:</strong> use 3 to 5 examples when output format or style must be tightly controlled.</li>
          <li><strong>Chain-of-thought:</strong> useful for logic and multi-step reasoning tasks.</li>
          <li><strong>ReAct:</strong> reason plus act, which is the mental model behind Bedrock agents.</li>
          <li><strong>Prompt chaining:</strong> one model output becomes the next step's input.</li>
          <li><strong>Prompt injection:</strong> treat hostile instructions as a security risk and pair prompts with guardrails and validation.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d3">D3 · Guardrails and Responsible AI</div>
        <div class="guard-stack">
          <div class="guard-layer guard-red"><strong>Content Filters</strong><span>hate, violence, sexual content, insults</span></div>
          <div class="guard-layer guard-amber"><strong>Topic Denial</strong><span>block competitor discussion or restricted topics</span></div>
          <div class="guard-layer guard-indigo"><strong>PII Redaction</strong><span>anonymize or block email, phone, SSN, payment data</span></div>
          <div class="guard-layer guard-green"><strong>Grounding Check</strong><span>verify the answer is supported by retrieved context</span></div>
          <div class="guard-layer guard-blue"><strong>Word Filters</strong><span>custom deny lists and profanity controls</span></div>
        </div>
        <ul class="bullet-list compact-list">
          <li><strong>Responsible AI pillars:</strong> fairness, explainability, privacy, robustness, transparency.</li>
          <li><strong>Auditability:</strong> model invocation logging can write prompts and outputs to S3 or CloudWatch.</li>
          <li><strong>Security baseline:</strong> KMS at rest, TLS in transit, IAM least privilege, and private VPC endpoints.</li>
        </ul>
      </article>

      <article class="sheet-card span-two">
        <div class="card-title card-d1">D1 · RAG Pipeline</div>
        <div class="flow-row">
          <span>Docs / S3</span>
          <span>Chunk</span>
          <span>Embed</span>
          <span class="highlight-pill">Vector DB</span>
          <span>Retrieve</span>
          <span>Augment Prompt</span>
          <span class="highlight-pill">Generate</span>
        </div>
        <ul class="bullet-list compact-list">
          <li><strong>Knowledge Bases for Bedrock</strong> provide a managed RAG flow.</li>
          <li><strong>Vector stores:</strong> OpenSearch Serverless, Aurora pgvector, Pinecone, and Redis are common options.</li>
          <li><strong>Chunking choices:</strong> fixed-size for simplicity, semantic for quality, hierarchical for structured documents.</li>
          <li><strong>Hybrid search</strong> combines semantic similarity and keyword retrieval.</li>
          <li><strong>Metadata filters</strong> narrow the chunk set before retrieval scoring.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d2">D2 · Bedrock Agents</div>
        <div class="agent-loop">
          <span class="loop-node loop-primary">User</span>
          <span class="loop-arrow">→</span>
          <span class="loop-node">Reason</span>
          <span class="loop-arrow">→</span>
          <span class="loop-node">Choose Tool</span>
          <span class="loop-arrow">→</span>
          <span class="loop-node">Lambda Action</span>
          <span class="loop-arrow">→</span>
          <span class="loop-node">Observe</span>
          <span class="loop-arrow">→</span>
          <span class="loop-node loop-secondary">Loop or Answer</span>
        </div>
        <ul class="bullet-list compact-list">
          <li><strong>Action Groups:</strong> Lambda plus OpenAPI schema define what the agent can do.</li>
          <li><strong>Knowledge Bases:</strong> attach retrieval directly to the agent.</li>
          <li><strong>Return of Control:</strong> pause for human approval when required.</li>
          <li><strong>Multi-agent:</strong> supervisor delegates to specialized sub-agents.</li>
          <li><strong>Memory:</strong> session memory and persisted cross-session memory both matter.</li>
          <li><strong>Bedrock Flows:</strong> low-code orchestration for multi-step pipelines.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d4">D4 · Cost and Performance</div>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Cost</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Batch Inference</td><td>Best for async volume</td><td>Not interactive</td></tr>
            <tr><td>Prompt Caching</td><td>Lower repeat cost</td><td>Faster repeated calls</td></tr>
            <tr><td>Streaming</td><td>Same tokens</td><td>Better perceived latency</td></tr>
            <tr><td>Smaller model</td><td>Lower</td><td>Lower</td></tr>
            <tr><td>Provisioned throughput</td><td>Best at sustained scale</td><td>Stable</td></tr>
            <tr><td>Token compression</td><td>Lower</td><td>Lower</td></tr>
          </tbody>
        </table>
        <ul class="bullet-list compact-list">
          <li><strong>Prompt caching</strong> works best for repeated static system context.</li>
          <li><strong>Batch inference</strong> is for nightly or bulk workloads, not chat UX.</li>
          <li><strong>Key metrics:</strong> <code>InputTokenCount</code>, <code>OutputTokenCount</code>, <code>InvocationLatency</code>, and <code>ThrottledRequests</code>.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d1">D1 · Customization Decision Tree</div>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Best Fit</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Fresh or changing data</td><td>RAG</td></tr>
            <tr><td>Consistent style or format</td><td>Fine-tuning</td></tr>
            <tr><td>Domain vocabulary adaptation</td><td>Continued pre-training</td></tr>
            <tr><td>No training set available</td><td>RAG</td></tr>
            <tr><td>Retrieval-free low-latency output</td><td>Fine-tuning</td></tr>
          </tbody>
        </table>
        <ul class="bullet-list compact-list">
          <li><strong>Fine-tuning data:</strong> JSONL prompt/completion pairs for text adaptation.</li>
          <li><strong>Custom model invocation:</strong> provisioned throughput is commonly required.</li>
          <li><strong>Distillation:</strong> compress a larger teacher model into a cheaper student model.</li>
        </ul>
      </article>

      <article class="sheet-card">
        <div class="card-title card-d2">D2 · Right Service, Right Job</div>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Need</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Custom FM app with full control</td><td>Amazon Bedrock</td></tr>
            <tr><td>Managed enterprise doc assistant</td><td>Amazon Q Business</td></tr>
            <tr><td>Enterprise search</td><td>Amazon Kendra</td></tr>
            <tr><td>Entities, sentiment, PII</td><td>Amazon Comprehend</td></tr>
            <tr><td>PDF and forms extraction</td><td>Amazon Textract</td></tr>
            <tr><td>Train or deploy custom ML</td><td>Amazon SageMaker</td></tr>
            <tr><td>Image or video analysis</td><td>Amazon Rekognition</td></tr>
            <tr><td>Orchestrate multi-service workflows</td><td>AWS Step Functions</td></tr>
          </tbody>
        </table>
      </article>

      <article class="sheet-card span-two">
        <div class="card-title card-d5">D5 · Testing, Evaluation, and Troubleshooting</div>
        <ul class="bullet-list">
          <li><strong>Model Evaluation jobs:</strong> Bedrock supports automated scoring and human review workflows.</li>
          <li><strong>Metrics to know:</strong> ROUGE, BERTScore, accuracy, answer relevancy, groundedness, and retrieval quality metrics.</li>
          <li><strong>Hallucination control:</strong> use grounding checks, citations, better chunking, and stronger retrieval constraints.</li>
          <li><strong>Agent debugging:</strong> enable Bedrock trace output to inspect each reasoning and tool step.</li>
          <li><strong>Distributed tracing:</strong> X-Ray helps with end-to-end latency across Lambda and Bedrock calls.</li>
          <li><strong>Failure patterns:</strong> retrieval misses, context overflow, prompt injection, malformed output, and throttling.</li>
        </ul>
      </article>
    </div>

    <section class="tip-strip">
      <span>D1 + D2 are the highest-return domains. Master RAG, APIs, and agents first.</span>
      <span>Managed or low-code in the scenario usually points toward Knowledge Bases, Q Business, or Bedrock Flows.</span>
      <span>Bulk async workloads point to Batch Inference. Stable heavy traffic points to provisioned throughput.</span>
      <span>Competitor or policy blocking points to topic denial in Guardrails.</span>
    </section>

    <footer class="sheet-footer">
      <p>The highest-value concepts are RAG, agents, guardrails, and Bedrock runtime choices.</p>
      <p>AIP-C01 visual reference adapted into a responsive VitePress component.</p>
    </footer>
  </section>
</template>

<style scoped>
.aip-sheet {
  --sheet-paper: #f7f3ea;
  --sheet-paper-alt: #efe7d8;
  --sheet-ink: #111318;
  --sheet-rule: rgba(17, 19, 24, 0.14);
  --sheet-shadow: 0 28px 70px rgba(16, 24, 40, 0.14);
  --sheet-serif: Georgia, 'Times New Roman', serif;
  background:
    radial-gradient(circle at top left, rgba(16, 185, 129, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(245, 158, 11, 0.12), transparent 30%),
    linear-gradient(180deg, #fbf8f1 0%, #f5eee3 100%);
  border: 1px solid var(--sheet-rule);
  border-radius: 28px;
  box-shadow: var(--sheet-shadow);
  color: var(--sheet-ink);
  margin: 2rem 0;
  overflow: hidden;
}

.sheet-header {
  display: grid;
  gap: 1rem;
  padding: 2rem 1.5rem 1.25rem;
  border-bottom: 1px solid var(--sheet-rule);
}

.sheet-eyebrow,
.sheet-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 19, 24, 0.72);
}

.sheet-headline h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-family: var(--sheet-serif);
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 0.95;
}

.sheet-headline p {
  margin: 0.65rem 0 0;
  max-width: 52rem;
  font-size: 1rem;
  color: rgba(17, 19, 24, 0.78);
}

.score-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: #111318;
  color: #fff;
  padding: 0.35rem 0.75rem;
  font-weight: 600;
}

.domain-ribbon {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  background: var(--sheet-rule);
}

.domain-card {
  background: rgba(255, 255, 255, 0.72);
  padding: 1rem 0.9rem;
  min-height: 100%;
}

.domain-card strong {
  display: block;
  font-family: var(--sheet-serif);
  font-size: 1.8rem;
  line-height: 1;
  margin: 0.2rem 0 0.45rem;
}

.domain-card p,
.domain-code {
  margin: 0;
  font-size: 0.82rem;
}

.domain-code {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(17, 19, 24, 0.56);
}

.domain-d1 strong { color: #1d4ed8; }
.domain-d2 strong { color: #7c3aed; }
.domain-d3 strong { color: #b45309; }
.domain-d4 strong { color: #047857; }
.domain-d5 strong { color: #be123c; }

.sheet-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.25rem;
}

.sheet-card {
  border: 1px solid var(--sheet-rule);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 22px;
  padding: 1rem;
  min-width: 0;
}

.span-two {
  grid-column: span 2;
}

.card-title {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.95rem;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}

.card-title::before {
  content: '';
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: currentColor;
}

.card-d1 { color: #1d4ed8; }
.card-d2 { color: #7c3aed; }
.card-d3 { color: #b45309; }
.card-d4 { color: #047857; }
.card-d5 { color: #be123c; }

.bullet-list {
  margin: 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.55rem;
}

.compact-list {
  margin-top: 0.85rem;
}

.bullet-list li {
  line-height: 1.55;
}

.flow-row,
.agent-loop {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.flow-row {
  margin-bottom: 0.85rem;
}

.flow-row span,
.loop-node {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.3rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--sheet-rule);
  border-radius: 14px;
  background: #fff;
  font-size: 0.88rem;
}

.highlight-pill {
  background: #111318 !important;
  color: #fff;
}

.loop-primary {
  background: #111318;
  color: #fff;
}

.loop-secondary {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(124, 58, 237, 0.35);
}

.loop-arrow {
  color: rgba(17, 19, 24, 0.4);
  font-size: 1.1rem;
}

.guard-stack {
  display: grid;
  gap: 0.55rem;
}

.guard-layer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 0.85rem;
  border-radius: 16px;
  border: 1px solid transparent;
  font-size: 0.9rem;
}

.guard-layer span {
  color: rgba(17, 19, 24, 0.72);
}

.guard-red { background: rgba(220, 38, 38, 0.08); border-color: rgba(220, 38, 38, 0.18); }
.guard-amber { background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.2); }
.guard-indigo { background: rgba(79, 70, 229, 0.09); border-color: rgba(79, 70, 229, 0.18); }
.guard-green { background: rgba(16, 185, 129, 0.09); border-color: rgba(16, 185, 129, 0.18); }
.guard-blue { background: rgba(37, 99, 235, 0.08); border-color: rgba(37, 99, 235, 0.18); }

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.compare-table th,
.compare-table td {
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--sheet-rule);
  vertical-align: top;
  text-align: left;
}

.compare-table th {
  background: var(--sheet-paper-alt);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tip-strip {
  display: grid;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  background: #111318;
  color: rgba(255, 255, 255, 0.88);
}

.tip-strip span::before {
  content: '◆';
  color: rgba(255, 255, 255, 0.44);
  margin-right: 0.55rem;
}

.sheet-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.25rem 1.4rem;
  border-top: 1px solid var(--sheet-rule);
  font-size: 0.92rem;
  color: rgba(17, 19, 24, 0.72);
}

.sheet-footer p {
  margin: 0;
}

code {
  font-size: 0.85em;
}

@media (max-width: 1100px) {
  .domain-ribbon,
  .sheet-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .span-two {
    grid-column: span 2;
  }
}

@media (max-width: 720px) {
  .domain-ribbon,
  .sheet-grid {
    grid-template-columns: 1fr;
  }

  .span-two {
    grid-column: span 1;
  }

  .guard-layer,
  .sheet-footer {
    flex-direction: column;
  }

  .sheet-header,
  .sheet-grid,
  .tip-strip,
  .sheet-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
