// src/api/table.js

import axios from 'axios'

// 创建一个新的 Axios 实例
const tableRequest = axios.create({
  baseURL: 'http://localhost:8080', // 指定你的后端服务器地址
  timeout: 5000 // 请求超时时间
})

export function getList(params) {
  return tableRequest({
    url: '/employee/selEmployee', // 指定后端 API 路径
    method: 'get',
    params
  })
}
