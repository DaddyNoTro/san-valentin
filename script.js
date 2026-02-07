const noBtn = document.getElementById('noBtn');

// Función para mover el botón "No"
function moverBoton() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Márgenes para evitar que se encime con la Isla Dinámica (iPhone 15) o bordes
    const padding = 80; 

    // Calculamos el espacio seguro disponible
    const safeWidth = width - (padding * 2) - noBtn.offsetWidth;
    const safeHeight = height - (padding * 2) - noBtn.offsetHeight;

    // Generamos posiciones aleatorias
    const newX = Math.random() * safeWidth + padding;
    const newY = Math.random() * safeHeight + padding;

    // Aplicamos los estilos
    noBtn.style.position = "fixed";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = "1000";
}

// === EVENTOS PARA EL BOTÓN "NO" ===

// En iPhone (touch), movemos el botón antes de que se complete el clic
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita que se dispare el clic accidentalmente
    moverBoton();
});

// En PC (mouse)
noBtn.addEventListener('mouseover', moverBoton);


// === FUNCIÓN DE ÉXITO ===

function acepto() {
    const main = document.getElementById('mainContainer');
    const final = document.getElementById('mensaje-final');
    
    // 1. Quitamos la clase que lo esconde por completo
    final.classList.remove('hidden'); 
    
    // 2. Desvanecemos la carta principal
    main.style.opacity = '0';
    
    setTimeout(() => {
        main.classList.add('hidden'); 
        
        // 3. Mostramos la pantalla final
        final.classList.add('show-final'); 
        
        lanzarConfeti(); 
    }, 500);
}

// === LÓGICA DEL CONFETI (CORAZONES Y NOTAS) ===

function lanzarConfeti() {
    const emojis = ['❤️', '💌', '🌸', '✨'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-20px';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px'; // Tamaños variados
            heart.style.animation = `caida ${Math.random() * 2 + 3}s linear forwards`;
            heart.style.zIndex = "3000";
            
            document.body.appendChild(heart);
            
            // Limpiamos el DOM después de la animación
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}

// Inyectamos la animación de caída dinámicamente
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes caida { 
    to { 
        transform: translateY(110vh) rotate(360deg); 
    } 
}`;

document.head.appendChild(styleSheet);
