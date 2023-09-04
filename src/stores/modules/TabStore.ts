import { defineStore } from 'pinia'

export interface TabItem {
  id: number
  title: string
  url: string
  ico?: string | null
}

export interface PageTab {
  tabList?: TabItem[] | null
}

export const PageTabStore = defineStore('page-tab', {
  state: (): PageTab => {
    return { tabList: [] }
  },
  getters: {},
  actions: {
    addTab() {
      const tabItem: TabItem = {
        id: 1,
        title: 'Dash board',
        url: '/home/aboutus'
      }

      this.tabList?.push(tabItem)
    },
    removeTab() {},
    removeOtherTab() {}
  }
})
