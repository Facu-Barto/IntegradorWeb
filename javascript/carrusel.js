//Array con las imágenes y sus textos alt.
const imagenes = [
    {src: 'img/Carrusel/Fiesta1.jpeg', alt: 'Fiesta en boliche con lasers'},
    {src: 'img/Carrusel/Fiesta2.jpeg', alt: 'Fiesta en boliche con lasers'},
    {src: 'img/Carrusel/Fiesta3.jpeg', alt: 'Fiesta en boliche con lasers'},
];

//Variable para saber en que imagen estamos.
let indiceActual = 0;

//Referencias a los elementos del DOM
const imgElemento = document.getElementById('img-carrusel');
const btnAnterior = document.getElementById('btn-carrusel-anterior');
const btnSiguiente = document.getElementById('btn-carrusel-posterior');

//Funcion para actualizar la imagen que se ve.
function actualizarCarrusel() {
    imgElemento.src = imagenes[indiceActual].src;
    imgElemento.alt = imagenes[indiceActual].alt;
}

//Evento Avanzar.
btnSiguiente.addEventListener('click', () => {
    indiceActual++;
    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }
    actualizarCarrusel();
});

//Evento Retroceder.
btnAnterior.addEventListener('click', () => {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }
    actualizarCarrusel();
});

//Actuliza el carrusel cuando se carga la pagina.
actualizarCarrusel();