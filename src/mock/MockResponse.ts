export default class MockResponse {

    private readonly url: string
    private readonly type: string
    private readonly template: any
    private readonly code: number
    private readonly status: boolean
    private readonly condition: boolean

    public constructor(url: string, type: string, template: any, code: number, status: boolean, condition: boolean) {
        this.url = url
        this.type = type
        this.template = template
        this.condition = condition
        this.status = status
        this.code = code
    }


    get getUrl(): string {
        return this.url;
    }

    get getType(): string{
        return this.type
    }

    /**
     * 返回模板
     * @param parameters
     */
    public response(parameters?: string|[]) {
        return this.condition ? {
            code: this.code,
            status: this.status,
            message: '请求数据成功',
            total: this.template?.length||Object.keys(this.template).length,
            data: parameters? this.template(parameters) : this.template,
            isExistenceParameter: !!parameters
        } : {
            code: this.code,
            status: this.status,
            message: '请求数据失败'
        }
    }

}
