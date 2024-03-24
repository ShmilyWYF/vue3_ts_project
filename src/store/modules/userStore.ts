import api from "@/axios";
import {removeCookie, setCookie} from "@/utils/cookie";
import router from "@/router";
import {AxiosResponse} from "axios";

const userApi = api.userApi
const userState = {
    userinfo: {} as '',
    token: ''
}

const mutations = {
    SET_USER_INFO(userStore: any, option: any) {
        userStore.userinfo = option
    },
    SET_USER_TOKEN(userStore: any, option: any) {
        userStore.token = option
    }
}

const actions: any = {
    login({commit, state}: any, user: {}) {
        return new Promise((resolve, reject) => {
            userApi.login(user).then((res: AxiosResponse) => {
                const {data,message,code} = res.data
                if (code != 200) {
                    reject(message)
                }
                commit('SET_USER_TOKEN', data)
                setCookie(data)
                resolve(true)
            }, (error: any) => {
                reject(error)
            })
        })
    },
    getInfo({commit, state}: any, token: string) {
        return new Promise((resolve, reject) => {
            userApi.getInfo().then((res: AxiosResponse) => {
                const {data,code,message} = res.data
                if (code !== 200){
                    reject(message)
                }
                commit('SET_USER_INFO', data)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
        })
    },
    logout({commit, state}: any) {
        return new Promise((resolve, reject) => {
            userApi.logout().then((res: AxiosResponse) => {
                const {message} = res.data
                // 删除用户缓存
                commit('SET_USER_INFO', '')
                // 删除token缓存
                commit('SET_USER_TOKEN', '')
                // 删除cookie
                removeCookie()
                // 删除路由
                if (router.hasRoute('Dashboard')) {
                    router.removeRoute('Dashboard')
                }
                resolve(message)
            }, (error: Error) => {
                reject(error.message)
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
