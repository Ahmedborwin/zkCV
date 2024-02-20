import{aX as l,aY as b,aZ as w,a_ as p,a$ as h,b0 as g,b1 as k,b2 as O,b3 as L,b4 as m,b5 as E}from"./index.c4c19996.js";class x extends l{constructor({callbackSelector:e,cause:a,data:o,extraData:c,sender:i,urls:s}){super(a.shortMessage||"An error occurred while fetching for an offchain result.",{cause:a,metaMessages:[...a.metaMessages||[],a.metaMessages?.length?"":[],"Offchain Gateway Call:",s&&["  Gateway URL(s):",...s.map(d=>`    ${b(d)}`)],`  Sender: ${i}`,`  Data: ${o}`,`  Callback selector: ${e}`,`  Extra data: ${c}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class M extends l{constructor({result:e,url:a}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${b(a)}`,`Response: ${w(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class $ extends l{constructor({sender:e,to:a}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${a}`,`OffchainLookup sender address: ${e}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}function R(r,e){if(!p(r))throw new h({address:r});if(!p(e))throw new h({address:e});return r.toLowerCase()===e.toLowerCase()}const C="0x556f1830",S={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function P(r,{blockNumber:e,blockTag:a,data:o,to:c}){const{args:i}=g({data:o,abi:[S]}),[s,d,t,n,f]=i;try{if(!R(c,s))throw new $({sender:s,to:c});const u=await A({data:t,sender:s,urls:d}),{data:y}=await k(r,{blockNumber:e,blockTag:a,data:O([n,L([{type:"bytes"},{type:"bytes"}],[u,f])]),to:c});return y}catch(u){throw new x({callbackSelector:n,cause:u,data:o,extraData:f,sender:s,urls:d})}}async function A({data:r,sender:e,urls:a}){let o=new Error("An unknown error occurred.");for(let c=0;c<a.length;c++){const i=a[c],s=i.includes("{data}")?"GET":"POST",d=s==="POST"?{data:r,sender:e}:void 0;try{const t=await fetch(i.replace("{sender}",e).replace("{data}",r),{body:JSON.stringify(d),method:s});let n;if(t.headers.get("Content-Type")?.startsWith("application/json")?n=(await t.json()).data:n=await t.text(),!t.ok){o=new m({body:d,details:n?.error?w(n.error):t.statusText,headers:t.headers,status:t.status,url:i});continue}if(!E(n)){o=new M({result:n,url:i});continue}return n}catch(t){o=new m({body:d,details:t.message,url:i})}}throw o}export{A as ccipFetch,P as offchainLookup,S as offchainLookupAbiItem,C as offchainLookupSignature};