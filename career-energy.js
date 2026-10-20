'use strict';
// Fatigue belongs exclusively to ranked Arena fixtures; career has full energy.
(()=>{function fresh(){if(typeof state==='undefined'||!state)return;for(const c of state.clubs||[])for(const p of c.roster||[])p.energy=100}const previous=render;render=function(){fresh();return previous()};fresh()})();
