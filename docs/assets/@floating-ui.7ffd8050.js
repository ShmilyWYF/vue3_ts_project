const I=Math.min,M=Math.max,G=Math.round,K=Math.floor,k=t=>({x:t,y:t}),Ct={left:"right",right:"left",bottom:"top",top:"bottom"},Et={start:"end",end:"start"};function ot(t,e,o){return M(t,I(e,o))}function _(t,e){return typeof t=="function"?t(e):t}function V(t){return t.split("-")[0]}function q(t){return t.split("-")[1]}function gt(t){return t==="x"?"y":"x"}function st(t){return t==="y"?"height":"width"}function tt(t){return["top","bottom"].includes(V(t))?"y":"x"}function rt(t){return gt(tt(t))}function Tt(t,e,o){o===void 0&&(o=!1);const n=q(t),i=rt(t),r=st(i);let s=i==="x"?n===(o?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=J(s)),[s,J(s)]}function Lt(t){const e=J(t);return[it(t),e,it(e)]}function it(t){return t.replace(/start|end/g,e=>Et[e])}function Pt(t,e,o){const n=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:n:e?n:i;case"left":case"right":return e?r:s;default:return[]}}function St(t,e,o,n){const i=q(t);let r=Pt(V(t),o==="start",n);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(it)))),r}function J(t){return t.replace(/left|right|bottom|top/g,e=>Ct[e])}function Dt(t){return{top:0,right:0,bottom:0,left:0,...t}}function ht(t){return typeof t!="number"?Dt(t):{top:t,right:t,bottom:t,left:t}}function Q(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function at(t,e,o){let{reference:n,floating:i}=t;const r=tt(e),s=rt(e),c=st(s),l=V(e),f=r==="y",g=n.x+n.width/2-i.width/2,u=n.y+n.height/2-i.height/2,m=n[c]/2-i[c]/2;let a;switch(l){case"top":a={x:g,y:n.y-i.height};break;case"bottom":a={x:g,y:n.y+n.height};break;case"right":a={x:n.x+n.width,y:u};break;case"left":a={x:n.x-i.width,y:u};break;default:a={x:n.x,y:n.y}}switch(q(e)){case"start":a[s]-=m*(o&&f?-1:1);break;case"end":a[s]+=m*(o&&f?-1:1);break}return a}const kt=async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,c=r.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:g,y:u}=at(f,n,l),m=n,a={},d=0;for(let p=0;p<c.length;p++){const{name:w,fn:h}=c[p],{x,y:v,data:A,reset:y}=await h({x:g,y:u,initialPlacement:n,placement:m,strategy:i,middlewareData:a,rects:f,platform:s,elements:{reference:t,floating:e}});if(g=x??g,u=v??u,a={...a,[w]:{...a[w],...A}},y&&d<=50){d++,typeof y=="object"&&(y.placement&&(m=y.placement),y.rects&&(f=y.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):y.rects),{x:g,y:u}=at(f,m,l)),p=-1;continue}}return{x:g,y:u,placement:m,strategy:i,middlewareData:a}};async function pt(t,e){var o;e===void 0&&(e={});const{x:n,y:i,platform:r,rects:s,elements:c,strategy:l}=t,{boundary:f="clippingAncestors",rootBoundary:g="viewport",elementContext:u="floating",altBoundary:m=!1,padding:a=0}=_(e,t),d=ht(a),w=c[m?u==="floating"?"reference":"floating":u],h=Q(await r.getClippingRect({element:(o=await(r.isElement==null?void 0:r.isElement(w)))==null||o?w:w.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:f,rootBoundary:g,strategy:l})),x=u==="floating"?{...s.floating,x:n,y:i}:s.reference,v=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),A=await(r.isElement==null?void 0:r.isElement(v))?await(r.getScale==null?void 0:r.getScale(v))||{x:1,y:1}:{x:1,y:1},y=Q(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:x,offsetParent:v,strategy:l}):x);return{top:(h.top-y.top+d.top)/A.y,bottom:(y.bottom-h.bottom+d.bottom)/A.y,left:(h.left-y.left+d.left)/A.x,right:(y.right-h.right+d.right)/A.x}}const Jt=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:s,elements:c}=e,{element:l,padding:f=0}=_(t,e)||{};if(l==null)return{};const g=ht(f),u={x:o,y:n},m=rt(i),a=st(m),d=await s.getDimensions(l),p=m==="y",w=p?"top":"left",h=p?"bottom":"right",x=p?"clientHeight":"clientWidth",v=r.reference[a]+r.reference[m]-u[m]-r.floating[a],A=u[m]-r.reference[m],y=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l));let b=y?y[x]:0;(!b||!await(s.isElement==null?void 0:s.isElement(y)))&&(b=c.floating[x]||r.floating[a]);const N=v/2-A/2,j=b/2-d[a]/2-1,X=I(g[w],j),Y=I(g[h],j),C=X,$=b-d[a]-Y,R=b/2-d[a]/2+N,T=ot(C,R,$),D=q(i)!=null&&R!=T&&r.reference[a]/2-(R<C?X:Y)-d[a]/2<0?R<C?C-R:$-R:0;return{[m]:u[m]-D,data:{[m]:T,centerOffset:R-T+D}}}}),Qt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:n,middlewareData:i,rects:r,initialPlacement:s,platform:c,elements:l}=e,{mainAxis:f=!0,crossAxis:g=!0,fallbackPlacements:u,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:a="none",flipAlignment:d=!0,...p}=_(t,e),w=V(n),h=V(s)===s,x=await(c.isRTL==null?void 0:c.isRTL(l.floating)),v=u||(h||!d?[J(s)]:Lt(s));!u&&a!=="none"&&v.push(...St(s,d,a,x));const A=[s,...v],y=await pt(e,p),b=[];let N=((o=i.flip)==null?void 0:o.overflows)||[];if(f&&b.push(y[w]),g){const C=Tt(n,r,x);b.push(y[C[0]],y[C[1]])}if(N=[...N,{placement:n,overflows:b}],!b.every(C=>C<=0)){var j,X;const C=(((j=i.flip)==null?void 0:j.index)||0)+1,$=A[C];if($)return{data:{index:C,overflows:N},reset:{placement:$}};let R=(X=N.filter(T=>T.overflows[0]<=0).sort((T,B)=>T.overflows[1]-B.overflows[1])[0])==null?void 0:X.placement;if(!R)switch(m){case"bestFit":{var Y;const T=(Y=N.map(B=>[B.placement,B.overflows.filter(D=>D>0).reduce((D,Ot)=>D+Ot,0)]).sort((B,D)=>B[1]-D[1])[0])==null?void 0:Y[0];T&&(R=T);break}case"initialPlacement":R=s;break}if(n!==R)return{reset:{placement:R}}}return{}}}};async function Ft(t,e){const{placement:o,platform:n,elements:i}=t,r=await(n.isRTL==null?void 0:n.isRTL(i.floating)),s=V(o),c=q(o),l=tt(o)==="y",f=["left","top"].includes(s)?-1:1,g=r&&l?-1:1,u=_(e,t);let{mainAxis:m,crossAxis:a,alignmentAxis:d}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return c&&typeof d=="number"&&(a=c==="end"?d*-1:d),l?{x:a*g,y:m*f}:{x:m*f,y:a*g}}const Zt=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:n}=e,i=await Ft(e,t);return{x:o+i.x,y:n+i.y,data:i}}}},te=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:w=>{let{x:h,y:x}=w;return{x:h,y:x}}},...l}=_(t,e),f={x:o,y:n},g=await pt(e,l),u=tt(V(i)),m=gt(u);let a=f[m],d=f[u];if(r){const w=m==="y"?"top":"left",h=m==="y"?"bottom":"right",x=a+g[w],v=a-g[h];a=ot(x,a,v)}if(s){const w=u==="y"?"top":"left",h=u==="y"?"bottom":"right",x=d+g[w],v=d-g[h];d=ot(x,d,v)}const p=c.fn({...e,[m]:a,[u]:d});return{...p,data:{x:p.x-o,y:p.y-n}}}}};function F(t){return xt(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function S(t){var e;return(e=(xt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function xt(t){return t instanceof Node||t instanceof O(t).Node}function P(t){return t instanceof Element||t instanceof O(t).Element}function L(t){return t instanceof HTMLElement||t instanceof O(t).HTMLElement}function ut(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof O(t).ShadowRoot}function U(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=E(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function Nt(t){return["table","td","th"].includes(F(t))}function ct(t){const e=lt(),o=E(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(n=>(o.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(o.contain||"").includes(n))}function Bt(t){let e=z(t);for(;L(e)&&!et(e);){if(ct(e))return e;e=z(e)}return null}function lt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function et(t){return["html","body","#document"].includes(F(t))}function E(t){return O(t).getComputedStyle(t)}function nt(t){return P(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function z(t){if(F(t)==="html")return t;const e=t.assignedSlot||t.parentNode||ut(t)&&t.host||S(t);return ut(e)?e.host:e}function wt(t){const e=z(t);return et(e)?t.ownerDocument?t.ownerDocument.body:t.body:L(e)&&U(e)?e:wt(e)}function Z(t,e){var o;e===void 0&&(e=[]);const n=wt(t),i=n===((o=t.ownerDocument)==null?void 0:o.body),r=O(n);return i?e.concat(r,r.visualViewport||[],U(n)?n:[]):e.concat(n,Z(n))}function yt(t){const e=E(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=L(t),r=i?t.offsetWidth:o,s=i?t.offsetHeight:n,c=G(o)!==r||G(n)!==s;return c&&(o=r,n=s),{width:o,height:n,$:c}}function ft(t){return P(t)?t:t.contextElement}function H(t){const e=ft(t);if(!L(e))return k(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=yt(e);let s=(r?G(o.width):o.width)/n,c=(r?G(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const Mt=k(0);function vt(t){const e=O(t);return!lt()||!e.visualViewport?Mt:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Vt(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==O(t)?!1:e}function W(t,e,o,n){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),r=ft(t);let s=k(1);e&&(n?P(n)&&(s=H(n)):s=H(t));const c=Vt(r,o,n)?vt(r):k(0);let l=(i.left+c.x)/s.x,f=(i.top+c.y)/s.y,g=i.width/s.x,u=i.height/s.y;if(r){const m=O(r),a=n&&P(n)?O(n):n;let d=m.frameElement;for(;d&&n&&a!==m;){const p=H(d),w=d.getBoundingClientRect(),h=E(d),x=w.left+(d.clientLeft+parseFloat(h.paddingLeft))*p.x,v=w.top+(d.clientTop+parseFloat(h.paddingTop))*p.y;l*=p.x,f*=p.y,g*=p.x,u*=p.y,l+=x,f+=v,d=O(d).frameElement}}return Q({width:g,height:u,x:l,y:f})}function Wt(t){let{rect:e,offsetParent:o,strategy:n}=t;const i=L(o),r=S(o);if(o===r)return e;let s={scrollLeft:0,scrollTop:0},c=k(1);const l=k(0);if((i||!i&&n!=="fixed")&&((F(o)!=="body"||U(r))&&(s=nt(o)),L(o))){const f=W(o);c=H(o),l.x=f.x+o.clientLeft,l.y=f.y+o.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-s.scrollLeft*c.x+l.x,y:e.y*c.y-s.scrollTop*c.y+l.y}}function Ht(t){return Array.from(t.getClientRects())}function bt(t){return W(S(t)).left+nt(t).scrollLeft}function It(t){const e=S(t),o=nt(t),n=t.ownerDocument.body,i=M(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=M(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+bt(t);const c=-o.scrollTop;return E(n).direction==="rtl"&&(s+=M(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:s,y:c}}function zt(t,e){const o=O(t),n=S(t),i=o.visualViewport;let r=n.clientWidth,s=n.clientHeight,c=0,l=0;if(i){r=i.width,s=i.height;const f=lt();(!f||f&&e==="fixed")&&(c=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:c,y:l}}function jt(t,e){const o=W(t,!0,e==="fixed"),n=o.top+t.clientTop,i=o.left+t.clientLeft,r=L(t)?H(t):k(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,l=i*r.x,f=n*r.y;return{width:s,height:c,x:l,y:f}}function dt(t,e,o){let n;if(e==="viewport")n=zt(t,o);else if(e==="document")n=It(S(t));else if(P(e))n=jt(e,o);else{const i=vt(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return Q(n)}function At(t,e){const o=z(t);return o===e||!P(o)||et(o)?!1:E(o).position==="fixed"||At(o,e)}function Xt(t,e){const o=e.get(t);if(o)return o;let n=Z(t).filter(c=>P(c)&&F(c)!=="body"),i=null;const r=E(t).position==="fixed";let s=r?z(t):t;for(;P(s)&&!et(s);){const c=E(s),l=ct(s);!l&&c.position==="fixed"&&(i=null),(r?!l&&!i:!l&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||U(s)&&!l&&At(t,s))?n=n.filter(g=>g!==s):i=c,s=z(s)}return e.set(t,n),n}function Yt(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const s=[...o==="clippingAncestors"?Xt(e,this._c):[].concat(o),n],c=s[0],l=s.reduce((f,g)=>{const u=dt(e,g,i);return f.top=M(u.top,f.top),f.right=I(u.right,f.right),f.bottom=I(u.bottom,f.bottom),f.left=M(u.left,f.left),f},dt(e,c,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function $t(t){return yt(t)}function _t(t,e,o){const n=L(e),i=S(e),r=o==="fixed",s=W(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const l=k(0);if(n||!n&&!r)if((F(e)!=="body"||U(i))&&(c=nt(e)),n){const f=W(e,!0,r,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}else i&&(l.x=bt(i));return{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function mt(t,e){return!L(t)||E(t).position==="fixed"?null:e?e(t):t.offsetParent}function Rt(t,e){const o=O(t);if(!L(t))return o;let n=mt(t,e);for(;n&&Nt(n)&&E(n).position==="static";)n=mt(n,e);return n&&(F(n)==="html"||F(n)==="body"&&E(n).position==="static"&&!ct(n))?o:n||Bt(t)||o}const qt=async function(t){let{reference:e,floating:o,strategy:n}=t;const i=this.getOffsetParent||Rt,r=this.getDimensions;return{reference:_t(e,await i(o),n),floating:{x:0,y:0,...await r(o)}}};function Ut(t){return E(t).direction==="rtl"}const Kt={convertOffsetParentRelativeRectToViewportRelativeRect:Wt,getDocumentElement:S,getClippingRect:Yt,getOffsetParent:Rt,getElementRects:qt,getClientRects:Ht,getDimensions:$t,getScale:H,isElement:P,isRTL:Ut};function Gt(t,e){let o=null,n;const i=S(t);function r(){clearTimeout(n),o&&o.disconnect(),o=null}function s(c,l){c===void 0&&(c=!1),l===void 0&&(l=1),r();const{left:f,top:g,width:u,height:m}=t.getBoundingClientRect();if(c||e(),!u||!m)return;const a=K(g),d=K(i.clientWidth-(f+u)),p=K(i.clientHeight-(g+m)),w=K(f),x={rootMargin:-a+"px "+-d+"px "+-p+"px "+-w+"px",threshold:M(0,I(1,l))||1};let v=!0;function A(y){const b=y[0].intersectionRatio;if(b!==l){if(!v)return s();b?s(!1,b):n=setTimeout(()=>{s(!1,1e-7)},100)}v=!1}try{o=new IntersectionObserver(A,{...x,root:i.ownerDocument})}catch{o=new IntersectionObserver(A,x)}o.observe(t)}return s(!0),r}function ee(t,e,o,n){n===void 0&&(n={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=!1}=n,f=ft(t),g=i||r?[...f?Z(f):[],...Z(e)]:[];g.forEach(h=>{i&&h.addEventListener("scroll",o,{passive:!0}),r&&h.addEventListener("resize",o)});const u=f&&c?Gt(f,o):null;let m=-1,a=null;s&&(a=new ResizeObserver(h=>{let[x]=h;x&&x.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{a&&a.observe(e)})),o()}),f&&!l&&a.observe(f),a.observe(e));let d,p=l?W(t):null;l&&w();function w(){const h=W(t);p&&(h.x!==p.x||h.y!==p.y||h.width!==p.width||h.height!==p.height)&&o(),p=h,d=requestAnimationFrame(w)}return o(),()=>{g.forEach(h=>{i&&h.removeEventListener("scroll",o),r&&h.removeEventListener("resize",o)}),u&&u(),a&&a.disconnect(),a=null,l&&cancelAnimationFrame(d)}}const ne=(t,e,o)=>{const n=new Map,i={platform:Kt,...o},r={...i.platform,_c:n};return kt(t,e,{...i,platform:r})};export{Jt as a,ee as b,ne as c,pt as d,Qt as f,Zt as o,te as s};
