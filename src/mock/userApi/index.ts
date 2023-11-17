import {userinfo, userOut, userToken} from "@/mock/userApi/tempalte/userTemplate";


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
        template: userinfo,
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
]


export default userApi
