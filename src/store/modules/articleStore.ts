import api from "@/axios";
import {ArticleInterface} from "@/interface";
import {AxiosResponse} from "axios";
import store from "@/store";

const {articleApi} = api

const articleState = {
    featureArticleData: [],
    // 展示前台标签所选文章列表，不包括草稿
    articleList: {},
    articleContext: [],
    allArticle: {},
    articleByStatusList: []
}

const mutations = {
    SET_FEATURE_ARTICLE_DATA(articleStore: any, option: ArticleInterface[]): void {
        articleStore.featureArticleData = option
    },
    SET_ARTICLE_LIST(articleStore: any, options: []): void {
        articleStore.articleList = options
    },
    SET_ARTICLE_CONTEXT(articleStore: any, options: []): void {
        articleStore.articleContext = options
    },
    SET_ALL_ARTICLE(articleStore: any, options: []): void {
        articleStore.allArticle = options
    },
}

const actions: any = {
    // Feature列表数据
    getFeatureArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            if (state.featureArticleData) {
                resolve(state.featureArticleData)
            } else {
                articleApi.getFeatureArticle().then((res: AxiosResponse) => {
                    const {data} = res.data
                    commit('SET_FEATURE_ARTICLE_DATA', data)
                    resolve(data)
                }, (error: any): void => {
                    reject(error)
                })
            }
        })
    },
    // 根据分类返回文章列表
    getArticleListByCategory({commit, state}: any, categoryName: string) {
        return new Promise((resolve, reject) => {
            if (state.articleList?.hasOwnProperty(categoryName)) {
                store.commit('categoryStore/SET_ARTICLE_CATAGORY_ACTIVE', categoryName)
                resolve(state.articleList[categoryName])
            } else {
                const params = categoryName !== 'ALL' ? {category: categoryName} : null;
                articleApi.getArticleListByCategory(params).then((res: AxiosResponse) => {
                    const {data} = res.data
                    // 缓存活动标签
                    store.commit('categoryStore/SET_ARTICLE_CATAGORY_ACTIVE', params != null ? params.category : "ALL")
                    // 解析对象
                    const mergeObject = {...{[params != null ? params.category : "ALL"]: data}, ...state.articleList}
                    commit('SET_ARTICLE_LIST', mergeObject)
                    resolve(data)
                }, (error: any) => {
                    reject(error)
                })
            }
        })
    },
    // 根据id获得文章
    getArticleById({commit, state}: any, id: { id: number }) {
        return new Promise((resolve, reject) => {
            if (state.articleContext?.hasOwnProperty(id)) {
                resolve(state.articleContext[id.id])
            } else {
                articleApi.getArticleById(id).then((res: AxiosResponse) => {
                    const {data} = res.data
                    const mergeObject = {...{[data.id]: data,}, ...state.articleContext}
                    commit('SET_ARTICLE_CONTEXT', mergeObject)
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
    articleState,
    mutations,
    actions
}

