import {
    addGroupMessage,
    getAllTtlMessage,
    getCodeByEmail,
    removeAllTtlMail, removeTtlMailByMail,
} from "@/mock/mailApi/template";

const mailApi = [
    {
        url: '/mail/getCodeByEmail',
        type: 'post',
        template: getCodeByEmail,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/mail/sendGroupMessage',
        type: 'post',
        template: addGroupMessage,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/mail/getAllTtlMessage',
        type: 'get',
        template: getAllTtlMessage,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/mail/removeAllTtlMail',
        type: 'delete',
        template: removeAllTtlMail,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/mail/removeTtlMailByMail',
        type: 'delete',
        template: removeTtlMailByMail,
        code: Number(200),
        status: true,
        condition: true
    },
]


export default mailApi
