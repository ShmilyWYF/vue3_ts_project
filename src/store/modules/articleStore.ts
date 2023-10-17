import api from "@/axios";
import store from "@/store";
import {mockData} from "@/utils/util";

const {articleApi} = api

const articleState = {
    featureArticleData: {},
    articleList: {},
    activeName: '',
    acticleAsideList:{
        commentsList: [],
        WebsiteInformation: [],
        introduction: [],
        tags: [],
    },
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
    SET_ARTICLE_Aside_LIST(articleStore: any, options:string): void {
        articleStore.acticleAsideList = options
    },
}

const actions: any = {
    getFeatureArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.featureArticleData) {
                console.log('featureArticleData调用缓存')
                resolve(state.featureArticleData)
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
    getArticleListByName({commit,state}: any, listName: string) {
        return new Promise((resolve, reject) => {
            if (state.articleList?.hasOwnProperty(listName)) {
                commit('SET_ACTIVE_NAME',listName)
                resolve(store.getters.articleList[listName])
            } else {
                articleApi.getArticleListByName(listName).then((res: any) => {
                    const data = mockData(res)
                    const option = {[listName]: data}
                    commit('SET_ACTIVE_NAME',listName)
                    commit('SET_ARTICLE_LIST', option)
                    resolve(data)
                }, (error: any) => {
                    reject(error)
                })
            }
        })
    },
    getAllArticleAsideList({commit,state}:any){
        return new Promise((resolve, reject) => {
            if (state.acticleAsideList) {
                console.log('acticleAsideList调用缓存')
                resolve(state.acticleAsideList)
            } else {
            articleApi.getAllArticleAsideList().then((res:any)=>{
                const data = mockData(res)
                commit('SET_ARTICLE_Aside_LIST',data)
                resolve(data)
             }),(error:any)=>{
                reject(error)
            }
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

