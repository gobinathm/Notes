<template>
  <div class="flashcard-deck">
    <div class="deck-header">
      <h3>{{ title }}</h3>
      <div class="deck-counter">{{ currentIndex + 1 }} / {{ cards.length }}</div>
    </div>
    
    <div class="flashcard" @click="flipped = !flipped" :class="{ flipped }">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="flashcard-content">
            <span class="icon">❓</span>
            <p class="question">{{ cards[currentIndex].question }}</p>
            <span class="hint">(Click to reveal)</span>
          </div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-content">
            <span class="icon">💡</span>
            <div class="answer" v-html="cards[currentIndex].answer"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="deck-controls">
      <button @click="previous" :disabled="currentIndex === 0" class="nav-btn">
        ← Previous
      </button>
      <button @click="reset" class="reset-btn">
        Reset Card
      </button>
      <button @click="next" :disabled="currentIndex === cards.length - 1" class="nav-btn">
        Next →
      </button>
    </div>

    <div class="progress-dots">
      <span 
        v-for="(card, index) in cards" 
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Flashcards'
  },
  cards: {
    type: Array,
    required: true,
    validator: (cards) => {
      return cards.every(card => card.question && card.answer)
    }
  }
})

const currentIndex = ref(0)
const flipped = ref(false)

const next = () => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++
    flipped.value = false
  }
}

const previous = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    flipped.value = false
  }
}

const goTo = (index) => {
  currentIndex.value = index
  flipped.value = false
}

const reset = () => {
  flipped.value = false
}
</script>

<style scoped>
.flashcard-deck {
  margin: 2rem auto;
  max-width: 600px;
}

.deck-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.deck-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.deck-counter {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.flashcard {
  perspective: 1000px;
  width: 100%;
  height: 250px;
  cursor: pointer;
  margin-bottom: 1.5rem;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 2rem;
  border: 2px solid var(--vp-c-divider);
}

.flashcard-front {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
}

.flashcard-back {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-brand-softer) 100%);
  transform: rotateY(180deg);
}

.flashcard-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.question {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.5;
}

.answer {
  font-size: 1rem;
  line-height: 1.6;
}

.hint {
  font-size: 0.85rem;
  opacity: 0.6;
  font-style: italic;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.deck-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.nav-btn,
.reset-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled),
.reset-btn:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.progress-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.dot:hover {
  background: var(--vp-c-brand-light);
}

.dot.active {
  background: var(--vp-c-brand);
  width: 12px;
  height: 12px;
}
</style>
