import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/reset-password',
  name: 'User',
  meta: {
    title: '用户',
    icon: 'user'
  },
  children: [
    {
      path: 'reset-password',
      component: () => import('@/views/ResetPassword'),
      name: 'ResetPassword',
      meta: { title: '修改密码', icon: 'password' }
    }
  ]
}

export default userRouter
