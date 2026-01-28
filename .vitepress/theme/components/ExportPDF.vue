<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, title } = useData()
const isExporting = ref(false)

const exportToPDF = async () => {
  if (typeof window === 'undefined') return

  isExporting.value = true

  try {
    // Dynamically import html2pdf (client-side only)
    const html2pdf = (await import('html2pdf.js')).default

    // Get the main content element
    const content = document.querySelector('.vp-doc')
    if (!content) {
      console.error('Content element not found')
      isExporting.value = false
      return
    }

    // Clone the content to avoid modifying the original
    const clonedContent = content.cloneNode(true) as HTMLElement

    // Remove elements we don't want in PDF
    const elementsToRemove = clonedContent.querySelectorAll(
      '.share-buttons, .export-pdf-wrapper, .vp-doc-footer, .edit-link, .prev-next, .doc-actions'
    )
    elementsToRemove.forEach(el => el.remove())

    // Apply print-friendly styles for PDF (dark text on white background)
    clonedContent.style.cssText = `
      background: white !important;
      color: #1a1a1a !important;
      padding: 20px !important;
    `

    // Fix all text elements to have dark color
    const allElements = clonedContent.querySelectorAll('*')
    allElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.color = '#1a1a1a'
      htmlEl.style.backgroundColor = 'transparent'
    })

    // Fix headings
    clonedContent.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.color = '#1a1a1a'
      htmlEl.style.borderColor = '#e5e5e5'
    })

    // Fix links
    clonedContent.querySelectorAll('a').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.color = '#3c8772'
    })

    // Fix code blocks
    clonedContent.querySelectorAll('pre, code').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.backgroundColor = '#f6f6f7'
      htmlEl.style.color = '#1a1a1a'
    })

    // Fix tables
    clonedContent.querySelectorAll('table').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.borderColor = '#e5e5e5'
    })
    clonedContent.querySelectorAll('th').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.backgroundColor = '#f6f6f7'
      htmlEl.style.color = '#1a1a1a'
    })
    clonedContent.querySelectorAll('td, th').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.borderColor = '#e5e5e5'
    })

    // Fix custom blocks (tips, warnings, etc.)
    clonedContent.querySelectorAll('.custom-block').forEach((el: Element) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.backgroundColor = '#f9f9f9'
      htmlEl.style.color = '#1a1a1a'
    })

    // Get page title for filename
    const pageTitle = frontmatter.value.title || title.value || 'document'
    const filename = pageTitle
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()

    // PDF options
    const options = {
      margin: [15, 15, 15, 15],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    // Generate PDF
    await html2pdf().set(options).from(clonedContent).save()

  } catch (error) {
    console.error('PDF export failed:', error)
  } finally {
    isExporting.value = false
  }
}
</script>

<template>
  <div class="export-pdf-wrapper">
    <button
      @click="exportToPDF"
      class="export-pdf-btn"
      :disabled="isExporting"
      :title="isExporting ? 'Generating PDF...' : 'Export this page as PDF'"
    >
      <svg v-if="!isExporting" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
      <svg v-else class="spinner" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
      <span>{{ isExporting ? 'Exporting...' : 'Export PDF' }}</span>
    </button>
  </div>
</template>

<style scoped>
.export-pdf-wrapper {
  display: inline-block;
}

.export-pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.export-pdf-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.export-pdf-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.export-pdf-btn:active:not(:disabled) {
  transform: translateY(0);
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Dark mode */
.dark .export-pdf-btn {
  background-color: var(--vp-c-brand-2);
}

.dark .export-pdf-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand-1);
}
</style>
