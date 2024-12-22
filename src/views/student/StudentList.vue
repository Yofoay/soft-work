<template>
  <div class="student-list">
    <el-card class="box-card">
      <h3>查看学生</h3>
      <el-table :data="studentList" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="studentNo" label="学号" />
        <el-table-column prop="email" label="邮箱" />
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
import { queryStudents } from '@/api/studentManagement'

export default {
  data() {
    return {
      studentList: [],
      total: 0,
      pagination: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.fetchStudents()
  },
  methods: {
    fetchStudents() {
      queryStudents({ current: this.pagination.current, size: this.pagination.size })
        .then(response => {
          this.studentList = response.records
          this.total = response.total
        })
        .catch(error => {
          this.$message.error('获取学生列表失败')
          console.error(error)
        })
    },
    handlePageChange(page) {
      this.pagination.current = page
      this.fetchStudents()
    }
  }
}
</script>
