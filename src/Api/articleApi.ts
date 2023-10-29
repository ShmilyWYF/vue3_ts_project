export default {
    //获得专辑文章列表
    getFeatureArticle:{
        method: 'get',
        url: 'get/featureArticle'
    },
    //按标签名获得文章列表
    getArticleListByName:{
        method: 'get',
        url: 'get/articleListByName'
    },
    // 文章标签列表
    getArticleTagList:{
        method: 'get',
        url: 'get/articleTagList'
    },
    // 所有aside数据集合
    getAllArticleAsideList:{
        method: 'get',
        url: 'get/allArticleAsideList'
    },
    // 根据id获取文章上下文
    getArticleContextById:{
        method: 'get',
        url: '/get/articleContextById',
    }
}
