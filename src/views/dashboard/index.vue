<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      欢迎您, 趣健身系统管理员
      <span class="dashboard-time">{{ currentTime }}</span>
    </div>
    <div class="dashboard-text1">
      当前健身房在线人员
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column align="center" label="入场时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      currentTime: ''
    }
  },
  created() {
    this.fetchData()
    this.updateTime()
    setInterval(this.updateTime, 1000) // 每秒更新一次时间
  },
  methods: {
    fetchData() {
      this.listLoading = true
      axios.get('http://localhost:8080/gym/selGymPeople')
        .then(response => {
          this.list = response.data
          this.listLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.listLoading = false
        })
    },
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
    line-height: 46px;
  }
  &-time {
    float: right;
    font-size: 20px;
    margin-left: 20px;
  }
  &-text1 {
    font-size: 24px; /* 调整字体大小 */
    margin-top: 30px;
    margin-bottom: 30px; /* 调整下方距离 */
    margin-left: 30px;
}
}
</style>
