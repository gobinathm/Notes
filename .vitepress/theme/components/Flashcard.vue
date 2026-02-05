<template>
  <div class="flashcard" @click="flipped = !flipped" :class="{ flipped }">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <div class="flashcard-content">
          <span class="icon">❓</span>
          <p class="question">{{ question }}</p>
          <span class="hint">(Click to reveal)</span>
        </div>
      </div>
      <div class="flashcard-back">
        <div class="flashcard-content">
          <span class="icon">💡</span>
          <div class="answer"><slot></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  question: {
    type: String,
    required: true
  }
})

const flipped = ref(false)
</script>

<style scoped>
.flashcard {
  perspective: 1000px;
  width: 100%;
  max-width: 500px;
  height: 200px;
  margin: 2rem auto;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.flashcard-front {
  background-color: var(--vp-c-bg-soft);
}

.flashcard-back {
  background-color: var(--vp-c-brand-soft);
  transform: rotateY(180deg);
}

.flashcard-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.question {
  font-weight: 600;
  font-size: 1.1rem;
}

.answer {
  font-size: 1rem;
}

.hint {
  font-size: 0.8rem;
  opacity: 0.6;
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>
