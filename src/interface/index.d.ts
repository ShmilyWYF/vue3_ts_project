export interface MockApiInterface {
    url: string
    type: string
    template: any
    code: number
    status: boolean
    condition: boolean
}

export interface UserInfoInterface {
    id: number | string,
    email: string,
    nickname: string,
    avatar: string,
    intro: string,
    website: string,
    isSubscribe?: number,
    isDisable?: number,
    createTime: number,
    updateTime?: number
}

export interface Commentinterface {
    id: number,
    user_id: number,
    topic_id: number,
    comment_content: string,
    reply_user_id: number,
    parent_id: null,
    type: number,
    is_delete: number,
    is_review: number,
    replys?: any[],
    create_time: Date,
    update_time: null,
}

export interface Tagsinterface {
    "id": number | string,
    "tagName": string,
    "createTime": Date | string,
    "updateTime"?: Date | string | null
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
    articleCount: number,
}


export interface ArticleInterface {
    "id": number,
    "articleCover": string,
    "articleTitle": string,
    "articleContent": string,
    "isTop": number | boolean,
    "isFeatured": number | boolean,
    "isDelete": number,
    "author": UserInfoInterface,
    "categoryName": string | [],
    "tags": Tagsinterface[],
    "status": number,
    createTime?: string,
    updateTime?: string,
}

export interface ArticleAsideinterface {
    introduction: {
        img?: string,
        nickname?: string,
        description?: string,
        url?: string,
        childer?: [{}]
    },
    commentsList: [{
        avatar?: string,
        nickname?: string,
        date?: Date,
        Content?: string,
    }],
    websiteInformation: [{
        title: string,
        value: number | string,
    }],
    tags: Tagsinterface[],
}

export interface FeatureDatainterface {
    LIST: ArticleInterface[]
    TOP: ArticleInterface | {}
}
