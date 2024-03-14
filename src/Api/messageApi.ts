export default {
    // 添加标签
    addMessage: {
        method: 'post',
        url: '/message/add',
    },
    // 查询所有标签 带参数 参数相关
    getMessage: {
        method: 'get',
        url: '/message/all',
    },
    // 更新标签
    updateMessage: {
        method: 'put',
        url: '/message/update',
    },
    // 删除标签
    deleteMessage: {
        method: 'delete',
        url: '/message/remove',
    },
}
