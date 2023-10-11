const getters = {
    menuList: (state: any):[] => state.routerStore.menuList,
    accessedRouters: (state: any) => state.routerStore.accessedRouters,
    menuTree: (state: any) => state.routerStore.menuTree,
    // 文章
    featureArticleData: (state: any) => state.articleStore.featureArticleData,
    articleList: (state: any) => state.articleStore.articleList,
    activeName: (state: any) => state.articleStore.activeName,
    // 主页=====>
    useAPPState: (state: any) => state.useAppStore.useAPPState,
    article: (state: any) => state.useArticleStore.article,
}

export default getters
