import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers'
import { applyRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export function setupRouter(app: App) {
  app.use(router)
  // 初始化导航守卫
  applyRouterGuard(router)
}

export default router
