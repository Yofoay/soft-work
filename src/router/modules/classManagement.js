import Layout from '@/layout'

const classManagementRouter = [
  {
    path: '/class-management',
    component: Layout,
    redirect: '/class-management/index',
    name: 'ClassManagement',
    meta: { title: '班级管理', icon: 'tree' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/classManagement/ClassManagement'),
        name: 'ClassManagementPage',
        meta: { title: '班级管理', icon: 'edit' }
      }
    ]
  }
]

export default classManagementRouter
