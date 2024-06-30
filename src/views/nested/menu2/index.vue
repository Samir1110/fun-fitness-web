<template>
  <div class="app-container">
    <div>新增课程</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="编号" prop="classId">
        <el-input v-model="form.classId" />
      </el-form-item>
      <el-form-item label="名称" prop="className">
        <el-input v-model="form.className" />
      </el-form-item>
      <el-form-item label="时间" prop="classBegin">
        <el-input v-model="form.classBegin" />
      </el-form-item>
      <el-form-item label="时长" prop="classTime">
        <el-input v-model="form.classTime" />
      </el-form-item>
      <el-form-item label="教练" prop="coach">
        <el-input v-model="form.coach" />
      </el-form-item>
      <div class="form-footer">
        <el-button type="primary" @click="handleSubmit">添加</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        classId: '',
        className: '',
        classBegin: '',
        classTime: '',
        coach: ''
      },
      rules: {
        classId: [
          { required: true, message: '请输入编号', trigger: 'blur' },
          { min: 1, max: 4, message: '编号不能大于4位', trigger: 'blur' }
        ],
        className: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        classBegin: [{ required: true, message: '请输入时间', trigger: 'blur' }],
        classTime: [{ required: true, message: '请输入时长', trigger: 'blur' }],
        coach: [{ required: true, message: '请输入教练名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/class/addClass', this.form)
            .then(response => {
              this.$message({
                message: '课程添加成功!',
                type: 'success'
              })
              this.resetForm()
            })
            .catch(error => {
              console.error('Error adding course:', error)
              this.$message({
                message: '课程添加失败!',
                type: 'error'
              })
            })
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.app-container {
    margin-top: 20px; /* 调整上方距离 */
}
.app-container > div:first-child {
    font-size: 24px; /* 调整字体大小 */
    font-weight: bold;
    margin-bottom: 30px; /* 调整下方距离 */
    margin-left: 30px;
}
.form-footer {
  margin-top: 30px;
  text-align: center; /* 让按钮居中 */
  font-weight: bold;
}
</style>
