<template>
  <div>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="修改产品信息" width="50%" @close="handleClose">
      <el-form :model="form">
        <el-form-item label="产品ID">
          <el-input v-model="form.product_id" :disabled="true" />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.product_name" />
        </el-form-item>
        <el-form-item label="产品数量">
          <el-input type="number" v-model="form.product_quantity" />
        </el-form-item>
        <el-form-item label="产品价格">
          <el-input type="number" v-model="form.product_price" />
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
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.product }
    }
  },
  watch: {
    product(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:8080/shop/UpdateProduct', this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.$emit('update:visible', false)
          this.$emit('updated', response.data)
        })
        .catch(error => {
          console.error('Error updating product:', error)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.form = { ...this.product } // 重置表单数据
    }
  }
}
</script>
