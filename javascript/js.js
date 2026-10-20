const pista= document.getElementById('pista');
const anterior= document.getElementById('anterior');
const siguiente= document.getElementById('siguiente');

const desplazamiento=250;

siguiente.addEventListener('click',()=>{
    pista.scrollLeft+=desplazamiento;
});
anterior.addEventListener('click',()=>{
    pista.scrollLeft-=desplazamiento;
});