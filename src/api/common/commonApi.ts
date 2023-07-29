import http from '@/utils/http'

export function getCommonInfo() {
  return http.get({
    url: 'manage/common/info'
  })
}
