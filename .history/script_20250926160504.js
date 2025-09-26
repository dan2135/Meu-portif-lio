function mostrarConteudo() {
    document.getElementById('ola').classList.add('hidden');
    document.getElementById('conteudo').classList.add('visible');
    
    // Iniciar observadores após mostrar o conteúdo
    setTimeout(() => {
        iniciarObservadorSecoes();
        iniciarObservadorElementos();
        configurarNavegacao();
        // REMOVIDO: setupMenuHamburguer() daqui para evitar duplicação
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
    // CORREÇÃO: Selecionando os elementos corretos baseados no seu HTML
    const skillCards = document.querySelectorAll('.skill-card'); // Mudado de #skills li para .skill-card
    const projectCards = document.querySelectorAll('.projeto-card');
    const contactItems = document.querySelectorAll('.contato-links li');
    
    const elements = [...skillCards, ...projectCards, ...contactItems];
    
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
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Variável global para controlar se o menu já foi inicializado
let menuInicializado = false;

function setupMenuHamburguer() {
    // Prevenir inicialização múltipla
    if (menuInicializado) return;
    menuInicializado = true;
    
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Verificar se os elementos existem
    if (!menuBtn || !nav) return;

    // Verificar se o overlay já existe para evitar duplicação
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        const isActive = nav.classList.contains('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = isActive ? '' : 'hidden';
        
        // Alterar ícone do botão
        if (!isActive) {
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

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    // CORREÇÃO: Verificar pela classe 'visible' em vez de style.display
    const conteudo = document.getElementById('conteudo');
    const ola = document.getElementById('ola');
    
    // Se a página carregou diretamente com o conteúdo visível
    if (conteudo && conteudo.classList.contains('visible')) {
        setupMenuHamburguer();
        iniciarObservadorSecoes();
        iniciarObservadorElementos();
        configurarNavegacao();
    } 
    // Se a tela de boas-vindas ainda está visível
    else if (ola && !ola.classList.contains('hidden')) {
        // Adicionar evento ao botão "Conheça meu trabalho"
        const sjbButton = document.getElementById('sjb');
        if (sjbButton) {
            sjbButton.addEventListener('click', function() {
                mostrarConteudo();
                // Inicializar o menu hamburguer após mostrar o conteúdo
                setTimeout(setupMenuHamburguer, 350);
            });
        }
    }
    // Caso padrão (página carregou sem animações)
    else {
        setupMenuHamburguer();
        iniciarObservadorSecoes();
        iniciarObservadorElementos();
        configurarNavegacao();
    }
});