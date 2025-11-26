document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MENU MOBILE (Versão Corrigida e Segura)
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Verifica se os elementos existem antes de adicionar o evento (evita erros)
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            console.log("Clicou no menu!"); // Para depuração (F12)
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active'); // Opcional: para animação do ícone
        });
    }

    // Fecha o menu ao clicar em qualquer link da navegação
    document.querySelectorAll('.nav-list li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });


    // ==========================================
    // 2. LIGHTBOX (IMAGENS DO PORTFÓLIO)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    
    // Seleciona todas as divs de imagem do portfólio
    const projectTriggers = document.querySelectorAll('.project-image');

    projectTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Encontra a tag <img> dentro da div clicada
            const img = this.querySelector('img');
            
            if (img && lightbox && lightboxImg) {
                lightbox.style.display = "flex"; // Centraliza usando flexbox
                lightboxImg.src = img.src; // Pega o caminho da imagem clicada
            }
        });
    });

    // Função para fechar o modal
    const closeLightbox = () => {
        if (lightbox) lightbox.style.display = "none";
    };

    // Evento: Fechar ao clicar no "X"
    if(closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Evento: Fechar ao clicar fora da imagem (no fundo escuro)
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 3. SMOOTH SCROLL (Rolagem Suave Opcional)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. SCROLL ANIMATION (Adicione isso no seu script.js) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Adiciona a classe que anima
            }
        });
    });

    // --- 5. TYPEWRITER EFFECT ---
    const textElement = document.querySelector('.typewriter');
    // As palavras que vão ser digitadas
    const words = ["impulsiona.", "conecta.", "inova.", "transforma."]; 
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Terminou de escrever a palavra, espera um pouco
            isDeleting = true;
            setTimeout(type, 2000); 
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar, passa para a próxima
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            // Velocidade de digitação
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    // Iniciar apenas se o elemento existir
    if(textElement) type();

    // Manda o observador vigiar todos os elementos com a classe .hidden
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

});