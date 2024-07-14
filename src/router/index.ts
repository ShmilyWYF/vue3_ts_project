import {createMemoryHistory, createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
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
                    require: true, // 是否展示
                    title: 'blog', // 标题
                    noRedirect: false, // 是否禁止跳转
                },
            },
            {
                path: '/articles/:id',
                name: 'articles',
                component: () => import('@/views/Client/components/Articles/index.vue'),
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
                component: () => import('@/views/Client/components/TagList/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: '标签',
                    noRedirect: false,
                },
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('@/views/Client/components/About/index.vue'),
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
                component: () => import('@/views/Client/components/Message/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: '留言',
                    noRedirect: false,
                },
            },
            {
                path: '/test',
                name: 'test',
                component: () => import('@/views/Client/components/TimeZhou/index.vue'),
                props: true,
                meta: {
                    require: true,
                    title: 'Time',
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
                path: '/Dashboard/message',
                name: 'message',
                component: () => import('@/views/Dashboard/components/message/index.vue'),
                meta: {
                    require: true,
                    title: '留言'
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
            {
                path: '/Dashboard/mail',
                name: 'mail',
                component: () => import('@/views/Dashboard/components/mail/index.vue'),
                meta: {
                    require: true,
                    title: '邮件系统'
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
        ]
    }
]

const router: Router = createRouter({
    // history: createMemoryHistory(import.meta.env.APP_BASE_API),
    history: createWebHashHistory(import.meta.env.APP_BASE_API),
    routes: constantRoute,
})

// 注入路由守卫
protector(router)


export default router
