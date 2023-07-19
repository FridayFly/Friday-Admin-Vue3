import { defineStore } from 'pinia'

export type SiteConfigType = {
  title: string
  description: string
  copyright: string
}

const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_DESC, VITE_GLOB_APP_COPYTIGHT } = import.meta.env

export const siteConfigStore = defineStore('site-config', {
  state: (): Readonly<SiteConfigType> => ({
    title: VITE_GLOB_APP_TITLE,
    description: VITE_GLOB_APP_DESC,
    copyright: VITE_GLOB_APP_COPYTIGHT
  }),
  getters: {
    getCopyright: (state): string => {
      const currentDate = new Date()
      const year: number = currentDate.getFullYear()
      console.log('get 被调用了')
      return state.copyright.replace(/\{year\}/g, year.toString())
    }
  }
})
