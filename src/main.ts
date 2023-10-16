import {createApp} from 'vue'
// import cookie from 'js-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import cookies from "js-cookie";
import i18n from "@/i18n";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
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

// import {GlobalComponents} from "@/icons";
// GlobalComponents(app)

app.use(store).use(i18n).use(router).use(protector).use(element).mount('#app')


