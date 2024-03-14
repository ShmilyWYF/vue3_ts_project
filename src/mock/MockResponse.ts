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
                data?: object,
                message: string,
                status?: boolean
            };
            private readonly _parameters: {} | undefined;
            private _fetchedData: any | undefined;

            constructor(data: Function | Object, parameters?: {}) {
                if (typeof data !== "function" && typeof data !== "object") {
                    throw new Error("Invalid data type. Must be a function or an object.");
                }
                this._data = data;
                this._parameters = parameters;
            }

            private getData(): templateInterface {
                if (this._fetchedData) {
                    return this._fetchedData;
                }

                let result: any;
                if (typeof this._data === "object") {
                    result = this._data;
                } else if (typeof this._data === "function") {
                    result = this._data(this._parameters);
                } else {
                    throw new Error("Invalid data type. Must be a function or an object.");
                }

                this._fetchedData = result;
                return result;
            }

            get data():{} {
                let template:templateInterface = this.getData()
                return template?.hasOwnProperty('data') ? template.data : template;
            }

            get message():string|undefined {
                const template:templateInterface = this.getData();
                return template?.hasOwnProperty('message') ? template.message : undefined;
            }

            get status():boolean|undefined {
                const template:templateInterface = this.getData();
                return template?.hasOwnProperty('status') ? template.status : undefined;
            }

            get code():number|undefined {
                const template:templateInterface = this.getData();
                return template?.hasOwnProperty('code') ? template.code : undefined;
            }

            getLength():number|undefined {
                const template:templateInterface = this.getData();
                return template?.data?Object.keys(template.data).length:undefined;
            }
        }

        return new InnerClass(template, parameters);
    }
}

interface templateInterface{
    data: {},
    code: number,
    message: string,
    status: boolean,
}
