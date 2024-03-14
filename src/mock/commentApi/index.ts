import {
    commentData,
    deleteCommentById,
    getAllCommentData,
    getCommentListByType,
    getRepliesByCommentId,
    releaseCommentById,
    saveComments
} from "@/mock/commentApi/tempalte";

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
        type: 'post',
        template: getAllCommentData,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/all',
        type: 'get',
        template: commentData,
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
