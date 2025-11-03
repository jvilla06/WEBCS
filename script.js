// JavaScript para la página web de Calidad de Software
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Control del header al hacer scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
    }
    
    // Scroll suave para los enlaces de navegación
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Resaltar enlace activo en la navegación
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Animación de entrada para elementos
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll('.content-card, .stat-card, .model-card, .standard-card, .practice-card, .test-type, .conclusion-card, .recommendation-category');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // Contador animado para estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const step = target / (duration / 16); // 60 FPS
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Parallax suave para el hero
    function parallaxHero() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    }
    
    // Efecto typewriter para el título del hero
    function typewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid white';
        
        let i = 0;
        const timer = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
    
    // Smooth scroll para el indicador de scroll
    function scrollIndicatorClick() {
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const firstSection = document.querySelector('.intro') || document.querySelector('.section');
                if (firstSection) {
                    smoothScroll('#' + firstSection.id || '.intro');
                }
            });
        }
    }
    
    // Tooltip para elementos con información adicional
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => {
                    tooltip.classList.add('show');
                }, 10);
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    // Lazy loading para imágenes
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Formulario de contacto (si existe)
    function initContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aquí puedes agregar la lógica para enviar el formulario
                const formData = new FormData(this);
                
                // Mostrar mensaje de éxito
                showNotification('Mensaje enviado correctamente', 'success');
                
                // Limpiar formulario
                this.reset();
            });
        }
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Botón de cerrar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Buscar contenido en la página
    function initSearch() {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const sections = document.querySelectorAll('section');
                
                sections.forEach(section => {
                    const content = section.textContent.toLowerCase();
                    if (content.includes(searchTerm) || searchTerm === '') {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Modo oscuro toggle
    function initDarkMode() {
        const darkModeToggle = document.querySelector('#dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                // Guardar preferencia en localStorage
                const isDarkMode = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDarkMode);
                
                // Cambiar icono
                const icon = this.querySelector('i');
                if (isDarkMode) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            });
            
            // Cargar preferencia guardada
            const savedDarkMode = localStorage.getItem('darkMode');
            if (savedDarkMode === 'true') {
                document.body.classList.add('dark-mode');
                darkModeToggle.querySelector('i').className = 'fas fa-sun';
            }
        }
    }
    
    // Copiar código al portapapeles
    function initCodeCopy() {
        const codeBlocks = document.querySelectorAll('.code-example');
        
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copiar código';
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
            
            copyButton.addEventListener('click', function() {
                const code = block.querySelector('pre code') || block.querySelector('pre');
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        this.style.color = '#10b981';
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy"></i>';
                            this.style.color = '';
                        }, 2000);
                    });
                }
            });
        });
    }
    
    // Botón "Volver arriba"
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.title = 'Volver arriba';
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', function() {
        handleScroll();
        highlightActiveNav();
        // Comentar esta línea si el parallax causa problemas de rendimiento
        // parallaxHero();
    });
    
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Inicializar funciones
    animateOnScroll();
    animateCounters();
    scrollIndicatorClick();
    initTooltips();
    lazyLoadImages();
    initContactForm();
    initSearch();
    initDarkMode();
    initCodeCopy();
    initBackToTop();
    
    // Efecto typewriter para el título (opcional, comentado para mejor UX)
    // setTimeout(typewriterEffect, 1000);
    
    // Prevenir el comportamiento predeterminado en enlaces vacíos
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // Mejorar la accesibilidad del teclado
    document.addEventListener('keydown', function(e) {
        // Escape para cerrar menús
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
        
        // Enter y espacio para activar elementos interactivos
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.classList.contains('scroll-indicator')) {
                e.preventDefault();
                scrollIndicatorClick();
            }
        }
    });
    
    // Optimización de rendimiento: throttle para eventos de scroll
    let ticking = false;
    
    function throttle(func) {
        if (!ticking) {
            requestAnimationFrame(function() {
                func();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Reemplazar el event listener de scroll con versión optimizada
    window.removeEventListener('scroll', function() {
        handleScroll();
        highlightActiveNav();
    });
    
    window.addEventListener('scroll', function() {
        throttle(function() {
            handleScroll();
            highlightActiveNav();
        });
    });
    
    // Precargar contenido crítico
    function preloadCriticalResources() {
        // Precargar fuentes
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
    
    preloadCriticalResources();
    
    // Logging de errores para debugging (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('error', function(e) {
            console.error('Error capturado:', e.error);
        });
    }
});

// Estilos adicionales para elementos creados dinámicamente
const additionalStyles = `
/* Estilos para elementos dinámicos */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ffffff;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-info {
    border-left: 4px solid #2563eb;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: #64748b;
    padding: 0;
}

.copy-code-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 4px;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.copy-code-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.25rem;
}

.back-to-top.show {
    transform: translateY(0);
    opacity: 1;
}

.back-to-top:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.tooltip {
    position: absolute;
    background: #1f2937;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    z-index: 10000;
    opacity: 0;
    transform: translateY(5px);
    transition: all 0.3s ease;
    pointer-events: none;
}

.tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1f2937;
}

/* Estilos para modo oscuro */
body.dark-mode {
    background: #0f172a;
    color: #e2e8f0;
}

body.dark-mode .header {
    background: rgba(15, 23, 42, 0.95) !important;
}

body.dark-mode .section {
    background: #0f172a;
}

body.dark-mode .section.alternate {
    background: #1e293b;
}

body.dark-mode .content-card,
body.dark-mode .standard-card,
body.dark-mode .practice-card,
body.dark-mode .recommendation-category {
    background: #1e293b;
    color: #e2e8f0;
}

/* Clase activa para navegación */
.nav-link.active {
    color: #2563eb;
}

.nav-link.active::after {
    width: 100%;
}

/* Hamburger activo */
.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

/* Menú móvil activo */
@media (max-width: 768px) {
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        gap: 1rem;
    }
    
    body.menu-open {
        overflow: hidden;
    }
}
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);