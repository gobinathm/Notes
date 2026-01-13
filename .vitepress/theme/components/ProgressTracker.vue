<template>
  <div class="progress-tracker">
    <div class="progress-header">
      <h3>{{ title }}</h3>
      <div class="progress-stats">
        <span class="progress-count">{{ completedCount }}/{{ items.length }}</span>
        <span class="progress-percentage">{{ percentage }}%</span>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: percentage + '%' }"></div>
    </div>

    <div class="progress-items">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="progress-item"
        :class="{ completed: isCompleted(item.id) }"
      >
        <label>
          <input
            type="checkbox"
            :checked="isCompleted(item.id)"
            @change="toggleItem(item.id)"
          />
          <span>{{ item.label }}</span>
        </label>
        <ul v-if="item.children && item.children.length > 0" class="progress-subitems">
          <li
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            :class="{ completed: isCompleted(child.id) }"
          >
            <label>
              <input
                type="checkbox"
                :checked="isCompleted(child.id)"
                @change="toggleItem(child.id)"
              />
              <span>{{ child.label }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div class="progress-actions">
      <button @click="resetProgress" class="reset-button">Reset Progress</button>
    </div>

    <div class="progress-note">
      <p>💾 Progress is saved in your browser's local storage. Clearing your browser data will reset your progress.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Study Progress'
  },
  storageKey: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const completedItems = ref(new Set())

// Load progress from localStorage
onMounted(() => {
  const stored = localStorage.getItem(props.storageKey)
  if (stored) {
    try {
      completedItems.value = new Set(JSON.parse(stored))
    } catch (e) {
      console.error('Failed to load progress:', e)
    }
  }
})

// Save progress to localStorage
const saveProgress = () => {
  localStorage.setItem(props.storageKey, JSON.stringify([...completedItems.value]))
}

// Check if item is completed
const isCompleted = (id) => {
  return completedItems.value.has(id)
}

// Toggle item completion
const toggleItem = (id) => {
  if (completedItems.value.has(id)) {
    completedItems.value.delete(id)
  } else {
    completedItems.value.add(id)
  }
  saveProgress()
}

// Calculate total items (including children)
const totalItems = computed(() => {
  let count = 0
  props.items.forEach(item => {
    count++
    if (item.children) {
      count += item.children.length
    }
  })
  return count
})

// Calculate completed count
const completedCount = computed(() => {
  return completedItems.value.size
})

// Calculate percentage
const percentage = computed(() => {
  if (totalItems.value === 0) return 0
  return Math.round((completedCount.value / totalItems.value) * 100)
})

// Reset progress
const resetProgress = () => {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    completedItems.value.clear()
    saveProgress()
  }
}
</script>

<style scoped>
.progress-tracker {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.progress-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.progress-percentage {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.progress-bar-container {
  height: 8px;
  background-color: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-items {
  margin: 1rem 0;
}

.progress-item {
  margin: 0.75rem 0;
}

.progress-item label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5;
}

.progress-item input[type="checkbox"] {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.progress-item.completed label span {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.progress-subitems {
  list-style: none;
  padding-left: 2rem;
  margin: 0.5rem 0;
}

.progress-subitems li {
  margin: 0.5rem 0;
}

.progress-subitems li label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.progress-subitems li input[type="checkbox"] {
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  cursor: pointer;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.progress-subitems li.completed label span {
  text-decoration: line-through;
  color: var(--vp-c-text-3);
}

.progress-actions {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.reset-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.reset-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.progress-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 4px;
}

.progress-note p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .progress-tracker {
    padding: 1rem;
  }

  .progress-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .progress-stats {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
