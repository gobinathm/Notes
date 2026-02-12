<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import ExportPDF from './ExportPDF.vue'
import { defineAsyncComponent, computed, onMounted, onUnmounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const AIChatBot = defineAsyncComponent(() => import('./AIChatBot.vue'))

const { Layout } = DefaultTheme
const { frontmatter } = useData()
const route = useRoute()

const isStudyContent = computed(() => {
  const path = route.path
  // Show on certification study pages, not on index/overview pages
  return path.startsWith('/certifications/') && path !== '/certifications/' && path !== '/certifications'
})

const showShare = computed(() => {
  // Explicit frontmatter overrides path-based logic
  if (frontmatter.value.share === true) return true
  if (frontmatter.value.share === false) return false
  return isStudyContent.value
})

const showPdf = computed(() => {
  if (frontmatter.value.pdf === true) return true
  if (frontmatter.value.pdf === false) return false
  return isStudyContent.value
})

// Accordion sidebar: collapse other top-level groups when one is expanded
let isAccordionAction = false

function collapseSiblings(clicked: Element, level: string) {
  // level-0 items are each wrapped in a .group div inside #VPSidebarNav
  // level-1 items are siblings inside a .items div
  const container = level === 'level-0'
    ? document.querySelector('#VPSidebarNav')
    : clicked.parentElement
  if (!container) return

  const allItems = container.querySelectorAll(`.VPSidebarItem.${level}`)
  allItems.forEach((item) => {
    if (item !== clicked && !item.classList.contains('collapsed')) {
      const header = item.querySelector(':scope > .item') as HTMLElement
      header?.click()
    }
  })
}

function handleSidebarClick(e: MouseEvent) {
  if (isAccordionAction) return

  const target = e.target as HTMLElement

  // Check level-1 first (cert within a provider), then level-0 (provider groups)
  for (const level of ['level-1', 'level-0']) {
    const clicked = target.closest(`.VPSidebarItem.${level}`)
    if (!clicked) continue

    const itemDiv = clicked.querySelector(':scope > .item')
    if (!itemDiv?.contains(target)) continue

    requestAnimationFrame(() => {
      if (!clicked.classList.contains('collapsed')) {
        isAccordionAction = true
        collapseSiblings(clicked, level)
        isAccordionAction = false
      }
    })
    break
  }
}

onMounted(() => {
  document.addEventListener('click', handleSidebarClick, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleSidebarClick, true)
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="doc-actions" v-if="showShare || showPdf">
        <div class="doc-actions-row">
          <ExportPDF v-if="showPdf" />
        </div>
        <ShareButtons v-if="showShare" />
      </div>
    </template>
  </Layout>
  <ClientOnly>
    <AIChatBot />
  </ClientOnly>
</template>

<style scoped>
.doc-actions {
  margin-top: 2rem;
}

.doc-actions-row {
  margin-bottom: 1rem;
}
</style>
