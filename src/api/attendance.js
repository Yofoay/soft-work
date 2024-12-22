import request from '@/utils/request'

export function generateQRCode() {
  return request({
    url: '/attendance/qrcode', // 获取二维码的接口
    method: 'get'
  })
}

export function studentSignIn(data) {
  return request({
    url: '/attendance/sign-in', // 学生签到接口
    method: 'post',
    data
  })
}

export function validateSignInTime(data) {
  return request({
    url: '/attendance/validate-time', // 验证签到时间的接口
    method: 'post',
    data
  })
}

export function getWeeklyAttendanceData() {
  return request({
    url: '/attendance/weekly', // 后端接口路径
    method: 'get'
  })
}
// 获取签到统计数据
export function fetchAttendanceStatistics(params) {
  return request({
    url: '/attendance/statistics',
    method: 'get',
    params
  })
}

// 获取签到记录
export function fetchAttendanceRecords(params) {
  return request({
    url: '/attendance/records',
    method: 'get',
    params
  })
}
// 更新签到状态
export function updateAttendanceStatus(data) {
  return request({
    url: '/attendance/update-status',
    method: 'post',
    data
  })
}
