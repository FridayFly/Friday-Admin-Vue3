import http from '@/utils/http'

export function login(data: any) {
  return http.post({
    url: 'manage/account/login',
    data,
    ignoreToken: true
  })
}

export function logout() {
  return http.get({
    url: '/manage/account/logout'
  })
}
