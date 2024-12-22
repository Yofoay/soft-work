<template>
  <div class="attendance-page">
    <el-card class="box-card">
      <h3>学生签到管理</h3>

      <!-- 筛选班级 -->
      <el-form :model="filters" inline class="filter-form">
        <el-form-item label="选择班级">
          <el-select v-model="filters.classId" placeholder="请选择班级" @change="generateQrCode">
            <el-option
              v-for="classItem in classList"
              :key="classItem.id"
              :label="classItem.name"
              :value="classItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <!-- 签到二维码 -->
      <h4>签到二维码</h4>
      <div class="qrcode-container">
        <canvas id="qrcode"></canvas>
        <p v-if="filters.classId">
          班级 {{ getClassName(filters.classId) }} 的学生签到二维码
        </p>
        <p v-else>请选择班级以生成签到二维码</p>
      </div>

      <el-button type="primary" @click="generateQrCode" :disabled="!filters.classId">
        刷新二维码
      </el-button>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { getClassList } from '@/api/classManagement'

export default {
  data() {
    return {
      filters: {
        classId: '' // 当前选择的班级ID
      },
      classList: [] // 班级列表
    }
  },
  mounted() {
    this.fetchClassList() // 获取班级列表
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
    // 根据班级ID获取班级名称
    getClassName(classId) {
      const classItem = this.classList.find((item) => item.id === classId)
      return classItem ? classItem.name : ''
    },
    // 生成二维码
    generateQrCode() {
      if (!this.filters.classId) {
        this.$message.warning('请选择班级以生成二维码')
        return
      }

      // 构造二维码内容：学生签到页面 URL + 班级ID
      const signInUrl = `https://your-website.com/student-sign-in?classId=${this.filters.classId}`
      const canvas = document.getElementById('qrcode')

      QRCode.toCanvas(canvas, signInUrl, { width: 200 }, (error) => {
        if (error) {
          console.error('二维码生成失败:', error)
        }
      })
    }
  }
}
</script>

<style scoped>
.attendance-page {
  padding: 20px;
}

.filter-form {
  margin-bottom: 20px;
}

.qrcode-container {
  text-align: center;
  margin: 20px 0;
}

canvas {
  margin: 0 auto;
}
</style>
