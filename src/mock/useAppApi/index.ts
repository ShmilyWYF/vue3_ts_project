import template, {
    upDateUserConfig,
    upDateWebsiteConfig,
    userConfig,
    websiteConfig
} from '@/mock/useAppApi/tempalte/Template'


const menuApi = [
    {
        url: 'useApp/UseAppConfig',
        type: 'get',
        template,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/websiteConfig',
        type: 'get',
        template: websiteConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/websiteConfig',
        type: 'update',
        template: upDateWebsiteConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/userConfig',
        type: 'get',
        template: userConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'useApp/userConfig',
        type: 'update',
        template: upDateUserConfig,
        code: Number(200),
        status: true,
        condition: true
    },
    {
        url: 'config/images',
        type: 'update',
        template,
        code: Number(200),
        status: true,
        condition: true
    },
]

export default menuApi
