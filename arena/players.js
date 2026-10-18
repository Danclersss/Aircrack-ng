'use strict';
globalThis.FutBRArenaPlayers=[
  {
    "id": "arena-0",
    "name": "Agustín Rossi",
    "position": "G",
    "rating": 72,
    "number": 1
  },
  {
    "id": "arena-1",
    "name": "Matheus Cunha",
    "position": "G",
    "rating": 79,
    "number": 2
  },
  {
    "id": "arena-2",
    "name": "Léo Ortiz",
    "position": "Z",
    "rating": 75,
    "number": 3
  },
  {
    "id": "arena-3",
    "name": "Léo Pereira",
    "position": "Z",
    "rating": 82,
    "number": 4
  },
  {
    "id": "arena-4",
    "name": "Danilo",
    "position": "Z",
    "rating": 78,
    "number": 5
  },
  {
    "id": "arena-5",
    "name": "Gustavo Gómez",
    "position": "Z",
    "rating": 74,
    "number": 6
  },
  {
    "id": "arena-6",
    "name": "Emerson Royal",
    "position": "L",
    "rating": 81,
    "number": 7
  },
  {
    "id": "arena-7",
    "name": "Alex Sandro",
    "position": "L",
    "rating": 77,
    "number": 8
  },
  {
    "id": "arena-8",
    "name": "Agustín Giay",
    "position": "L",
    "rating": 73,
    "number": 9
  },
  {
    "id": "arena-9",
    "name": "Khellven",
    "position": "L",
    "rating": 80,
    "number": 10
  },
  {
    "id": "arena-10",
    "name": "Erick Pulgar",
    "position": "M",
    "rating": 76,
    "number": 11
  },
  {
    "id": "arena-11",
    "name": "Jorginho",
    "position": "M",
    "rating": 72,
    "number": 12
  },
  {
    "id": "arena-12",
    "name": "Saúl Ñíguez",
    "position": "M",
    "rating": 79,
    "number": 13
  },
  {
    "id": "arena-13",
    "name": "Lucas Paquetá",
    "position": "M",
    "rating": 75,
    "number": 14
  },
  {
    "id": "arena-14",
    "name": "Jorge Carrascal",
    "position": "M",
    "rating": 82,
    "number": 15
  },
  {
    "id": "arena-15",
    "name": "Andreas Pereira",
    "position": "M",
    "rating": 78,
    "number": 16
  },
  {
    "id": "arena-16",
    "name": "Marlon Freitas",
    "position": "M",
    "rating": 74,
    "number": 17
  },
  {
    "id": "arena-17",
    "name": "Samuel Lino",
    "position": "A",
    "rating": 81,
    "number": 18
  },
  {
    "id": "arena-18",
    "name": "Bruno Henrique",
    "position": "A",
    "rating": 77,
    "number": 19
  },
  {
    "id": "arena-19",
    "name": "Pedro",
    "position": "A",
    "rating": 73,
    "number": 20
  },
  {
    "id": "arena-20",
    "name": "Felipe Anderson",
    "position": "A",
    "rating": 80,
    "number": 21
  },
  {
    "id": "arena-21",
    "name": "Jhon Arias",
    "position": "A",
    "rating": 76,
    "number": 22
  },
  {
    "id": "arena-22",
    "name": "Vitor Roque",
    "position": "A",
    "rating": 72,
    "number": 23
  },
  {
    "id": "arena-23",
    "name": "Flaco López",
    "position": "A",
    "rating": 79,
    "number": 24
  }
];
// Card identity is independent of edition. Ratings/attributes are game parameters.
(function(){
 const rows=[
 ['messi','Lionel Messi','A',88,'Argentina'],['cristiano','Cristiano Ronaldo','A',86,'Portugal'],['neymar','Neymar','A',84,'Brasil'],['mbappe','Kylian Mbappé','A',92,'França'],['haaland','Erling Haaland','A',92,'Noruega'],['vinicius','Vinícius Júnior','A',90,'Brasil'],['salah','Mohamed Salah','A',90,'Egito'],['saka','Bukayo Saka','A',87,'Inglaterra'],['rodri','Rodri','M',91,'Espanha'],['bellingham','Jude Bellingham','M',90,'Inglaterra'],['valverde','Federico Valverde','M',89,'Uruguai'],['debruyne','Kevin De Bruyne','M',87,'Bélgica'],['rice','Declan Rice','M',86,'Inglaterra'],['vandyke','Virgil van Dijk','Z',89,'Países Baixos'],['saliba','William Saliba','Z',87,'França'],['rudiger','Antonio Rüdiger','Z',87,'Alemanha'],['hakimi','Achraf Hakimi','L',88,'Marrocos'],['theo','Theo Hernández','L',86,'França'],['trent','Trent Alexander-Arnold','L',86,'Inglaterra'],['courtois','Thibaut Courtois','G',90,'Bélgica'],['alisson','Alisson','G',89,'Brasil'],['ederson','Ederson','G',87,'Brasil']];
 for(const [personId,name,position,rating,country]of rows)FutBRArenaPlayers.push({id:'modern-'+personId,personId,name,position,rating,country,number:position==='G'?1:position==='A'?10:8,edition:'normal'});
 const legends=[['pele','Pelé','A',97,'Brasil','1970'],['maradona','Diego Maradona','M',97,'Argentina','1986'],['ronaldo','Ronaldo Nazário','A',96,'Brasil','2002'],['ronaldinho','Ronaldinho','M',95,'Brasil','2005'],['zidane','Zinédine Zidane','M',96,'França','1998'],['cruyff','Johan Cruyff','A',96,'Países Baixos','1974'],['maldini','Paolo Maldini','Z',95,'Itália','1994'],['cafu','Cafu','L',94,'Brasil','2002'],['robertocarlos','Roberto Carlos','L',94,'Brasil','2002'],['garrincha','Garrincha','A',95,'Brasil','1962'],['zico','Zico','M',94,'Brasil','1981'],['romario','Romário','A',95,'Brasil','1994'],['rivaldo','Rivaldo','M',94,'Brasil','1999'],['kaka','Kaká','M',94,'Brasil','2007'],['henry','Thierry Henry','A',94,'França','2004'],['buffon','Gianluigi Buffon','G',95,'Itália','2006'],['yashin','Lev Yashin','G',96,'União Soviética','1963'],['beckenbauer','Franz Beckenbauer','Z',96,'Alemanha','1974'],['baresi','Franco Baresi','Z',94,'Itália','1989'],['iniesta','Andrés Iniesta','M',94,'Espanha','2010'],['xavi','Xavi','M',94,'Espanha','2011'],['pirlo','Andrea Pirlo','M',93,'Itália','2006'],['vieira','Patrick Vieira','M',93,'França','2000'],['gullit','Ruud Gullit','M',95,'Países Baixos','1988'],['drogba','Didier Drogba','A',93,'Costa do Marfim','2012'],['etoo',"Samuel Eto’o",'A',93,'Camarões','2009'],['dida','Dida','G',92,'Brasil','2003'],['ceni','Rogério Ceni','G',92,'Brasil','2005'],['seedorf','Clarence Seedorf','M',93,'Países Baixos','2007'],['nesta','Alessandro Nesta','Z',94,'Itália','2003'],['lahm','Philipp Lahm','L',93,'Alemanha','2014'],['zanetti','Javier Zanetti','L',93,'Argentina','2010']];
 for(const [personId,name,position,rating,country,season]of legends)FutBRArenaPlayers.push({id:'icon-'+personId,personId,name,position,rating,country,season,number:position==='G'?1:position==='L'?6:position==='Z'?4:10,edition:'icon'});
 for(const [personId,season,rating]of [['messi','2012',97],['cristiano','2014',97],['neymar','2015',95],['salah','2018',94],['debruyne','2020',94],['vandyke','2019',94],['alisson','2019',93]]){const p=FutBRArenaPlayers.find(p=>p.personId===personId);FutBRArenaPlayers.push({...p,id:'peak-'+personId,season,rating,edition:'peak'})}
 const clamp=n=>Math.max(30,Math.min(99,Math.round(n)));
 for(const [i,p]of FutBRArenaPlayers.entries()){p.personId=p.personId||p.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');p.edition=p.edition||'normal';p.country=p.country||'Brasil';p.tier=p.edition==='icon'?'icon':p.rating>=86?'elite':p.rating>=80?'rare':'common';const r=p.rating,j=i%7-3;p.skills={pace:clamp(r+(p.position==='L'?6:p.position==='Z'?-8:0)+j),shoot:clamp(r+(p.position==='A'?4:p.position==='G'?-45:p.position==='Z'?-22:-5)),pass:clamp(r+(p.position==='M'?5:p.position==='G'?-20:-3)),defend:clamp(r+(['Z','L','G'].includes(p.position)?5:-25)),leadership:clamp(r-5+j),penalty:clamp(r+(p.position==='A'?3:-12)),freeKick:clamp(r+(p.position==='M'?2:-15)),corner:clamp(r+(p.position==='M'?3:-12)),throw:clamp(r+(p.position==='L'?5:-15))};if(['robertocarlos','zico','pirlo','messi','ceni'].includes(p.personId))p.skills.freeKick=clamp(r+3)}
 if(typeof module!=='undefined')module.exports=FutBRArenaPlayers;
})();
