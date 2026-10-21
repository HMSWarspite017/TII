let lang='zh',currentSlide=0,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
const $$=(selector)=>[...document.querySelectorAll(selector)];
function setLanguage(value){lang=value;document.documentElement.lang=value==='zh'?'zh-CN':'en';$$('[data-zh]').forEach(el=>el.textContent=el.dataset[value]);$$('[data-alt-zh]').forEach(el=>el.alt=el.dataset[value==='zh'?'altZh':'altEn']);$$('[data-lang]').forEach(el=>{el.classList.toggle('active',el.dataset.lang===value);el.setAttribute('aria-pressed',String(el.dataset.lang===value))});document.title=document.body.dataset[value==='zh'?'titleZh':'titleEn']||(value==='zh'?'tii | 以创新连接产业，以品质改善生活':'tii | Connecting Innovation, Enriching Life');const description=document.querySelector('meta[name="description"]');description.content=document.body.dataset[value==='zh'?'descriptionZh':'descriptionEn']||description.content;document.querySelector('nav').setAttribute('aria-label',value==='zh'?'主导航':'Main navigation');document.querySelector('.hero')?.setAttribute('aria-label',value==='zh'?'四大业务':'Our four business divisions');document.querySelector('#previous')?.setAttribute('aria-label',value==='zh'?'上一张':'Previous slide');document.querySelector('#next')?.setAttribute('aria-label',value==='zh'?'下一张':'Next slide');updatePause();updateMenu();try{localStorage.setItem('tii-language',value)}catch{} }
function updatePause(){const p=document.querySelector('#pause');if(!p)return;p.textContent=paused?'▷':'Ⅱ';p.setAttribute('aria-label',lang==='zh'?(paused?'开始自动轮播':'暂停自动轮播'):(paused?'Start slideshow':'Pause slideshow'));p.setAttribute('aria-pressed',String(paused))}
function showSlide(index){currentSlide=(index+4)%4;$$('.slide').forEach((slide,i)=>{slide.classList.toggle('active',i===currentSlide);slide.setAttribute('aria-hidden',String(i!==currentSlide));slide.inert=i!==currentSlide});$$('[data-go]').forEach((el,i)=>{el.classList.toggle('active',i===currentSlide);el.setAttribute('aria-pressed',String(i===currentSlide))})}
function startTimer(){clearInterval(timer);if(document.querySelector('.hero')&&!paused&&!document.hidden)timer=setInterval(()=>showSlide(currentSlide+1),6500)}
function manualSlide(index){showSlide(index);startTimer()}
$$('[data-lang]').forEach(el=>el.addEventListener('click',()=>setLanguage(el.dataset.lang)));
$$('[data-go]').forEach(el=>el.addEventListener('click',()=>manualSlide(Number(el.dataset.go))));
document.querySelector('#next')?.addEventListener('click',()=>manualSlide(currentSlide+1));document.querySelector('#previous')?.addEventListener('click',()=>manualSlide(currentSlide-1));document.querySelector('#pause')?.addEventListener('click',()=>{paused=!paused;updatePause();startTimer()});
const hero=document.querySelector('.hero');hero?.addEventListener('mouseenter',()=>clearInterval(timer));hero?.addEventListener('mouseleave',startTimer);hero?.addEventListener('focusin',()=>clearInterval(timer));hero?.addEventListener('focusout',(e)=>{if(!hero.contains(e.relatedTarget))startTimer()});hero?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();manualSlide(currentSlide+(e.key==='ArrowRight'?1:-1))}});let touchX=0;hero?.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});hero?.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>60)manualSlide(currentSlide+(delta<0?1:-1))},{passive:true});document.addEventListener('visibilitychange',startTimer);
// Shared navigation disclosures: native buttons retain Enter/Space behavior.
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
const navDesktop=window.matchMedia('(min-width: 801px)');
const navHover=window.matchMedia('(hover: hover) and (pointer: fine)');
const navItems=[...nav.querySelectorAll('.nav-disclosure')];
let activeNavItem=null,navOpenSource=null,navCloseTimer;
function updateMenu(){menu.setAttribute('aria-label',lang==='zh'?(nav.classList.contains('open')?'关闭菜单':'打开菜单'):(nav.classList.contains('open')?'Close menu':'Open menu'))}
const navSubtoggles=[...nav.querySelectorAll('.nav-subtoggle')];
function setNavSubgroup(button,expanded){
  document.getElementById(button.getAttribute('aria-controls')).hidden=!expanded;
  button.setAttribute('aria-expanded',String(expanded));
}
function resetNavSubgroups(){navSubtoggles.forEach(button=>setNavSubgroup(button,navDesktop.matches))}
navSubtoggles.forEach(button=>button.addEventListener('click',()=>{
  if(!navDesktop.matches)setNavSubgroup(button,button.getAttribute('aria-expanded')!=='true');
}));
resetNavSubgroups();
const navBackdrop=document.createElement('div');
navBackdrop.className='nav-backdrop';navBackdrop.hidden=true;navBackdrop.setAttribute('aria-hidden','true');
document.body.append(navBackdrop);
function updateNavBackdrop(){
  navBackdrop.hidden=!(navDesktop.matches&&activeNavItem);
  if(!navBackdrop.hidden)navBackdrop.style.setProperty('--nav-header-bottom',document.querySelector('.site-header').getBoundingClientRect().bottom+'px');
}
window.addEventListener('resize',updateNavBackdrop);
navBackdrop.addEventListener('pointerdown',()=>closeMenu());
function cancelNavClose(){clearTimeout(navCloseTimer)}
function closeNavPanel(restoreFocus=false){
  cancelNavClose();
  if(!activeNavItem)return;
  const trigger=activeNavItem.querySelector('.nav-trigger');
  activeNavItem.querySelector('.nav-panel').hidden=true;
  trigger.setAttribute('aria-expanded','false');
  if(!navDesktop.matches)resetNavSubgroups();
  activeNavItem=null;navOpenSource=null;updateNavBackdrop();
  if(restoreFocus)trigger.focus();
}
function openNavPanel(item,source){
  cancelNavClose();
  if(activeNavItem!==item)closeNavPanel();
  activeNavItem=item;navOpenSource=source;
  item.querySelector('.nav-panel').hidden=false;
  item.querySelector('.nav-trigger').setAttribute('aria-expanded','true');
  updateNavBackdrop();
}
function closeMenu(restoreFocus=false){
  closeNavPanel();nav.classList.remove('open');menu.setAttribute('aria-expanded','false');updateMenu();
  if(restoreFocus)menu.focus();
}
menu.addEventListener('click',()=>{
  if(nav.classList.contains('open'))closeMenu();
  else{nav.classList.add('open');menu.setAttribute('aria-expanded','true');updateMenu()}
});
navItems.forEach(item=>{
  const trigger=item.querySelector('.nav-trigger');
  trigger.addEventListener('click',()=>{
    if(activeNavItem===item&&navOpenSource!=='hover')closeNavPanel();
    else openNavPanel(item,'click');
  });
  trigger.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'){
      event.preventDefault();openNavPanel(item,'keyboard');item.querySelector('.nav-panel a')?.focus();
    }
  });
  item.addEventListener('pointerenter',()=>{
    cancelNavClose();
    if(navDesktop.matches&&navHover.matches&&activeNavItem!==item)openNavPanel(item,'hover');
  });
  item.addEventListener('pointerleave',()=>{
    if(!navDesktop.matches||!navHover.matches)return;
    cancelNavClose();navCloseTimer=setTimeout(()=>{
      // Keep a keyboard user's focused panel available until focus leaves.
      if(activeNavItem===item&&!item.querySelector('.nav-panel').contains(document.activeElement))closeNavPanel();
    },320);
  });
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
nav.addEventListener('focusout',event=>{
  if(!nav.contains(event.relatedTarget)){closeNavPanel();if(!navDesktop.matches&&event.relatedTarget!==menu)closeMenu()}
  else if(activeNavItem&&!activeNavItem.contains(event.relatedTarget))closeNavPanel();
});
document.addEventListener('pointerdown',event=>{
  if(!event.target.closest('.site-header'))closeMenu();
});
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const subgroup=document.activeElement?.closest('.nav-subgroup');
  const subbutton=subgroup?.querySelector('.nav-subtoggle');
  if(!navDesktop.matches&&subbutton?.getAttribute('aria-expanded')==='true'){
    event.preventDefault();setNavSubgroup(subbutton,false);subbutton.focus();return;
  }
  if(activeNavItem){event.preventDefault();closeNavPanel(true)}
  else if(nav.classList.contains('open')){event.preventDefault();closeMenu(true)}
});
navDesktop.addEventListener('change',()=>{
  const hadFocus=nav.contains(document.activeElement);
  closeMenu();resetNavSubgroups();
  if(hadFocus)(navDesktop.matches?nav.querySelector('.nav-trigger'):menu)?.focus();
});
// Mark only actual current pages, never the shared placeholder destinations.
const navPage=location.pathname.split('/').pop()||'index.html';
nav.querySelectorAll('a').forEach(a=>{
  const url=new URL(a.href);
  if(navPage!=='coming-soon.html'&&url.pathname.split('/').pop()===navPage&&!url.hash&&!url.search)a.setAttribute('aria-current','page');
});
if(navPage==='business.html'){
  const division=new URLSearchParams(location.search).get('division');
  if(division&&/^[0-3]$/.test(division))nav.querySelectorAll('.mega-column')[Number(division)]?.setAttribute('data-current','true');
}
document.querySelector('#year').textContent=new Date().getFullYear();try{lang=localStorage.getItem('tii-language')==='en'?'en':'zh'}catch{}setLanguage(lang);startTimer();
