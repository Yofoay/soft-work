<template>
  <div class="student-management">
    <el-card class="box-card">
      <h3>学生管理</h3>

      <!-- 添加学生表单 -->
      <el-form :model="studentForm" ref="studentForm" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentForm.name" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="studentForm.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="studentForm.studentNo" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="studentForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="studentForm.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-button type="primary" @click="addStudent">添加学生</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addStudent } from '@/api/studentManagement'

export default {
  data() {
    return {
      studentForm: {
        name: '',
        gender: '',
        studentNo: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    // 添加学生
    addStudent() {
      this.$refs.studentForm.validate((valid) => {
        if (valid) {
          addStudent(this.studentForm)
            .then(() => {
              this.$message.success('学生添加成功')
              // 清空表单
              this.studentForm = {
                name: '',
                gender: '',
                studentNo: '',
                email: '',
                password: ''
              }
            })
            .catch((error) => {
              this.$message.error('学生添加失败')
              console.error(error)
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.student-management {
  padding: 20px;
}
</style>
