import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/api/es/v1/login', // 后端提供的登录接口路径
    method: 'post',
    data
  })
}
