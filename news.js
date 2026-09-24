(() => {
  const root=document.querySelector('#news');
  if(!root)return;
  const featured=root.querySelector('.news-feature'),list=root.querySelector('.news-list');
  const dialog=document.querySelector('#news-dialog'),article=dialog.querySelector('.news-article');
  const records=(Array.isArray(window.TII_NEWS)?window.TII_NEWS:[]).filter(n=>n&&n.title&&(n.title.zh||n.title.en)&&/^\d{4}-\d{2}-\d{2}$/.test(n.date||'')).slice().sort((a,b)=>b.date.localeCompare(a.date));
  let opened=null;
  const english=()=>document.documentElement.lang==='en';
  const tr=(zh,en)=>english()?en:zh;
  const local=value=>typeof value==='string'?value:(value?.[english()?'en':'zh']||value?.zh||value?.en||'');
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e};
  function photo(n){if(!n.image)return null;let url;try{url=new URL(n.image,document.baseURI);if(!['http:','https:','file:'].includes(url.protocol))return null}catch{return null}const image=el('img');image.src=url.href;image.alt=local(n.imageAlt)||local(n.title);image.loading='lazy';image.addEventListener('error',()=>image.remove(),{once:true});return image}
  function fillArticle(n){article.replaceChildren();const date=el('time','news-date',n.date);date.dateTime=n.date;article.append(date,el('h2','',local(n.title)));const image=photo(n);if(image)article.append(image);let paragraphs=local(n.body);if(!Array.isArray(paragraphs))paragraphs=paragraphs?[paragraphs]:[];if(!paragraphs.length&&local(n.summary))paragraphs=[local(n.summary)];paragraphs.forEach(p=>article.append(el('p','',String(p))));dialog.querySelector('.news-close').ariaLabel=tr('关闭新闻','Close article')}
  function open(n){opened=n;fillArticle(n);dialog.showModal()}
  function render(){if(!records.length)return;featured.replaceChildren();list.replaceChildren();const n=records[0],button=el('button','news-feature-button');button.type='button';const image=photo(n);if(image){const frame=el('div','news-feature-photo');frame.append(image);button.append(frame)}const copy=el('div','news-feature-copy'),date=el('time','news-date',n.date);date.dateTime=n.date;copy.append(date,el('h3','',local(n.title)));if(local(n.summary))copy.append(el('p','',local(n.summary)));const more=el('span','news-read',tr('阅读详情','Read article'));more.append(el('b','','↗'));copy.append(more);button.append(copy);button.addEventListener('click',()=>open(n));featured.append(button);
    if(records.length===1)list.append(el('div','news-empty-list',tr('更多动态，敬请期待。','More updates coming soon.')));
    records.slice(1).forEach(n=>{const button=el('button','news-row');button.type='button';const date=el('time','',n.date.slice(5));date.dateTime=n.date;date.append(el('br'),document.createTextNode(n.date.slice(0,4)));const text=el('div');text.append(el('h3','',local(n.title)));if(local(n.summary))text.append(el('p','',local(n.summary)));button.append(date,text,el('span','','↗'));button.addEventListener('click',()=>open(n));list.append(button)});
    if(dialog.open&&opened)fillArticle(opened);
  }
  dialog.querySelector('.news-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
