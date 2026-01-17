import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProgressTracker from './components/ProgressTracker.vue'
import ShareButtons from './components/ShareButtons.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('ProgressTracker', ProgressTracker)
    app.component('ShareButtons', ShareButtons)
  }
}
