export default {
    // 获取web配置
    getUseAppConfig: {
        method: 'get',
        url: '/useApp/webSiteConfig'
    },
    // 更新app配置
    updateWebSiteConfig: {
        method: 'update',
        url: 'useApp/websiteConfig'
    },
    // 获取用户配置
    getUserConfig: {
        method: 'get',
        url: 'useApp/userConfig'
    },
    updateUserConfig: {
        method: 'update',
        url: 'useApp/userConfig'
    },
    // 所有aside数据集合
    getAsideConfig: {
        method: 'get',
        url: '/useApp/aside'
    },
}
