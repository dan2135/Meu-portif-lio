     function mostrarConteudo() {
            document.getElementById('ola').classList.add('hidden');
            document.getElementById('conteudo').classList.add('visible');
            
            // Iniciar observadores após mostrar o conteúdo
            setTimeout(() => {
                iniciarObservadorSecoes();
                iniciarObservadorElementos();
                configurarNavegacao();
            }, 300);
        }

        // Observador para as seções principais
        function iniciarObservadorSecoes() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remover a classe ativa de todas as seções
                        sections.forEach(section => {
                            if (section !== entry.target) {
                                section.classList.add('exiting');
                                setTimeout(() => {
                                    section.classList.remove('active', 'exiting');
                                }, 300);
                            }
                        });
                        
                        // Adicionar a classe ativa à seção visível
                        entry.target.classList.add('active');
                        
                        // Atualizar o link de navegação ativo
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // Observador para elementos individuais (skills, projetos, contato)
        function iniciarObservadorElementos() {
            const skillItems = document.querySelectorAll('#skills li');
            const projectCards = document.querySelectorAll('.projeto-card');
            const contactItems = document.querySelectorAll('.contato-links li');
            
            const elements = [...skillItems, ...projectCards, ...contactItems];
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100);
                    }
                });
            }, { threshold: 0.2 });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Configurar navegação suave
        function configurarNavegacao() {
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                });
            });
        }
function setupMenuHamburguer() {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        
        // Alterar ícone do botão
        if (nav.classList.contains('active')) {
            menuBtn.innerHTML = '✕';
            menuBtn.setAttribute('aria-label', 'Fechar menu');
        } else {
            menuBtn.innerHTML = '&#9776;';
            menuBtn.setAttribute('aria-label', 'Abrir menu');
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar em um link
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Inicializar quando o conteúdo for mostrado
function mostrarConteudo() {
    document.getElementById('ola').style.display = 'none';
    document.getElementById('conteudo').style.display = 'block';
    
    // Inicializar menu hamburguer
    setupMenuHamburguer();
}
        

        document.addEventListener("DOMContentLoaded", function() {
            if (document.getElementById('conteudo').style.display === 'block') {
        setupMenuHamburguer();
        });