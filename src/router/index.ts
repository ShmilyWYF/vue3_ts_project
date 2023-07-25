import { createRouter, createWebHashHistory, RouteRecordRaw, createMemoryHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const route: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/Client/index.vue'),
        meta: {
          require: true,
          name: "主页",
          index: 'index'
        }
      },
      {
        path: '/indexs',
        name: 'indexs',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          require: true,
          name: "测试",
          index: 'indexs'
        }
      }
    ]
  }]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createMemoryHistory(),
  routes: route
})

export default router
