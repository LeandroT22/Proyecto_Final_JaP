document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    let users = JSON.parse(localStorage.getItem('users')) || [];

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (users.some(u => u.username === username)) {
            window.location.href = 'index.html';
                localStorage.setItem('currentUser', username);
        } else {
            users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
            window.location.href = 'index.html';
            localStorage.setItem('currentUser', username);
        }
    });
});