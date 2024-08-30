document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Evitar el envío del formulario para hacer la validación

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            // Guardar la sesión del usuario (esto puede ser una bandera simple en el localStorage)
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", username);
            window.location.href = "index.html"; // Redirigir al inicio
        } else {
            alert("Por favor, complete ambos campos.");
        }
    });
});
