import {DefineComponent} from "vue";

export interface MockApiInterface {
    url: string
    type: string
    template: any
    code: number
    status: boolean
    condition: boolean
}

export interface RouteInterface{
    path: string,
    name: string,
    component?: ()=>Promise<DefineComponent>,
    redirect?: string,
    props?: {},
    meta: {},
    children?: Eshiro[]
}

export interface ShiroInterface {
    id: number,
    pid: number,
    name: string,
    path: string,
    props?: {isVertical: true},
    redirect?: string,
    component: string,
    meta:{},
    children?: any[]
}

export interface UserAuthinterface {
    id: number,
    user_info_id: number,
    username: string,
    password: string,
    ip_address: string,
    ip_source: string,
    create_time: Date,
    update_time: Date | null,
    last_login_time: Date | null,
    type: number,
}

export interface UserInfoInterface {
    id?: number | string,
    email: string,
    nickname: string,
    avatar: string,
    intro: string,
    website: string,
    isSubscribe?: number,
    isDisable?: number,
    isDelete?: number,
    createTime?: Date | null,
    updateTime?: Date | null,
}

interface UserInfointerface {
    id: number,
    avatar: string,
    email: string,
    intro: string,
    nickname: string,
    website: string,
    type: number,
    last_login_time: Date,
    isDisable: number,
    isDelete: number,
    isSubscribe: number,
    createTime: Date,
    updateTime: Date | null,
    password: string,
}

export interface CommentMockinterface {
    id: number,
    user_id: number,
    topic_id: number,
    comment_content: string,
    reply_user_id: number,
    parent_id: null,
    type: number,
    is_delete: number,
    is_review: number | string,
    replys?: any[],
    create_time: Date,
    update_time: null,
}

export interface CommentVoInterface {
    id: number,
    avatar?: string,
    nickname?: string,
    replyNickname?: string,
    articleTitle?: string,
    commentContent: string,
    createTime: Date,
    isReview: number,
    type: number,
}

export interface CommentModuleInterface {
    commentData: CommentInterface,
    isHaveMore: boolean,
    type: number,
    isCommentReview: number,
    userinfo: UserInfoInterface | undefined,
    commentsCall: Function,
    indexCall: Function,
}

export interface CommentInterface {
    id?: number,
    userId: number,
    nickname: string,
    avatar: string,
    webSite?: {} | any,
    commentContent: string,
    createTime: Date,
    updateTime?: Date,
    replys: CommentInterface[],
}

export interface Tagsinterface {
    "id": number,
    "tagName": string,
    "createTime?": Date | string,
    "updateTime"?: Date | string | null,
    articleCount?: number,

    [key: any]: any
}

interface initDataInterface {
    replyContent: string,
    time: Date,
    show: boolean
}

export interface CategoryInterface {
    id: number | string,
    categoryName: string,
    createTime: Date,
    updateTime?: Date | string | null
}

export interface CategoryCountInterface {
    id: number | string,
    categoryName: string,
    createTime: Date,
    updateTime?: Date | string | null
    articleCount?: number,
}


export interface ArticleInterface {
    id: number | string,
    articleCover: string,
    articleTitle: string,
    articleContent: string,
    isTop: number,
    isFeatured: number,
    isDelete: number,
    author: UserInfoInterface,
    categoryName: string,
    tags: Tagsinterface[],
    status: number,
    createTime?: string,
    updateTime?: string,

    [key: string]: any
}

export interface IntroductionInterface {
    img?: string,
    nickname?: string,
    description?: string,
    url?: string,
    childer?: [{
        articleCount: 0,
        title: ''
    }]
}

export interface ArticleAsideinterface {
    introduction: IntroductionInterface,
    commentsList: CommentInterface[],
    websiteInformation: {
        title: string,
        value: number | string,
    }[],
    tags: Tagsinterface[],
    notice: string,
}

export interface FeatureDatainterface {
    Featured: ArticleInterface[]
    Top: ArticleInterface
}

export interface WebFromInterface {
    webSiteLog: string,
    webSiteName: string,
    englishName: string,
    multiLanguage: number,
    commentReview: number,
    websiteCreateTime: Date,
    notice: string,
    beianNumber: string,
    qqLogin: 0,
}

export interface UserFromInterface {
    avatar: string,
    isEmailNotice: number,
}

export interface WebSiteConfigInterface {
    websiteConfig: WebFromInterface,
    userConfig: UserFromInterface
    themeConfig: {}
}

export interface MockTemplate {
    url: string,
    type: string,
    template: any,
    code: number,
    status: boolean,
    condition: boolean
}
