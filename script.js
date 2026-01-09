document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.catalog-btn');
    const viewer = document.getElementById('pdf-viewer');
    const title = document.getElementById('current-title');
    const downloadBtn = document.getElementById('download-btn');
    const loader = document.getElementById('loader');

    // Función para cargar un catálogo
    function loadCatalog(button) {
        // Remover clase active de todos
        buttons.forEach(btn => btn.classList.remove('active'));

        // Activar el botón presionado
        button.classList.add('active');

        // Obtener datos
        const pdfSrc = button.getAttribute('data-src');
        const catalogName = button.querySelector('span').textContent;

        // Mostrar loader
        loader.classList.add('active');

        // Actualizar UI
        title.textContent = `VISOR: ${catalogName.toUpperCase()}`;

        // URL correcta para el PDF (asumiendo carpeta pdf/)
        const fullPath = `pdf/${pdfSrc}`;

        // Actualizar descarga y visor
        downloadBtn.href = fullPath;

        // Pequeño timeout para simular carga y dar tiempo a la UI
        setTimeout(() => {
            viewer.src = fullPath;

            // Ocultar loader cuando el iframe cargue
            viewer.onload = () => {
                loader.classList.remove('active');
            };

            // Fallback para ocultar el loader por si el evento load no se dispara
            setTimeout(() => {
                loader.classList.remove('active');
            }, 2000);
        }, 300);
    }

    // Event Listeners para cada botón
    buttons.forEach(btn => {
        btn.addEventListener('click', () => loadCatalog(btn));
    });

    // Cargar el primer catálogo por defecto si existe
    if (buttons.length > 0) {
        loadCatalog(buttons[0]);
    }
});
