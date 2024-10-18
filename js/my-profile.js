document.addEventListener("DOMContentLoaded", function () {
    cargarDatosPerfil();

    
    document.getElementById("saveButton").addEventListener("click", function () {
        if (validarFormulario()) {
          
            localStorage.setItem("nombre", document.getElementById("firstName").value.trim());
            localStorage.setItem("segundoNombre", document.getElementById("middleName").value.trim());
            localStorage.setItem("apellido", document.getElementById("lastName").value.trim());
            localStorage.setItem("segundoApellido", document.getElementById("secondLastName").value.trim());
            localStorage.setItem("correo", document.getElementById("email").value.trim());
            localStorage.setItem("telefono", document.getElementById("phone").value.trim());

            
            localStorage.setItem("perfilGuardado", "true");

            alert("Los cambios han sido guardados exitosamente.");
        }
    });
});


function cargarDatosPerfil() {
    document.getElementById("firstName").value = localStorage.getItem("nombre") || "";
    document.getElementById("middleName").value = localStorage.getItem("segundoNombre") || "";
    document.getElementById("lastName").value = localStorage.getItem("apellido") || "";
    document.getElementById("secondLastName").value = localStorage.getItem("segundoApellido") || "";
    document.getElementById("phone").value = localStorage.getItem("telefono") || "";

    darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    
    let correo = localStorage.getItem("correo") || "";
    document.getElementById("email").value = correo; 
}


function validarFormulario() {
    let nombre = document.getElementById("firstName").value.trim();
    let apellido = document.getElementById("lastName").value.trim();
    let correo = document.getElementById("email").value.trim();
    
    
    if (!nombre || !apellido || !correo) {
        alert("Por favor, complete todos los campos obligatorios (*).");
        return false; 
    }
    
    return true; 
}
