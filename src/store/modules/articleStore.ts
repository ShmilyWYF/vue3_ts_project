import api from "@/axios";
import {ArticleInterface} from "@/interface";
import {AxiosResponse} from "axios";
import {ElMessage} from "element-plus";

const {articleApi} = api

const articleState = {
    featureArticleData: [],
    // 展示前台标签所选文章列表，不包括草稿
    articleList: {},
    articleTagActive: '',
    articleTagList: {},
    articleCategorylist: [],
    acticleAsideList: {
        commentsList: [],
        WebsiteInformation: [],
        introduction: [],
        tags: [],
    },
    articleContext: [],
    // *包括草稿
    allArticle: {},
    articleByStatusList: []
    // articleList
}

const mutations = {
    SET_FEATURE_ARTICLE_DATA(articleStore: any, option: ArticleInterface[]): void {
        articleStore.featureArticleData = option
    },
    SET_ARTICLE_LIST(articleStore: any, options: []): void {
        articleStore.articleList = options
    },
    SET_ARTICLE_CATAGORY_ACTIVE(articleStore: any, options: string): void {
        articleStore.articleTagActive = options
    },
    SET_ARTICLE_TAG_LIST(articleStore: any, options: []): void {
        articleStore.articleTagList = options
    },
    SET_ARTICLE_Catogory_LIST(articleStore: any, options: []): void {
        articleStore.articleCategorylist = options
    },
    SET_ARTICLE_ASIDE_LIST(articleStore: any, options: []): void {
        articleStore.acticleAsideList = options
    },
    SET_ARTICLE_CONTEXT(articleStore: any, options: []): void {
        articleStore.articleContext = options
    },
    SET_ALL_ARTICLE(articleStore: any, options: []): void {
        articleStore.allArticle = options
    },
    SET_ARTICLE_BY_STATUS_LIST(articleStore: any, options: []): void {
        articleStore.articleByStatusList = options
    },
}

const actions: any = {
    // Feature列表数据
    getFeatureArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            // if (state.featureArticleData) {
            //     resolve(state.featureArticleData)
            // } else {
            articleApi.getFeatureArticle().then((res: AxiosResponse) => {
                const {data} = res.data
                commit('SET_FEATURE_ARTICLE_DATA', data)
                resolve(data)
            }, (error: any): void => {
                reject(error)
            })
            // }
        })
    },
    // 根据文章分类返回文章列表
    getArticleListByCategory({commit, state}: any, categoryName: string) {
        return new Promise((resolve, reject) => {
            // if (state.articleList?.hasOwnProperty(categoryName)) {
            //     commit('SET_ARTICLE_CATAGORY_ACTIVE',categoryName)
            //     resolve(state.articleList[categoryName])
            // } else {
            articleApi.getArticleListByCategory(categoryName).then((res: AxiosResponse) => {
                const {data} = res.data
                // 缓存活动标签
                commit('SET_ARTICLE_CATAGORY_ACTIVE', categoryName)
                // 解析对象
                const mergeObject = {...{[categoryName]: data}, ...state.articleList}
                commit('SET_ARTICLE_LIST', mergeObject)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
            // }
        })
    },
    // 获取文章标签列表
    getArticleTagList({commit, state}: any) {
        return new Promise((resolve, reject) => {
            // if(state.articleTagList){
            //     resolve(state.articleTagList)
            // }else {
            articleApi.getArticleTagList().then((res: AxiosResponse) => {
                const {data} = res.data
                commit('SET_ARTICLE_TAG_LIST', data)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
            // }
        })
    },
    // 获取文章类别列表
    getArticleCategorylist({commit, state}: any) {
        return new Promise((resolve, reject) => {
            // if(state.articleCategorylist){
            //     resolve(state.articleCategorylist)
            // }else {
            articleApi.getArticleCategorylist().then((res: AxiosResponse) => {
                const {data} = res.data
                commit('SET_ARTICLE_Catogory_LIST', data)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
            // }
        })
    },
    // 获取aside列表数据
    getAllArticleAsideList({commit, state}: any) {
        return new Promise((resolve, reject) => {
            // if (state.acticleAsideList) {
            //     resolve(state.acticleAsideList)
            // } else {
            articleApi.getAllArticleAsideList().then((res: AxiosResponse) => {
                const {data} = res.data
                commit('SET_ARTICLE_ASIDE_LIST', data)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
            // }
        })
    },
    // 根据id获得文章
    getArticleById({commit, state}: any, id: number) {
        return new Promise((resolve, reject) => {
            // if(state.articleContext?.hasOwnProperty(id)){
            //         resolve(state.articleContext[id])
            // }else {
            articleApi.getArticleById(id).then((res: AxiosResponse) => {
                const {data} = res.data
                const mergeObject = {...{[data.id]: data,}, ...state.articleContext}
                commit('SET_ARTICLE_CONTEXT', mergeObject)
                resolve(data)
            }, (error: any) => {
                reject(error)
            })
            // }
        })
    },
    // 获取所有文章
    getAllArticle({commit, state}: any) {
        return new Promise((resolve, reject) => {
            articleApi.getAllArticle().then((res: AxiosResponse) => {
                const {data} = res.data
                if (!data) {
                    reject('获取失败')
                }
                commit('SET_ALL_ARTICLE', data)
                resolve(data)
            }, (error: Error) => {
                reject(error)
            })
        })
    },
    // 根据状态获取文章列表
    getArticleListByStatus({commit, state}: any, statusName: string) {
        return new Promise((resolve, reject) => {
            articleApi.getArticleListByStatus(statusName).then((res: AxiosResponse) => {
                const {data} = res.data
                if (!data) {
                    reject('获取失败')
                }
                // 缓存当前状态查出的列表
                const mapperObj = {...{[statusName]: data}, ...state.ArticleByStatusList}
                commit('SET_ARTICLE_BY_STATUS_LIST', mapperObj)
                resolve(data)
            }, (error: Error) => {
                reject(error)
            })
        })
    },
    // 添加文章
    addArticle({}, articleData: {}) {
        return new Promise((resolve, reject) => {
            articleApi.addArticle(articleData).then((res: any) => {
                const {data} = res.data
                if (!data) {
                    reject('添加失败')
                }
                ElMessage.success('添加成功')
                // 将添加的当前条加入缓存
                resolve(data)
            }, (error: Error) => {
                reject(error)
            })
        })
    },
    // 按id获取文章上下文
    getArticleContentById({}, id: number) {
        return new Promise((resolve, reject) => {
            articleApi.getArticleContentById(id).then((res: any) => {
                const {data} = res.data
                // 允许文章为空
                // if(!data){
                //     reject('获取上下文失败');
                // }
                resolve(data)
            })
        })
    },
    // 更新文章
    updateArticleContextById({state}: any, articleInfo: { id: number, articleContent: string }) {
        return new Promise((resolve, reject) => {
            articleApi.updateArticleContextById(articleInfo).then((res: any) => {
                const {data} = res.data
                if (!data) {
                    reject("Error,更新失败")
                }
                resolve(data)
            })
        })
    },
    // 更新文章标签
    updateArticleAttributeById({state}: any, articleInfo: { id: number, value: number, attributeName: number }) {
        return new Promise((resolve, reject) => {
            articleApi.updateArticleAttributeById(articleInfo).then((res: any) => {
                const {data} = res.data
                if (!data) {
                    reject("Error,更新失败")
                }
                resolve(data)
            })
        })
    }
}

export default {
    namespaced: true,
    articleState,
    mutations,
    actions
}

