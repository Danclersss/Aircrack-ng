'use strict';
// Per-fixture records survive saves; yellow cards never leak into another match.
const DERBIES=[['flamengo','fluminense','vasco','botafogo'],['corinthians','palmeiras','saopaulo','santos'],['atletico','cruzeiro'],['gremio','internacional'],['bahia','vitoria'],['sport','nautico','santa-cruz'],['ceara','fortaleza'],['athletico','coritiba'],['remo','paysandu'],['goias','vila-nova','atletico-go']];
function matchIntensity(home,away){const derby=DERBIES.some(ids=>ids.includes(home.id)&&ids.includes(away.id));const pressing=[home,away].filter(c=>c.pressing==='Alto').length;return {derby,foulRate:.255+(derby?.085:0)+pressing*.018,cardRate:.16+(derby?.035:0)+pressing*.01}}
function disciplineFor(game){return game.discipline||(game.discipline={fouls:[0,0],yellow:[0,0],red:[0,0],players:{},lastMinute:0})}
function sentOff(club,id){const game=state?.match?.games?.find(g=>g.homeId===club.id||g.awayId===club.id);return !!game?.discipline?.players[id]?.red}
const disciplinedLineup=lineupPlayers;lineupPlayers=function(club){return disciplinedLineup(club).filter(p=>!sentOff(club,p.id))};
const disciplinedKeeper=activeKeeper;activeKeeper=function(club){const p=disciplinedKeeper(club);return p&&!sentOff(club,p.id)?p:null};
const disciplinedSector=sector;sector=function(club,types){return disciplinedSector(club,types)*(.55+.45*lineupPlayers(club).length/11)};
function commitMatchFoul(game,minute,offenderClub,player,severity,cardRoll=Math.random()){
 const d=disciplineFor(game),side=offenderClub.id===game.homeId?0:1;if(!player||d.players[player.id]?.red)return;
 const record=d.players[player.id]||(d.players[player.id]={yellow:0,red:false});d.fouls[side]++;
 const opponent=getClub(side===0?game.awayId:game.homeId);game.events.push({minute,type:'foul',teamId:opponent.id,offenderId:player.id,offenderTeamId:offenderClub.id,text:`Falta de ${player.name} (${offenderClub.name}) · ${severity==='violent'?'entrada violenta':severity==='reckless'?'entrada temerária':'disputa de bola'}.`});
 const intensity=matchIntensity(getClub(game.homeId),getClub(game.awayId));const direct=severity==='violent',yellow=severity==='reckless'||cardRoll<intensity.cardRate*(record.yellow?.2:1);
 if(direct||yellow){if(!direct){record.yellow++;d.yellow[side]++}const red=direct||record.yellow>=2;if(red){record.red=true;d.red[side]++}game.events.push({minute,type:red?'red-card':'yellow-card',teamId:offenderClub.id,playerId:player.id,text:`${red?'🟥':'🟨'} ${player.name} (${offenderClub.name}): ${direct?'vermelho direto por entrada violenta':red?'segundo amarelo e expulsão':'cartão amarelo'}.`})}
}
const disciplinedSimulation=simulateGameMinute;simulateGameMinute=function(game,minute){if(game.finished)return;const home=getClub(game.homeId),away=getClub(game.awayId);if(!home||!away)return;const d=disciplineFor(game);if(d.lastMinute===minute)return;d.lastMinute=minute;
 if(Math.random()<matchIntensity(home,away).foulRate){const club=Math.random()<.5?home:away;const available=lineupPlayers(club);if(available.length>7){const player=pick(available),severityRoll=Math.random();commitMatchFoul(game,minute,club,player,severityRoll<.004?'violent':severityRoll<.024?'reckless':'ordinary')}}
 disciplinedSimulation(game,minute)
};
const disciplinedSub=doSub;doSub=function(outId,inId){if(sentOff(getUserClub(),outId)||sentOff(getUserClub(),inId))return toast('Um jogador expulso não pode ser substituído.');return disciplinedSub(outId,inId)};

