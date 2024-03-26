import {
    deleteUser, disableUserById, getAlluser,
    getUserinfo,
    registerUser,
    restUser, UpdateUserinfo,
    userOut,
    userToken
} from "@/mock/userApi/template/userTemplate";


const userApi: any = [
    {
        url: '/user/login',
        type: 'post',
        template: userToken,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/user/logout',
        type: 'post',
        template: userOut,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/user/info',
        type: 'post',
        template: getUserinfo,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/registerUser',
        type: 'post',
        template: registerUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/restUser',
        type: 'post',
        template: restUser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/userinfo',
        type: 'update',
        template: UpdateUserinfo,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/info',
        type: 'get',
        template: getAlluser,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/undisable',
        type: 'get',
        template: disableUserById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/disable',
        type: 'get',
        template: disableUserById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/recovery',
        type: 'get',
        template: disableUserById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'user/remove',
        type: 'delete',
        template: deleteUser,
        code: Number(200),
        status: true,
        condition: true
    },

]


export default userApi
