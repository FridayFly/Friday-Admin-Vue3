import { defineStore } from 'pinia'

export type userSessionInfo = {
  accessToken: string | undefined
  accountName: string | undefined
}

export const userSessionStore = defineStore('user-info', {
  state: (): userSessionInfo => ({
    accessToken: undefined,
    accountName: undefined
  }),
  actions: {
    async cleanSession() {
      this.$reset()
    }
  },
  persist: {
    storage: sessionStorage
  }
})
