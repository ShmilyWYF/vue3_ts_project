import cookies from "js-cookie";

export const setCookie = (token: string) => {
    cookies.set('token', token, {expires: 7})
}
export const getCookie = (tokenKey: string = 'token') => {
    return cookies.get(tokenKey)
}
export const removeCookie = (tokenKey: string = 'token') => {
    return cookies.remove(tokenKey)
}
