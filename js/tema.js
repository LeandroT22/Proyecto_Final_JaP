document.addEventListener('DOMContentLoaded', () => {
    let currentUser = localStorage.getItem('currentUser');
    
    // Función simplificada para aplicar solo el tema
    function aplicarTema() {
        try {
            // Obtener preferencias guardadas
            let savedPreferences = localStorage.getItem(`preferences_${currentUser}`);
            if (savedPreferences) {
                let preferences = JSON.parse(savedPreferences);
                
                // Aplicar modo oscuro si está activado
                if (preferences.darkModeSwitch === true) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
        } catch (error) {
            console.error('Error al aplicar el tema:', error);
        }
    }

    // Aplicar el tema al cargar la página
    aplicarTema();
});