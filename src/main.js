/*
 * @Author: your name
 * @Date: 2020-11-08 12:46:24
 * @LastEditTime: 2020-11-14 15:51:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-peoject\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './element/element.js'
// 引入全局样式
import './assets/css/gobal.css'
// 引用阿里图标库
import './assets/css/iconfont.css'
// 使用axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//  axios.defaults.baseURL = 'http://localhost:3000/'


// 添加请求拦截器添加token
axios.interceptors.request.use((config) => {
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
