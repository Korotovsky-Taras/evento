var a=Object.defineProperty;var d=(s,e,i)=>e in s?a(s,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[e]=i;var o=(s,e,i)=>(d(s,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();class c{constructor(e){o(this,"PANEL_INIT_STYLE","init");o(this,"ROOT_EXPANDED_STYLE","sidebar-expanded");o(this,"PANEL_EXPANDED_STYLE","expanded");if(!e.buttonElement||!e.sidebarElement)throw new Error("SliderPanel: should provide buttonElement, sidebarElement");this.button=e.buttonElement,this.panel=e.sidebarElement,this.disableScroll=e.disableScroll||!1,this.init()}isReadyToUse(){return this.button instanceof HTMLElement&&this.panel instanceof HTMLElement}isMobile(){return"matchMedia"in window&&matchMedia("(max-width: 1024px)").matches}init(){if(!this.isReadyToUse())throw new Error("SliderPanel: elements to init not found");setTimeout(()=>{this.panel.classList.add(this.PANEL_INIT_STYLE)},0),this.button.addEventListener("click",()=>this.toggleExpand()),document.addEventListener("click",i=>{!this.panel.contains(i.target)&&!this.button.contains(i.target)&&this.panel.classList.contains(this.PANEL_EXPANDED_STYLE)&&this.toggleExpand()});let e;window.addEventListener("resize",i=>{clearTimeout(e),e=setTimeout(()=>{this.isMobile()||this.expand(!1)},50)})}toggleExpand(){const e=!this.panel.classList.contains(this.PANEL_EXPANDED_STYLE);this.expand(e)}expand(e){this.panel.classList.toggle(this.PANEL_EXPANDED_STYLE,e),this.button.classList.toggle("active",e),document.documentElement.classList.toggle(this.ROOT_EXPANDED_STYLE,e)}}function u(){new c({sidebarElement:document.querySelector(".js-sidebar-element"),buttonElement:document.querySelector(".js-sidebar-btn-element")})}document.addEventListener("DOMContentLoaded",u);
