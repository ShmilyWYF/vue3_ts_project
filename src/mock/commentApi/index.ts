import {
    deleteCommentById,
    getCommentAll, getCommentAllByWhere,
    getCommentListByType,
    getRepliesByCommentId,
    releaseCommentById,
    saveComments
} from "@/mock/commentApi/template";

export default [
    {
        url: '/comment/add',
        type: 'post',
        template: saveComments,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/allByType',
        type: 'get',
        template: getCommentListByType,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/replies',
        type: 'get',
        template: getRepliesByCommentId,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/all',
        type: 'get',
        template: getCommentAll,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/status',
        type: 'get',
        template: getCommentAllByWhere,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/remove',
        type: 'delete',
        template: deleteCommentById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/update',
        type: 'put',
        template: releaseCommentById,
        code: Number(200),
        status: true,
        condition: true
    },

]
