<template>
  <div>
    <el-dialog :visible.sync="visible" title="新增会员" :close-on-click-modal="false" width="50%" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="姓名" prop="memberName">
          <el-input v-model="form.memberName" />
        </el-form-item>
        <el-form-item label="性别" prop="memberGender">
          <el-input v-model="form.memberGender" />
        </el-form-item>
        <el-form-item label="年龄" prop="memberAge">
          <el-input v-model="form.memberAge" type="number" />
        </el-form-item>
        <el-form-item label="身高" prop="memberHeight">
          <el-input v-model="form.memberHeight" type="number" />
        </el-form-item>
        <el-form-item label="体重" prop="memberWeight">
          <el-input v-model="form.memberWeight" type="number" />
        </el-form-item>
        <el-form-item label="电话" prop="memberPhone">
          <el-input v-model="form.memberPhone" />
        </el-form-item>
        <el-form-item label="课时" prop="cardClass">
          <el-input v-model="form.cardClass" type="number" />
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
        memberName: '',
        memberGender: '',
        memberAge: null,
        memberHeight: null,
        memberWeight: null,
        memberPhone: '',
        cardClass: null
      },
      rules: {
        memberName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        memberGender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        memberAge: [{ required: true, message: '请输入年龄', type: 'number', trigger: 'blur' }],
        memberHeight: [{ required: true, message: '请输入身高', type: 'number', trigger: 'blur' }],
        memberWeight: [{ required: true, message: '请输入体重', type: 'number', trigger: 'blur' }],
        memberPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: this.checkPhone, trigger: 'blur' }
        ],
        cardClass: [{ required: true, message: '请输入课时', type: 'number', trigger: 'blur' }]
      }
    }
  },
  methods: {
    checkPhone(rule, value, callback) {
      const phoneReg = /^1[3456789]\d{9}$/
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      if (!phoneReg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/member/addMember', this.form)
            .then(response => {
              this.$emit('update:visible', false)
              this.$emit('added', response.data)
              this.resetForm()
            })
            .catch(error => {
              console.error('Error adding member:', error)
            })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.resetForm()
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
