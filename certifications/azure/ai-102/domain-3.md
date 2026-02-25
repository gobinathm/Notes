---
title: "Domain 3: Implement an Agentic Solution"
description: "Notes on Azure AI Agent Service, Microsoft Agent Framework, and multi-agent orchestration for the AI-102 exam"
head:
  - - meta
    - name: keywords
      content: ai-102, azure ai agent service, agentic solutions, semantic kernel, multi-agent orchestration, code interpreter, file search
---

# Domain 3: Implement an Agentic Solution (5-10%)

[← Domain 2](./domain-2.md) · [Domain 4 →](./domain-4.md)

---

This is a **new domain for 2025** focusing on autonomous AI agents that can use tools and reason through multi-step tasks. It carries the lowest weight on the exam (5–10%), but the concepts are distinct enough to trip up candidates who confuse agent patterns with standard LLM calls.

## 3.1 Azure AI Agent Service

A fully managed service in **Microsoft AI Foundry** for building, deploying, and scaling AI agents. It abstracts the orchestration loop so you focus on configuring tools and instructions rather than managing state.

### Reasoning Loop

An agent doesn't generate a single response — it iterates:

1. **Receive** user goal
2. **Plan** — decide if a tool is needed
3. **Execute** — call the tool (code, search, function)
4. **Observe** — process the tool result
5. **Repeat or Respond** — loop until the goal is met or budget is exhausted

::: info Key Exam Concept
The phrase **"autonomous multi-step task"** in a question → answer is **AI Agent Service**, not a plain Prompt Flow run or a single LLM call.
:::

### Core Agent Components

| Component | What It Is | Exam Signal |
|-----------|-----------|-------------|
| **Instructions** | System-level prompt that defines the agent's persona and constraints | "agent must always respond in English" |
| **Thread** | A conversation session — stores the message history | "maintain conversation state across turns" |
| **Run** | A single execution of the reasoning loop on a Thread | "trigger the agent to process a message" |
| **Tool** | A capability the agent can invoke (built-in or custom function) | "agent needs to call an API" |

### Built-in Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Code Interpreter** | Writes and executes Python in a secure sandbox | Math, data analysis, file conversion, chart generation |
| **File Search** | Retrieves information from uploaded documents via vector search | "agent searches uploaded PDFs", "agent answers from your files" |
| **Function Calling** | Calls a custom function/API you define | Real-time data, internal systems, custom logic |
| **Azure AI Search** | Uses an external AI Search index as a grounding source | "agent searches your indexed knowledge base" |

::: warning Code Interpreter vs File Search
**Code Interpreter** → agent writes and *executes* code to solve a problem (e.g., calculate statistics, generate a chart).
**File Search** → agent *retrieves* information from documents without executing code.

The exam distinguishes these with phrases like "solve math problems" (Code Interpreter) vs "answer from uploaded documents" (File Search).
:::

### Configuration Reference

```python
# Create an agent with tools
agent = client.agents.create_agent(
    model="gpt-4o",
    name="data-analyst",
    instructions="You are a data analyst. Use code interpreter to analyze data.",
    tools=[{"type": "code_interpreter"}]
)

# Create a thread and run
thread = client.agents.create_thread()
client.agents.create_message(thread_id=thread.id, role="user", content="Summarize this CSV")
run = client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
```

::: tip Async Pattern
Agent runs are asynchronous. `create_and_process_run()` polls until completion. For manual polling, use `create_run()` then GET the run status until `completed` or `failed`.
:::

---

## 3.2 Microsoft Agent Framework

The Agent Framework provides patterns and components for building sophisticated multi-agent applications. It integrates with **Semantic Kernel** for orchestration logic.

### Key Components

| Component | Purpose |
|-----------|---------|
| **Planner** | Breaks a high-level goal into a sequence of tool calls / sub-tasks |
| **Persona** | Defines the agent's name, description, and behavioral constraints |
| **Memory** | Persistent storage across agent turns (conversation history, retrieved facts) |
| **Kernel** | The Semantic Kernel engine that connects the model to tools and memory |

### Multi-Agent Orchestration Patterns

When a single agent isn't enough, multiple specialized agents can collaborate:

| Pattern | Structure | Best For |
|---------|-----------|---------|
| **Hierarchical** | A "Manager" agent delegates sub-tasks to "Worker" agents | Complex workflows where tasks can be decomposed |
| **Sequential** | Agents form a pipeline — each passes output to the next | Document processing, staged analysis |
| **Group Chat / Joint** | Agents discuss and critique each other's responses | Research tasks requiring multiple perspectives |

::: info Exam Trigger
**"Multiple agents collaborating"** → answer involves **multi-agent orchestration** (not a single agent with multiple tools).
:::

---

## 3.3 Testing, Monitoring, and Deployment

### Constraints and Safety

- **Max turns**: Set a budget on the reasoning loop to prevent infinite tool-calling cycles.
- **Content filters**: Applied at the model level via Azure OpenAI content filtering settings.
- **Grounding checks**: Use Prompt Shields to detect prompt injection attempts within tool outputs.

### Evaluation

- **Foundry Tracing**: Captures every step of the reasoning loop — tool calls, inputs, outputs, latency. Essential for debugging "why did the agent call that tool?"
- **Evaluation Flows**: Run the agent against a dataset of golden Q&A pairs; measure groundedness, relevance, and task completion rate.

### Deployment

Agents are deployed as scalable endpoints within an **AI Foundry Project**. They inherit the project's security, connections, and compute settings from the parent **Hub**.

::: warning Scope Trap
The exam may ask where agents are deployed. Agents live in a **Project** (your workspace), not directly in a Hub. The Hub provides shared resources; the Project is where you build and deploy.
:::

---

<FlashcardDeck storage-key="ai-102-domain-3-cards" :cards="[
  { front: 'What Azure service handles autonomous multi-step AI tasks?', back: 'Azure AI Agent Service — a managed service in AI Foundry that orchestrates the plan-execute-observe reasoning loop.' },
  { front: 'What is the difference between a Thread and a Run?', back: 'Thread = the conversation session (stores message history). Run = one execution of the reasoning loop against a Thread.' },
  { front: 'When does an agent use Code Interpreter vs File Search?', back: 'Code Interpreter: write and execute code (math, data analysis). File Search: retrieve information from uploaded documents without executing code.' },
  { front: 'What is the reasoning loop sequence?', back: 'Receive goal → Plan (tool needed?) → Execute tool → Observe result → Repeat or Respond.' },
  { front: 'Name the three multi-agent orchestration patterns.', back: 'Hierarchical (manager delegates to workers), Sequential (pipeline), Group Chat / Joint (agents discuss together).' },
  { front: 'What tool prevents a runaway agent from looping forever?', back: 'Max turns constraint — sets a budget on how many tool-calling iterations the agent can perform.' },
  { front: 'What AI Foundry feature captures every step of an agent’s reasoning loop?', back: 'Foundry Tracing — records tool calls, inputs, outputs, and latency for each step.' },
  { front: 'A question says “agent must search uploaded PDFs”. Which tool?', back: 'File Search — built into the agent loop, retrieves information from uploaded documents via vector search.' }
]" />

---

[← Domain 2](./domain-2.md) · [Domain 4 →](./domain-4.md)
