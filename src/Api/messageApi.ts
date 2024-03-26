export default {
    // 添加标签
    addOrUpdateMessage: {
        method: 'post',
        url: '/message/addOrUpdate',
    },
    // 查询所有标签 带参数 参数相关
    getMessage: {
        method: 'get',
        url: '/message/all',
    },
    // 删除标签
    deleteMessage: {
        method: 'delete',
        url: '/message/remove',
    },
}
