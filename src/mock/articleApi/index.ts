import {
    AddArticle,
    allArticle,
    ArticleById,
    ArticleContentById,
    deleteArticleTagById,
    getArticleListByCategory,
    getArticleListByStatus,
    getArticleListByTagsId,
    getFeatureArticle,
    updateArticleByField,
    updateArticleInfo,
} from "@/mock/articleApi/template";
import {MockTemplate} from "@/interface";

const articleApi:MockTemplate[] = [
    {
        url: '/article/all',
        type: 'get',
        template: allArticle.data,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/getFeatureArticle',
        type: 'get',
        template: getFeatureArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/allByStatus',
        type: 'get',
        template: getArticleListByStatus,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/allByTag',
        type: 'get',
        template: getArticleListByTagsId,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/allByCategory',
        type: 'get',
        template: getArticleListByCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/updateField',
        type: 'put',
        template: updateArticleByField,
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
        url: '/article/add',
        type: 'post',
        template: AddArticle,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/update',
        type: 'put',
        template: updateArticleInfo,
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
        url: '/article/delete',
        type: 'delete',
        template: deleteArticleTagById,
        code: Number(200),
        status: true,
        condition: true
    },

]


export default articleApi
