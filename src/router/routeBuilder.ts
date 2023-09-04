import type { RouteRecordRaw } from 'vue-router'
import { type Menu, MenuTypeEnum } from '@/stores/modules/CommonInfo'
function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https')
}
function buildRoute(menu: Menu): RouteRecordRaw {
  const menuComponent = () => import(/* @vite-ignore */ '../views/' + menu.componentPath + '.vue')
  const routeRecord: RouteRecordRaw = {
    path: menu.url!,
    name: '' + menu.id,
    component: menuComponent,
    meta: {
      title: menu.menuName,
      icon: menu.ico,
      isSinglePage: menu.isSinglePage
    }
  }
  return routeRecord
}

export function buildRouteFromMenu(menus: Menu[], routes: RouteRecordRaw[] = []): RouteRecordRaw[] {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    if (menu.url !== null && isExternalLink(menu.url!)) {
      continue
    }
    if (menu.menuType == MenuTypeEnum.FOLDER && menu.children && menu.children.length > 0) {
      buildRouteFromMenu(menu.children, routes)
    }
    if (menu.menuType == MenuTypeEnum.PAGE) {
      // fixme: 这里的componentPath的配置值有可能是无效的值，需要输出warning且不添加这条路由
      routes.push(buildRoute(menu))
    }
  }

  return routes
}
