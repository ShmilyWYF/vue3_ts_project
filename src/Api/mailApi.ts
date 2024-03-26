export default {
    getCaptchaByEmail:<any> {
        method: 'post',
        url: '/mail/getCodeByEmail'
    },
    sendGroupMessage:<any> {
        method: 'post',
        url: '/mail/sendGroupMessage'
    },
    getAllTtlMessage:<any> {
        method: 'get',
        url: '/mail/getAllTtlMessage'
    },
    removeAllTtlMail:<any> {
        method: 'delete',
        url: '/mail/removeAllTtlMail'
    },
    removeTtlMailByMail:<any> {
        method: 'delete',
        url: '/mail/removeTtlMailByMail'
    },
}
