const attendanceRouter = [
  {
    path: '/attendance',
    component: () => import('@/views/attendance/Attendance'),
    name: 'Attendance',
    meta: { title: '签到页面', icon: 'edit', noCache: true }
  }
]

export default attendanceRouter
