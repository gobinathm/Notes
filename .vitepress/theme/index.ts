import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProgressTracker from './components/ProgressTracker.vue'
import ShareButtons from './components/ShareButtons.vue'
import ExportPDF from './components/ExportPDF.vue'
import CustomLayout from './components/CustomLayout.vue'
import ImageModal from './components/ImageModal.vue'
import AIAudioPlayer from './components/AIAudioPlayer.vue'
import AITag from './components/AITag.vue'
import AIChatBot from './components/AIChatBot.vue'

import Flashcard from './components/Flashcard.vue'
import FlashcardDeck from './components/FlashcardDeck.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }: { app: any }) {
    app.component('ProgressTracker', ProgressTracker)
    app.component('ShareButtons', ShareButtons)
    app.component('ExportPDF', ExportPDF)
    app.component('Flashcard', Flashcard)
    app.component('FlashcardDeck', FlashcardDeck)
    app.component('ImageModal', ImageModal)
    app.component('AIAudioPlayer', AIAudioPlayer)
    app.component('AITag', AITag)
    app.component('AIChatBot', AIChatBot)
  }
}
