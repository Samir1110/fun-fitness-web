<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input
          v-model="searchQuery"
          placeholder="搜索设备名称或ID"
          @input="handleSearch"
        />
      </el-col>
      <el-col :span="16" class="text-right">
        <el-button type="primary" @click="addEquipment">新增设备</el-button>
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
          {{ scope.row.equipmentId }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.equipmentName }}
        </template>
      </el-table-column>
      <el-table-column label="设备位置" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.equipmentLocation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备状态" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.equipmentStatus }}
        </template>
      </el-table-column>
      <el-table-column label="备注" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.equipmentMessage }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="editEquipment(scope.row)">
              修改
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.equipmentId)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <edit-equipment
      :visible.sync="editDialogVisible"
      :equipment="selectedEquipment"
      @updated="fetchData"
    />
    <add-equipment
      :visible.sync="addDialogVisible"
      @added="fetchData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import EditEquipment from './EditEquipment.vue'
import AddEquipment from './AddEquipment.vue'

export default {
  components: {
    EditEquipment,
    AddEquipment
  },
  data() {
    return {
      list: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      selectedEquipment: {},
      searchQuery: ''
    }
  },
  computed: {
    filteredData() {
      return this.list.filter(item => {
        const query = this.searchQuery.toLowerCase()
        return item.equipmentName.toLowerCase().includes(query) || item.equipmentId.toString().includes(query)
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('http://localhost:8080/equipment/selEquipment')
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.listLoading = false
        })
    },
    addEquipment() {
      this.addDialogVisible = true
    },
    editEquipment(equipment) {
      this.selectedEquipment = { ...equipment }
      this.editDialogVisible = true
    },
    handleDelete(equipmentId) {
      // 删除逻辑
      this.$confirm('确定删除该设备吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/equipment/delEquipment', new URLSearchParams({
          equipmentId: equipmentId
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
            console.error('Error deleting equipment:', error)
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
