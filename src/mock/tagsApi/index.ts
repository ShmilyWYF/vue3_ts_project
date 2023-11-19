import {addOrEditTag, deleteTags, tags} from "@/mock/tagsApi/tempalte";

export default [
    {
        url: '/article/tags',
        type: 'get',
        template: tags.data,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/tags',
        type: 'post',
        template: addOrEditTag,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/tags',
        type: 'delete',
        template: deleteTags,
        code: Number(200),
        status: true,
        condition: true
    },
]
