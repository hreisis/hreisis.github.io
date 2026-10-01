const chart = `<svg viewBox="0 0 430 100" aria-hidden="true"><g stroke="#dfe4d8" stroke-width="1"><path d="M0 20H430M0 50H430M0 80H430"/></g><path d="M0 71L25 65 43 73 65 52 88 57 110 43 139 49 161 35 183 43 210 27 234 34 259 15 283 23 301 17 325 28 350 13 377 18 401 7 430 10" stroke="#5f7751" fill="none" stroke-width="2"/><path d="M0 83L25 80 43 76 65 79 88 70 110 75 139 63 161 70 183 63 210 65 234 54 259 61 283 50 301 52 325 42 350 46 377 35 401 40 430 31" stroke="#a3b289" fill="none" stroke-width="2"/></svg>`;
function signalChart(){const ys=[130,126,135,132,121,124,128,116,119,124,114,117,104,84,79,88,68,61,67,53,59,47,42,54,38,31,39,25,34,21];return `<svg viewBox="0 0 480 220" aria-hidden="true"><g stroke="#34443b" stroke-width="1"><path d="M0 35H480M0 85H480M0 135H480M0 185H480"/></g><rect x="9" y="107" width="179" height="42" fill="#d4f59c08" stroke="#829971" stroke-dasharray="4 4"/>${ys.map((y,i)=>`<path d="M${i*15+15} ${y-12}V${y+16}" stroke="${i%4===2?'#899482':'#d4f59c'}"/><rect x="${i*15+11}" y="${y-5}" width="8" height="${i%3===0?16:10}" fill="${i%4===2?'#899482':'#d4f59c'}"/>`).join('')}<path d="M0 164Q120 173 180 157T280 112T360 88T470 62" stroke="#91aaa0" stroke-width="1.5" fill="none"/><path d="M205 137l-6 9h12z" fill="#d4f59c"/><text x="218" y="147" fill="#d4f59c" font-size="10">CONFIRMATION</text><text x="17" y="100" fill="#9dad92" font-size="9">CONSOLIDATION</text><path d="M424 11l5-5 5 5-5 5z" fill="#d9b79b"/></svg>`}
function visual(p){if(p.visual==='gamma')return `<div class="gamma-art"><div class="desk"><div class="desk-head"><b>GammaDesk<span style="color:#79975a"> /</span></b><span>MARKET OVERVIEW &nbsp; EN / 中</span></div><div class="desk-label">MARKET DECISION</div><div class="desk-title">A clearer view.<br>A measured response.</div><p class="desk-sub">Macro context · Market structure · Daily research</p><div class="desk-columns"><div class="desk-box"><span>STRUCTURAL RISK</span><b>42<small>/100</small></b><div class="desk-bar"><i></i></div></div><div class="desk-box"><span>OPPORTUNITY</span><b>68<small>/100</small></b><div class="desk-bar"><i></i></div></div></div><div class="desk-chart"><span>RISK × OPPORTUNITY</span>${chart}</div></div><span class="visual-note">INTERFACE STUDY · ILLUSTRATIVE DATA</span></div>`;if(p.visual==='signal')return `<div class="signal-art"><div class="signal-head"><b>Signal-Lab</b><span>OBSERVE → DEFINE → TEST</span></div>${signalChart()}<div class="signal-legend"><span>▲ Entry confirmation</span><span>— ATR risk boundary</span><span>◆ Staged exit</span></div><span class="visual-note">SIGNAL STUDY · ILLUSTRATIVE DATA</span></div>`;return `<img src="assets--${p.image}" alt="${p.title} — ${p.kind}" loading="lazy">`}
const grid=document.querySelector('#project-grid');
const categories=[
 {id:'product',title:'Products & tools',description:'Research, interfaces, and applications built to be used.'},
 {id:'space',title:'Spaces & experiences',description:'Architecture and immersive worlds, explored through motion and interaction.'},
 {id:'experiment',title:'Creative experiments',description:'Studies in computation, emerging media, and physical making.'}
];
function projectCard(p){const i=projects.indexOf(p);return `<article class="project-card ${p.featured?'featured':''}" data-category="${p.category}">${p.caseStudy?`<a class="project-open" href="${p.caseStudy}" aria-label="View ${p.title} case study">`:`<button class="project-open" data-project="${p.id}" aria-label="View ${p.title} project">`}<div class="project-media">${visual(p)}</div><div class="project-meta"><span>${String(i+1).padStart(2,'0')} / ${p.kind}</span><span>${p.year}</span></div><div class="project-title"><h3>${p.title}</h3><span aria-hidden="true">↗</span></div><p class="project-desc">${p.description}</p>${p.caseStudy?'</a>':'</button>'}</article>`;}
grid.innerHTML=categories.map((group,i)=>{const items=projects.filter(p=>p.category===group.id);return `<section class="project-group" data-group="${group.id}" aria-labelledby="group-${group.id}"><div class="group-heading"><div><span class="group-number">0${i+1}</span><h3 id="group-${group.id}">${group.title}<sup>${items.length}</sup></h3></div><p>${group.description}</p></div><div class="project-grid">${items.map(projectCard).join('')}</div></section>`}).join('');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('.project-group').forEach(g=>g.hidden=category!=='all'&&g.dataset.group!==category);document.querySelector('#filter-status').textContent=`Showing ${projects.filter(p=>category==='all'||p.category===category).length} projects`;}));
const dialog=document.querySelector('#project-dialog');const content=document.querySelector('#dialog-content');let previousFocus;
function openDialog(html){previousFocus=document.activeElement;content.innerHTML=html;heroVideo.pause();dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';document.querySelector('.dialog-close').focus()}
function closeDialog(){dialog.close()}
dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());reelHls?.destroy();reelHls=null;document.body.style.overflow='';previousFocus?.focus();syncHero()});document.querySelector('.dialog-close').addEventListener('click',closeDialog);dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeDialog()}});
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=projects.find(p=>p.id===b.dataset.project);openDialog(`<div class="dialog-inner"><span class="eyebrow">${p.kind.toUpperCase()} / ${p.year}</span><h2 id="dialog-title">${p.title}</h2><p class="dialog-lead">${p.body}</p>${p.link?`<a class="text-link" href="${p.link}" target="_blank" rel="noopener noreferrer">${p.linkLabel} ↗</a>`:''}<div class="dialog-info"><div><h3>Focus</h3><p>${p.role}</p>${p.stack?`<h3 style="margin-top:24px">Tools & technologies</h3><p>${p.stack}</p>`:''}</div><div><h3>Project notes</h3><ul>${p.details.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>${p.video?`<video class="project-video" controls playsinline preload="metadata" poster="assets--${p.image}"><source src="assets--${p.video}" type="video/mp4"></video>`:p.visual?`<div class="dialog-visual">${visual(p)}</div>`:`<div class="dialog-gallery">${(p.gallery||[p.image]).map(im=>`<img src="assets--${im}" alt="${p.title} selected project image" loading="lazy">`).join('')}</div>`}${p.note?`<p class="dialog-note">${p.note}</p>`:''}</div>`)}));
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.open==='reel'){openDialog(`<div class="dialog-inner"><span class="eyebrow">SELECTED WORK / 0:53</span><h2 id="dialog-title">Inside my world.</h2><video id="full-reel" class="project-video" controls autoplay muted playsinline poster="assets--invisible.webp"></video><p id="reel-status" role="status"></p></div>`);reelHls=attachReel(document.querySelector('#full-reel'),true)}else openDialog(`<div class="dialog-inner"><span class="eyebrow">BACKGROUND & EXPERIENCE</span><h2 id="dialog-title">Résumé, coming soon.</h2><p class="dialog-lead">An updated résumé will be available here. In the meantime, you can find my professional background on LinkedIn.</p><a class="text-link" href="https://www.linkedin.com/in/xianingchen/" target="_blank" rel="noopener noreferrer">Visit LinkedIn ↗</a></div>`);document.querySelector('#browse-work')?.addEventListener('click',()=>{closeDialog();document.querySelector('#work').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})})}));
// Broken media never become empty project links.
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{const fallback=document.createElement('div');fallback.className='empty-media';fallback.textContent='Project preview coming soon';img.replaceWith(fallback)}));

// Native 1080p MP4 playback with a fast-start header.
const heroVideo=document.querySelector('#hero-video');
const playback=document.querySelector('#hero-playback');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let wantsMotion=!reducedMotion.matches&&!navigator.connection?.saveData;
let heroVisible=true,heroAttached=false,reelHls=null;
function attachReel(video,autoplay){
 video.src='assets--reel-home.mp4';
 video.addEventListener('loadeddata',()=>{
  if(video.id==='hero-video')syncHero();
  else if(autoplay)video.play().catch(()=>{});
 },{once:true});
 video.addEventListener('error',()=>{
  const status=document.querySelector('#reel-status');
  if(video.id==='full-reel'&&status){
   status.textContent='Video could not load. ';
   const retry=document.createElement('button');retry.className='text-link';retry.textContent='Try again';
   retry.onclick=()=>{status.textContent='';video.load();video.play().catch(()=>{});};status.append(retry);
  }
 },{once:true});
 video.load();return null;
}
function syncHero(){
 if(wantsMotion&&heroVisible&&!document.hidden&&!dialog.open){
  if(!heroAttached){heroAttached=true;attachReel(heroVideo,false);}
  heroVideo.play().catch(()=>{});
 }else heroVideo.pause();
}
function updatePlayback(){const playing=!heroVideo.paused;playback.textContent=playing?'Pause reel':'Play reel';playback.setAttribute('aria-label',playing?'Pause background reel':'Play background reel');}
heroVideo.addEventListener('play',updatePlayback);heroVideo.addEventListener('pause',updatePlayback);
playback.addEventListener('click',()=>{wantsMotion=heroVideo.paused;syncHero();});
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncHero();},{threshold:0.1}).observe(document.querySelector('.hero'));
document.addEventListener('visibilitychange',syncHero);
reducedMotion.addEventListener('change',()=>{wantsMotion=!reducedMotion.matches;syncHero();});
