import {list} from '@/axios/import'
import HttpRequest from "@/axios/HttpRequest";

class RulesVariable {

    private static _BASE_API: any = process.env.VUE_APP_BASE_API;

    private static _IS_AXIOS_BASE: any = process.env.VUE_APP_IS_AUTO_AXIOS_BASE

    private readonly _isEnable: boolean;

    public constructor(isEnable: boolean) {
        this._isEnable = isEnable;
    }

    private static get BASE_API(): string {
        return this._BASE_API;
    }

    public static get IS_AXIOS_BASE(): boolean {
        return this._IS_AXIOS_BASE;
    }

    protected get isEnable(): boolean {
        return this._isEnable;
    }

    // 通用工具方法
    protected apiTool(key: any): {} {
        return Object.keys(key).reduce((pre: any, cur: string) => {
            pre[cur] = (data: {}) => { // 该参用于给生成的对象添加操作参数
                return new HttpRequest(RulesVariable.BASE_API).createAxiosInstance({...key[cur], data})
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
        console.log(isEnable)
        return isEnable ? this.autoCreateApi() : this.customCreateApi(list)
    }

    public start() {
        return this.rulesApi(this.isEnable)
    }

    private autoCreateApi() {
        const requireContext = require.context('/src/Api/', true, /\.ts/)
        return requireContext.keys().reduce((prev: any, curr: string) => {
            const fileObject = requireContext(curr).default
            const name: string = curr.replace(/^\.\/(.*)\.\w+$/, '$1')
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

export default new RulesApiImpl(RulesApiImpl.IS_AXIOS_BASE ?? true).start()
