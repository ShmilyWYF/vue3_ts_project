import {HttpResponse} from "@/mock/HttpResponse";

class Template{
    private _data: string = ''

    get data(): string {
        return this._data;
    }

    set data(value: string) {
        this._data = value;
    }
}
const template = new Template();

export const getAll = () => {
    return HttpResponse.success_200(<Object>template.data)
}

export const addOrUpdate = (args:string) => {
    let parse = <{content:string}>JSON.parse(args);
    template.data = parse.content
    return HttpResponse.success_200()
}

export const deleteAbout = () => template.data = ''
