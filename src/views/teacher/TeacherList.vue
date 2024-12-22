<template>
  <div class="teacher-list">
    <el-card class="box-card">
      <h3>查看教师</h3>
      <el-table :data="teacherList" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="username" label="用户名" />
      </el-table>
      <el-pagination
        v-show="total > 0"
        :current-page="pagination.current"
        :page-size="pagination.size"
        :total="total"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
import { queryTeachers } from '@/api/teacherManagement'

export default {
  data() {
    return {
      teacherList: [],
      total: 0,
      pagination: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.fetchTeachers()
  },
  methods: {
    fetchTeachers() {
      queryTeachers({ current: this.pagination.current, size: this.pagination.size })
        .then(response => {
          this.teacherList = response.records
          this.total = response.total
        })
        .catch(error => {
          this.$message.error('获取教师列表失败')
          console.error(error)
        })
    },
    handlePageChange(page) {
      this.pagination.current = page
      this.fetchTeachers()
    }
  }
}
</script>

<style scoped>
.teacher-list {
  padding: 20px;
}
</style>
