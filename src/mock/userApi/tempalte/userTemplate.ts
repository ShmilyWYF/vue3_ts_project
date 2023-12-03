import {UserAuthinterface, UserInfoInterface} from "@/interface";

const userAuth=<UserAuthinterface[]>[
    {
        id: 1,
        user_info_id: 1,
        username: "123456@qq.com",
        password: "123456",
        ip_address: "1.1.1.1",
        ip_source: "中国",
        create_time: new Date(),
        update_time: null,
        last_login_time: new Date(),
        login_type: 1,
    },
    {
        id: 2,
        user_info_id: 2,
        username: "666@qq.com",
        password: "123456",
        ip_address: "1.1.1.1",
        ip_source: "中国",
        create_time: new Date(),
        update_time: null,
        last_login_time: new Date(),
        login_type: 0,
    }
]

export const userinfo = <UserInfoInterface[]>[
    {
        id: 1,
        email: '123456@qq.com',
        nickname: '管理员',
        avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
        intro: "管理员介绍",
        website: "https://github.com",
        isSubscribe: 0,
        isDisable: 0,
        createTime: new Date(),
        updateTime: null,
    },
    {
        id: 2,
        email: '666@qq.com',
        nickname: '普通用户',
        avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
        intro: "普通用户介绍",
        website: "https://github.com",
        isSubscribe: 0,
        isDisable: 0,
        // createTime: parseInt(String(new Date().getTime() / 1000)),
        createTime: new Date(),
        updateTime: null,
    }
]

export const userToken = (user: any) => {
    const {username,password} = JSON.parse(user)
    // 服务器储存用户信息返回token给浏览器，服务器设置sesstion储存时间，如3天； 三天后浏览器token过期需要重新认证
    let index = userAuth.findIndex(value => value.username == username);
    if (index != -1){
        if (userAuth[index].password != password){
            return {code:205,messages:'密码错误~'};
        }
        if (userAuth[index].login_type != 1){
            return {code:200,messages:'登陆成功~',token: 'ordinaryUser'}
        }else {
            return {code:200,messages:'登陆成功~',token: 'adminUser'}
        }
    }else {
        return {code:400,messages:'未找到用户'};
    }
}

interface userInfoVo {
    id: number,
    password: string,
    nickname: string,
    avatar: string,
    createTime: Date,
    email: string,
    intro: string,
    isDisable: number,
    isSubscribe: number,
    updateTime: Date | null,
    website: string,
    type: number,
    last_login_time: Date,
}

export const getUserinfo = (token: string) => {
    if (token == 'adminUser') {
         let auth = userAuth.find(value => value.id = 1);
         let info = userinfo.find(value => value.id == auth?.user_info_id );
        return <userInfoVo>{
            avatar: info?.avatar,
            createTime: info?.createTime,
            email: info?.email,
            id: auth?.id,
            intro: info?.intro,
            isDisable: info?.isDisable,
            isSubscribe: info?.isSubscribe,
            nickname: info?.nickname,
            password: auth?.password,
            updateTime: null,
            website: info?.website,
            type: auth?.login_type,
            last_login_time: auth?.last_login_time,
        }
    } else {
        let auth = userAuth.find(value => value.id = 2);
        let info = userinfo.find(value => value.id == auth?.id );
        return <userInfoVo>{
            avatar: info?.avatar,
            createTime: info?.createTime,
            email: info?.email,
            id: auth?.id,
            intro: info?.intro,
            isDisable: info?.isDisable,
            isSubscribe: info?.isSubscribe,
            nickname: info?.nickname,
            password: auth?.password,
            updateTime: null,
            website: info?.website,
            type: auth?.login_type,
            last_login_time: auth?.last_login_time,
        }
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

const hasEmailBindCaptcha =  {
    email: '',
    chptcha: '',
}

export const getCaptchaByEmail = (email:string) => {
    hasEmailBindCaptcha.email = email;
    hasEmailBindCaptcha.chptcha = String(Math.floor(Math.random() * 9999 + 1000))
    console.log(hasEmailBindCaptcha.chptcha)
    setTimeout(()=>{
        hasEmailBindCaptcha.email = ''
        hasEmailBindCaptcha.chptcha = ''
        console.log('验证码过期~',hasEmailBindCaptcha)
    },60*1000)
    return {code:200,messages:'验证码已发送~'}
}

export const registerUser = (registerinfo:string) =>{
    const {username,captcha,password} = <{ username: string, captcha: string, password: string }>JSON.parse(registerinfo)
    if (hasEmailBindCaptcha.chptcha == captcha&&hasEmailBindCaptcha.email == username){
        let index = userAuth.findIndex(value => value.username === username);
        if (index != -1){
            return {code:200,messages:'用户已存在~'}
        }else {
            userinfo.unshift({
                avatar: "https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg",
                createTime: new Date(),
                email: username,
                id: userinfo.length+1,
                intro: "",
                isDisable: 0,
                isSubscribe: 0,
                nickname: String(Math.floor(Math.random() * 1000000000)+'0'+String(Date.now())),
                updateTime: null,
                website: "",
            })
            let index = userinfo.findIndex(value => {
                console.log(value)
                return value.email == username
            })
            userAuth.unshift({
                create_time: new Date(),
                id: userAuth.length+1,
                ip_address: "1.1.1.1",
                ip_source: "中国",
                last_login_time: null,
                login_type: 0,
                password: password,
                update_time: null,
                user_info_id: 0,
                username: userinfo[index].email
            })
            return {code:200,messages:'注册成功~'}
        }
    }
    return {code:500,messages:'出错,验证码已过期，请再试~'}
}

export const restUser = (registerinfo:string) => {
    const {username,captcha,password} = <{ username: string, captcha: string, password: string }>JSON.parse(registerinfo)
    if (hasEmailBindCaptcha.chptcha == captcha&&hasEmailBindCaptcha.email == username){
        let index = userAuth.findIndex(value => value.username == username);
        userAuth[index].password = password
        return {code: 200,messages:'密码重置成功~'}
    }
    return {code: 500,messages:'验证码错误~'}
}

export const UpdateUserinfo = (user:string)=> {
    let parse = <userInfoVo>JSON.parse(user);
    try {
        const index = userAuth.findIndex(value => value.id = parse.id);
        if (index != -1) {
            userAuth[index].password = parse.password;
            userAuth[index].update_time = new Date();
        }
        let userinfoIndex = userinfo.findIndex(value => value.id == userAuth[index].user_info_id);
        if (userinfoIndex != -1) {
            userinfo[userinfoIndex].updateTime = new Date();
            userinfo[userinfoIndex].isSubscribe = parse.isSubscribe;
            userinfo[userinfoIndex].intro = parse.intro;
            userinfo[userinfoIndex].nickname = parse.nickname;
            userinfo[userinfoIndex].website = parse.website;
            userinfo[userinfoIndex].avatar = parse.avatar;
        }
        return {code:200,messages:'修改成功~'}
    } catch (e) {
        return {code:500,messages:'出现错误~'}
    }

}
