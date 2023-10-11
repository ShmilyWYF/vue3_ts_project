import router from '@/router/index'
import store from "@/store";
import api from '@/axios'
import {toRaw} from "vue";
import cookies from "js-cookie";
import {close, start} from "@/utils/nporgress";
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";

export default () => {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            console.log('当前路由地址', to)
            console.log('get路由',router.getRoutes())
            const accessedRouters = toRaw(store.getters.accessedRouters);
            start()
            if (accessedRouters === undefined) {
                await store.dispatch('routerStore/getMenuRoles', '').then((res: []) => {
                    res.forEach(res => {
                        router.addRoute(res)
                    })
                })
                next({...to, replace: true})
            } else if (accessedRouters.length !== 0) {
                if (!to.redirectedFrom) {
                    await store.dispatch('routerStore/getMenuRoles', '').then((res: []):void => {
                        res.forEach(res => {
                            router.addRoute(res)
                        })
                    })
                    next({...to, replace: true})
                } else {
                    next()
                }
            } else {
                next()
            }
        }
    )


    router.afterEach((to, from, failure) => {
        close();
        document.getElementById('loading-bar-wrapper')?.focus()
    })
}
