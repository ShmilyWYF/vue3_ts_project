import MockResponse from '@/mock/MockResponse'
import {mock} from 'mockjs'
import {MockApiInterface} from "@/interface";
import qs from "qs";

class MockHandler extends MockResponse {

    public constructor(url: string, type: string, template: any, code: number, status: boolean, condition: boolean) {
        super(url, type, template, code, status, condition)
    }

    public static mockOption(options: Object) {
        // 获得解析模板
        const mockTemplate: MockApiInterface[] = this.createMockTemplate(options)
        // 根据模板数据获取对象实例
        const getMockObj: MockHandler[] = this.createInstance(mockTemplate)
        // 将实例批量初始化
        getMockObj.forEach((mockHandler: MockHandler) => {
            // 初始化MOCK
            mockHandler.init(mock)
        })
    }

    /**
     * 解析数据模板
     * @param option
     */
    private static createMockTemplate(option: Object): MockApiInterface[] {
        let arr: MockApiInterface[] = []
        Object.keys(option).reduce((prev: any, curr: string) => {
            let bl:boolean = Object.prototype.hasOwnProperty.call(prev[curr],'default');
            prev[curr][bl?'default':Object.keys(prev[curr])[0]].forEach((res: MockApiInterface) => {
                arr.push(res)
            })
            return prev
        }, option)
        return arr
    }

    /**
     * 构造对象实例
     * @param options
     * @private
     */
    private static createInstance(options: MockApiInterface[]): MockHandler[] {
        let arr: MockHandler[] = [];
        options.forEach((res: MockApiInterface) => {
            arr.push(new MockHandler(res.url, res.type, res.template, res.code, res.status, res.condition));
        })
        return arr
    }

    /**
     * url转正则表达式
     * @param url url地址
     * @private
     */
    private urlToRegexp(url:string):RegExp {
        let str:string = url.charAt(0) == '/'?url.substring(1):url
        // 将URL中的通配符替换为正则表达式中的通配符
        const pattern:string = str.replace(/\*/g, '.*').replace(/\?/g, '.');
        // 添加开始和结束锚点与可选匹配
        return new RegExp('^' + '\/(?:api\/)?' + pattern+'(?:\\?.*)?' + '$');
    }

    /**
     * 初始化MOCK
     * @param mock mock函数
     * @private
     */
    private init(mock: any): void {
        const regExp = this.urlToRegexp(this.getUrl);
        mock(regExp, this.getType, (option: { body: string | undefined, url:string, type:string }) => {
            if(option.url.includes('?')){
                let body = option.url.split('?')[1];
                option.body = qs.parse(body);
            }
            return this.response(option?.body)
        });
    }

}

export default MockHandler
