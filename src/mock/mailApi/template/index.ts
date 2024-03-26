import {HttpResponse} from "@/mock/HttpResponse";

interface InterfaceEmail {
    email: string,
    token?: string,
    chptcha?: string,
}

class HasEmailBindCaptcha implements InterfaceEmail {
    private _email: string;
    private _chptcha?: string;
    private _token?: string;

    constructor(email: string, chptcha?: string | undefined, token?: string | undefined) {
        this._email = email;
        this._chptcha = chptcha;
        this._token = token;
    }


    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get chptcha(): string | undefined {
        return this._chptcha;
    }

    set chptcha(value: string | undefined) {
        this._chptcha = value;
    }

    get token(): string | undefined {
        return this._token;
    }

    set token(value: string | undefined) {
        this._token = value;
    }
}

interface EmailInterface {
    toEmail: string[],
    subject: string,
    content: string,
    ttl?: number
}

interface EmailTTlInterface {
    id?: number,
    queue?: string,
    expire?: number,
}

class EmailGroud implements EmailTTlInterface{
    expire?: number;
    id?: number;
    queue?: string;

    constructor()
    constructor(expire?: number, id?: number, queue?: string) {
        this.expire = expire;
        this.id = id;
        this.queue = queue;
    }


    get Expire(): number | undefined {
        return this.expire;
    }

    set Expire(value: number| undefined) {
        this.expire = value;
    }

    get Id(): number | undefined {
        return this.id;
    }

    set Id(value: number|undefined) {
        this.id = value;
    }

    get Queue(): string | undefined{
        return this.queue;
    }

    set Queue(value: string | undefined) {
        this.queue = value;
    }

}

let emailTTlList = new Map<string,EmailTTlInterface>();

export let hasEmailBindCaptcha = new HasEmailBindCaptcha('');

export const getCodeByEmail = (obj: string) => {
    const {toEmail, subject}: { toEmail: string, subject: string } = JSON.parse(obj)
    let randomNumber = Math.floor(Math.random() * 10000) + 1000
    hasEmailBindCaptcha.email = toEmail
    hasEmailBindCaptcha.chptcha = randomNumber.toString()
    alert('标题:' + subject + "\n" + " 验证码：" + hasEmailBindCaptcha.chptcha)
    setTimeout(() => {
        if (hasEmailBindCaptcha.chptcha != undefined || '') {
            hasEmailBindCaptcha.email = ''
            hasEmailBindCaptcha.chptcha = undefined
        }
    }, 60 * 1000)
    return {code: 200, message: '验证码已发送'}
}

export const addGroupMessage = (obj: string) => {
    let parse:EmailInterface = <EmailInterface>JSON.parse(obj);
    if (parse.ttl){
        // 延迟邮件
        const emailGroud:EmailGroud = new EmailGroud();
        emailGroud.Expire = parse.ttl/1000
        emailGroud.Queue = (Math.floor(Math.random()*1e5) + Date.now() + Math.floor(Math.random()*1e5)).toString()
        emailGroud.Id = emailTTlList.size
        emailTTlList.set(String(new Date().getTime()),emailGroud)
    }
    return HttpResponse.success_200()
}

export const getAllTtlMessage = () => {
    const remainingTime = (oldTime:string,oldTtl:number)=>{
        let newtime = new Date().getTime();
        let number = Math.floor((newtime - parseInt(oldTime))/1000);
        return oldTtl - number
    }
    emailTTlList.forEach(((value, key) => {
        value.expire = remainingTime(key, value.expire!)
        emailTTlList.set(key,value)
    }))
    return HttpResponse.success_200([...emailTTlList.values()])
}

export const removeAllTtlMail = () => {
    let element = emailTTlList[Symbol.iterator]();
    let result = element.next();
    while (!result.done){
        let value = result.value;
        emailTTlList.delete(value[0])
        result = element.next()
    }
    return HttpResponse.success_200()
}

export const removeTtlMailByMail = ({messageId}:{messageId:number}) =>{
    let element = emailTTlList[Symbol.iterator]();
    let result = element.next();
    while (!result.done){
        let value = result.value;
        if (value[1].queue != undefined&&parseInt(value[1].queue) == messageId) emailTTlList.delete(value[0])
        result = element.next()
    }
    return HttpResponse.success_200()
}
