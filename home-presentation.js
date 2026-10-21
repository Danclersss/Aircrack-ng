'use strict';
(()=>{const old=renderHome;renderHome=function(){old();const art=document.querySelector('.stadium-art');if(art){art.classList.add('new-stadium-panel');const image=art.querySelector('img');if(image){image.src='assets/arena-glory.svg?v=27';image.classList.add('new-stadium');image.alt='Taça da Arena, bola e medalha no estádio'}}};render()})();
