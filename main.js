/* ============================================================
   QUINTEROS S.A. — MAIN JAVASCRIPT
   Hero Slider + Navbar + Animations
   ============================================================ */

/* ---- NAVBAR SCROLL (throttled with rAF) ---- */
const navbar = document.getElementById('navbar');
let scrollRAF = null;
window.addEventListener('scroll', () => {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        scrollRAF = null;
    });
}, { passive: true });

/* ---- MOBILE HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close nav when any link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ---- HERO SLIDER (only on index.html) ---- */
const heroSlider = document.getElementById('heroSlider');

if (heroSlider) {
    const slides      = document.querySelectorAll('.hero-slide');
    const dots        = document.querySelectorAll('.dot');
    const progressBar = document.getElementById('progressBar');
    const prevBtn     = document.getElementById('sliderPrev');
    const nextBtn     = document.getElementById('sliderNext');

    let current        = 0;
    let autoplayTimer  = null;
    let progressTimer  = null;
    const SLIDE_DURATION = 5500; // ms per slide

    function goToSlide(index) {
        if (!slides.length || !dots.length) return;
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        resetProgress();
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function resetProgress() {
        if (!progressBar) return;
        clearInterval(progressTimer);
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
        setTimeout(() => {
            progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    }

    function startAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Init
    if (slides.length > 0) {
        goToSlide(0);
        startAutoplay();
    }

    // Arrows
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    // Dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    heroSlider.addEventListener('mouseleave', startAutoplay);

    // Touch/swipe support
    let touchStartX = 0;
    heroSlider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    heroSlider.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            startAutoplay();
        }
    });

    // Keyboard nav (only when slider exists)
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { prevSlide(); startAutoplay(); }
        if (e.key === 'ArrowRight') { nextSlide(); startAutoplay(); }
    });
}

/* ---- SMOOTH SCROLL (override default for nav links) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 10;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

/* ---- INTERSECTION OBSERVER (Fade in on scroll) ---- */
const fadeEls = document.querySelectorAll(
    '.sol-card, .stat-item, .milestone, .contact-form-panel, .contact-info-panel, .historia-image, .historia-text, .section-header'
);

const ioOptions = { threshold: 0.05, rootMargin: '0px 0px -80px 0px' };

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, ioOptions);

fadeEls.forEach(el => {
    el.classList.add('fade-in-pending');
    io.observe(el);
});

// Styles are now in CSS file (fade-in-pending and visible classes)

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const lang = localStorage.getItem('site-language') || 'es';
        const successMsg = lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!';
        const originalBtn = lang === 'es' ? 'Enviar Mensaje' : 'Send Message';

        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> ${successMsg}`;
        submitBtn.style.background = '#22c55e';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = `${originalBtn} &nbsp;<i class="fa-solid fa-paper-plane"></i>`;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3500);
    });
}

/* ---- STATS COUNTER ANIMATION ---- */
const statNums = document.querySelectorAll('.stat-num');

const counterIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const rawText = el.textContent.trim();
            const numMatch = rawText.match(/\d+/);
            if (!numMatch) return;
            const target = parseInt(numMatch[0]);
            const suffix = rawText.replace(/[\d]/g, '');
            let current = 0;
            const step  = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current + suffix;
                if (current >= target) clearInterval(timer);
            }, 30);
            counterIO.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterIO.observe(el));

/* ---- DROPDOWN MENUS ---- */
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.closest('.nav-dropdown');
        const isActive = dropdown.classList.contains('active');

        // Close all other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
    }
});

/* ---- LANGUAGE SELECTOR ---- */
const langBtns = document.querySelectorAll('.lang-btn');
const currentLangSpan = document.getElementById('currentLang');

// Set initial language
let currentLanguage = localStorage.getItem('site-language') || 'es';
currentLangSpan.textContent = currentLanguage === 'es' ? '🇪🇸' : '🇺🇸';

langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        currentLanguage = lang;
        localStorage.setItem('site-language', lang);
        currentLangSpan.textContent = lang === 'es' ? '🇪🇸' : '🇺🇸';

        // Close language dropdown
        document.querySelector('.language-selector').classList.remove('active');

        // Apply language translation
        applyLanguageTranslation(lang);
    });
});

// Language translations
const translations = {
    es: {
        // Navigation
        'inicio': 'INICIO',
        'nuestra-compania': 'NUESTRA COMPAÑÍA',
        'sobre-nosotros': 'SOBRE NOSOTROS',
        'noticias': 'NOTICIAS',
        'multimedia': 'MULTIMEDIA',
        'que-hacemos': 'QUÉ HACEMOS',
        'aliados': 'ALIADOS DE NEGOCIO',
        'modelo-negocio': 'MODELO DE NEGOCIO',
        'estudios-mercado': 'ESTUDIOS DE MERCADO',
        'que-solucionamos': 'QUÉ SOLUCIONAMOS',
        'segmentos': 'SEGMENTOS PRODUCTIVOS',
        'campos': 'CAMPOS DE EXPERIENCIA',
        'marcas': 'NUESTRAS MARCAS',
        'soluciones': 'NUESTRAS SOLUCIONES',
        'donde-comprar': 'DÓNDE COMPRAR',
        'contactenos': 'CONTÁCTENOS',
        'idioma': 'IDIOMA:',
        // Contact page
        'contacto-title': 'Contacto y Sucursales',
        'contacto-subtitle': 'Estamos aquí para brindarle asesoría técnica especializada.',
        'form-title': 'Envíenos un mensaje',
        'form-desc': 'Complete el siguiente formulario y uno de nuestros asesores comerciales se pondrá en contacto con usted a la mayor brevedad posible.',
        'label-nombre': 'Nombre completo',
        'label-empresa': 'Empresa',
        'label-email': 'Correo electrónico',
        'label-telefono': 'Teléfono',
        'label-linea': 'Línea de Interés',
        'label-mensaje': '¿En qué podemos ayudarle?',
        'placeholder-nombre': 'Su nombre',
        'placeholder-empresa': 'Su empresa',
        'placeholder-email': 'correo@empresa.com',
        'placeholder-telefono': '+57 300 000 0000',
        'placeholder-mensaje': 'Describa su necesidad o producto de interés...',
        'select-option': 'Seleccione una opción...',
        'transmision': 'Transmisión de Potencia',
        'hidraulica': 'Soluciones Hidráulicas',
        'fluidos': 'Transporte de Fluidos',
        'herramientas': 'Herramientas Industriales',
        'otro': 'Otra consulta',
        'btn-enviar': 'Enviar Mensaje',
        'info-title': 'Información de Contacto',
        'info-sede': 'Sede Principal — Bogotá, Colombia',
        'info-direccion': 'Dirección Principal',
        'info-direccion-text': 'Calle 30A No. 6-22, Piso 32<br>Edificio San Martín, Bogotá D.C.',
        'info-telefono': 'Líneas de Atención Nacional',
        'info-telefono-text': 'PBX: (+57) 601 743 6830<br>Móvil / WhatsApp: (+57) 300 631 3359',
        'info-email': 'Correos Corporativos',
        'info-email-text': 'Comercial: ventas@quinteros.co<br>General: info@quinteros.co',
        'info-horario': 'Horario de Atención',
        'info-horario-text': 'Lunes a Viernes: 8:00am – 5:30pm<br>Sábados: 8:00am – 12:00pm',
        // Hero slides
        'slide1-badge': 'Líderes en Transmisión de Potencia',
        'slide1-h1': 'Impulsando la Industria<br>Colombiana por más de<br><span class="highlight-text">85 Años</span>',
        'slide1-p': 'Representamos las mejores marcas mundiales en componentes y sistemas industriales para el sector productivo y automotriz.',
        'slide1-btn1': 'Nuestras Soluciones',
        'slide1-btn2': 'Solicitar Cotización',
        'slide2-badge': 'Industria Pesada y Procesos Críticos',
        'slide2-h1': 'Soluciones para la<br>Alta Industria y<br><span class="highlight-text">Maquinaria Pesada</span>',
        'slide2-p': 'Componentes de alta precisión para procesos industriales de alto rendimiento, equipos pesados y maquinaria especializada del sector productivo.',
        'slide2-btn1': 'Ver Soluciones',
        'slide2-btn2': 'Nuestra Historia',
        'slide3-badge': 'Transmisión de Potencia',
        'slide3-h1': 'Precisión y Fuerza en<br>cada Componente<br><span class="highlight-text">Industrial</span>',
        'slide3-p': 'Rodamientos, cardanes, correas y sistemas completos de transmisión para garantizar el máximo rendimiento de su maquinaria.',
        'slide3-btn1': 'Marcas que Representamos',
        'slide3-btn2': 'Contactar Asesor',
        'slide4-badge': 'Sector Automotriz Pesado',
        'slide4-h1': 'Respaldo Técnico<br>Especializado para su<br><span class="highlight-text">Operación</span>',
        'slide4-p': 'Asesoría técnica y soluciones integrales para el sector automotriz pesado y la industria nacional.',
        'slide4-btn1': 'Hablar con un Experto',
        'slide4-btn2': 'Explorar Catálogo',
        'slide5-badge': 'Mangueras y Conducción de Fluidos',
        'slide5-h1': 'Mangueras Industriales<br>y Sistemas de<br><span class="highlight-text">Acoplamiento</span>',
        'slide5-p': 'Mangueras industriales, hidráulicas y acoples especializados para el manejo seguro y eficiente de fluidos en procesos críticos.',
        'slide5-btn1': 'Ver Línea',
        'slide5-btn2': 'Solicitar Info',
        'slide6-badge': 'Línea de Herramientas y Metrología',
        'slide6-h1': 'Precisión Profesional<br>en cada Medición y<br><span class="highlight-text">Ensamble</span>',
        'slide6-p': 'Herramientas manuales profesionales, instrumentos de medición de alta precisión y soluciones de metrología para taller industrial, mantenimiento y control de calidad.',
        'slide6-btn1': 'Ver Línea',
        'slide6-btn2': 'Contactar Asesor',
        'slide7-badge': 'Línea de Arquitectura y Construcción',
        'slide7-h1': 'Porcelanato y Grifería<br>Premium para tus<br><span class="highlight-text">Espacios</span>',
        'slide7-p': 'Porcelanato vitrificado de gran formato y grifería de alta gama. Soluciones integrales para baños, cocinas y proyectos arquitectónicos residenciales, comerciales e institucionales.',
        'slide7-btn1': 'Solicitar Información',
        'slide7-btn2': 'Consultar Disponibilidad',
        // Home page
        'home-topbar': 'Más de 85 años de trayectoria industrial en Colombia',
        'home-hero-title': 'Soluciones Industriales de Excelencia',
        'home-hero-desc': 'Con más de 85 años sirviendo a la industria colombiana',
        // Brands section
        'aliados-clase-mundial': 'Aliados de Clase Mundial',
        'representamos-mejores-marcas': 'Representamos las Mejores Marcas',
        'desc-aliados': 'Trabajamos solo con los mejores aliados de negocio para asegurar calidad superior.',
        'conoce-aliados': 'Conoce a todos nuestros Aliados',
        // Brand names
        'marca-amsted-rail': 'Amsted Rail',
        'marca-creanza': 'Creanza Tiles',
        'marca-donmez': 'Dönmez Debriyaj',
        'marca-fss': 'F.S.S. Fren Sistemleri',
        'marca-gates': 'Gates',
        'marca-gedore': 'Gedore',
        'marca-hose': 'Hose Solutions',
        'marca-kettenwulf': 'Kettenwulf',
        'marca-kit-masters': 'Kit Masters',
        'marca-miner': 'Miner Elastomer',
        'marca-mwe': 'MVS',
        'marca-prestone': 'Prestone',
        'marca-ramsey': 'Ramsey Products',
        'marca-reliable': 'TTT',
        'marca-spectroline': 'Spectroline',
        'marca-starrett': 'Starrett',
        'marca-stemco': 'Stemco',
        'marca-tuder': 'Tuder Technica',
        'marca-zec': 'ZEC',
        'marca-walker': 'Walker Products',
        // Stats bar
        'stat-anos': 'Años de Experiencia',
        'stat-marcas': 'Marcas Representadas',
        'stat-lineas': 'Líneas de Producto',
        'stat-cobertura': 'Cobertura Nacional',
        // Historia section
        'historia-titulo': 'Más de 85 años impulsando la industria colombiana',
        'historia-desc1': 'Fundada a finales de la década de 1930 en Bogotá, comenzamos nuestras operaciones bajo un modelo de agencia tradicional. Hoy somos referentes indiscutibles en consultoría y asesoría técnica para la alta industria y el sector automotriz pesado.',
        'historia-desc2': 'Contamos con un portafolio de más de 100 marcas mundiales líderes y un equipo humano altamente especializado.',
        'conoce-historia': 'Conoce Nuestra Historia',
        // Solutions section
        'soluciones-titulo': 'Nuestras Soluciones',
        'soluciones-desc': 'Ofrecemos altos estándares de innovación, servicio y respaldo para optimizar sus procesos productivos.',
        'sol-transmision': 'Transmisión de Potencia',
        'sol-transmision-desc': 'Cardanes, rodamientos, correas y componentes para la eficiencia de la fuerza en su maquinaria.',
        'sol-hidraulica': 'Soluciones Hidráulicas',
        'sol-hidraulica-desc': 'Tecnología avanzada en sistemas de presión hidráulica y neumática industrial.',
        'sol-fluidos': 'Transporte de Fluidos',
        'sol-fluidos-desc': 'Mangueras y sistemas completos para el manejo seguro de recursos líquidos y gaseosos.',
        'sol-herramientas': 'Herramientas Industriales',
        'sol-herramientas-desc': 'Equipos de corte y metrología de la más alta precisión para garantizar acabados exactos.',
        'sol-consultar': 'Consultar',
        'ver-catalogo': 'Ver Catálogo Completo',
        // CTA section
        'cta-titulo': '¿Necesita asesoría técnica especializada?',
        'cta-desc': 'Nuestro equipo de expertos está listo para ayudarle a encontrar la solución ideal para su industria.',
        'cta-btn': 'Contactar Ahora',
        // Footer
        'footer-nav': 'Navegación',
        'footer-solutions': 'Soluciones',
        'footer-contact': 'Contacto',
        'footer-desc': 'Soluciones integrales para el sector productivo y automotriz. Más de 85 años de respaldo industrial en Colombia.',
        'footer-address': 'Cll. 30A #6-22, Bogotá',
        'footer-phone': '(601) 743 6830',
        'footer-email': 'info@quinteros.co',
        'footer-copyright': '© 2025 Quinteros S.A. Todos los derechos reservados. | Bogotá, Colombia',
        // Aliados page
        'aliados-titulo': 'Nuestros Aliados',
        'aliados-subtitulo': 'Representamos 15+ marcas internacionales de clase mundial',
        'aliados-badge': 'Aliados Internacionales',
        'aliados-marcas-titulo': 'Marcas que Representamos',
        'aliados-descripcion': 'Quinteros representa las más importantes marcas mundiales en sus categorías. Aliados comprometidos con la excelencia, innovación y calidad.',
        // Brand details
        'desc-amsted-rail': 'Componentes para vagones de carga ferroviaria.',
        'desc-creanza': 'Porcelanato vitrificado premium (GVT/PGVT) de India.',
        'desc-donmez': 'Embragues para vehículos comerciales pesados.',
        'desc-fss': 'Sistemas de freno neumático y embrague para vehículos pesados.',
        'desc-gates': 'Bandas de transmisión y mangueras hidráulicas.',
        'desc-gedore': 'Herramientas profesionales alemanas de precisión.',
        'desc-hose': 'Mangueras industriales flexibles (Mineflex, Boreline).',
        'desc-kettenwulf': 'Cadenas de transporte y piñones industriales.',
        'desc-kit-masters': 'Fan clutches y sistemas de enfriamiento HD.',
        'desc-miner': 'Productos elastoméricos TecsPak® para absorción de impacto.',
        'desc-mwe': 'Volantes y placas de presión de embrague.',
        'desc-prestone': 'Refrigerantes, líquidos de freno y aditivos automotrices.',
        'desc-ramsey': 'Cadenas silenciosas de transmisión de potencia.',
        'desc-reliable': 'Kits de reparación para calipers de freno (TTT).',
        'desc-spectroline': 'Detección de fugas por fluorescencia UV.',
        'desc-starrett': 'Herramientas de medición, metrología y sierras.',
        'desc-stemco': 'Punta de rueda, hubodómetros y autoinflado para HD.',
        'desc-tuder': 'Mangueras industriales para alimentos, farmacéutica y química.',
        'desc-zec': 'Mangueras y tubos termoplásticos italianos.',
        'desc-walker': 'Engine management: sensores, inyección y encendido para automotriz y vehículos comerciales.',
        'visitar-sitio': 'Visitar sitio oficial',
        // Dónde Comprar page
        'dc-hero-title': '¿Dónde Comprar? Nuestros Distribuidores',
        'dc-hero-desc': 'Nuestro modelo de negocio es soportado por nuestro equipo de expertos y nuestros canales de distribución especializados que cubren la totalidad del territorio nacional.',
        'dc-stat-dist': 'Distribuidores',
        'dc-stat-city': 'Ciudades',
        'dc-stat-brand': 'Marcas',
        'dc-stat-countries': 'Países',
        'dc-search-placeholder': 'Buscar distribuidor por nombre o teléfono...',
        'dc-filter-brand': 'Filtrar por Marca',
        'dc-filter-city': 'Filtrar por Ciudad',
        'dc-downloads-badge': 'Recursos',
        'dc-downloads-title': 'Listados de Distribuidores Autorizados',
        'dc-downloads-desc': 'Descarga las listas completas de distribuidores por división y país',
        'dc-dl1-title': 'División Automotriz',
        'dc-dl1-desc': 'Distribuidores autorizados en Colombia',
        'dc-dl2-title': 'División Automotriz',
        'dc-dl2-desc': 'Distribuidores autorizados en Ecuador',
        'dc-dl3-title': 'División Industrial',
        'dc-dl3-desc': 'Distribuidores autorizados en Colombia',
        'dc-dl-btn': 'Descargar PDF',
        'dc-help-title': '¿No encuentras un distribuidor cercano?',
        'dc-help-desc': 'Nuestro equipo comercial puede ayudarte a encontrar el distribuidor más adecuado para tus necesidades específicas.',
        'dc-help-btn': 'Contactar a un Asesor',
        // Navigation items
        'home-send-msg': 'ENVÍENOS UN MENSAJE',
        'home-view-brands': 'VER MARCAS',
        // Campos de Experiencia page
        'campos-titulo': 'Campos de Experiencia',
        'campos-subtitulo': 'Diseñamos soluciones que optimizan las operaciones industriales de nuestros usuarios finales',
        'campos-badge': 'Nuestra Especialización',
        'campos-intro-titulo': '6 Campos de Experiencia Industrial',
        'campos-intro-desc': 'Diseñamos Soluciones que optimizan las operaciones Industriales de nuestros usuarios finales, nos enfocamos en los procesos más críticos buscando su máxima eficiencia.',
        'campos-productos': 'Productos',
        'campo1-titulo': 'Transmisión de Potencia',
        'campo1-desc': 'Componentes y sistemas especializados para la transmisión eficiente de fuerza en todo tipo de maquinaria industrial y automotriz pesada.',
        'campo1-p1': 'Diferenciales', 'campo1-p2': 'Cardanes', 'campo1-p3': 'Zapatas',
        'campo1-p4': 'Clutches', 'campo1-p5': 'Rodamientos', 'campo1-p6': 'Correas',
        'campo1-p7': 'Cadena Silenciosa', 'campo1-p8': 'Acoples',
        'campo2-titulo': 'Soluciones de Punta de Rueda',
        'campo2-desc': 'Sistemas completos para la punta de rueda en vehículos de carga, garantizando seguridad, eficiencia y máxima vida útil de los componentes.',
        'campo2-p1': 'Ratchets', 'campo2-p2': 'Autoinflado', 'campo2-p3': 'King Pins',
        'campo2-p4': 'Tapas', 'campo2-p5': 'Rodamientos', 'campo2-p6': 'Sellos',
        'campo2-p7': 'Bombonas', 'campo2-p8': 'Amortiguadores', 'campo2-p9': 'Tuercas',
        'campo2-p10': 'Hubodómetros',
        'campo3-titulo': 'Transferencia de Fluidos y Materiales',
        'campo3-desc': 'Soluciones de transporte y manejo de fluidos industriales, materiales a granel y sistemas de conducción para procesos productivos exigentes.',
        'campo3-p1': 'Mangueras Termoplásticas', 'campo3-p2': 'Mangueras Industriales',
        'campo3-p3': 'Cadena de Ingeniería', 'campo3-p4': 'Cadena Agricultura',
        'campo3-p5': 'Bandas Transportadoras',
        'campo4-titulo': 'Partes de Motor, Suspensión y Otros Componentes',
        'campo4-desc': 'Repuestos y componentes especializados para el mantenimiento preventivo y correctivo del motor, sistema de suspensión y otros subsistemas críticos.',
        'campo4-p1': 'Filtros', 'campo4-p2': 'Correas Automotrices', 'campo4-p3': 'Bombas',
        'campo4-p4': 'Kits de Reparación', 'campo4-p5': 'Refrigerantes', 'campo4-p6': 'Bujías',
        'campo5-titulo': 'Soluciones Hidráulicas',
        'campo5-desc': 'Tecnología avanzada en sistemas hidráulicos de alta presión para maquinaria pesada, equipos industriales y vehículos de trabajo especializados.',
        'campo5-p1': 'Mangueras Hidráulicas', 'campo5-p2': 'Acoples Hidráulicos',
        'campo5-p3': 'Detección de Fugas',
        'campo6-titulo': 'Herramientas de Control y Mantenimiento Industrial',
        'campo6-desc': 'Herramientas profesionales de corte, medición y metrología para garantizar precisión absoluta en procesos de manufactura y mantenimiento industrial.',
        'campo6-p1': 'Herramientas de Corte', 'campo6-p2': 'Metrología',
        'campo6-p3': 'Sierras Cinta', 'campo6-p4': 'Sierras Manuales', 'campo6-p5': 'Seguetas',
        'campo6-p6': 'Lubricantes', 'campo6-p7': 'Flexómetros', 'campo6-p8': 'Micrómetros',
        'campo6-p9': 'Durómetros', 'campo6-p10': 'Niveles'
    },
    en: {
        // Navigation
        'inicio': 'HOME',
        'nuestra-compania': 'OUR COMPANY',
        'sobre-nosotros': 'ABOUT US',
        'noticias': 'NEWS',
        'multimedia': 'MULTIMEDIA',
        'que-hacemos': 'WHAT WE DO',
        'aliados': 'BUSINESS PARTNERS',
        'modelo-negocio': 'BUSINESS MODEL',
        'estudios-mercado': 'MARKET STUDIES',
        'que-solucionamos': 'WHAT WE SOLVE',
        'segmentos': 'PRODUCTIVE SEGMENTS',
        'campos': 'FIELDS OF EXPERIENCE',
        'marcas': 'OUR BRANDS',
        'soluciones': 'OUR SOLUTIONS',
        'donde-comprar': 'WHERE TO BUY',
        'contactenos': 'CONTACT US',
        'idioma': 'LANGUAGE:',
        // Contact page
        'contacto-title': 'Contact and Branches',
        'contacto-subtitle': 'We are here to provide you with specialized technical advice.',
        'form-title': 'Send us a message',
        'form-desc': 'Complete the following form and one of our sales advisors will contact you as soon as possible.',
        'label-nombre': 'Full name',
        'label-empresa': 'Company',
        'label-email': 'Email',
        'label-telefono': 'Phone',
        'label-linea': 'Line of Interest',
        'label-mensaje': 'How can we help you?',
        'placeholder-nombre': 'Your name',
        'placeholder-empresa': 'Your company',
        'placeholder-email': 'email@company.com',
        'placeholder-telefono': '+57 300 000 0000',
        'placeholder-mensaje': 'Describe your need or product of interest...',
        'select-option': 'Select an option...',
        'transmision': 'Power Transmission',
        'hidraulica': 'Hydraulic Solutions',
        'fluidos': 'Fluid Transport',
        'herramientas': 'Industrial Tools',
        'otro': 'Other inquiry',
        'btn-enviar': 'Send Message',
        'info-title': 'Contact Information',
        'info-sede': 'Main Office — Bogotá, Colombia',
        'info-direccion': 'Main Address',
        'info-direccion-text': 'Calle 30A No. 6-22, Floor 32<br>San Martín Building, Bogotá D.C.',
        'info-telefono': 'National Customer Service Lines',
        'info-telefono-text': 'PBX: (+57) 601 743 6830<br>Mobile / WhatsApp: (+57) 300 631 3359',
        'info-email': 'Corporate Emails',
        'info-email-text': 'Sales: ventas@quinteros.co<br>General: info@quinteros.co',
        'info-horario': 'Hours of Service',
        'info-horario-text': 'Monday to Friday: 8:00am – 5:30pm<br>Saturday: 8:00am – 12:00pm',
        // Hero slides
        'slide1-badge': 'Leaders in Power Transmission',
        'slide1-h1': 'Driving Colombian<br>Industry for more than<br><span class="highlight-text">85 Years</span>',
        'slide1-p': 'We represent the best global brands in components and industrial systems for the productive and automotive sector.',
        'slide1-btn1': 'Our Solutions',
        'slide1-btn2': 'Request a Quote',
        'slide2-badge': 'Heavy Industry & Critical Processes',
        'slide2-h1': 'Solutions for the<br>High Industry and<br><span class="highlight-text">Heavy Machinery</span>',
        'slide2-p': 'High-precision components for high-performance industrial processes, heavy equipment and specialized machinery in the productive sector.',
        'slide2-btn1': 'View Solutions',
        'slide2-btn2': 'Our History',
        'slide3-badge': 'Power Transmission',
        'slide3-h1': 'Precision and Force in<br>every Industrial<br><span class="highlight-text">Component</span>',
        'slide3-p': 'Bearings, driveshafts, belts and complete transmission systems to ensure maximum performance of your machinery.',
        'slide3-btn1': 'Brands We Represent',
        'slide3-btn2': 'Contact Advisor',
        'slide4-badge': 'Heavy Automotive Sector',
        'slide4-h1': 'Specialized Technical<br>Support for your<br><span class="highlight-text">Operation</span>',
        'slide4-p': 'Technical advice and comprehensive solutions for the heavy automotive sector and national industry.',
        'slide4-btn1': 'Talk to an Expert',
        'slide4-btn2': 'Explore Catalog',
        'slide5-badge': 'Hoses & Fluid Conduction',
        'slide5-h1': 'Industrial Hoses and<br>Coupling<br><span class="highlight-text">Systems</span>',
        'slide5-p': 'Industrial hoses, hydraulic hoses and specialized couplings for safe and efficient fluid handling in critical processes.',
        'slide5-btn1': 'View Line',
        'slide5-btn2': 'Request Info',
        'slide6-badge': 'Tools & Metrology Line',
        'slide6-h1': 'Professional Precision<br>in every Measurement<br>and <span class="highlight-text">Assembly</span>',
        'slide6-p': 'Professional hand tools, high-precision measurement instruments and metrology solutions for industrial workshops, maintenance and quality control.',
        'slide6-btn1': 'View Line',
        'slide6-btn2': 'Contact Advisor',
        'slide7-badge': 'Architecture & Construction Line',
        'slide7-h1': 'Premium Porcelain<br>and Faucets for<br><span class="highlight-text">your Spaces</span>',
        'slide7-p': 'Large-format vitrified porcelain and premium faucets. Complete solutions for bathrooms, kitchens and architectural projects — residential, commercial and institutional.',
        'slide7-btn1': 'Request Information',
        'slide7-btn2': 'Check Availability',
        // Home page
        'home-topbar': 'More than 85 years of industrial trajectory in Colombia',
        'home-hero-title': 'Industrial Solutions of Excellence',
        'home-hero-desc': 'With more than 85 years serving Colombian industry',
        // Brands section
        'aliados-clase-mundial': 'World-Class Allies',
        'representamos-mejores-marcas': 'We Represent the Best Brands',
        'desc-aliados': 'We work only with the best business partners to ensure superior quality.',
        'conoce-aliados': 'Meet All Our Partners',
        // Brand names
        'marca-amsted-rail': 'Amsted Rail',
        'marca-creanza': 'Creanza Tiles',
        'marca-donmez': 'Dönmez Debriyaj',
        'marca-fss': 'F.S.S. Fren Sistemleri',
        'marca-gates': 'Gates',
        'marca-gedore': 'Gedore',
        'marca-hose': 'Hose Solutions',
        'marca-kettenwulf': 'Kettenwulf',
        'marca-kit-masters': 'Kit Masters',
        'marca-miner': 'Miner Elastomer',
        'marca-mwe': 'MVS',
        'marca-prestone': 'Prestone',
        'marca-ramsey': 'Ramsey Products',
        'marca-reliable': 'TTT',
        'marca-spectroline': 'Spectroline',
        'marca-starrett': 'Starrett',
        'marca-stemco': 'Stemco',
        'marca-tuder': 'Tuder Technica',
        'marca-zec': 'ZEC',
        'marca-walker': 'Walker Products',
        // Stats bar
        'stat-anos': 'Years of Experience',
        'stat-marcas': 'Represented Brands',
        'stat-lineas': 'Product Lines',
        'stat-cobertura': 'National Coverage',
        // Historia section
        'historia-titulo': 'More than 85 years driving Colombian industry',
        'historia-desc1': 'Founded in the late 1930s in Bogotá, we began our operations under a traditional agency model. Today we are undisputed leaders in consulting and technical advice for high industry and heavy automotive sector.',
        'historia-desc2': 'We have a portfolio of more than 100 leading global brands and a highly specialized human team.',
        'conoce-historia': 'Know Our History',
        // Solutions section
        'soluciones-titulo': 'Our Solutions',
        'soluciones-desc': 'We offer high standards of innovation, service and support to optimize your production processes.',
        'sol-transmision': 'Power Transmission',
        'sol-transmision-desc': 'Driveshafts, bearings, belts and components for the efficiency of force in your machinery.',
        'sol-hidraulica': 'Hydraulic Solutions',
        'sol-hidraulica-desc': 'Advanced technology in hydraulic and industrial pneumatic pressure systems.',
        'sol-fluidos': 'Fluid Transport',
        'sol-fluidos-desc': 'Hoses and complete systems for safe handling of liquid and gaseous resources.',
        'sol-herramientas': 'Industrial Tools',
        'sol-herramientas-desc': 'Cutting and metrology equipment of the highest precision to guarantee exact finishes.',
        'sol-consultar': 'Inquire',
        'ver-catalogo': 'View Full Catalog',
        // CTA section
        'cta-titulo': 'Do you need specialized technical advice?',
        'cta-desc': 'Our team of experts is ready to help you find the ideal solution for your industry.',
        'cta-btn': 'Contact Now',
        // Footer
        'footer-nav': 'Navigation',
        'footer-solutions': 'Solutions',
        'footer-contact': 'Contact',
        'footer-desc': 'Comprehensive solutions for the productive and automotive sector. More than 85 years of industrial support in Colombia.',
        'footer-address': 'Cll. 30A #6-22, Bogotá',
        'footer-phone': '(601) 743 6830',
        'footer-email': 'info@quinteros.co',
        'footer-copyright': '© 2025 Quinteros S.A. All rights reserved. | Bogotá, Colombia',
        // Aliados page
        'aliados-titulo': 'Our Partners',
        'aliados-subtitulo': 'We represent 15+ world-class international brands',
        'aliados-badge': 'International Partners',
        'aliados-marcas-titulo': 'Brands We Represent',
        'aliados-descripcion': 'Quinteros represents the most important brands in their categories worldwide. Partners committed to excellence, innovation and quality.',
        // Brand details
        'desc-amsted-rail': 'Components for freight rail vehicles.',
        'desc-creanza': 'Premium glazed vitrified tiles (GVT/PGVT) from India.',
        'desc-donmez': 'Clutches for heavy commercial vehicles.',
        'desc-fss': 'Air brake and clutch systems for heavy vehicles.',
        'desc-gates': 'Power transmission belts and hydraulic hoses.',
        'desc-gedore': 'German professional precision tools.',
        'desc-hose': 'Industrial flexible hoses (Mineflex, Boreline).',
        'desc-kettenwulf': 'Industrial conveyor chains and sprockets.',
        'desc-kit-masters': 'Heavy-duty fan clutches and cooling systems.',
        'desc-miner': 'TecsPak® elastomeric impact absorption products.',
        'desc-mwe': 'Flywheels and clutch pressure plates.',
        'desc-prestone': 'Coolants, brake fluids and automotive additives.',
        'desc-ramsey': 'Silent chains for power transmission.',
        'desc-reliable': 'Brake caliper repair kits (TTT).',
        'desc-spectroline': 'UV fluorescent leak detection.',
        'desc-starrett': 'Measuring tools, metrology and saws.',
        'desc-stemco': 'Wheel-end, hubodometers and tire inflation for HD.',
        'desc-tuder': 'Industrial hoses for food, pharmaceutical and chemical.',
        'desc-zec': 'Italian thermoplastic hoses and tubing.',
        'desc-walker': 'Engine management: sensors, fuel injection and ignition for automotive and commercial vehicles.',
        'visitar-sitio': 'Visit official website',
        // Dónde Comprar page
        'dc-hero-title': 'Where to Buy? Our Distributors',
        'dc-hero-desc': 'Our business model is supported by our team of experts and our specialized distribution channels that cover the entire national territory.',
        'dc-stat-dist': 'Distributors',
        'dc-stat-city': 'Cities',
        'dc-stat-brand': 'Brands',
        'dc-stat-countries': 'Countries',
        'dc-search-placeholder': 'Search distributor by name or phone...',
        'dc-filter-brand': 'Filter by Brand',
        'dc-filter-city': 'Filter by City',
        'dc-downloads-badge': 'Resources',
        'dc-downloads-title': 'Authorized Distributor Lists',
        'dc-downloads-desc': 'Download the complete lists of distributors by division and country',
        'dc-dl1-title': 'Automotive Division',
        'dc-dl1-desc': 'Authorized distributors in Colombia',
        'dc-dl2-title': 'Automotive Division',
        'dc-dl2-desc': 'Authorized distributors in Ecuador',
        'dc-dl3-title': 'Industrial Division',
        'dc-dl3-desc': 'Authorized distributors in Colombia',
        'dc-dl-btn': 'Download PDF',
        'dc-help-title': "Can't find a distributor nearby?",
        'dc-help-desc': 'Our commercial team can help you find the most suitable distributor for your specific needs.',
        'dc-help-btn': 'Contact an Advisor',
        // Navigation items
        'home-send-msg': 'SEND US A MESSAGE',
        'home-view-brands': 'VIEW BRANDS',
        // Campos de Experiencia page
        'campos-titulo': 'Fields of Experience',
        'campos-subtitulo': 'We design solutions that optimize the industrial operations of our end users',
        'campos-badge': 'Our Specialization',
        'campos-intro-titulo': '6 Industrial Fields of Experience',
        'campos-intro-desc': 'We design solutions that optimize the industrial operations of our end users, focusing on the most critical processes to achieve maximum efficiency.',
        'campos-productos': 'Products',
        'campo1-titulo': 'Power Transmission',
        'campo1-desc': 'Specialized components and systems for the efficient transmission of force in all types of industrial and heavy automotive machinery.',
        'campo1-p1': 'Differentials', 'campo1-p2': 'Driveshafts', 'campo1-p3': 'Brake Shoes',
        'campo1-p4': 'Clutches', 'campo1-p5': 'Bearings', 'campo1-p6': 'Belts',
        'campo1-p7': 'Silent Chain', 'campo1-p8': 'Couplings',
        'campo2-titulo': 'Wheel End Solutions',
        'campo2-desc': 'Complete wheel end systems for cargo vehicles, ensuring safety, efficiency and maximum component service life.',
        'campo2-p1': 'Ratchets', 'campo2-p2': 'Auto Inflation', 'campo2-p3': 'King Pins',
        'campo2-p4': 'Caps', 'campo2-p5': 'Bearings', 'campo2-p6': 'Seals',
        'campo2-p7': 'Drums', 'campo2-p8': 'Shock Absorbers', 'campo2-p9': 'Nuts',
        'campo2-p10': 'Hubodometers',
        'campo3-titulo': 'Fluid and Material Transfer',
        'campo3-desc': 'Transport and handling solutions for industrial fluids, bulk materials and conveying systems for demanding production processes.',
        'campo3-p1': 'Thermoplastic Hoses', 'campo3-p2': 'Industrial Hoses',
        'campo3-p3': 'Engineering Chain', 'campo3-p4': 'Agricultural Chain',
        'campo3-p5': 'Conveyor Belts',
        'campo4-titulo': 'Engine Parts, Suspension and Other Components',
        'campo4-desc': 'Specialized spare parts and components for preventive and corrective maintenance of the engine, suspension system and other critical subsystems.',
        'campo4-p1': 'Filters', 'campo4-p2': 'Automotive Belts', 'campo4-p3': 'Pumps',
        'campo4-p4': 'Repair Kits', 'campo4-p5': 'Coolants', 'campo4-p6': 'Spark Plugs',
        'campo5-titulo': 'Hydraulic Solutions',
        'campo5-desc': 'Advanced technology in high-pressure hydraulic systems for heavy machinery, industrial equipment and specialized work vehicles.',
        'campo5-p1': 'Hydraulic Hoses', 'campo5-p2': 'Hydraulic Couplings',
        'campo5-p3': 'Leak Detection',
        'campo6-titulo': 'Industrial Control and Maintenance Tools',
        'campo6-desc': 'Professional cutting, measuring and metrology tools to ensure absolute precision in manufacturing and industrial maintenance processes.',
        'campo6-p1': 'Cutting Tools', 'campo6-p2': 'Metrology',
        'campo6-p3': 'Band Saws', 'campo6-p4': 'Hand Saws', 'campo6-p5': 'Hacksaws',
        'campo6-p6': 'Lubricants', 'campo6-p7': 'Tape Measures', 'campo6-p8': 'Micrometers',
        'campo6-p9': 'Durometers', 'campo6-p10': 'Levels'
    }
};

function applyLanguageTranslation(lang) {
    // Update text content — preserves child HTML elements (icons, etc.)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!translations[lang] || !translations[lang][key]) return;
        const value = translations[lang][key];

        // If element has child elements (e.g. <i> icons), only replace text nodes
        const hasChildElements = Array.from(el.childNodes).some(n => n.nodeType === 1);
        if (hasChildElements) {
            Array.from(el.childNodes).forEach(node => {
                if (node.nodeType === 3 && node.textContent.trim()) {
                    node.textContent = value + ' ';
                }
            });
        } else {
            el.textContent = value;
        }
    });

    // Update innerHTML (for elements that contain HTML like <span>, <br>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update form button message if in contact form
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const span = submitBtn.querySelector('span');
        if (span && translations[lang] && translations[lang]['btn-enviar']) {
            span.textContent = translations[lang]['btn-enviar'];
        }
    }

    // Update document language attribute
    document.documentElement.lang = lang;
}

// Apply initial language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('site-language') || 'es';
    if (savedLanguage !== 'es') {
        applyLanguageTranslation(savedLanguage);
    }
});
