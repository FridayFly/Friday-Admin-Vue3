import * as Icons from '@element-plus/icons-vue'
import type { App } from 'vue'

export function loadIcon(app: App<Element>) {
  for (const [, component] of Object.entries(Icons)) {
    app.component(component.name, component)
  }
}

export const EL_ICON_PREFIX = 'el-'
export const LOCAL_ICON_PREFIX = 'local-'
