export const RolesMenu = (roles: string) => {
    return roles != undefined ? [{
        id: '1',
        pid: '1',
        title: '后台管理',
        path: '/Dashboard',
        value: '@string',
        icon: [''],
        'children': [
            {
                id: '11',
                pid: '11',
                title: '首页',
                path: '/Dashboard/home',
                value: '@string',
                icon: [''],
            },
            {
                id: '12',
                pid: '12',
                title: '文章管理',
                path: '/Dashboard/mark',
                value: '@string',
                icon: [''],
            },
            {
                id: '13',
                pid: '13',
                title: '评论管理',
                path: '/Dashboard/comment',
                value: '@string',
                icon: [''],
            },
            {
                id: '14',
                pid: '14',
                title: '用户管理',
                path: '/Dashboard/user',
                value: '@string',
                icon: [''],
            },
            {
                id: '15',
                pid: '15',
                title: '网站设置',
                path: '/Dashboard/website',
                value: '@string',
                icon: [''],
            },
            {
                id: '16',
                pid: '16',
                title: '关于',
                path: '/Dashboard/about',
                value: '@string',
                icon: [''],
            }
        ]
    }] : []
}



