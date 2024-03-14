// 获取类别列表
import api from "@/axios";
import {AxiosResponse} from "axios";

const {categoryApi} = api

const categoryState = {
    categoryList: [],
    categoryActive: ""
}

const mutations = {
    SET_ARTICLE_CATEGORY_LIST(categoryStore: any, options: []): void {
        categoryStore.categoryList = options
    },
    SET_ARTICLE_CATAGORY_ACTIVE(categoryStore: any, options: string): void {
        categoryStore.categoryActive = options
    },
}

const actions: any = {
    // 获取分类列表
    getCategorylist({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.articleCategorylist) {
                resolve(state.articleCategorylist)
            } else {
                categoryApi.getCategorys().then((res: AxiosResponse) => {
                    const {data} = res.data
                    commit('SET_ARTICLE_CATEGORY_LIST', data)
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
    categoryState,
    mutations,
    actions
}
