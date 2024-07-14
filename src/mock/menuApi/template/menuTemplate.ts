import {getCookie} from "@/utils/cookie";
import store from "@/store";
import asyncMenu from '@/router/asyncMenu.json' assert { type: 'JSON' }

interface RolesMenuInterface {
    path: string,
    title: string,
    id: number,
    meta: {},
    component?: string,
}

class RolesMenu {

    private readonly _Trees: Set<any>;

    constructor(v1?: any) {
        this._Trees = v1 || new Set<any>()
    }

    get Trees(): Set<{ id: number, shiroGroupName: string, groupTree: RolesMenuInterface[] }> {
        return this._Trees;
    }

    set Trees(value: {}) {
        this._Trees.add(value)
    }

    public addGroup(v1: string, v2: RolesMenuInterface[]) {
        this.Trees = <{ id: number, shiroGroupName: string, groupTree: RolesMenuInterface[] }>{
            id: this._Trees.size != 0 ? this._Trees.size + 1 : 1,
            shiroGroupName: v1,
            groupTree: v2
        }
    }
}

const rolesMenu = new RolesMenu();

const init = [
    {
        id: 1,
        shiroGroupName: 'root',
        groupTree: [
            {
                "path": "/Dashboard",
                "title": "后台管理",
                "id": 1001,
                "meta": {
                    "require": false,
                    "title": "后台管理"
                },
                "component": "/src/layout/index.vue"
            },
            {
                "path": "/Dashboard/home",
                "title": "首页",
                "id": 10010,
                "meta": {
                    "require": true,
                    "title": "首页"
                },
                "component": "/src/views/Dashboard/index.vue\")"
            },
            {
                "path": "/Dashboard/mark",
                "title": "文章管理",
                "id": 10011,
                "meta": {
                    "require": false,
                    "title": "文章管理",
                    "noRedirect": true
                }
            },
            {
                "path": "/Dashboard/mark/edit",
                "title": "文章编辑",
                "id": 100110,
                "meta": {
                    "hide": true,
                    "require": false,
                    "title": "文章编辑"
                },
                "component": "/src/views/Dashboard/components/markEdit/index.vue"
            },
            {
                "path": "/Dashboard/mark/articleList",
                "title": "文章列表",
                "id": 100111,
                "meta": {
                    "require": false,
                    "title": "文章列表"
                },
                "component": "/src/views/Dashboard/components/articleList/index.vue"
            },
            {
                "path": "/Dashboard/mark/tag",
                "title": "标签管理",
                "id": 100112,
                "meta": {
                    "require": false,
                    "title": "标签管理"
                },
                "component": "/src/views/Dashboard/components/tag/index.vue"
            },
            {
                "path": "/Dashboard/mark/category",
                "title": "分类管理",
                "id": 100113,
                "meta": {
                    "require": false,
                    "title": "分类管理"
                },
                "component": "/src/views/Dashboard/components/category/index.vue"
            },
            {
                "path": "/Dashboard/comment",
                "title": "评论管理",
                "id": 10012,
                "meta": {
                    "require": true,
                    "title": "评论管理"
                },
                "component": "/src/views/Dashboard/components/comment/index.vue"
            },
            {
                "path": "/Dashboard/user",
                "title": "用户管理",
                "id": 10013,
                "meta": {
                    "require": true,
                    "title": "用户管理"
                },
                "component": "/src/views/Dashboard/components/user/index.vue"
            },
            {
                "path": "/Dashboard/message",
                "title": "留言",
                "id": 10014,
                "meta": {
                    "require": true,
                    "title": "留言"
                },
                "component": "/src/views/Dashboard/components/message/index.vue"
            },
            {
                "path": "/Dashboard/about",
                "title": "关于",
                "id": 10015,
                "meta": {
                    "require": true,
                    "title": "关于"
                },
                "component": "/src/views/Dashboard/components/about/index.vue"
            },
            {
                "path": "/Dashboard/mail",
                "title": "邮件系统",
                "id": 10016,
                "meta": {
                    "require": true,
                    "title": "邮件系统"
                },
                "component": "/src/views/Dashboard/components/mail/index.vue"
            },
            {
                "path": "/Dashboard/website",
                "title": "网站设置",
                "id": 10017,
                "meta": {
                    "require": true,
                    "title": "网站设置"
                },
                "component": "/src/views/Dashboard/components/website/index.vue"
            }
        ]
    }
]
init.forEach(i => {
    rolesMenu.Trees = i
})

export const addGroupRoles = (obj: string) => {
    const {shiroGroupName, groupTree} = <{ shiroGroupName: string, groupTree: RolesMenuInterface[] }>JSON.parse(obj);
    rolesMenu.addGroup(shiroGroupName, groupTree)
    return {message: 'ok'}
}

export const removeGroupRoles = ({id}: { id: number }) => {
    let tree = rolesMenu.Trees.values()[Symbol.iterator]();
    let next = tree.next();
    while (!next.done) {
        if (next.value.id == id) {
            rolesMenu.Trees.delete(next.value)
            return {message: 'ok'}
        }
        next = tree.next()
    }
    return {message: '没有找到当前分组'}
}

export const updateGroupRoles = (obj: string) => {
    const {id, shiroGroupName, groupTree} = <{
        id: number,
        shiroGroupName: string,
        groupTree: RolesMenuInterface[]
    }>JSON.parse(obj)
    let tree = rolesMenu.Trees[Symbol.iterator]();
    let next = tree.next();
    while (!next.done) {
        if (next.value.id === id) {
            rolesMenu.Trees.delete(next.value)
            rolesMenu.Trees.add(JSON.parse(obj))
            return {message: 'ok'}
        }
        next = tree.next()
    }
    console.log(rolesMenu)
    return {message: 'ok~'}
}

export const getGroupRoles = () => {
    let E: { id: number; shiroGroupName: string; groupCount: number; groupTree: RolesMenuInterface[] }[] = [];
    rolesMenu.Trees.forEach(i => {
        let length = userRoles.filter(k => k.shiroGroupId === i.id).length;
        E.push({
            id: E.length + 1,
            shiroGroupName: i.shiroGroupName,
            groupCount: length,
            groupTree: i.groupTree
        })
    })
    return {message: 'ok', data: E}
}


// 个人路由部分
const superUserShiro = [1001,10010,10011,100110,100111,100112,100113,10012,10013,10014,10015,10016,10017]
const superUser: { userId: number; shiroGroupId: number; }[] = []
superUserShiro.forEach(i=>{superUser.push({userId:1,shiroGroupId:i})})
superUserShiro.forEach(i=>{superUser.push({userId:999,shiroGroupId:i})})
const userRoles: { userId: number, shiroGroupId: number }[] = [
    ...superUser
]

export const addRolesMenuByUser = (obj: string) => {
    const {id, shiroGroupId} = <{ id: number, shiroGroupId: number[] }>JSON.parse(obj)
    shiroGroupId.forEach(i => {
        userRoles.push({shiroGroupId: i, userId: id})
    })
    return {message: 'ok'}
}

export const removeRolesMenuByUser = ({id}: { id: number }) => {
    userRoles.forEach((i,index)=>{
        if (i.userId == id) userRoles.splice(index,1)
    })
}

export const updateRolesMenuByUser = (obj: string) => {
    const {id, shiroGroupId} = <{ id: number, shiroGroupId: number[] }>JSON.parse(obj)
    const shiroGroupIdSet = new Set(shiroGroupId);
    // 找到当前用户所有路由
    const filteredUserRoles = userRoles.filter(role => role.userId === id);
    // 最新路由是否存在用户当前路由组，不存在则添加
    shiroGroupIdSet.forEach(v => {
        if (!filteredUserRoles.some(role => role.shiroGroupId === v)) {
            addRolesMenuByUser(JSON.stringify({id:id, shiroGroupId:[v]}))
        }
    });
    // 删除多余项
    filteredUserRoles.filter(i=>!shiroGroupIdSet.has(i.shiroGroupId)).forEach((v)=>{
        let key = userRoles.findIndex(i=> i.userId === id && i.shiroGroupId === v.shiroGroupId)
        if(key != -1){
            userRoles.splice(key,1)
        }
    })
    return {message: 'ok'}
}

export const getRolesMenuByUser = (args:{id:number}|undefined):{} => {
    if (args!=undefined&&args.id != undefined){
        let roles = userRoles.filter(i=>i.userId == args.id);
        const result = asyncMenu.filter(i=> {
            return roles.some(j=>j.shiroGroupId == i.id)
        });
        if(result.length != 0){
            return {message: 'ok',data:result}
        }
        return {code:500,message: '没有访问权限'}
    }
    let cookie = getCookie('token');
    if (cookie) {
        if (store.getters.userinfo.type !== 1) {
            return getRolesMenuByUser({id:store.getters.userinfo.id})
        }
    }
    return {code:500,message: '没有访问权限'}
}






