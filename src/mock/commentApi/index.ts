import {
    commentData, deleteCommentById,
    getAllCommentData, getCommentAll,
    getCommentListByType,
    getRepliesByCommentId, releaseCommentById,
    saveComments
} from "@/mock/commentApi/tempalte";

export default [
    {
        url: '/comment/save',
        type: 'post',
        template: saveComments,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/getCommentListByType',
        type: 'get',
        template: getCommentListByType,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/getRepliesByCommentId',
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
        url: '/comment/delete',
        type: 'delete',
        template: deleteCommentById,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/comment/update',
        type: 'update',
        template: releaseCommentById,
        code: Number(200),
        status: true,
        condition: true
    },

]
