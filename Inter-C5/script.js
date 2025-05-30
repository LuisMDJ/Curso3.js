document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const interesesCheckboxes = document.querySelectorAll('input[name="intereses"]');
    const fechaInput = document.getElementById('fecha');
    const archivoInput = document.getElementById('archivo');
    const fileNameSpan = document.getElementById('file-name');

    nombreInput.addEventListener('input', function() {
        const nombre = nombreInput.value.trim();
        const nombreError = document.getElementById('nombreError');
        if (nombre.length < 3) {
            nombreError.textContent = 'El nombre debe tener al menos 3 caracteres';
            nombreInput.setCustomValidity('Nombre demasiado corto');
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            nombreError.textContent = 'El nombre solo puede contener letras y espacios';
            nombreInput.setCustomValidity('Nombre inválido');
        } else {
            nombreError.textContent = '';
            nombreInput.setCustomValidity('');
        }
    });

    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor ingresa un correo electrónico válido';
            emailInput.setCustomValidity('Correo inválido');
        } else {
            emailError.textContent = '';
            emailInput.setCustomValidity('');
        }
    });

    telefonoInput.addEventListener('input', function() {
        const telefono = telefonoInput.value.trim();
        const telefonoError = document.getElementById('telefonoError');
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(telefono)) {
            telefonoError.textContent = 'El teléfono debe tener 10 dígitos';
            telefonoInput.setCustomValidity('Teléfono inválido');
        } else {
            telefonoError.textContent = '';
            telefonoInput.setCustomValidity('');
        }
    });

    function validarIntereses() {
        const interesesError = document.getElementById('interesesError');
        const interesesSeleccionados = Array.from(interesesCheckboxes).some(cb => cb.checked);
        if (!interesesSeleccionados) {
            interesesError.textContent = 'Debes seleccionar al menos un interés';
            return false;
        } else {
            interesesError.textContent = '';
            return true;
        }
    }

    fechaInput.addEventListener('change', function() {
        const fecha = new Date(fechaInput.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaError = document.getElementById('fechaError');
        if (fecha < hoy) {
            fechaError.textContent = 'La fecha no puede ser anterior al día de hoy';
            fechaInput.setCustomValidity('Fecha inválida');
        } else {
            fechaError.textContent = '';
            fechaInput.setCustomValidity('');
        }
    });

    archivoInput.addEventListener('change', function() {
        if (archivoInput.files.length > 0) {
            const file = archivoInput.files[0];
            fileNameSpan.textContent = file.name;
            if (file.size > 2 * 1024 * 1024) { 
                fileNameSpan.textContent = 'Archivo demasiado grande (máx. 2MB)';
                archivoInput.value = '';
            }
        } else {
            fileNameSpan.textContent = 'Seleccionar archivo...';
        }
    });

    form.addEventListener('submit', function(event) {
        if (!validarIntereses()) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        console.log('Formulario enviado con los siguientes datos:');
        const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert('¡Registro exitoso! Los datos han sido enviados.');
        form.reset();
        fileNameSpan.textContent = 'Seleccionar archivo...';
    });

    form.addEventListener('reset', function() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        fileNameSpan.textContent = 'Seleccionar archivo...';
    });
});