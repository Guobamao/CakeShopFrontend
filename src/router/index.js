import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import axios from 'axios'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    component: () => import('../views/login/Register.vue')
  },
  {
    path: '/admin',
    meta: { requiresAdmin: true, requiresAuth: true },
    component: () => import('../views/admin/index/Index.vue'),
    children: [
      {
        path: '',
        commonent: () => import('../views/admin/index/Home.vue')
      },
      {
        path: 'OrderIndex',
        component: () => import('../views/admin/order/OrderIndex.vue')
      },
      {
        path: 'UserIndex',
        component: () => import('../views/admin/user/UserIndex.vue')
      },
      {
        path: 'GoodsIndex',
        component: () => import('../views/admin/goods/GoodsIndex.vue')
      },
      {
        path: 'TypeIndex',
        component: () => import('../views/admin/type/TypeIndex.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/user/index/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/user/index/Home.vue')
      },
      {
        path: 'TypeIndex',
        component: () => import('../views/user/type/TypeIndex.vue')
      },
      {
        path: 'NewIndex',
        component: () => import('../views/user/new/NewIndex.vue')
      },
      {
        path: 'OrderIndex',
        component: () => import('../views/user/order/OrderIndex.vue')
      },
      {
        path: 'CartIndex',
        component: () => import('../views/user/cart/CartIndex.vue')
      },
      {
        path: "UserProfile",
        component: () => import('../views/user/user/UserProfile.vue')
      },
    ]
  }
]

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin') === '1';
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token')
  if (requiresAuth && !token) {
    Message.error('请先登录')
    next('/login')
  } else if (requiresAdmin && !isAdmin) {
    Message.error('您不是管理员，无法访问')
    next('/user')
  } else {
    axios.defaults.headers.common['Token'] = token
    next()
  }
})

export default router
