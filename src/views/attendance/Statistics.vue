<template>
  <div class="attendance-statistics">
    <el-card class="box-card">
      <h3>签到统计</h3>

      <!-- 筛选条件 -->
      <el-form :model="filters" inline class="filter-form">
        <el-form-item label="选择班级">
          <el-select v-model="filters.classId" placeholder="请选择班级" @change="fetchAttendanceRecords">
            <el-option
              v-for="classItem in classList"
              :key="classItem.id"
              :label="classItem.name"
              :value="classItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="filters.date"
            type="date"
            placeholder="选择日期"
            @change="fetchAttendanceRecords"
          />
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <!-- 学生签到记录 -->
      <h4>签到记录</h4>
      <el-table :data="attendanceRecords" style="width: 100%">
        <el-table-column prop="studentId" label="学生ID" width="150" />
        <el-table-column prop="studentName" label="学生姓名" />
        <el-table-column prop="status" label="签到状态">
          <template #default="scope">
            <el-select v-model="scope.row.status" placeholder="请选择状态" @change="updateAttendance(scope.row)">
              <el-option label="已签到" value="已签到" />
              <el-option label="迟到" value="迟到" />
              <el-option label="旷课" value="旷课" />
              <el-option label="补签" value="补签" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="签到时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getClassList } from '@/api/classManagement'
import { fetchAttendanceRecords, updateAttendanceStatus } from '@/api/attendance'

export default {
  data() {
    return {
      filters: {
        classId: '',
        date: ''
      },
      classList: [],
      attendanceRecords: []
    }
  },
  mounted() {
    this.fetchClassList()
  },
  methods: {
    // 获取班级列表
    fetchClassList() {
      getClassList()
        .then((response) => {
          this.classList = response.data
        })
        .catch((error) => {
          this.$message.error('获取班级列表失败')
          console.error(error)
        })
    },
    // 获取签到记录
    fetchAttendanceRecords() {
      if (!this.filters.classId || !this.filters.date) {
        this.$message.warning('请先选择班级和日期')
        return
      }

      fetchAttendanceRecords(this.filters)
        .then((response) => {
          this.attendanceRecords = response.data
        })
        .catch((error) => {
          this.$message.error('获取签到记录失败')
          console.error(error)
        })
    },
    // 更新签到状态
    updateAttendance(record) {
      updateAttendanceStatus({
        studentId: record.studentId,
        classId: this.filters.classId,
        date: this.filters.date,
        status: record.status
      })
        .then(() => {
          this.$message.success('签到状态更新成功')
        })
        .catch((error) => {
          this.$message.error('更新签到状态失败')
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.attendance-statistics {
  padding: 20px;
}

.filter-form {
  margin-bottom: 20px;
}
</style>
