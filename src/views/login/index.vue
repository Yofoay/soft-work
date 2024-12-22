<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">签到系统教师端</h3>
      </div>

      <!-- 学号/教职工号输入框 -->
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="学号/教职工号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <!-- 图标嵌入到输入框左侧 -->
          <template #prefix>
            <svg-icon icon-class="user" class="input-icon" />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <!-- 图标嵌入到输入框左侧 -->
            <template #prefix>
              <svg-icon icon-class="password" class="input-icon" />
            </template>
            <!-- 密码可见切换按钮 -->
            <template #suffix>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 身份选择下拉框 -->
      <el-form-item prop="power">
        <el-select v-model="loginForm.power" placeholder="请选择身份">
          <el-option label="学生" :value="2" />
          <el-option label="教师" :value="1" />
          <el-option label="管理员" :value="0" />
        </el-select>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入学号/教职工号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatePower = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择身份'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        power: null // 身份：学生 2，教师 1，管理员 0
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        power: [{ required: true, trigger: 'change', validator: validatePower }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            const response = await this.$store.dispatch('user/login', this.loginForm)
            if (response.success) {
              this.$message.success('登录成功')
              this.$router.push({ path: this.redirect || '/' }) // 跳转到首页或之前的页面
            } else {
              this.$message.error(response.message || '登录失败，请检查用户名、密码或身份')
            }
          } catch (error) {
            console.error('登录请求失败:', error)
            this.$message.error('登录失败，请检查用户名、密码或身份')
          } finally {
            this.loading = false
          }
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">
/* 输入框中嵌入图标样式 */
.input-icon {
  font-size: 20px;
  color: #c0c4cc;
}

/* 登录页面样式 */
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
