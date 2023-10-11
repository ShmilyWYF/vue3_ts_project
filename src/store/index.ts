import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import getters from '@/store/getters'

// const modulesFiles = require.context('./modules', true, /\.ts$/)

const modulesFiles: Record<string, any> = import.meta.glob("./modules/*.ts", {eager: true});

const modules = Object.keys(modulesFiles).reduce((prev: any, curr: any) => {
    const currName = curr.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
    const value = modulesFiles[curr]
    prev[currName] = value.default
    return prev
}, {})

export default createStore({
    modules,
    plugins: [createPersistedState()],
    getters
})
