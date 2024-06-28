import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CIcon } from '@coreui/icons-vue'
import {
  cilArrowBottom,
  cilArrowRight,
  cilArrowTop,
  cilBan,
  cilBasket,
  cilBell,
  cilCalculator,
  cilCalendar,
  cilCheckCircle,
  cilWarning,
  cilToggleOff,
  cilToggleOn
} from '@coreui/icons'

const icons = {
  cilArrowBottom,
  cilArrowRight,
  cilArrowTop,
  cilBan,
  cilBasket,
  cilBell,
  cilCalculator,
  cilCalendar,
  cilCheckCircle,
  cilWarning,
  cilToggleOff,
  cilToggleOn
}
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)
app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
