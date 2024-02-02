import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import errorHandle from '@/axios/errorHander'
import qs from 'qs'
import {ElMessage} from "element-plus";

interface HttpRequestInterface {
    baseURL: string,
    url: string,
    method: string,
    headers: {
        accept: string,
        context: string,
        timeout: number
    },
    data?:{},
    params?:{},
    paramsSerializer?: (params:any)=>string,
}

/**
 * axios实例类
 */
class HttpRequest {

    private static accept = 'Application/json'
    private static context = 'Application/json;charset=UTF-8'

    static defaultConfig = {}

    public constructor(baseURL: string) {
        HttpRequest.defaultConfig = {
            baseURL,
            url: '',
            method: '',
            headers: {
                accept: HttpRequest.accept,
                context: HttpRequest.context,
            },
            timeout: 5000
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
            if (['post', 'put'].includes(config.method as string)&&!(config.data instanceof FormData)) {
                config.data = qs.parse(config.data) //序列化,将查询字符串解析为对象
            }

            return config
        }, (error) => {
            console.log("请求打印:"+error)
            return Promise.reject(error)
        })

        axiosInstance.interceptors.response.use((res: AxiosResponse) => {
            console.log('响应信息为：', res.data)
            if (errorHandle(res)&&res.data.code != 200) {
                // 处理没有处理的异常  方案1：日志写入
                throw new Error(res.data.message)
            }
            return res
        }, (error:Error) => {
            console.log(error.message)
            if (error.message.includes('Request failed')){
                ElMessage.warning("服务异常，请检查服务端是否正常运行~");
            }
            return Promise.reject(error)
        })
    }
}

export default HttpRequest
