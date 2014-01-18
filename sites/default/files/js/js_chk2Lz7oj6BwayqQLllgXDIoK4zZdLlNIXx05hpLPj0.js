/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());;
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Digitized data copyright � 2011, Google Corporation.
 * 
 * Trademark:
 * Open Sans is a trademark of Google and may be registered in certain
 * jurisdictions.
 * 
 * Manufacturer:
 * Ascender Corporation
 * 
 * Vendor URL:
 * http://www.ascendercorp.com/
 * 
 * License information:
 * http://www.apache.org/licenses/LICENSE-2.0
 */
Cufon.registerFont({"w":1200,"face":{"font-family":"Open Sans Extrabold","font-weight":800,"font-stretch":"normal","units-per-em":"2048","panose-1":"2 11 9 6 3 8 4 2 2 4","ascent":"1638","descent":"-410","x-height":"20","bbox":"-162 -1589 2097 492","underline-thickness":"102","underline-position":"-103","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":532},"!":{"d":"463,-516r-330,0r-51,-946r432,0xm297,25v-127,0,-211,-68,-211,-191v0,-126,80,-192,211,-192v131,0,207,67,207,192v0,123,-81,191,-207,191","w":594},"\"":{"d":"477,-1462r-41,528r-274,0r-41,-528r356,0xm952,-1462r-41,528r-274,0r-41,-528r356,0","w":1073,"k":{"u":61,"s":61,"r":61,"q":123,"p":61,"o":123,"n":61,"m":61,"g":61,"e":123,"d":123,"c":123,"a":82,"Y":-20,"W":-41,"V":-41,"T":-41,"A":143}},"#":{"d":"1042,-813r-30,168r243,0r0,254r-290,0r-74,391r-268,0r73,-391r-168,0r-71,391r-267,0r72,-391r-225,0r0,-254r274,0r31,-168r-238,0r0,-260r287,0r72,-389r268,0r-74,389r166,0r72,-389r268,0r-73,389r229,0r0,260r-277,0xm578,-645r165,0r31,-168r-166,0","w":1356},"$":{"d":"1128,-477v0,249,-173,376,-417,403r0,193r-207,0r0,-187v-146,-7,-287,-39,-422,-98r0,-332v126,65,324,138,491,138v95,0,159,-10,164,-89v-9,-66,-57,-77,-123,-108v-99,-47,-304,-109,-385,-175v-94,-77,-149,-153,-149,-312v0,-249,173,-347,424,-373r0,-137r207,0r0,135v133,7,266,40,401,98r-119,285v-139,-63,-265,-94,-377,-94v-86,0,-145,10,-145,77v0,64,46,73,105,103v38,19,93,37,161,61v140,49,239,106,300,169v61,63,91,144,91,243"},"%":{"d":"356,-1187v-21,60,-21,273,1,331v25,66,88,67,113,1v21,-57,21,-276,0,-333v-25,-67,-90,-66,-114,1xm410,-1483v246,-1,381,196,381,457v0,274,-122,461,-381,461v-243,0,-373,-201,-373,-461v0,-272,120,-456,373,-457xm1520,-1462r-811,1462r-297,0r811,-1462r297,0xm1468,-605v-21,60,-21,273,1,331v26,70,97,66,117,-8v19,-71,19,-245,0,-316v-20,-74,-93,-78,-118,-7xm1522,-901v246,-1,381,196,381,457v0,273,-124,459,-381,460v-243,1,-373,-201,-373,-460v0,-272,120,-456,373,-457","w":1942},"&":{"d":"1567,-821v-40,185,-136,389,-240,514r320,307r-506,0r-99,-102v-136,90,-232,122,-440,122v-299,0,-530,-139,-530,-426v0,-175,91,-308,272,-401v-74,-86,-131,-178,-131,-326v0,-234,205,-348,463,-348v256,0,446,114,446,348v0,194,-116,291,-264,383r199,189v50,-77,85,-163,104,-260r406,0xm475,-434v0,158,233,176,330,94r-248,-252v-55,41,-82,93,-82,158xm653,-965v62,-34,114,-88,117,-168v2,-63,-41,-92,-100,-92v-60,0,-105,37,-105,105v0,50,29,102,88,155","w":1636},"'":{"d":"477,-1462r-41,528r-274,0r-41,-528r356,0","w":598,"k":{"u":61,"s":61,"r":61,"q":123,"p":61,"o":123,"n":61,"m":61,"g":61,"e":123,"d":123,"c":123,"a":82,"Y":-20,"W":-41,"V":-41,"T":-41,"A":143}},"(":{"d":"354,324v-181,-207,-280,-520,-280,-906v0,-392,99,-706,280,-921r326,0v-161,221,-262,546,-262,919v1,366,99,688,260,908r-324,0","w":735,"k":{"J":-184}},")":{"d":"381,-1503v180,213,281,535,281,921v0,383,-101,699,-281,906r-324,0v160,-215,260,-544,260,-908v0,-373,-98,-695,-262,-919r326,0","w":735},"*":{"d":"702,-1556r-38,352r356,-101r37,295r-314,21r207,278r-260,138r-143,-283r-123,281r-272,-136r206,-278r-313,-25r45,-291r348,101r-39,-352r303,0","w":1100},"+":{"d":"444,-588r-372,0r0,-268r372,0r0,-367r269,0r0,367r372,0r0,268r-372,0r0,361r-269,0r0,-361","w":1159},",":{"d":"498,-299r14,23v-65,254,-123,441,-176,561r-279,0v19,-92,39,-195,59,-309v20,-114,33,-206,40,-275r342,0","w":633,"k":{"Y":123,"W":123,"V":123,"U":41,"T":143,"Q":102,"O":102,"G":102,"C":102}},"-":{"d":"43,-393r0,-312r565,0r0,312r-565,0","w":651,"k":{"T":82}},".":{"d":"299,25v-127,0,-214,-67,-213,-191v0,-127,81,-192,213,-192v128,0,205,67,205,192v1,122,-81,191,-205,191","w":592,"k":{"Y":123,"W":123,"V":123,"U":41,"T":143,"Q":102,"O":102,"G":102,"C":102}},"\/":{"d":"901,-1483r-545,1503r-346,0r545,-1503r346,0","w":905},"0":{"d":"1128,-729v0,259,-43,449,-130,569v-87,120,-219,180,-398,180v-175,0,-306,-62,-395,-188v-89,-126,-133,-313,-133,-561v0,-260,43,-451,130,-572v87,-121,219,-182,398,-182v174,0,305,63,394,189v89,126,134,315,134,565xm496,-1073v-34,100,-38,587,0,685v24,61,55,93,104,93v49,0,81,-33,104,-96v38,-105,34,-574,0,-679v-40,-126,-166,-127,-208,-3"},"1":{"d":"942,0r-401,0r0,-774v0,-94,2,-180,6,-258v-68,83,-174,159,-258,231r-205,-252r502,-409r356,0r0,1462"},"2":{"d":"606,-1483v275,0,488,136,488,400v0,218,-94,328,-208,451v-49,53,-155,151,-317,296r0,10r553,0r0,326r-1061,0r0,-260r357,-361v147,-159,197,-189,266,-319v14,-27,18,-57,18,-88v0,-80,-57,-127,-141,-123v-132,6,-203,78,-299,156r-217,-254v167,-149,280,-234,561,-234"},"3":{"d":"588,-1483v267,-3,485,101,485,338v0,208,-140,326,-323,375r0,6v244,31,366,146,366,346v0,303,-272,442,-610,438v-181,-2,-293,-24,-436,-79r0,-328v106,56,239,96,379,96v148,0,249,-26,249,-151v0,-178,-214,-152,-401,-158r0,-297r92,0v201,0,301,-51,301,-154v-1,-84,-74,-114,-164,-114v-93,0,-190,31,-290,94r-164,-264v146,-100,285,-146,516,-148"},"4":{"d":"1169,-283r-161,0r0,283r-390,0r0,-283r-583,0r0,-290r608,-889r365,0r0,884r161,0r0,295xm618,-748v-1,-33,5,-193,9,-215r-11,0v-64,145,-158,258,-239,385r241,0r0,-170"},"5":{"d":"492,-940v358,-81,616,112,614,453v-2,349,-221,507,-594,507v-171,0,-310,-26,-418,-79r0,-324v94,45,260,91,385,92v137,1,227,-55,228,-184v1,-201,-267,-206,-443,-143r-145,-72r55,-772r834,0r0,329r-498,0"},"6":{"d":"621,20v-361,0,-551,-259,-551,-638v0,-560,225,-861,766,-865v59,0,129,6,208,17r0,309v-172,-33,-417,-26,-512,68v-62,61,-100,153,-106,284r12,0v60,-113,156,-170,289,-170v271,0,410,193,410,475v0,319,-195,520,-516,520xm463,-512v0,112,49,219,149,219v100,0,142,-80,142,-199v0,-119,-46,-178,-138,-178v-88,0,-153,71,-153,158"},"7":{"d":"209,0r502,-1133r-633,0r0,-327r1055,0r0,233r-515,1227r-409,0"},"8":{"d":"111,-1128v0,-248,219,-355,493,-355v277,0,488,105,488,357v0,189,-104,282,-252,356v108,61,184,123,228,184v44,61,67,126,67,197v-3,282,-229,409,-535,409v-313,0,-532,-118,-532,-405v0,-209,103,-294,266,-379v-129,-88,-223,-183,-223,-364xm596,-596v-91,51,-166,91,-166,195v0,88,71,137,166,137v168,0,221,-122,138,-226v-26,-32,-72,-67,-138,-106xm721,-1092v4,-63,-56,-106,-119,-106v-65,0,-121,43,-121,106v0,57,39,108,117,152v73,-46,117,-66,123,-152"},"9":{"d":"571,-1477v380,3,565,279,562,684v-4,566,-221,808,-777,813v-89,0,-157,-3,-204,-10r0,-313v180,35,395,13,499,-71v75,-60,118,-151,125,-277r-12,0v-62,120,-135,169,-307,170v-265,2,-404,-198,-404,-477v0,-320,199,-521,518,-519xm739,-944v0,-105,-60,-219,-157,-217v-102,2,-146,78,-146,198v0,103,42,179,142,179v84,0,161,-75,161,-160"},":":{"d":"299,25v-127,0,-214,-67,-213,-191v0,-127,81,-192,213,-192v128,0,205,67,205,192v1,122,-81,191,-205,191xm299,-764v-130,0,-213,-68,-213,-192v0,-126,82,-191,213,-191v128,0,205,67,205,191v1,122,-80,192,-205,192","w":592},";":{"d":"498,-299r14,23v-65,254,-123,441,-176,561r-279,0v19,-92,39,-195,59,-309v20,-114,33,-206,40,-275r342,0xm303,-764v-130,0,-211,-67,-211,-192v0,-126,79,-191,211,-191v128,0,207,67,207,191v0,123,-80,192,-207,192","w":608},"<":{"d":"1083,-178r-1011,-449r0,-172r1011,-506r0,297r-620,283r620,252r0,295","w":1159},"=":{"d":"72,-815r0,-268r1015,0r0,268r-1015,0xm72,-358r0,-271r1015,0r0,271r-1015,0","w":1159},">":{"d":"72,-473r620,-252r-620,-283r0,-297r1011,506r0,172r-1011,449r0,-295","w":1159},"?":{"d":"520,-1483v269,0,477,119,477,365v0,198,-97,284,-237,377v-70,45,-114,78,-132,99v-28,32,-27,72,-26,126r-307,0v-2,-100,5,-187,40,-252v39,-74,206,-159,259,-223v24,-27,35,-59,35,-94v-1,-63,-67,-91,-137,-91v-101,0,-218,36,-353,107r-139,-272v166,-95,339,-142,520,-142xm463,25v-128,0,-212,-66,-211,-191v0,-127,78,-192,211,-192v129,0,207,67,207,192v0,123,-83,191,-207,191","w":1034},"@":{"d":"913,154v-499,0,-833,-276,-831,-764v1,-359,184,-629,430,-762v243,-132,619,-144,870,-20v221,110,371,324,373,636v0,192,-77,364,-183,454v-127,108,-368,77,-439,-50r-15,0v-71,79,-158,119,-260,119v-247,1,-382,-156,-379,-406v4,-304,203,-475,512,-475v119,0,263,28,357,61r-21,422v-1,66,-14,180,47,180v35,0,62,-29,84,-87v22,-58,33,-131,33,-220v1,-321,-194,-502,-518,-499v-398,4,-616,250,-619,651v-3,340,203,534,545,532v181,-1,367,-43,514,-96r0,229v-149,63,-316,95,-500,95xm1063,-889v-185,-34,-303,71,-303,248v0,115,37,190,133,190v51,0,87,-22,113,-62v39,-61,50,-253,57,-376","w":1837},"A":{"d":"1055,0r-72,-274r-475,0r-74,274r-434,0r477,-1468r527,0r483,1468r-432,0xm901,-598r-117,-447v-21,-85,-34,-145,-41,-182v-6,34,-17,90,-35,168v-18,78,-57,232,-118,461r311,0","w":1487,"k":{"Y":123,"W":82,"V":82,"T":143,"Q":41,"O":41,"J":-266,"G":41,"C":41,"'":143,"\"":143}},"B":{"d":"1284,-428v0,287,-245,428,-557,428r-569,0r0,-1462v324,7,765,-33,952,88v95,61,145,151,145,276v0,164,-96,292,-229,322r0,10v168,44,258,142,258,338xm672,-901v105,0,177,-40,178,-139v0,-82,-62,-123,-186,-123r-111,0r0,262r119,0xm877,-461v0,-106,-78,-152,-193,-151r-131,0r0,307r139,0v123,0,185,-52,185,-156","w":1380,"k":{"Z":20,"Y":20,"X":41,"W":20,"V":20,"T":61,"A":41,".":82,",":82}},"C":{"d":"1145,-1069v-101,-45,-199,-90,-336,-90v-211,0,-299,197,-299,434v0,281,107,422,321,422v145,0,259,-48,371,-92r0,334v-122,54,-260,81,-414,81v-454,0,-688,-280,-684,-747v4,-460,252,-756,709,-756v158,0,309,34,453,103","w":1329,"k":{"Q":41,"O":41,"G":41,"C":41}},"D":{"d":"664,-1462v461,-2,735,243,735,700v0,485,-284,765,-768,762r-473,0r0,-1462r506,0xm641,-324v256,-2,347,-154,348,-424v0,-250,-87,-391,-321,-395r-115,0r0,819r88,0","w":1503,"k":{"Z":20,"Y":20,"X":41,"W":20,"V":20,"T":61,"A":41,".":82,",":82}},"E":{"d":"1026,0r-868,0r0,-1462r868,0r0,317r-473,0r0,230r438,0r0,317r-438,0r0,276r473,0r0,322","w":1124,"k":{"J":-123}},"F":{"d":"547,0r-389,0r0,-1462r864,0r0,317r-475,0r0,279r438,0r0,317r-438,0r0,549","w":1104,"k":{"A":41,"?":-41,".":123,",":123}},"G":{"d":"512,-725v0,252,99,417,332,420v59,0,113,-6,162,-17r0,-229r-261,0r0,-305r631,0r0,788v-171,59,-360,88,-565,88v-459,1,-707,-285,-707,-755v0,-473,291,-748,768,-748v179,0,351,39,474,92r-125,310v-105,-52,-221,-78,-347,-78v-245,1,-362,174,-362,434","w":1516},"H":{"d":"1411,0r-397,0r0,-596r-459,0r0,596r-397,0r0,-1462r397,0r0,542r459,0r0,-542r397,0r0,1462","w":1569},"J":{"d":"563,-143v1,378,-157,600,-520,602v-72,0,-140,-7,-205,-21r0,-307v44,8,92,22,146,21v151,-5,182,-91,182,-261r0,-1353r397,0r0,1319","w":721},"K":{"d":"1407,0r-446,0r-289,-559r-117,70r0,489r-397,0r0,-1462r397,0r0,635v110,-186,301,-443,428,-635r432,0r-461,655","w":1407,"k":{"Q":41,"O":41,"G":41,"C":41}},"L":{"d":"158,0r0,-1462r395,0r0,1143r563,0r0,319r-958,0","w":1192,"k":{"Y":61,"W":41,"V":41,"U":20,"T":41,"Q":41,"O":41,"G":41,"C":41,"'":164,"\"":164}},"M":{"d":"795,0r-299,-1053r-9,0v35,400,17,659,21,1053r-350,0r0,-1462r526,0r305,1038r8,0r299,-1038r527,0r0,1462r-363,0r2,-752v1,-41,5,-140,13,-299r-9,0r-295,1051r-376,0","w":1980},"N":{"d":"1550,0r-518,0r-534,-1030r-9,0v33,385,14,648,19,1030r-350,0r0,-1462r516,0r532,1016r6,0v-25,-369,-10,-648,-14,-1016r352,0r0,1462","w":1708},"O":{"d":"817,-1485v474,0,709,270,709,752v0,481,-238,753,-711,753v-468,0,-711,-276,-711,-755v0,-477,243,-751,713,-750xm1110,-733v0,-257,-68,-428,-293,-428v-198,0,-297,143,-297,428v0,283,98,424,295,424v228,0,294,-167,295,-424","w":1632,"k":{"Z":20,"Y":20,"X":41,"W":20,"V":20,"T":61,"A":41,".":82,",":82}},"P":{"d":"664,-1462v344,-3,553,145,555,465v3,334,-212,515,-555,512r-111,0r0,485r-395,0r0,-1462r506,0xm625,-807v117,1,194,-71,194,-188v0,-99,-55,-148,-164,-148r-102,0r0,336r72,0","w":1294,"k":{"Z":20,"X":41,"A":102,".":266,",":266}},"Q":{"d":"817,-1485v474,0,709,270,709,752v0,331,-105,555,-316,670r357,411r-492,0r-260,-328v-468,0,-711,-276,-711,-755v0,-477,243,-751,713,-750xm1110,-733v0,-257,-68,-428,-293,-428v-198,0,-297,143,-297,428v0,283,98,424,295,424v228,0,294,-167,295,-424","w":1632,"k":{"Z":20,"Y":20,"X":41,"W":20,"V":20,"T":61,"A":41,".":82,",":82}},"R":{"d":"553,-532r0,532r-395,0r0,-1462r479,0v397,0,596,144,596,432v0,169,-83,300,-248,393r426,637r-448,0r-310,-532r-100,0xm553,-829r74,0v138,0,207,-61,207,-183v0,-101,-68,-151,-203,-151r-78,0r0,334","w":1386},"S":{"d":"639,-1167v-85,0,-147,26,-147,94v0,29,14,54,44,77v30,23,110,64,242,124v126,57,213,117,262,182v49,65,74,147,74,246v0,313,-245,464,-573,464v-205,0,-307,-25,-451,-92r0,-352v125,65,293,116,459,123v119,5,205,-65,153,-161v-65,-68,-97,-69,-247,-140v-161,-77,-256,-129,-321,-266v-25,-52,-34,-115,-34,-187v2,-290,238,-428,551,-428v151,0,306,35,463,105r-121,305v-137,-63,-255,-94,-354,-94","w":1182},"T":{"d":"803,0r-395,0r0,-1139r-357,0r0,-323r1108,0r0,323r-356,0r0,1139","w":1210,"k":{"z":82,"y":41,"x":41,"w":41,"v":41,"u":102,"s":123,"r":102,"q":143,"p":102,"o":143,"n":102,"m":102,"g":143,"e":143,"d":143,"c":143,"a":164,"T":-41,"Q":41,"O":41,"G":41,"C":41,"A":143,"?":-41,".":123,"-":82,",":123}},"U":{"d":"776,-309v178,0,230,-103,230,-297r0,-856r395,0r0,880v1,389,-234,602,-631,602v-391,0,-620,-207,-620,-593r0,-889r397,0r0,858v0,188,60,295,229,295","w":1550,"k":{"A":20,".":41,",":41}},"V":{"d":"979,-1462r442,0r-479,1462r-465,0r-477,-1462r444,0r199,741v41,165,64,279,68,344v8,-86,45,-267,65,-340","w":1421,"k":{"u":20,"s":20,"r":20,"q":41,"p":20,"o":41,"n":20,"m":20,"g":20,"e":41,"d":41,"c":41,"a":41,"Q":20,"O":20,"G":20,"C":20,"A":82,"?":-41,".":102,",":102}},"W":{"d":"1737,0r-467,0r-140,-637v-15,-62,-55,-282,-63,-358v-50,342,-139,668,-207,995r-467,0r-362,-1462r381,0r159,733v36,162,61,291,74,387v53,-377,158,-767,238,-1120r366,0r125,553v34,138,91,430,109,567v44,-303,165,-796,233,-1120r381,0","w":2128,"k":{"u":20,"s":20,"r":20,"q":41,"p":20,"o":41,"n":20,"m":20,"g":20,"e":41,"d":41,"c":41,"a":41,"Q":20,"O":20,"G":20,"C":20,"A":82,"?":-41,".":102,",":102}},"X":{"d":"1475,0r-457,0r-285,-457r-282,457r-447,0r485,-748r-456,-714r438,0r264,452r254,-452r451,0r-463,745","w":1481,"k":{"Q":41,"O":41,"G":41,"C":41}},"Y":{"d":"680,-920r252,-542r428,0r-481,891r0,571r-398,0r0,-559r-481,-903r430,0","w":1360,"k":{"z":41,"u":61,"s":82,"r":61,"q":102,"p":61,"o":102,"n":61,"m":61,"g":41,"e":102,"d":102,"c":102,"a":102,"Q":41,"O":41,"G":41,"C":41,"A":123,"?":-41,".":123,",":123}},"Z":{"d":"1200,0r-1139,0r0,-244r633,-899r-618,0r0,-319r1108,0r0,243r-633,900r649,0r0,319","w":1251,"k":{"Q":20,"O":20,"G":20,"C":20}},"[":{"d":"616,344r-499,0r0,-1847r499,0r0,254r-182,0r0,1339r182,0r0,254","w":664,"k":{"J":-184}},"\\":{"d":"352,-1483r545,1503r-346,0r-545,-1503r346,0","w":905},"]":{"d":"47,90r182,0r0,-1339r-182,0r0,-254r500,0r0,1847r-500,0r0,-254","w":664},"^":{"d":"-16,-502r440,-966r170,0r508,966r-295,0r-289,-577r-248,577r-286,0","w":1075},"_":{"d":"1028,379r-1032,0r0,-246r1032,0r0,246","w":1024},"`":{"d":"696,-1241v-46,-29,-114,-76,-204,-139v-90,-63,-165,-119,-228,-168r0,-21r430,0v33,49,176,203,262,299r0,29r-260,0","w":1225},"a":{"d":"688,-1153v278,0,457,143,457,410r0,743r-271,0r-75,-150r-8,0v-100,120,-174,168,-373,170v-217,2,-344,-142,-344,-366v0,-335,327,-375,680,-375v4,-103,-40,-157,-138,-156v-83,0,-188,28,-315,84r-113,-258v132,-68,299,-102,500,-102xm584,-256v92,0,175,-68,172,-162r0,-88r-90,4v-129,5,-193,52,-193,142v0,69,37,104,111,104","w":1276,"k":{"'":20,"\"":20}},"b":{"d":"526,-987v67,-103,151,-166,301,-166v123,0,217,54,293,155v142,189,142,673,0,862v-77,102,-175,156,-305,156v-148,0,-212,-45,-289,-131r-24,0r-62,111r-305,0r0,-1556r391,0v-3,218,9,345,-14,569r14,0xm526,-610v-2,174,7,315,162,315v46,0,81,-24,106,-71v25,-47,37,-116,37,-207v0,-182,-49,-273,-147,-273v-126,0,-157,93,-158,236","w":1317,"k":{"z":20,"y":41,"x":41,"w":41,"v":41,"'":20,"\"":20}},"c":{"d":"682,-846v-142,0,-199,124,-199,283v0,181,67,272,201,272v115,0,225,-33,330,-100r0,311v-101,67,-222,100,-363,100v-371,2,-565,-209,-565,-581v0,-375,219,-595,596,-592v131,0,255,29,371,86r-115,289v-84,-35,-151,-68,-256,-68","w":1104,"k":{"'":-41,"\"":-41}},"d":{"d":"502,-1153v151,0,228,61,297,166r8,0v-28,-180,-17,-370,-19,-569r394,0r0,1556r-295,0r-84,-143r-15,0v-67,109,-168,163,-301,163v-295,0,-401,-271,-401,-585v0,-184,37,-328,111,-432v74,-104,176,-156,305,-156xm481,-559v0,150,39,270,166,270v150,0,174,-112,174,-272v0,-173,-31,-277,-178,-277v-123,0,-162,131,-162,279","w":1317},"e":{"d":"1106,-63v-124,63,-238,82,-424,83v-372,2,-596,-208,-596,-579v0,-373,194,-594,559,-594v337,0,537,182,535,518r0,174r-699,0v5,131,105,205,248,203v161,-2,255,-30,377,-86r0,281xm825,-707v-1,-104,-63,-182,-166,-180v-105,2,-163,70,-170,180r336,0","w":1266,"k":{"z":20,"y":41,"x":41,"w":41,"v":41,"'":20,"\"":20}},"f":{"d":"672,-1280v-78,-1,-89,62,-86,147r241,0r0,293r-241,0r0,840r-391,0r0,-840r-150,0r0,-192r158,-96v-3,-299,97,-439,385,-439v127,0,200,19,309,54r-84,253v-48,-13,-95,-20,-141,-20","w":846,"k":{"'":-123,"\"":-123}},"g":{"d":"590,-1153v40,0,184,20,219,20r395,0r0,189r-155,57v21,39,32,84,32,135v1,304,-277,416,-612,377v-23,44,-21,76,33,93v77,24,209,16,311,16v254,0,381,107,381,321v0,138,-62,240,-176,322v-175,125,-667,161,-868,35v-87,-54,-130,-131,-130,-232v0,-135,84,-223,252,-262v-58,-22,-129,-95,-129,-168v0,-110,57,-127,150,-190v-114,-50,-190,-162,-189,-324v2,-266,199,-392,486,-389xm500,39v-72,-1,-150,38,-150,102v0,147,313,115,418,71v57,-24,86,-54,86,-91v0,-30,-17,-51,-52,-63v-66,-25,-203,-17,-302,-19xm594,-588v86,0,118,-72,117,-172v0,-117,-39,-176,-117,-176v-81,0,-121,58,-121,174v0,116,40,174,121,174","w":1241},"h":{"d":"840,-1153v255,-3,401,159,401,416r0,737r-393,0r0,-618v0,-152,-45,-228,-135,-228v-64,0,-111,26,-141,80v-30,54,-46,143,-46,268r0,498r-391,0r0,-1556r391,0r0,221v0,100,-5,214,-16,342r18,0v67,-106,156,-158,312,-160","w":1372,"k":{"'":20,"\"":20}},"i":{"d":"528,0r-391,0r0,-1133r391,0r0,1133xm334,-1589v135,0,209,49,209,174v0,115,-70,172,-209,172v-138,0,-207,-57,-207,-172v0,-127,71,-174,207,-174","w":666},"j":{"d":"526,92v1,253,-160,400,-420,400v-60,0,-164,-12,-210,-25r0,-305v43,12,83,18,120,18v79,0,119,-57,119,-170r0,-1143r391,0r0,1225xm332,-1589v135,0,209,49,209,174v0,115,-70,172,-209,172v-138,0,-207,-57,-207,-172v0,-127,71,-174,207,-174","w":664},"k":{"d":"514,-637v125,-201,241,-320,375,-496r436,0r-393,482r418,651r-447,0r-248,-406r-127,97r0,309r-393,0r0,-1556r393,0v-6,311,18,638,-22,919r8,0","w":1350,"k":{"q":41,"o":41,"e":41,"d":41,"c":41}},"l":{"d":"526,0r-391,0r0,-1556r391,0r0,1556","w":662},"m":{"d":"1524,-1153v273,1,392,140,393,416r0,737r-391,0r0,-616v-1,-129,-22,-230,-131,-230v-60,0,-104,26,-132,77v-28,51,-42,132,-42,241r0,528r-392,0r0,-616v-2,-129,-19,-230,-127,-230v-61,0,-106,27,-134,82v-28,55,-42,144,-42,268r0,496r-391,0r0,-1133r295,0r49,140r23,0v56,-100,175,-160,325,-160v163,0,278,50,344,149r31,0v59,-88,179,-149,322,-149","w":2048,"k":{"'":20,"\"":20}},"n":{"d":"844,-1153v253,-1,397,158,397,416r0,737r-391,0r0,-618v-1,-130,-24,-228,-137,-228v-66,0,-114,26,-143,79v-29,53,-44,143,-44,271r0,496r-391,0r0,-1133r295,0r49,140r23,0v62,-102,183,-159,342,-160","w":1372,"k":{"'":20,"\"":20}},"o":{"d":"655,-1153v354,4,558,226,562,584v3,364,-208,589,-568,589v-346,0,-563,-238,-563,-589v0,-364,208,-588,569,-584xm651,-862v-142,0,-168,128,-168,293v0,166,25,299,170,299v143,0,166,-134,166,-299v0,-166,-24,-293,-168,-293","w":1305,"k":{"z":20,"y":41,"x":41,"w":41,"v":41,"'":20,"\"":20}},"p":{"d":"815,20v-141,0,-211,-46,-289,-131r-18,0v12,79,18,129,18,148r0,455r-391,0r0,-1625r318,0r55,144r18,0v73,-109,173,-164,301,-164v125,0,221,54,295,156v141,193,140,670,-4,859v-78,102,-176,158,-303,158xm526,-602v-4,171,16,307,162,307v50,0,84,-23,109,-65v43,-72,44,-350,0,-422v-25,-41,-60,-64,-113,-64v-131,0,-155,102,-158,244","w":1317,"k":{"z":20,"y":41,"x":41,"w":41,"v":41,"'":20,"\"":20}},"q":{"d":"492,20v-127,0,-223,-54,-298,-156v-141,-191,-141,-673,2,-861v77,-101,175,-156,302,-156v137,0,240,53,309,160r8,0r29,-140r338,0r0,1625r-391,0r0,-469v0,-23,4,-78,12,-166r-12,0v-64,109,-164,163,-299,163xm483,-559v0,167,28,272,168,276v153,4,173,-118,170,-288v-3,-173,-27,-279,-176,-279v-108,0,-162,97,-162,291","w":1317},"r":{"d":"506,-952v69,-131,232,-239,432,-189r-35,369v-32,-8,-76,-12,-133,-12v-163,-1,-244,73,-244,227r0,557r-391,0r0,-1133r291,0r61,181r19,0","w":961,"k":{"q":41,"o":41,"g":20,"e":41,"d":41,"c":41,"a":41,"'":-82,"\"":-82}},"s":{"d":"895,-805v-80,-36,-210,-80,-307,-84v-101,-4,-123,57,-62,97v40,27,317,130,370,179v70,65,114,136,114,265v0,263,-197,369,-480,368v-175,-1,-279,-15,-409,-63r0,-313v102,45,261,89,393,92v124,3,164,-59,92,-112v-23,-17,-94,-44,-207,-91v-177,-74,-280,-142,-280,-352v0,-236,204,-337,467,-334v170,1,286,40,415,96","w":1092},"t":{"d":"561,20v-266,0,-371,-127,-371,-393r0,-467r-137,0r0,-159r174,-123r101,-238r256,0r0,227r278,0r0,293r-278,0r0,441v0,73,35,110,106,110v53,0,116,-13,189,-39r0,285v-102,43,-179,63,-318,63","w":942,"k":{"'":-41,"\"":-41}},"u":{"d":"524,-514v2,128,23,225,135,225v67,0,115,-26,144,-79v29,-53,43,-143,43,-269r0,-496r391,0r0,1133r-295,0r-49,-141r-23,0v-63,101,-181,161,-342,161v-252,1,-395,-158,-395,-415r0,-738r391,0r0,619","w":1372},"v":{"d":"432,0r-432,-1133r408,0r196,687v6,28,14,64,14,98r7,0v0,-35,6,-72,18,-113r201,-672r407,0r-432,1133r-387,0","w":1251,"k":{"?":-41,".":82,",":82,"'":-82,"\"":-82}},"w":{"d":"1110,0r-128,-540r-30,-163r-20,-131r-6,0v-33,187,-55,304,-66,353r-115,481r-411,0r-309,-1133r385,0v48,239,131,564,143,807r6,0v11,-194,112,-593,160,-807r432,0r96,463v31,147,50,262,58,344r6,0v8,-96,32,-289,51,-372r100,-435r377,0r-311,1133r-418,0","w":1864,"k":{"?":-41,".":82,",":82,"'":-82,"\"":-82}},"x":{"d":"375,-578r-346,-555r444,0r172,318r176,-318r445,0r-355,555r369,578r-444,0r-191,-344r-190,344r-445,0","w":1290,"k":{"q":41,"o":41,"e":41,"d":41,"c":41}},"y":{"d":"-2,-1133r412,0r192,650v9,34,16,75,19,123r8,0v5,-46,13,-86,24,-121r197,-652r399,0r-448,1205v-105,268,-216,420,-539,420v-52,0,-105,-6,-160,-17r0,-307v63,13,159,22,212,-8v69,-40,92,-83,130,-176","w":1249,"k":{"?":-41,".":82,",":82,"'":-82,"\"":-82}},"z":{"d":"987,0r-938,0r0,-223r469,-611r-442,0r0,-299r889,0r0,242r-449,592r471,0r0,299","w":1038},"{":{"d":"307,-248v-2,-118,-115,-172,-246,-170r0,-301v135,1,243,-49,246,-170v4,-161,-20,-373,49,-462v87,-110,243,-131,465,-132r0,279v-98,5,-131,4,-171,46v-13,14,-19,35,-19,60r0,271v-3,166,-83,229,-240,252r0,12v155,25,240,83,240,246r0,276v10,96,79,101,190,107r0,278v-316,-6,-517,-34,-514,-344r0,-248","w":887,"k":{"J":-184}},"|":{"d":"387,-1556r268,0r0,2002r-268,0r0,-2002","w":1042},"}":{"d":"580,-889v2,121,110,171,245,170r0,301v-131,-1,-243,52,-245,170v-4,160,20,370,-49,458v-87,112,-241,133,-465,134r0,-278v116,-7,190,-14,190,-107r0,-276v3,-162,85,-221,240,-246r0,-12v-157,-23,-240,-86,-240,-252r0,-271v1,-53,-31,-78,-70,-92v-20,-7,-60,-12,-120,-14r0,-279v314,6,516,33,514,340r0,254","w":887},"~":{"d":"821,-528v-188,0,-347,-119,-516,-119v-73,0,-151,40,-233,121r0,-281v69,-72,157,-108,264,-108v189,0,348,124,518,118v92,-3,174,-62,231,-121r0,281v-70,73,-158,109,-264,109","w":1159},"I":{"d":"158,0r0,-1462r397,0r0,1462r-397,0","w":713},"\u00a0":{"w":532}}});
Cufon.replace('.cufon', {hover: 'true'});;

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);
;
/*
	Kwicks for jQuery (version 1.5.1)
	Copyright (c) 2008 Jeremy Martin
	http://www.jeremymartin.name/projects.php?project=kwicks
	
	Licensed under the MIT license:
		http://www.opensource.org/licenses/mit-license.php

	Any and all use of this script must be accompanied by this copyright/license notice in its present form.
*/
(function($){$.fn.kwicks=function(n){var p={isVertical:false,sticky:false,defaultKwick:0,event:'mouseover',spacing:0,duration:500};var o=$.extend(p,n);var q=(o.isVertical?'height':'width');var r=(o.isVertical?'top':'left');return this.each(function(){container=$(this);var k=container.children('li');var l=k.eq(0).css(q).replace(/px/,'');if(!o.max){o.max=(l*k.size())-(o.min*(k.size()-1))}else{o.min=((l*k.size())-o.max)/(k.size()-1)}if(o.isVertical){container.css({width:k.eq(0).css('width'),height:(l*k.size())+(o.spacing*(k.size()-1))+'px'})}else{container.css({width:(l*k.size())+(o.spacing*(k.size()-1))+'px',height:k.eq(0).css('height')})}var m=[];for(i=0;i<k.size();i++){m[i]=[];for(j=1;j<k.size()-1;j++){if(i==j){m[i][j]=o.isVertical?j*o.min+(j*o.spacing):j*o.min+(j*o.spacing)}else{m[i][j]=(j<=i?(j*o.min):(j-1)*o.min+o.max)+(j*o.spacing)}}}k.each(function(i){var h=$(this);if(i===0){h.css(r,'0px')}else if(i==k.size()-1){h.css(o.isVertical?'bottom':'right','0px')}else{if(o.sticky){h.css(r,m[o.defaultKwick][i])}else{h.css(r,(i*l)+(i*o.spacing))}}if(o.sticky){if(o.defaultKwick==i){h.css(q,o.max+'px');h.addClass('active')}else{h.css(q,o.min+'px')}}h.css({margin:0,position:'absolute'});h.bind(o.event,function(){var c=[];var d=[];k.stop().removeClass('active');for(j=0;j<k.size();j++){c[j]=k.eq(j).css(q).replace(/px/,'');d[j]=k.eq(j).css(r).replace(/px/,'')}var e={};e[q]=o.max;var f=o.max-c[i];var g=c[i]/f;h.addClass('active').animate(e,{step:function(a){var b=f!=0?a/f-g:1;k.each(function(j){if(j!=i){k.eq(j).css(q,c[j]-((c[j]-o.min)*b)+'px')}if(j>0&&j<k.size()-1){k.eq(j).css(r,d[j]-((d[j]-m[i][j])*b)+'px')}})},duration:o.duration,easing:o.easing})})});if(!o.sticky){container.bind("mouseleave",function(){var c=[];var d=[];k.removeClass('active').stop();for(i=0;i<k.size();i++){c[i]=k.eq(i).css(q).replace(/px/,'');d[i]=k.eq(i).css(r).replace(/px/,'')}var e={};e[q]=l;var f=l-c[0];k.eq(0).animate(e,{step:function(a){var b=f!=0?(a-c[0])/f:1;for(i=1;i<k.size();i++){k.eq(i).css(q,c[i]-((c[i]-l)*b)+'px');if(i<k.size()-1){k.eq(i).css(r,d[i]-((d[i]-((i*l)+(i*o.spacing)))*b)+'px')}}},duration:o.duration,easing:o.easing})})}})}})(jQuery);;
/*
 * jQuery Nivo Slider v2.7.1
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * March 2010
 */

(function(a){var b=function(b,c){var d=a.extend({},a.fn.nivoSlider.defaults,c);var e={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false};var f=a(b);f.data("nivo:vars",e);f.css("position","relative");f.addClass("nivoSlider");var g=f.children();g.each(function(){var b=a(this);var c="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");c=b}b=b.find("img:first")}var d=b.width();if(d==0)d=b.attr("width");var g=b.height();if(g==0)g=b.attr("height");if(d>f.width()){f.width(d)}if(g>f.height()){f.height(g)}if(c!=""){c.css("display","none")}b.css("display","none");e.totalSlides++});if(d.randomStart){d.startSlide=Math.floor(Math.random()*e.totalSlides)}if(d.startSlide>0){if(d.startSlide>=e.totalSlides)d.startSlide=e.totalSlides-1;e.currentSlide=d.startSlide}if(a(g[e.currentSlide]).is("img")){e.currentImage=a(g[e.currentSlide])}else{e.currentImage=a(g[e.currentSlide]).find("img:first")}if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');f.append(a('<div class="nivo-caption"><p></p></div>').css({display:"none",opacity:d.captionOpacity}));a(".nivo-caption",f).css("opacity",0);var h=function(b){var c=a(".nivo-caption",f);if(e.currentImage.attr("title")!=""&&e.currentImage.attr("title")!=undefined){var d=e.currentImage.attr("title");if(d.substr(0,1)=="#")d=a(d).html();if(c.css("opacity")!=0){c.find("p").stop().fadeTo(b.animSpeed,0,function(){a(this).html(d);a(this).stop().fadeTo(b.animSpeed,1);b.customChange.call(this);})}else{c.find("p").html(d)}c.stop().fadeTo(b.animSpeed,b.captionOpacity)}else{c.stop().fadeTo(b.animSpeed,0)}b.customChange.call(this);};h(d);var i=0;if(!d.manualAdvance&&g.length>1){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}if(d.directionNav){f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+d.prevText+'</a><a class="nivo-nextNav">'+d.nextText+"</a></div>");if(d.directionNavHide){a(".nivo-directionNav",f).hide();f.hover(function(){a(".nivo-directionNav",f).show()},function(){a(".nivo-directionNav",f).hide()})}a("a.nivo-prevNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")});a("a.nivo-nextNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")})}if(d.controlNav){var j=a('<div class="nivo-controlNav"></div>');f.append(j);for(var k=0;k<g.length;k++){if(d.controlNavThumbs){var l=g.eq(k);if(!l.is("img")){l=l.find("img:first")}if(d.controlNavThumbsFromRel){j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("rel")+'" alt="" /></a>')}else{j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("src").replace(d.controlNavThumbsSearch,d.controlNavThumbsReplace)+'" alt="" /></a>')}}else{j.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>")}}a(".nivo-controlNav a:eq("+e.currentSlide+")",f).addClass("active");a(".nivo-controlNav a",f).live("click",function(){if(e.running)return false;if(a(this).hasClass("active"))return false;clearInterval(i);i="";f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');e.currentSlide=a(this).attr("rel")-1;o(f,g,d,"control")})}if(d.keyboardNav){a(window).keypress(function(a){if(a.keyCode=="37"){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")}if(a.keyCode=="39"){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")}})}if(d.pauseOnHover){f.hover(function(){e.paused=true;clearInterval(i);i=""},function(){e.paused=false;if(i==""&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}})}f.bind("nivo:animFinished",function(){e.running=false;a(g).each(function(){if(a(this).is("a")){a(this).css("display","none")}});if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}if(i==""&&!e.paused&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}d.afterChange.call(this)});var m=function(b,c,d){for(var e=0;e<c.slices;e++){var f=Math.round(b.width()/c.slices);if(e==c.slices-1){b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:b.width()-f*e+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}else{b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:f+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}}};var n=function(b,c,d){var e=Math.round(b.width()/c.boxCols);var f=Math.round(b.height()/c.boxRows);for(var g=0;g<c.boxRows;g++){for(var h=0;h<c.boxCols;h++){if(h==c.boxCols-1){b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:b.width()-e*h+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}else{b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:e+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}}}};var o=function(b,c,d,e){var f=b.data("nivo:vars");if(f&&f.currentSlide==f.totalSlides-1){d.lastSlide.call(this)}if((!f||f.stop)&&!e)return false;d.beforeChange.call(this);if(!e){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}else{if(e=="prev"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}if(e=="next"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}}f.currentSlide++;if(f.currentSlide==f.totalSlides){f.currentSlide=0;d.slideshowEnd.call(this)}if(f.currentSlide<0)f.currentSlide=f.totalSlides-1;if(a(c[f.currentSlide]).is("img")){f.currentImage=a(c[f.currentSlide])}else{f.currentImage=a(c[f.currentSlide]).find("img:first")}if(d.controlNav){a(".nivo-controlNav a",b).removeClass("active");a(".nivo-controlNav a:eq("+f.currentSlide+")",b).addClass("active")}h(d);a(".nivo-slice",b).remove();a(".nivo-box",b).remove();var g=d.effect;if(d.effect=="random"){var i=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");g=i[Math.floor(Math.random()*(i.length+1))];if(g==undefined)g="fade"}if(d.effect.indexOf(",")!=-1){var i=d.effect.split(",");g=i[Math.floor(Math.random()*i.length)];if(g==undefined)g="fade"}if(f.currentImage.attr("data-transition")){g=f.currentImage.attr("data-transition")}f.running=true;if(g=="sliceDown"||g=="sliceDownRight"||g=="sliceDownLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({top:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUp"||g=="sliceUpRight"||g=="sliceUpLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceUpLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({bottom:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUpDown"||g=="sliceUpDownRight"||g=="sliceUpDownLeft"){m(b,d,f);var j=0;var k=0;var o=0;var l=a(".nivo-slice",b);if(g=="sliceUpDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);if(k==0){c.css("top","0px");k++}else{c.css("bottom","0px");k=0}if(o==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;o++})}else if(g=="fold"){m(b,d,f);var j=0;var k=0;a(".nivo-slice",b).each(function(){var c=a(this);var e=c.width();c.css({top:"0px",height:"100%",width:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="fade"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:b.width()+"px"});q.animate({opacity:"1.0"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInRight"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInLeft"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}else if(g=="boxRandom"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var s=p(a(".nivo-box",b));s.each(function(){var c=a(this);if(k==r-1){setTimeout(function(){c.animate({opacity:"1"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({opacity:"1"},d.animSpeed)},100+j)}j+=20;k++})}else if(g=="boxRain"||g=="boxRainReverse"||g=="boxRainGrow"||g=="boxRainGrowReverse"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var t=0;var u=0;var v=new Array;v[t]=new Array;var s=a(".nivo-box",b);if(g=="boxRainReverse"||g=="boxRainGrowReverse"){s=a(".nivo-box",b)._reverse()}s.each(function(){v[t][u]=a(this);u++;if(u==d.boxCols){t++;u=0;v[t]=new Array}});for(var w=0;w<d.boxCols*2;w++){var x=w;for(var y=0;y<d.boxRows;y++){if(x>=0&&x<d.boxCols){(function(c,e,f,h,i){var j=a(v[c][e]);var k=j.width();var l=j.height();if(g=="boxRainGrow"||g=="boxRainGrowReverse"){j.width(0).height(0)}if(h==i-1){setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3,"",function(){b.trigger("nivo:animFinished")})},100+f)}else{setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3)},100+f)}})(y,x,j,k,r);k++}x--}j+=100}}};var p=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a};var q=function(a){if(this.console&&typeof console.log!="undefined")console.log(a)};this.stop=function(){if(!a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=true;q("Stop Slider")}};this.start=function(){if(a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=false;q("Start Slider")}};d.afterLoad.call(this);return this};a.fn.nivoSlider=function(c){return this.each(function(d,e){var f=a(this);if(f.data("nivoslider"))return f.data("nivoslider");var g=new b(this,c);f.data("nivoslider",g)})};a.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:".jpg",controlNavThumbsReplace:"_thumb.jpg",keyboardNav:true,pauseOnHover:true,manualAdvance:false,captionOpacity:.8,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;
/*
------------------------------------------------------------
    Peak for Drupal 7.x - Version 1.1                           
    Copyright (C) 2012 esors.com All Rights Reserved.           
    @license - Copyrighted Commercial Software                   
------------------------------------------------------------
    Theme Name: Peak                                            
    Author: ESORS                                           
    Date: 25th July 2012                                        
    Website: http://www.esors.com/                              
------------------------------------------------------------
    This file may not be redistributed in whole or   
    significant part.                                            
------------------------------------------------------------*/    

jQuery(function () {
	jQuery('#showcase img').hide();		
});

jQuery(window).bind("load", function() {
	jQuery('#showcase .kwicks img:hidden').fadeIn(800);
	jQuery('#showcase .short-description').css({ display: 'inline'});
	jQuery('#showcase .description').css({ display: 'inline'});
});

jQuery(window).load(function() {
  jQuery('#slider').nivoSlider( {
    effect: 'boxRandom',
    animSpeed: 600, // Slide transition speed
    pauseTime: 9000, // How long each slide will show
    startSlide: 0,
    directionNav: false,
    captionOpacity: 0.8,
    customChange: function(){
      Cufon.replace('.nivo-caption h3');
    }
  });
});

(function(jQuery) {
  jQuery().ready(function() {

    jQuery('ul.accordion .content').hide();
	jQuery('ul.accordion .first .content').show();
    jQuery('ul.accordion .first h3 a').addClass('selected');

    jQuery('ul.accordion h3 a').click(function(){
      if (jQuery(this).hasClass('selected')) {
        jQuery(this).removeClass('selected');
        jQuery(this).parent().next().slideUp();
      } else {
        jQuery('ul.accordion h3 a').removeClass('selected');
        jQuery(this).addClass('selected');
        jQuery('ul.accordion .content').slideUp();
        jQuery(this).parent().next().slideDown();
      }
      return false;
    });

	jQuery("ul.menu").superfish({ 
      delay: 1000,
      animation: {opacity:'show',height:'show'},
      speed: 'slow',
      autoArrows: false,
      dropShadows: false
    });

	jQuery('.kwicks').kwicks({
	  max: 480,	  //480 for five slides, 595 for four slides, 710 for three slides
	  spacing: 0
	});

	jQuery('.kwicks li').hover(function() {
	  jQuery(".short-description", this).stop().animate({top:'310px'},{queue:false,duration:250});
	  jQuery(".description", this).stop().animate({top:'200px'},{queue:false,duration:250});
	},function(){
	  jQuery(".short-description", this).stop().animate({top:'255px'},{queue:false,duration:250});
	  jQuery(".description", this).stop().animate({top:'265px'},{queue:false,duration:250});
	});	

  });

})(jQuery);;
;
﻿// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------

(function($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);
        
        if (opt.operaSupport && $.browser.opera) 
        { 
            var tab = window.open("","jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else 
        {
            var $iframe = $("<iframe  />");
        
            if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }
        
        if (opt.importCSS)
        {
            if ($("link[media=print]").length > 0) 
            {
                $("link[media=print]").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else 
            {
                $("link").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }
        
        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each( function() { doc.write($(this).html()); }); }
        
        doc.close();
        
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
        setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    }
    
    $.fn.jqprint.defaults = {
		debug: false,
		importCSS: true, 
		printContainer: true,
		operaSupport: true
	};

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    } 
})(jQuery);;
