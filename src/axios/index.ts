import axiosApi from '@/axios/axiosApi' // 引入axios封装实例
import {list} from "@/axios/import";

const autoCreateApi = () => {
    const requireContext = require.context('/src/Api/', true, /\.ts/);
    return requireContext.keys().reduce((prev: any, curr: string) => {
        const fileObject = requireContext(curr).default;
        const name: string = curr.replace(/^\.\/(.*)\.\w+$/, '$1')
        prev[name] = Object.keys(fileObject).reduce((pre: any, cur: string) => {
            pre[cur] = (data: {}) => {    // 该参用于给生成的对象添加操作参数
                return axiosApi.createAxiosInstance({...fileObject[cur], data})
            }
            return pre
        }, {})
        console.log(prev)
        return prev;
    }, {})
}

const customCreateApi = (apiUrls: any) => {
    console.log(apiUrls)
    return Object.keys(apiUrls).reduce((prev: any, curr: string) => {
        console.log(curr) //userApi
        prev[curr] = Object.keys(apiUrls[curr]).reduce((pre: any, cur: string) => {
            console.log(cur)
            pre[cur] = (option: {}) => {
                return axiosApi.createAxiosInstance({...apiUrls[curr][cur], ...option})
            }
            return pre
        }, {})
        return prev
    }, {})
}
// if (process.env.IS_AUTO_AXIOS_BEAN) {
//     const o = autoCreateApi()
// } else {
//     const o = customCreateApi(list)
// }

export default autoCreateApi()
