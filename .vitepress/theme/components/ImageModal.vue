<template>
  <div class="image-modal-container">
    <div v-if="aiLabel" class="image-header">
      <AITag :label="aiLabel" />
    </div>
    
    <div class="image-thumbnail" @click="openModal">
      <img :src="src" :alt="alt" />
      <div class="overlay">
        <span class="overlay-text">🔍 Click to Enlarge</span>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="modal-image-wrapper">
            <div v-if="aiLabel" class="modal-ai-tag">
              <AITag :label="aiLabel" />
            </div>
            <img :src="src" :alt="alt" class="modal-image" />
          </div>

          <div class="modal-actions">
            <a :href="src" :download="downloadName" class="download-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Infographic
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AITag from './AITag.vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Infographic'
  },
  aiLabel: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)

const downloadName = computed(() => {
  const parts = props.src.split('/')
  return parts[parts.length - 1]
})

const openModal = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.image-modal-container {
  margin: 2rem 0;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.image-modal-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  opacity: 0.7;
}

.image-header {
  margin-bottom: 1rem;
}

.image-thumbnail {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-thumbnail:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image-thumbnail img {
  width: 100%;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.image-thumbnail:hover .overlay {
  opacity: 1;
}

.overlay-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 1.25rem;
  border: 2px solid white;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -40px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-image-wrapper {
  position: relative;
  overflow: auto;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  background: white;
}

.modal-ai-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
}

.modal-image {
  max-width: 100%;
  max-height: 75vh;
  display: block;
}

.modal-actions {
  margin-top: 1.5rem;
}

.download-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  text-decoration: none !important;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(var(--vp-c-brand-rgb), 0.3);
}

.download-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--vp-c-brand-rgb), 0.4);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .close-button {
    top: -50px;
    right: 0;
  }
  
  .modal-backdrop {
    padding: 1rem;
  }

  .image-modal-container {
    padding: 0.75rem;
  }
}
</style>
