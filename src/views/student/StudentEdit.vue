<template>
  <div class="student-edit">
    <el-card class="box-card">
      <h3>添加学生</h3>
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="form.studentNo" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
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
      form: {
        name: '',
        gender: '',
        studentNo: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    addStudent() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addStudent(this.form)
            .then(() => {
              this.$message.success('学生添加成功')
              this.resetForm()
            })
            .catch(error => {
              this.$message.error('学生添加失败')
              console.error(error)
            })
        }
      })
    },
    resetForm() {
      this.form = {
        name: '',
        gender: '',
        studentNo: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
