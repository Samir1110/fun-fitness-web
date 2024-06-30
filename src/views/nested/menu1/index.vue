<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.classId }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classBegin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.classTime }}
        </template>
      </el-table-column>
      <el-table-column label="教练" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.coach }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="viewSignUp(scope.row.classId)">
              查看报名信息
            </el-button>
            <el-button type="warning" @click="editClass(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.classId)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <view-sign-up-dialog
      :visible.sync="viewSignUpDialogVisible"
      :class-id="selectedClassOrderId"
    />
    <edit-class-dialog
      :visible.sync="editClassDialogVisible"
      :class-data="selectedClassData"
      @updated="fetchData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import viewSignUpDialog from './viewSignUpDialog.vue'
import editClassDialog from './editClassDialog.vue'

export default {
  components: {
    viewSignUpDialog,
    editClassDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      viewSignUpDialogVisible: false,
      editClassDialogVisible: false,
      selectedClassOrderId: 0,
      selectedClassData: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('http://localhost:8080/class/selClass')
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.listLoading = false
        })
    },
    viewSignUp(classOrderId) {
      this.selectedClassOrderId = classOrderId
      this.viewSignUpDialogVisible = true
    },
    editClass(classData) {
      this.selectedClassData = { ...classData }
      this.editClassDialogVisible = true
    },
    handleDelete(classId) {
      this.$confirm('确定删除该课程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/class/delClass', new URLSearchParams({
          classId: classId
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
            console.error('Error deleting class:', error)
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
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
