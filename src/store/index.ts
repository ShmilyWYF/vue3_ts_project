import { createStore } from 'vuex'
import getters from '@/store/getters'

const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules = modulesFiles.keys().reduce((prev: any, curr: any) => {
  const currName = curr.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(curr)
  prev[currName] = value.default
  return prev
}, {})
export default createStore({
  modules,
  getters
})
