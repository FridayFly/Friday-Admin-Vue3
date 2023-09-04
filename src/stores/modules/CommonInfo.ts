import { defineStore } from 'pinia'
import { getCommonInfo } from '@/api/common/commonApi'
import type { RouteRecordRaw } from 'vue-router'
import { buildRouteFromMenu } from '@/router/routeBuilder'

export enum MenuTypeEnum {
  // 登录
  FOLDER = 'FOLDER',
  PAGE = 'PAGE'
}

export interface Menu {
  id: number
  menuName: string
  url?: string | null
  target?: string | null
  ico?: string | null
  menuType: MenuTypeEnum
  show: boolean
  children?: Menu[] | null
  isSinglePage?: boolean | null
  componentPath?: string | null
}

export interface CustomerCommonInfo {
  accountId: number
  accountName: string | null
  menus: Menu[]
  routes: RouteRecordRaw[]
  routeAdded: boolean | false
}

export const customerCommonInfoStore = defineStore('customer-common-info', {
  state: (): CustomerCommonInfo => {
    return { accountId: 0, accountName: null, menus: [], routes: [], routeAdded: false }
  },
  getters: {
    getRouteAdded(): boolean {
      return this.routeAdded
    }
  },
  actions: {
    storeApiData(apiData: any) {
      this.$patch(apiData)
    },
    setRouteAdded(added: boolean) {
      this.routeAdded = added
    },
    async fetchCommonInfo() {
      const apiData = await getCommonInfo()
      if (apiData.code == '0') {
        this.storeApiData(apiData.data)
      }
    },
    async buildRoutes(): Promise<RouteRecordRaw[]> {
      await this.fetchCommonInfo()
      this.routes = buildRouteFromMenu(this.menus)
      return this.routes
    }
  }
})
