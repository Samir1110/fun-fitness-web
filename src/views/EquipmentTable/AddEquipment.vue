<template>
  <div>
    <el-dialog :visible.sync="visible" title="新增设备" :close-on-click-modal="false" width="50%" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="form.equipmentName" />
        </el-form-item>
        <el-form-item label="设备位置" prop="equipmentLocation">
          <el-input v-model="form.equipmentLocation" />
        </el-form-item>
        <el-form-item label="设备状态" prop="equipmentStatus">
          <el-input v-model="form.equipmentStatus" />
        </el-form-item>
        <el-form-item label="备注" prop="equipmentMessage">
          <el-input v-model="form.equipmentMessage" />
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
        equipmentName: '',
        equipmentLocation: '',
        equipmentStatus: '',
        equipmentMessage: ''
      },
      rules: {
        equipmentName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        equipmentLocation: [{ required: true, message: '请输入设备位置', trigger: 'blur' }],
        equipmentStatus: [{ required: true, message: '请输入设备状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/equipment/addEquipment', this.form)
            .then(response => {
              this.$emit('update:visible', false)
              this.$emit('added', response.data)
              this.resetForm()
            })
            .catch(error => {
              console.error('Error adding equipment:', error)
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
