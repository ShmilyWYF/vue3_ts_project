import {WebSiteConfigInterface} from "@/interface";
import Mock from "mockjs";

// 网站配置
export const websiteConfig:{data:WebSiteConfigInterface} = Mock.mock({
    webSiteLog: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    siteName: '博客',
    englishName: 'blog',
    multiLanguage: 0,
    isCommentReview: 0,
    websiteCreateTime: new Date(),
    notice: 'xx公告',
    beianNumber: '0000000000',
    qqLogin: 0,
})

// 用户配置
export const userConfig:{data:{avatar:string,isEmailNotice:0}} = Mock.mock({
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    isEmailNotice: 0,
})

// 主题配置
export const themeConfig = {
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

export default {
    themeConfig,
    websiteConfig: websiteConfig.data,
    userConfig: userConfig.data,
    appLoading: false,
    viewCount: 0,
    articleCount: 0,
    talkCount: 0,
    categoryCount: 0,
    tagCount: 0,
    NPTimeout: 0,
    loadingTimeout: 0,
    aurora_bot_enable: false
}


export const upDateWebsiteConfig = (website:string):WebSiteConfigInterface =>{
    websiteConfig.data = JSON.parse(website)
    return websiteConfig.data;
}

export const upDateUserConfig = (website:string):WebSiteConfigInterface =>{
    websiteConfig.data = JSON.parse(website)
    return websiteConfig.data;
}

