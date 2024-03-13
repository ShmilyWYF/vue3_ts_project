import Mock from "mockjs";
import {CategoryInterface} from "@/interface";
import {allArticle} from "@/mock/articleApi/tempalte";


export const category: { data: CategoryInterface[] } = Mock.mock({
    data: [
        {
            "id": '@increment',
            "categoryName": "Docker",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "categoryName": "C++",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "categoryName": "JAVA",
            "createTime": '@date',
            "updateTime": null,
        },
    ]
})

export const categoryCount = (bl: boolean = true): CategoryInterface[] => {
    if (bl) {
        let arr: CategoryInterface[] = category.data.map((item: CategoryInterface) => {
            return Object.assign(item, {
                articleCount: allArticle.filter(res => {
                    return res.status != 3 && res.categoryName === item.categoryName
                }).length
            })
        })
        return arr
    } else {
        let arr: CategoryInterface[] = category.data.map((item: CategoryInterface) => {
            return Object.assign(item, {
                articleCount: allArticle.filter(res => {
                    return res.categoryName === item.categoryName
                }).length
            })
        })
        return arr
    }
}

export const addOrEditCategory = (obj: string) => {
    const {categoryName, id} = <{ categoryName: string, id?: number | string }>JSON.parse(obj)
    // 存在id 就是修改
    if (id) {
        let key = category.data.findIndex((itemtag: CategoryInterface) => {
            return itemtag.id === id
        })
        if (key != -1) {
            category.data[key].categoryName = categoryName
        }
    } else {
        let key = category.data.findIndex((itemtag: CategoryInterface) => {
            return itemtag.categoryName?.toLocaleLowerCase() === categoryName.toLocaleLowerCase()
        })
        if (key === -1) {
            category.data.push({
                id: category.data.length + 1,
                categoryName: categoryName,
                createTime: new Date()
            })
        }
    }
    return category.data
}

export const updateCategory = (obj: string) => {
    const {id, categoryName} = JSON.parse(obj)
    let index = category.data.findIndex(value => value.id == id);
    category.data[index].categoryName = categoryName
    return {message: 'ok', code: 200}
}

export const deleteCategory = (obj: string) => {
    const {data} = JSON.parse(obj)
    data.forEach((itemid: number) => {
        let key = category.data.findIndex((value) => value.id === itemid)
        if (key != -1) {
            category.data.splice(key, 1)
        }
    })
    return true
}
