// 深拷贝
/**
 * 深拷贝通用方法
 * @param obj   需要拷贝的对象
 * @param has
 * @returns {any|RegExp|Date}
 */
export const deepClone = (obj:any, has = new WeakMap()): any | RegExp | Date => {
    // 类型检查
    if (obj == null) return obj;
    if (obj instanceof Date) return obj;
    if (obj instanceof RegExp) return obj;
    if (!(typeof obj == "object")) return obj;

    // 构造对象
    const newObj = new obj.constructor;

    // 防止自引用导致的死循环
    if (has.get(obj)) return has.get(obj);
    has.set(obj, newObj);

    // 循环遍历属性及方法
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }

    // 返回对象
    return newObj;
}

// 首字母转大写
export const  firstCharacterToUppercase = (str:string)=> {
    return str.replace(/^(\w{1})/, (r) => r.toUpperCase())
}
// 转驼峰
export function getKebabCase(str:string):string {
    let temp = str.replace(/[A-Z]/g, function(i) {
        return '_' + i.toLowerCase();
    })
    //如果首字母是大写，执行replace时会多一个_，需要去掉
    if (temp.slice(0,1) === '_') {
        temp = temp.slice(1);
    }
    return temp;
}
