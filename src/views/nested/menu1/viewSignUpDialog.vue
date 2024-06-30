<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" title="查看报名信息" width="50%" @close="handleClose">
    <el-form :model="form">
      <el-form-item label="课程编号">
        <el-input v-model="form.classId" :disabled="true" />
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="form.className" :disabled="true" />
      </el-form-item>
      <el-form-item label="教练">
        <el-input v-model="form.coach" :disabled="true" />
      </el-form-item>
      <el-form-item label="开课时间">
        <el-input v-model="form.classBegin" :disabled="true" />
      </el-form-item>
      <el-divider>报名会员：</el-divider>
      <el-table :data="form.members" style="width: 100%">
        <el-table-column prop="memberAccount" label="会员账号" width="150" />
        <el-table-column prop="memberName" label="会员姓名" />
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    classId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      form: {
        classId: '',
        className: '',
        coach: '',
        classBegin: '',
        members: []
      }
    }
  },
  watch: {
    classId(newVal) {
      if (newVal) {
        this.fetchData(newVal)
      }
    },
    visible(newVal) {
      if (newVal) {
        this.fetchData(this.classId)
      }
    }
  },
  methods: {
    fetchData(classId) {
      axios.get('http://localhost:8080/class/selClassOrder', {
        params: { classOrderId: classId }
      })
        .then(response => {
          const classData = response.data
          if (classData) {
            this.form.classId = classData.classId
            this.form.className = classData.className
            this.form.coach = classData.coach
            this.form.classBegin = classData.classBegin
            this.form.members = classData.members || []
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.form = {
        classId: '',
        className: '',
        coach: '',
        classBegin: '',
        members: []
      }
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
