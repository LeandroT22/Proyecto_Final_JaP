document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');

    const saveButton = document.getElementById('saveButton');
    let firstName = document.getElementById('firstName');
    let middleName = document.getElementById('middleName');
    let lastName = document.getElementById('lastName');
    let secondLastName = document.getElementById('secondLastName');
    let phone = document.getElementById('phone');
    let darkModeSwitch = document.getElementById('darkModeSwitch');

    let correo = localStorage.getItem("currentUser") || "";
    document.getElementById("email2").value = correo; 

    // Aplicar preferencias en el HTML
    function applyPreferences(preferences) {
        if (preferences) {
            // Colocar los valores de las preferencias en los campos del formulario
            firstName.value = preferences.firstName || '';
            middleName.value = preferences.middleName || '';
            lastName.value = preferences.lastName || '';
            secondLastName.value = preferences.secondLastName || '';
            phone.value = preferences.phone || '';

            // Aplicar el tema oscuro si está activado
            if (preferences.darkModeSwitch) {
                document.body.classList.add('dark-theme');
                darkModeSwitch.checked = false;
            } else {
                document.body.classList.remove('dark-theme');
                darkModeSwitch.checked = true;
            }
        }
    }

    // Obtener las preferencias del formulario
    function getPreferences() {
        return {
            darkModeSwitch: darkModeSwitch.checked,
            firstName: firstName.value,
            middleName: middleName.value,
            lastName: lastName.value,
            secondLastName: secondLastName.value,
            phone: phone.value
        };
    }

    // Guardar las preferencias en localStorage y cookies
    function savePreferences() {
        const preferences = getPreferences();
        localStorage.setItem(`preferences_${currentUser}`, JSON.stringify(preferences));

        // Guardar en cookie con expiración de 100 años
        const expires = new Date(Date.now() + 365 * 100 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `preferences_${currentUser}=${JSON.stringify(preferences)}; expires=${expires}; path=/`;

        alert('Preferencias guardadas');
    }

    // Cargar las preferencias de localStorage o cookies
    function loadPreferences() {
        const savedPreferences = localStorage.getItem(`preferences_${currentUser}`);
        if (savedPreferences) {
            return JSON.parse(savedPreferences);
        }
        return null;
    }

    function validarFormulario() {
        let nombre = document.getElementById("firstName").value.trim();
        let apellido = document.getElementById("lastName").value.trim();
    
        if (!nombre || !apellido) {
            alert("Por favor, complete todos los campos obligatorios (*).");
            return false; 
        }
        
        return true; 
    }

    saveButton.addEventListener('click', () => {
        if (validarFormulario()) {
            savePreferences ()
        }
    });

    // Cargar y aplicar preferencias al iniciar
    const initialPreferences = loadPreferences();
    applyPreferences(initialPreferences);
});
