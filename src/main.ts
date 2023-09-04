import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { initStore } from './stores'
import { loadIcon } from '@/components/icon'
import './styles/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
// 初始化pinia store
initStore(app)
// 挂载路由
setupRouter(app)
// 加载icon图标
loadIcon(app)

app.mount('#app')
