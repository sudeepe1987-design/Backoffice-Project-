/* Standalone, dependency-free widget. All remote adapters must return the documented
 * schema; untrusted JSON is rendered with textContent and source URLs are allowlisted.
 * WordPress: enqueue this file + intelligence.css and provide [data-intelligence]. */
(function(){
 'use strict';
 const destinations=[['canada','Canada'],['australia','Australia'],['united-kingdom','United Kingdom'],['united-states','United States'],['ireland','Ireland'],['europe','Europe']];
 const official=['canada.ca','immi.homeaffairs.gov.au','gov.uk','uscis.gov','dol.gov','enterprise.gov.ie','irishimmigration.ie','make-it-in-germany.com','europa.eu'];
 const trusted=url=>{try{const u=new URL(url);return u.protocol==='https:'&&official.some(d=>u.hostname===d||u.hostname.endsWith('.'+d));}catch{return false;}};
 function valid(data){return data&&['students','workers'].every(key=>Array.isArray(data[key])&&data[key].length&&data[key].every(x=>typeof x.title==='string'&&typeof x.summary==='string'&&trusted(x.source)));}
 async function fetchJson(url){const response=await fetch(url,{signal:AbortSignal.timeout(7000),cache:'no-cache'});if(!response.ok)throw Error('Source unavailable');const data=await response.json();if(!valid(data))throw Error('Source format invalid');return data;}
 // Configure trusted, schema-normalized URLs through BO_INTELLIGENCE_CONFIG.
 // Browser CORS errors fall through to a controlled same-origin adapter, then snapshot.
 async function loadCountry(id){const cfg=window.BO_INTELLIGENCE_CONFIG?.[id]||{};for(const [tier,url] of [['primary',cfg.primary],['secondary',cfg.secondary]]){if(!url)continue;try{const data=await fetchJson(url);return {data,tier};}catch{/* Fall through without presenting failed data as current. */}}
  return {data:await fetchJson('assets/data/intelligence/'+id+'.json'),tier:'manual'};
 }
 const engines=Object.fromEntries(destinations.map(([id])=>[id,()=>loadCountry(id)]));
 function node(tag,text,className){const el=document.createElement(tag);if(text)el.textContent=text;if(className)el.className=className;return el;}
 function init(root){const tabs=root.querySelector('[role=tablist]'),panel=root.querySelector('[data-intelligence-content]');let generation=0,current=destinations.some(([id])=>id===location.hash.slice(1))?location.hash.slice(1):'canada';
  async function choose(id){current=id;const run=++generation;tabs.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.country===id));b.tabIndex=b.dataset.country===id?0:-1;});panel.id='country-panel';panel.setAttribute('aria-labelledby','tab-'+id);panel.setAttribute('aria-busy','true');panel.replaceChildren(node('div','Loading official-source tracker…','bo-intelligence-skeleton'));
   try{const {data,tier}=await engines[id]();if(run!==generation)return;panel.replaceChildren();const age=Date.now()-Date.parse(data.verifiedAt||'');const fresh=Number.isFinite(age)&&age>=0&&age<7*86400000;const reviewed=data.auditStatus==='verified'&&fresh;
    const status=reviewed?(tier==='manual'?'Data verified via official manual audit.':'Verified source snapshot loaded.')+' Reviewed '+new Date(data.verifiedAt).toLocaleDateString('en-IN'): 'Manual review pending — use the official source for current rules. No live figures are shown.';
    panel.append(node('p',status,'bo-intelligence-status'));const columns=node('div','','bo-intelligence-segments');
    for(const [key,title] of [['students','International students'],['workers','Foreign workers']]){const section=node('section');section.append(node('h2',title));for(const item of data[key]){const card=node('article','','bo-intelligence-card');card.append(node('h3',item.title),node('p',reviewed?item.summary:(item.scope||'Review current policy, eligibility and dates at the official source.')));if(reviewed&&item.value)card.append(node('strong',String(item.value)));const a=node('a','Open official source ↗');a.href=item.source;a.target='_blank';a.rel='noopener noreferrer';card.append(a);section.append(card);}columns.append(section);}panel.append(columns);const refresh=node('button','Refresh sources','bo-intelligence-refresh');refresh.type='button';refresh.onclick=()=>choose(id);panel.append(refresh);
   }catch{if(run===generation)panel.replaceChildren(node('p','Sources could not be loaded. Please try again later.','bo-intelligence-status'));}finally{if(run===generation)panel.removeAttribute('aria-busy');}}
  destinations.forEach(([id,label],i)=>{const button=node('button',label);button.type='button';button.id='tab-'+id;button.dataset.country=id;button.setAttribute('role','tab');button.setAttribute('aria-controls','country-panel');button.onclick=()=>{history.replaceState(null,'','#'+id);choose(id);};button.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%destinations.length;else if(e.key==='ArrowLeft')n=(i+destinations.length-1)%destinations.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=destinations.length-1;else return;e.preventDefault();tabs.children[n].focus();tabs.children[n].click();};tabs.append(button);});choose(current);
 }
 document.querySelectorAll('[data-intelligence]').forEach(init);
})();
