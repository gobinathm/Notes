<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, ref } from 'vue'

const { frontmatter, title, site } = useData()
const route = useRoute()

const copied = ref(false)

const pageUrl = computed(() => {
  const path = route.path
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }
  return `${site.value.base}${path}`
})

const pageTitle = computed(() => {
  return frontmatter.value.title || title.value || 'Study Notes'
})

const encodedUrl = computed(() => encodeURIComponent(pageUrl.value))
const encodedTitle = computed(() => encodeURIComponent(pageTitle.value))

const shareLinks = computed(() => ({
  twitter: `https://twitter.com/intent/tweet?url=${encodedUrl.value}&text=${encodedTitle.value}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`,
  reddit: `https://reddit.com/submit?url=${encodedUrl.value}&title=${encodedTitle.value}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`,
  email: `mailto:?subject=${encodedTitle.value}&body=Check out these study notes: ${encodedUrl.value}`
}))

const copyLink = async () => {
  if (typeof navigator !== 'undefined') {
    await navigator.clipboard.writeText(pageUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const openShare = (url: string) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
  }
}
</script>

<template>
  <div class="share-buttons">
    <span class="share-label">Share this page:</span>
    <div class="share-icons">
      <button
        @click="openShare(shareLinks.twitter)"
        class="share-btn twitter"
        title="Share on Twitter/X"
        aria-label="Share on Twitter"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      <button
        @click="openShare(shareLinks.linkedin)"
        class="share-btn linkedin"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>
      <button
        @click="openShare(shareLinks.reddit)"
        class="share-btn reddit"
        title="Share on Reddit"
        aria-label="Share on Reddit"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      </button>
      <button
        @click="openShare(shareLinks.facebook)"
        class="share-btn facebook"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      <a
        :href="shareLinks.email"
        class="share-btn email"
        title="Share via Email"
        aria-label="Share via Email"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
      <button
        @click="copyLink"
        class="share-btn copy"
        :title="copied ? 'Copied!' : 'Copy link'"
        :aria-label="copied ? 'Link copied' : 'Copy link'"
      >
        <svg v-if="!copied" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.share-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.share-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.share-icons {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: white;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-decoration: none;
}

.share-btn:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.25);
}

.share-btn:active {
  transform: translateY(0);
}

.share-btn.twitter {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.share-btn.twitter:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.share-btn.linkedin {
  background: rgba(10, 102, 194, 0.2);
  box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
}
.share-btn.linkedin:hover {
  background: rgba(10, 102, 194, 0.35);
  box-shadow: 0 6px 20px rgba(10, 102, 194, 0.25);
}

.share-btn.reddit {
  background: rgba(255, 69, 0, 0.2);
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.1);
}
.share-btn.reddit:hover {
  background: rgba(255, 69, 0, 0.35);
  box-shadow: 0 6px 20px rgba(255, 69, 0, 0.25);
}

.share-btn.facebook {
  background: rgba(24, 119, 242, 0.2);
  box-shadow: 0 4px 12px rgba(24, 119, 242, 0.1);
}
.share-btn.facebook:hover {
  background: rgba(24, 119, 242, 0.35);
  box-shadow: 0 6px 20px rgba(24, 119, 242, 0.25);
}

.share-btn.email {
  background: rgba(107, 114, 128, 0.2);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.1);
}
.share-btn.email:hover {
  background: rgba(107, 114, 128, 0.35);
  box-shadow: 0 6px 20px rgba(107, 114, 128, 0.25);
}

.share-btn.copy {
  background: rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
}
.share-btn.copy:hover {
  background: rgba(16, 185, 129, 0.35);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25);
}

/* Light mode: slightly more opaque for visibility */
:not(.dark) .share-btn {
  border-color: rgba(0, 0, 0, 0.08);
}
:not(.dark) .share-btn.twitter { color: #000; }
:not(.dark) .share-btn.linkedin { color: #0A66C2; }
:not(.dark) .share-btn.reddit { color: #FF4500; }
:not(.dark) .share-btn.facebook { color: #1877F2; }
:not(.dark) .share-btn.email { color: #6B7280; }
:not(.dark) .share-btn.copy { color: #10b981; }

@media (max-width: 640px) {
  .share-buttons {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .share-icons {
    flex-wrap: wrap;
  }
}
</style>
