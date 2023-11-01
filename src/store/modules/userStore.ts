import api from "@/axios";
import {removeCookie, setCookie} from "@/utils/cookie";
import {ElMessage} from "element-plus";
import router from "@/router";
import {AxiosResponse} from "axios";

const userApi = api.userApi
const userState = {
    userinfo: {},
    token:''
}

const mutations = {
    SET_USER_INFO(routerStore:any,option:{}){
        routerStore.userinfo = option
    },
    SET_USER_TOKEN(routerStore:any,option:{}){
        routerStore.token = option
    }
}

const actions:any = {
    login({commit,state}:any,user:{}){
        return new Promise((resolve, reject) => {
             userApi.login(user).then((res: AxiosResponse) => {
                 const data = res.data
                 if (!data.token) {
                     ElMessage.error(data)
                     reject(data)
                 }
                 commit('SET_USER_TOKEN',data.token)
                 setCookie(data.token)
                 resolve(data.token)
             },(error:any)=>{
                reject(error)
            })
        })
    },
    getInfo({commit,state}:any,token:string){
        return new Promise((resolve, reject) => {
            if(state.userinfo){
                resolve(state.userinfo)
            }else {
                userApi.getInfo(token).then((res:AxiosResponse)=>{
                    const data = res.data
                    commit('SET_USER_INFO',data)
                    resolve(data)
                },(error:any)=>{
                    reject(error)
                })
            }
        })
    },
    logout({commit,state}:any,token:string){
        return new Promise((resolve, reject) => {
                userApi.logout(token).then((res:AxiosResponse)=>{
                    const data = res.data
                    if(data.state!==200){
                        ElMessage.success('退出失败！')
                    }
                    // 删除用户缓存
                    commit('SET_USER_INFO','')
                    // 删除token缓存
                    commit('SET_USER_TOKEN','')
                    // 删除cookie
                    removeCookie()
                    // 删除路由
                    if(router.hasRoute('Dashboard')){
                        router.removeRoute('Dashboard')
                    }
                    ElMessage.success(data.message)
                    resolve(true)
                },(error:any)=>{
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    userState,
    mutations,
    actions
}
