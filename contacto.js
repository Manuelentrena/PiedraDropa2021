/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},r=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${r}--\x3e`,s=new RegExp(`${r}|${i}`),n="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const i=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,p=-1,u=0;const{strings:m,values:{length:g}}=e;for(;u<g;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let i=0;for(let e=0;e<r;e++)a(t[e].name,n)&&i++;for(;i-- >0;){const t=m[u],r=d.exec(t)[2],i=r.toLowerCase()+n,o=e.getAttribute(i);e.removeAttribute(i);const a=o.split(s);this.parts.push({type:"attribute",index:p,name:r,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const r=e.parentNode,o=t.split(s),l=o.length-1;for(let t=0;t<l;t++){let i,s=o[t];if(""===s)i=c();else{const e=d.exec(s);null!==e&&a(e[2],n)&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-n.length)+e[3]),i=document.createTextNode(s)}r.insertBefore(i,e),this.parts.push({type:"node",index:++p})}""===o[l]?(r.insertBefore(c(),e),i.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&p!==h||(p++,t.insertBefore(c(),e)),h=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(i.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of i)e.parentNode.removeChild(e)}}const a=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:r},parts:i}=e,s=document.createTreeWalker(r,133,null,!1);let n=u(i),o=i[n],a=-1,l=0;const c=[];let d=null;for(;s.nextNode();){a++;const e=s.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,n=u(i,n),o=i[n]}c.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},u=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(l(t))return r}return-1},m=new WeakMap,g=e=>"function"==typeof e&&m.has(e),_={},f={};class y{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),r=[],i=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,c=s.nextNode();for(;o<i.length;)if(n=i[o],l(n)){for(;a<n.index;)a++,"TEMPLATE"===c.nodeName&&(r.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=r.pop(),c=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${r} `;class w{constructor(e,t,r,i){this.strings=e,this.values=t,this.type=r,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===e.indexOf("--\x3e",a+1);const l=d.exec(e);t+=null===l?e+(s?b:i):e.substr(0,l.index)+l[1]+l[2]+n+l[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const S=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class E{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new N(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let i="";for(let s=0;s<t;s++){i+=e[s];const t=r[s];if(void 0!==t){const e=t.value;if(S(e)||!x(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||S(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const r=new y(t,e.processor,this.options),i=r._clone();r.update(e.values),this.__commitNode(i),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,i=0;for(const s of e)r=t[i],void 0===r&&(r=new C(this.options),t.push(r),0===i?r.appendIntoPart(this):r.insertAfterPart(t[i-1])),r.setValue(s),r.commit(),i++;i<t.length&&(t.length=i,this.clear(r&&r.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class T extends E{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends N{}let P=!1;(()=>{try{const e={get capture(){return P=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class R{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=$(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const $=e=>e&&(P?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function M(e){let t=U.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},U.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(r);return i=t.keyString.get(s),void 0===i&&(i=new o(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const U=new Map,V=new WeakMap,F=new class{handleAttributeExpressions(e,t,r,i){const s=t[0];return"."===s?new T(e,t.slice(1),r).parts:"@"===s?[new R(e,t.slice(1),i.eventContext)]:"?"===s?[new k(e,t.slice(1),r)]:new E(e,t,r).parts}handleTextExpression(e){return new C(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const O=(e,...t)=>new w(e,t,"html",F),I=(e,t)=>`${e}--${t}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const B=e=>t=>{const i=I(t.type,e);let s=U.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},U.set(i,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(r);if(n=s.keyString.get(a),void 0===n){const r=t.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(r,e),n=new o(t,r),s.keyString.set(a,n)}return s.stringsArray.set(t.strings,n),n},D=["html","svg"],L=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const H={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},z=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:z};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const i=this._attributeNameForProperty(r,t);void 0!==i&&(this._attributeToPropertyMap.set(i,r),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,r,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdateInternal(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||q}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=z){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,i=t.converter||H,s="function"==typeof i?i:i.fromAttribute;return s?s(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,i=t.converter;return(i&&i.toAttribute||H.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=q){const i=this.constructor,s=i._attributeNameForProperty(e,r);if(void 0!==s){const e=i._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,i=r._attributeToPropertyMap.get(e);if(void 0!==i){const e=r.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let i=!0;if(void 0!==e){const s=this.constructor;r=r||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}W.finalized=!0;const Y=Element.prototype;Y.msMatchesSelector||Y.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol();class Z{constructor(e,t){if(t!==J)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Q=(e,...t)=>{const r=t.reduce(((t,r,i)=>t+(e=>{if(e instanceof Z)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[i+1]),e[0]);return new Z(r,J)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const X={};class K extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),i=[];r.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!G){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Z(String(t),J)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==X&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return X}}K.finalized=!0,K.render=(e,r,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,n=V.has(r),o=j&&11===r.nodeType&&!!r.host,a=o&&!L.has(s),l=a?document.createDocumentFragment():r;if(((e,r,i)=>{let s=V.get(r);void 0===s&&(t(r,r.firstChild),V.set(r,s=new C(Object.assign({templateFactory:M},i))),s.appendInto(r)),s.setValue(e),s.commit()})(e,l,Object.assign({templateFactory:B(s)},i)),a){const e=V.get(l);V.delete(l);((e,t,r)=>{L.add(e);const i=r?r.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=s[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{D.forEach((t=>{const r=U.get(I(t,e));void 0!==r&&r.keyString.forEach((e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{r.add(e)})),h(e,r)}))}))})(e);const a=i.content;r?function(e,t,r=null){const{element:{content:i},parts:s}=e;if(null==r)return void i.appendChild(t);const n=document.createTreeWalker(i,133,null,!1);let o=u(s),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===r&&(a=p(t),r.parentNode.insertBefore(t,r));-1!==o&&s[o].index===l;){if(a>0){for(;-1!==o;)s[o].index+=a,o=u(s,o);return}o=u(s,o)}}(r,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(r){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),h(r,e)}})(s,l,e.value instanceof y?e.value.template:void 0),t(r,r.firstChild),r.appendChild(l),V.set(r,e)}!n&&o&&window.ShadyCSS.styleElement(r.host)};const ee=Q`#ffffff`,te=Q`#707070`,re=Q`#3B3B3D`,ie=(Q`#1a1a1c`,Q`#949496`),se=(Q`#CECFD0`,Q`#DFDFDF`),ne=Q`#FF6F00`,oe=Q`#FF9747`,ae=Q`#CDB430`,le=Q`#47BF6D`,ce=Q`#A02C32`,de=(Q`#cc0001`,Q`#2C7ECE`),he=Q`65px`,pe=Q`70px`,ue=Q`

  /* HEADER */

  .menu {
    background-color: ${re};
    position: fixed;
    z-index: 2;
    width: 100%;
  }

  /* HEADER  LOGO */

  .menu__nav{
    display: flex;
    justify-content: space-between;
    min-height: ${he};
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
    min-height: ${he};
  }

  .menu__ul li{
    display: flex;
    align-items: center;
    list-style: none;
    min-height: ${he};
  }

  .menu__ul li a{
    text-decoration: none;
    color: ${ee};
    font-family: Gruppo-Regular;
    font-weight: bold;
    font-size: 2rem;
    padding: 2rem 2rem;
    transition: 1s;
    min-height: ${he};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu__ul li a:hover{
    background-color: ${ne};
    color: ${re};
    transition: 1s;
  }

  /* HEADER  BURGUER */

  .menu-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${pe};
    height: ${pe};
    cursor: pointer;
    transition: all .5s ease-in-out;
    background-color: ${re};
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
    background: ${re};
  }
  .menu-btn.open .menu-btn__burger::after {
    transform: rotate(-45deg) translate(3.5rem, 3.5rem);
    background: ${re};
  }

  .menu-btn.open {
    background: ${ne};
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
      background-color: ${ne};
    }
    .openNav li a{
      color: ${re};
      width: 100vw;

    }
    .openNav li a:hover{
      color: ${ee};
      background-color: ${re};
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
    background-color: ${de};
  }
  .header__colors div:nth-child(2) {
    background-color: ${ae};
  }
  .header__colors div:nth-child(3) {
    background-color: ${le};
  }
  .header__colors div:nth-child(4) {
    background-color: ${ce};
  }
`;customElements.define("pd-header",class extends K{static get properties(){return{src:{type:String}}}static get styles(){return[ue]}render(){return O`
      <header class="menu">
        <nav class="menu__nav">
          <div class="menu__picture">
            <a href="/index.html"
              ><img
                class="menu__logo"
                src="${this.src}"
                alt="Logo Piedra Dropa"
            /></a>
          </div>

          <ul class="menu__ul">
            <li><a href="/discos.html">DISCOS</a></li>
            <li><a href="/tour.html">TOUR</a></li>
            <li><a href="/miembros.html">MIEMBROS</a></li>
            <li><a href="/contacto.html">CONTACTO</a></li>
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
    `}_handleClickBurguer(){const e=this.shadowRoot.childNodes[2].childNodes[1];e.childNodes[5].classList.toggle("open"),e.childNodes[3].classList.toggle("openNav")}});const me=Q`
  .colores{
    display: flex;
  }
  .colores div:nth-child(n) {
    width: 25%;
    height: 3.5rem;
  }
  .colores div:nth-child(1) {
    background-color: ${de};
  }
  .colores div:nth-child(2) {
    background-color: ${ae};
  }
  .colores div:nth-child(3) {
    background-color: ${le};
  }
  .colores div:nth-child(4) {
    background-color: ${ce};
  }
`;customElements.define("pd-separator",class extends K{static get styles(){return[me]}render(){return O`
      <div class="colores">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      
    `}});const ge=Q`
  .instagram{
    width: 100%;
    height: 34.5rem;
    background-color: ${se};
    background-image: url('https://lh3.googleusercontent.com/-WuvHJpg9ZOTGU6n68kmqy37exBUzhNkiSes74sPw3PmgsPkgyNVUcWdxLkaDx3ehc-mxJYIPMdc8bcFLE4aHO8gWLfVUvAl6tgBOSGyzAddFSNmWWg2mh6Lgk6FIQlCyAtn5NygS_eNvJyqH40tTuyYbIU9rOvUFduKQBcoyGuoskFncqpGXP2BHGCBldg0MNCnExIPJgEnFikGuNYbkQz-SKTWSELSXeSQSvwtopUXV5hSMVok4eVE5w2kllrMqLDYWtA_HfbzyYOjmAznCxW_Q09elbpc9IbBVckx5uqH40wPbuMhcwHbiVmQZRr79w3WDnvh1lC6uyABr022crRIMvOriSKbuk40kwnTP98Y54H2FgYTCMASifcmMDZmL-FzX64hea5VMLPZNyYc55hTh8ohx3EhaJbRvyYIm5AdPZ3KFFwIELdq1hTJ5L5nOo7Bh6k-j4Bjqh23UBghAitE5ovFZR2_h5rPp0kcZaE5urpbkhHTQymNzPhMfkoVO4_yy73xiLc5uoFVii9DCe53FROKcMCR8wUkwAYoXOoDcRrl84Xwii_jjLCcTtXIdEToFBW9h6ckP5YJejsrBT8Fg35rpcfP7Dpm_jfC-eytRTHoJphkZOHw8Fn6cgzSfIfSgp3inBj49lNllf2Wwa-T2pVgNxhBKboORsGkwIbwywVDDUDoAUAlTaEf=w1856-h334-no?authuser=0');
    background-image: no-repeat;
    background-position: center;
    background-size: auto 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .instagram img{
    width: 8rem;
    height: auto;
    margin-top: 6rem;
  }

  .instagram svg {
    width: 3rem;
    height: 3rem;
    margin-top: 2rem;

  }

  .instagram svg path{
    
    fill: ${re};
    width: 3rem;
    height: 3rem;
  }

  .instagram p{
    font: bold 1.7rem Gruppo-Regular;
    color: ${re};

    margin: 0.5rem;
  }

  .instagram a {
    text-decoration: none;
  }

  .instagram a:hover {
    cursor: pointer;
  }

`;customElements.define("pd-instagram",class extends K{static get properties(){return{instagram:{type:String}}}static get styles(){return[ge]}render(){return O`
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
    `}});const _e=Q`
  .footer {
    background-color: ${ie};
    width: 100%;
    background-image: url("/resource/svg/textura2.svg");
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
    background-color: ${re};
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 50%;
    margin: 0 0.5rem;
  }

  .logos a:hover {
    cursor: pointer;
    background-color: ${ne};
  }

  .logos img {
    max-width: 2.5rem;
    max-height: 2.5rem;
    padding: 1rem;
  }

  .autor {
    background-color: ${re};
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
`;customElements.define("pd-footer",class extends K{static get properties(){return{src:{type:String},instagram:{type:String},email:{type:String},twitter:{type:String},facebook:{type:String}}}static get styles(){return[_e]}render(){return O`
      <div class="footer">
        <div class="footer__social">
          <img src="${this.src}" alt="logo piedra dropa" />
          <div class="logos">
            <a href="${this.email}"
              ><img src="/resource/svg/correo.svg" alt="email piedra dropa"
            /></a>
            <a href="${this.facebook}"
              ><img
                src="/resource/svg/facebook.svg"
                alt="facebook piedra dropa"
            /></a>
            <a href="${this.instagram}"
              ><img
                src="/resource/svg/instagram.svg"
                alt="instagram piedra dropa"
            /></a>
            <a href="${this.twitter}"
              ><img src="/resource/svg/twitter.svg" alt="twitter piedra dropa"
            /></a>
          </div>
        </div>

        <div class="autor">
          <p>WEBSITE DESIGN BY</p>
          <a href="https://www.instagram.com/manuel_entrena/"
            ><img src="/resource/svg/logo_ME.svg" alt="logo Manuel Entrena"
          /></a>
        </div>
      </div>
    `}});const fe=Q`
  .contacto{
        background-image: url('https://lh3.googleusercontent.com/cpdYf5HlSVYkE0_Do0uhggjuGYTMWYgYuSs-3WndCwM1ihjYTyFClUs7JRk6FzIyIGAqZaczhkCg84aui8eqM-UBzvL8X_yf3Zb7lxtDKgc5B1uYT44IDv5AbaO3IcnXmLfwnEDl-d3jjO-7TMHQM4MeeQ9ug0XzrjB0TEK23q3iWBQNwkBc1hgyCZweojpToNcOq3TTrua47aLDYZJWQja6ouB3_G9Nore4nNMMkbZUEN1ED7BKc2PC5PjEMgiRR6cQ5HcFIML1YMN4JMXq1Mc9Zu7UCh1KhH3D4ke5tND-GHoCMgrK5KlA7tLPWgDOo3-vGGhXcRrxRtYWuvoMTcMR6eS1N8Aqg_p6yGXhZC8cMgRxZeTJyAllLMl70ro64vnrM4v7FpR3W2IIjg0rbIlckRnGC1KHl3syy5qkIgjkb6wTpERjxwB4a6jf_PB_pihMQvy-ds_9wHnC7j9HUNA6rwiFqddF6UTJiKJO782vVgQLUhJhfoIc3Sh7uECM01slNyw2PWB12_Q9xAudQIuzbkQpg63880EoRVlfYsKRr7hKjdRK8XvciRbwghi55Z8cCHaHXBbbRZoKYOBs4e17lWGvglo0RLeXQGzbbznSHYuQCRjkM_qW-wCI2lqAUyGQGCbLztRVJAvOlHJWitRqTGdFXfBjTaWjSq076r6Q9cVieN13WpJSLCHv=w1514-h1009-no?authuser=0');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    max-width: 100%;
    padding: 14rem;
  }

  @media (max-width: 768px) {
    .contacto{
      padding: 8rem 2rem;
    }
  }

  .contacto-layout{
    background-color: rgba(206, 207, 208, 0.1);
    height: auto;
    text-align: center;
    padding: 3.6rem;
  }

  .contacto h1{
    color: ${ee};
    padding: 0;
    font: bold 4.5rem Kodchasan-Bold;
  }

  @media (max-width: 768px) {
    .contacto-layout{
      padding: 1rem;
    }
    .contacto h1{
      font-size:2.4rem;
    }
  }

  .container{
    display: flex;
  }

  @media (max-width: 768px) {
    .container{
      flex-direction: column;
    }
  }

  .section_form{
    width: 50%;
    padding: 3rem;
    color: ${ne};
    font: bold 2.5rem Kodchasan-Bold;
    text-align: left;
  }

  @media (max-width: 768px) {
    .section_form{
      width: auto;
      font-size:1.6rem;
      padding: 1rem;
    }
  }

  .section_form label{
    margin: 1rem 0rem;
  }

  .section_form input{
    height: 5rem;
    border: 0.3rem solid ${ne};
    padding-left: 3rem;
    font: bold 2rem Leelawadee_UI;
    outline:none;
  }

  .section_form textarea{
    border: 0.3rem solid ${ne};
    padding: 3rem;
    font: bold 2rem Leelawadee_UI;
    outline:none;
    margin-bottom: 3rem;
    resize: none;
  }

  @media (max-width: 768px) {
    .section_form input,.section_form textarea{
      font-size:1.6rem;
    }
  }

  .mensajeError{
    margin-top: 3rem;
    padding: 1.5rem;
    text-align: center;
    background-color: ${ce};
    color: ${ee};
  }

  .mensajeExito{
    margin-top: 3rem;
    padding: 1.5rem;
    text-align: center;
    background-color: ${le};
    color: ${ee};
  }

  .section_info{
    width: 50%;
    text-align: center;
    font: bold 2.5rem Kodchasan-Bold;
    padding-top: 10rem;
  }

  .section_info img{
    width: 203px;
    height: 33px;
  }

  .text_naranja{
    color: ${ne};
    
  }

  .text_blanco{
    color: ${ee};
  }

  @media (max-width: 768px) {
    .section_info{
      width: auto;
      padding: 0 0 4rem 0;
    }
    .text_naranja{
      font-size: 2.5rem;
    }
    .text_blanco{
      font-size: 1.6rem;
    }
  }


  #myform{
    display: flex;
    flex-direction: column;
  }

`;customElements.define("pd-contacto",class extends K{static get styles(){return[fe]}render(){return O`
      <div class="contacto">
        <div class="contacto-layout">
          <h1>CONTACTO</h1>
          <div class="container">
            <div class="section_form">
              <form
                id="myform"
                action="https://formsubmit.co/ed5a8bfac3c398ad8b83de40a1c32bf3"
                method="POST"
                enctype="multipart/form-data"
              >
                <label for="name">TU NOMBRE (Requerido)</label>
                <input
                  class="form-imput"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Introduce tu nombre..."
                  required
                />

                <label for="email">TU EMAIL (Requerido)</label>
                <input
                  class="form-imput"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Introduce tu correo..."
                  required
                />

                <label for="text">TU MENSAJE</label>
                <textarea class="form-imput" name="text" rows="5"> </textarea>

                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style="display:none" />
                <input
                  type="hidden"
                  name="_next"
                  value="http://127.0.0.1:8081/contacto.html"
                />

                <pd-boton
                  text="ENVIAR"
                  link="#"
                  widthFull="1"
                  @click="${this._handleClickform}"
                ></pd-boton>
              </form>
              <div class="mensaje"></div>
            </div>
            <div class="section_info">
              <p class="text_naranja">CORREO</p>
              <p></p>
              <p class="text_blanco">piedradropa@gmail.com</p>
              <p class="text_naranja">MERCHANDISING</p>
              <p class="text_blanco">Llamar al teléfono: &nbsp 681 08 37 21</p>
              <p class="text_naranja">WEBMASTER</p>
              <p class="text_blanco">manuel.entrena@gmail.com</p>
              <img
                src="/resource/svg/logo_secundario.svg"
                alt="logo piedra dropa"
              />
            </div>
          </div>
        </div>
      </div>
    `}_handleClickform(e){e.preventDefault();const t=this.shadowRoot.querySelector("#myform"),r=this.shadowRoot.querySelector("#name"),i=this.shadowRoot.querySelector("#email");/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(i.value)&&""!==r.value?(t.submit(),this._insertarTexto("Correo enviado con éxito!","exito")):this._insertarTexto("EMAIL Y NOMBRE SON REQUERIDOS","error")}_insertarTexto(e,t){const r=this.shadowRoot.querySelector(".mensaje"),i=document.createElement("p");i.textContent=e,"exito"===t?i.classList.add("mensajeExito"):i.classList.add("mensajeError"),r.appendChild(i),setTimeout((()=>{i.remove()}),3e3)}});const ye=Q`
  .container {
    position: relative;
    width: 100%;
    max-width: 500px;
  }

  .container img {
    display: block;
    width: 100%;
    height: auto;  
  }

  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    top: 0;
    background: rgba(255, 111, 0, 0.8); /* Black see-through */
    color: ${ee};
    width: 100%;
    transition: 1s ease;
    opacity: 0;
    color: white;
    font: normal 2rem Leelawadee_UI;
  }

  .overlay div{
    background: rgba(59, 59, 61, 0.8);
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .overlay p:nth-child(n){
    margin: 0;
  }

  .overlay p:nth-child(1){
    font: bold 3.5rem Leelawadee_UI;
  }

  .overlay p:nth-child(2){
    font: bold 1.6rem Kodchasan-Bold;
    color: ${ne};
  }

  .overlay div a img{
    margin: 3rem 0 1rem 0;
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 768px) {
    .overlay p:nth-child(1){
      font-size: 2rem;
    }

    .overlay p:nth-child(2){
      font-size: 1rem;
    }
    .overlay div a img{
      margin: 2rem 0 0.5rem 0;
    }
  }

  .overlay div a:hover {
    color: ${ne};
  }

  .container:hover .overlay{
    opacity: 1;
  }

  .blue{
    background: rgba(44, 126, 206, 0.8);
  }

  .red{
    background: rgba(160, 44, 50, 0.8);
  }

  .yellow{
    background: rgba(205, 180, 48, 0.8);
  }

  .green{
    background: rgba(71, 191, 109, 0.8);
  }
`;customElements.define("pd-miembro",class extends K{static get properties(){return{img:{type:String},img_mobil:{type:String},name:{type:String},type:{type:String},color:{type:String},instagram:{type:String}}}static get styles(){return[ye]}render(){return O`
      <div class="container">
        <picture>
          <source srcset="${this.img_mobil}" media="(max-width: 768px)">
          <source srcset="${this.img_mobil}">
          <img class="img" srcset="${this.img}" alt="${this.name}">
        </picture>
        <div class="overlay ${this.color}">
          <div>
            <p>${this.name.toUpperCase()}</p>
            <p>${this.type.toUpperCase()}</p>
            <a href="${this.instagram}"><img src="../resource/svg/instagram.svg" alt="instagram piedra dropa"></a>
          </div>
        </div>
      </div>
    `}});const ve=Q`
  .button{
    display: flex;
    justify-content: center;
    width: fit-content;
    font: 2.5rem Leelawadee_UI;
    border: ${ne} solid 0.3rem;
    background-color: ${ne};
    padding: 1.2rem 2rem;
    color: ${ee};
    text-decoration: none;
  }

  .button:hover{
    background-color: ${oe};
    border-color: ${oe};
    cursor: pointer;
  }
`;customElements.define("pd-boton",class extends K{static get properties(){return{text:{type:String},widthFull:{type:Number},secundary:{type:Number},link:{type:String}}}static get styles(){return[ve]}render(){return O`
      <style>
        :host a{
          width: ${this.widthFull?"auto":"fit-content"};
          background-color: ${this.secundary?"transparent":null};
          
        }
        :host a:hover{
          background-color: ${this.secundary?ne:null};
          border-color: ${this.secundary?ne:null};
        }
        :host a span{
          color: ${this.secundary?ne:null};
          font-weight: ${this.secundary?"bold":"normal"};
        }
        :host a:hover span{
          color: ${this.secundary?ee:null};
        }   
      </style>
      <a class="button" href="${this.link}">
        <span>${this.text}</span>
      </a>
    `}})})();