import {list} from '@/axios/import'
import HttpRequest from "@/axios/HttpRequest";

class RulesVariable {

    private static _BASE_API:string = process.env.VUE_APP_BASE_API;

    private static _IS_AXIOS_BASE:boolean = process.env.VUE_APP_IS_AUTO_AXIOS_BASE

    private _isEnable: boolean;

    constructor(isEnable: boolean) {
        this._isEnable = isEnable;
    }


    static get BASE_API(): string {
        return this._BASE_API;
    }

    static get IS_AXIOS_BASE(): boolean {
        return this._IS_AXIOS_BASE;
    }

    get isEnable(): boolean {
        return this._isEnable;
    }
}

interface RulesApi {

    rulesApi(isEnable: boolean): any;

    start(): any;
}

class RulesApiImpl extends RulesVariable implements RulesApi {
    constructor(isEnable: boolean) {
        super(isEnable);
    }

    rulesApi(isEnable: boolean): any {
        console.log(isEnable)
        return isEnable ? this.autoCreateApi() : this.customCreateApi(list)
    }

    start() {
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

    // 通用工具方法
    private apiTool(key: any): {} {
        return Object.keys(key).reduce((pre: any, cur: string) => {
            pre[cur] = (data: {}) => { // 该参用于给生成的对象添加操作参数
                return new HttpRequest(RulesVariable.BASE_API).createAxiosInstance({...key[cur], data})
            }
            return pre
        }, {})
    }


}

export default new RulesApiImpl(RulesApiImpl.IS_AXIOS_BASE).start()
