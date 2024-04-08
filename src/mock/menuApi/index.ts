import {
    addGroupRoles, addRolesMenuByUser, getGroupRoles,
    getRolesMenuByUser,
    removeGroupRoles, removeRolesMenuByUser,
    updateGroupRoles, updateRolesMenuByUser
} from '@/mock/menuApi/template/menuTemplate'


const menuApi = [
    {
        url: '/route/menu',
        type: 'post',
        template: addRolesMenuByUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/menu',
        type: 'delete',
        template: removeRolesMenuByUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/menu',
        type: 'put',
        template: updateRolesMenuByUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/menu',
        type: 'get',
        template: getRolesMenuByUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/groupMenu',
        type: 'post',
        template: addGroupRoles,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/groupMenu',
        type: 'delete',
        template: removeGroupRoles,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/groupMenu',
        type: 'put',
        template: updateGroupRoles,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/route/groupMenu',
        type: 'get',
        template: getGroupRoles,
        code: Number(200),
        status: true,
        condition: true
    },
]

export default menuApi
