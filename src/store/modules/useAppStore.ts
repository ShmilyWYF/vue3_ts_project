import api from '@/axios'
import {AxiosResponse} from "axios";
import {getCookie, setStorageKeyCookie} from "@/utils/cookie";

const {useAppApi} = api

const useAPPState = {
    useState: {
        themeConfig: {},
        websiteConfig: {
            isCommentReview: 0,
            multiLanguage: 0,
            webSiteLog: '#',
            webSiteName: '博客',
            englishName: 'blog',
            websiteCreateTime: new Date(),
            notice: '网站暂时停止运营',
            beianNumber: '000000',
            qqLogin: 0,
        },
    },
    asideList: {
        commentsList: [],
        WebsiteInformation: [],
        introduction: [],
        tags: [],
    },
}

const mutations = {
    SET_USE_APP_STATE: (useAppStore: any, option: any) => {
        useAppStore.useState = option
    },
    SET_USE_STATE_TREE: (useAppStore: any, data: any) => {
        const keyArr = Object.keys(data);
        if (keyArr.length > 1) {
            for (let i: number = 0; i < keyArr.length; i++) {
                if (useAppStore.useState.themeConfig.hasOwnProperty(keyArr[i])) {
                    useAppStore.useState.themeConfig[keyArr[i]] = data[keyArr[i]]
                }
            }
            return
        }
        if (useAppStore.useState.themeConfig.hasOwnProperty(keyArr[0])) {
            useAppStore.useState.themeConfig[data[0]] = data[keyArr[0]]
        }
    },
    SET_ASIDE_LIST(useAppStore: any, options: []): void {
        useAppStore.asideList = options
    },
}

const actions: any = {
    getGlobalConfiguration({commit, state}: any) {
        return new Promise((resolve, reject) => {
            useAppApi.getUseAppConfig().then((res: AxiosResponse) => {
                let {data} = res.data
                // 网站头信息设置
                let link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = data.websiteConfig.webSiteLog
                document.getElementsByTagName('head')[0].appendChild(link);
                document.title = data.websiteConfig.webSiteName
                commit('SET_USE_APP_STATE', data)
                resolve(data)
            }, (error: Error): void => {
                // 接口异常采用默认主题方案
                commit('SET_USE_APP_STATE', useAPPState.useState)
                reject(error)
            }).finally(()=>{
                // 网站缓存设置过期时间  方案采用cookie保存localStorage Key
                if (getCookie('storage') === undefined) {
                    // 清空旧localStorage
                    localStorage.setItem('vuex', '')
                    // 设置新的storage时间
                    setStorageKeyCookie()
                }
            })
        })
    },
    themeConfig({commit}: any, data: any) {
        commit('SET_USE_STATE_TREE', data)
    },
    // 获取aside列表数据
    getAside({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.acticleAsideList) {
                resolve(state.acticleAsideList)
            } else {
                useAppApi.getAsideConfig().then((res: AxiosResponse) => {
                    const {data} = res.data
                    commit('SET_ASIDE_LIST', data)
                    resolve(data)
                }, (error: any) => {
                    reject(error)
                })
            }
        })
    },
}

export default {
    namespaced: true,
    useAPPState,
    mutations,
    actions
}
