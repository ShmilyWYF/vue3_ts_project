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
        url: 'user/info'
    },
    registerUser:{
        method: 'post',
        url: 'user/registerUser'
    },
    restUser:{
        method: 'post',
        url: 'user/restUser'
    },
    updateUserinfo: {
        method: 'put',
        url: 'user/userinfo'
    },
    getAlluser: {
        method: 'get',
        url: 'user/info'
    },
    undisable: {
        method: 'get',
        url: '/user/undisable'
    },
    disable:{
        method: 'get',
        url: '/user/disable'
    },
    recovery:{
        method: 'get',
        url: '/user/recovery'
    },
    remove:{
        method: 'delete',
        url: '/user/remove'
    },
}
