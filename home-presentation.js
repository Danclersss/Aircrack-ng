'use strict';
(()=>{const old=renderHome;renderHome=function(){old();const art=document.querySelector('.stadium-art');if(art){art.classList.add('new-stadium-panel');const image=art.querySelector('img');if(image){image.src='assets/arena-night.svg?v=23';image.classList.add('new-stadium');image.alt='Estádio FutBR iluminado à noite, com o campo pronto para jogar'}}};render()})();
