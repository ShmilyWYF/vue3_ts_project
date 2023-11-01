import {
    ArticleAsideList,
    ArticleContextById,
    articleListByName,
    articleListTag,
    featureArticle,
} from "@/mock/articleApi/tempalte";

const articleApi = [
    {
        url: '/get/featureArticle',
        type: 'get',
        template: featureArticle(),
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/get/articleListByName',
        type: 'get',
        template: articleListByName,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/get/articleTagList',
        type: 'get',
        template: articleListTag,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/get/allArticleAsideList',
        type: 'get',
        template: ArticleAsideList(),
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/get/articleContextById',
        type: 'get',
        template: ArticleContextById,
        code: Number(200),
        status: true,
        condition: true
    }
]


export default articleApi
