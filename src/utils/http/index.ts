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

function showAlertMsgBox(message: string, callback?: () => void) {
  ElMessageBox.alert(message, '', {
    type: 'warning',
    icon: 'WarningFilled',
    callback
  })
}

function applyAccessToken(config: RequestConfig): RequestConfig {
  if (config.ignoreToken === undefined || !config.ignoreToken) {
    if (userSession.accessToken == '') {
      const controller = new AbortController()
      const cfg = {
        ...config,
        signal: controller.signal
      }
      controller.abort('Request was abort, because can not get access token.')
      return cfg
    }
    config.headers!.Authorization = `Bearer ${userSession.accessToken}`
  }
  return config
}

const initOptions: InitOptions = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout:
    import.meta.env.VITE_API_TIMEOUT == undefined
      ? DEFAULT_API_TIMEOUT
      : import.meta.env.VITE_API_TIMEOUT,
  requestInterceptorHook: (config: RequestConfig) => {
    config = applyAccessToken(config)
    return config
  },
  requestInterceptorErrorHook: (error) => {
    console.log('request error', error)
  },
  responseInterceptorsHook: (response) => {
    if (response.data.code == '5001') {
      showErrorMsgbox('', response.data.msg)
    }
    if (response.data.code == '1005') {
      userSession.accessToken = ''
      showAlertMsgBox(response.data.msg, () => {
        window.location.href = '/login'
      })
    }
    if (response.data.code == '1002') {
      window.location.href = '/login'
    }
    return response.data
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
