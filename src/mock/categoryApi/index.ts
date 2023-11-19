import {addOrEditCategory, category, deleteCategory} from "@/mock/categoryApi/tempalte";

export default [
    {
        url: '/article/category',
        type: 'get',
        template: category.data,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/category',
        type: 'post',
        template: addOrEditCategory,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/article/category',
        type: 'delete',
        template: deleteCategory,
        code: Number(200),
        status: true,
        condition: true
    },
]
