import{o as ne,r as P}from"./index.BmT1C2LM.js";var rt={exports:{}},$e={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var It;function Nr(){if(It)return $e;It=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function r(n,o,a){var s=null;if(a!==void 0&&(s=""+a),o.key!==void 0&&(s=""+o.key),"key"in o){a={};for(var c in o)c!=="key"&&(a[c]=o[c])}else a=o;return o=a.ref,{$$typeof:e,type:n,key:s,ref:o!==void 0?o:null,props:a}}return $e.Fragment=t,$e.jsx=r,$e.jsxs=r,$e}var Pt;function Dr(){return Pt||(Pt=1,rt.exports=Nr()),rt.exports}var i=Dr();const zr={bpm:138,bassLine:"c2 c2 eb2 g1",arpLine:"c4 eb4 g4 bb4",chordStr:"[c4 eb4 g4 bb4] [ab3 c4 eb4 g4] [eb4 g4 bb4 d5] [bb3 d4 f4 ab4]",leadLine:"g4 ~ bb4 ~ eb5 ~ d5 ~"},_t=[{id:"build-up",name:"Build Up",description:"Drums and bass only — a clean starting point.",enabledLayers:["kick","closed-hats","clap","sub-bass"]},{id:"deep-focus",name:"Deep Focus",description:"Minimal and hypnotic. Good for long coding sessions.",enabledLayers:["kick","closed-hats","sub-bass","pad"]},{id:"night-trance",name:"Night Trance",description:"Full arrangement with arp, pad, ghost lead, and atmosphere.",enabledLayers:["kick","closed-hats","open-hats","clap","sub-bass","trance-arp","pad","ghost-lead","noise-swell"]}],lr=[{id:"kick",name:"Kick Foundation",category:"drums",order:0,enabled:!1,muted:!1,description:"Steady 4-on-the-floor kick. The rhythmic anchor.",params:{gain:1.05,pattern:"bd*4"},paramDefs:[{key:"gain",label:"Gain",type:"range",min:.5,max:1.5,step:.01},{key:"pattern",label:"Pattern",type:"text"}],code:({gain:e,pattern:t})=>`sound("${t}")
  .gain(${e})`},{id:"closed-hats",name:"Closed Hats Drive",category:"drums",order:1,enabled:!1,muted:!1,description:"Hi-hat grid. Density from 4 to 16 hits per cycle.",params:{gain:.18,density:8,hpf:9e3},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.5,step:.01},{key:"density",label:"Density",type:"range",min:4,max:16,step:4},{key:"hpf",label:"HPF (Hz)",type:"range",min:5e3,max:14e3,step:100}],code:({gain:e,density:t,hpf:r})=>`sound("hh*${t}")
  .gain(${e})
  .hpf(${r})`},{id:"open-hats",name:"Open Hats Lift",category:"drums",order:2,enabled:!1,muted:!1,description:"Sparse open hats on offbeats. Lifts the groove without cluttering.",params:{gain:.08,hpf:8500},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.3,step:.01},{key:"hpf",label:"HPF (Hz)",type:"range",min:5e3,max:14e3,step:100}],code:({gain:e,hpf:t})=>`sound("~ ~ oh ~ ~ ~ oh ~")
  .gain(${e})
  .hpf(${t})`},{id:"clap",name:"Clap Groove",category:"drums",order:3,enabled:!1,muted:!1,description:"2-and-4 clap backbeat with subtle room.",params:{gain:.14,room:.12},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.4,step:.01},{key:"room",label:"Room",type:"range",min:0,max:.5,step:.01}],code:({gain:e,room:t})=>`sound("~ cp ~ cp")
  .gain(${e})
  .room(${t})`},{id:"rumble",name:"Rumble Pulse",category:"drums",order:4,enabled:!1,muted:!1,description:"Sub-range industrial texture. Slow LPF movement adds depth.",params:{gain:.1,lpfMin:90,lpfMax:220,room:.3},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.3,step:.01},{key:"lpfMin",label:"LPF Min",type:"range",min:60,max:300,step:5},{key:"lpfMax",label:"LPF Max",type:"range",min:100,max:500,step:5},{key:"room",label:"Room",type:"range",min:0,max:.6,step:.01}],code:({gain:e,lpfMin:t,lpfMax:r,room:n})=>`sound("<bd ~ ~ ~>*2")
  .slow(4)
  .lpf(sine.range(${t}, ${r}).slow(18))
  .gain(${e})
  .room(${n})`},{id:"sub-bass",name:"Sub Bass Pulse",category:"bass",order:5,enabled:!1,muted:!1,description:"Sawtooth sub following the chord root. Slow filter breath.",params:{gain:.5,slow:2,lpfMin:180,lpfMax:800,lpfSpeed:16},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:1,step:.01},{key:"slow",label:"Slow",type:"range",min:1,max:4,step:.5},{key:"lpfMin",label:"LPF Min",type:"range",min:80,max:400,step:10},{key:"lpfMax",label:"LPF Max",type:"range",min:300,max:1400,step:10},{key:"lpfSpeed",label:"LPF Speed",type:"range",min:4,max:32,step:1}],code:({gain:e,slow:t,lpfMin:r,lpfMax:n,lpfSpeed:o},a)=>`note("<${a.bassLine}>")
  .sound("sawtooth")
  .slow(${t})
  .lpf(sine.range(${r}, ${n}).slow(${o}))
  .gain(${e})
  .orbit(1)`},{id:"trance-arp",name:"Trance Arp",category:"melody",order:6,enabled:!1,muted:!1,description:"Triangle arp cycling the chord tones. Light delay, hypnotic pulse.",params:{gain:.14,fast:2,delay:.2},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.4,step:.01},{key:"fast",label:"Speed",type:"range",min:1,max:4,step:.5},{key:"delay",label:"Delay",type:"range",min:0,max:.5,step:.01}],code:({gain:e,fast:t,delay:r},n)=>`note("<${n.arpLine}>")
  .sound("triangle")
  .fast(${t})
  .delay(${r})
  .gain(${e})
  .orbit(3)`},{id:"pad",name:"Minor Pad Wash",category:"harmony",order:7,enabled:!1,muted:!1,description:"Supersaw chord wash cycling through the progression. Very slow movement.",params:{gain:.18,slow:8,lpfMin:700,lpfMax:3e3,room:.35,delay:.25},paramDefs:[{key:"gain",label:"Gain",type:"range",min:0,max:.5,step:.01},{key:"slow",label:"Slow",type:"range",min:2,max:16,step:1},{key:"lpfMin",label:"LPF Min",type:"range",min:200,max:1400,step:50},{key:"lpfMax",label:"LPF Max",type:"range",min:1e3,max:5e3,step:50},{key:"room",label:"Room",type:"range",min:0,max:.8,step:.01},{key:"delay",label:"Delay",type:"range",min:0,max:.5,step:.01}],code:({gain:e,slow:t,lpfMin:r,lpfMax:n,room:o,delay:a},s)=>`note("<${s.chordStr}>")
  .sound("supersaw")
  .slow(${t})
  .lpf(sine.range(${r}, ${n}).slow(24))
  .room(${o})
  .delay(${a})
  .gain(${e})
  .orbit(2)`},{id:"ghost-lead",name:"Ghost Lead",category:"melody",order:8,enabled:!1,muted:!1,description:"Triangle shimmer that slowly fades in and out. Never takes over.",params:{gainMax:.12,gainSpeed:22,room:.45,delay:.33},paramDefs:[{key:"gainMax",label:"Peak Gain",type:"range",min:0,max:.3,step:.01},{key:"gainSpeed",label:"Fade Speed",type:"range",min:8,max:32,step:1},{key:"room",label:"Room",type:"range",min:0,max:.8,step:.01},{key:"delay",label:"Delay",type:"range",min:0,max:.6,step:.01}],code:({gainMax:e,gainSpeed:t,room:r,delay:n},o)=>`note("<${o.leadLine}>")
  .sound("triangle")
  .slow(4)
  .gain(sine.range(0, ${e}).slow(${t}))
  .room(${r})
  .delay(${n})
  .orbit(3)`},{id:"noise-swell",name:"Noise Swell",category:"fx",order:9,enabled:!1,muted:!1,description:"Filtered noise with slowly evolving HPF. Adds air and atmosphere.",params:{gainMax:.04,hpfMin:2500,hpfMax:9500},paramDefs:[{key:"gainMax",label:"Peak Gain",type:"range",min:0,max:.15,step:.005},{key:"hpfMin",label:"HPF Min",type:"range",min:500,max:5e3,step:100},{key:"hpfMax",label:"HPF Max",type:"range",min:4e3,max:14e3,step:100}],code:({gainMax:e,hpfMin:t,hpfMax:r})=>`sound("noise*8")
  .slow(8)
  .hpf(sine.range(${t}, ${r}).slow(24))
  .gain(sine.range(0, ${e}).slow(20))
  .orbit(3)`}];function Or(e,t,{soloId:r=null}={}){let n;if(r?n=e.filter(c=>c.id===r&&c.enabled):n=e.filter(c=>c.enabled&&!c.muted),n=[...n].sort((c,d)=>c.order-d.order),n.length===0)return{display:"// No active layers — enable some layers to generate code.",stack:null};const a=`stack(
${n.map(c=>{const g=(typeof c.code=="function"?c.code(c.params,t):c.code).split(`
`).map(b=>`  ${b}`).join(`
`);return`  // ${c.name}
${g}`}).join(`,

`)}
)`;return{display:`setcps(${t.bpm}/60)

${a}`,stack:a}}const nt="https://unpkg.com/@strudel/web@1.3.0";let Te=null,oe=null,dt=null;async function ot(){return Te||(Te=(async()=>{window.__chillMusicStrudelScriptLoaded||(await new Promise((t,r)=>{if(document.querySelector(`script[data-strudel-src="${nt}"]`)){t();return}const o=document.createElement("script");o.src=nt,o.async=!0,o.dataset.strudelSrc=nt,o.onload=()=>t(),o.onerror=()=>r(new Error("Unable to load Strudel from the CDN.")),document.head.appendChild(o)}),window.__chillMusicStrudelScriptLoaded=!0);const e=window.strudel;if(!e)throw new Error("Strudel bundle loaded but `window.strudel` was not found.");if(oe=e,!window.__chillMusicStrudelReady){if(typeof e.initStrudel!="function"||typeof e.samples!="function")throw new Error("Strudel globals were not initialised correctly.");dt=await e.initStrudel({prebake:()=>e.samples("github:tidalcycles/dirt-samples")}),window.__chillMusicStrudelReady=!0}})().catch(e=>{throw Te=null,e})),await Te,oe}function Mt(e){if(!oe?.getSuperdoughAudioController)return;const t=oe.getSuperdoughAudioController();t?.output?.destinationGain?.gain&&(t.output.destinationGain.gain.value=e)}function De(){window.__chillMusicStrudelReady&&oe?.hush&&oe.hush()}function Fr(e,t){if(!oe)throw new Error("Strudel is not ready.");if(De(),typeof dt?.setCps=="function")dt.setCps(t/60);else{const r=oe.setcps??window.setcps;typeof r=="function"&&r(t/60)}new Function("strudel",`with (strudel) { (${e}).play() }`)(oe)}var G=function(){return G=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},G.apply(this,arguments)};function be(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,a;n<o;n++)(a||!(n in t))&&(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))}var Gr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},M="-ms-",Ae="-moz-",E="-webkit-",dr="comm",Ue="rule",wt="decl",Br="@import",Hr="@namespace",ur="@keyframes",Wr="@layer",pr=Math.abs,vt=String.fromCharCode,ut=Object.assign;function Yr(e,t){return O(e,0)^45?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}function fr(e){return e.trim()}function te(e,t){return(e=t.exec(e))?e[0]:e}function S(e,t,r){return e.replace(t,r)}function ze(e,t,r){return e.indexOf(t,r)}function O(e,t){return e.charCodeAt(t)|0}function he(e,t,r){return e.slice(t,r)}function V(e){return e.length}function hr(e){return e.length}function je(e,t){return t.push(e),e}function Zr(e,t){return e.map(t).join("")}function Lt(e,t){return e.filter(function(r){return!te(r,t)})}var qe=1,xe=1,mr=0,U=0,z=0,ke="";function Je(e,t,r,n,o,a,s,c){return{value:e,root:t,parent:r,type:n,props:o,children:a,line:qe,column:xe,length:s,return:"",siblings:c}}function ie(e,t){return ut(Je("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ye(e){for(;e.root;)e=ie(e.root,{children:[e]});je(e,e.siblings)}function Ur(){return z}function qr(){return z=U>0?O(ke,--U):0,xe--,z===10&&(xe=1,qe--),z}function X(){return z=U<mr?O(ke,U++):0,xe++,z===10&&(xe=1,qe++),z}function ce(){return O(ke,U)}function Oe(){return U}function Ve(e,t){return he(ke,e,t)}function Ie(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Jr(e){return qe=xe=1,mr=V(ke=e),U=0,[]}function Vr(e){return ke="",e}function at(e){return fr(Ve(U-1,pt(e===91?e+2:e===40?e+1:e)))}function Xr(e){for(;(z=ce())&&z<33;)X();return Ie(e)>2||Ie(z)>3?"":" "}function Qr(e,t){for(;--t&&X()&&!(z<48||z>102||z>57&&z<65||z>70&&z<97););return Ve(e,Oe()+(t<6&&ce()==32&&X()==32))}function pt(e){for(;X();)switch(z){case e:return U;case 34:case 39:e!==34&&e!==39&&pt(z);break;case 40:e===41&&pt(e);break;case 92:X();break}return U}function Kr(e,t){for(;X()&&e+z!==57;)if(e+z===84&&ce()===47)break;return"/*"+Ve(t,U-1)+"*"+vt(e===47?e:X())}function en(e){for(;!Ie(ce());)X();return Ve(e,U)}function tn(e){return Vr(Fe("",null,null,null,[""],e=Jr(e),0,[0],e))}function Fe(e,t,r,n,o,a,s,c,d){for(var g=0,b=0,x=s,_=0,C=0,y=0,m=1,k=1,$=1,I=0,R="",p=o,j=a,v=n,u=R;k;)switch(y=I,I=X()){case 40:if(y!=108&&O(u,x-1)==58){ze(u+=S(at(I),"&","&\f"),"&\f",pr(g?c[g-1]:0))!=-1&&($=-1);break}case 34:case 39:case 91:u+=at(I);break;case 9:case 10:case 13:case 32:u+=Xr(y);break;case 92:u+=Qr(Oe()-1,7);continue;case 47:switch(ce()){case 42:case 47:je(rn(Kr(X(),Oe()),t,r,d),d),(Ie(y||1)==5||Ie(ce()||1)==5)&&V(u)&&he(u,-1,void 0)!==" "&&(u+=" ");break;default:u+="/"}break;case 123*m:c[g++]=V(u)*$;case 125*m:case 59:case 0:switch(I){case 0:case 125:k=0;case 59+b:$==-1&&(u=S(u,/\f/g,"")),C>0&&(V(u)-x||m===0&&y===47)&&je(C>32?Nt(u+";",n,r,x-1,d):Nt(S(u," ","")+";",n,r,x-2,d),d);break;case 59:u+=";";default:if(je(v=Tt(u,t,r,g,b,o,c,R,p=[],j=[],x,a),a),I===123)if(b===0)Fe(u,t,v,v,p,a,x,c,j);else{switch(_){case 99:if(O(u,3)===110)break;case 108:if(O(u,2)===97)break;default:b=0;case 100:case 109:case 115:}b?Fe(e,v,v,n&&je(Tt(e,v,v,0,0,o,c,R,o,p=[],x,j),j),o,j,x,c,n?p:j):Fe(u,v,v,v,[""],j,0,c,j)}}g=b=C=0,m=$=1,R=u="",x=s;break;case 58:x=1+V(u),C=y;default:if(m<1){if(I==123)--m;else if(I==125&&m++==0&&qr()==125)continue}switch(u+=vt(I),I*m){case 38:$=b>0?1:(u+="\f",-1);break;case 44:c[g++]=(V(u)-1)*$,$=1;break;case 64:ce()===45&&(u+=at(X())),_=ce(),b=x=V(R=u+=en(Oe())),I++;break;case 45:y===45&&V(u)==2&&(m=0)}}return a}function Tt(e,t,r,n,o,a,s,c,d,g,b,x){for(var _=o-1,C=o===0?a:[""],y=hr(C),m=0,k=0,$=0;m<n;++m)for(var I=0,R=he(e,_+1,_=pr(k=s[m])),p=e;I<y;++I)(p=fr(k>0?C[I]+" "+R:S(R,/&\f/g,C[I])))&&(d[$++]=p);return Je(e,t,r,o===0?Ue:c,d,g,b,x)}function rn(e,t,r,n){return Je(e,t,r,dr,vt(Ur()),he(e,2,-2),0,n)}function Nt(e,t,r,n,o){return Je(e,t,r,wt,he(e,0,n),he(e,n+1,-1),n,o)}function gr(e,t,r){switch(Yr(e,t)){case 5103:return E+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return E+e+e;case 4855:return E+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Ae+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return E+e+Ae+e+M+e+e;case 5936:switch(O(e,t+11)){case 114:return E+e+M+S(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return E+e+M+S(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return E+e+M+S(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return E+e+M+e+e;case 6165:return E+e+M+"flex-"+e+e;case 5187:return E+e+S(e,/(\w+).+(:[^]+)/,E+"box-$1$2"+M+"flex-$1$2")+e;case 5443:return E+e+M+"flex-item-"+S(e,/flex-|-self/g,"")+(te(e,/flex-|baseline/)?"":M+"grid-row-"+S(e,/flex-|-self/g,""))+e;case 4675:return E+e+M+"flex-line-pack"+S(e,/align-content|flex-|-self/g,"")+e;case 5548:return E+e+M+S(e,"shrink","negative")+e;case 5292:return E+e+M+S(e,"basis","preferred-size")+e;case 6060:return E+"box-"+S(e,"-grow","")+E+e+M+S(e,"grow","positive")+e;case 4554:return E+S(e,/([^-])(transform)/g,"$1"+E+"$2")+e;case 6187:return S(S(S(e,/(zoom-|grab)/,E+"$1"),/(image-set)/,E+"$1"),e,"")+e;case 5495:case 3959:return S(e,/(image-set\([^]*)/,E+"$1$`$1");case 4968:return S(S(e,/(.+:)(flex-)?(.*)/,E+"box-pack:$3"+M+"flex-pack:$3"),/space-between/,"justify")+E+e+e;case 4200:if(!te(e,/flex-|baseline/))return M+"grid-column-align"+he(e,t)+e;break;case 2592:case 3360:return M+S(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,te(n.props,/grid-\w+-end/)})?~ze(e+(r=r[t].value),"span",0)?e:M+S(e,"-start","")+e+M+"grid-row-span:"+(~ze(r,"span",0)?te(r,/\d+/):+te(r,/\d+/)-+te(e,/\d+/))+";":M+S(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return te(n.props,/grid-\w+-start/)})?e:M+S(S(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return S(e,/(.+)-inline(.+)/,E+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(V(e)-1-t>6)switch(O(e,t+1)){case 109:if(O(e,t+4)!==45)break;case 102:return S(e,/(.+:)(.+)-([^]+)/,"$1"+E+"$2-$3$1"+Ae+(O(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ze(e,"stretch",0)?gr(S(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return S(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,a,s,c,d,g){return M+o+":"+a+g+(s?M+o+"-span:"+(c?d:+d-+a)+g:"")+e});case 4949:if(O(e,t+6)===121)return S(e,":",":"+E)+e;break;case 6444:switch(O(e,O(e,14)===45?18:11)){case 120:return S(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+E+(O(e,14)===45?"inline-":"")+"box$3$1"+E+"$2$3$1"+M+"$2box$3")+e;case 100:return S(e,":",":"+M)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return S(e,"scroll-","scroll-snap-")+e}return e}function He(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function nn(e,t,r,n){switch(e.type){case Wr:if(e.children.length)break;case Br:case Hr:case wt:return e.return=e.return||e.value;case dr:return"";case ur:return e.return=e.value+"{"+He(e.children,n)+"}";case Ue:if(!V(e.value=e.props.join(",")))return""}return V(r=He(e.children,n))?e.return=e.value+"{"+r+"}":""}function on(e){var t=hr(e);return function(r,n,o,a){for(var s="",c=0;c<t;c++)s+=e[c](r,n,o,a)||"";return s}}function an(e){return function(t){t.root||(t=t.return)&&e(t)}}function sn(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case wt:e.return=gr(e.value,e.length,r);return;case ur:return He([ie(e,{value:S(e.value,"@","@"+E)})],n);case Ue:if(e.length)return Zr(r=e.props,function(o){switch(te(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ye(ie(e,{props:[S(o,/:(read-\w+)/,":"+Ae+"$1")]})),ye(ie(e,{props:[o]})),ut(e,{props:Lt(r,n)});break;case"::placeholder":ye(ie(e,{props:[S(o,/:(plac\w+)/,":"+E+"input-$1")]})),ye(ie(e,{props:[S(o,/:(plac\w+)/,":"+Ae+"$1")]})),ye(ie(e,{props:[S(o,/:(plac\w+)/,M+"input-$1")]})),ye(ie(e,{props:[o]})),ut(e,{props:Lt(r,n)});break}return""})}}var Y={},we=typeof process<"u"&&Y!==void 0&&(Y.REACT_APP_SC_ATTR||Y.SC_ATTR)||"data-styled",yr="active",br="data-styled-version",Xe="6.3.12",St=`/*!sc*/
`,Ee=typeof window<"u"&&typeof document<"u",cn=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Y!==void 0&&Y.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Y.REACT_APP_SC_DISABLE_SPEEDY!==""?Y.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Y.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Y!==void 0&&Y.SC_DISABLE_SPEEDY!==void 0&&Y.SC_DISABLE_SPEEDY!==""&&Y.SC_DISABLE_SPEEDY!=="false"&&Y.SC_DISABLE_SPEEDY),ln={};function _e(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Ge=new Map,We=new Map,Be=1,Re=function(e){if(Ge.has(e))return Ge.get(e);for(;We.has(Be);)Be++;var t=Be++;return Ge.set(e,t),We.set(t,e),t},dn=function(e,t){Be=t+1,Ge.set(e,t),We.set(t,e)},kt=Object.freeze([]),ve=Object.freeze({});function xr(e,t,r){return r===void 0&&(r=ve),e.theme!==r.theme&&e.theme||t||r.theme}var wr=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),un=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,pn=/(^-|-$)/g;function Dt(e){return e.replace(un,"-").replace(pn,"")}var fn=/(a)(d)/gi,zt=function(e){return String.fromCharCode(e+(e>25?39:97))};function ft(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=zt(t%52)+r;return(zt(t%52)+r).replace(fn,"$1-$2")}var st,ue=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},vr=function(e){return ue(5381,e)};function Ct(e){return ft(vr(e)>>>0)}function hn(e){return e.displayName||e.name||"Component"}function it(e){return typeof e=="string"&&!0}var Sr=typeof Symbol=="function"&&Symbol.for,kr=Sr?Symbol.for("react.memo"):60115,mn=Sr?Symbol.for("react.forward_ref"):60112,gn={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},yn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Cr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},bn=((st={})[mn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},st[kr]=Cr,st);function Ot(e){return("type"in(t=e)&&t.type.$$typeof)===kr?Cr:"$$typeof"in e?bn[e.$$typeof]:gn;var t}var xn=Object.defineProperty,wn=Object.getOwnPropertyNames,Ft=Object.getOwnPropertySymbols,vn=Object.getOwnPropertyDescriptor,Sn=Object.getPrototypeOf,Gt=Object.prototype;function $r(e,t,r){if(typeof t!="string"){if(Gt){var n=Sn(t);n&&n!==Gt&&$r(e,n,r)}var o=wn(t);Ft&&(o=o.concat(Ft(t)));for(var a=Ot(e),s=Ot(t),c=0;c<o.length;++c){var d=o[c];if(!(d in yn||r&&r[d]||s&&d in s||a&&d in a)){var g=vn(t,d);try{xn(e,d,g)}catch{}}}}return e}function Se(e){return typeof e=="function"}function $t(e){return typeof e=="object"&&"styledComponentId"in e}function fe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Ye(e,t){return e.join("")}function Pe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function ht(e,t,r){if(r===void 0&&(r=!1),!r&&!Pe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=ht(e[n],t[n]);else if(Pe(t))for(var n in t)e[n]=ht(e[n],t[n]);return e}function jt(e,t){Object.defineProperty(e,"toString",{value:t})}var kn=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(t){if(t===this._cGroup)return this._cIndex;var r=this._cIndex;if(t>this._cGroup)for(var n=this._cGroup;n<t;n++)r+=this.groupSizes[n];else for(n=this._cGroup-1;n>=t;n--)r-=this.groupSizes[n];return this._cGroup=t,this._cIndex=r,r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,a=o;t>=a;)if((a<<=1)<0)throw _e(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var s=o;s<a;s++)this.groupSizes[s]=0}for(var c=this.indexOfGroup(t+1),d=0,g=(s=0,r.length);s<g;s++)this.tag.insertRule(c,r[s])&&(this.groupSizes[t]++,c++,d++);d>0&&this._cGroup>t&&(this._cIndex+=d)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var a=n;a<o;a++)this.tag.deleteRule(n);r>0&&this._cGroup>t&&(this._cIndex-=r)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),a=o+n,s=o;s<a;s++)r+=this.tag.getRule(s)+St;return r},e})(),Cn="style[".concat(we,"][").concat(br,'="').concat(Xe,'"]'),$n=new RegExp("^".concat(we,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Bt=function(e){return typeof ShadowRoot<"u"&&e instanceof ShadowRoot||"host"in e&&e.nodeType===11},mt=function(e){if(!e)return document;if(Bt(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(Bt(t))return t}return document},jn=function(e,t,r){for(var n,o=r.split(","),a=0,s=o.length;a<s;a++)(n=o[a])&&e.registerName(t,n)},Rn=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(St),o=[],a=0,s=n.length;a<s;a++){var c=n[a].trim();if(c){var d=c.match($n);if(d){var g=0|parseInt(d[1],10),b=d[2];g!==0&&(dn(b,g),jn(e,b,d[3]),e.getTag().insertRules(g,o)),o.length=0}else o.push(c)}}},ct=function(e){for(var t=mt(e.options.target).querySelectorAll(Cn),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(we)!==yr&&(Rn(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function An(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var jr=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=(function(c){var d=Array.from(c.querySelectorAll("style[".concat(we,"]")));return d[d.length-1]})(r),a=o!==void 0?o.nextSibling:null;n.setAttribute(we,yr),n.setAttribute(br,Xe);var s=An();return s&&n.setAttribute("nonce",s),r.insertBefore(n,a),n},En=(function(){function e(t){this.element=jr(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(r){var n;if(r.sheet)return r.sheet;for(var o=(n=r.getRootNode().styleSheets)!==null&&n!==void 0?n:document.styleSheets,a=0,s=o.length;a<s;a++){var c=o[a];if(c.ownerNode===r)return c}throw _e(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e})(),In=(function(){function e(t){this.element=jr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),Pn=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(t===this.length?this.rules.push(r):this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),Ht=Ee,_n={isServer:!Ee,useCSSOMInjection:!cn},Ze=(function(){function e(t,r,n){t===void 0&&(t=ve),r===void 0&&(r={});var o=this;this.options=G(G({},_n),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Ee&&Ht&&(Ht=!1,ct(this)),jt(this,function(){return(function(a){for(var s=a.getTag(),c=s.length,d="",g=function(x){var _=(function($){return We.get($)})(x);if(_===void 0)return"continue";var C=a.names.get(_);if(C===void 0||!C.size)return"continue";var y=s.getGroup(x);if(y.length===0)return"continue";var m=we+".g"+x+'[id="'+_+'"]',k="";C.forEach(function($){$.length>0&&(k+=$+",")}),d+=y+m+'{content:"'+k+'"}'+St},b=0;b<c;b++)g(b);return d})(o)})}return e.registerId=function(t){return Re(t)},e.prototype.rehydrate=function(){!this.server&&Ee&&ct(this)},e.prototype.reconstructWithOptions=function(t,r){r===void 0&&(r=!0);var n=new e(G(G({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&Ee&&t.target!==this.options.target&&mt(this.options.target)!==mt(t.target)&&ct(n),n},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Pn(o):n?new En(o):new In(o)})(this.options),new kn(t)));var t},e.prototype.hasNameForId=function(t,r){var n,o;return(o=(n=this.names.get(t))===null||n===void 0?void 0:n.has(r))!==null&&o!==void 0&&o},e.prototype.registerName=function(t,r){Re(t);var n=this.names.get(t);n?n.add(r):this.names.set(t,new Set([r]))},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Re(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Re(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})();function Mn(e,t){return t==null||typeof t=="boolean"||t===""?"":typeof t!="number"||t===0||e in Gr||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Ln=function(e){return e>="A"&&e<="Z"};function Wt(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Ln(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Rr=Symbol.for("sc-keyframes");function Tn(e){return typeof e=="object"&&e!==null&&Rr in e}var Ar=function(e){return e==null||e===!1||e===""},Er=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!Ar(n)&&(Array.isArray(n)&&n.isCss||Se(n)?t.push("".concat(Wt(r),":"),n,";"):Pe(n)?t.push.apply(t,be(be(["".concat(r," {")],Er(n),!1),["}"],!1)):t.push("".concat(Wt(r),": ").concat(Mn(r,n),";")))}return t};function le(e,t,r,n,o){if(o===void 0&&(o=[]),typeof e=="string")return e&&o.push(e),o;if(Ar(e))return o;if($t(e))return o.push(".".concat(e.styledComponentId)),o;if(Se(e)){if(!Se(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return o.push(e),o;var a=e(t);return le(a,t,r,n,o)}var s;if(Tn(e))return r?(e.inject(r,n),o.push(e.getName(n))):o.push(e),o;if(Pe(e)){for(var c=Er(e),d=0;d<c.length;d++)o.push(c[d]);return o}if(!Array.isArray(e))return o.push(e.toString()),o;for(d=0;d<e.length;d++)le(e[d],t,r,n,o);return o}function Ir(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Se(r)&&!$t(r))return!1}return!0}var Nn=vr(Xe),Dn=(function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Ir(t),this.componentId=r,this.baseHash=ue(Nn,r),this.baseStyle=n,Ze.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=fe(o,this.staticRulesId);else{var a=Ye(le(this.rules,t,r,n)),s=ft(ue(this.baseHash,a)>>>0);if(!r.hasNameForId(this.componentId,s)){var c=n(a,".".concat(s),void 0,this.componentId);r.insertRules(this.componentId,s,c)}o=fe(o,s),this.staticRulesId=s}else{for(var d=ue(this.baseHash,n.hash),g="",b=0;b<this.rules.length;b++){var x=this.rules[b];if(typeof x=="string")g+=x;else if(x){var _=Ye(le(x,t,r,n));d=ue(ue(d,String(b)),_),g+=_}}if(g){var C=ft(d>>>0);if(!r.hasNameForId(this.componentId,C)){var y=n(g,".".concat(C),void 0,this.componentId);r.insertRules(this.componentId,C,y)}o=fe(o,C)}}return{className:o,css:typeof window>"u"?r.getTag().getGroup(Re(this.componentId)):""}},e})(),zn=/&/g,re=47,pe=42;function Yt(e){if(e.indexOf("}")===-1)return!1;for(var t=e.length,r=0,n=0,o=!1,a=0;a<t;a++){var s=e.charCodeAt(a);if(n!==0||o||s!==re||e.charCodeAt(a+1)!==pe)if(o)s===pe&&e.charCodeAt(a+1)===re&&(o=!1,a++);else if(s!==34&&s!==39||a!==0&&e.charCodeAt(a-1)===92){if(n===0){if(s===123)r++;else if(s===125&&--r<0)return!0}}else n===0?n=s:n===s&&(n=0);else o=!0,a++}return r!==0||n!==0}function Pr(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Pr(r.children,t)),r})}function On(e){var t,r,n,o=ve,a=o.options,s=a===void 0?ve:a,c=o.plugins,d=c===void 0?kt:c,g=function(y,m,k){return k.startsWith(r)&&k.endsWith(r)&&k.replaceAll(r,"").length>0?".".concat(t):y},b=d.slice();b.push(function(y){y.type===Ue&&y.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),y.props[0]=y.props[0].replace(zn,r).replace(n,g))}),s.prefix&&b.push(sn),b.push(nn);var x=[],_=on(b.concat(an(function(y){return x.push(y)}))),C=function(y,m,k,$){m===void 0&&(m=""),k===void 0&&(k=""),$===void 0&&($="&"),t=$,r=m,n=void 0;var I=(function(p){if(!Yt(p))return p;for(var j=p.length,v="",u=0,f=0,L=0,F=!1,A=0;A<j;A++){var W=p.charCodeAt(A);if(L!==0||F||W!==re||p.charCodeAt(A+1)!==pe)if(F)W===pe&&p.charCodeAt(A+1)===re&&(F=!1,A++);else if(W!==34&&W!==39||A!==0&&p.charCodeAt(A-1)===92){if(L===0)if(W===123)f++;else if(W===125){if(--f<0){for(var B=A+1;B<j;){var Q=p.charCodeAt(B);if(Q===59||Q===10)break;B++}B<j&&p.charCodeAt(B)===59&&B++,f=0,A=B-1,u=B;continue}f===0&&(v+=p.substring(u,A+1),u=A+1)}else W===59&&f===0&&(v+=p.substring(u,A+1),u=A+1)}else L===0?L=W:L===W&&(L=0);else F=!0,A++}if(u<j){var de=p.substring(u);Yt(de)||(v+=de)}return v})((function(p){if(p.indexOf("//")===-1)return p;for(var j=p.length,v=[],u=0,f=0,L=0,F=0;f<j;){var A=p.charCodeAt(f);if(A!==34&&A!==39||f!==0&&p.charCodeAt(f-1)===92)if(L===0)if(A===re&&f+1<j&&p.charCodeAt(f+1)===pe){for(f+=2;f+1<j&&(p.charCodeAt(f)!==pe||p.charCodeAt(f+1)!==re);)f++;f+=2}else if(A===40&&f>=3&&(32|p.charCodeAt(f-1))==108&&(32|p.charCodeAt(f-2))==114&&(32|p.charCodeAt(f-3))==117)F=1,f++;else if(F>0)A===41?F--:A===40&&F++,f++;else if(A===pe&&f+1<j&&p.charCodeAt(f+1)===re)f>u&&v.push(p.substring(u,f)),u=f+=2;else if(A===re&&f+1<j&&p.charCodeAt(f+1)===re){for(f>u&&v.push(p.substring(u,f));f<j&&p.charCodeAt(f)!==10;)f++;u=f}else f++;else f++;else L===0?L=A:L===A&&(L=0),f++}return u===0?p:(u<j&&v.push(p.substring(u)),v.join(""))})(y)),R=tn(k||m?"".concat(k," ").concat(m," { ").concat(I," }"):I);return s.namespace&&(R=Pr(R,s.namespace)),x=[],He(R,_),x};return C.hash=d.length?d.reduce(function(y,m){return m.name||_e(15),ue(y,m.name)},5381).toString():"",C}var Fn=new Ze,gt=On(),_r=ne.createContext({shouldForwardProp:void 0,styleSheet:Fn,stylis:gt});_r.Consumer;ne.createContext(void 0);function yt(){return ne.useContext(_r)}var Rt=ne.createContext(void 0);Rt.Consumer;var lt={};function Gn(e,t,r){var n=$t(e),o=e,a=!it(e),s=t.attrs,c=s===void 0?kt:s,d=t.componentId,g=d===void 0?(function(p,j){var v=typeof p!="string"?"sc":Dt(p);lt[v]=(lt[v]||0)+1;var u="".concat(v,"-").concat(Ct(Xe+v+lt[v]));return j?"".concat(j,"-").concat(u):u})(t.displayName,t.parentComponentId):d,b=t.displayName,x=b===void 0?(function(p){return it(p)?"styled.".concat(p):"Styled(".concat(hn(p),")")})(e):b,_=t.displayName&&t.componentId?"".concat(Dt(t.displayName),"-").concat(t.componentId):t.componentId||g,C=n&&o.attrs?o.attrs.concat(c).filter(Boolean):c,y=t.shouldForwardProp;if(n&&o.shouldForwardProp){var m=o.shouldForwardProp;if(t.shouldForwardProp){var k=t.shouldForwardProp;y=function(p,j){return m(p,j)&&k(p,j)}}else y=m}var $=new Dn(r,_,n?o.componentStyle:void 0);function I(p,j){return(function(v,u,f){var L=v.attrs,F=v.componentStyle,A=v.defaultProps,W=v.foldedComponentIds,B=v.styledComponentId,Q=v.target,de=ne.useContext(Rt),Me=yt(),ae=v.shouldForwardProp||Me.shouldForwardProp,me=xr(u,de,A)||ve,Z=(function(l,w,T){for(var N,D=G(G({},w),{className:void 0,theme:T}),q=0;q<l.length;q+=1){var ee=Se(N=l[q])?N(D):N;for(var H in ee)H==="className"?D.className=fe(D.className,ee[H]):H==="style"?D.style=G(G({},D.style),ee[H]):H in w&&w[H]===void 0||(D[H]=ee[H])}return"className"in w&&typeof w.className=="string"&&(D.className=fe(D.className,w.className)),D})(L,u,me),ge=Z.as||Q,se={};for(var K in Z)Z[K]===void 0||K[0]==="$"||K==="as"||K==="theme"&&Z.theme===me||(K==="forwardedAs"?se.as=Z.forwardedAs:ae&&!ae(K,ge)||(se[K]=Z[K]));var Ke=(function(l,w){var T=yt(),N=l.generateAndInjectStyles(w,T.styleSheet,T.stylis);return N})(F,Z),Le=Ke.className,Ce=fe(W,B);return Le&&(Ce+=" "+Le),Z.className&&(Ce+=" "+Z.className),se[it(ge)&&!wr.has(ge)?"class":"className"]=Ce,f&&(se.ref=f),P.createElement(ge,se)})(R,p,j)}I.displayName=x;var R=ne.forwardRef(I);return R.attrs=C,R.componentStyle=$,R.displayName=x,R.shouldForwardProp=y,R.foldedComponentIds=n?fe(o.foldedComponentIds,o.styledComponentId):"",R.styledComponentId=_,R.target=n?o.target:e,Object.defineProperty(R,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(p){this._foldedDefaultProps=n?(function(j){for(var v=[],u=1;u<arguments.length;u++)v[u-1]=arguments[u];for(var f=0,L=v;f<L.length;f++)ht(j,L[f],!0);return j})({},o.defaultProps,p):p}}),jt(R,function(){return".".concat(R.styledComponentId)}),a&&$r(R,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),R}function Zt(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Ut=function(e){return Object.assign(e,{isCss:!0})};function At(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Se(e)||Pe(e))return Ut(le(Zt(kt,be([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?le(n):Ut(le(Zt(n,t)))}function bt(e,t,r){if(r===void 0&&(r=ve),!t)throw _e(1,t);var n=function(o){for(var a=[],s=1;s<arguments.length;s++)a[s-1]=arguments[s];return e(t,r,At.apply(void 0,be([o],a,!1)))};return n.attrs=function(o){return bt(e,t,G(G({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return bt(e,t,G(G({},r),o))},n}var Mr=function(e){return bt(Gn,e)},xt=Mr;wr.forEach(function(e){xt[e]=Mr(e)});var Lr,Bn=(function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Ir(t),Ze.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var a=o(Ye(le(this.rules,r,n,o)),""),s=this.componentId+t;n.insertRules(s,s,a)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Ze.registerId(this.componentId+t);var a=this.componentId+t;this.isStatic?n.hasNameForId(a,a)||this.createStyles(t,r,n,o):(this.removeStyles(t,n),this.createStyles(t,r,n,o))},e})();function Hn(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=At.apply(void 0,be([e],t,!1)),o="sc-global-".concat(Ct(JSON.stringify(n))),a=new Bn(n,o),s=new WeakMap,c=function(d){var g=yt(),b=ne.useContext(Rt),x=s.get(g.styleSheet);return x===void 0&&(x=g.styleSheet.allocateGSInstance(o),s.set(g.styleSheet,x)),ne.useLayoutEffect(function(){return g.styleSheet.server||(function(_,C,y,m,k){if(a.isStatic)a.renderStyles(_,ln,y,k);else{var $=G(G({},C),{theme:xr(C,m,c.defaultProps)});a.renderStyles(_,$,y,k)}})(x,d,g.styleSheet,b,g.stylis),function(){a.removeStyles(x,g.styleSheet)}},[x,d,g.styleSheet,b,g.stylis]),null};return ne.memo(c)}var Wn=(function(){function e(t,r){var n=this;this[Lr]=!0,this.inject=function(o,a){a===void 0&&(a=gt);var s=n.name+a.hash;o.hasNameForId(n.id,s)||o.insertRules(n.id,s,a(n.rules,s,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,jt(this,function(){throw _e(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=gt),this.name+t.hash},e})();function Tr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Ye(At.apply(void 0,be([e],t,!1))),o=Ct(n);return new Wn(o,n)}Lr=Rr;const h=xt.default??xt,Yn={drums:"#ff6b35",bass:"#ff3d6b",harmony:"#00d4b4",melody:"#c080ff",fx:"#40b4ff"},Zn=Tr`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`,Un=Tr`
  0% {
    opacity: 0;
    transform: translate3d(118%, 0, 0);
  }
  14% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  76% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(-118%, 0, 0);
  }
`,qn=Hn`
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }

  html, body {
    margin: 0;
    min-height: 100%;
    background: #040608;
    font-family: "Outfit", sans-serif;
    color: #c8a96a;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.13) 3px,
      rgba(0, 0, 0, 0.13) 4px
    );
  }
`,Jn=h.main`
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
  align-items: stretch;
  padding: 1.5rem 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem 0 2rem;
  }
`,qt=h.section`
  position: relative;
  padding: 1.25rem;
  background: #060a10;
  border: 1px solid #1c2e3e;
  border-top-color: #2a4050;
  border-radius: 6px;
  box-shadow:
    0 0 0 1px #020406,
    inset 0 0 60px rgba(0, 0, 0, 0.5),
    0 16px 48px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  max-height: 92vh;
`,Jt=h.p`
  margin: 0 0 0.3rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.55);
`,Vn=h.h1`
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(1.1rem, 3vw, 1.65rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e0c070;
  text-shadow: 0 0 24px rgba(255, 200, 80, 0.25);
  line-height: 1.1;
`,Vt=h.p`
  margin: 0.65rem 0 0;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: #2a4850;
  line-height: 1.6;
`,Xt=h.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #3a6070;
`,Xn=h.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin: 0.85rem 0 0;
`,Qt=h.button`
  border: 1px solid ${({$active:e})=>e?"rgba(255,140,0,0.75)":"#1a2e3a"};
  background: ${({$active:e})=>e?"rgba(255,140,0,0.12)":"#050810"};
  color: ${({$active:e})=>e?"#ff8c00":"#2e5060"};
  border-radius: 3px;
  padding: 0.28rem 0.7rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${({$active:e})=>e?"0 0 10px rgba(255,140,0,0.22), inset 0 0 8px rgba(255,140,0,0.06)":"inset 0 1px 4px rgba(0,0,0,0.5)"};
  transition: all 120ms ease;

  &:hover {
    border-color: rgba(255, 140, 0, 0.35);
    color: #7a6030;
  }
`,Kt=h.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.6rem 0 0;
  padding: 0.45rem 0.75rem;
  background: #020407;
  border: 1px solid #0d1824;
  border-radius: 3px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
`,er=h.strong`
  font-family: "Share Tech Mono", monospace;
  font-size: 1rem;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.65);
  min-width: 44px;
  text-align: right;
  flex-shrink: 0;
`,tr=h.input`
  flex: 1;
  accent-color: #ff8c00;
  cursor: pointer;
`,rr=h.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #1c2e3e 20%,
    #ff8c0020 50%,
    #1c2e3e 80%,
    transparent
  );
  margin: 0.75rem 0;
  flex-shrink: 0;
`,Qn=h.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #1c2e3e transparent;
`,Kn=h.div`
  border: 1px solid
    ${({$on:e,$dimmed:t})=>t?"#0a1018":e?"rgba(255,140,0,0.38)":"#141e28"};
  border-radius: 3px;
  background: ${({$on:e,$dimmed:t})=>t?"#040609":e?"rgba(255,140,0,0.055)":"#080c14"};
  box-shadow: ${({$on:e})=>e?"0 0 14px rgba(255,140,0,0.1)":"none"};
  transition: border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
  overflow: hidden;
`,eo=h.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.65rem;
`,to=h.button`
  flex-shrink: 0;
  width: 30px;
  height: 15px;
  border-radius: 2px;
  border: 1px solid ${({$on:e})=>e?"rgba(255,140,0,0.8)":"#1a2a32"};
  background: ${({$on:e})=>e?"rgba(255,140,0,0.18)":"#040810"};
  position: relative;
  cursor: pointer;
  padding: 0;
  box-shadow: ${({$on:e})=>e?"0 0 7px rgba(255,140,0,0.45), inset 0 0 5px rgba(255,140,0,0.1)":"inset 0 1px 4px rgba(0,0,0,0.6)"};
  transition: all 120ms ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({$on:e})=>e?"16px":"2px"};
    width: 9px;
    height: 9px;
    background: ${({$on:e})=>e?"#ff8c00":"#1a2a32"};
    box-shadow: ${({$on:e})=>e?"0 0 5px #ff8c00":"none"};
    transition: left 120ms ease, background 120ms ease, box-shadow 120ms ease;
  }
`,ro=h.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:e})=>e};
  flex-shrink: 0;
  box-shadow: 0 0 5px ${({$color:e})=>`${e}88`};
`,no=h.span`
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({$dimmed:e})=>e?"rgba(100,130,140,0.3)":"#c8a96a"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 140ms ease;
`,oo=h.div`
  display: flex;
  gap: 0.2rem;
  flex-shrink: 0;
`,Ne=h.button`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid ${({$active:e})=>e?"rgba(255,140,0,0.65)":"#141e28"};
  background: ${({$active:e})=>e?"rgba(255,140,0,0.14)":"#040810"};
  color: ${({$active:e})=>e?"#ff8c00":"#1e3a48"};
  font-family: "Share Tech Mono", monospace;
  font-size: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 100ms ease;

  &:hover:not(:disabled) {
    border-color: rgba(255, 140, 0, 0.3);
    color: #5a8090;
  }

  &:disabled {
    opacity: 0.18;
    cursor: default;
  }
`,ao=h.button`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #141e28;
  background: #040810;
  color: #1e3a48;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transform: ${({$open:e})=>e?"rotate(90deg)":"none"};
  transition: transform 160ms ease, color 120ms ease;

  &:hover {
    color: #5a8090;
  }
`,so=h.div`
  padding: 0 0.65rem 0.65rem;
  border-top: 1px solid rgba(255, 140, 0, 0.07);
`,io=h.p`
  margin: 0.45rem 0 0.65rem;
  font-size: 0.78rem;
  color: #2e5060;
  line-height: 1.5;
`,co=h.div`
  display: grid;
  gap: 0.5rem;
`,lo=h.div`
  display: grid;
  grid-template-columns: 76px 1fr 46px;
  align-items: center;
  gap: 0.45rem;
`,uo=h.label`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  color: #2e5060;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`,po=h.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.72rem;
  color: #7a6030;
  text-align: right;
`,fo=h.input`
  width: 100%;
  accent-color: #ff8c00;
  cursor: pointer;
`,ho=h.input`
  grid-column: 2 / -1;
  background: #020407;
  border: 1px solid #1a2a32;
  border-radius: 2px;
  padding: 0.22rem 0.5rem;
  color: #ff8c00;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.75rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 140, 0, 0.5);
    box-shadow: 0 0 6px rgba(255, 140, 0, 0.15);
  }
`,mo=h.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
`,Qe=h.button`
  border-radius: 3px;
  padding: 0.55rem 1rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 140ms ease;
  border: 1px solid;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`,go=h(Qe)`
  background: rgba(255, 140, 0, 0.14);
  color: #ff8c00;
  border-color: rgba(255, 140, 0, 0.55);
  box-shadow: 0 0 12px rgba(255, 140, 0, 0.18);

  &:hover:not(:disabled) {
    background: rgba(255, 140, 0, 0.22);
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.3);
  }
`,yo=h(Qe)`
  background: rgba(0, 212, 180, 0.07);
  color: #00d4b4;
  border-color: rgba(0, 212, 180, 0.22);

  &:hover {
    background: rgba(0, 212, 180, 0.13);
    box-shadow: 0 0 10px rgba(0, 212, 180, 0.15);
  }
`,bo=h(Qe)`
  margin-left: auto;
  background: transparent;
  color: #1e3a48;
  border-color: #141e28;
  padding: 0.55rem 0.75rem;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 180, 0.12);
  }
`,xo=h.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #2a4850;
`,wo=h(Qe)`
  background: transparent;
  color: ${({$done:e})=>e?"#00d4b4":"#2a4850"};
  border-color: ${({$done:e})=>e?"rgba(0,212,180,0.4)":"#141e28"};
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.3);
  }
`,vo=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  flex-shrink: 0;
`,So=h.pre`
  flex: 1;
  margin: 0;
  padding: 1rem;
  background: #020407;
  border: 1px solid #0d1824;
  border-radius: 3px;
  box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.65);
  color: #2d8a60;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  overflow: auto;
  white-space: pre;
  min-height: 0;
  text-shadow: 0 0 5px rgba(45, 138, 96, 0.45);
`,ko=h.div`
  position: fixed;
  inset: 0;
  background: #040608;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  user-select: none;
  overflow: hidden;
  padding: 2rem 1rem;
`,Co=h.div`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(5rem, 20vw, 15rem);
  font-weight: 900;
  color: #ff8c00;
  text-shadow:
    0 0 30px rgba(255, 140, 0, 0.7),
    0 0 80px rgba(255, 140, 0, 0.3),
    0 0 160px rgba(255, 140, 0, 0.12);
  letter-spacing: 0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`,$o=h.div`
  margin-top: 1.5rem;
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.7rem, 1.8vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #2a5050;
  text-shadow: 0 0 14px rgba(0, 180, 140, 0.25);
`,jo=h.div`
  margin-top: 1rem;
  min-height: 4.4rem;
  display: grid;
  place-items: center;
  gap: 0.25rem;
  text-align: center;
`,Ro=h.div`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ad7cf;
  text-shadow: 0 0 14px rgba(143, 208, 194, 0.2);
`,Ao=h.div`
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.62rem, 1.5vw, 0.8rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #5c8c91;
  line-height: 1.55;
`,Eo=h.div`
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.58rem, 1.4vw, 0.72rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #31525a;
  line-height: 1.6;
`,Io=h.div`
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.6);
  animation: ${Zn} 1.8s ease-in-out infinite;
`,Po=h.div`
  position: absolute;
  bottom: 2rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #141e28;
`,nr=h.div`
  position: relative;
  width: min(42rem, calc(100vw - 2rem));
  min-height: 11rem;
  margin-bottom: clamp(1.25rem, 3vh, 2rem);
  pointer-events: none;

  @media (max-width: 700px) {
    width: calc(100vw - 1.5rem);
    min-height: 11.5rem;
  }
`,or=h.a`
  position: absolute;
  inset: 0;
  display: grid;
  gap: 0.75rem;
  padding: 1rem 1.1rem 1rem 1.15rem;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
  pointer-events: auto;
  animation: ${Un} 7s ease-in-out forwards;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.025);
  }
`,ar=h.div`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.35);
`,sr=h.h2`
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(0.95rem, 2.3vw, 1.2rem);
  line-height: 1.35;
  color: #f2d8a0;
  text-shadow: 0 0 12px rgba(255, 190, 110, 0.12);
`,ir=h.p`
  margin: 0;
  color: #7c9ca0;
  font-family: "Outfit", sans-serif;
  font-size: 0.92rem;
  line-height: 1.55;
`;function _o({layer:e,isExpanded:t,isSoloed:r,isEffectivelyMuted:n,isFirst:o,isLast:a,onToggle:s,onMute:c,onSolo:d,onMoveUp:g,onMoveDown:b,onParamChange:x,onExpand:_}){const C=Yn[e.category]??"#3a6070",y=!e.enabled||n;return i.jsxs(Kn,{$on:e.enabled,$dimmed:y,children:[i.jsxs(eo,{children:[i.jsx(to,{$on:e.enabled,onClick:s,"aria-label":e.enabled?"Disable":"Enable"}),i.jsx(ro,{$color:C}),i.jsx(no,{$dimmed:y,children:e.name}),i.jsxs(oo,{children:[i.jsx(Ne,{$active:e.muted,onClick:c,title:"Mute",children:"M"}),i.jsx(Ne,{$active:r,onClick:d,title:"Solo",children:"S"}),i.jsx(Ne,{onClick:g,disabled:o,title:"Move up",children:"▲"}),i.jsx(Ne,{onClick:b,disabled:a,title:"Move down",children:"▼"}),i.jsx(ao,{$open:t,onClick:_,children:"›"})]})]}),t&&i.jsxs(so,{children:[i.jsx(io,{children:e.description}),i.jsx(co,{children:e.paramDefs.map(m=>i.jsxs(lo,{children:[i.jsx(uo,{htmlFor:`${e.id}-${m.key}`,children:m.label}),m.type==="range"?i.jsxs(i.Fragment,{children:[i.jsx(fo,{id:`${e.id}-${m.key}`,type:"range",min:m.min,max:m.max,step:m.step,value:e.params[m.key],onChange:k=>x(m.key,Number(k.target.value))}),i.jsx(po,{children:e.params[m.key]})]}):i.jsx(ho,{id:`${e.id}-${m.key}`,type:"text",value:e.params[m.key],onChange:k=>x(m.key,k.target.value),spellCheck:!1})]},m.key))})]})]})}const Mo={0:"Clear",1:"Mostly Clear",2:"Partly Cloudy",3:"Cloudy",45:"Fog",48:"Rime Fog",51:"Light Drizzle",53:"Drizzle",55:"Heavy Drizzle",56:"Freezing Drizzle",57:"Heavy Freezing Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",66:"Freezing Rain",67:"Heavy Freezing Rain",71:"Light Snow",73:"Snow",75:"Heavy Snow",77:"Snow Grains",80:"Rain Showers",81:"Heavy Showers",82:"Violent Showers",85:"Snow Showers",86:"Heavy Snow Showers",95:"Thunderstorm",96:"Thunder and Hail",99:"Severe Thunderstorm"};function Lo(e){return Mo[e]??"Current Conditions"}function To(){const[e,t]=P.useState({summary:"Checking local weather...",location:"Finding nearest city...",detail:"Allow location access for local conditions"});return P.useEffect(()=>{let r=!1;async function n(o){const{latitude:a,longitude:s}=o.coords,c=`${a.toFixed(2)}°, ${s.toFixed(2)}°`,d=`https://api.open-meteo.com/v1/forecast?latitude=${a}&longitude=${s}&current=temperature_2m,weather_code&current_weather=true&temperature_unit=celsius`,g=`https://nominatim.openstreetmap.org/reverse?lat=${a}&lon=${s}&format=jsonv2&zoom=10&addressdetails=1&accept-language=en`;try{const[b,x]=await Promise.all([fetch(d),fetch(g).catch(()=>null)]);if(!b.ok)throw new Error(`Weather request failed with ${b.status}`);const _=await b.json(),C=x?.ok?await x.json():null,y=_.current??_.current_weather,m=y?.temperature_2m??y?.temperature,k=y?.weather_code??y?.weathercode,$=C?.address??{},I=$.city||$.town||$.village||$.municipality||$.county||$.state_district||C?.name,R=$.state||$.region||$.county,p=[I,R].filter(Boolean).join(", ");if(r||m===void 0||k===void 0)return;t({summary:`${Math.round(m)}°C ${Lo(k)}`,location:p?`Closest city ${p}`:"Closest city unavailable",detail:`Coordinates ${c}`})}catch{r||t({summary:"Weather unavailable",location:"Closest city unavailable",detail:`Coordinates ${c}`})}}if(!("geolocation"in navigator)){t({summary:"Weather unavailable",location:"Closest city unavailable",detail:"This browser does not support location access"});return}return navigator.geolocation.getCurrentPosition(o=>{n(o)},()=>{r||t({summary:"Location not shared",location:"Closest city unavailable",detail:"Allow browser location access to show local weather"})},{enableHighAccuracy:!1,timeout:8e3,maximumAge:900*1e3}),()=>{r=!0}},[]),e}function No(){const[e,t]=P.useState(()=>new Date),r=To();P.useEffect(()=>{const s=window.setInterval(()=>t(new Date),6e4);return()=>window.clearInterval(s)},[]);const n=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0"),a=e.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});return i.jsxs(i.Fragment,{children:[i.jsxs(Co,{children:[n,":",o]}),i.jsx($o,{children:a}),i.jsxs(jo,{children:[i.jsx(Ro,{children:r.summary}),i.jsx(Ao,{children:r.location}),i.jsx(Eo,{children:r.detail})]})]})}function Do({items:e}){const t=e.filter(a=>a?.title&&a?.link),[r,n]=P.useState(0);if(P.useEffect(()=>{if(t.length<=1)return;const a=window.setInterval(()=>{n(s=>(s+1)%t.length)},7e3);return()=>window.clearInterval(a)},[t.length]),P.useEffect(()=>{r>=t.length&&n(0)},[r,t.length]),!t.length)return i.jsx(nr,{children:i.jsxs(or,{href:"https://www.reuters.com/world/",target:"_blank",rel:"noreferrer",onClick:a=>a.stopPropagation(),children:[i.jsx(ar,{children:"Reuters / BBC / AP"}),i.jsx(sr,{children:"News feed is warming up"}),i.jsx(ir,{children:"I could not load the Reuters, BBC, and Associated Press headlines for this session. Refresh the page in a moment and the zen card should try again."})]})});const o=t[r];return i.jsx(nr,{children:i.jsxs(or,{href:o.link,target:"_blank",rel:"noreferrer",onClick:a=>a.stopPropagation(),children:[i.jsx(ar,{children:o.source||"World News"}),i.jsx(sr,{children:o.title}),i.jsx(ir,{children:o.description||"Open the story to read the full article."})]},`${o.link}-${r}`)})}function zo({isPlaying:e,items:t,onExit:r}){return i.jsxs(ko,{onClick:r,children:[e&&i.jsx(Io,{children:"● Playing"}),i.jsx(Do,{items:t}),i.jsx(No,{}),i.jsx(Po,{children:"click anywhere to return"})]})}function Oo(){return lr.map(e=>({...e,params:{...e.params}}))}function Fo(e){return lr.map(t=>({...t,params:{...t.params},enabled:e.includes(t.id),muted:!1}))}function cr(e){return[...e].sort((t,r)=>t.order-r.order)}function Go(e,t){const r=Math.min(e.length,t.length);let n=0;for(;n<r&&e[n]===t[n];)n+=1;return n}function Bo(e,t,r){const n=Math.min(e.length,t.length)-r;let o=0;for(;o<n&&e[e.length-1-o]===t[t.length-1-o];)o+=1;return o}function Wo({initialNewsItems:e=[]}){const[t,r]=P.useState(Oo),[n,o]=P.useState({...zr}),[a,s]=P.useState(null),[c,d]=P.useState(null),[g,b]=P.useState(null),[x,_]=P.useState(!0),[C,y]=P.useState(!1),[m,k]=P.useState("READY"),[$,I]=P.useState(""),[R,p]=P.useState(.8),[j,v]=P.useState(!1);P.useEffect(()=>{let l=!1;return k("LOADING..."),ot().then(()=>{l||k("READY")}).catch(w=>{l||(k("ERROR"),I(w instanceof Error?w.message:String(w)))}),()=>{l=!0,De()}},[]),P.useEffect(()=>{Mt(R)},[R]);const u=P.useMemo(()=>cr(t),[t]),{display:f,stack:L}=P.useMemo(()=>Or(t,n,{soloId:c}),[t,n,c]),F=P.useMemo(()=>u.filter(l=>l.enabled&&!me(l)).map(l=>l.id),[u,c]),A=t.filter(l=>l.enabled&&!me(l)).length,[W,B]=P.useState(f),Q=P.useRef(null),de=P.useRef(f),Me=P.useRef(F);P.useEffect(()=>{if(!C)return;if(!L){De(),y(!1),k("READY");return}let l=!1;return ot().then(()=>{l||(Mt(R),Fr(L,n.bpm),k("PLAYING"),I(""))}).catch(w=>{l||(y(!1),k("ERROR"),I(w instanceof Error?w.message:String(w)))}),()=>{l=!0}},[n.bpm,C,L]),P.useEffect(()=>{Q.current&&clearInterval(Q.current);const l=de.current,w=f,T=Me.current;de.current=w,Me.current=F;const N=F.filter(tt=>!T.includes(tt)),D=T.filter(tt=>!F.includes(tt));if(N.length!==1||D.length>0||w.length<=l.length){B(w);return}const q=Go(l,w),ee=Bo(l,w,q),H=w.slice(0,q),J=w.slice(q,w.length-ee),Et=w.slice(w.length-ee);if(!J){B(w);return}B(`${H}${Et}`);let et=0;return Q.current=setInterval(()=>{et+=1,B(`${H}${J.slice(0,et)}${Et}`),et>=J.length&&clearInterval(Q.current)},6),()=>clearInterval(Q.current)},[F,f]);function ae(){s(null)}function me(l){return c!==null?l.id!==c:l.muted}function Z(l,w){r(T=>T.map(N=>N.id===l?{...N,...w}:N)),ae()}function ge(l,w,T){r(N=>N.map(D=>D.id===l?{...D,params:{...D.params,[w]:T}}:D)),ae()}function se(l,w){r(T=>{const N=cr(T),D=N.findIndex(J=>J.id===l),q=w==="up"?D-1:D+1;if(q<0||q>=N.length)return T;const ee=N[D],H=N[q];return T.map(J=>J.id===ee.id?{...J,order:H.order}:J.id===H.id?{...J,order:ee.order}:J)}),ae()}function K(l){const w=_t.find(T=>T.id===l);w&&(r(Fo(w.enabledLayers)),s(l),d(null),b(null))}async function Ke(){if(L)try{await ot(),y(!0),k("PLAYING"),I("")}catch(l){y(!1),k("ERROR"),I(l instanceof Error?l.message:String(l))}}function Le(){De(),y(!1),k("STOPPED")}async function Ce(){try{await navigator.clipboard.writeText(f),v(!0),window.setTimeout(()=>v(!1),2e3)}catch{}}return i.jsxs(i.Fragment,{children:[i.jsx(qn,{}),i.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),i.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),i.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;800;900&family=Share+Tech+Mono&family=Outfit:wght@400;500;600&display=swap",rel:"stylesheet"}),!x&&i.jsx(zo,{isPlaying:C,items:e,onExit:()=>_(!0)}),x&&i.jsxs(Jn,{children:[i.jsxs(qt,{children:[i.jsx(Jt,{children:"Layer Builder"}),i.jsx(Vn,{children:"Trance Composer"}),i.jsxs(Xn,{children:[_t.map(l=>i.jsx(Qt,{$active:a===l.id,onClick:()=>K(l.id),title:l.description,children:l.name},l.id)),a===null&&i.jsx(Qt,{$active:!1,style:{opacity:.4,pointerEvents:"none"},children:"Custom"})]}),i.jsxs(Kt,{style:{marginTop:"0.6rem"},children:[i.jsx(Xt,{children:"BPM"}),i.jsx(tr,{type:"range",min:80,max:180,step:1,value:n.bpm,onChange:l=>{o(w=>({...w,bpm:Number(l.target.value)})),ae()}}),i.jsx(er,{children:n.bpm})]}),i.jsx(rr,{}),i.jsx(Qn,{children:u.map((l,w)=>i.jsx(_o,{layer:l,isExpanded:g===l.id,isSoloed:c===l.id,isEffectivelyMuted:me(l),isFirst:w===0,isLast:w===u.length-1,onToggle:()=>Z(l.id,{enabled:!l.enabled}),onMute:()=>Z(l.id,{muted:!l.muted}),onSolo:()=>d(T=>T===l.id?null:l.id),onMoveUp:()=>se(l.id,"up"),onMoveDown:()=>se(l.id,"down"),onParamChange:(T,N)=>ge(l.id,T,N),onExpand:()=>b(T=>T===l.id?null:l.id)},l.id))}),i.jsx(rr,{}),i.jsxs(Kt,{children:[i.jsx(Xt,{children:"Vol"}),i.jsx(tr,{type:"range",min:0,max:1,step:.01,value:R,onChange:l=>p(Number(l.target.value))}),i.jsxs(er,{style:{fontSize:"0.85rem"},children:[Math.round(R*100),"%"]})]}),i.jsxs(mo,{children:[i.jsx(go,{onClick:Ke,disabled:!L,children:C?"Restart":"Play"}),i.jsx(yo,{onClick:Le,children:"Stop"}),i.jsxs(xo,{children:[A," layer",A!==1?"s":""," · ",m]}),i.jsx(bo,{onClick:()=>_(!1),title:"Zen clock mode",children:"ZEN"})]}),$&&i.jsx(Vt,{children:$}),i.jsx(Vt,{children:"Audio starts after the first click. Changes take effect on Play."})]}),i.jsxs(qt,{children:[i.jsxs(vo,{children:[i.jsx(Jt,{style:{margin:0},children:"Generated Code"}),i.jsx(wo,{$done:j,onClick:Ce,children:j?"Copied ✓":"Copy"})]}),i.jsx(So,{children:W})]})]})]})}export{Wo as default};
