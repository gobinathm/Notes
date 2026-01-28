import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProgressTracker from './components/ProgressTracker.vue'
import ShareButtons from './components/ShareButtons.vue'
import ExportPDF from './components/ExportPDF.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('ProgressTracker', ProgressTracker)
    app.component('ShareButtons', ShareButtons)
    app.component('ExportPDF', ExportPDF)
  }
}
