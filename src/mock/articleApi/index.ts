import {articleFeatureList, articleListByName} from "@/mock/articleApi/tempalte";

const articleApi = [
    {
        url: '/get/FeatureArticle',
        type: 'get',
        template: articleFeatureList(),
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
    }
]


export default articleApi
