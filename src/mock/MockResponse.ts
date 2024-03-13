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

    get getType(): string {
        return this.type
    }

    /**
     * 返回模板
     * @param parameters mock函数入参
     */
    public response(parameters?: {}) {
        const result = this.getProtoType(this.template, parameters);
        return this.condition ? {
            code: result.code || this.code,
            status: result.status || this.status,
            message: result.message || 'DefaultMessage',
            total: result.getLength(),
            data: result.data,
            isExistenceParameter: !!parameters
        } : {
            code: 500,
            status: this.status,
            message: '请求数据失败'
        }
    }

    /**
     * 模板数据处理
     * @param template 模板函数入参
     * @param parameters 请求参数
     */
    private getProtoType(template: Function | Object, parameters?: {}) {
        class InnerClass {
            private readonly _data: Function | Object | {
                code: number,
                data: object,
                message: string,
                status: boolean
            };
            private readonly _parameters: {} | undefined;

            constructor(data: Function | Object, parameters?: {}) {
                this._data = data;
                this._parameters = parameters;
            }

            private getData():{
                data: {},
                code: number,
                message: string,
                status: boolean,
            } {
                if (typeof this._data === "object") {
                    return this._data as any
                } else if (typeof this._data === "function") {
                    return this._data(this._parameters) as any
                } else {
                    return this._data
                }
            }

            get data() {
                return Object.prototype.hasOwnProperty.call(this.getData(), 'data') ? this.getData().data : this.getData()
            }

            get message() {
                return Object.prototype.hasOwnProperty.call(this.getData(), 'message') ? this.getData().message : undefined
            }

            get status() {
                return Object.prototype.hasOwnProperty.call(this.getData(), 'status') ? this.getData().status : undefined
            }

            get code() {
                return Object.prototype.hasOwnProperty.call(this.getData(),'code') ? this.getData().code : undefined;
            }


            getLength(): number {
                return Object.keys(this.getData()).length
            }

        }

        return new InnerClass(template, parameters);
    }
}
