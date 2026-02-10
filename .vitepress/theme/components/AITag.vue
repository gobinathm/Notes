<template>
  <div class="ai-tag">
    <span class="sparkle">✨</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'AI Generated'
  }
})
</script>

<style scoped>
.ai-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  background: rgba(var(--vp-c-brand-rgb), 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  white-space: nowrap;
}

.sparkle {
  font-size: 0.85rem;
  line-height: 1;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
