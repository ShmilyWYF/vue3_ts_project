import {
    aside, MonthVisits,
    updatethemeConfig,
    updateUserConfig,
    updateWebSiteConfig,
    webSiteConfig,
} from '@/mock/useAppApi/template/Template'


const useApp = [
    {
        url: 'useApp/webSiteConfig',
        type: 'get',
        template: webSiteConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/webSiteConfig',
        type: 'put',
        template: updateWebSiteConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/userSiteConfig',
        type: 'put',
        template: updateUserConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/themeSiteConfig',
        type: 'put',
        template: updatethemeConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/aside',
        type: 'get',
        template: aside,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: '/useApp/monthVisits',
        type: 'get',
        template: MonthVisits,
        code: Number(200),
        status: true,
        condition: true
    },
]

export default useApp
