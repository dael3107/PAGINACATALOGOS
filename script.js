document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const buttons = document.querySelectorAll('.catalog-btn');
    const pdfViewer = document.getElementById('pdf-viewer');
    const currentTitle = document.getElementById('current-title');
    const downloadBtn = document.getElementById('download-btn');
    const loader = document.getElementById('loader');

    // Función para cargar un catálogo
    function loadCatalog(button) {
        // Eliminar la clase 'active' de todos los botones
        buttons.forEach(btn => btn.classList.remove('active'));

        // Agregar la clase 'active' al botón que se hizo clic
        button.classList.add('active');

        // 1. Obtener el nombre del archivo y agregar la carpeta 'pdf/'
        const src = 'pdf/' + button.getAttribute('data-src');
        // 2. Obtener el título del botón (el texto dentro de <span>)
        const title = button.querySelector('span').innerText;

        // Actualizar la interfaz de usuario (UI)
        currentTitle.innerText = title.toUpperCase(); // Actualizar título superior
        downloadBtn.href = src; // Actualizar enlace del botón de descarga

        // Mostrar la animación de carga (loader)
        loader.classList.add('active');

        // Cargar el PDF en el iframe
        // --- TRUCO ---
        // Agregamos '#toolbar=0&navpanes=0&scrollbar=0' al final de la URL
        // Esto le dice al navegador que INTENTE ocultar las barras grises.
        setTimeout(() => {
            pdfViewer.src = src + "#toolbar=0&navpanes=0&scrollbar=0";
        }, 300);
    }

    // Manejar clics en los botones del catálogo
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            loadCatalog(button);
        });
    });

    // Evento que detecta cuando el iframe ha terminado de cargar el PDF
    pdfViewer.addEventListener('load', () => {
        // Solo ocultar el cargador si 'src' no está vacío
        // Nota: Con archivos locales, a veces este evento no dispara bien por seguridad,
        // pero el usuario verá el PDF cargado de todas formas.
        setTimeout(() => {
            loader.classList.remove('active'); // Ocultar animación de carga
        }, 800);
    });

    // Carga Inicial (Cargar el primer catálogo automáticamente al abrir la página)
    if (buttons.length > 0) {
        loadCatalog(buttons[0]);
    }
});
