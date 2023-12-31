import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import errorHandle from '@/axios/errorHander'

/**
 * axios实例类
 */
class HttpRequest {
    static defaultConfig = {}

    private static accept = 'Application/json'
    private static context = 'Application/json;charset=UTF-8'

    public constructor(baseURL: string) {
        HttpRequest.defaultConfig = {
            baseURL,
            url: '',
            method: '',
            headers: {
                accept: HttpRequest.accept,
                context: HttpRequest.context,
                timeout: 1000
            }
        }
    }

    /**
     * 配置合并方法
     * @param source 默认配置
     * @param target URL、method插值
     * @return defaultConfig
     */
    private static mergeOptions(source: {}, target: any) {
        if (typeof target !== 'object' || target == null) {
            return source
        }
        // 合并对象
        return Object.assign(source, target)
    }

    public createAxiosInstance(options: {}) {
        // 创建实例
        const axiosInstance = axios.create()
        // 组装Axios
        const newOptions = HttpRequest.mergeOptions(HttpRequest.defaultConfig, options)
        // 拦截
        this.interceptors(axiosInstance)
        // 返回实例
        return axiosInstance(newOptions)
    }

    /**
     * 通用实例拦截器
     * @param axiosInstance 当前Axios实例
     * @return AxiosInstance
     */
    private interceptors(axiosInstance: AxiosInstance) {
        axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            console.log('请求信息为：', config)
            return config
        }, (error) => {
            return Promise.reject(error)
        })

        axiosInstance.interceptors.response.use((res: AxiosResponse) => {
            const data = res.data
            console.log('响应信息为：', data)
            if (errorHandle(data)) {

            }
            return res
        }, error => {
            return Promise.reject(error)
        })
    }
}

export default HttpRequest
