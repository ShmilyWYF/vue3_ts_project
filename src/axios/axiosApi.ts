// import config from './config'
import HttpRequest from '@/axios/HttpRequest'

// 根据当前环境获取API URL根路径
// const baseURL = process.env.NODE_ENV === 'production' ? config.baseURL.prod : config.baseURL.dev
// 创建一个HtpRequest对象实例
const axiosApi = new HttpRequest(process.env.VUE_APP_BASE_API)
export default axiosApi
