document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", function() {
    //nombre de usuario localStorage
    const nombreUsuario = localStorage.getItem("user");
    
    // Verificar si hay un usuario autenticado
    if (nombreUsuario) {
        // Cambiar el texto del botón para mostrar el nombre del usuario
        document.getElementById("nombreUsuarioBtn").textContent = nombreUsuario;
    } else {
        document.getElementById("nombreUsuarioBtn").textContent = "Invitado";
    }
});

// Función de cierre de sesión
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "login.html"; // Redirigir a la página de login
}
