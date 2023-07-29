import { defineStore } from 'pinia'

export interface Menu {
  id: number
  menuName: string
  url?: string | null
  target?: string | null
  ico?: string | null
  menuType: string
  show: boolean
  children?: Menu[] | null
}

export interface CustomerCommonInfo {
  accountId: number
  accountName: string | null
  menus: Menu[]
}

export const CustomerCommonInfoStore = defineStore('customer-common-info', {
  state: (): CustomerCommonInfo => {
    return { accountId: 0, accountName: null, menus: [] }
  },
  actions: {
    loadApiData(apiData: any) {
      this.$patch(apiData)
    }
  }
})
