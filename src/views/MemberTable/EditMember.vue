<template>
  <div>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="修改会员信息" width="50%" height="50%" @close="handleClose">
      <el-form :model="form">
        <el-form-item label="账号">
          <el-input v-model="form.memberAccount" :disabled="true" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.memberName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.memberGender" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.memberAge" />
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="form.memberHeight" />
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="form.memberWeight" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.memberPhone" />
        </el-form-item>
        <el-form-item label="课时">
          <el-input v-model="form.cardClass" />
        </el-form-item>
        <el-form-item label="剩余课时">
          <el-input v-model="form.cardNextClass" />
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
    },
    member: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.member }
    }
  },
  watch: {
    member(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:8080/member/updateMember', this.form)
        .then(response => {
          this.$emit('update:visible', false)
          this.$emit('updated', response.data)
        })
        .catch(error => {
          console.error('Error updating member:', error)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.form = { ...this.member } // Reset form data
    }
  }
}
</script>
