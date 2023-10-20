const getters = {
    menuList: (state: any):[] => state.routerStore.menuList,
    accessedRouters: (state: any) => state.routerStore.accessedRouters,
    menuTree: (state: any) => state.routerStore.menuTree,
    // 文章
    featureArticleData: (state: any) => state.articleStore.featureArticleData,
    articleList: (state: any) => state.articleStore.articleList,
    articleTagActive: (state: any) => state.articleStore.articleTagActive,
    articleTagList: (state: any) => state.useArticleStore.articleTagList,
    acticleAsideList:(state: any) => state.useArticleStore.acticleAsideList,
    // 主页=====>
    useAPPState: (state: any) => state.useAppStore.useAPPState,
    // isMainBg:(state: any) => state.useAppStore.isMainBg,
}

export default getters
