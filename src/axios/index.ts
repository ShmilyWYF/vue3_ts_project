import axiosApi from '@/axios/axiosApi' // 引入axios封装实例
import {list} from '@/axios/import'


class RulesVariable {
    private _isEnable: boolean;

    public constructor(isEnable: boolean) {
        this._isEnable = isEnable
    }

    public get IsEnable(): boolean {
        return this._isEnable;
    }

    public set IsEnable(value: boolean) {
        this._isEnable = value;
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
        return this.rulesApi(this.IsEnable)
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
                return axiosApi.createAxiosInstance({...key[cur], data})
            }
            return pre
        }, {})
    }


}

export default new RulesApiImpl(process.env.VUE_APP_IS_AUTO_AXIOS_BASE).start()
