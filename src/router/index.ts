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
            noRedirect: false,
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Client/index.vue'),
                meta: {
                    require: true,
                    title: 'blog',
                    noRedirect: false,
                },
            },
            {
                path: '/articles/:id',
                name: 'articles',
                component: () => import('@/components/Articles/index.vue'),
                // 开启组件props
                props: true,
                meta: {
                    require: false,
                    title: '阅读文章',
                    noRedirect: true,
                },
            },
            {
                path: '/tags',
                name: 'tags',
                component: () => import('@/components/TagList/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: '标签',
                    noRedirect: false,
                },
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/components/About/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: '关于',
                    noRedirect: false,
                },
            },
            {
                path: '/message',
                name: 'Message',
                component: () => import('@/components/Message/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: '留言',
                    noRedirect: false,
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
                path: '/Dashboard/mark',
                name: 'Dashboard/mark',
                meta: {
                    require: false,
                    title: '文章管理',
                    noRedirect: true,
                },
                redirect: '/Dashboard/mark/articleList',
                children: [
                    {
                        path: '/Dashboard/mark/edit',
                        name: 'mark',
                        component: () => import('@/views/Dashboard/components/markEdit/index.vue'),
                        // 开启组件props
                        props: true,
                        meta: {
                            hide: true,
                            require: false,
                            title: '文章编辑'
                        },
                    },
                    {
                        path: '/Dashboard/mark/articleList',
                        name: 'articleManage',
                        component: () => import('@/views/Dashboard/components/articleList/index.vue'),
                        meta: {
                            require: false,
                            title: '文章列表'
                        },
                    },
                    {
                        path: '/Dashboard/mark/tag',
                        name: 'tag',
                        component: () => import('@/views/Dashboard/components/tag/index.vue'),
                        meta: {
                            require: false,
                            title: '标签管理'
                        },
                    },
                    {
                        path: '/Dashboard/mark/category',
                        name: 'category',
                        component: () => import('@/views/Dashboard/components/category/index.vue'),
                        meta: {
                            require: false,
                            title: '分类管理'
                        },
                    },
                ]
            },
            {
                path: '/Dashboard/comment',
                name: 'comment',
                component: () => import('@/views/Dashboard/components/comment/index.vue'),
                meta: {
                    require: true,
                    title: '评论管理'
                },
            },
            {
                path: '/Dashboard/user',
                name: 'User',
                component: () => import('@/views/Dashboard/components/user/index.vue'),
                meta: {
                    require: true,
                    title: '用户管理',
                },
            },
            {
                path: '/Dashboard/website',
                name: 'website',
                component: () => import('@/views/Dashboard/components/website/index.vue'),
                meta: {
                    require: true,
                    title: '网站设置'
                },
            },
            {
                path: '/Dashboard/about',
                name: 'about',
                component: () => import('@/views/Dashboard/components/about/index.vue'),
                meta: {
                    require: true,
                    title: '关于'
                },
            },
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
