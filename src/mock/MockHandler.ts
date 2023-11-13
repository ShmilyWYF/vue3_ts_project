import MockResponse from '@/mock/MockResponse'
import {mock} from 'mockjs'
import {MockApiInterface} from "@/interface";
import {RegUrl} from "@/utils/RegExpUtils";

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
            prev[curr].default.forEach((res: MockApiInterface) => {
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
        let arr = options.map((res: MockApiInterface): MockHandler => {
            return (new MockHandler(res.url, res.type, res.template, res.code, res.status, res.condition))
        })
        return arr
    }

    /**
     * 初始化MOCK
     * @param mock mock函数
     * @private
     */
    private init(mock: any): void {
        mock(RegUrl(this.getUrl), this.getType, (option: { body: string | undefined }) => {
            return this.response(option?.body)
        });
    }

}

export default MockHandler
