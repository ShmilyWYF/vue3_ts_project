export default {
    login: {
        method: 'post',
        url: 'user/login'
    },
    logout: {
        method: 'post',
        url: 'user/logout'
    },
    getInfo: {
        method: 'post',
        url: 'user/getInfo'
    },
    registerUser:{
        method: 'post',
        url: 'user/registerUser'
    },
    restUser:{
        method: 'post',
        url: 'user/restUser'
    },
    getCaptchaByEmail: {
        method: 'get',
        url: 'user/emailCaptcha'
    },
    updateUserinfo: {
        method: 'update',
        url: 'user/userinfo'
    }
}
