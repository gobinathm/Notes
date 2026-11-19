<script setup lang="ts">
/**
 * Click-to-load Spotify episode (privacy: gobinath.com docs/DESIGN.md §5).
 * Nothing is requested from Spotify until the visitor clicks Play. Without JavaScript
 * the card is a plain link to the episode on Spotify.
 *
 * Usage in Markdown: <SpotifyEpisode episode="https://open.spotify.com/embed/episode/ID" />
 * (paste the embed URL Spotify gives you; open.spotify.com and creators.spotify.com both work)
 */
import { computed, ref } from 'vue'

const props = defineProps<{ episode: string; title?: string }>()
const loaded = ref(false)

// The page link is the embed URL without "/embed" and without tracking query params
const listenUrl = computed(() => props.episode.replace('/embed/', '/').replace('/embed', '').split('?')[0])
const label = computed(() => props.title || 'Audio refresher')
</script>

<template>
  <div class="spotify-episode">
    <iframe
      v-if="loaded"
      :src="episode"
      :title="`${label} on Spotify`"
      width="100%"
      height="152"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>
    <a
      v-else
      class="spotify-card"
      :href="listenUrl"
      target="_blank"
      rel="noopener"
      @click.prevent="loaded = true"
    >
      <span class="play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M8 5.5v13l11-6.5z" /></svg>
      </span>
      <span class="text">
        <span class="label">{{ label }}</span>
        <span class="hint">Play episode · loads the Spotify player</span>
      </span>
    </a>
  </div>
</template>

<style scoped>
.spotify-episode {
  margin: 16px 0;
}
.spotify-episode iframe {
  display: block;
  border-radius: 12px;
}
.spotify-card {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 96px;
  padding: 18px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  transition: border-color 0.2s;
}
.spotify-card:hover {
  border-color: var(--gobi-y);
  background: var(--vp-c-bg-soft) !important;
}
.play {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gobi-y);
  color: var(--gobi-ink);
}
.text {
  display: grid;
  gap: 4px;
}
.label {
  font-family: var(--gobi-display);
  font-weight: 700;
  font-size: 1.05rem;
}
.hint {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}
</style>
