import api from "@/axios";
import store from "@/store";

const articleApi = api.articleApi

const articleState = {
    featureArticleData: {},
    articleList: {},
    activeName: '',
}

const obj = {};
const mutations = {
    SET_FEATURE_ARTICLE_DATA(articleStore: any, option: any): void {
        articleStore.featureArticleData = option
    },
    SET_ARTICLE_LIST(articleStore: any, options:{}): void {
        Object.assign(obj, options)
        articleStore.articleList = obj
    },
    SET_ACTIVE_NAME(articleStore: any, options:string): void {
        articleStore.activeName = options
    },
}

const actions: any = {
    getFeatureArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.featureArticleData) {
                console.log('调用featureArticle缓存')
                resolve(store.getters.featureArticleData)
            } else {
            articleApi.getFeatureArticle().then((res: any) => {
                let {data} = res.data
                if (data.hasOwnProperty('data')) {
                    data = data.data
                }
                commit('SET_FEATURE_ARTICLE_DATA', data)
                resolve(data)
            }, (error: any): void => {
                reject(error)
            })
            }
        })
    },

    getArticleListByName({commit}: any, listName: string) {
        return new Promise((resolve, reject) => {
            if (store.getters.articleList?.hasOwnProperty(listName)) {
                commit('SET_ACTIVE_NAME',listName)
                resolve(store.getters.articleList[listName])
            } else {
                console.log('不存在')
                articleApi.getArticleListByName(listName).then((res: any) => {
                    console.log(res)
                    // data解构赋值 data = res.data.data
                    let {data} = res.data
                    // 判断data下是否还有data  兼容mock模拟数据
                    if (data.hasOwnProperty('data')) {
                        data = data.data
                    }
                    // const option = Object.keys(listName).reduce((prev: any) => {
                    //     prev[listName] = {
                    //         [listName]: data
                    //     }
                    //     return prev
                    // }, {})
                    const option = {[listName]: data}
                    commit('SET_ACTIVE_NAME',listName)
                    commit('SET_ARTICLE_LIST', option)
                    resolve(data)
                }, (error: any) => {
                    reject(error)
                })
            }
        })
    }
}
export default {
    namespaced: true,
    articleState,
    mutations,
    actions
}

