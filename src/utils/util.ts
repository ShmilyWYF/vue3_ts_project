// 深拷贝
export const deepCopy=(obj:any)=> {
    // hash表，记录所有的对象的引用关系
    let map = new WeakMap();
    function dp(obj:any) {
        let result:any = null;
        let keys = Object.keys(obj);
        let key = null,
            temp = null,
            existobj = null;
        existobj = map.get(obj);
        //如果这个对象已经被记录则直接返回
        if (existobj) {
            return existobj;
        }
        result = {}
        map.set(obj, result);
        for (let i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            temp = obj[key];
            if (temp && typeof temp === 'object') {
                result[key] = dp(temp);
            } else {
                result[key] = temp;
            }
        }
        return result;
    }
    return dp(obj);
}
