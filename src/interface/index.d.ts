export interface MockApiInterface {
    url: string
    type: string
    template: any
    code: number
    status: boolean
    condition: boolean
}

export interface ArticleInterface {
    type: '',
    index: '',
    title: '',
    bgimg: '',
    desc: '',
    to: '',
    avatar: '',
    author: '',
    datatime: number,
    marking: 0,
}

export interface ArticleListTagInterface {
    categoryName: string,
    articleCount: number
}
