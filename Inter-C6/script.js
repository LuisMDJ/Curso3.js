document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const registroSchema = z.object({
        nombre: z.string()
            .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
            .max(50, { message: "El nombre no puede exceder los 50 caracteres" })
            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
                message: "El nombre solo puede contener letras y espacios" 
            }),
        email: z.string()
            .email({ message: "Correo electrónico inválido" })
            .max(100, { message: "El correo no puede exceder los 100 caracteres" }),
        password: z.string()
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
            .max(50, { message: "La contraseña no puede exceder los 50 caracteres" })
            .regex(/[A-Z]/, { 
                message: "La contraseña debe contener al menos una mayúscula" 
            })
            .regex(/[0-9]/, { 
                message: "La contraseña debe contener al menos un número" 
            })
            .regex(/[^A-Za-z0-9]/, {
                message: "La contraseña debe contener al menos un carácter especial"
            })
    });

    function mostrarErrores(errors) {
        nombreError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        nombreInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');

        errors.forEach(error => {
            const field = error.path[0];
            const message = error.message;
            switch(field) {
                case 'nombre':
                    nombreError.textContent = message;
                    nombreInput.classList.add('invalid');
                    break;
                case 'email':
                    emailError.textContent = message;
                    emailInput.classList.add('invalid');
                    break;
                case 'password':
                    passwordError.textContent = message;
                    passwordInput.classList.add('invalid');
                    break;
            }
        });
    }

    function marcarComoValido() {
        nombreInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
        nombreInput.classList.add('valid');
        emailInput.classList.add('valid');
        passwordInput.classList.add('valid');
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        const resultado = registroSchema.safeParse(formData);
        if (!resultado.success) {
            mostrarErrores(resultado.error.errors);
        } else {
            marcarComoValido();
            console.log('Datos válidos:', resultado.data);
            alert('¡Registro exitoso!\nDatos válidos recibidos.');
            form.reset();
            nombreInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            passwordInput.classList.remove('valid');
        }
    });

    nombreInput.addEventListener('input', validarCampoEnTiempoReal);
    emailInput.addEventListener('input', validarCampoEnTiempoReal);
    passwordInput.addEventListener('input', validarCampoEnTiempoReal);
    function validarCampoEnTiempoReal() {
        const formData = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        const resultado = registroSchema.safeParse(formData);
        
        if (!resultado.success) {
            const errorActual = resultado.error.errors.find(
                error => error.path[0] === this.name
            );
            if (errorActual) {
                document.getElementById(`${this.name}Error`).textContent = errorActual.message;
                this.classList.add('invalid');
                this.classList.remove('valid');
            } else {
                document.getElementById(`${this.name}Error`).textContent = '';
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        } else {
            document.getElementById(`${this.name}Error`).textContent = '';
            this.classList.remove('invalid');
            this.classList.add('valid');
        }
    }
});