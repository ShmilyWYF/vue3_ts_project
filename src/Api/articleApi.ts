export default {
    // 获取所有文章
    getAllArticle: {
        method: 'get',
        url: '/article/all',
    },
    //获得专辑文章列表
    getFeatureArticle: {
        method: 'get',
        url: '/article/getFeatureArticle'
    },
    // 根据状态获取文章列表
    getArticleListByStatus: {
        method: 'get',
        url: '/article/allByStatus',
    },
    //按标签id获得文章列表
    getArticleListByTags:<any> {
        method: 'get',
        url: '/article/allByTag'
    },
    //根据类别名获取文章列表
    getArticleListByCategory: {
        method: 'get',
        url: '/article/allByCategory'
    },
    //按标签id获得文章列表
    updateArticleByField: {
        method: 'put',
        url: '/article/updateField'
    },
    // 根据id获取文章
    getArticleById: {
        method: 'get',
        url: '/article/articleById',
    },
    // 添加文章
    addArticle: {
        method: 'post',
        url: '/article/add',
    },
    // 更新文章
    updateArticleInfo: {
        method: 'put',
        url: '/article/update',
    },
    // 根据id更新字段值
    getArticleContentById: {
        method: 'get',
        url: '/article/articleContentById',
    },
    // 删除文章
    deleteArticle:{
        method: 'delete',
        url: '/article/delete',
    }
}
