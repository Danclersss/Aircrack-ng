'use strict';
(()=>{
 document.body.classList.add('interface-clean');
 for(const key of ['--club-surface','--club-trim','--club-halo'])document.body.style.removeProperty(key);
 function tidyBuilder(){const layout=document.querySelector('.squad-studio');if(layout&&!layout.querySelector('.squad-main-column')){const field=layout.querySelector('.lineup-panel'),tactics=layout.querySelector('.tactics-panel');if(field&&tactics){const column=document.createElement('div');column.className='squad-main-column';field.before(column);column.append(field,tactics)}}const title=document.querySelector('.club-identity-bar strong');if(title)title.textContent='Identidade do clube';const edit=document.querySelector('#edit-identity');if(edit)edit.textContent='Editar identidade';}
 if(typeof ArenaApp!=='undefined'){
  const show=ArenaApp.show.bind(ArenaApp);ArenaApp.show=function(view){const changed=Online.view!==view;show(view);if(changed)window.scrollTo({top:0,behavior:'instant'})};
  const draw=ArenaApp.drawBuilder.bind(ArenaApp);ArenaApp.drawBuilder=function(){draw();tidyBuilder();};
  const init=Online.init.bind(Online);Online.init=async function(){await init();document.querySelector('#play-launch')?.remove();document.querySelector('.journey-invite')?.remove();document.body.classList.add('interface-ready');};
  const page=Online.page.bind(Online);Online.page=async function(view){await page(view);if(view==='shop'){const ad=document.querySelector('.optional-ad');if(ad&&document.querySelector('#watch-rewarded')?.disabled)ad.hidden=true;const exchange=document.querySelector('.exchange-banner p');if(exchange)exchange.textContent='Troque cópias extras por novos pacotes. A primeira carta permanece na coleção.';}}
 }
})();
