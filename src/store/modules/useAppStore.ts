import api from '@/axios'
import {AxiosResponse} from "axios";

const {useAppApi} = api

const useAPPState = {
    useState: {
        themeConfig: {},
        websiteConfig: {
            isCommentReview: false,
        },
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
}

const actions: any = {
    getGlobalConfiguration({commit}: any) {
        return new Promise((resolve, reject) => {
            useAppApi.getUseAppConfig().then((res: AxiosResponse) => {
                let {data} = res.data
                commit('SET_USE_APP_STATE', data)
                resolve(data)
            }, (error: any): void => {
                reject(error)
            })
        })
    },
    themeConfig({commit}: any, data: any) {
        commit('SET_USE_STATE_TREE', data)
    },
}

export default {
    namespaced: true,
    useAPPState,
    mutations,
    actions
}
