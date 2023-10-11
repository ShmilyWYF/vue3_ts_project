
const useArticleState = {
    article: {
        topArticle: '' as any,
        featuredArticles: [] as any,
        articles: '' as any,
        categories: '' as any,
        archives: '' as any,
        articlesByTag: '' as any,
        readingArticle: '' as any
    }
}

const mutations = {
    SET_ARTICLE_STATE(useArticleStore: any, option: any) {
        useArticleStore.article = option
    }
}

const actions = ({})

export default {
    namespaced: true,
    useArticleState,
    mutations,
    actions
}
