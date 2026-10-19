'use strict';
// Pure presentation rules shared by career, Arena and the field renderer.
(function(root){
 const rgb=hex=>/^#[\da-f]{6}$/i.test(hex||'')?hex.slice(1).match(/../g).map(c=>parseInt(c,16)):[32,35,39];
 const brightness=c=>rgb(c).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0)/255;
 const distance=(a,b)=>Math.hypot(...rgb(a).map((v,i)=>(v-rgb(b)[i])*[.9,1.1,.9][i]));
 function kits(teams){const result=teams.map(t=>({...t,...(t.finish==='gold'?{primary:'#d6aa35',secondary:'#573b15'}:{}),colors:t.colors?{...t.colors}:undefined})),colors=t=>t.colors||t,home=colors(result[0]),away=colors(result[1]);const swapped=result[0].pattern!=='plain'&&result[1].pattern!=='plain'&&distance(home.primary,away.secondary)<100&&distance(home.secondary,away.primary)<100;const pale=Math.min(brightness(home.primary),brightness(away.primary))>.72&&Math.abs(brightness(home.primary)-brightness(away.primary))<.18;if(distance(home.primary,away.primary)>=150&&!swapped&&!pale)return result;
 const alternate={finish:'standard',primary:away.secondary,secondary:away.primary,pattern:'plain'};if(distance(home.primary,alternate.primary)<150||Math.min(brightness(home.primary),brightness(alternate.primary))>.72){const options=['#fafafa','#142133'];alternate.primary=options.sort((a,b)=>distance(home.primary,b)-distance(home.primary,a))[0];alternate.secondary=alternate.primary==='#fafafa'?'#142133':'#fafafa'}
 if(result[1].colors)Object.assign(result[1].colors,alternate);else Object.assign(result[1],alternate);result[1].pattern='plain';result[1].alternateKit=true;return result}
 function positions(formation='433',side=0,secondHalf=false,preKickoff=false){const shapes={'433':[4,3,3],'442':[4,4,2],'4231':[4,5,1],'352':[3,5,2],'343':[3,4,3],'532':[5,3,2]},f=shapes[formation]||shapes['433'];let points=[[8,50]];if(formation==='4231')points.push([24,15],[24,38],[24,62],[24,85],[42,32],[42,68],[61,18],[61,50],[61,82],[79,50]);else f.forEach((n,row)=>{for(let i=0;i<n;i++)points.push([row===0?24:row===1?47:76,n===1?50:15+i*70/(n-1)])});if(preKickoff)points=points.map(([x,y],i)=>[i===0?8:12+x*.46,y]);const direction=(side===0?1:-1)*(secondHalf?-1:1);return points.map(([x,y])=>[direction>0?x:100-x,side===0?y:100-y])}
 root.FutBRMatchVisuals={kits,distance,positions};if(typeof module!=='undefined')module.exports=root.FutBRMatchVisuals;
})(globalThis);
