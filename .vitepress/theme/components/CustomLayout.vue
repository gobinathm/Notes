<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ShareButtons from './ShareButtons.vue'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <ShareButtons v-if="frontmatter.share !== false" />
    </template>
  </Layout>
</template>
