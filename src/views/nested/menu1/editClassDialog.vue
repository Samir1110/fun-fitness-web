<template>
  <el-dialog :visible.sync="visible" title="修改课程" :close-on-click-modal="false" width="50%" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="课程编号">
        <el-input v-model="form.classId" :disabled="true" />
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.className" :disabled="true" />
      </el-form-item>
      <el-form-item label="开课时间" prop="classBegin">
        <el-input v-model="form.classBegin" />
      </el-form-item>
      <el-form-item label="时长" prop="classTime">
        <el-input v-model="form.classTime" />
      </el-form-item>
      <el-form-item label="教练" prop="coach">
        <el-input v-model="form.coach" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    classData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
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
        classBegin: [{ required: true, message: '请输入开课时间', trigger: 'blur' }],
        classTime: [{ required: true, message: '请输入时长', trigger: 'blur' }],
        coach: [{ required: true, message: '请输入教练', trigger: 'blur' }]
      }
    }
  },
  watch: {
    classData: {
      handler(newVal) {
        this.form = { ...newVal }
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/class/updateClass', this.form)
            .then(response => {
              this.$emit('update:visible', false)
              this.$emit('updated')
              this.resetForm()
            })
            .catch(error => {
              console.error('Error updating class:', error)
            })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.resetForm() // Reset form data
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
