<template>
  <div class="qrcode-page">
    <el-card class="box-card">
      <h3>签到二维码</h3>

      <!-- 二维码展示 -->
      <div class="qrcode-container">
        <canvas id="qrcode"></canvas>
        <p>学生扫码后直接进入签到页面</p>
      </div>

      <!-- 手动刷新二维码按钮 -->
      <el-button type="primary" @click="generateQrCode">刷新二维码</el-button>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      signInUrl: 'https://your-website.com/student-sign-in' // 学生签到页面的固定 URL
    }
  },
  mounted() {
    this.generateQrCode() // 页面加载时生成二维码
  },
  methods: {
    // 生成二维码
    generateQrCode() {
      const canvas = document.getElementById('qrcode')
      QRCode.toCanvas(canvas, this.signInUrl, { width: 200 }, (error) => {
        if (error) {
          console.error('二维码生成失败:', error)
        }
      })
    }
  }
}
</script>

<style scoped>
.qrcode-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.qrcode-container {
  margin: 20px 0;
  text-align: center;
}

canvas {
  margin: 0 auto;
}
</style>
