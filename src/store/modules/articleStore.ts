import api from "@/axios";
import {mockData} from "@/utils/util";
import {ArticleInterface, ArticleListTagInterface} from "@/interface";

const {articleApi} = api

const articleState = {
    featureArticleData: [],
    articleList: {},
    articleTagActive: '',
    articleTagList: {},
    acticleAsideList:{
        commentsList: [],
        WebsiteInformation: [],
        introduction: [],
        tags: [],
    },
}

const obj = {};
const mutations = {
    SET_FEATURE_ARTICLE_DATA(articleStore: any, option: ArticleInterface[]): void {
        articleStore.featureArticleData = option
    },
    SET_ARTICLE_LIST(articleStore: any, options: {}): void {
        Object.assign(obj, options)
        articleStore.articleList = obj
    },
    SET_ARTICLE_TAG_ACTIVE(articleStore: any, options:string): void {
        articleStore.articleTagActive = options
    },
    SET_ARTICLE_TAG_LIST(articleStore: any, options: []): void {
        articleStore.articleTagList = options
    },
    SET_ARTICLE_ASIDE_LIST(articleStore: any, options: []): void {
        articleStore.acticleAsideList = options
    },
}

const actions: any = {
    // Feature列表数据
    getFeatureArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.featureArticleData) {
                resolve(state.featureArticleData)
            } else {
            articleApi.getFeatureArticle().then((res: any) => {
                const data = mockData(res)
                commit('SET_FEATURE_ARTICLE_DATA', data)
                resolve(data)
            }, (error: any): void => {
                reject(error)
            })
            }
        })
    },
    // 根据文章标签返回相应列表
    getArticleListByName({commit,state}: any, listName: string) {
        return new Promise((resolve, reject) => {
            if (state.articleList?.hasOwnProperty(listName)) {
                commit('SET_ARTICLE_TAG_ACTIVE',listName)
                resolve(state.articleList[listName])
            } else {
                articleApi.getArticleListByName(listName).then((res: ArticleInterface[]) => {
                    const data = mockData(res)
                    // 缓存活动标签
                    commit('SET_ARTICLE_TAG_ACTIVE',listName)
                    // 解析对象
                    const option = {[listName]: data}
                    commit('SET_ARTICLE_LIST', option)
                    resolve(data)
                }, (error: any) => {
                    reject(error)
                })
            }
        })
    },
    // 获取文章标签列表
    getArticleTagList({commit,state}:any){
        return new Promise((resolve, reject)=>{
            if(state.articleTagList){
                resolve(state.articleTagList)
            }else {
            articleApi.getArticleTagList().then((res:ArticleListTagInterface[])=>{
                const data = mockData(res)
                commit('SET_ARTICLE_TAG_LIST',data)
                resolve(data)
            },(error:any)=>{
                reject(error)
            })
            }
        })
    },
    // 获取aside列表数据
    getAllArticleAsideList({commit,state}:any){
        return new Promise((resolve, reject) => {
            if (state.acticleAsideList) {
                resolve(state.acticleAsideList)
            } else {
            articleApi.getAllArticleAsideList().then((res:any)=>{
                const data = mockData(res)
                commit('SET_ARTICLE_ASIDE_LIST',data)
                resolve(data)
             },(error:any)=>{
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

