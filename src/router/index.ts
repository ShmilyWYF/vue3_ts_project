import {createMemoryHistory, createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'

const constantRoute: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: Layout,
        redirect: '/home',
        meta:{
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Client/index.vue'),
                    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
            },
            {
                path: '/Navigation',
                name: 'Navigation',
                component: () => import('@/views/Dashboard/index.vue'),
                meta:{
                    require: true,
                    title: '导航管理页'
                },
            },
        ]
    }]



export const asyncRouterMap: any[] = [
    {
        path: '/educate',
        name: 'Educate',
        component: Layout,
        meta: {
            title: '教务管理'
        },
        children: [
            {
                path: '/student',
                name: 'Student',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    keepAlive: true,
                    title: '学员中心-桃李云帮'
                }
            },
            {
                path: '/studentEnroll',
                name: 'StudentEnroll',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    isLeaf: true,
                    title: '学员报名-桃李云帮'
                }
            },
            {
                path: '/class',
                name: 'Class',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    // keepAlive: true,
                    title: '班级管理-桃李云帮'
                }
            },
            {
                path: '/timetable',
                name: 'Timetable',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    // 不需要缓存
                    title: '课表管理-桃李云帮'
                }
            },
            {
                path: '/course',
                name: 'Course',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    keepAlive: true,
                    title: '课程管理-桃李云帮'
                }
            }
        ]
    },
]

const router: Router = createRouter({
    // history: createWebHashHistory(),
    // history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes: constantRoute,
})

export default router
