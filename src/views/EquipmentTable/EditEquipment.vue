<template>
  <div>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="修改设备信息" width="50%" @close="handleClose">
      <el-form :model="form">
        <el-form-item label="ID">
          <el-input v-model="form.equipmentId" :disabled="true" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form.equipmentName" />
        </el-form-item>
        <el-form-item label="设备位置">
          <el-input v-model="form.equipmentLocation" />
        </el-form-item>
        <el-form-item label="设备状态">
          <el-input v-model="form.equipmentStatus" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.equipmentMessage" />
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
    equipment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.equipment }
    }
  },
  watch: {
    equipment(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:8080/equipment/updateEquipment', this.form)
        .then(response => {
          this.$emit('update:visible', false)
          this.$emit('updated', response.data)
        })
        .catch(error => {
          console.error('Error updating equipment:', error)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.form = { ...this.equipment } // Reset form data
    }
  }
}
</script>
