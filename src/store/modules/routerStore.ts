import api from "@/axios";
import {AxiosResponse} from "axios";
import {RouteInterface, ShiroInterface} from "@/interface";
import {DefineComponent} from "vue";

const menuApi = api.menuApi

const routerState = {
    menuList: [],
    menuTree: [],
    accessedRouters: [],
}

const mutations = {
    SET_MENU_LIST(routerStore: any, option: []) {
        routerStore.menuList = option
    },
    SET_ACCESSED_ROUTERS(routerStore: any, option: []) {
        routerStore.accessedRouters = option
    },
    SET_MENU_TREE(routerStore: any, option: any) {
        routerStore.menuTree = option
    },
}
const actions: any = {
    // 根据得到的路由表获取异步路由
    getMenuRoles({commit, state}: any,data:{id?:number}): any {
        return new Promise((resolve, reject) => {
            menuApi.getUserRoles(data).then((res: AxiosResponse) => {
                let {data} = res.data
                console.log("拿到的路由：", data)
                if (data.length < 0) {
                    reject('权限表为空!')
                }
                // 旧路由计算方式
                // data = [data]
                // /*二级整合一级
                //  * while函数：{} 用于广度搜索 先进先出，判断对象是否有子节点，有则将子节点加入data对象后删除并储存入dataList；
                //  * data: [[]] 赋值 用作取值
                //  * dataList: [] 将广度搜索储存一级数组
                //  */
                // data = data.concat([]);
                // const dataList: any[] = []
                // while (data.length !== 0) {
                //     // 从stack中拿出来分析
                //     let shift = data.shift() // stack.pop()  先进后出
                //     dataList.push(shift)
                //     let children = shift['children']
                //     if (children) {
                //         for (let i = 0; i < children.length; i++) {
                //             data.push(children[i])
                //         }
                //     }
                // }
                // // 将datalist数组的url存入 用作url校验组
                // const childrenArray: any[] = dataList.map(res => {
                //     return res.path
                // })
                // console.log('权限表的url:', childrenArray)
                //
                // /* 扁平化菜单数据
                // *  addRoutes: 接收最终结果
                // *  tempPath: 获取循环的path
                // *  tempChildrenList: 根据权限表校验后得到的子组件表
                // *  asyncRouterMap：异步路由表
                // */
                // const addRoutes: any = []
                // // 这里只做了两层的路由处理
                // asyncRouterMap.forEach((route) => {
                //     // 初始化
                //     let tempRoute: any = {};
                //     let tempPath: string = ''
                //     let tempChildrenList: any[] = []
                //     // 浅拷贝  复制异步路由对象
                //     Object.assign(tempRoute, route);
                //     // 获取父路由表一级地址
                //     tempPath = tempRoute.path || '';
                //     console.log(tempPath + "父路由是否存在url:" + childrenArray.includes(tempPath))
                //     // 判断父路由是否存在异步路由表中   判断父路由是否存在子组件
                //     if (childrenArray.includes(tempPath) && tempRoute.hasOwnProperty('children')) {
                //         // 获取异步路由对象子路由数组
                //         let children: any = [];
                //         Object.assign(children, tempRoute['children']);
                //         while (children.length !== 0) {
                //             // 先进先出
                //             const shift = children.shift();
                //             // 判断子路由是否存在异步路由表中
                //             if (childrenArray.includes(shift.path)) {
                //                 // 将通过的子路由加入子路由数组
                //                 tempChildrenList.push(shift)
                //             }
                //         }
                //         // 合并对象属性
                //         tempRoute.children = tempChildrenList
                //         addRoutes.push(tempRoute)
                //     }
                // })
                // vuex结果传输 深拷贝

                function generateTree(data: ShiroInterface[]): RouteInterface[] {
                    const T: RouteInterface[] = [];
                    const map: Map<number, RouteInterface> = new Map();
                    // 将数据转换为以 pid 为键的对象
                    for (const item of data) {
                        let E: RouteInterface = {
                            path: item.path,
                            name: item?.name,
                            redirect: item?.redirect,
                            props: item?.props,
                            meta: item.meta
                        }
                        if (item.component) {
                            E.component = async ():Promise<DefineComponent> => import( /* @vite-ignore */ `${item.component}`)
                        }
                        map.set(item.id, E);
                    }
                    data.forEach((item: ShiroInterface): void => {
                        const parent: RouteInterface | undefined = map.get(item.pid);
                        if (parent) {
                            if (!Object.prototype.hasOwnProperty.call(parent, 'children')) parent.children = [];
                            let newVar: RouteInterface = map.get(item.id)!;
                            parent.children!.push(newVar);
                        } else {
                            let newVar: RouteInterface = map.get(item.id)!;
                            T.push(newVar)
                        }
                    })
                    return T;
                }

                const addRoutes: RouteInterface[] = generateTree(data)
                commit('SET_ACCESSED_ROUTERS', addRoutes)
                resolve(addRoutes)
            }, (error: void) => {
                reject(error)
            })
        })
    },
}


export default {
    namespaced: true,
    routerState,
    mutations,
    actions
}

