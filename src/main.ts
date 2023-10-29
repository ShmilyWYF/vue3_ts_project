import {createApp} from 'vue'
// import cookie from 'js-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import i18n from "@/i18n";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
// 引入svg自动化插件
import 'virtual:svg-icons-register'
// import echarts from 'echarts'
import mockXHR from "@/mock";
// CSS初始化方案
import '@/style/reset.css' // global css 保持一致性

const app = createApp(App)
if (import.meta.env.APP_NODE_ENV === 'development') {
    console.log("测试环境")
    mockXHR()
}

// init数据
console.log('初始化数据')

// import {GlobalComponents} from "@/icons";
// GlobalComponents(app)

app.use(store).use(i18n).use(router).use(element).mount('#app')


