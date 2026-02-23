---
title: "GH-300 - Domain 5: Improve Developer Productivity"
description: "GH-300 Domain 5: Code generation, refactoring, documentation, testing, and security improvements"
head:
  - - meta
    - name: keywords
      content: gh-300, domain 5, developer productivity, code generation, refactoring, unit tests, security
---

# Domain 5: Improve Developer Productivity with GitHub Copilot (10–15%)

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)

::: tip Exam Tip
This domain is practical — the exam presents real-world scenarios and asks how Copilot should be used to solve them. Know the right Copilot feature for each task: inline suggestions for generation, Chat for explanation, `/tests` for testing, `/fix` for debugging.
:::

---

## Code Generation, Refactoring, and Documentation

### Code Generation

Copilot generates code from:
- **Comments**: Describe what you want in a comment → Copilot fills in the implementation
- **Function signatures**: Write the function name and parameters → Copilot generates the body
- **Open files context**: Copilot infers patterns from existing code in your project

**Best uses**: Boilerplate code, repetitive patterns, scaffolding new functions/classes, generating CRUD operations

### Refactoring

Use Copilot Chat for refactoring tasks:
```
/fix — Fix a specific issue in selected code
"Refactor this function to use async/await" — general refactoring
"Convert this class to use dependency injection" — architectural refactoring
```

**Agent Mode** or **Edit Mode** for cross-file refactoring (e.g., renaming an interface that's used in 10 files)

### Documentation Generation

```
/doc — Generate inline documentation for selected code
"Write a README for this module" — via Copilot Chat
"Add JSDoc comments to all exported functions" — Agent Mode
```

---

## Reducing Context Switching

One of Copilot's highest-value use cases is keeping developers in flow:

- **Learn as you code**: Ask Copilot to explain unfamiliar APIs or libraries without leaving the IDE
- **Generate sample data**: `"Give me 5 sample JSON objects for a user profile"` — no need to switch to a browser
- **Modernize legacy code**: Ask Copilot to translate Python 2 → Python 3, or convert callbacks to async/await
- **Shell command help**: Use Copilot CLI instead of searching Stack Overflow for CLI syntax

---

## Testing with GitHub Copilot

### Generating Unit Tests

```python
# Select your function, then use:
# /tests in Copilot Chat
# or write a comment: "# Test that get_email returns None for invalid input"
```

Copilot can generate:
- **Happy path** tests (valid inputs)
- **Edge cases** (empty strings, None, boundary values)
- **Error cases** (exception handling)

### Identifying Edge Cases

Ask Copilot Chat: `"What edge cases should I test for this function?"`

Copilot will enumerate cases like:
- Empty input / null
- Very large inputs
- Boundary conditions (e.g., exactly at the limit)
- Invalid types
- Concurrent execution scenarios

### Writing Assertions

```python
# Copilot can generate assertion-level tests:
# "Write assertions to verify the returned dict has keys 'id', 'email', 'role'"
```

---

## Security Improvements and Performance Optimizations

### Security-Aware Code Review

Use Copilot Chat to review code for security issues:
```
"Review this function for SQL injection vulnerabilities"
"Is this code vulnerable to XSS?"
"Suggest a more secure way to store this password"
```

### Performance Optimizations

```
"Rewrite this loop using vectorized NumPy operations"
"Optimize this SQL query to avoid N+1 selects"
"Replace this O(n²) algorithm with an O(n log n) approach"
```

::: warning Trap
Copilot can **suggest** security and performance improvements but cannot **guarantee** they are correct. Always test and review AI-generated security changes with a security expert.
:::

<FlashcardDeck
  title="Domain 5 Quick Quiz"
  :cards="[
    {
      question: 'Which Copilot Chat command generates unit tests for selected code?',
      answer: '<code>/tests</code> — generates unit tests for the currently selected code block.'
    },
    {
      question: 'What is the best Copilot mode for refactoring across multiple files?',
      answer: '<strong>Edit Mode</strong> (for reviewing each change) or <strong>Agent Mode</strong> (for autonomous execution). Agent Mode is faster; Edit Mode gives more control.'
    },
    {
      question: 'How can Copilot help reduce context switching for developers?',
      answer: 'By answering API questions, generating sample data, explaining code, and helping with CLI commands — all without leaving the IDE.'
    },
    {
      question: 'Can Copilot guarantee that generated security improvements are correct?',
      answer: '<strong>No.</strong> Copilot suggests improvements but cannot guarantee correctness. All security-related changes must be reviewed and tested by a human.'
    }
  ]"
/>

---

[← Domain 4](./domain-4.md) · [Next Domain →](./domain-6.md)
