import {createApp} from 'vue'
// import cookie from 'js-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import cookies from "js-cookie";
import i18n from "@/i18n";
import 'element-plus/dist/index.css'
// import 'normalize.css/normalize.css'
import protector from "@/router/protector";
import 'virtual:svg-icons-register'
// import echarts from 'echarts'
import mockXHR from "@/mock";
// A modern alternative to CSS resets
// import '@/style/reset.css' // global css



const app = createApp(App)
if (import.meta.env.APP_NODE_ENV === 'development') {
    console.log("测试环境")
    mockXHR()
}

// init数据
console.log('初始化数据')
const useAPPState = {
    themeConfig: {
        theme: cookies.get('theme') ? String(cookies.get('theme')) : 'theme-dark',
        profile_shape: 'circle-avatar',
        feature: true,
        gradient: {
            color_1: '#24c6dc',
            color_2: '#5433ff',
            color_3: '#ff0099'
        },
        header_gradient_css: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
        background_gradient_style: {
            background: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-box-decoration-break': 'clone',
            'box-decoration-break': 'clone'
        }
    },
    appLoading: false,
    websiteConfig: '' as any,
    viewCount: 0,
    articleCount: 0,
    talkCount: 0,
    categoryCount: 0,
    tagCount: 0,
    NPTimeout: -1,
    loadingTimeout: -1,
    aurora_bot_enable: true
}
const useArticleState = {
    topArticle: '' as any,
    featuredArticles: [] as any,
    articles: '' as any,
    categories: '' as any,
    archives: '' as any,
    articlesByTag: '' as any,
    readingArticle: '' as any
}
store.commit('useAppStore/SET_USE_APP_STATE', useAPPState)
store.commit('useArticleStore/SET_ARTICLE_STATE', useArticleState)

// import {GlobalComponents} from "@/icons";
// GlobalComponents(app)

app.use(store).use(i18n).use(router).use(protector).use(element).mount('#app')


