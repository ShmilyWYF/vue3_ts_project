export const RolesMenu = (roles:string) =>{
    console.log(roles)
    return roles!=undefined?[{
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
                title: '测试',
                path: '/Dashboard/text',
                value: '@string',
                icon: [''],
            }
        ]
    }]:[]
}



