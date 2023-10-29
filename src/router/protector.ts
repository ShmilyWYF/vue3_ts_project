import store from "@/store";
import {toRaw} from "vue";
import cookies from "js-cookie";
import {close, start} from "@/utils/nporgress";
import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";

export default (router:Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            const accessedRouters = toRaw(store.getters.accessedRouters);
            start()
            // 仅第一次进入网站时执行
            if (accessedRouters === undefined) {
                await store.dispatch('routerStore/getMenuRoles', '').then((res: []):void => {
                    res.forEach(res => {
                        router.addRoute(res)
                    })
                })
                // 获取主题配置
                store.dispatch('useAppStore/theme','').then(():void =>{
                    console.info('获取主题配置 -> ok')
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
        console.log(router.getRoutes())
        document.getElementById('loading-bar-wrapper')?.focus()
    })
}
