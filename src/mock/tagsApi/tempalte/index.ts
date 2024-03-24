import Mock from "mockjs";
import {Tagsinterface} from "@/interface";
import {allArticle} from "@/mock/articleApi/tempalte";
import {category} from "@/mock/categoryApi/tempalte";

export const tags: { data: Tagsinterface[] } = Mock.mock({
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

export const getTags = () =>{
    tagCount()
    return tags;
}

export const tagCount = (bl: boolean = true): Tagsinterface[] => {
    if (bl) {
        return tags.data.map((item: Tagsinterface) => {
            return Object.assign(item, {
                articleCount: allArticle.data.filter(res => {
                    return res.status != 3 && res.isDelete != 1 && res.tags.findIndex((value) => {
                        return value.id == item.id
                    }) != -1
                }).length || 0
            })
        })
    } else {
        return tags.data.map((item: Tagsinterface) => {
            return Object.assign(item, {
                articleCount: allArticle.data.filter(res => {
                    return res.tags!.findIndex((value) => {
                        return value.tagName === item.tagName
                    }) !== -1
                }).length || 0
            })
        })
    }

}

// 根据id查询tag并添加，不存id就仅执行校验tag并是否添加操作
export const addOrEditTag = (obj: string) => {
    const {tagName, id} = <{ tagName: string, id?: number | string }>JSON.parse(obj)
    // 存在id 就是修改
    if (id) {
        let key = tags.data.findIndex((itemtag: Tagsinterface) => {
            return itemtag.id == id
        })
        if (key != -1) {
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

export const updateTagById = (obj: string) => {
    const {id, tagName} = JSON.parse(obj)
    let index = tags.data.findIndex(value => value.id == id);
    let tagId = tags.data[index].id;
    tags.data[index].tagName = tagName
    // 先修改文章数据
    allArticle.data.forEach(item => {
        let key: number = item.tags.findIndex(i => i.id == tagId);
        if (key != -1) {
            item.tags[key] = tags.data[index]
        }
    })

    return {'message': 'ok', 'code': 200};
}

export const deleteTags = ({id}:{id:number[]|string}) => {
    const func = (id:number) =>{
        let key = tags.data.findIndex((value) => value.id == id)
        if (key != -1) {
            tags.data.splice(key, 1)
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
