document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");
    let users = JSON.parse(localStorage.getItem('users')) || [];

    form.addEventListener("submit", function(e) {
        e.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            // Guardar la sesión del usuario
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", username);
            localStorage.setItem("correo", username); 
            window.location.href = "index.html";
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            alert("Por favor, complete ambos campos.");
        }
    });
});
