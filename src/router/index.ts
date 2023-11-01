import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import protector from "@/router/protector";

import Layout from '@/layout/index.vue'

const constantRoute: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            require: false,
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Client/index.vue'),
                meta: {
                    require: true,
                    title: 'blog',
                },
            },
            {
                path: `/articles/:id`,
                name: 'articles',
                component: () => import('@/components/Articles/index.vue'),
                // 开启组件props
                props: true,
                meta: {
                    require: false,
                    title: '文章列表'
                },
            },
        ]
    },
]

export const asyncRouterMap: any[] = [
    {
        path: '/Dashboard',
        name: 'Dashboard',
        redirect: '/Dashboard/home',
        component: () => import('@/layout/index.vue'),
        props: {isVertical: true},
        meta: {
            require: false,
            title: '后台管理'
        },
        children: [
            {
                path: '/Dashboard/home',
                name: 'Dashboard/home',
                component: () => import('@/views/Dashboard/index.vue'),
                meta: {
                    require: true,
                    title: '首页'
                },
            },
            {
                path: '/Dashboard/text',
                name: 'Dashboard/text',
                meta: {
                    require: false,
                    title: '测试sub'
                },
                children: [
                    {
                        path: '/Dashboard/text',
                        name: 'articles',
                        component: () => import('@/views/Dashboard/components/text.vue'),
                        // 开启组件props
                        meta: {
                            require: false,
                            title: '文章列表'
                        },
                    }
                ]
            }
        ]
    }
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
