// 获取类别列表
import api from "@/axios";
import {AxiosResponse} from "axios";

const {tagsApi} = api

const tagState = {
    tagList: {},
}

const mutations = {
    SET_TAG_LIST(tagStore: any, options: []): void {
        tagStore.tagList = options
    },
}

const actions: any = {
    // 获取文章标签列表
    getArticleTagList({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.articleTagList) {
                resolve(state.articleTagList)
            } else {
                tagsApi.getTags().then((res: AxiosResponse) => {
                    const {data} = res.data
                    commit('SET_TAG_LIST', data)
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
    tagState,
    mutations,
    actions
}
