<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="8">
        <el-input
          v-model="searchQuery"
          placeholder="搜索会员名称或ID"
          @input="handleSearch"
        />
      </el-col>
      <el-col :span="16" class="text-right">
        <el-button type="primary" @click="addMember">新增会员</el-button>
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
      <el-table-column align="center" label="账号" width="100">
        <template slot-scope="scope">
          {{ scope.row.memberAccount }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100">
        <template slot-scope="scope">
          {{ scope.row.memberName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memberGender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.memberAge }}
        </template>
      </el-table-column>
      <el-table-column label="身高" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.memberHeight }}
        </template>
      </el-table-column>
      <el-table-column label="体重" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.memberWeight }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.memberPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cardTime" label="开卡时间" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.cardTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课时" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.cardClass }}
        </template>
      </el-table-column>
      <el-table-column label="剩余课时" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.cardNextClass }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button-group>
            <el-button type="primary" @click="editMember(scope.row)">
              修改
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.memberAccount)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <edit-member
      :visible.sync="editDialogVisible"
      :member="selectedMember"
      @updated="fetchData"
    />
    <add-member
      :visible.sync="addDialogVisible"
      @added="fetchData"
    />
  </div>
</template>

<script>
import axios from 'axios'
import EditMember from './EditMember.vue'
import AddMember from './AddMember.vue'

export default {
  components: {
    EditMember,
    AddMember
  },
  data() {
    return {
      list: [],
      listLoading: true,
      addDialogVisible: false,
      editDialogVisible: false,
      selectedMember: {},
      searchQuery: ''
    }
  },
  computed: {
    filteredData() {
      return this.list.filter(item => {
        const query = this.searchQuery.toLowerCase()
        return item.memberName.toLowerCase().includes(query) || item.memberAccount.toString().includes(query)
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('http://localhost:8080/member/selMember')
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.listLoading = false
        })
    },
    addMember() {
      this.addDialogVisible = true
    },
    editMember(member) {
      this.selectedMember = { ...member }
      this.editDialogVisible = true
    },
    handleDelete(memberAccount) {
      this.$confirm('确定删除该会员吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/member/delMember', new URLSearchParams({
          memberAccount: memberAccount
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
            console.error('Error deleting member:', error)
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
