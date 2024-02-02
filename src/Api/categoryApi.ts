export default {
    // 添加标签
    addCategorys:<any> {
        method: 'post',
        url: '/category/add',
    },
    // 获取类别列表
    getCategorys:<any>{
        method: 'get',
        url: '/category/all'
    },
    updateCategorys:<any>{
        method: 'put',
        url: '/category/update',
    },
    // 添加标签
    deleteCategorys:<any> {
        method: 'delete',
        url: '/category/remove',
    },

}
