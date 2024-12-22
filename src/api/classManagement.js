import request from '@/utils/request'

// 获取班级列表
export function getClassList() {
  return request({
    url: '/class/list',
    method: 'get'
  })
}

// 创建班级
export function createClass(data) {
  return request({
    url: '/class/create',
    method: 'post',
    data
  })
}

// 更新班级信息
export function updateClass(data) {
  return request({
    url: '/class/update',
    method: 'put',
    data
  })
}

// 删除班级
export function deleteClass(data) {
  return request({
    url: '/class/delete',
    method: 'delete',
    data
  })
}

// 添加学生到班级
export function addStudentToClass(data) {
  return request({
    url: '/class/add-student',
    method: 'post',
    data
  })
}
