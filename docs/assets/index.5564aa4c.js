import{i as x}from"./echarts.562a4f5e.js";import{b as E,_ as l}from"./index.vite.6d3abbee.js";import{a as b}from"./element-plus.25c24083.js";import{G as m,d as y,h as F,o as _,c as d,ag as g,a as p,U as i,O as a,S as s,u as A,bf as v,be as w}from"./@vue.fabb9c8d.js";import"./zrender.27dc47ff.js";import"./vue-router.f056de20.js";import"./axios.f2a602b3.js";import"./qs.063c35ea.js";import"./side-channel.e032f824.js";import"./get-intrinsic.8c87d952.js";import"./has-symbols.caae0f97.js";import"./has-proto.76cff6c7.js";import"./function-bind.cb3858f2.js";import"./has.c1051c46.js";import"./call-bind.10384396.js";import"./object-inspect.e87864a5.js";import"./js-cookie.711e9524.js";import"./vuex.2b7afe98.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.0db61dbe.js";import"./@element-plus.f5db7ac0.js";import"./mavon-Editor.fcac058e.js";import"./vue.da1923c5.js";/* empty css                     */import"./vue-i18n.0b337231.js";import"./@intlify.76cd5065.js";import"./mockjs.0c6c1460.js";import"./lodash-es.759d0354.js";import"./@vueuse.15c220e7.js";import"./@popperjs.36402333.js";import"./@ctrl.b082b0c1.js";import"./dayjs.09808879.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.c4116648.js";const D=m({__name:"index",setup(n){const c=()=>{let e=[];const r=()=>{let o=new Date,h=o.getFullYear(),B=o.getMonth()+1;return new Date(h,B,0).getDate()};for(let o=1;o<r();o++)e.push(o);return e},u=y(),t=async()=>{await E.useAppApi.getMonthVisits().then(e=>{const{data:r}=e.data;f(r)},e=>{b.error(e.message)})};F(async()=>{await t()});const f=e=>{const r=x(u.value),o={color:["#6EE4C2"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},title:{text:"\u6BCF\u65E5\u8BBF\u95EE\u4EBA\u6B21\u7EDF\u8BA1"},dataZoom:[{type:"inside",start:0,end:100}],grid:{left:"5%",right:"5%",bottom:"5%",containLabel:!0},toolbox:{show:!0,feature:{restore:{show:!0,title:"\u8FD8\u539F"},magicType:{show:!0,type:["line","bar"],title:{line:"\u6298\u7EBF\u56FE",bar:"\u6811\u72B6\u56FE"}}}},dataset:[{source:{x:c(),y:e}}],xAxis:{},yAxis:{},series:[{name:"\u535A\u5BA2\u6BCF\u65E5\u8BBF\u95EE\u4EBA\u6B21\u7EDF\u8BA1",type:"bar",barWidth:"60%"}]};r.setOption(o)};return(e,r)=>(_(),d("div",{id:"HistogramDailyFlow",ref_key:"componentRef",ref:u},null,512))}});const C=l(D,[["__scopeId","data-v-3de15138"]]),I=n=>(v("data-v-057bcb67"),n=n(),w(),n),V={class:"home"},M={class:"option-top"},N={class:"option-center"},S=I(()=>p("div",{class:"option-bottom"},null,-1)),k=m({__name:"index",setup(n){return(c,u)=>{const t=g("el-card");return _(),d("div",V,[p("div",M,[i(t,null,{default:a(()=>[s(" \u6587\u7AE0\u91CF ")]),_:1}),i(t,null,{default:a(()=>[s(" \u6807\u7B7E\u6570 ")]),_:1}),i(t,null,{default:a(()=>[s(" \u6587\u7AE0\u8349\u7A3F ")]),_:1}),i(t,null,{default:a(()=>[s(" \u5F85\u5BA1\u6838\u8BC4\u8BBA ")]),_:1})]),p("div",N,[i(t,{class:"statistics-box"},{default:a(()=>[i(A(C))]),_:1}),i(t,null,{default:a(()=>[s(" 1/4 ")]),_:1}),i(t,null,{default:a(()=>[s(" 1/4 ")]),_:1})]),S])}}});const Et=l(k,[["__scopeId","data-v-057bcb67"]]);export{Et as default};
