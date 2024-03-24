import {addOrEditCategory, category, deleteCategory, getCategory, updateCategory} from "@/mock/categoryApi/tempalte";

export default [
    {
        url: '/category/add',
        type: 'post',
        template: addOrEditCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/category/all',
        type: 'get',
        template: getCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/category/update',
        type: 'put',
        template: updateCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/category/remove',
        type: 'delete',
        template: deleteCategory,
        code: Number(200),
        status: true,
        condition: true
    },
]
