<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input
          v-model="searchQuery"
          placeholder="搜索产品名称或ID"
          @input="handleSearch"
        />
      </el-col>
      <el-col :span="16" class="text-right">
        <el-button type="primary" @click="addProduct">新增产品</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="filteredData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.product_id }}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column label="产品数量" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.product_quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品价格" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.product_price }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="editProduct(scope.row)">
              修改
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.product_id)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <edit-product
      :visible.sync="editDialogVisible"
      :product="selectedProduct"
      @updated="fetchData"
    />
    <add-product
      :visible.sync="addDialogVisible"
      @added="fetchData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import EditProduct from './EditProduct.vue'
import AddProduct from './AddProduct.vue'

export default {
  components: {
    EditProduct,
    AddProduct
  },
  data() {
    return {
      list: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      selectedProduct: {},
      searchQuery: ''
    }
  },
  computed: {
    filteredData() {
      return this.list.filter(item => {
        const query = this.searchQuery.toLowerCase()
        return item.product_name.toLowerCase().includes(query) || item.product_id.toString().includes(query)
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('http://localhost:8080/shop/catalog')
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.listLoading = false
        })
    },
    addProduct() {
      this.addDialogVisible = true
    },
    editProduct(product) {
      this.selectedProduct = { ...product }
      this.editDialogVisible = true
    },
    handleDelete(productId) {
      // 删除逻辑
      this.$confirm('确定删除该产品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/shop/DeleteProduct', new URLSearchParams({
          product_id: productId
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData() // 删除后刷新数据
          })
          .catch(error => {
            console.error('Error deleting product:', error)
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleSearch() {
      // 搜索框变化时自动触发过滤逻辑
    }
  }
}
</script>
