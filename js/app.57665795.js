(function(){"use strict";var t={3409:function(t,e,n){var r=n(6848),i=n(9143),o=n.n(i),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"linker"}},[r("div",{staticClass:"header"},[r("div",{staticClass:"header-container"},[r("router-link",{attrs:{to:"/"}},[r("img",{staticClass:"logo-img",attrs:{alt:"logo",src:n(3153)}})])],1),r("div",{staticClass:"menu-container"},[r("ul",{staticClass:"menu"},[r("li",{staticClass:"menu-item"},[r("router-link",{class:{"no-active":t.isHomePage},attrs:{to:"/"}},[t._v("Home")])],1),r("li",{staticClass:"menu-item"},[r("router-link",{attrs:{to:"/product"}},[t._v("Products")])],1)]),r("ul",{staticClass:"menu secondary-menu"},[r("li",{staticClass:"menu-item secondary-menu-item"},[r("router-link",{attrs:{to:"/about"}},[t._v("About Us")])],1),r("li",{staticClass:"menu-item secondary-menu-item"},[r("router-link",{attrs:{to:"/"}},[t._v("Ask Us")])],1),r("li",{staticClass:"menu-item secondary-menu-item"},[r("router-link",{attrs:{to:"/"}},[t._v("Contacts")])],1)])])]),r("div",{staticClass:"view"},[r("router-view")],1)])},s=[],u={computed:{isHomePage(){return"/"===this.$route.path}}},l=u,c=n(1656),d=(0,c.A)(l,a,s,!1,null,null,null),f=d.exports,m=n(6178),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"front"},[n("div",{staticClass:"top"},[n("div",{staticClass:"img-container"},[n("Slick",{attrs:{images:t.imageSlides}})],1)])])},v=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"slick-body"},[n("div",{staticClass:"slick-container"},[n("el-button",{attrs:{plain:""},on:{click:t.prevSlide}},[t._v("<")]),n("div",{staticClass:"slick-track"},t._l(t.images,(function(e,r){return n("div",{directives:[{name:"show",rawName:"v-show",value:r===t.currentSlide,expression:"index === currentSlide"}],key:r,staticClass:"slick-slide"},[n("img",{staticClass:"slide-image",attrs:{src:e.src,alt:e.alt}}),n("h1",{staticClass:"overlay-text"},[t._v(t._s(e.text))])])})),0),n("el-button",{attrs:{plain:""},on:{click:t.nextSlide}},[t._v(">")])],1)])},g=[],b={props:{images:{type:Array}},data(){return{currentSlide:0}},methods:{nextSlide(){this.currentSlide=(this.currentSlide+1)%this.images.length},prevSlide(){this.currentSlide=(this.currentSlide-1+this.images.length)%this.images.length}}},y=b,C=(0,c.A)(y,h,g,!1,null,"063ef432",null),k=C.exports,S={data(){return{imageSlides:[{src:n(523),alt:"Slide 1",text:"Welcome to FireDragon"},{src:n(4062),alt:"Slide 2",text:"This is second Page"},{src:n(201),alt:"Slide 3",text:"This is third Page"},{src:n(2828),alt:"Slide 4",text:"This is forth Page"}]}},components:{Slick:k}},_=S,x=(0,c.A)(_,p,v,!1,null,"5ab0c22b",null),w=x.exports;r["default"].use(m.A);const A=[{path:"/",name:"home",meta:{title:"Home Page"},component:w},{path:"/about",name:"about",meta:{title:"About Page"},component:()=>n.e(594).then(n.bind(n,1586))},{path:"/product",name:"product",meta:{title:"Product Detail Page"},component:()=>n.e(611).then(n.bind(n,1611))}],E=new m.A({mode:"history",base:"/FDE-Demo/",routes:A});var P=E,j=n(3518);r["default"].use(j.Ay);var O=new j.Ay.Store({state:{},getters:{},mutations:{},actions:{},modules:{}});P.beforeEach(((t,e,n)=>{t.meta.title&&(document.title=t.meta.title),n()})),r["default"].config.productionTip=!1,r["default"].use(o()),new r["default"]({router:P,store:O,render:t=>t(f)}).$mount("#app")},523:function(t,e,n){t.exports=n.p+"img/food_0.f938f1c7.jpg"},4062:function(t,e,n){t.exports=n.p+"img/food_1.8fbb9020.jpg"},201:function(t,e,n){t.exports=n.p+"img/food_2.d079323f.jpg"},2828:function(t,e,n){t.exports=n.p+"img/food_3.739a2281.jpg"},3153:function(t,e,n){t.exports=n.p+"img/logo.707474dc.png"}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}n.m=t,function(){var t=[];n.O=function(e,r,i,o){if(!r){var a=1/0;for(c=0;c<t.length;c++){r=t[c][0],i=t[c][1],o=t[c][2];for(var s=!0,u=0;u<r.length;u++)(!1&o||a>=o)&&Object.keys(n.O).every((function(t){return n.O[t](r[u])}))?r.splice(u--,1):(s=!1,o<a&&(a=o));if(s){t.splice(c--,1);var l=i();void 0!==l&&(e=l)}}return e}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[r,i,o]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,r){return n.f[r](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/"+(594===t?"about":t)+"."+{594:"097cfd28",611:"2c439a53"}[t]+".js"}}(),function(){n.miniCssF=function(t){return"css/"+t+".488ea44f.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="food-protal:";n.l=function(r,i,o,a){if(t[r])t[r].push(i);else{var s,u;if(void 0!==o)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==e+o){s=d;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",e+o),s.src=r),t[r]=[i];var f=function(e,n){s.onerror=s.onload=null,clearTimeout(m);var i=t[r];if(delete t[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(t){return t(n)})),e)return e(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/FDE-Demo/"}(),function(){if("undefined"!==typeof document){var t=function(t,e,r,i,o){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",n.nc&&(a.nonce=n.nc);var s=function(n){if(a.onerror=a.onload=null,"load"===n.type)i();else{var r=n&&n.type,s=n&&n.target&&n.target.href||e,u=new Error("Loading CSS chunk "+t+" failed.\n("+r+": "+s+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=r,u.request=s,a.parentNode&&a.parentNode.removeChild(a),o(u)}};return a.onerror=a.onload=s,a.href=e,r?r.parentNode.insertBefore(a,r.nextSibling):document.head.appendChild(a),a},e=function(t,e){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var i=n[r],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===t||o===e))return i}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){i=a[r],o=i.getAttribute("data-href");if(o===t||o===e)return i}},r=function(r){return new Promise((function(i,o){var a=n.miniCssF(r),s=n.p+a;if(e(a,s))return i();t(r,s,null,i,o)}))},i={524:0};n.f.miniCss=function(t,e){var n={611:1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=r(t).then((function(){i[t]=0}),(function(e){throw delete i[t],e})))}}}(),function(){var t={524:0};n.f.j=function(e,r){var i=n.o(t,e)?t[e]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise((function(n,r){i=t[e]=[n,r]}));r.push(i[2]=o);var a=n.p+n.u(e),s=new Error,u=function(r){if(n.o(t,e)&&(i=t[e],0!==i&&(t[e]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,i[1](s)}};n.l(a,u,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,r){var i,o,a=r[0],s=r[1],u=r[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(u)var c=u(n)}for(e&&e(r);l<a.length;l++)o=a[l],n.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return n.O(c)},r=self["webpackChunkfood_protal"]=self["webpackChunkfood_protal"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(3409)}));r=n.O(r)})();
//# sourceMappingURL=app.57665795.js.map