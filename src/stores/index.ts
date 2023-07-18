import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const storeInstance = createPinia()

export function initStore(app: App<Element>) {
  storeInstance.use(piniaPluginPersistedstate)
  app.use(storeInstance)
}

export { storeInstance }
