export default {
    //获得专辑文章列表
    getFeatureArticle: {
        method: 'get',
        url: 'article/featureArticle'
    },
    //按分类名获得文章列表
    getArticleListByCategory: {
        method: 'get',
        url: '/article/articleListByCategory'
    },
    //按标签名获得文章列表
    getArticleListByTags: {
        method: 'get',
        url: '/article/articleListByTags'
    },
    // 文章标签列表
    getArticleTagList: {
        method: 'get',
        url: '/article/articleTagList'
    },
    // 文章分类列表
    getArticleCategorylist: {
        method: 'get',
        url: '/article/articleCategoryList'
    },
    // 所有aside数据集合
    getAllArticleAsideList: {
        method: 'get',
        url: '/article/allArticleAsideList'
    },
    // 根据id获取文章
    getArticleById: {
        method: 'get',
        url: '/article/articleById',
    },
    // 获取所有文章
    getAllArticle: {
        method: 'get',
        url: '/article/allArticle',
    },
    // 根据状态获取文章列表
    getArticleListByStatus: {
        method: 'get',
        url: '/article/articleListByStatus',
    },
    // 根据标签id删除对应文章标签
    deleteTagById: {
        method: 'post',
        url: '/article/deleteArticleTagById',
    },
    // 根据标签id删除对应文章标签
    deleteArticleTagById: {
        method: 'post',
        url: '/article/deleteArticleTagById',
    },
    // 添加文章
    addArticle: {
        method: 'post',
        url: '/article/addArticle',
    },
    // 更新文章
    updateArticleInfo: {
        method: 'post',
        url: '/article/updateArticleInfo',
    },
    // 给文章添加标签
    addTagstoArticle: {
        method: 'post',
        url: '/article/addarticleTags',
    },
    // 修改文章分类
    updateCategorytoArticle: {
        method: 'post',
        url: '/article/updateCategorytoArticle',
    },
    // 添加文章
    deleteArticle: {
        method: 'delete',
        url: '/article/deleteArticle',
    },
    // 撤回文章
    withdrawalArticle: {
        method: 'post',
        url: '/article/withdrawalArticle',
    },
    // 根据id获取文章上下文
    getArticleContentById: {
        method: 'get',
        url: '/article/articleContentById',
    },
    // 根据id更新文章
    updateArticleContextById: {
        method: 'post',
        url: '/article/articleContextById',
    },
    // 根据id更新文章状态
    updateArticleAttributeById: {
        method: 'post',
        url: '/article/updateArticleAttributeById',
    },
}
