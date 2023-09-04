import type { Router, RouteRecordRaw } from 'vue-router'
import { PageEnum } from './pageEnum'
import { userSessionStore } from '@/stores/modules/UserSessionInfo'
import { customerCommonInfoStore } from '@/stores/modules/CommonInfo'
import { NotFoundPageRoute } from './routers'
const whitePathList = [PageEnum.LOGIN]

export function applyRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userSession = userSessionStore()
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    // If user is not sign in, redirect to login page
    if (userSession.accessToken === undefined || userSession.accessToken === '') {
      const redirectData: { path: string; replace: boolean } = {
        path: PageEnum.LOGIN,
        replace: true
      }
      return next(redirectData)
    }

    // Check wether the router is build and added
    const commonInfo = customerCommonInfoStore()
    if (!commonInfo.getRouteAdded) {
      // If router is not added, do added
      const routes = await commonInfo.buildRoutes()
      routes.forEach((route) => {
        if (route.meta!.isSinglePage) {
          router.addRoute(route as unknown as RouteRecordRaw)
        } else {
          router.addRoute('defaultRoute', route as unknown as RouteRecordRaw)
        }
      })
      commonInfo.setRouteAdded(true)
      // Borwser refresh route redirect
      router.push(to.path)
    }

    // If user signed in and to path is '/', take first menu page and redirect to this page
    if (to.path == '/') {
      if (commonInfo.routes.length > 0) {
        next(commonInfo.routes[0])
        return
      }
      // return 404
    }
    next()
  })
}
