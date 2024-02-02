export default {
    // 添加标签
    addTags: {
        method: 'post',
        url: '/tag/add',
    },
    // 查询所有标签 带参数 参数相关
    getTags:<any> {
        method: 'get',
        url: '/tag/all',
    },
    // 更新标签
    updateTags: {
        method: 'put',
        url: '/tag/update',
    },
    // 删除标签
    deleteTags: {
        method: 'delete',
        url: '/tag/remove',
    },
}
