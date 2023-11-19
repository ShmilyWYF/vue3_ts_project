export default {
    // 添加标签
    addOrEditCategorys: {
        method: 'post',
        url: '/article/category',
    },
    // 查询所有标签
    getCategorys: {
        method: 'get',
        url: '/article/category',
    },
    // 添加标签
    deleteCategorys: {
        method: 'delete',
        url: '/article/category',
    },
}
