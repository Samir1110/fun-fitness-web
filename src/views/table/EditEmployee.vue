<template>
  <div>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="修改员工信息" width="50%" higth="50%" @close="handleClose">
      <el-form :model="form">
        <el-form-item label="ID">
          <el-input v-model="form.employeeAccount" :disabled="true" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.employeeName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.employeeGender" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.employeeAge" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.staff" />
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input v-model="form.entryTime" :disabled="true" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.employeeMessage" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
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
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.employee }
    }
  },
  watch: {
    employee(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:8080/employee/updateEmployee', this.form)
        .then(response => {
          this.$emit('update:visible', false)
          this.$emit('updated', response.data)
        })
        .catch(error => {
          console.error('Error updating employee:', error)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.form = { ...this.employee } // Reset form data
    }
  }
}
</script>
