const getters = {
    menuList: (state: any):[] => state.routerStore.menuList,
    accessedRouters: (state: any) => state.routerStore.accessedRouters,
    menuTree: (state: any) => state.routerStore.menuTree,
    // 文章
    featureArticleData: (state: any) => state.articleStore.featureArticleData,
    articleList: (state: any) => state.articleStore.articleList,
    articleTagActive: (state: any) => state.articleStore.articleTagActive,
    articleTagList: (state: any) => state.articleStore.articleTagList,
    articleCategorylist: (state: any) => state.articleStore.articleCategorylist,
    acticleAsideList:(state: any) => state.articleStore.acticleAsideList,
    articleContext:(state: any) => state.articleStore.articleContext,
    allArticle:(state: any) => state.articleStore.allArticle,
    articleByStatusList:(state: any) => state.articleStore.articleByStatusList,
    // 主页=====>
    useAPPState: (state: any) => state.useAppStore.useAPPState,
    // isMainBg:(state: any) => state.useAppStore.isMainBg,
    // 用户信息===>
    userinfo: (state: any) => state.userStore.userinfo,
    token: (state: any) => state.userStore.token,
}

export default getters
