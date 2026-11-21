/*! For license information please see demo.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.demo=e():t.demo=e()}(globalThis,()=>(()=>{"use strict";var t={620(t){const e=[[{color:"0, 0, 0",class:"ansi-black"},{color:"187, 0, 0",class:"ansi-red"},{color:"0, 187, 0",class:"ansi-green"},{color:"187, 187, 0",class:"ansi-yellow"},{color:"0, 0, 187",class:"ansi-blue"},{color:"187, 0, 187",class:"ansi-magenta"},{color:"0, 187, 187",class:"ansi-cyan"},{color:"255,255,255",class:"ansi-white"}],[{color:"85, 85, 85",class:"ansi-bright-black"},{color:"255, 85, 85",class:"ansi-bright-red"},{color:"0, 255, 0",class:"ansi-bright-green"},{color:"255, 255, 85",class:"ansi-bright-yellow"},{color:"85, 85, 255",class:"ansi-bright-blue"},{color:"255, 85, 255",class:"ansi-bright-magenta"},{color:"85, 255, 255",class:"ansi-bright-cyan"},{color:"255, 255, 255",class:"ansi-bright-white"}]],n=/(https?:\/\/(?:[A-Za-z0-9#;/?:@=+$',_.!~*()[\]-]|&amp;|%[A-Fa-f0-9]{2})+)/gm;class i{static escapeForHtml(t){return(new i).escapeForHtml(t)}static linkify(t){return(new i).linkify(t)}static ansiToHtml(t,e){return(new i).ansiToHtml(t,e)}static ansiToJson(t,e){return(new i).ansiToJson(t,e)}static ansiToText(t){return(new i).ansiToText(t)}constructor(){this.fg=this.bg=this.fg_truecolor=this.bg_truecolor=null,this.bright=0,this.decorations=[]}setupPalette(){this.PALETTE_COLORS=[];for(let t=0;t<2;++t)for(let n=0;n<8;++n)this.PALETTE_COLORS.push(e[t][n].color);let t=[0,95,135,175,215,255],n=(e,n,i)=>t[e]+", "+t[n]+", "+t[i];for(let t=0;t<6;++t)for(let e=0;e<6;++e)for(let i=0;i<6;++i)this.PALETTE_COLORS.push(n(t,e,i));let i=8;for(let t=0;t<24;++t,i+=10)this.PALETTE_COLORS.push(i+", "+i+", "+i)}escapeForHtml(t){return t.replace(/[&<>\"]/gm,t=>"&"==t?"&amp;":'"'==t?"&quot;":"<"==t?"&lt;":">"==t?"&gt;":"")}linkify(t){return t.replace(n,t=>`<a href="${t}">${t}</a>`)}ansiToHtml(t,e){return this.process(t,e,!0)}ansiToJson(t,e){return(e=e||{}).json=!0,e.clearLine=!1,this.process(t,e,!0)}ansiToText(t){return this.process(t,{},!1)}process(t,e,n){let i=this,r=t.split(/\033\[/),s=r.shift();null==e&&(e={}),e.clearLine=/\r/.test(t);let o=r.map(t=>this.processChunk(t,e,n));if(e&&e.json){let t=i.processChunkJson("");return t.content=s,t.clearLine=e.clearLine,o.unshift(t),e.remove_empty&&(o=o.filter(t=>!t.isEmpty())),o}return o.unshift(s),o.join("")}processChunkJson(t,n,i){let r=(n=void 0===n?{}:n).use_classes=void 0!==n.use_classes&&n.use_classes,s=n.key=r?"class":"color",o={content:t,fg:null,bg:null,fg_truecolor:null,bg_truecolor:null,isInverted:!1,clearLine:n.clearLine,decoration:null,decorations:[],was_processed:!1,isEmpty:()=>!o.content},a=t.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);if(!a)return o;o.content=a[4];let l=a[2].split(";");if(""!==a[1]||"m"!==a[3])return o;if(!i)return o;let d=this;for(;l.length>0;){let t=l.shift(),n=parseInt(t);if(isNaN(n)||0===n)d.fg=d.bg=null,d.decorations=[];else if(1===n)d.decorations.push("bold");else if(2===n)d.decorations.push("dim");else if(3===n)d.decorations.push("italic");else if(4===n)d.decorations.push("underline");else if(5===n)d.decorations.push("blink");else if(7===n)d.decorations.push("reverse");else if(8===n)d.decorations.push("hidden");else if(9===n)d.decorations.push("strikethrough");else if(21===n)d.removeDecoration("bold");else if(22===n)d.removeDecoration("bold"),d.removeDecoration("dim");else if(23===n)d.removeDecoration("italic");else if(24===n)d.removeDecoration("underline");else if(25===n)d.removeDecoration("blink");else if(27===n)d.removeDecoration("reverse");else if(28===n)d.removeDecoration("hidden");else if(29===n)d.removeDecoration("strikethrough");else if(39===n)d.fg=null;else if(49===n)d.bg=null;else if(n>=30&&n<38)d.fg=e[0][n%10][s];else if(n>=90&&n<98)d.fg=e[1][n%10][s];else if(n>=40&&n<48)d.bg=e[0][n%10][s];else if(n>=100&&n<108)d.bg=e[1][n%10][s];else if(38===n||48===n){let t=38===n;if(l.length>=1){let n=l.shift();if("5"===n&&l.length>=1){let n=parseInt(l.shift());if(n>=0&&n<=255)if(r){let i=n>=16?"ansi-palette-"+n:e[n>7?1:0][n%8].class;t?d.fg=i:d.bg=i}else this.PALETTE_COLORS||d.setupPalette(),t?d.fg=this.PALETTE_COLORS[n]:d.bg=this.PALETTE_COLORS[n]}else if("2"===n&&l.length>=3){let e=parseInt(l.shift()),n=parseInt(l.shift()),i=parseInt(l.shift());if(e>=0&&e<=255&&n>=0&&n<=255&&i>=0&&i<=255){let s=e+", "+n+", "+i;r?t?(d.fg="ansi-truecolor",d.fg_truecolor=s):(d.bg="ansi-truecolor",d.bg_truecolor=s):t?d.fg=s:d.bg=s}}}}}return null===d.fg&&null===d.bg&&0===d.decorations.length||(o.fg=d.fg,o.bg=d.bg,o.fg_truecolor=d.fg_truecolor,o.bg_truecolor=d.bg_truecolor,o.decorations=d.decorations,o.decoration=d.decorations.slice(-1).pop()||null,o.was_processed=!0),o}processChunk(t,n,i){n=n||{};let r=this.processChunkJson(t,n,i),s=n.use_classes;if(r.decorations=r.decorations.filter(t=>{if("reverse"===t){r.fg||(r.fg=e[0][7][s?"class":"color"]),r.bg||(r.bg=e[0][0][s?"class":"color"]);let t=r.fg;r.fg=r.bg,r.bg=t;let n=r.fg_truecolor;return r.fg_truecolor=r.bg_truecolor,r.bg_truecolor=n,r.isInverted=!0,!1}return!0}),n.json)return r;if(r.isEmpty())return"";if(!r.was_processed)return r.content;let o=[],a=[],l=[],d={},c=t=>{let e,n=[];for(e in t)t.hasOwnProperty(e)&&n.push("data-"+e+'="'+this.escapeForHtml(t[e])+'"');return n.length>0?" "+n.join(" "):""};return r.isInverted&&(d["ansi-is-inverted"]="true"),r.fg&&(s?(o.push(r.fg+"-fg"),null!==r.fg_truecolor&&(d["ansi-truecolor-fg"]=r.fg_truecolor,r.fg_truecolor=null)):o.push("color:rgb("+r.fg+")")),r.bg&&(s?(o.push(r.bg+"-bg"),null!==r.bg_truecolor&&(d["ansi-truecolor-bg"]=r.bg_truecolor,r.bg_truecolor=null)):o.push("background-color:rgb("+r.bg+")")),r.decorations.forEach(t=>{s?a.push("ansi-"+t):"bold"===t?a.push("font-weight:bold"):"dim"===t?a.push("opacity:0.5"):"italic"===t?a.push("font-style:italic"):"hidden"===t?a.push("visibility:hidden"):"strikethrough"===t?l.push("line-through"):l.push(t)}),l.length&&a.push("text-decoration:"+l.join(" ")),s?'<span class="'+o.concat(a).join(" ")+'"'+c(d)+">"+r.content+"</span>":'<span style="'+o.concat(a).join(";")+'"'+c(d)+">"+r.content+"</span>"}removeDecoration(t){const e=this.decorations.indexOf(t);e>=0&&this.decorations.splice(e,1)}}t.exports=i}};const e={};function n(i){const r=e[i];if(void 0!==r)return r.exports;const s=e[i]={exports:{}};return t[i](s,s.exports,n),s.exports}n.r=t=>{Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i,r;n.r({}),void 0===Math.imul&&(Math.imul=function(t,e){return(4294901760&t)*(65535&e)+(65535&t)*(0|e)|0}),void 0===ArrayBuffer.isView&&(ArrayBuffer.isView=function(t){return null!=t&&null!=t.__proto__&&t.__proto__.__proto__===Int8Array.prototype.__proto__}),void 0===Array.prototype.fill&&Object.defineProperty(Array.prototype,"fill",{value:function(t){if(null==this)throw new TypeError("this is null or not defined");for(var e=Object(this),n=e.length>>>0,i=0|arguments[1],r=i<0?Math.max(n+i,0):Math.min(i,n),s=arguments[2],o=void 0===s?n:0|s,a=o<0?Math.max(n+o,0):Math.min(o,n);r<a;)e[r]=t,r++;return e}}),[Int8Array,Int16Array,Uint16Array,Int32Array,Float32Array,Float64Array].forEach(function(t){void 0===t.prototype.fill&&Object.defineProperty(t.prototype,"fill",{value:Array.prototype.fill})}),void 0===Math.clz32&&(Math.clz32=(i=Math.log,r=Math.LN2,function(t){var e=t>>>0;return 0===e?32:31-(i(e)/r|0)|0})),void 0===String.prototype.startsWith&&Object.defineProperty(String.prototype,"startsWith",{value:function(t,e){return e=e||0,this.lastIndexOf(t,e)===e}});var s,o,a,l,d,c,h,u,p,v,_,f,g,m,b,y,w,x,C,k,A,E,S,z,O,T,L,I,$,M,N,P,j=Math.imul,B=ArrayBuffer.isView,D=Math.clz32;class R{}class F{}class q{constructor(t){this.l1_1=t}s(){return this.l1_1.s()}}class H{}class V{}class U{}class W{}class K{}class G{}class J{}class Z{constructor(t,e){this.w1_1=t,this.x1_1=e}y1(t){return An(this.x1_1,t.x1_1)}z1(t){return this.y1(t instanceof Z?t:Dn())}equals(t){return this===t}hashCode(){return zn(this)}toString(){return this.w1_1}}class X{constructor(){s=this,this.a2_1=new Y(0,-2147483648),this.b2_1=new Y(-1,2147483647),this.c2_1=8,this.d2_1=64}}class Y extends F{constructor(t,e){s===C&&new X,super(),this.e2_1=t,this.f2_1=e}g2(t){return Ye(this,t)}z1(t){return this.g2(t instanceof Y?t:Dn())}toString(){return en(this,10)}equals(t){return t instanceof Y&&nn(this,t)}hashCode(){return function(t){return mn(),t.e2_1^t.f2_1}(this)}valueOf(){return tn(this)}}class Q{}class tt{}class et{toString(){return"kotlin.Unit"}}class nt{static c3(t){return Nn(this,t)}m1(t){var e;t:if(ti(this,V)&&this.a1())e=!1;else{for(var n=this.s();n.t();)if(Ln(n.u(),t)){e=!0;break t}e=!1}return e}n1(t){var e;t:if(ti(t,V)&&t.a1())e=!0;else{for(var n=t.s();n.t();){var i=n.u();if(!this.m1(i)){e=!1;break t}}e=!0}return e}a1(){return 0===this.c1()}toString(){return Se(this,", ","[","]",C,C,(t=this,e=>e===t?"(this Collection)":Re(e)));var t}toArray(){return si(this)}}class it extends nt{static b3(){return this.c3()}e1(t){this.d3();for(var e=!1,n=t.s();n.t();){var i=n.u();this.z(i)&&(e=!0)}return e}toJSON(){return this.toArray()}d3(){}}class rt{constructor(t){this.g3_1=t,this.e3_1=0,this.f3_1=-1}t(){return this.e3_1<this.g3_1.c1()}u(){if(!this.t())throw Nt.h3();var t=this.e3_1;return this.e3_1=t+1|0,this.f3_1=t,this.g3_1.b1(this.f3_1)}}class st extends it{static j3(){var t=this.b3();return t.i3_1=0,t}z(t){return this.d3(),this.k3(this.c1(),t),!0}s(){return new rt(this)}m1(t){return this.l3(t)>=0}l3(t){var e;t:{for(var n=0,i=this.s();i.t();){if(Ln(i.u(),t)){e=n;break t}n=n+1|0}e=-1}return e}equals(t){return t===this||!(null==t||!ti(t,W))&&S.n3(this,t)}hashCode(){return S.o3(this)}}class ot{static w3(){var t=Nn(this);return t.u3_1=null,t.v3_1=null,t}q1(t){return!(null==Ri(this,t))}r1(t){var e,n=this.v1();t:if(ti(n,V)&&n.a1())e=!1;else{for(var i=n.s();i.t();)if(Ln(i.u().p1(),t)){e=!0;break t}e=!1}return e}e4(t){if(null==t||!ti(t,K))return!1;var e=t.o1(),n=t.p1(),i=(ti(this,G)?this:Dn()).s1(e);return!(!Ln(n,i)||null==i&&!(ti(this,G)?this:Dn()).q1(e))}equals(t){if(t===this)return!0;if(null==t||!ti(t,G))return!1;if(this.c1()!==t.c1())return!1;var e,n=t.v1();t:if(ti(n,V)&&n.a1())e=!0;else{for(var i=n.s();i.t();){var r=i.u();if(!this.e4(r)){e=!1;break t}}e=!0}return e}s1(t){var e=Ri(this,t);return null==e?null:e.p1()}hashCode(){return In(this.v1())}a1(){return 0===this.c1()}c1(){return this.v1().c1()}t1(){return null==this.u3_1&&(this.u3_1=ie.s9(this)),Rn(this.u3_1)}toString(){var t;return Se(this.v1(),", ","{","}",C,C,(t=this,e=>{return Di(n=t,(i=e).o1())+"="+Di(n,i.p1());var n,i}))}u1(){return null==this.v3_1&&(this.v3_1=re.v9(this)),Rn(this.v3_1)}}class at extends ot{static t3(){var t=this.w3();return t.r3_1=null,t.s3_1=null,t}x3(){return gt.z3(this)}a4(){return bt.c4(this)}t1(){var t,e=this.r3_1;if(null==e){var n=this.x3();this.r3_1=n,t=n}else t=e;return t}u1(){var t,e=this.s3_1;if(null==e){var n=this.a4();this.s3_1=n,t=n}else t=e;return t}d3(){}}class lt extends it{static f4(){return this.b3()}equals(t){return t===this||!(null==t||!ti(t,U))&&z.g4(this,t)}hashCode(){return z.h4(this)}}class dt{constructor(){A=this;var t=ct.y(0);t.x_1=!0,this.i4_1=t}}class ct extends st{constructor(t){return new.target.a3(t)}static a3(t){ci();var e=this.j3();return e.w_1=t,e.x_1=!1,e}static i1(){return ci(),this.a3([])}static y(t){ci();var e=this.a3([]);if(!(t>=0)){var n="Negative initial capacity: "+t;throw Mt.r(Tn(n))}return e}static d1(t){ci();var e=ii(t);return this.a3(e)}c1(){return this.w_1.length}b1(t){return this.w_1[function(t,e){return S.j4(e,t.c1()),e}(this,t)]}z(t){return this.d3(),this.w_1.push(t),this.i3_1=this.i3_1+1|0,!0}k3(t,e){this.d3(),this.w_1.splice(function(t,e){return S.k4(e,t.c1()),e}(this,t),0,e),this.i3_1=this.i3_1+1|0}e1(t){if(this.d3(),t.a1())return!1;for(var e,n,i,r=(e=this,n=t.c1(),i=e.c1(),e.w_1.length=e.c1()+n|0,i),s=0,o=t.s();o.t();){var a=o.u(),l=s;s=l+1|0;var d=ri(l);this.w_1[r+d|0]=a}return this.i3_1=this.i3_1+1|0,!0}l3(t){return function(t,e){if(null==e){var n=0,i=t.length-1|0;if(n<=i)do{var r=n;if(n=n+1|0,null==t[r])return r}while(n<=i)}else{var s=0,o=t.length-1|0;if(s<=o)do{var a=s;if(s=s+1|0,Ln(e,t[a]))return a}while(s<=o)}return-1}(this.w_1,t)}toString(){return Ee(this.w_1,", ","[","]",C,C,kn)}l4(){return[].slice.call(this.w_1)}toArray(){return this.l4()}d3(){if(this.x_1)throw $t.p4()}}class ht extends at{static w4(t){var e=this.t3();return e.v4_1=null,e.u4_1=t,e}static x4(){return this.w4(zt.i5())}static j5(t,e){return this.w4(zt.k5(t,e))}static l5(t){return this.j5(t,1)}q1(t){return this.u4_1.m5(t)}r1(t){return this.u4_1.r1(t)}x3(){return ut.o5(this.u4_1)}a4(){return pt.q5(this.u4_1)}v1(){var t,e=this.v4_1;if(null==e){var n=_t.s5(this.u4_1);this.v4_1=n,t=n}else t=e;return t}s1(t){return this.u4_1.s1(t)}d4(t,e){return this.u4_1.d4(t,e)}c1(){return this.u4_1.c1()}}class ut extends lt{constructor(t){return new.target.o5(t)}static o5(t){var e=this.f4();return e.n5_1=t,e}c1(){return this.n5_1.c1()}a1(){return 0===this.n5_1.c1()}m1(t){return this.n5_1.m5(t)}z(t){throw $t.p4()}e1(t){throw $t.p4()}s(){return this.n5_1.t5()}d3(){return this.n5_1.u5()}}class pt extends it{constructor(t){return new.target.q5(t)}static q5(t){var e=this.b3();return e.p5_1=t,e}c1(){return this.p5_1.c1()}a1(){return 0===this.p5_1.c1()}v5(t){return this.p5_1.r1(t)}m1(t){return this.v5(t)}w5(t){throw $t.p4()}z(t){return this.w5(t)}x5(t){throw $t.p4()}e1(t){return this.x5(t)}s(){return this.p5_1.y5()}d3(){return this.p5_1.u5()}}class vt extends lt{static a6(t){var e=this.f4();return e.z5_1=t,e}c1(){return this.z5_1.c1()}a1(){return 0===this.z5_1.c1()}c6(t){return this.z5_1.e6(t)}m1(t){return!(null==t||!ti(t,K))&&this.c6(null!=t&&ti(t,K)?t:Dn())}d6(t){throw $t.p4()}z(t){return this.d6(null!=t&&ti(t,K)?t:Dn())}e1(t){throw $t.p4()}n1(t){return this.z5_1.f6(t)}d3(){return this.z5_1.u5()}}class _t extends vt{constructor(t){return new.target.s5(t)}static s5(t){return this.a6(t)}s(){return this.z5_1.b6()}}class ft{constructor(t){this.g6_1=t}t(){return this.g6_1.t()}u(){return this.g6_1.u().o1()}}class gt extends lt{constructor(t){return new.target.z3(t)}static z3(t){var e=this.f4();return e.y3_1=t,e}h6(t){throw $t.i6("Add is not supported on keys")}z(t){return this.h6(t)}m5(t){return this.y3_1.q1(t)}m1(t){return this.m5(t)}s(){var t=this.y3_1.v1().s();return new ft(t)}c1(){return this.y3_1.c1()}d3(){return this.y3_1.d3()}}class mt{constructor(t){this.j6_1=t}t(){return this.j6_1.t()}u(){return this.j6_1.u().p1()}}class bt extends it{constructor(t){return new.target.c4(t)}static c4(t){var e=this.b3();return e.b4_1=t,e}w5(t){throw $t.i6("Add is not supported on values")}z(t){return this.w5(t)}v5(t){return this.b4_1.r1(t)}m1(t){return this.v5(t)}s(){var t=this.b4_1.v1().s();return new mt(t)}c1(){return this.b4_1.c1()}d3(){return this.b4_1.d3()}}class yt extends lt{static l6(t){var e=this.f4();return e.k6_1=t,e}static m6(){return this.l6(zt.i5())}static n6(t){for(var e=this.l6(zt.o6(t.c1())),n=t.s();n.t();){var i=n.u();e.k6_1.d4(i,!0)}return e}z(t){return null==this.k6_1.d4(t,!0)}m1(t){return this.k6_1.m5(t)}a1(){return 0===this.k6_1.c1()}s(){return this.k6_1.t5()}c1(){return this.k6_1.c1()}}class wt{constructor(){this.a7_1=-1640531527,this.b7_1=8,this.c7_1=2,this.d7_1=-1}}class xt{constructor(t){this.e7_1=t,this.f7_1=0,this.g7_1=-1,this.h7_1=this.e7_1.f5_1,this.i7()}i7(){for(;this.f7_1<this.e7_1.d5_1&&this.e7_1.a5_1[this.f7_1]<0;)this.f7_1=this.f7_1+1|0}t(){return this.f7_1<this.e7_1.d5_1}j7(){if(this.e7_1.f5_1!==this.h7_1)throw Bt.k7()}}class Ct extends xt{u(){if(this.j7(),this.f7_1>=this.e7_1.d5_1)throw Nt.h3();var t=this.f7_1;this.f7_1=t+1|0,this.g7_1=t;var e=this.e7_1.y4_1[this.g7_1];return this.i7(),e}}class kt extends xt{u(){if(this.j7(),this.f7_1>=this.e7_1.d5_1)throw Nt.h3();var t=this.f7_1;this.f7_1=t+1|0,this.g7_1=t;var e=Rn(this.e7_1.z4_1)[this.g7_1];return this.i7(),e}}class At extends xt{u(){if(this.j7(),this.f7_1>=this.e7_1.d5_1)throw Nt.h3();var t=this.f7_1;this.f7_1=t+1|0,this.g7_1=t;var e=new Et(this.e7_1,this.g7_1);return this.i7(),e}x7(){if(this.f7_1>=this.e7_1.d5_1)throw Nt.h3();var t=this.f7_1;this.f7_1=t+1|0,this.g7_1=t;var e=this.e7_1.y4_1[this.g7_1],n=(null==e?null:In(e))??0,i=Rn(this.e7_1.z4_1)[this.g7_1],r=n^((null==i?null:In(i))??0);return this.i7(),r}y7(t){if(this.f7_1>=this.e7_1.d5_1)throw Nt.h3();var e=this.f7_1;this.f7_1=e+1|0,this.g7_1=e;var n=this.e7_1.y4_1[this.g7_1];Ln(n,this.e7_1)?t.a8("(this Map)"):t.z7(n),t.b8(61);var i=Rn(this.e7_1.z4_1)[this.g7_1];Ln(i,this.e7_1)?t.a8("(this Map)"):t.z7(i),this.i7()}}class Et{constructor(t,e){this.t6_1=t,this.u6_1=e,this.v6_1=this.t6_1.f5_1}o1(){return pi(this),this.t6_1.y4_1[this.u6_1]}p1(){return pi(this),Rn(this.t6_1.z4_1)[this.u6_1]}equals(t){return!(null==t||!ti(t,K)||!Ln(t.o1(),this.o1()))&&Ln(t.p1(),this.p1())}hashCode(){var t=this.o1(),e=(null==t?null:In(t))??0,n=this.p1();return e^((null==n?null:In(n))??0)}toString(){return Re(this.o1())+"="+Re(this.p1())}}class St{}class zt{constructor(t,e,n,i,r,s){return new.target.c8(t,e,n,i,r,s)}static c8(t,e,n,i,r,s){var o=Nn(this);return o.y4_1=t,o.z4_1=e,o.a5_1=n,o.b5_1=i,o.c5_1=r,o.d5_1=s,o.e5_1=ui(0,_i(o)),o.f5_1=0,o.g5_1=0,o.h5_1=!1,o}c1(){return this.g5_1}static i5(){return this.o6(8)}static o6(t){return this.c8(ai(t),null,new Int32Array(t),new Int32Array(hi(0,t)),2,0)}static k5(t,e){var n=this.o6(t);if(!(e>0)){var i="Non-positive load factor: "+e;throw Mt.r(Tn(i))}return n}r1(t){return function(t,e){for(var n=t.d5_1;(n=n-1|0)>=0;)if(t.a5_1[n]>=0&&Ln(Rn(t.z4_1)[n],e))return n;return-1}(this,t)>=0}s1(t){var e=xi(this,t);return e<0?null:Rn(this.z4_1)[e]}m5(t){return xi(this,t)>=0}d4(t,e){var n=function(t,e){t.u5();t:for(;;)for(var n=mi(t,e),i=Ne(j(t.c5_1,2),_i(t)/2|0),r=0;;){var s=t.b5_1[n];if(0===s){if(t.d5_1>=vi(t)){gi(t,1);continue t}var o=t.d5_1;t.d5_1=o+1|0;var a=o;return t.y4_1[a]=e,t.a5_1[a]=n,t.b5_1[n]=a+1|0,t.g5_1=t.g5_1+1|0,fi(t),r>t.c5_1&&(t.c5_1=r),a}if(Ln(t.y4_1[s-1|0],e))return 0|-s;if((r=r+1|0)>i){yi(t,j(_i(t),2));continue t}var l=n;n=l-1|0,0===l&&(n=_i(t)-1|0)}}(this,t),i=function(t){var e=t.z4_1;if(null!=e)return e;var n=ai(vi(t));return t.z4_1=n,n}(this);if(n<0){var r=i[(0|-n)-1|0];return i[(0|-n)-1|0]=e,r}return i[n]=e,null}equals(t){var e,n;return t===this?e=!0:(n=!(null==t||!ti(t,G))&&function(t,e){return t.g5_1===e.c1()&&t.f6(e.v1())}(this,t),e=n),e}hashCode(){for(var t=0,e=this.b6();e.t();)t=t+e.x7()|0;return t}toString(){var t=Gt.d8(2+j(this.g5_1,3)|0);t.a8("{");for(var e=0,n=this.b6();n.t();)e>0&&t.a8(", "),n.y7(t),e=e+1|0;return t.a8("}"),t.toString()}u5(){if(this.h5_1)throw $t.p4()}e6(t){var e=xi(this,t.o1());return!(e<0)&&Ln(Rn(this.z4_1)[e],t.p1())}e8(t){return this.e6(ti(t,K)?t:Dn())}t5(){return new Ct(this)}y5(){return new kt(this)}b6(){return new At(this)}}class Ot extends ht{static l8(){return this.x4()}static m8(t){return this.l5(t)}d3(){return this.u4_1.u5()}}class Tt extends yt{static g1(){return this.m6()}static h1(t){return this.n6(t)}d3(){return this.k6_1.u5()}}class Lt extends Error{static r8(){var t=Pn(this,Error,[null]);return jn(t),Ei(t),t}static j2(t){var e=Pn(this,Error,[t]);return jn(e,t),Ei(e),e}}class It extends Lt{static n8(){var t=this.r8();return Ai(t),t}static y6(t){var e=this.j2(t);return Ai(e),e}}class $t extends It{static p4(){var t=this.n8();return Ci(t),t}static i6(t){var e=this.y6(t);return Ci(e),e}}class Mt extends It{static q8(){var t=this.n8();return ki(t),t}static r(t){var e=this.y6(t);return ki(e),e}}class Nt extends It{static h3(){var t=this.n8();return Si(t),t}static n(t){var e=this.y6(t);return Si(e),e}}class Pt extends It{static v8(){var t=this.n8();return zi(t),t}static w8(t){var e=this.y6(t);return zi(e),e}}class jt extends It{static x8(){var t=this.n8();return Oi(t),t}static n2(t){var e=this.y6(t);return Oi(e),e}}class Bt extends It{static k7(){var t=this.n8();return Ti(t),t}static s6(t){var e=this.y6(t);return Ti(e),e}}class Dt extends It{static b9(){var t=this.n8();return Li(t),t}static c9(t){var e=this.y6(t);return Li(e),e}}class Rt extends It{static d9(){var t=this.n8();return Ii(t),t}static g(t){var e=this.y6(t);return Ii(e),e}}class Ft extends It{static r2(){var t,e=this.n8();return Mn(t=e,t.q2_1),e}}class qt extends It{static v2(){var t,e=this.n8();return Mn(t=e,t.u2_1),e}}class Ht extends It{static z2(){var t,e=this.n8();return Mn(t=e,t.y2_1),e}}class Vt{equals(t){return!(t instanceof Wt)&&t instanceof Vt&&Ln(this.h9(),t.h9())&&this.i9()==t.i9()}hashCode(){var t=this.i9();return(null==t?null:$n(t))??0}toString(){return"class "+this.i9()}}class Ut extends Vt{constructor(t,e,n){super(),this.e9_1=t,this.f9_1=e,this.g9_1=n}h9(){return this.e9_1}i9(){return this.f9_1}}class Wt extends Vt{}class Kt{}class Gt{constructor(t){return new.target.j9(t)}static j9(t){var e=Nn(this);return e.h_1=t,e}static d8(t){return this.i()}static i(){return this.j9("")}a(){return this.h_1.length}b(t){var e=this.h_1;if(!(0<=t&&t<=(xn(e)-1|0)))throw Pt.w8("index: "+t+", length: "+this.a()+"}");return bn(e,t)}c(t,e){return Ni(this.h_1,t,e)}b8(t){return this.h_1=this.h_1+De(t),this}j(t){return this.h_1=this.h_1+Re(t),this}z7(t){return this.h_1=this.h_1+Re(t),this}a8(t){var e=this.h_1;return this.h_1=e+(t??"null"),this}toString(){return this.h_1}}class Jt{constructor(t){this.k9_1=t}l9(t,e){return this.k9_1(t,e)}compare(t,e){return this.l9(t,e)}h2(){return this.k9_1}equals(t){return!(null==t||!ti(t,tt))&&(!(null==t||!ti(t,Q))&&Ln(this.h2(),t.h2()))}hashCode(){return In(this.h2())}}class Zt{constructor(t){this.n9_1=t,this.m9_1=0}t(){return this.m9_1<this.n9_1.c1()}u(){if(!this.t())throw Nt.h3();var t=this.m9_1;return this.m9_1=t+1|0,this.n9_1.b1(t)}}class Xt{constructor(){this.m3_1=2147483639}j4(t,e){if(t<0||t>=e)throw Pt.w8("index: "+t+", size: "+e)}k4(t,e){if(t<0||t>e)throw Pt.w8("index: "+t+", size: "+e)}z6(t,e){var n=t+(t>>1)|0;return(n-e|0)<0&&(n=e),(n-2147483639|0)>0&&(n=e>2147483639?2147483647:2147483639),n}o3(t){for(var e=1,n=t.s();n.t();){var i=n.u();e=j(31,e)+((null==i?null:In(i))??0)|0}return e}n3(t,e){if(t.c1()!==e.c1())return!1;for(var n=e.s(),i=t.s();i.t();)if(!Ln(i.u(),n.u()))return!1;return!0}}class Yt extends nt{static o9(){return this.c3()}s(){return new Zt(this)}equals(t){return t===this||!(null==t||!ti(t,W))&&S.n3(this,t)}hashCode(){return S.o3(this)}}class Qt{constructor(t){this.p9_1=t}t(){return this.p9_1.t()}u(){return this.p9_1.u().o1()}}class te{constructor(t){this.q9_1=t}t(){return this.q9_1.t()}u(){return this.q9_1.u().p1()}}class ee{}class ne extends nt{static t9(t){return this.c3(t)}equals(t){return t===this||!(null==t||!ti(t,U))&&z.g4(this,t)}hashCode(){return z.h4(this)}}class ie extends ne{constructor(t){return new.target.s9(t)}static s9(t,e){return e===C&&(e={}),e.r9_1=t,this.t9(e)}m5(t){return this.r9_1.q1(t)}m1(t){return this.m5(t)}s(){var t=this.r9_1.v1().s();return new Qt(t)}c1(){return this.r9_1.c1()}}class re extends nt{constructor(t){return new.target.v9(t)}static v9(t,e){return e===C&&(e={}),e.u9_1=t,this.c3(e)}v5(t){return this.u9_1.r1(t)}m1(t){return this.v5(t)}s(){var t=this.u9_1.v1().s();return new te(t)}c1(){return this.u9_1.c1()}}class se{h4(t){for(var e=0,n=t.s();n.t();){var i=n.u();e=e+((null==i?null:In(i))??0)|0}return e}g4(t,e){return t.c1()===e.c1()&&t.n1(e)}}class oe{constructor(){O=this,this.w9_1=new Y(-1478467534,-1720727600)}equals(t){return!(null==t||!ti(t,W))&&t.a1()}hashCode(){return 1}toString(){return"[]"}c1(){return 0}a1(){return!0}x9(t){return!1}m1(t){return!1}b1(t){throw Pt.w8("Empty list doesn't contain element at index "+t+".")}s(){return T}}class ae{t(){return!1}u(){throw Nt.h3()}}class le{constructor(){L=this,this.ca_1=new Y(-888910638,1920087921)}equals(t){return!(null==t||!ti(t,G))&&t.a1()}hashCode(){return 0}toString(){return"{}"}c1(){return 0}a1(){return!0}da(t){return!1}q1(t){return this.da(t)}ea(t){return null}s1(t){return this.ea(t)}v1(){return Ji()}t1(){return Ji()}u1(){return Hi()}}class de{u(){return this.fa()}}class ce{constructor(){I=this,this.ga_1=new Y(1993859828,793161749)}equals(t){return!(null==t||!ti(t,U))&&t.a1()}hashCode(){return 0}toString(){return"[]"}c1(){return 0}a1(){return!0}ha(t){return t.a1()}n1(t){return this.ha(t)}s(){return T}}class he extends Yt{constructor(t){return new.target.ja(t)}static ja(t){var e=this.o9();return e.ia_1=t,e}c1(){return this.ia_1.length}b1(t){return S.j4(t,this.ia_1.length),this.ia_1[t]}ka(t){return null!==t&&(e=this.ia_1,(0<=(n=t.x1_1)&&n<=(e.length-1|0)?e[n]:null)===t);var e,n}m1(t){return t instanceof Z&&this.ka(t instanceof Z?t:Dn())}}class ue{constructor(){$=this,this.j1_1=new ve(1,0)}}class pe{constructor(t,e,n){if(0===n)throw Mt.r("Step must be non-zero.");if(-2147483648===n)throw Mt.r("Step must be greater than Int.MIN_VALUE to avoid overflow on negation.");this.pa_1=t,this.qa_1=function(t,e,n){var i;if(n>0)i=t>=e?e:e-Zi(e,t,n)|0;else{if(!(n<0))throw Mt.r("Step is zero.");i=t<=e?e:e+Zi(t,e,0|-n)|0}return i}(t,e,n),this.ra_1=n}s(){return new _e(this.pa_1,this.qa_1,this.ra_1)}a1(){return this.ra_1>0?this.pa_1>this.qa_1:this.pa_1<this.qa_1}equals(t){return t instanceof pe&&(this.a1()&&t.a1()||this.pa_1===t.pa_1&&this.qa_1===t.qa_1&&this.ra_1===t.ra_1)}hashCode(){return this.a1()?-1:j(31,j(31,this.pa_1)+this.qa_1|0)+this.ra_1|0}toString(){return this.ra_1>0?this.pa_1+".."+this.qa_1+" step "+this.ra_1:this.pa_1+" downTo "+this.qa_1+" step "+(0|-this.ra_1)}}class ve extends pe{constructor(t,e){Yi(),super(t,e,1)}oa(){return this.pa_1}sa(){return this.qa_1}a1(){return this.pa_1>this.qa_1}equals(t){return t instanceof ve&&(this.a1()&&t.a1()||this.pa_1===t.pa_1&&this.qa_1===t.qa_1)}hashCode(){return this.a1()?-1:j(31,this.pa_1)+this.qa_1|0}toString(){return this.pa_1+".."+this.qa_1}}class _e extends de{constructor(t,e,n){super(),this.ta_1=n,this.ua_1=e,this.va_1=this.ta_1>0?t<=e:t>=e,this.wa_1=this.va_1?t:this.ua_1}t(){return this.va_1}fa(){var t=this.wa_1;if(t===this.ua_1){if(!this.va_1)throw Nt.h3();this.va_1=!1}else this.wa_1=this.wa_1+this.ta_1|0;return t}}class fe{k1(t,e,n){return new pe(t,e,n)}}class ge{constructor(t){this.db_1=t,this.ya_1=-1,this.za_1=function(t,e,n){if(0>n)throw Mt.r("Cannot coerce value to an empty range: maximum "+n+" is less than minimum 0.");return t<0?0:t>n?n:t}(t.fb_1,0,xn(t.eb_1)),this.ab_1=this.za_1,this.bb_1=null,this.cb_1=0}u(){if(-1===this.ya_1&&lr(this),0===this.ya_1)throw Nt.h3();var t=this.bb_1,e=t instanceof ve?t:Dn();return this.bb_1=null,this.ya_1=-1,e}t(){return-1===this.ya_1&&lr(this),1===this.ya_1}}class me{constructor(t,e,n,i){this.eb_1=t,this.fb_1=e,this.gb_1=n,this.hb_1=i}s(){return new ge(this)}}class be{constructor(t){this.ib_1=t,this.jb_1=N}p1(){return this.jb_1===N&&(this.jb_1=Rn(this.ib_1)(),this.ib_1=null),this.jb_1}kb(){return!(this.jb_1===N)}toString(){return this.kb()?Re(this.p1()):"Lazy value not initialized yet."}}class ye{}class we{}class xe{constructor(t){this.lb_1=t}equals(t){return t instanceof xe&&Ln(this.lb_1,t.lb_1)}hashCode(){return In(this.lb_1)}toString(){return"Failure("+this.lb_1.toString()+")"}}class Ce{constructor(t,e){this.y9_1=t,this.z9_1=e}toString(){return"("+Re(this.y9_1)+", "+Re(this.z9_1)+")"}aa(){return this.y9_1}ba(){return this.z9_1}hashCode(){var t=null==this.y9_1?0:In(this.y9_1);return j(t,31)+(null==this.z9_1?0:In(this.z9_1))|0}equals(t){return this===t||t instanceof Ce&&!!Ln(this.y9_1,t.y9_1)&&!!Ln(this.z9_1,t.z9_1)}}class ke{constructor(t,e,n){this.mb_1=t,this.nb_1=e,this.ob_1=n}toString(){return"("+Re(this.mb_1)+", "+Re(this.nb_1)+", "+Re(this.ob_1)+")"}aa(){return this.mb_1}ba(){return this.nb_1}pb(){return this.ob_1}hashCode(){var t=null==this.mb_1?0:In(this.mb_1);return t=j(t,31)+(null==this.nb_1?0:In(this.nb_1))|0,j(t,31)+(null==this.ob_1?0:In(this.ob_1))|0}equals(t){return this===t||t instanceof ke&&!!Ln(this.mb_1,t.mb_1)&&!!Ln(this.nb_1,t.nb_1)&&!!Ln(this.ob_1,t.ob_1)}}function Ae(t){throw Rt.g("lateinit property "+t+" has not been initialized")}function Ee(t,e,n,i,r,s,o){return e=e===C?", ":e,n=n===C?"":n,i=i===C?"":i,r=r===C?-1:r,s=s===C?"...":s,o=o===C?null:o,function(t,e,n,i,r,s,o,a){n=n===C?", ":n,i=i===C?"":i,r=r===C?"":r,s=s===C?-1:s,o=o===C?"...":o,a=a===C?null:a,e.j(i);var l=0,d=0,c=t.length;t:for(;d<c;){var h=t[d];if(d=d+1|0,(l=l+1|0)>1&&e.j(n),!(s<0||l<=s))break t;Qi(e,h,a)}return s>=0&&l>s&&e.j(o),e.j(r),e}(t,Gt.i(),e,n,i,r,s,o).toString()}function Se(t,e,n,i,r,s,o){return e=e===C?", ":e,n=n===C?"":n,i=i===C?"":i,r=r===C?-1:r,s=s===C?"...":s,o=o===C?null:o,function(t,e,n,i,r,s,o,a){n=n===C?", ":n,i=i===C?"":i,r=r===C?"":r,s=s===C?-1:s,o=o===C?"...":o,a=a===C?null:a,e.j(i);var l=0,d=t.s();t:for(;d.t();){var c=d.u();if((l=l+1|0)>1&&e.j(n),!(s<0||l<=s))break t;Qi(e,c,a)}return s>=0&&l>s&&e.j(o),e.j(r),e}(t,Gt.i(),e,n,i,r,s,o).toString()}function ze(t,e){for(var n=t.s();n.t();){var i=n.u();e.z(i)}return e}function Oe(t){if(t.a1())throw Nt.n("List is empty.");return t.b1(0)}function Te(t){return t.a1()?null:t.b1(0)}function Le(t){var e;switch(t.c1()){case 0:throw Nt.n("List is empty.");case 1:e=t.b1(0);break;default:throw Mt.r("List has more than one element.")}return e}function Ie(t){return $e(function(t){return ti(t,V)?Tt.h1(t):ze(t,Tt.g1())}(t))}function $e(t){if(ti(t,V)){var e;switch(t.c1()){case 0:e=qi();break;case 1:e=oi(ti(t,W)?t.b1(0):t.s().u());break;default:e=Me(t)}return e}return function(t){switch(t.c1()){case 0:return qi();case 1:return oi(t.b1(0));default:return t}}(function(t){return ti(t,V)?Me(t):ze(t,ct.i1())}(t))}function Me(t){return ct.d1(t)}function Ne(t,e){return t>e?e:t}function Pe(t,e){return t<e?e:t}function je(t){return t}function Be(t,e){return t-e|0}function De(t){return String.fromCharCode(t)}function Re(t){return(null==t?null:Tn(t))??"null"}function Fe(t){var e=new Uint16Array(t);return e.$type$="CharArray",e}function qe(){return We(),o}function He(){return We(),a}function Ve(){return We(),l}function Ue(){return We(),d}function We(){h||(h=!0,o=new ArrayBuffer(8),a=new Float64Array(qe()),new Float32Array(qe()),l=new Int32Array(qe()),He()[0]=-1,d=0!==Ve()[0]?1:0,c=1-Ue()|0)}function Ke(){return mn(),u}function Ge(){return mn(),p}function Je(){return mn(),v}function Ze(){return mn(),f}function Xe(){return mn(),g}function Ye(t,e){if(mn(),nn(t,e))return 0;var n=sn(t),i=sn(e);return n&&!i?-1:!n&&i?1:sn(on(t,e))?-1:1}function Qe(t){return mn(),t.e2_1}function tn(t){return mn(),4294967296*t.f2_1+function(t){return mn(),t.e2_1>=0?t.e2_1:4294967296+t.e2_1}(t)}function en(t,e){if(mn(),an(t))return"0";if(sn(t)){if(nn(t,Ze())){var n=rn(e),i=vn(t,n),r=Qe(on(ln(i,n),t));return en(i,e)+r.toString(e)}return"-"+en(dn(t),e)}for(var s=2===e?31:e<=10?9:e<=21?7:e<=35?6:5,o=cn(Math.pow(e,s)),a=t,l="";;){var d=vn(a,o),c=Qe(on(a,ln(d,o))).toString(e);if(an(a=d))return c+l;for(;c.length<s;)c="0"+c;l=c+l}}function nn(t,e){return mn(),t.f2_1===e.f2_1&&t.e2_1===e.e2_1}function rn(t){return mn(),new Y(t,t<0?-1:0)}function sn(t){return mn(),t.f2_1<0}function on(t,e){return mn(),hn(t,dn(e))}function an(t){return mn(),0===t.f2_1&&0===t.e2_1}function ln(t,e){if(mn(),an(t))return Ke();if(an(e))return Ke();if(nn(t,Ze()))return un(e)?Ze():Ke();if(nn(e,Ze()))return un(t)?Ze():Ke();if(sn(t))return sn(e)?ln(dn(t),dn(e)):dn(ln(dn(t),e));if(sn(e))return dn(ln(t,dn(e)));if(pn(t,Xe())&&pn(e,Xe()))return cn(tn(t)*tn(e));var n=t.f2_1>>>16|0,i=65535&t.f2_1,r=t.e2_1>>>16|0,s=65535&t.e2_1,o=e.f2_1>>>16|0,a=65535&e.f2_1,l=e.e2_1>>>16|0,d=65535&e.e2_1,c=0,h=0,u=0,p=0;return u=u+((p=p+j(s,d)|0)>>>16|0)|0,p&=65535,h=(h=h+((u=u+j(r,d)|0)>>>16|0)|0)+((u=(u&=65535)+j(s,l)|0)>>>16|0)|0,u&=65535,c=(c=(c=c+((h=h+j(i,d)|0)>>>16|0)|0)+((h=(h&=65535)+j(r,l)|0)>>>16|0)|0)+((h=(h&=65535)+j(s,a)|0)>>>16|0)|0,h&=65535,c=c+(((j(n,d)+j(i,l)|0)+j(r,a)|0)+j(s,o)|0)|0,new Y(u<<16|p,(c&=65535)<<16|h)}function dn(t){return mn(),hn(function(t){return mn(),new Y(~t.e2_1,~t.f2_1)}(t),new Y(1,0))}function cn(t){if(mn(),(e=t)!=e)return Ke();if(t<=-0x8000000000000000)return Ze();if(t+1>=0x8000000000000000)return mn(),_;if(t<0)return dn(cn(-t));var e,n=4294967296;return new Y(t%n|0,t/n|0)}function hn(t,e){mn();var n=t.f2_1>>>16|0,i=65535&t.f2_1,r=t.e2_1>>>16|0,s=65535&t.e2_1,o=e.f2_1>>>16|0,a=65535&e.f2_1,l=e.e2_1>>>16|0,d=0,c=0,h=0,u=0;return d=(d=d+((c=(c=c+((h=(h=h+((u=u+(s+(65535&e.e2_1)|0)|0)>>>16|0)|0)+(r+l|0)|0)>>>16|0)|0)+(i+a|0)|0)>>>16|0)|0)+(n+o|0)|0,new Y((h&=65535)<<16|(u&=65535),(d&=65535)<<16|(c&=65535))}function un(t){return mn(),!(1&~t.e2_1)}function pn(t,e){return mn(),Ye(t,e)<0}function vn(t,e){if(mn(),an(e))throw Lt.j2("division by zero");if(an(t))return Ke();if(nn(t,Ze())){if(nn(e,Ge())||nn(e,Je()))return Ze();if(nn(e,Ze()))return Ge();var n=function(t){mn();return new Y(t.e2_1>>>1|t.f2_1<<31,t.f2_1>>1)}(t),i=function(t){mn();return new Y(t.e2_1<<1,t.f2_1<<1|t.e2_1>>>31)}(vn(n,e));return nn(i,Ke())?sn(e)?Ge():Je():hn(i,vn(on(t,ln(e,i)),e))}if(nn(e,Ze()))return Ke();if(sn(t))return sn(e)?vn(dn(t),dn(e)):dn(vn(dn(t),e));if(sn(e))return dn(vn(t,dn(e)));for(var r=Ke(),s=t;fn(s,e);){for(var o=tn(s)/tn(e),a=Math.max(1,Math.floor(o)),l=Math.ceil(Math.log(a)/Math.LN2),d=l<=48?1:Math.pow(2,l-48),c=cn(a),h=ln(c,e);sn(h)||_n(h,s);)h=ln(c=cn(a-=d),e);an(c)&&(c=Ge()),r=hn(r,c),s=on(s,h)}return r}function _n(t,e){return mn(),Ye(t,e)>0}function fn(t,e){return mn(),Ye(t,e)>=0}function gn(t){return mn(),null!=t&&function(t){return mn(),Yn(t)&&"LongArray"===t.$type$}(t)}function mn(){m||(m=!0,u=rn(0),p=rn(1),v=rn(-1),_=new Y(-1,2147483647),f=new Y(0,-2147483648),g=rn(16777216),new Ut(Array,"LongArray",gn))}function bn(t,e){return yn(t)?wn(t,e):t.b(e)}function yn(t){return"string"==typeof t}function wn(t,e){return t.charCodeAt(e)}function xn(t){return yn(t)?t.length:t.a()}function Cn(t,e,n){return yn(t)?Ni(t,e,n):t.c(e,n)}function kn(t){return Tn(t)}function An(t,e){var n;switch(typeof t){case"number":n="number"==typeof e?En(t,e):e instanceof Y?En(t,tn(e)):Sn(t,e);break;case"string":case"boolean":case"bigint":n=Sn(t,e);break;default:n=function(t,e){return t.z1(e)}(t,e)}return n}function En(t,e){var n;if(t<e)n=-1;else if(t>e)n=1;else if(t===e){var i;if(0!==t)i=0;else{var r=1/t;i=r===1/e?0:r<0?-1:1}n=i}else n=t!=t?e!=e?0:1:-1;return n}function Sn(t,e){return t<e?-1:t>e?1:0}function zn(t){if(!("kotlinHashCodeValue$"in t)){var e=On(),n=new Object;n.value=e,n.enumerable=!1,Object.defineProperty(t,"kotlinHashCodeValue$",n)}return t.kotlinHashCodeValue$}function On(){return 4294967296*Math.random()|0}function Tn(t){return null==t?"null":Xn(t)?"[...]":"function"!=typeof t.toString?function(t){return Object.prototype.toString.call(t)}(t):t.toString()}function Ln(t,e){if(null==t)return null==e;if(null==e)return!1;if("object"==typeof t&&"function"==typeof t.equals)return t.equals(e);if(t!=t)return e!=e;if("number"==typeof t&&"number"==typeof e){var n;if(t===e)n=0!==t||1/t==1/e;else n=!1;return n}return Qn(t)&&Qn(e)?t===e||t.$id==e.$id&&t.$flags==e.$flags&&t.$arity==e.$arity&&(null==t.$bound&&null==e.$bound||t.$bound===e.$bound||!(!Yn(t.$bound)||!Yn(e.$bound))&&function(t,e){var n=t,i=e;if(n===i)return!0;if(null==n||null==i||!Xn(i)||n.length!=i.length)return!1;var r=0,s=n.length;if(r<s)do{var o=r;if(r=r+1|0,!Ln(n[o],i[o]))return!1}while(r<s);return!0}(t.$bound,e.$bound)):t===e}function In(t){if(null==t)return 0;var e,n=typeof t;switch(n){case"object":e="function"==typeof t.hashCode?t.hashCode():zn(t);break;case"function":e=Qn(t)?function(t){var e=t.$flags;e=j(31,e)+In(t.$id)|0,e=j(31,e)+(t.$arity??-1)|0;var n=t.$bound;if(null!=n&&Yn(n)){var i=n;e=j(31,e)+function(t){var e=t;if(null==e)return 0;var n=1,i=0,r=e.length;if(i<r)do{var s=i;i=i+1|0,n=j(n,31)+In(e[s])|0}while(i<r);return n}(i)|0}return e}(t):zn(t);break;case"number":e=function(t){return We(),(0|t)===t?function(t){var e;return e=t instanceof Y?Qe(t):function(t){return t>2147483647?2147483647:t<-2147483648?-2147483648:0|t}(t),e}(t):(He()[0]=t,j(Ve()[We(),c],31)+Ve()[Ue()]|0)}(t);break;case"boolean":e=t?1231:1237;break;case"string":e=$n(String(t));break;case"bigint":e=function(t){for(var e,n=BigInt(32),i=BigInt(4294967295),r=(e=t)<0?-e:e,s=0,o=t<0?-1:1;0!=r;){var a=Number(r&i);s=j(31,s)+a|0,r>>=n}return j(s,o)}(t);break;case"symbol":e=function(t){var e,n=(e=t,Symbol.keyFor(e)!=C?(b===C&&(b=new Map),b):(y===C&&(y=new WeakMap),y)),i=n.get(t);if(i!==C)return i;var r=On();return n.set(t,r),r}(t);break;default:e=function(){throw new Error("Unexpected typeof `"+n+"`")}()}return e}function $n(t){var e=0,n=0,i=t.length-1|0;if(n<=i)do{var r=n;n=n+1|0;var s=t.charCodeAt(r);e=j(e,31)+s|0}while(r!==i);return e}function Mn(t,e){null!=Error.captureStackTrace?Error.captureStackTrace(t,e):t.stack=(new Error).stack}function Nn(t,e){var n=Object.create(t.prototype);return function(t,e){e!==C&&Object.assign(t,e)}(n,e),n}function Pn(t,e,n,i){var r;if(i===C)r=t;else{var s=class extends t{};Object.assign(s.prototype,i),s.constructor=t,r=s}var o=r;return Reflect.construct(e,n,o)}function jn(t,e,n){if(t.name=Object.getPrototypeOf(t).constructor.name,null==e){var i;if(e===C)i=(null==n?null:n.toString())??C;else i=C;t.message=i}}function Bn(){throw Ft.r2()}function Dn(){throw Ht.z2()}function Rn(t){var e;return null==t?function(){throw qt.v2()}():e=t,e}function Fn(t,e,n,i,r,s){return{kind:t,simpleName:e,associatedObjectKey:i,associatedObjects:r,suspendArity:s,$kClass$:C,defaultConstructor:n}}function qn(t,e,n,i,r,s,o,a){Hn("class",t,e,n,i,r,s,o,a)}function Hn(t,e,n,i,r,s,o,a,l){null!=r&&(e.prototype=Object.create(r.prototype),e.prototype.constructor=e);var d=Fn(t,n,i,a,l,o);e.$metadata$=d;var c=e.prototype;if(null!=s)for(var h=0,u=s.length;h<u;){var p=s[h];h=h+1|0,Object.assign(c,p.prototype),c[p.Symbol]=!0}"interface"===t&&(e.Symbol=Symbol())}function Vn(t,e,n,i,r,s,o,a){Hn("object",t,e,n,i,r,s,o,a)}function Un(t,e,n,i,r,s,o,a){Hn("interface",t,e,n,i,r,s,o,a)}function Wn(t,e,n,i){Vn(t,"Companion",C,e,n,i,C,C)}function Kn(t){var e=t.length,n=Array(e),i=0,r=e-1|0;if(i<=r)do{var s=i;i=i+1|0;var o=t[s];null!=o&&ei(o)?n[s]=o:n[s]=[].slice.call(o)}while(s!==r);return[].concat.apply([],n)}function Gn(t,e){return new ve(t,e)}function Jn(){return Zn(),Fn("class",C,C,C,C,C)}function Zn(){if(!x){x=!0;var t=[Jn(),Jn()],e=[Jn(),Jn()];w=[t,e,[Jn(),Jn()]]}}function Xn(t){return Yn(t)||B(t)}function Yn(t){return Array.isArray(t)}function Qn(t){return"function"==typeof t&&null!=t.$flags&&null!=t.$arity}function ti(t,e){return!0===t[e.Symbol]}function ei(t){return!!Yn(t)&&!t.$type$}function ni(t){return"string"==typeof t||ti(t,R)}function ii(t){return void 0!==t.toArray?t.toArray():si(t)}function ri(t){return t<0&&function(){throw Dt.c9("Index overflow has happened.")}(),t}function si(t){return function(t){if(t.a1())return[];for(var e=t.c1(),n=Array(e),i=t.s(),r=0;i.t();){var s=r;r=s+1|0,n[s]=i.u()}return n}(t)}function oi(t){var e=[t];return ct.a3(e)}function ai(t){if(!(t>=0))throw Mt.r(Tn("capacity must be non-negative."));return Array(t)}function li(t,e,n){t.fill(null,e,n)}function di(t,e){return function(t,e){if(!(e>=0)){var n="Invalid new array size: "+e+".";throw Mt.r(Tn(n))}return function(t,e){var n=t.slice(0,e);void 0!==t.$type$&&(n.$type$=t.$type$);var i=t.length;if(e>i)for(n.length=e;i<e;){var r=i;i=r+1|0,n[r]=null}return n}(t,e)}(t,e)}function ci(){return A===C&&new dt,A}function hi(t,e){return 0===(n=j(Pe(e,1),3))?0:1<<31-D(n);var n}function ui(t,e){return D(e)+1|0}function pi(t){if(t.t6_1.f5_1!==t.v6_1)throw Bt.s6("The backing map has been modified after this entry was obtained.")}function vi(t){return t.y4_1.length}function _i(t){return t.b5_1.length}function fi(t){t.f5_1=t.f5_1+1|0}function gi(t,e){!function(t,e){var n=vi(t)-t.d5_1|0,i=t.d5_1-t.c1()|0;return n<e&&(i+n|0)>=e&&i>=(vi(t)/4|0)}(t,e)?function(t,e){if(e<0)throw It.y6("too many elements");if(e>vi(t)){var n=S.z6(vi(t),e);t.y4_1=di(t.y4_1,n);var i=t,r=t.z4_1;i.z4_1=null==r?null:di(r,n),t.a5_1=function(t,e){if(!(e>=0)){var n="Invalid new array size: "+e+".";throw Mt.r(Tn(n))}var i,r=t.length;if(e<16||r<16)i=function(t,e){for(var n=t.length,i=e.length,r=0,s=e;r<n&&r<i;){var o=r,a=r;r=a+1|0,s[o]=t[a]}return e}(t,new Int32Array(e));else if(e>r){var s=new Int32Array(e);s.set(t),i=s}else i=t.slice(0,e);return i}(t.a5_1,n);var s=hi(0,n);s>_i(t)&&yi(t,s)}}(t,t.d5_1+e|0):bi(t,!0)}function mi(t,e){return null==e?0:j(In(e),-1640531527)>>>t.e5_1|0}function bi(t,e){for(var n=0,i=0,r=t.z4_1;n<t.d5_1;){var s=t.a5_1[n];s>=0&&(t.y4_1[i]=t.y4_1[n],null!=r&&(r[i]=r[n]),e&&(t.a5_1[i]=s,t.b5_1[s]=i+1|0),i=i+1|0),n=n+1|0}li(t.y4_1,i,t.d5_1),null==r||li(r,i,t.d5_1),t.d5_1=i}function yi(t,e){fi(t),t.d5_1>t.g5_1&&bi(t,!1),t.b5_1=new Int32Array(e),t.e5_1=ui(0,e);for(var n=0;n<t.d5_1;){var i=n;if(n=i+1|0,!wi(t,i))throw jt.n2("This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?")}}function wi(t,e){for(var n=mi(t,t.y4_1[e]),i=t.c5_1;;){if(0===t.b5_1[n])return t.b5_1[n]=e+1|0,t.a5_1[e]=n,!0;if((i=i-1|0)<0)return!1;var r=n;n=r-1|0,0===r&&(n=_i(t)-1|0)}}function xi(t,e){for(var n=mi(t,e),i=t.c5_1;;){var r=t.b5_1[n];if(0===r)return-1;if(Ln(t.y4_1[r-1|0],e))return r-1|0;if((i=i-1|0)<0)return-1;var s=n;n=s-1|0,0===s&&(n=_i(t)-1|0)}}function Ci(t){Mn(t,t.o4_1)}function ki(t){Mn(t,t.q_1)}function Ai(t){Mn(t,t.x6_1)}function Ei(t){Mn(t,t.i2_1)}function Si(t){Mn(t,t.m_1)}function zi(t){Mn(t,t.u8_1)}function Oi(t){Mn(t,t.m2_1)}function Ti(t){Mn(t,t.r6_1)}function Li(t){Mn(t,t.a9_1)}function Ii(t){Mn(t,t.f_1)}function $i(t){var e=De(t).toUpperCase();return e.length>1?t:wn(e,0)}function Mi(t){return function(t){return 9<=t&&t<=13||28<=t&&t<=32||160===t||t>4096&&(5760===t||8192<=t&&t<=8202||8232===t||8233===t||8239===t||8287===t||12288===t)}(t)}function Ni(t,e,n){return ji(),t.substring(e,n)}function Pi(t,e){return ji(),function(t,e,n){if(n=n!==C&&n,ji(),n){var i=t.length,r=e.length,s=Math.min(i,r);if(0===s)return i-r|0;var o=0;if(o<s)do{var a=o;o=o+1|0;var l=wn(t,a),d=wn(e,a);if(l!==d&&(l=$i(l))!==(d=$i(d))&&(l=wn(De(l).toLowerCase(),0))!==(d=wn(De(d).toLowerCase(),0)))return Be(l,d)}while(o<s);return i-r|0}return An(t,e)}(t,e,!0)}function ji(){E||(E=!0,new Jt(Pi))}function Bi(t,e,n,i,r,s){return rr(t,e,n,i,r,s=s!==C&&s)}function Di(t,e){return e===t?"(this Map)":Re(e)}function Ri(t,e){var n;t:{for(var i=t.v1().s();i.t();){var r=i.u();if(Ln(r.o1(),e)){n=r;break t}}n=null}return n}function Fi(t){return t.length>0?(e=t,ct.a3(e)):qi();var e}function qi(){return Hi()}function Hi(){return O===C&&new oe,O}function Vi(t,e){return ti(t,V)?t.c1():e}function Ui(t){return t.length>0?Wi(t,Ot.m8(t.length)):Ki()}function Wi(t,e){return function(t,e){for(var n=0,i=e.length;n<i;){var r=e[n];n=n+1|0;var s=r.aa(),o=r.ba();t.d4(s,o)}}(e,t),e}function Ki(){var t=(L===C&&new le,L);return ti(t,G)?t:Dn()}function Gi(t,e){if(ti(e,V))return t.e1(e);for(var n=!1,i=e.s();i.t();){var r=i.u();t.z(r)&&(n=!0)}return n}function Ji(){return I===C&&new ce,I}function Zi(t,e,n){return Xi(Xi(t,n)-Xi(e,n)|0,n)}function Xi(t,e){var n=t%e|0;return n>=0?n:n+e|0}function Yi(){return $===C&&new ue,$}function Qi(t,e,n){null!=n?t.j(n(e)):null==e||ni(e)?t.j(e):e instanceof H?t.b8(e.xa_1):t.j(Tn(e))}function tr(t,e,n){if(t===e)return!0;if(!(n=n!==C&&n))return!1;var i=$i(t),r=$i(e);return i===r||wn(De(i).toLowerCase(),0)===wn(De(r).toLowerCase(),0)}function er(t){if(!(t>=0)){var e="Limit must be non-negative, but was "+t;throw Mt.r(Tn(e))}return k}function nr(t){return xn(t)-1|0}function ir(t,e,n,i){var r;return n=n===C?0:n,r=(i=i!==C&&i)||"string"!=typeof t?function(t,e,n,i,r,s){var o=(s=s!==C&&s)?function(t,e){return M.k1(t,e,-1)}(Ne(n,nr(t)),Pe(i,0)):Gn(Pe(n,0),Ne(i,xn(t)));if("string"==typeof t&&"string"==typeof e){var a=o.pa_1,l=o.qa_1,d=o.ra_1;if(d>0&&a<=l||d<0&&l<=a)do{var c=a;if(a=a+d|0,Bi(e,0,t,c,e.length,r))return c}while(c!==l)}else{var h=o.pa_1,u=o.qa_1,p=o.ra_1;if(p>0&&h<=u||p<0&&u<=h)do{var v=h;if(h=h+p|0,rr(e,0,t,v,xn(e),r))return v}while(v!==u)}return-1}(t,e,n,xn(t),i):t.indexOf(e,n),r}function rr(t,e,n,i,r,s){if(i<0||e<0||e>(xn(t)-r|0)||i>(xn(n)-r|0))return!1;var o=0;if(o<r)do{var a=o;if(o=o+1|0,!tr(bn(t,e+a|0),bn(n,i+a|0),s))return!1}while(o<r);return!0}function sr(t,e){return function(t,e,n){return!!(!(n=n!==C&&n)&&"string"==typeof t)&&"string"==typeof e?function(t,e,n){return(n=n!==C&&n)?Bi(t,0,e,0,e.length,n):t.startsWith(e,0)}(t,e):rr(t,0,e,0,xn(e),n)}(t,e)?function(t,e){return ji(),t.substring(e)}(t,xn(e)):t}function or(t,e,n,i){if(n=n!==C&&n,i=i===C?0:i,1===e.length)return function(t,e,n,i){er(i);var r=0,s=ir(t,e,r,n);if(-1===s||1===i)return oi(Tn(t));var o=i>0,a=ct.y(o?Ne(i,10):10);t:do{var l=Tn(Cn(t,r,s));if(a.z(l),r=s+e.length|0,o&&a.c1()===(i-1|0))break t;s=ir(t,e,r,n)}while(-1!==s);var d=Tn(Cn(t,r,xn(t)));return a.z(d),a}(t,De(e[0]),n,i);for(var r=function(t){return new q(t)}(function(t,e,n,i,r){return n=n===C?0:n,i=i!==C&&i,er(r=r===C?0:r),new me(t,n,r,(s=e,o=i,(t,e)=>{var n=function(t,e,n,i){if(n=n===C?0:n,!(i=i!==C&&i)&&1===e.length&&"string"==typeof t){var r=function(t){var e;switch(t.length){case 0:throw Nt.n("Array is empty.");case 1:e=t[0];break;default:throw Mt.r("Array has more than one element.")}return e}(e),s=De(r);return t.indexOf(s,n)}var o=Pe(n,0),a=nr(t);if(o<=a)do{var l=o;o=o+1|0;var d,c=bn(t,l);t:{for(var h=0,u=e.length;h<u;){var p=e[h];if(h=h+1|0,tr(p,c,i)){d=!0;break t}}d=!1}if(d)return l}while(l!==a);return-1}(t,s,e,o);return n<0?null:hr(n,1)}));var s,o}(t,e,C,n,i)),s=ct.y(Vi(r,10)),o=r.s();o.t();){var a=ar(t,o.u());s.z(a)}return s}function ar(t,e){return Tn(Cn(t,e.oa(),e.sa()+1|0))}function lr(t){if(t.ab_1<0)t.ya_1=0,t.bb_1=null;else{var e;if(t.db_1.gb_1>0?(t.cb_1=t.cb_1+1|0,e=t.cb_1>=t.db_1.gb_1):e=!1,e||t.ab_1>xn(t.db_1.eb_1))t.bb_1=Gn(t.za_1,nr(t.db_1.eb_1)),t.ab_1=-1;else{var n=t.db_1.hb_1(t.db_1.eb_1,t.ab_1);if(null==n)t.bb_1=Gn(t.za_1,nr(t.db_1.eb_1)),t.ab_1=-1;else{var i=n.aa(),r=n.ba();t.bb_1=function(t,e){return e<=-2147483648?Yi().j1_1:Gn(t,e-1|0)}(t.za_1,i),t.za_1=i+r|0,t.ab_1=t.za_1+(0===r?1:0)|0}}t.ya_1=1}}function dr(t){return t instanceof xe}function cr(t){return new xe(t)}function hr(t,e){return new Ce(t,e)}Un(R,"CharSequence"),qn(F,"Number"),qn(q),qn(H,"Char"),Un(V,"Collection"),Un(U,"Set",C,C,[V]),Un(W,"List",C,C,[V]),Un(K,"Entry"),Un(G,"Map"),Wn(J),qn(Z,"Enum"),Wn(X),qn(Y,"Long"),Un(Q,"FunctionAdapter"),Un(tt,"Comparator"),Vn(et,"Unit"),qn(nt,"AbstractCollection",C,C,[V]),qn(it,"AbstractMutableCollection",C,C,[V]),qn(rt,"IteratorImpl"),qn(st,"AbstractMutableList",C,C,[W,V]),qn(ot,"AbstractMap",C,C,[G]),qn(at,"AbstractMutableMap",C,C,[G]),qn(lt,"AbstractMutableSet",C,C,[V,U]),Wn(dt),qn(ct,"ArrayList",ct.i1,C,[W,V]),qn(ht,"HashMap",ht.x4,C,[G]),qn(ut,"HashMapKeys",C,C,[V,U]),qn(pt,"HashMapValues",C,C,[V]),qn(vt,"HashMapEntrySetBase",C,C,[V,U]),qn(_t,"HashMapEntrySet"),qn(ft),qn(gt,"HashMapKeysDefault"),qn(mt),qn(bt,"HashMapValuesDefault"),qn(yt,"HashSet",yt.m6,C,[V,U]),Wn(wt),qn(xt,"Itr"),qn(Ct,"KeysItr"),qn(kt,"ValuesItr"),qn(At,"EntriesItr"),qn(Et,"EntryRef",C,C,[K]),Un(St,"InternalMap"),(P=zt,P.prototype).f6=function(t){var e;t:if(ti(t,V)&&t.a1())e=!0;else{for(var n=t.s();n.t();){var i=n.u();if(null==i||!ti(i,K)||!this.e8(i)){e=!1;break t}}e=!0}return e},qn(zt,"InternalHashMap",zt.i5,C,[St]),qn(Ot,"LinkedHashMap",Ot.l8,C,[G]),qn(Tt,"LinkedHashSet",Tt.g1,C,[V,U]),qn(Lt,"Exception",Lt.r8),qn(It,"RuntimeException",It.n8),qn($t,"UnsupportedOperationException",$t.p4),qn(Mt,"IllegalArgumentException",Mt.q8),qn(Nt,"NoSuchElementException",Nt.h3),qn(Pt,"IndexOutOfBoundsException",Pt.v8),qn(jt,"IllegalStateException",jt.x8),qn(Bt,"ConcurrentModificationException",Bt.k7),qn(Dt,"ArithmeticException",Dt.b9),qn(Rt,"UninitializedPropertyAccessException",Rt.d9),qn(Ft,"NoWhenBranchMatchedException",Ft.r2),qn(qt,"NullPointerException",qt.v2),qn(Ht,"ClassCastException",Ht.z2),qn(Vt,"KClassImpl"),qn(Ut,"PrimitiveKClassImpl"),Vn(Wt,"NothingKClassImpl"),Un(Kt,"KProperty0"),qn(Gt,"StringBuilder",Gt.i,C,[R]),qn(Jt,"sam$kotlin_Comparator$0",C,C,[tt,Q]),qn(Zt,"IteratorImpl"),Wn(Xt),qn(Yt,"AbstractList",C,C,[W]),qn(Qt),qn(te),Wn(ee),qn(ne,"AbstractSet",C,C,[U]),qn(ie),qn(re),Wn(se),Vn(oe,"EmptyList",C,C,[W]),Vn(ae,"EmptyIterator"),Vn(le,"EmptyMap",C,C,[G]),qn(de,"IntIterator"),Vn(ce,"EmptySet",C,C,[U]),qn(he,"EnumEntriesList",C,C,[W]),Wn(ue),qn(pe,"IntProgression"),qn(ve,"IntRange"),qn(_e,"IntProgressionIterator"),Wn(fe),qn(ge),qn(me,"DelimitedRangesSequence"),qn(be,"UnsafeLazyImpl"),Vn(ye,"UNINITIALIZED_VALUE"),Wn(we),qn(xe,"Failure"),qn(Ce,"Pair"),qn(ke,"Triple"),new J,k=new et,new wt,S=new Xt,new ee,z=new se,T=new ae,M=new fe,N=new ye,new we;var ur={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function pr(t){var e=Object.create(null);return function(n){return void 0===e[n]&&(e[n]=t(n)),e[n]}}var vr=/[A-Z]|^ms/g,_r=/_EMO_([^_]+?)_([^]*?)_EMO_/g,fr=function(t){return 45===t.charCodeAt(1)},gr=function(t){return null!=t&&"boolean"!=typeof t},mr=pr(function(t){return fr(t)?t:t.replace(vr,"-$&").toLowerCase()}),br=function(t,e){switch(t){case"animation":case"animationName":if("string"==typeof e)return e.replace(_r,function(t,e,n){return wr={name:e,styles:n,next:wr},e})}return 1===ur[t]||fr(t)||"number"!=typeof e||0===e?e:e+"px"};function yr(t,e,n){if(null==n)return"";var i=n;if(void 0!==i.__emotion_styles)return i;switch(typeof n){case"boolean":return"";case"object":var r=n;if(1===r.anim)return wr={name:r.name,styles:r.styles,next:wr},r.name;var s=n;if(void 0!==s.styles){var o=s.next;if(void 0!==o)for(;void 0!==o;)wr={name:o.name,styles:o.styles,next:wr},o=o.next;return s.styles+";"}return function(t,e,n){var i="";if(Array.isArray(n))for(var r=0;r<n.length;r++)i+=yr(t,e,n[r])+";";else for(var s in n){var o=n[s];if("object"!=typeof o){var a=o;null!=e&&void 0!==e[a]?i+=s+"{"+e[a]+"}":gr(a)&&(i+=mr(s)+":"+br(s,a)+";")}else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=e&&void 0!==e[o[0]]){var l=yr(t,e,o);switch(s){case"animation":case"animationName":i+=mr(s)+":"+l+";";break;default:i+=s+"{"+l+"}"}}else for(var d=0;d<o.length;d++)gr(o[d])&&(i+=mr(s)+":"+br(s,o[d])+";")}return i}(t,e,n);case"function":if(void 0!==t){var a=wr,l=n(t);return wr=a,yr(t,e,l)}}var d=n;if(null==e)return d;var c=e[d];return void 0!==c?c:d}var wr,xr=/label:\s*([^\s;{]+)\s*(;|$)/g;function Cr(t,e,n){if(1===t.length&&"object"==typeof t[0]&&null!==t[0]&&void 0!==t[0].styles)return t[0];var i=!0,r="";wr=void 0;var s=t[0];null==s||void 0===s.raw?(i=!1,r+=yr(n,e,s)):r+=s[0];for(var o=1;o<t.length;o++)r+=yr(n,e,t[o]),i&&(r+=s[o]);xr.lastIndex=0;for(var a,l="";null!==(a=xr.exec(r));)l+="-"+a[1];var d=function(t){for(var e,n=0,i=0,r=t.length;r>=4;++i,r-=4)e=1540483477*(65535&(e=255&t.charCodeAt(i)|(255&t.charCodeAt(++i))<<8|(255&t.charCodeAt(++i))<<16|(255&t.charCodeAt(++i))<<24))+(59797*(e>>>16)<<16),n=1540483477*(65535&(e^=e>>>24))+(59797*(e>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(r){case 3:n^=(255&t.charCodeAt(i+2))<<16;case 2:n^=(255&t.charCodeAt(i+1))<<8;case 1:n=1540483477*(65535&(n^=255&t.charCodeAt(i)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(r)+l;return{name:d,styles:r,next:wr}}var kr="comm",Ar="rule",Er="decl",Sr=Math.abs,zr=String.fromCharCode;function Or(t){return t.trim()}function Tr(t,e,n){return t.replace(e,n)}function Lr(t,e){return 0|t.charCodeAt(e)}function Ir(t,e,n){return t.slice(e,n)}function $r(t){return t.length}function Mr(t){return t.length}function Nr(t,e){return e.push(t),t}function Pr(t,e){for(var n="",i=0;i<t.length;i++)n+=e(t[i],i,t,e)||"";return n}function jr(t,e,n,i){switch(t.type){case"@layer":if(t.children.length)break;case"@import":case"@namespace":case Er:return t.return=t.return||t.value;case kr:return"";case"@keyframes":return t.return=t.value+"{"+Pr(t.children,i)+"}";case Ar:if(!$r(t.value=t.props.join(",")))return""}return $r(n=Pr(t.children,i))?t.return=t.value+"{"+n+"}":""}Object.assign;var Br,Dr,Rr,Fr,qr,Hr,Vr,Ur=1,Wr=1,Kr=0,Gr=0,Jr=0,Zr="";function Xr(t,e,n,i,r,s,o,a){return{value:t,root:e,parent:n,type:i,props:r,children:s,line:Ur,column:Wr,length:o,return:"",siblings:a}}function Yr(){return Jr=Gr>0?Lr(Zr,--Gr):0,Wr--,10===Jr&&(Wr=1,Ur--),Jr}function Qr(){return Jr=Gr<Kr?Lr(Zr,Gr++):0,Wr++,10===Jr&&(Wr=1,Ur++),Jr}function ts(){return Lr(Zr,Gr)}function es(){return Gr}function ns(t,e){return Ir(Zr,t,e)}function is(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function rs(t){return Or(ns(Gr-1,as(91===t?t+2:40===t?t+1:t)))}function ss(t){for(;(Jr=ts())&&Jr<33;)Qr();return is(t)>2||is(Jr)>3?"":" "}function os(t,e){for(;--e&&Qr()&&!(Jr<48||Jr>102||Jr>57&&Jr<65||Jr>70&&Jr<97););return ns(t,es()+(e<6&&32==ts()&&32==Qr()))}function as(t){for(;Qr();)switch(Jr){case t:return Gr;case 34:case 39:34!==t&&39!==t&&as(Jr);break;case 40:41===t&&as(t);break;case 92:Qr()}return Gr}function ls(t,e){for(;Qr()&&t+Jr!==57&&(t+Jr!==84||47!==ts()););return"/*"+ns(e,Gr-1)+"*"+zr(47===t?t:Qr())}function ds(t){for(;!is(ts());)Qr();return ns(t,Gr)}function cs(t){return function(t){return Zr="",t}(hs("",null,null,null,[""],t=function(t){return Ur=Wr=1,Kr=$r(Zr=t),Gr=0,[]}(t),0,[0],t))}function hs(t,e,n,i,r,s,o,a,l){for(var d=0,c=0,h=o,u=0,p=0,v=0,_=1,f=1,g=1,m=0,b=0,y="",w=r,x=s,C=i,k=y;f;)switch(v=b,b=Qr()){case 40:108!=v&&58==Lr(k,h-1)?(m++,k+="("):k+=rs(b);break;case 41:m--,k+=")";break;case 34:case 39:case 91:k+=rs(b);break;case 9:case 10:case 13:case 32:if(m>0){k+=zr(b);break}k+=ss(v);break;case 92:k+=os(es()-1,7);continue;case 47:switch(ts()){case 42:case 47:Nr(ps(ls(Qr(),es()),e,n,l),l),5!=is(v||1)&&5!=is(ts()||1)||!$r(k)||" "===Ir(k,-1,void 0)||(k+=" ");break;default:k+="/"}break;case 123*_:a[d++]=$r(k)*g;case 125*_:case 59:case 0:if(m>0&&b){k+=zr(b);break}switch(b){case 0:case 125:f=0;case 59+c:-1==g&&(k=Tr(k,/\f/g,"")),p>0&&($r(k)-h||0===_)&&Nr(p>32?vs(k+";",i,n,h-1,l):vs(Tr(k," ","")+";",i,n,h-2,l),l);break;case 59:k+=";";default:if(Nr(C=us(k,e,n,d,c,r,a,y,w=[],x=[],h,s),s),123===b)if(0===c)hs(k,e,C,C,w,s,h,a,x);else{switch(u){case 99:if(110===Lr(k,3))break;case 108:if(97===Lr(k,2))break;default:c=0;case 100:case 109:case 115:}c?hs(t,C,C,i&&Nr(us(t,C,C,0,0,r,a,y,r,w=[],h,x),x),r,x,h,a,i?w:x):hs(k,C,C,C,[""],x,0,a,x)}}d=c=p=0,_=g=1,y=k="",h=o;break;case 58:h=1+$r(k),p=v;default:if(_<1)if(123==b)--_;else if(125==b&&0==_++&&125==Yr())continue;switch(k+=zr(b),b*_){case 38:g=c>0?1:(k+="\f",-1);break;case 44:if(m>0)break;a[d++]=($r(k)-1)*g,g=1;break;case 64:45===ts()&&(k+=rs(Qr())),u=ts(),c=h=$r(y=k+=ds(es())),b++;break;case 45:45===v&&2==$r(k)&&(_=0)}}return s}function us(t,e,n,i,r,s,o,a,l,d,c,h){for(var u=r-1,p=0===r?s:[""],v=Mr(p),_=0,f=0,g=0;_<i;++_)for(var m=0,b=Ir(t,u+1,u=Sr(f=o[_])),y=t;m<v;++m)(y=Or(f>0?p[m]+" "+b:Tr(b,/&\f/g,p[m])))&&(l[g++]=y);return Xr(t,e,n,0===r?Ar:a,l,d,c,h)}function ps(t,e,n,i){return Xr(t,e,n,kr,zr(Jr),Ir(t,2,-2),0,i)}function vs(t,e,n,i,r){return Xr(t,e,n,Er,Ir(t,0,i),Ir(t,i+1,-1),i,r)}class _s{}class fs{constructor(t,e,n){e=e===C?null:e,n=n===C?null:n,this.sb_1=t;var i=this.sb_1;null!=e&&(i.formAssociated=e),null!=n&&(i.observedAttributes=n)}}Vn(_s,"HtmlTagName"),qn(fs,"CustomElementReference"),new _s;class gs extends HTMLElement{constructor(){super(),this.tb_1=ct.i1(),this.ub_1=Ot.l8()}fc(){this.gc()}connectedCallback(){return this.fc()}hc(){}connectedMoveCallback(){return this.hc()}ic(){}disconnectedCallback(){return this.ic()}jc(){}adoptedCallback(){return this.jc()}kc(t){for(var e=this.tb_1.s();e.t();){var n=e.u();t&&n.lc()}!function(t){for(var e=t.tb_1.s();e.t();)e.u().ec()}(this)}gc(t,e){var n;return t=t!==C&&t,e===C?(this.kc(t),n=k):n=e.kc.call(this,t),n}mc(t,e,n){var i=this.ub_1.s1(t);if(null==i)return k;for(var r=i.s();r.t();)r.u().ec()}attributeChangedCallback(t,e,n){return this.mc(t,e,n)}}class ms{constructor(t,e){e=e===C?Ki():e,this.gs_1=t,this.hs_1=e}}class bs extends fs{constructor(t,e,n,i,r,s){r=r===C||r,s=s===C?null:s,super(t,n=n===C?null:n,i=i===C?null:i),this.js_1=e,this.ks_1=e,null!=s&&(Vr===C&&new ys,Vr).ms(t,s),r&&function(t,e){if(null!=customElements.get(t))return k;(function(t){Ns();for(var e=HTMLElement.prototype,n=t.prototype;null!=n&&n!==e;)Ms(n),n=Object.getPrototypeOf(n)})(e.sb_1),customElements.define(t,e.sb_1)}(this.js_1,this)}}class ys{constructor(){Vr=this,this.ls_1=Ot.l8()}ms(t,e){this.ls_1.d4(t,e)}}function ws(){ks();var t,e=Br;return function(t,e,n,i,r){Zn(),i.get=i,i.set=r,i.callableName=t,function(t,e,n){Zn(),t.$metadata$=e,t.constructor=t;var i=n.Symbol;null!=i&&(t[i]=!0),Object.assign(t,n.prototype)}(i,function(t,e){return Zn(),(Zn(),w)[t][null==e?0:1]}(e,r),n)}("stylisMiddlewares",0,Kt,(t=()=>ws(),Zn(),t.callableName=void 0,t.$flags=0,t.$arity=0,t.$id=0,t.$bound=void 0,t),null),e.p1()}function xs(t){ks();var e=new CSSStyleSheet;return e.replaceSync(function(t){ks();var e=Gt.i(),n=t,i=Object.keys(t),r=ws(),s=0,o=i.length;if(s<o)do{var a=s;s=s+1|0;var l=Tn(i[a]),d=Cr([n[l]]).styles;e.a8(Pr(cs(l+"{"+d+"}"),r))}while(s<o);return e.toString()}(function(t){ks();var e={};return t(e),e}(t))),e}function Cs(){var t,e;return ks(),e=Mr(t=[jr]),function(n,i,r,s){for(var o="",a=0;a<e;a++)o+=t[a](n,i,r,s)||"";return o}}function ks(){Dr||(Dr=!0,Br=new be(Cs))}function As(t){return Tn(t)}function Es(t){return Tn(t)}function Ss(t){return"."+Tn(t)}function zs(){Fr||(Fr=!0,Rr="-webkit-background-clip")}function Os(t,e){return function(t,e,n){e=e===C?document:e,n=n===C?Ls:n;var i=e.createElement(t);return n(i),i}(t,C,e=e===C?Ts:e)}function Ts(t){return k}function Ls(t){return k}function Is(t){return t.style}function $s(t,e){return t.appendChild(e),e}function Ms(t){Ns();for(var e=Reflect.deleteProperty,n=(Ns(),qr).s();n.t();)e(t,n.u())}function Ns(){Hr||(Hr=!0,qr=Fi(["dispatchEvent","addEventListener","removeEventListener","animate","getAnimations","after","before","remove","replaceWith","append","moveBefore","prepend","querySelector","querySelectorAll","replaceChildren","blur","focus"]))}function Ps(t,e,n){var i=function(t,e){var n={mode:e=e===C?"open":e};return t.attachShadow(n)}(t,n=n===C?"open":n);return 0!==e.length&&(i.adoptedStyleSheets=e.slice()),i}qn(gs,"CustomElementAdapter",gs),qn(ms,"CustomElementAttributes"),qn(bs,"CustomElementReferenceAdapter"),Vn(ys,"ElementAttributesRegistry"),qn(class{constructor(t,e,n,i,r){this.ns_1=t,this.os_1=e,this.ps_1=n,this.qs_1=i,this.rs_1=r}toString(){return"AttributeChange("+this.ns_1+": "+this.qs_1+" -> "+this.rs_1+", "+Re(this.os_1)+" -> "+Re(this.ps_1)+")"}},"AttributeChange");const js=t=>t.test(navigator.userAgent),Bs=t=>t.test(navigator.platform),Ds=js(/Android/u);js(/Chrome/u)&&/Google Inc/u.test(navigator.vendor),js(/Firefox/u);const Rs=Bs(/^iPad/u)||Bs(/^Mac/u)&&navigator.maxTouchPoints>1,Fs=Bs(/^iPhone/u)||Rs,qs=js(/^((?!chrome|android).)*safari/iu),Hs=(()=>{try{return document.createEvent("TouchEvent"),!0}catch(t){return!1}})();function Vs(){if(Fs){const t=window.innerHeight,e=window.innerWidth>t,n=document.documentElement.clientHeight;e&&n>t?document.documentElement.style.setProperty("--vaadin-viewport-offset-bottom",n-t+"px"):document.documentElement.style.setProperty("--vaadin-viewport-offset-bottom","")}}Vs(),window.addEventListener("resize",Vs);const Us=globalThis,Ws=Us.ShadowRoot&&(void 0===Us.ShadyCSS||Us.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ks=Symbol(),Gs=new WeakMap;class Js{constructor(t,e,n){if(this._$cssResult$=!0,n!==Ks)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ws&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=Gs.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Gs.set(e,t))}return t}toString(){return this.cssText}}const Zs=t=>new Js("string"==typeof t?t:t+"",void 0,Ks),Xs=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[i+1],t[0]);return new Js(n,t,Ks)},Ys=(t,e)=>{if(Ws)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of e){const e=document.createElement("style"),i=Us.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=n.cssText,t.appendChild(e)}},Qs=Ws?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return Zs(e)})(t):t,{is:to,defineProperty:eo,getOwnPropertyDescriptor:no,getOwnPropertyNames:io,getOwnPropertySymbols:ro,getPrototypeOf:so}=Object,oo=globalThis,ao=oo.trustedTypes,lo=ao?ao.emptyScript:"",co=oo.reactiveElementPolyfillSupport,ho=(t,e)=>t,uo={toAttribute(t,e){switch(e){case Boolean:t=t?lo:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},po=(t,e)=>!to(t,e),vo={attribute:!0,type:String,converter:uo,reflect:!1,useDefault:!1,hasChanged:po};Symbol.metadata??=Symbol("metadata"),oo.litPropertyMetadata??=new WeakMap;class _o extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vo){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(t,n,e);void 0!==i&&eo(this.prototype,t,i)}}static getPropertyDescriptor(t,e,n){const{get:i,set:r}=no(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);r?.call(this,e),this.requestUpdate(t,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vo}static _$Ei(){if(this.hasOwnProperty(ho("elementProperties")))return;const t=so(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ho("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ho("properties"))){const t=this.properties,e=[...io(t),...ro(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(Qs(t))}else void 0!==t&&e.push(Qs(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ys(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:uo).toAttribute(e,n.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const n=this.constructor,i=n._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=n.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:uo;this._$Em=i;const s=r.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,n,i=!1,r){if(void 0!==t){const s=this.constructor;if(!1===i&&(r=this[t]),n??=s.getPropertyOptions(t),!((n.hasChanged??po)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,n,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}_o.elementStyles=[],_o.shadowRootOptions={mode:"open"},_o[ho("elementProperties")]=new Map,_o[ho("finalized")]=new Map,co?.({ReactiveElement:_o}),(oo.reactiveElementVersions??=[]).push("2.1.2");const fo=globalThis,go=t=>t,mo=fo.trustedTypes,bo=mo?mo.createPolicy("lit-html",{createHTML:t=>t}):void 0,yo="$lit$",wo=`lit$${Math.random().toFixed(9).slice(2)}$`,xo="?"+wo,Co=`<${xo}>`,ko=document,Ao=()=>ko.createComment(""),Eo=t=>null===t||"object"!=typeof t&&"function"!=typeof t,So=Array.isArray,zo=t=>So(t)||"function"==typeof t?.[Symbol.iterator],Oo="[ \t\n\f\r]",To=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lo=/-->/g,Io=/>/g,$o=RegExp(`>|${Oo}(?:([^\\s"'>=/]+)(${Oo}*=${Oo}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Mo=/'/g,No=/"/g,Po=/^(?:script|style|textarea|title)$/i,jo=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),Bo=jo(1),Do=jo(2),Ro=(jo(3),Symbol.for("lit-noChange")),Fo=Symbol.for("lit-nothing"),qo=new WeakMap,Ho=ko.createTreeWalker(ko,129);function Vo(t,e){if(!So(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==bo?bo.createHTML(e):e}const Uo=(t,e)=>{const n=t.length-1,i=[];let r,s=2===e?"<svg>":3===e?"<math>":"",o=To;for(let e=0;e<n;e++){const n=t[e];let a,l,d=-1,c=0;for(;c<n.length&&(o.lastIndex=c,l=o.exec(n),null!==l);)c=o.lastIndex,o===To?"!--"===l[1]?o=Lo:void 0!==l[1]?o=Io:void 0!==l[2]?(Po.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=$o):void 0!==l[3]&&(o=$o):o===$o?">"===l[0]?(o=r??To,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?$o:'"'===l[3]?No:Mo):o===No||o===Mo?o=$o:o===Lo||o===Io?o=To:(o=$o,r=void 0);const h=o===$o&&t[e+1].startsWith("/>")?" ":"";s+=o===To?n+Co:d>=0?(i.push(a),n.slice(0,d)+yo+n.slice(d)+wo+h):n+wo+(-2===d?e:h)}return[Vo(t,s+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Wo{constructor({strings:t,_$litType$:e},n){let i;this.parts=[];let r=0,s=0;const o=t.length-1,a=this.parts,[l,d]=Uo(t,e);if(this.el=Wo.createElement(l,n),Ho.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Ho.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(yo)){const e=d[s++],n=i.getAttribute(t).split(wo),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:n,ctor:"."===o[1]?Xo:"?"===o[1]?Yo:"@"===o[1]?Qo:Zo}),i.removeAttribute(t)}else t.startsWith(wo)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(Po.test(i.tagName)){const t=i.textContent.split(wo),e=t.length-1;if(e>0){i.textContent=mo?mo.emptyScript:"";for(let n=0;n<e;n++)i.append(t[n],Ao()),Ho.nextNode(),a.push({type:2,index:++r});i.append(t[e],Ao())}}}else if(8===i.nodeType)if(i.data===xo)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(wo,t+1));)a.push({type:7,index:r}),t+=wo.length-1}r++}}static createElement(t,e){const n=ko.createElement("template");return n.innerHTML=t,n}}function Ko(t,e,n=t,i){if(e===Ro)return e;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const s=Eo(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(e=Ko(t,r._$AS(t,e.values),r,i)),e}class Go{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,i=(t?.creationScope??ko).importNode(e,!0);Ho.currentNode=i;let r=Ho.nextNode(),s=0,o=0,a=n[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Jo(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ta(r,this,t)),this._$AV.push(e),a=n[++o]}s!==a?.index&&(r=Ho.nextNode(),s++)}return Ho.currentNode=ko,i}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class Jo{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,i){this.type=2,this._$AH=Fo,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ko(this,t,e),Eo(t)?t===Fo||null==t||""===t?(this._$AH!==Fo&&this._$AR(),this._$AH=Fo):t!==this._$AH&&t!==Ro&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):zo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Fo&&Eo(this._$AH)?this._$AA.nextSibling.data=t:this.T(ko.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,i="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Wo.createElement(Vo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Go(i,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=qo.get(t.strings);return void 0===e&&qo.set(t.strings,e=new Wo(t)),e}k(t){So(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,i=0;for(const r of t)i===e.length?e.push(n=new Jo(this.O(Ao()),this.O(Ao()),this,this.options)):n=e[i],n._$AI(r),i++;i<e.length&&(this._$AR(n&&n._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=go(t).nextSibling;go(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Zo{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,i,r){this.type=1,this._$AH=Fo,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Fo}_$AI(t,e=this,n,i){const r=this.strings;let s=!1;if(void 0===r)t=Ko(this,t,e,0),s=!Eo(t)||t!==this._$AH&&t!==Ro,s&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Ko(this,i[n+o],e,o),a===Ro&&(a=this._$AH[o]),s||=!Eo(a)||a!==this._$AH[o],a===Fo?t=Fo:t!==Fo&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!i&&this.j(t)}j(t){t===Fo?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Xo extends Zo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Fo?void 0:t}}class Yo extends Zo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Fo)}}class Qo extends Zo{constructor(t,e,n,i,r){super(t,e,n,i,r),this.type=5}_$AI(t,e=this){if((t=Ko(this,t,e,0)??Fo)===Ro)return;const n=this._$AH,i=t===Fo&&n!==Fo||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==Fo&&(n===Fo||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ta{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ko(this,t)}}const ea={M:yo,P:wo,A:xo,C:1,L:Uo,R:Go,D:zo,V:Ko,I:Jo,H:Zo,N:Yo,U:Qo,B:Xo,F:ta},na=fo.litHtmlPolyfillSupport;na?.(Wo,Jo),(fo.litHtmlVersions??=[]).push("3.3.3");const ia=(t,e,n)=>{const i=n?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=n?.renderBefore??null;i._$litPart$=r=new Jo(e.insertBefore(Ao(),t),t,void 0,n??{})}return r._$AI(t),r},ra=globalThis;class sa extends _o{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ia(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ro}}sa._$litElement$=!0,sa.finalized=!0,ra.litElementHydrateSupport?.({LitElement:sa});const oa=ra.litElementPolyfillSupport;oa?.({LitElement:sa}),(ra.litElementVersions??=[]).push("4.2.2"),window.Vaadin||={},window.Vaadin.featureFlags||={};const aa={};function la(t,e="25.3.5"){if(Object.defineProperty(t,"version",{get:()=>e}),t.experimental){const e="string"==typeof t.experimental?t.experimental:`${n=t.is.split("-").slice(1).join("-"),n.replace(/-[a-z]/gu,t=>t[1].toUpperCase())}Component`;if(!window.Vaadin.featureFlags[e]&&!aa[e])return aa[e]=new Set,aa[e].add(t),void Object.defineProperty(window.Vaadin.featureFlags,e,{get:()=>0===aa[e].size,set(t){t&&aa[e].size>0&&(aa[e].forEach(t=>{customElements.define(t.is,t)}),aa[e].clear())}});if(aa[e])return void aa[e].add(t)}var n;const i=customElements.get(t.is);if(i){const e=i.version;e&&t.version&&e===t.version?console.warn(`The component ${t.is} has been loaded twice`):console.error(`Tried to define ${t.is} version ${t.version} when version ${i.version} is already in use. Something will probably break.`)}else customElements.define(t.is,t)}const da=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ca=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function ha(t,e){if("function"!=typeof t)return;const n=da.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};function ua(){}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(ca?!(ca&&Object.keys(ca).map(t=>ca[t]).filter(t=>t.productionMode).length>0):!ha(function(){return!0}))}catch(t){return!1}}());let pa=0,va=0;const _a=[];let fa=!1;const ga={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},ma={run:t=>window.requestAnimationFrame(t),cancel(t){window.cancelAnimationFrame(t)}},ba={run:t=>window.requestIdleCallback?window.requestIdleCallback(t):window.setTimeout(t,16),cancel(t){window.cancelIdleCallback?window.cancelIdleCallback(t):window.clearTimeout(t)}},ya={run(t){fa||(fa=!0,queueMicrotask(()=>function(){fa=!1;const t=_a.length;for(let e=0;e<t;e++){const t=_a[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}_a.splice(0,t),va+=t}())),_a.push(t);const e=pa;return pa+=1,e},cancel(t){const e=t-va;if(e>=0){if(!_a[e])throw new Error(`invalid async handle: ${t}`);_a[e]=null}}},wa=new Set;class xa{static debounce(t,e,n){return t instanceof xa?t._cancelAsync():t=new xa,t.setConfig(e,n),t}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,wa.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),wa.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}}const Ca=[];function ka(t,e,n=t.getAttribute("dir")){e?t.setAttribute("dir",e):null!=n&&t.removeAttribute("dir")}function Aa(){return document.documentElement.getAttribute("dir")}new MutationObserver(function(){const t=Aa();Ca.forEach(e=>{ka(e,t)})}).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});const Ea=t=>class extends t{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:t=>t||"",toAttribute:t=>""===t?null:t}}}}get __isRTL(){return"rtl"===this.getAttribute("dir")}connectedCallback(){super.connectedCallback(),this.hasAttribute("dir")&&!this.__restoreSubscription||(this.__subscribe(),ka(this,Aa(),null))}attributeChangedCallback(t,e,n){if(super.attributeChangedCallback(t,e,n),"dir"!==t)return;const i=Aa(),r=n===i&&-1===Ca.indexOf(this),s=!n&&e&&-1===Ca.indexOf(this),o=n!==i&&e===i;r||s?(this.__subscribe(),ka(this,i,n)):o&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=Ca.includes(this),this.__unsubscribe()}_valueToNodeAttribute(t,e,n){("dir"!==n||""!==e||t.hasAttribute("dir"))&&super._valueToNodeAttribute(t,e,n)}_attributeToProperty(t,e,n){"dir"!==t||e?super._attributeToProperty(t,e,n):this.dir=""}__subscribe(){Ca.includes(this)||Ca.push(this)}__unsubscribe(){Ca.includes(this)&&Ca.splice(Ca.indexOf(this),1)}};let Sa;window.Vaadin||(window.Vaadin={}),window.Vaadin.registrations||(window.Vaadin.registrations=[]),window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={}),window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){!function(t,e){if(window.Vaadin.developmentMode)ha(t,e)}(ua)};const za=new Set,Oa=t=>class extends(Ea(t)){static _ensureRegistrations(){const{is:t}=this;if(t&&!za.has(t)){window.Vaadin.registrations.push(this),za.add(t);const n=window.Vaadin.developmentModeCallback;n&&(Sa=xa.debounce(Sa,ba,()=>{n["vaadin-usage-statistics"]()}),e=Sa,wa.add(e))}var e}constructor(){super(),null===document.doctype&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.'),this.constructor._ensureRegistrations()}},Ta=new WeakMap;function La(t){return e=>{if(function(t,e){let n=e;for(;n;){if(Ta.get(n)===t)return!0;n=Object.getPrototypeOf(n)}return!1}(t,e))return e;const n=t(e);return Ta.set(n,t),n}}const Ia={},$a=/([A-Z])/gu;function Ma(t){return Ia[t]||(Ia[t]=t.replace($a,"-$1").toLowerCase()),Ia[t]}function Na(t){return t[0].toUpperCase()+t.substring(1)}function Pa(t){const[e,n]=t.split("(");return{method:e,observerProps:n.replace(")","").split(",").map(t=>t.trim())}}function ja(t,e){return Object.prototype.hasOwnProperty.call(t,e)||(t[e]=new Map(t[e])),t[e]}const Ba=La(t=>class extends t{static enabledWarnings=[];static createProperty(t,e){[String,Boolean,Number,Array].includes(e)&&(e={type:e}),e?.reflectToAttribute&&(e.reflect=!0),super.createProperty(t,e)}static getOrCreateMap(t){return ja(this,t)}static finalize(){if(window.litIssuedWarnings&&(window.litIssuedWarnings.add("no-override-create-property"),window.litIssuedWarnings.add("no-override-get-property-descriptor")),super.finalize(),Array.isArray(this.observers)){const t=this.getOrCreateMap("__complexObservers");this.observers.forEach(e=>{const{method:n,observerProps:i}=Pa(e);t.set(n,i)})}}static addCheckedInitializer(t){super.addInitializer(e=>{e instanceof this&&t(e)})}static getPropertyDescriptor(t,e,n){const i=super.getPropertyDescriptor(t,e,n);let r=i;if(this.getOrCreateMap("__propKeys").set(t,e),n.sync&&(r={get:i.get,set(i){const r=this[t];po(i,r)&&(this[e]=i,this.requestUpdate(t,r,n),this.hasUpdated&&this.performUpdate())},configurable:!0,enumerable:!0}),n.readOnly){const e=r.set;this.addCheckedInitializer(n=>{n[`_set${Na(t)}`]=function(t){e.call(n,t)}}),r={get:r.get,set(){},configurable:!0,enumerable:!0}}if("value"in n&&this.addCheckedInitializer(e=>{const i="function"==typeof n.value?n.value.call(e):n.value;n.readOnly?e[`_set${Na(t)}`](i):e[t]=i}),n.observer){const e=n.observer;this.getOrCreateMap("__observers").set(t,e),this.addCheckedInitializer(t=>{t[e]||console.warn(`observer method ${e} not defined`)})}if(n.notify){if(this.__notifyProps){if(!this.hasOwnProperty("__notifyProps")){const t=this.__notifyProps;this.__notifyProps=new Set(t)}}else this.__notifyProps=new Set;this.__notifyProps.add(t)}if(n.computed){const e=`__assignComputed${t}`,i=Pa(n.computed);this.prototype[e]=function(...e){this[t]=this[i.method](...e)},this.getOrCreateMap("__computedObservers").set(e,i.observerProps)}return n.attribute||(n.attribute=Ma(t)),r}static get polylitConfig(){return{asyncFirstRender:!1}}connectedCallback(){super.connectedCallback();const{polylitConfig:t}=this.constructor;this.hasUpdated||t.asyncFirstRender||this.performUpdate()}firstUpdated(){super.firstUpdated(),this.$||(this.$={}),this.renderRoot.querySelectorAll("[id]").forEach(t=>{this.$[t.id]=t})}ready(){}willUpdate(t){this.constructor.__computedObservers&&this.__runComplexObservers(t,this.constructor.__computedObservers)}updated(t){const e=this.__isReadyInvoked;this.__isReadyInvoked=!0,this.constructor.__observers&&this.__runObservers(t,this.constructor.__observers),this.constructor.__complexObservers&&this.__runComplexObservers(t,this.constructor.__complexObservers),this.__dynamicPropertyObservers&&this.__runDynamicObservers(t,this.__dynamicPropertyObservers),this.__dynamicMethodObservers&&this.__runComplexObservers(t,this.__dynamicMethodObservers),this.constructor.__notifyProps&&this.__runNotifyProps(t,this.constructor.__notifyProps),e||this.ready()}setProperties(t){Object.entries(t).forEach(([t,e])=>{const n=this.constructor.__propKeys.get(t),i=this[n];this[n]=e,this.requestUpdate(t,i)}),this.hasUpdated&&this.performUpdate()}_createMethodObserver(t){const e=ja(this,"__dynamicMethodObservers"),{method:n,observerProps:i}=Pa(t);e.set(n,i)}_createPropertyObserver(t,e){ja(this,"__dynamicPropertyObservers").set(e,t)}__runComplexObservers(t,e){e.forEach((e,n)=>{e.some(e=>t.has(e))&&(this[n]?this[n](...e.map(t=>this[t])):console.warn(`observer method ${n} not defined`))})}__runDynamicObservers(t,e){e.forEach((e,n)=>{t.has(e)&&this[n]&&this[n](this[e],t.get(e))})}__runObservers(t,e){t.forEach((t,n)=>{const i=e.get(n);void 0!==i&&this[i]&&this[i](this[n],t)})}__runNotifyProps(t,e){t.forEach((t,n)=>{e.has(n)&&this.dispatchEvent(new CustomEvent(`${Ma(n)}-changed`,{detail:{value:this[n]}}))})}_get(t,e){return function(t,e){return t.split(".").reduce((t,e)=>t?t[e]:void 0,e)}(t,e)}_set(t,e,n){!function(t,e,n){const i=t.split("."),r=i.pop();i.reduce((t,e)=>t[e],n)[r]=e}(t,e,n)}});function Da(t){try{CSS.registerProperty(t)}catch(e){if(!(e instanceof DOMException&&"InvalidModificationError"===e.name))throw e;console.warn(`The CSS property ${t.name} has already been registered.`)}}class Ra extends EventTarget{#t;#e=new Set;#n;#i=!1;constructor(t){super(),this.#t=t,this.#n=new CSSStyleSheet}#r(t){const{propertyName:e}=t;this.#e.has(e)&&this.dispatchEvent(new CustomEvent("property-changed",{detail:{propertyName:e}}))}observe(t){this.connect(),this.#e.has(t)||(this.#e.add(t),this.#n.replaceSync(`\n      :root::before, :host::before {\n        content: '' !important;\n        position: absolute !important;\n        top: -9999px !important;\n        left: -9999px !important;\n        visibility: hidden !important;\n        transition: 1ms allow-discrete step-end !important;\n        transition-property: ${[...this.#e].join(", ")} !important;\n      }\n    `))}connect(){this.#i||(this.#t.adoptedStyleSheets.unshift(this.#n),this.#s.addEventListener("transitionstart",t=>this.#r(t)),this.#s.addEventListener("transitionend",t=>this.#r(t)),this.#i=!0)}disconnect(){this.#e.clear(),this.#t.adoptedStyleSheets=this.#t.adoptedStyleSheets.filter(t=>t!==this.#n),this.#s.removeEventListener("transitionstart",this.#r),this.#s.removeEventListener("transitionend",this.#r),this.#i=!1}get#s(){return this.#t.documentElement??this.#t.host}static for(t){return t.__cssPropertyObserver||=new Ra(t),t.__cssPropertyObserver}}function Fa(t){Ys(t.shadowRoot,function(t){const{baseStyles:e,themeStyles:n,elementStyles:i,lumoInjector:r}=t.constructor,s=t.__lumoStyleSheet;return s?[...r.includeBaseStyles?e??i:[],s,...n??[]]:i}(t))}function qa(t,e){t.__lumoStyleSheet=e,Fa(t)}function Ha(t){t.__lumoStyleSheet=void 0,Fa(t)}const Va=new Set;function Ua(t){Va.has(t)||(Va.add(t),console.warn(t))}const Wa=new WeakMap;function Ka(t){try{return t.media.mediaText}catch{return Ua('[LumoInjector] Browser denied to access property "mediaText" for some CSS rules, so they were skipped.'),""}}function Ga(t,e={tags:new Map,modules:new Map}){for(const n of function(t){try{return t.cssRules}catch{return Ua('[LumoInjector] Browser denied to access property "cssRules" for some CSS stylesheets, so they were skipped.'),[]}}(t)){if(n instanceof CSSImportRule){const t=Ka(n);t.startsWith("lumo_")?e.modules.set(t,[...n.styleSheet.cssRules]):Ga(n.styleSheet,e);continue}if(n instanceof CSSMediaRule){const t=Ka(n);t.startsWith("lumo_")&&e.modules.set(t,[...n.cssRules]);continue}if(n instanceof CSSStyleRule&&n.cssText.includes("-inject"))for(const t of n.style){const i=t.match(/^--_lumo-(.*)-inject-modules$/u)?.[1];if(!i)continue;const r=n.style.getPropertyValue(t);e.tags.set(i,r.split(",").map(t=>t.trim().replace(/'|"/gu,"")))}}return e}function Ja(t){return`--_lumo-${t.is}-inject`}class Za{#t;#o;#a=new Map;#l=new Map;constructor(t=document){this.#t=t,this.handlePropertyChange=this.handlePropertyChange.bind(this),this.#o=Ra.for(t),this.#o.addEventListener("property-changed",this.handlePropertyChange)}disconnect(){this.#o.removeEventListener("property-changed",this.handlePropertyChange),this.#a.clear(),this.#l.values().forEach(t=>t.forEach(Ha))}forceUpdate(){for(const t of this.#a.keys())this.#d(t)}componentConnected(t){const{lumoInjector:e}=t.constructor,{is:n}=e;this.#l.set(n,this.#l.get(n)??new Set),this.#l.get(n).add(t);const i=this.#a.get(n);if(i)return void(i.cssRules.length>0&&qa(t,i));this.#c(n);const r=Ja(e);this.#o.observe(r)}componentDisconnected(t){const{is:e}=t.constructor.lumoInjector;this.#l.get(e)?.delete(t),Ha(t)}handlePropertyChange(t){const{propertyName:e}=t.detail,n=e.match(/^--_lumo-(.*)-inject$/u)?.[1];n&&this.#d(n)}#c(t){this.#a.set(t,new CSSStyleSheet),this.#d(t)}#d(t){const{tags:e,modules:n}=function(t){let e=new Map,n=new Map;for(const i of t){let t=Wa.get(i);t||(t=Ga(i),Wa.set(i,t)),e=new Map([...e,...t.tags]),n=new Map([...n,...t.modules])}return{tags:e,modules:n}}(this.#h),i=(e.get(t)??[]).flatMap(t=>n.get(t)??[]).map(t=>t.cssText).join("\n"),r=this.#a.get(t);r.replaceSync(i),this.#l.get(t)?.forEach(t=>{i?qa(t,r):Ha(t)})}get#h(){let t=new Set;for(const e of[this.#t,document])t=t.union(new Set(e.styleSheets)),t=t.union(new Set(e.adoptedStyleSheets));return[...t]}}const Xa=new Set;function Ya(t){const e=t.getRootNode();return e.host&&e.host.constructor.version?Ya(e.host):e}const Qa=t=>class extends t{static finalize(){super.finalize();const t=Ja(this.lumoInjector);this.is&&!Xa.has(t)&&(Xa.add(t),Da({name:t,syntax:"<number>",inherits:!0,initialValue:"0"}))}static get lumoInjector(){return{is:this.is,includeBaseStyles:!1}}connectedCallback(){super.connectedCallback();const t=Ya(this);t.__lumoInjectorDisabled||this.isConnected&&(t.__lumoInjector||=new Za(t),this.__lumoInjector=t.__lumoInjector,this.__lumoInjector.componentConnected(this))}disconnectedCallback(){super.disconnectedCallback(),this.__lumoInjector&&(this.__lumoInjector.componentDisconnected(this),this.__lumoInjector=void 0)}},tl=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(t,e,n){super.attributeChangedCallback(t,e,n),"theme"===t&&this._set_theme(n)}},el=[],nl=new Set,il=new Set;function rl(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function sl(t){const e=[];return t.include&&[].concat(t.include).forEach(t=>{const n=el.find(e=>e.moduleId===t);n?e.push(...sl(n),...n.styles):console.warn(`Included moduleId ${t} not found in style registry`)},t.styles),e}function ol(t){const e=`${t}-default-theme`,n=el.filter(n=>n.moduleId!==e&&function(t,e){return(t||"").split(" ").some(t=>new RegExp(`^${t.split("*").join(".*")}$`,"u").test(e))}(n.themeFor,t)).map(t=>({...t,styles:[...sl(t),...t.styles],includePriority:rl(t.moduleId)})).sort((t,e)=>e.includePriority-t.includePriority);return n.length>0?n:el.filter(t=>t.moduleId===e)}const al=t=>class extends(tl(t)){constructor(){super(),nl.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&il.add(this.is),this.elementStyles)return;const t=this.prototype._template;var e;t&&(!(e=this)||!Object.prototype.hasOwnProperty.call(e,"__themes"))&&function(t,e){const n=document.createElement("style");n.id="vaadin-themable-mixin-style",n.textContent=function(t){return t.map(t=>t.cssText).join("\n")}(t),e.content.appendChild(n)}(this.getStylesForThis(),t)}static finalizeStyles(t){return this.baseStyles=t?[t].flat(1/0):[],this.themeStyles=this.getStylesForThis(),[...this.baseStyles,...this.themeStyles]}static getStylesForThis(){const e=t.__themes||[],n=Object.getPrototypeOf(this.prototype),i=(n?n.constructor.__themes:[])||[];this.__themes=[...e,...i,...ol(this.is)];const r=this.__themes.flatMap(t=>t.styles);return r.filter((t,e)=>e===r.lastIndexOf(t))}};["--vaadin-text-color","--vaadin-text-color-disabled","--vaadin-text-color-secondary","--vaadin-border-color","--vaadin-border-color-secondary","--vaadin-background-color"].forEach(t=>{Da({name:t,syntax:"<color>",inherits:!0,initialValue:"transparent"})}),((t,...e)=>{const n=document.createElement("style");n.id=t,n.textContent=e.map(t=>t.toString()).join("\n"),document.head.insertAdjacentElement("afterbegin",n)})("vaadin-base",Xs`
    @layer vaadin.base {
      html {
        /* Background color */
        --vaadin-background-color: light-dark(#fff, #222);

        /* Container colors */
        --vaadin-background-container: color-mix(in oklab, var(--vaadin-text-color) 5%, var(--vaadin-background-color));
        --vaadin-background-container-strong: color-mix(
          in oklab,
          var(--vaadin-text-color) 10%,
          var(--vaadin-background-color)
        );

        /* Border colors */
        --vaadin-border-color-secondary: color-mix(in oklab, var(--vaadin-text-color) 24%, transparent);
        --vaadin-border-color: color-mix(in oklab, var(--vaadin-text-color) 48%, transparent); /* Above 3:1 contrast */

        /* Text colors */
        /* Above 3:1 contrast */
        --vaadin-text-color-disabled: color-mix(in oklab, var(--vaadin-text-color) 48%, transparent);
        /* Above 4.5:1 contrast */
        --vaadin-text-color-secondary: color-mix(in oklab, var(--vaadin-text-color) 68%, transparent);
        /* Above 7:1 contrast */
        --vaadin-text-color: light-dark(#1f1f1f, white);

        /* Padding */
        --vaadin-padding-xs: 6px;
        --vaadin-padding-s: 8px;
        --vaadin-padding-m: 12px;
        --vaadin-padding-l: 16px;
        --vaadin-padding-xl: 24px;
        --vaadin-padding-block-container: var(--vaadin-padding-xs);
        --vaadin-padding-inline-container: var(--vaadin-padding-s);

        /* Gap/spacing */
        --vaadin-gap-xs: 6px;
        --vaadin-gap-s: 8px;
        --vaadin-gap-m: 12px;
        --vaadin-gap-l: 16px;
        --vaadin-gap-xl: 24px;

        /* Border radius */
        --vaadin-radius-s: 3px;
        --vaadin-radius-m: 6px;
        --vaadin-radius-l: 12px;

        /* Focus outline */
        --vaadin-focus-ring-width: 2px;
        --vaadin-focus-ring-color: var(--vaadin-text-color);

        /* Icons, used as mask-image */
        --_vaadin-icon-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>');
        --_vaadin-icon-calendar: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>');
        --_vaadin-icon-checkmark: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>');
        --_vaadin-icon-checkmark-small: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>');
        --_vaadin-icon-chevron-down: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');
        --_vaadin-icon-chevron-right: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>');
        --_vaadin-icon-clock: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>');
        --_vaadin-icon-cross: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>');
        --_vaadin-icon-cross-small: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>');
        --_vaadin-icon-drag: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M11 7c0 .82843-.6716 1.5-1.5 1.5C8.67157 8.5 8 7.82843 8 7s.67157-1.5 1.5-1.5c.8284 0 1.5.67157 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5c.8284 0 1.5.6716 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5c.8284 0 1.5.6716 1.5 1.5Zm5-10c0 .82843-.6716 1.5-1.5 1.5S13 7.82843 13 7s.6716-1.5 1.5-1.5S16 6.17157 16 7Zm0 5c0 .8284-.6716 1.5-1.5 1.5S13 12.8284 13 12s.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5S13 17.8284 13 17s.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5Z" fill="currentColor"/></svg>');
        --_vaadin-icon-ellipsis: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>');
        --_vaadin-icon-eye: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>');
        --_vaadin-icon-eye-slash: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>');
        --_vaadin-icon-file: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>');
        --_vaadin-icon-fullscreen: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>');
        --_vaadin-icon-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>');
        --_vaadin-icon-link: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>');
        --_vaadin-icon-menu: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>');
        --_vaadin-icon-minus: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>');
        --_vaadin-icon-paper-airplane: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>');
        --_vaadin-icon-pen: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>');
        --_vaadin-icon-play: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>');
        --_vaadin-icon-plus: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>');
        --_vaadin-icon-redo: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>');
        --_vaadin-icon-refresh: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        --_vaadin-icon-resize: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 7.46967c.2929.29289.2929.76777 0 1.06066L8.53033 18.5304c-.29289.2929-.76777.2929-1.06066 0s-.29289-.7678 0-1.0607L17.4697 7.46967c.2929-.29289.7677-.29289 1.0606 0Zm0 4.50003c.2929.2929.2929.7678 0 1.0607l-5.5 5.5c-.2929.2928-.7677.2928-1.0606 0-.2929-.2929-.2929-.7678 0-1.0607l5.4999-5.5c.2929-.2929.7678-.2929 1.0607 0Zm0 4.5c.2929.2928.2929.7677 0 1.0606l-1 1.0001c-.2929.2928-.7677.2929-1.0606 0-.2929-.2929-.2929-.7678 0-1.0607l1-1c.2929-.2929.7677-.2929 1.0606 0Z" fill="currentColor"/></svg>');
        --_vaadin-icon-slash: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="13.7812" y="4.22583" width="1.5" height="16" rx="0.75" transform="rotate(20 13.7812 4.22583)" fill="currentColor"/></svg>');
        --_vaadin-icon-sort: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7.49854 6.99951C7.92795 6.99951 8.15791 7.50528 7.87549 7.82861L4.37646 11.8296C4.17728 12.0571 3.82272 12.0571 3.62354 11.8296L0.125488 7.82861C-0.157248 7.50531 0.0719873 6.99956 0.501465 6.99951H7.49854ZM3.62354 0.17041C3.82275 -0.0573875 4.17725 -0.0573848 4.37646 0.17041L7.87549 4.17041C8.15825 4.49373 7.92806 5.00049 7.49854 5.00049L0.501465 4.99951C0.0719873 4.99946 -0.157248 4.49371 0.125488 4.17041L3.62354 0.17041Z" fill="black"/></svg>');
        --_vaadin-icon-undo: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>');
        --_vaadin-icon-upload: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>');
        --_vaadin-icon-user: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
        --_vaadin-icon-warn: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>');

        /* Cursors for interactive elements */
        --vaadin-clickable-cursor: pointer;
        --vaadin-disabled-cursor: not-allowed;

        /* Use units so that the values can be used in calc() */
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
        --safe-area-inset-inline-start: var(--safe-area-inset-left);
        --safe-area-inset-inline-end: var(--safe-area-inset-right);

        &:dir(rtl) {
          --safe-area-inset-inline-start: var(--safe-area-inset-right);
          --safe-area-inset-inline-end: var(--safe-area-inset-left);
        }
      }

      @supports not (color: hsl(0 0 0)) {
        html {
          --_vaadin-safari-17-deg: 1deg;
        }
      }

      @media (forced-colors: active) {
        html {
          --vaadin-background-color: Canvas;
          --vaadin-border-color: CanvasText;
          --vaadin-border-color-secondary: CanvasText;
          --vaadin-text-color-disabled: CanvasText;
          --vaadin-text-color-secondary: CanvasText;
          --vaadin-text-color: CanvasText;
          --vaadin-icon-color: CanvasText;
          --vaadin-focus-ring-color: Highlight;
        }
      }
    }
  `);const ll=Xs`
  :host {
    display: block;
    box-sizing: border-box;
    height: 100%;
    --vaadin-app-layout-transition-duration: 0s;
    transition: padding var(--vaadin-app-layout-transition-duration) cubic-bezier(0.78, 0, 0.22, 1);
    --_vaadin-app-layout-drawer-width: var(--vaadin-app-layout-drawer-width, auto);
    --vaadin-app-layout-touch-optimized: false;
    --vaadin-app-layout-navbar-offset-top: var(--_vaadin-app-layout-navbar-offset-size);
    --vaadin-app-layout-navbar-offset-bottom: var(--_vaadin-app-layout-navbar-offset-size-bottom);
    --vaadin-app-layout-drawer-offset-left: 0px;
    padding-top: var(--vaadin-app-layout-navbar-offset-top);
    padding-bottom: var(--vaadin-app-layout-navbar-offset-bottom);
    padding-inline-start: var(--vaadin-app-layout-drawer-offset-left);
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  @media (prefers-reduced-motion: no-preference) {
    :host(:not([no-anim])) {
      --vaadin-app-layout-transition-duration: 300ms;
    }
  }

  :host([drawer-opened]) {
    --vaadin-app-layout-drawer-offset-left: var(--_vaadin-app-layout-drawer-offset-size);
  }

  :host([overlay]) {
    --vaadin-app-layout-drawer-offset-left: 0px;
  }

  :host(:not([no-scroll])) [part~='content'] {
    overflow: auto;
  }

  [part~='content'] {
    height: 100%;
    transition: inherit;
    box-sizing: border-box;
    padding-top: max(0px, var(--safe-area-inset-top) - var(--vaadin-app-layout-navbar-offset-top));
    padding-bottom: max(0px, var(--safe-area-inset-bottom) - var(--vaadin-app-layout-navbar-offset-bottom));
    padding-inline: var(--safe-area-inset-inline-start) var(--safe-area-inset-inline-end);
  }

  :host([drawer-opened]:not([overlay])) [part~='content'] {
    padding-inline-start: 0;
  }

  @media (pointer: coarse) and (max-width: 800px) and (min-height: 500px) {
    :host {
      --vaadin-app-layout-touch-optimized: true;
    }
  }

  [part~='navbar'] {
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    inset-inline: 0;
    transition: inherit;
    transition-property: inset-inline-start;
    padding-top: max(var(--vaadin-app-layout-navbar-padding-top, var(--vaadin-padding-s)), var(--safe-area-inset-top));
    padding-bottom: var(--vaadin-app-layout-navbar-padding-bottom, var(--vaadin-padding-s));
    padding-inline-start: max(
      var(--vaadin-app-layout-navbar-padding-inline-start, var(--vaadin-padding-s)),
      var(--safe-area-inset-left)
    );
    /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
    padding-inline-end: max(
      var(--vaadin-app-layout-navbar-padding-inline-end, var(--vaadin-padding-s)),
      var(--safe-area-inset-right)
    );
    z-index: 1;
    gap: var(--vaadin-app-layout-navbar-gap, var(--vaadin-gap-s));
    background: var(--vaadin-app-layout-navbar-background, var(--vaadin-background-container));
  }

  :host([primary-section='drawer'][drawer-opened]:not([overlay])) [part~='navbar'] {
    inset-inline-start: var(--vaadin-app-layout-drawer-offset-left, 0);
  }

  :host([primary-section='drawer']) [part='drawer'] {
    top: 0;
  }

  [part~='navbar-bottom'] {
    top: auto;
    bottom: 0;
    padding-top: var(--vaadin-app-layout-navbar-padding-top, var(--vaadin-padding-s));
    padding-bottom: max(
      var(--vaadin-app-layout-navbar-padding-bottom, var(--vaadin-padding-s)),
      var(--safe-area-inset-bottom)
    );
  }

  [part='drawer'] {
    overflow: auto;
    overscroll-behavior: contain;
    position: fixed;
    top: var(--vaadin-app-layout-navbar-offset-top, 0);
    bottom: var(--vaadin-app-layout-navbar-offset-bottom, var(--vaadin-viewport-offset-bottom, 0));
    inset-inline: var(--vaadin-app-layout-navbar-offset-left, 0) auto;
    transition: inherit;
    transition-property: transform, visibility;
    transform: translateX(calc(-100% - 20px));
    max-width: 90%;
    width: var(--_vaadin-app-layout-drawer-width);
    box-sizing: border-box;
    padding-block: var(--safe-area-inset-top) var(--safe-area-inset-bottom);
    padding-inline-start: var(--safe-area-inset-inline-start);
    outline: none;
    /* The drawer should be inaccessible by the tabbing navigation when it is closed. */
    visibility: hidden;
    display: flex;
    flex-direction: column;
    background: var(--vaadin-app-layout-drawer-background, transparent);
  }

  :host([has-navbar]:not([overlay])) [part='drawer'],
  :host([has-navbar]) [part='content'] {
    --safe-area-inset-top: 0px;
  }

  :host([drawer-opened]) [part='drawer'] {
    /* The drawer should be accessible by the tabbing navigation when it is opened. */
    visibility: visible;
    transform: translateX(0%);
    touch-action: manipulation;
  }

  [part='backdrop'] {
    background: var(--vaadin-overlay-backdrop-background, rgba(0, 0, 0, 0.2));
    forced-color-adjust: none;
  }

  :host(:not([drawer-opened])) [part='backdrop'] {
    opacity: 0 !important;
  }

  :host([overlay]) [part='backdrop'] {
    position: fixed;
    inset: 0;
    pointer-events: none;
    transition: opacity var(--vaadin-app-layout-transition-duration) linear;
    -webkit-tap-highlight-color: transparent;
  }

  :host([overlay]) [part='drawer'] {
    top: 0;
    bottom: 0;
    box-shadow: var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    background: var(--vaadin-app-layout-drawer-background, var(--vaadin-background-color));
  }

  :host([overlay]) [part='drawer'],
  :host([overlay]) [part='backdrop'] {
    z-index: 2;
  }

  :host([drawer-opened][overlay]) [part='backdrop'] {
    pointer-events: auto;
    touch-action: manipulation;
  }

  :host([dir='rtl']) [part='drawer'] {
    transform: translateX(calc(100% + 20px));
  }

  :host([dir='rtl'][drawer-opened]) [part='drawer'] {
    transform: translateX(0%);
  }

  @media (max-width: 800px), (max-height: 600px) {
    :host {
      --vaadin-app-layout-drawer-overlay: true;
      --_vaadin-app-layout-drawer-width: var(--vaadin-app-layout-drawer-width, 320px);
    }
  }

  /* If a vaadin-scroller is used in the drawer, allow it to take all remaining space and contain scrolling */

  [part='drawer'] ::slotted(vaadin-scroller) {
    flex: 1;
    overscroll-behavior: contain;
  }

  @media (forced-colors: active) {
    :host([overlay]) [part='drawer'] {
      border: 3px solid;
    }
  }
`;let dl=new WeakMap,cl=new WeakMap,hl={},ul=0;const pl=t=>t?.nodeType===Node.ELEMENT_NODE,vl=(...t)=>{console.error(`Error: ${t.join(" ")}. Skip setting aria-hidden.`)},_l=(t,e=document.body,n="data-aria-hidden")=>{const i=Array.from(Array.isArray(t)?t:[t]);return e&&i.push(...Array.from(e.querySelectorAll("[aria-live]"))),((t,e,n,i)=>{const r=((t,e)=>pl(t)?e.map(e=>{if(!pl(e))return vl(e,"is not a valid element"),null;let n=e;for(;n&&n!==t;){if(t.contains(n))return e;n=n.getRootNode().host}return vl(e,"is not contained inside",t),null}).filter(t=>Boolean(t)):(vl(t,"is not a valid element"),[]))(e,Array.isArray(t)?t:[t]);hl[n]||(hl[n]=new WeakMap);const s=hl[n],o=[],a=new Set,l=new Set(r),d=t=>{if(!t||a.has(t))return;a.add(t);const e=t.assignedSlot;e&&d(e),d(t.parentNode||t.host)};r.forEach(d);const c=t=>{if(!t||l.has(t))return;const e=t.shadowRoot;(e?[...t.children,...e.children]:[...t.children]).forEach(t=>{if(!["template","script","style"].includes(t.localName))if(a.has(t))c(t);else{const e=t.getAttribute(i),r=null!==e&&"false"!==e,a=(dl.get(t)||0)+1,l=(s.get(t)||0)+1;dl.set(t,a),s.set(t,l),o.push(t),1===a&&r&&cl.set(t,!0),1===l&&t.setAttribute(n,"true"),r||t.setAttribute(i,"true")}})};return c(e),a.clear(),ul+=1,()=>{o.forEach(t=>{const e=dl.get(t)-1,r=s.get(t)-1;dl.set(t,e),s.set(t,r),e||(cl.has(t)?cl.delete(t):t.removeAttribute(i)),r||t.removeAttribute(n)}),ul-=1,ul||(dl=new WeakMap,dl=new WeakMap,cl=new WeakMap,hl={})}})(i,e,n,"aria-hidden")};HTMLElement.prototype;class fl{#u=null;constructor(t,e){this.host=t,this.callback="function"==typeof e?e:()=>t}showModal(){const t=this.callback();this.#u=_l(t)}close(){this.#u&&(this.#u(),this.#u=null)}}let gl=!1;function ml(){let t=document.activeElement||document.body;for(;t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}function bl(){return gl}function yl(t){const e=t.style;if("hidden"===e.visibility||"none"===e.display)return!0;const n=window.getComputedStyle(t);return"hidden"===n.visibility||"none"===n.display}function wl(t,e){const n=Math.max(t.tabIndex,0),i=Math.max(e.tabIndex,0);return 0===n||0===i?i>n:n>i}function xl(t){const e=t.length;if(e<2)return t;const n=Math.ceil(e/2);return function(t,e){const n=[];for(;t.length>0&&e.length>0;)wl(t[0],e[0])?n.push(e.shift()):n.push(t.shift());return n.concat(t,e)}(xl(t.slice(0,n)),xl(t.slice(n)))}function Cl(t){return t.checkVisibility?!t.checkVisibility({visibilityProperty:!0}):null===t.offsetParent&&0===t.clientWidth&&0===t.clientHeight||yl(t)}function kl(t){return t.matches("input, select, textarea, button, object")?t.matches(":not([disabled])"):t.matches("a[href], area[href], iframe, [tabindex], [contentEditable]")}function Al(t){return t.getRootNode().activeElement===t}function El(t,e){if(t.nodeType!==Node.ELEMENT_NODE||yl(t))return!1;const n=t,i=function(t){if(!kl(t))return-1;const e=t.getAttribute("tabindex")||0;return Number(e)}(n);let r,s=i>0;return i>=0&&e.push(n),r="slot"===n.localName?n.assignedNodes({flatten:!0}):(n.shadowRoot||n).children,[...r].forEach(t=>{s=El(t,e)||s}),s}function Sl(t){const e=[];return El(t,e)?xl(e):e}window.addEventListener("keydown",()=>{gl=!0},{capture:!0}),window.addEventListener("mousedown",()=>{gl=!1},{capture:!0});const zl=[];class Ol{trapNode=null;constructor(t){this.host=t}get#p(){return Sl(this.trapNode)}get#v(){const t=this.#p;return t.indexOf(t.filter(Al).pop())}hostConnected(){document.addEventListener("keydown",this.#_)}hostDisconnected(){document.removeEventListener("keydown",this.#_)}trapFocus(t){if(this.trapNode=t,0===this.#p.length)throw this.trapNode=null,new Error("The trap node should have at least one focusable descendant or be focusable itself.");zl.push(this),-1===this.#v&&this.#p[0].focus({focusVisible:bl()})}releaseFocus(){this.trapNode=null,zl.pop()}#_=t=>{if(this.trapNode&&this===Array.from(zl).pop()&&"Tab"===t.key){if(t.defaultPrevented)return;t.preventDefault();const e=t.shiftKey;this.#f(e)}};#f(t=!1){const e=this.#p,n=t?-1:1,i=this.#v,r=e[(e.length+i+n)%e.length];r.focus({focusVisible:!0}),"input"===r.localName&&r.select()}}const Tl=["__proto__","constructor","prototype"],Ll=t=>{if(!t||"object"!=typeof t)return!1;const e=Object.getPrototypeOf(t);return e===Object.prototype||null===e};function Il(t,e,n){return Ll(t)&&Ll(e)?(Object.keys(e).forEach(i=>{if(Tl.includes(i))return;const r=e[i];if(Ll(r)){if(!Object.hasOwn(t,i)||!Ll(t[i])){if(n&&Object.hasOwn(t,i)&&t[i])return;t[i]={}}Il(t[i],r,n)}else n&&Array.isArray(r)?t[i]=[...r]:n&&null==r||(t[i]=r)}),t):t}function $l(t,...e){return e.forEach(e=>Il(t,e,!0)),t}const Ml=t=>class extends t{static get properties(){return{i18n:{type:Object},__effectiveI18n:{type:Object,sync:!0}}}static get defaultI18n(){return{}}constructor(){super(),this.i18n=$l({},this.constructor.defaultI18n)}get i18n(){return this.__customI18n}set i18n(t){t!==this.__customI18n&&(this.__customI18n=t,this.__effectiveI18n=$l({},this.constructor.defaultI18n,this.__customI18n))}},Nl={drawer:"Drawer"},Pl=t=>class extends(Ml(t)){static get properties(){return{primarySection:{type:String,value:"navbar",notify:!0,reflectToAttribute:!0,observer:"__primarySectionChanged",sync:!0},drawerOpened:{type:Boolean,notify:!0,value:!0,reflectToAttribute:!0,observer:"__drawerOpenedChanged",sync:!0},overlay:{type:Boolean,notify:!0,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"__overlayChanged",sync:!0},closeDrawerOn:{type:String,value:"vaadin-router-location-changed",observer:"_closeDrawerOnChanged"}}}static get observers(){return["__i18nChanged(__effectiveI18n)"]}static get defaultI18n(){return Nl}static dispatchCloseOverlayDrawerEvent(){window.dispatchEvent(new CustomEvent("close-overlay-drawer"))}get i18n(){return super.i18n}set i18n(t){super.i18n=t}constructor(){super(),this.__drawerToggleClickListener=this._drawerToggleClick.bind(this),this.__onDrawerKeyDown=this.__onDrawerKeyDown.bind(this),this.__closeOverlayDrawerListener=this.__closeOverlayDrawer.bind(this),this.__trapFocusInDrawer=this.__trapFocusInDrawer.bind(this),this.__releaseFocusFromDrawer=this.__releaseFocusFromDrawer.bind(this),this.__ariaModalController=new fl(this,()=>[...this.querySelectorAll('vaadin-drawer-toggle, [slot="drawer"]')]),this.__focusTrapController=new Ol(this)}connectedCallback(){super.connectedCallback(),this.__resizeObserver=new ResizeObserver(t=>this.__onResize(t)),this.__resizeObserver.observe(this),this.__resizeObserver.observe(this.$.drawer),this.__resizeObserver.observe(this.$.navbarTop),this.__resizeObserver.observe(this.$.navbarBottom),this.addEventListener("drawer-toggle-click",this.__drawerToggleClickListener),window.addEventListener("close-overlay-drawer",this.__closeOverlayDrawerListener),window.addEventListener("keydown",this.__onDrawerKeyDown)}ready(){super.ready(),this.addController(this.__focusTrapController),this.__setAriaExpanded(),this.__updateDrawerSize(),this._blockAnimationUntilAfterNextRender();const{overlayMode:t,touchOptimized:e}=this.__readCSSState();this.__setOverlayMode(t),this.__setTouchOptimized(e);const{drawerOffsetSize:n,navbarTopOffsetSize:i,navbarBottomOffsetSize:r}=this.__readCSSState();this.__setDrawerOffsetSize(n),this.__setNavbarTopOffsetSize(i),this.__setNavbarBottomOffsetSize(r),this.$.drawer.addEventListener("transitionstart",()=>{this.__isDrawerAnimating=!0}),this.$.drawer.addEventListener("transitionend",()=>{this.__isDrawerAnimating=!1,this.__scheduleResize(this.$.drawer)})}disconnectedCallback(){super.disconnectedCallback(),this.__resizeObserver.disconnect(),this.removeEventListener("drawer-toggle-click",this.__drawerToggleClickListener),window.removeEventListener("close-overlay-drawer",this.__closeOverlayDrawerListener),window.removeEventListener("keydown",this.__onDrawerKeyDown)}__onNavbarSlotChange(){const{touchOptimized:t}=this.__readCSSState();this.__setTouchOptimized(t),this.toggleAttribute("has-navbar",!!this.querySelector('[slot="navbar"]'));const{navbarTopOffsetSize:e,navbarBottomOffsetSize:n}=this.__readCSSState();this.__setNavbarTopOffsetSize(e),this.__setNavbarBottomOffsetSize(n)}__onDrawerSlotChange(){this.__updateDrawerSize(),this.toggleAttribute("has-drawer",!!this.querySelector('[slot="drawer"]'));const{drawerOffsetSize:t}=this.__readCSSState();this.__setDrawerOffsetSize(t)}__onResize(t){cancelAnimationFrame(this.__resizeRaf);const e=t.some(({target:t})=>t===this),n=t.some(({target:t})=>[this.$.navbarTop,this.$.navbarBottom].includes(t)),{overlayMode:i,touchOptimized:r,drawerOffsetSize:s,navbarTopOffsetSize:o,navbarBottomOffsetSize:a}=this.__readCSSState(),l=this.__isDrawerAnimating;this.__resizeRaf=requestAnimationFrame(()=>{e&&(this._blockAnimationUntilAfterNextRender(),this.__setOverlayMode(i)),(e||n)&&this.__setTouchOptimized(r),l||(this.__setDrawerOffsetSize(s),this.__setNavbarTopOffsetSize(o),this.__setNavbarBottomOffsetSize(a))})}__primarySectionChanged(t){["navbar","drawer"].includes(t)||(this.primarySection="navbar")}__drawerOpenedChanged(t,e){this.overlay&&(t?this.__trapFocusInDrawer():e&&this.__releaseFocusFromDrawer()),this.__setAriaExpanded()}__overlayChanged(t,e){e&&this.__restoreFocus()}__i18nChanged(){this.__updateDrawerAriaAttributes()}_drawerToggleClick(t){t.stopPropagation(),this.drawerOpened=!this.drawerOpened}__closeOverlayDrawer(){this.overlay&&(this.drawerOpened=!1)}__setAriaExpanded(){const t=this.querySelector("vaadin-drawer-toggle");t&&t.setAttribute("aria-expanded",this.drawerOpened)}__updateDrawerSize(){0===this.querySelectorAll("[slot=drawer]").length?(this.$.drawer.setAttribute("hidden",""),this.style.setProperty("--_vaadin-app-layout-drawer-width",0)):(this.$.drawer.removeAttribute("hidden"),this.style.removeProperty("--_vaadin-app-layout-drawer-width"))}__setDrawerOffsetSize(t){this.style.setProperty("--_vaadin-app-layout-drawer-offset-size",`${t}px`)}__setNavbarTopOffsetSize(t){this.style.setProperty("--_vaadin-app-layout-navbar-offset-size",`${t}px`)}__setNavbarBottomOffsetSize(t){this.style.setProperty("--_vaadin-app-layout-navbar-offset-size-bottom",`${t}px`)}__setOverlayMode(t){!this.overlay&&t&&(this._drawerStateSaved=this.drawerOpened,this.drawerOpened=!1),this._setOverlay(t),!this.overlay&&this._drawerStateSaved&&(this.drawerOpened=this._drawerStateSaved,this._drawerStateSaved=null),this.__updateDrawerAriaAttributes()}__updateDrawerAriaAttributes(){const t=this.$.drawer;this.overlay?(t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label",this.__effectiveI18n.drawer)):(t.removeAttribute("role"),t.removeAttribute("aria-modal"),t.removeAttribute("aria-label"))}__drawerTransitionComplete(){return Promise.all(this.$.drawer.getAnimations().map(t=>t.finished))}async __trapFocusInDrawer(){await this.__drawerTransitionComplete(),this.drawerOpened&&(this.$.drawer.setAttribute("tabindex","0"),this.__ariaModalController.showModal(),this.__focusTrapController.trapFocus(this.$.drawer))}async __releaseFocusFromDrawer(){if(await this.__drawerTransitionComplete(),this.drawerOpened)return;this.__restoreFocus();const t=this.querySelector("vaadin-drawer-toggle");t&&t.focus({focusVisible:bl()})}__restoreFocus(){this.__ariaModalController.close(),this.__focusTrapController.releaseFocus(),this.$.drawer.removeAttribute("tabindex")}__onDrawerKeyDown(t){"Escape"===t.key&&this.overlay&&(this.drawerOpened=!1)}_closeDrawerOnChanged(t,e){e&&window.removeEventListener(e,this.__closeOverlayDrawerListener),t&&window.addEventListener(t,this.__closeOverlayDrawerListener)}_onBackdropClick(t){t.currentTarget.style.removeProperty("pointer-events"),this._close()}_onBackdropTouchend(t){if(t.preventDefault(),navigator.standalone){const e=t.currentTarget;e.style.pointerEvents="auto",setTimeout(()=>e.style.removeProperty("pointer-events"),400)}this._close()}_close(){this.drawerOpened=!1}_getCustomPropertyValue(t){return(getComputedStyle(this).getPropertyValue(t)||"").trim().toLowerCase()}__setTouchOptimized(t){const e=this.querySelectorAll('[slot*="navbar"]');e.length>0&&Array.from(e).forEach(e=>{e.getAttribute("slot").indexOf("touch-optimized")>-1&&(e.__touchOptimized=!0),t&&e.__touchOptimized?e.setAttribute("slot","navbar-bottom"):e.setAttribute("slot","navbar")});const n=this.$.navbarTop.querySelector("[name=navbar]").assignedNodes().length>0;this.$.navbarTop.toggleAttribute("hidden",!n);const i=this.$.navbarBottom.querySelector("[name=navbar-bottom]").assignedNodes().length>0;this.$.navbarBottom.toggleAttribute("hidden",!i)}_blockAnimationUntilAfterNextRender(){this.setAttribute("no-anim",""),this.__debounceAnimation=xa.debounce(this.__debounceAnimation,ma,()=>{setTimeout(()=>{this.removeAttribute("no-anim")})})}__scheduleResize(t){this.__resizeObserver.unobserve(t),this.__resizeObserver.observe(t)}__readCSSState(){return{overlayMode:"true"===this._getCustomPropertyValue("--vaadin-app-layout-drawer-overlay"),touchOptimized:"true"===this._getCustomPropertyValue("--vaadin-app-layout-touch-optimized"),drawerOffsetSize:this.$.drawer.getBoundingClientRect().width,navbarTopOffsetSize:this.$.navbarTop.getBoundingClientRect().height,navbarBottomOffsetSize:this.$.navbarBottom.getBoundingClientRect().height}}};class jl extends(Pl(Oa(al(Ba(Qa(sa)))))){static get is(){return"vaadin-app-layout"}static get styles(){return ll}render(){return Bo`
      <div part="navbar navbar-top" id="navbarTop">
        <slot name="navbar" @slotchange="${this.__onNavbarSlotChange}"></slot>
      </div>
      <div part="backdrop" @click="${this._onBackdropClick}" @touchend="${this._onBackdropTouchend}"></div>
      <div part="drawer" id="drawer">
        <slot name="drawer" id="drawerSlot" @slotchange="${this.__onDrawerSlotChange}"></slot>
      </div>
      <div part="content">
        <slot></slot>
      </div>
      <div part="navbar navbar-bottom" id="navbarBottom" hidden>
        <slot name="navbar-bottom"></slot>
      </div>
      <div hidden>
        <slot id="touchSlot" name="navbar touch-optimized" @slotchange="${this.__onNavbarSlotChange}"></slot>
      </div>
    `}}la(jl);const Bl=Xs`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--vaadin-button-gap, 0 var(--vaadin-gap-s));
    white-space: var(--vaadin-button-label-wrap, normal);
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
    cursor: var(--vaadin-clickable-cursor);
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--vaadin-button-height, fit-content);
    margin: var(--vaadin-button-margin, 0);
    padding: var(--vaadin-button-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    font-family: var(--vaadin-button-font-family, inherit);
    font-size: var(--vaadin-button-font-size, inherit);
    line-height: var(--vaadin-button-line-height, inherit);
    font-weight: var(--vaadin-button-font-weight, 500);
    color: var(--vaadin-button-text-color, var(--vaadin-text-color));
    background: var(--vaadin-button-background, var(--vaadin-background-container));
    background-origin: border-box;
    border: var(--vaadin-button-border-width, 1px) solid
      var(--vaadin-button-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
    touch-action: manipulation;
  }

  :host([hidden]) {
    display: none !important;
  }

  .vaadin-button-container,
  [part='prefix'],
  [part='suffix'] {
    display: contents;
  }

  [part='label'] {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host(:is([focus-ring], :focus-visible)) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: 1px;
  }

  :host([theme~='primary']) {
    --vaadin-button-background: var(--vaadin-text-color);
    --vaadin-button-text-color: var(--vaadin-background-color);
    --vaadin-button-border-color: transparent;
  }

  :host([theme~='tertiary']) {
    background: transparent;
    border-color: transparent;
  }

  :host([disabled]) {
    pointer-events: var(--_vaadin-button-disabled-pointer-events, none);
    cursor: var(--vaadin-disabled-cursor);
    opacity: 0.5;
  }

  :host([disabled][theme~='primary']) {
    --vaadin-button-text-color: var(--vaadin-background-container-strong);
    --vaadin-button-background: var(--vaadin-text-color-disabled);
  }

  @media (forced-colors: active) {
    :host {
      --vaadin-button-border-width: 1px;
      --vaadin-button-background: ButtonFace;
      --vaadin-button-text-color: ButtonText;
    }

    :host([theme~='primary']) {
      forced-color-adjust: none;
      --vaadin-button-background: CanvasText;
      --vaadin-button-text-color: Canvas;
      --vaadin-icon-color: Canvas;
    }

    ::slotted(*) {
      forced-color-adjust: auto;
    }

    :host([disabled]) {
      --vaadin-button-background: transparent !important;
      --vaadin-button-border-color: GrayText !important;
      --vaadin-button-text-color: GrayText !important;
      opacity: 1;
    }
  }
`,Dl="string"==typeof document.head.style.touchAction,Rl="__polymerGestures",Fl="__polymerGesturesHandled",ql="__polymerGesturesTouchAction",Hl=["mousedown","mousemove","mouseup","click"],Vl=[0,1,4,2],Ul=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function Wl(t){return Hl.indexOf(t)>-1}let Kl=!1;function Gl(t){Wl(t)}!function(){try{const t=Object.defineProperty({},"passive",{get(){Kl=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();const Jl=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),Zl={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Xl(t){const e=t.type;if(!Wl(e))return!1;if("mousemove"===e){let e=t.buttons??1;return t instanceof window.MouseEvent&&!Ul&&(e=Vl[t.which]||0),Boolean(1&e)}return 0===(t.button??0)}const Yl={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Ql(t,e,n){t.movefn=e,t.upfn=n,document.addEventListener("mousemove",e),document.addEventListener("mouseup",n)}function td(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}const ed=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],nd={},id=[];function rd(t,e){let n=document.elementFromPoint(t,e),i=n;for(;i?.shadowRoot&&!window.ShadyDOM;){const r=i;if(i=i.shadowRoot.elementFromPoint(t,e),r===i)break;i&&(n=i)}return n}function sd(t){const e=ed(t);return e.length>0?e[0]:t.target}function od(t){const e=t.type,n=t.currentTarget[Rl];if(!n)return;const i=n[e];if(!i)return;if(!t[Fl]&&(t[Fl]={},e.startsWith("touch"))){const n=t.changedTouches[0];if("touchstart"===e&&1===t.touches.length&&(Yl.touch.id=n.identifier),Yl.touch.id!==n.identifier)return;Dl||"touchstart"!==e&&"touchmove"!==e||function(t){const e=t.changedTouches[0],n=t.type;if("touchstart"===n)Yl.touch.x=e.clientX,Yl.touch.y=e.clientY,Yl.touch.scrollDecided=!1;else if("touchmove"===n){if(Yl.touch.scrollDecided)return;Yl.touch.scrollDecided=!0;const n=function(t){let e="auto";const n=ed(t);for(let t,i=0;i<n.length;i++)if(t=n[i],t[ql]){e=t[ql];break}return e}(t);let i=!1;const r=Math.abs(Yl.touch.x-e.clientX),s=Math.abs(Yl.touch.y-e.clientY);t.cancelable&&("none"===n?i=!0:"pan-x"===n?i=s>r:"pan-y"===n&&(i=r>s)),i?t.preventDefault():cd("track")}}(t)}const r=t[Fl];if(!r.skip){for(let e,n=0;n<id.length;n++)e=id[n],i[e.name]&&!r[e.name]&&e.flow&&e.flow.start.indexOf(t.type)>-1&&e.reset&&e.reset();for(let n,s=0;s<id.length;s++)n=id[s],i[n.name]&&!r[n.name]&&(r[n.name]=!0,n[e](t))}}function ad(t,e,n){return!!nd[e]&&(function(t,e,n){const i=nd[e],r=i.deps,s=i.name;let o=t[Rl];o||(t[Rl]=o={});for(let e,n,i=0;i<r.length;i++)e=r[i],Jl&&Wl(e)&&"click"!==e||(n=o[e],n||(o[e]=n={_count:0}),0===n._count&&t.addEventListener(e,od,Gl(e)),n[s]=(n[s]||0)+1,n._count=(n._count||0)+1);t.addEventListener(e,n),i.touchAction&&function(t,e){Dl&&t instanceof HTMLElement&&ya.run(()=>{t.style.touchAction=e}),t[ql]=e}(t,i.touchAction)}(t,e,n),!0)}function ld(t){id.push(t),t.emits.forEach(e=>{nd[e]=t})}function dd(t,e,n){const i=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=n,t.dispatchEvent(i),i.defaultPrevented){const t=n.preventer||n.sourceEvent;t?.preventDefault&&t.preventDefault()}}function cd(t){const e=function(t){for(let e,n=0;n<id.length;n++){e=id[n];for(let n,i=0;i<e.emits.length;i++)if(n=e.emits[i],n===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function hd(t,e,n,i){e&&dd(e,t,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:i,prevent:t=>cd(t)})}function ud(t,e,n){if(t.prevent)return!1;if(t.started)return!0;const i=Math.abs(t.x-e),r=Math.abs(t.y-n);return i>=5||r>=5}function pd(t,e,n){if(!e)return;const i=t.moves[t.moves.length-2],r=t.moves[t.moves.length-1],s=r.x-t.x,o=r.y-t.y;let a,l=0;i&&(a=r.x-i.x,l=r.y-i.y),dd(e,"track",{state:t.state,x:n.clientX,y:n.clientY,dx:s,dy:o,ddx:a,ddy:l,sourceEvent:n,hover:()=>rd(n.clientX,n.clientY)})}function vd(t,e,n){const i=Math.abs(e.clientX-t.x),r=Math.abs(e.clientY-t.y),s=sd(n||e);!s||Zl[s.localName]&&s.hasAttribute("disabled")||(isNaN(i)||isNaN(r)||i<=25&&r<=25||function(t){if("click"===t.type){if(0===t.detail)return!0;const e=sd(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;const n=e.getBoundingClientRect(),i=t.pageX,r=t.pageY;return!(i>=n.left&&i<=n.right&&r>=n.top&&r<=n.bottom)}return!1}(e))&&(t.prevent||dd(s,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:n}))}function _d(t){return new Set(t?t.split(" ").filter(Boolean):[])}function fd(t){return t?[...t].join(" "):""}function gd(t,e,n){n?t.setAttribute(e,n):t.removeAttribute(e)}function md(t){return _d(Array.isArray(t)?t.join(" "):t)}function bd(t,e,n){n=md(n);const i=_d(t.getAttribute(e));n.forEach(t=>i.add(t)),gd(t,e,fd(i))}function yd(t,e,n){n=md(n);const i=_d(t.getAttribute(e));n.forEach(t=>i.delete(t)),gd(t,e,fd(i))}function wd(t){return t.nodeType===Node.TEXT_NODE&&""===t.textContent.trim()}function xd(t){return!!t&&Boolean(t.nodeType===Node.ELEMENT_NODE&&(customElements.get(t.localName)||t.children.length>0)||t.textContent?.trim())}ld({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){td(this.info)},mousedown(t){if(!Xl(t))return;const e=sd(t),n=this;Ql(this.info,t=>{Xl(t)||(hd("up",e,t),td(n.info))},t=>{Xl(t)&&hd("up",e,t),td(n.info)}),hd("down",e,t)},touchstart(t){hd("down",sd(t),t.changedTouches[0],t)},touchend(t){hd("up",sd(t),t.changedTouches[0],t)}}),ld({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,td(this.info)},mousedown(t){if(!Xl(t))return;const e=sd(t),n=this,i=t=>{const i=t.clientX,r=t.clientY;ud(n.info,i,r)&&(n.info.state=n.info.started?"mouseup"===t.type?"end":"track":"start","start"===n.info.state&&cd("tap"),n.info.addMove({x:i,y:r}),Xl(t)||(n.info.state="end",td(n.info)),e&&pd(n.info,e,t),n.info.started=!0)};Ql(this.info,i,t=>{n.info.started&&i(t),td(n.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove(t){const e=sd(t),n=t.changedTouches[0],i=n.clientX,r=n.clientY;ud(this.info,i,r)&&("start"===this.info.state&&cd("tap"),this.info.addMove({x:i,y:r}),pd(this.info,e,n),this.info.state="track",this.info.started=!0)},touchend(t){const e=sd(t),n=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),pd(this.info,e,n))}}),ld({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(t){Xl(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click(t){Xl(t)&&vd(this.info,t)},touchstart(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend(t){vd(this.info,t.changedTouches[0],t)}});const Cd=La(t=>class extends t{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}_disabledChanged(t){this._setAriaDisabled(t)}_setAriaDisabled(t){gd(this,"aria-disabled",t)}click(){this.disabled||super.click()}}),kd=La(t=>class extends t{ready(){super.ready(),this.addEventListener("keydown",t=>{this._onKeyDown(t)}),this.addEventListener("keyup",t=>{this._onKeyUp(t)})}_onKeyDown(t){switch(t.key){case"Enter":this._onEnter(t);break;case"Escape":this._onEscape(t)}}_onKeyUp(t){}_onEnter(t){}_onEscape(t){}}),Ad=t=>class extends(Cd(kd(t))){get _activeKeys(){return[" "]}ready(){super.ready(),ad(this,"down",t=>{this._shouldSetActive(t)&&this._setActive(!0)}),ad(this,"up",()=>{this._setActive(!1)})}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(t){return!this.disabled}_onKeyDown(t){super._onKeyDown(t),this._shouldSetActive(t)&&this._activeKeys.includes(t.key)&&(this._setActive(!0),document.addEventListener("keyup",t=>{this._activeKeys.includes(t.key)&&this._setActive(!1)},{once:!0}))}_setActive(t){this.toggleAttribute("active",t)}},Ed=La(t=>class extends t{get _keyboardActive(){return bl()}ready(){this.addEventListener("focusin",t=>{this._shouldSetFocus(t)&&this._setFocused(!0)}),this.addEventListener("focusout",t=>{this._shouldRemoveFocus(t)&&this._setFocused(!1)}),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}focus(t){super.focus(t),!1!==t?.focusVisible&&this.setAttribute("focus-ring","")}_setFocused(t){this.toggleAttribute("focused",t),this.toggleAttribute("focus-ring",t&&this._keyboardActive)}_shouldSetFocus(t){return!0}_shouldRemoveFocus(t){return!0}}),Sd=t=>class extends(Cd(t)){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged",sync:!0},_lastTabIndex:{type:Number}}}_disabledChanged(t,e){super._disabledChanged(t,e),this.__shouldAllowFocusWhenDisabled()||(t?(void 0!==this.tabindex&&(this._lastTabIndex=this.tabindex),this.setAttribute("tabindex","-1")):e&&(void 0!==this._lastTabIndex?this.setAttribute("tabindex",this._lastTabIndex):this.tabindex=void 0))}_tabindexChanged(t){this.__shouldAllowFocusWhenDisabled()||this.disabled&&-1!==t&&(this._lastTabIndex=t,this.setAttribute("tabindex","-1"))}focus(t){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus(t)}__shouldAllowFocusWhenDisabled(){return!1}},zd=["mousedown","mouseup","click","dblclick","keypress","keydown","keyup"],Od=t=>class extends(Ad(Sd(Ed(t)))){constructor(){super(),this.__onInteractionEvent=this.__onInteractionEvent.bind(this),zd.forEach(t=>{this.addEventListener(t,this.__onInteractionEvent,!0)}),this.tabindex=0}get _activeKeys(){return["Enter"," "]}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","button"),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-button-disabled-pointer-events","auto")}_onKeyDown(t){super._onKeyDown(t),t.altKey||t.shiftKey||t.ctrlKey||t.metaKey||this._activeKeys.includes(t.key)&&(t.preventDefault(),this.click())}__onInteractionEvent(t){this.__shouldSuppressInteractionEvent(t)&&t.stopImmediatePropagation()}__shouldSuppressInteractionEvent(t){return this.disabled}},Td=Xs`
  [part='icon'] {
    background: currentColor;
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-menu) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  [hidden] {
    display: none !important;
  }

  @media (forced-colors: active) {
    [part='icon'] {
      background: CanvasText;
    }
  }
`;class Ld extends(Od(Ea(al(Ba(Qa(sa)))))){static get is(){return"vaadin-drawer-toggle"}static get styles(){return[Bl,Td]}static get properties(){return{ariaLabel:{type:String,value:"Toggle navigation panel",reflectToAttribute:!0,sync:!0},_showFallbackIcon:{type:Boolean,value:!1}}}constructor(){super(),this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("drawer-toggle-click",{bubbles:!0,composed:!0}))})}render(){return Bo`
      <slot id="slot" @slotchange="${this._toggleFallbackIcon}">
        <div part="icon"></div>
      </slot>
      <div part="icon" ?hidden="${!this._showFallbackIcon}"></div>
    `}ready(){super.ready(),this._toggleFallbackIcon()}_toggleFallbackIcon(){const t=this.$.slot.assignedNodes();this._showFallbackIcon=t.length>0&&t.every(t=>wd(t))}}la(Ld);const Id=t=>t??Fo;class $d{constructor(t,e,n={}){this.target=t,this.callback=e,this.forceInitial=n.forceInitial,this._storedNodes=[],this._isSlot=t instanceof HTMLSlotElement,this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),n.syncInitial?this.flush():this._schedule()}connect(){this.target.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.target.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled&&this.flush()}))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_collectNodes(){const t=this._isSlot?[this.target]:[...this.target.querySelectorAll("slot")];return[...new Set(t.flatMap(t=>t.assignedNodes({flatten:!0})))]}_groupNodesBySlot(t){const e=new Map;return t.forEach(t=>{const n=t.assignedSlot;e.set(n,e.get(n)??[]),e.get(n).push(t)}),e}_collectMovedNodes(t){const e=this._groupNodesBySlot(t),n=this._groupNodesBySlot(this._storedNodes),i=[];return e.forEach((t,e)=>{const r=n.get(e)||[];new Set(r).difference(new Set(t)).size>0||r.forEach((e,n)=>{t.indexOf(e)!==n&&i.push(e)})}),i}_processNodes(){const t=this._collectNodes(),e=t.filter(t=>!this._storedNodes.includes(t)),n=this._storedNodes.filter(e=>!t.includes(e)),i=this._collectMovedNodes(t);(e.length||n.length||i.length||this.forceInitial)&&this.callback({addedNodes:e,currentNodes:t,movedNodes:i,removedNodes:n}),this.forceInitial&&(this.forceInitial=!1),this._storedNodes=t}}const Md=Xs`
  :host {
    display: inline-flex;
    align-items: baseline;
    flex-shrink: 0;
    font-size: var(--vaadin-breadcrumbs-font-size, 1em);
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([current]) {
    color: var(--vaadin-text-color);
    font-weight: bolder;
  }

  [part='link'],
  [part='nolink'] {
    display: inline-flex;
    gap: var(--vaadin-breadcrumbs-item-gap, var(--vaadin-gap-xs));
    align-items: baseline;
    border-radius: var(--vaadin-breadcrumbs-item-border-radius, var(--vaadin-radius-m));
    padding: var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container);
    flex: 1;
  }

  :host(:not([slot='overlay'])) :is([part='link'], [part='nolink']) {
    margin-inline: calc(var(--vaadin-padding-inline-container) * -1);
  }

  [part='link'] {
    text-decoration: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:any-link {
      color: var(--vaadin-breadcrumbs-link-color, LinkText);
    }

    &:focus-visible {
      outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    }
  }

  :host::after {
    content: '\\2003' / '';
    display: inline-flex;
    align-items: center;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    background: currentColor;
    mask: var(--vaadin-breadcrumbs-separator-icon, var(--_vaadin-icon-chevron-right)) center /
      var(--vaadin-icon-visual-size, 100%) no-repeat;
    margin-inline-start: var(--vaadin-breadcrumbs-gap, var(--vaadin-gap-xs));
    opacity: 0.75;
  }

  :host(:last-of-type)::after,
  :host([current])::after {
    display: none;
  }

  :host([dir='rtl'])::after {
    scale: -1;
  }

  :host([slot='overlay']) {
    display: flex;

    [part='link'] {
      border-radius: var(--vaadin-radius-s);
    }
  }

  :host([slot='overlay'][disabled]),
  :host([slot='overlay']:not([path])) {
    color: var(--vaadin-text-color-secondary);
  }

  :host([slot='overlay'][focus-ring]) [part='link'] {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) * -1);
  }

  :host([slot='overlay'])::after {
    display: none;
  }

  @media (any-hover: hover) {
    :host([slot='overlay']) [part='link'] {
      text-decoration: none;
    }
  }

  @media (forced-colors: active) {
    :host::after {
      background: CanvasText;
    }
  }
`;class Nd extends(Ed(Cd(Oa(Ba(Qa(sa)))))){static get is(){return"vaadin-breadcrumbs-item"}static get shadowRootOptions(){return{...sa.shadowRootOptions,delegatesFocus:!0}}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}static get properties(){return{path:{type:String},current:{type:Boolean,value:!1,readOnly:!0,reflectToAttribute:!0}}}static get styles(){return Md}firstUpdated(){super.firstUpdated(),this.hasAttribute("role")||this.setAttribute("role","listitem")}render(){return Bo`
      ${null==this.path?Bo`
              <span part="nolink" aria-current="${this.current?"page":Fo}">
                <slot name="prefix"></slot>
                <span part="label">
                  <slot></slot>
                </span>
              </span>
            `:Bo`
              <a
                href="${Id(this.disabled?null:this.path)}"
                tabindex="${this.disabled?"-1":"0"}"
                part="link"
              >
                <slot name="prefix"></slot>
                <span part="label">
                  <slot></slot>
                </span>
              </a>
            `}
    `}ready(){super.ready(),this.__slotObserver=new $d(this.shadowRoot,()=>{this.toggleAttribute("has-prefix",!!this.querySelector('[slot="prefix"]'))},{syncInitial:!0})}focus(t){this.disabled||super.focus(t)}_shouldSetFocus(){return!this.disabled}}la(Nd);const Pd=[{name:"--vaadin-overlay-animation-duration",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-delay",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-timing-function",syntax:"*",initialValue:"ease"},{name:"--vaadin-overlay-opacity-closed",syntax:"<number>",initialValue:"0"},{name:"--vaadin-overlay-translate-closed",syntax:"<length>+ | <percentage>+",initialValue:"0px"},{name:"--vaadin-overlay-scale-closed",syntax:"<number> | <percentage>",initialValue:"1"},{name:"--vaadin-overlay-transform-closed",syntax:"*"}];Pd.forEach(t=>{Da({inherits:!1,...t})});const jd=Zs(Pd.map(({name:t})=>`${t}: inherit;`).join("\n")),Bd=Xs`
  :host,
  [part='overlay'],
  [part='backdrop'] {
    ${jd}
  }

  :host(:where([opening], [closing])) {
    /* This empty animation only reports the state, the parts run the visible animation */
    animation-name: --no-op;
    animation-duration: var(--vaadin-overlay-animation-duration);
    animation-delay: var(--vaadin-overlay-animation-delay);
  }

  :host(:where([closing])) [part='overlay'],
  :host(:where([closing])) ::slotted(*) {
    pointer-events: none !important;
  }

  :host(:where([opening], [closing])) :is([part='overlay'], [part='backdrop']) {
    animation-name: --fade, --transform;
    animation-duration: var(--vaadin-overlay-animation-duration);
    animation-timing-function: var(--vaadin-overlay-animation-timing-function);
    animation-delay: var(--vaadin-overlay-animation-delay);
    /* Fill backwards only, so the closed value applies during the delay without overriding theme styles */
    animation-fill-mode: backwards;

    @media (prefers-reduced-motion) {
      animation-name: --fade;
    }
  }

  :host(:where([opening], [closing])) [part='backdrop'] {
    animation-name: --fade;
    animation-timing-function: linear;
    --vaadin-overlay-opacity-closed: 0;
  }

  :host(:where([closing])) :is([part='overlay'], [part='backdrop']) {
    animation-direction: reverse;
    animation-fill-mode: both;
  }

  @keyframes --no-op {
  }

  /* Only the closed state is declared, so the animations end at the value the part already has */
  @keyframes --transform {
    0% {
      transform: var(--vaadin-overlay-transform-closed);
      translate: var(--vaadin-overlay-translate-closed);
      scale: var(--vaadin-overlay-scale-closed);
    }
  }

  @keyframes --fade {
    0% {
      opacity: var(--vaadin-overlay-opacity-closed);
    }
  }
`,Dd=[Xs`
  :host {
    z-index: 200;
    position: fixed;

    /* Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part. */

    /* Default position constraints. Themes can
          override this to adjust the gap between the overlay and the viewport. */
    inset: max(env(safe-area-inset-top, 0px), var(--vaadin-overlay-viewport-inset, 8px))
      max(env(safe-area-inset-right, 0px), var(--vaadin-overlay-viewport-inset, 8px))
      max(env(safe-area-inset-bottom, 0px), var(--vaadin-overlay-viewport-bottom))
      max(env(safe-area-inset-left, 0px), var(--vaadin-overlay-viewport-inset, 8px));

    /* Override native [popover] user agent styles */
    width: auto;
    height: auto;
    border: none;
    padding: 0;
    background-color: transparent;
    overflow: visible;

    /* Use flexbox alignment for the overlay part. */
    display: flex;
    flex-direction: column; /* makes dropdowns sizing easier */
    /* Align to center by default. */
    align-items: center;
    justify-content: center;

    /* Allow centering when max-width/max-height applies. */
    margin: auto;

    /* The host is not clickable, only the overlay part is. */
    pointer-events: none;

    /* Remove tap highlight on touch devices. */
    -webkit-tap-highlight-color: transparent;

    /* CSS API for host */
    --vaadin-overlay-viewport-bottom: 8px;
  }

  :host([hidden]),
  :host(:not([opened]):not([closing])),
  :host(:not([opened]):not([closing])) [part='overlay'] {
    display: none !important;
  }

  :host([suppressed]) [part='overlay'],
  :host([suppressed]) ::slotted(*) {
    pointer-events: none !important;
  }

  [part='overlay'] {
    color: var(--vaadin-overlay-text-color, var(--vaadin-text-color));
    background: var(--vaadin-overlay-background, var(--vaadin-background-color));
    border: var(--vaadin-overlay-border-width, 1px) solid
      var(--vaadin-overlay-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-overlay-border-radius, var(--vaadin-radius-m));
    box-shadow: var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    box-sizing: border-box;
    max-width: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    pointer-events: auto;
    -webkit-tap-highlight-color: initial;

    /* CSS reset for font styles */
    font: initial;
    letter-spacing: initial;
    text-align: initial;
    text-decoration: initial;
    text-indent: initial;
    text-transform: initial;
    user-select: text;
    white-space: initial;
    word-spacing: initial;

    /* Inherit font-family */
    font-family: inherit;
  }

  [part='backdrop'] {
    background: var(--vaadin-overlay-backdrop-background, rgba(0, 0, 0, 0.2));
    content: '';
    inset: 0;
    pointer-events: auto;
    position: fixed;
    z-index: -1;
  }

  [part='overlay']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      border: 3px solid !important;
    }
  }
`,Bd],Rd=new WeakSet;class Fd{saveFocus(t){this.focusNode=t||ml()}restoreFocus(t){const e=this.focusNode;if(!e)return;const n={preventScroll:!!t&&t.preventScroll,focusVisible:!!t&&t.focusVisible};ml()===document.body?setTimeout(()=>e.focus(n)):e.focus(n),this.focusNode=null}}const qd=t=>class extends t{static get properties(){return{focusTrap:{type:Boolean,value:!1},autofocus:{type:Boolean,value:!1},restoreFocusOnClose:{type:Boolean,value:!1},restoreFocusNode:{type:HTMLElement}}}static get manageFocus(){return!0}constructor(){super(),this.__manageFocus=this.constructor.manageFocus,this.__manageFocus&&(this.__focusTrapController=new Ol(this),this.__focusRestorationController=new Fd)}get _contentRoot(){return this}ready(){super.ready(),this.__manageFocus&&(this.addController(this.__focusTrapController),this.addController(this.__focusRestorationController))}get _focusRoot(){return this.$.overlay}_resetFocus(){if(this.__manageFocus&&(this.focusTrap&&this.__focusTrapController.releaseFocus(),this.restoreFocusOnClose&&this._shouldRestoreFocus())){const t=bl(),e=!t;this.__focusRestorationController.restoreFocus({preventScroll:e,focusVisible:t})}}_saveFocus(){this.__manageFocus&&this.restoreFocusOnClose&&this.__focusRestorationController.saveFocus(this.restoreFocusNode)}_initFocus(){if(!this.__manageFocus||Cl(this._focusRoot))return;const t=Sl(this._focusRoot);if(!t.some(Al)){const e=t.find(t=>this.#g(t))??(this.autofocus?t[0]:null);e?.focus({focusVisible:bl()})}this.focusTrap&&this.__focusTrapController.trapFocus(this._focusRoot)}_shouldRestoreFocus(){const t=ml();return t===document.body||this._deepContains(t)}_deepContains(t){if(this._contentRoot.contains(t))return!0;let e=t;const n=t.ownerDocument;for(;e&&e!==n&&e!==this._contentRoot;)e=e.parentNode||e.host;return e===this._contentRoot}#g(t){const e=this._focusRoot;let n=t;for(;n&&n!==e&&n!==this;){if(n.autofocus&&(n===t||customElements.get(n.localName)))return!0;n=n.assignedSlot||n.parentNode||n.host}return!1}},Hd=new Set,Vd=()=>[...Hd].filter(t=>!t.hasAttribute("closing")),Ud=(t,e=t=>!0)=>t===Vd().filter(e).pop(),Wd=t=>class extends t{get _last(){return Ud(this)}get _isAttached(){return Hd.has(this)}bringToFront(){if(Ud(this))return;const t=(t=>{const e=Vd(),n=e.indexOf(t);return-1===n?[]:e.slice(n+1)})(this),e=t.filter(t=>{return t._hasOverlayPositionMixin&&(e=t,this._deepContains(e));var e});e.length!==t.length&&[this,...e].forEach(t=>{t.matches(":popover-open")&&(t.hidePopover(),t.showPopover()),t._removeAttachedInstance(),t._appendAttachedInstance()})}_enterModalState(){"none"!==document.body.style.pointerEvents&&(this._previousDocumentPointerEvents=document.body.style.pointerEvents,document.body.style.pointerEvents="none"),Vd().forEach(t=>{t!==this&&t.toggleAttribute("suppressed",!0)})}_exitModalState(){void 0!==this._previousDocumentPointerEvents&&(document.body.style.pointerEvents=this._previousDocumentPointerEvents,delete this._previousDocumentPointerEvents);const t=Vd();let e;for(;(e=t.pop())&&(e===this||(e.toggleAttribute("suppressed",!1),e.modeless)););}_appendAttachedInstance(){Hd.add(this)}_removeAttachedInstance(){this._isAttached&&Hd.delete(this)}};function Kd(t,e,n){const i=[t];t.owner&&i.push(t.owner),"string"==typeof n?i.forEach(t=>{t.setAttribute(e,n)}):n?i.forEach(t=>{t.setAttribute(e,"")}):i.forEach(t=>{t.removeAttribute(e)})}const Gd=t=>class extends(qd(Wd(t))){static get properties(){return{opened:{type:Boolean,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},owner:{type:Object,sync:!0},model:{type:Object,sync:!0},renderer:{type:Object,sync:!0},modeless:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_modelessChanged",sync:!0},hidden:{type:Boolean,reflectToAttribute:!0,observer:"_hiddenChanged",sync:!0},withBackdrop:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_withBackdropChanged",sync:!0}}}static get observers(){return["_rendererOrDataChanged(renderer, owner, model, opened)"]}get _rendererRoot(){return this}constructor(){super(),this._boundMouseDownListener=this._mouseDownListener.bind(this),this._boundMouseUpListener=this._mouseUpListener.bind(this),this._boundOutsideClickListener=this._outsideClickListener.bind(this),this._boundKeydownListener=this._keydownListener.bind(this),Fs&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(){super.firstUpdated(),this.popover="manual",this.addEventListener("click",()=>{}),this.$.backdrop&&this.$.backdrop.addEventListener("click",()=>{})}connectedCallback(){super.connectedCallback(),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener)),this.opened&&this._attachOverlay()}disconnectedCallback(){super.disconnectedCallback(),this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener)}requestContentUpdate(){this.renderer&&this.renderer.call(this.owner,this._rendererRoot,this.owner,this.model)}close(t){const e=new CustomEvent("vaadin-overlay-close",{bubbles:!0,cancelable:!0,detail:{overlay:this,sourceEvent:t}});this.dispatchEvent(e),document.body.dispatchEvent(e),e.defaultPrevented||(this.opened=!1)}setBounds(t,e=!0){const n=this.$.overlay,i={...t};e&&"absolute"!==n.style.position&&(n.style.position="absolute"),Object.keys(i).forEach(t=>{null===i[t]||isNaN(i[t])||(i[t]=`${i[t]}px`)}),Object.assign(n.style,i)}_detectIosNavbar(){if(!this.opened)return;const t=window.innerHeight,e=window.innerWidth>t,n=document.documentElement.clientHeight;e&&n>t?this.style.setProperty("--vaadin-overlay-viewport-bottom",n-t+"px"):this.style.setProperty("--vaadin-overlay-viewport-bottom","0px")}_shouldAddGlobalListeners(){return!this.modeless}_addGlobalListeners(){this.__hasGlobalListeners||(this.__hasGlobalListeners=!0,document.addEventListener("mousedown",this._boundMouseDownListener),document.addEventListener("mouseup",this._boundMouseUpListener),document.documentElement.addEventListener("click",this._boundOutsideClickListener,!0))}_removeGlobalListeners(){this.__hasGlobalListeners&&(this.__hasGlobalListeners=!1,document.removeEventListener("mousedown",this._boundMouseDownListener),document.removeEventListener("mouseup",this._boundMouseUpListener),document.documentElement.removeEventListener("click",this._boundOutsideClickListener,!0))}_rendererOrDataChanged(t,e,n,i){const r=this._oldOwner!==e||this._oldModel!==n;this._oldModel=n,this._oldOwner=e;const s=this._oldRenderer!==t,o=void 0!==this._oldRenderer;this._oldRenderer=t;const a=this._oldOpened!==i;this._oldOpened=i,s&&o&&(this._rendererRoot.innerHTML="",delete this._rendererRoot._$litPart$),i&&t&&(s||a||r)&&this.requestContentUpdate()}_modelessChanged(t){this.opened&&(this._shouldAddGlobalListeners()?this._addGlobalListeners():this._removeGlobalListeners()),t?this._exitModalState():this.opened&&this._enterModalState(),Kd(this,"modeless",t)}_withBackdropChanged(t){Kd(this,"with-backdrop",t)}_openedChanged(t,e){if(t){if(!this.isConnected)return void(this.opened=!1);this._saveFocus(),this._animatedOpening(),this.__scheduledOpen=requestAnimationFrame(()=>{setTimeout(()=>{this._initFocus();const t=new CustomEvent("vaadin-overlay-open",{detail:{overlay:this},bubbles:!0});this.dispatchEvent(t),document.body.dispatchEvent(t)})}),document.addEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._addGlobalListeners()}else e&&(this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._resetFocus(),this._animatedClosing(),document.removeEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._removeGlobalListeners())}_hiddenChanged(t){t&&this.hasAttribute("closing")&&this._flushAnimation("closing")}_enqueueAnimation(t,e){const n=this.getAnimations().filter(t=>t instanceof CSSAnimation&&t.effect.getComputedTiming().activeDuration>0);if(0===n.length)return void e();const i=`__${t}Handler`,r=()=>{this[i]===r&&(delete this[i],e())};this[i]=r,Promise.all(n.map(t=>t.finished)).then(r,r)}_flushAnimation(t){const e=`__${t}Handler`;"function"==typeof this[e]&&this[e]()}_animatedOpening(){this._isAttached&&this.hasAttribute("closing")&&this._flushAnimation("closing"),this._attachOverlay(),this._appendAttachedInstance(),this.modeless||this._enterModalState(),Kd(this,"opening",!0),this._enqueueAnimation("opening",()=>{this._finishOpening()})}_attachOverlay(){this.matches(":popover-open")||this.showPopover()}_finishOpening(){Kd(this,"opening",!1)}_finishClosing(){this._detachOverlay(),this._removeAttachedInstance(),this.toggleAttribute("suppressed",!1),Kd(this,"closing",!1),this.dispatchEvent(new CustomEvent("vaadin-overlay-closed"))}_animatedClosing(){this.hasAttribute("opening")&&this._flushAnimation("opening"),this._isAttached&&(this._exitModalState(),Kd(this,"closing",!0),this.dispatchEvent(new CustomEvent("vaadin-overlay-closing")),this._enqueueAnimation("closing",()=>{this._finishClosing()}))}_detachOverlay(){this.hidePopover()}_mouseDownListener(t){this._mouseDownInside=t.composedPath().indexOf(this.$.overlay)>=0}_mouseUpListener(t){this._mouseUpInside=t.composedPath().indexOf(this.$.overlay)>=0}_shouldCloseOnOutsideClick(t){return this._last}_outsideClickListener(t){if(t.composedPath().includes(this.$.overlay)||this._mouseDownInside||this._mouseUpInside)return this._mouseDownInside=!1,void(this._mouseUpInside=!1);if(!this._shouldCloseOnOutsideClick(t))return;const e=new CustomEvent("vaadin-overlay-outside-click",{cancelable:!0,detail:{sourceEvent:t}});this.dispatchEvent(e),this.opened&&!e.defaultPrevented&&(this.close(t),this.opened||this.modeless||function(t){Rd.add(t)}(t))}_keydownListener(t){if(this._last&&!t.defaultPrevented&&(this._shouldAddGlobalListeners()||t.composedPath().includes(this._focusRoot))&&"Escape"===t.key){const e=new CustomEvent("vaadin-overlay-escape-press",{cancelable:!0,detail:{sourceEvent:t}});this.dispatchEvent(e),this.opened&&!e.defaultPrevented&&this.close(t)}}},Jd={start:"top",end:"bottom"},Zd={start:"left",end:"right"},Xd=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(t=>{t.target.__overlay&&t.target.__overlay._updatePosition()})})}),Yd=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null,sync:!0},horizontalAlign:{type:String,value:"start",sync:!0},verticalAlign:{type:String,value:"top",sync:!0},noHorizontalOverlap:{type:Boolean,value:!1,sync:!0},noVerticalOverlap:{type:Boolean,value:!1,sync:!0},requiredVerticalSpace:{type:Number,value:0,sync:!0}}}constructor(){super(),this._hasOverlayPositionMixin=!0,this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}updated(t){if(super.updated(t),t.has("positionTarget")){const e=t.get("positionTarget");this.__oldContentWidth=void 0,this.__oldContentHeight=void 0,(!this.positionTarget&&e||this.positionTarget&&!e&&this.__margins)&&this.__resetPosition()}(t.has("opened")||t.has("positionTarget"))&&this.__updatePositionSettings(this.opened,this.positionTarget),["horizontalAlign","verticalAlign","noHorizontalOverlap","noVerticalOverlap","requiredVerticalSpace"].some(e=>t.has(e))&&this._updatePosition()}__addUpdatePositionEventListeners(){window.visualViewport.addEventListener("resize",this._updatePosition),window.visualViewport.addEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes=function(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}t.nodeType!==Node.DOCUMENT_FRAGMENT_NODE?t=t.assignedSlot?t.assignedSlot:t.parentNode:(e.push(t),t=t.host)}return e}(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(t=>{t.addEventListener("scroll",this.__onScroll,!0)}),this.positionTarget&&(this.__observePositionTargetMove=function(t,e){let n,i=null;const r=document.documentElement;function s(){n&&clearTimeout(n),i?.disconnect(),i=null}return function o(a=!1,l=1){s();const{left:d,top:c,width:h,height:u}=t.getBoundingClientRect();if(a||e(),!h||!u)return;const p={rootMargin:`${-Math.floor(c)}px ${-Math.floor(r.clientWidth-(d+h))}px ${-Math.floor(r.clientHeight-(c+u))}px ${-Math.floor(d)}px`,threshold:Math.max(0,Math.min(1,l))||1};let v=!0;i=new IntersectionObserver(function(t){const e=t[0].intersectionRatio;if(e!==l){if(!v)return o();e?o(!1,e):n=setTimeout(()=>{o(!1,1e-7)},1e3)}v=!1},p),i.observe(t)}(!0),s}(this.positionTarget,()=>{this._updatePosition()}))}__removeUpdatePositionEventListeners(){window.visualViewport.removeEventListener("resize",this._updatePosition),window.visualViewport.removeEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(t=>{t.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null),this.__observePositionTargetMove&&(this.__observePositionTargetMove(),this.__observePositionTargetMove=null)}__updatePositionSettings(t,e){if(this.__removeUpdatePositionEventListeners(),e&&(e.__overlay=null,Xd.unobserve(e),t&&(this.__addUpdatePositionEventListeners(),e.__overlay=this,Xd.observe(e))),t){const t=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(e=>{this.__margins[e]=parseInt(t[e],10)})),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__onScroll(t){t.target instanceof Node&&this._deepContains(t.target)||this._updatePosition()}__resetPosition(){this.__margins=null,Object.assign(this.style,{justifyContent:"",alignItems:"",top:"",bottom:"",left:"",right:""}),Kd(this,"bottom-aligned",!1),Kd(this,"top-aligned",!1),Kd(this,"end-aligned",!1),Kd(this,"start-aligned",!1)}_updatePosition(){if(!this.positionTarget||!this.opened||!this.__margins)return;const t=this.positionTarget.getBoundingClientRect();if(0===t.width&&0===t.height&&this.opened)return void(this.opened=!1);const e=this.__shouldAlignStartVertically(t);this.style.justifyContent=e?"flex-start":"flex-end";const n=this.__isRTL,i=this.__shouldAlignStartHorizontally(t,n),r=!n&&i||n&&!i;this.style.alignItems=r?"flex-start":"flex-end";const s=this.getBoundingClientRect(),o=this.__calculatePositionInOneDimension(t,s,this.noVerticalOverlap,Jd,this,e),a=this.__calculatePositionInOneDimension(t,s,this.noHorizontalOverlap,Zd,this,i);Object.assign(this.style,o,a),Kd(this,"bottom-aligned",!e),Kd(this,"top-aligned",e),Kd(this,"end-aligned",!r),Kd(this,"start-aligned",r)}__shouldAlignStartHorizontally(t,e){const n=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const i=Math.min(window.innerWidth,document.documentElement.clientWidth),r=!e&&"start"===this.horizontalAlign||e&&"end"===this.horizontalAlign;return this.__shouldAlignStart(t,n,i,this.__margins,r,this.noHorizontalOverlap,Zd)}__shouldAlignStartVertically(t){const e=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const n=Math.min(window.innerHeight,document.documentElement.clientHeight),i="top"===this.verticalAlign;return this.__shouldAlignStart(t,e,n,this.__margins,i,this.noVerticalOverlap,Jd)}__shouldAlignStart(t,e,n,i,r,s,o){const a=n-t[s?o.end:o.start]-i[o.end],l=t[s?o.start:o.end]-i[o.start],d=r?a:l;return r===(d>(r?l:a)||d>e)}__adjustBottomProperty(t,e,n){let i;if(t===e.end){if(e.end===Jd.end){const t=Math.min(window.innerHeight,document.documentElement.clientHeight);n>t&&this.__oldViewportHeight&&(i=n-(this.__oldViewportHeight-t)),this.__oldViewportHeight=t}if(e.end===Zd.end){const t=Math.min(window.innerWidth,document.documentElement.clientWidth);n>t&&this.__oldViewportWidth&&(i=n-(this.__oldViewportWidth-t)),this.__oldViewportWidth=t}}return i}__calculatePositionInOneDimension(t,e,n,i,r,s){const o=s?i.start:i.end,a=s?i.end:i.start,l=parseFloat(r.style[o]||getComputedStyle(r)[o]),d=this.__adjustBottomProperty(o,i,l),c=e[s?i.start:i.end]-t[n===s?i.end:i.start],h=d?`${d}px`:`${l+c*(s?-1:1)}px`;return{[o]:h,[a]:""}}};class Qd extends(Yd(Gd(Ea(Ba(Qa(sa)))))){static get is(){return"vaadin-breadcrumbs-overlay"}static get styles(){return[Dd,Xs`
        [part='content'] {
          padding: var(--vaadin-item-overlay-padding, 4px);
        }

        :host([top-aligned]) [part='overlay'] {
          margin-top: var(--_offset, 4px);
        }

        :host([bottom-aligned]) [part='overlay'] {
          margin-bottom: var(--_offset, 4px);
        }
      `]}render(){return Bo`
      <div part="overlay" id="overlay">
        <div part="content" id="content" role="list">
          <slot></slot>
        </div>
      </div>
    `}_shouldCloseOnOutsideClick(t){const e=t.composedPath();return!e.includes(this.positionTarget)&&!e.includes(this)}get _contentRoot(){return this.owner}_initFocus(){}}la(Qd);const tc=t=>class extends(kd(t)){get focused(){return(this._getItems()||[]).find(Al)}get _vertical(){return!0}get _tabNavigation(){return!1}focus(t){const e=this._getFocusableIndex();e>=0&&this._focus(e,t)}_getFocusableIndex(){const t=this._getItems();return Array.isArray(t)?this._getAvailableIndex(t,0,null,t=>!Cl(t)):-1}_getItems(){return Array.from(this.children)}_onKeyDown(t){if(super._onKeyDown(t),t.metaKey||t.ctrlKey)return;const{key:e,shiftKey:n}=t,i=this._getItems()||[],r=i.indexOf(this.focused);let s,o;const a=this._vertical||"rtl"!==this.getAttribute("dir")?1:-1;this.__isPrevKeyPressed(e,n)?(o=-a,s=r-a):this.__isNextKeyPressed(e,n)?(o=a,s=r+a):"Home"===e?(o=1,s=0):"End"===e&&(o=-1,s=i.length-1),s=this._getAvailableIndex(i,s,o,t=>!Cl(t)),this._tabNavigation&&"Tab"===e&&(s>r&&t.shiftKey||s<r&&!t.shiftKey||s===r)||s>=0&&(t.preventDefault(),this._focus(s,{focusVisible:!0,preventScroll:!0},!0))}__isPrevKeyPressed(t,e){return this._vertical?"ArrowUp"===t:"ArrowLeft"===t||this._tabNavigation&&"Tab"===t&&e}__isNextKeyPressed(t,e){return this._vertical?"ArrowDown"===t:"ArrowRight"===t||this._tabNavigation&&"Tab"===t&&!e}_focus(t,e,n=!1){const i=this._getItems();this._focusItem(i[t],e,n)}_focusItem(t,e){t&&t.focus(e)}_getAvailableIndex(t,e,n,i){const r=t.length;let s=e;for(let e=0;"number"==typeof s&&e<r;e+=1,s+=n||1){s<0?s=r-1:s>=r&&(s=0);const e=t[s];if(this._isItemFocusable(e)&&this.__isMatchingItem(e,i))return s}return-1}__isMatchingItem(t,e){return"function"!=typeof e||e(t)}_isItemFocusable(t){return!t.hasAttribute("disabled")}},ec=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(t=>{t.target.isConnected&&(t.target.resizables?t.target.resizables.forEach(e=>{e._onResize(t.contentRect)}):t.target._onResize(t.contentRect))})})}),nc=La(t=>class extends t{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),ec.observe(this),this._observeParent){const t=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;t.resizables||(t.resizables=new Set,ec.observe(t)),t.resizables.add(this),this.__parent=t}}disconnectedCallback(){super.disconnectedCallback(),ec.unobserve(this);const t=this.__parent;if(this._observeParent&&t){const e=t.resizables;e&&(e.delete(this),0===e.size&&ec.unobserve(t)),this.__parent=null}}_onResize(t){}}),ic=Xs`
  :host {
    display: block;
    width: 100%;
    min-width: 0;
    color: var(--vaadin-breadcrumbs-text-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-breadcrumbs-font-size, 1em);
    line-height: var(--vaadin-breadcrumbs-line-height, inherit);
    font-weight: var(--vaadin-breadcrumbs-font-weight, 400);
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='list'] {
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    gap: var(--vaadin-breadcrumbs-gap, var(--vaadin-gap-xs));
    min-width: 0;
    max-width: 100%;
  }

  [part='overflow'] {
    display: inline-flex;
    align-items: inherit;
    flex-shrink: 0;
  }

  [part='overflow'][hidden] {
    display: none !important;
  }

  [part='overflow-button'] {
    appearance: none;
    background: transparent;
    color: inherit;
    border: none;
    border-radius: var(--vaadin-breadcrumbs-item-border-radius, var(--vaadin-radius-m));
    box-sizing: border-box;
    --_padding: var(--vaadin-padding-block-container);
    padding: var(--_padding);
    margin: calc(var(--_padding) * -1);
    /* Ensure minimum click target (WCAG) */
    min-height: 24px;
    min-width: 24px;
    font: inherit;
    cursor: var(--vaadin-clickable-cursor);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  [part='overflow-button']::before {
    content: '\\2003' / '';
    display: inline-flex;
    align-items: center;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    background: currentColor;
    mask: var(--vaadin-breadcrumbs-overflow-icon, var(--_vaadin-icon-ellipsis)) center /
      var(--vaadin-icon-visual-size, 100%) no-repeat;
    opacity: 0.8;
  }

  [part='overflow-button']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  [part='overflow']::after {
    content: '\\2003' / '';
    display: inline-flex;
    align-items: center;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    background: currentColor;
    mask: var(--vaadin-breadcrumbs-separator-icon, var(--_vaadin-icon-chevron-right)) center /
      var(--vaadin-icon-visual-size, 100%) no-repeat;
    margin-inline-start: var(--vaadin-breadcrumbs-gap, var(--vaadin-gap-xs));
    opacity: 0.75;
  }

  :host([dir='rtl']) [part='overflow']::after {
    scale: -1;
  }

  :host(:where(:not([theme~='slash']))) [part='overflow']::after,
  :host(:where(:not([theme~='slash']))) ::slotted(vaadin-breadcrumbs-item)::after {
    --vaadin-icon-visual-size: 90%;
  }

  :host([theme~='slash']) {
    --vaadin-breadcrumbs-separator-icon: var(--_vaadin-icon-slash);
  }

  @media (forced-colors: active) {
    [part='overflow-button']::before,
    [part='overflow']::after {
      background: CanvasText !important;
    }
  }
`,rc={moreItems:"More items"};class sc extends(tc(nc(Ml(Oa(Ba(Qa(sa))))))){static get is(){return"vaadin-breadcrumbs"}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}static get styles(){return ic}static get properties(){return{__overlayOpened:{type:Boolean,value:!1,sync:!0},__hasOverflow:{type:Boolean,value:!1,sync:!0,reflectToAttribute:!0,attribute:"has-overflow"}}}static get defaultI18n(){return rc}get i18n(){return super.i18n}set i18n(t){super.i18n=t}render(){return Bo`
      <div id="list" role="list" part="list">
        <slot name="root"></slot>
        <div role="listitem" part="overflow" ?hidden="${!this.__hasOverflow}">
          <button
            id="overflow"
            type="button"
            part="overflow-button"
            aria-haspopup="true"
            aria-expanded="${this.__overlayOpened?"true":"false"}"
            aria-label="${this.__effectiveI18n?.moreItems}"
            @click="${this.__onOverflowButtonClick}"
          ></button>
        </div>
        <slot></slot>
      </div>
      <vaadin-breadcrumbs-overlay
        id="overlay"
        .opened="${this.__overlayOpened}"
        .owner="${this}"
        no-vertical-overlap
        restore-focus-on-close
        exportparts="overlay, content: overlay-content"
        @opened-changed="${this.__onOverlayOpenedChanged}"
      >
        <slot name="overlay"></slot>
      </vaadin-breadcrumbs-overlay>
    `}firstUpdated(){super.firstUpdated(),this.hasAttribute("role")||this.setAttribute("role","navigation"),this.$.overlay.positionTarget=this.$.overflow,this.$.overlay.restoreFocusNode=this.$.overflow,this.__slotObserver=new $d(this.shadowRoot,()=>{this.__updateItems(),this.__updateOverflow()},{syncInitial:!0}),this.__pathObserver=new MutationObserver(()=>this.__updateItems()),this.__pathObserver.observe(this,{attributes:!0,attributeFilter:["path"],subtree:!0})}__getAllItems(){return[...this.children].filter(t=>"vaadin-breadcrumbs-item"===t.localName)}__updateItems(){const t=this.__getAllItems(),e=t.length-1;t.forEach((t,n)=>{const i=n===e&&null==t.path;t._setCurrent?.(i)})}__restoreSlots(t){t.forEach((t,e)=>gd(t,"slot",0===e?"root":null))}__updateOverflow(){const t=this.__getAllItems();if(this.__restoreSlots(t),t.length<=1)return void(this.__hasOverflow=!1);this.__hasOverflow=!0;const e=this.$.list,n=e.querySelector('[part="overflow"]').getBoundingClientRect(),i=e.getBoundingClientRect(),r=t.map(t=>t.getBoundingClientRect()),s=parseFloat(getComputedStyle(e).gap)||0;if(e.scrollWidth-n.width-s<=e.clientWidth)return void(this.__hasOverflow=!1);const o=r.at(-1),a=Math.max(0,o.right-i.right,i.left-o.left);for(let e=1;e<t.length-1;e+=1)if(t[e].setAttribute("slot","overlay"),Math.abs(r[e+1].left-r[1].left)>=a)return;t[0].setAttribute("slot","overlay")}_onResize(){this.__updateOverflow()}__onOverflowButtonClick(t){t.stopPropagation(),this.__overlayOpened=!this.__overlayOpened}__onOverlayOpenedChanged(t){this.__overlayOpened=t.detail.value}_onKeyDown(t){if(this.__overlayOpened)if("Tab"!==t.key){if(!this.focused&&("ArrowDown"===t.key||"ArrowUp"===t.key)){const e=this._getItems(),n="ArrowDown"===t.key,i=this._getAvailableIndex(e,n?0:e.length-1,n?1:-1,t=>!Cl(t));return void(i>=0&&(t.preventDefault(),this._focus(i)))}super._onKeyDown(t)}else this.__overlayOpened=!1}_getItems(){return[...this.querySelectorAll('vaadin-breadcrumbs-item[slot="overlay"]')]}_isItemFocusable(t){return super._isItemFocusable(t)&&null!=t.path}focus(t){const e=this.querySelector("vaadin-breadcrumbs-item");e&&(e.disabled||"overlay"===e.slot?this.$.overflow.focus(t):e.focus(t))}}la(sc);let oc=0;function ac(){return oc++}class lc extends EventTarget{static generateId(t,e="default"){return`${e}-${t.localName}-${ac()}`}constructor(t,e,n,i={}){super();const{initializer:r,multiple:s,observe:o,useUniqueId:a,uniqueIdPrefix:l}=i;this.host=t,this.slotName=e,this.tagName=n,this.observe="boolean"!=typeof o||o,this.multiple="boolean"==typeof s&&s,this.slotInitializer=r,s&&(this.nodes=[]),a&&(this.defaultId=this.constructor.generateId(t,l||e))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let t=this.getSlotChild();t?(this.node=t,this.initAddedNode(t)):(t=this.attachDefaultNode(),this.initNode(t))}initMultiple(){const t=this.getSlotChildren();if(0===t.length){const t=this.attachDefaultNode();t&&(this.nodes=[t],this.initNode(t))}else this.nodes=t,t.forEach(t=>{this.initAddedNode(t)})}attachDefaultNode(){const{host:t,slotName:e,tagName:n}=this;let i=this.defaultNode;return!i&&n&&(i=document.createElement(n),i instanceof Element&&(""!==e&&i.setAttribute("slot",e),this.defaultNode=i)),i&&(this.node=i,t.appendChild(i)),i}getSlotChildren(){const{slotName:t}=this;return Array.from(this.host.childNodes).filter(e=>(e.nodeType!==Node.ELEMENT_NODE||!e.hasAttribute("data-slot-ignore"))&&(e.nodeType===Node.ELEMENT_NODE&&e.slot===t||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()&&""===t))}getSlotChild(){return this.getSlotChildren()[0]}initNode(t){const{slotInitializer:e}=this;e&&e(t,this.host)}initCustomNode(t){}teardownNode(t){}initAddedNode(t){t!==this.defaultNode&&(this.initCustomNode(t),this.initNode(t))}observeSlot(){const{slotName:t}=this,e=""===t?"slot:not([name])":`slot[name=${t}]`,n=this.host.shadowRoot.querySelector(e);new $d(n,({addedNodes:t,removedNodes:e})=>{const n=this.multiple?this.nodes:[this.node],i=t.filter(t=>!(wd(t)||n.includes(t)||t.nodeType===Node.ELEMENT_NODE&&t.hasAttribute("data-slot-ignore")));e.length&&(this.multiple?this.nodes=n.filter(t=>!e.includes(t)):e.includes(this.node)&&(this.node=null),e.forEach(t=>{this.teardownNode(t)})),i?.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...n,...i].filter(t=>t!==this.defaultNode),i.forEach(t=>{this.initAddedNode(t)})):(this.node&&this.node.remove(),this.node=i[0],this.initAddedNode(this.node)))})}}class dc extends lc{constructor(t){super(t,"tooltip"),this.setTarget(t)}initCustomNode(t){t.target=this.target,void 0!==this.ariaTarget&&(t.ariaTarget=this.ariaTarget),void 0!==this.context&&(t.context=this.context),void 0!==this.manual&&(t.manual=this.manual),void 0!==this.position&&(t._position=this.position),void 0!==this.shouldShow&&(t.shouldShow=this.shouldShow),this.manual||this.host.setAttribute("has-tooltip",""),this.#m(t),t.addEventListener("content-changed",this.#b)}teardownNode(t){this.manual||this.host.removeAttribute("has-tooltip"),t.removeEventListener("content-changed",this.#b),this.#m(null)}setAriaTarget(t){this.ariaTarget=t;const e=this.node;e&&(e.ariaTarget=t)}setContext(t){this.context=t;const e=this.node;e&&(e.context=t)}setManual(t){this.manual=t;const e=this.node;e&&(e.manual=t)}setPosition(t){this.position=t;const e=this.node;e&&(e._position=t)}setShouldShow(t){this.shouldShow=t;const e=this.node;e&&(e.shouldShow=t)}setTarget(t){this.target=t;const e=this.node;e&&(e.target=t)}open(t){const e=this.node;e?.isConnected&&e._stateController.open(t)}close(t){const e=this.node;e&&e._stateController.close(t)}#b=t=>{this.#m(t.target)};#m(t){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:t}}))}}class cc extends(Od(Oa(al(Ba(Qa(sa)))))){static get is(){return"vaadin-button"}static get styles(){return Bl}static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}render(){return Bo`
      <div class="vaadin-button-container" role="presentation">
        <span part="prefix" aria-hidden="true">
          <slot name="prefix"></slot>
        </span>
        <span part="label">
          <slot></slot>
        </span>
        <span part="suffix" aria-hidden="true">
          <slot name="suffix"></slot>
        </span>

        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new dc(this),this.addController(this._tooltipController)}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledButtons}}la(cc);const hc=Xs`
  :host {
    --_content: 0;
    --_footer: 0;
    --_gap: var(--vaadin-card-gap, var(--vaadin-gap-m));
    --_header: max(var(--_header-prefix), var(--_title), var(--_subtitle), var(--_header-suffix));
    --_header-prefix: 0;
    --_header-suffix: 0;
    --_media: 0;
    --_padding: var(--vaadin-card-padding, var(--vaadin-padding-m));
    --_subtitle: 0;
    --_title: 0;
    background: var(--vaadin-card-background, var(--vaadin-background-container));
    --_border-width: var(--vaadin-card-border-width, 0px);
    border: var(--_border-width) solid var(--vaadin-card-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-card-border-radius, var(--vaadin-radius-m));
    box-shadow: var(--vaadin-card-shadow, none);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--_gap);
    padding: var(--_padding);
    position: relative;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([theme~='horizontal'])) {
    justify-content: space-between;
  }

  :host([_m]) {
    --_media: 1;
  }

  :host([_t]) {
    --_title: 1;
  }

  :host([_st]) {
    --_subtitle: 1;
  }

  :host([_h]) {
    --_header: 1;
    --_title: 0;
    --_subtitle: 0;
  }

  :host([_hp]) {
    --_header-prefix: 1;
  }

  :host([_hs]) {
    --_header-suffix: 1;
  }

  :host([_c]) {
    --_content: 1;
  }

  :host([_f]) {
    --_footer: 1;
  }

  [part='media'],
  [part='header'],
  [part='content'],
  [part='footer'] {
    display: none;
  }

  :host([_m]) [part='media'] {
    display: block;
  }

  :host(:is([_h], [_t], [_st], [_hp], [_hs])) [part='header'] {
    align-items: center;
    display: grid;
    gap: var(--_gap);
    row-gap: 0;
  }

  :host([_hs]) [part='header'] {
    grid-template-columns: 1fr auto;
  }

  :host([_hp]) [part='header'] {
    grid-template-columns: repeat(var(--_header-prefix), auto) 1fr;
  }

  :host([_c]) [part='content'] {
    display: block;
  }

  :host([_f]) [part='footer'] {
    display: flex;
    flex-wrap: wrap;
    gap: var(--_gap);
  }

  slot {
    border-radius: inherit;
  }

  ::slotted([slot='header-prefix']) {
    grid-column: 1;
    grid-row: 1 / span calc(var(--_title) + var(--_subtitle));
  }

  ::slotted([slot='header']),
  ::slotted([slot='title']) {
    grid-column: calc(1 + var(--_header-prefix));
    grid-row: 1;
  }

  ::slotted([slot='title']) {
    color: var(--vaadin-card-title-color, var(--vaadin-text-color)) !important;
    font-size: var(--vaadin-card-title-font-size, inherit) !important;
    font-weight: var(--vaadin-card-title-font-weight, 500) !important;
    line-height: var(--vaadin-card-title-line-height, inherit) !important;
    margin: 0 !important;
  }

  ::slotted([slot='subtitle']) {
    color: var(--vaadin-card-subtitle-color, var(--vaadin-text-color-secondary)) !important;
    font-size: var(--vaadin-card-subtitle-font-size, inherit) !important;
    font-weight: var(--vaadin-card-subtitle-font-weight, 400) !important;
    line-height: var(--vaadin-card-subtitle-line-height, inherit) !important;
    margin: 0 !important;
    grid-column: calc(1 + var(--_header-prefix));
    grid-row: calc(1 + var(--_title));
  }

  ::slotted([slot='header-suffix']) {
    grid-column: calc(2 + var(--_header-prefix));
    grid-row: 1 / span calc(var(--_title) + var(--_subtitle));
  }

  /* Horizontal */
  :host([theme~='horizontal']) {
    align-items: start;
    display: grid;
    grid-template-columns: repeat(var(--_media), minmax(auto, max-content)) 1fr;
  }

  :host([theme~='horizontal'][_f]) {
    grid-template-rows: 1fr auto;
  }

  :host([theme~='horizontal'][_c]) {
    grid-template-rows: repeat(var(--_header), auto) 1fr;
  }

  [part='media'] {
    align-self: stretch;
    grid-column: 1;
    grid-row: 1 / span calc(var(--_header) + var(--_content) + var(--_footer));
    overflow: hidden;
  }

  [part='header'] {
    margin-bottom: auto;
    grid-column: calc(1 + var(--_media));
    grid-row: 1;
  }

  [part='content'] {
    grid-column: calc(1 + var(--_media));
    grid-row: calc(1 + var(--_header));
    flex: auto;
    min-height: 0;
  }

  [part='footer'] {
    border-radius: inherit;
    grid-column: calc(1 + var(--_media));
    grid-row: calc(1 + var(--_header) + var(--_content));
  }

  :host([theme~='horizontal']) [part='footer'] {
    align-self: end;
  }

  :host(:not([theme~='horizontal'])) ::slotted([slot='media']:is(img, video, svg)) {
    max-width: 100%;
  }

  ::slotted([slot='media']) {
    vertical-align: middle;
  }

  :host(:is([theme~='cover-media'], [theme~='stretch-media'])) [part='media'] {
    aspect-ratio: var(--vaadin-card-media-aspect-ratio, 16/9);
    width: 100%;

    ::slotted(:is(img, video, svg, vaadin-icon)) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  :host([theme~='horizontal']:is([theme~='cover-media'], [theme~='stretch-media'])) {
    grid-template-columns: repeat(var(--_media), minmax(auto, 0.5fr)) 1fr;
  }

  :host([theme~='horizontal']:is([theme~='cover-media'], [theme~='stretch-media'])) [part='media'] {
    aspect-ratio: auto;
    height: 100%;
  }

  :host([theme~='cover-media']) {
    --_media-width: calc(100% + (var(--_padding) + var(--_border-width)) * 2);
  }

  :host([theme~='horizontal'][theme~='cover-media']) {
    --_media-width: calc(100% + (var(--_padding) + var(--_border-width)));
  }

  :host([theme~='cover-media']) [part='media'] {
    border-radius: inherit;
    border-end-end-radius: 0;
    border-end-start-radius: 0;
    margin-inline: calc((var(--_padding) + var(--_border-width)) * -1);
    margin-top: calc((var(--_padding) + var(--_border-width)) * -1);
    max-width: none;
    width: var(--_media-width);

    ::slotted(:is(img, video, svg, vaadin-icon)) {
      outline: var(--_border-width) solid var(--vaadin-card-border-color, var(--vaadin-border-color-secondary));
      outline-offset: calc(var(--_border-width) * -1);
      border-radius: inherit;
    }
  }

  :host([theme~='horizontal'][theme~='cover-media']) [part='media'] {
    border-radius: inherit;
    border-end-end-radius: 0;
    border-start-end-radius: 0;
    height: calc(100% + (var(--_padding) + var(--_border-width)) * 2);
    margin-inline-end: 0;
  }

  /* Scroller in content */
  [part='content'] ::slotted(vaadin-scroller) {
    margin-inline: calc(var(--_padding) * -1);
    padding-inline: var(--_padding);
  }

  [part='content'] ::slotted(vaadin-scroller)::before,
  [part='content'] ::slotted(vaadin-scroller)::after {
    margin-inline: calc(var(--_padding) * -1);
  }

  /* Outlined */
  :host([theme~='outlined']) {
    --vaadin-card-border-width: 1px;
  }

  /* Elevated */
  :host([theme~='elevated']) {
    --vaadin-card-background: var(--vaadin-background-color);
    box-shadow: var(--vaadin-card-shadow, 0 1px 4px -1px rgba(0, 0, 0, 0.3));
  }
`;class uc extends lc{#y;constructor(t,e,n,i={}){super(t,e,n,{...i,useUniqueId:!0})}initCustomNode(t){this.#w(t),this._notifyChange(t)}teardownNode(t){const e=this.getSlotChild();e&&e!==this.defaultNode?this._notifyChange(e):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){const t=super.attachDefaultNode();return t&&this.#w(t),t}restoreDefaultNode(){}updateDefaultNode(t){this._notifyChange(t)}observeNode(t){this.#y&&this.#y.disconnect(),this.#y=new MutationObserver(t=>{t.forEach(t=>{const e=t.target,n=e===this.node;"attributes"===t.type?n&&this.#w(e):(n||e.parentElement===this.node)&&this._notifyChange(this.node)})}),this.#y.observe(t,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}_notifyChange(t){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:xd(t),node:t}}))}#w(t){const e=!this.nodes||t===this.nodes[0];t.nodeType!==Node.ELEMENT_NODE||this.multiple&&!e||t.id||(t.id=this.defaultId)}}class pc extends uc{constructor(t){super(t,"title",null,{uniqueIdPrefix:"card-title"})}setTitle(t){if(this.title=t,t&&""!==t.trim()){const t=this.getSlotChild();t&&t!==this.defaultNode&&t.remove(),this.restoreDefaultNode(),this.updateDefaultNode(this.node)}else this.node&&this.node===this.defaultNode&&this.node.remove()}setLevel(t){this.level=t,this.node&&this.node===this.defaultNode&&this.updateDefaultNode(this.node)}initNode(t){t&&t===this.defaultNode&&(t.setAttribute("role","heading"),this.host.setAttribute("aria-labelledby",t.id))}initCustomNode(t){this.host.cardTitle=""}teardownNode(t){this.getSlotChild()!==this.defaultNode&&this.host.removeAttribute("aria-labelledby"),super.teardownNode(t)}restoreDefaultNode(){const{title:t}=this;if(t&&""!==t.trim()){this.tagName="div";const t=this.attachDefaultNode();this.initNode(t)}}updateDefaultNode(t){t&&(t.textContent=this.title,t.setAttribute("aria-level",this.level||2)),super.updateDefaultNode(t)}}class vc extends(Oa(al(Ba(Qa(sa))))){static get is(){return"vaadin-card"}static get styles(){return hc}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}static get properties(){return{cardTitle:{type:String},titleHeadingLevel:{type:Number,reflectToAttribute:!0}}}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","region")}render(){return Bo`
      <div part="media">
        <slot name="media"></slot>
      </div>
      <div part="header">
        <slot name="header-prefix"></slot>
        <slot name="header">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </slot>
        <slot name="header-suffix"></slot>
      </div>
      <div part="content">
        <slot></slot>
      </div>
      <div part="footer">
        <slot name="footer"></slot>
      </div>
    `}firstUpdated(){super.firstUpdated(),this.__titleController=new pc(this),this.addController(this.__titleController),this._onSlotChange()}updated(t){super.updated(t),t.has("cardTitle")&&this.__titleController.setTitle(this.cardTitle),t.has("titleHeadingLevel")&&this.__titleController.setLevel(this.titleHeadingLevel)}_onSlotChange(){this.toggleAttribute("_m",this.querySelector(':scope > [slot="media"]')),this.toggleAttribute("_h",this.querySelector(':scope > [slot="header"]')),this.toggleAttribute("_t",this.querySelector(':scope > [slot="title"]')&&!this.querySelector(':scope > [slot="header"]')),this.toggleAttribute("_st",this.querySelector(':scope > [slot="subtitle"]')&&!this.querySelector(':scope > [slot="header"]')),this.toggleAttribute("_hp",this.querySelector(':scope > [slot="header-prefix"]')),this.toggleAttribute("_hs",this.querySelector(':scope > [slot="header-suffix"]')),this.toggleAttribute("_c",this.__hasContent()),this.toggleAttribute("_f",this.querySelector(':scope > [slot="footer"]'))}__hasContent(){return this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).filter(t=>!wd(t)).length>0}createRenderRoot(){const t=super.createRenderRoot();return t.addEventListener("slotchange",()=>this._onSlotChange()),t}}la(vc);const _c=Xs`
  :host {
    display: flex;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Theme variations */
  :host([theme~='margin']) {
    margin: var(--vaadin-horizontal-layout-margin, var(--vaadin-padding-m));
  }

  :host([theme~='padding']) {
    padding: var(--vaadin-horizontal-layout-padding, var(--vaadin-padding-m));
  }

  :host([theme~='spacing']) {
    gap: var(--vaadin-horizontal-layout-gap, var(--vaadin-gap-s));
  }

  :host([theme~='wrap']) {
    flex-wrap: wrap;
  }

  :host([has-end]:not([has-middle])) ::slotted([last-start-child]) {
    margin-inline-end: auto;
  }

  ::slotted([first-middle-child]) {
    margin-inline-start: auto;
  }

  ::slotted([last-middle-child]) {
    margin-inline-end: auto;
  }

  :host(:not([has-middle])) ::slotted([first-end-child]) {
    margin-inline-start: auto;
  }
`,fc=window.Vaadin.featureFlags.layoutComponentImprovements,gc=Xs`
  ::slotted([data-width-full]) {
    flex: 1;
  }

  ::slotted(vaadin-horizontal-layout[data-width-full]),
  ::slotted(vaadin-vertical-layout[data-width-full]) {
    min-width: 0;
  }
`,mc=fc?[_c,gc]:[_c],bc=t=>class extends t{ready(){super.ready();const t=this.shadowRoot.querySelector("slot:not([name])");this.__startSlotObserver=new $d(t,({currentNodes:t,removedNodes:e})=>{e.length&&this.__clearAttribute(e,"last-start-child");const n=t.filter(t=>t.nodeType===Node.ELEMENT_NODE);this.__updateAttributes(n,"start",!1,!0);const i=t.filter(t=>!wd(t));this.toggleAttribute("has-start",i.length>0)});const e=this.shadowRoot.querySelector('[name="end"]');this.__endSlotObserver=new $d(e,({currentNodes:t,removedNodes:e})=>{e.length&&this.__clearAttribute(e,"first-end-child"),this.__updateAttributes(t,"end",!0,!1),this.toggleAttribute("has-end",t.length>0)});const n=this.shadowRoot.querySelector('[name="middle"]');this.__middleSlotObserver=new $d(n,({currentNodes:t,removedNodes:e})=>{e.length&&(this.__clearAttribute(e,"first-middle-child"),this.__clearAttribute(e,"last-middle-child")),this.__updateAttributes(t,"middle",!0,!0),this.toggleAttribute("has-middle",t.length>0)})}__clearAttribute(t,e){const n=t.find(t=>t.nodeType===Node.ELEMENT_NODE&&t.hasAttribute(e));n&&n.removeAttribute(e)}__updateAttributes(t,e,n,i){t.forEach((r,s)=>{n&&r.toggleAttribute(`first-${e}-child`,0===s),i&&r.toggleAttribute(`last-${e}-child`,s===t.length-1)})}};class yc extends(bc(al(Oa(Ba(Qa(sa)))))){static get is(){return"vaadin-horizontal-layout"}static get styles(){return mc}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){return Bo`
      <slot></slot>
      <slot name="middle"></slot>
      <slot name="end"></slot>
    `}}la(yc);const{I:wc}=ea,xc=t=>(...e)=>({_$litDirective$:t,values:e});class Cc{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class kc extends Cc{constructor(t){if(super(t),this.it=Fo,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Fo||null==t)return this._t=void 0,this.it=t;if(t===Ro)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}kc.directiveName="unsafeHTML",kc.resultType=1,xc(kc);class Ac extends kc{}Ac.directiveName="unsafeSVG",Ac.resultType=2;const Ec=xc(Ac);function Sc(t){let e=Fo;if(t){const n=t.cloneNode(!0);n.removeAttribute("id"),e=Do`${Ec(n.outerHTML)}`}return e}const zc={},Oc=new Set;function Tc(t,e){return(t||"").replace(`${e}:`,"")}function Lc(t){if(t)return t.split(":")[0]||"vaadin"}function Ic(t,e){const n=[...t.querySelectorAll("[id]")],i=n.reduce((t,n)=>(t[Tc(n.id,e)]=n,t),{}),r={...i};n.forEach(t=>{const n=function(t,e,n){const i=1===t.children.length&&"use"===t.firstElementChild.localName?t.firstElementChild:null,r=i?.getAttribute("href");return r?.startsWith("#")?e[Tc(r.slice(1),n)]:null}(t,r,e);n&&(i[Tc(t.id,e)]=n)}),t._icons=i}const $c=t=>class extends t{static get observedAttributes(){return["name","size"]}static get attachedIcons(){return Oc}static getIconset(t){return zc[t]}static getIconSvg(t,e){const n=e||Lc(t),i=this.getIconset(n);if(!t||!i)return{svg:Sc(null)};const r=Tc(t,n),s=i._icons[r];return{preserveAspectRatio:s?s.getAttribute("preserveAspectRatio"):null,svg:Sc(s),size:i.size,viewBox:s?s.getAttribute("viewBox"):null}}static register(t,e,n){if(!zc[t]){const i=document.createElement("vaadin-iconset");i.appendChild(n.content.cloneNode(!0)),zc[t]=i,Ic(i,t),i.size=e,i.name=t}}get name(){return this.__name}set name(t){const e=this.__name;this.__name=t,this.__nameChanged(t,e)}get size(){return this.__size??24}set size(t){this.__size=t}connectedCallback(){["name","size"].forEach(t=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this[t]=e}}),this.style.display="none"}attributeChangedCallback(t,e,n){"name"===t?this.name=n:"size"===t&&(this.size=null==n?null:Number(n))}__updateIcons(t){Oc.forEach(e=>{t===Lc(e.icon)&&e._applyIcon()})}__nameChanged(t,e){e&&delete zc[e],t&&(zc[t]=this,Ic(this,t),this.__updateIcons(t))}};class Mc extends($c(HTMLElement)){static get is(){return"vaadin-iconset"}}la(Mc);const Nc=Xs`
  :host {
    display: inline-flex;
    justify-content: center !important;
    align-items: center !important;
    font-size: inherit !important;
    box-sizing: border-box;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    flex: none;
    color: var(--vaadin-icon-color, currentColor);
    fill: currentColor;
    container-type: size;
  }

  :host::after,
  :host::before {
    line-height: 1;
    font-size: var(--vaadin-icon-visual-size, 100cqh);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([hidden]) {
    display: none !important;
  }

  svg {
    display: block;
    width: var(--vaadin-icon-visual-size, 100%);
    height: var(--vaadin-icon-visual-size, 100%);
    /* prevent overflowing icon from clipping, see https://github.com/vaadin/flow-components/issues/5872 */
    overflow: visible;

    @container style(--vaadin-icon-stroke-width) {
      stroke-width: var(--vaadin-icon-stroke-width);
    }
  }

  :host(:is([icon-class], [font-icon-content])) svg {
    display: none;
  }

  :host([font-icon-content])::before {
    content: attr(font-icon-content);
  }

  .baseline {
    order: -1;
  }

  .baseline::before {
    content: '\\2003' / '';
    display: inline-block;
    width: 0;
  }

  :host(:is([icon-class], [font-family])) .baseline {
    font-family: var(--vaadin-icon-baseline-font-family, inherit);
  }
`,Pc=!CSS.supports("container-type: inline-size")||!!qs&&!function(){const t=document.createElement("style");t.textContent="\n    .vaadin-icon-test-element {\n      container-type: size;\n      height: 2px;\n      visibility: hidden;\n      position: fixed;\n    }\n\n    .vaadin-icon-test-element::before {\n      content: '';\n      display: block;\n      height: 100cqh;\n    ";const e=document.createElement("div");e.classList.add("vaadin-icon-test-element");const n=document.createElement("div");n.attachShadow({mode:"open"}),n.shadowRoot.innerHTML="<slot></slot>",n.append(e.cloneNode()),document.body.append(t,e,n);const i=[...document.querySelectorAll(".vaadin-icon-test-element")].find(t=>"2px"!==getComputedStyle(t,"::before").height);return t.remove(),e.remove(),n.remove(),!i}(),jc=t=>Pc?class extends(nc(t)){static get styles(){return Xs`
            :host::after,
            :host::before {
              font-size: var(--vaadin-icon-visual-size, var(--_vaadin-font-icon-size));
            }
          `}updated(t){super.updated(t),(t.has("char")||t.has("iconClass")||t.has("ligature"))&&this.__updateFontIconSize()}_onResize(){this.__updateFontIconSize()}__updateFontIconSize(){if(this.char||this.iconClass||this.ligature){const{paddingTop:t,paddingBottom:e,height:n}=getComputedStyle(this),i=parseFloat(n)-parseFloat(t)-parseFloat(e);this.style.setProperty("--_vaadin-font-icon-size",`${i}px`)}}}:t,Bc=new Map,Dc=customElements.get("vaadin-iconset"),Rc=t=>class extends(jc(t)){static get properties(){return{icon:{type:String,reflectToAttribute:!0,observer:"__iconChanged",sync:!0},svg:{type:Object,sync:!0},src:{type:String,sync:!0},symbol:{type:String,sync:!0},iconClass:{type:String,reflectToAttribute:!0,sync:!0},char:{type:String,sync:!0},ligature:{type:String,sync:!0},fontFamily:{type:String,observer:"__fontFamilyChanged",sync:!0},size:{type:Number,value:24,sync:!0},__preserveAspectRatio:String,__useRef:String,__viewBox:String,__fill:String,__stroke:String,__strokeWidth:String,__strokeLinecap:String,__strokeLinejoin:String}}static get observers(){return["__fontChanged(iconClass, char, ligature)","__srcChanged(src, symbol)"]}static get observedAttributes(){return[...super.observedAttributes,"class"]}constructor(){super(),this.__fetch=fetch.bind(window)}get __iconClasses(){return this.iconClass?this.iconClass.split(" "):[]}ready(){super.ready(),this._tooltipController=new dc(this),this.addController(this._tooltipController)}connectedCallback(){super.connectedCallback(),Dc.attachedIcons.add(this)}disconnectedCallback(){super.disconnectedCallback(),Dc.attachedIcons.delete(this)}_applyIcon(){const{preserveAspectRatio:t,svg:e,size:n,viewBox:i}=Dc.getIconSvg(this.icon);i&&(this.__viewBox=i),t&&(this.__preserveAspectRatio=t),n&&n!==this.size&&(this.size=n),this.svg=e}__iconChanged(t){t?this._applyIcon():this.svg=null}async __srcChanged(e,n){var i;if(e)if(this.icon="",e.startsWith("data:")||!n&&!e.includes("#"))try{Bc.has(e)||Bc.set(e,this.__fetch(e,{mode:"cors"}).then(t=>{if(!t.ok)throw new Error("Error loading icon");return t.text()}));const r=await Bc.get(e);t.__domParser||(t.__domParser=new DOMParser);const s=t.__domParser.parseFromString(r,"text/html").querySelector("svg");if(!s)throw new Error(`SVG element not found on path: ${e}`);this.svg=(i=s.innerHTML,Do`${Ec(i)}`),n&&(this.__useRef=`#${n}`),this.__viewBox=s.getAttribute("viewBox"),this.__fill=s.getAttribute("fill"),this.__stroke=s.getAttribute("stroke"),this.__strokeWidth=s.getAttribute("stroke-width"),this.__strokeLinecap=s.getAttribute("stroke-linecap"),this.__strokeLinejoin=s.getAttribute("stroke-linejoin")}catch(t){console.error(t),this.svg=null}else{const[t,i]=e.split("#");this.__useRef=`${t}#${n||i}`}else this.svg=null}__fontChanged(t,e,n){this.classList.remove(...this.__addedIconClasses||[]),t&&(this.__addedIconClasses=[...this.__iconClasses],this.classList.add(...this.__addedIconClasses));let i=n;e&&(i=e.length>1?String.fromCodePoint(parseInt(e,16)):e),gd(this,"font-icon-content",i),(t||e||n)&&!this.icon&&(this.icon="")}attributeChangedCallback(t,e,n){super.attributeChangedCallback(t,e,n),"class"===t&&this.__iconClasses.some(t=>!this.classList.contains(t))&&this.classList.add(...this.__iconClasses)}__fontFamilyChanged(t){this.style.fontFamily=`'${t}'`}};class Fc extends(Rc(Oa(al(Ba(Qa(sa)))))){static get is(){return"vaadin-icon"}static get styles(){return[Nc,super.styles].filter(Boolean)}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){return Bo`
      <span class="baseline"></span>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="${this.__viewBox||`0 0 ${this.size} ${this.size}`}"
        preserveAspectRatio="${this.__preserveAspectRatio||"xMidYMid meet"}"
        fill="${Id(this.__fill)}"
        stroke="${Id(this.__stroke)}"
        stroke-width="${Id(this.__strokeWidth)}"
        stroke-linecap="${Id(this.__strokeLinecap)}"
        stroke-linejoin="${Id(this.__strokeLinejoin)}"
        aria-hidden="true"
      >
        <g id="svg-group">${function(t){let e=null==t||""===t?Fo:t;return function(t){return(t=>2===t?._$litType$)(t)||t===Fo}(e)||(console.error("[vaadin-icon] Invalid svg passed, please use Lit svg literal."),e=Fo),e}(this.svg)}</g>
        <g id="use-group" visibility="${this.__useRef?"visible":"hidden"}">
          <use href="${Id(this.__useRef)}" />
        </g>
      </svg>

      <slot name="tooltip"></slot>
    `}}la(Fc);class qc extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}la(qc);const Hc=document.createElement("template");Hc.innerHTML='<svg xmlns="http://www.w3.org/2000/svg"><defs>\n<g id="lumo:align-center"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m83 191c0-18 13-33 29-33H721c16 0 29 15 29 33 0 18-13 33-29 34H279C263 442 250 427 250 408zM250 792c0-18 13-33 29-34H721c16 0 29 15 29 34s-13 33-29 33H279C263 825 250 810 250 792z m-83-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>\n<g id="lumo:align-left"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m0 191c0-18 13-33 28-33H638c16 0 29 15 29 33 0 18-13 33-29 34H195C179 442 167 427 167 408zM167 792c0-18 13-33 28-34H638c16 0 29 15 29 34s-13 33-29 33H195C179 825 167 810 167 792z m0-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>\n<g id="lumo:align-right"><path d="M167 217c0-18 17-33 38-34H795c21 0 38 15 38 34 0 18-17 33-38 33H205C184 250 167 235 167 217z m166 191c0-18 13-33 29-33H805c16 0 29 15 28 33 0 18-13 33-28 34H362C346 442 333 427 333 408zM333 792c0-18 13-33 29-34H805c16 0 29 15 28 34s-13 33-28 33H362C346 825 333 810 333 792z m-166-192c0-18 17-33 38-33H795c21 0 38 15 38 33s-17 33-38 33H205C184 633 167 618 167 600z" fill-rule="evenodd" clip-rule="evenodd"></path></g>\n<g id="lumo:angle-down"><path d="M283 391c-18-16-46-15-63 4-16 18-15 46 3 63l244 224c17 15 43 15 60 0l250-229c18-16 20-45 3-63-16-18-45-20-63-4l-220 203-214-198z"></path></g>\n<g id="lumo:angle-left"><path d="M601 710c16 18 15 46-3 63-18 16-46 15-63-4l-224-244c-15-17-15-43 0-59l229-250c16-18 45-20 63-4 18 16 20 45 3 63l-203 220 198 215z"></path></g>\n<g id="lumo:angle-right"><path d="M399 275c-16-18-15-46 3-63 18-16 46-15 63 4l224 244c15 17 15 43 0 59l-229 250c-16 18-45 20-63 4-18-16-20-45-3-63l203-220-198-215z"></path></g>\n<g id="lumo:angle-up"><path d="M283 635c-18 16-46 15-63-3-16-18-15-46 3-63l244-224c17-15 43-15 60 0l250 229c18 16 20 45 3 63-16 18-45 20-63 3l-220-202L283 635z"></path></g>\n<g id="lumo:arrow-down"><path d="M538 646l125-112c15-14 39-12 53 4 14 15 12 39-4 53l-187 166c0 0 0 0 0 0-14 13-36 12-50 0l-187-166c-15-14-17-37-4-53 14-15 37-17 53-4L462 646V312c0-21 17-38 38-37s38 17 37 37v334z"></path></g>\n<g id="lumo:arrow-left"><path d="M375 538l111 125c14 15 12 39-3 53-15 14-39 12-53-4l-166-187c0 0 0 0 0 0-13-14-12-36 0-50l166-187c14-15 37-17 53-4 15 14 17 37 3 53L375 463h333c21 0 38 17 38 37 0 21-17 38-38 38h-333z"></path></g>\n<g id="lumo:arrow-right"><path d="M625 538h-333c-21 0-38-17-38-38 0-21 17-38 38-37h333l-111-126c-14-15-12-39 3-53 15-14 39-12 53 4l166 187c13 14 13 36 0 50 0 0 0 0 0 0l-166 187c-14 15-37 17-53 4-15-14-17-37-3-53l111-125z"></path></g>\n<g id="lumo:arrow-up"><path d="M538 354V688c0 21-17 38-38 37s-38-17-38-38V354l-125 112c-15 14-39 12-53-4-14-15-12-39 4-53l187-166c14-13 36-13 50 0 0 0 0 0 0 0l187 166c15 14 17 37 4 53-14 15-37 17-53 4L538 354z"></path></g>\n<g id="lumo:bar-chart"><path d="M175 500h108c28 0 50 22 50 50v233c0 28-22 50-50 50H175c-28 0-50-22-50-50v-233c0-28 22-50 50-50z m33 67c-9 0-17 7-16 16v167c0 9 7 17 16 17h42c9 0 17-7 17-17v-167c0-9-7-17-17-16H208zM446 167h108c28 0 50 22 50 50v566c0 28-22 50-50 50h-108c-28 0-50-22-50-50V217c0-28 22-50 50-50z m33 66c-9 0-17 7-17 17v500c0 9 7 17 17 17h42c9 0 17-7 16-17V250c0-9-7-17-16-17h-42zM717 333h108c28 0 50 22 50 50v400c0 28-22 50-50 50h-108c-28 0-50-22-50-50V383c0-28 22-50 50-50z m33 67c-9 0-17 7-17 17v333c0 9 7 17 17 17h42c9 0 17-7 16-17v-333c0-9-7-17-16-17h-42z"></path></g>\n<g id="lumo:bell"><path d="M367 675H292v-258C292 325 366 250 459 250H458V208c0-23 18-42 42-41 23 0 42 18 42 41v42h-1C634 250 708 325 708 417V675h-75v-258c0-51-41-92-91-92h-84C408 325 367 366 367 417V675z m-159 37c0-21 17-38 38-37h508c21 0 37 17 38 37 0 21-17 38-38 38H246C225 750 208 733 208 713z m230 71h125v32c0 17-14 31-32 31h-62c-17 0-32-14-31-31v-32z"></path></g>\n<g id="lumo:calendar"><path d="M375 208h250v-20C625 176 634 167 646 167h41C699 167 708 176 708 188V208h74c23 0 41 19 41 42v42C823 315 804 333 782 333H218C196 333 177 315 177 292V250C177 227 196 208 218 208H292v-20C292 176 301 167 313 167h41C366 167 375 176 375 188V208zM229 375h42C283 375 292 384 292 396v41C292 449 282 458 271 458h-42C217 458 208 449 208 437v-41C208 384 218 375 229 375z m125 0h42C408 375 417 384 417 396v41C417 449 407 458 396 458h-42C342 458 333 449 333 437v-41C333 384 343 375 354 375z m125 0h42C533 375 542 384 542 396v41C542 449 532 458 521 458h-42C467 458 458 449 458 437v-41C458 384 468 375 479 375z m-250 125h42C283 500 292 509 292 521v41C292 574 282 583 271 583h-42C217 583 208 574 208 562v-41C208 509 218 500 229 500z m125 0h42C408 500 417 509 417 521v41C417 574 407 583 396 583h-42C342 583 333 574 333 562v-41C333 509 343 500 354 500z m125 0h42c12 0 21 9 21 21v41C542 574 532 583 521 583h-42C467 583 458 574 458 562v-41C458 509 468 500 479 500z m-250 125h42C283 625 292 634 292 646v41C292 699 282 708 271 708h-42C217 708 208 699 208 687v-41C208 634 218 625 229 625z m125 0h42C408 625 417 634 417 646v41C417 699 407 708 396 708h-42C342 708 333 699 333 687v-41C333 634 343 625 354 625z m125 0h42c12 0 21 9 21 21v41C542 699 532 708 521 708h-42C467 708 458 699 458 687v-41C458 634 468 625 479 625z m125-250h42C658 375 667 384 667 396v41C667 449 657 458 646 458h-42C592 458 583 449 583 437v-41C583 384 593 375 604 375z m0 125h42c12 0 21 9 21 21v41C667 574 657 583 646 583h-42C592 583 583 574 583 562v-41C583 509 593 500 604 500z m0 125h42c12 0 21 9 21 21v41C667 699 657 708 646 708h-42C592 708 583 699 583 687v-41C583 634 593 625 604 625z m125 0h42c12 0 21 9 21 21v41C792 699 782 708 771 708h-42C717 708 708 699 708 687v-41C708 634 718 625 729 625z m-500 125h42C283 750 292 759 292 771v41C292 824 282 833 271 833h-42C217 833 208 824 208 812v-41C208 759 218 750 229 750z m125 0h42C408 750 417 759 417 771v41C417 824 407 833 396 833h-42C342 833 333 824 333 812v-41C333 759 343 750 354 750z m125 0h42c12 0 21 9 21 21v41C542 824 532 833 521 833h-42C467 833 458 824 458 812v-41C458 759 468 750 479 750z m125 0h42c12 0 21 9 21 21v41C667 824 657 833 646 833h-42C592 833 583 824 583 812v-41C583 759 593 750 604 750z m125 0h42c12 0 21 9 21 21v41C792 824 782 833 771 833h-42C717 833 708 824 708 812v-41C708 759 718 750 729 750z m0-250h42c12 0 21 9 21 21v41C792 574 782 583 771 583h-42C717 583 708 574 708 562v-41C708 509 718 500 729 500z m0-125h42C783 375 792 384 792 396v41C792 449 782 458 771 458h-42C717 458 708 449 708 437v-41C708 384 718 375 729 375z"></path></g>\n<g id="lumo:checkmark"><path d="M318 493c-15-15-38-15-53 0-15 15-15 38 0 53l136 136c15 15 38 15 53 0l323-322c15-15 15-38 0-53-15-15-38-15-54 0l-295 296-110-110z"></path></g>\n<g id="lumo:chevron-down"><path d="M533 654l210-199c9-9 9-23 0-32C739 419 733 417 726 417H274C261 417 250 427 250 439c0 6 2 12 7 16l210 199c18 17 48 17 66 0z"></path></g>\n<g id="lumo:chevron-left"><path d="M346 533l199 210c9 9 23 9 32 0 4-4 7-10 6-17V274C583 261 573 250 561 250c-6 0-12 2-16 7l-199 210c-17 18-17 48 0 66z"></path></g>\n<g id="lumo:chevron-right"><path d="M654 533L455 743c-9 9-23 9-32 0C419 739 417 733 417 726V274C417 261 427 250 439 250c6 0 12 2 16 7l199 210c17 18 17 48 0 66z"></path></g>\n<g id="lumo:chevron-up"><path d="M533 346l210 199c9 9 9 23 0 32-4 4-10 7-17 6H274C261 583 250 573 250 561c0-6 2-12 7-16l210-199c18-17 48-17 66 0z"></path></g>\n<g id="lumo:clean"><path d="M250 208v8L368 333h99l-30 70 88 88L592 333H833V208H250M136 208L83 261l291 291L271 792h125l65-153L697 875 750 822 148 220 136 208Z"></path></g>\n<g id="lumo:clock"><path d="M538 489l85 85c15 15 15 38 0 53-15 15-38 15-53 0l-93-93a38 38 0 0 1-2-2C467 525 462 515 462 504V308c0-21 17-38 38-37 21 0 38 17 37 37v181zM500 833c-184 0-333-149-333-333s149-333 333-333 333 149 333 333-149 333-333 333z m0-68c146 0 265-118 265-265 0-146-118-265-265-265-146 0-265 118-265 265 0 146 118 265 265 265z"></path></g>\n<g id="lumo:cog"><path d="M833 458l-81-18c-8-25-17-50-29-75L767 292 708 233l-72 49c-21-12-46-25-75-30L542 167h-84l-19 79c-25 8-50 17-71 30L296 233 233 296l47 69c-12 21-21 46-29 71L167 458v84l84 25c8 25 17 50 29 75L233 708 292 767l76-44c21 12 46 25 75 29L458 833h84l19-81c25-8 50-17 75-29L708 767l59-59-44-66c12-21 25-46 29-75L833 542v-84z m-333 217c-96 0-175-79-175-175 0-96 79-175 175-175 96 0 175 79 175 175 0 96-79 175-175 175z"></path></g>\n<g id="lumo:cross"><path d="M445 500l-142-141c-15-15-15-40 0-56 15-15 40-15 56 0L500 445l141-142c15-15 40-15 56 0 15 15 15 40 0 56L555 500l142 141c15 15 15 40 0 56-15 15-40 15-56 0L500 555l-141 142c-15 15-40 15-56 0-15-15-15-40 0-56L445 500z"></path></g>\n<g id="lumo:download"><path d="M538 521l125-112c15-14 39-12 53 4 14 15 12 39-4 53l-187 166a38 38 0 0 1 0 0c-14 13-36 12-50 0l-187-166c-15-14-17-37-4-53 14-15 37-17 53-4L462 521V188c0-21 17-38 38-38s38 17 37 38v333zM758 704c0-21 17-38 38-37 21 0 38 17 37 37v92c0 21-17 38-37 37H204c-21 0-38-17-37-37v-92c0-21 17-38 37-37s38 17 38 37v54h516v-54z"></path></g>\n<g id="lumo:drag-handle"><path d="M458 292c0 35-28 63-62 62C361 354 333 326 333 292s28-63 63-63c35 0 63 28 62 63Zm0 208c0 35-28 63-62 62-35 0-63-28-63-62s28-63 63-63c35 0 63 28 62 63Zm0 208c0 35-28 63-62 63-35 0-63-28-63-63s28-63 63-62c35 0 63 28 62 62Zm209-416c0 35-28 63-63 62S542 326 542 292s28-63 62-63S667 257 667 292Zm0 208c0 35-28 63-63 62S542 535 542 500s28-63 62-63 63 28 63 63Zm0 208c0 35-28 63-63 63S542 743 542 708s28-63 62-62 63 28 63 62Z"></path></g>\n<g id="lumo:dropdown"><path d="M317 393c-15-14-39-13-53 3-14 15-13 39 3 53l206 189c14 13 36 13 50 0l210-193c15-14 17-38 3-53-14-15-38-17-53-3l-185 171L317 393z"></path></g>\n<g id="lumo:edit"><path d="M673 281l62 56-205 233c-9 10-38 24-85 39a8 8 0 0 1-5 0c-4-1-7-6-6-10l0 0c14-47 25-76 35-86l204-232z m37-42l52-59c15-17 41-18 58-2 17 16 18 42 3 59L772 295l-62-56zM626 208l-67 75h-226C305 283 283 306 283 333v334C283 695 306 717 333 717h334c28 0 50-22 50-50v-185L792 398v269C792 736 736 792 667 792H333C264 792 208 736 208 667V333C208 264 264 208 333 208h293z"></path></g>\n<g id="lumo:error"><path d="M500 833c-184 0-333-149-333-333s149-333 333-333 333 149 333 333-149 333-333 333z m0-68c146 0 265-118 265-265 0-146-118-265-265-265-146 0-265 118-265 265 0 146 118 265 265 265zM479 292h42c12 0 21 9 20 20l-11 217c0 8-6 13-13 13h-34c-7 0-13-6-13-13l-11-217C459 301 468 292 479 292zM483 608h34c12 0 21 9 20 21v33c0 12-9 21-20 21h-34c-12 0-21-9-21-21v-33c0-12 9-21 21-21z"></path></g>\n<g id="lumo:eye"><path d="M500 750c-187 0-417-163-417-250s230-250 417-250 417 163 417 250-230 250-417 250z m-336-231c20 22 47 46 78 69C322 644 411 678 500 678s178-34 258-90c31-22 59-46 78-69 6-7 12-14 16-19-4-6-9-12-16-19-20-22-47-46-78-69C678 356 589 322 500 322s-178 34-258 90c-31 22-59 46-78 69-6 7-12 14-16 19 4 6 9 12 16 19zM500 646c-81 0-146-65-146-146s65-146 146-146 146 65 146 146-65 146-146 146z m0-75c39 0 71-32 71-71 0-39-32-71-71-71-39 0-71 32-71 71 0 39 32 71 71 71z"></path></g>\n<g id="lumo:eye-disabled"><path d="M396 735l60-60c15 2 30 3 44 3 89 0 178-34 258-90 31-22 59-46 78-69 6-7 12-14 16-19-4-6-9-12-16-19-20-22-47-46-78-69-8-5-15-11-23-15l50-51C862 397 917 458 917 500c0 87-230 250-417 250-34 0-69-5-104-15zM215 654C138 603 83 542 83 500c0-87 230-250 417-250 34 0 69 5 104 15l-59 60c-15-2-30-3-45-3-89 0-178 34-258 90-31 22-59 46-78 69-6 7-12 14-16 19 4 6 9 12 16 19 20 22 47 46 78 69 8 5 16 11 24 16L215 654z m271-9l159-159c0 5 1 9 1 14 0 81-65 146-146 146-5 0-9 0-14-1z m-131-131C354 510 354 505 354 500c0-81 65-146 146-146 5 0 10 0 14 1l-159 159z m-167 257L780 179c12-12 32-12 44 0 12 12 12 32 0 44L232 815c-12 12-32 12-44 0s-12-32 0-44z"></path></g>\n<g id="lumo:indent"><path d="M125 219a31 31 0 0 1 31-32h688a31 31 0 0 1 0 63H156A31 31 0 0 1 125 219z m40 134a31 31 0 0 1 45 0l125 125a31 31 0 0 1 0 44l-125 125A31 31 0 0 1 165 603L268 500 165 397a31 31 0 0 1 0-44zM438 406a31 31 0 0 1 31-31h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-32-32z m-1 188a31 31 0 0 1 32-32h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-32-31zM125 781a31 31 0 0 1 31-31h688a31 31 0 0 1 0 63H156a31 31 0 0 1-31-32z m0 0"></path></g>\n<g id="lumo:link"><path d="M667 250h-125v79h125c94 0 171 76 170 171a171 171 0 0 1-170 171h-125V750h125a250 250 0 0 0 250-250c0-138-112-250-250-250M163 500c0-95 77-171 170-171h125V250H333a250 250 0 0 0-250 250 250 250 0 0 0 250 250h125v-79H333c-94 0-171-77-171-171M333 542h334v-84H333v84Z"></path></g>\n<g id="lumo:menu"><path d="M167 292c0-23 19-42 41-42h584C815 250 833 268 833 292c0 23-19 42-41 41H208C185 333 167 315 167 292z m0 208c0-23 19-42 41-42h584C815 458 833 477 833 500c0 23-19 42-41 42H208C185 542 167 523 167 500z m0 208c0-23 19-42 41-41h584C815 667 833 685 833 708c0 23-19 42-41 42H208C185 750 167 732 167 708z"></path></g>\n<g id="lumo:minus"><path d="M261 461c-22 0-39 18-39 39 0 22 18 39 39 39h478c22 0 39-18 39-39 0-22-18-39-39-39H261z"></path></g>\n<g id="lumo:ordered-list"><path d="M138 333V198H136l-43 28v-38l45-31h45V333H138z m-61 128c0-35 27-59 68-59 39 0 66 21 66 53 0 20-11 37-43 64l-29 27v2h74V583H80v-30l55-52c26-24 32-33 33-43 0-13-10-22-24-22-15 0-26 10-26 25v1h-41v-1zM123 759v-31h21c15 0 25-8 25-21 0-13-10-21-25-21-15 0-26 9-26 23h-41c1-34 27-56 68-57 39 0 66 20 66 49 0 20-14 36-33 39v3c24 3 40 19 39 41 0 32-30 54-73 54-41 0-69-22-70-57h43c1 13 11 22 28 22 16 0 27-9 27-22 0-14-10-22-28-22h-21zM333 258c0-18 15-33 34-33h516c18 0 33 15 34 33 0 18-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z"></path></g>\n<g id="lumo:outdent"><path d="M125 219a31 31 0 0 1 31-32h688a31 31 0 0 1 0 63H156A31 31 0 0 1 125 219z m665 134A31 31 0 0 1 835 397L732 500l103 103a31 31 0 0 1-45 44l-125-125a31 31 0 0 1 0-44l125-125zM125 406A31 31 0 0 1 156 375h375a31 31 0 0 1 0 63h-375A31 31 0 0 1 125 406z m0 188a31 31 0 0 1 31-32h375a31 31 0 0 1 0 63h-375a31 31 0 0 1-31-31z m0 187a31 31 0 0 1 31-31h688a31 31 0 0 1 0 63H156a31 31 0 0 1-31-32z m0 0"></path></g>\n<g id="lumo:phone"><path d="M296 208l42-37c17-15 44-13 58 4a42 42 0 0 1 5 7L459 282c12 20 5 45-15 57l-7 4c-17 10-25 30-19 48l20 66a420 420 0 0 0 93 157l41 45c13 14 35 17 51 8l7-5c20-12 45-5 57 16L745 777c12 20 5 45-15 57a42 42 0 0 1-8 4l-52 17c-61 21-129 4-174-43l-50-52c-81-85-141-189-175-302l-24-78c-19-62 0-129 49-172z"></path></g>\n<g id="lumo:photo"><path d="M208 167h584c69 0 125 56 125 125v416c0 69-56 125-125 125H208c-69 0-125-56-125-125V292c0-69 56-125 125-125z m584 75H208c-28 0-50 22-50 50v416c0 28 22 50 50 50h584c28 0 50-22 50-50V292c0-28-22-50-50-50zM239 740l167-167c12-12 31-14 45-6l73 43 172-201c13-15 34-18 50-7l95 67v92l-111-78-169 199c-12 14-32 17-47 8l-76-43-111 111H229c2-7 5-13 10-18zM458 427C458 490 407 542 344 542S229 490 229 427c0-63 51-115 115-115S458 364 458 427z m-62 0C396 398 373 375 344 375S292 398 292 427c0 29 23 52 52 52s52-23 52-52z"></path></g>\n<g id="lumo:play"><path d="M689 528l-298 175c-13 8-34 8-48 0-6-4-10-9-10-14V311C333 300 348 292 367 292c9 0 17 2 24 5l298 175c26 15 26 40 0 56z"></path></g>\n<g id="lumo:plus"><path d="M461 461H261c-22 0-39 18-39 39 0 22 18 39 39 39h200v200c0 22 18 39 39 39 22 0 39-18 39-39v-200h200c22 0 39-18 39-39 0-22-18-39-39-39h-200V261c0-22-18-39-39-39-22 0-39 18-39 39v200z"></path></g>\n<g id="lumo:redo"><path d="M290 614C312 523 393 458 491 458c55 0 106 22 144 57l-88 88c-3 3-5 7-5 11 0 8 6 15 15 15l193-5c17 0 31-15 31-32l5-192c0-4-1-8-4-11-6-6-16-6-22 0l-66 67C641 406 570 375 491 375c-136 0-248 90-281 215-1 2-1 5-1 8-8 44 45 68 73 32 4-5 7-11 8-16z"></path></g>\n<g id="lumo:reload"><path d="M500 233V137c0-9 7-16 15-16 4 0 8 2 10 4l133 140c12 12 12 32 0 45l-133 140c-6 6-15 6-21 0C502 447 500 443 500 438V308c-117 0-212 95-212 213 0 117 95 212 212 212 117 0 212-95 212-212 0-21 17-38 38-38s38 17 37 38c0 159-129 288-287 287-159 0-288-129-288-287 0-159 129-288 288-288z"></path></g>\n<g id="lumo:resize-handle"><path d="M772 311c12 12 12 32 0 44L355 772c-12 12-32 12-44 0s-12-32 0-44L728 311c12-12 32-12 44 0Zm0 188c12 12 12 32 0 44l-229 229c-12 12-32 12-44 0-12-12-12-32 0-44l229-229c12-12 32-12 44 0Zm0 187c12 12 12 32 0 44l-42 42c-12 12-32 12-44 0-12-12-12-32 0-44l42-42c12-12 32-12 44 0Z" fill-rule="evenodd" clip-rule="evenodd"></path></g>\n<g id="lumo:search"><path d="M662 603l131 131c16 16 16 42 0 59-16 16-43 16-59 0l-131-131C562 691 512 708 458 708c-138 0-250-112-250-250 0-138 112-250 250-250 138 0 250 112 250 250 0 54-17 104-46 145zM458 646c104 0 188-84 188-188S562 271 458 271 271 355 271 458s84 188 187 188z"></path></g>\n<g id="lumo:undo"><path d="M710 614C688 523 607 458 509 458c-55 0-106 22-144 57l88 88c3 3 5 7 5 11 0 8-6 15-15 15l-193-5c-17 0-31-15-31-32L214 400c0-4 1-8 4-11 6-6 16-6 22 0l66 67C359 406 430 375 509 375c136 0 248 90 281 215 1 2 1 5 1 8 8 44-45 68-73 32-4-5-7-11-8-16z"></path></g>\n<g id="lumo:unordered-list"><path d="M146 325c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63z m0 250c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63z m0 250c-42 0-67-26-67-63 0-37 25-63 67-63 42 0 67 26 67 63 0 37-25 63-67 63zM333 258c0-18 15-33 34-33h516c18 0 33 15 34 33 0 18-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z m0 250c0-18 15-33 34-33h516c18 0 33 15 34 33s-15 33-34 34H367c-18 0-33-15-34-34z"></path></g>\n<g id="lumo:upload"><path d="M538 279V612a38 38 0 0 1-76 0V279L337 391a38 38 0 1 1-49-57l187-166a38 38 0 0 1 50 0l187 166a38 38 0 1 1-49 57L538 279zM758 713a38 38 0 1 1 75-1v92a38 38 0 0 1-37 38H204a38 38 0 0 1-37-38v-92a38 38 0 1 1 75 1v54h516v-55z"></path></g>\n<g id="lumo:user"><path d="M500 500c-69 0-125-56-125-125s56-125 125-125 125 56 125 125-56 125-125 125z m-292 292c0-115 131-208 292-209s292 93 292 209H208z"></path></g>\n</defs></svg>',Mc.register("lumo",1e3,Hc);const Vc=t=>class extends(Ad(Ed(t))){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged",sync:!0},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value??this.textContent.trim()}set value(t){this._value=t}ready(){super.ready();const t=this.getAttribute("value");null!==t&&(this.value=t),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-item-disabled-pointer-events","auto")}focus(t){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus(t)}_shouldSetActive(t){return!(this.disabled||"keydown"===t.type&&t.defaultPrevented)}_selectedChanged(t){this.setAttribute("aria-selected",t)}_disabledChanged(t){super._disabledChanged(t),t&&(this.selected=!1,this.__shouldAllowFocusWhenDisabled()||this.blur())}_onKeyDown(t){super._onKeyDown(t),this._activeKeys.includes(t.key)&&!t.defaultPrevented&&(t.preventDefault(),this.click())}__shouldAllowFocusWhenDisabled(){return!1}},Uc=[Xs`
  :host {
    align-items: center;
    border-radius: var(--vaadin-item-border-radius, var(--vaadin-radius-m));
    box-sizing: border-box;
    cursor: var(--vaadin-clickable-cursor);
    display: flex;
    column-gap: var(--vaadin-item-gap, var(--vaadin-gap-s));
    height: var(--vaadin-item-height, auto);
    padding: var(--vaadin-item-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    -webkit-tap-highlight-color: transparent;
  }

  :host([focus-ring]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) / -1);
  }

  :host([disabled]) {
    cursor: var(--vaadin-disabled-cursor);
    opacity: 0.5;
    pointer-events: var(--_vaadin-item-disabled-pointer-events, none);
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='checkmark'] {
    color: var(--vaadin-item-checkmark-color, inherit);
    display: var(--vaadin-item-checkmark-display, none);
    visibility: hidden;
  }

  [part='checkmark']::before {
    content: '';
    display: block;
    background: currentColor;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-checkmark) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([selected]) [part='checkmark'] {
    visibility: visible;
  }

  [part='content'] {
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: inherit;
    justify-content: var(--vaadin-item-text-align, start);
  }

  @media (forced-colors: active) {
    [part='checkmark']::before {
      background: CanvasText;
    }
  }
`,Xs`
  :host([aria-haspopup='true'])::after {
    background: var(--vaadin-text-color-secondary);
    content: '';
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    rotate: -90deg;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([dir='rtl'])::after {
    rotate: 90deg;
  }

  /* TODO would be nice to only reserve the space if
    one or mote items in the list is checkable  */
  :host([menu-item-checked]) [part='checkmark'] {
    visibility: visible;
  }
`];class Wc extends(Vc(al(Ea(Ba(Qa(sa)))))){static get is(){return"vaadin-menu-bar-item"}static get styles(){return Uc}render(){return Bo`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.setAttribute("role","menuitem")}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledMenuItems}}la(Wc);const Kc=t=>class extends(tc(t)){static get properties(){return{disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0,sync:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}constructor(){super(),this._hasVaadinListMixin=!0}get _isRTL(){return!this._vertical&&"rtl"===this.getAttribute("dir")}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return"horizontal"!==this.orientation}focus(t){this._observer&&this._observer.flush();const e=Array.isArray(this.items)?this.items:[],n=this._getAvailableIndex(e,0,null,t=>0===t.tabIndex&&!Cl(t));n>=0?this._focus(n,t):super.focus(t)}ready(){super.ready(),this.addEventListener("click",t=>this._onClick(t));const t=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $d(t,()=>{this._setItems(this._filterItems([...this.children]))})}_getItems(){return this.items}_enhanceItems(t,e,n,i){if(!i&&t){this.setAttribute("aria-orientation",e||"vertical"),t.forEach(t=>gd(t,"orientation",e)),this._setFocusable(n<0||!n?0:n);const i=t[n];t.forEach(t=>{t.selected=t===i}),i&&!i.disabled&&this._scrollToItem(n)}}_filterItems(t){return t.filter(t=>t._hasVaadinItemMixin)}_onClick(t){if(t.metaKey||t.shiftKey||t.ctrlKey||t.defaultPrevented)return;const e=this._filterItems(t.composedPath())[0];let n;e&&!e.disabled&&(n=this.items.indexOf(e))>=0&&(this.selected=n)}_searchKey(t,e){this._searchReset=xa.debounce(this._searchReset,ga.after(500),()=>{this._searchBuf=""}),this._searchBuf+=e.toLowerCase(),this.items.some(t=>this.__isMatchingKey(t))||(this._searchBuf=e.toLowerCase());const n=1===this._searchBuf.length?t+1:t;return this._getAvailableIndex(this.items,n,1,t=>this.__isMatchingKey(t)&&"none"!==getComputedStyle(t).display)}__isMatchingKey(t){return t.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(t){if(t.metaKey||t.ctrlKey)return;const e=t.key,n=this.items.indexOf(this.focused);if(/[\p{L}\p{Nd}]/u.test(e)&&1===e.length){const t=this._searchKey(n,e);return void(t>=0&&this._focus(t))}super._onKeyDown(t)}_setFocusable(t){t=this._getAvailableIndex(this.items,t,1);const e=this.items[t];this.items.forEach(t=>{t.tabIndex=t===e?0:-1})}_focus(t,e){this.items.forEach((e,n)=>{e.focused=n===t}),this._setFocusable(t),this._scrollToItem(t),super._focus(t,e??{preventScroll:!0})}_scrollToItem(t){const e=this._getItems()[t];e&&e.scrollIntoView({block:"nearest",inline:"nearest"})}_scroll(t){if(this._vertical)this._scrollerElement.scrollTop+=t;else{const e=this.getAttribute("dir")||"ltr",n=function(t,e){const{scrollLeft:n}=t;return"rtl"!==e?n:t.scrollWidth-t.clientWidth+n}(this._scrollerElement,e)+t;!function(t,e,n){t.scrollLeft="rtl"!==e?n:t.clientWidth-t.scrollWidth+n}(this._scrollerElement,e,n)}}_isItemFocusable(t){return t.disabled&&t.__shouldAllowFocusWhenDisabled?t.__shouldAllowFocusWhenDisabled():super._isItemFocusable(t)}},Gc=Xs`
  :host {
    --vaadin-item-checkmark-display: block;
    display: flex;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='items'] {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }

  [part='items'] ::slotted(hr) {
    border-color: var(--vaadin-divider-color, var(--vaadin-border-color-secondary));
    border-width: 0 0 1px;
    margin: 4px 8px;
    margin-inline-start: calc(var(--vaadin-icon-size, 1lh) + var(--vaadin-item-gap, var(--vaadin-gap-s)) + 8px);
  }
`;class Jc extends(Kc(al(Ea(Ba(Qa(sa)))))){static get is(){return"vaadin-menu-bar-list-box"}static get styles(){return Gc}static get properties(){return{orientation:{type:String,readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return Bo`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menu")}}la(Jc);const Zc=t=>class extends(qd(Yd(t))){static get properties(){return{parentOverlay:{type:Object,readOnly:!0},_theme:{type:String,readOnly:!0,sync:!0}}}static get observers(){return["_themeChanged(_theme)"]}get _contentRoot(){return this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){const t=document.createElement("div");t.setAttribute("slot","overlay"),t.style.display="contents",this.owner.appendChild(t),this.__savedRoot=t}return this.__savedRoot}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",t=>{if(!t.defaultPrevented&&t.composedPath()[0]===this.$.overlay&&[38,40].indexOf(t.keyCode)>-1){const e=this.owner._menuListBox??this._contentRoot.firstElementChild;e&&Array.isArray(e.items)&&e.items.length&&(t.preventDefault(),38===t.keyCode?e.items[e.items.length-1].focus():e.focus())}})}_themeChanged(){this.close()}_shouldCloseOnOutsideClick(t){return!this.parentOverlay&&!t.composedPath().includes(this)&&(!!this.owner.items||super._shouldCloseOnOutsideClick(t))}getBoundaries(){const t=this.getBoundingClientRect(),e=this.$.overlay.getBoundingClientRect();let n=t.bottom-e.height;const i=this.parentOverlay;if(i?.hasAttribute("bottom-aligned")){const t=getComputedStyle(i);n=n-parseFloat(t.bottom)-parseFloat(t.height)}return{xMax:t.right-e.width,xMin:t.left+e.width,yMax:n}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay&&this.opened){const t=this.$.content,e=getComputedStyle(t);this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(e.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(e.paddingRight)}px`,this.style.bottom?this.style.bottom=parseFloat(this.style.bottom)-parseFloat(e.paddingBottom)+"px":this.style.top=parseFloat(this.style.top)-parseFloat(e.paddingTop)+"px"}}_shouldRestoreFocus(){return!this.parentOverlay&&super._shouldRestoreFocus()}_deepContains(t){return this.owner.contains(t)}},Xc=Xs`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host([right-aligned]),
  :host([end-aligned]) {
    align-items: flex-end;
  }

  :host([bottom-aligned]) {
    justify-content: flex-end;
  }

  [part='backdrop'] {
    background: transparent;
  }

  [part='content'] {
    padding: var(--vaadin-item-overlay-padding, 4px);
  }

  /* TODO keyboard focus becomes visible even when navigating the menu with the mouse */
  [part='overlay']:focus-visible {
    outline: none;
  }
`,Yc=[Dd,Xc];class Qc extends(Zc(Gd(Ea(al(Ba(Qa(sa))))))){static get is(){return"vaadin-menu-bar-overlay"}static get styles(){return Yc}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}_shouldCloseOnOutsideClick(t){return!t.composedPath().includes(this.owner.listenOn)&&super._shouldCloseOnOutsideClick(t)}render(){return Bo`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
          <slot name="submenu"></slot>
        </div>
      </div>
    `}}la(Qc);class th{#x=null;constructor(t,e){this.query=t,this.callback=e}hostConnected(){this.#C(),this.#x=window.matchMedia(this.query),this.#k(),this.#A(this.#x)}hostDisconnected(){this.#C()}#k(){this.#x&&this.#x.addListener(this.#A)}#C(){this.#x&&this.#x.removeListener(this.#A),this.#x=null}#A=t=>{"function"==typeof this.callback&&this.callback(t.matches)}}class eh extends lc{constructor(t){super(t,"tooltip")}initCustomNode(t){t.manual=!0,t.generator||=({item:t})=>t?.tooltip}_getItem(t){return t._item}_getDefaultPosition(t){const e=this._getItem(t);return e.children?.length>0&&!e.disabled?"start":"end"}setTarget(t){const e=this.node;if(!e)return;const n=t?this._getItem(t):null;n?.tooltip?(e.target=t,e.context={item:n},e._position=n.tooltipPosition||this._getDefaultPosition(t)):(e.target=null,e.context={item:null},this.close(!0))}open({trigger:t}){const e=this.node;e?.isConnected&&e.target&&e._stateController.open({hover:"hover"===t,focus:"focus"===t})}bringToFront(){const t=this.node;t?._overlayElement?.bringToFront()}close(t){const e=this.node;e?._stateController.close(t)}}const nh=t=>class extends t{static get properties(){return{items:{type:Array,sync:!0},_positionTarget:{type:Object,sync:!0}}}get _tagNamePrefix(){return"vaadin-context-menu"}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}__forwardFocus(){const t=this._overlayElement,e=this._menuListBox??t._contentRoot.firstElementChild;if(t.parentOverlay){const n=t.parentOverlay._contentRoot.querySelector("[expanded]");n?.hasAttribute("focused")&&e?e.focus():t.$.overlay.focus()}else e&&e.focus()}__openSubMenu(t,e){this.__updateSubMenuForItem(t,e);const n=this._overlayElement,i=t._overlayElement;i._setParentOverlay(n),gd(t,"theme",n.getAttribute("theme")),gd(t,"dir",this.dir),i.$.content.style.minWidth="",e.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:e._item.children}}))}__updateSubMenuForItem(t,e){t.items=e._item.children,t.listenOn=e,t._positionTarget=e,t._overlayElement.requestContentUpdate()}__createComponent(t){let e;return e=t.component instanceof HTMLElement?t.component:document.createElement(t.component||`${this._tagNamePrefix}-item`),e._hasVaadinItemMixin&&(e.setAttribute("role","menuitem"),e.tabIndex=-1),"hr"===e.localName?e.setAttribute("role","separator"):e.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(e,t,this._theme),e._item=t,t.text&&(e.textContent=t.text),t.className&&e.setAttribute("class",t.className),this.__toggleMenuComponentAttribute(e,"menu-item-checked",t.checked),this.__toggleMenuComponentAttribute(e,"disabled",t.disabled),t.children&&t.children.length&&(this.__updateExpanded(e,!1),e.setAttribute("aria-haspopup","true")),e}__initListBox(){const t=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&t.setAttribute("theme",this._theme),t.addEventListener("mouseover",t=>{const e=t.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(e),this._tooltipController.open({trigger:"hover"})}),t.addEventListener("mouseleave",()=>{this._tooltipController.close(!0)}),t.addEventListener("focusin",t=>{if(!bl())return;const e=t.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(e),this._tooltipController.open({trigger:"focus"})}),t.addEventListener("selected-changed",e=>{const{value:n}=e.detail;if("number"==typeof n){const e=t.items[n]._item;t.selected=null,e.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:e}}))}}),t}__initOverlay(){const t=this._overlayElement;t.$.backdrop.addEventListener("click",()=>{this.close()}),t.addEventListener("vaadin-overlay-outside-click",()=>{this.dispatchEvent(new CustomEvent("items-outside-click"))}),t.addEventListener(Hs?"click":"mouseover",t=>{t.composedPath().includes(this._subMenu)||this.__showSubMenu(t)}),t.addEventListener("keydown",t=>{if(t.composedPath().includes(this._subMenu))return;const{key:e}=t,n=this.__isRTL,i="ArrowRight"===e,r="ArrowLeft"===e;!n&&i||n&&r||"Enter"===e||" "===e?this.__showSubMenu(t):!n&&r||n&&i||"Escape"===e?("Escape"===e&&t.stopPropagation(),this.close(),this.listenOn.focus()):"Tab"!==e||t.defaultPrevented||this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){const t=document.createElement(this.constructor.is);return t._tooltipController=this._tooltipController,t.__parentMenu=this,t._modeless=!0,t.openOn="opensubmenu",this.addEventListener("opened-changed",t=>{t.detail.value||this._subMenu.close()}),t.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),t.addEventListener("item-selected",t=>{const{detail:e}=t;this.dispatchEvent(new CustomEvent("item-selected",{detail:e}))}),this.addEventListener("close-all-menus",()=>{this.close()}),this.addEventListener("item-selected",t=>{const e=t.target,n=t.detail.value,i=e.items.indexOf(n);n.keepOpen&&i>-1&&e.opened?(e.__selectedIndex=i,e.requestContentUpdate()):n.keepOpen||this.close()}),t.addEventListener("opened-changed",t=>{if(t.detail.value)this._tooltipController.bringToFront();else{const t=this._listBox.querySelector("[expanded]");t&&this.__updateExpanded(t,!1)}}),t}__showSubMenu(t,e=t.composedPath().find(t=>t.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this._overlayElement.hasAttribute("opening"))return void requestAnimationFrame(()=>{this.__showSubMenu(t,e)});const n=this._subMenu,i=this._listBox.querySelector("[expanded]");if(e&&e!==i&&!e.disabled){const{children:t}=e._item,r=n._overlayElement._contentRoot.firstElementChild,s=r?.focused;if(i&&this.__updateExpanded(i,!1),t&&t.length||n.close(),!this.opened)return;t?.length?(this.__updateExpanded(e,!0),this.__openSubMenu(n,e)):s?n.listenOn.focus():this._listBox.focused||this._overlayElement.$.overlay.focus()}e?.disabled&&n.close()}get _menuListBox(){return this.__slottedListBox??this._overlayElement._contentRoot.querySelector(`${this._tagNamePrefix}-list-box`)}__itemsRenderer(t,e){this.__initMenu(t,e),this._subMenu.closeOn=e.closeOn,this._listBox.innerHTML="",e.items.forEach(t=>{const e=this.__createComponent(t);this._listBox.appendChild(e)})}_setMenuItemTheme(t,e,n){let i=t.getAttribute("theme")||n;null!=e.theme&&(i=Array.isArray(e.theme)?e.theme.join(" "):e.theme),this.__updateTheme(t,i)}__toggleMenuComponentAttribute(t,e,n){n?(t.setAttribute(e,""),t[`__has-${e}`]=!0):t[`__has-${e}`]&&(t.removeAttribute(e),t[`__has-${e}`]=!1)}__initMenu(t,e){if(t.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();const e=this.__initListBox();this._listBox=e,t.appendChild(e);const n=this.__initSubMenu();n.slot="submenu",this._subMenu=n,this.appendChild(n),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(t,e){t.setAttribute("aria-expanded",e.toString()),t.toggleAttribute("expanded",e)}__updateTheme(t,e){gd(t,"theme",e)}close(){this.__parentMenu||this._tooltipController.close(!0)}},ih=t=>class extends(nh(t)){static get properties(){return{selector:{type:String},opened:{type:Boolean,reflectToAttribute:!0,observer:"_openedChanged",value:!1,notify:!0,readOnly:!0,sync:!0},openOn:{type:String,value:"vaadin-contextmenu",sync:!0},listenOn:{type:Object,sync:!0,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged",sync:!0},renderer:{type:Function,sync:!0},__slottedListBox:{type:Object,sync:!0},_modeless:{type:Boolean,sync:!0},_context:{type:Object,sync:!0},_phone:{type:Boolean},_fullscreen:{type:Boolean},_fullscreenMediaQuery:{type:String,value:"(max-width: 450px), (max-height: 450px)"}}}static get observers(){return["_targetOrOpenOnChanged(listenOn, openOn)","_fullscreenChanged(_fullscreen)"]}constructor(){super(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this.__onGlobalContextMenu=this.__onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.addEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.removeEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened=this.opened,setTimeout(()=>{this.isConnected||this.close()})}firstUpdated(){super.firstUpdated(),this._overlayElement=this.$.overlay,this.addController(new th(this._fullscreenMediaQuery,t=>{this._fullscreen=t})),this._tooltipController||(this._tooltipController=new eh(this),this.addController(this._tooltipController))}updated(t){if(super.updated(t),t.has("renderer")||t.has("items")||t.has("__slottedListBox")){if([this.items,this.renderer,this.__slottedListBox].filter(Boolean).length>1)throw new Error('The "items", "renderer", and slotted "<vaadin-context-menu-list-box>" cannot be used together.');this.items&&"click"===this.closeOn&&(this.closeOn="")}}_onOverlayOpened(t){t.target===this._overlayElement&&(t.detail.value?(this._setOpened(!0),this.__alignOverlayPosition()):this.opened&&this.close())}_onVaadinOverlayOpen(t){t.target===this._overlayElement&&(this.__alignOverlayPosition(),this._overlayElement.style.visibility="",this.__forwardFocus())}_onVaadinOverlayClosed(){this.dispatchEvent(new CustomEvent("closed"))}_targetOrOpenOnChanged(t,e){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),t&&e&&(this._listen(t,e,this._boundOpen),this._oldListenOn=t,this._oldOpenOn=e)}_fullscreenChanged(t){this._phone=t}__setListenOnUserSelect(t){const e=t?"none":"";this.listenOn.style.webkitTouchCallout=e,this.listenOn.style.webkitUserSelect=e,this.listenOn.style.userSelect=e,t&&document.getSelection().removeAllRanges()}_closeOnChanged(t,e){const n="vaadin-overlay-outside-click",i=this._overlayElement;e&&this._unlisten(i,e,this._boundClose),t?(this._listen(i,t,this._boundClose),i.removeEventListener(n,this._boundPreventDefault)):i.addEventListener(n,this._boundPreventDefault)}_preventDefault(t){this.items||t.preventDefault()}_openedChanged(t){this.__setListenOnUserSelect(t)}requestContentUpdate(){this._overlayElement&&(this.__preserveMenuState(),this._overlayElement.requestContentUpdate(),this.__restoreMenuState())}close(){super.close(),this._setOpened(!1)}__getComposedPath(t){return t.__composedPath??t.detail?.sourceEvent?.__composedPath??t.composedPath()}_contextTarget(t){if(this.selector){const e=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(e,e=>this.__getComposedPath(t).indexOf(e)>-1)[0]}return this.listenOn&&this.listenOn!==this&&this.position?this.listenOn:t.target}open(t){this._overlayElement&&this.__getComposedPath(t).includes(this._overlayElement)||t&&!this.opened&&(this._context={detail:t.detail,target:this._contextTarget(t)},this._context.target&&(t.preventDefault(),t.stopPropagation(),this.__x=this._getEventCoordinate(t,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(t,"y"),this.__pageYOffset=window.pageYOffset,this._overlayElement.style.visibility="hidden",this._setOpened(!0)))}__preserveMenuState(){const t=this._menuListBox;t&&(this.__focusedIndex=t.items.indexOf(t.focused),this._subMenu&&this._subMenu.opened&&(this.__subMenuIndex=t.items.indexOf(this._subMenu.listenOn)))}__restoreMenuState(){const t=this.__focusedIndex,e=this.__subMenuIndex,n=this.__selectedIndex,i=this._menuListBox;if(i){if(i._observer?.flush(),e>-1){const t=i.items[e];t?Array.isArray(t._item.children)&&t._item.children.length?(this.__updateSubMenuForItem(this._subMenu,t),this._subMenu.requestContentUpdate()):(this._subMenu.close(),this.__focusItem(t)):i.focus()}this.__focusItem(n>-1?i.children[n]:i.items[t])}this.__focusedIndex=void 0,this.__subMenuIndex=void 0,this.__selectedIndex=void 0}__focusItem(t){t&&t.focus({focusVisible:bl()})}__onOverlaySlotChange(t){this.__slottedListBox=t.target.assignedElements().find(t=>t._hasVaadinListMixin)}__onScroll(){if(!this.opened||this.position)return;const t=window.pageYOffset-this.__pageYOffset,e=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-e),this.__adjustPosition("right",e),this.__adjustPosition("top",-t),this.__adjustPosition("bottom",t),this.__pageYOffset+=t,this.__pageXOffset+=e}__adjustPosition(t,e){const n=this._overlayElement.style;n[t]=`${(parseInt(n[t])||0)+e}px`}__alignOverlayPosition(){const t=this._overlayElement;if(t.positionTarget)return;const e=t.style;["top","right","bottom","left"].forEach(t=>e.removeProperty(t)),["right-aligned","end-aligned","bottom-aligned"].forEach(e=>t.removeAttribute(e));const{xMax:n,xMin:i,yMax:r}=t.getBoundaries(),s=this.__x,o=this.__y,a=document.documentElement.clientWidth,l=document.documentElement.clientHeight;this.__isRTL?s>a/2||s>i?e.right=`${Math.max(0,a-s)}px`:(e.left=`${s}px`,this._setEndAligned(t)):s<a/2||s<n?e.left=`${s}px`:(e.right=`${Math.max(0,a-s)}px`,this._setEndAligned(t)),o<l/2||o<r?e.top=`${o}px`:(e.bottom=`${Math.max(0,l-o)}px`,t.setAttribute("bottom-aligned",""))}_setEndAligned(t){t.setAttribute("end-aligned",""),this.__isRTL||t.setAttribute("right-aligned","")}_getEventCoordinate(t,e){if(!(t.detail instanceof Object)){const n=`client${e.toUpperCase()}`,i=t.changedTouches?t.changedTouches[0][n]:t[n];if(0===i){const n=(this.__getComposedPath(t)[0]||t.target).getBoundingClientRect();return"x"===e?n.left:n.top+n.height}return i}return t.detail[e]?t.detail[e]:t.detail.sourceEvent?this._getEventCoordinate(t.detail.sourceEvent,e):void 0}_listen(t,e,n){nd[e]?ad(t,e,n):t.addEventListener(e,n)}_unlisten(t,e,n){nd[e]?function(t,e,n){!!nd[e]&&function(t,e,n){const i=nd[e],r=i.deps,s=i.name,o=t[Rl];if(o)for(let e,n,i=0;i<r.length;i++)e=r[i],n=o[e],n?.[s]&&(n[s]=(n[s]||1)-1,n._count=(n._count||1)-1,0===n._count&&t.removeEventListener(e,od,Gl(e)));t.removeEventListener(e,n)}(t,e,n)}(t,e,n):t.removeEventListener(e,n)}__createMouseEvent(t,e,n){return new MouseEvent(t,{bubbles:!0,composed:!0,cancelable:!0,clientX:e,clientY:n})}__focusClosestFocusable(t){let e=t;for(;e;){if(e instanceof HTMLElement&&kl(e))return void e.focus();e=e.assignedSlot||e.parentNode||e.host}}__contextMenuAt(t,e){const n=rd(t,e);n&&queueMicrotask(()=>{this.__focusClosestFocusable(n),n.dispatchEvent(this.__createMouseEvent("contextmenu",t,e))})}__onGlobalContextMenu(t){this.opened&&!t.shiftKey&&(Ds||Fs||(t.stopPropagation(),this._overlayElement.__focusRestorationController.focusNode=null,this._overlayElement.addEventListener("vaadin-overlay-closed",e=>{e.target===this._overlayElement&&this.__contextMenuAt(t.clientX,t.clientY)},{once:!0})),t.preventDefault(),this.close())}};class rh extends(ih(Ea(tl(Ba(sa))))){static get is(){return"vaadin-menu-bar-submenu"}static get styles(){return Xs`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `}static get properties(){return{isRoot:{type:Boolean,reflectToAttribute:!0,sync:!0}}}constructor(){super(),this.openOn="opensubmenu"}firstUpdated(t){this._tooltipController=this.parentElement._tooltipController,super.firstUpdated(t)}get _tagNamePrefix(){return"vaadin-menu-bar"}render(){return Bo`
      <vaadin-menu-bar-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        .model="${this._context}"
        .modeless="${this._modeless}"
        .renderer="${this.__itemsRenderer}"
        .withBackdrop="${this._phone}"
        .positionTarget="${this._positionTarget}"
        ?no-horizontal-overlap="${!this.isRoot}"
        ?phone="${this._phone}"
        theme="${Id(this._theme)}"
        exportparts="backdrop, overlay, content"
        @opened-changed="${this._onOverlayOpened}"
        @vaadin-overlay-open="${this._onVaadinOverlayOpen}"
      >
        <slot name="overlay"></slot>
        <slot name="submenu" slot="submenu"></slot>
      </vaadin-menu-bar-overlay>
    `}_openedChanged(){}__onGlobalContextMenu(){}close(){super.close(),this.isRoot&&this.parentElement._close()}}la(rh);const sh=Xs`
  :host {
    flex-shrink: 0;
  }

  :host([focus-ring]) {
    z-index: 1;
  }

  :host([slot='overflow']) {
    margin-inline-end: 0;
  }

  .vaadin-button-container {
    gap: inherit;
  }

  :host(:not([slot='overflow'])[aria-haspopup]) [part='suffix'] {
    display: flex;
    align-items: center;
    gap: inherit;
  }

  :host(:not([slot='overflow'])[aria-haspopup]) [part='suffix']::after {
    background: currentColor;
    content: '';
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  ::slotted(vaadin-menu-bar-item) {
    padding: 0;
    gap: 0;
  }

  ::slotted(vaadin-menu-bar-item)::after {
    display: none;
  }
`;la(class extends cc{static get is(){return"vaadin-menu-bar-button"}static get styles(){return[super.styles,sh]}_onKeyDown(t){this.__triggeredWithActiveKeys=this._activeKeys.includes(t.key),super._onKeyDown(t),this.__triggeredWithActiveKeys=null}_setActive(t){!t&&this.hasAttribute("expanded")||super._setActive(t)}__shouldSuppressInteractionEvent(t){return("keydown"!==t.type||!["ArrowLeft","ArrowRight"].includes(t.key))&&super.__shouldSuppressInteractionEvent(t)}});const oh=Xs`
  :host {
    display: block;
    min-width: 0;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Keep the width measured with all buttons in flow while the host is frozen */
  :host([overflow-frozen]) {
    contain: inline-size !important;
    contain-intrinsic-inline-size: var(--_vaadin-menu-bar-content-width);
  }

  [part='container'] {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;
    --_gap: var(--vaadin-menu-bar-gap, 0px);
    --_bw: var(--vaadin-button-border-width, 1px);
    gap: var(--_gap);
    --_rad-button: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
  }

  :host(:not([has-single-button])) ::slotted(vaadin-menu-bar-button:not(:first-of-type)) {
    margin-inline-start: min(var(--_bw) * -1 + var(--_gap) * 1000, 0px);
  }

  ::slotted(vaadin-menu-bar-button) {
    border-radius: 0;
  }

  ::slotted([first-visible]),
  :host([has-single-button]) ::slotted([slot='overflow']),
  ::slotted(vaadin-menu-bar-button[theme~='tertiary']) {
    border-start-start-radius: var(--_rad-button);
    border-end-start-radius: var(--_rad-button);
  }

  ::slotted(:is([last-visible], [slot='overflow'])),
  ::slotted(vaadin-menu-bar-button[theme~='tertiary']) {
    border-start-end-radius: var(--_rad-button);
    border-end-end-radius: var(--_rad-button);
  }

  :host([theme~='end-aligned']) ::slotted(vaadin-menu-bar-button[first-visible]),
  :host([theme~='end-aligned'][has-single-button]) ::slotted(vaadin-menu-bar-button) {
    margin-inline-start: auto;
  }
`;class ah extends eh{_getItem(t){return"vaadin-menu-bar-button"===t.localName?t.item:super._getItem(t)}_getDefaultPosition(t){return"vaadin-menu-bar-button"===t.localName?"bottom":super._getDefaultPosition(t)}}const lh=xc(class extends Cc{update(t,[{component:e,text:n}]){const{parentNode:i,startNode:r}=t,s=e||(n?document.createTextNode(n):null),o=this.getOldNode(t);return o===s||(o&&s?i.replaceChild(s,o):o?i.removeChild(o):s&&r.after(s)),Ro}getOldNode(t){const{startNode:e,endNode:n}=t;return e.nextSibling===n?null:e.nextSibling}}),dh={moreOptions:"More options"},ch=t=>class extends(Ml(tc(nc(Ed(Cd(t)))))){static get properties(){return{items:{type:Array,sync:!0,value:()=>[]},openOnHover:{type:Boolean},reverseCollapse:{type:Boolean,sync:!0},tabNavigation:{type:Boolean,sync:!0}}}static get defaultI18n(){return dh}get i18n(){return super.i18n}set i18n(t){super.i18n=t}constructor(){super(),this.__boundOnContextMenuKeydown=this.__onContextMenuKeydown.bind(this)}get focused(){return(this._getItems()||[]).find(Al)||this._expandedButton}get _vertical(){return!1}get _tabNavigation(){return this.tabNavigation}get _observeParent(){return!0}get _buttons(){return Array.from(this.querySelectorAll("vaadin-menu-bar-button"))}get _hasOverflow(){return this._overflow&&!this._overflow.hasAttribute("hidden")}set _hasOverflow(t){this._overflow&&this._overflow.toggleAttribute("hidden",!t)}ready(){super.ready(),this.setAttribute("role","menubar"),this._subMenuController=new lc(this,"submenu","vaadin-menu-bar-submenu",{initializer:t=>{t.setAttribute("is-root",""),t.addEventListener("item-selected",this.__onItemSelected.bind(this)),t.addEventListener("close-all-menus",this.__onEscapeClose.bind(this)),t._overlayElement._contentRoot.addEventListener("keydown",this.__boundOnContextMenuKeydown),this._subMenu=t}}),this._overflowController=new lc(this,"overflow","vaadin-menu-bar-button",{initializer:t=>{t.setAttribute("hidden","");const e=document.createElement("div");e.setAttribute("aria-hidden","true"),e.innerHTML="&centerdot;".repeat(3),t.appendChild(e),t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded","false"),t.setAttribute("role",this.tabNavigation?"button":"menuitem"),this._overflow=t}}),this._tooltipController=new ah(this),this.addEventListener("mousedown",()=>this._tooltipController.close(!0)),this.addEventListener("mouseleave",()=>this._tooltipController.close()),this.addController(this._tooltipController),this.addController(this._subMenuController),this.addController(this._overflowController),this._container=this.shadowRoot.querySelector('[part="container"]')}updated(t){super.updated(t),(t.has("items")||t.has("_theme")||t.has("disabled"))&&this.__renderButtons(this.items),(t.has("items")||t.has("_theme")||t.has("reverseCollapse"))&&this.__scheduleOverflow(),t.has("items")&&this.__updateSubMenu(),t.has("_theme")&&this._themeChanged(this._theme),t.has("dir")&&gd(this._subMenu,"dir",this.dir),t.has("disabled")&&this._overflow.toggleAttribute("disabled",this.disabled),t.has("tabNavigation")&&this._tabNavigationChanged(this.tabNavigation),t.has("__effectiveI18n")&&this.__i18nChanged(this.__effectiveI18n)}_getItems(){return this._buttons}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}_onResize(){this.__scheduleOverflow()}_themeChanged(t){gd(this._overflow,"theme",t),gd(this._subMenu,"theme",t)}_tabNavigationChanged(t){const e=this.querySelector('[tabindex="0"]');this._buttons.forEach(n=>{e?this._setTabindex(n,n===e):this._setTabindex(n,!1),n.setAttribute("role",t?"button":"menuitem")}),this.setAttribute("role",t?"group":"menubar")}__updateSubMenu(){const t=this._subMenu;if(t?.opened){const e=t._positionTarget;e.isConnected&&Array.isArray(e.item.children)&&0!==e.item.children.length||t.close()}}__i18nChanged(t){void 0!==t?.moreOptions&&gd(this._overflow,"aria-label",t.moreOptions)}__getOverflowCount(t){return t.item?.children?.length??0}__restoreButtons(t){t.forEach(t=>{t.style.visibility="",t.style.position="";const e=t.item?.component;e instanceof HTMLElement&&"menuitem"===e.getAttribute("role")&&this.__restoreItem(t,e)})}__restoreState(t){this.__restoreButtons(t),this.__updateOverflow([]),this.toggleAttribute("has-single-button",1===t.length),this.__updateVisibleAttributes(t)}__restoreItem(t,e){t.appendChild(e),e.removeAttribute("role"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-haspopup"),e.removeAttribute("tabindex")}__updateOverflow(t){this._overflow.item={children:t},this._hasOverflow=t.length>0}__getInlineEnd(t){const{left:e,right:n}=t.getBoundingClientRect();return this.__isRTL?-e:n}__isPastContainerEnd(t){return this.__getInlineEnd(t)>this.__getInlineEnd(this._container)+.1}__getOverflowLayout(t,e){const n=this.__isRTL,i=t.map(t=>t.getBoundingClientRect()),r=i.map(({left:t,right:e})=>n?-t:e),s=this.__getInlineEnd(e),o=this._container.getBoundingClientRect(),a=n?-o.right:o.left;return{starts:i.map(({left:t,right:e})=>n?-e:t),ends:r,margins:t.map(t=>parseFloat(getComputedStyle(t).marginInlineStart)||0),overflowExtent:s-r.at(-1),containerWidth:o.width,contentWidth:s-a}}__getButtonsToCollapse(t,{starts:e,ends:n,margins:i,overflowExtent:r,containerWidth:s}){let o=0,a=t.length-1;for(;o<=a&&i[o]+n[a]-e[o]+r>s+.1;)this.reverseCollapse?o+=1:a-=1;return t.filter((t,e)=>e<o||e>a)}__freezeWidth(t){this.style.setProperty("--_vaadin-menu-bar-content-width",`${t}px`),this.setAttribute("overflow-frozen","")}__unfreezeWidth(){this.style.removeProperty("--_vaadin-menu-bar-content-width"),this.removeAttribute("overflow-frozen")}__setOverflowItems(t,e){const n=t.at(-1),i=this.hasAttribute("overflow-frozen");if(!n||!i&&!this.__isPastContainerEnd(n))return void this.__unfreezeWidth();this._hasOverflow=!0;const r=this.__getOverflowLayout(t,e),s=this.__getButtonsToCollapse(t,r);s.forEach(t=>{t.style.visibility="hidden",t.style.position="absolute"}),this.__updateOverflow(s.map(t=>t.item)),0===s.length?this.__unfreezeWidth():(i||this.__isPastContainerEnd(e))&&this.__freezeWidth(r.contentWidth)}__scheduleOverflow(){this._overflowDebouncer=xa.debounce(this._overflowDebouncer,ya,()=>{this.__detectOverflow()})}__detectOverflow(){const t=this._overflow,e=this._buttons.filter(e=>e!==t),n=this.__getOverflowCount(t);this.__restoreState(e),this.__setOverflowItems(e,t);const i=this.__getOverflowCount(t);n!==i&&this._subMenu.opened&&this._subMenu.close();const r=i===e.length||0===i&&1===e.length;this.toggleAttribute("has-single-button",r),this.__updateVisibleButtons(e)}__updateVisibleButtons(t){const e=t.filter(t=>"hidden"!==t.style.visibility);e.length?e.some(t=>"0"===t.getAttribute("tabindex"))||this._setTabindex(e[e.length-1],!0):this._overflow.setAttribute("tabindex","0"),this.__updateVisibleAttributes(e)}__updateVisibleAttributes(t){t.forEach((e,n)=>{e.toggleAttribute("first-visible",0===n),e.toggleAttribute("last-visible",!this._hasOverflow&&n===t.length-1)})}__getButtonTheme(t,e){let n=e;const i=t?.theme;return null!=i&&(n=Array.isArray(i)?i.join(" "):i),n}__getComponent(t){const e=t.component;let n;const i=e instanceof HTMLElement;return i&&"vaadin-menu-bar-item"===e.localName?n=e:(n=document.createElement("vaadin-menu-bar-item"),n.appendChild(i?e:document.createElement(e))),t.text&&((n.firstChild||n).textContent=t.text),n}__renderButtons(t=[]){ia(Bo`
          ${t.map(t=>{const e={...t},n=Boolean(t?.children);return e.component&&(e.component=this.__getComponent(e)),Bo`
              <vaadin-menu-bar-button
                .item="${e}"
                .disabled="${this.disabled||t.disabled}"
                role="${this.tabNavigation?"button":"menuitem"}"
                aria-haspopup="${Id(n?"true":Fo)}"
                aria-expanded="${Id(n?"false":Fo)}"
                class="${Id(t.className||Fo)}"
                theme="${Id(this.__getButtonTheme(t,this._theme)||Fo)}"
                @click="${this.__onRootButtonClick}"
                >${lh(e)}</vaadin-menu-bar-button
              >
            `})}
        `,this,{renderBefore:this._overflow})}__onRootButtonClick(t){const e=t.target;e.item?.component&&!t.composedPath().includes(e.item.component)&&(t.stopPropagation(),e.item.component.click())}_setExpanded(t,e){t.toggleAttribute("expanded",e),t.toggleAttribute("active",e),t.setAttribute("aria-expanded",e?"true":"false")}_setTabindex(t,e){this.tabNavigation&&this._isItemFocusable(t)?t.setAttribute("tabindex","0"):t.setAttribute("tabindex",e?"0":"-1")}_focusItem(t,e,n){const i=n&&this.focused===this._expandedButton;i&&this._close(),super._focusItem(t,e,n),this._buttons.forEach(e=>{this._setTabindex(e,e===t)}),this._tooltipController.setTarget(t),i&&t.item?.children?this.__openSubMenu(t,!0,{keepFocus:!0}):this._subMenu.opened||this._tooltipController.open({trigger:"focus"})}_getButtonFromEvent(t){return Array.from(t.composedPath()).find(t=>"vaadin-menu-bar-button"===t.localName)}_shouldSetFocus(t){return!t.composedPath().includes(this._subMenu)&&super._shouldSetFocus(t)}_shouldRemoveFocus(t){return!t.composedPath().includes(this._subMenu)&&super._shouldRemoveFocus(t)}_setFocused(t){const e=t?this.__getFocusTarget():null;e?(this._tooltipController.setTarget(e),this._buttons.forEach(t=>{this._setTabindex(t,t===e)}),!this._subMenu.opened&&bl()&&this._tooltipController.open({trigger:"focus"})):this._tooltipController.close(!0)}__getFocusTarget(){let t=this._buttons.find(t=>Al(t));if(!t){const e=this.tabNavigation?"[focused]":'[tabindex="0"]';t=this.querySelector(`vaadin-menu-bar-button${e}`),Cl(t)&&(t=this._buttons[this._getFocusableIndex()])}return t}_onArrowDown(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusFirstItem():this.__openSubMenu(e,!0)}_onArrowUp(t){t.preventDefault();const e=this._getButtonFromEvent(t);e===this._expandedButton?this._focusLastItem():this.__openSubMenu(e,!0,{focusLast:!0})}_onEscape(t){t.composedPath().includes(this._expandedButton)&&this._close(!0),this._tooltipController.close(!0)}_onKeyDown(t){t.composedPath().includes(this._subMenu)||this._handleKeyDown(t)}_handleKeyDown(t){switch(t.key){case"ArrowDown":this._onArrowDown(t);break;case"ArrowUp":this._onArrowUp(t);break;default:super._onKeyDown(t)}}_onMouseOver(t){if(t.composedPath().includes(this._subMenu))return;const e=this._getButtonFromEvent(t);this._tooltipController.setTarget(e),e&&e!==this._expandedButton&&e.item.children&&(this.openOnHover||this._subMenu.opened)&&this.__openSubMenu(e,!1),this._subMenu.opened||this._tooltipController.open({trigger:"hover"})}__onContextMenuKeydown(t){const e=Array.from(t.composedPath()).find(t=>t._item);if(e){const n=e.parentNode;"ArrowUp"===t.key&&e===n.items[0]&&this._close(!0);const i=this.__isRTL?"ArrowRight":"ArrowLeft",r=this.__isRTL?"ArrowLeft":"ArrowRight";(t.key===i||t.key===r&&!e._item.children)&&(t.stopImmediatePropagation(),this._handleKeyDown(t)),"Tab"===t.key&&this.tabNavigation&&this._handleKeyDown(t)}}__fireItemSelected(t){this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:t}}))}__onButtonClick(t){const e=this._getButtonFromEvent(t);e&&this.__openSubMenu(e,e.__triggeredWithActiveKeys)}__openSubMenu(t,e,n={}){if(t.disabled)return;const i=this._subMenu,r=t.item;if(i.opened&&(this._close(),i.listenOn===t))return;const s=r?.children;if(!s||0===s.length)return void this.__fireItemSelected(r);i.items=s,i.listenOn=t,i._positionTarget=t;const o=i._overlayElement;o.noVerticalOverlap=!0,this._tooltipController.close(!0),this._expandedButton=t,this._setExpanded(t,!0),this.style.pointerEvents="auto",t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:s}})),o.addEventListener("vaadin-overlay-open",()=>{if(n.focusLast&&this._focusLastItem(),n.keepFocus){const t={focusVisible:bl()};this._focusItem(this._expandedButton,t,!1)}e||o.$.overlay.focus()},{once:!0})}_focusFirstItem(){this._subMenu._menuListBox.focus()}_focusLastItem(){const t=this._subMenu._menuListBox,e=t.items[t.items.length-1];e&&e.focus()}__onItemSelected(t){t.stopPropagation(),this.__fireItemSelected(t.detail.value)}__onEscapeClose(){this.__deactivateButton(!0)}__deactivateButton(t){const e=this._expandedButton;if(e?.hasAttribute("expanded")){if(this._setExpanded(e,!1),t){const t={focusVisible:bl()};this._focusItem(e,t,!1)}else this._tooltipController.close(!0);this._expandedButton=null}}_close(t=!1){this.style.pointerEvents="",this.__deactivateButton(t),this._subMenu.opened&&this._subMenu.close()}close(){this._close()}_isItemFocusable(t){return t.disabled&&t.__shouldAllowFocusWhenDisabled?t.__shouldAllowFocusWhenDisabled():super._isItemFocusable(t)}};class hh extends(ch(Oa(al(Ba(Qa(sa)))))){static get is(){return"vaadin-menu-bar"}static get styles(){return oh}render(){return Bo`
      <div part="container" @click="${this.__onButtonClick}" @mouseover="${this._onMouseOver}">
        <slot></slot>
        <slot name="overflow"></slot>
      </div>

      <slot name="submenu"></slot>

      <slot name="tooltip"></slot>
    `}}function uh(t,e,n={matchNested:!1}){const i=document.baseURI,r=new URL(t,i),s=new URL(e,i),o=r.origin===s.origin,a=n.matchNested?r.pathname===s.pathname||r.pathname.startsWith(`${s.pathname}/`):r.pathname===s.pathname;return o&&a&&function(t,e){return[...e.entries()].every(([e,n])=>t.getAll(e).includes(n))}(r.searchParams,s.searchParams)}la(hh);const ph={get pathname(){return document.location.pathname},get search(){return document.location.search}},vh=Xs`
  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
`,_h=Xs`
  :host {
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
    gap: var(--vaadin-side-nav-items-gap, var(--vaadin-gap-s));
    cursor: default;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  button {
    appearance: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    cursor: var(--vaadin-clickable-cursor);
    flex: none;
  }

  [part='toggle-button'] {
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-s));
    color: var(--vaadin-text-color-secondary);
  }

  [part='toggle-button']::before {
    content: '';
    display: block;
    background: currentColor;
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    rotate: -90deg;
  }

  :host([dir='rtl']) [part='toggle-button']::before {
    scale: -1;
  }

  :host(:is(vaadin-side-nav-item[expanded], vaadin-side-nav:not([collapsed]))) [part='toggle-button'] {
    rotate: 90deg;
  }

  :host([dir='rtl']:is(vaadin-side-nav-item[expanded], vaadin-side-nav:not([collapsed]))) [part='toggle-button'] {
    rotate: -90deg;
  }

  @media (prefers-reduced-motion: no-preference) {
    [part='toggle-button'] {
      transition: rotate 150ms;
    }
  }

  :host([disabled]) [part='toggle-button'] {
    opacity: 0.5;
  }

  [part='children'] {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: var(--vaadin-side-nav-items-gap, var(--vaadin-gap-s));
  }

  [part='children'] slot {
    --_icon-indent-2: var(--_icon-indent);
  }

  :focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  @media (forced-colors: active) {
    [part='toggle-button']::before {
      background: CanvasText;
    }
  }
`,fh=[_h,vh,Xs`
  [part='content'] {
    display: flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    padding: var(
      --vaadin-side-nav-item-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    --_gap: var(--vaadin-side-nav-item-gap, var(--vaadin-gap-s));
    gap: var(--_gap);
    font-size: var(--vaadin-side-nav-item-font-size, 1em);
    font-weight: var(--vaadin-side-nav-item-font-weight, 500);
    line-height: var(--vaadin-side-nav-item-line-height, inherit);
    color: var(--vaadin-side-nav-item-text-color, var(--vaadin-text-color-secondary));
    background: var(--vaadin-side-nav-item-background, transparent);
    background-origin: border-box;
    border: var(--vaadin-side-nav-item-border-width, 0) solid var(--vaadin-side-nav-item-border-color, transparent);
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-m));
    cursor: var(--vaadin-clickable-cursor);
    touch-action: manipulation;
    contain: layout;
  }

  :host([current]) [part='content'] {
    --vaadin-side-nav-item-background: var(--vaadin-background-container);
    --vaadin-side-nav-item-text-color: var(--vaadin-text-color);
  }

  :host([disabled]) {
    --vaadin-clickable-cursor: var(--vaadin-disabled-cursor);
  }

  :host([disabled]) [part='content'] {
    --vaadin-side-nav-item-text-color: var(--vaadin-text-color-disabled);
  }

  :host(:not([has-children])) {
    gap: 0;
  }

  [part='link'] {
    flex: auto;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: inherit;
    text-decoration: none;
    color: inherit;
    outline: 0;
  }

  :host(:not([has-children])) [part='toggle-button'] {
    display: none !important;
  }

  slot:not([name]) {
    display: block;
    flex: auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Don't clip ascenders or descenders */
    padding-block: 0.25em;
    margin-block: -0.25em;
  }

  slot:is([name='prefix'], [name='suffix'])::slotted(*) {
    flex: none;
  }

  [part='content']:not(:has([href])):has([part='toggle-button']:focus-visible),
  [part='content']:has(:not([part='toggle-button']):focus-visible),
  [part='content']:has([href]) [part='toggle-button']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  [part='content']:not(:has([href])) [part='toggle-button']:focus-visible {
    outline: 0;
  }

  /* Hierarchy indentation */
  [part='content']::before {
    content: '';
    width: calc(
      var(--vaadin-side-nav-child-indent, 1em) * var(--_level, 0) + var(--_icon-indent, 0) *
        (var(--vaadin-icon-size, 1lh) + var(--_gap))
    );
    flex: none;
    margin-inline-start: calc(var(--_gap) * -1);
  }

  [part='children'] {
    --_level: calc(var(--_level-2, 0) + 1);
  }

  [part='children'] ::slotted(*) {
    --_level-2: var(--_level);
  }

  @media (forced-colors: active) {
    [part='content'] {
      border: 1px solid Canvas !important;
    }

    :host([current]) [part='content'] {
      color: Highlight !important;
      border-color: Highlight !important;
    }

    :host([disabled]) [part='content'] {
      --vaadin-side-nav-item-text-color: GrayText !important;
    }

    :host([disabled]) [part='toggle-button']::before {
      background: GrayText !important;
    }
  }
`],gh={toggle:"Toggle child items"};class mh extends lc{constructor(t,e){super(t,e,null,{observe:!0,multiple:!0})}initAddedNode(){this.host.requestUpdate()}teardownNode(){this.host.requestUpdate()}}const bh=t=>class extends(Ml(t)){static get properties(){return{_itemsCount:{type:Number,value:0}}}static get defaultI18n(){return gh}constructor(){super(),this._childrenController=new mh(this,this._itemsSlotName)}get i18n(){return super.i18n}set i18n(t){super.i18n=t}get _items(){return this._childrenController.nodes}get _itemsSlotName(){return"children"}firstUpdated(){super.firstUpdated(),this.addController(this._childrenController)}willUpdate(t){super.willUpdate(t),this._itemsCount=this._items.length}updated(t){super.updated(t),t.has("_itemsCount")&&this.toggleAttribute("has-children",this._itemsCount>0),(t.has("_itemsCount")||t.has("__effectiveI18n"))&&this._items.forEach(t=>{t.i18n=this.__effectiveI18n})}};class yh extends(bh(Cd(Oa(al(Ba(Qa(sa))))))){static get is(){return"vaadin-side-nav-item"}static get properties(){return{path:{type:String},pathAliases:{type:Array,value:()=>[]},expanded:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},matchNested:{type:Boolean,value:!1},current:{type:Boolean,value:!1,readOnly:!0,reflectToAttribute:!0},target:{type:String},routerIgnore:{type:Boolean,value:!1},__tooltipText:{type:String}}}static get styles(){return fh}constructor(){super(),this.__boundUpdateCurrent=this.__updateCurrent.bind(this)}get _button(){return this.shadowRoot.querySelector("button")}firstUpdated(){super.firstUpdated(),this.hasAttribute("role")||this.setAttribute("role","listitem")}updated(t){super.updated(t),(t.has("path")||t.has("pathAliases")||t.has("matchNested"))&&this.__updateCurrent(),(t.has("disabled")||t.has("_itemsCount"))&&this._items.forEach(t=>{t.disabled=this.disabled})}connectedCallback(){super.connectedCallback(),this.__updateCurrent(),window.addEventListener("popstate",this.__boundUpdateCurrent),window.addEventListener("vaadin-navigated",this.__boundUpdateCurrent),window.addEventListener("side-nav-location-changed",this.__boundUpdateCurrent)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.__boundUpdateCurrent),window.removeEventListener("vaadin-navigated",this.__boundUpdateCurrent),window.removeEventListener("side-nav-location-changed",this.__boundUpdateCurrent)}render(){return Bo`
      <div id="content" part="content" @click="${this._onContentClick}">
        <a
          id="link"
          ?disabled="${this.disabled}"
          tabindex="${this.disabled||null==this.path?"-1":"0"}"
          href="${Id(this.disabled?null:this.path)}"
          target="${Id(this.target)}"
          ?router-ignore="${this.routerIgnore}"
          part="link"
          aria-current="${this.current?"page":"false"}"
        >
          <slot name="prefix"></slot>
          <slot></slot>
          <div class="sr-only">${this.__tooltipText}</div>
          <slot name="suffix"></slot>
        </a>
        <button
          part="toggle-button"
          ?disabled="${this.disabled}"
          @click="${this._onButtonClick}"
          aria-controls="children"
          aria-expanded="${this.expanded}"
          aria-labelledby="link i18n"
        ></button>
      </div>
      <ul
        id="children"
        part="children"
        role="list"
        ?hidden="${!this.expanded}"
        aria-hidden="${this.expanded?"false":"true"}"
      >
        <slot name="children"></slot>
      </ul>
      <div hidden id="i18n">${this.__effectiveI18n.toggle}</div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new dc(this),this._tooltipController.setTarget(this.$.content),this._tooltipController.setAriaTarget(null),this._tooltipController.addEventListener("tooltip-changed",t=>{const{node:e}=t.detail;e?(this.__tooltipText=e.textContent.trim(),e.setAttribute("aria-hidden","true")):this.__tooltipText=""}),this.addController(this._tooltipController)}_onButtonClick(t){t.stopPropagation(),this.__toggleExpanded()}_onContentClick(t){null==this.path||t.composedPath().find(t=>t===this.$.link)?null==this.path&&this.hasAttribute("has-children")&&!this.disabled&&this.__toggleExpanded():this.$.link.click()}__toggleExpanded(){this.expanded=!this.expanded}__updateCurrent(){this._setCurrent(this.__isCurrent()),this.current&&(this.__expandParentItems(),this.expanded=this._items.length>0)}__expandParentItems(){const t=this.closest("vaadin-side-nav");if(t?.noAutoExpand)return;const e=this.__getParentItem();e&&(e.__expandParentItems(),e.expanded=!0)}__getParentItem(){return this.parentElement instanceof yh?this.parentElement:null}__isCurrent(){if(null==this.path)return!1;const t=`${ph.pathname}${ph.search}`,e={matchNested:this.matchNested};return uh(t,this.path,e)||this.pathAliases.some(n=>uh(t,n,e))}}la(yh);const wh=new WeakMap,xh=La(t=>class extends t{get slotStyles(){return[]}connectedCallback(){super.connectedCallback(),this.__applySlotStyles()}__applySlotStyles(){const t=this.getRootNode(),e=function(t){return wh.has(t)||wh.set(t,new Set),wh.get(t)}(t);this.slotStyles.forEach(n=>{e.has(n)||(function(t,e){const n=document.createElement("style");n.textContent=t,e===document?document.head.appendChild(n):e.insertBefore(n,e.firstChild)}(n,t),e.add(n))})}}),Ch=[_h,Xs`
  :host {
    white-space: nowrap;
    touch-action: manipulation;
  }

  [part='label'] {
    align-self: start;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: var(--vaadin-side-nav-item-gap, var(--vaadin-gap-s));
    padding: var(
      --vaadin-side-nav-item-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    font-size: var(--vaadin-side-nav-label-font-size, max(11px, 0.875em));
    font-weight: var(--vaadin-side-nav-label-font-weight, 500);
    color: var(--vaadin-side-nav-label-color, var(--vaadin-text-color-secondary));
    line-height: var(--vaadin-side-nav-label-line-height, inherit);
    border-radius: var(--vaadin-side-nav-item-border-radius, var(--vaadin-radius-m));
    touch-action: manipulation;
    min-width: 0;
    max-width: 100%;
  }

  ::slotted([slot='label']) {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`],kh=Xs`
  :where(vaadin-side-nav:has(> vaadin-side-nav-item > vaadin-icon[slot='prefix']))::part(children),
  :where(vaadin-side-nav-item:has(> vaadin-side-nav-item[slot='children'] > vaadin-icon[slot='prefix']))::part(
    children
  ) {
    --_icon-indent: calc(var(--_icon-indent-2, 0) + 1);
  }

  :where(vaadin-side-nav-item:has(> vaadin-icon[slot='prefix']))::part(content) {
    --_icon-indent: calc(var(--_icon-indent-2) - 1);
  }

  :where(
    vaadin-side-nav-item:has(> vaadin-icon[slot='prefix']):has(> vaadin-side-nav-item > vaadin-icon[slot='prefix'])
  )::part(children) {
    --_level: var(--_level-2, 0);
  }

  vaadin-side-nav:not(:has([slot='label']))::part(label) {
    display: none;
  }
`;class Ah extends(bh(xh(Ed(Oa(al(Ba(Qa(sa)))))))){static get is(){return"vaadin-side-nav"}static get shadowRootOptions(){return{...sa.shadowRootOptions,delegatesFocus:!0}}static get properties(){return{collapsible:{type:Boolean,value:!1,reflectToAttribute:!0},collapsed:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},onNavigate:{attribute:!1},location:{observer:"__locationChanged"},noAutoExpand:{type:Boolean,reflectToAttribute:!0,value:!1}}}static get styles(){return Ch}get slotStyles(){return[kh]}constructor(){super(),this._labelId=`side-nav-label-${ac()}`,this.addEventListener("click",this.__onClick)}get _itemsSlotName(){return""}get focusElement(){return this.shadowRoot.querySelector("button")}firstUpdated(){super.firstUpdated(),this.hasAttribute("role")||this.setAttribute("role","navigation")}render(){return Bo`
      ${this.collapsible?Bo`
              <button
                part="label"
                @click="${this._onLabelClick}"
                aria-expanded="${!this.collapsed}"
                aria-controls="children"
              >
                <slot name="label" @slotchange="${this._onLabelSlotChange}"></slot>
                <span part="toggle-button" aria-hidden="true"></span>
              </button>
            `:Bo`
              <div part="label">
                <slot name="label" @slotchange="${this._onLabelSlotChange}"></slot>
              </div>
            `}
      <ul
        id="children"
        role="list"
        part="children"
        ?hidden="${this.collapsed}"
        aria-hidden="${this.collapsed?"true":"false"}"
      >
        <slot></slot>
      </ul>
    `}_shouldSetFocus(t){return t.composedPath()[0]===this.focusElement}_onLabelClick(){this.collapsible&&this.__toggleCollapsed()}_onLabelSlotChange(){const t=this.querySelector('[slot="label"]');t?(t.id||(t.id=this._labelId),this.setAttribute("aria-labelledby",t.id)):this.removeAttribute("aria-labelledby")}__locationChanged(){window.dispatchEvent(new CustomEvent("side-nav-location-changed"))}__toggleCollapsed(){this.collapsed=!this.collapsed}__onClick(t){if(!this.onNavigate)return;if(t.metaKey||t.shiftKey)return;const e=t.composedPath(),n=e.find(t=>t.localName&&t.localName.includes("side-nav-item")),i=e.find(t=>t instanceof HTMLAnchorElement);n&&n.shadowRoot.contains(i)&&i.href&&i.href.startsWith(location.origin)&&"_blank"!==n.target&&(n.routerIgnore||!1!==this.onNavigate({path:n.path,target:n.target,current:n.current,expanded:n.expanded,pathAliases:n.pathAliases,originalEvent:t})&&t.preventDefault())}}la(Ah);const Eh=La(t=>class extends(Ed(Sd(t))){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged",sync:!0},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame(()=>{this.focus()})}focus(t){if(this.focusElement&&!this.disabled){if(this.focusElement.focus({preventScroll:!!t?.preventScroll}),!Al(this.focusElement))return;!1!==t?.focusVisible&&this.setAttribute("focus-ring","")}}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(t,e){t?(t.disabled=this.disabled,this._addFocusListeners(t),this.__forwardTabIndex(this.tabindex)):e&&this._removeFocusListeners(e)}_addFocusListeners(t){t.addEventListener("blur",this._boundOnBlur),t.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(t){t.removeEventListener("blur",this._boundOnBlur),t.removeEventListener("focus",this._boundOnFocus)}_onFocus(t){t.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(t){t.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(t){return t.target===this.focusElement}_shouldRemoveFocus(t){return t.target===this.focusElement}_disabledChanged(t,e){super._disabledChanged(t,e),this.focusElement&&(this.focusElement.disabled=t),t&&this.blur()}_tabindexChanged(t){this.__forwardTabIndex(t)}__forwardTabIndex(t){void 0!==t&&this.focusElement&&(this.focusElement.tabIndex=t,-1!==t&&(this.tabindex=void 0)),this.disabled&&t&&(-1!==t&&(this._lastTabIndex=t),this.tabindex=void 0),void 0===t&&this.hasAttribute("tabindex")&&this.removeAttribute("tabindex")}}),Sh=La(t=>class extends t{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(t){t&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach(t=>{this._delegateAttribute(t,this[t])})}_ensurePropsDelegated(){this.constructor.delegateProps.forEach(t=>{this._delegateProperty(t,this[t])})}_delegateAttrsChanged(...t){this.constructor.delegateAttrs.forEach((e,n)=>{this._delegateAttribute(e,t[n])})}_delegatePropsChanged(...t){this.constructor.delegateProps.forEach((e,n)=>{this._delegateProperty(e,t[n])})}_delegateAttribute(t,e){this.stateTarget&&("invalid"===t&&this._delegateAttribute("aria-invalid",!!e&&"true"),"boolean"==typeof e?this.stateTarget.toggleAttribute(t,e):gd(this.stateTarget,t,e))}_delegateProperty(t,e){this.stateTarget&&(this.stateTarget[t]=e)}}),zh=La(t=>class extends t{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return null!=this.value&&""!==this.value}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(t){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=t)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(t){t.addEventListener("input",this._boundOnInput),t.addEventListener("change",this._boundOnChange)}_removeInputListeners(t){t.removeEventListener("input",this._boundOnInput),t.removeEventListener("change",this._boundOnChange)}_forwardInputValue(t){this.inputElement&&(this._inputElementValue=null!=t?t:"")}_inputElementChanged(t,e){t?this._addInputListeners(t):e&&this._removeInputListeners(e)}_onInput(t){const e=t.composedPath()[0];this.__userInput=t.isTrusted,this.value=e.value,this.__userInput=!1}_onChange(t){}_toggleHasValue(t){this.toggleAttribute("has-value",t)}_valueChanged(t,e){this._toggleHasValue(this._hasValue),""===t&&void 0===e||this.__userInput||this._forwardInputValue(t)}}),Oh=t=>class extends(Sh(Cd(zh(t)))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(t){const e=t.target;this._toggleChecked(e.checked)}_toggleChecked(t){this.checked=t}};class Th{#E;#S=!1;#z;#O;#T;#L;#I;#$=[];#M=[];constructor(t){this.host=t}setTarget(t){this.#E=t,this.#N(),this.#P(),this.#j(),this.#B()}setRequired(t){this.#S=t,this.#B()}setLabel(t){this.#z=t,this.#N()}setLabelledBy(t){this.#O=t,this.#P()}setDescribedBy(t){this.#T=t,this.#j()}setErrorId(t){this.#L=t,this.#j()}setHelperId(t){this.#I=t,this.#j()}#N(){this.#E&&gd(this.#E,"aria-label",this.#z)}#P(){this.#E&&(yd(this.#E,"aria-labelledby",this.#$),this.#$=[this.#O],bd(this.#E,"aria-labelledby",this.#$))}#j(){this.#E&&(yd(this.#E,"aria-describedby",this.#M),this.#M=[this.#T,this.#I,this.#L],bd(this.#E,"aria-describedby",this.#M))}#B(){this.#E&&(["input","textarea"].includes(this.#E.localName)||gd(this.#E,"aria-required",this.#S))}}const Lh=document.createElement("div");let Ih;Lh.style.position="fixed",Lh.style.clip="rect(0px, 0px, 0px, 0px)",Lh.setAttribute("aria-live","polite"),document.body.appendChild(Lh);class $h extends uc{constructor(t){super(t,"error-message","div")}setErrorMessage(t){this.errorMessage=t,this.updateDefaultNode(this.node)}setInvalid(t){this.invalid=t,this.updateDefaultNode(this.node)}initAddedNode(t){t!==this.defaultNode&&this.initCustomNode(t)}initNode(t){this.updateDefaultNode(t)}initCustomNode(t){t.textContent&&!this.errorMessage&&(this.errorMessage=t.textContent.trim()),super.initCustomNode(t)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(t){const{errorMessage:e,invalid:n}=this,i=Boolean(n&&e&&""!==e.trim());t&&(t.textContent=i?e:"",t.hidden=!i,i&&function(t,e={}){const n=e.mode||"polite",i=e.timeout??150;"alert"===n?(Lh.removeAttribute("aria-live"),Lh.removeAttribute("role"),Ih=xa.debounce(Ih,ma,()=>{Lh.setAttribute("role","alert")})):(Ih&&Ih.cancel(),Lh.removeAttribute("role"),Lh.setAttribute("aria-live",n)),Lh.textContent="",setTimeout(()=>{Lh.textContent=t},i)}(e,{mode:"assertive"})),super.updateDefaultNode(t)}}class Mh extends uc{constructor(t){super(t,"helper",null)}setHelperText(t){this.helperText=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{helperText:t}=this;if(t&&""!==t.trim()){this.tagName="div";const t=this.attachDefaultNode();this.observeNode(t)}}updateDefaultNode(t){t&&(t.textContent=this.helperText),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}}class Nh extends uc{constructor(t){super(t,"label","label")}setLabel(t){this.label=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{label:t}=this;if(t&&""!==t.trim()){const t=this.attachDefaultNode();this.observeNode(t)}}updateDefaultNode(t){t&&(t.textContent=this.label),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}}const Ph=t=>class extends t{static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new Nh(this),this._labelController.addEventListener("slot-content-changed",t=>{this.toggleAttribute("has-label",t.detail.hasContent)})}get _labelId(){const t=this._labelNode;return t?.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(t){this._labelController.setLabel(t)}},jh=La(t=>class extends t{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){const t=this.checkValidity();return this._setInvalid(!t),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:t}})),t}checkValidity(){return!this.required||!!this.value}_setInvalid(t){this._shouldSetInvalid(t)&&(this.invalid=t)}_shouldSetInvalid(t){return!0}_requestValidation(){this.manualValidation||this.validate()}}),Bh=t=>class extends(jh(Ph(t))){static get properties(){return{ariaTarget:{type:Object},errorMessage:{type:String},helperText:{type:String},accessibleName:{type:String},accessibleNameRef:{type:String},accessibleDescriptionRef:{type:String}}}constructor(){super(),this._labelController.addEventListener("slot-content-changed",t=>{this.#D(t)}),this._helperController=new Mh(this),this._helperController.addEventListener("slot-content-changed",t=>{this.#R(t)}),this._errorController=new $h(this),this._errorController.addEventListener("slot-content-changed",t=>{this.#F(t)}),this._fieldAriaController=new Th(this)}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}updated(t){super.updated(t),t.has("invalid")&&this._errorController.setInvalid(this.invalid),t.has("errorMessage")&&this._errorController.setErrorMessage(this.errorMessage),t.has("helperText")&&this._helperController.setHelperText(this.helperText),t.has("ariaTarget")&&this._fieldAriaController.setTarget(this.ariaTarget),t.has("required")&&this._fieldAriaController.setRequired(this.required),t.has("accessibleName")&&this.__updateFieldAriaControllerLabel(),(t.has("accessibleName")||t.has("accessibleNameRef"))&&this.__updateFieldAriaControllerLabelledBy(),t.has("accessibleDescriptionRef")&&this.__updateFieldAriaControllerDescribedBy()}__updateFieldAriaControllerLabel(){this._fieldAriaController.setLabel(this.accessibleName)}__updateFieldAriaControllerLabelledBy(){let t=null;this.accessibleNameRef?t=this.accessibleNameRef:this.hasAttribute("has-label")&&!this.accessibleName&&(t=this._labelNode?.id),this._fieldAriaController.setLabelledBy(t)}__updateFieldAriaControllerDescribedBy(){this._fieldAriaController.setDescribedBy(this.accessibleDescriptionRef)}#D(t){this.__updateFieldAriaControllerLabelledBy()}#R(t){const{hasContent:e}=t.detail;this.toggleAttribute("has-helper",e),e?this._fieldAriaController.setHelperId(this._helperNode?.id):this._fieldAriaController.setHelperId(null)}#F(t){this.toggleAttribute("has-error-message",t.detail.hasContent),setTimeout(()=>{this.invalid?this._fieldAriaController.setErrorId(this._errorNode?.id):this._fieldAriaController.setErrorId(null)})}};class Dh extends lc{constructor(t,e,n={}){const{uniqueIdPrefix:i}=n;super(t,"input","input",{initializer:(t,n)=>{n.value&&(t.value=n.value),n.type&&t.setAttribute("type",n.type),t.id=this.defaultId,"function"==typeof e&&e(t)},useUniqueId:!0,uniqueIdPrefix:i})}}class Rh{constructor(t,e){this.input=t,e.addEventListener("slot-content-changed",t=>{this.#q(t.detail.node)}),this.#q(e.node)}#q(t){t&&(t.addEventListener("click",this.#H),this.input&&t.setAttribute("for",this.input.id))}#H=()=>{const t=e=>{e.stopImmediatePropagation(),this.input.removeEventListener("click",t)};this.input.addEventListener("click",t)}}const Fh=t=>class extends(xh(Bh(Oh(Eh(Ad(t)))))){static get properties(){return{name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`\n          ${this.localName} > input[slot='input'] {\n            opacity: 0;\n          }\n        `]}ready(){super.ready(),this.addController(new Dh(this,t=>{this._setInputElement(t),this._setFocusElement(t),this.stateTarget=t,this.ariaTarget=t})),this.addController(new Rh(this.inputElement,this._labelController)),this._createPropertyObserver("checked","_checkedChanged")}updated(t){super.updated(t),t.has("required")&&!1===this.required&&this._requestValidation()}_shouldSetActive(t){const[e]=t.composedPath(),n=e===this.inputElement||e.part.contains("required-indicator")||this._labelNode?.contains(e)&&!e.closest("a");return!(this.readonly||!n)&&super._shouldSetActive(t)}_addInputListeners(t){super._addInputListeners(t),t.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(t){super._removeInputListeners(t),t.removeEventListener("click",this._boundOnInputClick)}_onInputClick(t){this.readonly&&t.preventDefault()}__readonlyChanged(t,e){e&&gd(e,"aria-readonly",t)}checkValidity(){return!this.required||!!this.checked}_setFocused(t){super._setFocused(t),!t&&document.hasFocus()&&this._requestValidation()}_checkedChanged(t,e){(t||e)&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode?.click()}},qh=Xs`
  :host {
    --_helper-below-field: initial;
    --_helper-above-field: ;
    --_no-helper: initial;
    --_has-helper: ;
    --_no-error: initial;
    --_has-error: ;
    --_gap: var(--vaadin-input-field-container-gap, var(--vaadin-gap-xs));
    --_gap-s: round(var(--_gap) / 3, 2px);
    display: inline-grid;
    grid-template:
      'label' auto var(--_helper-above-field, 'helper' auto) 'baseline' 0 'input' 1fr var(
        --_helper-below-field,
        'helper' auto
      )
      'error' auto / 100%;
    height: fit-content;
    outline: none;
    cursor: default;
    -webkit-tap-highlight-color: transparent;
  }

  :host([has-helper]) {
    --_has-helper: initial;
    --_no-helper: ;
  }

  :host([has-error-message]) {
    --_has-error: initial;
    --_no-error: ;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([has-label])) [part='label'],
  :host(:not([has-helper])) [part='helper-text'],
  :host(:not([has-error-message])) [part='error-message'] {
    display: none;
  }

  /* Baseline alignment guide */
  :host::before {
    content: '\\2003' / '';
    grid-column: 1;
    grid-row: 1 / baseline;
    align-self: end;
    font-size: var(--vaadin-input-field-value-font-size, inherit);
    line-height: var(--vaadin-input-field-value-line-height, inherit);
    padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    border: var(--vaadin-input-field-border-width, 1px) solid transparent;
    pointer-events: none;
    margin-bottom: calc(
      var(
          --vaadin-field-baseline-input-height,
          (1lh + var(--vaadin-padding-block-container) * 2 + var(--vaadin-input-field-border-width, 1px) * 2)
        ) *
        -1
    );
  }

  [class$='container'] {
    display: contents;
  }

  [part] {
    grid-column: 1;
  }

  [part='label'] {
    font-size: var(--vaadin-input-field-label-font-size, inherit);
    line-height: var(--vaadin-input-field-label-line-height, inherit);
    font-weight: var(--vaadin-input-field-label-font-weight, 500);
    color: var(--vaadin-input-field-label-color, var(--vaadin-text-color));
    word-break: break-word;
    position: relative;
    grid-area: label;
    margin-bottom: var(--_helper-below-field, var(--_gap)) var(--_helper-above-field, var(--_no-helper, var(--_gap)));
  }

  ::slotted(label) {
    cursor: inherit;
  }

  :host([disabled]) [part='label'],
  :host([disabled]) ::slotted(label) {
    opacity: 0.5;
  }

  :host([disabled]) [part='label'] ::slotted(label) {
    opacity: 1;
  }

  :host([required]) [part='label'] {
    padding-inline-end: 1em;
  }

  [part='required-indicator'] {
    display: inline-block;
    position: absolute;
    width: 1em;
    text-align: center;
    color: var(--vaadin-input-field-required-indicator-color, var(--vaadin-text-color-secondary));
  }

  [part='required-indicator']::after {
    content: var(--vaadin-input-field-required-indicator, '*');
  }

  :host(:not([required])) [part='required-indicator'] {
    display: none;
  }

  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    width: min-content;
    min-width: 100%;
    box-sizing: border-box;
  }

  [part='input-field'],
  [part='group-field'],
  [part='input-fields'] {
    grid-area: input;
  }

  [part='input-field'] {
    width: var(--vaadin-field-default-width, 12em);
    max-width: 100%;
    min-width: 100%;
  }

  :host([readonly]) [part='input-field'] {
    cursor: default;
  }

  :host([disabled]) [part='input-field'] {
    cursor: var(--vaadin-disabled-cursor);
  }

  [part='helper-text'] {
    font-size: var(--vaadin-input-field-helper-font-size, inherit);
    line-height: var(--vaadin-input-field-helper-line-height, inherit);
    font-weight: var(--vaadin-input-field-helper-font-weight, 400);
    color: var(--vaadin-input-field-helper-color, var(--vaadin-text-color-secondary));
    grid-area: helper;
    margin-top: var(--_helper-above-field, var(--_gap-s)) var(--_helper-below-field, var(--_gap));
    margin-bottom: var(--_helper-above-field, var(--_gap));
  }

  [part='error-message'] {
    font-size: var(--vaadin-input-field-error-font-size, inherit);
    line-height: var(--vaadin-input-field-error-line-height, inherit);
    font-weight: var(--vaadin-input-field-error-font-weight, 400);
    color: var(--vaadin-input-field-error-color, var(--vaadin-text-color));
    display: flex;
    gap: var(--vaadin-gap-xs);
    grid-area: error;
    margin-top: var(--_has-helper, var(--_helper-below-field, var(--_gap-s)) var(--_helper-above-field, var(--_gap)))
      var(--_no-helper, var(--_gap));
  }

  [part='error-message']::before {
    content: '';
    display: inline-block;
    flex: none;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-warn) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    background: currentColor;
  }

  :host([theme~='helper-above-field']) {
    --_helper-above-field: initial;
    --_helper-below-field: ;
  }

  @media (forced-colors: active) {
    [part='error-message']::before {
      background: CanvasText;
    }
  }
`,Hh=Xs`
  /* Track */
  [part='switch'] {
    --_switch-width: var(--vaadin-switch-width, round(2em, 2px));
    --_switch-height: var(--vaadin-switch-height, round(1.25em, 2px));
    --_marker-width: var(--vaadin-switch-marker-width, var(--_marker-height));
    --_marker-height: var(--vaadin-switch-marker-height, round(1.25em - 4px, 2px));
    --_height-diff: calc(var(--_switch-height) - var(--_marker-height));
    width: var(--_switch-width);
    height: var(--_switch-height);
    --_marker-radius: var(--vaadin-switch-marker-border-radius, var(--vaadin-radius-l));
    border-radius: var(--vaadin-switch-border-radius, calc(var(--_marker-radius) + var(--_height-diff) / 2));
    border-width: var(--vaadin-switch-border-width, 2px);
    border-color: var(--vaadin-switch-border-color, var(--vaadin-text-color));
    margin-inline: max(0px, var(--_height-diff) / -2);
  }

  /* Checkmark/radio marker, not used in switch */
  /* This defines the baseline alignment, so we need to recreate it with the real marker element */
  [part='switch']::after {
    display: none;
  }

  /* Marker */
  [part='marker'] {
    box-sizing: border-box;
    border: var(--vaadin-switch-marker-border-width, 1px) solid var(--vaadin-switch-marker-border-color, transparent);
    width: var(--_marker-width);
    height: var(--_marker-height);
    min-width: 0;
    border-radius: var(--_marker-radius);
    background: var(--vaadin-switch-marker-color, var(--vaadin-text-color));
    color: var(--vaadin-switch-icon-color, var(--vaadin-switch-background, var(--vaadin-background-color)));
    --_empty-space: round((var(--_switch-width) - var(--_height-diff) - var(--_marker-width)) / 2, 1px);
    --_dir: 1;
    translate: calc(var(--_empty-space) * var(--_dir) * -1) 0;
    scale: var(--vaadin-switch-marker-scale, 0.75);

    /* For baseline alignment (and icon variant) */
    display: flex;
    align-items: center;

    &::before {
      content: '\\2003' / '';
      display: flex;
      align-items: center;
      pointer-events: none;
      user-select: none;
      width: 100%;
      height: 100%;
      min-height: 0;
    }

    /* Focus outline is on the marker when it's larger than the switch/track */
    outline-offset: calc(var(--vaadin-switch-marker-border-width, 1px) * -1);
    outline: min(var(--vaadin-focus-ring-width, 2px), var(--_marker-height) - var(--_switch-height)) solid transparent;
  }

  /* Focus outline */
  :host([focus-ring]) [part='switch'] {
    outline-offset: 1px;
    outline-width: min(var(--vaadin-focus-ring-width, 2px), var(--_switch-height) - var(--_marker-height));
  }

  :host([focus-ring][checked]) [part='switch'] {
    outline-offset: 1px;
  }

  :host([focus-ring]) [part='marker'] {
    outline-color: var(--vaadin-focus-ring-color);
  }

  /* Checked state */
  :host([checked]) {
    --vaadin-switch-marker-color: var(--vaadin-background-color);
    --vaadin-switch-marker-scale: 1;
  }

  [part='switch'],
  [part='marker'] {
    transition:
      background-color 100ms,
      border-color 100ms;
  }

  @media (prefers-reduced-motion: no-preference) {
    [part='marker'] {
      transition: all 100ms;
    }
  }

  :host([checked]) [part='marker'] {
    translate: calc(var(--_empty-space) * var(--_dir)) 0;
  }

  :host([dir='rtl']) [part='marker'] {
    --_dir: -1;
  }

  /* Read-only state */
  :host([readonly]) {
    --vaadin-switch-marker-color: var(--vaadin-text-color-disabled);
    --vaadin-switch-icon-color: var(--vaadin-background-color);
  }

  :host([readonly][checked]) {
    --vaadin-switch-background: var(--vaadin-border-color);
    --vaadin-switch-marker-color: var(--vaadin-background-color);
    --vaadin-switch-icon-color: var(--vaadin-border-color);
    --_border-style: none;
  }

  /* Disabled state */
  :host([disabled]) {
    --vaadin-switch-background: var(--vaadin-background-color);
    --vaadin-switch-border-color: var(--vaadin-background-container-strong);
    --vaadin-switch-marker-color: var(--vaadin-background-container-strong);
  }

  :host([disabled][checked]) {
    --vaadin-switch-background: var(--vaadin-background-container-strong);
    --vaadin-switch-border-color: transparent;
    --vaadin-switch-marker-color: var(--vaadin-background-color);
  }

  /* Icon variant */
  :host([theme~='icon']) [part='marker']::before {
    background: currentColor;
    mask-image: var(--_vaadin-icon-cross-small);
    mask-position: 50%;
    mask-size: var(--vaadin-switch-icon-size, 85% 85%);
    mask-repeat: no-repeat;
  }

  :host([theme~='icon'][checked]) [part='marker']::before {
    mask-image: var(--_vaadin-icon-checkmark-small);
  }

  /* Forced colors */
  @media (forced-colors: active) {
    [part='switch'] {
      background: Canvas !important;
      border: 1px solid CanvasText !important;
    }

    :host([checked]) [part='switch'] {
      background: SelectedItem !important;
    }

    [part='marker'] {
      background: CanvasText !important;
    }

    :host(:not([theme~='icon'])) [part='marker']::before {
      opacity: 0 !important;
    }

    :host([checked]) [part='marker'] {
      background: SelectedItemText !important;
    }

    :host([readonly]) [part='marker'] {
      opacity: 0.5 !important;
    }

    :host([disabled]) [part='marker'] {
      background: GrayText !important;
    }
  }
`,Vh=[qh,((t,e=t)=>Xs`
  :host {
    align-items: baseline;
    column-gap: var(--vaadin-${Zs(e)}-gap, var(--vaadin-gap-s));
    grid-template: none;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(auto-fill, minmax(0, max-content));
    -webkit-tap-highlight-color: transparent;
    --_cursor: var(--vaadin-clickable-cursor);
    --_marker-color: var(--vaadin-${Zs(e)}-marker-color, var(--vaadin-${Zs(e)}-background, var(--vaadin-background-color)));
    --_marker-filter: var(--vaadin-${Zs(e)}-marker-color, saturate(0) invert(1) hue-rotate(180deg) contrast(100) brightness(100));
  }

  :host(:not([has-label])) {
    column-gap: 0;
  }

  [part='${Zs(t)}'],
  ::slotted(input),
  [part='label'],
  ::slotted(label) {
    grid-row: 1;
  }

  [part='label'],
  ::slotted(label) {
    font-size: var(--vaadin-${Zs(e)}-label-font-size, var(--vaadin-input-field-label-font-size, inherit));
    line-height: var(--vaadin-${Zs(e)}-label-line-height, var(--vaadin-input-field-label-line-height, inherit));
    font-weight: var(--vaadin-${Zs(e)}-label-font-weight, var(--vaadin-input-field-label-font-weight, 500));
    color: var(--vaadin-${Zs(e)}-label-color, var(--vaadin-input-field-label-color, var(--vaadin-text-color)));
    word-break: break-word;
    cursor: var(--_cursor);
  }

  [part='${Zs(t)}'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    margin-bottom: 0;
    grid-column: 2;
    width: auto;
    min-width: auto;
  }

  [part='helper-text'],
  [part='error-message'] {
    margin-top: var(--_gap-s);
    grid-row: auto;
  }

  /* Baseline vertical alignment */
  :host::before {
    grid-row: 1;
    margin: 0;
    padding: 0;
    border: 0;
  }

  /* visually hidden */
  ::slotted(input) {
    cursor: inherit;
    align-self: stretch;
    appearance: none;
    cursor: var(--_cursor);
    /* Override 16px from iOS UA stylesheet and CSS resets */
    width: auto !important;
    height: auto !important;
    /* Ensure minimum click target (WCAG) */
    margin: min(0px, (24px - 100%) / -2) !important;
    /* Extend the input to cover the gap between the checkbox/radio and label */
    margin-inline-end: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${Zs(e)}-gap, var(--vaadin-gap-s))) !important;
  }

  /* Control container (checkbox, radio button) */
  [part='${Zs(t)}'] {
    background: var(--vaadin-${Zs(e)}-background, var(--vaadin-background-color));
    border-color: var(--vaadin-${Zs(e)}-border-color, var(--vaadin-input-field-border-color, var(--vaadin-border-color)));
    border-radius: var(--vaadin-${Zs(e)}-border-radius, var(--vaadin-radius-s));
    border-style: var(--_border-style, solid);
    --_border-width: var(--vaadin-${Zs(e)}-border-width, var(--vaadin-input-field-border-width, 1px));
    border-width: var(--_border-width);
    box-sizing: border-box;
    color: var(--_marker-color);
    height: var(--vaadin-${Zs(e)}-size, round(1.125em, 2px));
    width: var(--vaadin-${Zs(e)}-size, round(1.125em, 2px));
    position: relative;
    cursor: var(--_cursor);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(:is([checked], [indeterminate])) {
    --vaadin-${Zs(e)}-background: var(--vaadin-text-color);
    --vaadin-${Zs(e)}-border-color: transparent;
  }

  :host([readonly]) {
    --vaadin-${Zs(t)}-background: transparent;
    --vaadin-${Zs(t)}-border-color: var(--vaadin-border-color);
    --vaadin-${Zs(t)}-marker-color: var(--vaadin-text-color);
    --_border-style: dashed;
    --_cursor: var(--vaadin-disabled-cursor);

    [part='label'],
    ::slotted(label) {
      cursor: default;
    }
  }

  :host([disabled]) {
    --vaadin-${Zs(e)}-background: var(--vaadin-input-field-disabled-background, var(--vaadin-background-container-strong));
    --vaadin-${Zs(e)}-border-color: transparent;
    --vaadin-${Zs(e)}-marker-color: var(--vaadin-text-color-disabled);
    --_cursor: var(--vaadin-disabled-cursor);
  }

  /* Focus ring */
  :host([focus-ring]) [part='${Zs(t)}'] {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--_border-width) * -1);
  }

  :host([focus-ring]:is([checked], [indeterminate])) [part='${Zs(t)}'] {
    outline-offset: 1px;
  }

  :host([readonly][focus-ring]) [part='${Zs(t)}'] {
    --vaadin-${Zs(e)}-border-color: transparent;
    outline-offset: calc(var(--_border-width) * -1);
    outline-style: dashed;
  }

  /* Checked indicator (checkmark, dot) */
  [part='${Zs(t)}']::after {
    content: '\\2003' / '';
    background: currentColor;
    border-radius: inherit;
    display: flex;
    align-items: center;
    filter: var(--_marker-filter);
  }

  :host(:not([checked], [indeterminate])) [part='${Zs(t)}']::after {
    opacity: 0;
  }

  /* Reverse variant */
  :host([theme~='reverse']) {
    grid-template-columns: 1fr auto;

    &::before {
      display: none;
    }

    [part='label'],
    [part='helper-text'],
    [part='error-message'] {
      grid-column: 1;
    }

    [part='${Zs(t)}'],
    ::slotted(input) {
      grid-column: 2;
    }

    ::slotted(input) {
      margin-inline: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${Zs(e)}-gap, var(--vaadin-gap-s))) 0 !important;
    }
  }

  @media (forced-colors: active) {
    :host(:is([checked], [indeterminate])) {
      --vaadin-${Zs(e)}-border-color: CanvasText !important;
    }

    :host(:is([checked], [indeterminate])) [part='${Zs(t)}'] {
      background: SelectedItem !important;
    }

    :host(:is([checked], [indeterminate])) [part='${Zs(t)}']::after {
      background: SelectedItemText !important;
    }

    :host([readonly]) [part='${Zs(t)}']::after {
      background: CanvasText !important;
    }

    :host([disabled]) {
      --vaadin-${Zs(e)}-border-color: GrayText !important;
    }

    :host([disabled]) [part='${Zs(t)}']::after {
      background: GrayText !important;
    }
  }
`)("switch"),Hh];class Uh extends(Fh(Oa(Ba(Qa(sa))))){static get is(){return"vaadin-switch"}static get styles(){return Vh}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){return Bo`
      <div class="vaadin-switch-container">
        <div part="switch" aria-hidden="true">
          <div part="marker"></div>
        </div>
        <slot name="input"></slot>
        <div part="label">
          <slot name="label"></slot>
          <div part="required-indicator" @click="${this._onRequiredIndicatorClick}"></div>
        </div>
        <div part="helper-text">
          <slot name="helper"></slot>
        </div>
        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new dc(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_inputElementChanged(t,e){super._inputElementChanged(t,e),t&&t.setAttribute("role","switch")}}la(Uh);const Wh=Xs`
  :host {
    display: flex;
    align-items: center;
    --_radius: var(--vaadin-input-field-border-radius, var(--vaadin-radius-m));
    border-radius:
      /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius */
      var(--vaadin-input-field-top-start-radius, var(--_radius))
      var(--vaadin-input-field-top-end-radius, var(--_radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_radius));
    border: var(--vaadin-input-field-border-width, 1px) solid
      var(--vaadin-input-field-border-color, var(--vaadin-border-color));
    box-sizing: border-box;
    cursor: text;
    padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    gap: var(--vaadin-input-field-gap, var(--vaadin-gap-s));
    background: var(--vaadin-input-field-background, var(--vaadin-background-color));
    color: var(--vaadin-input-field-value-color, var(--vaadin-text-color));
    font-size: var(--vaadin-input-field-value-font-size, inherit);
    line-height: var(--vaadin-input-field-value-line-height, inherit);
    font-weight: var(--vaadin-input-field-value-font-weight, 400);
  }

  :host([dir='rtl']) {
    --_radius: var(--vaadin-input-field-border-radius, var(--vaadin-radius-m));
    border-radius:
      /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
      var(--vaadin-input-field-top-end-radius, var(--_radius))
      var(--vaadin-input-field-top-start-radius, var(--_radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_radius));
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Reset the native input styles */
  ::slotted(:is(input, textarea)) {
    appearance: none;
    align-self: stretch;
    box-sizing: border-box;
    flex: auto;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: auto;
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    font-size: 1em;
    color: inherit;
    background: transparent;
    cursor: inherit;
    text-align: inherit;
    caret-color: var(--vaadin-input-field-value-color);
  }

  ::slotted(*) {
    flex: none;
  }

  slot[name$='fix'] {
    cursor: auto;
  }

  ::slotted(:is(input, textarea))::placeholder {
    /* Use ::slotted(:is(input, textarea):placeholder-shown) to style the placeholder */
    /* because ::slotted(...)::placeholder does not work in Safari. */
    font: inherit;
    color: inherit;
  }

  ::slotted(:is(input, textarea):placeholder-shown) {
    color: var(--vaadin-input-field-placeholder-color, var(--vaadin-text-color-secondary));
  }

  :host(:focus-within) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-input-field-border-width, 1px) * -1);
  }

  :host([invalid]) {
    --vaadin-input-field-border-color: var(--vaadin-input-field-error-color, var(--vaadin-text-color));
  }

  :host([readonly]) {
    border-style: dashed;
  }

  :host([readonly]:focus-within) {
    outline-style: dashed;
    --vaadin-input-field-border-color: transparent;
  }

  :host([disabled]) {
    --vaadin-input-field-value-color: var(--vaadin-input-field-disabled-text-color, var(--vaadin-text-color-disabled));
    --vaadin-input-field-background: var(
      --vaadin-input-field-disabled-background,
      var(--vaadin-background-container-strong)
    );
    --vaadin-input-field-border-color: transparent;
  }

  :host([theme~='align-start']) slot:not([name])::slotted(*) {
    text-align: start;
  }

  :host([theme~='align-center']) slot:not([name])::slotted(*) {
    text-align: center;
  }

  :host([theme~='align-end']) slot:not([name])::slotted(*) {
    text-align: end;
  }

  :host([theme~='align-left']) slot:not([name])::slotted(*) {
    text-align: left;
  }

  :host([theme~='align-right']) slot:not([name])::slotted(*) {
    text-align: right;
  }

  @media (forced-colors: active) {
    :host {
      --vaadin-input-field-background: Field;
      --vaadin-input-field-value-color: FieldText;
      --vaadin-input-field-placeholder-color: GrayText;
    }

    :host([disabled]) {
      --vaadin-input-field-value-color: GrayText;
      --vaadin-icon-color: GrayText;
    }
  }
`;class Kh extends(al(Ea(Ba(Qa(sa))))){static get is(){return"vaadin-input-container"}static get styles(){return Wh}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},invalid:{type:Boolean,reflectToAttribute:!0}}}render(){return Bo`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `}ready(){super.ready(),this.addEventListener("pointerdown",t=>{t.target===this&&t.preventDefault()}),this.addEventListener("click",t=>{t.target===this&&this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).forEach(t=>t.focus&&t.focus())})}}la(Kh);const Gh=[qh,Xs`
  [part$='button'] {
    color: var(--vaadin-input-field-button-text-color, var(--vaadin-text-color-secondary));
    cursor: var(--vaadin-clickable-cursor);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
    /* Ensure minimum click target (WCAG) */
    padding: max(0px, (24px - var(--vaadin-icon-size, 1lh)) / 2);
    margin: min(0px, (24px - var(--vaadin-icon-size, 1lh)) / -2);
  }

  /* Icon */
  [part$='button']::before {
    background: currentColor;
    content: '';
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    width: var(--vaadin-icon-size, 1lh);
    mask-size: var(--vaadin-icon-visual-size, 100%);
    mask-position: 50%;
    mask-repeat: no-repeat;
  }

  :host(:is(:not([clear-button-visible][has-value]), [disabled], [readonly])) [part~='clear-button'] {
    display: none;
  }

  [part~='clear-button']::before {
    mask-image: var(--_vaadin-icon-cross);
  }

  :host(:is([readonly], [disabled])) [part$='button'] {
    color: var(--vaadin-text-color-disabled);
    cursor: var(--vaadin-disabled-cursor);
  }

  @media (forced-colors: active) {
    [part$='button']::before {
      background: CanvasText;
    }

    :host([disabled]) [part$='button'] {
      color: GrayText;
    }

    :host([disabled]) [part$='button']::before {
      background: GrayText;
    }
  }
`],Jh=Xs`
  :host {
    height: auto;
  }

  [part='input-field'] {
    overflow: auto;
    scroll-padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
  }

  ::slotted(textarea) {
    resize: none;
    white-space: pre-wrap;
  }

  [part='input-field'] ::slotted(:not(textarea)),
  [part~='clear-button'] {
    align-self: flex-start;
    position: sticky;
    top: 0;
  }

  [part~='clear-button'] {
    top: min(0px, (24px - 1lh) / -2);
  }

  /* Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=1739079 */
  :host([disabled]) ::slotted(textarea) {
    user-select: none;
  }
`,Zh=t=>class extends(zh(kd(t))){static get properties(){return{clearButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1}}}get clearElement(){return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`),null}ready(){super.ready(),this.clearElement&&(this.clearElement.addEventListener("mousedown",t=>this._onClearButtonMouseDown(t)),this.clearElement.addEventListener("click",t=>this._onClearButtonClick(t)))}_onClearButtonClick(t){t.preventDefault(),this._onClearAction()}_onClearButtonMouseDown(t){this._shouldKeepFocusOnClearMousedown()&&t.preventDefault(),Hs||this.inputElement.focus()}_onEscape(t){super._onEscape(t),this.clearButtonVisible&&this.value&&!this.readonly&&(t.stopPropagation(),this._onClearAction())}_onClearAction(){this._inputElementValue="",this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.inputElement.dispatchEvent(new Event("change",{bubbles:!0}))}_shouldKeepFocusOnClearMousedown(){return Al(this.inputElement)}},Xh=La(t=>class extends(Sh(jh(zh(t)))){static get constraints(){return["required"]}static get delegateAttrs(){return[...super.delegateAttrs,"required"]}ready(){super.ready(),this._createConstraintsObserver()}checkValidity(){return this.inputElement&&this._hasValidConstraints(this.constructor.constraints.map(t=>this[t]))?this.inputElement.checkValidity():!this.invalid}_hasValidConstraints(t){return t.some(t=>this.__isValidConstraint(t))}_createConstraintsObserver(){this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`)}_constraintsChanged(t,...e){if(!t)return;const n=this._hasValidConstraints(e),i=this.__previousHasConstraints&&!n;(this._hasValue||this.invalid)&&n?this._requestValidation():i&&!this.manualValidation&&this._setInvalid(!1),this.__previousHasConstraints=n}_onChange(t){t.stopPropagation(),this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{detail:{sourceEvent:t},bubbles:t.bubbles,cancelable:t.cancelable}))}__isValidConstraint(t){return Boolean(t)||0===t}}),Yh=t=>class extends(xh(Eh(Xh(Bh(Zh(kd(t))))))){static get properties(){return{allowedCharPattern:{type:String,observer:"_allowedCharPatternChanged"},autoselect:{type:Boolean,value:!1},name:{type:String,reflectToAttribute:!0},placeholder:{type:String,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"name","type","placeholder","readonly","invalid","title"]}constructor(){super(),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this)}get slotStyles(){const t=this.localName;return[`\n          /* Needed for Safari, where ::slotted(...)::placeholder does not work */\n          ${t} > :is(input[slot='input'], textarea[slot='textarea'])::placeholder {\n            font: inherit;\n            color: inherit;\n          }\n\n          /* Override built-in autofill styles */\n          ${t} > input[slot='input']:autofill {\n            -webkit-text-fill-color: var(--vaadin-input-field-autofill-color, black) !important;\n            background-clip: text !important;\n          }\n\n          ${t}:has(> input[slot='input']:autofill)::part(input-field) {\n            --vaadin-input-field-background: var(--vaadin-input-field-autofill-background, lightyellow) !important;\n            --vaadin-input-field-value-color: var(--vaadin-input-field-autofill-color, black) !important;\n            --vaadin-input-field-button-text-color: var(--vaadin-input-field-autofill-color, black) !important;\n          }\n        `]}_onFocus(t){super._onFocus(t),this.autoselect&&this.inputElement&&this.inputElement.select()}_addInputListeners(t){super._addInputListeners(t),t.addEventListener("paste",this._boundOnPaste),t.addEventListener("drop",this._boundOnDrop),t.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(t){super._removeInputListeners(t),t.removeEventListener("paste",this._boundOnPaste),t.removeEventListener("drop",this._boundOnDrop),t.removeEventListener("beforeinput",this._boundOnBeforeInput)}_onKeyDown(t){super._onKeyDown(t),this.allowedCharPattern&&!this.__shouldAcceptKey(t)&&t.target===this.inputElement&&(t.preventDefault(),this._markInputPrevented())}_markInputPrevented(){this.setAttribute("input-prevented",""),this._preventInputDebouncer=xa.debounce(this._preventInputDebouncer,ga.after(200),()=>{this.removeAttribute("input-prevented")})}__shouldAcceptKey(t){return t.metaKey||t.ctrlKey||!t.key||1!==t.key.length||this.__allowedCharRegExp.test(t.key)}_onPaste(t){if(this.allowedCharPattern){const e=t.clipboardData.getData("text");this.__allowedTextRegExp.test(e)||(t.preventDefault(),this._markInputPrevented())}}_onDrop(t){if(this.allowedCharPattern){const e=t.dataTransfer.getData("text");this.__allowedTextRegExp.test(e)||(t.preventDefault(),this._markInputPrevented())}}_onBeforeInput(t){this.allowedCharPattern&&t.data&&!this.__allowedTextRegExp.test(t.data)&&(t.preventDefault(),this._markInputPrevented())}_allowedCharPatternChanged(t){if(t)try{this.__allowedCharRegExp=new RegExp(`^${t}$`,"u"),this.__allowedTextRegExp=new RegExp(`^${t}*$`,"u")}catch(t){console.error(t)}}},Qh=t=>class extends(Yh(t)){static get properties(){return{autocomplete:{type:String},autocorrect:{type:String,reflectToAttribute:!0},autocapitalize:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"autocapitalize","autocomplete","autocorrect"]}_inputElementChanged(t,e){super._inputElementChanged(t,e),t&&(t.value&&t.value!==this.value&&(console.warn(`Please define value on the <${this.localName}> component!`),t.value=""),this.value&&(t.value=this.value))}_setFocused(t){super._setFocused(t),!t&&document.hasFocus()&&this._requestValidation()}_onInput(t){super._onInput(t),this.invalid&&this._requestValidation()}_valueChanged(t,e){super._valueChanged(t,e),void 0!==e&&this.invalid&&this._requestValidation()}};class tu extends lc{constructor(t,e){super(t,"textarea","textarea",{initializer:(t,n)=>{const i=n.getAttribute("value");i&&(t.value=i);const r=n.getAttribute("name");r&&t.setAttribute("name",r),t.id=this.defaultId,"function"==typeof e&&e(t)},useUniqueId:!0})}}const eu=t=>class extends(nc(Qh(t))){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},minRows:{type:Number,value:2,observer:"__minRowsChanged"},maxRows:{type:Number}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}static get observers(){return["__updateMinHeight(minRows, inputElement)","__updateMaxHeight(maxRows, inputElement, _inputField)"]}get clearElement(){return this.$.clearButton}_onResize(){this._updateHeight(),this.__scrollPositionUpdated()}_onScroll(){this.__scrollPositionUpdated()}ready(){super.ready(),this.__textAreaController=new tu(this,t=>{this._setInputElement(t),this._setFocusElement(t),this.stateTarget=t,this.ariaTarget=t}),this.addController(this.__textAreaController),this.addController(new Rh(this.inputElement,this._labelController)),this._inputField=this.shadowRoot.querySelector("[part=input-field]"),this._inputField.addEventListener("wheel",t=>{const e=this._inputField.scrollTop;this._inputField.scrollTop+=t.deltaY,e!==this._inputField.scrollTop&&(t.preventDefault(),this.__scrollPositionUpdated())}),this._updateHeight(),this.__scrollPositionUpdated()}__scrollPositionUpdated(){this._inputField.style.setProperty("--_text-area-vertical-scroll-position","0px"),this._inputField.style.setProperty("--_text-area-vertical-scroll-position",`${this._inputField.scrollTop}px`)}_valueChanged(t,e){super._valueChanged(t,e),this._updateHeight()}_updateHeight(){const t=this.inputElement,e=this._inputField;if(!t||!e)return;const n=e.scrollTop,i=parseFloat(t.style.height),r=this.value?this.value.length:0;if(this._oldValueLength>=r){const n=getComputedStyle(e).height,i=getComputedStyle(t).width;e.style.height=n,t.style.maxWidth=i,t.style.alignSelf="flex-start",t.style.height="auto"}this._oldValueLength=r;const s=t.scrollHeight;Math.abs(s-i)<=1?t.style.height=`${i}px`:s>t.clientHeight&&(t.style.height=`${s}px`),t.style.removeProperty("max-width"),t.style.removeProperty("align-self"),e.style.removeProperty("height"),e.scrollTop=n,this.__updateMaxHeight(this.maxRows)}__updateMinHeight(t){this.inputElement&&this.inputElement===this.__textAreaController.defaultNode&&(this.inputElement.rows=Math.max(t,1))}__updateMaxHeight(t){if(this._inputField&&this.inputElement)if(t){const e=getComputedStyle(this.inputElement),n=getComputedStyle(this._inputField),i=parseFloat(e.lineHeight)*t,r=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.marginTop)+parseFloat(e.marginBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth)+parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),s=Math.ceil(i+r);this._inputField.style.setProperty("max-height",`${s}px`)}else this._inputField.style.removeProperty("max-height")}__minRowsChanged(t){t<1&&console.warn("<vaadin-text-area> minRows must be at least 1.")}scrollToStart(){this._inputField.scrollTop=0}scrollToEnd(){this._inputField.scrollTop=this._inputField.scrollHeight}checkValidity(){if(!super.checkValidity())return!1;if(!this.pattern||!this.inputElement.value)return!0;try{const t=this.inputElement.value.match(this.pattern);return!!t&&t[0]===t.input}catch(t){return!0}}};class nu extends(eu(al(Oa(Ba(Qa(sa)))))){static get is(){return"vaadin-text-area"}static get styles(){return[Gh,Jh]}render(){return Bo`
      <div class="vaadin-text-area-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${Id(this._theme)}"
          @scroll="${this._onScroll}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="textarea"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new dc(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}}la(nu);const iu=Xs`
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Theme variations */
  :host([theme~='margin']) {
    margin: var(--vaadin-vertical-layout-margin, var(--vaadin-padding-m));
  }

  :host([theme~='padding']) {
    padding: var(--vaadin-vertical-layout-padding, var(--vaadin-padding-m));
  }

  :host([theme~='spacing']) {
    gap: var(--vaadin-vertical-layout-gap, var(--vaadin-gap-s));
  }

  :host([theme~='wrap']) {
    flex-wrap: wrap;
  }
`,ru=window.Vaadin.featureFlags.layoutComponentImprovements,su=Xs`
  ::slotted([data-height-full]) {
    flex: 1;
  }

  ::slotted(vaadin-horizontal-layout[data-height-full]),
  ::slotted(vaadin-vertical-layout[data-height-full]) {
    min-height: 0;
  }
`,ou=ru?[iu,su]:[iu];class au extends(al(Oa(Ba(Qa(sa))))){static get is(){return"vaadin-vertical-layout"}static get styles(){return ou}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){return Bo`<slot></slot>`}}la(au);class lu{}class du{}class cu{constructor(){gu=this,this.us_1="small",this.vs_1="large",this.ws_1="tertiary",this.xs_1="tertiary-inline",this.ys_1="primary",this.zs_1="success",this.at_1="warning",this.bt_1="error",this.ct_1="contrast",this.dt_1="icon"}}class hu{constructor(){mu=this,this.et_1="elevated",this.ft_1="outlined",this.gt_1="horizontal",this.ht_1="stretch-media",this.it_1="cover-media"}}class uu{constructor(){bu=this,this.jt_1="margin",this.kt_1="padding",this.lt_1="spacing-xs",this.mt_1="spacing-s",this.nt_1="spacing",this.ot_1="spacing-l",this.pt_1="spacing-xl",this.qt_1="wrap"}}class pu{constructor(){yu=this,this.rt_1="items-baseline",this.st_1="items-center",this.tt_1="items-end",this.ut_1="items-start",this.vt_1="items-stretch"}}class vu{constructor(){wu=this,this.wt_1="justify-around",this.xt_1="justify-between",this.yt_1="justify-center",this.zt_1="justify-end",this.au_1="justify-evenly",this.bu_1="justify-start"}}class _u{constructor(){xu=this,this.cu_1="small",this.du_1="large",this.eu_1="tertiary",this.fu_1="tertiary-inline",this.gu_1="primary",this.hu_1="contrast",this.iu_1="icon",this.ju_1="end-aligned",this.ku_1="dropdown-indicators",this.lu_1="filled",this.mu_1="success",this.nu_1="warning",this.ou_1="error"}}class fu{constructor(){Cu=this,this.pu_1="margin",this.qu_1="padding",this.ru_1="spacing-xs",this.su_1="spacing-s",this.tu_1="spacing",this.uu_1="spacing-l",this.vu_1="spacing-xl",this.wu_1="wrap"}}var gu,mu,bu,yu,wu,xu,Cu;function ku(t){return k}function Au(t){return k}function Eu(t){return k}function Su(t){t=t===C?zu:t;var e=document.createElement("vaadin-breadcrumbs-item");return t(e),e}function zu(t){return k}function Ou(t){t=t===C?Tu:t;var e=document.createElement("vaadin-button");return t(e),e}function Tu(t){return k}function Lu(t){t=t===C?Iu:t;var e=document.createElement("vaadin-card");return t(e),e}function Iu(t){return k}function $u(){return mu===C&&new hu,mu}function Mu(t){t=t===C?Nu:t;var e=document.createElement("vaadin-horizontal-layout");return t(e),e}function Nu(t){return k}function Pu(){return bu===C&&new uu,bu}function ju(){return yu===C&&new pu,yu}function Bu(){return wu===C&&new vu,wu}function Du(t){t=t===C?Ru:t;var e=document.createElement("vaadin-menu-bar");return t(e),e}function Ru(t){return k}function Fu(){return xu===C&&new _u,xu}function qu(t){return k}function Hu(t){t=t===C?Vu:t;var e=document.createElement("vaadin-side-nav-item");return t(e),e}function Vu(t){return k}function Uu(t){return k}function Wu(t){return k}function Ku(t,e,n){for(var i=function(t){for(var e=or(t.getAttribute("theme")??"",Fe([32])),n=ct.i1(),i=e.s();i.t();){var r=i.u();xn(r)>0&&n.z(r)}return n}(t),r=Kn([[e],n]),s=ct.y(r.length),o=0,a=r.length;o<a;){var l=r[o];o=o+1|0;var d=Ju(l);s.z(d)}for(var c=ct.i1(),h=s.s();h.t();){var u=h.u();i.m1(u)||c.z(u)}var p=c;return p.a1()||Gu(t,function(t,e){if(ti(e,V)){var n=ct.y(t.c1()+e.c1()|0);return n.e1(t),n.e1(e),n}var i=ct.d1(t);return Gi(i,e),i}(i,p)),t}function Gu(t,e){for(var n=ct.i1(),i=e.s();i.t();)Gi(n,or(i.u(),Fe([je(32)])));for(var r=ct.i1(),s=n.s();s.t();){var o=s.u();xn(o)>0&&r.z(o)}var a=Ie(r);a.a1()?t.removeAttribute("theme"):t.setAttribute("theme",Se(a," "))}function Ju(t){return t}function Zu(t){t=t===C?Xu:t;var e=document.createElement("vaadin-vertical-layout");return t(e),e}function Xu(t){return k}function Yu(){return Cu===C&&new fu,Cu}Vn(lu,"VaadinTagName"),Vn(du,"AppLayoutPrimarySections"),Vn(cu,"ButtonVariants"),Vn(hu,"CardVariants"),Vn(uu,"HorizontalLayoutVariants"),Vn(pu,"AlignItems"),Vn(vu,"JustifyContent"),Vn(_u,"MenuBarVariants"),Vn(fu,"VerticalLayoutVariants"),new lu,new du;class Qu{constructor(t,e){this.qb_1=t,this.rb_1=e}}function tp(t,e){return function(t,e,n){var i,r,s;return n=n===C?{}:n,t.qb_1.addEventListener(t.rb_1,e,n),i=t,r=e,s=n,()=>(i.qb_1.removeEventListener(i.rb_1,r,s),k)}(t,e)}function ep(t,e,n,i){i=i===C?{}:i,t.addEventListener(e,n,i)}qn(Qu,"EventInstance");const np=Object.freeze({left:0,top:0,width:16,height:16}),ip=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),rp=Object.freeze({...np,...ip}),sp=Object.freeze({...rp,body:"",hidden:!1}),op=Object.freeze({width:null,height:null}),ap=Object.freeze({...op,...ip}),lp=/[\s,]+/,dp={...ap,preserveAspectRatio:""};function cp(t){const e={...dp},n=(e,n)=>t.getAttribute(e)||n;var i;return e.width=n("width",null),e.height=n("height",null),e.rotate=function(t,e=0){const n=t.replace(/^-?[0-9.]*/,"");function i(t){for(;t<0;)t+=4;return t%4}if(""===n){const e=parseInt(t);return isNaN(e)?0:i(e)}if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let r=parseFloat(t.slice(0,t.length-n.length));return isNaN(r)?0:(r/=e,r%1==0?i(r):0)}}return e}(n("rotate","")),i=e,n("flip","").split(lp).forEach(t=>{switch(t.trim()){case"horizontal":i.hFlip=!0;break;case"vertical":i.vFlip=!0}}),e.preserveAspectRatio=n("preserveAspectRatio",n("preserveaspectratio","")),e}const hp=/^[a-z0-9]+(-[a-z0-9]+)*$/,up=(t,e,n,i="")=>{const r=t.split(":");if("@"===t.slice(0,1)){if(r.length<2||r.length>3)return null;i=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const t=r.pop(),n=r.pop(),s={provider:r.length>0?r[0]:i,prefix:n,name:t};return e&&!pp(s)?null:s}const s=r[0],o=s.split("-");if(o.length>1){const t={provider:i,prefix:o.shift(),name:o.join("-")};return e&&!pp(t)?null:t}if(n&&""===i){const t={provider:i,prefix:"",name:s};return e&&!pp(t,n)?null:t}return null},pp=(t,e)=>!!t&&!(!(e&&""===t.prefix||t.prefix)||!t.name);function vp(t,e){const n=function(t,e){const n={};!t.hFlip!=!e.hFlip&&(n.hFlip=!0),!t.vFlip!=!e.vFlip&&(n.vFlip=!0);const i=((t.rotate||0)+(e.rotate||0))%4;return i&&(n.rotate=i),n}(t,e);for(const i in sp)i in ip?i in t&&!(i in n)&&(n[i]=ip[i]):i in e?n[i]=e[i]:i in t&&(n[i]=t[i]);return n}function _p(t,e,n){const i=t.icons,r=t.aliases||Object.create(null);let s={};function o(t){s=vp(i[t]||r[t],s)}return o(e),n.forEach(o),vp(t,s)}function fp(t,e){const n=[];if("object"!=typeof t||"object"!=typeof t.icons)return n;t.not_found instanceof Array&&t.not_found.forEach(t=>{e(t,null),n.push(t)});const i=function(t){const e=t.icons,n=t.aliases||Object.create(null),i=Object.create(null);return Object.keys(e).concat(Object.keys(n)).forEach(function t(r){if(e[r])return i[r]=[];if(!(r in i)){i[r]=null;const e=n[r]&&n[r].parent,s=e&&t(e);s&&(i[r]=[e].concat(s))}return i[r]}),i}(t);for(const r in i){const s=i[r];s&&(e(r,_p(t,r,s)),n.push(r))}return n}const gp={provider:"",aliases:{},not_found:{},...np};function mp(t,e){for(const n in e)if(n in t&&typeof t[n]!=typeof e[n])return!1;return!0}function bp(t){if("object"!=typeof t||null===t)return null;const e=t;if("string"!=typeof e.prefix||!t.icons||"object"!=typeof t.icons)return null;if(!mp(t,gp))return null;const n=e.icons;for(const t in n){const e=n[t];if(!t||"string"!=typeof e.body||!mp(e,sp))return null}const i=e.aliases||Object.create(null);for(const t in i){const e=i[t],r=e.parent;if(!t||"string"!=typeof r||!n[r]&&!i[r]||!mp(e,sp))return null}return e}const yp=Object.create(null);function wp(t,e){const n=yp[t]||(yp[t]=Object.create(null));return n[e]||(n[e]=function(t,e){return{provider:t,prefix:e,icons:Object.create(null),missing:new Set}}(t,e))}function xp(t,e){return bp(e)?fp(e,(e,n)=>{n?t.icons[e]=n:t.missing.add(e)}):[]}function Cp(t,e){let n=[];return("string"==typeof t?[t]:Object.keys(yp)).forEach(t=>{("string"==typeof t&&"string"==typeof e?[e]:Object.keys(yp[t]||{})).forEach(e=>{const i=wp(t,e);n=n.concat(Object.keys(i.icons).map(n=>(""!==t?"@"+t+":":"")+e+":"+n))})}),n}let kp=!1;function Ap(t){return"boolean"==typeof t&&(kp=t),kp}function Ep(t){const e="string"==typeof t?up(t,!0,kp):t;if(e){const t=wp(e.provider,e.prefix),n=e.name;return t.icons[n]||(t.missing.has(n)?null:void 0)}}function Sp(t,e){const n=up(t,!0,kp);if(!n)return!1;const i=wp(n.provider,n.prefix);return e?function(t,e,n){try{if("string"==typeof n.body)return t.icons[e]={...n},!0}catch(t){}return!1}(i,n.name,e):(i.missing.add(n.name),!0)}function zp(t,e){if("object"!=typeof t)return!1;if("string"!=typeof e&&(e=t.provider||""),kp&&!e&&!t.prefix){let e=!1;return bp(t)&&(t.prefix="",fp(t,(t,n)=>{Sp(t,n)&&(e=!0)})),e}const n=t.prefix;return!!pp({prefix:n,name:"a"})&&!!xp(wp(e,n),t)}function Op(t){return!!Ep(t)}function Tp(t){const e=Ep(t);return e?{...rp,...e}:e}function Lp(t,e){t.forEach(t=>{const n=t.loaderCallbacks;n&&(t.loaderCallbacks=n.filter(t=>t.id!==e))})}let Ip=0;const $p=Object.create(null);function Mp(t,e){$p[t]=e}function Np(t){return $p[t]||$p[""]}function Pp(t){let e;if("string"==typeof t.resources)e=[t.resources];else if(e=t.resources,!(e instanceof Array&&e.length))return null;return{resources:e,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||2e3,timeout:t.timeout||1e4,random:!0===t.random,index:t.index||0,dataAfterTimeout:!1!==t.dataAfterTimeout}}const jp=Object.create(null);function Bp(t,e){const n=Pp(e);return null!==n&&(jp[t]=n,!0)}function Dp(t){return jp[t]}function Rp(){return Object.keys(jp)}jp[""]=Pp({resources:["https://api.iconify.design","https://api2.iconify.design"]});const Fp={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function qp(t){const e={...Fp,...t};let n=[];function i(){n=n.filter(t=>"pending"===t().status)}return{query:function(t,r,s){const o=function(t,e,n,i){const r=t.resources.length,s=t.random?Math.floor(Math.random()*r):t.index;let o;if(t.random){let e=t.resources.slice(0);for(o=[];e.length>1;){const t=Math.floor(Math.random()*e.length);o.push(e[t]),e=e.slice(0,t).concat(e.slice(t+1))}o=o.concat(e)}else o=t.resources.slice(s).concat(t.resources.slice(0,s));const a=Date.now();let l,d="pending",c=0,h=null,u=[],p=[];function v(){h&&(clearTimeout(h),h=null)}function _(){"pending"===d&&(d="aborted"),v(),u.forEach(t=>{"pending"===t.status&&(t.status="aborted")}),u=[]}function f(t,e){e&&(p=[]),"function"==typeof t&&p.push(t)}function g(){d="failed",p.forEach(t=>{t(void 0,l)})}function m(){u.forEach(t=>{"pending"===t.status&&(t.status="aborted")}),u=[]}function b(e,n,i){const r="success"!==n;switch(u=u.filter(t=>t!==e),d){case"pending":break;case"failed":if(r||!t.dataAfterTimeout)return;break;default:return}if("abort"===n)return l=i,void g();if(r)return l=i,void(u.length||(o.length?y():g()));if(v(),m(),!t.random){const n=t.resources.indexOf(e.resource);-1!==n&&n!==t.index&&(t.index=n)}d="completed",p.forEach(t=>{t(i)})}function y(){if("pending"!==d)return;v();const i=o.shift();if(void 0===i)return u.length?void(h=setTimeout(()=>{v(),"pending"===d&&(m(),g())},t.timeout)):void g();const r={status:"pending",resource:i,callback:(t,e)=>{b(r,t,e)}};u.push(r),c++,h=setTimeout(y,t.rotate),n(i,e,r.callback)}return p.push(i),setTimeout(y),function(){return{startTime:a,payload:e,status:d,queriesSent:c,queriesPending:u.length,subscribe:f,abort:_}}}(e,t,r,(t,e)=>{i(),s&&s(t,e)});return n.push(o),o},find:function(t){return n.find(e=>t(e))||null},setIndex:t=>{e.index=t},getIndex:()=>e.index,cleanup:i}}function Hp(){}const Vp=Object.create(null);function Up(t,e,n){let i,r;if("string"==typeof t){const e=Np(t);if(!e)return n(void 0,424),Hp;r=e.send;const s=function(t){if(!Vp[t]){const e=Dp(t);if(!e)return;const n={config:e,redundancy:qp(e)};Vp[t]=n}return Vp[t]}(t);s&&(i=s.redundancy)}else{const e=Pp(t);if(e){i=qp(e);const n=Np(t.resources?t.resources[0]:"");n&&(r=n.send)}}return i&&r?i.query(e,r,n)().abort:(n(void 0,424),Hp)}function Wp(){}function Kp(t,e,n){function i(){const n=t.pendingIcons;e.forEach(e=>{n&&n.delete(e),t.icons[e]||t.missing.add(e)})}if(n&&"object"==typeof n)try{if(!xp(t,n).length)return void i()}catch(t){console.error(t)}i(),function(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout(()=>{t.iconsLoaderFlag=!1,function(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout(()=>{t.pendingCallbacksFlag=!1;const e=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!e.length)return;let n=!1;const i=t.provider,r=t.prefix;e.forEach(e=>{const s=e.icons,o=s.pending.length;s.pending=s.pending.filter(e=>{if(e.prefix!==r)return!0;const o=e.name;if(t.icons[o])s.loaded.push({provider:i,prefix:r,name:o});else{if(!t.missing.has(o))return n=!0,!0;s.missing.push({provider:i,prefix:r,name:o})}return!1}),s.pending.length!==o&&(n||Lp([t],e.id),e.callback(s.loaded.slice(0),s.missing.slice(0),s.pending.slice(0),e.abort))})}))}(t)}))}(t)}function Gp(t,e){t instanceof Promise?t.then(t=>{e(t)}).catch(()=>{e(null)}):e(t)}const Jp=(t,e)=>{const n=function(t,e=!0,n=!1){const i=[];return t.forEach(t=>{const r="string"==typeof t?up(t,e,n):t;r&&i.push(r)}),i}(t,!0,Ap()),i=function(t){const e={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort((t,e)=>t.provider!==e.provider?t.provider.localeCompare(e.provider):t.prefix!==e.prefix?t.prefix.localeCompare(e.prefix):t.name.localeCompare(e.name));let i={provider:"",prefix:"",name:""};return t.forEach(t=>{if(i.name===t.name&&i.prefix===t.prefix&&i.provider===t.provider)return;i=t;const r=t.provider,s=t.prefix,o=t.name,a=n[r]||(n[r]=Object.create(null)),l=a[s]||(a[s]=wp(r,s));let d;d=o in l.icons?e.loaded:""===s||l.missing.has(o)?e.missing:e.pending;const c={provider:r,prefix:s,name:o};d.push(c)}),e}(n);if(!i.pending.length){let t=!0;return e&&setTimeout(()=>{t&&e(i.loaded,i.missing,i.pending,Wp)}),()=>{t=!1}}const r=Object.create(null),s=[];let o,a;return i.pending.forEach(t=>{const{provider:e,prefix:n}=t;if(n===a&&e===o)return;o=e,a=n,s.push(wp(e,n));const i=r[e]||(r[e]=Object.create(null));i[n]||(i[n]=[])}),i.pending.forEach(t=>{const{provider:e,prefix:n,name:i}=t,s=wp(e,n),o=s.pendingIcons||(s.pendingIcons=new Set);o.has(i)||(o.add(i),r[e][n].push(i))}),s.forEach(t=>{const e=r[t.provider][t.prefix];e.length&&function(t,e){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(e).sort():t.iconsToLoad=e,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout(()=>{t.iconsQueueFlag=!1;const{provider:e,prefix:n}=t,i=t.iconsToLoad;if(delete t.iconsToLoad,!i||!i.length)return;const r=t.loadIcon;if(t.loadIcons&&(i.length>1||!r))return void Gp(t.loadIcons(i,n,e),e=>{Kp(t,i,e)});if(r)return void i.forEach(i=>{Gp(r(i,n,e),e=>{Kp(t,[i],e?{prefix:n,icons:{[i]:e}}:null)})});const{valid:s,invalid:o}=function(t){const e=[],n=[];return t.forEach(t=>{(t.match(hp)?e:n).push(t)}),{valid:e,invalid:n}}(i);if(o.length&&Kp(t,o,null),!s.length)return;const a=n.match(hp)?Np(e):null;a?a.prepare(e,n,s).forEach(n=>{Up(e,n,e=>{Kp(t,n.icons,e)})}):Kp(t,s,null)}))}(t,e)}),e?function(t,e,n){const i=Ip++,r=Lp.bind(null,n,i);if(!e.pending.length)return r;const s={id:i,icons:e,callback:t,abort:r};return n.forEach(t=>{(t.loaderCallbacks||(t.loaderCallbacks=[])).push(s)}),r}(e,i,s):Wp},Zp=t=>new Promise((e,n)=>{const i="string"==typeof t?up(t,!0):t;i?Jp([i||t],r=>{if(r.length&&i){const t=Ep(i);if(t)return void e({...rp,...t})}n(t)}):n(t)});function Xp(t){try{const e="string"==typeof t?JSON.parse(t):t;if("string"==typeof e.body)return{...e}}catch(t){}}let Yp=!1;try{Yp=0===navigator.vendor.indexOf("Apple")}catch(t){}const Qp=/(-?[0-9.]*[0-9]+[0-9.]*)/g,tv=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ev(t,e,n){if(1===e)return t;if(n=n||100,"number"==typeof t)return Math.ceil(t*e*n)/n;if("string"!=typeof t)return t;const i=t.split(Qp);if(null===i||!i.length)return t;const r=[];let s=i.shift(),o=tv.test(s);for(;;){if(o){const t=parseFloat(s);isNaN(t)?r.push(s):r.push(Math.ceil(t*e*n)/n)}else r.push(s);if(s=i.shift(),void 0===s)return r.join("");o=!o}}function nv(t,e){const n={...rp,...t},i={...ap,...e},r={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,i].forEach(t=>{const e=[],n=t.hFlip,i=t.vFlip;let o,a=t.rotate;switch(n?i?a+=2:(e.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),e.push("scale(-1 1)"),r.top=r.left=0):i&&(e.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),e.push("scale(1 -1)"),r.top=r.left=0),a<0&&(a-=4*Math.floor(a/4)),a%=4,a){case 1:o=r.height/2+r.top,e.unshift("rotate(90 "+o.toString()+" "+o.toString()+")");break;case 2:e.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:o=r.width/2+r.left,e.unshift("rotate(-90 "+o.toString()+" "+o.toString()+")")}a%2==1&&(r.left!==r.top&&(o=r.left,r.left=r.top,r.top=o),r.width!==r.height&&(o=r.width,r.width=r.height,r.height=o)),e.length&&(s=function(t,e){const n=function(t,e="defs"){let n="";const i=t.indexOf("<"+e);for(;i>=0;){const r=t.indexOf(">",i),s=t.indexOf("</"+e);if(-1===r||-1===s)break;const o=t.indexOf(">",s);if(-1===o)break;n+=t.slice(r+1,s).trim(),t=t.slice(0,i).trim()+t.slice(o+1)}return{defs:n,content:t}}(t);return i=n.defs,r=e+n.content+"</g>",i?"<defs>"+i+"</defs>"+r:r;var i,r}(s,'<g transform="'+e.join(" ")+'">'))});const o=i.width,a=i.height,l=r.width,d=r.height;let c,h;null===o?(h=null===a?"1em":"auto"===a?d:a,c=ev(h,l/d)):(c="auto"===o?l:o,h=null===a?ev(c,d/l):"auto"===a?d:a);const u={},p=(t,e)=>{(t=>"unset"===t||"undefined"===t||"none"===t)(e)||(u[t]=e.toString())};p("width",c),p("height",h);const v=[r.left,r.top,l,d];return u.viewBox=v.join(" "),{attributes:u,viewBox:v,body:s}}function iv(t,e){let n=-1===t.indexOf("xlink:")?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const t in e)n+=" "+t+'="'+e[t]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function rv(t){return'url("'+function(t){return"data:image/svg+xml,"+function(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ").replace(/:/g,"%3A").replace(/\//g,"%2F")}(t)}(t)+'")'}let sv=(()=>{let t;try{if(t=fetch,"function"==typeof t)return t}catch(t){}})();function ov(t){sv=t}function av(){return sv}const lv={prepare:(t,e,n)=>{const i=[],r=function(t,e){const n=Dp(t);if(!n)return 0;let i;if(n.maxURL){let t=0;n.resources.forEach(e=>{t=Math.max(t,e.length)});const r=e+".json?icons=";i=n.maxURL-t-n.path.length-r.length}else i=0;return i}(t,e),s="icons";let o={type:s,provider:t,prefix:e,icons:[]},a=0;return n.forEach((n,l)=>{a+=n.length+1,a>=r&&l>0&&(i.push(o),o={type:s,provider:t,prefix:e,icons:[]},a=n.length),o.icons.push(n)}),i.push(o),i},send:(t,e,n)=>{if(!sv)return void n("abort",424);let i=function(t){if("string"==typeof t){const e=Dp(t);if(e)return e.path}return"/"}(e.provider);switch(e.type){case"icons":{const t=e.prefix,n=e.icons.join(",");i+=t+".json?"+new URLSearchParams({icons:n}).toString();break}case"custom":{const t=e.uri;i+="/"===t.slice(0,1)?t.slice(1):t;break}default:return void n("abort",400)}let r=503;sv(t+i).then(t=>{const e=t.status;if(200===e)return r=501,t.json();setTimeout(()=>{n(function(t){return 404===t}(e)?"abort":"next",e)})}).then(t=>{"object"==typeof t&&null!==t?setTimeout(()=>{n("success",t)}):setTimeout(()=>{404===t?n("abort",t):n("next",r)})}).catch(()=>{n("next",r)})}};function dv(t,e,n){wp(n||"",e).loadIcons=t}function cv(t,e,n){wp(n||"",e).loadIcon=t}const hv="data-style";let uv="";const pv={};function vv(t){return":host{display:inline-block;vertical-align:"+(t?"-0.125em":"0")+"}span,svg{display:block;margin:auto}"+uv}function _v(t){uv=t,pv.inline?.replaceSync(vv(!0)),pv.block?.replaceSync(vv(!1))}function fv(t,e){if(function(t){return"adoptedStyleSheets"in t&&"function"==typeof CSSStyleSheet&&"function"==typeof CSSStyleSheet.prototype.replaceSync}(t)){const n=function(t){const e=t?"inline":"block";let n=pv[e];return n||(n=pv[e]=new CSSStyleSheet,n.replaceSync(vv(t))),n}(e),i=t.adoptedStyleSheets;if(i.includes(n))return;return void(t.adoptedStyleSheets=i.filter(t=>t!==pv.inline&&t!==pv.block).concat(n))}let n=Array.from(t.childNodes).find(t=>t.hasAttribute&&t.hasAttribute(hv));n||(n=document.createElement("style"),n.setAttribute(hv,hv),t.appendChild(n)),n.textContent=vv(e)}function gv(){let t;Mp("",lv),Ap(!0);try{t=window}catch(t){}if(t){if(void 0!==t.IconifyPreload){const e=t.IconifyPreload,n="Invalid IconifyPreload syntax.";"object"==typeof e&&null!==e&&(e instanceof Array?e:[e]).forEach(t=>{try{("object"!=typeof t||null===t||t instanceof Array||"object"!=typeof t.icons||"string"!=typeof t.prefix||!zp(t))&&console.error(n)}catch(t){console.error(n)}})}if(void 0!==t.IconifyProviders){const e=t.IconifyProviders;if("object"==typeof e&&null!==e)for(const t in e){const n="IconifyProviders["+t+"] is invalid.";try{const i=e[t];if("object"!=typeof i||!i||void 0===i.resources)continue;Bp(t,i)||console.error(n)}catch(t){console.error(n)}}}}return{iconLoaded:Op,getIcon:Tp,listIcons:Cp,addIcon:Sp,addCollection:zp,calculateSize:ev,buildIcon:nv,iconToHTML:iv,svgToURL:rv,loadIcons:Jp,loadIcon:Zp,addAPIProvider:Bp,setCustomIconLoader:cv,setCustomIconsLoader:dv,appendCustomStyle:_v,_api:{getAPIConfig:Dp,setAPIModule:Mp,sendAPIQuery:Up,setFetch:ov,getFetch:av,listAPIProviders:Rp}}}const mv={"background-color":"currentColor"},bv={"background-color":"transparent"},yv={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},wv={"-webkit-mask":mv,mask:mv,background:bv};for(const t in wv){const e=wv[t];for(const n in yv)e[t+"-"+n]=yv[n]}function xv(t){return t?t+(t.match(/^[-0-9.]+$/)?"px":""):"inherit"}let Cv;function kv(t){return Array.from(t.childNodes).find(t=>{const e=t.tagName&&t.tagName.toUpperCase();return"SPAN"===e||"SVG"===e})}function Av(t,e){const n=e.icon.data,i=e.customisations,r=nv(n,i);i.preserveAspectRatio&&(r.attributes.preserveAspectRatio=i.preserveAspectRatio);const s=e.renderedMode;let o;o="svg"===s?function(t){const e=document.createElement("span"),n=t.attributes;let i="";n.width||(i="width: inherit;"),n.height||(i+="height: inherit;"),i&&(n.style=i);const r=iv(t.body,n);return e.innerHTML=function(t){return void 0===Cv&&function(){try{Cv=window.trustedTypes.createPolicy("iconify",{createHTML:t=>t})}catch(t){Cv=null}}(),Cv?Cv.createHTML(t):t}(r),e.firstChild}(r):function(t,e,n){const i=document.createElement("span");let r=t.body;-1!==r.indexOf("<a")&&(r+="\x3c!-- "+Date.now()+" --\x3e");const s=t.attributes,o=rv(iv(r,{...s,width:e.width+"",height:e.height+""})),a=i.style,l={"--svg":o,width:xv(s.width),height:xv(s.height),...n?mv:bv};for(const t in l)a.setProperty(t,l[t]);return i}(r,{...rp,...n},"mask"===s);const a=kv(t);a?"SPAN"===o.tagName&&a.tagName===o.tagName?a.setAttribute("style",o.getAttribute("style")):t.replaceChild(o,a):t.appendChild(o)}function Ev(t,e,n){return{rendered:!1,inline:e,icon:t,lastRender:n&&(n.rendered?n:n.lastRender)}}const Sv=function(t="iconify-icon"){let e,n;try{e=window.customElements,n=window.HTMLElement}catch(t){return}if(!e||!n)return;const i=e.get(t);if(i)return i;const r=["icon","mode","inline","noobserver","width","height","rotate","flip"],s=class extends n{_shadowRoot;_initialised=!1;_state;_checkQueued=!1;_connected=!1;_observer=null;_visible=!0;constructor(){super();const t=this._shadowRoot=this.attachShadow({mode:"open"}),e=this.hasAttribute("inline");fv(t,e),this._state=Ev({value:""},e),this._queueCheck()}connectedCallback(){this._connected=!0,this.startObserver()}disconnectedCallback(){this._connected=!1,this.stopObserver()}static get observedAttributes(){return r.slice(0)}attributeChangedCallback(t){switch(t){case"inline":{const t=this.hasAttribute("inline"),e=this._state;t!==e.inline&&(e.inline=t,fv(this._shadowRoot,t));break}case"noobserver":this.hasAttribute("noobserver")?this.startObserver():this.stopObserver();break;default:this._queueCheck()}}get icon(){const t=this.getAttribute("icon");if(t&&"{"===t.slice(0,1))try{return JSON.parse(t)}catch(t){}return t}set icon(t){"object"==typeof t&&(t=JSON.stringify(t)),this.setAttribute("icon",t)}get inline(){return this.hasAttribute("inline")}set inline(t){t?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(t){t?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const t=this._state;if(t.rendered){const e=this._shadowRoot;if("svg"===t.renderedMode)try{return void e.lastChild.setCurrentTime(0)}catch(t){}Av(e,t)}}get status(){const t=this._state;return t.rendered?"rendered":null===t.icon.data?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const t=this._state,e=this.getAttribute("icon");if(e!==t.icon.value)return void this._iconChanged(e);if(!t.rendered||!this._visible)return;const n=this.getAttribute("mode"),i=cp(this);t.attrMode===n&&!function(t,e){for(const n in dp)if(t[n]!==e[n])return!0;return!1}(t.customisations,i)&&kv(this._shadowRoot)||this._renderIcon(t.icon,i,n)}_iconChanged(t){const e=function(t,e){if("object"==typeof t)return{data:Xp(t),value:t};if("string"!=typeof t)return{value:t};if(t.includes("{")){const e=Xp(t);if(e)return{data:e,value:t}}const n=up(t,!0,!0);if(!n)return{value:t};const i=Ep(n);if(void 0!==i||!n.prefix)return{value:t,name:n,data:i};const r=Jp([n],()=>e(t,n,Ep(n)));return{value:t,name:n,loading:r}}(t,(t,e,n)=>{const i=this._state;if(i.rendered||this.getAttribute("icon")!==t)return;const r={value:t,name:e,data:n};r.data?this._gotIconData(r):i.icon=r});e.data?this._gotIconData(e):this._state=Ev(e,this._state.inline,this._state)}_forceRender(){if(!this._visible){const t=kv(this._shadowRoot);return void(t&&this._shadowRoot.removeChild(t))}this._queueCheck()}_gotIconData(t){this._checkQueued=!1,this._renderIcon(t,cp(this),this.getAttribute("mode"))}_renderIcon(t,e,n){const i=function(t,e){switch(e){case"svg":case"bg":case"mask":return e}return"style"===e||!Yp&&-1!==t.indexOf("<a")?-1===t.indexOf("currentColor")?"bg":"mask":"svg"}(t.data.body,n),r=this._state.inline;Av(this._shadowRoot,this._state={rendered:!0,icon:t,inline:r,customisations:e,attrMode:n,renderedMode:i})}startObserver(){if(!this._observer&&!this.hasAttribute("noobserver"))try{this._observer=new IntersectionObserver(t=>{const e=t.some(t=>t.isIntersecting);e!==this._visible&&(this._visible=e,this._forceRender())}),this._observer.observe(this)}catch(t){if(this._observer){try{this._observer.disconnect()}catch(t){}this._observer=null}}}stopObserver(){this._observer&&(this._observer.disconnect(),this._observer=null,this._visible=!0,this._connected&&this._forceRender())}};r.forEach(t=>{t in s.prototype||Object.defineProperty(s.prototype,t,{get:function(){return this.getAttribute(t)},set:function(e){null!==e?this.setAttribute(t,e):this.removeAttribute(t)}})});const o=gv();for(const t in o)s[t]=s.prototype[t]=o[t];return e.define(t,s),s}()||gv(),{iconLoaded:zv,getIcon:Ov,listIcons:Tv,addIcon:Lv,addCollection:Iv,calculateSize:$v,buildIcon:Mv,iconToHTML:Nv,svgToURL:Pv,loadIcons:jv,loadIcon:Bv,setCustomIconLoader:Dv,setCustomIconsLoader:Rv,addAPIProvider:Fv,_api:qv}=Sv;class Hv{}function Vv(t,e){e=e===C?Uv:e;var n=document.createElement("iconify-icon");return n.icon=t,e(n),n}function Uv(t){return k}var Wv,Kv,Gv,Jv,Zv,Xv,Yv,Qv,t_,e_,n_,i_,r_,s_,o_,a_,l_,d_,c_,h_,u_,p_,v_,__,f_,g_,m_,b_,y_,w_,x_,C_,k_,A_,E_,S_,z_,O_,T_,L_,I_,$_,M_,N_,P_,j_,B_,D_,R_;Vn(Hv,"IconifyIconTagName"),new Hv;class F_{constructor(){Wv=this,this.xu_1=[],this.yu_1=new ms(Ki(),Ki())}}class q_ extends bs{constructor(t,e,n,i,r){xf(),t=t===C?"ktjs-demo-layout":t,e=e===C?null:e,n=n===C?xf().xu_1:n,i=i===C||i,r=r===C?xf().yu_1:r,super(rf,t,e,n,i,r)}}class H_{constructor(){Kv=this,this.zu_1=[],this.av_1=new ms(Ki(),Ki())}}class V_ extends bs{constructor(t,e,n,i,r){Cf(),t=t===C?"ktjs-demo-page":t,e=e===C?null:e,n=n===C?Cf().zu_1:n,i=i===C||i,r=r===C?Cf().av_1:r,super(uf,t,e,n,i,r)}}class U_{constructor(){Gv=this,this.bv_1=[],this.cv_1=new ms(Ki(),Ki())}}class W_ extends bs{constructor(t,e,n,i,r){kf(),t=t===C?"ktjs-grid":t,e=e===C?null:e,n=n===C?kf().bv_1:n,i=i===C||i,r=r===C?kf().cv_1:r,super(vf,t,e,n,i,r)}}class K_{constructor(){Jv=this,this.dv_1=[],this.ev_1=new ms(Ki(),Ki())}}class G_ extends bs{constructor(t,e,n,i,r){Af(),t=t===C?"ktjs-readout":t,e=e===C?null:e,n=n===C?Af().dv_1:n,i=i===C||i,r=r===C?Af().ev_1:r,super(ff,t,e,n,i,r)}}class J_{constructor(){Zv=this,this.fv_1=[],this.gv_1=new ms(Ki(),Ki())}}class Z_ extends bs{constructor(t,e,n,i,r){Ef(),t=t===C?"ktjs-section-block":t,e=e===C?null:e,n=n===C?Ef().fv_1:n,i=i===C||i,r=r===C?Ef().gv_1:r,super(mf,t,e,n,i,r)}}class X_{constructor(t){this.hv_1=t,this.iv_1=ct.i1();var e=Oe(this.hv_1.lv_1);this.jv_1=this.hv_1.nv(e)}ov(t,e){var n,i=this.iv_1,r=new ke(t,e,(n=t,t=>(function(t,e){for(var n=t.firstChild;null!=n;){var i=n.nextSibling;Ln(n.nodeType,Node.TEXT_NODE)&&t.removeChild(n),n=i}t.insertBefore(document.createTextNode(e),t.firstChild)}(n,t),k)));return i.z(r),t}pv(t){this.jv_1=this.hv_1.nv(t);for(var e=this.iv_1.s();e.t();){var n=e.u(),i=n.aa(),r=n.ba(),s=n.pb(),o=r(this.jv_1);s(o);var a=0===xn(o);i.toggleAttribute("hidden",a)}}}class Y_{constructor(){Xv=this,this.qv_1="en",this.rv_1="zh-Hans"}}class Q_{constructor(t,e,n){if(t=t===C?Fi([Sf().qv_1,Sf().rv_1]):t,e=e===C?"ktjs-demo-lang":e,n=n===C?Oe(t):n,this.sv_1=t,this.tv_1=e,this.sv_1.a1())throw Mt.r(Tn("a site needs at least one language"));var i,r=this.sv_1;t:if(ti(r,V)&&r.a1())i=!1;else{for(var s=r.s();s.t();)if(Ln(s.u(),n)){i=!0;break t}i=!1}if(!i){var o="the initial language "+n+" is not registered";throw Mt.r(Tn(o))}var a=function(t){var e;try{e=localStorage.getItem(t.tv_1)}catch(t){if(!(t instanceof Error))throw t;e=cr(t)}var n,i=e,r=dr(i)?null:i;if(null==r)n=null;else{var s;t:{for(var o=t.sv_1.s();o.t();){var a=o.u();if(zf(a)===r){s=a;break t}}s=null}n=s}return n}(this);this.uv_1=a??n,this.vv_1=ct.i1()}wv(){Of(this);for(var t=this.vv_1.s();t.t();)t.u()(this.uv_1)}xv(t){if(Ln(t,this.uv_1))return k;this.uv_1=t,function(t,e){try{localStorage.setItem(t.tv_1,e)}catch(t){if(!(t instanceof Error))throw t;cr(t)}}(this,t),Of(this);for(var e=this.vv_1.s();e.t();)e.u()(t)}yv(t){this.vv_1.z(t)}}class tf{constructor(t,e,n,i,r,s,o,a,l,d,c,h,u){this.zv_1=t,this.aw_1=e,this.bw_1=n,this.cw_1=i,this.dw_1=r,this.ew_1=s,this.fw_1=o,this.gw_1=a,this.hw_1=l,this.iw_1=d,this.jw_1=c,this.kw_1=h,this.lw_1=u}}class ef{constructor(t){this.kv_1=t,this.lv_1=$e(this.kv_1.t1()),this.mv_1=function(t){if(ti(t,W))return Oe(t);var e=t.s();if(!e.t())throw Nt.n("Collection is empty.");return e.u()}(this.kv_1.u1())}nv(t){return this.kv_1.s1(t)??this.mv_1}}class nf extends q_{constructor(){Yv=null,super(),Yv=this}}class rf extends gs{constructor(){var t;Jf(),super(),this.ow_1=function(t){t=t===C?ku:t;var e=document.createElement("vaadin-app-layout");return t(e),e}(),this.pw_1=function(t){t=t===C?Au:t;var e=document.createElement("vaadin-drawer-toggle");return t(e),e}(Zf),this.qw_1=Os("h1",Xf),this.rw_1=Os("a",(t=this,e=>(e.classList.add(ug()),e.setAttribute("href","#/"),e.append(t.qw_1),k))),this.sw_1=Os("span",Yf),this.tw_1=Mu(Qf),this.uw_1=Mu(tg),this.vw_1=function(t){t=t===C?Eu:t;var e=document.createElement("vaadin-breadcrumbs");return t(e),e}(),this.ww_1=Su(),this.xw_1=Su(),this.yw_1=Mu(eg),this.zw_1=Du(ng),this.ax_1=Du(ig),this.bx_1=Du(rg),this.cx_1=function(t){t=t===C?qu:t;var e=document.createElement("vaadin-side-nav");return t(e),e}(),this.dx_1=Zu(sg),this.kx_1=Ot.l8(),this.lx_1=Ot.l8(),this.mx_1=Ot.l8(),this.nx_1=Ot.l8(),this.ox_1=null,this.px_1=Ot.l8(),this.ow_1.primarySection="navbar",this.cx_1.setAttribute("slot","drawer"),this.vw_1.append(this.ww_1,this.xw_1),this.tw_1.append(this.pw_1,this.rw_1,this.sw_1,this.vw_1),this.uw_1.append(this.tw_1,this.yw_1),this.zw_1.dataset.menu="docs",this.ax_1.dataset.menu="lang",this.bx_1.dataset.menu="theme",Hf(this,this.zw_1),Hf(this,this.ax_1),Hf(this,this.bx_1),this.ow_1.append(this.uw_1,this.cx_1,this.dx_1),Ps(this,[Zg(),(Cg(),d_)]).append(this.ow_1)}py(t){this.ex_1=t.ux_1,this.fx_1=t.vx_1,this.gx_1=t.wx_1,this.hx_1=t,this.ix_1=t.xx_1,function(t){var e=Mf(t).cy_1;if(null==e)return k;var n,i=Os("img",(n=e,t=>(t.classList.add(pg()),t.setAttribute("src",n),t.setAttribute("alt",""),t.setAttribute("aria-hidden","true"),k)));t.rw_1.insertBefore(i,t.qw_1)}(this),document.body.style.margin="0",this.sw_1.textContent=t.yx_1;var e,n,i=0===xn(t.yx_1);this.sw_1.toggleAttribute("hidden",i),function(t){for(var e=Pf(t,If(t).uv_1),n=Lf(t).ey_1.s();n.t();){var i=n.u(),r=Lf(t).fy(i);if(1!==r.c1()){var s=Hu(og),o=Os("span"),a=e.kw_1.s1(i.gy_1);o.textContent=a??i.gy_1;var l=i.hy_1;null==l||s.append(Df(0,l)),s.append(o);for(var d=r.s();d.t();){var c=d.u();s.append(Bf(t,c,!0))}var h=t.mx_1,u=i.gy_1;h.d4(u,o),t.cx_1.append(s)}else t.cx_1.append(Bf(t,Le(r),!1,i.hy_1))}}(this),(e=this).yw_1.append(e.zw_1,e.ax_1,e.bx_1),If(this).yv((n=this,t=>(Gf(n),k)));var r=Te(Lf(this).dy_1),s=(null==r?null:r.qx_1)??"overview";this.jx_1=new df(s,function(t){return e=>(function(t,e){var n=Lf(t).ly(e)??Te(Lf(t).dy_1);if(null==n)return k;var i,r=n,s=t.nx_1,o=r.qx_1,a=s.s1(o);if(null==a){var l=r.tx_1();l.my(If(t).uv_1);var d=l;s.d4(o,d),i=d}else i=a;var c=i;if(t.ox_1!==r.qx_1){t.ox_1=r.qx_1;for(var h=t.kx_1.v1().s();h.t();){var u=h.u(),p=u.o1(),v=u.p1();p===r.qx_1?v.setAttribute("current",""):v.removeAttribute("current")}document.title=jf(t,r,If(t).uv_1)+" · "+Pf(t,If(t).uv_1).zv_1}Kf(t,r),window.innerWidth<800&&(t.ow_1.drawerOpened=!1),t.dx_1.firstElementChild!==c.ny()&&t.dx_1.replaceChildren(c.ny())}(t,e),k)}(this)),this.ow_1.drawerOpened=!0,Gf(this),Nf(this).sy()}oy(t){Nf(this).oy(t)}}class sf{constructor(t,e,n,i,r,s,o,a,l){r=r===C?"":r,s=s===C?null:s,o=o===C?null:o,a=a===C?null:a,l=l===C?null:l,this.ux_1=t,this.vx_1=e,this.wx_1=n,this.xx_1=i,this.yx_1=r,this.zx_1=s,this.ay_1=o,this.by_1=a,this.cy_1=l}}class of{constructor(t){this.dy_1=t;for(var e=this.dy_1,n=ct.y(Vi(e,10)),i=e.s();i.t();){var r=i.u().rx_1;n.z(r)}this.ey_1=Ie(n)}ly(t){var e;t:{for(var n=this.dy_1.s();n.t();){var i=n.u();if(i.qx_1===t){e=i;break t}}e=null}return e}fy(t){for(var e=this.dy_1,n=ct.i1(),i=e.s();i.t();){var r=i.u();Ln(r.rx_1,t)&&n.z(r)}return n}}class af{constructor(t,e,n,i){n=n===C?null:n,this.qx_1=t,this.rx_1=e,this.sx_1=n,this.tx_1=i}}class lf{constructor(t,e){e=e===C?null:e,this.gy_1=t,this.hy_1=e}}class df{constructor(t,e){t=t===C?"overview":t,this.qy_1=t,this.ry_1=e}bz(t){var e=sr(sr(t,"#"),"/"),n=Tn(function(t){var e=0,n=xn(t)-1|0,i=!1;t:for(;e<=n;){var r=Mi(bn(t,i?n:e));if(i){if(!r)break t;n=n-1|0}else r?e=e+1|0:i=!0}return Cn(t,e,n+1|0)}(ni(e)?e:Dn()));return 0===xn(n)?this.qy_1:n}az(){return this.bz(location.hash)}cz(t){return"#/"+t}oy(t){var e=this.cz(t);location.hash===e?this.ry_1(t):location.hash=e}sy(){var t;ep(window,"hashchange",(t=this,()=>(t.ry_1(t.az()),k))),this.ry_1(this.az())}}class cf{dz(t){var e;return Os("p",(e=t,t=>(t.textContent=e,k)))}ez(t,e){return t=t===C?"":t,e===C?this.dz(t):e.dz.call(this,t)}fz(t){var e;return Os("ul",(e=t,t=>{for(var n=e.s();n.t();)$s(t,Os("li",kg(n.u())));return k}))}gz(t){var e=Mu(Ag);return e.classList.add(Dg()),0!==t.length&&function(){var n=e;return n.append.apply(n,[].slice.call(t.slice()))}.call(this),e}hz(t,e){var n=Lu();return Ku(n,$u().ft_1,[]),Is(n).backgroundColor=Jg().ty_1,null!=t&&n.append(this.iz(t)),0!==e.length&&function(){var t=n;return t.append.apply(t,[].slice.call(e.slice()))}.call(this),n}iz(t){var e;return Os("p",(e=t,t=>(t.classList.add(Bg()),t.textContent=e,k)))}}class hf extends V_{constructor(){u_=null,super(),u_=this,this.mz_1=(t,e)=>new URL(t,e).href}}class uf extends gs{constructor(){Eg(),super(),this.pz_1=Os("h1",Sg),this.qz_1=Os("p",zg),this.rz_1=Os("div",Og);var t=Zu(Tg);t.style.setProperty("width","100%"),this.sz_1=t,this.tz_1=Ps(this,[Zg(),Hg()]),this.uz_1=ct.i1(),this.tz_1.append(this.pz_1,this.qz_1,this.rz_1,this.sz_1)}ny(){return this}my(t){}vz(t){this.pz_1.textContent=t}wz(t){this.qz_1.textContent=t}xz(t){this.uz_1.z(t);var e=Kn([[Zg(),Hg()],ii(this.uz_1)]);this.tz_1.adoptedStyleSheets=e}}class pf extends W_{constructor(){p_=null,super(),p_=this}}class vf extends gs{constructor(){Lg(),super()}a10(t){this.classList.add(Rg()),this.style.setProperty("grid-template-columns","repeat(auto-fill, minmax("+t+"px, 1fr))"),this.style.setProperty("gap","12px"),this.style.setProperty("width","100%")}b10(t){0!==t.length&&function(){return this.append.apply(this,[].slice.call(t.slice()))}.call(this)}}class _f extends G_{constructor(){L_=null,super(),L_=this}}class ff extends gs{constructor(){Wg(),super()}e10(){return this}f10(t){this.classList.add(Fg()),this.textContent=t}g10(t,e){var n;return t=t===C?"":t,e===C?(this.f10(t),n=k):n=e.f10.call(this,t),n}h10(t){this.textContent=t}}class gf extends Z_{constructor(){I_=null,super("ktjs-demo-section"),I_=this}}class mf extends gs{constructor(){Kg(),super();var t=Os("h2");t.classList.add(Pg()),this.k10_1=t;var e=Os("p");e.classList.add(jg()),this.l10_1=e,this.m10_1=Zu(Gg)}e10(){return this}n10(t,e){this.classList.add(Ng()),this.style.setProperty("width","100%"),this.m10_1.style.setProperty("width","100%"),this.append(this.k10_1,this.l10_1,this.m10_1),this.o10(t,e)}p10(t,e,n){var i;return t=t===C?"":t,e=e===C?"":e,n===C?(this.n10(t,e),i=k):i=n.n10.call(this,t,e),i}o10(t,e){this.k10_1.textContent=t,this.l10_1.textContent=e;var n=0===xn(e);this.l10_1.toggleAttribute("hidden",n)}}class bf{constructor(){$_=this,this.ty_1="var("+Tn("--lumo-base-color")+","+Tn("rgb(255 255 255)")+")",this.uy_1="var("+Tn("--lumo-contrast-5pct")+","+Tn("rgb(246 247 251)")+")",this.vy_1="var("+Tn("--lumo-contrast-10pct")+","+Tn("rgb(236 239 244)")+")",this.wy_1="var("+Tn("--lumo-contrast-20pct")+","+Tn("rgb(223 228 234)")+")",this.xy_1="var("+Tn("--lumo-body-text-color")+","+Tn("rgb(35 39 45)")+")",this.yy_1="var("+Tn("--lumo-secondary-text-color")+","+Tn("rgb(87 98 110)")+")",this.zy_1="var("+Tn("--lumo-primary-text-color")+","+Tn("rgb(0 92 207)")+")"}}class yf{constructor(t){t=t===C?"ktjs-demo-theme":t,this.iy_1=t;var e=function(t){var e;try{e=localStorage.getItem(t.iy_1)}catch(t){if(!(t instanceof Error))throw t;e=cr(t)}var n,i,r=e,s=dr(r)?null:r;if(null==s)n=null;else{var o;t:{for(var a=(i=void 0,Qg(),null==R_&&(Qg(),i=[tm(),em(),nm()],R_=he.ja(i)),R_).s();a.t();){var l=a.u();if(l.w1_1.toLowerCase()===s){o=l;break t}}o=null}n=o}return n}(this);this.jy_1=e??nm()}q10(){this.ky(this.jy_1)}ky(t){this.jy_1=t;var e=document.documentElement;switch(t.x1_1){case 0:e.removeAttribute("theme");break;case 1:e.setAttribute("theme","dark");break;case 2:e.setAttribute("theme","light-dark");break;default:Bn()}try{var n=localStorage,i=t.w1_1.toLowerCase();n.setItem(this.iy_1,i)}catch(t){if(!(t instanceof Error))throw t;cr(t)}}}class wf extends Z{}function xf(){return Wv===C&&new F_,Wv}function Cf(){return Kv===C&&new H_,Kv}function kf(){return Gv===C&&new U_,Gv}function Af(){return Jv===C&&new K_,Jv}function Ef(){return Zv===C&&new J_,Zv}function Sf(){return Xv===C&&new Y_,Xv}function zf(t){return t}function Of(t){document.documentElement.setAttribute("lang",t.uv_1)}function Tf(t){if(0===t.length)throw Mt.r(Tn("texts(...) needs at least one language"));return new ef(Wi(e=t.slice(),Ot.m8(e.length)));var e}function Lf(t){var e=t.ex_1;if(null!=e)return e;Ae("menu")}function If(t){var e=t.fx_1;if(null!=e)return e;Ae("language")}function $f(t){var e=t.gx_1;if(null!=e)return e;Ae("theme")}function Mf(t){var e=t.hx_1;if(null!=e)return e;Ae("config")}function Nf(t){var e=t.jx_1;if(null!=e)return e;Ae("router")}function Pf(t,e){return function(t){var e=t.ix_1;if(null!=e)return e;Ae("texts")}(t).nv(e)}function jf(t,e,n){return Pf(t,n).lw_1.s1(e.qx_1)??e.qx_1}function Bf(t,e,n,i){i=i===C?null:i;var r,s,o,a=Hu(),l=Os("span",(r=t,s=e,t=>(t.textContent=jf(r,s,If(r).uv_1),k)));if(null==i){var d=e.sx_1;o=n?null:d}else o=i;var c=o;null==c||a.append(Df(0,c)),a.append(l),a.dataset.route=e.qx_1,n&&a.setAttribute("slot","children"),a.setAttribute("role","link"),a.tabIndex=0,tp(new Qu(a,"click"),function(t,e){return n=>(t.oy(e.qx_1),k)}(t,e));var h=t.kx_1,u=e.qx_1;h.d4(u,a);var p=t.lx_1,v=e.qx_1;return p.d4(v,l),a}function Df(t,e){return Vv(e,ag)}function Rf(t,e,n,i,r){var s,o,a,l;return Os("vaadin-menu-bar-item",(s=e,o=n,a=r,l=i,t=>{xn(s)>0&&(t.dataset.action=s),$s(t,Vv(o,lg));var e=$s(t,Os("span",function(t){return e=>(e.textContent=t,k)}(l)));if(a){var n=Is(e);n.fontWeight=600,n.color="var(--lumo-primary-text-color)"}return k}))}function Ff(t,e,n,i,r){var s={},o=Rf(0,"",n,i,!1);return o.dataset.menu=e,s.component=o,s.children=r,s}function qf(t,e,n,i,r,s){r=r!==C&&r,t.px_1.d4(e,s);var o={};return o.component=Rf(0,e,n,i,r),o}function Hf(t,e){var n;ep(e,"item-selected",(n=t,t=>{var e=t.detail.value.component,i=e instanceof HTMLElement?e:null,r=null==i?null:i.dataset,s=null==r?null:r.action;if(null==s);else{var o=n.px_1.s1(s);null==o||o()}return k}))}function Vf(t){var e,n=Pf(t,If(t).uv_1);switch($f(t).jy_1.x1_1){case 0:e="lucide:sun";break;case 1:e="lucide:moon";break;case 2:e="lucide:monitor";break;default:Bn()}var i,r=e,s=$f(t).jy_1.equals(tm()),o=qf(t,"theme:light","lucide:sun",n.hw_1,s,(i=t,()=>(Uf(i,tm()),k))),a=$f(t).jy_1.equals(em()),l=qf(t,"theme:dark","lucide:moon",n.iw_1,a,function(t){return()=>(Uf(t,em()),k)}(t)),d=$f(t).jy_1.equals(nm()),c=[o,l,qf(t,"theme:system","lucide:monitor",n.jw_1,d,cg(t))],h=[Ff(0,"theme",r,n.cw_1,c)];t.bx_1.items=h}function Uf(t,e){$f(t).ky(e),Vf(t)}function Wf(t,e){window.open(e,"_blank")}function Kf(t,e){var n=Pf(t,If(t).uv_1).kw_1.s1(e.rx_1.gy_1);t.ww_1.textContent=n??e.rx_1.gy_1;var i=Te(Lf(t).fy(e.rx_1));null==i||(t.ww_1.path="#/"+i.qx_1),t.xw_1.textContent=jf(t,e,If(t).uv_1),t.xw_1.removeAttribute("path")}function Gf(t){var e=Pf(t,If(t).uv_1);t.qw_1.textContent=e.zv_1;for(var n=Lf(t).ey_1.s();n.t();){var i=n.u(),r=t.mx_1.s1(i.gy_1);if(null==r);else{var s=e.kw_1.s1(i.gy_1);r.textContent=s??i.gy_1}}for(var o=Lf(t).dy_1.s();o.t();){var a=o.u(),l=t.lx_1.s1(a.qx_1);null==l||(l.textContent=jf(t,a,If(t).uv_1))}!function(t){!function(t){var e,n=Pf(t,If(t).uv_1),i=ct.i1(),r=Mf(t).zx_1;if(null==r);else{var s=qf(t,"docs:site","lucide:book",n.ew_1,C,(e=r,()=>(Wf(0,e),k)));i.z(s)}var o=Mf(t).ay_1;if(null==o);else{var a=qf(t,"docs:api","lucide:file-code",n.fw_1,C,function(t,e){return()=>(Wf(0,e),k)}(0,o));i.z(a)}var l=Mf(t).by_1;if(null==l);else{var d=qf(t,"docs:source","lucide:github",n.gw_1,C,function(t,e){return()=>(Wf(0,e),k)}(0,l));i.z(d)}if(t.zw_1.toggleAttribute("hidden",i.a1()),i.a1())return k;var c=ii(i),h=[Ff(0,"docs","lucide:book-open",n.dw_1,c)];t.zw_1.items=h}(t),function(t){for(var e=Pf(t,If(t).uv_1),n=If(t).sv_1,i=ct.y(Vi(n,10)),r=n.s();r.t();){var s=r.u(),o=qf(t,"lang:"+zf(s),"lucide:languages",Pf(t,s).aw_1,Ln(s,If(t).uv_1),dg(t,s));i.z(o)}var a=ii(i),l=[Ff(0,"lang","lucide:languages",e.bw_1,a)];t.ax_1.items=l}(t),Vf(t)}(t);for(var d=t.nx_1.u1().s();d.t();)d.u().my(If(t).uv_1);var c=t.ox_1,h=null==c?null:Lf(t).ly(c);null!=h?(Kf(t,h),document.title=jf(t,h,If(t).uv_1)+" · "+e.zv_1):document.title=e.zv_1}function Jf(){return Yv===C&&new nf,Yv}function Zf(t){return t.ariaLabel="Toggle navigation",Ku(t,(gu===C&&new cu,gu).dt_1,[]),t.classList.add(fg()),k}function Xf(t){return t.classList.add(hg()),k}function Yf(t){return t.classList.add(vg()),k}function Qf(t){return Ku(t,Pu().nt_1,[]),t.classList.add(gg(),ju().st_1),k}function tg(t){return Ku(t,Pu().nt_1,[]),t.classList.add(_g(),ju().st_1,Bu().xt_1),t.setAttribute("slot","navbar"),k}function eg(t){return Ku(t,Pu().nt_1,[]),t.classList.add(mg(),ju().st_1),k}function ng(t){return Ku(t,Fu().ku_1,[]),k}function ig(t){return Ku(t,Fu().ku_1,[]),k}function rg(t){return Ku(t,Fu().ku_1,[]),k}function sg(t){return function(t,e,n){for(var i=Kn([[e],n]),r=ct.y(i.length),s=0,o=i.length;s<o;){var a=i[s];s=s+1|0;var l=Ju(a);r.z(l)}Gu(t,r)}(t,Yu().qu_1,[Yu().tu_1]),k}function og(t){return t.expanded=!0,k}function ag(t){return t.setAttribute("slot","prefix"),t.classList.add(bg()),t.setAttribute("aria-hidden","true"),t.setAttribute("noobserver",""),k}function lg(t){t.setAttribute("aria-hidden","true");var e=Is(t);return e.fontSize=Tn(18)+"px",e.marginRight=Tn(8)+"px",t.setAttribute("noobserver",""),k}function dg(t,e){return()=>(If(t).xv(e),k)}function cg(t){return()=>(Uf(t,nm()),k)}function hg(){return yg(),Qv}function ug(){return yg(),t_}function pg(){return yg(),e_}function vg(){return yg(),n_}function _g(){return yg(),i_}function fg(){return yg(),r_}function gg(){return yg(),s_}function mg(){return yg(),o_}function bg(){return yg(),a_}function yg(){l_||(l_=!0,Qv="layout__title",t_="layout__title-link",e_="layout__logo",n_="layout__version",i_="layout__topbar",r_="layout__toggle",s_="layout__topbar-start",o_="layout__actions",a_="layout__nav-icon")}function wg(t){Cg();var e={display:"block"};e.height=Tn(100)+"vh",e.backgroundColor=Jg().ty_1,e.color=Jg().xy_1,e.fontSize=Tn(14)+"px",e["--vaadin-app-layout-drawer-width"]=Tn(264)+"px",e["--lumo-font-size-m"]=Tn(14)+"px",e["--lumo-border-radius-s"]=Tn(.25)+"em",e["--lumo-border-radius"]=Tn(.5)+"em",e["--lumo-border-radius-m"]=Tn(.5)+"em",e["--lumo-border-radius-l"]=Tn(1)+"em",t[":host"]=e;t["."+Tn(ju().st_1)]={alignItems:"center"};t["."+Tn(Bu().xt_1)]={justifyContent:"space-between"};var n="."+Tn(ug()),i={display:"flex",alignItems:"center"};i.columnGap=Tn(8)+"px",i.textDecorationLine="none",i.color=Jg().xy_1,i.flexShrink=0,t[n]=i;var r="."+Tn(hg()),s={},o=Tn(0)+"px",a=Tn(0)+"px";s.margin=Tn(o)+" "+Tn(a),s.fontSize=Tn(18)+"px",s.color=Jg().xy_1,s.whiteSpace="nowrap",s.flexShrink=0,s.fontWeight=700,t[r]=s;var l,d="("+Tn((zs(),Rr))+":"+Tn("text")+")";!function(t,e,n){var i=Tn("@supports")+" "+Tn(e),r={};n(r),t[i]=r}(t,(l="("+Tn("background-clip")+":"+Tn("text")+")",Tn(d)+" or "+Tn(l)),xg);var c="."+Tn(vg()),h={};h.fontSize=Tn(11)+"px",h.color=Jg().yy_1,h.whiteSpace="nowrap",h.flexShrink=0,h.marginLeft=Tn(8)+"px",t[c]=h;var u="."+Tn(_g()),p={};p.width=Tn(100)+"%",p.paddingLeft=Tn(8)+"px",p.paddingRight=Tn(12)+"px",t[u]=p;var v="."+Tn(fg()),_={};_.marginInlineStart=Tn(0)+"px",_.marginInlineEnd=Tn(0)+"px",_.paddingInlineStart=Tn(0)+"px",_.paddingInlineEnd=Tn(0)+"px",t[v]=_;var f="."+Tn(gg()),g={};g.minWidth=Tn(0)+"px",t[f]=g;t["."+Tn(mg())]={flexShrink:0};var m="."+Tn(pg()),b={};b.height=Tn(28)+"px",b.width="auto",b.flexShrink=0,t[m]=b;var y="."+Tn(bg()),w={};w.fontSize=Tn(18)+"px",t[y]=w;var x={};return x.width=Tn(100)+"%",t["vaadin-vertical-layout > *"]=x,k}function xg(t){Cg();var e,n="."+Tn(hg()),i={},r=Tn(100)+"deg",s=[Es("var("+Tn("--lumo-primary-color")+")"),Es("#2ec4b6")];return i.backgroundImage="linear-gradient("+Tn(r)+","+Ee(s,",")+")",e=i,zs(),e.WebkitBackgroundClip="text",i.backgroundClip="text",i.color="transparent",i.paddingBottom=Tn(.12)+"em",t[n]=i,k}function Cg(){c_||(c_=!0,d_=xs(wg))}function kg(t){return e=>(e.textContent=t,k)}function Ag(t){return Ku(t,Pu().nt_1,[]),k}function Eg(){return u_===C&&new hf,u_}function Sg(t){return t.classList.add(Ig()),k}function zg(t){return t.classList.add($g()),k}function Og(t){return t.classList.add(Mg()),k}function Tg(t){return Ku(t,Yu().tu_1,[]),k}function Lg(){return p_===C&&new pf,p_}function Ig(){return qg(),v_}function $g(){return qg(),__}function Mg(){return qg(),f_}function Ng(){return qg(),m_}function Pg(){return qg(),b_}function jg(){return qg(),y_}function Bg(){return qg(),w_}function Dg(){return qg(),x_}function Rg(){return qg(),C_}function Fg(){return qg(),k_}function qg(){z_||(z_=!0,v_="page__title",__="page__summary",f_="page__links",g_="page__link",m_="section",b_="section__title",y_="section__hint",w_="example__caption",x_="row",C_="grid",k_="readout",A_="event-log",E_="event-log__line",S_="code")}function Hg(){return Ug(),O_}function Vg(t){Ug();var e="."+Tn(Ig()),n={},i=Tn(0)+"px",r=Tn(0)+"px",s=Tn(6)+"px";n.margin=Tn(i)+" "+Tn(r)+" "+Tn(s),n.fontSize=Tn(26)+"px",n.color=Jg().xy_1,t[e]=n;var o="."+Tn($g()),a={},l=Tn(0)+"px",d=Tn(0)+"px",c=Tn(10)+"px";a.margin=Tn(l)+" "+Tn(d)+" "+Tn(c),a.color=Jg().yy_1,a.fontSize=Tn(14)+"px",a.lineHeight=1.55,t[o]=a;var h="."+Tn(Mg()),u={},p=Tn(0)+"px",v=Tn(0)+"px",_=Tn(4)+"px";u.margin=Tn(p)+" "+Tn(v)+" "+Tn(_),u.fontSize=Tn(13)+"px",t[h]=u;var f="."+Tn((qg(),g_)),g={};g.marginRight=Tn(16)+"px",g.color=Jg().zy_1,g.fontSize=Tn(13)+"px",t[f]=g;var m="."+Tn(Ng()),b={display:"block"};b.width=Tn(100)+"%",t[m]=b;var y="."+Tn(Pg()),w={},x=Tn(0)+"px",C=Tn(0)+"px",A=Tn(6)+"px";w.margin=Tn(x)+" "+Tn(C)+" "+Tn(A),w.fontSize=Tn(18)+"px",w.color=Jg().xy_1,t[y]=w;var E="."+Tn(jg()),S={},z=Tn(0)+"px",O=Tn(0)+"px",T=Tn(10)+"px";S.margin=Tn(z)+" "+Tn(O)+" "+Tn(T),S.color=Jg().yy_1,S.fontSize=Tn(13)+"px",S.lineHeight=1.5,t[E]=S;var L="."+Tn(Bg()),I={},$=Tn(0)+"px",M=Tn(0)+"px",N=Tn(8)+"px",P=Tn(0)+"px";I.margin=Tn($)+" "+Tn(M)+" "+Tn(N)+" "+Tn(P),I.color=Jg().yy_1,I.fontSize=Tn(12)+"px",t[L]=I;t["."+Tn(Dg())]={alignItems:"center"};var j="."+Tn(Rg()),B={display:"grid"};B.width=Tn(100)+"%",t[j]=B;var D="."+Tn(Fg()),R={};R.margin=Tn(0)+"px",R.color=Jg().yy_1,R.fontSize=Tn(13)+"px",t[D]=R;var F="."+Tn((qg(),A_)),q={display:"flex",flexDirection:"column"};q.margin=Tn(0)+"px";var H=Tn(8)+"px",V=Tn(10)+"px";q.padding=Tn(H)+" "+Tn(V),q.maxHeight=Tn(9)+"rem",q.backgroundColor=Jg().vy_1,q.borderRadius=Tn(6)+"px",q.fontFamily="monospace",q.fontSize=Tn(12)+"px",q.color=Jg().yy_1,t[F]=q;var U="."+Tn((qg(),E_)),W={};W.margin=Tn(0)+"px",W.whiteSpace="pre-wrap",t[U]=W;var K={};K.width=Tn(100)+"%",t["vaadin-card"]=K;var G="."+Tn((qg(),S_)),J={};J.backgroundColor=Jg().vy_1,J.borderRadius=Tn(6)+"px";var Z=Tn(2)+"px",X=Tn(6)+"px";return J.padding=Tn(Z)+" "+Tn(X),J.fontSize=Tn(12)+"px",t[G]=J,k}function Ug(){T_||(T_=!0,O_=xs(Vg))}function Wg(){return L_===C&&new _f,L_}function Kg(){return I_===C&&new gf,I_}function Gg(t){return Ku(t,Yu().tu_1,[]),k}function Jg(){return $_===C&&new bf,$_}function Zg(){return Yg(),M_}function Xg(t){Yg();t[":host"]={display:"block"};return t["*, *::before, *::after"]={boxSizing:"border-box"},k}function Yg(){N_||(N_=!0,M_=xs(Xg))}function Qg(){if(P_)return k;P_=!0,j_=new wf("LIGHT",0),B_=new wf("DARK",1),D_=new wf("SYSTEM",2)}function tm(){return Qg(),j_}function em(){return Qg(),B_}function nm(){return Qg(),D_}Wn(F_),qn(q_,"DemoLayoutDefaultReference",q_),Wn(H_),qn(V_,"DemoPageDefaultReference",V_),Wn(U_),qn(W_,"GridDefaultReference",W_),Wn(K_),qn(G_,"ReadoutDefaultReference",G_),Wn(J_),qn(Z_,"SectionBlockDefaultReference",Z_),qn(X_,"Binder"),Vn(Y_,"Langs"),qn(Q_,"LanguageState",Q_),qn(tf,"SiteTexts"),qn(ef,"Translations"),Wn(nf),qn(rf,"DemoLayout",rf),qn(sf,"LayoutConfig"),qn(of,"DemoMenu"),qn(af,"Entry"),qn(lf,"Group"),qn(df,"Router"),Vn(cf,"Blocks"),Wn(hf),qn(uf,"DemoPage",uf),Wn(pf),qn(vf,"Grid",vf),Wn(_f),qn(ff,"Readout",ff),Wn(gf),qn(mf,"SectionBlock",mf),Vn(bf,"Palette"),qn(yf,"Theme",yf),qn(wf,"ThemeMode"),h_=new cf;var im,rm,sm,om,am,lm,dm,cm,hm,um,pm,vm,_m,fm,gm,mm,bm,ym=n(620);class wm{r10(t){return ym.escapeForHtml(t)}s10(t){return ym.linkify(t)}t10(t,e){return ym.ansiToHtml(t,xm(e))}u10(t,e){return ym.ansiToJson(t,xm(e))}v10(t,e,n){return e=e===C?null:e,n===C?this.u10(t,e):n.u10.call(this,t,e)}w10(t,e){return ym.ansiToText(t,xm(e))}x10(t,e,n){return e=e===C?null:e,n===C?this.w10(t,e):n.w10.call(this,t,e)}}function xm(t){return t??{}}Vn(wm,"Anser"),im=new wm;class Cm{constructor(){rm=this,this.y10_1=Cf().zu_1,this.z10_1=new ms(Cf().av_1.gs_1,Cf().av_1.hs_1)}}class km extends bs{constructor(t,e,n,i,r){Um(),t=t===C?"anser-api-page":t,e=e===C?null:e,n=n===C?Um().y10_1:n,i=i===C||i,r=r===C?Um().z10_1:r,super(Im,t,e,n,i,r)}}class Am{constructor(){sm=this,this.a11_1=Cf().zu_1,this.b11_1=new ms(Cf().av_1.gs_1,Cf().av_1.hs_1)}}class Em extends bs{constructor(t,e,n,i,r){Wm(),t=t===C?"anser-conventions-page":t,e=e===C?null:e,n=n===C?Wm().a11_1:n,i=i===C||i,r=r===C?Wm().b11_1:r,super(Pm,t,e,n,i,r)}}class Sm{constructor(){om=this,this.c11_1=Cf().zu_1,this.d11_1=new ms(Cf().av_1.gs_1,Cf().av_1.hs_1)}}class zm extends bs{constructor(t,e,n,i,r){Km(),t=t===C?"anser-converter-page":t,e=e===C?null:e,n=n===C?Km().c11_1:n,i=i===C||i,r=r===C?Km().d11_1:r,super(Dm,t,e,n,i,r)}}class Om{constructor(){am=this,this.e11_1=Cf().zu_1,this.f11_1=new ms(Cf().av_1.gs_1,Cf().av_1.hs_1)}}class Tm extends bs{constructor(t,e,n,i,r){Gm(),t=t===C?"anser-overview-page":t,e=e===C?null:e,n=n===C?Gm().e11_1:n,i=i===C||i,r=r===C?Gm().f11_1:r,super(Hm,t,e,n,i,r)}}class Lm extends km{constructor(){fm=null,super(),fm=this,this.j11_1=new Mm("What the wrapper maps","Only what anser declares as an API is mapped; the module value is the class itself.","Declaration by declaration","The same table a new module is cut from: read the upstream declaration, then decide the Kotlin type.","upstream","in Kotlin",Fi([hr("npm package","anser 2.3.5"),hr("module shape","export = Anser → `Anser` object + `AnserInstance`"),hr("static methods","ansiToHtml / ansiToJson / ansiToText / escapeForHtml / linkify"),hr("instance extras","process / processChunk / processChunkJson / setupPalette"),hr("options","AnserOptions { json, use_classes, remove_empty }"),hr("one span","AnserJsonEntry { content, fg, bg, decoration(s), … }"),hr("decoration names","DecorationNames / AnserColorNames (sealed literal)"),hr("constructing","Reflect.construct — an `export =` class cannot be `new`-ed")])),this.k11_1=new Mm("封装层映射了什么","只映射 anser 声明为 API 的东西；模块值本身就是那个类。","逐条对照","新模块就照这张表切：先读上游声明，再决定 Kotlin 类型。","上游","Kotlin 侧",Fi([hr("npm 包","anser 2.3.5"),hr("模块形态","export = Anser → `Anser` 对象 + `AnserInstance`"),hr("静态方法","ansiToHtml / ansiToJson / ansiToText / escapeForHtml / linkify"),hr("实例另有","process / processChunk / processChunkJson / setupPalette"),hr("选项","AnserOptions { json, use_classes, remove_empty }"),hr("一个片段","AnserJsonEntry { content, fg, bg, decoration(s), … }"),hr("装饰与颜色名","DecorationNames / AnserColorNames（sealed literal）"),hr("如何构造","Reflect.construct——`export =` 的类不能 `new`")])),this.l11_1=Tf([hr(Sf().qv_1,this.j11_1),hr(Sf().rv_1,this.k11_1)]),this.m11_1="api-table",this.n11_1="api-cell",this.o11_1="api-cell-head",this.p11_1=xs(ib)}}class Im extends uf{constructor(){rb(),super(),this.y11_1=new X_(rb().l11_1),this.z11_1=Os("tr"),this.a12_1=Os("tbody");for(var t=rb().j11_1.i12_1,e=ct.y(Vi(t,10)),n=t.s();n.t();){n.u();var i=Os("td",sb),r=Os("td",ob);this.a12_1.append(Os("tr",ab(i,r)));var s=new $m(i,r);e.z(s)}this.b12_1=e;var o,a=Os("table",(o=this,t=>{t.classList.add(rb().m11_1);return t.append(Os("thead",function(t){return e=>(e.append(t.z11_1),k)}(o)),o.a12_1),k})),l=Os(Kg().js_1,lb);this.y11_1.ov(l.k10_1,db),this.y11_1.ov(l.l10_1,cb),l.m10_1.append(h_.hz(null,[a])),this.xz(rb().p11_1),this.sz_1.append(l.e10())}my(t){var e=rb().l11_1.nv(t);this.vz(e.c12_1),this.wz(e.d12_1),this.y11_1.pv(t);var n,i=Os("th",(n=e,t=>(t.classList.add(rb().n11_1),t.classList.add(rb().o11_1),t.textContent=n.g12_1,k)));this.z11_1.replaceChildren(i,Os("th",function(t){return e=>(e.classList.add(rb().n11_1),e.classList.add(rb().o11_1),e.textContent=t.h12_1,k)}(e)));for(var r=function(t,e){for(var n=t.s(),i=e.s(),r=Vi(t,10),s=Vi(e,10),o=Math.min(r,s),a=ct.y(o);n.t()&&i.t();){var l=hr(n.u(),i.u());a.z(l)}return a}(e.i12_1,this.b12_1).s();r.t();){var s=r.u(),o=s.aa(),a=s.ba();a.j12_1.textContent=o.y9_1,a.k12_1.textContent=o.z9_1}}}class $m{constructor(t,e){this.j12_1=t,this.k12_1=e}}class Mm{constructor(t,e,n,i,r,s,o){this.c12_1=t,this.d12_1=e,this.e12_1=n,this.f12_1=i,this.g12_1=r,this.h12_1=s,this.i12_1=o}}class Nm extends Em{constructor(){gm=null,super(),gm=this,this.o12_1=new jm("Conventions","The same rules as the library: declarations only, no dynamic, and one entry point per module.","Rules this wrapper follows","A derived project inherits these; the checklist is what a review looks for.",Fi(["One module per npm package, one namespace package per module (io.github.shijianjs.ktjs.anser).","Declarations live in jsMain only: external interfaces, sealed literals, no `dynamic`.","A file marked @file:JsModule holds nothing but external declarations — the Kotlin API lives beside it.","Return types JavaScript picks at run time (process with options.json) are narrowed at the boundary, once.","The demo reuses ktjs-demo-kit for the frame, so no site here hand-rolls navigation or i18n."])),this.p12_1=new jm("约定","和库本身同一套规矩：只做声明、不用 dynamic、每个模块一个入口。","这个封装遵守的规矩","派生项目直接继承这些规矩；评审就照这份清单看。",Fi(["一个 npm 包一个模块，一个模块一个命名空间包（io.github.shijianjs.ktjs.anser）。","声明只放在 jsMain：external 接口、sealed 字面量，不出现 `dynamic`。","标了 @file:JsModule 的文件里只有 external 声明——Kotlin 侧 API 放在它旁边。","运行时才决定类型的返回值（process 配 options.json）只在边界处收口一次。","demo 直接复用 ktjs-demo-kit 的外壳，不再自己搓导航与多语言。"])),this.q12_1=Tf([hr(Sf().qv_1,this.o12_1),hr(Sf().rv_1,this.p12_1)])}}class Pm extends uf{constructor(){hb(),super(),this.e13_1=new X_(hb().q12_1),this.f13_1=h_.fz(qi());var t=Os(Kg().js_1,ub);this.e13_1.ov(t.k10_1,pb),this.e13_1.ov(t.l10_1,vb),t.m10_1.append(this.f13_1),this.sz_1.append(t.e10())}my(t){var e=hb().q12_1.nv(t);this.vz(e.r12_1),this.wz(e.s12_1),this.e13_1.pv(t);for(var n=e.v12_1,i=ct.y(Vi(n,10)),r=n.s();r.t();){var s=Os("li",_b(r.u()));i.z(s)}var o=ii(i);(function(){var t=this.f13_1;return t.replaceChildren.apply(t,[].slice.call(o.slice()))}).call(this)}}class jm{constructor(t,e,n,i,r){this.r12_1=t,this.s12_1=e,this.t12_1=n,this.u12_1=i,this.v12_1=r}}class Bm extends zm{constructor(){mm=null,super(),mm=this,this.j13_1="[1m$ kotlin build[0m\n[32mOK[0m 12 tests, [33m3 skipped[0m in 0.4s\n[31mFAILED[0m task ':ktjs-anser:jsBrowserTest'\nsee [4mhttps://example.com/report[0m for the details",this.k13_1=new Rm("Convert ANSI text","Every output on this page comes from the wrapper: `escapeForHtml`, `ansiToHtml`, `ansiToJson`, `ansiToText` and `linkify`.","One pipeline, three outputs","Edit the input, flip `use_classes`, then convert. The preview is the HTML anser returns; the source below it is the same string, unescaped.","ANSI input","Use classes (ansi-*-fg)","Convert","Reset sample","Rendered HTML","The same markup, as source","JSON entries","Plain text"),this.l13_1=new Rm("转换 ANSI 文本","这一页的每种输出都来自封装层：`escapeForHtml`、`ansiToHtml`、`ansiToJson`、`ansiToText` 与 `linkify`。","一条流水线，三种输出","改输入、拨 `use_classes`，再点转换。预览是 anser 返回的 HTML；下方源码是同一个字符串，未做转义。","ANSI 输入","使用 class（ansi-*-fg）","转换","恢复示例","渲染后的 HTML","同一段标记的源码","JSON 条目数","纯文本"),this.m13_1=Tf([hr(Sf().qv_1,this.k13_1),hr(Sf().rv_1,this.l13_1)]),this.n13_1="converter-output",this.o13_1=xs(fb)}}class Dm extends uf{constructor(){mb(),super(),this.x13_1=new X_(mb().m13_1),this.y13_1=function(t){t=t===C?Wu:t;var e=document.createElement("vaadin-text-area");return t(e),e}(bb),this.z13_1=function(t){t=t===C?Uu:t;var e=document.createElement("vaadin-switch");return t(e),e}(yb),this.a14_1=Ou(wb),this.b14_1=Ou(xb),this.c14_1=Os("pre",Cb),this.d14_1=Os("pre",kb);var t=Wg().js_1;this.e14_1=Os(t,Ab);var e=Wg().js_1;this.f14_1=Os(e,Eb),this.g14_1=Os("label",Sb),this.h14_1=Os("label",zb),this.i14_1=mb().k13_1;var n,i=this.a14_1;tp(new Qu(i,"click"),(n=this,t=>(gb(n),k)));var r=this.b14_1;tp(new Qu(r,"click"),function(t){return e=>(t.y13_1.value="[1m$ kotlin build[0m\n[32mOK[0m 12 tests, [33m3 skipped[0m in 0.4s\n[31mFAILED[0m task ':ktjs-anser:jsBrowserTest'\nsee [4mhttps://example.com/report[0m for the details",gb(t),k)}(this));var s=h_.gz([this.z13_1,this.h14_1,this.a14_1,this.b14_1]),o=Os(Kg().js_1,Ob);this.x13_1.ov(o.k10_1,Tb),this.x13_1.ov(o.l10_1,Lb),this.x13_1.ov(this.g14_1,Ib),this.x13_1.ov(this.h14_1,$b),this.x13_1.ov(this.a14_1,Mb),this.x13_1.ov(this.b14_1,Nb);var a=Os("h3",Pb);this.x13_1.ov(a,jb);var l=Os("h3",Bb);this.x13_1.ov(l,Db),o.m10_1.append(h_.hz(null,[this.g14_1,this.y13_1,s,this.e14_1.e10(),this.f14_1.e10()]),a,h_.hz(null,[this.c14_1]),l,h_.hz(null,[this.d14_1])),this.xz(mb().o13_1),this.sz_1.append(o.e10()),gb(this)}my(t){this.i14_1=mb().m13_1.nv(t),this.vz(this.i14_1.j14_1),this.wz(this.i14_1.k14_1),this.x13_1.pv(t),gb(this)}}class Rm{constructor(t,e,n,i,r,s,o,a,l,d,c,h){this.j14_1=t,this.k14_1=e,this.l14_1=n,this.m14_1=i,this.n14_1=r,this.o14_1=s,this.p14_1=o,this.q14_1=a,this.r14_1=l,this.s14_1=d,this.t14_1=c,this.u14_1=h}}class Fm{constructor(t,e,n,i){this.v14_1=t,this.w14_1=e,this.x14_1=n,this.y14_1=i}}class qm extends Tm{constructor(){bm=null,super(),bm=this,this.c15_1=new Vm("Overview","ANSI SGR escapes to HTML, JSON or plain text: a Kotlin/JS wrapper around anser.","What this wrapper is","One npm package, one module: `ktjs-anser` maps what anser declares as API onto Kotlin types the compiler checks. The demo is an ordinary consumer of that module — it calls `Anser.ansiToHtml` and never reaches into a global object.","Where to start","Three pages: the converter, the mapping table and the rules behind both.",Ui([hr("converter","The one thing the wrapper exists for: ANSI text in, HTML or JSON out, with the option object exercised."),hr("api","What the wrapper maps, and what stays upstream's business — the table a new module is cut from."),hr("conventions","The rules the library and this project are both written by: one module per package, no dynamic, sheets that belong to their component.")])),this.d15_1=new Vm("概览","把 ANSI SGR 转义转成 HTML、JSON 或纯文本：围绕 anser 的 Kotlin/JS 封装。","这个封装是什么","一个 npm 包对应一个模块：`ktjs-anser` 只把 anser 声明为 API 的东西映射成编译器能检查的 Kotlin 类型。这个 demo 就是该模块的普通使用方——调用 `Anser.ansiToHtml`，不碰任何全局对象。","从这里开始","三页：转换器、映射表，以及两者背后的规矩。",Ui([hr("converter","封装存在的理由：ANSI 文本进，HTML 或 JSON 出，并把选项对象逐条跑一遍。"),hr("api","封装映射了什么、哪些仍是上游的事——新模块照着切的那张表。"),hr("conventions","库和这个项目都遵守的规矩：一个包一个模块、不用 dynamic、样式表属于它的组件。")])),this.e15_1=Tf([hr(Sf().qv_1,this.c15_1),hr(Sf().rv_1,this.d15_1)]),this.f15_1="card-link",this.g15_1=xs(Rb)}}class Hm extends uf{constructor(){Fb(),super(),this.p15_1=new X_(Fb().e15_1),this.q15_1=ct.i1();var t=Os(Kg().js_1,qb);this.p15_1.ov(t.k10_1,Hb);var e=h_.ez();t.m10_1.append(this.p15_1.ov(e,Vb));var n=Os(Kg().js_1,Ub);this.p15_1.ov(n.k10_1,Wb),this.p15_1.ov(n.l10_1,Kb);var i,r=Lg().js_1;n.m10_1.append(Os(r,(i=this,t=>{t.a10(240);var e=ii(function(t){for(var e=Fi(["converter","api","conventions"]),n=ct.y(Vi(e,10)),i=e.s();i.t();){var r=i.u(),s=Os("div"),o=Lu(Gb(s)),a=Os("a",Jb(r,o)),l=t.q15_1,d=new Fm(r,a,o,s);l.z(d),n.z(a)}return n}(i));return t.b10(e.slice()),k}))),this.xz(Fb().g15_1),this.sz_1.append(t.e10(),n.e10())}my(t){var e=Fb().e15_1.nv(t);this.vz(e.r15_1),this.wz(e.s15_1),this.p15_1.pv(t);for(var n=eb().nv(t),i=this.q15_1.s();i.t();){var r=i.u(),s=n.lw_1.s1(r.v14_1);r.x14_1.cardTitle=s??r.v14_1;var o=e.x15_1.s1(r.v14_1)??"";r.y14_1.textContent=o}}}class Vm{constructor(t,e,n,i,r,s,o){this.r15_1=t,this.s15_1=e,this.t15_1=n,this.u15_1=i,this.v15_1=r,this.w15_1=s,this.x15_1=o}}function Um(){return rm===C&&new Cm,rm}function Wm(){return sm===C&&new Am,sm}function Km(){return om===C&&new Sm,om}function Gm(){return am===C&&new Om,am}function Jm(){return tb(),cm}function Zm(){return tb(),Os(Fb().js_1)}function Xm(){return tb(),Os(mb().js_1)}function Ym(){return tb(),Os(rb().js_1)}function Qm(){return tb(),Os(hb().js_1)}function tb(){hm||(hm=!0,lm=new lf("start","lucide:sparkles"),dm=new lf("convert","lucide:terminal"),cm=new lf("reference","lucide:book-open"))}function eb(){return nb(),vm}function nb(){_m||(_m=!0,um=new tf("ktjs-anser","English","Language","Theme","Docs","Documentation","API reference","GitHub","Light","Dark","Follow browser",Ui([hr("start","Getting started"),hr("convert","Converter"),hr("reference","Reference")]),Ui([hr("overview","Overview"),hr("converter","Convert ANSI text"),hr("api","What the wrapper maps"),hr("conventions","Conventions")])),pm=new tf("ktjs-anser","中文","语言","外观","文档","使用文档","API 文档","GitHub 仓库","亮色","暗色","跟随浏览器",Ui([hr("start","开始"),hr("convert","转换器"),hr("reference","参考")]),Ui([hr("overview","概览"),hr("converter","转换 ANSI 文本"),hr("api","封装层映射了什么"),hr("conventions","约定")])),vm=Tf([hr(Sf().qv_1,(nb(),um)),hr(Sf().rv_1,(nb(),pm))]))}function ib(t){var e=As(Ss(rb().m11_1)),n={};n.width=Tn(100)+"%",n.borderCollapse="collapse",t[e]=n;var i=As(Ss(rb().n11_1)),r={},s=Tn(6)+"px",o=Tn(8)+"px";r.padding=Tn(s)+" "+Tn(o),t[i]=r;var a=As(Ss(rb().o11_1)),l={};return l.width=Tn(32)+"%",l.fontWeight=600,l.textAlign="left",t[a]=l,k}function rb(){return fm===C&&(Eg(),new Lm),fm}function sb(t){return t.classList.add(rb().n11_1),k}function ob(t){return t.classList.add(rb().n11_1),k}function ab(t,e){return n=>(n.append(t,e),k)}function lb(t){return t.p10(),k}function db(t){return t.e12_1}function cb(t){return t.f12_1}function hb(){return gm===C&&(Eg(),new Nm),gm}function ub(t){return t.p10(),k}function pb(t){return t.t12_1}function vb(t){return t.u12_1}function _b(t){return e=>(e.textContent=t,k)}function fb(t){var e=As(Ss(mb().n13_1)),n={};return n.margin=Tn(0)+"px",n.whiteSpace="pre-wrap",n.fontFamily="monospace",n.fontSize=Tn(13)+"px",n.width=Tn(100)+"%",t[e]=n,k}function gb(t){var e=t.y13_1.value,n=im.r10(e),i={};i.use_classes=t.z13_1.checked;var r=i,s=im.s10(im.t10(n,r)),o=im.v10(e);t.c14_1.innerHTML=s,t.d14_1.textContent=s,t.e14_1.h10(t.i14_1.t14_1+": "+o.length),t.f14_1.h10(t.i14_1.u14_1+": "+im.x10(e))}function mb(){return mm===C&&(Eg(),new Bm),mm}function bb(t){return t.value="[1m$ kotlin build[0m\n[32mOK[0m 12 tests, [33m3 skipped[0m in 0.4s\n[31mFAILED[0m task ':ktjs-anser:jsBrowserTest'\nsee [4mhttps://example.com/report[0m for the details",k}function yb(t){return t.checked=!1,k}function wb(t){return k}function xb(t){return k}function Cb(t){return t.classList.add(mb().n13_1),k}function kb(t){return t.classList.add(mb().n13_1),k}function Ab(t){return t.g10(),k}function Eb(t){return t.g10(),k}function Sb(t){return k}function zb(t){return k}function Ob(t){return t.p10(),k}function Tb(t){return t.l14_1}function Lb(t){return t.m14_1}function Ib(t){return t.n14_1}function $b(t){return t.o14_1}function Mb(t){return t.p14_1}function Nb(t){return t.q14_1}function Pb(t){return k}function jb(t){return t.r14_1}function Bb(t){return k}function Db(t){return t.s14_1}function Rb(t){t[As(Ss(Fb().f15_1))]={display:"flex",color:"inherit",textDecorationLine:"none"};var e,n;return t[As((e=Ss(Fb().f15_1),n=Tn("vaadin-card"),Tn(e)+" > "+Tn(n)))]={flexGrow:1},k}function Fb(){return bm===C&&(Eg(),new qm),bm}function qb(t){return t.p10(),k}function Hb(t){return t.t15_1}function Vb(t){return t.u15_1}function Ub(t){return t.p10(),k}function Wb(t){return t.v15_1}function Kb(t){return t.w15_1}function Gb(t){return e=>(Ku(e,$u().et_1,[]),e.titleHeadingLevel=4,e.append(t),k)}function Jb(t,e){return n=>(n.href="#/"+t,n.classList.add(Fb().f15_1),n.dataset.route=t,n.append(e),k)}return Wn(Cm),qn(km,"ApiPageDefaultReference",km),Wn(Am),qn(Em,"ConventionsPageDefaultReference",Em),Wn(Sm),qn(zm,"ConverterPageDefaultReference",zm),Wn(Om),qn(Tm,"OverviewPageDefaultReference",Tm),Wn(Lm),qn(Im,"ApiPage",Im),qn($m,"ApiRow"),qn(Mm,"ApiTexts"),Wn(Nm),qn(Pm,"ConventionsPage",Pm),qn(jm,"ConventionsTexts"),Wn(Bm),qn(Dm,"ConverterPage",Dm),qn(Rm,"ConverterTexts"),qn(Fm,"CardLink"),Wn(qm),qn(Hm,"OverviewPage",Hm),qn(Vm,"OverviewTexts"),function(){var t=new Q_(C,"ktjs-anser-language");t.wv();var e=new yf;e.q10(),Jf().js_1;var n=document.getElementById("demo"),i=n instanceof rf?n:null;if(null==i)throw jt.n2(Tn('index.html has no <ktjs-demo-layout id="demo">'));i.py(new sf(function(){tb();var t=(tb(),lm),e=new af("overview",t,C,Zm),n=(tb(),dm),i=new af("converter",n,C,Xm),r=Jm(),s=new af("api",r,C,Ym),o=Jm();return new of(Fi([e,i,s,new af("conventions",o,C,Qm)]))}(),t,e,eb(),"Kotlin/JS 2.4.21","https://shijianjs.github.io/ktjs-anser/","https://shijianjs.github.io/ktjs-anser/api/","https://github.com/shijianjs/ktjs-anser","img/ktjs-anser-logo.png"))}(),{}})());
//# sourceMappingURL=demo.js.map