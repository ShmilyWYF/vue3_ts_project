import {
    getCaptchaByEmail,
    getUserinfo,
    registerUser,
    restUser, UpdateUserinfo,
    userOut,
    userToken
} from "@/mock/userApi/tempalte/userTemplate";


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
        url: '/user/getInfo',
        type: 'post',
        template: getUserinfo,
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
        url: 'user/emailCaptcha',
        type: 'get',
        template: getCaptchaByEmail,
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
]


export default userApi
