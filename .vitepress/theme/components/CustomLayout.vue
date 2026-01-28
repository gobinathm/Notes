<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import ExportPDF from './ExportPDF.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="doc-actions" v-if="frontmatter.share !== false || frontmatter.pdf !== false">
        <div class="doc-actions-row">
          <ExportPDF v-if="frontmatter.pdf !== false" />
        </div>
        <ShareButtons v-if="frontmatter.share !== false" />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.doc-actions {
  margin-top: 2rem;
}

.doc-actions-row {
  margin-bottom: 1rem;
}
</style>
