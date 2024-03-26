interface MenuInterface<T>{
    code: number
    message: string
    status: string
    data?: T
    [key:string]: any
}

enum MenuHttp {
    success_200 = '{"code":200,"message":"成功","status":"success"}',
}

export class HttpResponse<T>{
    private data?: T ;
    private message?:string;
    private code?:number;
    private status?:string;

    constructor()

    constructor(data?: T | undefined, message?: string, code?: number ) {
        this.data = data;
        this.message = message;
        this.code = code;
    }

    private static resultApi<T>(menuHttp:MenuHttp,message?:string,data?:T):HttpResponse<T|any>{
        const menu:MenuInterface<typeof data> = <MenuInterface<typeof data>>JSON.parse(menuHttp);
        const httpResponse:HttpResponse<typeof data> = new HttpResponse<typeof data>();
        httpResponse.code = menu.code
        httpResponse.message = message != undefined?message:menu.message
        httpResponse.data = data
        httpResponse.status = menu.status
        return httpResponse
    }

    public static success_200<T>(message?:string,data?:T):HttpResponse<T>
    public static success_200<T>(message:string,data?:T):HttpResponse<T>
    public static success_200<T>(data:T, message?:string):HttpResponse<T>
    public static success_200<T>(data:T,message:string):HttpResponse<T> {
        return HttpResponse.resultApi(MenuHttp.success_200,message,data)
    }
}
