---
title: Exam Playbook
description: Study strategies and exam day tactics I use for certification exams.
share: true
---

# Exam Playbook

Strategies and tactics I've picked up across multiple certification exams.

## Study Strategies

<div class="cert-grid">

<div class="cert-card studying">
  <h3>🧠 Feynman Technique</h3>
  <p>Pick a concept. Explain it simply as if teaching a beginner. Find gaps. Simplify again. If you can't explain it simply, you don't understand it well enough.</p>
</div>

<div class="cert-card studying">
  <h3>🔁 Spaced Repetition</h3>
  <p>Review after 1 day, 3 days, 1 week, 2 weeks, 1 month. Your brain retains more when material is revisited at increasing intervals. Tools like Anki automate this.</p>
</div>

<div class="cert-card studying">
  <h3>🍅 Pomodoro Technique</h3>
  <p>Study for 25–50 minutes, break for 5–10 minutes. Repeat. Maintains focus, prevents burnout, and improves retention over marathon sessions.</p>
</div>

<div class="cert-card studying">
  <h3>🔧 Hands-On Practice</h3>
  <p>You can't pass most technical certs by reading alone. Use free tiers (AWS, Azure, GCP), build sample projects, break things and fix them.</p>
</div>

<div class="cert-card studying">
  <h3>📚 Multiple Sources</h3>
  <p>Don't rely on one resource. Combine official docs, video courses, practice exams, labs, and community forums.</p>
</div>

<div class="cert-card studying">
  <h3>🎓 Teach Others</h3>
  <p>Explain concepts to friends, write blog posts, answer forum questions. Teaching forces you to organize knowledge and reveals hidden gaps.</p>
</div>

</div>

## Building a Study Plan

<div class="prep-timeline">

<div class="timeline-item">
  <div class="timeline-marker">📋</div>
  <div class="timeline-content">
    <strong>Week 1–2</strong> — Download the official exam guide. Map topics to weights. Start with the highest-weighted domain + hands-on practice.
  </div>
</div>

<div class="timeline-item">
  <div class="timeline-marker">📖</div>
  <div class="timeline-content">
    <strong>Week 3–6</strong> — Work through remaining domains. Balance theory with labs. Review earlier domains weekly using spaced repetition.
  </div>
</div>

<div class="timeline-item">
  <div class="timeline-marker">🧪</div>
  <div class="timeline-content">
    <strong>Week 7–8</strong> — Practice exams under timed, exam-like conditions. Review every wrong answer thoroughly — understand the <em>why</em>, not just the <em>what</em>.
  </div>
</div>

<div class="timeline-item">
  <div class="timeline-marker">🎯</div>
  <div class="timeline-content">
    <strong>Final Week</strong> — Light review only. Skim cheatsheets. No new material. Get good sleep. Confirm exam logistics.
  </div>
</div>

</div>

## Exam Day Tactics

<div class="cert-grid">

<div class="cert-card completed">
  <h3>🧾 Brain Dump First</h3>
  <p>Use the first 2 minutes to write down formulas, mnemonics, and hard-to-remember facts on scratch paper. Reference throughout the exam.</p>
</div>

<div class="cert-card completed">
  <h3>⏱️ Time Budget</h3>
  <p>Divide total time by questions. Example: 120 min ÷ 85 questions = ~1.4 min each. First pass: answer what you know. Second pass: tackle flagged questions.</p>
</div>

<div class="cert-card completed">
  <h3>🔍 Read Keywords</h3>
  <p>Watch for MOST, LEAST, NOT, BEST, EXCEPT, FIRST. These change the answer completely. Underline or highlight them mentally before answering.</p>
</div>

<div class="cert-card completed">
  <h3>✂️ Eliminate First</h3>
  <p>Cross out obviously wrong answers. Even eliminating one option improves your odds significantly. Then analyze what's left carefully.</p>
</div>

<div class="cert-card completed">
  <h3>🚩 Flag and Move</h3>
  <p>Stuck for more than 90 seconds? Flag it and move on. Later questions sometimes contain hints. Come back with fresh eyes on the second pass.</p>
</div>

<div class="cert-card completed">
  <h3>🔄 Trust First Instinct</h3>
  <p>Only change an answer if you find concrete reason it's wrong — like misreading the question. Gut-feel second-guessing usually hurts your score.</p>
</div>

</div>

## Common Question Patterns

<details class="styled-details">
<summary><strong>💰 "Choose the MOST cost-effective solution"</strong></summary>

They're testing cost optimization. Look for:
- Serverless over provisioned resources
- Reserved/savings plans over on-demand
- Managed services over self-hosted
- Right-sizing and auto-scaling

Eliminate the most expensive option first — it's usually the obvious distractor.

</details>

<details class="styled-details">
<summary><strong>🏗️ "A company needs high availability..."</strong></summary>

They're testing architecture and resilience. Look for:
- Multi-AZ or multi-region deployments
- Load balancing and auto-scaling
- Backup, replication, and failover
- No single points of failure

If an option uses only one AZ or has no redundancy, eliminate it.

</details>

<details class="styled-details">
<summary><strong>🔒 "Ensure security and compliance..."</strong></summary>

They're testing security best practices. Look for:
- Encryption at rest AND in transit
- Least-privilege IAM policies
- Network isolation (VPC, security groups)
- Audit logging and monitoring

The most restrictive option that still works is usually correct.

</details>

<details class="styled-details">
<summary><strong>⚡ "Migrate with LEAST operational overhead"</strong></summary>

They're testing managed vs self-managed thinking. Choose:
- Managed services over self-hosted
- Serverless over containers over VMs
- Automated over manual processes

"Least operational overhead" almost always means "let the cloud provider handle it."

</details>

## Exam Day Checklist

<div class="cert-grid">

<div class="cert-card studying">
  <h3>Night Before</h3>

- Light review only (30 min max)
- Organize ID and confirmation
- Set multiple alarms
- Prep clothes and breakfast
- Sleep 8 hours — worth more than cramming

</div>

<div class="cert-card studying">
  <h3>Morning Of</h3>

- Nutritious breakfast (protein + carbs)
- Moderate caffeine if usual
- Arrive 15–30 min early
- Quick 10 min note skim (optional)
- Deep breaths before starting

</div>

<div class="cert-card studying">
  <h3>During Exam</h3>

- Brain dump on scratch paper
- First pass: answer confident ones
- Flag uncertain questions
- Watch time checkpoints
- Never leave questions blank

</div>

<div class="cert-card studying">
  <h3>Final 15 Minutes</h3>

- Review flagged questions
- Verify all questions answered
- Only change answers with clear reason
- Submit with confidence
- Breathe — you prepared for this

</div>

</div>

## Managing Test Anxiety

<div class="features-grid">
  <div class="feature-item">🫁 <strong>4-7-8 Breathing</strong> — Breathe in 4 sec, hold 7 sec, exhale 8 sec. Repeat 2–3 times.</div>
  <div class="feature-item">🎯 <strong>One at a Time</strong> — Don't think "85 questions left." Focus on just this one question.</div>
  <div class="feature-item">💪 <strong>Positive Self-Talk</strong> — "I prepared for this. I know this material. One question at a time."</div>
  <div class="feature-item">🧘 <strong>Micro-Breaks</strong> — Close eyes for 5 seconds. Stretch shoulders. Look away from screen.</div>
</div>

## If You Don't Pass

It's not the end. Many people need 2+ attempts.

1. **Review your score report** — identify which domains were weakest
2. **Focus study on gaps** — don't re-study everything, target weak areas
3. **Take a break first** — come back to it after a few days with fresh perspective
4. **Try different resources** — if your study material didn't click, switch approaches

::: info
You don't need 100% to pass — most certification exams require around 70%. Missing a few hard questions is normal and expected.
:::
