'use strict';
// Partial historical reference, chiefly 2024/25. Transfers and ratings are not a live feed.
(()=>{
const rows={
'Al Hilal':[['Yassine Bounou','G',34,84],['Kalidou Koulibaly','Z',34,82],['Rúben Neves','M',28,83],['Sergej Milinković-Savić','M',30,84],['Salem Al-Dawsari','A',34,81],['Aleksandar Mitrović','A',31,84]],
'Al Nassr':[['Bento','G',26,79],['Mohamed Simakan','Z',25,79],['Marcelo Brozović','M',33,81],['Otávio','M',30,81],['Sadio Mané','A',33,83],['Cristiano Ronaldo','A',40,88]],
'Al Ittihad':[['Predrag Rajković','G',30,79],['Danilo Pereira','Z',34,79],['Fabinho','M',32,82],['N’Golo Kanté','M',34,84],['Karim Benzema','A',38,87],['Steven Bergwijn','A',28,80]],
'Al Ahli':[['Édouard Mendy','G',33,80],['Merih Demiral','Z',27,78],['Franck Kessié','M',29,82],['Riyad Mahrez','A',34,84],['Roberto Firmino','A',34,82],['Ivan Toney','A',29,82]],
'Inter Miami':[['Óscar Ustari','G',39,74],['Tomás Avilés','Z',21,74],['Jordi Alba','L',36,82],['Sergio Busquets','M',37,82],['Lionel Messi','A',38,90],['Luis Suárez','A',38,84]],
'Los Angeles FC':[['Hugo Lloris','G',39,80],['Aaron Long','Z',33,74],['Ryan Hollingshead','L',34,75],['Timothy Tillman','M',26,75],['Denis Bouanga','A',31,81]],
'Al Ahly':[['Mohamed El Shenawy','G',37,78],['Rami Rabia','Z',32,74],['Mohamed Hany','L',29,74],['Emam Ashour','M',27,77],['Hussein El Shahat','A',33,76]],
'Mamelodi Sundowns':[['Ronwen Williams','G',33,79],['Grant Kekana','Z',33,73],['Aubrey Modiba','L',30,74],['Teboho Mokoena','M',28,77],['Lucas Ribeiro','A',27,77]],
'Urawa Red Diamonds':[['Shusaku Nishikawa','G',39,75],['Marius Høibråten','Z',30,74],['Samuel Gustafson','M',30,75],['Ryoma Watanabe','M',29,74]],
'Monterrey':[['Esteban Andrada','G',34,77],['Sergio Ramos','Z',39,83],['Stefan Medina','L',33,76],['Sergio Canales','M',34,82],['Germán Berterame','A',27,78]],
'Club América':[['Luis Malagón','G',28,78],['Sebastián Cáceres','Z',26,77],['Álvaro Fidalgo','M',28,79],['Alex Zendejas','A',27,77],['Henry Martín','A',33,78]],
'Vissel Kobe':[['Daiya Maekawa','G',31,74],['Tetsushi Yamakawa','Z',28,73],['Yoshinori Muto','A',33,76],['Yuya Osako','A',35,77]]};
for(const[name,players]of Object.entries(rows)){const club=[...FutBRWorld.clubsById.values()].find(c=>c.name===name);if(club){REAL_ROSTERS[club.id]=players;club.power=Math.max(club.power,Math.round(players.reduce((n,p)=>n+p[3],0)/players.length)-4);club.rosterReference='Referência parcial 2024/25; completar com atletas gerados';}}
})();
