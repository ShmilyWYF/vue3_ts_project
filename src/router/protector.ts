import router from '@/router/index'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default ()=> {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.require) {
      console.log(to)
      console.log(from)
    }
    next()
  })
  // router.afterEach((to, from, failure) => {
  //
  // })
}




