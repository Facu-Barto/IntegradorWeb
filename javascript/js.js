const pista= document.getElementById('pista');
const anterior= document.getElementById('anterior');
const siguiente= document.getElementById('siguiente');


siguiente.addEventListener('click',()=>{
    pista.scrollLeft+= pista.clientWidth;
});
anterior.addEventListener('click',()=>{
    pista.scrollLeft-=pista.clientWidth;
});