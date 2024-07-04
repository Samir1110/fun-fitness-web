<template>
  <div>
    <el-dialog :visible.sync="visible" title="新增产品" :close-on-click-modal="false" width="50%" @close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="产品ID" prop="productId">
          <el-input v-model="form.product_id" type="number" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.product_name" />
        </el-form-item>
        <el-form-item label="产品数量" prop="productQuantity">
          <el-input v-model="form.product_quantity" type="number" />
        </el-form-item>
        <el-form-item label="产品价格" prop="productPrice">
          <el-input v-model="form.product_price" type="number" />
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
        product_id: null,
        product_name: '',
        product_quantity: 0,
        product_price: 0
      },
      rules: {
        product_id: [{ required: true, message: '请输入产品ID', trigger: 'blur' }],
        product_name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        product_quantity: [{ required: true, message: '请输入产品数量', trigger: 'blur' }],
        product_price: [{ required: true, message: '请输入产品价格', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/shop/AddProduct', this.form, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              this.$emit('update:visible', false)
              this.$emit('added', response.data)
              this.resetForm()
            })
            .catch(error => {
              console.error('Error adding product:', error)
            })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.resetForm() // 重置表单数据
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
