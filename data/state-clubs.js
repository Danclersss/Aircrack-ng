'use strict';
// Working first-division rosters. Membership is editable and is not represented
// as federation-verified for 2026; see data/README.md before updating this base.
const STATE_ROSTER_ROWS={
 AC:['Campeonato Acreano','Independência;Rio Branco-AC;Atlético Acreano;Galvez;Humaitá;São Francisco-AC;Plácido de Castro;Vasco-AC'],
 AL:['Campeonato Alagoano','CRB;CSA;ASA;CSE;Coruripe;Murici;Penedense;Cruzeiro-AL'],
 AP:['Campeonato Amapaense','Trem;Oratório;Santos-AP;São Paulo-AP;Ypiranga-AP;Santana;Independente-AP;Macapá'],
 AM:['Campeonato Amazonense','Amazonas FC;Manaus;Manauara;Nacional-AM;Princesa do Solimões;São Raimundo-AM;Parintins;Itacoatiara'],
 BA:['Campeonato Baiano','Bahia;Vitória;Atlético-BA;Jacuipense;Juazeirense;Jequié;Porto-BA;Barcelona de Ilhéus;Bahia de Feira;Galícia'],
 CE:['Campeonato Cearense','Ceará;Fortaleza;Ferroviário-CE;Iguatu;Maracanã-CE;Tirol-CE;Horizonte;Floresta;Quixadá;Maranguape'],
 DF:['Campeonato Brasiliense','Gama;Brasiliense;Capital-DF;Ceilândia;Real Brasília;Sobradinho;Paranoá;Samambaia;Brasília-DF;ARUC'],
 ES:['Campeonato Capixaba','Rio Branco-ES;Vitória-ES;Desportiva Ferroviária;Real Noroeste;Porto Vitória;Nova Venécia;Rio Branco-VN;Vilavelhense;Jaguaré;Capixaba'],
 GO:['Campeonato Goiano','Goiás;Atlético-GO;Vila Nova;Anápolis;Aparecidense;Goiatuba;CRAC;ABECAT;Inhumas;Jataiense;Anapolina;Centro Oeste'],
 MA:['Campeonato Maranhense','Sampaio Corrêa-MA;Moto Club;Maranhão;Imperatriz;IAPE;Pinheiro;Tuntum;Luminense'],
 MT:['Campeonato Mato-Grossense','Cuiabá;Mixto;Operário-MT;União-MT;Luverdense;Primavera-MT;Nova Mutum;Sport Sinop;Chapada;Várzea Grande'],
 MS:['Campeonato Sul-Mato-Grossense','Operário-MS;Ivinhema;Dourados;Costa Rica-MS;Águia Negra;Corumbaense;Aquidauanense;Naviraiense;Coxim;Pantanal'],
 MG:['Campeonato Mineiro','Atlético Mineiro;Cruzeiro;América-MG;Athletic;Tombense;Uberlândia;Pouso Alegre;Democrata GV;Betim;Itabirito;URT;North'],
 PA:['Campeonato Paraense','Remo;Paysandu;Tuna Luso;Águia de Marabá;Castanhal;Bragantino-PA;Caeté;Santa Rosa;Cametá;São Francisco-PA;Capitão Poço;Amazônia Independente'],
 PB:['Campeonato Paraibano','Botafogo-PB;Campinense;Treze;Sousa;Serra Branca;Nacional de Patos;Esporte de Patos;Pombal;Atlético de Cajazeiras;Confiança-PB'],
 PR:['Campeonato Paranaense','Athletico Paranaense;Coritiba;Operário-PR;Londrina;Maringá FC;Cianorte;FC Cascavel;Azuriz;São Joseense;Andraus;Foz do Iguaçu;Galo Maringá'],
 PE:['Campeonato Pernambucano','Sport;Náutico;Santa Cruz;Retrô;Maguary;Decisão;Jaguar-PE;Vitória-PE'],
 PI:['Campeonato Piauiense','Altos;Fluminense-PI;Piauí;Parnahyba;Oeirense;4 de Julho;Atlético-PI;Teresina'],
 RJ:['Campeonato Carioca','Flamengo;Fluminense;Vasco da Gama;Botafogo;Nova Iguaçu;Madureira;Portuguesa-RJ;Bangu;Boavista;Volta Redonda;Sampaio Corrêa-RJ;Maricá'],
 RN:['Campeonato Potiguar','ABC;América-RN;Potiguar de Mossoró;Globo;Laguna;Santa Cruz de Natal;Potyguar Seridoense;QFC'],
 RS:['Campeonato Gaúcho','Grêmio;Internacional;Juventude;Caxias;Ypiranga-RS;Guarany de Bagé;São Luiz;São José-RS;Avenida;Monsoon;Novo Hamburgo;Inter de Santa Maria'],
 RO:['Campeonato Rondoniense','Porto Velho;Guaporé;Ji-Paraná;Vilhenense;Barcelona-RO;União Cacoalense;Rondoniense;Genus'],
 RR:['Campeonato Roraimense','GAS-RR;São Raimundo-RR;Monte Roraima;Náutico-RR;Atlético Roraima;Baré;Rio Negro-RR;River-RR;Progresso-RR'],
 SC:['Campeonato Catarinense','Avaí;Figueirense;Criciúma;Chapecoense;Brusque;Barra FC;Marcílio Dias;Joinville;Concórdia;Santa Catarina;Camboriú;Carlos Renaux'],
 SP:['Campeonato Paulista','Corinthians;Palmeiras;Santos;São Paulo;Red Bull Bragantino;Mirassol;Novorizontino;São Bernardo;Botafogo-SP;Guarani;Ponte Preta;Portuguesa-SP;Noroeste-SP;Velo Clube;Capivariano;Primavera-SP'],
 SE:['Campeonato Sergipano','Sergipe;Confiança;Itabaiana;Lagarto;Falcon;Dorense;América de Propriá;Carmópolis;Guarany-SE;Amadense'],
 TO:['Campeonato Tocantinense','Tocantinópolis;Araguaína;Capital-TO;Bela Vista-TO;União-TO;Gurupi;Tocantins de Miracema;Batalhão']
};
const STATE_CLUB_BASE={version:1,edition:2026,verified:false,championships:{}};
const nationalTemplates=Object.values(LEAGUES).flatMap(l=>l.clubs);
for(const [uf,[name,list]]of Object.entries(STATE_ROSTER_ROWS)){const clubs=list.split(';').map(name=>{const ref=nationalTemplates.find(c=>slugify(c.name)===slugify(name));if(ref){ref.state=uf;return structuredClone(ref)}const short=name.replace(/[^A-Za-zÀ-ÿ]/g,'').slice(0,3).toUpperCase();return {id:'regional-'+uf.toLowerCase()+'-'+slugify(name),name,short,power:55,state:uf,stadium:8000,stadiumName:'Estádio '+name,division:name+' · Estadual',regional:true}});STATE_CLUB_BASE.championships[uf]={uf,name,clubs,verified:false}}
