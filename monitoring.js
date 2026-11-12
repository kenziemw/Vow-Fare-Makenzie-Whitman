/* VowFare monitoring: error capture, page-load timing, and usage events (screen views, vendors opened, booking clicks).
   - Events are kept in memory (window.VF_LOG) and logged to the console.
   - Add ?debug=1 to any URL to see a live event panel.
   - To send events to a free dashboard, create a GoatCounter site and put its code below. */
(function(){
var CONFIG={goatcounterCode:""}; // e.g. "vowfare" -> https://vowfare.goatcounter.com
var buf=window.VF_LOG=[],debug=/[?&]debug=1/.test(location.search),panel=null;
function slug(t){return String(t==null?"":t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)}
if(CONFIG.goatcounterCode){var g=document.createElement("script");g.async=true;
 g.setAttribute("data-goatcounter","https://"+CONFIG.goatcounterCode+".goatcounter.com/count");g.src="//gc.zgo.at/count.js";document.head.appendChild(g)}
function render(){
 if(!debug)return;
 if(!panel){panel=document.createElement("pre");panel.id="vf-debug";
  panel.style.cssText="position:fixed;right:8px;bottom:8px;max-width:360px;max-height:40vh;overflow:auto;margin:0;padding:10px;font:11px/1.4 monospace;background:#26292c;color:#E7EFE6;z-index:9999;border-radius:4px";
  document.body.appendChild(panel)}
 panel.textContent=buf.slice(-12).map(function(e){return e.t.slice(11,19)+" "+e.name+(e.label?" "+e.label:"")}).join("\n");
}
function track(name,label,extra){
 var e={t:new Date().toISOString(),name:name,label:label||"",extra:extra||{}};
 buf.push(e);if(buf.length>200)buf.shift();
 try{console.info("[vf]",name,e.label,e.extra)}catch(x){}
 if(window.goatcounter&&window.goatcounter.count){try{window.goatcounter.count({path:"vf/"+name+(e.label?"/"+slug(e.label):""),title:name,event:true})}catch(x){}}
 render();
}
window.VF_track=track;

window.addEventListener("error",function(e){track("js_error",slug(e.message),{file:e.filename,line:e.lineno})});
window.addEventListener("unhandledrejection",function(e){track("js_error",slug(e.reason&&e.reason.message||e.reason))});
window.addEventListener("load",function(){var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
 track("page_load","",{ms:n?Math.round(n.loadEventEnd):0})});

var origShow=window.showScreen;
window.showScreen=function(id){origShow.apply(this,arguments);track("screen_view",id.replace("screen-",""))};
var origVendor=window.openVendor;
window.openVendor=function(v){origVendor.apply(this,arguments);track("vendor_opened",v.name,{price:v.price,category:state.category})};
document.addEventListener("click",function(ev){
 var b=ev.target.closest&&ev.target.closest(".cta-primary.book");
 if(b)track("booking_started",state.selectedVendor&&state.selectedVendor.name);
},true);
})();
