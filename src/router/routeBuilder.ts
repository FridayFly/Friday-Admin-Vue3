import { RouterView, type RouteRecordRaw } from 'vue-router'
import { type Menu, MenuTypeEnum } from '@/stores/modules/CommonInfo'
const modules = import.meta.glob('/src/views/**/*.vue')

export function loadRouteView(component: string | null | undefined) {
  try {
    const key = Object.keys(modules).find((key) => {
      return key.includes(`${component}.vue`)
    })
    if (key) {
      return modules[key]
    }
    throw Error(`${component}组件无法找到，请检查组件路径是否正确`)
  } catch (error) {
    console.error(error)
    return RouterView
  }
}

function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https')
}
function buildRoute(menu: Menu): RouteRecordRaw {
  const routeRecord: RouteRecordRaw = {
    path: menu.url! == null ? '/' : menu.url,
    name: '' + menu.id,
    component: RouterView,
    meta: {
      title: menu.menuName,
      icon: menu.ico,
      isSinglePage: menu.isSinglePage
    }
  }

  switch (menu.menuType) {
    case MenuTypeEnum.FOLDER:
      routeRecord.component = RouterView
      break
    case MenuTypeEnum.PAGE:
      routeRecord.component = markRaw(loadRouteView(menu.componentPath))
      break
  }
  return routeRecord
}

export function buildRouteFromMenu(menus: Menu[]): RouteRecordRaw[] {
  const routers: Array<RouteRecordRaw> = []
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    if (menu.url !== null && isExternalLink(menu.url!)) {
      continue
    }
    const routeRecord = buildRoute(menu)

    if (menu.menuType == MenuTypeEnum.FOLDER && menu.children && menu.children.length > 0) {
      routeRecord.children = buildRouteFromMenu(menu.children)
    }
    routers.push(routeRecord)
  }

  return routers
}
