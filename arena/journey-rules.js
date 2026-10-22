'use strict';
(function(root){
 const stages=[
 {name:'Praça FC',primary:'#e95f29',formation:'442',tactic:'Equilibrado',coins:100,xp:100,tickets:0},
 {name:'Porto do Sol',primary:'#168bc1',formation:'433',tactic:'Ofensivo',coins:135,xp:140,tickets:0},
 {name:'Ferrovia United',primary:'#7553be',formation:'532',tactic:'Defensivo',coins:170,xp:180,tickets:1},
 {name:'Estrela da Serra',primary:'#cf386b',formation:'4231',tactic:'Equilibrado',coins:205,xp:220,tickets:0},
 {name:'Real Aurora',primary:'#b98b17',formation:'343',tactic:'Ofensivo',coins:240,xp:260,tickets:1}
 ];
 const thresholds=[0,100,250,450,700,1000,1400,1900,2500,3300];
 function migrate(p){p.clubXP=p.clubXP??((p.games||0)*35+(p.wins||0)*15);p.packTickets=p.packTickets||0;p.cupCleared=[...new Set((p.cupCleared||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<stages.length))];return p}
 function level(xp=0){let index=0;thresholds.forEach((n,i)=>{if(xp>=n)index=i});const min=thresholds[index],next=thresholds[index+1];return {number:index+1,next:next??null,progress:next?Math.min(100,(xp-min)/(next-min)*100):100}}
 function settle(p,mode,score,stage,penaltyWin){migrate(p);const reward={coins:0,xp:0,tickets:0,firstClear:false};if(mode==='cup'){const s=stages[stage];if(!s||stage>p.cupCleared.length)throw Error('Etapa indisponível');if((score[0]>score[1]||score[0]===score[1]&&penaltyWin===true)&&!p.cupCleared.includes(stage)){p.cupCleared.push(stage);Object.assign(reward,{coins:s.coins,xp:s.xp,tickets:s.tickets,firstClear:true})}}else if(mode==='ranked'){reward.xp=35+(score[0]>score[1]?15:0)}else if(mode==='friendly')reward.xp=20;p.coins+=reward.coins;p.clubXP+=reward.xp;p.packTickets+=reward.tickets;return reward}
 const rules={stages,thresholds,migrate,level,settle};root.FutBRJourney=rules;if(typeof module!=='undefined')module.exports=rules;
})(globalThis);
