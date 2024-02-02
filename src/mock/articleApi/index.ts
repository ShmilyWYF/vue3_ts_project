import {
    AddArticle,
    addArticleTags,
    allArticle,
    ArticleAsideList,
    ArticleById,
    articleCategoryList,
    ArticleContentById,
    ArticleListByCategory,
    articleListTag,
    deleteArticle,
    deleteArticleTagById,
    FeatureArticle,
    getArticleListByStatus,
    updateArticleAttributeById,
    updateArticleCategory,
    UpdateArticleContextById,
    updateArticleInfo,
    withdrawalArticle,
    articleListByTags
} from "@/mock/articleApi/tempalte";

const articleApi = [
    {
        url: '/article/getFeatureArticle',
        type: 'get',
        template: FeatureArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleTagList',
        type: 'get',
        template: articleListTag,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleCategoryList',
        type: 'get',
        template: articleCategoryList,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleListByCategory',
        type: 'get',
        template: ArticleListByCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleListByTags',
        type: 'get',
        template: articleListByTags,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/allArticleAsideList',
        type: 'get',
        template: ArticleAsideList(),
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleById',
        type: 'get',
        template: ArticleById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/allArticle',
        type: 'get',
        template: allArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleContentById',
        type: 'get',
        template: ArticleContentById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleListByStatus',
        type: 'get',
        template: getArticleListByStatus,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/addArticle',
        type: 'post',
        template: AddArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/updateArticleInfo',
        type: 'post',
        template: updateArticleInfo,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/deleteArticle',
        type: 'delete',
        template: deleteArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/withdrawalArticle',
        type: 'post',
        template: withdrawalArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/articleContextById',
        type: 'post',
        template: UpdateArticleContextById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/updateArticleAttributeById',
        type: 'post',
        template: updateArticleAttributeById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/deleteArticleTagById',
        type: 'post',
        template: deleteArticleTagById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/addArticleTags',
        type: 'post',
        template: addArticleTags,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/addarticleTags',
        type: 'post',
        template: addArticleTags,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/updateCategorytoArticle',
        type: 'post',
        template: updateArticleCategory,
        code: Number(200),
        status: true,
        condition: true
    },
]


export default articleApi
