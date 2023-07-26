import HttpWrapper from './httpWrapper'
import type { RequestConfig, InitOptions } from './httpWrapper'
import { userSessionStore } from '@/stores/modules/UserSessionInfo'
const userSession = userSessionStore()

const DEFAULT_API_TIMEOUT = 3000

function showErrorMsgbox(code: string, message: string) {
  ElMessageBox.alert(message, '系统错误', {
    dangerouslyUseHTMLString: true,
    type: 'error',
    icon: 'CircleCloseFilled'
  })
}

const initOptions: InitOptions = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout:
    import.meta.env.VITE_API_TIMEOUT == undefined
      ? DEFAULT_API_TIMEOUT
      : import.meta.env.VITE_API_TIMEOUT,
  requestInterceptorHook: (config: RequestConfig) => {
    // todo 加token
    console.log('request config', config)
    if (config.ignoreToken === undefined || !config.ignoreToken) {
      config.headers!.Authorization = `Bearer ${userSession.accessToken}`
    }
    return config
  },
  requestInterceptorErrorHook: (error) => {
    console.log('request error', error)
  },
  responseInterceptorsHook: (response) => {
    if (response.data.code == '5001') {
      showErrorMsgbox('', response.data.msg)
    } else {
      return response.data
    }
  },
  responseInterceptorsErrorHook(error: any) {
    // TODO:服务器端错误都会走到这里，非2xx的错误信息,需要弹框提示
    const requestConfig = error.config
    if (requestConfig.showGlobalErrorMsgBox == undefined || requestConfig.showGlobalErrorMsgBox) {
      showErrorMsgbox('', error.message)
    }
    console.log('response error', error)
  }
}

export default new HttpWrapper(initOptions)
