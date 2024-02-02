const getters = {
    menuList: (state: any): [] => state.routerStore.menuList,
    accessedRouters: (state: any) => state.routerStore.accessedRouters,
    menuTree: (state: any) => state.routerStore.menuTree,
    // 文章
    featureArticleData: (state: any) => state.articleStore.featureArticleData,
    articleList: (state: any) => state.articleStore.articleList,
    articleContext: (state: any) => state.articleStore.articleContext,
    allArticle: (state: any) => state.articleStore.allArticle,
    articleByStatusList: (state: any) => state.articleStore.articleByStatusList,
    // 分类
    categoryList: (state: any) => state.categoryStore.categoryList,
    categoryActive: (state: any) => state.categoryStore.categoryActive,
    // 标签
    tagList: (state: any) => state.tagStore.tagList,
    // 主页=====>
    useState: (state: any) => state.useAppStore.useState,
    asideList: (state: any) => state.useAppStore.asideList,
    // isMainBg:(state: any) => state.useAppStore.isMainBg,
    // 用户信息===>
    userinfo: (state: any) => state.userStore.userinfo,
    token: (state: any) => state.userStore.token,
    // 评论==》
    commentType: (state: any) => state.commentStore.commentType,
}

export default getters
