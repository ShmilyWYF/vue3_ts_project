import {addOrEditTag, deleteTags, tagCount, tags, updateTagById} from "@/mock/tagsApi/tempalte";

export default [
    {
        url: '/tag/add',
        type: 'post',
        template: addOrEditTag,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/tag/all',
        type: 'get',
        template: tags.data,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/tag/update',
        type: 'put',
        template: updateTagById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/tag/delete',
        type: 'delete',
        template: deleteTags,
        code: Number(200),
        status: true,
        condition: true
    },
]
