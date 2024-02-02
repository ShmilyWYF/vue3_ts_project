import cookies from "js-cookie";


const expirationTime = new Date();
const hours = 12;
const minutes = 60;
expirationTime.setTime(expirationTime.getTime() +  minutes * 60 * 1000 * hours);

export const setCookie = (value: string) => {
    cookies.set('token', value, {expires: expirationTime})
}

export const getCookie = (key: string = 'token') => {
    return cookies.get(key)
}

export const removeCookie = (tokenKey: string = 'token') => {
    cookies.remove(tokenKey)
}


export const setStorageKeyCookie = (value: string = 'vuex') => {

    cookies.set('storage', value, {expires: expirationTime})
}

export const removeStorageKeyCookie = (key: string = 'storage') => {
    cookies.remove(key)
}

