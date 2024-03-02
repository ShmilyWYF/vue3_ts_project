export default {
    getCaptchaByEmail:<any> {
        method: 'post',
        url: '/mail/getCodeByEmail'
    },
    sendGroupMessageByMails:<any> {
        method: 'post',
        url: '/mail/sendGroupMessageByMails'
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
