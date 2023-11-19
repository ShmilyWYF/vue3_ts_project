export default {
    // 保存消息
    saveComments: <any>{
        method: 'post',
        url: '/comment/save',
    },
    // 按类型获取消息列表
    getCommentListByType: <any>{
        method: 'get',
        url: '/comment/getCommentListByType',
    },
    // 按评论Id获取回复
    getRepliesByCommentId: <any>{
        method: 'get',
        url: '/comment/getRepliesByCommentId',
    },
    // 查询所有评论
    getComments: <any>{
        method: 'get',
        url: '/comment/all',
    },
    // 按状态获取评论
    getCommentsByStatus: <any>{
        method: 'post',
        url: '/comment/all',
    },
    // 删除评论
    deleteComments: <any>{
        method: 'delete',
        url: '/comment/delete',
    },
    // 更新评论审核状态
    releaseComments:<any>{
        method: 'update',
        url: '/comment/update',
    },
}
