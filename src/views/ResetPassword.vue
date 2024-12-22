<template>
  <div class="reset-password-container">
    <el-form ref="resetPasswordForm" :model="resetPasswordForm" :rules="resetPasswordRules" label-position="left">
      <h3 class="title">修改密码</h3>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="resetPasswordForm.oldPassword" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="resetPasswordForm.newPassword" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input v-model="resetPasswordForm.confirmPassword" type="password" placeholder="请再次输入新密码" />
      </el-form-item>
      <el-button type="primary" @click="handleSubmit">确认修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.resetPasswordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      resetPasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      resetPasswordRules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }, { validator: validateConfirmPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.resetPasswordForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/resetPassword', this.resetPasswordForm)
            .then(() => {
              this.$message.success('密码修改成功')
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('密码修改失败，请重试')
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.reset-password-container {
  max-width: 400px;
  margin: 50px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
