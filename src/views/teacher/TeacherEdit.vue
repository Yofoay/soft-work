<template>
  <div class="teacher-edit">
    <el-card class="box-card">
      <h3>添加教师</h3>
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" @click="addTeacher">添加教师</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addTeacher } from '@/api/teacherManagement'

export default {
  data() {
    return {
      form: {
        name: '',
        gender: '',
        phone: '',
        email: '',
        department: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    addTeacher() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addTeacher(this.form)
            .then(() => {
              this.$message.success('教师添加成功')
              this.resetForm()
            })
            .catch(error => {
              this.$message.error('教师添加失败')
              console.error(error)
            })
        }
      })
    },
    resetForm() {
      this.form = {
        name: '',
        gender: '',
        phone: '',
        email: '',
        department: '',
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
.teacher-edit {
  padding: 20px;
}
</style>
