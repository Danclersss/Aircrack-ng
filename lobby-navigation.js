'use strict';
(()=>{
const icons={careers:'<path d="m4 11 8-7 8 7v9H4ZM9 20v-6h6v6"/>',new:'<path d="M12 4v16M4 12h16"/>',editor:'<path d="m4 17 12-12 3 3L7 20H4ZM13 8l3 3"/>',account:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>'};
function decorate(){for(const b of document.querySelectorAll('.portal-head nav button,.portal-head nav a')){if(b.querySelector('svg'))continue;const key=b.dataset.page||'account',kind=key==='careers'?'careers':key.includes('new')?'new':key.includes('editor')?'editor':'account';if(key==='careers')b.textContent='Lobby';b.insertAdjacentHTML('afterbegin',`<svg class="lobby-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${icons[kind]}</svg>`)}for(const b of document.querySelectorAll('.header-inner button,.portal-head button'))if(b.textContent.trim()==='Carreiras')b.textContent='Lobby'}
const home=renderHome;renderHome=function(){home();decorate()};if(typeof renderShell==='function'){const shell=renderShell;renderShell=function(){shell();decorate()}}decorate();
})();
