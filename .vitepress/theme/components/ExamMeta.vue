<template>
  <div class="exam-meta">
    <span v-if="duration" class="exam-pill">
      <span class="pill-icon">⏱</span>{{ duration }}
    </span>
    <span v-if="questions" class="exam-pill">
      <span class="pill-icon">❓</span>{{ questions }}
    </span>
    <span v-if="passing" class="exam-pill">
      <span class="pill-icon">🎯</span>{{ passing }} to pass
    </span>
    <span v-if="cost" class="exam-pill">
      <span class="pill-icon">💰</span>{{ cost }}
    </span>
    <span v-if="level" class="exam-pill">
      <span class="pill-icon">🎓</span>{{ level }}
    </span>
    <span v-if="provider" class="exam-pill">
      <span class="pill-icon">🏢</span>{{ provider }}
    </span>
    <span v-if="validity" class="exam-pill">
      <span class="pill-icon">📅</span>Valid {{ validity }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  duration: String,
  questions: String,
  passing: String,
  cost: String,
  level: String,
  provider: String,
  validity: String,
})
</script>

<style scoped>
.exam-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.85rem 0 1.1rem;
}

.exam-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.7rem;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}

.exam-pill:hover {
  background: rgba(16, 185, 129, 0.14);
  border-color: rgba(16, 185, 129, 0.4);
}

.pill-icon {
  font-size: 0.82rem;
  line-height: 1;
}
</style>
