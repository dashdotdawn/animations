!function(t){function e(e){for(var i,s,h=e[0],o=e[1],l=e[2],u=0,d=[];u<h.length;u++)s=h[u],r[s]&&d.push(r[s][0]),r[s]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);for(c&&c(e);d.length;)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,h=1;h<n.length;h++){var o=n[h];0!==r[o]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},r={0:0},a=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var h=window.webpackJsonp=window.webpackJsonp||[],o=h.push.bind(h);h.push=e,h=h.slice();for(var l=0;l<h.length;l++)e(h[l]);var c=o;a.push([4,1]),n()}({4:function(t,e,n){"use strict";n.r(e);n(0),n(2);function i(t){for(var e=[],n=1;n<t+1;n++)e.push(n);return function(t){for(var e=t.slice(),n=0;n<t.length;n++){let t=Math.floor(Math.random()*(n+1)),i=e[t];e[t]=e[n],e[n]=i}return e}(e)}function r(t,e){return Math.floor(Math.random()*(e-t+1))+t}class a{constructor(t,e,n,i,a){this.tx=this.x=t,this.ty=this.y=e,this.height=i,this.width=n,this.color=a||`rgba(${r(0,255)}, ${r(0,255)}, ${r(0,255)}, 0.7)`}draw(){a.ctx.fillStyle=this.color,a.ctx.fillRect(this.x,this.y,this.width,this.height)}}const s={SELECTION_SORT:async function(t,e){let n=t.length;for(let i=0;i<n;i++){let r=i;for(let e=i;e<n;e++)t[e]<t[r]&&(r=e);await e(i,r)}},INSERT_SORT:async function(t,e){let n=t.length;for(let i=1;i<n;i++)for(let n=i;n>0&&t[n]<t[n-1];n--)await e(n-1,n)},SHELL_SORT:async function(t,e){let n=1,i=t.length;for(;3*n+1<i;)n=3*n+1;for(;n;){for(let r=n;r<i;r++)for(let i=r;i>=n&&t[i]<t[i-n];i-=n)await e(i-n,i);n=Math.floor(n/3)}},MERGE_SORT:function(t,e){(function t(n,i,r){if(i>=r)return Promise.resolve();let a=Math.floor((i+r)/2);return t(n,i,a).then(()=>t(n,a+1,r)).then(()=>(async function(t,n,i,r){if(t[i]>t[i-1])return;let a=t.slice(),s=n,h=i;for(let o=n;o<=r;o++){t[o];h>r?t[o]=a[s++]:s>=i?t[o]=a[h++]:a[s]>a[h]?t[o]=a[h++]:t[o]=a[s++],await e()}return})(n,i,a+1,r))})(t,0,t.length-1).then(()=>{console.log(function(t){for(var e=1;e<t.length;e++)if(t[e]<t[e-1])return!1;return!0}(t))})},QUICK_SORT:function(t,e){!function t(n,i,r){if(i>=r)return Promise.resolve();let a;return async function(t,n,i){let r=t[n],a=n,s=i;for(;a<s;){for(;t[a]<=r&&!(a>=i);)a++;for(;t[s]>r;)s--;a<s&&await e(a,s)}return await e(n,s),s}(n,i,r).then(e=>t(n,i,(a=e)-1)).then(()=>t(n,a+1,r))}(t,0,t.length-1)},HEAP_SORT:async function(t,e){let n=t.length,i=Math.floor(n/2);for(;i;)await a(i--,n);let r=n;for(;r>1;)await e(0,r-1),await a(1,--r);async function a(n,i){for(;2*n<=i;){let r=2*n;if(r+1<=i&&t[r]>t[r-1]&&r++,t[r-1]<t[n-1])break;await e(r-1,n-1),n=r}}}};var h=[],o=new class{constructor(t,e,n){this.canvas=document.getElementById(t),a.ctx=this.ctx=this.canvas.getContext("2d"),this.bgWidth=e,this.bgHeight=n,this.paddingX=Math.round(e/10),this.paddingY=Math.round(n/10),this.axisX=e-2*this.paddingX,this.axisY=n-2*this.paddingY,this.bars=[],this.canvas.width=this.bgWidth,this.canvas.height=this.bgHeight,this.draw()}render(t){this._saveUnitY(t),this.bars=this._generateBar(t),this.draw()}rerender(t){this.bars=this._generateBar(t,"black"),this.draw()}swapBar(t,e){let n=this.bars[t],i=this.bars[e],r=n.x;n.x=i.x,i.x=r,this.bars[t]=i,this.bars[e]=n}draw(){this.ctx.fillStyle="wheat",this.ctx.fillRect(0,0,this.bgWidth,this.bgHeight),this.ctx.beginPath(),this.ctx.moveTo(this.paddingX,this.paddingY),this.ctx.lineTo(this.paddingX,this.axisY+this.paddingY),this.ctx.lineTo(this.paddingX+this.axisX,this.axisY+this.paddingY),this.ctx.stroke(),this.ctx.closePath(),this.bars.forEach(t=>{t.draw()})}_generateBar(t,e){var n=[];let i=t.length,r=this.axisX/i,s=r/1.4*.2,h=+(r-2*s).toFixed(0);for(let o=0;o<i;o++){let i=+(this.unitY*t[o]).toFixed(0),l=+(this.paddingY+this.axisY-i).toFixed(0),c=+(this.paddingX+s+o*r).toFixed(0),u=new a(c,l,h,i,e);n.push(u)}return n}_saveUnitY(t){let e=Math.max(...t),n=.9*this.axisY/e;this.unitY=n}}("canvas",600,450),l=new class{constructor(){this.running=!1,this._swap=this._swap.bind(this),this._rerender=this._rerender.bind(this)}start(t,e,n){this.running=!0,this.type=t,this.data=e,this.chart=n;let i="MERGE_SORT"===this.type?this._rerender:this._swap;s[t](e,i)}stop(){this.running=!1}updateChart(){let t=this.running?100:0;return new Promise(e=>{setTimeout(()=>{this.chart.draw(),e()},t)})}_swap(t,e){let n=this.data[t];return this.data[t]=this.data[e],this.data[e]=n,this.chart.swapBar(t,e),this.updateChart()}_rerender(){return this.chart.rerender(this.data),this.updateChart()}};document.getElementById("generate").addEventListener("click",function(){let t=+document.getElementById("count").value;h=i(t),o.render(h)}),document.getElementById("start").addEventListener("click",function(){if(!h.length)return alert("请点击「生成随机数组」");let t=document.getElementById("sort-type").value;l.start(t,h,o)}),document.getElementById("stop").addEventListener("click",function(){l.stop()}),document.getElementById("count").addEventListener("change",function(t){let e=t.target.value;e>200&&(t.target.value=200),e<10&&(t.target.value=10)})}});