import { createApp } from 'vue'
// import cookie from 'js-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
// import echarts from 'echarts'
import protector from '@/router/protector'


// A modern alternative to CSS resets
// import { Vue } from 'vue-class-component' // 引入封装的接口对象
// import '@/style/reset.css' // global css



const app = createApp(App)
if (process.env.NODE_ENV === 'dev' ) {
  const { mockXHR } = require('@/mock')
  console.log("测试环境")
  mockXHR();
}

app.use(store).use(protector).use(router).use(element).mount('#app')
