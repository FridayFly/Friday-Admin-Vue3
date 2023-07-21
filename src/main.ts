import './styles/index.scss'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { initStore } from './stores'
import { loadIcon } from '@/components/icon'
import 'virtual:svg-icons-register'

const app = createApp(App)
initStore(app)
app.use(router)
loadIcon(app)
app.mount('#app')
