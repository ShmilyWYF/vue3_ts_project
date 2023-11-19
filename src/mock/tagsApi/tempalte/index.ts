import Mock from "mockjs";
import {ArticleInterface, Tagsinterface} from "@/interface";
import {allArticle} from "@/mock/articleApi/tempalte";

export const tags:{data:Tagsinterface[]} = Mock.mock({
    data: [
        {
            "id": '@increment',
            "tagName": "Java",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "C++",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "Docker",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "MySQL",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "Aurora",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "RabbitMQ",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "Netty",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "数据结构",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "算法",
            "createTime": '@date',
            "updateTime": null,
        },
        {
            "id": '@increment',
            "tagName": "推广",
            "createTime": '@date',
            "updateTime": null,
        },
    ]
})

export const tagCount = (bl:boolean=true):Tagsinterface[] => {
    if (bl){
        let arr:Tagsinterface[] = tags.data.map((item: Tagsinterface) => {
            return Object.assign(item, {articleCount: allArticle.filter(res=>{ return res.status != 3&&res.tags.findIndex((value) =>{return value.tagName===item.tagName}) !== -1}).length||0})
        })
        return arr
    }else {
        let arr:Tagsinterface[] = tags.data.map((item: Tagsinterface) => {
            return Object.assign(item, {articleCount: allArticle.filter(res=>{ return res.tags.findIndex((value) =>{return value.tagName===item.tagName}) !== -1}).length||0})
        })
        return arr
    }

}

// 根据id查询tag并添加，不存id就仅执行校验tag并是否添加操作
export const addOrEditTag = (obj: string) => {
    const {tagName, id} = <{ tagName: string, id?: number | string }>JSON.parse(obj)
    // 存在id 就是修改
    if (id) {
        let key = tags.data.findIndex((itemtag: Tagsinterface) => {
            return itemtag.id === id
        })
        if (key!= -1){
            tags.data[key].tagName = tagName
        }
    } else {
        // tags列表
        let key = tags.data.findIndex((itemtag: Tagsinterface) => {
            return itemtag.tagName?.toLocaleLowerCase() === tagName.toLocaleLowerCase()
        })
        // 没有就添加进tags列表
        if (key === -1) {
              tags.data.push({
                id: tags.data.length + 1,
                tagName: tagName,
                createTime: new Date()
            })
        }
    }
    return tags.data
}

export const deleteTags = (obj: string)=>{
    const {data} = JSON.parse(obj)
    data.forEach((itemid:number)=>{
        let key = tags.data.findIndex((value) => value.id===itemid)
        if (key != -1){
            tags.data.splice(key,1)
        }
    })
    return true
}
