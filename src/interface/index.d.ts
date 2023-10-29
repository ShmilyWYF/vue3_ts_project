export interface MockApiInterface {
    url: string
    type: string
    template: any
    code: number
    status: boolean
    condition: boolean
}

export interface ArticleInterface {
    "id": number,
    "articleCover": string,
    "articleTitle": string,
    "articleContent": string,
    "isTop": number,
    "isFeatured": number,
    "author": {
        "id": number,
        "email": string,
        "nickname": string,
        "avatar": string,
        "intro": string,
        "website": string,
        "isSubscribe": number,
        "isDisable": number,
        "createTime": number,
        "updateTime": number
    },
    "categoryName": string,
    "tags": [
        {
            "id": number,
            "tagName": string,
            "createTime": number,
            "updateTime": number
        },
    ],
    "status": number,
    "createTime": number,
    "updateTime": number,
}

export interface ArticleListTagInterface {
    categoryName: string,
    articleCount: number
}
