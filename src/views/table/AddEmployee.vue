<template>
  <div>
    <el-dialog :visible.sync="visible" title="新增员工" :close-on-click-modal="false" width="50%" height="50%" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="姓名" prop="employeeName">
          <el-input v-model="form.employeeName" />
        </el-form-item>
        <el-form-item label="性别" prop="employeeGender">
          <el-input v-model="form.employeeGender" />
        </el-form-item>
        <el-form-item label="年龄" prop="employeeAge">
          <el-input v-model="form.employeeAge" type="number" />
        </el-form-item>
        <el-form-item label="职位" prop="staff">
          <el-input v-model="form.staff" />
        </el-form-item>
        <el-form-item label="备注" prop="employeeMessage">
          <el-input v-model="form.employeeMessage" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        employeeName: '',
        employeeGender: '',
        employeeAge: null,
        staff: '',
        employeeMessage: ''
      },
      rules: {
        employeeName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        employeeGender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        employeeAge: [{ required: true, message: '请输入年龄', type: 'number', trigger: 'blur' }],
        staff: [{ required: true, message: '请输入职位', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/employee/addEmployee', this.form)
            .then(response => {
              this.$emit('update:visible', false)
              this.$emit('added', response.data)
              this.resetForm()
            })
            .catch(error => {
              console.error('Error adding employee:', error)
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
