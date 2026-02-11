<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import FlashcardDeck from './FlashcardDeck.vue'
import AITag from './AITag.vue'

const WORKER_URL = 'https://gemini-proxy.gobinathm.workers.dev'

const route = useRoute()
const isOpen = ref(false)
const mode = ref('qa')
const question = ref('')
const messages = ref([])
const flashcards = ref([])
const loading = ref(false)
const hasInteracted = ref(false)
const chatBody = ref(null)

const isStudyPage = computed(() => {
  const path = route.path
  return (
    path.startsWith('/certifications/') &&
    path !== '/certifications/' &&
    path !== '/certifications'
  )
})

// Reset conversation on page navigation
watch(() => route.path, () => {
  messages.value = []
  flashcards.value = []
  question.value = ''
  loading.value = false
})

onMounted(() => {
  hasInteracted.value = localStorage.getItem('chatbot-interacted') === 'true'
})

function markInteracted() {
  if (!hasInteracted.value) {
    hasInteracted.value = true
    localStorage.setItem('chatbot-interacted', 'true')
  }
}

function togglePanel() {
  isOpen.value = !isOpen.value
  markInteracted()
}

function extractPageContent() {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return ''
  const clone = doc.cloneNode(true)
  // Remove non-content elements
  clone.querySelectorAll('script, style, .ai-chatbot, .flashcard-deck, nav, .header-anchor').forEach(el => el.remove())
  const text = clone.textContent || ''
  return text.slice(0, 40_000)
}

function parseMarkdown(md) {
  let html = md
    // Escape HTML entities first (security)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Headings (###, ##, #)
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^# (.+)$/gm, '<h3>$1</h3>')
  // Unordered lists — collect consecutive lines
  html = html.replace(/(?:^[*-] .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(line =>
      '<li>' + line.replace(/^[*-] /, '') + '</li>'
    ).join('')
    return '<ul>' + items + '</ul>'
  })
  // Ordered lists
  html = html.replace(/(?:^\d+\. .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(line =>
      '<li>' + line.replace(/^\d+\. /, '') + '</li>'
    ).join('')
    return '<ol>' + items + '</ol>'
  })
  // Paragraphs — double newlines
  html = html.replace(/\n{2,}/g, '</p><p>')
  // Single newlines to <br> (outside of lists/pre)
  html = html.replace(/(?<!<\/li>|<\/ul>|<\/ol>|<\/pre>|<\/h[34]>|<\/p>)\n(?!<)/g, '<br>')
  // Wrap in paragraph
  html = '<p>' + html + '</p>'
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')
  // Clean up paragraphs wrapping block elements
  html = html.replace(/<p>\s*(<(?:ul|ol|pre|h[34]))/g, '$1')
  html = html.replace(/(<\/(?:ul|ol|pre|h[34])>)\s*<\/p>/g, '$1')
  return html
}

async function sendQuestion(q) {
  const userQuestion = q || question.value.trim()
  if (!userQuestion || loading.value) return

  question.value = ''
  messages.value.push({ role: 'user', text: userQuestion })
  loading.value = true
  await scrollToBottom()

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'qa',
        pageContent: extractPageContent(),
        question: userQuestion,
      }),
    })
    const data = await res.json()
    if (data.error) {
      messages.value.push({ role: 'assistant', text: parseMarkdown(data.error) })
    } else {
      messages.value.push({ role: 'assistant', text: parseMarkdown(data.answer) })
    }
  } catch {
    messages.value.push({ role: 'assistant', text: 'Failed to reach the AI service. Please try again.' })
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}

async function generateFlashcards() {
  if (loading.value) return
  loading.value = true
  flashcards.value = []

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'flashcard',
        pageContent: extractPageContent(),
      }),
    })
    const data = await res.json()
    if (data.error) {
      flashcards.value = [{ question: 'Error', answer: data.error }]
    } else {
      flashcards.value = data.flashcards
    }
  } catch {
    flashcards.value = [{ question: 'Error', answer: 'Failed to reach the AI service.' }]
  } finally {
    loading.value = false
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendQuestion()
  }
}

async function scrollToBottom() {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}

const exampleQuestions = [
  'What are the key concepts on this page?',
  'Summarize the exam objectives covered here.',
  'What should I focus on for the exam?',
]
</script>

<template>
  <Teleport to="body" v-if="isStudyPage">
    <!-- Floating button -->
    <button
      class="chatbot-fab"
      :class="{ pulse: !hasInteracted }"
      @click="togglePanel"
      :aria-label="isOpen ? 'Close AI assistant' : 'Open AI assistant'"
    >
      <span class="fab-icon">
        <!-- Robot chat-bot icon -->
        <svg class="bot-svg" width="56" height="64" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Antenna -->
          <line x1="32" y1="2" x2="32" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="32" cy="2" r="3" fill="var(--vp-c-brand-1)"/>
          <!-- Head / chat bubble -->
          <rect x="6" y="12" width="52" height="38" rx="10" fill="var(--vp-c-brand-1)" />
          <!-- Bubble tail -->
          <polygon points="14,50 8,62 26,50" fill="var(--vp-c-brand-1)"/>
          <!-- Eyes (white bg) -->
          <g class="bot-eyes">
            <rect class="bot-eye left-eye" x="17" y="23" width="12" height="12" rx="4" fill="white"/>
            <rect class="bot-eye right-eye" x="35" y="23" width="12" height="12" rx="4" fill="white"/>
            <!-- Pupils -->
            <circle class="bot-pupil" cx="23" cy="29" r="3" fill="#064e3b"/>
            <circle class="bot-pupil" cx="41" cy="29" r="3" fill="#064e3b"/>
          </g>
          <!-- Mouth -->
          <rect x="21" y="40" width="22" height="5" rx="2.5" fill="white" fill-opacity="0.85"/>
          <line x1="28" y1="40" x2="28" y2="45" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
          <line x1="32" y1="40" x2="32" y2="45" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
          <line x1="36" y1="40" x2="36" y2="45" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
          <!-- AI label near antenna, top-right -->
          <g class="ai-label-group">
            <circle class="ai-dot-svg" cx="43" cy="5" r="3" fill="#34d399"/>
            <text x="54" y="9" font-size="11" font-weight="900" fill="var(--vp-c-brand-1)" text-anchor="middle" font-family="system-ui, sans-serif" letter-spacing="0.5">AI</text>
          </g>
        </svg>
      </span>
      <!-- AI indicator - positioned inside fab-icon -->
    </button>

    <!-- Chat panel -->
    <Transition name="chatbot-slide">
      <div v-if="isOpen" class="chatbot-panel">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-title">
            <AITag label="Study Assistant" />
          </div>
          <button class="chatbot-close" @click="isOpen = false" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Mode toggle -->
        <div class="chatbot-modes">
          <button
            :class="['mode-btn', { active: mode === 'qa' }]"
            @click="mode = 'qa'"
          >
            Q&A
          </button>
          <button
            :class="['mode-btn', { active: mode === 'flashcard' }]"
            @click="mode = 'flashcard'"
          >
            Flashcards
          </button>
        </div>

        <!-- Content area -->
        <div class="chatbot-body" ref="chatBody">
          <!-- Q&A mode -->
          <template v-if="mode === 'qa'">
            <div v-if="messages.length === 0 && !loading" class="chatbot-empty">
              <p class="empty-text">Ask a question about this page</p>
              <div class="example-questions">
                <button
                  v-for="eq in exampleQuestions"
                  :key="eq"
                  class="example-btn"
                  @click="sendQuestion(eq)"
                >
                  {{ eq }}
                </button>
              </div>
            </div>

            <div
              v-for="(msg, i) in messages"
              :key="i"
              :class="['chat-message', msg.role]"
            >
              <div class="message-bubble" v-html="msg.text"></div>
            </div>

            <div v-if="loading" class="chat-message assistant">
              <div class="message-bubble typing">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </template>

          <!-- Flashcard mode -->
          <template v-if="mode === 'flashcard'">
            <div v-if="flashcards.length === 0 && !loading" class="chatbot-empty">
              <p class="empty-text">Generate flashcards from this page's content</p>
              <button class="generate-btn" @click="generateFlashcards">
                Generate Flashcards
              </button>
            </div>

            <div v-if="loading" class="flashcard-loading">
              <div class="spinner"></div>
              <p>Generating flashcards...</p>
            </div>

            <div v-if="flashcards.length > 0" class="flashcard-result">
              <AITag label="AI Generated Flashcards" />
              <FlashcardDeck title="AI Flashcards" :cards="flashcards" />
              <button class="generate-btn regenerate" @click="generateFlashcards">
                Regenerate
              </button>
            </div>
          </template>
        </div>

        <!-- Input area (Q&A only) -->
        <div v-if="mode === 'qa'" class="chatbot-input">
          <textarea
            v-model="question"
            placeholder="Ask about this page..."
            @keydown="handleKeydown"
            :disabled="loading"
            rows="1"
          ></textarea>
          <button
            class="send-btn"
            @click="sendQuestion()"
            :disabled="!question.trim() || loading"
            aria-label="Send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <!-- Footer -->
        <div class="chatbot-footer">
          <div>Powered by <strong>Google Gemini</strong></div>
          <div>AI responses may be inaccurate. Verify with official study materials.</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Floating Action Button */
.chatbot-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: auto;
  height: auto;
  padding: 4px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
}

.chatbot-fab:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));
}

.chatbot-fab.pulse .bot-svg {
  animation: fab-pulse 2.5s ease-in-out infinite;
}

@keyframes fab-pulse {
  0%, 100% { filter: drop-shadow(0 2px 6px rgba(16, 185, 129, 0.3)); }
  50% { filter: drop-shadow(0 2px 14px rgba(16, 185, 129, 0.6)); }
}

.fab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Blinking eyes animation */
.fab-icon :deep(.bot-eye) {
  animation: blink 3s ease-in-out infinite;
}

@keyframes blink {
  0%, 38%, 42%, 100% { transform: scaleY(1); }
  40% { transform: scaleY(0.1); }
}

.fab-icon :deep(.left-eye) {
  transform-origin: 23px 29px;
}

.fab-icon :deep(.right-eye) {
  transform-origin: 41px 29px;
}

.fab-icon :deep(.bot-pupil) {
  animation: blink 3s ease-in-out infinite;
}

.fab-icon :deep(.bot-pupil:first-of-type) {
  transform-origin: 23px 29px;
}

.fab-icon :deep(.bot-pupil:last-of-type) {
  transform-origin: 41px 29px;
}

/* AI dot pulsating glow (inside SVG) */
.fab-icon :deep(.ai-dot-svg) {
  animation: ai-dot-pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 2px #34d399);
}

@keyframes ai-dot-pulse {
  0%, 100% { r: 3; opacity: 1; filter: drop-shadow(0 0 2px #34d399); }
  50% { r: 4; opacity: 0.7; filter: drop-shadow(0 0 6px #34d399); }
}

/* Chat Panel */
.chatbot-panel {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 420px;
  max-height: 600px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

html.dark .chatbot-panel {
  background: rgba(10, 10, 15, 0.9);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Slide transition */
.chatbot-slide-enter-active,
.chatbot-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chatbot-slide-enter-from,
.chatbot-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

/* Header */
.chatbot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.chatbot-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chatbot-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.chatbot-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* Mode toggle */
.chatbot-modes {
  display: flex;
  gap: 4px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-btn {
  flex: 1;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
}

.mode-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.mode-btn:not(.active):hover {
  background: var(--vp-c-bg-soft);
}

/* Body */
.chatbot-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 200px;
  max-height: 380px;
}

/* Empty state */
.chatbot-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}

.empty-text {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
}

.example-questions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.example-btn {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.example-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: rgba(16, 185, 129, 0.08);
}

/* Messages */
.chat-message {
  margin-bottom: 12px;
  display: flex;
}

.chat-message.user {
  justify-content: flex-end;
}

.chat-message.assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 85%;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  line-height: 1.5;
  word-break: break-word;
}

.message-bubble :deep(p) {
  margin: 0 0 0.4em;
}

.message-bubble :deep(p:last-child) {
  margin-bottom: 0;
}

.message-bubble :deep(ul),
.message-bubble :deep(ol) {
  margin: 0.3em 0;
  padding-left: 1.4em;
}

.message-bubble :deep(li) {
  margin: 0.15em 0;
}

.message-bubble :deep(code) {
  font-size: 0.8em;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.08);
}

html.dark .message-bubble :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}

.message-bubble :deep(pre) {
  margin: 0.4em 0;
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.06);
  overflow-x: auto;
  font-size: 0.8em;
}

html.dark .message-bubble :deep(pre) {
  background: rgba(255, 255, 255, 0.06);
}

.message-bubble :deep(h3),
.message-bubble :deep(h4) {
  margin: 0.5em 0 0.2em;
  font-size: 0.9em;
  font-weight: 700;
}

.chat-message.user .message-bubble :deep(code) {
  background: rgba(255, 255, 255, 0.2);
}

.chat-message.user .message-bubble {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-message.assistant .message-bubble {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 4px;
}

/* Typing indicator */
.message-bubble.typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 18px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: dot-bounce 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* Flashcard mode */
.generate-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.generate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.generate-btn.regenerate {
  margin-top: 12px;
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  font-size: 0.8rem;
  padding: 6px 16px;
}

.generate-btn.regenerate:hover {
  background: rgba(16, 185, 129, 0.08);
}

.flashcard-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.flashcard-loading p {
  margin: 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.flashcard-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.flashcard-result :deep(.flashcard-deck) {
  margin: 8px 0;
  max-width: 100%;
}

.flashcard-result :deep(.flashcard) {
  height: 200px;
}

/* Input area */
.chatbot-input {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.chatbot-input textarea {
  flex: 1;
  resize: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-family: inherit;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
  max-height: 80px;
  transition: border-color 0.2s;
}

.chatbot-input textarea:focus {
  border-color: var(--vp-c-brand-1);
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #059669;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Footer */
.chatbot-footer {
  padding: 8px 16px;
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  line-height: 1.6;
}

.chatbot-footer strong {
  color: var(--vp-c-text-2);
}

/* Mobile */
@media (max-width: 640px) {
  .chatbot-panel {
    width: calc(100vw - 16px);
    right: 8px;
    bottom: 88px;
    max-height: calc(100vh - 120px);
    border-radius: 16px 16px 0 0;
  }

  .chatbot-fab {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }
}
</style>
