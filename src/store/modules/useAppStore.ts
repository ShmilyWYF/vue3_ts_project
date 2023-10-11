import api from '@/axios'
import cookies from 'js-cookie'
import {start} from "@/utils/nporgress";

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
    useState: {
        themeConfig: {
            theme: '',
            profile_shape: '',
            feature: true,
            gradient: {
                color_1: '',
                color_2: '',
                color_3: ''
            },
            header_gradient_css: '',
            background_gradient_style: {
                background: '',
                '-webkit-background-clip': '',
                '-webkit-text-fill-color': '',
                '-webkit-box-decoration-break': '',
                'box-decoration-break': ''
            }
        },
        appLoading: false,
        websiteConfig: '' as any,
        viewCount: 0,
        articleCount: 0,
        talkCount: 0,
        categoryCount: 0,
        tagCount: 0,
        NPTimeout: 0,
        loadingTimeout: 0,
        aurora_bot_enable: false
    }
}

const mutations = {
    SET_USE_APP_STATE: (useAppStore: any, option: any) => {
        useAppStore.useState = option
    },
    SET_USE_STATE_TREE: (useAppStore: any, option: { key: any[], data: any }) => {
        console.log(option)
        if(option.key.length>1){
            for (let i = 0; i < option.key.length; i++) {
                if (useAppStore.useState.themeConfig.hasOwnProperty(option.key[i])) {
                    useAppStore.useState.themeConfig[i] = Object.values(option.data.key[i])
                }
            }
            return
        }
        console.log(useAppStore,option.key[0])
        if (useAppStore.useState.themeConfig.hasOwnProperty(option.key[0])) {
            useAppStore.useState.themeConfig[option.key[0]] = option.data
        }
    },
}

const actions = {
    theme({commit}: any){
        return new Promise((resolve, reject)=>{
            useAppApi.getUseAppConfig().then((res:any)=>{
                let {data} = res.data
                if (data.hasOwnProperty('data')) {
                    data = data.data
                }
                commit('SET_USE_APP_STATE', data)
                resolve(data)
            }),(error:any):void=>{
                console.log(error)
                reject(error)
            }
        })
    },
    themeConfig({commit}: any, data: any) {
        commit('SET_USE_STATE_TREE', {'key':Object.keys(data), 'data': data})
    },
    startLoading() {
        if (useAPPState.useState.appLoading) return
        if (useAPPState.useState.NPTimeout !== -1) clearTimeout(useAPPState.useState.NPTimeout)
        if (useAPPState.useState.loadingTimeout !== -1) clearTimeout(useAPPState.useState.loadingTimeout)
        start();
        useAPPState.useState.appLoading = true
        // store.commit('SET_USE_STATE_TREE', {'key': 'appLoading', 'data': true})
    }
}

export default {
    namespaced: true,
    useAPPState,
    mutations,
    actions
}
