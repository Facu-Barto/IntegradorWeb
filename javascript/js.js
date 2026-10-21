const pista = document.getElementById('pista');
const anterior = document.getElementById('btn-carrusel-ant');
const siguiente = document.getElementById('btn-carrusel-pos');

siguiente.addEventListener('click', () => {
    if (pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 10) {
        pista.scrollLeft = 0;
    } else {
        pista.scrollLeft += pista.clientWidth;
    }
});

anterior.addEventListener('click', () => {
    if (pista.scrollLeft <= 0) {
        pista.scrollLeft = pista.scrollWidth;
    } else {
        pista.scrollLeft -= pista.clientWidth;
    }
});