import SvgIcon from "@/components/SvgIcon/index.vue";
import {defineComponent} from "vue";

// 插件形式
// export default {
//     install: app => {
//         components.forEach(component => {
//             app.component(component.name, component);
//         });
//     }
// };

const components = ['moon']

//全局按需注册
// export const GlobalComponents = (app: any) => {
//     components.forEach(res=>{
//         SvgIcon.props.name.default = res
//         SvgIcon.props.name.required = false
//         app.component(res, SvgIcon)
//     })
// }



export const svg = (name:string):ReturnType<typeof defineComponent>=> {
    // 只对第一层级操作，深拷贝
    const svg = Object.assign({},SvgIcon)
    // 解构属性
    let props={
        props:{
            color:{
                default: "#333",
                type: String
            },
            name:{
                default: name,
                required: false
            },
            prefix:{
                default: "icon",
                type: String
            }
        }
    }
    Object.assign(svg,props)
    return svg;
}
