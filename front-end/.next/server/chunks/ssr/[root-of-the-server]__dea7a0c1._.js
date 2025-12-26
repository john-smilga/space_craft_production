module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},6704,a=>{"use strict";let b,c;var d,e=a.i(72131);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(a={},b=u)=>{let[c,d]=(0,e.useState)(y[b]||x),f=(0,e.useRef)(y[b]);(0,e.useEffect)(()=>(f.current!==y[b]&&d(y[b]),w.push([b,d]),()=>{let a=w.findIndex(([a])=>a===b);a>-1&&w.splice(a,1)}),[b]);let g=c.toasts.map(b=>{var c,d,e;return{...a,...a[b.type],...b,removeDelay:b.removeDelay||(null==(c=a[b.type])?void 0:c.removeDelay)||(null==a?void 0:a.removeDelay),duration:b.duration||(null==(d=a[b.type])?void 0:d.duration)||(null==a?void 0:a.duration)||C[b.type],style:{...a.style,...null==(e=a[b.type])?void 0:e.style,...b.style}}});return{...c,toasts:g}},E=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},F=(a,b)=>E("blank")(a,b);F.error=E("error"),F.success=E("success"),F.loading=E("loading"),F.custom=E("custom"),F.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},F.dismissAll=a=>F.dismiss(void 0,a),F.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},F.removeAll=a=>F.remove(void 0,a),F.promise=(a,b,c)=>{let d=F.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?F.success(e,{id:d,...c,...null==c?void 0:c.success}):F.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?F.error(e,{id:d,...c,...null==c?void 0:c.error}):F.dismiss(d)}),a};var G=1e3,H=(a,b="default")=>{let{toasts:c,pausedAt:d}=D(a,b),f=(0,e.useRef)(new Map).current,g=(0,e.useCallback)((a,b=G)=>{if(f.has(a))return;let c=setTimeout(()=>{f.delete(a),h({type:4,toastId:a})},b);f.set(a,c)},[]);(0,e.useEffect)(()=>{if(d)return;let a=Date.now(),e=c.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(a-c.createdAt);if(d<0){c.visible&&F.dismiss(c.id);return}return setTimeout(()=>F.dismiss(c.id,b),d)});return()=>{e.forEach(a=>a&&clearTimeout(a))}},[c,d,b]);let h=(0,e.useCallback)(B(b),[b]),i=(0,e.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),j=(0,e.useCallback)((a,b)=>{h({type:1,toast:{id:a,height:b}})},[h]),k=(0,e.useCallback)(()=>{d&&h({type:6,time:Date.now()})},[d,h]),l=(0,e.useCallback)((a,b)=>{let{reverseOrder:d=!1,gutter:e=8,defaultPosition:f}=b||{},g=c.filter(b=>(b.position||f)===(a.position||f)&&b.height),h=g.findIndex(b=>b.id===a.id),i=g.filter((a,b)=>b<h&&a.visible).length;return g.filter(a=>a.visible).slice(...d?[i+1]:[0,i]).reduce((a,b)=>a+(b.height||0)+e,0)},[c]);return(0,e.useEffect)(()=>{c.forEach(a=>{if(a.dismissed)g(a.id,a.removeDelay);else{let b=f.get(a.id);b&&(clearTimeout(b),f.delete(a.id))}})},[c,g]),{toasts:c,handlers:{updateHeight:j,startPause:i,endPause:k,calculateOffset:l}}},I=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,J=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${K} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,N=r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,O=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,P=q`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${P} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,R=r("div")`
  position: absolute;
`,S=r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,T=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${T} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?e.createElement(U,null,b):b:"blank"===c?null:e.createElement(S,null,e.createElement(N,{...d}),"loading"!==c&&e.createElement(R,null,"error"===c?e.createElement(L,{...d}):e.createElement(Q,{...d})))},W=r("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,X=r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=e.memo(({toast:a,position:b,style:d,children:f})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${q(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${q(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=e.createElement(V,{toast:a}),i=e.createElement(X,{...a.ariaProps},s(a.message,a));return e.createElement(W,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof f?f({icon:h,message:i}):e.createElement(e.Fragment,null,h,i))});d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0;var Z=({id:a,className:b,style:c,onHeightUpdate:d,children:f})=>{let g=e.useCallback(b=>{if(b){let c=()=>{d(a,b.getBoundingClientRect().height)};c(),new MutationObserver(c).observe(b,{subtree:!0,childList:!0,characterData:!0})}},[a,d]);return e.createElement("div",{ref:g,className:b,style:c},f)},$=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,_=({reverseOrder:a,position:b="top-center",toastOptions:d,gutter:f,children:g,toasterId:h,containerStyle:i,containerClassName:j})=>{let{toasts:k,handlers:l}=H(d,h);return e.createElement("div",{"data-rht-toaster":h||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:j,onMouseEnter:l.startPause,onMouseLeave:l.endPause},k.map(d=>{let h,i,j=d.position||b,k=l.calculateOffset(d,{reverseOrder:a,gutter:f,defaultPosition:b}),m=(h=j.includes("top"),i=j.includes("center")?{justifyContent:"center"}:j.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:c?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${k*(h?1:-1)}px)`,...h?{top:0}:{bottom:0},...i});return e.createElement(Z,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?$:"",style:m},"custom"===d.type?s(d.message,d):g?g(d):e.createElement(Y,{toast:d,position:j}))}))};a.s(["CheckmarkIcon",()=>Q,"ErrorIcon",()=>L,"LoaderIcon",()=>N,"ToastBar",()=>Y,"ToastIcon",()=>V,"Toaster",()=>_,"default",()=>F,"resolveValue",()=>s,"toast",()=>F,"useToaster",()=>H,"useToasterStore",()=>D],6704)},25792,a=>{"use strict";var b=a.i(87924),c=a.i(37927),d=function(){return null},e=a.i(42871),f=a.i(76644),g=a.i(18544),h=a.i(33791),i=class extends h.Subscribable{constructor(a={}){super(),this.config=a,this.#a=new Map}#a;build(a,b,c){let d=b.queryKey,g=b.queryHash??(0,e.hashQueryKeyByOptions)(d,b),h=this.get(g);return h||(h=new f.Query({client:a,queryKey:d,queryHash:g,options:a.defaultQueryOptions(b),state:c,defaultOptions:a.getQueryDefaults(d)}),this.add(h)),h}add(a){this.#a.has(a.queryHash)||(this.#a.set(a.queryHash,a),this.notify({type:"added",query:a}))}remove(a){let b=this.#a.get(a.queryHash);b&&(a.destroy(),b===a&&this.#a.delete(a.queryHash),this.notify({type:"removed",query:a}))}clear(){g.notifyManager.batch(()=>{this.getAll().forEach(a=>{this.remove(a)})})}get(a){return this.#a.get(a)}getAll(){return[...this.#a.values()]}find(a){let b={exact:!0,...a};return this.getAll().find(a=>(0,e.matchQuery)(b,a))}findAll(a={}){let b=this.getAll();return Object.keys(a).length>0?b.filter(b=>(0,e.matchQuery)(a,b)):b}notify(a){g.notifyManager.batch(()=>{this.listeners.forEach(b=>{b(a)})})}onFocus(){g.notifyManager.batch(()=>{this.getAll().forEach(a=>{a.onFocus()})})}onOnline(){g.notifyManager.batch(()=>{this.getAll().forEach(a=>{a.onOnline()})})}},j=a.i(12794),k=h,l=class extends k.Subscribable{constructor(a={}){super(),this.config=a,this.#b=new Set,this.#c=new Map,this.#d=0}#b;#c;#d;build(a,b,c){let d=new j.Mutation({client:a,mutationCache:this,mutationId:++this.#d,options:a.defaultMutationOptions(b),state:c});return this.add(d),d}add(a){this.#b.add(a);let b=m(a);if("string"==typeof b){let c=this.#c.get(b);c?c.push(a):this.#c.set(b,[a])}this.notify({type:"added",mutation:a})}remove(a){if(this.#b.delete(a)){let b=m(a);if("string"==typeof b){let c=this.#c.get(b);if(c)if(c.length>1){let b=c.indexOf(a);-1!==b&&c.splice(b,1)}else c[0]===a&&this.#c.delete(b)}}this.notify({type:"removed",mutation:a})}canRun(a){let b=m(a);if("string"!=typeof b)return!0;{let c=this.#c.get(b),d=c?.find(a=>"pending"===a.state.status);return!d||d===a}}runNext(a){let b=m(a);if("string"!=typeof b)return Promise.resolve();{let c=this.#c.get(b)?.find(b=>b!==a&&b.state.isPaused);return c?.continue()??Promise.resolve()}}clear(){g.notifyManager.batch(()=>{this.#b.forEach(a=>{this.notify({type:"removed",mutation:a})}),this.#b.clear(),this.#c.clear()})}getAll(){return Array.from(this.#b)}find(a){let b={exact:!0,...a};return this.getAll().find(a=>(0,e.matchMutation)(b,a))}findAll(a={}){return this.getAll().filter(b=>(0,e.matchMutation)(a,b))}notify(a){g.notifyManager.batch(()=>{this.listeners.forEach(b=>{b(a)})})}resumePausedMutations(){let a=this.getAll().filter(a=>a.state.isPaused);return g.notifyManager.batch(()=>Promise.all(a.map(a=>a.continue().catch(e.noop))))}};function m(a){return a.options.scope?.id}var n=a.i(99745),o=a.i(12552);function p(a){return{onFetch:(b,c)=>{let d=b.options,f=b.fetchOptions?.meta?.fetchMore?.direction,g=b.state.data?.pages||[],h=b.state.data?.pageParams||[],i={pages:[],pageParams:[]},j=0,k=async()=>{let c=!1,k=(0,e.ensureQueryFn)(b.options,b.fetchOptions),l=async(a,d,f)=>{let g;if(c)return Promise.reject();if(null==d&&a.pages.length)return Promise.resolve(a);let h=(Object.defineProperty(g={client:b.client,queryKey:b.queryKey,pageParam:d,direction:f?"backward":"forward",meta:b.options.meta},"signal",{enumerable:!0,get:()=>(b.signal.aborted?c=!0:b.signal.addEventListener("abort",()=>{c=!0}),b.signal)}),g),i=await k(h),{maxPages:j}=b.options,l=f?e.addToStart:e.addToEnd;return{pages:l(a.pages,i,j),pageParams:l(a.pageParams,d,j)}};if(f&&g.length){let a="backward"===f,b={pages:g,pageParams:h},c=(a?function(a,{pages:b,pageParams:c}){return b.length>0?a.getPreviousPageParam?.(b[0],b,c[0],c):void 0}:q)(d,b);i=await l(b,c,a)}else{let b=a??g.length;do{let a=0===j?h[0]??d.initialPageParam:q(d,i);if(j>0&&null==a)break;i=await l(i,a),j++}while(j<b)}return i};b.options.persister?b.fetchFn=()=>b.options.persister?.(k,{client:b.client,queryKey:b.queryKey,meta:b.options.meta,signal:b.signal},c):b.fetchFn=k}}}function q(a,{pages:b,pageParams:c}){let d=b.length-1;return b.length>0?a.getNextPageParam(b[d],b,c[d],c):void 0}var r=class{#e;#f;#g;#h;#i;#j;#k;#l;constructor(a={}){this.#e=a.queryCache||new i,this.#f=a.mutationCache||new l,this.#g=a.defaultOptions||{},this.#h=new Map,this.#i=new Map,this.#j=0}mount(){this.#j++,1===this.#j&&(this.#k=n.focusManager.subscribe(async a=>{a&&(await this.resumePausedMutations(),this.#e.onFocus())}),this.#l=o.onlineManager.subscribe(async a=>{a&&(await this.resumePausedMutations(),this.#e.onOnline())}))}unmount(){this.#j--,0===this.#j&&(this.#k?.(),this.#k=void 0,this.#l?.(),this.#l=void 0)}isFetching(a){return this.#e.findAll({...a,fetchStatus:"fetching"}).length}isMutating(a){return this.#f.findAll({...a,status:"pending"}).length}getQueryData(a){let b=this.defaultQueryOptions({queryKey:a});return this.#e.get(b.queryHash)?.state.data}ensureQueryData(a){let b=this.defaultQueryOptions(a),c=this.#e.build(this,b),d=c.state.data;return void 0===d?this.fetchQuery(a):(a.revalidateIfStale&&c.isStaleByTime((0,e.resolveStaleTime)(b.staleTime,c))&&this.prefetchQuery(b),Promise.resolve(d))}getQueriesData(a){return this.#e.findAll(a).map(({queryKey:a,state:b})=>[a,b.data])}setQueryData(a,b,c){let d=this.defaultQueryOptions({queryKey:a}),f=this.#e.get(d.queryHash),g=f?.state.data,h=(0,e.functionalUpdate)(b,g);if(void 0!==h)return this.#e.build(this,d).setData(h,{...c,manual:!0})}setQueriesData(a,b,c){return g.notifyManager.batch(()=>this.#e.findAll(a).map(({queryKey:a})=>[a,this.setQueryData(a,b,c)]))}getQueryState(a){let b=this.defaultQueryOptions({queryKey:a});return this.#e.get(b.queryHash)?.state}removeQueries(a){let b=this.#e;g.notifyManager.batch(()=>{b.findAll(a).forEach(a=>{b.remove(a)})})}resetQueries(a,b){let c=this.#e;return g.notifyManager.batch(()=>(c.findAll(a).forEach(a=>{a.reset()}),this.refetchQueries({type:"active",...a},b)))}cancelQueries(a,b={}){let c={revert:!0,...b};return Promise.all(g.notifyManager.batch(()=>this.#e.findAll(a).map(a=>a.cancel(c)))).then(e.noop).catch(e.noop)}invalidateQueries(a,b={}){return g.notifyManager.batch(()=>(this.#e.findAll(a).forEach(a=>{a.invalidate()}),a?.refetchType==="none")?Promise.resolve():this.refetchQueries({...a,type:a?.refetchType??a?.type??"active"},b))}refetchQueries(a,b={}){let c={...b,cancelRefetch:b.cancelRefetch??!0};return Promise.all(g.notifyManager.batch(()=>this.#e.findAll(a).filter(a=>!a.isDisabled()&&!a.isStatic()).map(a=>{let b=a.fetch(void 0,c);return c.throwOnError||(b=b.catch(e.noop)),"paused"===a.state.fetchStatus?Promise.resolve():b}))).then(e.noop)}fetchQuery(a){let b=this.defaultQueryOptions(a);void 0===b.retry&&(b.retry=!1);let c=this.#e.build(this,b);return c.isStaleByTime((0,e.resolveStaleTime)(b.staleTime,c))?c.fetch(b):Promise.resolve(c.state.data)}prefetchQuery(a){return this.fetchQuery(a).then(e.noop).catch(e.noop)}fetchInfiniteQuery(a){return a.behavior=p(a.pages),this.fetchQuery(a)}prefetchInfiniteQuery(a){return this.fetchInfiniteQuery(a).then(e.noop).catch(e.noop)}ensureInfiniteQueryData(a){return a.behavior=p(a.pages),this.ensureQueryData(a)}resumePausedMutations(){return o.onlineManager.isOnline()?this.#f.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#e}getMutationCache(){return this.#f}getDefaultOptions(){return this.#g}setDefaultOptions(a){this.#g=a}setQueryDefaults(a,b){this.#h.set((0,e.hashKey)(a),{queryKey:a,defaultOptions:b})}getQueryDefaults(a){let b=[...this.#h.values()],c={};return b.forEach(b=>{(0,e.partialMatchKey)(a,b.queryKey)&&Object.assign(c,b.defaultOptions)}),c}setMutationDefaults(a,b){this.#i.set((0,e.hashKey)(a),{mutationKey:a,defaultOptions:b})}getMutationDefaults(a){let b=[...this.#i.values()],c={};return b.forEach(b=>{(0,e.partialMatchKey)(a,b.mutationKey)&&Object.assign(c,b.defaultOptions)}),c}defaultQueryOptions(a){if(a._defaulted)return a;let b={...this.#g.queries,...this.getQueryDefaults(a.queryKey),...a,_defaulted:!0};return b.queryHash||(b.queryHash=(0,e.hashQueryKeyByOptions)(b.queryKey,b)),void 0===b.refetchOnReconnect&&(b.refetchOnReconnect="always"!==b.networkMode),void 0===b.throwOnError&&(b.throwOnError=!!b.suspense),!b.networkMode&&b.persister&&(b.networkMode="offlineFirst"),b.queryFn===e.skipToken&&(b.enabled=!1),b}defaultMutationOptions(a){return a?._defaulted?a:{...this.#g.mutations,...a?.mutationKey&&this.getMutationDefaults(a.mutationKey),...a,_defaulted:!0}}clear(){this.#e.clear(),this.#f.clear()}},s=a.i(6704);let t=new r({defaultOptions:{queries:{staleTime:3e5,refetchOnWindowFocus:!1,retry:1},mutations:{onError:a=>{if(a instanceof Error){let b=a.message;b.includes("validation")||s.default.error(b)}}}}});function u({children:a}){return(0,b.jsxs)(c.QueryClientProvider,{client:t,children:[a,(0,b.jsx)(d,{initialIsOpen:!1})]})}a.s(["Providers",()=>u],25792)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__dea7a0c1._.js.map