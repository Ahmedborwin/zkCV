var F,p,v_,m_,E,o_,y_,z,g_,U={},Y=[],N_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,I=Array.isArray;function C(e,_){for(var t in _)e[t]=_[t];return e}function b_(e){var _=e.parentNode;_&&_.removeChild(e)}function G(e,_,t){var n,o,r,u={};for(r in _)r=="key"?n=_[r]:r=="ref"?o=_[r]:u[r]=_[r];if(arguments.length>2&&(u.children=arguments.length>3?F.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)u[r]===void 0&&(u[r]=e.defaultProps[r]);return T(e,u,n,o,null)}function T(e,_,t,n,o){var r={type:e,props:_,key:t,ref:n,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o??++v_,__i:-1,__u:0};return o==null&&p.vnode!=null&&p.vnode(r),r}function U_(){return{current:null}}function A(e){return e.children}function N(e,_){this.props=e,this.context=_}function P(e,_){if(_==null)return e.__?P(e.__,e.__i+1):null;for(var t;_<e.__k.length;_++)if((t=e.__k[_])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?P(e):null}function F_(e,_,t){var n,o=e.__v,r=o.__e,u=e.__P;if(u)return(n=C({},o)).__v=o.__v+1,p.vnode&&p.vnode(n),Z(u,n,o,e.__n,u.ownerSVGElement!==void 0,32&o.__u?[r]:null,_,r??P(o),!!(32&o.__u),t),n.__.__k[n.__i]=n,n.__d=void 0,n.__e!=r&&k_(n),n}function k_(e){var _,t;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,_=0;_<e.__k.length;_++)if((t=e.__k[_])!=null&&t.__e!=null){e.__e=e.__c.base=t.__e;break}return k_(e)}}function J(e){(!e.__d&&(e.__d=!0)&&E.push(e)&&!B.__r++||o_!==p.debounceRendering)&&((o_=p.debounceRendering)||y_)(B)}function B(){var e,_,t,n=[],o=[];for(E.sort(z);e=E.shift();)e.__d&&(t=E.length,_=F_(e,n,o)||_,t===0||E.length>t?(K(n,_,o),o.length=n.length=0,_=void 0,E.sort(z)):_&&p.__c&&p.__c(_,Y));_&&K(n,_,o),B.__r=0}function $_(e,_,t,n,o,r,u,c,s,l,a){var i,d,f,y,$,g=n&&n.__k||Y,v=_.length;for(t.__d=s,A_(t,_,g),s=t.__d,i=0;i<v;i++)(f=t.__k[i])!=null&&typeof f!="boolean"&&typeof f!="function"&&(d=f.__i===-1?U:g[f.__i]||U,f.__i=i,Z(e,f,d,o,r,u,c,s,l,a),y=f.__e,f.ref&&d.ref!=f.ref&&(d.ref&&__(d.ref,null,f),a.push(f.ref,f.__c||y,f)),$==null&&y!=null&&($=y),65536&f.__u||d.__k===f.__k?s=C_(f,s,e):typeof f.type=="function"&&f.__d!==void 0?s=f.__d:y&&(s=y.nextSibling),f.__d=void 0,f.__u&=-196609);t.__d=s,t.__e=$}function A_(e,_,t){var n,o,r,u,c,s=_.length,l=t.length,a=l,i=0;for(e.__k=[],n=0;n<s;n++)(o=e.__k[n]=(o=_[n])==null||typeof o=="boolean"||typeof o=="function"?null:typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?T(null,o,null,null,o):I(o)?T(A,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?T(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o)!=null?(o.__=e,o.__b=e.__b+1,c=V_(o,t,u=n+i,a),o.__i=c,r=null,c!==-1&&(a--,(r=t[c])&&(r.__u|=131072)),r==null||r.__v===null?(c==-1&&i--,typeof o.type!="function"&&(o.__u|=65536)):c!==u&&(c===u+1?i++:c>u?a>s-u?i+=c-u:i--:i=c<u&&c==u-1?c-u:0,c!==n+i&&(o.__u|=65536))):(r=t[n])&&r.key==null&&r.__e&&(r.__e==e.__d&&(e.__d=P(r)),Q(r,r,!1),t[n]=null,a--);if(a)for(n=0;n<l;n++)(r=t[n])!=null&&(131072&r.__u)==0&&(r.__e==e.__d&&(e.__d=P(r)),Q(r,r))}function C_(e,_,t){var n,o;if(typeof e.type=="function"){for(n=e.__k,o=0;n&&o<n.length;o++)n[o]&&(n[o].__=e,_=C_(n[o],_,t));return _}e.__e!=_&&(t.insertBefore(e.__e,_||null),_=e.__e);do _=_&&_.nextSibling;while(_!=null&&_.nodeType===8);return _}function x_(e,_){return _=_||[],e==null||typeof e=="boolean"||(I(e)?e.some(function(t){x_(t,_)}):_.push(e)),_}function V_(e,_,t,n){var o=e.key,r=e.type,u=t-1,c=t+1,s=_[t];if(s===null||s&&o==s.key&&r===s.type)return t;if(n>(s!=null&&(131072&s.__u)==0?1:0))for(;u>=0||c<_.length;){if(u>=0){if((s=_[u])&&(131072&s.__u)==0&&o==s.key&&r===s.type)return u;u--}if(c<_.length){if((s=_[c])&&(131072&s.__u)==0&&o==s.key&&r===s.type)return c;c++}}return-1}function r_(e,_,t){_[0]==="-"?e.setProperty(_,t??""):e[_]=t==null?"":typeof t!="number"||N_.test(_)?t:t+"px"}function L(e,_,t,n,o){var r;_:if(_==="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(_ in n)t&&_ in t||r_(e.style,_,"");if(t)for(_ in t)n&&t[_]===n[_]||r_(e.style,_,t[_])}else if(_[0]==="o"&&_[1]==="n")r=_!==(_=_.replace(/(PointerCapture)$|Capture$/i,"$1")),_=_.toLowerCase()in e?_.toLowerCase().slice(2):_.slice(2),e.l||(e.l={}),e.l[_+r]=t,t?n?t.u=n.u:(t.u=Date.now(),e.addEventListener(_,r?u_:i_,r)):e.removeEventListener(_,r?u_:i_,r);else{if(o)_=_.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(_!=="width"&&_!=="height"&&_!=="href"&&_!=="list"&&_!=="form"&&_!=="tabIndex"&&_!=="download"&&_!=="rowSpan"&&_!=="colSpan"&&_!=="role"&&_ in e)try{e[_]=t??"";break _}catch{}typeof t=="function"||(t==null||t===!1&&_[4]!=="-"?e.removeAttribute(_):e.setAttribute(_,t))}}function i_(e){if(this.l){var _=this.l[e.type+!1];if(e.t){if(e.t<=_.u)return}else e.t=Date.now();return _(p.event?p.event(e):e)}}function u_(e){if(this.l)return this.l[e.type+!0](p.event?p.event(e):e)}function Z(e,_,t,n,o,r,u,c,s,l){var a,i,d,f,y,$,g,v,b,H,V,D,n_,M,R,k=_.type;if(_.constructor!==void 0)return null;128&t.__u&&(s=!!(32&t.__u),r=[c=_.__e=t.__e]),(a=p.__b)&&a(_);_:if(typeof k=="function")try{if(v=_.props,b=(a=k.contextType)&&n[a.__c],H=a?b?b.props.value:a.__:n,t.__c?g=(i=_.__c=t.__c).__=i.__E:("prototype"in k&&k.prototype.render?_.__c=i=new k(v,H):(_.__c=i=new N(v,H),i.constructor=k,i.render=W_),b&&b.sub(i),i.props=v,i.state||(i.state={}),i.context=H,i.__n=n,d=i.__d=!0,i.__h=[],i._sb=[]),i.__s==null&&(i.__s=i.state),k.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=C({},i.__s)),C(i.__s,k.getDerivedStateFromProps(v,i.__s))),f=i.props,y=i.state,i.__v=_,d)k.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(k.getDerivedStateFromProps==null&&v!==f&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(v,H),!i.__e&&(i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(v,i.__s,H)===!1||_.__v===t.__v)){for(_.__v!==t.__v&&(i.props=v,i.state=i.__s,i.__d=!1),_.__e=t.__e,_.__k=t.__k,_.__k.forEach(function(W){W&&(W.__=_)}),V=0;V<i._sb.length;V++)i.__h.push(i._sb[V]);i._sb=[],i.__h.length&&u.push(i);break _}i.componentWillUpdate!=null&&i.componentWillUpdate(v,i.__s,H),i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(f,y,$)})}if(i.context=H,i.props=v,i.__P=e,i.__e=!1,D=p.__r,n_=0,"prototype"in k&&k.prototype.render){for(i.state=i.__s,i.__d=!1,D&&D(_),a=i.render(i.props,i.state,i.context),M=0;M<i._sb.length;M++)i.__h.push(i._sb[M]);i._sb=[]}else do i.__d=!1,D&&D(_),a=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++n_<25);i.state=i.__s,i.getChildContext!=null&&(n=C(C({},n),i.getChildContext())),d||i.getSnapshotBeforeUpdate==null||($=i.getSnapshotBeforeUpdate(f,y)),$_(e,I(R=a!=null&&a.type===A&&a.key==null?a.props.children:a)?R:[R],_,t,n,o,r,u,c,s,l),i.base=_.__e,_.__u&=-161,i.__h.length&&u.push(i),g&&(i.__E=i.__=null)}catch(W){_.__v=null,s||r!=null?(_.__e=c,_.__u|=s?160:32,r[r.indexOf(c)]=null):(_.__e=t.__e,_.__k=t.__k),p.__e(W,_,t)}else r==null&&_.__v===t.__v?(_.__k=t.__k,_.__e=t.__e):_.__e=M_(t.__e,_,t,n,o,r,u,s,l);(a=p.diffed)&&a(_)}function K(e,_,t){for(var n=0;n<t.length;n++)__(t[n],t[++n],t[++n]);p.__c&&p.__c(_,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(r){r.call(o)})}catch(r){p.__e(r,o.__v)}})}function M_(e,_,t,n,o,r,u,c,s){var l,a,i,d,f,y,$,g=t.props,v=_.props,b=_.type;if(b==="svg"&&(o=!0),r!=null){for(l=0;l<r.length;l++)if((f=r[l])&&"setAttribute"in f==!!b&&(b?f.localName===b:f.nodeType===3)){e=f,r[l]=null;break}}if(e==null){if(b===null)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",b):document.createElement(b,v.is&&v),r=null,c=!1}if(b===null)g===v||c&&e.data===v||(e.data=v);else{if(r=r&&F.call(e.childNodes),g=t.props||U,!c&&r!=null)for(g={},l=0;l<e.attributes.length;l++)g[(f=e.attributes[l]).name]=f.value;for(l in g)f=g[l],l=="children"||(l=="dangerouslySetInnerHTML"?i=f:l==="key"||l in v||L(e,l,null,f,o));for(l in v)f=v[l],l=="children"?d=f:l=="dangerouslySetInnerHTML"?a=f:l=="value"?y=f:l=="checked"?$=f:l==="key"||c&&typeof f!="function"||g[l]===f||L(e,l,f,g[l],o);if(a)c||i&&(a.__html===i.__html||a.__html===e.innerHTML)||(e.innerHTML=a.__html),_.__k=[];else if(i&&(e.innerHTML=""),$_(e,I(d)?d:[d],_,t,n,o&&b!=="foreignObject",r,u,r?r[0]:t.__k&&P(t,0),c,s),r!=null)for(l=r.length;l--;)r[l]!=null&&b_(r[l]);c||(l="value",y!==void 0&&(y!==e[l]||b==="progress"&&!y||b==="option"&&y!==g[l])&&L(e,l,y,g[l],!1),l="checked",$!==void 0&&$!==e[l]&&L(e,l,$,g[l],!1))}return e}function __(e,_,t){try{typeof e=="function"?e(_):e.current=_}catch(n){p.__e(n,t)}}function Q(e,_,t){var n,o;if(p.unmount&&p.unmount(e),(n=e.ref)&&(n.current&&n.current!==e.__e||__(n,null,_)),(n=e.__c)!=null){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(r){p.__e(r,_)}n.base=n.__P=null,e.__c=void 0}if(n=e.__k)for(o=0;o<n.length;o++)n[o]&&Q(n[o],_,t||typeof e.type!="function");t||e.__e==null||b_(e.__e),e.__=e.__e=e.__d=void 0}function W_(e,_,t){return this.constructor(e,t)}function H_(e,_,t){var n,o,r,u;p.__&&p.__(e,_),o=(n=typeof t=="function")?null:t&&t.__k||_.__k,r=[],u=[],Z(_,e=(!n&&t||_).__k=G(A,null,[e]),o||U,U,_.ownerSVGElement!==void 0,!n&&t?[t]:o?null:_.firstChild?F.call(_.childNodes):null,r,!n&&t?t:o?o.__e:_.firstChild,n,u),e.__d=void 0,K(r,e,u)}function E_(e,_){H_(e,_,E_)}function L_(e,_,t){var n,o,r,u,c=C({},e.props);for(r in e.type&&e.type.defaultProps&&(u=e.type.defaultProps),_)r=="key"?n=_[r]:r=="ref"?o=_[r]:c[r]=_[r]===void 0&&u!==void 0?u[r]:_[r];return arguments.length>2&&(c.children=arguments.length>3?F.call(arguments,2):t),T(e.type,c,n||e.key,o||e.ref,null)}function O_(e,_){var t={__c:_="__cC"+g_++,__:e,Consumer:function(n,o){return n.children(o)},Provider:function(n){var o,r;return this.getChildContext||(o=[],(r={})[_]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(u){this.props.value!==u.value&&o.some(function(c){c.__e=!0,J(c)})},this.sub=function(u){o.push(u);var c=u.componentWillUnmount;u.componentWillUnmount=function(){o.splice(o.indexOf(u),1),c&&c.call(u)}}),n.children}};return t.Provider.__=t.Consumer.contextType=t}F=Y.slice,p={__e:function(e,_,t,n){for(var o,r,u;_=_.__;)if((o=_.__c)&&!o.__)try{if((r=o.constructor)&&r.getDerivedStateFromError!=null&&(o.setState(r.getDerivedStateFromError(e)),u=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,n||{}),u=o.__d),u)return o.__E=o}catch(c){e=c}throw e}},v_=0,m_=function(e){return e!=null&&e.constructor==null},N.prototype.setState=function(e,_){var t;t=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=C({},this.state),typeof e=="function"&&(e=e(C({},t),this.props)),e&&C(t,e),e!=null&&this.__v&&(_&&this._sb.push(_),J(this))},N.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),J(this))},N.prototype.render=A,E=[],y_=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,z=function(e,_){return e.__v.__b-_.__v.__b},B.__r=0,g_=0;const X_=Object.freeze(Object.defineProperty({__proto__:null,Component:N,Fragment:A,cloneElement:L_,createContext:O_,createElement:G,createRef:U_,h:G,hydrate:E_,get isValidElement(){return m_},get options(){return p},render:H_,toChildArray:x_},Symbol.toStringTag,{value:"Module"}));var x,h,q,l_,w=0,S_=[],O=[],m=p,c_=m.__b,f_=m.__r,s_=m.diffed,a_=m.__c,p_=m.unmount,h_=m.__;function S(e,_){m.__h&&m.__h(h,e,w||_),w=0;var t=h.__H||(h.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({__V:O}),t.__[e]}function P_(e){return w=1,w_(T_,e)}function w_(e,_,t){var n=S(x++,2);if(n.t=e,!n.__c&&(n.__=[t?t(_):T_(void 0,_),function(c){var s=n.__N?n.__N[0]:n.__[0],l=n.t(s,c);s!==l&&(n.__N=[l,n.__[1]],n.__c.setState({}))}],n.__c=h,!h.u)){var o=function(c,s,l){if(!n.__c.__H)return!0;var a=n.__c.__H.__.filter(function(d){return!!d.__c});if(a.every(function(d){return!d.__N}))return!r||r.call(this,c,s,l);var i=!1;return a.forEach(function(d){if(d.__N){var f=d.__[0];d.__=d.__N,d.__N=void 0,f!==d.__[0]&&(i=!0)}}),!(!i&&n.__c.props===c)&&(!r||r.call(this,c,s,l))};h.u=!0;var r=h.shouldComponentUpdate,u=h.componentWillUpdate;h.componentWillUpdate=function(c,s,l){if(this.__e){var a=r;r=void 0,o(c,s,l),r=a}u&&u.call(this,c,s,l)},h.shouldComponentUpdate=o}return n.__N||n.__}function j_(e,_){var t=S(x++,3);!m.__s&&t_(t.__H,_)&&(t.__=e,t.i=_,h.__H.__h.push(t))}function D_(e,_){var t=S(x++,4);!m.__s&&t_(t.__H,_)&&(t.__=e,t.i=_,h.__h.push(t))}function B_(e){return w=5,e_(function(){return{current:e}},[])}function I_(e,_,t){w=6,D_(function(){return typeof e=="function"?(e(_()),function(){return e(null)}):e?(e.current=_(),function(){return e.current=null}):void 0},t==null?t:t.concat(e))}function e_(e,_){var t=S(x++,7);return t_(t.__H,_)?(t.__V=e(),t.i=_,t.__h=e,t.__V):t.__}function R_(e,_){return w=8,e_(function(){return e},_)}function q_(e){var _=h.context[e.__c],t=S(x++,9);return t.c=e,_?(t.__==null&&(t.__=!0,_.sub(h)),_.props.value):e.__}function z_(e,_){m.useDebugValue&&m.useDebugValue(_?_(e):e)}function G_(e){var _=S(x++,10),t=P_();return _.__=e,h.componentDidCatch||(h.componentDidCatch=function(n,o){_.__&&_.__(n,o),t[1](n)}),[t[0],function(){t[1](void 0)}]}function J_(){var e=S(x++,11);if(!e.__){for(var _=h.__v;_!==null&&!_.__m&&_.__!==null;)_=_.__;var t=_.__m||(_.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function K_(){for(var e;e=S_.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(j),e.__H.__h.forEach(X),e.__H.__h=[]}catch(_){e.__H.__h=[],m.__e(_,e.__v)}}m.__b=function(e){h=null,c_&&c_(e)},m.__=function(e,_){_.__k&&_.__k.__m&&(e.__m=_.__k.__m),h_&&h_(e,_)},m.__r=function(e){f_&&f_(e),x=0;var _=(h=e.__c).__H;_&&(q===h?(_.__h=[],h.__h=[],_.__.forEach(function(t){t.__N&&(t.__=t.__N),t.__V=O,t.__N=t.i=void 0})):(_.__h.forEach(j),_.__h.forEach(X),_.__h=[],x=0)),q=h},m.diffed=function(e){s_&&s_(e);var _=e.__c;_&&_.__H&&(_.__H.__h.length&&(S_.push(_)!==1&&l_===m.requestAnimationFrame||((l_=m.requestAnimationFrame)||Q_)(K_)),_.__H.__.forEach(function(t){t.i&&(t.__H=t.i),t.__V!==O&&(t.__=t.__V),t.i=void 0,t.__V=O})),q=h=null},m.__c=function(e,_){_.some(function(t){try{t.__h.forEach(j),t.__h=t.__h.filter(function(n){return!n.__||X(n)})}catch(n){_.some(function(o){o.__h&&(o.__h=[])}),_=[],m.__e(n,t.__v)}}),a_&&a_(e,_)},m.unmount=function(e){p_&&p_(e);var _,t=e.__c;t&&t.__H&&(t.__H.__.forEach(function(n){try{j(n)}catch(o){_=o}}),t.__H=void 0,_&&m.__e(_,t.__v))};var d_=typeof requestAnimationFrame=="function";function Q_(e){var _,t=function(){clearTimeout(n),d_&&cancelAnimationFrame(_),setTimeout(e)},n=setTimeout(t,100);d_&&(_=requestAnimationFrame(t))}function j(e){var _=h,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),h=_}function X(e){var _=h;e.__c=e.__(),h=_}function t_(e,_){return!e||e.length!==_.length||_.some(function(t,n){return t!==e[n]})}function T_(e,_){return typeof _=="function"?_(e):_}const Y_=Object.freeze(Object.defineProperty({__proto__:null,useCallback:R_,useContext:q_,useDebugValue:z_,useEffect:j_,useErrorBoundary:G_,useId:J_,useImperativeHandle:I_,useLayoutEffect:D_,useMemo:e_,useReducer:w_,useRef:B_,useState:P_},Symbol.toStringTag,{value:"Module"}));export{D_ as A,H_ as B,E_ as E,L_ as F,O_ as G,x_ as H,q_ as P,I_ as T,z_ as V,j_ as _,P_ as a,N as b,J_ as c,w_ as d,B_ as e,U_ as f,A as g,Y_ as h,G_ as i,p as l,X_ as p,e_ as q,R_ as x,G as y};