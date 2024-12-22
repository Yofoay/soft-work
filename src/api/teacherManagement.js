import request from '@/utils/request'

// 添加教师
export function addTeacher(data) {
  return request({
    url: '/api/es/v1/teacher/save',
    method: 'post',
    data
  })
}

// 查询教师列表（分页）
export function queryTeachers(params) {
  return request({
    url: '/api/es/v1/teacher/query',
    method: 'get',
    params
  })
}
