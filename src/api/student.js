import request from '@/utils/request'

// 学生签到接口
export function studentSignIn(data) {
  return request({
    url: '/student/sign-in',
    method: 'post',
    data
  })
}
