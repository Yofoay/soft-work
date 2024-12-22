<template>
  <div class="student-sign-in">
    <van-nav-bar title="学生签到" />

    <van-form @submit="handleSignIn">
      <!-- 班级ID（自动填充，不可修改） -->
      <van-field v-model="form.classId" label="班级ID" readonly />

      <!-- 姓名 -->
      <van-field v-model="form.name" label="姓名" placeholder="请输入姓名" required />

      <!-- 学号 -->
      <van-field
        v-model="form.studentId"
        label="学号"
        placeholder="请输入学号"
        type="number"
        required
      />

      <!-- 签到按钮 -->
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">签到</van-button>
      </div>
    </van-form>

    <van-toast v-model="toast.visible" type="success" :message="toast.message" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        classId: '', // 班级 ID，将通过 URL 自动填充
        name: '', // 学生姓名
        studentId: '' // 学生学号
      },
      toast: {
        visible: false,
        message: ''
      }
    }
  },
  mounted() {
    // 从 URL 中获取 classId 并赋值到表单
    const urlParams = new URLSearchParams(window.location.search)
    const classId = urlParams.get('classId')
    if (classId) {
      this.form.classId = classId // 自动填充班级ID
    }
  },
  methods: {
    // 提交签到
    handleSignIn() {
      const { classId, name, studentId } = this.form

      // 校验输入
      if (!classId || !name || !studentId) {
        this.toast.message = '请输入完整的签到信息'
        this.toast.visible = true
        return
      }

      // 模拟签到成功
      this.toast.message = '签到成功！'
      this.toast.visible = true

      // 清空表单
      this.form.name = ''
      this.form.studentId = ''
    }
  }
}
</script>

<style scoped>
.student-sign-in {
  padding: 16px;
}
</style>
