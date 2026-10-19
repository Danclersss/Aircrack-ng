'use strict';
const crypto=require('node:crypto'),pool=require('../arena/players.js');
const items=['halves','chest','hoops','chevron','gold-crest','gold-kit'];
const eligible=pool.filter(p=>p.rating>=95);
function grant(p,orderId,at=Date.now()){
 p.packRewards=p.packRewards||[];let purchase=p.packRewards.find(x=>x.id===orderId);
 if(purchase?.rewardVersion===2)return purchase;
 if(new Set(eligible.map(p=>p.personId||p.id)).size<3)throw Error('Pool 95+ insuficiente.');
 const choices=[...eligible],cards=[],duplicates=[];p.owned=[...new Set(p.owned||[])];p.duplicates=p.duplicates||{};
 for(let i=0;i<3;i++){const card=choices[crypto.randomInt(choices.length)],duplicate=p.owned.includes(card.id);cards.push(card.id);duplicates.push(duplicate);if(duplicate)p.duplicates[card.id]=(p.duplicates[card.id]||0)+1;else p.owned.push(card.id);for(let j=choices.length-1;j>=0;j--)if((choices[j].personId||choices[j].id)===(card.personId||card.id))choices.splice(j,1)}
 p.cosmetics=[...new Set([...(p.cosmetics||[]),...items])];if(!purchase){purchase={id:orderId,pack:'founders',at};p.packRewards.push(purchase)}Object.assign(purchase,{rewardVersion:2,cards,duplicates,revealed:false});return purchase;
}
function reveal(p,orderId){const purchase=p.packRewards?.find(x=>x.id===orderId&&x.rewardVersion===2);if(!purchase)return null;purchase.revealed=true;return purchase.cards.map((id,i)=>({...pool.find(p=>p.id===id),duplicate:!!purchase.duplicates[i]}))}
module.exports={items,eligible,grant,reveal};
