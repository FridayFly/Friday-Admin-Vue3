import http from '@/utils/http'
import type { RequestConfig } from '@/utils/http/httpWrapper'

export function login(data: any, options?: RequestConfig) {
  return http.request(
    {
      url: 'manage/account/login',
      method: 'POST',
      data
    },
    options
  )
}
