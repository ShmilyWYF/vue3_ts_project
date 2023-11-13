import api from '@/axios'
import {AxiosResponse} from "axios";

const {useAppApi} = api

// const useAPPStateMock = {
//     themeConfig: {
//         theme: cookies.get('theme') ? String(cookies.get('theme')) : 'theme-dark',
//         profile_shape: 'circle-avatar',
//         feature: true,
//         gradient: {
//             color_1: '#24c6dc',
//             color_2: '#5433ff',
//             color_3: '#ff0099'
//         },
//         header_gradient_css: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
//         background_gradient_style: {
//             background: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
//             '-webkit-background-clip': 'text',
//             '-webkit-text-fill-color': 'transparent',
//             '-webkit-box-decoration-break': 'clone',
//             'box-decoration-break': 'clone'
//         }
//     },
//     appLoading: false,
//     websiteConfig: '' as any,
//     viewCount: 0,
//     articleCount: 0,
//     talkCount: 0,
//     categoryCount: 0,
//     tagCount: 0,
//     NPTimeout: -1,
//     loadingTimeout: -1,
//     aurora_bot_enable: true
// }
const useAPPState = {
    useState: {},
}

const mutations = {
    SET_USE_APP_STATE: (useAppStore: any, option: any) => {
        useAppStore.useState = option
    },
    SET_USE_STATE_TREE: (useAppStore: any, data: any ) => {
        const keyArr = Object.keys(data);
        if (keyArr.length > 1) {
            for (let i:number = 0; i < keyArr.length; i++) {
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
    theme({commit}: any) {
        return new Promise((resolve, reject) => {
            useAppApi.getUseAppConfig().then((res: AxiosResponse) => {
                let {data} = res.data
                commit('SET_USE_APP_STATE', data)
                resolve(data)
            },(error: any): void => {
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
