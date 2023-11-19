export default {
    // 添加标签
    addOrEditTags: {
        method: 'post',
        url: '/article/tags',
    },
    // 查询所有标签
    getTags: {
        method: 'get',
        url: '/article/tags',
    },
    // 添加标签
    deleteTags: {
        method: 'delete',
        url: '/article/tags',
    },
}
