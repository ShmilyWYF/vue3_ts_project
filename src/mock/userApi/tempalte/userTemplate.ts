export const userToken = (user:any)=>{
  const userinfo = JSON.parse(user)
  // 服务器储存用户信息返回token给浏览器，服务器设置sesstion储存时间，如3天； 三天后浏览器token过期需要重新认证
  if (userinfo.username !== 'root'){
    return {
      // 普通用户信息
      token: "11111111111token",
    }
  }else {
    if(userinfo.password == '123456'){
      return {
        token: "123456token",
      }
    }else {
      return "密码错误"
    }
  }
}

export const userinfo = (token:string) =>{
  return token !== "123456token"?{id: 1, type: 1, username: "普通用户"}:{id: 1, type: 0, username: "root"}
}

// session会过期 需要在路由或者获取用户时根据后端返回情况进行逻辑更改
export const userOut = (token:string)=>{
   if(token!=undefined){
    return {
      state: 200,
      message: '已删除服务器端当前用户的session和cookie'
    }
  }else {
    return{
      state: 500,
      message: '用户不存在或token已过期'
    }
  }
}
