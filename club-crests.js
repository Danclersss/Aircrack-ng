'use strict';
// Original compact interpretations of club shapes/colors; not official artwork.
function clubCrest(club,size=24){if(!club)return '';const p=clubPalette(club),name=slugify(club.name||''),id=String(club.id||''),key=id+' '+name,short=String(club.short||club.name?.split(' ').map(x=>x[0]).join('')||'FC').slice(0,4),ink=clubThemeTokens(club).foreground;
const shield=(color,body)=>`<path d="M7 7h50v30c0 16-15 26-25 31C22 63 7 53 7 37Z" fill="${color}" stroke="#fff" stroke-width="3"/>${body}`;
const text=(label,color='#fff',y=41,font=18)=>`<text x="32" y="${y}" text-anchor="middle" fill="${color}" font-size="${font}" font-family="Arial,sans-serif" font-weight="900">${esc(label)}</text>`;
const circle=(color,body)=>`<circle cx="32" cy="36" r="28" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="32" cy="36" r="23" fill="none" stroke="#ffffffa0" stroke-width="1.5"/>${body}`;
const star=(x,y,r=9)=>`<path d="m${x} ${y-r} ${r*.3} ${r*.65} ${r*.7} ${r*.05} -${r*.53} ${r*.46} ${r*.18} ${r*.75} -${r*.65} -${r*.4} -${r*.65} ${r*.4} ${r*.18} -${r*.75} -${r*.53} -${r*.46} ${r*.7} -${r*.05}Z" fill="#fff"/>`;
let art;
if(/cruzeiro/.test(key))art=circle('#1354b2',star(33,22,4)+star(21,32,4)+star(43,33,4)+star(30,46,5)+star(37,37,3));
else if(/botafogo/.test(key))art=shield('#182026',star(32,32,19));
else if(/atletico-mineiro|^atletico /.test(key))art='<path d="m32 1 3 6h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" fill="#efbc33"/>'+shield('#182026','<path d="M16 33v16l7 7V33m9 0v28m9-28v23l7-7V33" stroke="#fff" stroke-width="5"/>'+text('CAM','#fff',28,15));
else if(/flamengo/.test(key))art=shield('#e32636','<path d="M9 26h46M9 45h46" stroke="#191d24" stroke-width="10"/>'+text('CRF','#fff',23,13));
else if(/palmeiras/.test(key))art=circle('#08764a','<circle cx="32" cy="36" r="17" fill="#fff"/>'+text('P','#08764a',47,31));
else if(/corinthians/.test(key))art='<path d="M31 4v60M12 54Q32 75 52 54M12 12l40 47M52 12 12 59" fill="none" stroke="#d52b38" stroke-width="5"/>'+circle('#f9faf9','<circle cx="32" cy="36" r="18" fill="#21262c"/>'+text('SCCP','#fff',40,11));
else if(/sao-paulo/.test(key))art='<path d="M4 7h56v20L32 68 4 27Z" fill="#fff" stroke="#24302d" stroke-width="2"/><path d="M8 29h23v30zm25 0h23L33 59Z" fill="#ec283c"/><path d="M33 29h23L33 59Z" fill="#161d22"/>'+text('SPFC','#172026',23,16);
else if(/santos/.test(key))art=shield('#fff','<path d="M16 30v23m10-23v29m12-29v29m10-29v23" stroke="#172026" stroke-width="5"/>'+text('SFC','#172026',25,15));
else if(/gremio/.test(key))art=circle('#198fcb','<path d="M6 24h52v23H6Z" fill="#182128"/><path d="M5 24h54m-54 23h54" stroke="#fff" stroke-width="3"/>'+text('GRÊMIO','#fff',39,12));
else if(/internacional/.test(key))art=circle('#e32139',text('SCI','#fff',45,24));
else if(/fluminense/.test(key))art=shield('#842a46','<path d="M32 10h23v27c0 12-11 21-23 27Z" fill="#126c56"/>'+text('FFC','#fff',40,18));
else if(/vasco/.test(key))art=shield('#182128','<path d="M10 48 53 13v14L18 58Z" fill="#fff"/><path d="M32 21h8v8h8v8h-8v8h-8v-8h-8v-8h8Z" fill="#df2b3b"/>');
else if(/athletico|atletico-paranaense/.test(key))art=shield('#1b2027','<path d="m11 45 33-32h10L17 55m7 4 31-30v12L33 63" fill="#f12a42"/>'+text('CAP','#fff',25,13));
else if(/bahia/.test(key))art=circle('#1b73c6','<circle cx="32" cy="36" r="17" fill="#fff"/><path d="M23 24v25m9-28v31m9-28v25" stroke="#ed3546" stroke-width="5"/>'+text('ECB','#fff',14,8));
else if(/fortaleza/.test(key))art='<path d="M4 9h56v18L32 68 4 27Z" fill="#fff" stroke="#213b60" stroke-width="2"/><path d="M8 29h23v30zm25 0h23L33 59Z" fill="#df3544"/><path d="M33 29h23L33 59Z" fill="#1473c1"/>'+text('FEC','#183253',24,16);
else if(/ceara/.test(key))art=shield('#fff','<path d="M15 30v23m11-23v29m12-29v29m11-29v23" stroke="#182128" stroke-width="5"/>'+text('CSC','#182128',24,15));
else if(/coritiba|goias|guarani/.test(key))art=circle(p.primary,text(short,'#fff',43,19));
else if(/real-madrid/.test(key))art='<path d="m14 10 4-8 9 5 5-6 5 6 9-5 4 8Z" fill="#ebc449"/>'+circle('#fff','<path d="m12 45 32-29 8 10-32 29Z" fill="#6a4bac"/>'+text('M','#d4a82a',47,31));
else if(/barcelona/.test(key))art=shield('#e9b52c','<path d="M10 32h44v16L32 63 10 48Z" fill="#174f9d"/><path d="M20 33v21m12-21v27m12-27v21" stroke="#b4213e" stroke-width="6"/>'+text('FCB','#24302f',27,14));
else if(/juventus/.test(key))art=text('J','#19212b',58,58);
else if(/dortmund/.test(key))art=circle('#ffe428',text('BVB','#172024',36,18)+text('09','#172024',53,15));
else if(/bayern/.test(key))art=circle('#dc2441','<circle cx="32" cy="36" r="17" fill="#fff"/><path d="m22 21 10 15-10 15m10-30 10 15-10 15" fill="#198ddd"/>'+text('FCB','#fff',14,8));
else if(/paris-saint-germain|^psg /.test(key))art=circle('#07559b','<path d="m32 16-13 38h8l5-18 5 18h8Z" fill="#ef3152"/>'+text('PARIS','#fff',14,8));
else if(/manchester-city/.test(key))art=circle('#76bbdf','<circle cx="32" cy="36" r="19" fill="#fff"/><path d="m22 38 10-18v18m3-15 9 15H35Z" fill="#e5bc48"/><path d="m20 41 24 0-5 9H25Z" fill="#264c72"/>');
else if(/liverpool/.test(key))art=shield('#df293c',text('LFC','#fff',43,21));
else if(/arsenal/.test(key))art=shield('#dd2b37','<circle cx="25" cy="40" r="9" fill="none" stroke="#e9c471" stroke-width="3"/><path d="M17 32h35v5H17Z" fill="#e9c471"/>'+text('ARS','#fff',23,13));
else art=shield(p.primary,`<path d="M10 46 54 13v12L17 58Z" fill="${p.secondary}"/>`+text(short,ink,31,short.length>3?13:17));
return `<svg xmlns="http://www.w3.org/2000/svg" class="club-crest" viewBox="0 0 64 72" width="${size}" height="${Math.round(size*1.125)}" aria-hidden="true">${art}</svg>`}
function crestClubLabel(club,short=false){if(!club)return '<span class="club-label unknown-club">Adversário a definir</span>';const p=clubPalette(club),ink=clubThemeTokens(club).accent;return `<span class="club-label club-with-crest" style="--club-a:${p.primary};--club-b:${p.secondary};--club-ink:${ink}" title="${esc(club.name)}">${clubCrest(club)}<span>${esc(short?(club.short||club.name):club.name)}</span></span>`}
clubIdentity=crestClubLabel;
function decorateClubNames(){if(state){const header=document.querySelector('.header-inner');if(header)header.style.setProperty('--current-club-badge','url("data:image/svg+xml,'+encodeURIComponent(clubCrest(getUserClub(),20))+'")')}const clubs=[...(state?.clubs||[]),...(slots||[]).flatMap(s=>s?.clubs||[]),...Object.values(state?.world||{}).flatMap(w=>w.clubs||[]),...Object.values(LEAGUES).flatMap(l=>l.clubs),...Object.values(state?.stateChampionships||{}).flatMap(c=>c.clubs||[])],names=new Map(),shorts=new Map();for(const c of clubs){if(!names.has(c.name))names.set(c.name,c);if(c.short&&!shorts.has(c.short))shorts.set(c.short,c)}const walker=document.createTreeWalker(document.getElementById('app'),NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement.closest('script,style,svg,option,textarea,.club-with-crest,.club-crest,.story-copy,.editorial-art,.bracket-champion'))nodes.push(n)}for(const n of nodes){const v=n.textContent.trim(),c=names.get(v)||(v.length>=2?shorts.get(v):null);if(!c)continue;const span=document.createElement('span');span.className='club-with-crest';span.innerHTML=clubCrest(c)+'<span>'+esc(v)+'</span>';n.replaceWith(span)}}
const crestShell=renderShell;renderShell=function(){crestShell();decorateClubNames();positionOfficialField()};

const crestHome=renderHome;renderHome=function(){crestHome();decorateClubNames();positionOfficialField()};

const crestCalendarEvent=calendarEvent;calendarEvent=function(event,compact=false){const html=crestCalendarEvent(event,compact);return event.competition?html.replace('<span class="fixture-comp">','<span class="fixture-comp">'+competitionEmblem(event.competition,16)):html};
const oldClubCrest=crest;crest=function(short,extra=''){const clubs=[...(state?.clubs||[]),...Object.values(LEAGUES).flatMap(l=>l.clubs)];const club=clubs.find(c=>c.short===short);return club?clubCrest(club,extra?24:38):oldClubCrest(short,extra)};
