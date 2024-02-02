import {list} from '@/axios/import'
import HttpRequest from "@/axios/HttpRequest";
import qs from 'qs'

class RulesVariable {

    // private static _BASE_API: any = 'http://localhost:8080';

    private readonly _isEnable: boolean;

    public constructor(isEnable: boolean) {
        this._isEnable = isEnable;
    }

    private static readonly _IS_AXIOS_BASE: boolean = import.meta.env.APP_IS_AUTO_AXIOS_BASE;

    public static get IS_AXIOS_BASE(): boolean {
        return this._IS_AXIOS_BASE;
    }

    private static _BASE_API: string = '/api';

    private static get BASE_API(): string {
        return this._BASE_API;
    }

    protected get isEnable(): boolean {
        return this._isEnable;
    }


    // 通用工具方法
    protected apiTool(key: any ): {} {
        return Object.keys(key).reduce((pre: any, cur: string) => {
            // post-get-load兼容
            const type = ['get', 'delete'].includes(key[cur].method) ? 'params' : 'data'
            if (type === 'params'||key[cur].data instanceof FormData){
                key[cur].paramsSerializer = (params:any) => {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                }
            }
            pre[cur] = (data: {}) => { // 该参用于给生成的对象添加操作参数
                return new HttpRequest(RulesVariable.BASE_API).createAxiosInstance({...key[cur], [type]: data})
            }
            return pre
        }, {})
    }

}

interface RulesApi {

    rulesApi(isEnable: boolean): {};

    start(): {};
}

class RulesApiImpl extends RulesVariable implements RulesApi {
    constructor(isEnable: boolean) {
        super(isEnable);
    }

    rulesApi(isEnable: boolean) {
        return isEnable ? this.autoCreateApi() : this.customCreateApi(list)
    }

    public start() {
        return this.rulesApi(this.isEnable)
    }

    private autoCreateApi() {
        const requireContext: Record<string, any> = import.meta.glob("../Api/*.ts", {eager: true})
        return Object.keys(requireContext).reduce((prev: any, curr: string) => {
            const fileObject = requireContext[curr].default
            const name: string = curr.replace(/^\..\/Api\/(.*)\.\w+$/, '$1')
            prev[name] = this.apiTool(fileObject)
            return prev
        }, {})
    }

    private customCreateApi(apiUrls: any) {
        return Object.keys(apiUrls).reduce((prev: any, curr: string) => {
            prev[curr] = this.apiTool(apiUrls)
            return prev
        }, {})
    }
}

const api = new RulesApiImpl(RulesApiImpl.IS_AXIOS_BASE ?? true).start()
export default api
