export default {
    // 获取web配置
    getUseAppConfig: {
        method: 'get',
        url: '/useApp/webSiteConfig'
    },
    // 更新app配置
    updateWebSiteConfig: {
        method: 'put',
        url: 'useApp/webSiteConfig'
    },
    updateUserConfig: {
        method: 'put',
        url: 'useApp/userSiteConfig'
    },
    // 更新app配置
    updateThemeSiteConfig: {
        method: 'put',
        url: 'useApp/themeSiteConfig'
    },
    // 所有aside数据集合
    getAsideConfig: {
        method: 'get',
        url: '/useApp/aside'
    },
    // 获取月访问集合
    getMonthVisits:{
        method: 'get',
        url: '/useApp/monthVisits'
    },
}
