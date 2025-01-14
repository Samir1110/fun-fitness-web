<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input
          v-model="searchQuery"
          placeholder="搜索员工名称或ID"
          @input="handleSearch"
        />
      </el-col>
      <el-col :span="16" class="text-right">
        <el-button type="primary" @click="addEmployee">新增员工</el-button>
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
          {{ scope.row.employeeAccount }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          {{ scope.row.employeeName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeGender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.employeeAge }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="职位" width="150" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.staff }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="entryTime" label="入职时间" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.entryTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.employeeMessage }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="editEmployee(scope.row)">
              修改
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.employeeAccount)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <edit-employee
      :visible.sync="editDialogVisible"
      :employee="selectedEmployee"
      @updated="fetchData"
    />
    <add-employee
      :visible.sync="addDialogVisible"
      @added="fetchData"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import EditEmployee from './EditEmployee.vue'
import AddEmployee from './AddEmployee.vue'
import axios from 'axios'

export default {
  components: {
    AddEmployee,
    EditEmployee
  },
  data() {
    return {
      list: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      selectedEmployee: {},
      searchQuery: ''
    }
  },
  computed: {
    filteredData() {
      return this.list.filter(item => {
        const query = this.searchQuery.toLowerCase()
        return item.employeeName.toLowerCase().includes(query) || item.employeeAccount.toString().includes(query)
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(error => {
        console.error('Error fetching data:', error)
        this.listLoading = false
      })
    },
    addEmployee() {
      this.addDialogVisible = true
    },
    editEmployee(employee) {
      this.selectedEmployee = { ...employee }
      this.editDialogVisible = true
    },
    handleDelete(employeeAccount) {
      this.$confirm('确定删除该员工吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/employee/delEmployee', new URLSearchParams({
          employeeAccount: employeeAccount
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
            console.error('Error deleting employee:', error)
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
