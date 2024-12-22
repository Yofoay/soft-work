<template>
  <div class="class-management">
    <el-card class="box-card">
      <h3>班级管理</h3>

      <!-- 创建班级 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="班级描述" prop="classDescription">
          <el-input v-model="form.classDescription" type="textarea" placeholder="请输入班级描述"></el-input>
        </el-form-item>
        <el-button type="primary" @click="createClass">创建班级</el-button>
      </el-form>

      <el-divider></el-divider>

      <!-- 班级列表 -->
      <h4>班级列表</h4>
      <el-table :data="classList" style="width: 100%">
        <el-table-column prop="id" label="班级ID" width="100" />
        <el-table-column prop="name" label="班级名称" />
        <el-table-column prop="description" label="班级描述" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="mini" @click="editClass(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteClass(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-divider></el-divider>

      <!-- 添加学生到班级 -->
      <h4>添加学生到班级</h4>
      <el-form :model="addStudentForm" ref="addStudentForm" label-width="100px" class="form">
        <el-form-item label="选择班级" prop="classId">
          <el-select v-model="addStudentForm.classId" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="addStudentForm.studentName" placeholder="请输入学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="学生ID" prop="studentId">
          <el-input v-model="addStudentForm.studentId" placeholder="请输入学生学号"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addStudentToClass">添加学生</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getClassList,
  createClass,
  updateClass,
  deleteClass,
  addStudentToClass
} from '@/api/classManagement'

export default {
  data() {
    return {
      form: {
        className: '',
        classDescription: ''
      },
      rules: {
        className: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
        classDescription: [{ required: true, message: '请输入班级描述', trigger: 'blur' }]
      },
      classList: [], // 班级列表
      addStudentForm: {
        classId: '',
        studentName: '',
        studentId: ''
      }
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
        })
    },
    // 创建班级
    createClass() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          createClass(this.form)
            .then(() => {
              this.$message.success('班级创建成功')
              this.fetchClassList()
              this.form.className = ''
              this.form.classDescription = ''
            })
            .catch((error) => {
              this.$message.error('班级创建失败')
            })
        }
      })
    },
    // 编辑班级
    editClass(classItem) {
      this.$prompt('请输入新的班级描述', '编辑班级', {
        inputValue: classItem.description,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          updateClass({ id: classItem.id, description: value })
            .then(() => {
              this.$message.success('班级更新成功')
              this.fetchClassList()
            })
            .catch((error) => {
              this.$message.error('班级更新失败')
            })
        })
        .catch(() => {
          this.$message.info('取消编辑')
        })
    },
    // 删除班级
    deleteClass(classId) {
      this.$confirm('确定要删除这个班级吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteClass({ id: classId })
            .then(() => {
              this.$message.success('班级删除成功')
              this.fetchClassList()
            })
            .catch((error) => {
              this.$message.error('班级删除失败')
            })
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    // 添加学生到班级
    addStudentToClass() {
      addStudentToClass(this.addStudentForm)
        .then(() => {
          this.$message.success('学生添加成功')
          this.addStudentForm.classId = ''
          this.addStudentForm.studentName = ''
          this.addStudentForm.studentId = ''
        })
        .catch((error) => {
          this.$message.error('学生添加失败')
        })
    }
  }
}
</script>

<style scoped>
.class-management {
  padding: 20px;
}

.form {
  margin-top: 20px;
}
</style>
