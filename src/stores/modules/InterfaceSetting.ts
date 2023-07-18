import { defineStore } from 'pinia'

export type InterfaceSettingType = {
  isCollapse: boolean
}

export const interfaceSettingStore = defineStore('interface-setting', {
  state: (): InterfaceSettingType => ({
    isCollapse: false
  }),
  actions: {
    toggleMenuCollapse(toggle?: boolean) {
      this.isCollapse = toggle ?? !this.isCollapse
    }
  }
})
