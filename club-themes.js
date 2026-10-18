'use strict';
// Club identities are separate from the accessible UI accent. Very light kit
// colors keep their identity while text and focus indicators use a darker tone.
const CLUB_COLOR_GROUPS=[
 ['#c61d2b','#181a1d','Flamengo;Athletico Paranaense;Vitória;Sport;Atlético-GO;Ituano;Oeste;Joinville;Moto Club;Guarany de Bagé;Campinense;River-PI;Guarany-SE;Bournemouth;AC Milan;Bayer Leverkusen;Freiburg;Nice;OGC Nice;Milan;Foggia'],
 ['#202327','#ffffff','Corinthians;Atlético Mineiro;Botafogo;Santos;Vasco da Gama;Ceará;Ponte Preta;ABC;Treze;Operário-PR;Operário-MS;Central;Botafogo-PB;Botafogo-SP;Rio Branco-ES;Rio Branco-AC;Nacional de Patos;ASA;Figueirense;Ferroviário-CE;Juventus;Newcastle United;Fulham;Derby County;Udinese;Cesena;Spezia;Ascoli;Angers SCO;Portimonense'],
 ['#17683f','#ffffff','Palmeiras;Coritiba;Goiás;América-MG;Guarani;Juventude;Chapecoense;Sousa;Altos;Floresta;Murici;Coruripe;Gama;Luverdense;Nova Mutum;CSE;Avenida;Hercílio Luz;Velo Clube;Santa Cruz de Natal;Baré;Rio Branco-VN;Real Betis;Saint-Étienne;Werder Bremen;Wolfsburg;Racing Ferrol;Plymouth Argyle;Sporting CP;Celtic;Panathinaikos'],
 ['#a51b3c','#17683f','Fluminense;Sampaio Corrêa-MA;Aparecidense;Portuguesa-SP;Tocantinópolis'],
 ['#c91e32','#ffffff','Internacional;Náutico;CRB;Vila Nova;América-RN;Tombense;Brusque;América de Propriá;Sergipe;São Luiz;Guarany de Sobral;Audax-RJ;Mogi Mirim;Arsenal;Liverpool;Manchester United;Nottingham Forest;Sunderland;Bayern Munich;Mainz 05;Union Berlin;VfB Stuttgart;Cologne;1. FC Köln;1. FC Kaiserslautern;Hannover 96;Bari;Monza;Reims;Nancy;Stade Brestois;Stade Rennais;Benfica;Estrela Vermelha'],
 ['#1567a5','#ffffff','Cruzeiro;Avaí;CSA;Confiança;Paraná Clube;São José-RS;São José-SP;Tuna Luso;Capital-DF;Piauí;Rondoniense;Cruzeiro-AL;Confiança-PB;Itacoatiara;Nacional-AM;Paysandu;São Raimundo-AM;Chelsea;Everton;Leicester City;Birmingham City;Portsmouth;Ipswich Town;Queens Park Rangers;Blackburn Rovers;Deportivo Alavés;Espanyol;Real Sociedad;Deportivo La Coruña;Málaga CF;Málaga;Getafe CF;Hoffenheim;Hamburg;Hamburger SV;Schalke 04;Como;Empoli;Sampdoria;Brescia;AJ Auxerre;Troyes;Strasbourg;Bastia;Dunkerque;Rangers;FC Porto'],
 ['#202327','#f2c12e','Criciúma;Novorizontino;São Bernardo;Amazonas FC;Guaporé;GAS-RR;Volta Redonda;Borussia Dortmund;Elversberg;SV Elversberg;Hull City;Watford;Wolverhampton;Oxford United;Young Boys;Peñarol;The Strongest'],
 ['#f0c52c','#257341','Mirassol;Ypiranga-RS;Brasiliense;Cuiabá;Ivinhema;Bela Vista-TO;Norwich City;Nantes'],
 ['#186b9c','#202327','Grêmio;Marília;Gremio Prudente'],
 ['#b6192d','#1c3f84','Bahia;Fortaleza;Paraná;Tiradentes;Atlético de Cajazeiras;Itabaiana;Fast Clube;Barcelona;Crystal Palace;Genoa;Bologna;Cagliari;Caen;Le Mans;Le Mans FC;Catania;FC Basel;Cerro Porteño'],
 ['#202327','#c52232','São Paulo;Santa Cruz;Botafogo-SP;Botafogo-PB;Atlético-GO;Atlético Roraima;Anápolis;JEC;São Paulo-AP;Eintracht Frankfurt'],
 ['#25385c','#ffffff','Remo;Rio Negro-RR;Batalhão;Tottenham Hotspur;Preston North End;Millwall;Bordeaux'],
 ['#78b8d5','#ffffff','Londrina;Lazio;Celta Vigo;Manchester City;Coventry City;Pescara'],
 ['#e58724','#ffffff','Nova Iguaçu;Andraus;Lorient;Shakhtar Donetsk;Dundee United'],
 ['#74364f','#ffffff','Ferroviária;Juventus-SP;Caxias;Jacuipense;Desportiva Ferroviária;Tocantins de Miracema;Torino;Salernitana;Reggiana;Metz;Hearts'],
 ['#127042','#c31f35','Maricá;Barcelona de Ilhéus;Pombal;Maranguape;Galvez;Lagarto;Real Noroeste;Fluminense-PI'],
 ['#1e5a9e','#c91f33','Maranhão;Serra Branca;São Raimundo-RR;Galícia;Esporte de Patos;Bahia de Feira;São Francisco-AC'],
 ['#b0273f','#5aa4cc','Aston Villa;West Ham United;Burnley'],
 ['#163d8c','#ffffff','São Joseense;CRAC;URT;Oeirense;Capital-TO;Gurupi;Ji-Paraná;Vilhenense;Macapá;Santana;Independente-AP;Atlético-PI;Parnahyba;IAPE;Pinheiro;Brighton;West Bromwich Albion;Sheffield Wednesday;Bristol Rovers;Birmingham;Le Havre;Paris FC;Padova;Real Oviedo;Tenerife;Leganés'],
 ['#ffffff','#d4b65a','Real Madrid'],['#ffffff','#18306b','Leeds United'],
 ['#ce1e36','#ffffff','Athletic Club;Atlético de Madrid;Sevilla FC;Rayo Vallecano;Southampton;Sheffield United;Stoke City;Charlton Athletic;Bristol City;Mirandés;Sporting Gijón;Almería;Granada;Girona;RB Leipzig;PSV;Olympiacos'],
 ['#f1cd37','#164b97','Villarreal CF;Cádiz;Las Palmas;Alcorcón;Frosinone;Modena;Juve Stabia;Carrarese'],
 ['#f5f5f1','#1d2732','Valencia CF;Castellón;Burgos'],['#1b7060','#ffffff','Racing Santander;Elche CF'],
 ['#233562','#bd263c','Osasuna;Levante UD;Eibar;Huesca;Eldense'],['#f1c437','#1c4777','Parma'],
 ['#286ab2','#202327','Atalanta;Inter Milan;Pisa'],['#1d418b','#dbb036','Retrô;Madureira;Boca Juniors'],
 ['#a51d34','#e8b541','Roma;Galatasaray;Catanzaro'],['#7952a3','#ffffff','Fiorentina;Toulouse FC;Real Valladolid;Valladolid'],
 ['#1e9257','#202327','Sassuolo;Maringá FC'],['#edb931','#c72c33','Lecce;RC Lens;Araguaína'],
 ['#188cc5','#ffffff','Napoli;Olympique de Marseille'],['#ec91af','#202327','Palermo'],['#23643e','#e7802c','Venezia'],
 ['#1a3761','#ce2639','Paris Saint-Germain'],['#c22638','#244e8f','Olympique Lyonnais;LOSC Lille;Clermont Foot'],
 ['#c92132','#ffffff','AS Monaco'],['#176342','#ffffff','Red Star'],['#ee632c','#202327','Laval'],
 ['#b72031','#ffffff','RB Bragantino;Red Bull Bragantino;Noroeste-SP;América-RN;Atlético-BA;Penedense;North;Audax;Rio Branco-PR;Bragantino-PA;Guarany de Bagé;Moto Club;Tuntum;Viana;Imperatriz;Capivariano;Guarany-SE;Dorense;Atlético Acreano;Vasco-AC;Rio Branco-AC;Pouso Alegre;Águia de Marabá;São Francisco-PA;Comercial-PI;4 de Julho;Picos;Teresina;Sampaio Corrêa-RJ'],
 ['#194177','#ffffff','Água Santa;Betim;Primavera-SP;Porto-BA;Jequié;Cariri;Quixadá;Potyguar Seridoense;QFC;Humaitá;Princesa do Solimões;Barcelona-RO;Progresso-RR;Carlos Renaux;Jaguar-PE;Vitória-PE;Decisão;Maguary'],
 ['#246e41','#ffffff','Uberlândia;Itabirito;Caldense;Boavista;Jataiense;Independência;Real Brasília;Sobradinho;Paranoá;Samambaia;Porto Velho;Real Ariquemes;União Cacoalense;Barra FC;Concórdia;Santa Catarina;Carmópolis'],
 ['#25272b','#ffffff','Democrata GV;Mixto;Operário-MT;Inter de Limeira;XV de Piracicaba;Ceilândia;Galo Maringá;Rio Negro-RR'],
 ['#f1c23f','#21642e','Manaus;Inhumas;Castanhal;Coxim'],
 ['#e4c229','#285795','Goiatuba;Maracanã-CE;Laguna;Oratório;Atlético-CE;União-TO'],
 ['#bd2738','#ffffff','Bangu;America-RJ;Anapolina;Inter de Santa Maria;Corumbaense'],
 ['#255a93','#ffffff','Goianésia;Nova Venécia;União-MT;Dourados;Aquidauanense'],
 ['#a22735','#236e43','Amazônia Independente'],
 ['#e2b532','#202327','Manauara;Águia Negra;Santa Rosa;Monsoon;FC Cascavel;Sparta'],
 ['#14674d','#ffffff','Trem;Náutico-RR'],
 ['#174e9b','#c42b36','Marcílio Dias;Luminense;Falcon;Canaã;Várzea Grande;Chapada;Sport Sinop'],
 ['#d4bb39','#202327','Primavera-MT;ABECAT;Caeté;Baraúnas'],
 ['#18569d','#ffffff','Iguatu;Cianorte;Azuriz;Horizonte;Brasília-DF;Rondoniense;Genus;Parintins'],
 ['#18713e','#c52e3a','Portuguesa-RJ'],
 ['#25272b','#edb52b',''],
 ['#1d436c','#eea3bb','Porto Vitória;Tirol-CE'],['#ca2638','#ffffff','Amadense'],
 ['#f5f5f1','#174d89','Real Sociedad B'],['#f4f4ef','#202327','Santos-AP']
];
CLUB_COLOR_GROUPS.push(
 ['#202327','#ffffff','Athletic;Swansea City;Albacete;Ceuta;Amiens'],
 ['#c51f31','#ffffff','Brentford;Middlesbrough;Wrexham;Fortuna Düsseldorf;Annecy;Nacional (URU);Estudiantes;Independiente;River Plate'],
 ['#c51f31','#202327','Brasil de Pelotas;Guingamp;Newell’s Old Boys'],
 ['#1c66a1','#ffffff','Vitória-ES;Real Zaragoza;Hertha BSC;Karlsruher SC;Darmstadt 98;1. FC Magdeburg;Holstein Kiel;VfL Bochum;Hansa Rostock;Grenoble'],
 ['#197248','#ffffff','Borussia Mönchengladbach;Córdoba;Greuther Fürth;Avellino'],
 ['#bf2535','#247346','Augsburg;Blumenau'],
 ['#1d5895','#202327','Paderborn;SC Paderborn;Arminia Bielefeld'],
 ['#ffffff','#c51f31','Cultural Leonesa;Südtirol;Mantova'],
 ['#f0c22e','#224d94','Eintracht Braunschweig;Pau;Monte Roraima'],
 ['#f0c22e','#202327','Dynamo Dresden'],
 ['#ffffff','#76b9dc','Virtus Entella'],
 ['#287149','#202327','Preußen Münster'],
 ['#783145','#ffffff','Cittadella'],
 ['#7f2633','#202327','1. FC Nürnberg'],
 ['#f0c22e','#bf2535','Rodez;Martigues'],
 ['#244779','#e58c21','Montpellier;Andorra'],
 ['#be2432','#e5bb37','Juazeirense'],
 ['#156eac','#ffffff','Vélez Sarsfield;Talleres;Universidad Católica;Millonarios;Vélez;Qarabağ'],
 ['#1e3f84','#edbd2c','Rosario Central;Everton de Viña del Mar;Maccabi Tel Aviv;Fenerbahçe'],
 ['#263879','#bf283c','San Lorenzo;Universidad de Chile;Cerro Porteño'],
 ['#742a42','#ffffff','Lanús;Deportes Tolima'],
 ['#bf2434','#ffffff','Argentinos Juniors;Huracán;Instituto;Junior;América de Cali;Santa Fe;Universitario;Always Ready;Carabobo;Ajax;AZ Alkmaar;Feyenoord;Slavia Praha;FC Copenhagen;Braga;SC Braga;Viktoria Plzeň'],
 ['#1a5897','#ffffff','Godoy Cruz;Tigre;Emelec;Liverpool (URU);Dynamo Kyiv;Lech Poznań'],
 ['#e8c127','#278549','Defensa y Justicia'],
 ['#6bb9dc','#ffffff','Belgrano;Bolívar;Sporting Cristal'],
 ['#1f734b','#ffffff','Banfield;Atlético Nacional;Deportivo Cali;Palestino;Ferencváros;Legia Warszawa'],
 ['#ffffff','#202327','Colo-Colo;Olimpia;Libertad;Nacional (PAR);LDU Quito;Alianza Lima;Once Caldas;Beşiktaş;PAOK;Lugano'],
 ['#78394e','#ffffff','Defensor Sporting;CFR Cluj;Sparta Praha'],
 ['#121b21','#5eace1','Montevideo City Torque;Huachipato;Club Brugge'],
 ['#121b21','#f0c927','Guaraní;Aucas;Deportivo Táchira;The Strongest'],
 ['#f0c927','#b92632','Barcelona SC'],
 ['#ec7725','#167940','Cobresal'],
 ['#e0e0d6','#c32134','O’Higgins'],
 ['#193a7e','#1c2731','Independiente del Valle'],
 ['#c22735','#1f2731','Melgar;Midtjylland'],
 ['#1e76ad','#be2736','Monagas;Dinamo Zagreb'],
 ['#f0c927','#234a8a','Union Saint-Gilloise;Bodø/Glimt'],
 ['#79549d','#ffffff','Anderlecht'],
 ['#c12535','#ffffff','Red Bull Salzburg'],
 ['#202327','#ffffff','Sturm Graz'],
 ['#65accc','#ffffff','Malmö FF'],
 ['#256947','#ffffff','Panathinaikos'],
 ['#bd2737','#1c4777','']
);
CLUB_COLOR_GROUPS.push(
 ['#1f5d99','#ffffff','ARUC;Costa Rica-MS;Cametá;Foz do Iguaçu;Novo Hamburgo'],
 ['#245292','#e3be38','Plácido de Castro;Centro Oeste;Capixaba;Pantanal'],
 ['#202327','#ffffff','Ypiranga-AP'],['#c92635','#214b87','Vilavelhense'],
 ['#26733f','#ffffff','Naviraiense'],['#20734d','#235a93','Jaguaré'],
 ['#e68a26','#26568c','Capitão Poço'],['#c92332','#ffffff','Potiguar de Mossoró'],
 ['#e7c234','#c52b35','Globo'],['#c92935','#202327','River-RR'],
 ['#e98628','#2b7553','Camboriú']
);
const CLUB_THEME_BY_NAME=new Map();
for(const [primary,secondary,names]of CLUB_COLOR_GROUPS)for(const name of names.split(';'))if(name)CLUB_THEME_BY_NAME.set(slugify(name),{primary,secondary});
const CLUB_THEME_BY_ID=new Map();
for(const club of [...Object.values(baseDatabase.leagues).flatMap(l=>l.clubs),...Object.values(STATE_CLUB_BASE.championships).flatMap(c=>c.clubs),...SAX,...EUO]){const theme=CLUB_THEME_BY_NAME.get(slugify(club.name));if(theme)CLUB_THEME_BY_ID.set(club.id,theme)}
const safeClubColor=c=>typeof c==='string'&&/^#[0-9a-f]{6}$/i.test(c);
function clubPalette(club){if(club?.colors&&safeClubColor(club.colors.primary)&&safeClubColor(club.colors.secondary))return {...club.colors};return {...(CLUB_THEME_BY_ID.get(club?.id)||CLUB_THEME_BY_NAME.get(slugify(club?.name||''))||{primary:'#347653',secondary:'#d5ebba'})}}
function colorRGB(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))}
function colorLuminance(hex){const c=colorRGB(hex).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function colorContrast(a,b){const x=colorLuminance(a),y=colorLuminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function mixClubColor(a,b,t){return '#'+colorRGB(a).map((v,i)=>Math.round(v*(1-t)+colorRGB(b)[i]*t).toString(16).padStart(2,'0')).join('')}
function clubThemeTokens(club){const palette=clubPalette(club);const primary=palette.primary.toLowerCase(),secondary=palette.secondary.toLowerCase();let accent=colorContrast(primary,'#ffffff')>=4.5?primary:secondary;for(let n=0;n<20&&(colorContrast(accent,'#ffffff')<4.5||colorContrast(accent,mixClubColor(accent,'#ffffff',.92))<4.5);n++)accent=mixClubColor(accent,'#18251d',.15);const foreground=colorContrast(primary,'#ffffff')>=colorContrast(primary,'#000000')?'#ffffff':'#000000';return {primary,secondary,accent,foreground,tint:mixClubColor(accent,'#ffffff',.92),page:mixClubColor(accent,'#ffffff',.975),border:mixClubColor(accent,'#ffffff',.8)}}
function applyClubTheme(club){const root=document.documentElement,body=document.body;if(!club){delete body.dataset.clubTheme;for(const k of ['primary','secondary','accent','foreground','tint','page','border'])root.style.removeProperty('--club-'+k);root.style.removeProperty('--acc');return}const tokens=clubThemeTokens(club);body.dataset.clubTheme=club.id;for(const [k,v]of Object.entries(tokens))root.style.setProperty('--club-'+k,v);root.style.setProperty('--acc',tokens.accent)}
function paintClubIdentity(){if(!state)return;const club=getUserClub();applyClubTheme(club);const header=$('.header-inner');if(header){header.dataset.clubName=club.name+' / CENTRAL DO CLUBE';header.querySelector('.header-coach')?.setAttribute('title',state.coach+' · '+club.name)}const game=currentUserGame();if(game){for(const [side,id]of [['home',game.homeId],['away',game.awayId]]){const palette=clubPalette(getClub(id));document.documentElement.style.setProperty('--club-'+side,palette.primary);document.documentElement.style.setProperty('--club-'+side+'-secondary',palette.secondary)}}const tacticalTeams=document.querySelectorAll('.tactical-team');for(const team of tacticalTeams){const other=game?getClub(game.homeId===club.id?game.awayId:game.homeId):club;const palette=clubPalette(team.classList.contains('opponent-team')?other:club);team.style.setProperty('--kit-primary',palette.primary);team.style.setProperty('--kit-secondary',palette.secondary)}}
const themedShell=renderShell;renderShell=function(){if(state)applyClubTheme(getUserClub());themedShell();paintClubIdentity()};
const themedHome=renderHome;renderHome=function(){applyClubTheme(null);themedHome();previewClubTheme()};
function previewClubTheme(){const select=$('#club-select');if(!select||portalPage!=='new')return;const league=LEAGUES[$('#league-select')?.value],club=league?.clubs.find(c=>c.id===select.value);if(!club)return;applyClubTheme(club);$('#club-theme-preview')?.remove();const p=clubPalette(club);select.closest('.field').insertAdjacentHTML('beforeend',`<div id="club-theme-preview" class="club-theme-preview"><span style="background:${p.primary}"></span><span style="background:${p.secondary}"></span><strong>${esc(club.name)}</strong><small>Suas cores, sua carreira</small></div>`)}
document.addEventListener('change',e=>{if(['club-select','league-select'].includes(e.target.id))previewClubTheme()});
const themedBuildClub=buildClub;buildClub=function(template){const club=themedBuildClub(template);club.colors=clubPalette(template);return club};
const themedTrackerPaint=paintTracker;paintTracker=function(){themedTrackerPaint();const club=state?.match?.tracker?getClub(state.match.tracker.teamId):null;if(club){const p=clubPalette(club),el=$('.tracker-club i');if(el){el.style.background=p.primary;el.style.setProperty('color',colorContrast(p.primary,'#ffffff')>=colorContrast(p.primary,'#000000')?'#ffffff':'#000000','important');el.style.borderColor=p.secondary}}};
function editingColorClub(){const c=getEditor();if(editorTab==='regionals')return c.stateChampionships[selectedEditorUF]?.clubs.find(club=>club.id===selectedRegionalClub);if(editorTab==='clubs')return c.leagues[editorLeague]?.clubs.find(club=>club.id===editorClub);return null}
const themedEditor=renderEditor;renderEditor=function(){themedEditor();appendClubColorEditor()};
const themedStateEditor=renderStateEditor;renderStateEditor=function(){themedStateEditor();appendClubColorEditor()};
function appendClubColorEditor(){const club=editingColorClub();if(!club||!$('#editor-form')||$('#club-color-editor'))return;const p=clubPalette(club);$('#editor-form').insertAdjacentHTML('afterbegin',`<fieldset id="club-color-editor" class="club-color-editor"><legend>Cores do clube</legend><label for="club-primary-color">Principal<input id="club-primary-color" type="color" value="${p.primary}"></label><label for="club-secondary-color">Secundária<input id="club-secondary-color" type="color" value="${p.secondary}"></label><span id="club-color-sample" style="--sample-primary:${p.primary};--sample-secondary:${p.secondary}">Uniforme e identidade</span></fieldset>`)}
const themedCollectEditor=collectEditor;collectEditor=function(){const club=editingColorClub();const a=$('#club-primary-color')?.value,b=$('#club-secondary-color')?.value;const ok=themedCollectEditor();if(!ok)return false;if(club&&safeClubColor(a)&&safeClubColor(b))club.colors={primary:a,secondary:b};return true};
const themedValidate=validateConfig;validateConfig=function(config){themedValidate(config);const clubs=[...Object.values(config.leagues||{}).flatMap(l=>l.clubs),...Object.values(config.stateChampionships||{}).flatMap(l=>l.clubs)];for(const c of clubs)if(c.colors&&(!safeClubColor(c.colors.primary)||!safeClubColor(c.colors.secondary)))throw Error('Cores do clube inválidas. Use cores no formato #RRGGBB.')};
document.addEventListener('input',e=>{if(!['club-primary-color','club-secondary-color'].includes(e.target.id))return;const sample=$('#club-color-sample');sample?.style.setProperty('--sample-primary',$('#club-primary-color').value);sample?.style.setProperty('--sample-secondary',$('#club-secondary-color').value)});
render();
