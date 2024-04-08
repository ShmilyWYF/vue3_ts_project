import store from "@/store";
import {close, start} from "@/utils/nporgress";
import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import {getCookie} from "@/utils/cookie";
import {ElMessage} from "element-plus";

export default (router: Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            start()
            //设置白名单
            let whiteList = ['/', '/home', '/articles','/tags','/about','/message']
            let articles = /\/articles\/[0-9]+/
            // 白名单路由校验
            if (articles.test(to.path) || whiteList.includes(to.path)) {
                next()
            } else {
                if (getCookie()) {
                    // 初始化标记
                    let userinfo: any = {}

                    try {
                        // 进入后台 重新校验一次用户 根据用户token获得用户信息
                        await store.dispatch('userStore/getInfo', getCookie()).then((data: {}) => {
                            userinfo = data
                        }, (error: any) => {
                            ElMessage.warning(error)
                        })
                    } catch (error: any) {  // 捕获异常
                        // 如果出错了，把令牌去掉，并让用户重新去到登录页面
                        await store.dispatch('userStore/logout')
                        ElMessage.error(error || '异常 Error')
                        next('/')
                        // 关闭进度条
                        close()
                    }

                    // 是否有用户信息 有用户信息，证明用户不是第一次登录
                    if (userinfo.type !== 1 && userinfo.type !== 999) {
                        ElMessage.warning('无访问权限')
                        close()
                        next("/")
                    } else {
                        // 没有路由缓存，获取路由
                        if (!to.redirectedFrom) {
                            await store.dispatch('routerStore/getMenuRoles').then((res): void => {
                                router.addRoute(res[0])
                            })
                            close()
                            next({...to, replace: true})
                        } else {
                            close()
                            next()
                        }
                    }
                } else {
                    ElMessage.warning("还未登陆哦~")
                    // 未登陆 跳转至/
                    next('/')
                }
            }
        }
    )


    router.afterEach(() => {
        close()
        document.getElementById('loading-bar-wrapper')?.focus()
    })
}
