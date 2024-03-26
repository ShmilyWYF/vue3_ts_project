import {MockTemplate} from "@/interface";
import {addOrUpdate, deleteAbout, getAll} from "@/mock/messageApi/template";

export const messageApi:MockTemplate[] =  [
    {
        url: '/message/all',
        type: 'get',
        template: getAll,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/message/addOrUpdate',
        type: 'post',
        template: addOrUpdate,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/message/remove',
        type: 'get',
        template: deleteAbout,
        code: Number(200),
        status: true,
        condition: true
    },
]
