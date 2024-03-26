import {MockTemplate} from "@/interface";
import {addOrUpdate, getAll ,deleteAbout} from "@/mock/aboutApi/template";

const aboutApi:MockTemplate[] =  [
    {
        url: '/about/all',
        type: 'get',
        template: getAll,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/about/addOrUpdate',
        type: 'post',
        template: addOrUpdate,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/about/remove',
        type: 'get',
        template: deleteAbout,
        code: Number(200),
        status: true,
        condition: true
    },
]

export default aboutApi
