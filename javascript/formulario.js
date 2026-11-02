document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.caja-formulario-principal form');
    
    // Referencias a los campos
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputTelefono = document.getElementById('telefono');
    const selectServicio = document.getElementById('servicio');
    const inputFecha = document.getElementById('fecha');
    const txtDetalles = document.getElementById('detalles');

    // Función para mostrar errores
    function mostrarError(input, mensaje) {
        limpiarError(input);
        input.classList.add('input-error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mensaje-error-dinamico';
        errorDiv.textContent = mensaje;
        
        input.parentElement.appendChild(errorDiv);
    }

    // Función para limpiar errores
    function limpiarError(input) {
        input.classList.remove('input-error');
        const errorPrevio = input.parentElement.querySelector('.mensaje-error-dinamico');
        if (errorPrevio) {
            errorPrevio.remove();
        }
    }

    //Expresiones regulares
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelefono = /^\+?[\d\s\-]{8,15}$/;
    const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    //Validaciónes
    function validarNombre() {
        inputNombre.value = inputNombre.value.trim();
        //Separamos el texto por espacios para contar cuántas palabras ingresó
        const palabras = inputNombre.value.split(/\s+/);

        if (inputNombre.value === '') {
            mostrarError(inputNombre, 'El campo nombre y apellido es obligatorio.');
            return false;
        } else if (inputNombre.value.length < 3) {
            mostrarError(inputNombre, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        } else if (inputNombre.value.length > 60) {
            mostrarError(inputNombre, 'El nombre no puede superar los 60 caracteres.');
            return false;
        } else if (!regexSoloLetras.test(inputNombre.value)) {
            mostrarError(inputNombre, 'El nombre no puede contener números ni caracteres especiales.');
            return false;
        } else if (palabras.length < 2) {
            mostrarError(inputNombre, 'Por favor, ingresa al menos un nombre y un apellido.');
            return false;
        } else {
            limpiarError(inputNombre);
            return true;
        }
    }

    function validarCorreo() {
        inputCorreo.value = inputCorreo.value.trim();
        if (inputCorreo.value === '') {
            mostrarError(inputCorreo, 'El correo electrónico es obligatorio.');
            return false;
        } else if (!regexEmail.test(inputCorreo.value)) {
            mostrarError(inputCorreo, 'Ingresa un correo electrónico válido (ej: tu@email.com).');
            return false;
        } else {
            limpiarError(inputCorreo);
            return true;
        }
    }

    function validarTelefono() {
        inputTelefono.value = inputTelefono.value.trim();
        if (inputTelefono.value === '') {
            mostrarError(inputTelefono, 'El teléfono es obligatorio.');
            return false;
        } else if (!regexTelefono.test(inputTelefono.value)) {
            mostrarError(inputTelefono, 'Ingresa un teléfono válido solo con números (ej. 2657112233).');
            return false;
        } else {
            limpiarError(inputTelefono);
            return true;
        }
    }

    function validarServicio() {
        if (selectServicio.value === '') {
            mostrarError(selectServicio, 'Debes seleccionar un tipo de evento.');
            return false;
        } else {
            limpiarError(selectServicio);
            return true;
        }
    }

    function validarFecha() {
        inputFecha.value = inputFecha.value.trim();
        if (inputFecha.value === '') {
            mostrarError(inputFecha, 'La fecha estimada es obligatoria.');
            return false;
        } else if (!regexFecha.test(inputFecha.value)) {
            mostrarError(inputFecha, 'Formato de fecha inválido. Utiliza el formato dd/mm/aaaa.');
            return false;
        } else {
            //Validación de que la fecha no sea anterior a hoy
            const partes = inputFecha.value.split('/');
            const dia = parseInt(partes[0], 10);
            const mes = parseInt(partes[1], 10) - 1; //Los meses en JS van de 0 a 11
            const anio = parseInt(partes[2], 10);

            const fechaIngresada = new Date(anio, mes, dia);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); //Limpiamos horas para comparar solo días

            if (fechaIngresada < hoy) {
                mostrarError(inputFecha, 'La fecha estimada no puede ser una fecha pasada.');
                return false;
            } else {
                limpiarError(inputFecha);
                return true;
            }
        }
    }

    //Validacion en tiempo real campo por campo (blur y change)
    inputNombre.addEventListener('blur', validarNombre);
    inputCorreo.addEventListener('blur', validarCorreo);
    inputTelefono.addEventListener('blur', validarTelefono);
    selectServicio.addEventListener('change', validarServicio);
    inputFecha.addEventListener('blur', validarFecha);

    //Validación general al hacer submit
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const vNombre = validarNombre();
        const vCorreo = validarCorreo();
        const vTelefono = validarTelefono();
        const vServicio = validarServicio();
        const vFecha = validarFecha();

        const esValido = vNombre && vCorreo && vTelefono && vServicio && vFecha;

        // Si todo es válido
        if (esValido) {
            const contenedorFormulario = document.querySelector('.caja-formulario-principal');
            
            formulario.style.display = 'none';

            const tarjetaResumen = document.createElement('div');
            tarjetaResumen.className = 'resumen-envio-exitoso';

            const tituloExito = document.createElement('h3');
            tituloExito.textContent = '¡Consulta enviada con éxito!';
            tarjetaResumen.appendChild(tituloExito);

            const textoSub = document.createElement('p');
            textoSub.textContent = 'A continuación, el resumen de los datos enviados:';
            tarjetaResumen.appendChild(textoSub);

            const listaResumen = document.createElement('ul');

            const datosAEnviar = [
                { label: 'Nombre y Apellido', val: inputNombre.value },
                { label: 'Email', val: inputCorreo.value },
                { label: 'Teléfono', val: inputTelefono.value },
                { label: 'Tipo de Evento', val: selectServicio.value },
                { label: 'Fecha Estimada', val: inputFecha.value },
                { label: 'Descripción', val: txtDetalles.value.trim() || 'Sin especificar' }
            ];

            datosAEnviar.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.label}:</strong> ${item.val}`;
                listaResumen.appendChild(li);
            });

            tarjetaResumen.appendChild(listaResumen);

            const btnReiniciar = document.createElement('button');
            btnReiniciar.textContent = '← ENVIAR OTRA CONSULTA';
            btnReiniciar.className = 'btn-enviar-contacto';

            btnReiniciar.addEventListener('click', () => {
                formulario.reset();
                formulario.style.display = 'block';
                tarjetaResumen.remove();
            });

            tarjetaResumen.appendChild(btnReiniciar);
            contenedorFormulario.appendChild(tarjetaResumen);
        }
    });
});