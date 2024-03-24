import {WebFromInterface, WebSiteConfigInterface} from "@/interface";
import Mock from "mockjs";
import {allArticle} from "@/mock/articleApi/tempalte";
import {tagCount, tags} from "@/mock/tagsApi/tempalte";
import {categoryCount} from "@/mock/categoryApi/tempalte";

// 初始化
const webFromConfig:WebFromInterface = {
    webSiteLog: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    webSiteName: '博客',
    englishName: 'blog',
    multiLanguage: 0,
    commentReview: 0,
    websiteCreateTime: new Date(),
    notice: 'xx公告',
    beianNumber: '0000000000',
    qqLogin: 0,
}

// 用户配置
const userConfig:{data:{avatar:string,isEmailNotice:0}} = Mock.mock({
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    isEmailNotice: 0,
})

// 主题配置
const themeConfig = {
        theme: '',
        profile_shape: '',
        feature: true,
        gradient: {
            color_1: '',
            color_2: '',
            color_3: ''
        },
        header_gradient_css: '',
        background_gradient_style: {
            background: '',
            '-webkit-background-clip': '',
            '-webkit-text-fill-color': '',
            '-webkit-box-decoration-break': '',
            'box-decoration-break': ''
        }
}

// 网站配置
export const webSiteConfig:WebSiteConfigInterface =  {
    themeConfig,
    websiteConfig: webFromConfig,
    userConfig: userConfig.data,
    // appLoading: false,
    // viewCount: 0,
    // articleCount: 0,
    // talkCount: 0,
    // categoryCount: 0,
    // tagCount: 0,
    // NPTimeout: 0,
    // loadingTimeout: 0,
    // aurora_bot_enable: false
}

const {commentsList} = Mock.mock({
    'commentsList|16': [
        {
            avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
            nickname: '@cname',
            createTime: '@date',
            commentContent: '@string("upper","10","35")',
        }
    ]
});

export const aside = {
    introduction: {
        img: 'src/assets/default-cover.jpg',
        nickname: '三个字',
        description: '一个疯狂的字符串',
        url: 'https://github.com',
        childer: [
            {
                articleCount: allArticle.data.length,
                title: '文章'
            },
            {
                articleCount: '2',
                title: '说说'
            },
            {
                articleCount: categoryCount().length,
                title: '分类'
            },
            {
                articleCount: tags.data.length,
                title: '标签'
            }
        ]
    },
    commentsList,
    // 时间戳
    websiteInformation: [
        {
            title: '运行时间',
            value: 1661999406,
        },
        {
            title: '访问数量',
            value: '19989'
        },
    ],
    // 标签
    tags: tagCount(),
    notice: webFromConfig.notice,
}

export const MonthVisits = () => {
    let date:Date = new Date();
    let d = new Date(date.getFullYear(),date.getMonth() + 1,0);
    let arr:number[] = []
    for (let i = 0; i < d.getDate();i++) {
        arr.unshift(Math.floor(Math.random()*10))
    }
    return {code:200,message:'ok',data:arr};
}

export const updateWebSiteConfig = (website:string) =>{
    Object.assign(webFromConfig,JSON.parse(website))
    return {code:200,message:'ok'};
}

export const updateUserConfig = (website:string):WebSiteConfigInterface =>{
    Object.assign(userConfig,JSON.parse(website))
    return webSiteConfig;
}

export const updatethemeConfig = (website:string):WebSiteConfigInterface =>{
    Object.assign(userConfig,JSON.parse(website))
    return webSiteConfig;
}
