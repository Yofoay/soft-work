import request from '@/utils/request'

// 获取班级列表
export function getClassList() {
  return request({
    url: '/class/list',
    method: 'get'
  })
}

// 获取学生列表
export function getStudentList(classId) {
  return request({
    url: `/class/${classId}/students`,
    method: 'get'
  })
}

// 添加学生
export function addStudent(data) {
  return request({
    url: '/api/es/v1/student/save', // 使用后端提供的路径
    method: 'post',
    data
  })
}

// 删除学生
export function deleteStudent(classId, studentId) {
  return request({
    url: `/class/${classId}/student/${studentId}`,
    method: 'delete'
  })
}
// 分页查询学生
export function queryStudents(params) {
  return request({
    url: '/api/es/v1/student/query',
    method: 'get',
    params
  })
}

