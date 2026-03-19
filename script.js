// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const olaScreen = document.getElementById('ola');
    const conteudo = document.getElementById('conteudo');
    const sjbButton = document.getElementById('sjb');
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Dark Mode Toggle
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Esconder tela de boas-vindas
    sjbButton.addEventListener('click', function() {
        olaScreen.classList.add('hidden');
        conteudo.style.display = 'block';
        
        setTimeout(function() {
            conteudo.classList.add('visible');
        }, 100);
    });

    // Menu mobile toggle se o tamanho da tela for menor que 768px
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile');
    }   
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Mudar ícone do menu
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', closeMenu);

    // Fechar menu ao clicar em um link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos os links
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            
            // Adicionar active ao link clicado
            this.classList.add('active');
            
            // Scroll suave para a seção
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Fechar menu mobile
            closeMenu();
        });
    });

    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    // Detectar seção ativa no scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll para links âncora (fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});