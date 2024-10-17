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

    document.getElementById("firstName").value = "";
    document.getElementById("middleName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("secondLastName").value = "";
    document.getElementById("phone").value = "";

   
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
