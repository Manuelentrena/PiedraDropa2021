/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},i=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${i}--\x3e`,s=new RegExp(`${i}|${r}`),n="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const r=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let p=0,h=-1,u=0;const{strings:m,values:{length:g}}=e;for(;u<g;){const e=l.nextNode();if(null!==e){if(h++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let r=0;for(let e=0;e<i;e++)a(t[e].name,n)&&r++;for(;r-- >0;){const t=m[u],i=c.exec(t)[2],r=i.toLowerCase()+n,o=e.getAttribute(r);e.removeAttribute(r);const a=o.split(s);this.parts.push({type:"attribute",index:h,name:i,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const i=e.parentNode,o=t.split(s),l=o.length-1;for(let t=0;t<l;t++){let r,s=o[t];if(""===s)r=d();else{const e=c.exec(s);null!==e&&a(e[2],n)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-n.length)+e[3]),r=document.createTextNode(s)}i.insertBefore(r,e),this.parts.push({type:"node",index:++h})}""===o[l]?(i.insertBefore(d(),e),r.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&h!==p||(h++,t.insertBefore(d(),e)),p=h,this.parts.push({type:"node",index:h}),null===e.nextSibling?e.data="":(r.push(e),h--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of r)e.parentNode.removeChild(e)}}const a=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:i},parts:r}=e,s=document.createTreeWalker(i,133,null,!1);let n=u(r),o=r[n],a=-1,l=0;const d=[];let c=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,n=u(r,n),o=r[n]}d.forEach((e=>e.parentNode.removeChild(e)))}const h=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},u=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(l(t))return i}return-1},m=new WeakMap,g=e=>"function"==typeof e&&m.has(e),_={},f={};class v{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],r=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,d=s.nextNode();for(;o<r.length;)if(n=r[o],l(n)){for(;a<n.index;)a++,"TEMPLATE"===d.nodeName&&(i.push(d),s.currentNode=d.content),null===(d=s.nextNode())&&(s.currentNode=i.pop(),d=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${i} `;class w{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===e.indexOf("--\x3e",a+1);const l=c.exec(e);t+=null===l?e+(s?b:r):e.substr(0,l.index)+l[1]+l[2]+n+l[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==y&&(t=y.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new A(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let s=0;s<t;s++){r+=e[s];const t=i[s];if(void 0!==t){const e=t.value;if(S(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||S(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const i=new v(t,e.processor,this.options),r=i._clone();i.update(e.values),this.__commitNode(r),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,r=0;for(const s of e)i=t[r],void 0===i&&(i=new N(this.options),t.push(i),0===r?i.appendIntoPart(this):i.insertAfterPart(t[r-1])),i.setValue(s),i.commit(),r++;r<t.length&&(t.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class ${constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class C extends E{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends A{}let D=!1;(()=>{try{const e={get capture(){return D=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class k{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(D?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function R(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const s=e.strings.join(i);return r=t.keyString.get(s),void 0===r&&(r=new o(e,e.getTemplateElement()),t.keyString.set(s,r)),t.stringsArray.set(e.strings,r),r}const O=new Map,V=new WeakMap,U=new class{handleAttributeExpressions(e,t,i,r){const s=t[0];return"."===s?new C(e,t.slice(1),i).parts:"@"===s?[new k(e,t.slice(1),r.eventContext)]:"?"===s?[new $(e,t.slice(1),i)]:new E(e,t,i).parts}handleTextExpression(e){return new N(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(e,...t)=>new w(e,t,"html",U),M=(e,t)=>`${e}--${t}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),z=!1);const F=e=>t=>{const r=M(t.type,e);let s=O.get(r);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},O.set(r,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(i);if(n=s.keyString.get(a),void 0===n){const i=t.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(i,e),n=new o(t,i),s.keyString.set(a,n)}return s.stringsArray.set(t.strings,n),n},L=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},j=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:j};class G extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const r=this._attributeNameForProperty(i,t);void 0!==r&&(this._attributeToPropertyMap.set(r,i),e.push(r))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||q}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=j){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,r=t.converter||H,s="function"==typeof r?r:r.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,r=t.converter;return(r&&r.toAttribute||H.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=q){const r=this.constructor,s=r._attributeNameForProperty(e,i);if(void 0!==s){const e=r._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(void 0!==r){const e=i.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let r=!0;if(void 0!==e){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}G.finalized=!0;const W=Element.prototype;W.msMatchesSelector||W.webkitMatchesSelector;const Y=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol();class J{constructor(e,t){if(t!==Z)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(Y?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(e,...t)=>{const i=t.reduce(((t,i,r)=>t+(e=>{if(e instanceof J)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[r+1]),e[0]);return new J(i,Z)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const K={};class Q extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),r=[];i.forEach((e=>r.unshift(e))),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!Y){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new J(String(t),Z)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Y?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==K&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return K}}Q.finalized=!0,Q.render=(e,i,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const s=r.scopeName,n=V.has(i),o=z&&11===i.nodeType&&!!i.host,a=o&&!B.has(s),l=a?document.createDocumentFragment():i;if(((e,i,r)=>{let s=V.get(i);void 0===s&&(t(i,i.firstChild),V.set(i,s=new N(Object.assign({templateFactory:R},r))),s.appendInto(i)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:F(s)},r)),a){const e=V.get(l);V.delete(l);((e,t,i)=>{B.add(e);const r=i?i.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(r,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=s[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{L.forEach((t=>{const i=O.get(M(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),p(e,i)}))}))})(e);const a=r.content;i?function(e,t,i=null){const{element:{content:r},parts:s}=e;if(null==i)return void r.appendChild(t);const n=document.createTreeWalker(r,133,null,!1);let o=u(s),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===i&&(a=h(t),i.parentNode.insertBefore(t,i));-1!==o&&s[o].index===l;){if(a>0){for(;-1!==o;)s[o].index+=a,o=u(s,o);return}o=u(s,o)}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),p(i,e)}})(s,l,e.value instanceof v?e.value.template:void 0),t(i,i.firstChild),i.appendChild(l),V.set(i,e)}!n&&o&&window.ShadyCSS.styleElement(i.host)};const ee=X`#ffffff`,te=X`#707070`,ie=X`#3B3B3D`,re=X`#1a1a1c`,se=X`#949496`,ne=(X`#CECFD0`,X`#DFDFDF`),oe=X`#FF6F00`,ae=X`#FF9747`,le=X`#CDB430`,de=X`#47BF6D`,ce=X`#A02C32`,pe=X`#cc0001`,he=X`#2C7ECE`,ue=X`65px`,me=X`70px`,ge=X`

  /* HEADER */

  .menu {
    background-color: ${ie};
    position: fixed;
    z-index: 2;
    width: 100%;
  }

  /* HEADER  LOGO */

  .menu__nav{
    display: flex;
    justify-content: space-between;
    min-height: ${ue};
    padding: 0 14rem;
  }

  .menu__picture{
    display: flex;
    align-items: center;
  }

  .menu__logo{
    width: 100%;
    height: auto;
  }

  /* HEADER  NAV */

  .menu__ul{
    display: flex;
    margin: 0;
    padding: 0;
    min-height: ${ue};
  }

  .menu__ul li{
    display: flex;
    align-items: center;
    list-style: none;
    min-height: ${ue};
  }

  .menu__ul li a{
    text-decoration: none;
    color: ${ee};
    font-family: Gruppo-Regular;
    font-weight: bold;
    font-size: 2rem;
    padding: 2rem 2rem;
    transition: 1s;
    min-height: ${ue};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu__ul li a:hover{
    background-color: ${oe};
    color: ${ie};
    transition: 1s;
  }

  /* HEADER  BURGUER */

  .menu-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${me};
    height: ${me};
    cursor: pointer;
    transition: all .5s ease-in-out;
    background-color: ${ie};
  }

  .menu-btn__burger {
    width: 4rem;
    height: 0.4rem;
    background: ${ee};
    border-radius: 0.5rem;
    transition: all .5s ease-in-out;
  }

  .menu-btn__burger::before,
  .menu-btn__burger::after {
    content: '';
    position: absolute;
    width: 4rem;
    height: 0.4rem;
    background: ${ee};
    border-radius: 0.5rem;
    transition: all .5s ease-in-out;
  }

  .menu-btn__burger::before {
    transform: translateY(-1.4rem);
  }

  .menu-btn__burger::after {
    transform: translateY(1.4rem);
  }

  /* ANIMATION  HEADER  BURGUER */

  .menu-btn.open .menu-btn__burger {
    transform: translateX(-5rem);
    background: transparent;
    box-shadow: none;
  }
  .menu-btn.open .menu-btn__burger::before {
    transform: rotate(45deg) translate(3.5rem, -3.5rem);
    background: ${ie};
  }
  .menu-btn.open .menu-btn__burger::after {
    transform: rotate(-45deg) translate(3.5rem, 3.5rem);
    background: ${ie};
  }

  .menu-btn.open {
    background: ${oe};
  }

  /* MEDIA QUERY  HEADER */

  @media (min-width: 768px) {
    .menu-btn {
      display: none;
    }
  }

  @media (max-width: 768px) {

    .menu__ul {
      display: none;
    }

    .menu-btn {
      margin-left: 2rem;
      min-width: 5rem;
    }

    .menu__nav{
      padding: 0 3.5rem;
    }

    /* HEADER  OPEN_NAV */

    .openNav{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding-top: 13vh;
      height: 100vh;
      display: flex;
      flex-direction: column;
      text-align: center;
      background-color: ${oe};
    }
    .openNav li a{
      color: ${ie};
      width: 100vw;

    }
    .openNav li a:hover{
      color: ${ee};
      background-color: ${ie};
    }

  }

  /* LINEA DE COLORES DEL HEADER */

  .header__colors{
    display: flex;
  }
  .header__colors div:nth-child(n) {
    width: 25%;
    height: 0.5rem;
  }
  .header__colors div:nth-child(1) {
    background-color: ${he};
  }
  .header__colors div:nth-child(2) {
    background-color: ${le};
  }
  .header__colors div:nth-child(3) {
    background-color: ${de};
  }
  .header__colors div:nth-child(4) {
    background-color: ${ce};
  }
`;customElements.define("pd-header",class extends Q{static get properties(){return{src:{type:String}}}static get styles(){return[ge]}render(){return I`
      <header class="menu">
        <nav class="menu__nav">
          <div class="menu__picture">
            <a href="index.html"
              ><img
                class="menu__logo"
                src="${this.src}"
                alt="Logo Piedra Dropa"
            /></a>
          </div>

          <ul class="menu__ul">
            <li><a href="discos.html">DISCOS</a></li>
            <li><a href="tour.html">TOUR</a></li>
            <li><a href="miembros.html">MIEMBROS</a></li>
            <li><a href="contacto.html">CONTACTO</a></li>
          </ul>

          <div class="menu-btn" @click="${this._handleClickBurguer}">
            <div class="menu-btn__burger"></div>
          </div>
        </nav>

        <div class="header__colors">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
    `}_handleClickBurguer(){const e=this.shadowRoot.childNodes[2].childNodes[1];e.childNodes[5].classList.toggle("open"),e.childNodes[3].classList.toggle("openNav")}});const _e=X`

  .principal {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    position: relative;
    z-index: 0;
  }

  .principal picture{
    display: flex;
    align-items: flex-end;
  }

  .principal__img{
    width: 99vw;
    min-height: auto;
  }

  @media (max-width: 500px) {
    .principal__img{
      width: 100%;
      min-height: auto;
    }
  }

   /* LINEA DE COLORES DEL HEADER */

  .principal__colors{
    position: absolute;
    width: 100%;
    display: flex;
  } 

  .principal__colors div:nth-child(n) {
    width: 25%;
    height: 27vh;
    opacity: 0.5;
    margin-bottom: 7%;
    z-index:1;
  }

  .principal__colors div:nth-child(1) {
    background-color: ${he};
  }

  .principal__colors div:nth-child(2) {
    background-color: ${le};
  }

  .principal__colors div:nth-child(3) {
    background-color: ${de};
  }

  .principal__colors div:nth-child(4) {
    background-color: ${ce};
  }

  .principal__banner{
    position: absolute;
    z-index: 3;
    width: 100%;
    text-align: center;
    height: 27vh;
    margin-bottom: 7%;
    color: ${ee};
  }

  @media (max-width: 1100px) {
    .principal__banner {
      position: absolute;
      top: 20%;
      color: ${ie};
      
    }

    .principal__button{
      color: ${ee};
    }
    
    .principal__colors div:nth-child(n){
      height: 20vh;
    }
  }

  .principal__subTitle{
    font-family: Leelawadee_UI;
    font-weight: normal;
    font-size: 3rem;
    letter-spacing: 0.8rem;
    margin: 2% 0 0 0;
  }

  .principal__title{
    font-family: Kodchasan-Bold;
    font-weight: bold;
    font-size: 4.5rem;
    letter-spacing: 1rem;
    margin: 0;
  }

  @media (max-width: 500px) {
    .principal__subTitle{
      font-size: 2rem;
    }
    .principal__title{
      font-size: 3.6rem;
    }
    .principal__colors div:nth-child(n){
      height: 10vh;
    }
  }

  .principal__button{
    display: flex;
    width: fit-content;
    font: 2.5rem Leelawadee_UI;
    margin: 3rem auto;
    border: ${oe} solid 0.3rem;
    background-color: ${oe};
    padding: 1.2rem 2rem;
    vertical-align: middle;
    text-decoration: none;
    color: ${ee};
  }

  .principal__button:hover{
    background-color: ${ae};
    border-color: ${ae};
    cursor: pointer;
  }

  .principal__svg{
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
  }

`;customElements.define("pd-principal",class extends Q{static get properties(){return{img:{type:String},img_mobil:{type:String},title:{type:String},text_button:{type:String},sub_title:{type:String}}}static get styles(){return[_e]}render(){return I`
      <section class="principal">

        <div class="principal__banner">
          <h2 class="principal__subTitle">${this.sub_title}</h2>
          
          <h1 class="principal__title">${this.title}</h1>

          <a class="principal__button" href="https://open.spotify.com/album/0FFPaKzuR206opMME8DHAQ?si=K-l-rnH2Qv2V1b_q-tlktA">
            <svg 
              class="principal__svg" 
              fill="currentColor" 
              viewBox="0 0 20 20">
              <path 
                fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                clip-rule="evenodd">
              </path>
            </svg>
            <span>${this.text_button}</span>
          </a>
        </div>

        <picture>
          <source srcset="${this.img_mobil}" media="(max-width: 768px)">
          <source srcset="${this.img}">
          <img class="principal__img" srcset="${this.img}" alt="Piedra Dropa">
        </picture>

        

        <div class="principal__colors">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

      </section>
    `}});const fe=X`
  .ultimoDisco{
    display: flex;
    padding: 13.4rem 14rem 13.4rem 14rem;
    background-color: ${ne};
  }

  .ultimoDisco__wrapper{
    width: 50%;  
  }

  .ultimoDisco__wrapper2{
    width: 47%;
    padding-left: 4rem;
    padding-top: 3vh;
  }

  @media (max-width: 1100px) {
    .ultimoDisco{
      flex-direction: column;
      padding: 8rem 14rem 8rem 14rem;
    }
    .ultimoDisco__wrapper{
      width: 100%;
      margin-bottom: 6rem;  
    }
    .ultimoDisco__wrapper2{
      padding: 0;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .ultimoDisco{
      padding: 7rem 3.5rem 7rem 3.5rem;
    }
    .ultimoDisco__wrapper{
      margin-bottom: 3.5rem;  
    }
  }

  .ultimoDisco__img{
    max-width: 100%;
    max-height: auto;
  }

  .ultimoDisco__text{
    font: normal 2.5rem Leelawadee_UI;
    color: ${ie};
    margin: 3.5rem 0;
  }

  @media (max-width: 1300px) {
    .ultimoDisco__text{
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .ultimoDisco__text{
      font-size: 1.8rem;
    }
  }

  .ultimoDisco__text span{
    color: ${oe};
    font-weight: bold;
  }

  .ultimoDisco__list{
    font: bold 3.5rem Kodchasan-Bold;
    padding-left: 0;
    list-style: none;
    margin-bottom: 4rem;
  }

  @media (max-width: 1300px) {
    .ultimoDisco__list{
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .ultimoDisco__list{
      font-size: 2.2rem;
      margin-bottom: 3.5rem;
    }
  }
`;customElements.define("pd-disco",class extends Q{static get properties(){return{img:{type:String},nombreDisco:{type:String}}}static get styles(){return[fe]}render(){return I`
      <div class="ultimoDisco">
        <div class="ultimoDisco__wrapper">
          <img
            class="ultimoDisco__img"
            src="${this.img}"
            alt="${this.nombreDisco}"
          />
        </div>
        <div class="ultimoDisco__wrapper2">
          <pd-spotify id="1RWK46iGbVOd2TNucGHMWY" mode="light"></pd-spotify>
          <p class="ultimoDisco__text">
            PRODUCIDO POR PIEDRA DROPA. GRABADO EN
            <span>20000 LEGUAS STUDIO</span> DURANTE LOS MESES DE MARZO, JULIO Y
            AGOSTO DE 2020. MEZCLADO Y MASTERIZADO EN 20000 LEGUAS STUDIO. TODAS
            LAS CANCIONES COMPUESTAS POR PIEDRA DROPA. PRESENTADO EN VIVO,
            <span>TEATRO GARNELO</span> 26 DE DICIEMBRE 2020.
          </p>
          <ul class="ultimoDisco__list">
            <li>1. VIDAS PARALERAS</li>
            <li>2. ME DICEN</li>
            <li>3. CÁPITAN DE LAS ESTRELLAS</li>
            <li>4. TÓXICA RELACIÓN</li>
            <li>5. HABITACIÓN 203</li>
            <li>6. FEBRERO</li>
          </ul>
          <pd-boton text="COMPRAR ÁLBUM" link="contacto.html"></pd-boton>
        </div>
      </div>
    `}}),customElements.define("pd-spotify",class extends Q{static get properties(){return{id:{type:String},mode:{type:String}}}render(){return I`
      <iframe 
        src="https://open.spotify.com/follow/1/?uri=spotify:artist:${this.id}&size=detail&theme=${this.mode}" 
        width="300" 
        height="56" 
        scrolling="no" 
        frameborder="0" 
        style="border:none; 
        overflow:hidden;" 
        allowtransparency="true">
      </iframe>
    `}});const ve=X`
  .button{
    display: flex;
    justify-content: center;
    width: fit-content;
    font: 2.5rem Leelawadee_UI;
    border: ${oe} solid 0.3rem;
    background-color: ${oe};
    padding: 1.2rem 2rem;
    color: ${ee};
    text-decoration: none;
  }

  .button:hover{
    background-color: ${ae};
    border-color: ${ae};
    cursor: pointer;
  }
`;customElements.define("pd-boton",class extends Q{static get properties(){return{text:{type:String},widthFull:{type:Number},secundary:{type:Number},link:{type:String}}}static get styles(){return[ve]}render(){return I`
      <style>
        :host a{
          width: ${this.widthFull?"auto":"fit-content"};
          background-color: ${this.secundary?"transparent":null};
          
        }
        :host a:hover{
          background-color: ${this.secundary?oe:null};
          border-color: ${this.secundary?oe:null};
        }
        :host a span{
          color: ${this.secundary?oe:null};
          font-weight: ${this.secundary?"bold":"normal"};
        }
        :host a:hover span{
          color: ${this.secundary?ee:null};
        }   
      </style>
      <a class="button" href="${this.link}">
        <span>${this.text}</span>
      </a>
    `}});const ye=X`
  .febrero__wrapper2 {
    position: relative;
    width: 100%;
    height: 105rem;
    background-image: url("https://res.cloudinary.com/manuelentrena/image/upload/v1611159980/PiedraDropa2021/Febrero_anwdsp.jpg");
    background-image: no-repeat;
    background-position: 34%;
    background-size: auto 100%;
  }

  @media (max-width: 768px) {
    .febrero__wrapper2 {
      position: static;
    }
    .febrero {
      position: relative;
    }
  }

  .febrero__container {
    position: absolute;
    align-items: right;
    top: 24rem;
    bottom: 24rem;
    right: 14rem;
    left: 14rem;
    text-align: right;
  }

  @media (max-width: 768px) {
    .febrero__wrapper {
      position: relative;
      background-color: ${re};
      width: 100%;
      height: 50rem;
    }
    .febrero__container {
      top: 8rem;
      right: 3rem;
      left: 3rem;
    }
  }

  .febrero__container h2 {
    font: bold 6rem Kodchasan-Bold;
    color: ${ee};
    margin: 0;
  }

  .febrero__container p {
    font: normal 2rem Leelawadee_UI;
    color: ${ee};
    margin: 0 0 4rem 0;
  }

  @media (max-width: 768px) {
    .febrero__container h2 {
      font-size: 4rem;
    }

    .febrero__container p {
      font-size: 1.3rem;
    }
  }

  .febrero__img {
    width: 100%;
    height: auto;
  }
`;customElements.define("pd-febrero",class extends Q{static get properties(){return{title:{type:String},sub_title:{type:String}}}static get styles(){return[ye]}render(){return I`
      
      <div class="febrero">
        <div class="febrero__wrapper">
        </div>
        <div class="febrero__wrapper2">

          <div class="febrero__container">
            <pd-youtubesubscriber 
              text="PIEDRA DROPA TV" 
              href="https://www.youtube.com/channel/UCmqlYSuuegtDxH257XqXOzA">
            </pd-youtubesubscriber>

            <h2>${this.title}</h2>

            <p>${this.sub_title}</p>

            <pd-youtubevideo id="Ix0RyJTMj2Y"></pd-youtubevideo>

          </div>

        </div>
      </div>
      
    `}});const be=X`
  .button{
    display: flex;
    align-items:center;
    width: fit-content;
    font: bold 1rem Leelawadee_UI;
    border: ${pe} solid 0.3rem;
    background-color: ${pe};
    padding: 0.1rem 1rem;
    color: ${ee};
    text-decoration: none;
    border-radius: 0.5rem;
    fill:${ee};
    margin: 0 0 0 auto;
  }

  .button:hover{
    background-color: ${pe};
    border-color: ${pe};
    cursor: pointer;
  }

  .button__svg{
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }
`;customElements.define("pd-youtubesubscriber",class extends Q{static get properties(){return{href:{type:String},text:{type:String}}}static get styles(){return[be]}render(){return I`
      <a class="button" href="${this.href}">
        <svg class="button__svg" viewBox="0 0 96.9 96.9">
          <path d="M95.2,25.5c-1.2-5.2-5.4-9-10.5-9.5c-12-1.3-24.2-1.3-36.3-1.3c-12.1,0-24.3,0-36.3,1.3
            c-5.1,0.6-9.3,4.4-10.5,9.5C0,32.9,0,40.9,0,48.4S0,64,1.7,71.3c1.2,5.2,5.4,9,10.5,9.5c12,1.3,24.2,1.3,36.3,1.3
            c12.1,0,24.3,0,36.3-1.3c5.1-0.6,9.3-4.4,10.5-9.5c1.7-7.3,1.7-15.3,1.7-22.9C96.9,40.9,96.9,32.9,95.2,25.5z M35.9,63.5
            c0-10.7,0-21.3,0-32c10.3,5.4,20.5,10.7,30.8,16.1C56.4,52.8,46.2,58.1,35.9,63.5z"/>
        </svg>
        <span>${this.text}</span>
      </a>
    `}});const we=X`
  .video {
    max-width: 67.4rem; 
    width: 100%;
    height: 37.5rem;
  }

  @media (max-width: 500px) {
    .video{
      height: 20rem;
    }
  }

`;customElements.define("pd-youtubevideo",class extends Q{static get properties(){return{id:{type:String}}}static get styles(){return[we]}render(){return I`
      <iframe
        class="video"
        src="https://www.youtube.com/embed/${this.id}"
        frameborder="0"
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture"
        allowfullscreen
      >
      </iframe>
    `}});const Se=X`
  .colores{
    display: flex;
  }
  .colores div:nth-child(n) {
    width: 25%;
    height: 3.5rem;
  }
  .colores div:nth-child(1) {
    background-color: ${he};
  }
  .colores div:nth-child(2) {
    background-color: ${le};
  }
  .colores div:nth-child(3) {
    background-color: ${de};
  }
  .colores div:nth-child(4) {
    background-color: ${ce};
  }
`;customElements.define("pd-separator",class extends Q{static get styles(){return[Se]}render(){return I`
      <div class="colores">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      
    `}});const xe=X`

  .videos{
    background-color: ${ne};
    padding-top: 8rem;
    text-align: center;
  }

  .videos div h2{
    font: bold 4.5rem Leelawadee_UI;
  }
  .container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-gap: 8rem;
    padding: 4rem 14rem 8rem;
    text-align: center;
  }

  .container p{
    font:normal 3rem Kodchasan-Bold;
    color: ${ie};
  }

  @media (max-width: 768px) {
    .container{
      padding: 4rem 3rem 4rem;
      grid-gap: 0rem;
    }
    .videos{
      padding-top: 4rem;
    }
  }

  @media (max-width: 500px) {
    .container{
      grid-template-columns: repeat(auto-fill, minmax(279px, 1fr));
      padding: 4rem 3rem 6rem;
    }
    .container p{
      font-size: 1.8rem;
      margin: 4rem auto;
    }
    .videos div h2{
      font-size: 2.4rem;
    }
  }

`;customElements.define("pd-videos",class extends Q{static get properties(){return{title:{type:String},listVideos:{type:Object}}}static get styles(){return[xe]}render(){return I`
      <div class="videos" >
        <div>
          <h2>${this.title}</h2>
        </div>
        <div class="container">
          ${Object.keys(this.listVideos).map((e=>I`
              <div> 
                <pd-youtubevideo id=${this.listVideos[e]}></pd-youtubevideo>
                <p> ${e.toUpperCase()} </p> 
              </div>
            `))}
        </div>
      </div>
    `}});const Ee=X`
  .instagram {
    width: 100%;
    height: 34.5rem;
    background-color: ${ne};
    background-image: url("https://res.cloudinary.com/manuelentrena/image/upload/v1611159981/PiedraDropa2021/city_hsh1qu.jpg");
    background-image: no-repeat;
    background-position: center;
    background-size: auto 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .instagram img {
    width: 8rem;
    height: auto;
    margin-top: 6rem;
  }

  .instagram svg {
    width: 3rem;
    height: 3rem;
    margin-top: 2rem;
  }

  .instagram svg path {
    fill: ${ie};
    width: 3rem;
    height: 3rem;
  }

  .instagram p {
    font: bold 1.7rem Gruppo-Regular;
    color: ${ie};

    margin: 0.5rem;
  }

  .instagram a {
    text-decoration: none;
  }

  .instagram a:hover {
    cursor: pointer;
  }
`;customElements.define("pd-instagram",class extends Q{static get properties(){return{instagram:{type:String}}}static get styles(){return[Ee]}render(){return I`
      <div class="instagram">
        <img src="https://lh3.googleusercontent.com/AfShe6xGHfLdj4uZtvarREdg7VVzL-9vXcaiy1eYaRIZTdZ945YzI8c3b1kYh1wURmVHDWvnsyfjq3i1fgpbXe14YZSZ14g0J4o09Bxbqs3wgLQjhVDDi5FOpNDz63o3cxQoRpc0rqkVE1Cf2hEy23xYiHNDazcdt3vWVByVDMl-_-8waHZhtdMslC0TJ-qaCf9k2K4kaJqsB4Qm5dHdTk-I4Bg3WaDWAyp6haTRT68vQIitioGljxMFXAkrf4laDpgRHKiXKpTuRD394F2Q_bw_p9Z34bpDZ_UYTo_5XYjn19lCaxm3UYO90Gvg78cfj6Wa0DAmHH4527Q8CoAduNqaW06-iebsLKxVJwZI3hE1Fq_ZRCGk2rGLMJmtZx2eN1fgMDsM1sNB6NX40gXhPgSNCR1YXMu0Snv9NAdx3cxt0u30d9g-YDgXeqndASnjRuHhEbJ-E9cTlvGI9zVU_geEgcnYUCfzN5tyN5N8hfzHK_4aL9IZGbzEr0shZxFYgIJM11XO_BVeFfhTnztpEVltTpX4HzvjuA_eOG7enmyLwtCG-Chc4dvHsTgmU680eF0SZ7p28xs_oGVlX_CudZpDJ6bpJfn7fdtwASMC2ulWa8BjSz4ODG-fTAtIDYNoGcL6brV6BZ-gMdc7HfkbsGvfN_zci3cL6-vJQW6_PV-WoGHFSxquEP_LIjhA=w298-h454-no?authuser=0" 
        alt="logo Piedra Dropa">
        <a href="https://www.instagram.com/piedradropaoficial/">
          <svg viewBox="0 0 511 511.9">
          <path d="m510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/><path d="m423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
          </svg>
          <p>${this.instagram.toUpperCase()}</p>
        </a>
      </div>
    `}});const Ae=X`
  .footer {
    background-color: ${se};
    width: 100%;
    background-image: url("resource/svg/textura2.svg");
  }

  .footer__social {
    max-width: 30rem;
    margin: 0 auto;
    padding: 6rem 0rem;
  }

  .footer__social img {
    width: 100%;
    height: auto;
  }

  .logos {
    text-align: center;
    margin: 2rem 0 0 0;
  }

  .logos a {
    display: inline-block;
    background-color: ${ie};
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    margin: 0 0.5rem;
  }

  .logos a:hover {
    cursor: pointer;
    background-color: ${oe};
  }

  .logos img {
    max-width: 2.5rem;
    max-height: 2.5rem;
    padding: 1rem;
  }

  .autor {
    background-color: ${ie};
    border: 0.3rem solid ${te};
    text-align: center;
    padding: 2rem;
  }

  .autor p:nth-child(1) {
    font: normal 1rem Leelawadee_UI;
    color: ${ee};
    margin: 0 0 1rem 0;
  }

  .autor a img {
    width: 7rem;
    height: auto;
  }
`;customElements.define("pd-footer",class extends Q{static get properties(){return{src:{type:String},instagram:{type:String},email:{type:String},twitter:{type:String},facebook:{type:String}}}static get styles(){return[Ae]}render(){return I`
      <div class="footer">
        <div class="footer__social">
          <img src="${this.src}" alt="logo piedra dropa" />
          <div class="logos">
            <a href="${this.email}"
              ><img src="resource/svg/correo.svg" alt="email piedra dropa"
            /></a>
            <a href="${this.facebook}"
              ><img src="resource/svg/facebook.svg" alt="facebook piedra dropa"
            /></a>
            <a href="${this.instagram}"
              ><img
                src="resource/svg/instagram.svg"
                alt="instagram piedra dropa"
            /></a>
            <a href="${this.twitter}"
              ><img src="resource/svg/twitter.svg" alt="twitter piedra dropa"
            /></a>
          </div>
        </div>

        <div class="autor">
          <p>WEBSITE DESIGN BY</p>
          <a href="https://www.instagram.com/manuel_entrena/"
            ><img src="resource/svg/logo_ME.svg" alt="logo Manuel Entrena"
          /></a>
        </div>
      </div>
    `}})})();