import {UserInfoInterface} from "@/interface";
import Mock from "mockjs";

export const userToken = (user: any) => {
    const userlogin = JSON.parse(user)
    // 服务器储存用户信息返回token给浏览器，服务器设置sesstion储存时间，如3天； 三天后浏览器token过期需要重新认证
    if (userlogin.username !== 'root') {
        if (userlogin.password == '123456') {
            return {
                token: 'ordinaryUser',
            }
        } else {
            return "密码错误"
        }
    } else {
        // 准备报错
        if (userlogin.password == '123456') {
            return {
                token: 'adminUser',
            }
        } else {
            return "密码错误"
        }
    }
}


const data = Mock.mock([
    {
        id: '@increment',
        email: '123456@qq.com',
        nickname: '管理员',
        avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
        intro: "管理员介绍",
        website: "https://github.com",
        isSubscribe: 0,
        isDisable: 0,
        createTime: parseInt(String(new Date().getTime() / 1000)),
        updateTime: null,
        type: 1,
    },
    {
        id: '@increment',
        email: '123456@qq.com',
        nickname: '普通用户',
        avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
        intro: "普通用户介绍",
        website: "https://github.com",
        isSubscribe: 0,
        isDisable: 0,
        createTime: parseInt(String(new Date().getTime() / 1000)),
        updateTime: null,
        type: 0,
    },
])
export const allUserInfo: UserInfoInterface[] = data

export const userinfo = (token: string) => {
    if (token !== 'adminUser') {
        return allUserInfo[1]
    } else {
        return allUserInfo[0]
    }
}

// session会过期 需要在路由或者获取用户时根据后端返回情况进行逻辑更改
export const userOut = (token: string) => {
    if (token != undefined) {
        return {
            state: 200,
            message: '已删除服务器端当前用户的session和cookie'
        }
    } else {
        return {
            state: 500,
            message: '用户不存在或token已过期'
        }
    }
}
