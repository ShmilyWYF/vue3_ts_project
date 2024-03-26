import {RolesMenu} from '@/mock/menuApi/template/menuTemplate'


const menuApi = [
    {
        url: '/route/menu',
        type: 'get',
        template: RolesMenu,
        code: Number(200),
        status: true,
        condition: true
    },
]

export default menuApi
