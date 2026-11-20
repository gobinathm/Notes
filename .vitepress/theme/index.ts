// Without VitePress's bundled Inter: the brand fonts are self-hosted below (gobinath.com docs/DESIGN.md §3)
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import '@fontsource-variable/jetbrains-mono'
import './custom.css'
import { watch } from 'vue'
import { useData } from 'vitepress'
import ProgressTracker from './components/ProgressTracker.vue'
import ShareButtons from './components/ShareButtons.vue'
import ExportPDF from './components/ExportPDF.vue'
import CustomLayout from './components/CustomLayout.vue'
import ImageModal from './components/ImageModal.vue'
import AIAudioPlayer from './components/AIAudioPlayer.vue'
import AITag from './components/AITag.vue'
import Flashcard from './components/Flashcard.vue'
import FlashcardDeck from './components/FlashcardDeck.vue'
import ExamMeta from './components/ExamMeta.vue'
import SpotifyEpisode from './components/SpotifyEpisode.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  setup() {
    // Keep the browser UI colour in step with the theme toggle
    const { isDark } = useData()
    watch(isDark, (dark) => {
      if (typeof document === 'undefined') return
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0b0a' : '#f7f6f0')
    })
  },
  enhanceApp({ app }: { app: any }) {
    app.component('ProgressTracker', ProgressTracker)
    app.component('ShareButtons', ShareButtons)
    app.component('ExportPDF', ExportPDF)
    app.component('Flashcard', Flashcard)
    app.component('FlashcardDeck', FlashcardDeck)
    app.component('ImageModal', ImageModal)
    app.component('AIAudioPlayer', AIAudioPlayer)
    app.component('AITag', AITag)
    app.component('ExamMeta', ExamMeta)
    app.component('SpotifyEpisode', SpotifyEpisode)
  }
}
