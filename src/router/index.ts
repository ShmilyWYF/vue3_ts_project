import {createMemoryHistory, createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import protector from "@/router/protector";

import Layout from '@/layout/index.vue'

const constantRoute: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: Layout,
        redirect: '/home',
        meta:{
            public: true,
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Client/index.vue'),
                meta:{
                    require: true,
                    title: 'blog',
                },
                    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
            },
            {
                path: `/articles/:id`,
                name: 'articles',
                component: () => import('@/components/Articles/index.vue'),
                // 开启组件props
                props: true,
                meta:{
                    require: false,
                    title: '文章列表'
                },
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/Dashboard/login/index.vue'),
                meta:{
                    require: true,
                    title: '登陆'
                },
            },
        ]
    }]



export const asyncRouterMap: any[] = [
    {
        path: '/educate',
        name: '/Educate',
        component: () => import('@/layout/index.vue'),
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
    {
        path: '/educates',
        name: '/Educates',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '教务管理二'
        },
        children: [
            {
                path: '/students',
                name: 'Student',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    keepAlive: true,
                    title: '学员中心-桃李云帮'
                }
            },
            {
                path: '/studentEnrolls',
                name: 'StudentEnroll',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    isLeaf: true,
                    title: '学员报名-桃李云帮'
                }
            },
            {
                path: '/classs',
                name: 'Class',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    // keepAlive: true,
                    title: '班级管理-桃李云帮'
                }
            },
            {
                path: '/timetables',
                name: 'Timetable',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    // 不需要缓存
                    title: '课表管理-桃李云帮'
                }
            },
            {
                path: '/courses',
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

// 注入路由守卫
protector(router)


export default router
