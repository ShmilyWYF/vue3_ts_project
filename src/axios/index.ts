import axiosApi from '@/axios/axiosApi' //  引入axios封装实例
import user from '@/Api/userApi'     // 引入 user api 接口配置

const createApi = (apiUrls: any) => {
  return Object.keys(apiUrls).reduce((prev: any, cur: string) => {
    prev[cur] = (option: {}) => {
      return axiosApi.createAxiosInstance({ ...apiUrls[cur], ...option })
    }
    return prev
  }, {})
}
export const userApi = createApi(user)
