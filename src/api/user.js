import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/es/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/es/v1/user/info',
    method: 'get',
    headers: { Authorization: `Bearer ${token}` }
  })
}

export function logout() {
  return request({
    url: '/api/es/v1/logout',
    method: 'post'
  })
}
