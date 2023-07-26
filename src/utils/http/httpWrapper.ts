import axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { isFunction } from 'lodash'

export interface InitOptions extends AxiosRequestConfig {
  requestInterceptorHook?: (config: RequestConfig) => RequestConfig
  requestInterceptorErrorHook?: (error: any) => any
  responseInterceptorsHook?: (response: AxiosResponse<any>) => AxiosResponse<any>
  responseInterceptorsErrorHook?: (error: AxiosError) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  showGlobalErrorMsgBox?: boolean
  ignoreToken?: boolean
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

  request(params: RequestConfig): Promise<any> {
    console.log('request|', params)
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<any>>(params)
        .then((res: AxiosResponse<any>) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  post(params: RequestConfig): Promise<any> {
    params.method = 'POST'
    return this.request(params)
  }

  get(params: RequestConfig): Promise<any> {
    params.method = 'GET'
    return this.request(params)
  }
}
