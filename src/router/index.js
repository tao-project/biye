/*
 * @Author: your name
 * @Date: 2020-11-08 12:46:24
 * @LastEditTime: 2020-11-12 21:42:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-peoject\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: home,
    redirect:'/welcome',
    children: [
      { path: '/welcome', component: welcome },
      {path:'/users',component:users}
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") next()
  const loginToken = window.sessionStorage.getItem('token')
  if (!loginToken) next("/login")
  next()
})
export default router
