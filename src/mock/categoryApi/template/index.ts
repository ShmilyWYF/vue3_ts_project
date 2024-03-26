import Mock from "mockjs";
import {CategoryInterface} from "@/interface";
import {allArticle} from "@/mock/articleApi/template";


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

export const getCategory = () =>{
    categoryCount()
    return category;
}

export const categoryCount = (bl: boolean = true): CategoryInterface[] => {
    if (bl) {
        return category.data.map((item: CategoryInterface) => {
            return Object.assign(item, {
                articleCount: allArticle.data.filter(res => {
                    return res.status != 3 && res.categoryName === item.categoryName
                }).length
            })
        })
    } else {
        return category.data.map((item: CategoryInterface) => {
            return Object.assign(item, {
                articleCount: allArticle.data.filter(res => {
                    return res.categoryName === item.categoryName
                }).length
            })
        })
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
    const {id, categoryName} = <{ id:number,categoryName:string }>JSON.parse(obj)
    let index = category.data.findIndex(value => value.id == id);
    // 修改前刷新相关文章分类
    allArticle.data.forEach(item=>{
        if (item.categoryName == category.data[index].categoryName){
            item.categoryName = categoryName
        }
    })
    addOrEditCategory(JSON.stringify({categoryName, id}))
    return {message: 'ok', code: 200}
}

export const deleteCategory = ({id}:{id:number[]|string}) => {
    const func = (id:number) =>{
        let key = category.data.findIndex((value) => value.id == id)
        if (key != -1) {
            category.data.splice(key, 1)
        }
    }
    if (typeof id == "string"){
        func(parseInt(id))
    }else {
        id.forEach((item: number) => {
            func(item)
        })
    }
    return {message: '删除成功~', code: 200}
}
