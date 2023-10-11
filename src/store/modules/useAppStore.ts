import api from '@/axios'
import cookies from 'js-cookie'
import {start} from "@/utils/nporgress";
import store from "@/store";


const {userApi} = api

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
    SET_USE_STATE_TREE: (useAppStore: any, option: { key: string, data: boolean }) => {
        console.log('key:',option.key)
        useAppStore.useState.filter((res: any) => {
            if (res.toString() == option.key.toString()) {
                res = option.data
            }
        })
    },
}

const actions = {
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
