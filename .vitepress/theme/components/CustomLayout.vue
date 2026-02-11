<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import ExportPDF from './ExportPDF.vue'
import { defineAsyncComponent, computed } from 'vue'
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
