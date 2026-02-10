<template>
  <div class="ai-audio-player">
    <div class="player-header">
      <AITag :label="aiLabel" />
    </div>
    <div class="audio-container">
      <audio controls preload="metadata">
        <slot></slot>
      </audio>
    </div>
    <div v-if="downloadUrl" class="audio-footer">
      <a :href="downloadUrl" :download="downloadName" class="download-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download audio (M4A)
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AITag from './AITag.vue'

const props = defineProps({
  aiLabel: {
    type: String,
    default: 'AI Generated'
  },
  downloadUrl: {
    type: String,
    default: ''
  }
})

const downloadName = computed(() => {
  if (!props.downloadUrl) return ''
  const parts = props.downloadUrl.split('/')
  return parts[parts.length - 1]
})
</script>

<style scoped>
.ai-audio-player {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.ai-audio-player::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  opacity: 0.7;
}

.player-header {
  margin-bottom: 1rem;
}

.audio-container {
  width: 100%;
}

audio {
  width: 100%;
  height: 45px;
}

.audio-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.download-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
