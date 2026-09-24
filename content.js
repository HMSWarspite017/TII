// Add official URLs here when they become available. Empty values intentionally render as coming soon.
const branchLinks={laos:{website:'',facebook:''},singapore:{website:'',facebook:''},peru:{website:'',facebook:''}};
function activateBusiness(index,focus=false){$$('[data-tab]').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;if(i===index&&focus)tab.focus()});$$('.business-panel').forEach((panel,i)=>panel.hidden=i!==index)}
$$('[data-tab]').forEach((tab,i)=>{tab.addEventListener('click',()=>activateBusiness(i));tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%4;else if(e.key==='ArrowLeft')next=(i+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();activateBusiness(next,true)})});
$$('[data-business]').forEach(link=>link.addEventListener('click',()=>activateBusiness(Number(link.dataset.business))));
function applyBranchLinks(){for(const [country,urls] of Object.entries(branchLinks)){for(const [kind,selector] of [['website','branch'],['facebook','social']]){const a=document.querySelector(`[data-${selector}="${country}"]`);if(!a)continue;if(urls[kind]&&/^https?:\/\//.test(urls[kind])){a.href=urls[kind];a.target='_blank';a.rel='noopener noreferrer';a.removeAttribute('aria-disabled');a.textContent=kind==='website'?(lang==='zh'?'访问公司网站 ↗':'Visit company website ↗'):'Facebook ↗'}}}document.querySelector('.business-tabs')?.setAttribute('aria-label',lang==='zh'?'业务领域':'Business divisions')}
$$('[data-lang]').forEach(button=>button.addEventListener('click',applyBranchLinks));setLanguage(lang);applyBranchLinks();

const requestedDivision=new URLSearchParams(location.search).get("division");
if(requestedDivision!==null&&/^[0-3]$/.test(requestedDivision))activateBusiness(Number(requestedDivision));
