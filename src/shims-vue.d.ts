/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'node_modules/axios'{
  import axios from 'axios'
  export default axios;
}

declare module 'mockjs'

