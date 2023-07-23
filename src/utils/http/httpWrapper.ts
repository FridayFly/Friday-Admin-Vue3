import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { isFunction } from 'lodash'

import type { AxiosInstance, AxiosResponse } from 'axios'

export interface InitOptions extends AxiosRequestConfig {
  requestInterceptorHook?: (config: RequestConfig) => RequestConfig
  requestInterceptorErrorHook?: (error: any) => any
  responseInterceptorsHook?: (response: AxiosResponse<any>) => AxiosResponse<any>
  responseInterceptorsErrorHook?: (error: AxiosError) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  showGlobalErrorMsgBox?: boolean
}

export default class HttpWrapper {
  private axiosInstance: AxiosInstance
  private initOptions: InitOptions
  constructor(initOptions: InitOptions) {
    this.axiosInstance = axios.create(initOptions)
    this.initOptions = initOptions
    this.applyInterceptors()
  }

  private applyInterceptors(): void {
    const {
      requestInterceptorHook,
      requestInterceptorErrorHook,
      responseInterceptorsHook,
      responseInterceptorsErrorHook
    } = this.initOptions
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (requestInterceptorHook && isFunction(requestInterceptorErrorHook)) {
          requestInterceptorHook(config)
        }
        return config
      },
      (error) => {
        if (requestInterceptorErrorHook && isFunction(requestInterceptorErrorHook)) {
          requestInterceptorErrorHook(error)
        }
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (config) => {
        if (responseInterceptorsHook && isFunction(responseInterceptorsHook)) {
          return responseInterceptorsHook(config)
        }
        return config
      },
      (error) => {
        if (responseInterceptorsErrorHook && isFunction(responseInterceptorsErrorHook)) {
          responseInterceptorsErrorHook(error)
        }
        return Promise.reject(error)
      }
    )
  }

  request(params: AxiosRequestConfig, options?: RequestConfig): Promise<any> {
    let config: RequestConfig = params
    if (options != undefined) {
      config = options
      config.params = params
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<any>>(config)
        .then((res: AxiosResponse<any>) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
